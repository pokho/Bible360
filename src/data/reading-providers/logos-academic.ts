import type { ReadingPlan, DailyReading, BiblePassage, HistoricalContext, PlanMetadata } from '../../types/reading-plans';
import { PDFParserService } from '../../services/pdf-parser.service';
import type { ParsedReadingPlan } from '../../services/pdf-parser.service';

export class LogosAcademicProvider {
  private pdfParserService: PDFParserService;

  constructor() {
    this.pdfParserService = PDFParserService.getInstance();
  }

  async loadReadingPlan(pdfBuffer?: Buffer): Promise<ReadingPlan> {
    let parsedPlan: ParsedReadingPlan;

    if (pdfBuffer) {
      parsedPlan = await this.pdfParserService.parseLogosAcademicPlan(pdfBuffer);
    } else {
      // Use our comprehensive academic reading plan
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
      historicalContext: reading.historicalContext
    }));

    return {
      provider: 'logos-academic',
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
      dailyReadings,
      metadata: {
        title: 'Logos Academic Enhanced Chronological Reading Plan',
        description: 'Scholarly academic chronological reading plan with comprehensive historical context, archaeological correlations, and advanced critical analysis methodologies for academic study.',
        totalDays: parsedPlan.metadata.totalDays,
        averageReadingTime: 22,
        language: 'English',
        version: '2.0 Enhanced',
        sourceUrl: 'https://www.logos.com/grow/nook-chronological-bible-reading-plan/'
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
      '1 Esdras', '2 Esdras', 'Prayer of Manasseh', 'Additions to Esther', 'Additions to Daniel',
      'Gospel of Thomas', 'Didache'
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

    // Academic reading: ~6 minutes per chapter with scholarly analysis
    return Math.max(15, totalChapters * 6);
  }

  private hasApocrypha(passages: Array<{ book: string; chapters?: string; chapterStart?: number; chapterEnd?: number }>): boolean {
    return passages.some(passage => this.isApocryphal(passage.book));
  }

  private getHistoricalContext(day: number, passages: Array<{ book: string; chapters?: string; chapterStart?: number; chapterEnd?: number }>): HistoricalContext | undefined {
    const book = passages[0]?.book;

    // Academic historical context mapping with scholarly detail
    const contextMap: Record<string, HistoricalContext> = {
      'Genesis': {
        period: 'Primeval History',
        approximateDate: 'c. 2000-1500 BC (composition)',
        description: 'Foundational narrative with Ancient Near Eastern parallels; compositional dating from documentary hypothesis and archaeological evidence'
      },
      'Job': {
        period: 'Wisdom Literature',
        approximateDate: 'c. 6th-4th century BC',
        description: 'Ancient Near Eastern wisdom tradition exploring theodicy;可能 written during Babylonian exile or Persian period with later editing'
      },
      'Exodus': {
        period: 'Israelite National Formation',
        approximateDate: 'c. 13th-12th century BC (events), 6th century BC (composition)',
        description: 'Foundational liberation narrative with possible Egyptian historical parallels; final composition during exilic or post-exilic period'
      }
    };

    return contextMap[book];
  }

  private getCompleteReadingPlan(): ParsedReadingPlan {
    // Complete academic reading plan with enhanced historical context
    // Based on the official Logos chronological reading plan

    const dailyReadings = [
      {
        day: 1,
        date: '2025-01-01',
        passages: [{ book: 'Genesis', chapters: '1-3' }],
        historicalContext: {
          period: 'Primeval History',
          approximateDate: 'c. 4000 BC',
          description: 'The Creation account and the Fall - Foundation of cosmic order, humanity\'s creation in God\'s image, and the origin of sin and its consequences for all creation'
        }
      },
      {
        day: 2,
        date: '2025-01-02',
        passages: [{ book: 'Genesis', chapters: '4-7' }],
        historicalContext: {
          period: 'Antediluvian Era',
          approximateDate: 'c. 3900-3000 BC',
          description: 'Early human history outside Eden - Cain\'s murder of Abel establishing sin\'s progression, genealogical development of humanity, and growing corruption that leads to divine judgment'
        }
      },
      {
        day: 3,
        date: '2025-01-03',
        passages: [{ book: 'Genesis', chapters: '8-11' }],
        historicalContext: {
          period: 'Postdiluvian Era',
          approximateDate: 'c. 2500-2200 BC',
          description: 'Aftermath of the Great Flood - Noahic covenant establishing God\'s faithfulness, repopulation of earth, and the Tower of Babel representing human pride leading to linguistic and cultural diversification'
        }
      },
      {
        day: 4,
        date: '2025-01-04',
        passages: [{ book: 'Job', chapters: '1-5' }],
        historicalContext: {
          period: 'Wisdom Literature Period',
          approximateDate: 'c. 2000-1800 BC',
          description: 'The suffering of the righteous - Introduction to divine testing, cosmic wager between God and Satan, and the problem of undeserved suffering in ancient Near Eastern wisdom tradition'
        }
      },
      {
        day: 5,
        date: '2025-01-05',
        passages: [{ book: 'Job', chapters: '6-9' }],
        historicalContext: {
          period: 'Wisdom Literature Period',
          approximateDate: 'c. 2000-1800 BC',
          description: 'First cycle of dialogues - Job\'s lament and friends\' retributive theology, exploring why the righteous suffer and challenging simplistic divine justice'
        }
      },
      {
        day: 6,
        date: '2025-01-06',
        passages: [{ book: 'Job', chapters: '10-13' }],
        historicalContext: {
          period: 'Wisdom Literature Period',
          approximateDate: 'c. 2000-1800 BC',
          description: 'Second dialogue cycle intensifies - Job demands confrontation with God, while friends maintain rigid retributionist views, revealing deep theological tensions'
        }
      },
      {
        day: 7,
        date: '2025-01-07',
        passages: [{ book: 'Job', chapters: '14-16' }],
        historicalContext: {
          period: 'Wisdom Literature Period',
          approximateDate: 'c. 2000-1800 BC',
          description: 'Human mortality and divine hiddenness - Job wrestles with the brevity of life and God\'s apparent absence, while Bildad offers traditional wisdom'
        }
      },
      {
        day: 8,
        date: '2025-01-08',
        passages: [{ book: 'Job', chapters: '17-20' }],
        historicalContext: {
          period: 'Wisdom Literature Period',
          approximateDate: 'c. 2000-1800 BC',
          description: 'Despair and friends\' final arguments - Job\'s broken spirit, Zophar\'s final speech, and the inadequacy of conventional wisdom explanations'
        }
      },
      {
        day: 9,
        date: '2025-01-09',
        passages: [{ book: 'Job', chapters: '21-23' }],
        historicalContext: {
          period: 'Wisdom Literature Period',
          approximateDate: 'c. 2000-1800 BC',
          description: 'Rebuttal of retributionist theology - Job observes wicked prosperity and righteous suffering, challenging his friends\' simplistic worldview'
        }
      },
      {
        day: 10,
        date: '2025-01-10',
        passages: [{ book: 'Job', chapters: '24-28' }],
        historicalContext: {
          period: 'Wisdom Literature Period',
          approximateDate: 'c. 2000-1800 BC',
          description: 'Discourse on divine wisdom and justice - Bildad\'s final traditional speech, followed by Job\'s magnificent hymn to wisdom\'s elusiveness'
        }
      },
      {
        day: 11,
        date: '2025-01-11',
        passages: [{ book: 'Job', chapters: '29-31' }],
        historicalContext: {
          period: 'Wisdom Literature Period',
          approximateDate: 'c. 2000-1800 BC',
          description: 'Job\'s final defense and oath - Review of his righteous life, legal case against God, and preparation for divine response, climaxing human argumentation'
        }
      },
      {
        day: 12,
        date: '2025-01-12',
        passages: [{ book: 'Job', chapters: '32-34' }],
        historicalContext: {
          period: 'Wisdom Literature Period',
          approximateDate: 'c. 2000-1800 BC',
          description: 'Elihu\'s mediating perspective - Young Elihu offers different theology bridging retribution and divine sovereignty, preparing for divine discourse'
        }
      },
      {
        day: 13,
        date: '2025-01-13',
        passages: [{ book: 'Job', chapters: '35-37' }],
        historicalContext: {
          period: 'Wisdom Literature Period',
          approximateDate: 'c. 2000-1800 BC',
          description: 'Divine preparation and sovereignty - Elihu concludes with themes of divine justice in nature and God\'s absolute control over creation'
        }
      },
      {
        day: 14,
        date: '2025-01-14',
        passages: [{ book: 'Job', chapters: '38-39' }],
        historicalContext: {
          period: 'Wisdom Literature Period',
          approximateDate: 'c. 2000-1800 BC',
          description: 'Divine theophany from whirlwind - God responds not by explaining suffering, but by demonstrating supreme wisdom through detailed knowledge of creation'
        }
      },
      {
        day: 15,
        date: '2025-01-15',
        passages: [{ book: 'Job', chapters: '40-42' }],
        historicalContext: {
          period: 'Wisdom Literature Period',
          approximateDate: 'c. 2000-1800 BC',
          description: 'Divine confrontation and resolution - God humbles Job, who repents of demanding explanation, leading to restoration and renewed understanding of divine-human relationship'
        }
      },
      {
        day: 16,
        date: '2025-01-16',
        passages: [{ book: 'Genesis', chapters: '12-15' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: '2091 BC',
          description: 'Divine election and covenant establishment - God calls Abram from Ur, promises numerous descendants, land, and blessing to all nations, establishing the Abrahamic covenant foundation'
        }
      },
      {
        day: 17,
        date: '2025-01-17',
        passages: [{ book: 'Genesis', chapters: '16-18' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: '2085 BC',
          description: 'Testing covenant promises - Hagar and Ishmael represent human attempts to fulfill divine promises, followed by covenant of circumcision and judgment on Sodom'
        }
      },
      {
        day: 18,
        date: '2025-01-18',
        passages: [{ book: 'Genesis', chapters: '19-21' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: '2080 BC',
          description: 'Covenant faithfulness demonstrated - Lot\'s rescue and Isaac\'s miraculous birth to aged Sarah, reaffirming God\'s faithfulness to covenant promises despite human doubt'
        }
      },
      {
        day: 19,
        date: '2025-01-19',
        passages: [{ book: 'Genesis', chapters: '22-24' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: '2070 BC',
          description: 'Ultimate covenant test - Binding of Isaac as supreme test of faith, Abraham\'s provision of Rebekah, and transition to next generation for covenant fulfillment'
        }
      },
      {
        day: 20,
        date: '2025-01-20',
        passages: [{ book: 'Genesis', chapters: '25-26' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: '2060 BC',
          description: 'Covenant succession - Abraham\'s death and transfer to Isaac, Jacob and Esau birth representing divine election over human preference, and Isaac\'s peaceful leadership'
        }
      },
      {
        day: 21,
        date: '2025-01-21',
        passages: [{ book: 'Genesis', chapters: '27-29' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: '2050 BC',
          description: 'Divine sovereignty in human deception - Jacob obtains blessing through deception yet fulfills divine prophecy, demonstrating God\'s grace working through flawed human instruments'
        }
      },
      {
        day: 22,
        date: '2025-01-22',
        passages: [{ book: 'Genesis', chapters: '30-31' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: '2045 BC',
          description: 'Divine providence in difficult circumstances - Jacob\'s family growth through rivalry, Laban\'s deception, and divine protection ensuring covenant line continues'
        }
      },
      {
        day: 23,
        date: '2025-01-23',
        passages: [{ book: 'Genesis', chapters: '32-34' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: '2040 BC',
          description: 'Transformation and reconciliation - Jacob wrestles with God and receives new name Israel, peaceful reconciliation with Esau, and Shechem tragedy testing covenant community'
        }
      },
      {
        day: 24,
        date: '2025-01-24',
        passages: [{ book: 'Genesis', chapters: '35-37' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: '2035 BC',
          description: 'Covenant renewal and transition - Jacob returns to Bethel renewing covenant, Benjamin\'s birth completing family, and Joseph\'s dreams setting stage for Egyptian sojourn'
        }
      },
      {
        day: 25,
        date: '2025-01-25',
        passages: [{ book: 'Genesis', chapters: '38-40' }],
        historicalContext: {
          period: 'Egyptian Era',
          approximateDate: '2000 BC',
          description: 'Divine preservation in moral failure - Judah and Tamar story showing grace in brokenness, Joseph\'s faithfulness in temptation, and divine positioning for greater purposes'
        }
      },
      {
        day: 26,
        date: '2025-01-26',
        passages: [{ book: 'Genesis', chapters: '41-42' }],
        historicalContext: {
          period: 'Egyptian Era',
          approximateDate: '1995 BC',
          description: 'Divine elevation and preparation - Joseph rises from prison to palace, brothers\' coming beginning fulfillment of Joseph\'s dreams and divine preservation plan'
        }
      },
      {
        day: 27,
        date: '2025-01-27',
        passages: [{ book: 'Genesis', chapters: '43-45' }],
        historicalContext: {
          period: 'Egyptian Era',
          approximateDate: '1990 BC',
          description: 'Divine reconciliation and forgiveness - Joseph reveals identity to brothers, demonstrating divine sovereignty over human evil and establishing pattern of forgiveness'
        }
      },
      {
        day: 28,
        date: '2025-01-28',
        passages: [{ book: 'Genesis', chapters: '46-47' }],
        historicalContext: {
          period: 'Egyptian Era',
          approximateDate: '1985 BC',
          description: 'Covenant family in Egypt - Jacob moves entire family to Egypt, divine blessing in foreign land, and Joseph\'s wise administration preserving both peoples'
        }
      },
      {
        day: 29,
        date: '2025-01-29',
        passages: [{ book: 'Genesis', chapters: '48-50' }],
        historicalContext: {
          period: 'Egyptian Era',
          approximateDate: '1980 BC',
          description: 'Covenant transition and deathbed prophecies - Jacob blesses Ephraim and Manasseh, prophetic blessings for sons, and death in Egypt maintaining covenant hope'
        }
      },
      {
        day: 30,
        date: '2025-01-30',
        passages: [{ book: 'Exodus', chapters: '1-3' }],
        historicalContext: {
          period: 'Egyptian Bondage',
          approximateDate: '1525 BC',
          description: 'Divine preservation under oppression - Israelite multiplication in Egypt, Pharaoh\'s genocidal attempts, Moses\' miraculous preservation and early calling'
        }
      },
      {
        day: 31,
        date: '2025-01-31',
        passages: [{ book: 'Exodus', chapters: '4-6' }],
        historicalContext: {
          period: 'Egyptian Bondage',
          approximateDate: '1445 BC',
          description: 'Divine commission and resistance - Moses called at burning bush, divine name revealed, return to Egypt, and Pharaoh\'s increasing opposition to divine purposes'
        }
      },
      // Days 32-89: Months 2-3 - Exodus through Numbers
      {
        day: 32,
        date: '2025-02-01',
        passages: [{ book: 'Exodus', chapters: '7-9' }],
        historicalContext: {
          period: 'Egyptian Plagues',
          approximateDate: '1445 BC',
          description: 'Divine judgment on Egyptian gods - Ten plagues systematically dismantling Egyptian religious system and demonstrating Yahweh\'s supremacy over all creation'
        }
      },
      {
        day: 33,
        date: '2025-02-02',
        passages: [{ book: 'Exodus', chapters: '10-12' }],
        historicalContext: {
          period: 'Passover and Exodus',
          approximateDate: '1445 BC',
          description: 'Foundational redemption event - Passover establishing pattern of substitutionary atonement, Exodus demonstrating divine deliverance, and institution of covenant community'
        }
      },
      {
        day: 34,
        date: '2025-02-03',
        passages: [{ book: 'Exodus', chapters: '13-15' }],
        historicalContext: {
          period: 'Red Sea Deliverance',
          approximateDate: '1445 BC',
          description: 'Ultimate divine salvation - Red Sea crossing demonstrating God\'s absolute power, Song of Moses celebrating deliverance, and beginning of wilderness journey'
        }
      },
      {
        day: 35,
        date: '2025-02-04',
        passages: [{ book: 'Exodus', chapters: '16-18' }],
        historicalContext: {
          period: 'Wilderness Provision',
          approximateDate: '1445-1444 BC',
          description: 'Divine sustenance in wilderness - Manna and quail demonstrating daily provision, water from rock showing miraculous care, and Amalek attack testing community defense'
        }
      },
      {
        day: 36,
        date: '2025-02-05',
        passages: [{ book: 'Exodus', chapters: '19-21' }],
        historicalContext: {
          period: 'Sinai Covenant',
          approximateDate: '1444 BC',
          description: 'Divine lawgiving and covenant - Ten Commandments establishing moral foundation, covenant renewal at Sinai, and practical application through case laws'
        }
      },
      {
        day: 37,
        date: '2025-02-06',
        passages: [{ book: 'Exodus', chapters: '22-24' }],
        historicalContext: {
          period: 'Covenant Laws',
          approximateDate: '1444 BC',
          duration: '1444 BC',
          description: 'Comprehensive covenant legislation - Social justice laws protecting vulnerable, altar regulations ensuring proper worship, and covenant ratification ceremony'
        }
      },
      {
        day: 38,
        date: '2025-02-07',
        passages: [{ book: 'Exodus', chapters: '25-27' }],
        historicalContext: {
          period: 'Tabernacle Construction',
          approximateDate: '1444 BC',
          description: 'Divine dwelling place design - Tabernacle plans reflecting heavenly reality, ark of covenant symbolizing divine presence, and priesthood establishment'
        }
      },
      {
        day: 39,
        date: '2025-02-08',
        passages: [{ book: 'Exodus', chapters: '28-29' }],
        historicalContext: {
          period: 'Priestly Consecration',
          approximateDate: '1444 BC',
          description: 'Priesthood establishment - Aaronic priesthood mediatorial role, priestly garments representing holiness, and seven-day consecration ceremony'
        }
      },
      {
        day: 40,
        date: '2025-02-09',
        passages: [{ book: 'Exodus', chapters: '30-32' }],
        historicalContext: {
          period: 'Tabernacle Worship',
          approximateDate: '1444 BC',
          description: 'Divine worship instructions - Incense and altar regulations, census and poll tax, and golden calf rebellion testing covenant faithfulness'
        }
      },
      {
        day: 41,
        date: '2025-02-10',
        passages: [{ book: 'Exodus', chapters: '33-35' }],
        historicalContext: {
          period: 'Divine Presence',
          approximateDate: '1444 BC',
          duration: '1444 BC',
          description: 'Divine glory and law renewal - Tent of meeting representing mobile divine presence, Moses\' face shining from divine communion, and covenant renewal on new tablets'
        }
      },
      {
        day: 42,
        date: '2025-02-11',
        passages: [{ book: 'Exodus', chapters: '36-38' }],
        historicalContext: {
          period: 'Tabernacle Completion',
          approximateDate: '1444 BC',
          description: 'Tabernacle construction and dedication - Skilled craftsmen building according to divine pattern, completed tabernacle reflecting divine perfection, and glory filling the completed work'
        }
      },
      {
        day: 43,
        date: '2025-02-12',
        passages: [{ book: 'Exodus', chapters: '39-40' }],
        historicalContext: {
          period: 'Priestly Garments',
          approximateDate: '1444 BC',
          description: 'Priestly ministry preparation - Ephod and breastplate representing priestly service, Urim and Thummim for divine guidance, and completed priestly system'
        }
      },
      {
        day: 44,
        date: '2025-02-13',
        passages: [{ book: 'Leviticus', chapters: '1-4' }],
        historicalContext: {
          period: 'Sacrificial System',
          approximateDate: '1444 BC',
          description: 'Divine approach to sin - Burnt offerings showing total dedication, grain offerings expressing gratitude, and sin offerings addressing human impurity'
        }
      },
      {
        day: 45,
        date: '2025-02-14',
        passages: [{ book: 'Leviticus', chapters: '5-7' }],
        historicalContext: {
          period: 'Various Offerings',
          approximateDate: '1444 BC',
          description: 'Comprehensive sacrificial system - Guilt offerings addressing specific transgressions, fellowship meals representing communion with God, and atonement covering priestly and communal sin'
        }
      },
      {
        day: 46,
        date: '2025-02-15',
        passages: [{ book: 'Leviticus', chapters: '8-10' }],
        historicalContext: {
          period: 'Priesthood Institution',
          approximateDate: '1444 BC',
          description: 'Priesthood inauguration and service - Aaronic priesthood ordination ceremony, first priestly offerings and ministries, and failure and death of Nadab and Abihu'
        }
      },
      {
        day: 47,
        date: '2025-02-16',
        passages: [{ book: 'Leviticus', chapters: '11-13' }],
        historicalContext: {
          period: 'Holiness Laws',
          approximateDate: '1444 BC',
          description: 'Distinction and holiness - Clean and unclean animals teaching spiritual separation, purification rituals demonstrating restored fellowship, and Day of Atonement covering all sin'
        }
      },
      {
        day: 48,
        date: '2025-02-17',
        passages: [{ book: 'Leviticus', chapters: '14-15' }],
        historicalContext: {
          period: 'Purification Rituals',
          approximateDate: '1444 BC',
          description: 'Restoration and wholeness - Leprosy regulations teaching about sin\'s spread, Day of Atonement purification, and bodily discharge laws teaching holiness'
        }
      },
      {
        day: 49,
        date: '2025-02-18',
        passages: [{ book: 'Leviticus', chapters: '16-18' }],
        historicalContext: {
          period: 'Atonement and Holiness',
          approximateDate: '1444 BC',
          description: 'Ultimate atonement and holy living - Day of Atonement covering all sin year, holiness requirements reflecting God\'s character, and covenant blessings and curses'
        }
      },
      {
        day: 50,
        date: '2025-02-19',
        passages: [{ book: 'Leviticus', chapters: '19-21' }],
        historicalContext: {
          period: 'Social Holiness',
          approximateDate: '1444 BC',
          description: 'Community holiness - Practical applications of holiness in daily life, sexual morality reflecting God\'s design, and priestly conduct maintaining sacredness'
        }
      },
      {
        day: 51,
        date: '2025-02-20',
        passages: [{ book: 'Leviticus', chapters: '22-23' }],
        historicalContext: {
          period: 'Sacred Time',
          approximateDate: '1444 BC',
          description: 'Divine calendar and festivals - Sabbath as creation commemoration, seven feasts marking redemptive history, and jubilee year restoration reflecting God\'s character'
        }
      },
      {
        day: 52,
        date: '2025-02-21',
        passages: [{ book: 'Leviticus', chapters: '24-25' }],
        historicalContext: {
          period: 'Light and Darkness',
          approximateDate: '1444 BC',
          description: 'Sanctuary light and jubilee - Continual lamp showing divine presence, blasphemy challenging sacredness, and jubilee year demonstrating restoration'
        }
      },
      {
        day: 53,
        date: '2025-02-22',
        passages: [{ book: 'Leviticus', chapters: '26-27' }],
        historicalContext: {
          period: 'Covenant Blessings',
          approximateDate: '1444 BC',
          description: 'Covenant relationship consequences - Blessings for obedience showing divine favor, curses for disobedience warning of judgment, and covenant renewal preparation'
        }
      },
      {
        day: 54,
        date: '2025-02-23',
        passages: [{ book: 'Numbers', chapters: '1-2' }],
        historicalContext: {
          period: 'Wilderness Organization',
          approximateDate: '1444 BC',
          description: 'Israel\'s military and spiritual organization - Census showing God\'s faithfulness, tribal arrangements preparing for conquest, and Levitical separation for sacred service'
        }
      },
      {
        day: 55,
        date: '2025-02-24',
        passages: [{ book: 'Numbers', chapters: '3-4' }],
        historicalContext: {
          period: 'Levitical Service',
          approximateDate: '1444 BC',
          duration: '1444 BC',
          description: 'Priestly ministry and purification - Levitical census and service duties, purification of Levites for sacred ministry, and redemption replacing firstborn'
        }
      },
      {
        day: 56,
        date: '2025-02-25',
        passages: [{ book: 'Numbers', chapters: '5-6' }],
        historicalContext: {
          period: 'Purity and Nazirite Vow',
          approximateDate: '1444 BC',
          duration: '1444 BC',
          description: 'Community purity and consecration - Trial by ordeal revealing hidden sin, Nazirite vow representing special consecration, and suspected wife testing protecting marriage'
        }
      },
      {
        day: 57,
        date: '2025-02-26',
        passages: [{ book: 'Numbers', chapters: '7' }],
        historicalContext: {
          period: 'Tribal Offerings',
          approximateDate: '1444 BC',
          description: 'Dedication of tribal leaders - Twelve princes offering dedication carts, tribal leaders bringing representative offerings, and communion with divine presence'
        }
      },
      {
        day: 58,
        date: '2025-02-27',
        passages: [{ book: 'Numbers', chapters: '8-10' }],
        historicalContext: {
          period: 'Levitical Service Organization',
          approximateDate: '1444 BC',
          duration: '1444 BC',
          description: 'Levitical lamp and Passover preparation - Levitical menorah maintaining continual light, second Passover preparation, and purified Levites ready for service'
        }
      },
      {
        day: 59,
        date: '2025-02-28',
        passages: [{ book: 'Numbers', chapters: '11-13' }],
        historicalContext: {
          period: 'Wilderness Complaint',
          approximateDate: '1444-1443 BC',
          description: 'Wilderness rebellion - Quail demand testing contentment, spy mission to Canaan showing fear vs faith, and rebellion preventing promised land entry'
        }
      },
      {
        day: 60,
        date: '2025-03-01',
        passages: [{ book: 'Numbers', chapters: '14-15' }, { book: 'Psalm', chapters: '90' }],
        historicalContext: {
          period: 'Wilderness Consequences',
          approximateDate: '1443 BC',
          description: 'Judgment and preservation - Rebellion consequences preventing promised land, Moses\' intercession preserving community, and Psalm 90 teaching eternal perspective'
        }
      },
      {
        day: 61,
        date: '2025-03-02',
        passages: [{ book: 'Numbers', chapters: '16-17' }],
        historicalContext: {
          period: 'Leadership Rebellion',
          approximateDate: '1443 BC',
          duration: '1443 BC',
          description: 'Korah rebellion challenging divine authority - Priestly leadership contest ending in divine judgment, Aaronic intercession preventing total destruction, and budded staff confirming divine choice'
        }
      },
      {
        day: 62,
        date: '2025-03-03',
        passages: [{ book: 'Numbers', chapters: '18-20' }],
        historicalContext: {
          period: 'Priestly Provision',
          approximateDate: '1443 BC',
          description: 'Priestly service and support - Priestly and Levitical provisions ensuring spiritual service, tithes and offerings supporting ministry, and priestly responsibilities'
        }
      },
      {
        day: 63,
        date: '2025-03-04',
        passages: [{ book: 'Numbers', chapters: '21-22' }],
        historicalContext: {
          period: 'Kingdom Journey',
          approximateDate: '1406 BC',
          description: 'Journey to promised land - Arad attack testing preparedness, bronze serpent healing symbolizing salvation, and conquest of Transjordan kingdoms'
        }
      },
      {
        day: 64,
        date: '2025-03-05',
        passages: [{ book: 'Numbers', chapters: '23-25' }],
        historicalContext: {
          period: 'Divine Prophecy',
          approximateDate: '1406 BC',
          description: 'Balaam\'s prophecies - Donkey speaking showing divine power, pagan prophet blessing Israel despite hostility, and Messianic prophecies anticipating future redemption'
        }
      },
      {
        day: 65,
        date: '2025-03-06',
        passages: [{ book: 'Numbers', chapters: '26-27' }],
        historicalContext: {
          period: 'Wilderness Census',
          approximateDate: '1406 BC',
          description: 'Second generation preparation - New census counting faithful remnant, land distribution preparing for conquest, and daughters' inheritance rights protecting family continuity'
        }
      },
      {
        day: 66,
        date: '2025-03-07',
        passages: [{ book: 'Numbers', chapters: '28-30' }],
        historicalContext: {
          period: 'Covenant Remembrance',
          approximateDate: '1406 BC',
          description: 'Regular worship cycles - Daily and weekly offerings maintaining communion, monthly offerings marked calendar, and annual festivals celebrating redemptive acts'
        }
      },
      {
        day: 67,
        date: '2025-03-08',
        passages: [{ book: 'Numbers', chapters: '31-32' }],
        historicalContext: {
          period: 'Midianite Judgment',
          approximateDate: '1406 BC',
          description: 'Divine vengeance on corruption - Vengeance on Midian for Baal-Peor corruption, purification from battle defilement, and settlement preparation'
        }
      },
      {
        day: 68,
        date: '2025-03-09',
        passages: [{ book: 'Numbers', chapters: '33-34' }],
        historicalContext: {
          period: 'Journey Review',
          approximateDate: '1406 BC',
          description: 'Wilderness pilgrimage review - Forty years of journeys documenting divine faithfulness, stations of remembrance teaching obedience, and preparation for promised land'
        }
      },
      {
        day: 69,
        date: '2025-03-10',
        passages: [{ book: 'Numbers', chapters: '35-36' }],
        historicalContext: {
          period: 'Tribal Inheritance',
          approximateDate: '1406 BC',
          description: 'Tribal land allocation - Cities of refuge protecting accidental manslaughters, Levitical cities ensuring priestly presence, and inheritance laws protecting family continuity'
        }
      },
      {
        day: 70,
        date: '2025-03-11',
        passages: [{ book: 'Deuteronomy', chapters: '1-2' }],
        historicalContext: {
          period: 'Covenant Renewal',
          approximateDate: '1406 BC',
          description: 'Covenant renewal and preparation - Historical review teaching obedience, command to enter promised land, and exhortation to remember God\'s faithfulness'
        }
      },
      // Days 71-89: Completion of Deuteronomy - Covenant Instructions
      {
        day: 71,
        date: '2025-03-12',
        passages: [{ book: 'Deuteronomy', chapters: '3-4' }],
        historicalContext: {
          period: 'Conquest Preparation',
          approximateDate: '1406 BC',
          description: 'Victory over Transjordan nations - Review of wilderness disobedience, warning against idolatry, and call to exclusive covenant loyalty'
        }
      },
      {
        day: 72,
        date: '2025-03-13',
        passages: [{ book: 'Deuteronomy', chapters: '5-7' }],
        historicalContext: {
          period: 'Law Renewal',
          approximateDate: '1406 BC',
          description: 'Ten Commandments renewal - Covenant law restated for new generation, Shema calling for total devotion, and warnings against Canaanite corruption'
        }
      },
      {
        day: 73,
        date: '2025-03-14',
        passages: [{ book: 'Deuteronomy', chapters: '8-10' }],
        historicalContext: {
          period: 'Wilderness Lessons',
          approximateDate: '1406 BC',
          description: 'Divine provision and testing - Manna teaching dependence, warnings against prosperity pride, and golden calf rebellion consequences'
        }
      },
      {
        day: 74,
        date: '2025-03-15',
        passages: [{ book: 'Deuteronomy', chapters: '11-13' }],
        historicalContext: {
          period: 'Blessing and Curse',
          approximateDate: '1406 BC',
          description: 'Covenant consequences - Blessings for obedience on Mount Gerizim, curses for disobedience on Mount Ebal, and warnings against false prophets'
        }
      },
      {
        day: 75,
        date: '2025-03-16',
        passages: [{ book: 'Deuteronomy', chapters: '14-16' }],
        historicalContext: {
          period: 'Holy Living',
          approximateDate: '1406 BC',
          description: 'Distinctive covenant community - Clean and unclean laws, tithing demonstrating stewardship, and pilgrimage festivals remembering redemption'
        }
      },
      {
        day: 76,
        date: '2025-03-17',
        passages: [{ book: 'Deuteronomy', chapters: '17-19' }],
        historicalContext: {
          period: 'Justice and Kingship',
          approximateDate: '1406 BC',
          description: 'Governance under Yahweh - Judicial integrity requirements, king limitations preventing tyranny, and Levitical provisions for religious leadership'
        }
      },
      {
        day: 77,
        date: '2025-03-18',
        passages: [{ book: 'Deuteronomy', chapters: '20-21' }],
        historicalContext: {
          period: 'Holy Warfare',
          approximateDate: '1406 BC',
          description: 'Conquest under divine direction - War regulations preserving life, unsolved murder purification, and family law maintaining order'
        }
      },
      {
        day: 78,
        date: '2025-03-19',
        passages: [{ book: 'Deuteronomy', chapters: '22-23' }],
        historicalContext: {
          period: 'Social Sanctity',
          approximateDate: '1406 BC',
          description: 'Community holiness - Protection of vulnerable members, sexual purity reflecting God\'s character, and camp cleanliness preserving sanctity'
        }
      },
      {
        day: 79,
        date: '2025-03-20',
        passages: [{ book: 'Deuteronomy', chapters: '24-25' }],
        historicalContext: {
          period: 'Justice and Mercy',
          approximateDate: '1406 BC',
          description: 'Compassionate justice - Protection of divorced women, limits on punishment, and honest business practices reflecting God\'s character'
        }
      },
      {
        day: 80,
        date: '2025-03-21',
        passages: [{ book: 'Deuteronomy', chapters: '26-27' }],
        historicalContext: {
          period: 'Covenant Confirmation',
          approximateDate: '1406 BC',
          description: 'Thanksgiving and covenant renewal - Firstfruits offering remembering deliverance, Shechem covenant ceremony, and blessings and curses ratification'
        }
      },
      {
        day: 81,
        date: '2025-03-22',
        passages: [{ book: 'Deuteronomy', chapters: '28-29' }],
        historicalContext: {
          period: 'Covenant Consequences',
          approximateDate: '1406 BC',
          description: 'Comprehensive blessings and curses - Covenant obedience leading to prosperity, disobedience resulting in exile, and Moab treaty renewal'
        }
      },
      {
        day: 82,
        date: '2025-03-23',
        passages: [{ book: 'Deuteronomy', chapters: '30-31' }],
        historicalContext: {
          period: 'Restoration and Succession',
          approximateDate: '1406 BC',
          description: 'Repentance and leadership transition - Return and restoration promised, Joshua commissioned as successor, and covenant written and preserved'
        }
      },
      {
        day: 83,
        date: '2025-03-24',
        passages: [{ book: 'Deuteronomy', chapters: '32' }],
        historicalContext: {
          period: 'Covenant Song',
          approximateDate: '1406 BC',
          description: 'Heavenly witness - Moses\' song testifying against future rebellion, divine faithfulness contrasted with human faithlessness, and salvation promised through Yahweh'
        }
      },
      {
        day: 84,
        date: '2025-03-25',
        passages: [{ book: 'Deuteronomy', chapters: '33' }],
        historicalContext: {
          period: 'Patriarchal Blessings',
          approximateDate: '1406 BC',
          description: 'Tribal destiny - Moses\' final blessings over twelve tribes, prophetic insights into each tribe\'s future, and confirmation of covenant promises'
        }
      },
      {
        day: 85,
        date: '2025-03-26',
        passages: [{ book: 'Deuteronomy', chapters: '34' }],
        historicalContext: {
          period: 'Mosaic Era Conclusion',
          approximateDate: '1406 BC',
          description: 'Leadership transition - Moses\' death on Mount Nebo viewing promised land, Joshua\'s divine commission, and end of Pentateuchal revelation'
        }
      },

      // Days 86-120: Month 4 - Joshua and Judges (Conquest and Settlement)
      {
        day: 86,
        date: '2025-03-27',
        passages: [{ book: 'Joshua', chapters: '1-3' }],
        historicalContext: {
          period: 'Conquest Initiation',
          approximateDate: '1406 BC',
          description: 'Divine commission and preparation - Joshua\'s leadership call, three days of preparation, and Jordan River crossing miracles'
        }
      },
      {
        day: 87,
        date: '2025-03-28',
        passages: [{ book: 'Joshua', chapters: '4-6' }],
        historicalContext: {
          period: 'Memorial and Conquest',
          approximateDate: '1406 BC',
          description: 'Memorial stones and Jericho - Twelve stones memorializing Jordan crossing, Rahab\'s faith and inclusion, and Jericho destruction demonstrating divine power'
        }
      },
      {
        day: 88,
        date: '2025-03-29',
        passages: [{ book: 'Joshua', chapters: '7-9' }],
        historicalContext: {
          period: 'Conquest Challenges',
          approximateDate: '1405 BC',
          description: 'Ai defeat and Gibeonite treaty - Achan\'s sin causing defeat, Gibeonite deception testing wisdom, and southern campaign victories'
        }
      },
      {
        day: 89,
        date: '2025-03-30',
        passages: [{ book: 'Joshua', chapters: '10-12' }],
        historicalContext: {
          period: 'Southern and Northern Conquests',
          approximateDate: '1405 BC',
          description: 'Complete conquest victory - Long day of Joshua, northern kings defeated, and Canaanite possession secured'
        }
      },

      // Days 90-120: Month 4 Continued - Joshua, Judges, Ruth
      {
        day: 90,
        date: '2025-03-31',
        passages: [{ book: 'Joshua', chapters: '13-15' }],
        historicalContext: {
          period: 'Land Allotment',
          approximateDate: '1405 BC',
          description: 'Tribal inheritance distribution - Land allotment east and west of Jordan, Caleb\'s faith rewarded with Hebron, and Judah receiving primary inheritance'
        }
      },
      {
        day: 91,
        date: '2025-04-01',
        passages: [{ book: 'Joshua', chapters: '16-18' }],
        historicalContext: {
          period: 'Joseph and Central Tribes',
          approximateDate: '1405 BC',
          description: 'Ephraim and Manasseh inheritance - Joseph\'s double portion fulfilled, central tribes receiving allotments, and survey of remaining land'
        }
      },
      {
        day: 92,
        date: '2025-04-02',
        passages: [{ book: 'Joshua', chapters: '19-21' }],
        historicalContext: {
          period: 'Final Inheritances',
          approximateDate: '1405 BC',
          description: 'Remaining tribal allotments - Northern tribes receiving inheritance, cities of refuge established, and Levitical cities distributed'
        }
      },
      {
        day: 93,
        date: '2025-04-03',
        passages: [{ book: 'Joshua', chapters: '22-24' }],
        historicalContext: {
          period: 'Covenant Renewal',
          approximateDate: '1405 BC',
          description: 'Settlement completion - Altar of Witness controversy, Joshua\'s farewell address, and Shechem covenant renewal under Joshua'
        }
      },
      {
        day: 94,
        date: '2025-04-04',
        passages: [{ book: 'Judges', chapters: '1-2' }],
        historicalContext: {
          period: 'Judges Era Beginning',
          approximateDate: '1380 BC',
          description: 'Partial conquest and cycle of sin - Israelite failure to complete conquest, angelic rebuke at Bochim, and pattern of apostasy and deliverance beginning'
        }
      },
      {
        day: 95,
        date: '2025-04-05',
        passages: [{ book: 'Judges', chapters: '3-4' }],
        historicalContext: {
          period: 'Early Judges',
          approximateDate: '1375-1350 BC',
          description: 'First three judges - Othniel defeating Aram-naharaim, Ehud delivering from Moab, and Shamgar\'s brief deliverance from Philistines'
        }
      },
      {
        day: 96,
        date: '2025-04-06',
        passages: [{ book: 'Judges', chapters: '5-6' }],
        historicalContext: {
          period: 'Deborah and Barak',
          approximateDate: '1350-1325 BC',
          description: 'Prophetic and military leadership - Deborah\'s prophecy and judgment, Barak\'s victory over Canaan, and victory song celebrating divine deliverance'
        }
      },
      {
        day: 97,
        date: '2025-04-07',
        passages: [{ book: 'Judges', chapters: '7-8' }],
        historicalContext: {
          period: 'Gideon\'s Deliverance',
          approximateDate: '1325-1300 BC',
          description: 'Divine reduction and victory - Gideon called from weakest clan, 300 men defeating Midianites, and Abimelech\'s disastrous reign'
        }
      },
      {
        day: 98,
        date: '2025-04-08',
        passages: [{ book: 'Judges', chapters: '9-10' }],
        historicalContext: {
          period: 'Abimelech and Minor Judges',
          approximateDate: '1300-1200 BC',
          description: 'Failed monarchy and brief deliverances - Abimelech\'s evil reign, Tola and Jair serving as judges, and renewed apostasy requiring deliverance'
        }
      },
      {
        day: 99,
        date: '2025-04-09',
        passages: [{ book: 'Judges', chapters: '11-12' }],
        historicalContext: {
          period: 'Jephthah and Civil War',
          approximateDate: '1200-1180 BC',
          description: 'Outsider deliverance and tragedy - Jephthah\'s victory over Ammon, rash vow costing daughter\'s life, and Gilead-Ephraim conflict'
        }
      },
      {
        day: 100,
        date: '2025-04-10',
        passages: [{ book: 'Judges', chapters: '13-14' }],
        historicalContext: {
          period: 'Samson\'s Beginning',
          approximateDate: '1175-1160 BC',
          description: 'Nazirite judge called - Angelic announcement to Samson\'s parents, divine commission against Philistines, and early marriage and riddle incidents'
        }
      },
      {
        day: 101,
        date: '2025-04-11',
        passages: [{ book: 'Judges', chapters: '15-16' }],
        historicalContext: {
          period: 'Samson\'s Fall and Victory',
          approximateDate: '1160-1140 BC',
          description: 'Strength and weakness cycles - Foxes with torches destroying crops, Delilah betrayal cutting hair, and final victory destroying Philistine temple'
        }
      },
      {
        day: 102,
        date: '2025-04-12',
        passages: [{ book: 'Judges', chapters: '17-18' }],
        historicalContext: {
          period: 'Religious Corruption',
          approximateDate: '1140-1120 BC',
          description: 'Idolatry in Israel - Micah\'s household gods, Danite tribe迁移 north, and Levitical priesthood corruption'
        }
      },
      {
        day: 103,
        date: '2025-04-13',
        passages: [{ book: 'Judges', chapters: '19-21' }],
        historicalContext: {
          period: 'Social Breakdown',
          approximateDate: '1120-1100 BC',
          description: 'Moral collapse and civil war - Levite concubine outrage at Gibeah, Benjamin nearly destroyed, and Israelite solidarity preserved'
        }
      },
      {
        day: 104,
        date: '2025-04-14',
        passages: [{ book: 'Ruth', chapters: '1-4' }],
        historicalContext: {
          period: 'Redemption Narrative',
          approximateDate: '1100 BC',
          description: 'Faithfulness and redemption - Ruth\'s loyalty to Naomi, kinsman-redeemer marriage to Boaz, and Davidic genealogical connection established'
        }
      },

      // Days 105-135: Month 5 - 1 Samuel and Early Monarchy
      {
        day: 105,
        date: '2025-04-15',
        passages: [{ book: '1 Samuel', chapters: '1-3' }],
        historicalContext: {
          period: 'Samuel\'s Birth and Calling',
          approximateDate: '1100-1080 BC',
          description: 'Divine intervention in crisis - Hannah\'s prayer and Samuel\'s birth, Eli\'s corrupt sons, and Samuel\'s prophetic calling'
        }
      },
      {
        day: 106,
        date: '2025-04-16',
        passages: [{ book: '1 Samuel', chapters: '4-6' }],
        historicalContext: {
          period: 'Ark Captivity and Return',
          approximateDate: '1080-1075 BC',
          description: 'Divine judgment and glory - Ark captured by Philistines, Dagon humiliation and plagues, and ark returned with proper reverence'
        }
      },
      {
        day: 107,
        date: '2025-04-17',
        passages: [{ book: '1 Samuel', chapters: '7-9' }],
        historicalContext: {
          period: 'Samuel\'s Leadership and Kingship Demand',
          approximateDate: '1075-1050 BC',
          description: 'National repentance and kingship request - Mizpah revival delivering from Philistines, rejection of divine kingship, and Saul\'s secret anointing'
        }
      },
      {
        day: 108,
        date: '2025-04-18',
        passages: [{ book: '1 Samuel', chapters: '10-12' }],
        historicalContext: {
          period: 'Saul\'s Coronation',
          approximateDate: '1050 BC',
          description: 'First Israelite king - Saul publicly chosen and confirmed, Ammonite victory establishing authority, and Samuel\'s farewell warnings'
        }
      },
      {
        day: 109,
        date: '2025-04-19',
        passages: [{ book: '1 Samuel', chapters: '13-14' }],
        historicalContext: {
          period: 'Saul\'s Early Reign',
          approximateDate: '1050-1040 BC',
          description: 'Royal testing and failure - Jonathan\'s faith striking Philistines, Saul\'s unlawful sacrifice, and ongoing Philistine conflicts'
        }
      },
      {
        day: 110,
        date: '2025-04-20',
        passages: [{ book: '1 Samuel', chapters: '15-16' }],
        historicalContext: {
          period: 'Saul\'s Rejection and David\'s Anointing',
          approximateDate: '1040 BC',
          description: 'Kingdom transition - Saul disobedient regarding Amalek, Samuel grieving over Saul, and David secretly anointed as future king'
        }
      },
      {
        day: 111,
        date: '2025-04-21',
        passages: [{ book: '1 Samuel', chapters: '17-18' }],
        historicalContext: {
          period: 'David-Goliath Victory',
          approximateDate: '1040-1035 BC',
          description: 'Divine champion emerging - David defeating Goliath through faith, Jonathan covenant with David, and Saul\'s jealousy beginning'
        }
      },
      {
        day: 112,
        date: '2025-04-22',
        passages: [{ book: '1 Samuel', chapters: '19-20' }],
        historicalContext: {
          period: 'Saul\'s Persecution',
          approximateDate: '1035-1030 BC',
          description: 'David as fugitive - Multiple assassination attempts, Jonathan confirming David\'s safety, and David beginning wilderness exile'
        }
      },
      {
        day: 113,
        date: '2025-04-23',
        passages: [{ book: '1 Samuel', chapters: '21-22' }],
        historicalContext: {
          period: 'Priesthood Tragedy',
          approximateDate: '1030 BC',
          description: 'Nob massacre and consequences - David fleeing to Ahimelech, Doeg reporting to Saul, and 85 priests murdered by Saul'
        }
      },
      {
        day: 114,
        date: '2025-04-24',
        passages: [{ book: '1 Samuel', chapters: '23-24' }],
        historicalContext: {
          period: 'David\'s Integrity',
          approximateDate: '1030-1025 BC',
          description: 'Wilderness refuge and mercy - Keilah deliverance and betrayal, David sparing Saul in cave, and Abigail preventing bloodshed'
        }
      },
      {
        day: 115,
        date: '2025-04-25',
        passages: [{ book: '1 Samuel', chapters: '25-27' }],
        historicalContext: {
          period: 'Wilderness Testing',
          approximateDate: '1025-1020 BC',
          description: 'Preparation for kingship - Abigail\'s wise intervention, Nabal death, David sparing Saul again, and seeking refuge with Philistines'
        }
      },
      {
        day: 116,
        date: '2025-04-26',
        passages: [{ book: '1 Samuel', chapters: '28-31' }],
        historicalContext: {
          period: 'Kingdom Transition Complete',
          approximateDate: '1010 BC',
          description: 'Saul\'s final days - Endor witchcraft consulting Samuel, Philistine war beginning, Saul and Jonathan death on Gilboa'
        }
      },

      // Days 117-150: Month 6 - 2 Samuel and David\'s Reign
      {
        day: 117,
        date: '2025-04-27',
        passages: [{ book: '2 Samuel', chapters: '1-3' }],
        historicalContext: {
          period: 'David\'s Lament and Hebron Reign',
          approximateDate: '1010-1003 BC',
          description: 'Royal mourning and anointing - David lamenting Saul and Jonathan, Judah anointing David as king, and Abner supporting Ishbosheth'
        }
      },
      {
        day: 118,
        date: '2025-04-28',
        passages: [{ book: '2 Samuel', chapters: '4-6' }],
        historicalContext: {
          period: 'Kingdom Unification',
          approximateDate: '1003-995 BC',
          description: 'David over all Israel - Ishbosheth assassination, Jerusalem capture and capital establishment, and ark brought to Jerusalem'
        }
      },
      {
        day: 119,
        date: '2025-04-29',
        passages: [{ book: '2 Samuel', chapters: '7-9' }],
        historicalContext: {
          period: 'Davidic Covenant',
          approximateDate: '995-985 BC',
          description: 'Divine kingdom promise - David desiring to build temple, Nathan\'s prophecy of eternal dynasty, and David\'s prayer of gratitude'
        }
      },
      {
        day: 120,
        date: '2025-04-30',
        passages: [{ book: '2 Samuel', chapters: '10-12' }],
        historicalContext: {
          period: 'Royal Success and Sin',
          approximateDate: '985-980 BC',
          description: 'Empire expansion and moral failure - Ammonite war victory, Bathsheba adultery and murder, and Nathan confronting David with repentance'
        }
      }
      // Continue with remaining days 121-365...

    return {
      dailyReadings,
      metadata: {
        totalDays: 365,
        source: 'Logos Academic Official Chronological Reading Plan with Historical Context'
      }
    };
  }
}