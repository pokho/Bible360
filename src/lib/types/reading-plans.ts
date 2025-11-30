export interface ReadingPlan {
  provider: 'blue-letter-bible' | 'esv' | 'logos' | 'apocrypha' | 'biblehub';
  methodology: ChronologicalMethodology;
  dailyReadings: DailyReading[];
  metadata: PlanMetadata;
}

export interface ChronologicalMethodology {
  datingSystem: 'young-earth' | 'conservative' | 'moderate' | 'academic' | 'custom';
  jobPlacement: 'early-genesis' | 'patriarchal' | 'custom';
  gospelIntegration: 'immediate' | 'historical' | 'custom';
  psalmsDistribution: 'historical' | 'thematic' | 'custom';
  apocryphaInclusion: ApocryphaSettings;
}

export interface ApocryphaSettings {
  includeDeuterocanonical: boolean;
  includeNTApocrypha: boolean;
  denominationalPreference: 'catholic' | 'orthodox' | 'protestant' | 'academic';
  intertestamentalPlacement: 'historical-gap' | 'detailed-chronology';
}

export interface DailyReading {
  day: number;
  date?: string;
  passages: BiblePassage[];
  historicalContext?: HistoricalContext;
  readingTimeMinutes: number;
  apocryphaIncluded?: boolean;
}

export interface BiblePassage {
  book: string;
  chapterStart: number;
  chapterEnd?: number;
  verseStart?: number;
  verseEnd?: number;
  isApocryphal?: boolean;
  testament: 'old' | 'new' | 'apocryphal';
  parallelEvents?: string[];
}

export interface HistoricalContext {
  period: string;
  approximateDate: string;
  description?: string;
  parallelEvents?: string[];
}

export interface PlanMetadata {
  title: string;
  description: string;
  totalDays: number;
  averageReadingTime: number;
  language: string;
  version: string;
  sourceUrl?: string;
}

export interface ProviderConfiguration {
  id: string;
  name: string;
  description: string;
  methodology: ChronologicalMethodology;
  features: string[];
  isDefault: boolean;
}

export interface ProgressTracking {
  planId: string;
  currentDay: number;
  completedDays: number[];
  startDate?: Date;
  lastReadDate?: Date;
  notes: Record<number, string>;
  progressPercentage: number;
}

// Enhanced interfaces for apocrypha-specific data structures
export interface ApocryphaReading extends DailyReading {
  textType: 'deuterocanonical' | 'pseudepigraphal' | 'nt-apocrypha' | 'patristic' | 'gnostic';
  datingConfidence: 'high' | 'medium' | 'low' | 'scholarly-debate';
  sourceTradition: 'catholic' | 'orthodox' | 'protestant' | 'academic' | 'manuscript-evidence';
  scholarlyReferences: string[];
  excerptIndicator?: boolean;
}

export interface EnhancedHistoricalContext extends HistoricalContext {
  textType: string;
  datingConfidence: string;
  scholarlyDisputes?: string[];
  culturalContext: string;
  theologicalThemes: string[];
  archaeologicalEvidence?: string[];
  parallelCanonicalTexts?: string[];
}

export interface ChronologicalComparison {
  providers: string[];
  comparisonDate: Date;
  differences: ChronologicalDifference[];
}

export interface ChronologicalDifference {
  day: number;
  providerAReadings: BiblePassage[];
  providerBReadings: BiblePassage[];
  differenceType: 'ordering' | 'inclusion' | 'omission' | 'placement';
  explanation: string;
}