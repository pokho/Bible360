import { ProviderConfiguration, ChronologicalMethodology } from '../../types';
export { ApocryphaReadingProvider } from './apocrypha-chronological';
export { BiblehubReadingProvider } from './biblehub-chronological';

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
    id: 'biblehub-chronological',
    name: 'Biblehub Chronological',
    description: 'Complete chronological timeline following traditional Hebrew chronology with chapter-by-chapter progression through biblical history.',
    methodology: {
      datingSystem: 'conservative',
      jobPlacement: 'early-genesis',
      gospelIntegration: 'historical',
      psalmsDistribution: 'event-based',
      apocryphaInclusion: {
        includeDeuterocanonical: false,
        includeNTApocrypha: false,
        denominationalPreference: 'protestant',
        intertestamentalPlacement: 'historical-gap'
      }
    },
    features: [
      'Traditional Hebrew chronology',
      'Chapter-by-chapter progression',
      'Event-based Psalms distribution',
      'Historical timeline integration',
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