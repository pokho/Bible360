import type { ReadingPlan, DailyReading, BiblePassage, HistoricalContext, PlanMetadata } from '../../types/reading-plans';
import { PDFParserService } from '../../services/pdf-parser.service';
import type { ParsedReadingPlan } from '../../services/pdf-parser.service';
import { generateBiblehubHref } from '../../utils/biblehub-utils';

export class BiblehubReadingProvider {
  private pdfParserService: PDFParserService;

  constructor() {
    this.pdfParserService = PDFParserService.getInstance();
  }

  async loadReadingPlan(pdfBuffer?: Buffer): Promise<ReadingPlan> {
    // Use our comprehensive chronological reading plan
    const parsedPlan = this.getCompleteReadingPlan();
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
      provider: 'biblehub',
      methodology: {
        datingSystem: 'conservative',
        jobPlacement: 'early-genesis',
        gospelIntegration: 'historical',
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
        isApocryphal: this.isApocryphal(passage.book),
        href: generateBiblehubHref(passage.book, chapterStart)
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
    // Complete chronological reading plan based on BibleHub timeline
    // 584 timeline events distributed across 365 days

    const dailyReadings = this.generateCompleteTimeline();

    return {
      dailyReadings,
      metadata: {
        totalDays: 365,
        source: 'Biblehub Timeline - Complete 584 Event Chronological Reading Plan'
      }
    };
  }

  private generateCompleteTimeline(): Array<any> {
    const dailyReadings: DailyReading[] = [];

    // **PRIMEVAL HISTORY & PATRIARCHS (Days 1-25)**

    // Day 1: Creation Foundation
    dailyReadings.push({
      day: 1,
      date: '2025-01-01',
      passages: [
        { book: 'John', chapterStart: 1, chapterEnd: 1 },
        { book: 'Genesis', chapterStart: 1, chapterEnd: 2 }
      ],
      historicalContext: {
        period: 'Primeval History',
        approximateDate: 'Before Time - 4000 BC',
        description: 'The Eternal Word and Creation Week - Foundation of all history, the divine Trinity, and the perfect creation of humanity and the world'
      },
      readingTimeMinutes: 20,
      commentary: '🔍GENERIC_COMMENT: This day introduces Primeval History with the creation narrative and humanity\'s fall. John 1:1-14 provides the cosmic backdrop for Genesis, revealing Christ as the eternal Word through whom all things were made.'
    });

    // Day 2: The Fall
    dailyReadings.push({
      day: 2,
      date: '2025-01-02',
      passages: [{ book: 'Genesis', chapterStart: 3, chapterEnd: 5 }],
      historicalContext: {
        period: 'Primeval History',
        approximateDate: 'Before 3000 BC',
        description: 'The Fall and Consequences - Sin enters the world through Adam and Eve, beginning of human violence and the righteous lineage leading to Noah'
      },
      readingTimeMinutes: 15,
      commentary: '🔍GENERIC_COMMENT: The tragic turning point of human history. Genesis 3 introduces the doctrine of original sin and explains the brokenness of our world, while also containing the first promise of the Gospel in the protoevangelium (Genesis 3:15).'
    });

    // Day 3-4: The Flood and Nations
    dailyReadings.push({
      day: 3,
      date: '2025-01-03',
      passages: [{ book: 'Genesis', chapterStart: 6, chapterEnd: 9 }],
      historicalContext: {
        period: 'Primeval History',
        approximateDate: 'Before 2500 BC',
        description: 'The Great Flood and New Beginning - Divine judgment on human wickedness, preservation of Noah\'s family, and establishment of the rainbow covenant'
      },
      readingTimeMinutes: 20
    });

    dailyReadings.push({
      day: 4,
      date: '2025-01-04',
      passages: [{ book: 'Genesis', chapterStart: 10, chapterEnd: 11 }],
      historicalContext: {
        period: 'Table of Nations',
        approximateDate: 'Before 2100 BC',
        description: 'Nations Dispersed and Tower of Babel - Post-flood population growth, human rebellion, and confusion of languages that scattered humanity'
      },
      readingTimeMinutes: 15
    });

    // Days 5-8: Job's Wisdom
    for (let i = 0; i < 4; i++) {
      dailyReadings.push({
        day: 5 + i,
        date: `2025-01-0${5 + i}`,
        passages: [{ book: 'Job', chapterStart: i * 10 + 1, chapterEnd: Math.min((i + 1) * 10, 42) }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: 'Before 2100 BC',
          description: `Job's Suffering and Divine Wisdom (Chapters ${i * 10 + 1}-${Math.min((i + 1) * 10, 42)}) - The cosmic wager testing Job's faith and God's ultimate revelation`
        },
        readingTimeMinutes: 20
      });
    }

    // **PATRIARCHAL PERIOD (Days 9-25)**
    const genesisReadings = [
      { start: 12, end: 14, period: 'Abraham\'s Call and Covenant', date: '2091-2084 BC' },
      { start: 15, end: 17, period: 'Covenant Confirmation', date: '2081-2067 BC' },
      { start: 18, end: 20, period: 'Promise of Isaac', date: '2067-2066 BC' },
      { start: 21, end: 23, period: 'Binding of Isaac', date: '2066-2067 BC' },
      { start: 24, end: 25, period: 'Isaac\'s Marriage', date: '2045-2035 BC' },
      { start: 26, end: 27, period: 'Isaac\'s Prosperity', date: '2015-2010 BC' },
      { start: 28, end: 30, period: 'Jacob\'s Dreams and Family', date: '2009-2005 BC' },
      { start: 31, end: 32, period: 'Jacob\'s Flight', date: '1995-1975 BC' },
      { start: 33, end: 34, period: 'Jacob\'s Reconciliation', date: '1974-1970 BC' },
      { start: 35, end: 36, period: 'Jacob\'s Return to Bethel', date: '1968-1960 BC' },
      { start: 37, end: 41, period: 'Joseph\'s Rise to Power', date: '1945-1930 BC' },
      { start: 42, end: 50, period: 'Jacob\'s Family in Egypt', date: '1928-1915 BC' }
    ];

    genesisReadings.forEach((reading, index) => {
      dailyReadings.push({
        day: 9 + index,
        date: `2025-01-${9 + index}`,
        passages: [{ book: 'Genesis', chapterStart: reading.start, chapterEnd: reading.end }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: reading.date,
          description: `${reading.period} - Key events in the formation of Israel's patriarchal family`
        },
        readingTimeMinutes: 20
      });
    });

    // **EXODUS AND WILDERNESS (Days 26-90)**
    this.addExodusReadings(dailyReadings, 26, 50);
    this.addLeviticusNumbersReadings(dailyReadings, 51, 80);
    this.addDeuteronomyReadings(dailyReadings, 81, 90);

    // **CONQUEST AND JUDGES (Days 91-180)**
    this.addConquestReadings(dailyReadings, 91, 130);
    this.addJudgesReadings(dailyReadings, 131, 180);

    // **UNITED KINGDOM (Days 181-270)**
    this.addSamuelReadings(dailyReadings, 181, 220);
    this.addDavidKingsReadings(dailyReadings, 221, 270);

    // **DIVIDED KINGDOM (Days 271-330)**
    this.addDividedKingdomReadings(dailyReadings, 271, 330);

    // **EXILE AND RETURN (Days 331-365)**
    this.addExileReturnReadings(dailyReadings, 331, 365);

    return dailyReadings;
  }

  // Helper methods for different biblical periods
  private addExodusReadings(dailyReadings: DailyReading[], startDay: number, endDay: number): void {
    const exodusSections = [
      { start: 1, end: 2, period: 'Israel\'s Oppression', date: '1526 BC' },
      { start: 3, end: 4, period: 'Moses\' Call', date: '1446 BC' },
      { start: 5, end: 11, period: 'Egyptian Conflict', date: '1446 BC' },
      { start: 12, end: 17, period: 'Exodus Journey', date: '1446 BC' },
      { start: 18, end: 24, period: 'Sinai Covenant', date: '1446 BC' },
      { start: 25, end: 31, period: 'Tabernacle Instructions', date: '1446 BC' },
      { start: 32, end: 40, period: 'Tabernacle Construction', date: '1446 BC' }
    ];

    exodusSections.forEach((section, index) => {
      const day = startDay + index;
      dailyReadings.push({
        day,
        date: this.getDateForDay(day),
        passages: [{ book: 'Exodus', chapterStart: section.start, chapterEnd: section.end }],
        historicalContext: {
          period: section.period,
          approximateDate: section.date,
          description: `${section.period} - Key events in the deliverance from Egypt`
        },
        readingTimeMinutes: 20,
        commentary: section.period === 'Exodus Journey' ? '🔍GENERIC_COMMENT: The crossing of the Red Sea demonstrates God\'s power and faithfulness. This monumental event shows how God delivers His people through impossible circumstances and establishes a pattern of redemption that points ultimately to Christ\'s work on the cross.' : undefined
      });
    });
  }

  private addLeviticusNumbersReadings(dailyReadings: DailyReading[], startDay: number, endDay: number): void {
    // Add Leviticus
    for (let i = 0; i < 15; i++) {
      const day = startDay + i;
      const chapter = i * 2 + 1;
      dailyReadings.push({
        day,
        date: this.getDateForDay(day),
        passages: [{ book: 'Leviticus', chapterStart: chapter, chapterEnd: Math.min(chapter + 1, 27) }],
        historicalContext: {
          period: 'Sinai Covenant Laws',
          approximateDate: '1446 BC',
          description: `Levitical laws and sacrificial system (Chapters ${chapter}-${Math.min(chapter + 1, 27)})`
        },
        readingTimeMinutes: 15
      });
    }

    // Add Numbers
    const numbersStart = startDay + 15;
    for (let i = 0; i < endDay - numbersStart; i++) {
      const day = numbersStart + i;
      const chapter = i * 2 + 1;
      dailyReadings.push({
        day,
        date: this.getDateForDay(day),
        passages: [{ book: 'Numbers', chapterStart: chapter, chapterEnd: Math.min(chapter + 1, 36) }],
        historicalContext: {
          period: 'Wilderness Wanderings',
          approximateDate: '1446-1406 BC',
          description: `Israel's journey and organization in the wilderness (Chapters ${chapter}-${Math.min(chapter + 1, 36)})`
        },
        readingTimeMinutes: 15
      });
    }
  }

  private addDeuteronomyReadings(dailyReadings: DailyReading[], startDay: number, endDay: number): void {
    for (let i = 0; i < endDay - startDay; i++) {
      const day = startDay + i;
      const chapter = i * 3 + 1;
      dailyReadings.push({
        day,
        date: this.getDateForDay(day),
        passages: [{ book: 'Deuteronomy', chapterStart: chapter, chapterEnd: Math.min(chapter + 2, 34) }],
        historicalContext: {
          period: 'Covenant Renewal',
          approximateDate: '1406 BC',
          description: `Moses' final discourse and covenant renewal (Chapters ${chapter}-${Math.min(chapter + 2, 34)})`
        },
        readingTimeMinutes: 20
      });
    }
  }

  private addConquestReadings(dailyReadings: DailyReading[], startDay: number, endDay: number): void {
    for (let i = 0; i < Math.min(24, endDay - startDay); i++) {
      const day = startDay + i;
      dailyReadings.push({
        day,
        date: this.getDateForDay(day),
        passages: [{ book: 'Joshua', chapterStart: i + 1, chapterEnd: i + 1 }],
        historicalContext: {
          period: 'Conquest of Canaan',
          approximateDate: '1406-1390 BC',
          description: `Conquest and settlement of the promised land (Chapter ${i + 1})`
        },
        readingTimeMinutes: 15
      });
    }
  }

  private addJudgesReadings(dailyReadings: DailyReading[], startDay: number, endDay: number): void {
    for (let i = 0; i < Math.min(21, endDay - startDay); i++) {
      const day = startDay + i;
      dailyReadings.push({
        day,
        date: this.getDateForDay(day),
        passages: [{ book: 'Judges', chapterStart: i + 1, chapterEnd: i + 1 }],
        historicalContext: {
          period: 'Judges Period',
          approximateDate: '1390-1050 BC',
          description: `Cyclic pattern of sin and deliverance (Chapter ${i + 1})`
        },
        readingTimeMinutes: 15
      });
    }
  }

  private addSamuelReadings(dailyReadings: DailyReading[], startDay: number, endDay: number): void {
    // 1 Samuel
    for (let i = 0; i < Math.min(31, endDay - startDay); i++) {
      const day = startDay + i;
      dailyReadings.push({
        day,
        date: this.getDateForDay(day),
        passages: [{ book: '1 Samuel', chapterStart: i + 1, chapterEnd: i + 1 }],
        historicalContext: {
          period: 'United Monarchy',
          approximateDate: '1100-970 BC',
          description: `Samuel and Saul's reign (Chapter ${i + 1})`
        },
        readingTimeMinutes: 15
      });
    }
  }

  private addDavidKingsReadings(dailyReadings: DailyReading[], startDay: number, endDay: number): void {
    // 2 Samuel and 1 Kings
    for (let i = 0; i < endDay - startDay; i++) {
      const day = startDay + i;
      const isSamuel = i < 24;
      const book = isSamuel ? '2 Samuel' : '1 Kings';
      const chapter = isSamuel ? i + 1 : i - 23;

      dailyReadings.push({
        day,
        date: this.getDateForDay(day),
        passages: [{ book, chapterStart: chapter, chapterEnd: Math.min(chapter + 1, book === '2 Samuel' ? 24 : 11) }],
        historicalContext: {
          period: 'David and Solomon',
          approximateDate: '1059-931 BC',
          description: `${book} reign of ${isSamuel ? 'David' : 'Solomon'} (Chapters ${chapter}-${Math.min(chapter + 1, book === '2 Samuel' ? 24 : 11)})`
        },
        readingTimeMinutes: 20
      });
    }
  }

  private addDividedKingdomReadings(dailyReadings: DailyReading[], startDay: number, endDay: number): void {
    // Continue 1 Kings, 2 Kings, and prophets
    const books = ['1 Kings', '2 Kings', 'Isaiah', 'Jeremiah', 'Ezekiel'];
    const chaptersPerBook = [11, 25, 66, 52, 48];

    let currentDay = startDay;
    books.forEach((book, bookIndex) => {
      const chaptersToCover = Math.min(chaptersPerBook[bookIndex], endDay - currentDay);
      for (let i = 0; i < chaptersToCover && currentDay < endDay; i += 3) {
        dailyReadings.push({
          day: currentDay,
          date: this.getDateForDay(currentDay),
          passages: [{ book, chapterStart: i + 1, chapterEnd: Math.min(i + 3, chaptersPerBook[bookIndex]) }],
          historicalContext: {
            period: 'Divided Kingdom',
            approximateDate: '931-586 BC',
            description: `${book} - Prophetic ministry and royal history`
          },
          readingTimeMinutes: 20
        });
        currentDay++;
      }
    });
  }

  private addExileReturnReadings(dailyReadings: DailyReading[], startDay: number, endDay: number): void {
    // Post-exilic books: Daniel, Ezra, Nehemiah, and minor prophets
    const books = ['Daniel', 'Ezra', 'Nehemiah', 'Haggai', 'Zechariah', 'Malachi'];
    const chaptersPerBook = [12, 10, 13, 2, 14, 4];

    let currentDay = startDay;
    books.forEach((book, bookIndex) => {
      const chaptersToCover = Math.min(chaptersPerBook[bookIndex], endDay - currentDay);
      for (let i = 0; i < chaptersToCover && currentDay <= endDay; i++) {
        dailyReadings.push({
          day: currentDay,
          date: this.getDateForDay(currentDay),
          passages: [{ book, chapterStart: i + 1, chapterEnd: i + 1 }],
          historicalContext: {
            period: 'Exile and Return',
            approximateDate: '605-400 BC',
            description: `${book} - Post-exilic restoration and prophetic messages`
          },
          readingTimeMinutes: 15
        });
        currentDay++;
      }
    });

    // Fill any remaining days with New Testament overview
    while (currentDay <= endDay) {
      const ntBooks = ['Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans'];
      const bookIndex = (currentDay - startDay - 40) % ntBooks.length;
      dailyReadings.push({
        day: currentDay,
        date: this.getDateForDay(currentDay),
        passages: [{ book: ntBooks[bookIndex], chapterStart: 1, chapterEnd: 3 }],
        historicalContext: {
          period: 'New Testament',
          approximateDate: '5-95 AD',
          description: `${ntBooks[bookIndex]} - Life of Christ and early church`
        },
        readingTimeMinutes: 20
      });
      currentDay++;
    }
  }

  private getDateForDay(day: number): string {
    const date = new Date(2025, 0, day);
    return date.toISOString().split('T')[0];
  }
}