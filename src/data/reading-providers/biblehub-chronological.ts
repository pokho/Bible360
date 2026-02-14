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
      historicalContext: reading.historicalContext || this.getHistoricalContext(reading.day, reading.passages),
      commentary: reading.commentary
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
      commentary: '👨🏾‍💻 Paul\'s Recommendation: The TPT (The Passion Translation) version of Genesis is highly recommended, especially Genesis 2, which beautifully portrays the intimacy of God\'s relationship with humanity. Read it here: https://www.bible.com/bible/1849/GEN.2.TPT'
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
      commentary: '📜 FROM PAUL: When reading Genesis 5 which outlines the genealogy of Adam and Eve until Noah, it is useful also to remember the full genealogy until Jesus - and remember/recognise/value all the people, the men and women leading up to the coming of the Lord and Saviour. We find some of their names in Matthew 1 and Luke 3.\n\nFrom Adam to David (Common Lineage): God → Adam and Eve (Eve means LIFE-GIVER) → Seth (Abel means VANITY, Seth means SUBSTITUTE/in-place-of) → Enosh → Cainan → Mahalalel → Jared → Enoch (DEDICATED to God) → Methuselah → Lamech → Noah (means REST) → Shem → Arphaxad → Cainan → Shelah → Eber → Peleg → Reu → Serug → Nahor → Terah → Abraham and Sarah → Isaac and Rebekah (Rebekah means "captivated by her beauty") → Jacob → Judah and Tamar → Perez (BREACH) → Hezron → Ram → Amminadab → Nahshon → Salmon (means CLOTHES) and Rahab (was a prostitute) → Boaz and Ruth (Ruth means FRIEND) → Obed → Jesse → David and Bathsheba (Bathsheba means DAUGHTER-OF-AN-OATH).\n\nThe Royal Line (through Solomon per Matthew 1): Solomon → Rehoboam → ... → Joseph → Jesus (God and Mary, raised by Joseph. Mary comes from old-Hebrew word Miriam S4813 meaning REBELLIOUS).\n\nLuke\'s Line (through Nathan): Nathan → Mattatha → ... → Joseph → Jesus (God and Mary, raised by Joseph. Mary comes from old-Hebrew word Miriam S4813 meaning REBELLIOUS).',
      commentaryType: 'paul'
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
      readingTimeMinutes: 20,
      commentary: '👨🏾‍💻 Paul\'s Commentary: ROMANS 11:36 (AMP) — "For from Him [all things originate] and through Him [all things exist and are sustained] and to Him are all things [directed]. All things originate from Him and exist through Him, and all things find their purpose and completion in Him. To Him be the glory forever! Amen."\n\nThis verse captures the cosmic reality that everything is FROM Christ, THROUGH Christ, and FOR Christ. This connects beautifully to today\'s reading of Genesis 6-9.\n\nJohn 1:1 ("In the beginning was the Word") parallels Genesis 1:1 ("In the beginning God created"). The Word who became flesh (John 1:14) is the eternal Son, present at creation, through whom all things were made (John 1:3, Colossians 1:16-17). So when Genesis speaks of God creating, judging, and covenanting—we are seeing the triune God at work, with the Son as the divine agent of creation and redemption.\n\nTHE ARK AS A TYPE OF CHRIST: Just as the ark was the ONLY vessel of salvation from the flood waters, Jesus is the ONLY way to the Father (John 14:6). Inside the ark = salvation; outside = destruction. The ark had ONE door (John 10:9: "I am the door"). The pitch covering the ark inside and out was "kaphar" in Hebrew—the same word for ATONEMENT. Christ is our atonement, covering us from judgment.\n\nNOAH AS A TYPE OF CHRIST: Noah was "righteous" and "found favor" (grace) in God\'s eyes (Genesis 6:8-9), pointing to the truly Righteous One who brings salvation. Noah saved his family through the judgment; Christ saves His people through divine wrath.\n\nTHE DOVE AND OLIVE BRANCH: The dove returning with the olive leaf (Genesis 8:11) signaled new life after judgment. The Holy Spirit descended "like a dove" at Jesus\' baptism (Matthew 3:16), and Jesus is our peace (Ephesians 2:14)—the olive branch of reconciliation between God and humanity.\n\nTHE COVENANT SIGN: God established a covenant with the rainbow as its sign (Genesis 9:12-17), pointing forward to the New Covenant in Christ\'s blood (Luke 22:20)—a promise of eternal salvation rather than destruction.\n\n1 Peter 3:20-21 makes this explicit: the flood waters "symbolize baptism that now saves you also." The flood prefigured baptism into Christ\'s death and resurrection—the ultimate washing that brings salvation.',
      commentaryType: 'paul',
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

    // Days 5-13: Job's Wisdom (3-4 chapters per day)
    const jobReadings = [
      { start: 1, end: 4, period: 'Job\'s Initial Testing and Friends\' Arrival', description: 'Job\'s righteousness, Satan\'s challenge, and the arrival of his friends who initially sit in silence' },
      { start: 5, end: 8, period: 'First Cycle of Debate', description: 'Eliphaz\'s first speech and Job\'s response - the beginning of the theological debate' },
      { start: 9, end: 12, period: 'Second Cycle of Debate', description: 'Bildad and Zophar speak, with Job\'s passionate defense of his integrity' },
      { start: 13, end: 16, period: 'Third Cycle of Debate', description: 'More intense debate as Job cries out for a mediator and his friends grow harsher' },
      { start: 17, end: 20, period: 'Job\'s Final Defense', description: 'Job\'s oath of innocence and his lament of days gone by' },
      { start: 21, end: 25, period: 'Elihu\'s Wisdom', description: 'The young Elihu speaks with divine insight, preparing for God\'s appearance' },
      { start: 26, end: 29, period: 'God\'s First Speech', description: 'God speaks from the whirlwind, questioning Job about creation and natural order' },
      { start: 30, end: 33, period: 'God\'s Second Speech and Job\'s Reply', description: 'God challenges Job\'s wisdom, Job humbles himself' },
      { start: 34, end: 37, period: 'Job\'s Restoration', description: 'Job is humbled and then his fortunes are restored and blessed' },
      { start: 38, end: 42, period: 'Job\'s Final Blessing', description: 'Job\'s fortunes are restored, his family is blessed, and he dies in old age' }
    ];

    jobReadings.forEach((reading, index) => {
      dailyReadings.push({
        day: 5 + index,
        date: `2025-01-0${5 + index}`,
        passages: [{ book: 'Job', chapterStart: reading.start, chapterEnd: reading.end }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: 'Before 2100 BC',
          description: `${reading.period} (Chapters ${reading.start}-${reading.end}) - ${reading.description}`
        },
        readingTimeMinutes: 20
      });
    });

    // **PATRIARCHAL PERIOD (Days 14-27)** - Expand to better distribute 39 chapters
    const genesisReadings = [
      { start: 12, end: 14, period: 'Abraham\'s Call and Covenant', date: '2091-2084 BC' },
      { start: 15, end: 17, period: 'Covenant Confirmation', date: '2081-2067 BC' },
      { start: 18, end: 20, period: 'Promise of Isaac', date: '2067-2066 BC' },
      { start: 21, end: 23, period: 'Binding of Isaac', date: '2066-2067 BC' },
      { start: 24, end: 26, period: 'Isaac\'s Marriage and Jacob\'s Birth', date: '2045-2035 BC' },
      { start: 27, end: 28, period: 'Isaac\'s Prosperity', date: '2015-2010 BC' },
      { start: 29, end: 31, period: 'Jacob\'s Dreams and Family', date: '2009-2005 BC' },
      { start: 32, end: 33, period: 'Jacob\'s Flight and Laban', date: '1995-1975 BC' },
      { start: 34, end: 35, period: 'Jacob\'s Reconciliation', date: '1974-1970 BC' },
      { start: 36, end: 37, period: 'Jacob\'s Return', date: '1974-1970 BC' },
      { start: 38, end: 40, period: 'Joseph\'s Rise to Power', date: '1945-1930 BC' },
      { start: 41, end: 43, period: 'Joseph\'s Administration', date: '1930-1925 BC' },
      { start: 44, end: 46, period: 'Joseph\'s Famine Relief', date: '1930-1925 BC' },
      { start: 47, end: 50, period: 'Jacob\'s Family in Egypt', date: '1928-1915 BC' }
    ];

    genesisReadings.forEach((reading, index) => {
      dailyReadings.push({
        day: 14 + index,
        date: `2025-01-${14 + index}`,
        passages: [{ book: 'Genesis', chapterStart: reading.start, chapterEnd: reading.end }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: reading.date,
          description: `${reading.period} - Key events in the formation of Israel's patriarchal family`
        },
        readingTimeMinutes: 20
      });
    });

    // **EXODUS AND WILDERNESS (Days 28-92)**
    this.addExodusReadings(dailyReadings, 28, 39);
    this.addLeviticusNumbersReadings(dailyReadings, 40, 82);
    this.addDeuteronomyReadings(dailyReadings, 83, 92);

    // **CONQUEST AND JUDGES (Days 93-142)**
    this.addConquestReadings(dailyReadings, 93, 117);
    this.addRuthReadings(dailyReadings, 118, 122);
    this.addJudgesReadings(dailyReadings, 123, 142);

    // **UNITED KINGDOM (Days 143-232)**
    this.addSamuelReadings(dailyReadings, 143, 182);
    this.addDavidKingsReadings(dailyReadings, 183, 212);
    this.addPsalmsReadings(dailyReadings, 213, 262);

    // **DIVIDED KINGDOM (Days 263-282)**
    this.addDividedKingdomReadings(dailyReadings, 263, 282);

    // **PROPHETS (Days 283-322)**
    this.addProphetsReadings(dailyReadings, 283, 322);

    // **EXILE AND RETURN (Days 323-342)** - Reduced to make room for expanded NT
    this.addExileReturnReadings(dailyReadings, 323, 342);

    // **NEW TESTAMENT (Days 343-365)** - Expanded to 23 days for reasonable reading pace
    this.addNewTestamentReadings(dailyReadings, 343, 365);

    return dailyReadings;
  }

  // Helper methods for different biblical periods
  private addExodusReadings(dailyReadings: DailyReading[], startDay: number, endDay: number): void {
    const exodusSections = [
      { start: 1, end: 2, period: 'Israel\'s Oppression', date: '1526 BC' },
      { start: 3, end: 4, period: 'Moses\' Call', date: '1446 BC' },
      { start: 5, end: 7, period: 'Egyptian Conflict - Beginnings', date: '1446 BC' },
      { start: 8, end: 11, period: 'Egyptian Conflict - Plagues', date: '1446 BC' },
      { start: 12, end: 14, period: 'Exodus Journey - Departure', date: '1446 BC' },
      { start: 15, end: 17, period: 'Exodus Journey - Wilderness', date: '1446 BC' },
      { start: 18, end: 20, period: 'Sinai Covenant - Arrival', date: '1446 BC' },
      { start: 21, end: 24, period: 'Sinai Covenant - Laws', date: '1446 BC' },
      { start: 25, end: 27, period: 'Tabernacle Instructions - Offerings', date: '1446 BC' },
      { start: 28, end: 31, period: 'Tabernacle Instructions - Priesthood', date: '1446 BC' },
      { start: 32, end: 35, period: 'Tabernacle Construction - Structure', date: '1446 BC' },
      { start: 36, end: 40, period: 'Tabernacle Construction - Completion', date: '1446 BC' }
    ];

    exodusSections.forEach((section, index) => {
      const day = startDay + index;
      if (day <= endDay) {
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
          commentary: section.period.includes('Exodus Journey') ? '🔍GENERIC_COMMENT: The crossing of the Red Sea demonstrates God\'s power and faithfulness. This monumental event shows how God delivers His people through impossible circumstances and establishes a pattern of redemption that points ultimately to Christ\'s work on the cross.' : undefined
        });
      }
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
    // Days 81-89: 3 chapters each (27 chapters total)
    for (let i = 0; i < 9; i++) {
      const day = startDay + i;
      const chapter = i * 3 + 1;
      dailyReadings.push({
        day,
        date: this.getDateForDay(day),
        passages: [{ book: 'Deuteronomy', chapterStart: chapter, chapterEnd: chapter + 2 }],
        historicalContext: {
          period: 'Covenant Renewal',
          approximateDate: '1406 BC',
          description: `Moses' final discourse and covenant renewal (Chapters ${chapter}-${chapter + 2})`
        },
        readingTimeMinutes: 20
      });
    }

    // Day 90: Remaining chapters (28-34)
    dailyReadings.push({
      day: 90,
      date: this.getDateForDay(90),
      passages: [{ book: 'Deuteronomy', chapterStart: 28, chapterEnd: 34 }],
      historicalContext: {
        period: 'Covenant Renewal - Final Blessings',
        approximateDate: '1406 BC',
        description: 'Moses\' final blessings, death, and succession of Joshua - Conclusion of the Pentateuch'
      },
      readingTimeMinutes: 25,
      commentary: '🔍GENERIC_COMMENT: This marks the conclusion of the Pentateuch! Moses reviews the covenant, gives his final blessings to the tribes, and dies on Mount Nebo. The leadership transitions to Joshua, setting the stage for the conquest of Canaan. This moment represents both an ending and a new beginning for Israel.'
    });
  }

  private addConquestReadings(dailyReadings: DailyReading[], startDay: number, endDay: number): void {
    // Joshua has 24 chapters, create daily readings
    const chaptersPerDay = Math.ceil(24 / (endDay - startDay + 1));
    for (let day = startDay, chapter = 1; day <= endDay && chapter <= 24; day++) {
      const endChapter = Math.min(chapter + chaptersPerDay - 1, 24);
      dailyReadings.push({
        day,
        date: this.getDateForDay(day),
        passages: [{ book: 'Joshua', chapterStart: chapter, chapterEnd: endChapter }],
        historicalContext: {
          period: 'Conquest of Canaan',
          approximateDate: '1406-1390 BC',
          description: `Conquest and settlement of the promised land (Chapters ${chapter}-${endChapter})`
        },
        readingTimeMinutes: 15
      });
      chapter = endChapter + 1;
    }
  }

  private addRuthReadings(dailyReadings: DailyReading[], startDay: number, endDay: number): void {
    // Ruth has 4 chapters, can read in sections over these days
    dailyReadings.push({
      day: startDay,
      date: this.getDateForDay(startDay),
      passages: [{ book: 'Ruth', chapterStart: 1, chapterEnd: 2 }],
      historicalContext: {
        period: 'Judges Period',
        approximateDate: '1150 BC',
        description: 'Ruth\'s loyalty and journey to Bethlehem - A story of faithfulness in dark times'
      },
      readingTimeMinutes: 15
    });

    dailyReadings.push({
      day: startDay + 1,
      date: this.getDateForDay(startDay + 1),
      passages: [{ book: 'Ruth', chapterStart: 3, chapterEnd: 4 }],
      historicalContext: {
        period: 'Judges Period',
        approximateDate: '1150 BC',
        description: 'Ruth and Boaz at the threshing floor - Redemption and marriage, leading to King David\'s lineage'
      },
      readingTimeMinutes: 15
    });

    // Fill remaining days with 1 Chronicles chapters 1-9 (genealogies)
    for (let day = startDay + 2, chapter = 1; day <= endDay && chapter <= 9; day++, chapter++) {
      dailyReadings.push({
        day,
        date: this.getDateForDay(day),
        passages: [{ book: '1 Chronicles', chapterStart: chapter, chapterEnd: chapter }],
        historicalContext: {
          period: 'Priestly Record',
          approximateDate: '500 BC',
          description: `Genealogical records and tribal arrangements (Chapter ${chapter})`
        },
        readingTimeMinutes: 15
      });
    }
  }

  private addJudgesReadings(dailyReadings: DailyReading[], startDay: number, endDay: number): void {
    // Judges has 21 chapters
    const chaptersPerDay = Math.ceil(21 / (endDay - startDay + 1));
    for (let day = startDay, chapter = 1; day <= endDay && chapter <= 21; day++) {
      const endChapter = Math.min(chapter + chaptersPerDay - 1, 21);
      dailyReadings.push({
        day,
        date: this.getDateForDay(day),
        passages: [{ book: 'Judges', chapterStart: chapter, chapterEnd: endChapter }],
        historicalContext: {
          period: 'Judges Period',
          approximateDate: '1390-1050 BC',
          description: `Cyclic pattern of sin and deliverance (Chapters ${chapter}-${endChapter})`
        },
        readingTimeMinutes: 15
      });
      chapter = endChapter + 1;
    }
  }

  private addSamuelReadings(dailyReadings: DailyReading[], startDay: number, endDay: number): void {
    // 1 Samuel has 31 chapters, read at 1-2 chapters per day
    const chaptersPerDay = 2;
    for (let day = startDay, chapter = 1; day <= endDay && chapter <= 31; day++) {
      const endChapter = Math.min(chapter + chaptersPerDay - 1, 31);
      dailyReadings.push({
        day,
        date: this.getDateForDay(day),
        passages: [{ book: '1 Samuel', chapterStart: chapter, chapterEnd: endChapter }],
        historicalContext: {
          period: 'United Monarchy',
          approximateDate: '1100-970 BC',
          description: `Samuel and Saul's reign (Chapters ${chapter}-${endChapter})`
        },
        readingTimeMinutes: 15
      });
      chapter = endChapter + 1;
    }
  }

  private addDavidKingsReadings(dailyReadings: DailyReading[], startDay: number, endDay: number): void {
    // 2 Samuel (24 chapters) and 1 Kings (11 chapters, Solomon portion)
    const chaptersPerDay = 2;
    let currentDay = startDay;

    // 2 Samuel first
    for (let chapter = 1; chapter <= 24 && currentDay <= endDay; chapter += chaptersPerDay) {
      const endChapter = Math.min(chapter + chaptersPerDay - 1, 24);
      dailyReadings.push({
        day: currentDay,
        date: this.getDateForDay(currentDay),
        passages: [{ book: '2 Samuel', chapterStart: chapter, chapterEnd: endChapter }],
        historicalContext: {
          period: 'David\'s Reign',
          approximateDate: '1059-970 BC',
          description: `King David's reign and challenges (Chapters ${chapter}-${endChapter})`
        },
        readingTimeMinutes: 20
      });
      currentDay++;
    }

    // 1 Kings 1-11 (Solomon)
    for (let chapter = 1; chapter <= 11 && currentDay <= endDay; chapter += chaptersPerDay) {
      const endChapter = Math.min(chapter + chaptersPerDay - 1, 11);
      dailyReadings.push({
        day: currentDay,
        date: this.getDateForDay(currentDay),
        passages: [{ book: '1 Kings', chapterStart: chapter, chapterEnd: endChapter }],
        historicalContext: {
          period: 'Solomon\'s Reign',
          approximateDate: '970-931 BC',
          description: `King Solomon's wisdom and temple building (Chapters ${chapter}-${endChapter})`
        },
        readingTimeMinutes: 20
      });
      currentDay++;
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

  private addPsalmsReadings(dailyReadings: DailyReading[], startDay: number, endDay: number): void {
    // Psalms has 150 chapters, divide evenly
    const chaptersPerDay = Math.ceil(150 / (endDay - startDay + 1));
    for (let day = startDay, chapter = 1; day <= endDay && chapter <= 150; day++) {
      const endChapter = Math.min(chapter + chaptersPerDay - 1, 150);
      dailyReadings.push({
        day,
        date: this.getDateForDay(day),
        passages: [{ book: 'Psalms', chapterStart: chapter, chapterEnd: endChapter }],
        historicalContext: {
          period: 'Wisdom Literature',
          approximateDate: '1000-500 BC',
          description: `Songs and prayers of ancient Israel (Psalms ${chapter}-${endChapter})`
        },
        readingTimeMinutes: 20
      });
      chapter = endChapter + 1;
    }
  }

  private addProphetsReadings(dailyReadings: DailyReading[], startDay: number, endDay: number): void {
    // Major and minor prophets
    const prophets = [
      { book: 'Isaiah', chapters: 66, period: 'Assyrian Period', date: '740-700 BC' },
      { book: 'Jeremiah', chapters: 52, period: 'Pre-Exilic', date: '627-586 BC' },
      { book: 'Lamentations', chapters: 5, period: 'Fall of Jerusalem', date: '586 BC' },
      { book: 'Ezekiel', chapters: 48, period: 'Exilic', date: '593-571 BC' },
      { book: 'Daniel', chapters: 12, period: 'Exilic', date: '605-535 BC' },
      { book: 'Hosea', chapters: 14, period: 'Pre-Exilic', date: '755-715 BC' },
      { book: 'Joel', chapters: 3, period: 'Post-Exilic', date: '500 BC' },
      { book: 'Amos', chapters: 9, period: 'Pre-Exilic', date: '760-750 BC' },
      { book: 'Obadiah', chapters: 1, period: 'Post-Exilic', date: '586 BC' },
      { book: 'Jonah', chapters: 4, period: 'Pre-Exilic', date: '760 BC' },
      { book: 'Micah', chapters: 7, period: 'Pre-Exilic', date: '735-700 BC' },
      { book: 'Nahum', chapters: 3, period: 'Pre-Exilic', date: '663-612 BC' },
      { book: 'Habakkuk', chapters: 3, period: 'Pre-Exilic', date: '610-605 BC' },
      { book: 'Zephaniah', chapters: 3, period: 'Pre-Exilic', date: '640-621 BC' },
      { book: 'Haggai', chapters: 2, period: 'Post-Exilic', date: '520 BC' },
      { book: 'Zechariah', chapters: 14, period: 'Post-Exilic', date: '520-518 BC' },
      { book: 'Malachi', chapters: 4, period: 'Post-Exilic', date: '433-424 BC' }
    ];

    let currentDay = startDay;
    const chaptersPerDay = 3;

    prophets.forEach(prophet => {
      for (let chapter = 1; chapter <= prophet.chapters && currentDay <= endDay; chapter += chaptersPerDay) {
        const endChapter = Math.min(chapter + chaptersPerDay - 1, prophet.chapters);
        dailyReadings.push({
          day: currentDay,
          date: this.getDateForDay(currentDay),
          passages: [{ book: prophet.book, chapterStart: chapter, chapterEnd: endChapter }],
          historicalContext: {
            period: prophet.period,
            approximateDate: prophet.date,
            description: `${prophet.book} - Prophetic ministry and message (Chapters ${chapter}-${endChapter})`
          },
          readingTimeMinutes: 20
        });
        currentDay++;
      }
    });
  }

  private addExileReturnReadings(dailyReadings: DailyReading[], startDay: number, endDay: number): void {
    // Post-exilic books: Ezra, Nehemiah, Esther
    const books = [
      { book: 'Ezra', chapters: 10, period: 'Return from Exile', date: '538-457 BC' },
      { book: 'Nehemiah', chapters: 13, period: 'Rebuilding Jerusalem', date: '445-433 BC' },
      { book: 'Esther', chapters: 10, period: 'Persian Empire', date: '483-473 BC' }
    ];

    let currentDay = startDay;
    const chaptersPerDay = 2;

    books.forEach(bookInfo => {
      for (let chapter = 1; chapter <= bookInfo.chapters && currentDay <= endDay; chapter += chaptersPerDay) {
        const endChapter = Math.min(chapter + chaptersPerDay - 1, bookInfo.chapters);
        dailyReadings.push({
          day: currentDay,
          date: this.getDateForDay(currentDay),
          passages: [{ book: bookInfo.book, chapterStart: chapter, chapterEnd: endChapter }],
          historicalContext: {
            period: bookInfo.period,
            approximateDate: bookInfo.date,
            description: `${bookInfo.book} - ${bookInfo.period} (Chapters ${chapter}-${endChapter})`
          },
          readingTimeMinutes: 15
        });
        currentDay++;
      }
    });
  }

  private addNewTestamentReadings(dailyReadings: DailyReading[], startDay: number, endDay: number): void {
    // Expanded to 23 days for better chapter distribution
    console.log(`Adding New Testament readings: Days ${startDay}-${endDay} (${endDay - startDay + 1} days)`);

    // Gospels first (Matthew-John = 89 chapters) - use 12 days
    const gospelBooks = [
      { book: 'Matthew', chapters: 28, period: 'Life of Christ', date: '26-30 AD' },
      { book: 'Mark', chapters: 16, period: 'Life of Christ', date: '26-30 AD' },
      { book: 'Luke', chapters: 24, period: 'Life of Christ', date: '26-30 AD' },
      { book: 'John', chapters: 21, period: 'Life of Christ', date: '26-30 AD' }
    ];

    let currentDay = startDay;
    const chaptersPerDay = 4; // Still challenging but better

    // Distribute Gospels across first 12 days
    gospelBooks.forEach(bookInfo => {
      const daysForBook = Math.ceil(bookInfo.chapters / chaptersPerDay);
      for (let dayOffset = 0; dayOffset < daysForBook && currentDay <= startDay + 11; dayOffset++) {
        const startChapter = dayOffset * chaptersPerDay + 1;
        const endChapter = Math.min(startChapter + chaptersPerDay - 1, bookInfo.chapters);
        dailyReadings.push({
          day: currentDay,
          date: this.getDateForDay(currentDay),
          passages: [{ book: bookInfo.book, chapterStart: startChapter, chapterEnd: endChapter }],
          historicalContext: {
            period: bookInfo.period,
            approximateDate: bookInfo.date,
            description: `${bookInfo.book} - ${bookInfo.period} (Chapters ${startChapter}-${endChapter})`
          },
          readingTimeMinutes: 30
        });
        currentDay++;
      }
    });

    // Acts and key Pauline letters (Days 355-363)
    const essentialBooks = [
      { book: 'Acts', chapters: 28, period: 'Early Church', date: '30-60 AD' },
      { book: 'Romans', chapters: 16, period: 'Pauline Ministry', date: '57-58 AD' },
      { book: '1 Corinthians', chapters: 16, period: 'Pauline Ministry', date: '55 AD' },
      { book: '2 Corinthians', chapters: 13, period: 'Pauline Ministry', date: '56 AD' },
      { book: 'Galatians', chapters: 6, period: 'Pauline Ministry', date: '49-50 AD' },
      { book: 'Ephesians', chapters: 6, period: 'Pauline Ministry', date: '61-63 AD' },
      { book: 'Philippians', chapters: 4, period: 'Pauline Ministry', date: '61-63 AD' },
      { book: 'Colossians', chapters: 4, period: 'Pauline Ministry', date: '61-63 AD' },
      { book: '1 Thessalonians', chapters: 5, period: 'Pauline Ministry', date: '51-52 AD' }
    ];

    essentialBooks.forEach(bookInfo => {
      if (currentDay <= endDay - 2) { // Save last 2 days for key epistles and Revelation
        const daysForBook = Math.max(1, Math.ceil(bookInfo.chapters / chaptersPerDay));
        for (let chapter = 1; chapter <= bookInfo.chapters && currentDay <= endDay - 2; chapter += chaptersPerDay) {
          const endChapter = Math.min(chapter + chaptersPerDay - 1, bookInfo.chapters);
          dailyReadings.push({
            day: currentDay,
            date: this.getDateForDay(currentDay),
            passages: [{ book: bookInfo.book, chapterStart: chapter, chapterEnd: endChapter }],
            historicalContext: {
              period: bookInfo.period,
              approximateDate: bookInfo.date,
              description: `${bookInfo.book} - ${bookInfo.period} (Chapters ${chapter}-${endChapter})`
            },
            readingTimeMinutes: 25
          });
          currentDay++;
        }
      }
    });

    // Key General Epistles and Revelation (Final 2 days)
    if (currentDay === 364) {
      dailyReadings.push({
        day: 364,
        date: this.getDateForDay(364),
        passages: [
          { book: 'Hebrews', chapterStart: 1, chapterEnd: 13 },
          { book: 'James', chapterStart: 1, chapterEnd: 5 },
          { book: '1 Peter', chapterStart: 1, chapterEnd: 5 }
        ],
        historicalContext: {
          period: 'General Epistles',
          approximateDate: '45-95 AD',
          description: 'Key General Epistles - Hebrews, James, and 1 Peter covering faith, works, and hope'
        },
        readingTimeMinutes: 35
      });
    }

    // Day 365 must end with Revelation
    dailyReadings.push({
      day: 365,
      date: this.getDateForDay(365),
      passages: [{ book: 'Revelation', chapterStart: 1, chapterEnd: 22 }],
      historicalContext: {
        period: 'Apocalypse',
        approximateDate: '95 AD',
        description: 'The grand finale - Revelation\'s complete revelation of Jesus Christ and the new creation'
      },
      readingTimeMinutes: 45,
      commentary: '🔍GENERIC_COMMENT: The grand finale of Scripture! Revelation presents the cosmic culmination of God\'s redemptive plan, the final victory over evil, and the establishment of the new heaven and new earth where God dwells with His people forever. The Alpha and Omega, the Beginning and the End, makes all things new!'
    });
  }

  private getDateForDay(day: number): string {
    const date = new Date(2025, 0, day);
    return date.toISOString().split('T')[0];
  }
}
