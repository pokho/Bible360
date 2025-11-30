import { ReadingPlan, DailyReading, ChronologicalDifference, HistoricalContext } from '../types';

export interface ChronologicalComparison {
  providerA: string;
  providerB: string;
  differences: ChronologicalDifference[];
  totalDifferences: number;
}

export interface DateConversion {
  originalDate: string;
  targetSystem: string;
  convertedDate: string;
  notes?: string;
}

export class ChronologyService {
  private static instance: ChronologyService;

  public static getInstance(): ChronologyService {
    if (!ChronologyService.instance) {
      ChronologyService.instance = new ChronologyService();
    }
    return ChronologyService.instance;
  }

  /**
   * Compare chronological readings between two providers
   */
  comparePlans(planA: ReadingPlan, planB: ReadingPlan): ChronologicalComparison {
    const differences: ChronologicalDifference[] = [];
    const maxDays = Math.max(planA.dailyReadings.length, planB.dailyReadings.length);

    for (let day = 1; day <= maxDays; day++) {
      const readingA = planA.dailyReadings.find(r => r.day === day);
      const readingB = planB.dailyReadings.find(r => r.day === day);

      if (!readingA || !readingB) continue;

      const dayDifferences = this.compareDayReadings(day, readingA, readingB, planA.provider, planB.provider);
      differences.push(...dayDifferences);
    }

    return {
      providerA: planA.provider,
      providerB: planB.provider,
      differences,
      totalDifferences: differences.length
    };
  }

  /**
   * Convert dates between different chronology systems
   */
  convertDateSystem(
    originalDate: string,
    fromSystem: 'young-earth' | 'conservative' | 'academic',
    toSystem: 'young-earth' | 'conservative' | 'academic'
  ): DateConversion {
    const conversionNotes: Record<string, Record<string, string>> = {
      'young-earth': {
        'conservative': 'Traditional biblical dates adjusted for archaeological evidence',
        'academic': 'Young-earth dates converted to academic chronology based on near eastern chronology'
      },
      'conservative': {
        'young-earth': 'Archaeological dates simplified to Ussher chronology',
        'academic': 'Conservative dates adjusted to critical scholarship framework'
      },
      'academic': {
        'young-earth': 'Academic dates compressed to young-earth timeline',
        'conservative': 'Critical dates adjusted for conservative framework'
      }
    };

    // Extract numeric date if present
    const numericMatch = originalDate.match(/(\d+)\s*(BC|AD)/i);
    if (!numericMatch) {
      return {
        originalDate,
        targetSystem: toSystem,
        convertedDate: originalDate,
        notes: 'Date conversion not applicable'
      };
    }

    const year = parseInt(numericMatch[1]);
    const era = numericMatch[2].toUpperCase();

    let convertedYear = year;

    // Apply conversion logic
    if (fromSystem === 'young-earth' && toSystem === 'academic') {
      convertedYear = this.convertYoungEarthToAcademic(year);
    } else if (fromSystem === 'academic' && toSystem === 'young-earth') {
      convertedYear = this.convertAcademicToYoungEarth(year);
    } else if (fromSystem === 'conservative' && toSystem === 'academic') {
      convertedYear = this.convertConservativeToAcademic(year);
    } else if (fromSystem === 'academic' && toSystem === 'conservative') {
      convertedYear = this.convertAcademicToConservative(year);
    }

    return {
      originalDate,
      targetSystem: toSystem,
      convertedDate: `${convertedYear} ${era}`,
      notes: conversionNotes[fromSystem][toSystem]
    };
  }

  /**
   * Reconcile parallel passages across different Gospels
   */
  reconcileParallelPassages(readings: DailyReading[]): DailyReading[] {
    const parallelPassageMap = this.getParallelPassageMap();

    return readings.map(reading => {
      const reconciledPassages = [...reading.passages];

      // Check for parallel passages and add notes
      reading.passages.forEach(passage => {
        const parallels = parallelPassageMap[`${passage.book} ${passage.chapterStart}`];
        if (parallels) {
          passage.parallelEvents = [...(passage.parallelEvents || []), `Parallels: ${parallels.join(', ')}`];
        }
      });

      return {
        ...reading,
        passages: reconciledPassages
      };
    });
  }

  /**
   * Get historical context for specific biblical events
   */
  getHistoricalContext(book: string, chapter: number, datingSystem: 'young-earth' | 'conservative' | 'academic'): HistoricalContext {
    const contextMap = this.getHistoricalContextMap();

    const key = `${book} ${chapter}`;
    let baseContext = contextMap[key];

    if (!baseContext) {
      // Fallback to book-level context
      baseContext = this.getBookLevelContext(book);
    }

    // Adjust dates based on dating system
    const adjustedContext = {
      ...baseContext,
      approximateDate: this.adjustDateForSystem(baseContext.approximateDate, datingSystem)
    };

    return adjustedContext;
  }

  private compareDayReadings(
    day: number,
    readingA: DailyReading,
    readingB: DailyReading,
    providerA: string,
    providerB: string
  ): ChronologicalDifference[] {
    const differences: ChronologicalDifference[] = [];

    // Check for ordering differences
    if (this.hasOrderingDifference(readingA, readingB)) {
      differences.push({
        day,
        providerAReadings: readingA.passages,
        providerBReadings: readingB.passages,
        differenceType: 'ordering',
        explanation: `Different chronological ordering: ${providerA} vs ${providerB}`
      });
    }

    // Check for inclusion differences
    const includedInA = readingA.passages.map(p => `${p.book} ${p.chapterStart}`);
    const includedInB = readingB.passages.map(p => `${p.book} ${p.chapterStart}`);

    const uniqueToA = includedInA.filter(p => !includedInB.includes(p));
    const uniqueToB = includedInB.filter(p => !includedInA.includes(p));

    if (uniqueToA.length > 0) {
      differences.push({
        day,
        providerAReadings: readingA.passages,
        providerBReadings: readingB.passages,
        differenceType: 'inclusion',
        explanation: `${providerA} includes: ${uniqueToA.join(', ')}`
      });
    }

    if (uniqueToB.length > 0) {
      differences.push({
        day,
        providerAReadings: readingA.passages,
        providerBReadings: readingB.passages,
        differenceType: 'omission',
        explanation: `${providerB} includes: ${uniqueToB.join(', ')}`
      });
    }

    return differences;
  }

  private hasOrderingDifference(readingA: DailyReading, readingB: DailyReading): boolean {
    // Simple check: different primary passages
    if (readingA.passages.length === 0 || readingB.passages.length === 0) return false;

    const primaryA = `${readingA.passages[0].book} ${readingA.passages[0].chapterStart}`;
    const primaryB = `${readingB.passages[0].book} ${readingB.passages[0].chapterStart}`;

    return primaryA !== primaryB;
  }

  private convertYoungEarthToAcademic(year: number): number {
    // Rough conversion for demonstration
    // In reality, this would be much more complex
    if (year > 4000) {
      return year - 2000; // Push forward for academic dating
    }
    return year;
  }

  private convertAcademicToYoungEarth(year: number): number {
    // Rough conversion for demonstration
    if (year > 2000) {
      return Math.min(year + 2000, 4004); // Push back within Ussher chronology
    }
    return year;
  }

  private convertConservativeToAcademic(year: number): number {
    // Conservative dates are often closer to academic than young-earth
    return year - 500;
  }

  private convertAcademicToConservative(year: number): number {
    return year + 500;
  }

  private adjustDateForSystem(date: string, datingSystem: string): string {
    const conversion = this.convertDateSystem(date, 'conservative', datingSystem as any);
    return conversion.convertedDate;
  }

  private getParallelPassageMap(): Record<string, string[]> {
    return {
      'Matthew 5': ['Mark 5', 'Luke 6'],
      'Matthew 6': ['Luke 11'],
      'Matthew 13': ['Mark 4', 'Luke 8'],
      'Mark 1': ['Matthew 3', 'Luke 3'],
      'Luke 5': ['Matthew 9', 'Mark 2'],
      'John 3': ['Matthew 13', 'Mark 4'],
      'John 6': ['Matthew 14', 'Mark 6']
    };
  }

  private getHistoricalContextMap(): Record<string, HistoricalContext> {
    return {
      'Genesis 1': {
        period: 'Primeval History',
        approximateDate: '4004 BC',
        description: 'Creation week and the beginning of human history'
      },
      'Genesis 12': {
        period: 'Patriarchal Era',
        approximateDate: '2091 BC',
        description: 'Abraham\'s call and the beginning of the covenant relationship'
      },
      'Exodus 1': {
        period: 'Egyptian Bondage',
        approximateDate: '1526 BC',
        description: 'Israelite slavery in Egypt and preparation for deliverance'
      },
      'Matthew 1': {
        period: 'Intertestamental',
        approximateDate: '4 BC',
        description: 'Birth of Christ and the culmination of prophetic expectation'
      },
      'Acts 2': {
        period: 'Early Church',
        approximateDate: 'AD 30',
        description: 'Pentecost and the birth of the Christian church'
      }
    };
  }

  private getBookLevelContext(book: string): HistoricalContext {
    const bookContexts: Record<string, HistoricalContext> = {
      'Genesis': {
        period: 'Primeval and Patriarchal History',
        approximateDate: '4004-1800 BC',
        description: 'Creation, fall, flood, and patriarchal narratives'
      },
      'Exodus': {
        period: 'Exodus and Wilderness Wanderings',
        approximateDate: '1526-1406 BC',
        description: 'Deliverance from Egypt and journey to the Promised Land'
      },
      'Matthew': {
        period: 'Life of Christ',
        approximateDate: '4 BC - AD 30',
        description: 'Life, ministry, death, and resurrection of Jesus Christ'
      },
      'Romans': {
        period: 'Apostolic Era',
        approximateDate: 'AD 57',
        description: 'Paul\'s theological letter to the Roman church'
      },
      'Revelation': {
        period: 'Apostolic Age',
        approximateDate: 'AD 95',
        description: 'Apocalyptic visions concerning end times and new creation'
      }
    };

    return bookContexts[book] || {
      period: 'Biblical History',
      approximateDate: 'Unknown',
      description: 'Biblical text requiring further historical context research'
    };
  }
}