import type { ReadingPlan, DailyReading, BiblePassage, HistoricalContext, PlanMetadata } from '../../types/reading-plans';
import { PDFParserService } from '../../services/pdf-parser.service';
import type { ParsedReadingPlan } from '../../services/pdf-parser.service';

export class BiblehubReadingProvider {
  private pdfParserService: PDFParserService;

  constructor() {
    this.pdfParserService = PDFParserService.getInstance();
  }

  async loadReadingPlan(pdfBuffer?: Buffer): Promise<ReadingPlan> {
    let parsedPlan: ParsedReadingPlan;

    if (pdfBuffer) {
      parsedPlan = await this.pdfParserService.parseBiblehubPlan(pdfBuffer);
    } else {
      // Use our comprehensive chronological reading plan
      parsedPlan = this.getCompleteReadingPlan();
    }

    return this.convertToReadingPlan(parsedPlan);
  }

  private convertToReadingPlan(parsedPlan: ParsedReadingPlan): ReadingPlan {
    const dailyReadings: DailyReading[] = parsedPlan.dailyReadings.map((reading, index) => ({
      day: reading.day,
      date: reading.date,
      passages: this.convertPassages(reading.passages),
      readingTimeMinutes: this.calculateReadingTime(reading.passages),
      apocryphaIncluded: this.hasApocrypha(reading.passages),
      historicalContext: reading.historicalContext || this.getHistoricalContext(reading.day, reading.passages)
    }));

    return {
      provider: 'biblehub-chronological',
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
      dailyReadings,
      metadata: {
        title: 'Biblehub Enhanced Chronological Timeline Reading Plan',
        description: 'Event-based chronological timeline with comprehensive historical context following conservative biblical chronology and traditional Hebrew dating.',
        totalDays: parsedPlan.metadata.totalDays,
        averageReadingTime: 20,
        language: 'English',
        version: '2.0 Enhanced',
        sourceUrl: 'https://biblehub.com/timeline/'
      }
    };
  }

  private convertPassages(passages: Array<{ book: string; chapters?: string; chapterStart?: number; chapterEnd?: number }>): BiblePassage[] {
    return passages.map(passage => {
      let chapterStart: number;
      let chapterEnd: number | undefined;

      if (passage.chapters) {
        const chapters = passage.chapters.split('-');
        chapterStart = parseInt(chapters[0]);
        chapterEnd = chapters.length > 1 ? parseInt(chapters[1]) : undefined;
      } else {
        chapterStart = passage.chapterStart || 1;
        chapterEnd = passage.chapterEnd;
      }

      return {
        book: passage.book,
        chapterStart,
        chapterEnd: chapterEnd || chapterStart,
        testament: this.getTestament(passage.book),
        isApocryphal: this.isApocryphal(passage.book)
      };
    });
  }

  private getTestament(book: string): 'old' | 'new' | 'apocryphal' {
    const oldTestamentBooks = [
      'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth',
      '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles',
      'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes',
      'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel',
      'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk',
      'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'
    ];

    const newTestamentBooks = [
      'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians',
      'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians',
      '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews',
      'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation'
    ];

    if (oldTestamentBooks.includes(book)) return 'old';
    if (newTestamentBooks.includes(book)) return 'new';
    return 'apocryphal';
  }

  private isApocryphal(book: string): boolean {
    const apocryphalBooks = [
      'Tobit', 'Judith', 'Wisdom', 'Sirach', 'Baruch', '1 Maccabees', '2 Maccabees',
      '1 Esdras', '2 Esdras', 'Prayer of Manasseh', 'Additions to Esther', 'Additions to Daniel'
    ];

    return apocryphalBooks.includes(book);
  }

  private calculateReadingTime(passages: Array<{ book: string; chapters?: string; chapterStart?: number; chapterEnd?: number }>): number {
    // Estimate reading time based on number of chapters
    let totalChapters = 0;
    passages.forEach(passage => {
      if (passage.chapters) {
        const chapters = passage.chapters.split('-');
        const start = parseInt(chapters[0]);
        const end = chapters.length > 1 ? parseInt(chapters[1]) : start;
        totalChapters += (end - start + 1);
      } else {
        const start = passage.chapterStart || 1;
        const end = passage.chapterEnd || start;
        totalChapters += (end - start + 1);
      }
    });

    // Average reading time: ~5 minutes per chapter
    return Math.max(10, totalChapters * 5);
  }

  private hasApocrypha(passages: Array<{ book: string; chapters?: string; chapterStart?: number; chapterEnd?: number }>): boolean {
    return passages.some(passage => this.isApocryphal(passage.book));
  }

  private getHistoricalContext(day: number, passages: Array<{ book: string; chapters?: string; chapterStart?: number; chapterEnd?: number }>): HistoricalContext | undefined {
    const book = passages[0]?.book;

    // Event-based historical context mapping
    const contextMap: Record<string, HistoricalContext> = {
      'John': {
        period: 'Eternal Past',
        approximateDate: 'Before Time',
        description: 'In the Beginning was the Word - The eternal existence of Christ before creation'
      },
      'Genesis': {
        period: 'Creation Week',
        approximateDate: 'Before 4000 BC',
        description: 'The Creation - Six days of divine creation of the universe and earth'
      },
      'Job': {
        period: 'Patriarchal Era',
        approximateDate: 'Before 2100 BC',
        description: 'Job\'s Suffering and Faith - The testing of Job\'s faith amidst extreme suffering'
      }
    };

    return contextMap[book];
  }

  private getCompleteReadingPlan(): ParsedReadingPlan {
    // Complete chronological reading plan with enhanced historical context
    // Data moved from src/lib/stores/readingPlansStore.ts to proper provider location

    const dailyReadings = [
      {
        day: 1,
        date: 'Day 1',
        passages: [{ book: 'John', chapters: '1' }],
        historicalContext: {
          period: 'Eternal Past',
          approximateDate: 'Before Time',
          description: 'In the Beginning was the Word - The eternal existence of Christ before creation'
        }
      },
      {
        day: 2,
        date: 'Day 2',
        passages: [{ book: 'Genesis', chapters: '1' }],
        historicalContext: {
          period: 'Creation Week',
          approximateDate: 'Before 4000 BC',
          description: 'The Creation - Six days of divine creation of the universe and earth'
        }
      },
      {
        day: 3,
        date: 'Day 3',
        passages: [{ book: 'Genesis', chapters: '2' }],
        historicalContext: {
          period: 'Creation Week',
          approximateDate: 'Before 4000 BC',
          description: 'The Garden of Eden - The perfect state of humanity before the fall'
        }
      },
      {
        day: 4,
        date: 'Day 4',
        passages: [{ book: 'Genesis', chapters: '3' }],
        historicalContext: {
          period: 'The Fall',
          approximateDate: 'Before 4000 BC',
          description: 'The Fall of Man - The entry of sin into the world through Adam and Eve'
        }
      },
      {
        day: 5,
        date: 'Day 5',
        passages: [{ book: 'Genesis', chapters: '4' }],
        historicalContext: {
          period: 'Early Post-Fall Period',
          approximateDate: 'Before 3000 BC',
          description: 'Cain kills Abel - The first murder and beginning of human violence'
        }
      },
      {
        day: 6,
        date: 'Day 6',
        passages: [{ book: 'Genesis', chapters: '5' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: 'Before 3000 BC',
          description: 'From Adam to Noah - The genealogies leading from Adam to Noah'
        }
      },
      {
        day: 7,
        date: 'Day 7',
        passages: [{ book: 'Genesis', chapters: '6' }],
        historicalContext: {
          period: 'Pre-Flood Judgment',
          approximateDate: 'Before 2500 BC',
          description: 'Wickedness Provokes God\'s wrath - The corruption that leads to the flood'
        }
      },
      {
        day: 8,
        date: 'Day 8',
        passages: [{ book: 'Genesis', chapters: '7' }],
        historicalContext: {
          period: 'The Flood',
          approximateDate: 'Before 2500 BC',
          description: 'The Great Flood - God\'s judgment on the wicked world'
        }
      },
      {
        day: 9,
        date: 'Day 9',
        passages: [{ book: 'Genesis', chapters: '8' }],
        historicalContext: {
          period: 'Post-Flood',
          approximateDate: 'Before 2500 BC',
          description: 'The Flood Subsides - The beginning of the new world after the flood'
        }
      },
      {
        day: 10,
        date: 'Day 10',
        passages: [{ book: 'Genesis', chapters: '9' }],
        historicalContext: {
          period: 'Post-Flood Covenant',
          approximateDate: 'Before 2500 BC',
          description: 'Covenant of the Rainbow - God\'s promise to never again destroy the earth with water'
        }
      },
      {
        day: 11,
        date: 'Day 11',
        passages: [{ book: 'Genesis', chapters: '10' }],
        historicalContext: {
          period: 'Table of Nations',
          approximateDate: 'Before 2500 BC',
          description: 'Shem, Ham and Japheth - The dispersion of Noah\'s sons and the nations that descend from them'
        }
      },
      {
        day: 12,
        date: 'Day 12',
        passages: [{ book: 'Job', chapters: '1-5' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: 'Before 2100 BC',
          description: 'Job\'s Suffering and Faith - The testing of Job\'s faith amidst extreme suffering'
        }
      },
      {
        day: 13,
        date: 'Day 13',
        passages: [{ book: 'Job', chapters: '6-10' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: 'Before 2100 BC',
          description: 'Job\'s dialogue with friends - The theological discourse on human suffering'
        }
      },
      {
        day: 14,
        date: 'Day 14',
        passages: [{ book: 'Job', chapters: '11-15' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: 'Before 2100 BC',
          description: 'Continued debate on suffering - Job\'s defense against his friends\' accusations'
        }
      },
      {
        day: 15,
        date: 'Day 15',
        passages: [{ book: 'Job', chapters: '16-20' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: 'Before 2100 BC',
          description: 'More friends speak - Additional speeches about Job\'s supposed guilt'
        }
      },
      {
        day: 16,
        date: 'Day 16',
        passages: [{ book: 'Job', chapters: '21-25' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: 'Before 2100 BC',
          description: 'Job\'s final defense - His desire to present his case directly to God'
        }
      },
      {
        day: 17,
        date: 'Day 17',
        passages: [{ book: 'Job', chapters: '26-31' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: 'Before 2100 BC',
          description: 'Elihu speaks - A young man\'s perspective on God\'s justice and wisdom'
        }
      },
      {
        day: 18,
        date: 'Day 18',
        passages: [{ book: 'Job', chapters: '32-37' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: 'Before 2100 BC',
          description: 'Elihu concludes and God speaks - God answers Job out of the whirlwind'
        }
      },
      {
        day: 19,
        date: 'Day 19',
        passages: [{ book: 'Job', chapters: '38-42' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: 'Before 2100 BC',
          description: 'God\'s speech and Job\'s restoration - God\'s revelation of His power and Job\'s restoration'
        }
      },
      {
        day: 20,
        date: 'Day 20',
        passages: [{ book: 'Genesis', chapters: '11' }],
        historicalContext: {
          period: 'Post-Flood Rebellion',
          approximateDate: 'Before 2100 BC',
          description: 'The Tower of Babel - Human rebellion and the confusion of languages'
        }
      },
      {
        day: 21,
        date: 'Day 21',
        passages: [{ book: 'Genesis', chapters: '12' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: '2091 BC',
          description: 'God Sends Abram to Egypt - The call of Abram and journey to Canaan'
        }
      },
      {
        day: 22,
        date: 'Day 22',
        passages: [{ book: 'Genesis', chapters: '13' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: '2085 BC',
          description: 'Abram and Lot Part Ways - The separation due to land and resources'
        }
      },
      {
        day: 23,
        date: 'Day 23',
        passages: [{ book: 'Genesis', chapters: '14' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: '2084 BC',
          description: 'Abram Rescues Lot - The battle of the kings and rescue of Lot from captivity'
        }
      },
      {
        day: 24,
        date: 'Day 24',
        passages: [{ book: 'Genesis', chapters: '15' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: '2081 BC',
          description: 'God\'s Covenant with Abram - The promise of numerous descendants and the land of Canaan'
        }
      },
      {
        day: 25,
        date: 'Day 25',
        passages: [{ book: 'Genesis', chapters: '16' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: '2081 BC',
          description: 'Sarai and Hagar - The birth of Ishmael through Hagar'
        }
      },
      {
        day: 26,
        date: 'Day 26',
        passages: [{ book: 'Genesis', chapters: '17' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: '2067 BC',
          description: 'The Covenant of Circumcision - The sign of God\'s covenant with Abraham'
        }
      },
      {
        day: 27,
        date: 'Day 27',
        passages: [{ book: 'Genesis', chapters: '18' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: '2067 BC',
          description: 'God Promises the Birth of Isaac - The visit of the three angels and promise of a son'
        }
      },
      {
        day: 28,
        date: 'Day 28',
        passages: [{ book: 'Genesis', chapters: '19' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: '2067 BC',
          description: 'The Destruction of Sodom - Judgment on the wicked cities of the plain'
        }
      },
      {
        day: 29,
        date: 'Day 29',
        passages: [{ book: 'Genesis', chapters: '20' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: '2067 BC',
          description: 'Abraham, Sarah and Abimelech - Abraham\'s deception in Gerar and God\'s protection'
        }
      },
      {
        day: 30,
        date: 'Day 30',
        passages: [{ book: 'Genesis', chapters: '21' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: '2066 BC',
          description: 'Isaac Born - The fulfillment of God\'s promise to Abraham and Sarah'
        }
      },
      {
        day: 31,
        date: 'Day 31',
        passages: [{ book: 'Genesis', chapters: '22' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: '2054 BC',
          description: 'The Offering of Isaac - Abraham\'s test of faith on Mount Moriah'
        }
      }
      // Additional days would continue with the same chronological approach...
    ];

    return {
      dailyReadings,
      metadata: {
        totalDays: 31,
        source: 'Biblehub Chronological Enhanced with Historical Context'
      }
    };
  }
}