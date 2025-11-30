import { Component, h, Prop, State, Event, EventEmitter, Watch } from '@stencil/core';
import { ApocryphaSettings } from '../../types';

@Component({
  tag: 'apocrypha-toggle',
  styleUrl: 'apocrypha-toggle.css',
  shadow: true,
})
export class ApocryphaToggle {
  @Prop() settings: ApocryphaSettings = {
    includeDeuterocanonical: false,
    includeNTApocrypha: false,
    denominationalPreference: 'protestant',
    intertestamentalPlacement: 'historical-gap'
  };
  @Event() settingsChanged: EventEmitter<ApocryphaSettings>;

  @State() internalSettings: ApocryphaSettings;

  @Watch('settings')
  onSettingsChange(newSettings: ApocryphaSettings) {
    this.internalSettings = { ...newSettings };
  }

  componentWillLoad() {
    this.internalSettings = { ...this.settings };
  }

  private updateSetting<K extends keyof ApocryphaSettings>(key: K, value: ApocryphaSettings[K]) {
    const newSettings = { ...this.internalSettings, [key]: value };
    this.internalSettings = newSettings;
    this.settingsChanged.emit(newSettings);
  }

  render() {
    const { internalSettings } = this;

    return (
      <div class="apocrypha-toggle">
        <h3>Apocrypha Settings</h3>
        <p class="description">
          Customize your reading plan to include Deuterocanonical books and other ancient writings.
          These texts are valuable for historical context and are considered canonical by some traditions.
        </p>

        <div class="setting-group">
          <h4>Old Testament Apocrypha (Deuterocanonical)</h4>
          <div class="checkbox-group">
            <label class="checkbox-label">
              <input
                type="checkbox"
                checked={internalSettings.includeDeuterocanonical}
                onChange={(e) => this.updateSetting('includeDeuterocanonical', (e.target as HTMLInputElement).checked)}
              />
              <span class="checkmark"></span>
              Include Deuterocanonical books
            </label>
            <div class="included-books">
              <small>
                1-2 Maccabees, Tobit, Judith, Wisdom of Solomon, Sirach, Baruch,
                additions to Esther & Daniel
              </small>
            </div>
          </div>
        </div>

        <div class="setting-group">
          <h4>New Testament Apocrypha</h4>
          <div class="checkbox-group">
            <label class="checkbox-label">
              <input
                type="checkbox"
                checked={internalSettings.includeNTApocrypha}
                onChange={(e) => this.updateSetting('includeNTApocrypha', (e.target as HTMLInputElement).checked)}
              />
              <span class="checkmark"></span>
              Include New Testament Apocrypha
            </label>
            <div class="included-books">
              <small>
                Gospel of Thomas, Didache, 1-2 Clement, Shepherd of Hermas,
                Gospel of Mary, Infancy Gospels
              </small>
            </div>
          </div>
        </div>

        <div class="setting-group">
          <h4>Denominational Preference</h4>
          <div class="radio-group">
            {(['protestant', 'catholic', 'orthodox', 'academic'] as const).map((preference) => (
              <label key={preference} class="radio-label">
                <input
                  type="radio"
                  name="denominational-preference"
                  value={preference}
                  checked={internalSettings.denominationalPreference === preference}
                  onChange={() => this.updateSetting('denominationalPreference', preference)}
                />
                <span class="radio-mark"></span>
                <div class="radio-content">
                  <strong>{this.capitalizeFirst(preference)}</strong>
                  <small>{this.getPreferenceDescription(preference)}</small>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div class="setting-group">
          <h4>Intertestamental Period Placement</h4>
          <div class="radio-group">
            {(['historical-gap', 'detailed-chronology'] as const).map((placement) => (
              <label key={placement} class="radio-label">
                <input
                  type="radio"
                  name="intertestamental-placement"
                  value={placement}
                  checked={internalSettings.intertestamentalPlacement === placement}
                  onChange={() => this.updateSetting('intertestamentalPlacement', placement)}
                />
                <span class="radio-mark"></span>
                <div class="radio-content">
                  <strong>
                    {placement === 'historical-gap' ? 'Historical Gap' : 'Detailed Chronology'}
                  </strong>
                  <small>
                    {placement === 'historical-gap'
                      ? 'Treat the 400-year period between testaments as a gap'
                      : 'Include detailed historical chronology of the intertestamental period'
                    }
                  </small>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div class="preview-section">
          <h4>Reading Plan Impact</h4>
          <div class="impact-summary">
            <div class="impact-item">
              <span class="impact-label">Current Plan:</span>
              <span class="impact-value">
                {internalSettings.includeDeuterocanonical ? '366' : '365'} days
              </span>
            </div>
            <div class="impact-item">
              <span class="impact-label">Deuterocanonical Books:</span>
              <span class="impact-value">
                {internalSettings.includeDeuterocanonical ? '15 books included' : 'Not included'}
              </span>
            </div>
            <div class="impact-item">
              <span class="impact-label">NT Apocrypha:</span>
              <span class="impact-value">
                {internalSettings.includeNTApocrypha ? '6 writings included' : 'Not included'}
              </span>
            </div>
          </div>
        </div>

        <div class="info-box">
          <h4>📚 About the Apocrypha</h4>
          <div class="info-content">
            <p>
              <strong>Deuterocanonical books</strong> were written between 300 BC and 100 AD.
              They are considered canonical by Catholic and Orthodox traditions but viewed as
              valuable historical texts by most Protestant traditions.
            </p>
            <p>
              <strong>New Testament Apocrypha</strong> includes early Christian writings from the
              apostolic age that provide insight into the development of early Christianity
              and diverse theological perspectives.
            </p>
          </div>
        </div>
      </div>
    );
  }

  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private getPreferenceDescription(preference: string): string {
    const descriptions = {
      'protestant': 'Excludes apocrypha from the biblical canon',
      'catholic': 'Includes Deuterocanonical books as scripture',
      'orthodox': 'Includes Deuterocanonical books and additional writings',
      'academic': 'Treats all texts as historical and literary sources'
    };
    return descriptions[preference] || '';
  }
}