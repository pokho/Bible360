import { ProviderConfiguration, ChronologicalMethodology } from '../../types';
export { ApocryphaReadingProvider } from './apocrypha-chronological';
export { BiblehubReadingProvider } from './biblehub-chronological';

export const providerConfigurations: ProviderConfiguration[] = [
  {
    id: 'blue-letter-bible',
    name: 'Blue Letter Bible',
    description: 'Traditional conservative chronological reading plan with young-earth creationist timeline and Deuterocanonical support.',
    methodology: {
      datingSystem: 'young-earth',
      jobPlacement: 'early-genesis',
      gospelIntegration: 'immediate',
      psalmsDistribution: 'historical',
      apocryphaInclusion: {
        includeDeuterocanonical: true,
        includeNTApocrypha: false,
        denominationalPreference: 'protestant',
        intertestamentalPlacement: 'historical-gap'
      }
    },
    features: [
      'Traditional biblical dating (~4004 BC)',
      'New Testament starts Day 1 (Luke 1)',
      'Psalms distributed throughout historical periods',
      'Optional Deuterocanonical books',
      'Conservative evangelical methodology'
    ],
    isDefault: false
  },
  {
    id: 'esv',
    name: 'ESV Chronological',
    description: 'Balanced evangelical scholarship approach with archaeological research and consistent daily reading structure.',
    methodology: {
      datingSystem: 'conservative',
      jobPlacement: 'patriarchal',
      gospelIntegration: 'historical',
      psalmsDistribution: 'historical',
      apocryphaInclusion: {
        includeDeuterocanonical: true,
        includeNTApocrypha: false,
        denominationalPreference: 'protestant',
        intertestamentalPlacement: 'detailed-chronology'
      }
    },
    features: [
      'Consistent 3-4 chapters daily (15-20 minutes)',
      'Gospel harmonization with parallel passages',
      'Archaeological research integration',
      'Wisdom literature in historical context',
      'Balanced scholarly approach'
    ],
    isDefault: true
  },
  {
    id: 'logos',
    name: 'Logos Academic',
    description: 'Academic flexibility with multiple dating systems, scholarly resources, and comprehensive Apocrypha integration.',
    methodology: {
      datingSystem: 'academic',
      jobPlacement: 'custom',
      gospelIntegration: 'custom',
      psalmsDistribution: 'thematic',
      apocryphaInclusion: {
        includeDeuterocanonical: true,
        includeNTApocrypha: true,
        denominationalPreference: 'academic',
        intertestamentalPlacement: 'detailed-chronology'
      }
    },
    features: [
      'Multiple chronological dating systems',
      'Academic resource integration',
      'Visual timeline tools',
      'Comprehensive Apocrypha support (OT & NT)',
      'User-customizable frameworks'
    ],
    isDefault: false
  }
];

export function getProviderById(id: string): ProviderConfiguration | undefined {
  return providerConfigurations.find(provider => provider.id === id);
}

export function getDefaultProvider(): ProviderConfiguration {
  const defaultProvider = providerConfigurations.find(provider => provider.isDefault);
  return defaultProvider || providerConfigurations[0];
}