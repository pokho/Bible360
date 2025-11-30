import { Component, h, Prop, State, Event, EventEmitter } from '@stencil/core';
import { DailyReading as DailyReadingType, BiblePassage, HistoricalContext } from '../../types';

@Component({
  tag: 'daily-reading',
  styleUrl: 'daily-reading.css',
  shadow: true,
})
export class DailyReadingComponent {
  @Prop() reading: DailyReadingType;
  @Prop() currentDay: number = 1;
  @Prop() readingComplete: boolean = false;
  @Prop() showHistoricalContext: boolean = true;
  @Prop() compactMode: boolean = false;
  @Event() readingCompleted: EventEmitter<number>;
  @Event() passageSelected: EventEmitter<BiblePassage>;

  @State() expanded: boolean = false;
  @State() notes: string = '';

  private formatDate(date: string): string {
    if (date.includes('Day')) {
      return date;
    }
    // Could add more sophisticated date formatting here
    return date;
  }

  private getPassageDisplayText(passage: BiblePassage): string {
    if (passage.chapterEnd && passage.chapterEnd !== passage.chapterStart) {
      return `${passage.book} ${passage.chapterStart}-${passage.chapterEnd}`;
    }
    if (passage.verseStart && passage.verseEnd) {
      return `${passage.book} ${passage.chapterStart}:${passage.verseStart}-${passage.verseEnd}`;
    }
    if (passage.verseStart) {
      return `${passage.book} ${passage.chapterStart}:${passage.verseStart}`;
    }
    return `${passage.book} ${passage.chapterStart}`;
  }

  private getTestamentColor(testament: string): string {
    switch (testament) {
      case 'old': return '#e74c3c';
      case 'new': return '#3498db';
      case 'apocryphal': return '#9b59b6';
      default: return '#7f8c8d';
    }
  }

  private handlePassageClick(passage: BiblePassage, event: MouseEvent) {
    event.preventDefault();
    this.passageSelected.emit(passage);
  }

  private handleCompleteClick() {
    this.readingCompleted.emit(this.reading.day);
  }

  private toggleExpanded() {
    this.expanded = !this.expanded;
  }

  private handleNotesChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.notes = target.value;
  }

  render() {
    const { reading, compactMode, showHistoricalContext, readingComplete } = this;
    const isActive = reading.day === this.currentDay;

    return (
      <div class={`daily-reading ${isActive ? 'active' : ''} ${readingComplete ? 'completed' : ''} ${compactMode ? 'compact' : ''}`}>
        <div class="reading-header" onClick={() => this.toggleExpanded()}>
          <div class="reading-info">
            <h3 class="day-number">Day {reading.day}</h3>
            {reading.date && <span class="reading-date">{this.formatDate(reading.date)}</span>}
            <span class="reading-time">{reading.readingTimeMinutes} min read</span>
          </div>
          <div class="reading-actions">
            {!readingComplete && isActive && (
              <button
                class="complete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  this.handleCompleteClick();
                }}
              >
                ✓ Complete
              </button>
            )}
            {readingComplete && <span class="completed-badge">✓ Completed</span>}
            <button class="expand-btn" aria-expanded={this.expanded.toString()}>
              {this.expanded ? '▼' : '▶'}
            </button>
          </div>
        </div>

        {!compactMode && (
          <div class={`reading-content ${this.expanded ? 'expanded' : 'collapsed'}`}>
            <div class="passages">
              {reading.passages.map((passage) => (
                <div
                  key={`${passage.book}-${passage.chapterStart}`}
                  class="passage"
                  style={{ borderLeftColor: this.getTestamentColor(passage.testament) }}
                  onClick={(e) => this.handlePassageClick(passage, e)}
                >
                  <span class="passage-text">{this.getPassageDisplayText(passage)}</span>
                  <span class="testament-badge" style={{ backgroundColor: this.getTestamentColor(passage.testament) }}>
                    {passage.testament === 'apocryphal' ? 'Apocrypha' : passage.testament}
                  </span>
                  {passage.isApocryphal && <span class="apocrypha-indicator">📚</span>}
                </div>
              ))}
            </div>

            {showHistoricalContext && reading.historicalContext && (
              <div class="historical-context">
                <h4>Historical Context</h4>
                <div class="context-content">
                  <p>
                    <strong>Period:</strong> {reading.historicalContext.period} ({reading.historicalContext.approximateDate})
                  </p>
                  <p>{reading.historicalContext.description}</p>
                  {reading.historicalContext.parallelEvents && (
                    <div class="parallel-events">
                      <strong>Contemporary Events:</strong>
                      <ul>
                        {reading.historicalContext.parallelEvents.map((event) => (
                          <li key={event}>{event}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div class="reading-notes">
              <h4>Notes</h4>
              <textarea
                placeholder="Add your thoughts about today's reading..."
                value={this.notes}
                onInput={(e) => this.handleNotesChange(e)}
                rows={3}
              />
            </div>

            <div class="reading-features">
              {reading.apocryphaIncluded && (
                <span class="feature-badge apocrypha">
                  📚 Contains Apocrypha
                </span>
              )}
              <span class="feature-badge chapters">
                📖 {reading.passages.length} passage{reading.passages.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
}