import { ReadingPlan, DailyReading, BiblePassage, HistoricalContext, PlanMetadata } from '../../types';
import { PDFParserService, ParsedReadingPlan } from '../../services/pdf-parser.service';

export class BlueLetterBibleProvider {
  private pdfParserService: PDFParserService;

  constructor() {
    this.pdfParserService = PDFParserService.getInstance();
  }

  async loadReadingPlan(pdfBuffer?: Buffer): Promise<ReadingPlan> {
    let parsedPlan: ParsedReadingPlan;

    if (pdfBuffer) {
      parsedPlan = await this.pdfParserService.parseBlueLetterBiblePlan(pdfBuffer);
    } else {
      // Fallback to hardcoded structure if no PDF provided
      parsedPlan = this.getDefaultPlan();
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
      historicalContext: this.getHistoricalContext(reading.day, reading.passages)
    }));

    return {
      provider: 'blue-letter-bible',
      methodology: {
        datingSystem: 'young-earth',
        jobPlacement: 'early-genesis',
        gospelIntegration: 'immediate',
        psalmsDistribution: 'historical',
        apocryphaInclusion: {
          includeDeuterocanonical: false,
          includeNTApocrypha: false,
          denominationalPreference: 'protestant',
          intertestamentalPlacement: 'historical-gap'
        }
      },
      dailyReadings,
      metadata: {
        title: 'Blue Letter Bible Chronological Reading Plan',
        description: 'Traditional chronological plan reading Scripture in the order events occurred historically, based on young-earth creationist timeline.',
        totalDays: parsedPlan.metadata.totalDays,
        averageReadingTime: 20,
        language: 'English',
        version: '1.0',
        sourceUrl: 'https://blueletterbible.org'
      }
    };
  }

  private convertPassages(passages: Array<{ book: string; chapters: string }>): BiblePassage[] {
    return passages.map(passage => {
      const chapters = passage.chapters.split('-');
      const chapterStart = parseInt(chapters[0]);
      const chapterEnd = chapters.length > 1 ? parseInt(chapters[1]) : undefined;

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

  private calculateReadingTime(passages: Array<{ book: string; chapters: string }>): number {
    // Estimate reading time based on number of chapters
    let totalChapters = 0;
    passages.forEach(passage => {
      const chapters = passage.chapters.split('-');
      const start = parseInt(chapters[0]);
      const end = chapters.length > 1 ? parseInt(chapters[1]) : start;
      totalChapters += (end - start + 1);
    });

    // Average reading time: ~5 minutes per chapter
    return Math.max(10, totalChapters * 5);
  }

  private hasApocrypha(passages: Array<{ book: string; chapters: string }>): boolean {
    return passages.some(passage => this.isApocryphal(passage.book));
  }

  private getHistoricalContext(day: number, passages: Array<{ book: string; chapters: string }>): HistoricalContext | undefined {
    const book = passages[0]?.book;

    // Basic historical context mapping
    const contextMap: Record<string, HistoricalContext> = {
      'Genesis': {
        period: 'Primeval History',
        approximateDate: '4004-2000 BC',
        description: 'Creation, patriarchal period, and early human history'
      },
      'Job': {
        period: 'Patriarchal Era',
        approximateDate: '2000-1800 BC',
        description: 'Wisdom literature from the time of the patriarchs'
      },
      'Exodus': {
        period: 'Egyptian Exodus',
        approximateDate: '1446 BC',
        description: 'Israelite deliverance from Egypt and wilderness wanderings'
      },
      'Matthew': {
        period: 'Life of Christ',
        approximateDate: 'AD 26-30',
        description: 'Birth, ministry, death, and resurrection of Jesus Christ'
      },
      'Luke': {
        period: 'Life of Christ',
        approximateDate: 'AD 26-30',
        description: 'Gospel account emphasizing the historical accuracy of Christ\'s life'
      },
      'Acts': {
        period: 'Early Church',
        approximateDate: 'AD 30-60',
        description: 'Birth and expansion of the early Christian church'
      },
      'Revelation': {
        period: 'Apostolic Age',
        approximateDate: 'AD 95',
        description: 'Apostolic visions concerning end times and the new creation'
      }
    };

    return contextMap[book];
  }

  private getDefaultPlan(): ParsedReadingPlan {
    // Fallback structure if no PDF is available
    return {
      dailyReadings: [
        { day: 1, date: 'Day 1', passages: [{ book: 'Genesis', chapters: '1-3' }] },
        { day: 2, date: 'Day 2', passages: [{ book: 'Genesis', chapters: '4-7' }] },
        { day: 3, date: 'Day 3', passages: [{ book: 'Genesis', chapters: '8-11' }] },
        // ... more days would be added here in a real implementation
      ],
      metadata: {
        totalDays: 365,
        source: 'Blue Letter Bible (Fallback)'
      }
    };
  }
}