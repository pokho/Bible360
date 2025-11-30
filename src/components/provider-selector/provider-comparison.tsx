import { Component, h, Prop, State, Event, EventEmitter } from '@stencil/core';
import {
  ProviderConfiguration,
  ChronologicalMethodology,
  ApocryphaSettings
} from '../../types';

@Component({
  tag: 'provider-comparison',
  styleUrl: 'provider-comparison.css',
  shadow: true,
})
export class ProviderComparison {
  @Prop() providers: ProviderConfiguration[] = [];
  @Prop() selectedProvider: string = '';
  @Event() providerSelected: EventEmitter<string>;
  @State() showDetails: boolean = false;

  private getMethodologyExplanation(methodology: ChronologicalMethodology): string {
    const datingMap = {
      'young-earth': 'Young Earth Creation (~4004 BC)',
      'conservative': 'Conservative Evangelical Scholarship',
      'academic': 'Academic/Critical Scholarship',
      'custom': 'Custom Dating System'
    };

    return `${datingMap[methodology.datingSystem]} - ${methodology.gospelIntegration === 'immediate' ? 'NT integrated throughout' : 'NT in historical sequence'}`;
  }

  private getApocryphaStatus(settings: ApocryphaSettings): string {
    const deuterocanonical = settings.includeDeuterocanonical ? 'Deuterocanonical' : 'No Deuterocanonical';
    const ntApocrypha = settings.includeNTApocrypha ? '+ NT Apocrypha' : '';
    return `${deuterocanonical} ${ntApocrypha}`.trim();
  }

  render() {
    return (
      <div class="provider-comparison">
        <h2>Choose Your Chronological Reading Approach</h2>

        <div class="providers-grid">
          {this.providers.map((provider) => (
            <div
              class={`provider-card ${this.selectedProvider === provider.id ? 'selected' : ''} ${provider.isDefault ? 'default' : ''}`}
              onClick={() => this.providerSelected.emit(provider.id)}
            >
              <div class="card-header">
                <h3>{provider.name}</h3>
                {provider.isDefault && <span class="default-badge">Recommended</span>}
              </div>

              <p class="provider-description">{provider.description}</p>

              <div class="methodology-info">
                <strong>Methodology:</strong>
                <p>{this.getMethodologyExplanation(provider.methodology)}</p>
              </div>

              <div class="apocrypha-info">
                <strong>Apocrypha Support:</strong>
                <p>{this.getApocryphaStatus(provider.methodology.apocryphaInclusion)}</p>
              </div>

              <div class="features">
                <strong>Key Features:</strong>
                <ul>
                  {provider.features.slice(0, 3).map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>

              <button class="select-btn">
                {this.selectedProvider === provider.id ? 'Selected' : 'Select This Plan'}
              </button>
            </div>
          ))}
        </div>

        <div class="comparison-note">
          <p>
            <strong>💡 Why the difference?</strong> Each provider uses different chronological methodologies
            based on their scholarly traditions. Blue Letter Bible follows conservative dating,
            ESV balances scholarship with accessibility, while Logos offers academic flexibility.
          </p>
          <button
            class="details-toggle"
            onClick={() => this.showDetails = !this.showDetails}
          >
            {this.showDetails ? 'Hide' : 'Show'} Detailed Comparison
          </button>
        </div>

        {this.showDetails && (
          <div class="detailed-comparison">
            <h3>Chronological Methodology Comparison</h3>
            <table>
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th>Blue Letter Bible</th>
                  <th>ESV</th>
                  <th>Logos</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Creation Dating</td>
                  <td>~4004 BC (young-earth)</td>
                  <td>Flexible with scholarship</td>
                  <td>Multiple user-selectable options</td>
                </tr>
                <tr>
                  <td>Job Placement</td>
                  <td>Days 24-26 with Genesis</td>
                  <td>Contextual patriarchal period</td>
                  <td>User-selectable based on dating</td>
                </tr>
                <tr>
                  <td>Gospel Integration</td>
                  <td>Starts Day 1 (Luke 1)</td>
                  <td>Historical sequence placement</td>
                  <td>User-customizable patterns</td>
                </tr>
                <tr>
                  <td>Apocrypha Support</td>
                  <td>Optional Deuterocanonical</td>
                  <td>Optional chronological placement</td>
                  <td>Comprehensive scholarly integration</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}