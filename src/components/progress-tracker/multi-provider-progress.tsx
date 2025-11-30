import { Component, h, Prop, State } from '@stencil/core';
import { ReadingPlan, ProgressTracking } from '../../types';

@Component({
  tag: 'multi-provider-progress',
  styleUrl: 'multi-provider-progress.css',
  shadow: true,
})
export class MultiProviderProgress {
  @Prop() readingPlans: ReadingPlan[] = [];
  @Prop() progressData: ProgressTracking[] = [];
  @Prop() compactView: boolean = false;

  @State() selectedPlan: string = '';

  private calculateOverallProgress(): number {
    if (this.progressData.length === 0) return 0;

    const totalProgress = this.progressData.reduce((sum, progress) => sum + progress.progressPercentage, 0);
    return Math.round(totalProgress / this.progressData.length);
  }

  private getProgressForPlan(planId: string): ProgressTracking | undefined {
    return this.progressData.find(progress => progress.planId === planId);
  }

  private getCurrentStreak(): number {
    if (this.progressData.length === 0) return 0;

    // Calculate streak based on most recent activity
    const mostRecentProgress = this.progressData
      .filter(progress => progress.lastReadDate)
      .sort((a, b) => new Date(b.lastReadDate!).getTime() - new Date(a.lastReadDate!).getTime())[0];

    if (!mostRecentProgress || !mostRecentProgress.lastReadDate) return 0;

    const lastReadDate = new Date(mostRecentProgress.lastReadDate);
    const today = new Date();
    const daysDiff = Math.floor((today.getTime() - lastReadDate.getTime()) / (1000 * 60 * 60 * 24));

    // Simple streak calculation: consecutive days of reading
    if (daysDiff === 0) return 1;
    if (daysDiff === 1) return mostRecentProgress.completedDays.length;
    return 0; // Streak broken
  }

  private formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  private getEstimatedCompletion(plan: ReadingPlan, progress: ProgressTracking): string {
    if (!progress.startDate || progress.currentDay === 0) {
      return 'Not started';
    }

    const startDate = new Date(progress.startDate);
    const today = new Date();
    const daysSinceStart = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysSinceStart === 0) return 'Today';

    const daysCompleted = progress.currentDay;
    const totalDays = plan.metadata.totalDays;
    const daysRemaining = totalDays - daysCompleted;

    // Calculate completion rate
    const dailyRate = daysCompleted / daysSinceStart;
    const estimatedDaysToComplete = Math.ceil(daysRemaining / dailyRate);

    const completionDate = new Date();
    completionDate.setDate(completionDate.getDate() + estimatedDaysToComplete);

    return this.formatDate(completionDate);
  }

  render() {
    const overallProgress = this.calculateOverallProgress();
    const currentStreak = this.getCurrentStreak();

    if (this.compactView) {
      return (
        <div class="progress-compact">
          <div class="overall-progress">
            <div class="progress-circle">
              <svg width="60" height="60">
                <circle
                  cx="30"
                  cy="30"
                  r="25"
                  fill="none"
                  stroke="#e1e8ed"
                  stroke-width="5"
                />
                <circle
                  cx="30"
                  cy="30"
                  r="25"
                  fill="none"
                  stroke="#3498db"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray={`${2 * Math.PI * 25}`}
                  stroke-dashoffset={`${2 * Math.PI * 25 * (1 - overallProgress / 100)}`}
                  transform="rotate(-90 30 30)"
                />
              </svg>
              <div class="progress-text">
                <span class="percentage">{overallProgress}%</span>
                <span class="label">Complete</span>
              </div>
            </div>
            <div class="compact-stats">
              <div class="stat-item">
                <span class="stat-value">{this.readingPlans.length}</span>
                <span class="stat-label">Plans</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{currentStreak}</span>
                <span class="stat-label">Day Streak</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div class="multi-provider-progress">
        <div class="progress-header">
          <h2>Reading Progress</h2>
          <div class="overall-summary">
            <div class="progress-circle">
              <svg width="80" height="80">
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  fill="none"
                  stroke="#e1e8ed"
                  stroke-width="6"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  fill="none"
                  stroke="#3498db"
                  stroke-width="6"
                  stroke-linecap="round"
                  stroke-dasharray={`${2 * Math.PI * 35}`}
                  stroke-dashoffset={`${2 * Math.PI * 35 * (1 - overallProgress / 100)}`}
                  transform="rotate(-90 40 40)"
                />
              </svg>
              <div class="progress-text">
                <span class="percentage">{overallProgress}%</span>
                <span class="label">Overall</span>
              </div>
            </div>
            <div class="summary-stats">
              <div class="stat">
                <span class="stat-value">{this.readingPlans.length}</span>
                <span class="stat-label">Active Plans</span>
              </div>
              <div class="stat">
                <span class="stat-value">{currentStreak}</span>
                <span class="stat-label">Day Streak</span>
              </div>
              <div class="stat">
                <span class="stat-value">
                  {this.progressData.reduce((sum, p) => sum + p.completedDays.length, 0)}
                </span>
                <span class="stat-label">Days Completed</span>
              </div>
            </div>
          </div>
        </div>

        <div class="plans-progress">
          {this.readingPlans.map(plan => {
            const progress = this.getProgressForPlan(`${plan.provider}-${plan.metadata.title}`);
            const progressPercentage = progress?.progressPercentage || 0;
            const currentDay = progress?.currentDay || 0;
            const completedDays = progress?.completedDays.length || 0;

            return (
              <div key={`${plan.provider}-${plan.metadata.title}`} class="plan-progress-card">
                <div class="plan-header">
                  <div class="plan-info">
                    <h3>{plan.metadata.title}</h3>
                    <span class="provider-name">{plan.provider}</span>
                  </div>
                  <div class="plan-stats">
                    <span class="progress-percentage">{progressPercentage}%</span>
                    <span class="day-count">{currentDay}/{plan.metadata.totalDays} days</span>
                  </div>
                </div>

                <div class="progress-bar-container">
                  <div class="progress-bar">
                    <div
                      class="progress-fill"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <div class="progress-labels">
                    <span>Started</span>
                    <span>{progress?.startDate ? this.formatDate(progress.startDate) : 'Not started'}</span>
                  </div>
                </div>

                <div class="plan-details">
                  <div class="detail-item">
                    <span class="label">Completed Days:</span>
                    <span class="value">{completedDays}</span>
                  </div>
                  <div class="detail-item">
                    <span class="label">Last Read:</span>
                    <span class="value">{progress?.lastReadDate ? this.formatDate(progress.lastReadDate) : 'Never'}</span>
                  </div>
                  <div class="detail-item">
                    <span class="label">Est. Completion:</span>
                    <span class="value">{progress ? this.getEstimatedCompletion(plan, progress) : 'Not started'}</span>
                  </div>
                </div>

                {progress?.notes && Object.keys(progress.notes).length > 0 && (
                  <div class="recent-notes">
                    <h4>Recent Notes</h4>
                    <div class="notes-list">
                      {Object.entries(progress.notes)
                        .sort(([a], [b]) => parseInt(b) - parseInt(a))
                        .slice(0, 3)
                        .map(([day, note]) => (
                          <div key={day} class="note-item">
                            <span class="note-day">Day {day}:</span>
                            <span class="note-text">{note.substring(0, 100)}{note.length > 100 ? '...' : ''}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {this.readingPlans.length === 0 && (
          <div class="empty-state">
            <div class="empty-icon">📚</div>
            <h3>No reading plans yet</h3>
            <p>Select a reading plan to start tracking your progress through the Bible chronologically.</p>
          </div>
        )}
      </div>
    );
  }
}