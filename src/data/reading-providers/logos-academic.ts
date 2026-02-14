import type { ReadingPlan, DailyReading, BiblePassage, HistoricalContext, PlanMetadata } from '../../types/reading-plans';
import { PDFParserService } from '../../services/pdf-parser.service';
import type { ParsedReadingPlan } from '../../services/pdf-parser.service';
import { generateBiblehubHref } from '../../utils/biblehub-utils';

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
        date: '2024-12-31',
        passages: [{ book: 'Genesis', chapters: '1-3' }],
        historicalContext: {
          period: 'Primeval History',
          approximateDate: 'c. 4000 BC',
          description: 'The Creation account and the Fall - Foundation of cosmic order, humanity\'s creation in God\'s image, and the origin of sin and its consequences for all creation'
        },
        commentary: '🔍GENERIC_COMMENT: The foundational narrative of all Scripture. Genesis 1-3 establishes core theological concepts including God as Creator, humanity made in God\'s image, the origin of sin, and the first promise of redemption (protoevangelium).'
      },
      {
        day: 2,
        date: '2025-01-01',
        passages: [{ book: 'Genesis', chapters: '4-7' }],
        historicalContext: {
          period: 'Antediluvian Era',
          approximateDate: 'c. 3900-3000 BC',
          description: 'Early human history outside Eden - Cain\'s murder of Abel establishing sin\'s progression, genealogical development of humanity, and growing corruption that leads to divine judgment'
        },
        commentary: '🔍GENERIC_COMMENT: The rapid spread of sin after the Fall. Genesis 4-7 shows how sin escalates from murder to violence, but also demonstrates God\'s grace in preserving a righteous line through Seth, ultimately leading to Noah and the promise of redemption.'
      },
      {
        day: 3,
        date: '2025-01-02',
        passages: [{ book: 'Genesis', chapters: '8-11' }],
        historicalContext: {
          period: 'Postdiluvian Era',
          approximateDate: 'c. 2500-2200 BC',
          description: 'Aftermath of the Great Flood - Noahic covenant establishing God\'s faithfulness, repopulation of earth, and the Tower of Babel representing human pride leading to linguistic and cultural diversification'
        }
      },
      {
        day: 4,
        date: '2025-01-03',
        passages: [{ book: 'Job', chapters: '1-5' }],
        historicalContext: {
          period: 'Wisdom Literature Period',
          approximateDate: 'c. 2000-1800 BC',
          description: 'The suffering of the righteous - Introduction to divine testing, cosmic wager between God and Satan, and the problem of undeserved suffering in ancient Near Eastern wisdom tradition'
        }
      },
      {
        day: 5,
        date: '2025-01-04',
        passages: [{ book: 'Job', chapters: '6-9' }],
        historicalContext: {
          period: 'Wisdom Literature Period',
          approximateDate: 'c. 2000-1800 BC',
          description: 'First cycle of dialogues - Job\'s lament and friends\' retributive theology, exploring why the righteous suffer and challenging simplistic divine justice'
        }
      },
      {
        day: 6,
        date: '2025-01-05',
        passages: [{ book: 'Job', chapters: '10-13' }],
        historicalContext: {
          period: 'Wisdom Literature Period',
          approximateDate: 'c. 2000-1800 BC',
          description: 'Second dialogue cycle intensifies - Job demands confrontation with God, while friends maintain rigid retributionist views, revealing deep theological tensions'
        }
      },
      {
        day: 7,
        date: '2025-01-06',
        passages: [{ book: 'Job', chapters: '14-16' }],
        historicalContext: {
          period: 'Wisdom Literature Period',
          approximateDate: 'c. 2000-1800 BC',
          description: 'Human mortality and divine hiddenness - Job wrestles with the brevity of life and God\'s apparent absence, while Bildad offers traditional wisdom'
        }
      },
      {
        day: 8,
        date: '2025-01-07',
        passages: [{ book: 'Job', chapters: '17-20' }],
        historicalContext: {
          period: 'Wisdom Literature Period',
          approximateDate: 'c. 2000-1800 BC',
          description: 'Despair and friends\' final arguments - Job\'s broken spirit, Zophar\'s final speech, and the inadequacy of conventional wisdom explanations'
        }
      },
      {
        day: 9,
        date: '2025-01-08',
        passages: [{ book: 'Job', chapters: '21-23' }],
        historicalContext: {
          period: 'Wisdom Literature Period',
          approximateDate: 'c. 2000-1800 BC',
          description: 'Rebuttal of retributionist theology - Job observes wicked prosperity and righteous suffering, challenging his friends\' simplistic worldview'
        }
      },
      {
        day: 10,
        date: '2025-01-09',
        passages: [{ book: 'Job', chapters: '24-28' }],
        historicalContext: {
          period: 'Wisdom Literature Period',
          approximateDate: 'c. 2000-1800 BC',
          description: 'Discourse on divine wisdom and justice - Bildad\'s final traditional speech, followed by Job\'s magnificent hymn to wisdom\'s elusiveness'
        }
      },
      {
        day: 11,
        date: '2025-01-10',
        passages: [{ book: 'Job', chapters: '29-31' }],
        historicalContext: {
          period: 'Wisdom Literature Period',
          approximateDate: 'c. 2000-1800 BC',
          description: 'Job\'s final defense and oath - Review of his righteous life, legal case against God, and preparation for divine response, climaxing human argumentation'
        }
      },
      {
        day: 12,
        date: '2025-01-11',
        passages: [{ book: 'Job', chapters: '32-34' }],
        historicalContext: {
          period: 'Wisdom Literature Period',
          approximateDate: 'c. 2000-1800 BC',
          description: 'Elihu\'s mediating perspective - Young Elihu offers different theology bridging retribution and divine sovereignty, preparing for divine discourse'
        }
      },
      {
        day: 13,
        date: '2025-01-12',
        passages: [{ book: 'Job', chapters: '35-37' }],
        historicalContext: {
          period: 'Wisdom Literature Period',
          approximateDate: 'c. 2000-1800 BC',
          description: 'Divine preparation and sovereignty - Elihu concludes with themes of divine justice in nature and God\'s absolute control over creation'
        }
      },
      {
        day: 14,
        date: '2025-01-13',
        passages: [{ book: 'Job', chapters: '38-39' }],
        historicalContext: {
          period: 'Wisdom Literature Period',
          approximateDate: 'c. 2000-1800 BC',
          description: 'Divine theophany from whirlwind - God responds not by explaining suffering, but by demonstrating supreme wisdom through detailed knowledge of creation'
        }
      },
      {
        day: 15,
        date: '2025-01-14',
        passages: [{ book: 'Job', chapters: '40-42' }],
        historicalContext: {
          period: 'Wisdom Literature Period',
          approximateDate: 'c. 2000-1800 BC',
          description: 'Divine confrontation and resolution - God humbles Job, who repents of demanding explanation, leading to restoration and renewed understanding of divine-human relationship'
        }
      },
      {
        day: 16,
        date: '2025-01-15',
        passages: [{ book: 'Genesis', chapters: '12-15' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: '2091 BC',
          description: 'Divine election and covenant establishment - God calls Abram from Ur, promises numerous descendants, land, and blessing to all nations, establishing the Abrahamic covenant foundation'
        }
      },
      {
        day: 17,
        date: '2025-01-16',
        passages: [{ book: 'Genesis', chapters: '16-18' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: '2085 BC',
          description: 'Testing covenant promises - Hagar and Ishmael represent human attempts to fulfill divine promises, followed by covenant of circumcision and judgment on Sodom'
        }
      },
      {
        day: 18,
        date: '2025-01-17',
        passages: [{ book: 'Genesis', chapters: '19-21' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: '2080 BC',
          description: 'Covenant faithfulness demonstrated - Lot\'s rescue and Isaac\'s miraculous birth to aged Sarah, reaffirming God\'s faithfulness to covenant promises despite human doubt'
        }
      },
      {
        day: 19,
        date: '2025-01-18',
        passages: [{ book: 'Genesis', chapters: '22-24' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: '2070 BC',
          description: 'Ultimate covenant test - Binding of Isaac as supreme test of faith, Abraham\'s provision of Rebekah, and transition to next generation for covenant fulfillment'
        }
      },
      {
        day: 20,
        date: '2025-01-19',
        passages: [{ book: 'Genesis', chapters: '25-26' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: '2060 BC',
          description: 'Covenant succession - Abraham\'s death and transfer to Isaac, Jacob and Esau birth representing divine election over human preference, and Isaac\'s peaceful leadership'
        }
      },
      {
        day: 21,
        date: '2025-01-20',
        passages: [{ book: 'Genesis', chapters: '27-29' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: '2050 BC',
          description: 'Divine sovereignty in human deception - Jacob obtains blessing through deception yet fulfills divine prophecy, demonstrating God\'s grace working through flawed human instruments'
        }
      },
      {
        day: 22,
        date: '2025-01-21',
        passages: [{ book: 'Genesis', chapters: '30-31' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: '2045 BC',
          description: 'Divine providence in difficult circumstances - Jacob\'s family growth through rivalry, Laban\'s deception, and divine protection ensuring covenant line continues'
        }
      },
      {
        day: 23,
        date: '2025-01-22',
        passages: [{ book: 'Genesis', chapters: '32-34' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: '2040 BC',
          description: 'Transformation and reconciliation - Jacob wrestles with God and receives new name Israel, peaceful reconciliation with Esau, and Shechem tragedy testing covenant community'
        }
      },
      {
        day: 24,
        date: '2025-01-23',
        passages: [{ book: 'Genesis', chapters: '35-37' }],
        historicalContext: {
          period: 'Patriarchal Era',
          approximateDate: '2035 BC',
          description: 'Covenant renewal and transition - Jacob returns to Bethel renewing covenant, Benjamin\'s birth completing family, and Joseph\'s dreams setting stage for Egyptian sojourn'
        }
      },
      {
        day: 25,
        date: '2025-01-24',
        passages: [{ book: 'Genesis', chapters: '38-40' }],
        historicalContext: {
          period: 'Egyptian Era',
          approximateDate: '2000 BC',
          description: 'Divine preservation in moral failure - Judah and Tamar story showing grace in brokenness, Joseph\'s faithfulness in temptation, and divine positioning for greater purposes'
        }
      },
      {
        day: 26,
        date: '2025-01-25',
        passages: [{ book: 'Genesis', chapters: '41-42' }],
        historicalContext: {
          period: 'Egyptian Era',
          approximateDate: '1995 BC',
          description: 'Divine elevation and preparation - Joseph rises from prison to palace, brothers\' coming beginning fulfillment of Joseph\'s dreams and divine preservation plan'
        }
      },
      {
        day: 27,
        date: '2025-01-26',
        passages: [{ book: 'Genesis', chapters: '43-45' }],
        historicalContext: {
          period: 'Egyptian Era',
          approximateDate: '1990 BC',
          description: 'Divine reconciliation and forgiveness - Joseph reveals identity to brothers, demonstrating divine sovereignty over human evil and establishing pattern of forgiveness'
        }
      },
      {
        day: 28,
        date: '2025-01-27',
        passages: [{ book: 'Genesis', chapters: '46-47' }],
        historicalContext: {
          period: 'Egyptian Era',
          approximateDate: '1985 BC',
          description: 'Covenant family in Egypt - Jacob moves entire family to Egypt, divine blessing in foreign land, and Joseph\'s wise administration preserving both peoples'
        }
      },
      {
        day: 29,
        date: '2025-01-28',
        passages: [{ book: 'Genesis', chapters: '48-50' }],
        historicalContext: {
          period: 'Egyptian Era',
          approximateDate: '1980 BC',
          description: 'Covenant transition and deathbed prophecies - Jacob blesses Ephraim and Manasseh, prophetic blessings for sons, and death in Egypt maintaining covenant hope'
        }
      },
      {
        day: 30,
        date: '2025-01-29',
        passages: [{ book: 'Exodus', chapters: '1-3' }],
        historicalContext: {
          period: 'Egyptian Bondage',
          approximateDate: '1525 BC',
          description: 'Divine preservation under oppression - Israelite multiplication in Egypt, Pharaoh\'s genocidal attempts, Moses\' miraculous preservation and early calling'
        }
      },
      {
        day: 31,
        date: '2025-01-30',
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
        date: '2025-01-31',
        passages: [{ book: 'Exodus', chapters: '7-9' }],
        historicalContext: {
          period: 'Egyptian Plagues',
          approximateDate: '1445 BC',
          description: 'Divine judgment on Egyptian gods - Ten plagues systematically dismantling Egyptian religious system and demonstrating Yahweh\'s supremacy over all creation'
        }
      },
      {
        day: 33,
        date: '2025-02-01',
        passages: [{ book: 'Exodus', chapters: '10-12' }],
        historicalContext: {
          period: 'Passover and Exodus',
          approximateDate: '1445 BC',
          description: 'Foundational redemption event - Passover establishing pattern of substitutionary atonement, Exodus demonstrating divine deliverance, and institution of covenant community'
        }
      },
      {
        day: 34,
        date: '2025-02-02',
        passages: [{ book: 'Exodus', chapters: '13-15' }],
        historicalContext: {
          period: 'Red Sea Deliverance',
          approximateDate: '1445 BC',
          description: 'Ultimate divine salvation - Red Sea crossing demonstrating God\'s absolute power, Song of Moses celebrating deliverance, and beginning of wilderness journey'
        }
      },
      {
        day: 35,
        date: '2025-02-03',
        passages: [{ book: 'Exodus', chapters: '16-18' }],
        historicalContext: {
          period: 'Wilderness Provision',
          approximateDate: '1445-1444 BC',
          description: 'Divine sustenance in wilderness - Manna and quail demonstrating daily provision, water from rock showing miraculous care, and Amalek attack testing community defense'
        }
      },
      {
        day: 36,
        date: '2025-02-04',
        passages: [{ book: 'Exodus', chapters: '19-21' }],
        historicalContext: {
          period: 'Sinai Covenant',
          approximateDate: '1444 BC',
          description: 'Divine lawgiving and covenant - Ten Commandments establishing moral foundation, covenant renewal at Sinai, and practical application through case laws'
        }
      },
      {
        day: 37,
        date: '2025-02-05',
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
        date: '2025-02-06',
        passages: [{ book: 'Exodus', chapters: '25-27' }],
        historicalContext: {
          period: 'Tabernacle Construction',
          approximateDate: '1444 BC',
          description: 'Divine dwelling place design - Tabernacle plans reflecting heavenly reality, ark of covenant symbolizing divine presence, and priesthood establishment'
        }
      },
      {
        day: 39,
        date: '2025-02-07',
        passages: [{ book: 'Exodus', chapters: '28-29' }],
        historicalContext: {
          period: 'Priestly Consecration',
          approximateDate: '1444 BC',
          description: 'Priesthood establishment - Aaronic priesthood mediatorial role, priestly garments representing holiness, and seven-day consecration ceremony'
        }
      },
      {
        day: 40,
        date: '2025-02-08',
        passages: [{ book: 'Exodus', chapters: '30-32' }],
        historicalContext: {
          period: 'Tabernacle Worship',
          approximateDate: '1444 BC',
          description: 'Divine worship instructions - Incense and altar regulations, census and poll tax, and golden calf rebellion testing covenant faithfulness'
        }
      },
      {
        day: 41,
        date: '2025-02-09',
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
        date: '2025-02-10',
        passages: [{ book: 'Exodus', chapters: '36-38' }],
        historicalContext: {
          period: 'Tabernacle Completion',
          approximateDate: '1444 BC',
          description: 'Tabernacle construction and dedication - Skilled craftsmen building according to divine pattern, completed tabernacle reflecting divine perfection, and glory filling the completed work'
        }
      },
      {
        day: 43,
        date: '2025-02-11',
        passages: [{ book: 'Exodus', chapters: '39-40' }],
        historicalContext: {
          period: 'Priestly Garments',
          approximateDate: '1444 BC',
          description: 'Priestly ministry preparation - Ephod and breastplate representing priestly service, Urim and Thummim for divine guidance, and completed priestly system'
        }
      },
      {
        day: 44,
        date: '2025-02-12',
        passages: [{ book: 'Leviticus', chapters: '1-4' }],
        historicalContext: {
          period: 'Sacrificial System',
          approximateDate: '1444 BC',
          description: 'Divine approach to sin - Burnt offerings showing total dedication, grain offerings expressing gratitude, and sin offerings addressing human impurity'
        }
      },
      {
        day: 45,
        date: '2025-02-13',
        passages: [{ book: 'Leviticus', chapters: '5-7' }],
        historicalContext: {
          period: 'Various Offerings',
          approximateDate: '1444 BC',
          description: 'Comprehensive sacrificial system - Guilt offerings addressing specific transgressions, fellowship meals representing communion with God, and atonement covering priestly and communal sin'
        }
      },
      {
        day: 46,
        date: '2025-02-14',
        passages: [{ book: 'Leviticus', chapters: '8-10' }],
        historicalContext: {
          period: 'Priesthood Institution',
          approximateDate: '1444 BC',
          description: 'Priesthood inauguration and service - Aaronic priesthood ordination ceremony, first priestly offerings and ministries, and failure and death of Nadab and Abihu'
        }
      },
      {
        day: 47,
        date: '2025-02-15',
        passages: [{ book: 'Leviticus', chapters: '11-13' }],
        historicalContext: {
          period: 'Holiness Laws',
          approximateDate: '1444 BC',
          description: 'Distinction and holiness - Clean and unclean animals teaching spiritual separation, purification rituals demonstrating restored fellowship, and Day of Atonement covering all sin'
        }
      },
      {
        day: 48,
        date: '2025-02-16',
        passages: [{ book: 'Leviticus', chapters: '14-15' }],
        historicalContext: {
          period: 'Purification Rituals',
          approximateDate: '1444 BC',
          description: 'Restoration and wholeness - Leprosy regulations teaching about sin\'s spread, Day of Atonement purification, and bodily discharge laws teaching holiness'
        }
      },
      {
        day: 49,
        date: '2025-02-17',
        passages: [{ book: 'Leviticus', chapters: '16-18' }],
        historicalContext: {
          period: 'Atonement and Holiness',
          approximateDate: '1444 BC',
          description: 'Ultimate atonement and holy living - Day of Atonement covering all sin year, holiness requirements reflecting God\'s character, and covenant blessings and curses'
        }
      },
      {
        day: 50,
        date: '2025-02-18',
        passages: [{ book: 'Leviticus', chapters: '19-21' }],
        historicalContext: {
          period: 'Social Holiness',
          approximateDate: '1444 BC',
          description: 'Community holiness - Practical applications of holiness in daily life, sexual morality reflecting God\'s design, and priestly conduct maintaining sacredness'
        }
      },
      {
        day: 51,
        date: '2025-02-19',
        passages: [{ book: 'Leviticus', chapters: '22-23' }],
        historicalContext: {
          period: 'Sacred Time',
          approximateDate: '1444 BC',
          description: 'Divine calendar and festivals - Sabbath as creation commemoration, seven feasts marking redemptive history, and jubilee year restoration reflecting God\'s character'
        }
      },
      {
        day: 52,
        date: '2025-02-20',
        passages: [{ book: 'Leviticus', chapters: '24-25' }],
        historicalContext: {
          period: 'Light and Darkness',
          approximateDate: '1444 BC',
          description: 'Sanctuary light and jubilee - Continual lamp showing divine presence, blasphemy challenging sacredness, and jubilee year demonstrating restoration'
        }
      },
      {
        day: 53,
        date: '2025-02-21',
        passages: [{ book: 'Leviticus', chapters: '26-27' }],
        historicalContext: {
          period: 'Covenant Blessings',
          approximateDate: '1444 BC',
          description: 'Covenant relationship consequences - Blessings for obedience showing divine favor, curses for disobedience warning of judgment, and covenant renewal preparation'
        }
      },
      {
        day: 54,
        date: '2025-02-22',
        passages: [{ book: 'Numbers', chapters: '1-2' }],
        historicalContext: {
          period: 'Wilderness Organization',
          approximateDate: '1444 BC',
          description: 'Israel\'s military and spiritual organization - Census showing God\'s faithfulness, tribal arrangements preparing for conquest, and Levitical separation for sacred service'
        }
      },
      {
        day: 55,
        date: '2025-02-23',
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
        date: '2025-02-24',
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
        date: '2025-02-25',
        passages: [{ book: 'Numbers', chapters: '7' }],
        historicalContext: {
          period: 'Tribal Offerings',
          approximateDate: '1444 BC',
          description: 'Dedication of tribal leaders - Twelve princes offering dedication carts, tribal leaders bringing representative offerings, and communion with divine presence'
        }
      },
      {
        day: 58,
        date: '2025-02-26',
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
        date: '2025-02-27',
        passages: [{ book: 'Numbers', chapters: '11-13' }],
        historicalContext: {
          period: 'Wilderness Complaint',
          approximateDate: '1444-1443 BC',
          description: 'Wilderness rebellion - Quail demand testing contentment, spy mission to Canaan showing fear vs faith, and rebellion preventing promised land entry'
        }
      },
      {
        day: 60,
        date: '2025-02-28',
        passages: [{ book: 'Numbers', chapters: '14-15' }, { book: 'Psalm', chapters: '90' }],
        historicalContext: {
          period: 'Wilderness Consequences',
          approximateDate: '1443 BC',
          description: 'Judgment and preservation - Rebellion consequences preventing promised land, Moses\' intercession preserving community, and Psalm 90 teaching eternal perspective'
        }
      },
      {
        day: 61,
        date: '2025-03-01',
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
        date: '2025-03-02',
        passages: [{ book: 'Numbers', chapters: '18-20' }],
        historicalContext: {
          period: 'Priestly Provision',
          approximateDate: '1443 BC',
          description: 'Priestly service and support - Priestly and Levitical provisions ensuring spiritual service, tithes and offerings supporting ministry, and priestly responsibilities'
        }
      },
      {
        day: 63,
        date: '2025-03-03',
        passages: [{ book: 'Numbers', chapters: '21-22' }],
        historicalContext: {
          period: 'Kingdom Journey',
          approximateDate: '1406 BC',
          description: 'Journey to promised land - Arad attack testing preparedness, bronze serpent healing symbolizing salvation, and conquest of Transjordan kingdoms'
        }
      },
      {
        day: 64,
        date: '2025-03-04',
        passages: [{ book: 'Numbers', chapters: '23-25' }],
        historicalContext: {
          period: 'Divine Prophecy',
          approximateDate: '1406 BC',
          description: 'Balaam\'s prophecies - Donkey speaking showing divine power, pagan prophet blessing Israel despite hostility, and Messianic prophecies anticipating future redemption'
        }
      },
      {
        day: 65,
        date: '2025-03-05',
        passages: [{ book: 'Numbers', chapters: '26-27' }],
        historicalContext: {
          period: 'Wilderness Census',
          approximateDate: '1406 BC',
          description: 'Second generation preparation - New census counting faithful remnant, land distribution preparing for conquest, and daughters\' inheritance rights protecting family continuity'
        }
      },
      {
        day: 66,
        date: '2025-03-06',
        passages: [{ book: 'Numbers', chapters: '28-30' }],
        historicalContext: {
          period: 'Covenant Remembrance',
          approximateDate: '1406 BC',
          description: 'Regular worship cycles - Daily and weekly offerings maintaining communion, monthly offerings marked calendar, and annual festivals celebrating redemptive acts'
        }
      },
      {
        day: 67,
        date: '2025-03-07',
        passages: [{ book: 'Numbers', chapters: '31-32' }],
        historicalContext: {
          period: 'Midianite Judgment',
          approximateDate: '1406 BC',
          description: 'Divine vengeance on corruption - Vengeance on Midian for Baal-Peor corruption, purification from battle defilement, and settlement preparation'
        }
      },
      {
        day: 68,
        date: '2025-03-08',
        passages: [{ book: 'Numbers', chapters: '33-34' }],
        historicalContext: {
          period: 'Journey Review',
          approximateDate: '1406 BC',
          description: 'Wilderness pilgrimage review - Forty years of journeys documenting divine faithfulness, stations of remembrance teaching obedience, and preparation for promised land'
        }
      },
      {
        day: 69,
        date: '2025-03-09',
        passages: [{ book: 'Numbers', chapters: '35-36' }],
        historicalContext: {
          period: 'Tribal Inheritance',
          approximateDate: '1406 BC',
          description: 'Tribal land allocation - Cities of refuge protecting accidental manslaughters, Levitical cities ensuring priestly presence, and inheritance laws protecting family continuity'
        }
      },
      {
        day: 70,
        date: '2025-03-10',
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
        date: '2025-03-11',
        passages: [{ book: 'Deuteronomy', chapters: '3-4' }],
        historicalContext: {
          period: 'Conquest Preparation',
          approximateDate: '1406 BC',
          description: 'Victory over Transjordan nations - Review of wilderness disobedience, warning against idolatry, and call to exclusive covenant loyalty'
        }
      },
      {
        day: 72,
        date: '2025-03-12',
        passages: [{ book: 'Deuteronomy', chapters: '5-7' }],
        historicalContext: {
          period: 'Law Renewal',
          approximateDate: '1406 BC',
          description: 'Ten Commandments renewal - Covenant law restated for new generation, Shema calling for total devotion, and warnings against Canaanite corruption'
        }
      },
      {
        day: 73,
        date: '2025-03-13',
        passages: [{ book: 'Deuteronomy', chapters: '8-10' }],
        historicalContext: {
          period: 'Wilderness Lessons',
          approximateDate: '1406 BC',
          description: 'Divine provision and testing - Manna teaching dependence, warnings against prosperity pride, and golden calf rebellion consequences'
        }
      },
      {
        day: 74,
        date: '2025-03-14',
        passages: [{ book: 'Deuteronomy', chapters: '11-13' }],
        historicalContext: {
          period: 'Blessing and Curse',
          approximateDate: '1406 BC',
          description: 'Covenant consequences - Blessings for obedience on Mount Gerizim, curses for disobedience on Mount Ebal, and warnings against false prophets'
        }
      },
      {
        day: 75,
        date: '2025-03-15',
        passages: [{ book: 'Deuteronomy', chapters: '14-16' }],
        historicalContext: {
          period: 'Holy Living',
          approximateDate: '1406 BC',
          description: 'Distinctive covenant community - Clean and unclean laws, tithing demonstrating stewardship, and pilgrimage festivals remembering redemption'
        }
      },
      {
        day: 76,
        date: '2025-03-16',
        passages: [{ book: 'Deuteronomy', chapters: '17-19' }],
        historicalContext: {
          period: 'Justice and Kingship',
          approximateDate: '1406 BC',
          description: 'Governance under Yahweh - Judicial integrity requirements, king limitations preventing tyranny, and Levitical provisions for religious leadership'
        }
      },
      {
        day: 77,
        date: '2025-03-17',
        passages: [{ book: 'Deuteronomy', chapters: '20-21' }],
        historicalContext: {
          period: 'Holy Warfare',
          approximateDate: '1406 BC',
          description: 'Conquest under divine direction - War regulations preserving life, unsolved murder purification, and family law maintaining order'
        }
      },
      {
        day: 78,
        date: '2025-03-18',
        passages: [{ book: 'Deuteronomy', chapters: '22-23' }],
        historicalContext: {
          period: 'Social Sanctity',
          approximateDate: '1406 BC',
          description: 'Community holiness - Protection of vulnerable members, sexual purity reflecting God\'s character, and camp cleanliness preserving sanctity'
        }
      },
      {
        day: 79,
        date: '2025-03-19',
        passages: [{ book: 'Deuteronomy', chapters: '24-25' }],
        historicalContext: {
          period: 'Justice and Mercy',
          approximateDate: '1406 BC',
          description: 'Compassionate justice - Protection of divorced women, limits on punishment, and honest business practices reflecting God\'s character'
        }
      },
      {
        day: 80,
        date: '2025-03-20',
        passages: [{ book: 'Deuteronomy', chapters: '26-27' }],
        historicalContext: {
          period: 'Covenant Confirmation',
          approximateDate: '1406 BC',
          description: 'Thanksgiving and covenant renewal - Firstfruits offering remembering deliverance, Shechem covenant ceremony, and blessings and curses ratification'
        }
      },
      {
        day: 81,
        date: '2025-03-21',
        passages: [{ book: 'Deuteronomy', chapters: '28-29' }],
        historicalContext: {
          period: 'Covenant Consequences',
          approximateDate: '1406 BC',
          description: 'Comprehensive blessings and curses - Covenant obedience leading to prosperity, disobedience resulting in exile, and Moab treaty renewal'
        }
      },
      {
        day: 82,
        date: '2025-03-22',
        passages: [{ book: 'Deuteronomy', chapters: '30-31' }],
        historicalContext: {
          period: 'Restoration and Succession',
          approximateDate: '1406 BC',
          description: 'Repentance and leadership transition - Return and restoration promised, Joshua commissioned as successor, and covenant written and preserved'
        }
      },
      {
        day: 83,
        date: '2025-03-23',
        passages: [{ book: 'Deuteronomy', chapters: '32' }],
        historicalContext: {
          period: 'Covenant Song',
          approximateDate: '1406 BC',
          description: 'Heavenly witness - Moses\' song testifying against future rebellion, divine faithfulness contrasted with human faithlessness, and salvation promised through Yahweh'
        }
      },
      {
        day: 84,
        date: '2025-03-24',
        passages: [{ book: 'Deuteronomy', chapters: '33' }],
        historicalContext: {
          period: 'Patriarchal Blessings',
          approximateDate: '1406 BC',
          description: 'Tribal destiny - Moses\' final blessings over twelve tribes, prophetic insights into each tribe\'s future, and confirmation of covenant promises'
        }
      },
      {
        day: 85,
        date: '2025-03-25',
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
        date: '2025-03-26',
        passages: [{ book: 'Joshua', chapters: '1-3' }],
        historicalContext: {
          period: 'Conquest Initiation',
          approximateDate: '1406 BC',
          description: 'Divine commission and preparation - Joshua\'s leadership call, three days of preparation, and Jordan River crossing miracles'
        }
      },
      {
        day: 87,
        date: '2025-03-27',
        passages: [{ book: 'Joshua', chapters: '4-6' }],
        historicalContext: {
          period: 'Memorial and Conquest',
          approximateDate: '1406 BC',
          description: 'Memorial stones and Jericho - Twelve stones memorializing Jordan crossing, Rahab\'s faith and inclusion, and Jericho destruction demonstrating divine power'
        }
      },
      {
        day: 88,
        date: '2025-03-28',
        passages: [{ book: 'Joshua', chapters: '7-9' }],
        historicalContext: {
          period: 'Conquest Challenges',
          approximateDate: '1405 BC',
          description: 'Ai defeat and Gibeonite treaty - Achan\'s sin causing defeat, Gibeonite deception testing wisdom, and southern campaign victories'
        }
      },
      {
        day: 89,
        date: '2025-03-29',
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
        date: '2025-03-30',
        passages: [{ book: 'Joshua', chapters: '13-15' }],
        historicalContext: {
          period: 'Land Allotment',
          approximateDate: '1405 BC',
          description: 'Tribal inheritance distribution - Land allotment east and west of Jordan, Caleb\'s faith rewarded with Hebron, and Judah receiving primary inheritance'
        }
      },
      {
        day: 91,
        date: '2025-03-31',
        passages: [{ book: 'Joshua', chapters: '16-18' }],
        historicalContext: {
          period: 'Joseph and Central Tribes',
          approximateDate: '1405 BC',
          description: 'Ephraim and Manasseh inheritance - Joseph\'s double portion fulfilled, central tribes receiving allotments, and survey of remaining land'
        }
      },
      {
        day: 92,
        date: '2025-04-01',
        passages: [{ book: 'Joshua', chapters: '19-21' }],
        historicalContext: {
          period: 'Final Inheritances',
          approximateDate: '1405 BC',
          description: 'Remaining tribal allotments - Northern tribes receiving inheritance, cities of refuge established, and Levitical cities distributed'
        }
      },
      {
        day: 93,
        date: '2025-04-02',
        passages: [{ book: 'Joshua', chapters: '22-24' }],
        historicalContext: {
          period: 'Covenant Renewal',
          approximateDate: '1405 BC',
          description: 'Settlement completion - Altar of Witness controversy, Joshua\'s farewell address, and Shechem covenant renewal under Joshua'
        }
      },
      {
        day: 94,
        date: '2025-04-03',
        passages: [{ book: 'Judges', chapters: '1-2' }],
        historicalContext: {
          period: 'Judges Era Beginning',
          approximateDate: '1380 BC',
          description: 'Partial conquest and cycle of sin - Israelite failure to complete conquest, angelic rebuke at Bochim, and pattern of apostasy and deliverance beginning'
        }
      },
      {
        day: 95,
        date: '2025-04-04',
        passages: [{ book: 'Judges', chapters: '3-4' }],
        historicalContext: {
          period: 'Early Judges',
          approximateDate: '1375-1350 BC',
          description: 'First three judges - Othniel defeating Aram-naharaim, Ehud delivering from Moab, and Shamgar\'s brief deliverance from Philistines'
        }
      },
      {
        day: 96,
        date: '2025-04-05',
        passages: [{ book: 'Judges', chapters: '5-6' }],
        historicalContext: {
          period: 'Deborah and Barak',
          approximateDate: '1350-1325 BC',
          description: 'Prophetic and military leadership - Deborah\'s prophecy and judgment, Barak\'s victory over Canaan, and victory song celebrating divine deliverance'
        }
      },
      {
        day: 97,
        date: '2025-04-06',
        passages: [{ book: 'Judges', chapters: '7-8' }],
        historicalContext: {
          period: 'Gideon\'s Deliverance',
          approximateDate: '1325-1300 BC',
          description: 'Divine reduction and victory - Gideon called from weakest clan, 300 men defeating Midianites, and Abimelech\'s disastrous reign'
        }
      },
      {
        day: 98,
        date: '2025-04-07',
        passages: [{ book: 'Judges', chapters: '9-10' }],
        historicalContext: {
          period: 'Abimelech and Minor Judges',
          approximateDate: '1300-1200 BC',
          description: 'Failed monarchy and brief deliverances - Abimelech\'s evil reign, Tola and Jair serving as judges, and renewed apostasy requiring deliverance'
        }
      },
      {
        day: 99,
        date: '2025-04-08',
        passages: [{ book: 'Judges', chapters: '11-12' }],
        historicalContext: {
          period: 'Jephthah and Civil War',
          approximateDate: '1200-1180 BC',
          description: 'Outsider deliverance and tragedy - Jephthah\'s victory over Ammon, rash vow costing daughter\'s life, and Gilead-Ephraim conflict'
        }
      },
      {
        day: 100,
        date: '2025-04-09',
        passages: [{ book: 'Judges', chapters: '13-14' }],
        historicalContext: {
          period: 'Samson\'s Beginning',
          approximateDate: '1175-1160 BC',
          description: 'Nazirite judge called - Angelic announcement to Samson\'s parents, divine commission against Philistines, and early marriage and riddle incidents'
        }
      },
      {
        day: 101,
        date: '2025-04-10',
        passages: [{ book: 'Judges', chapters: '15-16' }],
        historicalContext: {
          period: 'Samson\'s Fall and Victory',
          approximateDate: '1160-1140 BC',
          description: 'Strength and weakness cycles - Foxes with torches destroying crops, Delilah betrayal cutting hair, and final victory destroying Philistine temple'
        }
      },
      {
        day: 102,
        date: '2025-04-11',
        passages: [{ book: 'Judges', chapters: '17-18' }],
        historicalContext: {
          period: 'Religious Corruption',
          approximateDate: '1140-1120 BC',
          description: 'Idolatry in Israel - Micah\'s household gods, Danite tribe迁移 north, and Levitical priesthood corruption'
        }
      },
      {
        day: 103,
        date: '2025-04-12',
        passages: [{ book: 'Judges', chapters: '19-21' }],
        historicalContext: {
          period: 'Social Breakdown',
          approximateDate: '1120-1100 BC',
          description: 'Moral collapse and civil war - Levite concubine outrage at Gibeah, Benjamin nearly destroyed, and Israelite solidarity preserved'
        }
      },
      {
        day: 104,
        date: '2025-04-13',
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
        date: '2025-04-14',
        passages: [{ book: '1 Samuel', chapters: '1-3' }],
        historicalContext: {
          period: 'Samuel\'s Birth and Calling',
          approximateDate: '1100-1080 BC',
          description: 'Divine intervention in crisis - Hannah\'s prayer and Samuel\'s birth, Eli\'s corrupt sons, and Samuel\'s prophetic calling'
        }
      },
      {
        day: 106,
        date: '2025-04-15',
        passages: [{ book: '1 Samuel', chapters: '4-6' }],
        historicalContext: {
          period: 'Ark Captivity and Return',
          approximateDate: '1080-1075 BC',
          description: 'Divine judgment and glory - Ark captured by Philistines, Dagon humiliation and plagues, and ark returned with proper reverence'
        }
      },
      {
        day: 107,
        date: '2025-04-16',
        passages: [{ book: '1 Samuel', chapters: '7-9' }],
        historicalContext: {
          period: 'Samuel\'s Leadership and Kingship Demand',
          approximateDate: '1075-1050 BC',
          description: 'National repentance and kingship request - Mizpah revival delivering from Philistines, rejection of divine kingship, and Saul\'s secret anointing'
        }
      },
      {
        day: 108,
        date: '2025-04-17',
        passages: [{ book: '1 Samuel', chapters: '10-12' }],
        historicalContext: {
          period: 'Saul\'s Coronation',
          approximateDate: '1050 BC',
          description: 'First Israelite king - Saul publicly chosen and confirmed, Ammonite victory establishing authority, and Samuel\'s farewell warnings'
        }
      },
      {
        day: 109,
        date: '2025-04-18',
        passages: [{ book: '1 Samuel', chapters: '13-14' }],
        historicalContext: {
          period: 'Saul\'s Early Reign',
          approximateDate: '1050-1040 BC',
          description: 'Royal testing and failure - Jonathan\'s faith striking Philistines, Saul\'s unlawful sacrifice, and ongoing Philistine conflicts'
        }
      },
      {
        day: 110,
        date: '2025-04-19',
        passages: [{ book: '1 Samuel', chapters: '15-16' }],
        historicalContext: {
          period: 'Saul\'s Rejection and David\'s Anointing',
          approximateDate: '1040 BC',
          description: 'Kingdom transition - Saul disobedient regarding Amalek, Samuel grieving over Saul, and David secretly anointed as future king'
        }
      },
      {
        day: 111,
        date: '2025-04-20',
        passages: [{ book: '1 Samuel', chapters: '17-18' }],
        historicalContext: {
          period: 'David-Goliath Victory',
          approximateDate: '1040-1035 BC',
          description: 'Divine champion emerging - David defeating Goliath through faith, Jonathan covenant with David, and Saul\'s jealousy beginning'
        }
      },
      {
        day: 112,
        date: '2025-04-21',
        passages: [{ book: '1 Samuel', chapters: '19-20' }],
        historicalContext: {
          period: 'Saul\'s Persecution',
          approximateDate: '1035-1030 BC',
          description: 'David as fugitive - Multiple assassination attempts, Jonathan confirming David\'s safety, and David beginning wilderness exile'
        }
      },
      {
        day: 113,
        date: '2025-04-22',
        passages: [{ book: '1 Samuel', chapters: '21-22' }],
        historicalContext: {
          period: 'Priesthood Tragedy',
          approximateDate: '1030 BC',
          description: 'Nob massacre and consequences - David fleeing to Ahimelech, Doeg reporting to Saul, and 85 priests murdered by Saul'
        }
      },
      {
        day: 114,
        date: '2025-04-23',
        passages: [{ book: '1 Samuel', chapters: '23-24' }],
        historicalContext: {
          period: 'David\'s Integrity',
          approximateDate: '1030-1025 BC',
          description: 'Wilderness refuge and mercy - Keilah deliverance and betrayal, David sparing Saul in cave, and Abigail preventing bloodshed'
        }
      },
      {
        day: 115,
        date: '2025-04-24',
        passages: [{ book: '1 Samuel', chapters: '25-27' }],
        historicalContext: {
          period: 'Wilderness Testing',
          approximateDate: '1025-1020 BC',
          description: 'Preparation for kingship - Abigail\'s wise intervention, Nabal death, David sparing Saul again, and seeking refuge with Philistines'
        }
      },
      {
        day: 116,
        date: '2025-04-25',
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
        date: '2025-04-26',
        passages: [{ book: '2 Samuel', chapters: '1-3' }],
        historicalContext: {
          period: 'David\'s Lament and Hebron Reign',
          approximateDate: '1010-1003 BC',
          description: 'Royal mourning and anointing - David lamenting Saul and Jonathan, Judah anointing David as king, and Abner supporting Ishbosheth'
        }
      },
      {
        day: 118,
        date: '2025-04-27',
        passages: [{ book: '2 Samuel', chapters: '4-6' }],
        historicalContext: {
          period: 'Kingdom Unification',
          approximateDate: '1003-995 BC',
          description: 'David over all Israel - Ishbosheth assassination, Jerusalem capture and capital establishment, and ark brought to Jerusalem'
        }
      },
      {
        day: 119,
        date: '2025-04-28',
        passages: [{ book: '2 Samuel', chapters: '7-9' }],
        historicalContext: {
          period: 'Davidic Covenant',
          approximateDate: '995-985 BC',
          description: 'Divine kingdom promise - David desiring to build temple, Nathan\'s prophecy of eternal dynasty, and David\'s prayer of gratitude'
        }
      },
      {
        day: 120,
        date: '2025-04-29',
        passages: [{ book: '2 Samuel', chapters: '10-12' }],
        historicalContext: {
          period: 'Royal Success and Sin',
          approximateDate: '985-980 BC',
          description: 'Empire expansion and moral failure - Ammonite war victory, Bathsheba adultery and murder, and Nathan confronting David with repentance'
        }
      },

      // Days 121-180: Month 7-8 - United Kingdom Complete (David through Kingdom Division)
      {
        day: 121,
        date: '2025-04-30',
        passages: [{ book: '2 Samuel', chapters: '13-14' }],
        historicalContext: {
          period: 'David\'s Family Crisis',
          approximateDate: '980-975 BC',
          description: 'Royal family tragedy - Amnon raping Tamar, Absalom murdering Amnon, and David\'s grief and inaction beginning kingdom instability'
        }
      },
      {
        day: 122,
        date: '2025-05-01',
        passages: [{ book: '2 Samuel', chapters: '15-16' }],
        historicalContext: {
          period: 'Absalom\'s Rebellion',
          approximateDate: '975-970 BC',
          description: 'Prince rebellion and exile - Absalom stealing hearts, David fleeing Jerusalem, and Ahithophel betrayal versus Hushai loyalty'
        }
      },
      {
        day: 123,
        date: '2025-05-02',
        passages: [{ book: '2 Samuel', chapters: '17-18' }],
        historicalContext: {
          period: 'Battle and Tragedy',
          approximateDate: '970 BC',
          description: 'Civil war resolution - Ahithophel suicide, Absalom death in oak tree, and David\'s victory mixed with parental grief'
        }
      },
      {
        day: 124,
        date: '2025-05-03',
        passages: [{ book: '2 Samuel', chapters: '19-20' }],
        historicalContext: {
          period: 'David\'s Restoration',
          approximateDate: '970-965 BC',
          description: 'Kingdom restoration challenges - David returning to Jerusalem, Sheba rebellion quelled, and Joab maintaining military control'
        }
      },
      {
        day: 125,
        date: '2025-05-04',
        passages: [{ book: '2 Samuel', chapters: '21-22' }],
        historicalContext: {
          period: 'Final Judgments and Praise',
          approximateDate: '965-960 BC',
          description: 'Royal justice and worship - Gibeonite famine resolution, David\'s song of deliverance, and divine protection throughout life'
        }
      },
      {
        day: 126,
        date: '2025-05-05',
        passages: [{ book: '2 Samuel', chapters: '23-24' }],
        historicalContext: {
          period: 'David\'s Final Words',
          approximateDate: '960 BC',
          description: 'Davidic legacy completion - David\'s last words, mighty men catalog, census sin and judgment, and temple purchase'
        }
      },
      {
        day: 127,
        date: '2025-05-06',
        passages: [{ book: '1 Kings', chapters: '1-2' }],
        historicalContext: {
          period: 'Solomon\'s Accession',
          approximateDate: '960-955 BC',
          description: 'Throne transition and consolidation - Adonijah failed usurpation, Solomon anointed by David, Joab and Shimei executions removing threats'
        }
      },
      {
        day: 128,
        date: '2025-05-07',
        passages: [{ book: '1 Kings', chapters: '3-4' }],
        historicalContext: {
          period: 'Solomon\'s Wisdom',
          approximateDate: '955 BC',
          description: 'Divine wisdom and administration - Solomon given wisdom at Gibeon, famous judgment with prostitutes, and organized kingdom administration'
        }
      },
      {
        day: 129,
        date: '2025-05-08',
        passages: [{ book: '1 Kings', chapters: '5-6' }],
        historicalContext: {
          period: 'Temple Preparation',
          approximateDate: '955-950 BC',
          description: 'Temple building alliance - Hiram of Tyre partnership, workforce organization, and temple foundation laid with divine glory'
        }
      },
      {
        day: 130,
        date: '2025-05-09',
        passages: [{ book: '1 Kings', chapters: '7-8' }],
        historicalContext: {
          period: 'Temple Completion',
          approximateDate: '950 BC',
          description: 'Sacred architecture completed - Temple furnishings constructed, ark brought into holy of holies, and divine glory filling temple'
        }
      },
      {
        day: 131,
        date: '2025-05-10',
        passages: [{ book: '1 Kings', chapters: '9-10' }],
        historicalContext: {
          period: 'Dedication and Fame',
          approximateDate: '950-945 BC',
          description: 'Temple dedication and royal visit - Solomon\'s prayer of dedication, divine fire consuming sacrifices, and Queen of Sheba visit'
        }
      },
      {
        day: 132,
        date: '2025-05-11',
        passages: [{ book: '1 Kings', chapters: '11-12' }],
        historicalContext: {
          period: 'Kingdom Division',
          approximateDate: '945-930 BC',
          description: 'Solomon\'s apostasy and division - Foreign wives leading to idolatry, prophecy of kingdom division, and Rehoboam folly splitting nation'
        }
      },
      {
        day: 133,
        date: '2025-05-12',
        passages: [{ book: '1 Kings', chapters: '13-14' }],
        historicalContext: {
          period: 'Early Divided Kingdom',
          approximateDate: '930-920 BC',
          description: 'Separate religious developments - Man of God confrontation at Bethel, Jeroboam continued idolatry, and dynasty prophecies'
        }
      },
      {
        day: 134,
        date: '2025-05-13',
        passages: [{ book: '1 Kings', chapters: '15-16' }],
        historicalContext: {
          period: 'Dynastic Instability',
          approximateDate: '920-880 BC',
          description: 'Northern kingdom turmoil - Abijam and Asa in Judah, multiple dynasties in Israel, Baasha and Zimri assassinations'
        }
      },
      {
        day: 135,
        date: '2025-05-14',
        passages: [{ book: '1 Kings', chapters: '17-18' }],
        historicalContext: {
          period: 'Elijah\'s Ministry',
          approximateDate: '875-855 BC',
          description: 'Prophetic confrontation - Elijah at Cherith ravine, widow of Zarephath miracle, and Mount Carmel confrontation with Baal'
        }
      },
      {
        day: 136,
        date: '2025-05-15',
        passages: [{ book: '1 Kings', chapters: '19-20' }],
        historicalContext: {
          period: 'Divine Encouragement',
          approximateDate: '855-850 BC',
          description: 'Prophet restoration and war - Elijah at Horeb hearing divine whisper, Elisha calling, and Aramean wars with divine guidance'
        }
      },
      {
        day: 137,
        date: '2025-05-16',
        passages: [{ book: '1 Kings', chapters: '21-22' }],
        historicalContext: {
          period: 'Ahab\'s Wickedness',
          approximateDate: '850-840 BC',
          description: 'Royal corruption and judgment - Naboth vineyard injustice, Jezebel\'s wickedness, and Micaiah prophecy against Ahab'
        }
      },
      {
        day: 138,
        date: '2025-05-17',
        passages: [{ book: '2 Kings', chapters: '1-3' }],
        historicalContext: {
          period: 'Elisha\'s Succession',
          approximateDate: '840-830 BC',
          description: 'Prophetic transition - Elijah chariot ascension, Elisha miracles beginning, and Moabite rebellion with divine intervention'
        }
      },
      {
        day: 139,
        date: '2025-05-18',
        passages: [{ book: '2 Kings', chapters: '4-6' }],
        historicalContext: {
          period: 'Elisha\'s Miracles',
          approximateDate: '830-820 BC',
          description: 'Abundant divine provision - Widow oil miracle, Shunammite son raised, Naaman Syrian commander healed, and axe head floating'
        }
      },
      {
        day: 140,
        date: '2025-05-19',
        passages: [{ book: '2 Kings', chapters: '7-9' }],
        historicalContext: {
          period: 'Syrian Siege Relief',
          approximateDate: '820-810 BC',
          description: 'Divine deliverance - Samaria siege by Syria, lepers discovering abandoned camp, and Hazael assassinating Ben-hadad'
        }
      },
      {
        day: 141,
        date: '2025-05-20',
        passages: [{ book: '2 Kings', chapters: '10-12' }],
        historicalContext: {
          period: 'Jehu\'s Revolution',
          approximateDate: '810-780 BC',
          description: 'Baals worship eradication - Jehu anointed to destroy Ahab dynasty, Jezebel death, Baal priests massacre, and Jehoash temple repairs'
        }
      },
      {
        day: 142,
        date: '2025-05-21',
        passages: [{ book: '2 Kings', chapters: '13-15' }],
        historicalContext: {
          period: 'Declining Kingdoms',
          approximateDate: '780-740 BC',
          description: 'Spiritual and political decline - Elisha death with post-mortem miracle, Syrian oppression, and multiple brief reigns'
        }
      },
      {
        day: 143,
        date: '2025-05-22',
        passages: [{ book: '2 Kings', chapters: '16-17' }],
        historicalContext: {
          period: 'Northern Kingdom Fall',
          approximateDate: '740-722 BC',
          description: 'Israelite exile - Ahaz idolatry in Judah, Hosea last Israelite king, and Assyrian conquest of Samaria with population deportation'
        }
      },
      {
        day: 144,
        date: '2025-05-23',
        passages: [{ book: '2 Kings', chapters: '18-20' }],
        historicalContext: {
          period: 'Hezekiah\'s Faith',
          approximateDate: '715-687 BC',
          description: 'Religious reform and deliverance - Hezekiah removing high places, Assyrian Sennacherib invasion, and divine deliverance of Jerusalem'
        }
      },
      {
        day: 145,
        date: '2025-05-24',
        passages: [{ book: '2 Kings', chapters: '21-23' }],
        historicalContext: {
          period: 'Manasseh and Josiah',
          approximateDate: '687-609 BC',
          description: 'Extremes of wickedness and reform - Manasseh extreme idolatry, Amon brief evil reign, and Josiah covenant renewal and temple reform'
        }
      },
      {
        day: 146,
        date: '2025-05-25',
        passages: [{ book: '2 Kings', chapters: '24-25' }],
        historicalContext: {
          period: 'Judah\'s Final Days',
          approximateDate: '609-586 BC',
          description: 'Kingdom fall and exile - Jehoiakim Babylonian vassalage, Jehoiachin brief reign, Zedekiah rebellion, and Jerusalem destruction'
        }
      },

      // Days 147-180: Month 9 - Chronicles and Exile Literature
      {
        day: 147,
        date: '2025-05-26',
        passages: [{ book: '1 Chronicles', chapters: '1-4' }],
        historicalContext: {
          period: 'Genealogical Foundation',
          approximateDate: 'c. 538 BC',
          description: 'Post-exilic identity restoration - Adam to Jacob genealogies, twelve tribes organization, and returning community identity establishment'
        }
      },
      {
        day: 148,
        date: '2025-05-27',
        passages: [{ book: '1 Chronicles', chapters: '5-8' }],
        historicalContext: {
          period: 'Tribal Histories',
          approximateDate: 'c. 538 BC',
          description: 'Eastern tribes and Judah - Transjordan tribes conquest histories, Levitical cities distribution, and Saul\'s genealogical background'
        }
      },
      {
        day: 149,
        date: '2025-05-28',
        passages: [{ book: '1 Chronicles', chapters: '9-11' }],
        historicalContext: {
          period: 'Jerusalem and David',
          approximateDate: 'c. 538 BC',
          description: 'Capital establishment and king - Jerusalem inhabitants, Saul death in battle, and David anointed king over all Israel'
        }
      },
      {
        day: 150,
        date: '2025-05-29',
        passages: [{ book: '1 Chronicles', chapters: '12-14' }],
        historicalContext: {
          period: 'David\'s Kingdom Rise',
          approximateDate: 'c. 538 BC',
          description: 'United kingdom formation - Warriors joining David at Hebron, ark brought to Jerusalem, and divine covenant established'
        }
      },
      {
        day: 151,
        date: '2025-05-30',
        passages: [{ book: '1 Chronicles', chapters: '15-17' }],
        historicalContext: {
          period: 'Davidic Covenant',
          approximateDate: 'c. 538 BC',
          description: 'Divine dynasty promise - Levites organized for ark transport, David palace built, and Nathan prophecy of eternal dynasty'
        }
      },
      {
        day: 152,
        date: '2025-05-31',
        passages: [{ book: '1 Chronicles', chapters: '18-20' }],
        historicalContext: {
          period: 'David\'s Conquests',
          approximateDate: 'c. 538 BC',
          description: 'Empire expansion and administration - Philistine, Syrian, and Edomite victories, conquered kingdoms organized, David administration established'
        }
      },
      {
        day: 153,
        date: '2025-06-01',
        passages: [{ book: '1 Chronicles', chapters: '21-23' }],
        historicalContext: {
          period: 'Temple Preparation',
          approximateDate: 'c. 538 BC',
          description: 'Divine judgment and preparation - Census sin and plague, Ornan threshing floor purchased, and Levites organized for future temple service'
        }
      },
      {
        day: 154,
        date: '2025-06-02',
        passages: [{ book: '1 Chronicles', chapters: '24-26' }],
        historicalContext: {
          period: 'Priestly Organization',
          approximateDate: 'c. 538 BC',
          description: 'Temple service structure - Priests divided into 24 courses, musicians organized, gatekeepers and treasurers appointed for temple worship'
        }
      },
      {
        day: 155,
        date: '2025-06-03',
        passages: [{ book: '1 Chronicles', chapters: '27-29' }],
        historicalContext: {
          period: 'David\'s Final Provision',
          approximateDate: 'c. 538 BC',
          description: 'Kingdom administration and transition - Military divisions monthly, civil government structure, David passing kingdom to Solomon with temple resources'
        }
      },
      {
        day: 156,
        date: '2025-06-04',
        passages: [{ book: '2 Chronicles', chapters: '1-3' }],
        historicalContext: {
          period: 'Solomon\'s Temple',
          approximateDate: 'c. 538 BC',
          description: 'Wisdom and temple building - Solomon wisdom request, temple construction begun, and detailed temple furnishings and architecture'
        }
      },
      {
        day: 157,
        date: '2025-06-05',
        passages: [{ book: '2 Chronicles', chapters: '4-6' }],
        historicalContext: {
          period: 'Temple Completion',
          approximateDate: 'c. 538 BC',
          description: 'Sacred dedication - Temple furnishings completed, ark brought into temple, Solomon dedication prayer, and divine fire confirmation'
        }
      },
      {
        day: 158,
        date: '2025-06-06',
        passages: [{ book: '2 Chronicles', chapters: '7-9' }],
        historicalContext: {
          period: 'Early Kingdom Prosperity',
          approximateDate: 'c. 538 BC',
          description: 'Divine blessing and wealth - God appears to Solomon, Queen of Sheba visit, Solomon immense wealth, and foreign trading alliances'
        }
      },
      {
        day: 159,
        date: '2025-06-07',
        passages: [{ book: '2 Chronicles', chapters: '10-12' }],
        historicalContext: {
          period: 'Kingdom Division',
          approximateDate: 'c. 538 BC',
          description: 'Rehoboam folly and division - Rehoboam harsh response, ten tribes rebelling under Jeroboam, and Rehoboam establishing Judah'
        }
      },
      {
        day: 160,
        date: '2025-06-08',
        passages: [{ book: '2 Chronicles', chapters: '13-15' }],
        historicalContext: {
          period: 'Southern Kingdom Kings',
          approximateDate: 'c. 538 BC',
          description: 'Judah kings Abijah and Asa - Abijah victory over larger northern army, Asa religious reforms, and divine protection when trusting God'
        }
      },
      {
        day: 161,
        date: '2025-06-09',
        passages: [{ book: '2 Chronicles', chapters: '16-18' }],
        historicalContext: {
          period: 'Asa through Jehoshaphat',
          approximateDate: 'c. 538 BC',
          description: 'Faith and folly contrast - Asa reliance on Syria, Jehoshaphat seeking God, Ahab alliance testing faith, and Micaiah true prophecy'
        }
      },
      {
        day: 162,
        date: '2025-06-10',
        passages: [{ book: '2 Chronicles', chapters: '19-21' }],
        historicalContext: {
          period: 'Jehoshaphat and Jehoram',
          approximateDate: 'c. 538 BC',
          description: 'Religious decline - Jehoshaphat judicial reforms, Jehoram wicked marriage to Athaliah, and Elijah prophecy against Jehoram'
        }
      },
      {
        day: 163,
        date: '2025-06-11',
        passages: [{ book: '2 Chronicles', chapters: '22-24' }],
        historicalContext: {
          period: 'Athaliah and Joash',
          approximateDate: 'c. 538 BC',
          description: 'Queen usurper and child king - Ahaziah death, Athaliah massacre of royal family, Joash hidden and preserved, temple restoration'
        }
      },
      {
        day: 164,
        date: '2025-06-12',
        passages: [{ book: '2 Chronicles', chapters: '25-27' }],
        historicalContext: {
          period: 'Amaziah, Uzziah, Jotham',
          approximateDate: 'c. 538 BC',
          description: 'Mixed faithfulness - Amaziah partial obedience followed by pride, Uzziah strength and subsequent leprosy, Jotham stable righteous reign'
        }
      },
      {
        day: 165,
        date: '2025-06-13',
        passages: [{ book: '2 Chronicles', chapters: '28-30' }],
        historicalContext: {
          period: 'Ahaz and Hezekiah',
          approximateDate: 'c. 538 BC',
          description: 'Extremes of apostasy and reform - Ahaz extreme idolatry and Assyrian alliance, Hezekiah religious reforms and Passover celebration'
        }
      },
      {
        day: 166,
        date: '2025-06-14',
        passages: [{ book: '2 Chronicles', chapters: '31-33' }],
        historicalContext: {
          period: 'Hezekiah and Manasseh',
          approximateDate: 'c. 538 BC',
          description: 'Reform and apostasy cycles - Hezekiah worship and tithing organization, Manasseh extreme wickedness and partial repentance'
        }
      },
      {
        day: 167,
        date: '2025-06-15',
        passages: [{ book: '2 Chronicles', chapters: '34-36' }],
        historicalContext: {
          period: 'Josiah and Kingdom Fall',
          approximateDate: 'c. 538 BC',
          description: 'Final reform and exile - Josiah temple reform, Passover celebration, final kings rebellion, and Babylonian exile decree'
        }
      },

      // Days 168-180: Month 10 - Ezra, Nehemiah, and Return
      {
        day: 168,
        date: '2025-06-16',
        passages: [{ book: 'Ezra', chapters: '1-3' }],
        historicalContext: {
          period: 'First Return',
          approximateDate: '538 BC',
          description: 'Cyrus decree and return - Persian decree allowing Jewish return, Zerubbabel leading first group, and altar and temple foundation reconstruction'
        }
      },
      {
        day: 169,
        date: '2025-06-17',
        passages: [{ book: 'Ezra', chapters: '4-6' }],
        historicalContext: {
          period: 'Temple Opposition',
          approximateDate: '536-520 BC',
          description: 'Rebuilding challenges - Samaritan opposition halting construction, Haggai and Zechariah encouragement, and Darius confirming Cyrus decree'
        }
      },
      {
        day: 170,
        date: '2025-06-18',
        passages: [{ book: 'Ezra', chapters: '7-8' }],
        historicalContext: {
          period: 'Ezra\'s Return',
          approximateDate: '458 BC',
          description: 'Religious leadership return - Ezra scribe and priest leading second group, Artaxerxes decree, and bringing gold and silver for temple'
        }
      },
      {
        day: 171,
        date: '2025-06-19',
        passages: [{ book: 'Ezra', chapters: '9-10' }],
        historicalContext: {
          period: 'Intermarriage Crisis',
          approximateDate: '458-457 BC',
          description: 'Covenant faithfulness - Ezra mourning intermarriage, public confession and covenant renewal, and divorcing foreign wives'
        }
      },
      {
        day: 172,
        date: '2025-06-20',
        passages: [{ book: 'Nehemiah', chapters: '1-3' }],
        historicalContext: {
          period: 'Nehemiah\'s Calling',
          approximateDate: '445 BC',
          description: 'Wall rebuilding vision - Nehemiah cupbearer hearing Jerusalem distress, prayer and planning, and Artaxerxes permission for wall rebuilding'
        }
      },
      {
        day: 173,
        date: '2025-06-21',
        passages: [{ book: 'Nehemiah', chapters: '4-6' }],
        historicalContext: {
          period: 'Wall Construction',
          approximateDate: '445 BC',
          description: 'Building under opposition - Sanballat and Tobiah mocking, armed construction continuing, economic reforms helping poor'
        }
      },
      {
        day: 174,
        date: '2025-06-22',
        passages: [{ book: 'Nehemiah', chapters: '7-9' }],
        historicalContext: {
          period: 'Community Organization',
          approximateDate: '445-444 BC',
          description: 'Population and covenant - Genealogical registration, Ezra reading Law, public confession of sins, and covenant renewal ceremony'
        }
      },
      {
        day: 175,
        date: '2025-06-23',
        passages: [{ book: 'Nehemiah', chapters: '10-12' }],
        historicalContext: {
          period: 'Covenant Implementation',
          approximateDate: '444-432 BC',
          description: 'Community reforms - Tithes and firstfruits promised, temple service organized, population redistribution, and wall dedication celebration'
        }
      },
      {
        day: 176,
        date: '2025-06-24',
        passages: [{ book: 'Nehemiah', chapters: '13' }],
        historicalContext: {
          period: 'Final Reforms',
          approximateDate: '432 BC',
          description: 'Nehemiah final reforms - Excluding Tobiah from temple, enforcing Sabbath, correcting intermarriage, and final prayers for remembrance'
        }
      },
      {
        day: 177,
        date: '2025-06-25',
        passages: [{ book: 'Esther', chapters: '1-4' }],
        historicalContext: {
          period: 'Persian Protection',
          approximateDate: '483-479 BC',
          description: 'Jewish preservation in exile - Vashti deposed, Esther chosen queen, Mordecai saving king, and Haman plot against Jews'
        }
      },
      {
        day: 178,
        date: '2025-06-26',
        passages: [{ book: 'Esther', chapters: '5-7' }],
        historicalContext: {
          period: 'Divine Reversal',
          approximateDate: '479 BC',
          description: 'God\'s sovereign deliverance - Esther approaching king, first banquet honoring Haman, Mordecai honored, Haman gallows built'
        }
      },
      {
        day: 179,
        date: '2025-06-27',
        passages: [{ book: 'Esther', chapters: '8-10' }],
        historicalContext: {
          period: 'Jewish Deliverance',
          approximateDate: '479-478 BC',
          description: 'Purim celebration establishment - Esther revealing Haman plot, Jews defending themselves, Mordecai promoted, and Purim instituted'
        }
      },
      {
        day: 180,
        date: '2025-06-28',
        passages: [{ book: 'Job', chapters: '1-3' }],
        historicalContext: {
          period: 'Wisdom Literature Context',
          approximateDate: 'c. 2000-1800 BC',
          description: 'Divine testing and suffering - Cosmic wager between God and Satan, Job\'s catastrophic losses, and friends coming to comfort'
        }
      },

      // Days 181-210: Month 11 - Wisdom Literature and Major Prophets
      {
        day: 181,
        date: '2025-06-29',
        passages: [{ book: 'Job', chapters: '4-7' }],
        historicalContext: {
          period: 'Friends Counseling',
          approximateDate: 'c. 2000-1800 BC',
          description: 'Retribution theology challenge - Eliphaz traditional wisdom, Job maintaining integrity, and philosophical debate about divine justice'
        }
      },
      {
        day: 182,
        date: '2025-06-30',
        passages: [{ book: 'Job', chapters: '8-11' }],
        historicalContext: {
          period: 'Wisdom Dialogue',
          approximateDate: 'c. 2000-1800 BC',
          description: 'Human suffering explored - Bildad traditional response, Job questioning divine silence, and Zophar simplistic counsel'
        }
      },
      {
        day: 183,
        date: '2025-07-01',
        passages: [{ book: 'Job', chapters: '12-15' }],
        historicalContext: {
          period: 'Divine Sovereignty',
          approximateDate: 'c. 2000-1800 BC',
          description: 'God\'s mysterious wisdom - Job challenging friends\' theology, divine wisdom beyond human comprehension, and maintaining righteousness amid suffering'
        }
      },
      {
        day: 184,
        date: '2025-07-02',
        passages: [{ book: 'Job', chapters: '16-19' }],
        historicalContext: {
          period: 'Suffering Deepens',
          approximateDate: 'c. 2000-1800 BC',
          description: 'Despair and hope contrast - Eliphaz accusing Job, Job longing for divine mediator, and Bildad impatience with suffering'
        }
      },
      {
        day: 185,
        date: '2025-07-03',
        passages: [{ book: 'Job', chapters: '20-23' }],
        historicalContext: {
          period: 'Traditional Wisdom',
          approximateDate: 'c. 2000-1800 BC',
          description: 'Retribution theology defended - Zophar second speech, Job questioning divine justice, and Eliphaz final accusation'
        }
      },
      {
        day: 186,
        date: '2025-07-04',
        passages: [{ book: 'Job', chapters: '24-28' }],
        historicalContext: {
          period: 'Injustice Observation',
          approximateDate: 'c. 2000-1800 BC',
          description: 'World injustice recognized - Bildad final speech, Job wisdom discourse concluding, and Elihu introduction to new perspective'
        }
      },
      {
        day: 187,
        date: '2025-07-05',
        passages: [{ book: 'Job', chapters: '29-31' }],
        historicalContext: {
          period: 'Job\'s Defense',
          approximateDate: 'c. 2000-1800 BC',
          description: 'Integrity maintained despite suffering - Job recalling past prosperity and righteousness, final oath of innocence, and readiness for divine judgment'
        }
      },
      {
        day: 188,
        date: '2025-07-06',
        passages: [{ book: 'Job', chapters: '32-34' }],
        historicalContext: {
          period: 'Elihu\'s Wisdom',
          approximateDate: 'c. 2000-1800 BC',
          description: 'Youthful divine perspective - Elihu waiting for elders to speak, God teaching through suffering, and divine justice beyond human understanding'
        }
      },
      {
        day: 189,
        date: '2025-07-07',
        passages: [{ book: 'Job', chapters: '35-37' }],
        historicalContext: {
          period: 'Divine Teaching',
          approximateDate: 'c. 2000-1800 BC',
          description: 'Natural revelation preparation - Elihu final speeches about divine majesty, God speaking through creation, and preparing for divine appearance'
        }
      },
      {
        day: 190,
        date: '2025-07-08',
        passages: [{ book: 'Job', chapters: '38-39' }],
        historicalContext: {
          period: 'Divine Response',
          approximateDate: 'c. 2000-1800 BC',
          description: 'God\'s wisdom displayed - Divine whirlwind appearance, creation questioning human wisdom, and natural world demonstrating divine sovereignty'
        }
      },
      {
        day: 191,
        date: '2025-07-09',
        passages: [{ book: 'Job', chapters: '40-42' }],
        historicalContext: {
          period: 'Divine Restoration',
          approximateDate: 'c. 2000-1800 BC',
          description: 'Divine justice and restoration - Behemoth and Leviathan demonstrating divine power, Job humbled and restored, family and fortunes doubled'
        }
      },
      {
        day: 192,
        date: '2025-07-10',
        passages: [{ book: 'Psalms', chapters: '1-10' }],
        historicalContext: {
          period: 'Wisdom and Lament',
          approximateDate: 'c. 1000-400 BC',
          description: 'Foundational psalm types - Wisdom psalms teaching righteousness, lament psalms expressing suffering, and royal psalms anticipating Messiah'
        }
      },
      {
        day: 193,
        date: '2025-07-11',
        passages: [{ book: 'Psalms', chapters: '11-20' }],
        historicalContext: {
          period: 'Trust and Thanksgiving',
          approximateDate: 'c. 1000-400 BC',
          description: 'Divine faithfulness celebrated - Trust in God amid persecution, thanksgiving for deliverance, and messianic prophecies of future king'
        }
      },
      {
        day: 194,
        date: '2025-07-12',
        passages: [{ book: 'Psalms', chapters: '21-30' }],
        historicalContext: {
          period: 'Kingship and Suffering',
          approximateDate: 'c. 1000-400 BC',
          description: 'Divine sovereignty and human suffering - Royal psalms celebrating God\'s kingship, individual laments seeking deliverance, and communal trust'
        }
      },
      {
        day: 195,
        date: '2025-07-13',
        passages: [{ book: 'Psalms', chapters: '31-40' }],
        historicalContext: {
          period: 'Lament and Praise',
          approximateDate: 'c. 1000-400 BC',
          description: 'Suffering and divine response - Individual laments in deep suffering, thanksgiving for divine rescue, and wisdom psalms teaching righteousness'
        }
      },
      {
        day: 196,
        date: '2025-07-14',
        passages: [{ book: 'Psalms', chapters: '41-50' }],
        historicalContext: {
          period: 'Community and Messiah',
          approximateDate: 'c. 1000-400 BC',
          description: 'Corporate worship and messianic hope - Community laments seeking national restoration, messianic psalms anticipating Christ, and divine kingship'
        }
      },
      {
        day: 197,
        date: '2025-07-15',
        passages: [{ book: 'Psalms', chapters: '51-60' }],
        historicalContext: {
          period: 'Repentance and Refuge',
          approximateDate: 'c. 1000-400 BC',
          description: 'Penitential and protective psalms - David\'s repentance after sin, seeking God as refuge, and trust amid national turmoil'
        }
      },
      {
        day: 198,
        date: '2025-07-16',
        passages: [{ book: 'Psalms', chapters: '61-70' }],
        historicalContext: {
          period: 'Aging and Salvation',
          approximateDate: 'c. 1000-400 BC',
          description: 'Divine faithfulness through life - Trust in old age, national salvation from enemies, and messianic anticipation fulfilled in Christ'
        }
      },
      {
        day: 199,
        date: '2025-07-17',
        passages: [{ book: 'Psalms', chapters: '71-80' }],
        historicalContext: {
          period: 'Wisdom History',
          approximateDate: 'c. 1000-400 BC',
          description: 'Historical wisdom and divine judgment - Old age wisdom reflecting, historical psalms teaching from Israel\'s past, and Asaph\'s wisdom'
        }
      },
      {
        day: 200,
        date: '2025-07-18',
        passages: [{ book: 'Psalms', chapters: '81-90' }],
        historicalContext: {
          period: 'Covenant and Refuge',
          approximateDate: 'c. 1000-400 BC',
          description: 'Covenant relationship and protection - Asaph psalms recalling exodus history, Moses interceding, and God as eternal refuge'
        }
      },
      {
        day: 201,
        date: '2025-07-19',
        passages: [{ book: 'Psalms', chapters: '91-100' }],
        historicalContext: {
          period: 'Divine Protection',
          approximateDate: 'c. 1000-400 BC',
          description: 'Ultimate divine security - Psalm 91 divine protection promises, royal psalms celebrating God\'s reign, and creation praising Creator'
        }
      },
      {
        day: 202,
        date: '2025-07-20',
        passages: [{ book: 'Psalms', chapters: '101-110' }],
        historicalContext: {
          period: 'Kingship and Messiah',
          approximateDate: 'c. 1000-400 BC',
          description: 'Royal and messianic reign - David\'s commitment to righteous rule, messianic psalms anticipating Christ\'s eternal priesthood and kingship'
        }
      },
      {
        day: 203,
        date: '2025-07-21',
        passages: [{ book: 'Psalms', chapters: '111-120' }],
        historicalContext: {
          period: 'Wisdom and Deliverance',
          approximateDate: 'c. 1000-400 BC',
          description: 'Godly wisdom and rescue - Acrostic wisdom psalms, individual laments seeking deliverance, and God\'s eternal faithfulness'
        }
      },
      {
        day: 204,
        date: '2025-07-22',
        passages: [{ book: 'Psalms', chapters: '121-130' }],
        historicalContext: {
          period: 'Pilgrimage and Distress',
          approximateDate: 'c. 1000-400 BC',
          description: 'Songs of ascent and suffering - Pilgrimage psalms for temple worship, individual distress seeking divine help, and hope in God\'s word'
        }
      },
      {
        day: 205,
        date: '2025-07-23',
        passages: [{ book: 'Psalms', chapters: '131-140' }],
        historicalContext: {
          period: 'Humility and Lament',
          approximateDate: 'c. 1000-400 BC',
          description: 'Childlike faith and deep suffering - Humility and trust in God, David\'s penitential prayer, and deep suffering with hope'
        }
      },
      {
        day: 206,
        date: '2025-07-24',
        passages: [{ book: 'Psalms', chapters: '141-150' }],
        historicalContext: {
          period: 'Praise and Conquest',
          approximateDate: 'c. 1000-400 BC',
          description: 'Prayer and triumphant praise - Personal prayers for protection, David\'s final praise psalm, and Hallel praising God for conquest'
        }
      },
      {
        day: 207,
        date: '2025-07-25',
        passages: [{ book: 'Proverbs', chapters: '1-5' }],
        historicalContext: {
          period: 'Foundational Wisdom',
          approximateDate: 'c. 950-700 BC',
          description: 'Wisdom foundation and moral training - Fear of Lord as beginning, avoiding sexual immorality, and seeking divine wisdom'
        }
      },
      {
        day: 208,
        date: '2025-07-26',
        passages: [{ book: 'Proverbs', chapters: '6-10' }],
        historicalContext: {
          period: 'Practical Wisdom',
          approximateDate: 'c. 950-700 BC',
          description: 'Daily life applications - Financial wisdom, speech discipline, and contrasting righteous and wicked lifestyles'
        }
      },
      {
        day: 209,
        date: '2025-07-27',
        passages: [{ book: 'Proverbs', chapters: '11-15' }],
        historicalContext: {
          period: 'Character Development',
          approximateDate: 'c. 950-700 BC',
          description: 'Moral character formation - Integrity, humility, and justice contrasted with pride and foolishness, speech consequences'
        }
      },
      {
        day: 210,
        date: '2025-07-28',
        passages: [{ book: 'Proverbs', chapters: '16-20' }],
        historicalContext: {
          period: 'Divine Sovereignty',
          approximateDate: 'c. 950-700 BC',
          description: 'God\'s control and human responsibility - Divine planning versus human planning, justice, generosity, and avoiding foolishness'
        }
      },

      // Days 211-240: Month 12 - Major Prophets and Remaining Wisdom
      {
        day: 211,
        date: '2025-07-29',
        passages: [{ book: 'Proverbs', chapters: '21-25' }],
        historicalContext: {
          period: 'Social Justice',
          approximateDate: 'c. 950-700 BC',
          description: 'Community righteousness and justice - King\'s responsibility, wise speech, justice for poor, and avoiding folly'
        }
      },
      {
        day: 212,
        date: '2025-07-30',
        passages: [{ book: 'Proverbs', chapters: '26-31' }],
        historicalContext: {
          period: 'Complete Wisdom',
          approximateDate: 'c. 950-700 BC',
          description: 'Wisdom culmination - Foolishness characteristics, godly wife virtues, and fear of Lord as supreme wisdom'
        }
      },
      {
        day: 213,
        date: '2025-07-31',
        passages: [{ book: 'Ecclesiastes', chapters: '1-4' }],
        historicalContext: {
          period: 'Life\'s Meaning',
          approximateDate: 'c. 935 BC',
          description: 'Life\'s vanity examined - Solomon\'s search for meaning in wisdom, pleasure, work, and wealth, ultimately finding everything meaningless without God'
        }
      },
      {
        day: 214,
        date: '2025-08-01',
        passages: [{ book: 'Ecclesiastes', chapters: '5-8' }],
        historicalContext: {
          period: 'Wisdom in Worship',
          approximateDate: 'c. 935 BC',
          description: 'Reverent wisdom - Proper worship conduct, wealth limitations, divine timing, and wisdom better than strength'
        }
      },
      {
        day: 215,
        date: '2025-08-02',
        passages: [{ book: 'Ecclesiastes', chapters: '9-12' }],
        historicalContext: {
          period: 'Life\'s Conclusion',
          approximateDate: 'c. 935 BC',
          description: 'Life\'s final evaluation - Death comes to all, wisdom better than folly, youthfulness enjoyed with God, and fear God and keep commandments'
        }
      },
      {
        day: 216,
        date: '2025-08-03',
        passages: [{ book: 'Song of Songs', chapters: '1-4' }],
        historicalContext: {
          period: 'Divine Romance',
          approximateDate: 'c. 965 BC',
          description: 'Sacred marital love - Solomon and Shulamite love story, Christ and Church allegory, celebrating pure marital intimacy'
        }
      },
      {
        day: 217,
        date: '2025-08-04',
        passages: [{ book: 'Song of Songs', chapters: '5-8' }],
        historicalContext: {
          period: 'Love\'s Perfection',
          approximateDate: 'c. 965 BC',
          description: 'Eternal marital commitment - Love stronger than death, mutual belonging, and celebration of exclusive covenant love'
        }
      },
      {
        day: 218,
        date: '2025-08-05',
        passages: [{ book: 'Isaiah', chapters: '1-4' }],
        historicalContext: {
          period: 'Isaiah\'s Calling',
          approximateDate: '740-735 BC',
          description: 'Prophetic commission and Judah sin - Isaiah temple vision and calling, Judah rebellion and empty ritual, future Messiah\'s glorious reign'
        }
      },
      {
        day: 219,
        date: '2025-08-06',
        passages: [{ book: 'Isaiah', chapters: '5-8' }],
        historicalContext: {
          period: 'Judgment and Hope',
          approximateDate: '735-732 BC',
          description: 'Vineyard parable and Immanuel - Judah spiritual adultery, virgin birth prophecy of Immanuel, Assyrian invasion warning'
        }
      },
      {
        day: 220,
        date: '2025-08-07',
        passages: [{ book: 'Isaiah', chapters: '9-12' }],
        historicalContext: {
          period: 'Messiah\'s Kingdom',
          approximateDate: '732-720 BC',
          description: 'Messianic prophecies - Prince of Peace, glorious future kingdom, Israel restoration, and Messianic shoot from Jesse'
        }
      },
      {
        day: 221,
        date: '2025-08-08',
        passages: [{ book: 'Isaiah', chapters: '13-16' }],
        historicalContext: {
          period: 'Babylon Judgment',
          approximateDate: '720-710 BC',
          description: 'Nations judgment day - Babylon destruction, Philistia, Moab, Damascus judgment, and Day of Lord destruction'
        }
      },
      {
        day: 222,
        date: '2025-08-09',
        passages: [{ book: 'Isaiah', chapters: '17-20' }],
        historicalContext: {
          period: 'Egypt and Cush',
          approximateDate: '710-700 BC',
          description: 'Regional powers judgment - Damascus destruction, Egypt humbled, Cush exiled, and Egypt seeking Assyrian help'
        }
      },
      {
        day: 223,
        date: '2025-08-10',
        passages: [{ book: 'Isaiah', chapters: '21-24' }],
        historicalContext: {
          period: 'Prophetic Oracles',
          approximateDate: '700-690 BC',
          description: 'Multiple prophecies - Babylon desert vision, Edom, Arabia, Jerusalem judgment, and cosmic judgment of universe'
        }
      },
      {
        day: 224,
        date: '2025-08-11',
        passages: [{ book: 'Isaiah', chapters: '25-27' }],
        historicalContext: {
          period: 'Divine Celebration',
          approximateDate: '690-680 BC',
          description: 'God\'s salvation feast - Death destroyed forever, Israel\'s restoration, Leviathan judgment, and fruitfulness in God\'s mountain'
        }
      },
      {
        day: 225,
        date: '2025-08-12',
        passages: [{ book: 'Isaiah', chapters: '28-30' }],
        historicalContext: {
          period: 'Woe to Ephraim',
          approximateDate: '680-670 BC',
          description: 'Northern kingdom judgment - Ephraim drunk with pride, Assyrian oppressor, Egypt useless alliance, and returning to God'
        }
      },
      {
        day: 226,
        date: '2025-08-13',
        passages: [{ book: 'Isaiah', chapters: '31-33' }],
        historicalContext: {
          period: 'Trust in God Alone',
          approximateDate: '670-660 BC',
          description: 'Divine protection versus Egypt - Woe to Egypt alliance, Assyrian destroyer, King in beauty, and righteous security'
        }
      },
      {
        day: 227,
        date: '2025-08-14',
        passages: [{ book: 'Isaiah', chapters: '34-36' }],
        historicalContext: {
          period: 'Edom Judgment',
          approximateDate: '660-650 BC',
          description: 'Edom destruction and Hezekiah - Edom eternal desolation, wilderness becoming paradise, Assyrian invasion of Judah'
        }
      },
      {
        day: 228,
        date: '2025-08-15',
        passages: [{ book: 'Isaiah', chapters: '37-39' }],
        historicalContext: {
          period: 'Hezekiah Faith',
          approximateDate: '650-640 BC',
          description: 'Divine deliverance and testing - Hezekiah praying for Jerusalem, Assyrian angelic destruction, illness and wealth display'
        }
      },
      {
        day: 229,
        date: '2025-08-16',
        passages: [{ book: 'Isaiah', chapters: '40-42' }],
        historicalContext: {
          period: 'Comfort and Servant',
          approximateDate: 'c. 700 BC (prophetic)',
          description: 'Comfort for exiles and suffering servant - Voice preparing Messiah way, God eternal, first servant song of substitution'
        }
      },
      {
        day: 230,
        date: '2025-08-17',
        passages: [{ book: 'Isaiah', chapters: '43-45' }],
        historicalContext: {
          period: 'Divine Redemption',
          approximateDate: 'c. 700 BC (prophetic)',
          description: 'God as only Savior - Israel redeemed, Cyrus named as deliverer, idols worthless, and God controlling history'
        }
      },
      {
        day: 231,
        date: '2025-08-18',
        passages: [{ book: 'Isaiah', chapters: '46-48' }],
        historicalContext: {
          period: 'Babylon Judgment',
          approximateDate: 'c. 700 BC (prophetic)',
          description: 'Gods failure and salvation - Babylon gods carried away, God controlling future, Cyrus as chosen instrument'
        }
      },
      {
        day: 232,
        date: '2025-08-19',
        passages: [{ book: 'Isaiah', chapters: '49-51' }],
        historicalContext: {
          period: 'Servant Salvation',
          approximateDate: 'c. 700 BC (prophetic)',
          description: 'Servant and salvation - Second servant song of restoration, Israel comforted, salvation arms adorned with righteousness'
        }
      },
      {
        day: 233,
        date: '2025-08-20',
        passages: [{ book: 'Isaiah', chapters: '52-54' }],
        historicalContext: {
          period: 'Suffering Servant',
          approximateDate: 'c. 700 BC (prophetic)',
          description: 'Messiah\'s suffering and glory - Third servant song of crucifixion, fourth servant song of intercession, barren woman rejoicing'
        }
      },
      {
        day: 234,
        date: '2025-08-21',
        passages: [{ book: 'Isaiah', chapters: '55-57' }],
        historicalContext: {
          period: 'Grace Invitation',
          approximateDate: 'c. 700 BC (prophetic)',
          description: 'Free grace offered - Divine invitation to salvation, wicked ways abandoned, God\'s thoughts higher than human thoughts'
        }
      },
      {
        day: 235,
        date: '2025-08-22',
        passages: [{ book: 'Isaiah', chapters: '58-60' }],
        historicalContext: {
          period: 'True Worship',
          approximateDate: 'c. 700 BC (prophetic)',
          description: 'Authentic fasting and future glory - False religion condemned, true justice and mercy, Jerusalem future glory attracting nations'
        }
      },
      {
        day: 236,
        date: '2025-08-23',
        passages: [{ book: 'Isaiah', chapters: '61-63' }],
        historicalContext: {
          period: 'Messiah\'s Mission',
          approximateDate: 'c. 700 BC (prophetic)',
          description: 'Messiah\'s ministry announced - Jesus reading Isaiah 61 in synagogue, day of vengeance and comfort, divine warrior returning'
        }
      },
      {
        day: 237,
        date: '2025-08-24',
        passages: [{ book: 'Isaiah', chapters: '64-66' }],
        historicalContext: {
          period: 'New Creation',
          approximateDate: 'c. 700 BC (prophetic)',
          description: 'Prayer for restoration and new creation - God tearing heavens, new heavens and new earth, all nations worshiping God'
        }
      },
      {
        day: 238,
        date: '2025-08-25',
        passages: [{ book: 'Jeremiah', chapters: '1-4' }],
        historicalContext: {
          period: 'Prophet\'s Calling',
          approximateDate: '627-622 BC',
          description: 'Jeremiah divine commission - Prophet called from womb, temple warnings, covenant breaking bringing disaster'
        }
      },
      {
        day: 239,
        date: '2025-08-26',
        passages: [{ book: 'Jeremiah', chapters: '5-7' }],
        historicalContext: {
          period: 'Judah Corruption',
          approximateDate: '622-618 BC',
          description: 'National apostasy - No one faithful found, temple worship meaningless, Shiloh judgment as warning for Jerusalem'
        }
      },
      {
        day: 240,
        date: '2025-08-27',
        passages: [{ book: 'Jeremiah', chapters: '8-10' }],
        historicalContext: {
          period: 'Impending Judgment',
          approximateDate: '618-610 BC',
          description: 'Exile inevitable - No balm in Gilead for Judah, worthlessness of idols, Babylon as coming instrument of judgment'
        }
      },

      // Days 241-270: Month 13 - Jeremiah, Lamentations, Ezekiel
      {
        day: 241,
        date: '2025-08-28',
        passages: [{ book: 'Jeremiah', chapters: '11-13' }],
        historicalContext: {
          period: 'Covenant Broken',
          approximateDate: '610-605 BC',
          description: 'Covenant faithlessness - Judah breaking covenant like broken girdle, linen sash symbolizing pride, drought judgment'
        }
      },
      {
        day: 242,
        date: '2025-08-29',
        passages: [{ book: 'Jeremiah', chapters: '14-16' }],
        historicalContext: {
          period: 'Drought Warning',
          approximateDate: '605-597 BC',
          description: 'Natural consequences - Drought, famine, and exile warnings, forbidden marriage and widowhood, prophet\'s personal suffering'
        }
      },
      {
        day: 243,
        date: '2025-08-30',
        passages: [{ book: 'Jeremiah', chapters: '17-19' }],
        historicalContext: {
          period: 'Heart Deceitful',
          approximateDate: '597-594 BC',
          description: 'Human nature and false worship - Heart desperately wicked, Sabbath breaking, Potter\'s sovereignty over nations'
        }
      },
      {
        day: 244,
        date: '2025-08-31',
        passages: [{ book: 'Jeremiah', chapters: '20-22' }],
        historicalContext: {
          period: 'Persecution and Kings',
          approximateDate: '594-587 BC',
          description: 'Prophet persecution and kings - Jeremiah beaten and imprisoned, Zedekiah rebellion, shepherds condemned'
        }
      },
      {
        day: 245,
        date: '2025-09-01',
        passages: [{ book: 'Jeremiah', chapters: '23-25' }],
        historicalContext: {
          period: 'Righteous Branch',
          approximateDate: '587-586 BC',
          description: 'Messianic hope and seventy years - Righteous Branch prophecy, false prophets condemned, seventy-year Babylonian exile'
        }
      },
      {
        day: 246,
        date: '2025-09-02',
        passages: [{ book: 'Jeremiah', chapters: '26-28' }],
        historicalContext: {
          period: 'Temple Warning',
          approximateDate: '586 BC',
          description: 'Temple destruction threatened - Jeremiah temple sermon, prophets lying about peace, Jeremiah vs Hananiah confrontation'
        }
      },
      {
        day: 247,
        date: '2025-09-03',
        passages: [{ book: 'Jeremiah', chapters: '29-31' }],
        historicalContext: {
          period: 'Exile and New Covenant',
          approximateDate: '586-580 BC',
          description: 'Exile hope and new covenant - Letter to exiles promising future, seventy years completion, New Covenant prophecy'
        }
      },
      {
        day: 248,
        date: '2025-09-04',
        passages: [{ book: 'Jeremiah', chapters: '32-34' }],
        historicalContext: {
          period: 'Field Purchase',
          approximateDate: '580-578 BC',
          description: 'Hope in despair - Field purchase proving future return, Zedekiah covenant breaking, slaves taken and returned'
        }
      },
      {
        day: 249,
        date: '2025-09-05',
        passages: [{ book: 'Jeremiah', chapters: '35-37' }],
        historicalContext: {
          period: 'Recabites and Kings',
          approximateDate: '578-562 BC',
          description: 'Faithfulness contrasted - Recabites faithfulness contrasted with Judah unfaithfulness, Jehoiachin and Zedekiah'
        }
      },
      {
        day: 250,
        date: '2025-09-06',
        passages: [{ book: 'Jeremiah', chapters: '38-40' }],
        historicalContext: {
          period: 'Jerusalem Fall',
          approximateDate: '562-560 BC',
          description: 'Jerusalem destruction and exile - Jeremiah imprisoned and rescued, Jerusalem burned and temple destroyed, Gedaliah governor'
        }
      },
      {
        day: 251,
        date: '2025-09-07',
        passages: [{ book: 'Jeremiah', chapters: '41-43' }],
        historicalContext: {
          period: 'Post-Exile Rebellion',
          approximateDate: '560-558 BC',
          description: 'Remnant disobedience - Gedaliah assassination, Ishmael evil, Johanan fleeing to Egypt against God\'s command'
        }
      },
      {
        day: 252,
        date: '2025-09-08',
        passages: [{ book: 'Jeremiah', chapters: '44-46' }],
        historicalContext: {
          period: 'Egypt Judgment',
          approximateDate: '558-556 BC',
          description: 'Judgment in Egypt - Jews in Egypt rebelling, Baruch encouragement, Egypt and surrounding nations judgment'
        }
      },
      {
        day: 253,
        date: '2025-09-09',
        passages: [{ book: 'Jeremiah', chapters: '47-49' }],
        historicalContext: {
          period: 'Nations Judgment',
          approximateDate: '556-554 BC',
          description: 'Regional powers judgment - Philistia, Moab, Ammon, Edom, Damascus, Kedar, and Hazel destruction prophecies'
        }
      },
      {
        day: 254,
        date: '2025-09-10',
        passages: [{ book: 'Jeremiah', chapters: '50-52' }],
        historicalContext: {
          period: 'Babylon Judgment',
          approximateDate: '554-540 BC',
          description: 'Babylon destruction and Judah summary - Babylon judgment for destroying Jerusalem, historical summary of Jerusalem fall'
        }
      },
      {
        day: 255,
        date: '2025-09-11',
        passages: [{ book: 'Lamentations', chapters: '1-5' }],
        historicalContext: {
          period: 'Jerusalem Mourning',
          approximateDate: '586 BC',
          description: 'Lament over Jerusalem - Acrostic poems mourning temple destruction, city siege, suffering, and hope in God\'s mercy'
        }
      },
      {
        day: 256,
        date: '2025-09-12',
        passages: [{ book: 'Ezekiel', chapters: '1-3' }],
        historicalContext: {
          period: 'Prophet\'s Vision',
          approximateDate: '593-592 BC',
          description: 'Divine glory and calling - Chariot throne vision, prophet eating scroll, watchman warning and preparation for ministry'
        }
      },
      {
        day: 257,
        date: '2025-09-13',
        passages: [{ book: 'Ezekiel', chapters: '4-7' }],
        historicalContext: {
          period: 'Prophetic Signs',
          approximateDate: '592-591 BC',
          description: 'Jerusalem siege portrayed - Lying on sides, siege props, shaved head, temple judgment beginning with glory departing'
        }
      },
      {
        day: 258,
        date: '2025-09-14',
        passages: [{ book: 'Ezekiel', chapters: '8-10' }],
        historicalContext: {
          period: 'Temple Abominations',
          approximateDate: '591-590 BC',
          description: 'Idolatry in temple - Vision of temple abominations, glory departing from temple, cherubim and chariot throne'
        }
      },
      {
        day: 259,
        date: '2025-09-15',
        passages: [{ book: 'Ezekiel', chapters: '11-13' }],
        historicalContext: {
          period: 'Judgment and False Prophets',
          approximateDate: '590-589 BC',
          description: 'Leaders judged and false prophets condemned - Jerusalem leaders executed, false prophets lying with plaster walls'
        }
      },
      {
        day: 260,
        date: '2025-09-16',
        passages: [{ book: 'Ezekiel', chapters: '14-16' }],
        historicalContext: {
          period: 'Individual Responsibility',
          approximateDate: '589-588 BC',
          description: 'Personal accountability and Jerusalem history - Elders idolatry judged, righteous save themselves, Jerusalem as unfaithful wife'
        }
      },
      {
        day: 261,
        date: '2025-09-17',
        passages: [{ book: 'Ezekiel', chapters: '17-19' }],
        historicalContext: {
          period: 'Kingship Parables',
          approximateDate: '588-587 BC',
          description: 'Kingly responsibility - Eagle and vine parable, soul dies for own sin, justice and righteousness in leadership'
        }
      },
      {
        day: 262,
        date: '2025-09-18',
        passages: [{ book: 'Ezekiel', chapters: '20-22' }],
        historicalContext: {
          period: 'Israel History',
          approximateDate: '587-586 BC',
          description: 'Israel rebellion history - Wilderness rebellion generation, judgment and preservation, sword against Jerusalem'
        }
      },
      {
        day: 263,
        date: '2025-09-19',
        passages: [{ book: 'Ezekiel', chapters: '23-24' }],
        historicalContext: {
          period: 'Sisters Judah Samaria',
          approximateDate: '586-585 BC',
          description: 'Two unfaithful sisters - Samaria and Jerusalem as prostituting sisters, Babylon executioner, siege beginning'
        }
      },
      {
        day: 264,
        date: '2025-09-20',
        passages: [{ book: 'Ezekiel', chapters: '25-27' }],
        historicalContext: {
          period: 'Surrounding Nations',
          approximateDate: '585-583 BC',
          description: 'Regional judgment - Ammon, Moab, Edom, Philistia, Tyre judgment, Tyre king pride and fall'
        }
      },
      {
        day: 265,
        date: '2025-09-21',
        passages: [{ book: 'Ezekiel', chapters: '28-30' }],
        historicalContext: {
          period: 'Pride and Egypt',
          approximateDate: '583-581 BC',
          description: 'Satan fall and Egypt judgment - Prince of Tyre as Satan type, Egypt defeated by Babylon, Pharaoh broken reed'
        }
      },
      {
        day: 266,
        date: '2025-09-22',
        passages: [{ book: 'Ezekiel', chapters: '31-33' }],
        historicalContext: {
          period: 'Watchman Warning',
          approximateDate: '581-578 BC',
          description: 'Assyria fall and watchman duty - Assyria cedar fall, watchman responsibility, individual salvation emphasized'
        }
      },
      {
        day: 267,
        date: '2025-09-23',
        passages: [{ book: 'Ezekiel', chapters: '34-36' }],
        historicalContext: {
          period: 'Shepherd and Restoration',
          approximateDate: '578-575 BC',
          description: 'True Shepherd and restoration - False shepherds condemned, Good Shepherd promise, dry bones restoration'
        }
      },
      {
        day: 268,
        date: '2025-09-24',
        passages: [{ book: 'Ezekiel', chapters: '37-39' }],
        historicalContext: {
          period: 'Resurrection and Gog',
          approximateDate: '575-572 BC',
          description: 'Resurrection and final battle - Valley of dry bones resurrection, two sticks united, Gog and Magog final war'
        }
      },
      {
        day: 269,
        date: '2025-09-25',
        passages: [{ book: 'Ezekiel', chapters: '40-42' }],
        historicalContext: {
          period: 'Millennial Temple',
          approximateDate: 'c. 570 BC (prophetic)',
          description: 'Future temple vision - Millennial temple measurements and design, priestly chambers, and sacrificial system restored'
        }
      },
      {
        day: 270,
        date: '2025-09-26',
        passages: [{ book: 'Ezekiel', chapters: '43-45' }],
        historicalContext: {
          period: 'Divine Glory',
          approximateDate: 'c. 570 BC (prophetic)',
          description: 'Temple glory and worship - Divine glory returning to temple, altar regulations, prince provisions and worship'
        }
      },

      // Days 271-300: Month 14 - Ezekiel Completion, Daniel, Minor Prophets
      {
        day: 271,
        date: '2025-09-27',
        passages: [{ book: 'Ezekiel', chapters: '46-48' }],
        historicalContext: {
          period: 'Kingdom Order',
          approximateDate: 'c. 570 BC (prophetic)',
          description: 'Millennial worship and land - Prince worship regulations, priestly portions, tribal allotments, and city gates named for tribes'
        }
      },
      {
        day: 272,
        date: '2025-09-28',
        passages: [{ book: 'Daniel', chapters: '1-3' }],
        historicalContext: {
          period: 'Babylonian Captivity',
          approximateDate: '605-580 BC',
          description: 'Faithfulness in exile - Daniel and friends resolved not to defile, golden statue and fiery furnace, divine protection of faithful'
        }
      },
      {
        day: 273,
        date: '2025-09-29',
        passages: [{ book: 'Daniel', chapters: '4-6' }],
        historicalContext: {
          period: 'Divine Sovereignty',
          approximateDate: '580-560 BC',
          description: 'God controls kings - Nebuchadnezzar madness for pride, Belshazzar feast and writing, Daniel in lions den'
        }
      },
      {
        day: 274,
        date: '2025-09-30',
        passages: [{ book: 'Daniel', chapters: '7-9' }],
        historicalContext: {
          period: 'Future Empires',
          approximateDate: 'c. 550 BC (prophetic)',
          description: 'Empires prophecy - Four beasts representing empires, Ancient of Days throne, little horn and future persecution'
        }
      },
      {
        day: 275,
        date: '2025-10-01',
        passages: [{ book: 'Daniel', chapters: '10-12' }],
        historicalContext: {
          period: 'End Times',
          approximateDate: 'c. 540 BC (prophetic)',
          description: 'Tribulation and resurrection - Angelic warfare, future tribulation, resurrection and eternal judgment'
        }
      },
      {
        day: 276,
        date: '2025-10-02',
        passages: [{ book: 'Hosea', chapters: '1-4' }],
        historicalContext: {
          period: 'Northern Kingdom',
          approximateDate: '755-715 BC',
          description: 'Gomer marriage prophecy - Hosea marrying unfaithful wife as Israel, judgment and restoration promised, spiritual adultery'
        }
      },
      {
        day: 277,
        date: '2025-10-03',
        passages: [{ book: 'Hosea', chapters: '5-7' }],
        historicalContext: {
          period: 'Israel Judgment',
          approximateDate: '755-715 BC',
          description: 'Northern kingdom apostasy - Priests and leaders condemned, Israel seeking Assyria help, return and healing promised'
        }
      },
      {
        day: 278,
        date: '2025-10-04',
        passages: [{ book: 'Hosea', chapters: '8-10' }],
        historicalContext: {
          period: 'Idolatry Consequences',
          approximateDate: '755-715 BC',
          description: 'Sin consequences and love - Golden calf worship consequences, Assyrian exile, God\'s unfailing love drawing back'
        }
      },
      {
        day: 279,
        date: '2025-10-05',
        passages: [{ book: 'Hosea', chapters: '11-14' }],
        historicalContext: {
          period: 'Everlasting Love',
          approximateDate: '755-715 BC',
          description: 'Parental love and restoration - God as parent to Israel, final restoration promised, victory over death and return'
        }
      },
      {
        day: 280,
        date: '2025-10-06',
        passages: [{ book: 'Joel', chapters: '1-3' }],
        historicalContext: {
          period: 'Locust Plague',
          approximateDate: 'c. 835-796 BC',
          description: 'Locust judgment and outpouring - Locust plague as judgment precursor, Pentecost Holy Spirit outpouring, Day of Lord judgment'
        }
      },
      {
        day: 281,
        date: '2025-10-07',
        passages: [{ book: 'Amos', chapters: '1-4' }],
        historicalContext: {
          period: 'Social Justice',
          approximateDate: 'c. 760-750 BC',
          description: 'Divine justice for nations - Surrounding nations judged for cruelty, Israel judgment for social injustice, false worship condemned'
        }
      },
      {
        day: 282,
        date: '2025-10-08',
        passages: [{ book: 'Amos', chapters: '5-7' }],
        historicalContext: {
          period: 'Day of Lord',
          approximateDate: 'c. 760-750 BC',
          description: 'False religion warning - Seek God not rituals, Day of Lord darkness for wicked, famine of hearing God\'s word, restoration booth'
        }
      },
      {
        day: 283,
        date: '2025-10-09',
        passages: [{ book: 'Amos', chapters: '8-9' }],
        historicalContext: {
          period: 'Vision Completion',
          approximateDate: 'c. 760-750 BC',
          description: 'Final visions - Basket of summer fruit ending prosperity, God standing by altar judging, restoration of David fallen tent'
        }
      },
      {
        day: 284,
        date: '2025-10-10',
        passages: [{ book: 'Obadiah', chapters: '1' }, { book: 'Jonah', chapters: '1-4' }],
        historicalContext: {
          period: 'Nations and God',
          approximateDate: 'c. 845-770 BC',
          description: 'God\'s judgment and mercy to nations - Edom pride condemned, Nineveh repentance and salvation, God\'s heart for all peoples'
        }
      },
      {
        day: 285,
        date: '2025-10-11',
        passages: [{ book: 'Micah', chapters: '1-3' }],
        historicalContext: {
          period: 'Justice and Peace',
          approximateDate: 'c. 750-687 BC',
          description: 'Judgment and future peace - Samaria judgment, Bethlehem prophecy of Messiah birth, peace and weapons transformed'
        }
      },
      {
        day: 286,
        date: '2025-10-12',
        passages: [{ book: 'Micah', chapters: '4-5' }],
        historicalContext: {
          period: 'Future Kingdom',
          approximateDate: 'c. 750-687 BC',
          description: 'Millennial peace and Messiah - Lord\'s house established in mountains, universal peace, Messiah from Bethlehem ruling'
        }
      },
      {
        day: 287,
        date: '2025-10-13',
        passages: [{ book: 'Micah', chapters: '6-7' }],
        historicalContext: {
          period: 'True Worship',
          approximateDate: 'c. 750-687 BC',
          description: 'Divine requirements - God requires justice, mercy, humility, lament over national corruption, hope in God\'s faithfulness'
        }
      },
      {
        day: 288,
        date: '2025-10-14',
        passages: [{ book: 'Nahum', chapters: '1-3' }, { book: 'Habakkuk', chapters: '1-3' }],
        historicalContext: {
          period: 'Prophetic Judgment',
          approximateDate: 'c. 663-605 BC',
          description: 'Nineveh judgment and faith questions - Nineveh destruction, God slow to anger but just, living by faith'
        }
      },
      {
        day: 289,
        date: '2025-10-15',
        passages: [{ book: 'Zephaniah', chapters: '1-3' }, { book: 'Haggai', chapters: '1-2' }],
        historicalContext: {
          period: 'Day of Lord and Temple',
          approximateDate: 'c. 640-520 BC',
          description: 'Great Day of Lord and temple rebuilding - Global judgment, remnant purification, call to rebuild God\'s house'
        }
      },
      {
        day: 290,
        date: '2025-10-16',
        passages: [{ book: 'Zechariah', chapters: '1-4' }],
        historicalContext: {
          period: 'Temple Rebuilding',
          approximateDate: '520 BC',
          description: 'Temple reconstruction priority - People building own houses instead of temple, God withholding blessing, temple rebuilding encouraged'
        }
      },
      {
        day: 291,
        date: '2025-10-17',
        passages: [{ book: 'Zechariah', chapters: '1-4' }],
        historicalContext: {
          period: 'Vision Series',
          approximateDate: '520-518 BC',
          description: 'Eight visions of restoration - Horsemen patrolling earth, four horns and craftsmen, measuring Jerusalem, high priest purified'
        }
      },
      {
        day: 292,
        date: '2025-10-18',
        passages: [{ book: 'Zechariah', chapters: '5-7' }],
        historicalContext: {
          period: 'Continued Visions',
          approximateDate: '520-518 BC',
          description: 'Flying scroll and lampstands - Sin removal, Joshua crowned as priest-king type, fasting turned to feasting'
        }
      },
      {
        day: 293,
        date: '2025-10-19',
        passages: [{ book: 'Zechariah', chapters: '8-10' }],
        historicalContext: {
          period: 'Future Jerusalem',
          approximateDate: 'c. 520 BC (prophetic)',
          description: 'Jerusalem future glory - City full of children and peace, Messiah king riding donkey, shepherd flock scattered'
        }
      },
      {
        day: 294,
        date: '2025-10-20',
        passages: [{ book: 'Zechariah', chapters: '11-12' }],
        historicalContext: {
          period: 'Rejection and Piercing',
          approximateDate: 'c. 520 BC (prophetic)',
          description: 'Messiah rejected and pierced - False shepherd condemned, 30 pieces of silver, Jerusalem looking on pierced one'
        }
      },
      {
        day: 295,
        date: '2025-10-21',
        passages: [{ book: 'Zechariah', chapters: '13-14' }],
        historicalContext: {
          period: 'Messianic Kingdom',
          approximateDate: 'c. 520 BC (prophetic)',
          description: 'Final purification and coming - Fountain opened for sin, Messiah return to Mount of Olives, living waters flowing'
        }
      },
      {
        day: 296,
        date: '2025-10-22',
        passages: [{ book: 'Malachi', chapters: '1-4' }],
        historicalContext: {
          period: 'Post-Exile Reform',
          approximateDate: 'c. 433 BC',
          description: 'Final Old Testament message - Priests offering defective sacrifices, divorce condemned, Elijah coming before Messiah'
        }
      },
      {
        day: 297,
        date: '2025-10-23',
        passages: [{ book: 'Matthew', chapters: '1-4' }],
        historicalContext: {
          period: 'Messiah\'s Arrival',
          approximateDate: 'AD 26-27',
          description: 'Jesus birth and ministry beginning - Virgin birth fulfilling Isaiah prophecy, John Baptist preparing way, temptation victory'
        }
      },
      {
        day: 298,
        date: '2025-10-24',
        passages: [{ book: 'Matthew', chapters: '5-7' }],
        historicalContext: {
          period: 'Sermon on Mount',
          approximateDate: 'AD 27-28',
          description: 'Kingdom ethics and righteousness - Beatitudes blessings, salt and light influence, law fulfillment and surpassing righteousness'
        }
      },

      // Days 301-365: Months 15-16 - Complete New Testament
      {
        day: 299,
        date: '2025-10-25',
        passages: [{ book: 'Matthew', chapters: '8-10' }],
        historicalContext: {
          period: 'Kingdom Power',
          approximateDate: 'AD 28-29',
          description: 'Messiah\'s authority demonstrated - Healing diseases, calming storms, casting out demons, sending disciples with authority'
        }
      },
      {
        day: 300,
        date: '2025-10-26',
        passages: [{ book: 'Matthew', chapters: '11-13' }],
        historicalContext: {
          period: 'Kingdom Mysteries',
          approximateDate: 'AD 29',
          description: 'Kingdom mysteries revealed - John Baptist questioning, kingdom parables explaining mysteries, rejection prophesied'
        }
      },
      {
        day: 301,
        date: '2025-10-27',
        passages: [{ book: 'Matthew', chapters: '14-16' }],
        historicalContext: {
          period: 'Rejection and Revelation',
          approximateDate: 'AD 29-30',
          description: 'Opposition and confession - John Baptist beheaded, feeding 5000, walking on water, Peter confessing Jesus as Messiah'
        }
      },
      {
        day: 302,
        date: '2025-10-28',
        passages: [{ book: 'Matthew', chapters: '17-19' }],
        historicalContext: {
          period: 'Glory and Teaching',
          approximateDate: 'AD 30',
          description: 'Transfiguration and kingdom teaching - Christ glorified on mountain, childlike humility, marriage and divorce, rich young ruler'
        }
      },
      {
        day: 303,
        date: '2025-10-29',
        passages: [{ book: 'Matthew', chapters: '20-22' }],
        historicalContext: {
          period: 'Kingdom Service',
          approximateDate: 'AD 30-31',
          description: 'Servant leadership and passion week - Great servant principle, triumphal entry, temple cleansing, final controversies'
        }
      },
      {
        day: 304,
        date: '2025-10-30',
        passages: [{ book: 'Matthew', chapters: '23-25' }],
        historicalContext: {
          period: 'Judgment Prophecies',
          approximateDate: 'AD 31',
          description: 'Woes and end times - Seven woes to Pharisees, Olivet discourse on temple destruction, final judgment separation'
        }
      },
      {
        day: 305,
        date: '2025-10-31',
        passages: [{ book: 'Matthew', chapters: '26-28' }],
        historicalContext: {
          period: 'Death and Resurrection',
          approximateDate: 'AD 33',
          description: 'Passion and victory - Last Supper, Gethsemane, betrayal, crucifixion, resurrection, Great Commission'
        }
      },
      {
        day: 306,
        date: '2025-11-01',
        passages: [{ book: 'Mark', chapters: '1-4' }],
        historicalContext: {
          period: 'Miracle Ministry',
          approximateDate: 'AD 27-29',
          description: 'Action-packed ministry - John Baptist, baptism, temptation, immediate healing and casting out demons, parable teaching'
        }
      },
      {
        day: 307,
        date: '2025-11-02',
        passages: [{ book: 'Mark', chapters: '5-8' }],
        historicalContext: {
          period: 'Miracle Power',
          approximateDate: 'AD 29-30',
          description: 'Demonstrated divine authority - Legion demons cast out, Jairus daughter raised, feeding 5000 and 4000, walking on water'
        }
      },
      {
        day: 308,
        date: '2025-11-03',
        passages: [{ book: 'Mark', chapters: '9-12' }],
        historicalContext: {
          period: 'Teaching and Conflict',
          approximateDate: 'AD 30',
          description: 'Transfiguration and opposition - Christ glorified, childlike faith, rich man, triumphal entry, temple controversies'
        }
      },
      {
        day: 309,
        date: '2025-11-04',
        passages: [{ book: 'Mark', chapters: '13-16' }],
        historicalContext: {
          period: 'End Times and Victory',
          approximateDate: 'AD 30-33',
          description: 'Olivet discourse and resurrection - Temple destruction prophesied, final week events, crucifixion, empty tomb'
        }
      },
      {
        day: 310,
        date: '2025-11-05',
        passages: [{ book: 'Luke', chapters: '1-3' }],
        historicalContext: {
          period: 'Birth Preparation',
          approximateDate: 'AD 6-4 BC to AD 26',
          description: 'Salvation history preparation - Angelic announcements, Jesus birth, childhood, John Baptist ministry, Jesus baptism'
        }
      },
      {
        day: 311,
        date: '2025-11-06',
        passages: [{ book: 'Luke', chapters: '4-6' }],
        historicalContext: {
          period: 'Galilean Ministry',
          approximateDate: 'AD 26-27',
          description: 'Rejection and compassion - Nazareth rejection, calling disciples, healing and teaching, Sabbath controversies'
        }
      },
      {
        day: 312,
        date: '2025-11-07',
        passages: [{ book: 'Luke', chapters: '7-9' }],
        historicalContext: {
          period: 'Ministry Expansion',
          approximateDate: 'AD 27-28',
          description: 'Compassionate ministry - Centurion servant healed, sinful woman forgiven, parable teaching, feeding 5000'
        }
      },
      {
        day: 313,
        date: '2025-11-08',
        passages: [{ book: 'Luke', chapters: '10-12' }],
        historicalContext: {
          period: 'Discipleship Training',
          approximateDate: 'AD 28-29',
          description: 'Kingdom teaching - Seventy sent out, Good Samaritan, Mary and Martha, prayer teaching, kingdom opposition'
        }
      },
      {
        day: 314,
        date: '2025-11-09',
        passages: [{ book: 'Luke', chapters: '13-15' }],
        historicalContext: {
          period: 'Salvation Universal',
          approximateDate: 'AD 29-30',
          description: 'Universal salvation offered - Repent or perish, kingdom growth, healing woman, salvation party for lost found'
        }
      },
      {
        day: 315,
        date: '2025-11-10',
        passages: [{ book: 'Luke', chapters: '16-18' }],
        historicalContext: {
          period: 'Kingdom Priorities',
          approximateDate: 'AD 30',
          description: 'Eternal priorities - Rich man and Lazarus, unjust steward, persistent prayer, rich young ruler, Zacchaeus'
        }
      },
      {
        day: 316,
        date: '2025-11-11',
        passages: [{ book: 'Luke', chapters: '19-21' }],
        historicalContext: {
          period: 'Jerusalem Ministry',
          approximateDate: 'AD 30-31',
          description: 'Triumphal and prophetic - Zacchaeus conversion, triumphal entry, temple cleansing, Olivet discourse, watchfulness'
        }
      },
      {
        day: 317,
        date: '2025-11-12',
        passages: [{ book: 'Luke', chapters: '22-24' }],
        historicalContext: {
          period: 'Passion Victory',
          approximateDate: 'AD 33',
          description: 'Last Supper through resurrection - Passover celebration, Gethsemane, trials, crucifixion, resurrection appearances'
        }
      },
      {
        day: 318,
        date: '2025-11-13',
        passages: [{ book: 'John', chapters: '1-3' }],
        historicalContext: {
          period: 'Divine Sonship',
          approximateDate: 'AD 26-27',
          description: 'Word became flesh - Prologue declaring Christ\'s deity, first miracle, temple cleansing, Nicodemus regeneration teaching'
        }
      },
      {
        day: 319,
        date: '2025-11-14',
        passages: [{ book: 'John', chapters: '4-6' }],
        historicalContext: {
          period: 'Living Water',
          approximateDate: 'AD 27-28',
          description: 'Life in Christ - Samaritan woman at well, nobleman\'s son healed, invalid man at Bethesda, feeding 5000, walking on water'
        }
      },
      {
        day: 320,
        date: '2025-11-15',
        passages: [{ book: 'John', chapters: '7-9' }],
        historicalContext: {
          period: 'Light of World',
          approximateDate: 'AD 28-30',
          description: 'Conflict over identity - Feast of Tabernacles, living water, light of world, born blind healed, Good Shepherd'
        }
      },
      {
        day: 321,
        date: '2025-11-16',
        passages: [{ book: 'John', chapters: '10-12' }],
        historicalContext: {
          period: 'Life and Death',
          approximateDate: 'AD 30-31',
          description: 'Victory over death - Good Shepherd laying down life, raising Lazarus, triumphal entry, Greeks seeking Jesus'
        }
      },
      {
        day: 322,
        date: '2025-11-17',
        passages: [{ book: 'John', chapters: '13-15' }],
        historicalContext: {
          period: 'Upper Room Discourse',
          approximateDate: 'AD 31-32',
          description: 'Love and fellowship - Foot washing, new commandment, Father\'s house preparation, Holy Spirit promise, vine and branches'
        }
      },
      {
        day: 323,
        date: '2025-11-18',
        passages: [{ book: 'John', chapters: '16-18' }],
        historicalContext: {
          period: 'High Priestly Prayer',
          approximateDate: 'AD 32-33',
          description: 'Prayer and arrest - Holy Spirit ministry, high priestly prayer for unity, garden arrest, trials before Annas and Pilate'
        }
      },
      {
        day: 324,
        date: '2025-11-19',
        passages: [{ book: 'John', chapters: '19-21' }],
        historicalContext: {
          period: 'Crucifixion and Commission',
          approximateDate: 'AD 33',
          description: 'Victory and mission - Crucifixion fulfilling Scripture, burial and resurrection, Peter restored, Great Commission'
        }
      },
      {
        day: 325,
        date: '2025-11-20',
        passages: [{ book: 'Acts', chapters: '1-5' }],
        historicalContext: {
          period: 'Church Birth',
          approximateDate: 'AD 33-35',
          description: 'Holy Spirit empowerment - Ascension, upper room prayer, Pentecost birth, healing and boldness, Ananias/Sapphira judgment'
        }
      },
      {
        day: 326,
        date: '2025-11-21',
        passages: [{ book: 'Acts', chapters: '6-9' }],
        historicalContext: {
          period: 'Church Expansion',
          approximateDate: 'AD 35-37',
          description: 'Gospel spreads beyond Jerusalem - Deacons appointed, Stephen martyred, Philip in Samaria, Saul conversion, Cornelius Gentile conversion'
        }
      },
      {
        day: 327,
        date: '2025-11-22',
        passages: [{ book: 'Acts', chapters: '10-13' }],
        historicalContext: {
          period: 'Gentile Mission',
          approximateDate: 'AD 37-46',
          description: 'Mission to the world - Cornelius household saved, Antioch church established, Barnabas and Saul commissioned, Cyprus ministry'
        }
      },
      {
        day: 328,
        date: '2025-11-23',
        passages: [{ book: 'James', chapters: '1-5' }],
        historicalContext: {
          period: 'Practical Faith',
          approximateDate: 'AD 45-48',
          description: 'Living faith - Trials producing perseverance, controlling tongue, caring for orphans and widows, faith without works dead, prayer power'
        }
      },
      {
        day: 329,
        date: '2025-11-24',
        passages: [{ book: 'Acts', chapters: '14-16' }],
        historicalContext: {
          period: 'Missionary Journeys',
          approximateDate: 'AD 46-50',
          description: 'First missionary journey - Iconium opposition, Lystra healing, Jerusalem council, second journey begins, Philippi church'
        }
      },
      {
        day: 330,
        date: '2025-11-25',
        passages: [{ book: 'Acts', chapters: '17-19' }],
        historicalContext: {
          period: 'Macedonian Greece',
          approximateDate: 'AD 50-52',
          description: 'European evangelization - Thessalonica church, Berean noble-mindedness, Athens Mars Hill, Corinth ministry, Ephesus preparation'
        }
      },
      {
        day: 331,
        date: '2025-11-26',
        passages: [{ book: 'Acts', chapters: '20-22' }],
        historicalContext: {
          period: 'Final Journeys',
          approximateDate: 'AD 52-58',
          description: 'Paul\'s farewell journeys - Ephesus revival, Macedonia and Greece final visit, Jerusalem trip, defense before council'
        }
      },
      {
        day: 332,
        date: '2025-11-27',
        passages: [{ book: 'Acts', chapters: '23-25' }],
        historicalContext: {
          period: 'Roman Journey',
          approximateDate: 'AD 58-60',
          description: 'Appeal to Caesar - Plot against Paul, Roman citizen protection, defense before governors, appeal to Caesar, voyage to Rome'
        }
      },
      {
        day: 333,
        date: '2025-11-28',
        passages: [{ book: 'Acts', chapters: '26-28' }],
        historicalContext: {
          period: 'Rome Ministry',
          approximateDate: 'AD 60-62',
          description: 'Witness in Rome - Defense before Agrippa, hazardous voyage, shipwreck and survival, Rome house church ministry, ongoing gospel advance'
        }
      },
      {
        day: 334,
        date: '2025-11-29',
        passages: [{ book: 'Romans', chapters: '1-5' }],
        historicalContext: {
          period: 'Justification by Faith',
          approximateDate: 'AD 57',
          description: 'Righteousness by faith - Universal sinfulness, justification by faith alone, Abraham example of faith, peace with God through Christ'
        }
      },
      {
        day: 335,
        date: '2025-11-30',
        passages: [{ book: 'Romans', chapters: '6-8' }],
        historicalContext: {
          period: 'Sanctification',
          approximateDate: 'AD 57',
          description: 'Victory over sin - Baptized into Christ death, slavery to righteousness versus sin, life in Spirit versus flesh, ultimate glorification'
        }
      },
      {
        day: 336,
        date: '2025-12-01',
        passages: [{ book: 'Romans', chapters: '9-11' }],
        historicalContext: {
          period: 'Israel\'s Future',
          approximateDate: 'AD 57',
          description: 'Israel restoration - God\'s sovereign election, Israel stumbling but not fallen, future salvation of all Israel, Gentile inclusion'
        }
      },
      {
        day: 337,
        date: '2025-12-02',
        passages: [{ book: 'Romans', chapters: '12-14' }],
        historicalContext: {
          period: 'Christian Living',
          approximateDate: 'AD 57',
          description: 'Practical righteousness - Living sacrifices, spiritual gifts, genuine love, submission to authorities, Christian liberty'
        }
      },
      {
        day: 338,
        date: '2025-12-03',
        passages: [{ book: '1 Corinthians', chapters: '1-5' }],
        historicalContext: {
          period: 'Church Problems',
          approximateDate: 'AD 55',
          description: 'Divisive church issues - Wisdom of cross versus human wisdom, divisions, immorality confronting, church discipline'
        }
      },
      {
        day: 339,
        date: '2025-12-04',
        passages: [{ book: '1 Corinthians', chapters: '6-9' }],
        historicalContext: {
          period: 'Christian Freedom',
          approximateDate: 'AD 55',
          description: 'Freedom with responsibility - Lawsuits forbidden, sexual immorality forbidden, marriage principles, Christian rights surrendered'
        }
      },
      {
        day: 340,
        date: '2025-12-05',
        passages: [{ book: '1 Corinthians', chapters: '10-13' }],
        historicalContext: {
          period: 'Spiritual Gifts',
          approximateDate: 'AD 55',
          description: 'Superior gifts - Israelite warning examples, Christian freedom, spiritual gifts, supreme gift of love'
        }
      },
      {
        day: 341,
        date: '2025-12-06',
        passages: [{ book: '1 Corinthians', chapters: '14-16' }],
        historicalContext: {
          period: 'Order and Resurrection',
          approximateDate: 'AD 55',
          description: 'Church order and hope - Orderly worship, resurrection certainty, final greetings and collection for Jerusalem'
        }
      },
      {
        day: 342,
        date: '2025-12-07',
        passages: [{ book: '2 Corinthians', chapters: '1-5' }],
        historicalContext: {
          period: 'Godly Sorrow',
          approximateDate: 'AD 56',
          description: 'Ministry of comfort - God comforts in all afflictions, ministry of reconciliation, triumphal procession, earthen vessels treasure'
        }
      },
      {
        day: 343,
        date: '2025-12-08',
        passages: [{ book: '2 Corinthians', chapters: '6-9' }],
        historicalContext: {
          period: 'Generosity',
          approximateDate: 'AD 56',
          description: 'Christ\'s ambassadors - Separation from world, Macedonian generosity example, cheerful giving principle, God\'s abundant grace'
        }
      },
      {
        day: 344,
        date: '2025-12-09',
        passages: [{ book: '2 Corinthians', chapters: '10-13' }],
        historicalContext: {
          period: 'Apostolic Authority',
          approximateDate: 'AD 56',
          description: 'True apostleship - Divine authority versus false apostles, thorn in flesh weakness, Christ power perfected, self-examination'
        }
      },
      {
        day: 345,
        date: '2025-12-10',
        passages: [{ book: 'Galatians', chapters: '1-4' }],
        historicalContext: {
          period: 'Gospel Freedom',
          approximateDate: 'AD 49',
          description: 'Justification by faith alone - Paul apostleship defended, justification by faith, Abraham example of faith, slavery to law versus freedom'
        }
      },
      {
        day: 346,
        date: '2025-12-11',
        passages: [{ book: 'Galatians', chapters: '5-6' }],
        historicalContext: {
          period: 'Spirit-Filled Life',
          approximateDate: 'AD 49',
          description: 'Freedom in Spirit - Liberty from law, fruit of Spirit versus works of flesh, bearing burdens, sowing and reaping principle'
        }
      },
      {
        day: 347,
        date: '2025-12-12',
        passages: [{ book: 'Ephesians', chapters: '1-4' }],
        historicalContext: {
          period: 'Church Unity',
          approximateDate: 'AD 61',
          description: 'Church as Christ body - Spiritual blessings in Christ, church unity, mystery of Gentile inclusion, growing into maturity'
        }
      },
      {
        day: 348,
        date: '2025-12-13',
        passages: [{ book: 'Ephesians', chapters: '5-6' }],
        historicalContext: {
          period: 'Christian Relationships',
          approximateDate: 'AD 61',
          description: 'Christ-like living - Walk in love, marriage as Christ/church, children/parents relationship, masters/slaves, spiritual warfare'
        }
      },
      {
        day: 349,
        date: '2025-12-14',
        passages: [{ book: 'Philippians', chapters: '1-4' }],
        historicalContext: {
          period: 'Christian Joy',
          approximateDate: 'AD 62',
          description: 'Rejoicing in Christ - Partnership in gospel, Christ exaltation example, pressing toward goal, contentment in all circumstances'
        }
      },
      {
        day: 350,
        date: '2025-12-15',
        passages: [{ book: 'Colossians', chapters: '1-4' }, { book: 'Philemon', chapters: '1' }],
        historicalContext: {
          period: 'Christ Supremacy',
          approximateDate: 'AD 62',
          description: 'Christ all-sufficient - Christ supremacy over all creation, fullness in Christ versus human philosophy, heavenly focus, Christian brotherhood and forgiveness'
        }
      },
      {
        day: 351,
        date: '2025-12-16',
        passages: [{ book: '1 Thessalonians', chapters: '1-5' }, { book: '2 Thessalonians', chapters: '1-3' }],
        historicalContext: {
          period: 'Christ Return',
          approximateDate: 'AD 51-52',
          description: 'Living in expectation - Faith love hope example, holy living, comfort about dead in Christ, day of Lord readiness, standing firm in apostasy'
        }
      },
      {
        day: 352,
        date: '2025-12-17',
        passages: [{ book: '1 Timothy', chapters: '1-6' }],
        historicalContext: {
          period: 'Church Leadership',
          approximateDate: 'AD 63',
          description: 'Pastoral instructions - Sound doctrine, church leadership qualifications, caring for widows, false teachers warning, contentment'
        }
      },
      {
        day: 353,
        date: '2025-12-18',
        passages: [{ book: '2 Timothy', chapters: '1-4' }],
        historicalContext: {
          period: 'Final Commission',
          approximateDate: 'AD 67',
          description: 'Faithful ministry example - Not ashamed of gospel, faithful example, last days apostasy, Scripture inspiration, crown of righteousness'
        }
      },
      {
        day: 354,
        date: '2025-12-19',
        passages: [{ book: 'Titus', chapters: '1-3' }],
        historicalContext: {
          period: 'Island Church',
          approximateDate: 'AD 64',
          description: 'Crete church organization - Elder qualifications, sound doctrine teaching, Christian living example, good works emphasis'
        }
      },
      {
        day: 355,
        date: '2025-12-20',
        passages: [{ book: '1 Peter', chapters: '1-5' }],
        historicalContext: {
          period: 'Suffering Glory',
          approximateDate: 'AD 64-65',
          description: 'Victorious suffering - Living hope through resurrection, holy living, suffering for righteousness, submission to authorities, resisting devil'
        }
      },
      {
        day: 356,
        date: '2025-12-21',
        passages: [{ book: 'Hebrews', chapters: '1-4' }],
        historicalContext: {
          period: 'Christ Superiority',
          approximateDate: 'AD 64-68',
          description: 'Christ above all - Christ superior to prophets and angels, Christ as faithful high priest, Sabbath rest for believers'
        }
      },
      {
        day: 357,
        date: '2025-12-22',
        passages: [{ book: 'Hebrews', chapters: '5-8' }],
        historicalContext: {
          period: 'Perfect High Priest',
          approximateDate: 'AD 64-68',
          description: 'Melchizedek priesthood - Christ as perfect high priest, warning against apostasy, better covenant, heavenly sanctuary'
        }
      },
      {
        day: 358,
        date: '2025-12-23',
        passages: [{ book: 'Hebrews', chapters: '9-13' }],
        historicalContext: {
          period: 'Perfect Sacrifice and Faith',
          approximateDate: 'AD 64-68',
          description: 'Christ sufficient sacrifice and faith heroes - Better sacrifice once for all, confident access to God, faith hall of fame, enduring discipline'
        }
      },
      {
        day: 359,
        date: '2025-12-24',
        passages: [{ book: '2 Peter', chapters: '1-3' }, { book: 'Jude', chapters: '1' }],
        historicalContext: {
          period: 'Apostasy Warning',
          approximateDate: 'AD 66-68',
          description: 'True knowledge and false teachers - Divine power for godliness, false teachers condemnation, end times scoffers, new heavens and new earth, contending for the faith'
        }
      },
      {
        day: 360,
        date: '2025-12-25',
        passages: [{ book: '1 John', chapters: '1-5' }],
        historicalContext: {
          period: 'Fellowship and Love',
          approximateDate: 'AD 85-95',
          description: 'Walking in light - Fellowship with God and believers, testing the spirits, love one another, assurance of salvation, knowing God through love'
        }
      },
      {
        day: 361,
        date: '2025-12-26',
        passages: [{ book: '2 John', chapters: '1' }, { book: '3 John', chapters: '1' }],
        historicalContext: {
          period: 'Truth and Love',
          approximateDate: 'AD 85-95',
          description: 'Walking in truth and hospitality - Love in truth, walking in Christ\'s commandments, warning against deceivers, supporting gospel workers'
        }
      },
      {
        day: 362,
        date: '2025-12-27',
        passages: [{ book: 'Revelation', chapters: '1-5' }],
        historicalContext: {
          period: 'Apocalypse Begins',
          approximateDate: 'AD 95',
          description: 'Christ among the churches - John\'s vision on Patmos, Christ among seven lampstands, letters to Ephesus, Smyrna, Pergamum, Thyatira, Sardis, Philadelphia, Laodicea'
        }
      },
      {
        day: 363,
        date: '2025-12-28',
        passages: [{ book: 'Revelation', chapters: '6-11' }],
        historicalContext: {
          period: 'Seal and Trumpet Judgments',
          approximateDate: 'AD 95',
          description: 'Divine judgments unfold - Seven seals opened, 144,000 sealed, seven trumpets sounded, two witnesses testify, seventh trumpet announces God\'s kingdom'
        }
      },
      {
        day: 364,
        date: '2025-12-29',
        passages: [{ book: 'Revelation', chapters: '12-18' }],
        historicalContext: {
          period: 'Cosmic Conflict',
          approximateDate: 'AD 95',
          description: 'Spiritual warfare revealed - Woman and dragon, beast from sea and earth, lamb and 144,000, three angels\' messages, seven bowls of wrath, fall of Babylon'
        }
      },
      {
        day: 365,
        date: '2025-12-30',
        passages: [{ book: 'Revelation', chapters: '19-22' }],
        historicalContext: {
          period: 'Consummation',
          approximateDate: 'AD 95',
          description: 'All things new - Christ\'s victorious return, defeat of beast and false prophet, Satan bound and judged, great white throne, New Jerusalem, eternity with God'
        }
      },
    ];

    return {
      dailyReadings,
      metadata: {
        totalDays: 365,
        source: 'Logos Academic Official Chronological Reading Plan with Historical Context'
      }
    };
  }
}