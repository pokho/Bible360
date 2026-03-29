import { ProviderConfiguration, ChronologicalMethodology } from '../../types';
export { ApocryphaReadingProvider } from './apocrypha-chronological';
export { BiblehubReadingProvider } from './biblehub-interleaved';

export const providerConfigurations: ProviderConfiguration[] = [
  {
    id: 'blue-letter-bible',
    name: 'Blue Letter Bible',
    description: 'Conservative evangelical scholarship with traditional young-earth creationist timeline and chronological reading plan.',
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
    description: 'Conservative dating with historical-critical approach and scholarly academic methodology for comprehensive study.',
    methodology: {
      datingSystem: 'academic',
      jobPlacement: 'custom',
      gospelIntegration: 'synoptic',
      psalmsDistribution: 'historical',
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
  },
  {
    id: 'apocrypha',
    name: 'Apocrypha & Pseudepigrapha',
    description: 'Comprehensive academic chronological journey through Deuterocanonical texts, Old Testament Pseudepigrapha, and New Testament Apocrypha with scholarly dating.',
    methodology: {
      datingSystem: 'academic',
      jobPlacement: 'custom',
      gospelIntegration: 'custom',
      psalmsDistribution: 'custom',
      apocryphaInclusion: {
        includeDeuterocanonical: true,
        includeNTApocrypha: true,
        denominationalPreference: 'academic',
        intertestamentalPlacement: 'integrated'
      }
    },
    features: [
      'Complete Deuterocanonical collection',
      'Old Testament Pseudepigrapha integration',
      'New Testament Apocrypha selection',
      'Scholarly historical dating',
      'Academic commentary and context'
    ],
    isDefault: false
  },
  {
    id: 'biblehub-interleaved',
    name: 'BibleHub Interleaved',
    description: 'OT and NT readings interleaved across 365 days following BibleHub timeline structure with daily Testament alternation.',
    methodology: {
      datingSystem: 'conservative',
      jobPlacement: 'early-genesis',
      gospelIntegration: 'interleaved',
      psalmsDistribution: 'event-based',
      apocryphaInclusion: {
        includeDeuterocanonical: false,
        includeNTApocrypha: false,
        denominationalPreference: 'protestant',
        intertestamentalPlacement: 'historical-gap'
      }
    },
    features: [
      'OT/NT interleaved daily reading',
      '280 OT readings + 85 NT readings',
      'Traditional Hebrew chronology',
      'Event-based Psalms distribution',
      'Complete biblical history coverage'
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