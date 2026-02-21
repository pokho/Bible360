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
      commentary: reading.commentary,
      commentaryType: reading.commentaryType
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
        description: 'Event-based chronological timeline with comprehensive historical context following conservative biblical chronology. 280 OT / 85 NT day distribution.',
        totalDays: parsedPlan.metadata.totalDays,
        averageReadingTime: 20,
        language: 'English',
        version: '3.0 Restructured',
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
    return Math.max(10, totalChapters * 5);
  }

  private hasApocrypha(passages: Array<{ book: string; chapters?: string; chapterStart?: number; chapterEnd?: number }>): boolean {
    return passages.some(passage => this.isApocryphal(passage.book));
  }

  private getHistoricalContext(day: number, passages: Array<{ book: string; chapters?: string; chapterStart?: number; chapterEnd?: number }>): HistoricalContext | undefined {
    const book = passages[0]?.book;
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
    const dailyReadings = this.generateCompleteTimeline();
    return {
      dailyReadings: dailyReadings.map(r => ({
        day: r.day,
        date: r.date,
        passages: r.passages.map(p => ({
          book: p.book,
          chapterStart: p.chapterStart,
          chapterEnd: p.chapterEnd
        })),
        historicalContext: r.historicalContext,
        commentary: r.commentary,
        commentaryType: r.commentaryType
      })),
      metadata: {
        totalDays: dailyReadings.length,
        source: 'Biblehub Timeline - Restructured Chronological Plan (320 days, expandable to 365)'
      }
    };
  }

  private getDateForDay(day: number): string {
    const date = new Date(2025, 0, day);
    return date.toISOString().split('T')[0];
  }

  // ========================================
  // MAIN TIMELINE GENERATOR
  // ========================================
  private generateCompleteTimeline(): DailyReading[] {
    const readings: DailyReading[] = [];
    let day = 1;

    // ===== OLD TESTAMENT: Days 1-280 =====

    // PHASE 1: Primeval History (Days 1-14)
    // Day 1: Creation
    readings.push(this.createReading(day++, [
      { book: 'John', chapterStart: 1, chapterEnd: 1 },
      { book: 'Genesis', chapterStart: 1, chapterEnd: 2 }
    ], 'Primeval History', 'Before Time - 4000 BC',
      'The Eternal Word and Creation Week - Foundation of all history, the divine Trinity, and the perfect creation of humanity and the world',
      '👨🏾‍💻 Paul\'s Recommendation: The TPT (The Passion Translation) version of Genesis is highly recommended, especially Genesis 2, which beautifully portrays the intimacy of God\'s relationship with humanity. Read it here: https://www.bible.com/bible/1849/GEN.2.TPT',
      'paul'
    ));

    // Day 2: Fall
    readings.push(this.createReading(day++, [{ book: 'Genesis', chapterStart: 3, chapterEnd: 5 }],
      'Primeval History', 'Before 3000 BC',
      'The Fall and Consequences - Sin enters the world through Adam and Eve, beginning of human violence and the righteous lineage leading to Noah',
      `📜 FROM PAUL: When reading Genesis 5 which outlines the genealogy of Adam and Eve until Noah, it is useful also to remember the full genealogy until Jesus - and remember/recognise/value all the people, the men and women leading up to the coming of the Lord and Saviour. We find some of their names in Matthew 1 and Luke 3.

From Adam to David (Common Lineage): God → Adam and Eve (Eve means LIFE-GIVER) → Seth (Abel means VANITY, Seth means SUBSTITUTE/in-place-of) → Enosh → Cainan → Mahalalel → Jared → Enoch (DEDICATED to God) → Methuselah → Lamech → Noah (means REST) → Shem → Arphaxad → Cainan → Shelah → Eber → Peleg → Reu → Serug → Nahor → Terah → Abraham and Sarah → Isaac and Rebekah (Rebekah means "captivated by her beauty") → Jacob → Judah and Tamar → Perez (BREACH) → Hezron → Ram → Amminadab → Nahshon → Salmon (means CLOTHES) and Rahab (was a prostitute) → Boaz and Ruth (Ruth means FRIEND) → Obed → Jesse → David and Bathsheba (Bathsheba means DAUGHTER-OF-AN-OATH).

The Royal Line (through Solomon per Matthew 1): Solomon → Rehoboam → ... → Joseph → Jesus (God and Mary, raised by Joseph. Mary comes from old-Hebrew word Miriam S4813 meaning REBELLIOUS).

Luke's Line (through Nathan): Nathan → Mattatha → ... → Joseph → Jesus (God and Mary, raised by Joseph. Mary comes from old-Hebrew word Miriam S4813 meaning REBELLIOUS).`,
      'paul'
    ));

    // Day 3: Flood
    readings.push(this.createReading(day++, [{ book: 'Genesis', chapterStart: 6, chapterEnd: 9 }],
      'Primeval History', 'Before 2500 BC',
      'The Great Flood and New Beginning - Divine judgment on human wickedness, preservation of Noah\'s family, and establishment of the rainbow covenant',
      `👨🏾‍💻 Paul's Commentary: ROMANS 11:36 (AMP) — "For from Him [all things originate] and through Him [all things exist and are sustained] and to Him are all things [directed]. All things originate from Him and exist through Him, and all things find their purpose and completion in Him. To Him be the glory forever! Amen."

THE ARK AS A TYPE OF CHRIST: Just as the ark was the ONLY vessel of salvation from the flood waters, Jesus is the ONLY way to the Father (John 14:6). Inside the ark = salvation; outside = destruction. The ark had ONE door (John 10:9: "I am the door"). The pitch covering the ark inside and out was "kaphar" in Hebrew—the same word for ATONEMENT.

NOAH AS A TYPE OF CHRIST: Noah was "righteous" and "found favor" (grace) in God's eyes (Genesis 6:8-9), pointing to the truly Righteous One who brings salvation. Noah saved his family through the judgment; Christ saves His people through divine wrath.

1 Peter 3:20-21 makes this explicit: the flood waters "symbolize baptism that now saves you also." The flood prefigured baptism into Christ's death and resurrection—the ultimate washing that brings salvation.`,
      'paul'
    ));

    // Day 4: Babel
    readings.push(this.createReading(day++, [{ book: 'Genesis', chapterStart: 10, chapterEnd: 11 }],
      'Table of Nations', 'Before 2100 BC',
      'Nations Dispersed and Tower of Babel - Post-flood population growth, human rebellion, and confusion of languages that scattered humanity'
    ));

    // Days 5-14: Job (42 chapters, ~4/day)
    const jobDescriptions = [
      'Job\'s righteousness, Satan\'s challenge, and the arrival of his friends who initially sit in silence',
      'First Cycle of Debate - Eliphaz\'s first speech and Job\'s response, beginning the theological debate',
      'Second Cycle of Debate - Bildad and Zophar speak, with Job\'s passionate defense of his integrity',
      'Third Cycle of Debate - More intense debate as Job cries out for a mediator and his friends grow harsher',
      'Job\'s Oath of Innocence - Job\'s oath of innocence and his lament of days gone by',
      'Elihu\'s Wisdom - The young Elihu speaks with divine insight, preparing for God\'s appearance',
      'God\'s First Speech - God speaks from the whirlwind, questioning Job about creation and natural order',
      'God\'s Second Speech - God challenges Job\'s wisdom with questions about Behemoth and Leviathan',
      'Job\'s Humility and Restoration - Job is humbled, repents, and his fortunes begin to be restored',
      'Job\'s Final Blessing - Job\'s fortunes are fully restored, his family is blessed, and he dies in old age'
    ];
    const jobDays = [[1,4],[5,8],[9,12],[13,16],[17,20],[21,24],[25,28],[29,32],[33,37],[38,42]];
    jobDays.forEach((ch, i) => readings.push(this.createReading(day++,
      [{ book: 'Job', chapterStart: ch[0], chapterEnd: ch[1] }],
      'Patriarchal Era', 'Before 2100 BC',
      `Job ${ch[0]}-${ch[1]}: ${jobDescriptions[i]}`
    )));

    // PHASE 2: Patriarchal Era (Days 15-29)
    const patriarchDescriptions = [
      'Abraham\'s Call and Covenant - God calls Abram to leave his homeland and promises to make him a great nation',
      'Covenant Confirmed - The Abrahamic covenant is ratified through the smoking firepot and circumcision',
      'Three Visitors and Sodom\'s Destruction - The Lord appears to Abraham, and Sodom and Gomorrah are destroyed',
      'Isaac Born and Tested - The long-promised son is born, and Abraham\'s faith is tested on Mount Moriah',
      'Rebekah for Isaac, Abraham\'s Death - Isaac marries Rebekah, and Abraham dies at a good old age',
      'Jacob Deceives Isaac - Jacob obtains the birthright and blessing, then flees from Esau',
      'Jacob\'s Dream and Family - Jacob sees the ladder to heaven, marries Leah and Rachel, and has twelve sons',
      'Jacob Returns to Canaan - Jacob wrestles with God, is renamed Israel, and reconciles with Esau',
      'Jacob at Bethel and Esau\'s Line - Jacob returns to Bethel, and the lineage of Esau is recorded',
      'Joseph Sold into Slavery - Joseph\'s dreams, his brothers\' betrayal, and Judah and Tamar',
      'Joseph in Potiphar\'s House - Joseph serves Potiphar, resists temptation, and is imprisoned',
      'Pharaoh\'s Dreams - Joseph interprets the dreams of the cupbearer, baker, and Pharaoh',
      'Brothers\' First Journey - Joseph\'s brothers come to Egypt for grain during the famine',
      'Joseph Reveals Himself - The silver cup test leads to Joseph revealing his identity to his brothers',
      'Jacob\'s Journey to Egypt - Jacob brings his entire family to Egypt to survive the famine',
      'Jacob Blesses His Sons - Jacob blesses each of his twelve sons and dies in Egypt',
      'Joseph\'s Death - Joseph forgives his brothers, blesses Ephraim and Manasseh, and dies in faith'
    ];
    const patriarchChapters: [number, number, string, string][] = [
      [12, 14, '2091-2084 BC'], [15, 17, '2081-2067 BC'], [18, 20, '2067 BC'],
      [21, 23, '2066-2054 BC'], [24, 26, '2030-2006 BC'], [27, 28, '2006-1977 BC'],
      [29, 31, '1928-1916 BC'], [32, 34, '1908-1906 BC'], [35, 36, '1906 BC'],
      [37, 38, '1898 BC'], [39, 40, '1889 BC'], [41, 42, '1875 BC'],
      [43, 44, '1875 BC'], [45, 45, '1875 BC'], [46, 47, '1875 BC'],
      [48, 49, '1859 BC'], [50, 50, '1806 BC']
    ];
    patriarchChapters.forEach((ch, i) => readings.push(this.createReading(day++,
      [{ book: 'Genesis', chapterStart: ch[0], chapterEnd: ch[1] }],
      'Patriarchal Era', ch[2],
      `Genesis ${ch[0]}-${ch[1]}: ${patriarchDescriptions[i]}`
    )));

    // PHASE 3: Exodus & Wilderness (Days 30-56)
    const exodusDescriptions = [
      'Israel Oppressed in Egypt - The Hebrews multiply despite oppression, and Moses is born and adopted by Pharaoh\'s daughter',
      'Moses Called at the Burning Bush - God calls Moses from the burning bush to deliver His people from Egypt',
      'Plagues Begin - Moses confronts Pharaoh, and the first plagues strike Egypt',
      'More Plagues - The plagues intensify, but Pharaoh\'s heart remains hardened',
      'The Passover - The final plague, the first Passover, and the exodus from Egypt',
      'Crossing the Red Sea - Israel crosses the sea on dry ground while Egypt\'s army is destroyed',
      'Manna, Water, and Jethro - God provides manna and water; Jethro visits and advises Moses',
      'Mount Sinai and the Ten Commandments - Israel arrives at Sinai and receives God\'s law',
      'The Book of the Covenant - Civil and ceremonial laws given to Israel',
      'Tabernacle Instructions - God gives Moses the pattern for the tabernacle and its furnishings',
      'Priestly Garments and Consecration - Instructions for Aaron and his sons to serve as priests',
      'The Golden Calf - Israel sins with the golden calf while Moses is on the mountain',
      'Tabernacle Built and Erected - The people contribute, and the tabernacle is constructed and filled with God\'s glory'
    ];
    const exodusChapters: [number, number, string][] = [
      [1,2,'1446 BC'],[3,4,'1446 BC'],[5,7,'1446 BC'],[8,10,'1446 BC'],
      [11,12,'1446 BC'],[13,15,'1446 BC'],[16,18,'1446 BC'],[19,21,'1446 BC'],
      [22,24,'1446 BC'],[25,27,'1446 BC'],[28,31,'1446 BC'],[32,34,'1446 BC'],
      [35,40,'1445 BC']
    ];
    exodusChapters.forEach((ch, i) => readings.push(this.createReading(day++,
      [{ book: 'Exodus', chapterStart: ch[0], chapterEnd: ch[1] }],
      'Exodus', ch[2],
      `Exodus ${ch[0]}-${ch[1]}: ${exodusDescriptions[i]}`
    )));

    // Leviticus (Days 43-51)
    const levDescriptions = [
      'The Burnt, Grain, and Peace Offerings - Laws for approaching a holy God through sacrifice',
      'The Sin and Guilt Offerings - How to deal with unintentional sins and trespasses',
      'Priests and Their Ministry - Aaron and his sons are ordained and begin their ministry',
      'Clean and Unclean - Laws distinguishing between clean and unclean animals and conditions',
      'Skin Diseases and Mildew - Procedures for diagnosing and cleansing skin diseases',
      'The Day of Atonement - The annual ceremony for national atonement and the scapegoat',
      'Holiness Laws - Various laws calling Israel to be holy as God is holy',
      'Feasts of the Lord - The appointed feasts: Passover, Pentecost, Tabernacles',
      'The Sabbath Year and Jubilee - Laws for the sabbath year and the year of jubilee'
    ];
    const levChapters: [number, number, string][] = [
      [1,3,'1445 BC'],[4,6,'1445 BC'],[7,9,'1445 BC'],[10,12,'1445 BC'],
      [13,15,'1445 BC'],[16,18,'1445 BC'],[19,21,'1445 BC'],[22,24,'1445 BC'],
      [25,27,'1445 BC']
    ];
    levChapters.forEach((ch, i) => readings.push(this.createReading(day++,
      [{ book: 'Leviticus', chapterStart: ch[0], chapterEnd: ch[1] }],
      'Sinai Laws', ch[2],
      `Leviticus ${ch[0]}-${ch[1]}: ${levDescriptions[i]}`
    )));

    // Numbers (Days 52-63)
    const numDescriptions = [
      'The First Census - Israel is numbered and organized by tribes around the tabernacle',
      'The Levites\' Duties - The Levites are assigned their responsibilities for the tabernacle',
      'Offerings and the Second Passover - Tribal leaders bring offerings; the Passover is kept',
      'The Cloud and the Silver Trumpets - Israel follows the cloud and uses trumpets for signals',
      'The Twelve Spies - Twelve spies explore Canaan; ten bring a bad report',
      'Korah\'s Rebellion - Korah, Dathan, and Abiram rebel against Moses and Aaron',
      'The Red Heifer and Moses\' Sin - Laws of purification; Moses strikes the rock',
      'Balaam and Balak - Balaam is hired to curse Israel but blesses them instead',
      'Moab Seduces Israel - Israel sins with Moabite women; Phinehas acts zealously',
      'The Second Census - A new generation is numbered before entering Canaan',
      'Vengeance on Midian and Settlement - Midian is defeated; the tribes east of Jordan settle',
      'Boundaries and Cities of Refuge - The land boundaries are set; cities of refuge appointed'
    ];
    const numChapters: [number, number, string][] = [
      [1,3,'1445 BC'],[4,6,'1445 BC'],[7,9,'1445 BC'],[10,12,'1445 BC'],
      [13,15,'1445 BC'],[16,18,'1445 BC'],[19,21,'1407 BC'],[22,24,'1407 BC'],
      [25,27,'1407 BC'],[28,30,'1407 BC'],[31,33,'1407 BC'],[34,36,'1407 BC']
    ];
    numChapters.forEach((ch, i) => readings.push(this.createReading(day++,
      [{ book: 'Numbers', chapterStart: ch[0], chapterEnd: ch[1] }],
      'Wilderness Wanderings', ch[2],
      `Numbers ${ch[0]}-${ch[1]}: ${numDescriptions[i]}`
    )));

    // Deuteronomy + Psalm 90 (Days 64-75)
    const deutDescriptions = [
      'Review of the Journey - Moses reviews Israel\'s forty years in the wilderness',
      'Victories East of Jordan - The conquest of Sihon and Og',
      'The Ten Commandments Repeated - The Shema and the great commandment',
      'Remember the Lord - Warnings against forgetting God in prosperity',
      'Laws for the Land - Civil and ceremonial laws for life in Canaan',
      'Clean and Unclean Foods - Dietary laws and tithing regulations',
      'Kings, Priests, and Prophets - Instructions for future leadership',
      'Laws of War - Rules for warfare and dealing with cities',
      'Various Laws - Laws about assembly, marriage, and various matters',
      'Firstfruits and Curses - Bringing firstfruits; blessings for obedience, curses for disobedience',
      'The Covenant at Moab - The covenant is renewed; Moses\' song and blessing',
      'Moses\' Death and Psalm 90 - Moses dies on Mount Nebo; his prayer from Psalm 90'
    ];
    const deutChapters: [number, number, string, number[]][] = [
      [1,2,'1406 BC',[]],[3,4,'1406 BC',[]],[5,7,'1406 BC',[]],[8,10,'1406 BC',[]],
      [11,13,'1406 BC',[]],[14,16,'1406 BC',[]],[17,19,'1406 BC',[]],[20,22,'1406 BC',[]],
      [23,25,'1406 BC',[]],[26,28,'1406 BC',[]],[29,31,'1406 BC',[]],[32,34,'1406 BC',[90]]
    ];
    deutChapters.forEach((ch, i) => {
      const passages: any[] = [{ book: 'Deuteronomy', chapterStart: ch[0], chapterEnd: ch[1] }];
      ch[3].forEach(p => passages.push({ book: 'Psalms', chapterStart: p, chapterEnd: p }));
      readings.push(this.createReading(day++, passages, 'Covenant Renewal', ch[2],
        `Deuteronomy ${ch[0]}-${ch[1]}: ${deutDescriptions[i]}`
      ));
    });

    // PHASE 4: Conquest (Days 96-115)
    // PHASE 4: Conquest Period (Days 76-92)
    const joshuaDescriptions = [
      'Rahab and the Spies - Joshua sends spies; Rahab hides them and is promised deliverance',
      'Crossing the Jordan - Israel crosses the Jordan on dry ground as the waters part',
      'Jericho and Ai - The walls of Jericho fall; initial defeat then victory at Ai',
      'The Gibeonite Deception - The Gibeonites trick Israel into a treaty',
      'Conquest of the South - The sun stands still as Joshua conquers southern Canaan',
      'Land Division Begins - The land is divided among the tribes by lot',
      'Tribal Territories - Ephraim, Manasseh, and the remaining tribes receive their inheritance',
      'Cities of Refuge and the Altar - Cities of refuge appointed; the eastern tribes build an altar',
      'Joshua\'s Farewell - Joshua charges Israel to serve the Lord and renews the covenant'
    ];
    const joshuaChapters: [number, number, string][] = [
      [1,2,'1406 BC'],[3,5,'1406 BC'],[6,8,'1406 BC'],[9,10,'1405 BC'],
      [11,12,'1405-1399 BC'],[13,15,'1399 BC'],[16,19,'1399 BC'],[20,22,'1399 BC'],
      [23,24,'1375 BC']
    ];
    joshuaChapters.forEach((ch, i) => readings.push(this.createReading(day++,
      [{ book: 'Joshua', chapterStart: ch[0], chapterEnd: ch[1] }],
      'Conquest of Canaan', ch[2],
      `Joshua ${ch[0]}-${ch[1]}: ${joshuaDescriptions[i]}`
    )));

    const judgesDescriptions = [
      'The Cycle Begins - Israel fails to drive out all inhabitants; the cycle of sin begins',
      'Othniel, Ehud, and Shamgar - The first judges deliver Israel from oppressors',
      'Deborah and Barak - Deborah judges Israel; Barak defeats Sisera',
      'Gideon - Gideon defeats the Midianites with 300 men',
      'Abimelech and Tola - Abimelech\'s violent reign; minor judges Tola and Jair',
      'Jephthah - Jephthah delivers Israel from the Ammonites',
      'Minor Judges and Samson\'s Birth - Ibzan, Elon, Abdon; Samson is announced',
      'Samson\'s Exploits - Samson\'s marriage, riddles, and feats of strength',
      'Micah\'s Idolatry - Micah makes idols; the Danites steal them',
      'Civil War Against Benjamin - A Levite\'s concubine leads to war against Benjamin'
    ];
    const judgesChapters: [number, number, string][] = [
      [1,2,'1374-1334 BC'],[3,3,'1334-1150 BC'],[4,5,'1235 BC'],[6,7,'1169 BC'],
      [8,9,'1169-1129 BC'],[10,11,'1118-1097 BC'],[12,14,'1097-1090 BC'],
      [15,16,'1090-1075 BC'],[17,18,'1075 BC'],[19,21,'1075 BC']
    ];
    judgesChapters.forEach((ch, i) => readings.push(this.createReading(day++,
      [{ book: 'Judges', chapterStart: ch[0], chapterEnd: ch[1] }],
      'Judges Period', ch[2],
      `Judges ${ch[0]}-${ch[1]}: ${judgesDescriptions[i]}`
    )));

    // Ruth
    readings.push(this.createReading(day++, [{ book: 'Ruth', chapterStart: 1, chapterEnd: 4 }],
      'Judges Period', '1140 BC',
      'Ruth - A Moabite woman\'s loyalty leads her to become part of David\'s lineage and ultimately Jesus\' genealogy'
    ));

    // PHASE 5: Samuel & Saul (Days 94-106)
    const sam1Descriptions = [
      'Samuel\'s Birth and Call - Hannah prays for a son; Samuel is born and dedicated to the Lord',
      'The Lord Calls Samuel - God calls the boy Samuel; Eli\'s house is judged',
      'The Ark Captured - Israel loses the ark to the Philistines; Eli dies',
      'The Ark Returns - The Philistines are plagued; the ark returns to Israel',
      'Israel Requests a King - Samuel\'s sons are corrupt; the people demand a king',
      'Saul Anointed King - Samuel anoints Saul; Saul is proclaimed king',
      'Saul\'s Early Reign - Saul rescues Jabesh Gilead; Samuel\'s farewell address',
      'Saul Rejected - Saul offers an unlawful sacrifice; Samuel pronounces rejection',
      'David Anointed - Samuel anoints David; David enters Saul\'s service',
      'David and Goliath - David defeats Goliath with faith in God',
      'Saul\'s Jealousy - Saul becomes jealous of David; Jonathan warns David',
      'David Flees with Psalms - David flees to Nob and Gath, writing Psalms of trust (59, 52, 34, 56)',
      'David in the Wilderness - David hides in caves, writing Psalms of refuge (57, 142, 54)',
      'David Spares Saul - David refuses to kill Saul in the cave of En Gedi',
      'David, Nabal, and Abigail - David is insulted by Nabal; Abigail intervenes',
      'David Spares Saul Again - David again refuses to kill Saul',
      'David Among the Philistines - David flees to Achish; Saul consults a medium',
      'Saul\'s Death - Saul and Jonathan die in battle against the Philistines'
    ];
    const sam1Chapters: [number, number, string, number[]][] = [
      [1,2,'1100 BC',[]],[3,4,'1090 BC',[]],[5,6,'1070 BC',[]],[7,7,'1070 BC',[]],
      [8,9,'1043 BC',[]],[10,11,'1043 BC',[]],[12,14,'1042 BC',[]],[15,15,'1028 BC',[]],
      [16,16,'1024 BC',[]],[17,17,'1024 BC',[]],[18,19,'1015 BC',[]],[20,20,'1013 BC',[]],
      [21,22,'1012 BC',[59,52,34,56]],[23,24,'1011 BC',[57,142,54]],[25,25,'1011 BC',[63]],
      [26,26,'1011 BC',[]],[27,28,'1010 BC',[]],[29,31,'1010 BC',[]]
    ];
    sam1Chapters.forEach((ch, i) => {
      const passages: any[] = [{ book: '1 Samuel', chapterStart: ch[0], chapterEnd: ch[1] }];
      ch[3].forEach(p => passages.push({ book: 'Psalms', chapterStart: p, chapterEnd: p }));
      readings.push(this.createReading(day++, passages, 'United Kingdom', ch[2],
        `1 Samuel ${ch[0]}-${ch[1]}: ${sam1Descriptions[i]}`
      ));
    });

    // 1 Chronicles 1-9 (Genealogies)
    readings.push(this.createReading(day++,
      [{ book: '1 Chronicles', chapterStart: 1, chapterEnd: 4 }],
      'Priestly Records', '1003 BC',
      '1 Chronicles 1-4: Genealogies from Adam to Judah - The lineage of God\'s chosen people'
    ));
    readings.push(this.createReading(day++,
      [{ book: '1 Chronicles', chapterStart: 5, chapterEnd: 9 }],
      'Priestly Records', '1003 BC',
      '1 Chronicles 5-9: Genealogies of the Tribes and Priests - The organization of Israel'
    ));

    // PHASE 6: David's Reign (Days 109-145)
    const davidDescriptions = [
      'David Becomes King - David mourns Saul and Jonathan; he is anointed king over Judah',
      'Civil War - War between David\'s house and Saul\'s house; Abner joins David',
      'David King Over All Israel - David captures Jerusalem; the ark is brought with celebration (Psalms 15, 24, 96, 105, 106)',
      'God\'s Covenant with David - The Lord promises David an eternal dynasty',
      'David\'s Victories - David defeats the Philistines and expands the kingdom',
      'David and Bathsheba - David commits adultery with Bathsheba; Nathan confronts him (Psalm 51)',
      'Absalom\'s Rebellion - Amnon sins; Absalom kills him and later rebels against David',
      'David Flees Jerusalem - David flees from Absalom (Psalms 63, 41, 55)',
      'Absalom\'s Death - The battle in the forest; Absalom is killed',
      'David Returns to Jerusalem - David returns; Sheba rebels; David shows mercy',
      'David\'s Census and Psalms - David sins by counting the fighting men (Psalms 22, 18, 108)'
    ];
    const sam2Chron: [number, number, number, number, string, number[]][] = [
      [1,2,10,11,'1010-1004 BC',[]],[3,4,12,12,'1004 BC',[]],[5,6,13,16,'1003-998 BC',[15,24,96,105,106]],
      [7,7,17,17,'997 BC',[]],[8,10,18,20,'998-995 BC',[]],[11,12,0,0,'993-991 BC',[51]],
      [13,14,0,0,'990-988 BC',[]],[15,16,0,0,'976 BC',[63,41,55]],[17,18,0,0,'972 BC',[]],
      [19,20,0,0,'972 BC',[]],[21,24,21,24,'970 BC',[22,18,108]]
    ];
    sam2Chron.forEach((ch, i) => {
      const passages: any[] = [];
      if (ch[0] > 0) passages.push({ book: '2 Samuel', chapterStart: ch[0], chapterEnd: ch[1] });
      if (ch[2] > 0) passages.push({ book: '1 Chronicles', chapterStart: ch[2], chapterEnd: ch[3] });
      ch[5].forEach(p => passages.push({ book: 'Psalms', chapterStart: p, chapterEnd: p }));
      readings.push(this.createReading(day++, passages, 'David\'s Reign', ch[4],
        davidDescriptions[i]
      ));
    });

    // 1 Chronicles 23-29 (Temple Preparation)
    readings.push(this.createReading(day++,
      [{ book: '1 Chronicles', chapterStart: 23, chapterEnd: 26 }],
      'Temple Preparation', '970 BC',
      '1 Chronicles 23-26: Organization of Levites, Priests, Musicians, and Gatekeepers for Temple Service'
    ));
    readings.push(this.createReading(day++,
      [{ book: '1 Chronicles', chapterStart: 27, chapterEnd: 29 }],
      'Temple Preparation', '970 BC',
      '1 Chronicles 27-29: Military Divisions, Tribal Leaders, and Solomon Anointed as King'
    ));

    // David's Psalms (Days 131-158)
    const psalmGroupDescriptions = [
      'Psalms of the Blessed Man and the Messiah - Psalms 1-4 introduce the way of righteousness',
      'Prayers for Justice and Praise - Psalms 5-8: Morning prayer and declaring God\'s glory',
      'Thanksgiving and Trust in God - Psalms 9-12: God as refuge for the oppressed',
      'Prayers for Deliverance - Psalms 13-14, 16-17: How long, O Lord? The path of life',
      'Psalms of Creation and the Shepherd - Psalms 19-21, 23: God\'s glory in nature, the Good Shepherd',
      'Prayers for Guidance - Psalms 25-28: Show me Your ways, O Lord',
      'The Voice of the Lord, Forgiveness - Psalms 29-32: The Lord gives strength; blessed is the forgiven',
      'Psalms of Trust and Repentance - Psalms 35-38: Contend for me, O Lord',
      'Waiting for God, Longing for God - Psalms 39-40, 42-43: My soul thirsts for God',
      'National Lament and the Royal Wedding - Psalms 44-47: We have heard; God is King',
      'Wisdom and True Worship - Psalms 49-50, 53, 61: The fool says; sacrifice thanksgiving',
      'God Alone, Praise for Provision - Psalms 62, 64-66: My soul finds rest in God alone',
      'God\'s Blessing and Salvation - Psalms 67-70: May God bless us; haste to help',
      'Prayer in Old Age, Messiah\'s Reign - Psalms 71-74: Do not cast me away when I am old',
      'God the Judge, Israel\'s History - Psalms 75-78: We will tell the next generation',
      'Prayer for Deliverance - Psalms 79-82: O God, the nations have defiled Your temple',
      'Prayer Against Enemies, Longing for Courts - Psalms 83-86: How lovely is Your dwelling place',
      'Zion, Lament, Covenant with David - Psalms 87-90: Lord, You have been our dwelling place',
      'Dwelling in Shelter, God\'s Reign - Psalms 91-94: He who dwells in the shelter of the Most High',
      'Call to Worship, The Lord Reigns - Psalms 95, 97-99: Come, let us sing for joy',
      'Thanksgiving, Mercy and Grace - Psalms 100-103: Bless the Lord, O my soul',
      'Psalms of Creation and History - Psalms 104-107: How many are Your works, O Lord',
      'Victory and Praise - Psalms 108-111: My heart is steadfast, O God',
      'Psalms of the Righteous - Psalms 112-115: Blessed is the man who fears the Lord',
      'Psalm 118 and 119 - The stone the builders rejected; Your word is a lamp to my feet',
      'Songs of Ascent - Psalms 120-130: I lift up my eyes to the hills; Out of the depths',
      'Pilgrim Psalms and Praise - Psalms 131-138: How good and pleasant when brothers dwell',
      'Search Me, O God - Psalms 139-144: You have searched me and You know me',
      'Final Psalms of Praise - Psalms 145-150: I will exalt You, my God the King; Let everything that has breath praise the Lord'
    ];
    const psalmGroups: number[][] = [
      [1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,16,17],[19,20,21,23],[25,26,27,28],
      [29,30,31,32],[35,36,37,38],[39,40,42,43],[44,45,46,47],[49,50,53,61],
      [62,64,65,66],[67,68,69,70],[71,72,73,74],[75,76,77,78],[79,80,81,82],
      [83,84,85,86],[87,88,89,90],[91,92,93,94],[95,97,98,99],[100,101,102,103],
      [104,105,106,107],[108,109,110,111],[112,113,114,115],[116,117,118],[119,120,121,122,123,124,125,126,127,128,129,130],
      [131,132,133,134,137,138],[139,140,141,142,143,144],
      [145,146,147,148,149,150]
    ];
    psalmGroups.forEach((ps, i) => {
      const passages = ps.map(p => ({ book: 'Psalms', chapterStart: p, chapterEnd: p }));
      readings.push(this.createReading(day++, passages, 'Psalms', '979 BC',
        psalmGroupDescriptions[i]
      ));
    });

    // PHASE 7: Solomon (Days 191-220)
    const solomonReadings: any[][] = [
      [[{b:'1 Kings',s:1,e:2}],'970-967 BC','Solomon King'],
      [[{b:'1 Kings',s:3,e:4}],'967 BC','Wisdom'],
      [[{b:'1 Kings',s:5,e:6},{b:'2 Chronicles',s:2,e:3}],'967 BC','Temple'],
      [[{b:'1 Kings',s:7,e:7},{b:'2 Chronicles',s:4,e:4}],'966 BC','Furnishings'],
      [[{b:'1 Kings',s:8,e:8},{b:'2 Chronicles',s:5,e:7}],'966 BC','Dedication'],
      [[{b:'1 Kings',s:9,e:10},{b:'2 Chronicles',s:8,e:9}],'959-946 BC','Queen of Sheba'],
      [[{b:'1 Kings',s:11,e:11}],'931 BC','Solomon\'s End'],
      [[{b:'Proverbs',s:1,e:3}],'950 BC','Wisdom Begins'],
      [[{b:'Proverbs',s:4,e:6}],'950 BC','Get Wisdom'],
      [[{b:'Proverbs',s:7,e:9}],'950 BC','Folly vs Wisdom'],
      [[{b:'Proverbs',s:10,e:12}],'950 BC','Proverbs'],
      [[{b:'Proverbs',s:13,e:15}],'950 BC','Wise Words'],
      [[{b:'Proverbs',s:16,e:18}],'950 BC','Plans'],
      [[{b:'Proverbs',s:19,e:21}],'950 BC','Wealth'],
      [[{b:'Proverbs',s:22,e:24}],'950 BC','Sayings'],
      [[{b:'Proverbs',s:25,e:27}],'950 BC','More Proverbs'],
      [[{b:'Proverbs',s:28,e:31}],'950 BC','Excellent Wife'],
      [[{b:'Ecclesiastes',s:1,e:3}],'937 BC','Vanity'],
      [[{b:'Ecclesiastes',s:4,e:6}],'937 BC','Toil'],
      [[{b:'Ecclesiastes',s:7,e:9}],'937 BC','Wisdom'],
      [[{b:'Ecclesiastes',s:10,e:12}],'937 BC','Youth'],
      [[{b:'Song of Solomon',s:1,e:4}],'950 BC','Love Song'],
      [[{b:'Song of Solomon',s:5,e:8}],'950 BC','Love Strong']
    ];
    solomonReadings.forEach(r => {
      const passages: any[] = r[0].map((p: any) => ({ book: p.b, chapterStart: p.s, chapterEnd: p.e }));
      readings.push(this.createReading(day++, passages, 'Solomon\'s Reign', r[1] as string, r[2] as string));
    });

    // PHASE 8: Divided Kingdom (Days 221-245)
    const dividedReadings: any[][] = [
      [[{b:'1 Kings',s:12,e:14},{b:'2 Chronicles',s:10,e:12}],'931-913 BC','Division'],
      [[{b:'1 Kings',s:15,e:16},{b:'2 Chronicles',s:13,e:16}],'913-886 BC','Asa'],
      [[{b:'1 Kings',s:17,e:18}],'874 BC','Elijah'],
      [[{b:'1 Kings',s:19,e:20}],'874 BC','Horeb'],
      [[{b:'1 Kings',s:21,e:22}],'853 BC','Naboth'],
      [[{b:'2 Kings',s:1,e:3},{b:'Joel',s:1,e:3}],'852 BC','Elijah Taken, Joel'],
      [[{b:'2 Kings',s:4,e:5}],'841 BC','Elisha Miracles'],
      [[{b:'2 Kings',s:6,e:7}],'841 BC','Elisha'],
      [[{b:'2 Kings',s:8,e:9},{b:'2 Chronicles',s:21,e:22}],'841 BC','Jehu'],
      [[{b:'2 Kings',s:10,e:12},{b:'2 Chronicles',s:23,e:24}],'841-835 BC','Athaliah'],
      [[{b:'2 Kings',s:13,e:14},{b:'2 Chronicles',s:25,e:26}],'812-766 BC','Amaziah, Uzziah'],
      [[{b:'Amos',s:1,e:3}],'760 BC','Amos'],
      [[{b:'Amos',s:4,e:6}],'760 BC','Seek the Lord'],
      [[{b:'Amos',s:7,e:9}],'760 BC','Amos Visions'],
      [[{b:'Jonah',s:1,e:4}],'760 BC','Jonah'],
      [[{b:'Hosea',s:1,e:4}],'755 BC','Hosea'],
      [[{b:'Hosea',s:5,e:9}],'755 BC','Unfaithful Israel'],
      [[{b:'Hosea',s:10,e:14}],'755 BC','Hosea'],
      [[{b:'2 Kings',s:15,e:17},{b:'2 Chronicles',s:27,e:28}],'750-722 BC','Fall of Samaria'],
      [[{b:'Micah',s:1,e:4}],'735 BC','Micah'],
      [[{b:'Micah',s:5,e:7}],'735 BC','Bethlehem Prophecy'],
      [[{b:'Isaiah',s:1,e:4}],'739 BC','Isaiah Begins'],
      [[{b:'Isaiah',s:5,e:8}],'734 BC','Immanuel'],
      [[{b:'Isaiah',s:9,e:12}],'730 BC','Prince of Peace'],
      [[{b:'Isaiah',s:13,e:17}],'725 BC','Nations']
    ];
    dividedReadings.forEach(r => {
      const passages: any[] = r[0].map((p: any) => ({ book: p.b, chapterStart: p.s, chapterEnd: p.e }));
      readings.push(this.createReading(day++, passages, 'Divided Kingdom', r[1] as string, r[2] as string));
    });

    // PHASE 9: Isaiah & Hezekiah (Days 246-260)
    const isaiahReadings: any[][] = [
      [[{b:'Isaiah',s:18,e:23}],'725 BC','Oracles'],
      [[{b:'Isaiah',s:24,e:27}],'725 BC','Apocalypse'],
      [[{b:'Isaiah',s:28,e:31}],'711 BC','Woes'],
      [[{b:'Isaiah',s:32,e:35}],'711 BC','Restoration'],
      [[{b:'2 Kings',s:18,e:19},{b:'2 Chronicles',s:29,e:30}],'716 BC','Hezekiah'],
      [[{b:'Isaiah',s:36,e:37}],'701 BC','Sennacherib'],
      [[{b:'2 Kings',s:20,e:20},{b:'Isaiah',s:38,e:39}],'701 BC','Hezekiah\'s Illness'],
      [[{b:'Psalms',s:46,e:48}],'701 BC','Hezekiah Psalms'],
      [[{b:'Isaiah',s:40,e:44}],'700 BC','Comfort'],
      [[{b:'Isaiah',s:45,e:48}],'700 BC','Cyrus'],
      [[{b:'Isaiah',s:49,e:52}],'700 BC','Servant'],
      [[{b:'Isaiah',s:53,e:55}],'700 BC','Suffering Servant'],
      [[{b:'Isaiah',s:56,e:59}],'700 BC','Salvation'],
      [[{b:'Isaiah',s:60,e:62}],'700 BC','Zion'],
      [[{b:'Isaiah',s:63,e:66}],'700 BC','New Heavens']
    ];
    isaiahReadings.forEach(r => {
      const passages: any[] = r[0].map((p: any) => ({ book: p.b, chapterStart: p.s, chapterEnd: p.e }));
      readings.push(this.createReading(day++, passages, 'Isaiah', r[1] as string, r[2] as string));
    });

    // PHASE 10: Fall of Judah (Days 261-270)
    const fallReadings: any[][] = [
      [[{b:'2 Kings',s:21,e:23},{b:'2 Chronicles',s:33,e:35}],'687-621 BC','Manasseh to Josiah'],
      [[{b:'Nahum',s:1,e:3}],'663 BC','Nahum'],
      [[{b:'Jeremiah',s:1,e:3},{b:'Zephaniah',s:1,e:3}],'627 BC','Jeremiah Called'],
      [[{b:'Jeremiah',s:4,e:7}],'627 BC','Judgment'],
      [[{b:'Jeremiah',s:8,e:11},{b:'Habakkuk',s:1,e:3}],'627 BC','Temple, Habakkuk'],
      [[{b:'Jeremiah',s:12,e:16}],'609 BC','Covenant Broken'],
      [[{b:'Jeremiah',s:17,e:21}],'609 BC','Rejection'],
      [[{b:'Jeremiah',s:22,e:26}],'605 BC','Exile'],
      [[{b:'Jeremiah',s:27,e:30}],'605 BC','Seventy Years'],
      [[{b:'Jeremiah',s:31,e:34}],'593 BC','New Covenant']
    ];
    fallReadings.forEach(r => {
      const passages: any[] = r[0].map((p: any) => ({ book: p.b, chapterStart: p.s, chapterEnd: p.e }));
      readings.push(this.createReading(day++, passages, 'Fall of Judah', r[1] as string, r[2] as string));
    });

    // PHASE 11: Exile (Days 246-265) - Expanded
    const exileReadings: any[][] = [
      [[{b:'Jeremiah',s:35,e:39}],'588-586 BC','Jerusalem Falls'],
      [[{b:'2 Kings',s:24,e:25},{b:'Lamentations',s:1,e:2}],'586 BC','Lamentations 1-2'],
      [[{b:'Lamentations',s:3,e:5},{b:'Psalms',s:74,e:74},{b:'Psalms',s:79,e:79}],'586 BC','Lamentations 3-5, Fall Psalms'],
      [[{b:'Jeremiah',s:40,e:42}],'588 BC','After the Fall - Gedaliah'],
      [[{b:'Jeremiah',s:43,e:45}],'588 BC','Flight to Egypt'],
      [[{b:'Jeremiah',s:46,e:48}],'588 BC','Oracles Against Egypt'],
      [[{b:'Jeremiah',s:49,e:52}],'588 BC','Oracles Against Nations'],
      [[{b:'Ezekiel',s:1,e:2}],'593 BC','Ezekiel\'s Call - The Vision'],
      [[{b:'Ezekiel',s:3,e:4}],'593 BC','The Scroll and Commission'],
      [[{b:'Ezekiel',s:5,e:7}],'593 BC','Siege Symbol - Jerusalem'],
      [[{b:'Ezekiel',s:8,e:11}],'592 BC','Idolatry in the Temple'],
      [[{b:'Ezekiel',s:12,e:14}],'592 BC','Exile Symbol and False Prophets'],
      [[{b:'Ezekiel',s:15,e:17}],'591 BC','Parable of the Vine'],
      [[{b:'Ezekiel',s:18,e:20}],'591 BC','Individual Responsibility'],
      [[{b:'Ezekiel',s:21,e:24}],'590 BC','Sword and Parables'],
      [[{b:'Ezekiel',s:25,e:28}],'587 BC','Oracles Against Ammon, Moab, Edom'],
      [[{b:'Ezekiel',s:29,e:32}],'587 BC','Oracles Against Egypt'],
      [[{b:'Ezekiel',s:33,e:34}],'586 BC','Watchman and News of Fall'],
      [[{b:'Ezekiel',s:35,e:36}],'586 BC','Mount Seir and Israel'],
      [[{b:'Ezekiel',s:37,e:37}],'585 BC','Valley of Dry Bones'],
      [[{b:'Ezekiel',s:38,e:39}],'585 BC','Gog and Magog']
    ];
    exileReadings.forEach(r => {
      const passages: any[] = r[0].map((p: any) => ({ book: p.b, chapterStart: p.s, chapterEnd: p.e }));
      readings.push(this.createReading(day++, passages, 'Exile', r[1] as string, r[2] as string));
    });

    // PHASE 11b: Restoration (Days 266-280) - Daniel, Esther, Ezra, Nehemiah
    const restorationReadings: any[][] = [
      [[{b:'Daniel',s:1,e:2}],'605 BC','Daniel in Babylon'],
      [[{b:'Daniel',s:3,e:4}],'605 BC','Fiery Furnace'],
      [[{b:'Daniel',s:5,e:6}],'539 BC','Writing on Wall, Lions\' Den'],
      [[{b:'Daniel',s:7,e:8}],'553 BC','Four Beasts, Ram and Goat'],
      [[{b:'Daniel',s:9,e:10}],'539 BC','Seventy Weeks'],
      [[{b:'Daniel',s:11,e:12}],'539 BC','Kings of North and South'],
      [[{b:'Ezekiel',s:40,e:42}],'573 BC','New Temple Vision'],
      [[{b:'Ezekiel',s:43,e:45}],'573 BC','Glory Returns, Priests'],
      [[{b:'Ezekiel',s:46,e:48}],'573 BC','Prince, River, Land Division'],
      [[{b:'Esther',s:1,e:3}],'483 BC','Queen Vashti, Esther Chosen'],
      [[{b:'Esther',s:4,e:6}],'473 BC','Haman\'s Plot'],
      [[{b:'Esther',s:7,e:10}],'473 BC','Esther Saves the Jews'],
      [[{b:'Ezra',s:1,e:2}],'537 BC','Return from Exile'],
      [[{b:'Ezra',s:3,e:4}],'536 BC','Altar and Temple Foundation'],
      [[{b:'Ezra',s:5,e:6}],'520 BC','Rebuilding Resumes'],
      [[{b:'Haggai',s:1,e:2}],'520 BC','Haggai: Build the House'],
      [[{b:'Ezra',s:7,e:8}],'456 BC','Ezra Comes to Jerusalem'],
      [[{b:'Ezra',s:9,e:10}],'456 BC','Mixed Marriages, Reformation'],
      [[{b:'Nehemiah',s:1,e:3}],'445 BC','Nehemiah\'s Mission'],
      [[{b:'Nehemiah',s:4,e:6}],'445 BC','Wall Built Despite Opposition'],
      [[{b:'Zechariah',s:1,e:4}],'520 BC','Zechariah\'s Visions Begin'],
      [[{b:'Zechariah',s:5,e:8}],'520 BC','More Visions'],
      [[{b:'Nehemiah',s:7,e:8}],'445 BC','The Wall Completed, Law Read'],
      [[{b:'Nehemiah',s:9,e:10}],'445 BC','Confession and Covenant'],
      [[{b:'Zechariah',s:9,e:11}],'518 BC','Oracles: The King Comes'],
      [[{b:'Nehemiah',s:11,e:13}],'432 BC','Dedication, Reforms'],
      [[{b:'Zechariah',s:12,e:14}],'518 BC','The Day of the Lord'],
      [[{b:'Malachi',s:1,e:4}],'430 BC','Final Prophet: I Love Jacob']
    ];
    restorationReadings.forEach(r => {
      const passages: any[] = r[0].map((p: any) => ({ book: p.b, chapterStart: p.s, chapterEnd: p.e }));
      readings.push(this.createReading(day++, passages, 'Restoration', r[1] as string, r[2] as string));
    });

    // ===== NEW TESTAMENT: Days 281-365 =====

    // PHASE 12: Gospels Harmonized (Days 281-330)
    const gospelReadings: any[][] = [
      [[{b:'Luke',s:1,e:1},{b:'John',s:1,e:1},{b:'Matthew',s:1,e:1},{b:'Luke',s:2,e:2}],'6-5 BC','Birth'],
      [[{b:'Matthew',s:2,e:2},{b:'Luke',s:2,e:2}],'5 BC-8 AD','Childhood'],
      [[{b:'Matthew',s:3,e:3},{b:'Mark',s:1,e:1},{b:'Luke',s:3,e:3},{b:'John',s:1,e:1}],'26 AD','Baptism'],
      [[{b:'Matthew',s:4,e:4},{b:'Luke',s:4,e:4}],'27 AD','Temptation'],
      [[{b:'John',s:1,e:4}],'27 AD','First Signs'],
      [[{b:'Matthew',s:4,e:5},{b:'Mark',s:1,e:2},{b:'Luke',s:5,e:5}],'27 AD','Ministry Begins'],
      [[{b:'Matthew',s:8,e:9},{b:'Mark',s:2,e:2},{b:'Luke',s:5,e:5}],'28 AD','Miracles'],
      [[{b:'Matthew',s:5,e:5}],'27 AD','Beatitudes'],
      [[{b:'Matthew',s:6,e:6}],'27 AD','Prayer'],
      [[{b:'Matthew',s:7,e:7}],'27 AD','Build on Rock'],
      [[{b:'Matthew',s:8,e:9},{b:'Mark',s:4,e:5},{b:'Luke',s:8,e:8}],'28 AD','More Miracles'],
      [[{b:'Matthew',s:10,e:10},{b:'Mark',s:6,e:6},{b:'Luke',s:9,e:9}],'29 AD','Send Twelve'],
      [[{b:'Matthew',s:11,e:12},{b:'Luke',s:7,e:7}],'28 AD','John, Woes'],
      [[{b:'Matthew',s:13,e:13},{b:'Mark',s:4,e:4},{b:'Luke',s:8,e:8}],'28 AD','Parables'],
      [[{b:'John',s:5,e:6}],'28 AD','Feeding 5000'],
      [[{b:'Matthew',s:14,e:15},{b:'Mark',s:6,e:7}],'29 AD','John Beheaded'],
      [[{b:'Matthew',s:16,e:17},{b:'Mark',s:8,e:9},{b:'Luke',s:9,e:9}],'29 AD','Transfiguration'],
      [[{b:'John',s:7,e:8}],'29 AD','Tabernacles'],
      [[{b:'John',s:9,e:10}],'29 AD','Blind Man'],
      [[{b:'Luke',s:10,e:11}],'29 AD','Seventy'],
      [[{b:'Luke',s:12,e:13}],'30 AD','Parables'],
      [[{b:'Luke',s:14,e:16}],'30 AD','Cost, Lost'],
      [[{b:'Luke',s:17,e:18}],'30 AD','Kingdom'],
      [[{b:'John',s:11,e:11}],'30 AD','Lazarus'],
      [[{b:'Matthew',s:19,e:20},{b:'Mark',s:10,e:10},{b:'Luke',s:18,e:19}],'30 AD','Journey'],
      [[{b:'Matthew',s:21,e:22},{b:'Mark',s:11,e:12},{b:'Luke',s:19,e:20},{b:'John',s:12,e:12}],'30 AD','Entry'],
      [[{b:'Matthew',s:23,e:24},{b:'Mark',s:12,e:13},{b:'Luke',s:20,e:21}],'30 AD','Temple'],
      [[{b:'Matthew',s:25,e:25},{b:'Mark',s:13,e:13},{b:'Luke',s:21,e:21}],'30 AD','Olivet'],
      [[{b:'John',s:13,e:14}],'30 AD','Upper Room'],
      [[{b:'John',s:15,e:17}],'30 AD','Farewell'],
      [[{b:'Matthew',s:26,e:26},{b:'Mark',s:14,e:14},{b:'Luke',s:22,e:22}],'30 AD','Gethsemane'],
      [[{b:'Matthew',s:27,e:27},{b:'Mark',s:15,e:15},{b:'Luke',s:23,e:23},{b:'John',s:18,e:19}],'30 AD','Trial'],
      [[{b:'Matthew',s:27,e:27},{b:'Mark',s:15,e:15},{b:'Luke',s:23,e:23},{b:'John',s:19,e:19}],'30 AD','Crucifixion'],
      [[{b:'Matthew',s:28,e:28},{b:'Mark',s:16,e:16},{b:'Luke',s:24,e:24},{b:'John',s:20,e:21}],'30 AD','Resurrection']
    ];
    gospelReadings.forEach(r => {
      const passages: any[] = r[0].map((p: any) => ({ book: p.b, chapterStart: p.s, chapterEnd: p.e }));
      readings.push(this.createReading(day++, passages, 'Gospels', r[1] as string, r[2] as string));
    });

    // PHASE 13: Acts (Days 309-325)
    const actsReadings: [number, number, string][] = [
      [1,2,'Ascension and Pentecost'],
      [3,4,'Healing and Preaching'],
      [5,6,'Church Unity and Stephen'],
      [7,8,'Stephen\'s Martyrdom, Philip'],
      [9,10,'Saul\'s Conversion, Cornelius'],
      [11,12,'Gentiles, James Killed'],
      [13,14,'First Missionary Journey'],
      [15,16,'Jerusalem Council, Timothy'],
      [17,18,'Thessalonica, Corinth'],
      [19,20,'Ephesus, Farewell'],
      [21,22,'Arrest in Jerusalem'],
      [23,24,'Defense Before Council'],
      [25,26,'Festus and Agrippa'],
      [27,28,'Voyage and Rome']
    ];
    actsReadings.forEach(ch => readings.push(this.createReading(day++, [{ book: 'Acts', chapterStart: ch[0], chapterEnd: ch[1] }], 'Early Church', '30-62 AD', ch[2])));

    // James (early epistle)
    readings.push(this.createReading(day++, [{ book: 'James', chapterStart: 1, chapterEnd: 5 }], 'Early Church', '45 AD', 'James - Faith and Works'));

    // PHASE 14: Pauline Epistles (Days 327-354)
    const paulReadings: [string, number, number, string, string][] = [
      ['Galatians',1,6,'49 AD','Galatians: Freedom in Christ'],
      ['1 Thessalonians',1,5,'51 AD','1 Thessalonians: His Coming'],
      ['2 Thessalonians',1,3,'52 AD','2 Thessalonians: Standing Firm'],
      ['1 Corinthians',1,8,'54 AD','1 Cor 1-8: Wisdom and Purity'],
      ['1 Corinthians',9,16,'54 AD','1 Cor 9-16: Body and Love'],
      ['2 Corinthians',1,7,'57 AD','2 Cor 1-7: Comfort'],
      ['2 Corinthians',8,13,'57 AD','2 Cor 8-13: Generosity'],
      ['Romans',1,8,'57 AD','Romans 1-8: Justified by Faith'],
      ['Romans',9,16,'57 AD','Romans 9-16: Israel and Living'],
      ['Ephesians',1,6,'62 AD','Ephesians: One in Christ'],
      ['Philippians',1,4,'62 AD','Philippians: Joy'],
      ['Colossians',1,4,'62 AD','Colossians: Christ Supreme'],
      ['Philemon',1,1,'62 AD','Philemon: Forgiveness'],
      ['1 Timothy',1,6,'63 AD','1 Timothy: Church Order'],
      ['Titus',1,3,'66 AD','Titus: Sound Doctrine'],
      ['1 Peter',1,5,'64 AD','1 Peter: Living Hope'],
      ['2 Timothy',1,4,'67 AD','2 Timothy: Faithful to End'],
      ['2 Peter',1,3,'67 AD','2 Peter: Knowledge'],
      ['Hebrews',1,7,'68 AD','Hebrews 1-7: Better Priest'],
      ['Hebrews',8,13,'68 AD','Hebrews 8-13: New Covenant']
    ];
    paulReadings.forEach(ep => readings.push(this.createReading(day++, [{ book: ep[0], chapterStart: ep[1], chapterEnd: ep[2] }], 'Epistles', ep[3], ep[4])));

    // PHASE 15: Final Epistles + Revelation (Days 355-365)
    readings.push(this.createReading(day++, [{ book: 'Jude', chapterStart: 1, chapterEnd: 1 }], 'Epistles', '68 AD', 'Jude: Contend for the Faith'));
    readings.push(this.createReading(day++, [{ book: '1 John', chapterStart: 1, chapterEnd: 2 }], 'Epistles', '90 AD', '1 John 1-2: Walking in the Light'));
    readings.push(this.createReading(day++, [{ book: '1 John', chapterStart: 3, chapterEnd: 5 }], 'Epistles', '90 AD', '1 John 3-5: Love One Another'));
    readings.push(this.createReading(day++, [{ book: '2 John', chapterStart: 1, chapterEnd: 1 }], 'Epistles', '92 AD', '2 John: Walk in Truth'));
    readings.push(this.createReading(day++, [{ book: '3 John', chapterStart: 1, chapterEnd: 1 }], 'Epistles', '94 AD', '3 John: Hospitality and Truth'));
    readings.push(this.createReading(day++, [{ book: 'Revelation', chapterStart: 1, chapterEnd: 3 }], 'Apocalypse', '95 AD', 'Revelation 1-3: Letters to Seven Churches'));
    readings.push(this.createReading(day++, [{ book: 'Revelation', chapterStart: 4, chapterEnd: 5 }], 'Apocalypse', '95 AD', 'Revelation 4-5: The Throne Room'));
    readings.push(this.createReading(day++, [{ book: 'Revelation', chapterStart: 6, chapterEnd: 8 }], 'Apocalypse', '95 AD', 'Revelation 6-8: The Seven Seals'));
    readings.push(this.createReading(day++, [{ book: 'Revelation', chapterStart: 9, chapterEnd: 11 }], 'Apocalypse', '95 AD', 'Revelation 9-11: The Seven Trumpets'));
    readings.push(this.createReading(day++, [{ book: 'Revelation', chapterStart: 12, chapterEnd: 14 }], 'Apocalypse', '95 AD', 'Revelation 12-14: The Dragon and the Beasts'));
    readings.push(this.createReading(day++, [{ book: 'Revelation', chapterStart: 15, chapterEnd: 16 }], 'Apocalypse', '95 AD', 'Revelation 15-16: The Seven Bowls'));
    readings.push(this.createReading(day++, [{ book: 'Revelation', chapterStart: 17, chapterEnd: 18 }], 'Apocalypse', '95 AD', 'Revelation 17-18: Babylon the Great'));
    readings.push(this.createReading(day++, [{ book: 'Revelation', chapterStart: 19, chapterEnd: 20 }], 'Apocalypse', '95 AD', 'Revelation 19-20: The Return of Christ'));
    readings.push(this.createReading(day++, [{ book: 'Revelation', chapterStart: 21, chapterEnd: 22 }], 'Apocalypse', '95 AD', 'Revelation 21-22: New Heaven and New Earth'));

    return readings;
  }

  private createReading(
    day: number,
    passages: Array<{book: string; chapterStart: number; chapterEnd: number}>,
    period: string,
    date: string,
    description: string,
    commentary?: string,
    commentaryType?: 'generic' | 'paul'
  ): DailyReading {
    return {
      day,
      date: this.getDateForDay(day),
      passages: passages.map(p => ({
        book: p.book,
        chapterStart: p.chapterStart,
        chapterEnd: p.chapterEnd,
        testament: this.getTestament(p.book),
        isApocryphal: this.isApocryphal(p.book),
        href: generateBiblehubHref(p.book, p.chapterStart)
      })),
      historicalContext: {
        period,
        approximateDate: date,
        description
      },
      readingTimeMinutes: this.calculateReadingTime(passages),
      commentary,
      commentaryType
    };
  }
}
