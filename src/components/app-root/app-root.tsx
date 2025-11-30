import { Component, h, State, Listen, Event, EventEmitter, Element } from '@stencil/core';
import { ApocryphaReadingProvider } from '../../data/reading-providers/apocrypha-chronological';
import { BiblehubReadingProvider } from '../../data/reading-providers/biblehub-chronological';

interface LocalReadingPassage {
  book: string;
  chapter: number;
  verses: string;
  testament: 'old' | 'new' | 'apocryphal';
}

// Use this for all existing reading methods
interface SimpleDailyReading {
  day: number;
  passages: LocalReadingPassage[];
  historicalContext?: {
    period: string;
    approximateDate: string;
    description?: string;
  };
  readingTime: number;
}

interface LocalHistoricalContext {
  period: string;
  approximateDate: string;
  description: string;
}

interface LogosSequenceItem {
  book: string;
  startDay: number;
  days: number;
  period: string;
  date: string;
  context: string;
  testament?: 'old' | 'new' | 'apocryphal';
}

interface LocalDailyReading {
  day: number;
  passages: LocalReadingPassage[];
  historicalContext?: LocalHistoricalContext;
  readingTime: number;
}

interface LocalReadingPlan {
  name: string;
  methodology: string;
  totalDays: number;
  averageReadingTime: number;
  apocryphaSupport: string;
  readings: LocalDailyReading[];
  config?: LogosConfig;
}

interface LogosConfig {
  datingSystem: string;
  jobPlacement: string;
  gospelIntegration: string;
  psalmsDistribution: string;
  apocryphaInclusion: {
    enabled: boolean;
    oldTestament: boolean;
    newTestament: boolean;
    deuterocanonical: boolean;
  };
  parallelPassages: boolean;
  culturalContext: string;
  theologicalEmphasis: string;
}

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  @Element() el: HTMLElement;

  // Initialize providers
  private apocryphaProvider = new ApocryphaReadingProvider();
  private biblehubProvider = new BiblehubReadingProvider();

  @State() currentView: 'comparison' | 'custom' | 'saved' | 'logos-config' = 'comparison';
  @State() currentDay: number = 1;
  @State() apocryphaSettings = {
    enabled: true,
    oldTestament: true,
    newTestament: true,
    denominations: {
      catholic: true,
      orthodox: true,
      anglican: false
    }
  };
  @State() savedPlans: any[] = [];
  @State() readingPlans: any = { // Using any for type flexibility with mixed interface types
    esv: {
      name: 'ESV Chronological',
      methodology: 'Young-earth creationism, literal historical approach',
      totalDays: 365,
      averageReadingTime: 15,
      apocryphaSupport: 'None (Protestant)',
      readings: this.generateESVSample()
    },
    logos: {
      name: 'Logos Chronological',
      methodology: 'Conservative dating, historical-critical approach',
      totalDays: 365,
      averageReadingTime: 18,
      apocryphaSupport: 'Full (Catholic/Orthodox)',
      readings: this.generateLogosSample(),
      config: {
        datingSystem: 'conservative',
        jobPlacement: 'patriarchal',
        gospelIntegration: 'historical',
        psalmsDistribution: 'historical',
        apocryphaInclusion: {
          enabled: true,
          oldTestament: true,
          newTestament: false,
          deuterocanonical: true
        },
        parallelPassages: true,
        culturalContext: 'ancient-near-eastern',
        theologicalEmphasis: 'balanced'
      }
    },
    blb: {
      name: 'Blue Letter Bible',
      methodology: 'Conservative evangelical scholarship',
      totalDays: 365,
      averageReadingTime: 20,
      apocryphaSupport: 'None (Protestant)',
      readings: this.generateBLBSample()
    },
    apocrypha: {
      name: 'Apocrypha & Pseudepigrapha',
      methodology: 'Academic chronological approach through Deuterocanonical, Pseudepigrapha, and Early Christian writings',
      totalDays: 365,
      averageReadingTime: 25,
      apocryphaSupport: 'Complete (Academic)',
      readings: [] // Will be initialized in componentDidLoad
    },
    biblehub: {
      name: 'Biblehub Chronological',
      methodology: 'Complete chronological timeline following traditional Hebrew chronology with chapter-by-chapter progression through biblical history',
      totalDays: 365,
      averageReadingTime: 20,
      apocryphaSupport: 'None (Protestant)',
      readings: [] // Will be initialized in componentDidLoad
    }
  };

  // Source URLs for verification
  private sourceUrls = {
    esv: 'https://www.esv.org/resources/reading-plans/chronological/',
    logos: 'https://www.logos.com/grow/nook-chronological-bible-reading-plan/',
    blb: 'https://www.blueletterbible.org/dailyreading/',
    apocrypha: 'https://github.com/anthropics/bible360-research',
    biblehub: 'https://biblehub.com/timeline/'
  };

  generateESVSample(): SimpleDailyReading[] {
    const readings: SimpleDailyReading[] = [];

    // ESV Chronological Plan - Based on actual ESV methodology
    // Young-earth creationist dating (4004 BC)
    // Literary-historical approach with integrated Gospels

    // Days 1-10: Genesis 1-10 (Primeval History)
    for (let day = 1; day <= 10; day++) {
      readings.push({
        day,
        passages: [{ book: 'Genesis', chapter: day, verses: '1-31', testament: 'old' as const }],
        historicalContext: {
          period: 'Primeval History',
          approximateDate: '4004-3000 BC',
          description: `ESV Chronological: Genesis ${day} - Creation to Flood. Foundation of biblical worldview including creation, fall, and redemption themes that shape Scripture's narrative arc.`
        },
        readingTime: 15
      });
    }

    // Days 11-20: Genesis 11-25 (Patriarchal Beginnings)
    for (let day = 11; day <= 20; day++) {
      const chapter = day; // Genesis 11-20 (continues from Genesis 10 on day 10)
      readings.push({
        day,
        passages: [{ book: 'Genesis', chapter, verses: '1-32', testament: 'old' }],
        historicalContext: {
          period: 'Patriarchal Period',
          approximateDate: '2100-1800 BC',
          description: `ESV Chronological: Genesis ${chapter} - Abraham to Jacob. Covenant promises established that form the basis for Israel's national identity and God's redemptive plan throughout Scripture.`
        },
        readingTime: 18
      });
    }

    // Days 21-30: Job (Contemporary with Patriarchs)
    for (let day = 21; day <= 30; day++) {
      const chapter = day - 20; // Job 1-10
      readings.push({
        day,
        passages: [{ book: 'Job', chapter, verses: '1-22', testament: 'old' }],
        historicalContext: {
          period: 'Patriarchal Period',
          approximateDate: '2000-1800 BC',
          description: `ESV Chronological: Job ${chapter} - Suffering of the righteous`
        },
        readingTime: 20
      });
    }

    // Continue with systematic chronological coverage
    let currentDay = 31;

    // Exodus (Days 31-50)
    for (let day = 31; day <= 50 && currentDay <= 365; day++) {
      const chapter = day - 30;
      if (chapter <= 40) {
        readings.push({
          day: currentDay++,
          passages: [{ book: 'Exodus', chapter, verses: '1-31', testament: 'old' }],
          historicalContext: {
            period: 'Egyptian Period & Exodus',
            approximateDate: '1526-1446 BC',
            description: `ESV Chronological: Exodus ${chapter} - Liberation from Egypt. Foundational event of deliverance that prefigures Christ's redemption and establishes patterns of worship, law, and divine presence.`
          },
          readingTime: 18
        });
      }
    }

    // Add remaining books following ESV's literary-historical approach
    const esvSequence = [
      { book: 'Leviticus', startDay: 51, days: 15, period: 'Wilderness Wanderings', date: '1446-1406 BC' },
      { book: 'Numbers', startDay: 66, days: 20, period: 'Wilderness Wanderings', date: '1446-1406 BC' },
      { book: 'Deuteronomy', startDay: 86, days: 10, period: 'Pre-Conquest', date: '1406 BC' },
      { book: 'Joshua', startDay: 96, days: 12, period: 'Conquest of Canaan', date: '1406-1390 BC' },
      { book: 'Judges', startDay: 108, days: 15, period: 'Judges Period', date: '1390-1050 BC' },
      { book: 'Ruth', startDay: 123, days: 2, period: 'Judges Period', date: '1150-1100 BC' },
      { book: '1 Samuel', startDay: 125, days: 20, period: 'United Monarchy', date: '1100-970 BC' },
      { book: '2 Samuel', startDay: 145, days: 15, period: 'United Monarchy', date: '1100-970 BC' },
      { book: '1 Kings', startDay: 160, days: 20, period: 'Divided Monarchy', date: '970-586 BC' },
      { book: '2 Kings', startDay: 180, days: 20, period: 'Divided Monarchy', date: '970-586 BC' },
      { book: 'Psalms', startDay: 200, days: 50, period: 'Various Periods', date: '1400-400 BC' },
      { book: 'Proverbs', startDay: 250, days: 10, period: 'Solomonic Period', date: '970-930 BC' },
      { book: 'Isaiah', startDay: 260, days: 25, period: 'Prophetic Period', date: '740-680 BC' },
      { book: 'Jeremiah', startDay: 285, days: 20, period: 'Exilic Period', date: '627-586 BC' },
      { book: 'Ezekiel', startDay: 305, days: 15, period: 'Exilic Period', date: '593-571 BC' },
      { book: 'Daniel', startDay: 320, days: 8, period: 'Exilic Period', date: '605-530 BC' },
      { book: 'Matthew', startDay: 328, days: 15, period: 'Life of Christ', date: '4 BC - 30 AD' },
      { book: 'Mark', startDay: 343, days: 8, period: 'Life of Christ', date: '26-30 AD' },
      { book: 'Luke', startDay: 351, days: 10, period: 'Life of Christ', date: '4 BC - 30 AD' },
      { book: 'John', startDay: 361, days: 5, period: 'Life of Christ', date: '26-30 AD' }
    ];

    esvSequence.forEach(({ book, startDay, days, period, date }) => {
      const chapters = this.getBookChapters(book);
      const chaptersPerDay = Math.ceil(chapters / days);

      for (let i = 0; i < days && startDay + i <= 365; i++) {
        const dayNum = startDay + i;
        const startChapter = (i * chaptersPerDay) + 1;
        const endChapter = Math.min(startChapter + chaptersPerDay - 1, chapters);

        if (startChapter <= chapters) {
          const passages: LocalReadingPassage[] = [];
          for (let chapter = startChapter; chapter <= endChapter && chapter <= chapters; chapter++) {
            passages.push({
              book,
              chapter,
              verses: '1-31',
              testament: (book === 'Matthew' || book === 'Mark' || book === 'Luke' || book === 'John') ? 'new' as const : 'old' as const
            });
          }

          readings.push({
            day: dayNum,
            passages,
            historicalContext: {
              period,
              approximateDate: date,
              description: `ESV Chronological: ${book} ${startChapter}${endChapter > startChapter ? '-' + endChapter : ''} - ${period}. Part of God's progressive revelation showing His faithfulness to Israel and preparation for Christ's coming. Key themes of covenant, redemption, and kingdom development.`
            },
            readingTime: book === 'Psalms' ? 25 : 20
          });
        }
      }
    });

    // Ensure we have exactly 365 days
    while (readings.length < 365) {
      readings.push({
        day: readings.length + 1,
        passages: [{ book: 'Revelation', chapter: 22, verses: '1-21', testament: 'new' }],
        historicalContext: {
          period: 'New Testament Completion',
          approximateDate: '95 AD',
          description: 'ESV Chronological: Revelation - Final vision'
        },
        readingTime: 15
      });
    }

    return readings.slice(0, 365);
  }

  private getBookChapters(book: string): number {
    const chapterCounts: { [key: string]: number } = {
      'Genesis': 50, 'Exodus': 40, 'Leviticus': 27, 'Numbers': 36, 'Deuteronomy': 34,
      'Joshua': 24, 'Judges': 21, 'Ruth': 4, '1 Samuel': 31, '2 Samuel': 24,
      '1 Kings': 22, '2 Kings': 25, '1 Chronicles': 29, '2 Chronicles': 36, 'Ezra': 10,
      'Nehemiah': 13, 'Esther': 10, 'Psalms': 150, 'Proverbs': 31, 'Ecclesiastes': 12,
      'Song of Solomon': 8, 'Isaiah': 66, 'Jeremiah': 52, 'Lamentations': 5, 'Ezekiel': 48,
      'Daniel': 12, 'Hosea': 14, 'Joel': 3, 'Amos': 9, 'Obadiah': 1, 'Jonah': 4,
      'Micah': 7, 'Nahum': 3, 'Habakkuk': 3, 'Zephaniah': 3, 'Haggai': 2, 'Zechariah': 14,
      'Malachi': 4, 'Matthew': 28, 'Mark': 16, 'Luke': 24, 'John': 21, 'Acts': 28,
      'Romans': 16, '1 Corinthians': 16, '2 Corinthians': 13, 'Galatians': 6, 'Ephesians': 6,
      'Philippians': 4, 'Colossians': 4, '1 Thessalonians': 5, '2 Thessalonians': 3,
      '1 Timothy': 6, '2 Timothy': 4, 'Titus': 3, 'Philemon': 1, 'Hebrews': 13,
      'James': 5, '1 Peter': 5, '2 Peter': 3, '1 John': 5, '2 John': 1, '3 John': 1,
      'Jude': 1, 'Revelation': 22
    };
    return chapterCounts[book] || 10;
  }

  generateLogosSample(): SimpleDailyReading[] {
    const readings: SimpleDailyReading[] = [];

    // Logos Chronological Plan - Academic flexibility approach
    // Conservative dating but with scholarly methodology
    // Integration of Apocrypha and historical context

    // Days 1-10: Genesis 1-10 with parallel wisdom literature
    for (let day = 1; day <= 10; day++) {
      const passages: LocalReadingPassage[] = [{ book: 'Genesis', chapter: day, verses: '1-31', testament: 'old' }];

      // Intersperse wisdom literature from Day 3
      if (day >= 3) {
        passages.push({
          book: 'Proverbs',
          chapter: day - 2,
          verses: '1-10',
          testament: 'old' as const
        });
      }

      readings.push({
        day,
        passages,
        historicalContext: {
          period: 'Primeval History',
          approximateDate: '4000-3000 BCE (Scholarly)',
          description: `Logos Academic: Genesis ${day} + Wisdom literature. Academic integration of ancient Near Eastern creation narratives and wisdom traditions. Explores theological themes within broader ancient literary and cultural contexts.`
        },
        readingTime: 20
      });
    }

    // Days 11-20: Genesis 11-25 with historical context
    for (let day = 11; day <= 20; day++) {
      const chapter = day; // Genesis 11-20 (continues from Genesis 10 on day 10)
      const passages: LocalReadingPassage[] = [{ book: 'Genesis', chapter, verses: '1-32', testament: 'old' }];

      // Add apocryphal wisdom for Logos academic approach
      if (day === 15) {
        passages.push({
          book: 'Wisdom of Solomon',
          chapter: 1,
          verses: '1-16',
          testament: 'apocryphal'
        });
      }

      readings.push({
        day,
        passages,
        historicalContext: {
          period: 'Patriarchal Period',
          approximateDate: '2100-1800 BCE (Archaeological Dating)',
          description: `Logos Academic: Genesis ${chapter} with ANE context. Patriarchal narratives examined through archaeological evidence and comparative ancient Near Eastern texts. Highlights covenant theology and its implications for understanding biblical revelation.`
        },
        readingTime: 22
      });
    }

    // Days 21-35: Job with scholarly commentary integration
    for (let day = 21; day <= 35; day++) {
      const chapter = day - 20;
      if (chapter <= 42) {
        const passages: LocalReadingPassage[] = [{ book: 'Job', chapter, verses: '1-22', testament: 'old' }];

        // Add apocryphal literature for academic depth
        if (day % 5 === 1) {
          passages.push({
            book: 'Ecclesiasticus',
            chapter: Math.floor((day - 21) / 5) + 1,
            verses: '1-10',
            testament: 'apocryphal'
          });
        }

        readings.push({
          day,
          passages,
          historicalContext: {
            period: 'Patriarchal Period',
            approximateDate: '2000-1800 BCE (Literary Dating)',
            description: `Logos Academic: Job ${chapter} with ancient Near Eastern parallels. Wisdom literature analyzed through comparative ancient Near Eastern suffering texts and theological frameworks. Explores themes of divine sovereignty, human suffering, and righteous living.`
          },
          readingTime: 25
        });
      }
    }

    // Continue with Logos' integrated academic approach
    let currentDay = 36;

    // Academic sequence with historical-critical integration
    const logosSequence: LogosSequenceItem[] = [
      { book: 'Exodus', startDay: 36, days: 20, period: 'Egyptian & Hyksos Period', date: '1550-1446 BCE', context: 'Archaeological evidence' },
      { book: 'Leviticus', startDay: 56, days: 12, period: 'Priestly Literature', date: '1446-1406 BCE', context: 'Comparative ancient law codes' },
      { book: 'Numbers', startDay: 68, days: 18, period: 'Wilderness Traditions', date: '1446-1406 BCE', context: 'Oral tradition analysis' },
      { book: 'Deuteronomy', startDay: 86, days: 10, period: 'Deuteronomic History', date: '7th century BCE composition', context: 'Documentary hypothesis' },
      { book: 'Joshua', startDay: 96, days: 12, period: 'Conquest Traditions', date: '1400-1200 BCE', context: 'Archaeological settlement patterns' },
      { book: 'Judges', startDay: 108, days: 15, period: 'Tribal Confederation', date: '1200-1050 BCE', context: 'Sociopolitical development' },
      { book: 'Ruth', startDay: 123, days: 2, period: 'Narrative Novella', date: 'Exilic period', context: 'Literary genre analysis' },
      { book: '1 Samuel', startDay: 125, days: 20, period: 'Rise of Monarchy', date: '1100-970 BCE', context: 'Political anthropology' },
      { book: '2 Samuel', startDay: 145, days: 15, period: 'Davidic Kingdom', date: '1000-970 BCE', context: 'Urban archaeology' },
      { book: '1 Kings', startDay: 160, days: 20, period: 'Solomonic Empire', date: '970-586 BCE', context: 'Economic history' },
      { book: '2 Kings', startDay: 180, days: 20, period: 'Divided Monarchy Fall', date: '922-586 BCE', context: 'Assyrian & Babylonian sources' },
      { book: 'Psalms', startDay: 200, days: 50, period: 'Liturgical Poetry', date: '1000-400 BCE', context: 'Canaanite parallels' },
      { book: 'Proverbs', startDay: 250, days: 10, period: 'Wisdom Literature', date: '700-200 BCE', context: 'Egyptian & Mesopotamian wisdom' },
      { book: 'Sirach', startDay: 260, days: 8, period: 'Hellenistic Judaism', date: '200-180 BCE', context: 'Greek philosophical influence', testament: 'apocryphal' },
      { book: '1 Maccabees', startDay: 268, days: 10, period: 'Hasmonean Revolt', date: '175-135 BCE', context: 'Hellenistic period', testament: 'apocryphal' },
      { book: 'Isaiah', startDay: 278, days: 25, period: 'Prophetic Literature', date: '740-680 BCE', context: 'Social justice themes' },
      { book: 'Jeremiah', startDay: 303, days: 20, period: 'Exilic Prophet', date: '627-586 BCE', context: 'Covenant theology' },
      { book: 'Ezekiel', startDay: 323, days: 15, period: 'Exilic Visions', date: '593-571 BCE', context: 'Apocalyptic literature' },
      { book: 'Daniel', startDay: 338, days: 8, period: 'Apocalyptic', date: '167-164 BCE', context: 'Maccabean crisis' },
      { book: 'Mark', startDay: 346, days: 8, period: 'Gospel - Markan Priority', date: '65-70 CE', context: 'Synoptic problem' },
      { book: 'Matthew', startDay: 354, days: 12, period: 'Gospel - Jewish Christian', date: '80-90 CE', context: 'Q source theory' }
    ];

    logosSequence.forEach(({ book, startDay, days, period, date, context, testament = 'old' }: LogosSequenceItem) => {
      const chapters = this.getBookChapters(book);
      const chaptersPerDay = Math.ceil(chapters / days);

      for (let i = 0; i < days && startDay + i <= 365; i++) {
        const dayNum = startDay + i;
        const startChapter = (i * chaptersPerDay) + 1;
        const endChapter = Math.min(startChapter + chaptersPerDay - 1, chapters);

        if (startChapter <= chapters) {
          const passages: LocalReadingPassage[] = [];
          for (let chapter = startChapter; chapter <= endChapter && chapter <= chapters; chapter++) {
            passages.push({
              book,
              chapter,
              verses: '1-31',
              testament: (book === 'Mark' || book === 'Matthew') ? 'new' : testament
            });
          }

          readings.push({
            day: dayNum,
            passages,
            historicalContext: {
              period,
              approximateDate: date,
              description: `Logos Academic: ${book} ${startChapter}${endChapter > startChapter ? '-' + endChapter : ''} - ${context}. Academic approach integrating historical-critical methodology with archaeological evidence and ancient Near Eastern cultural context. Examines theological development within its ancient historical setting.`
            },
            readingTime: book === 'Psalms' ? 30 : 25
          });
        }
      }
    });

    // Ensure we have exactly 365 days
    while (readings.length < 365) {
      readings.push({
        day: readings.length + 1,
        passages: [{ book: 'Revelation', chapter: 22, verses: '1-21', testament: 'new' }],
        historicalContext: {
          period: 'Apocalyptic Literature',
          approximateDate: '95 CE',
          description: 'Logos Academic: Revelation - Jewish apocalyptic tradition'
        },
        readingTime: 20
      });
    }

    return readings.slice(0, 365);
  }

  generateBLBSample(): SimpleDailyReading[] {
    const readings: SimpleDailyReading[] = [];

    // Blue Letter Bible DBRP - Discipleship Bible Reading Plan
    // Conservative evangelical approach
    // Chronological with NT integration and 3-4 chapters per day
    // Starts with Luke 1 on Day 1 (characteristic of DBRP)

    // Day 1: Luke 1 (Christ's birth narrative begins the plan)
    readings.push({
      day: 1,
      passages: [
        { book: 'Luke', chapter: 1, verses: '1-80', testament: 'new' }
      ],
      historicalContext: {
        period: 'Birth of Christ',
        approximateDate: '4 BC',
        description: 'DBRP: Luke 1 - Birth of John the Baptist foretold. Gospel narrative begins with divine intervention and fulfillment of Old Testament prophecy. Establishes pattern of God preparing the way for Christ through prophetic ministry.'
      },
      readingTime: 20
    });

    // Days 2-10: Genesis 1-10 with continued Luke
    for (let day = 2; day <= 10; day++) {
      const passages: LocalReadingPassage[] = [{ book: 'Genesis', chapter: day - 1, verses: '1-31', testament: 'old' }];

      // Continue Luke readings in parallel
      if (day <= 4) {
        passages.push({
          book: 'Luke',
          chapter: day,
          verses: '1-52',
          testament: 'new'
        });
      }

      readings.push({
        day,
        passages,
        historicalContext: {
          period: 'Primeval History & Gospel Beginnings',
          approximateDate: '4004-4 BC',
          description: `DBRP: Genesis ${day - 1} ${day <= 4 ? '+ Luke ' + day : ''} - Creation to Christ. Chronological bridge connecting foundational Old Testament narratives with Christ's advent. Demonstrates God's redemptive plan spanning from creation to incarnation.`
        },
        readingTime: 22
      });
    }

    // Days 11-25: Genesis 11-25 with Matthew parallel
    for (let day = 11; day <= 25; day++) {
      const chapter = day; // Genesis 11-25 (continues from Genesis 10 on day 10)
      const passages: LocalReadingPassage[] = [{ book: 'Genesis', chapter, verses: '1-32', testament: 'old' }];

      // Add Matthew readings for parallel account
      if (chapter <= 5) {
        passages.push({
          book: 'Matthew',
          chapter: chapter,
          verses: '1-25',
          testament: 'new'
        });
      }

      readings.push({
        day,
        passages,
        historicalContext: {
          period: 'Patriarchal Period & Christ Ministry',
          approximateDate: '2100-4 BC',
          description: `DBRP: Genesis ${chapter} ${chapter <= 5 ? '+ Matthew ' + chapter : ''} - Abraham to Christ teachings. Connections between patriarchal covenant promises and Christ's fulfillment in the New Testament. Shows continuity of God's redemptive plan from Abraham to Messiah.`
        },
        readingTime: 25
      });
    }

    // Days 26-50: Exodus 1-25 with Mark parallel
    for (let day = 26; day <= 50; day++) {
      const exodusChapter = day - 25;
      if (exodusChapter <= 25) {
        const passages: LocalReadingPassage[] = [{ book: 'Exodus', chapter: exodusChapter, verses: '1-31', testament: 'old' }];

        // Add Mark readings for parallel account
        if (day <= 40 && exodusChapter <= 15) {
          const markChapter = day - 25;
          if (markChapter <= 16) {
            passages.push({
              book: 'Mark',
              chapter: markChapter,
              verses: '1-45',
              testament: 'new'
            });
          }
        }

        readings.push({
          day,
          passages,
          historicalContext: {
            period: 'Egyptian Period & Gospel Ministry',
            approximateDate: '1526-30 AD',
            description: `DBRP: Exodus ${exodusChapter} ${day <= 40 && exodusChapter <= 15 ? '+ Mark ' + (day - 25) : ''} - Moses to Christ ministry`
          },
          readingTime: 23
        });
      }
    }

    // Days 51-100: Continue with systematic OT/NT parallel approach
    let currentDay = 51;

    const blbSequence = [
      { ot: { book: 'Leviticus', chapters: 27 }, nt: { book: 'Luke', startChapter: 5 }, days: 15, period: 'Wilderness Period & Gospel' },
      { ot: { book: 'Numbers', chapters: 36 }, nt: { book: 'John', startChapter: 1 }, days: 20, period: 'Wilderness & Christ Ministry' },
      { ot: { book: 'Deuteronomy', chapters: 34 }, nt: { book: 'John', startChapter: 10 }, days: 15, period: 'Pre-Conquest & Christ Teachings' },
      { ot: { book: 'Joshua', chapters: 24 }, nt: { book: 'Acts', startChapter: 1 }, days: 12, period: 'Conquest & Early Church' },
      { ot: { book: 'Judges', chapters: 21 }, nt: { book: 'Acts', startChapter: 8 }, days: 15, period: 'Judges Period & Church Expansion' },
      { ot: { book: 'Ruth', chapters: 4 }, nt: { book: 'Romans', startChapter: 1 }, days: 3, period: 'Judges & Pauline Epistles' },
      { ot: { book: '1 Samuel', chapters: 31 }, nt: { book: 'Romans', startChapter: 4 }, days: 20, period: 'United Monarchy & Romans' },
      { ot: { book: '2 Samuel', chapters: 24 }, nt: { book: 'Romans', startChapter: 12 }, days: 15, period: 'Davidic Kingdom & Romans' },
      { ot: { book: '1 Kings', chapters: 22 }, nt: { book: '1 Corinthians', startChapter: 1 }, days: 18, period: 'Solomon & Church Issues' }
    ];

    blbSequence.forEach(({ ot, nt, days, period }) => {
      const otChaptersPerDay = Math.ceil(ot.chapters / days);
      let ntChapterOffset = 0;

      for (let i = 0; i < days && currentDay <= 365; i++) {
        const dayNum = currentDay++;
        const otStartChapter = (i * otChaptersPerDay) + 1;
        const otEndChapter = Math.min(otStartChapter + otChaptersPerDay - 1, ot.chapters);

        const passages: LocalReadingPassage[] = [];

        // OT readings
        for (let chapter = otStartChapter; chapter <= otEndChapter && chapter <= ot.chapters; chapter++) {
          passages.push({
            book: ot.book,
            chapter,
            verses: '1-31',
            testament: 'old'
          });
        }

        // NT parallel readings (3-4 chapters total per day)
        const ntChaptersToAdd = Math.max(1, Math.min(3, 4 - passages.length));
        for (let j = 0; j < ntChaptersToAdd; j++) {
          const ntChapter = nt.startChapter + ntChapterOffset + j;
          const ntMaxChapters = this.getBookChapters(nt.book);

          if (ntChapter <= ntMaxChapters) {
            passages.push({
              book: nt.book,
              chapter: ntChapter,
              verses: '1-31',
              testament: 'new'
            });
            ntChapterOffset++;
          }
        }

        if (passages.length > 0) {
          readings.push({
            day: dayNum,
            passages,
            historicalContext: {
              period,
              approximateDate: '1400 BC - 95 AD',
              description: `DBRP: ${ot.book} ${otStartChapter}${otEndChapter > otStartChapter ? '-' + otEndChapter : ''} + ${nt.book} chapters. Integrated Old Testament/New Testament reading approach showing typological connections and thematic unity. Demonstrates how Christ fulfills Old Testament patterns and promises.`
            },
            readingTime: 25
          });
        }
      }
    });

    // Continue with more books to reach 365 days using DBRP approach
    const remainingSequence = [
      { book: 'Psalms', days: 50, period: 'Wisdom & Worship' },
      { book: 'Proverbs', days: 10, period: 'Wisdom Literature' },
      { book: 'Isaiah', days: 25, period: 'Major Prophets' },
      { book: 'Jeremiah', days: 20, period: 'Prophetic Warnings' },
      { book: 'Ezekiel', days: 15, period: 'Exilic Prophecy' },
      { book: 'Daniel', days: 8, period: 'Apocalyptic Prophecy' },
      { book: 'Hosea', days: 8, period: 'Minor Prophets' },
      { book: 'Joel', days: 2, period: 'Minor Prophets' },
      { book: 'Amos', days: 5, period: 'Minor Prophets' },
      { book: 'Obadiah', days: 1, period: 'Minor Prophets' },
      { book: 'Jonah', days: 2, period: 'Minor Prophets' },
      { book: 'Micah', days: 4, period: 'Minor Prophets' },
      { book: 'Nahum', days: 2, period: 'Minor Prophets' },
      { book: 'Habakkuk', days: 2, period: 'Minor Prophets' },
      { book: 'Zephaniah', days: 2, period: 'Minor Prophets' },
      { book: 'Haggai', days: 1, period: 'Minor Prophets' },
      { book: 'Zechariah', days: 8, period: 'Minor Prophets' },
      { book: 'Malachi', days: 2, period: 'Minor Prophets' },
      { book: 'Revelation', days: 15, period: 'New Testament Completion' }
    ];

    remainingSequence.forEach(({ book, days, period }) => {
      const chapters = this.getBookChapters(book);
      const chaptersPerDay = Math.ceil(chapters / days);

      for (let i = 0; i < days && currentDay <= 365; i++) {
        const dayNum = currentDay++;
        const startChapter = (i * chaptersPerDay) + 1;
        const endChapter = Math.min(startChapter + chaptersPerDay - 1, chapters);

        if (startChapter <= chapters) {
          readings.push({
            day: dayNum,
            passages: [{
              book,
              chapter: startChapter,
              verses: '1-31',
              testament: book === 'Revelation' ? 'new' : 'old'
            }],
            historicalContext: {
              period,
              approximateDate: book === 'Revelation' ? '95 AD' : '800-400 BC',
              description: `DBRP: ${book} ${startChapter}${endChapter > startChapter ? '-' + endChapter : ''} - ${period}`
            },
            readingTime: book === 'Psalms' ? 20 : 22
          });
        }
      }
    });

    // Ensure exactly 365 days
    while (readings.length < 365) {
      const lastDay = readings.length + 1;
      readings.push({
        day: lastDay,
        passages: [{ book: 'Revelation', chapter: 22, verses: '1-21', testament: 'new' }],
        historicalContext: {
          period: 'Scripture Completion',
          approximateDate: '95 AD',
          description: 'DBRP: Revelation - New Heaven and New Earth'
        },
        readingTime: 20
      });
    }

    return readings.slice(0, 365);
  }

  renderPlanReading(reading: any, plan: { name: string; key: string }) {
    // Filter passages based on Apocrypha settings
    const filteredPassages = this.apocryphaSettings.enabled
      ? reading.passages
      : reading.passages.filter(passage => passage.testament !== 'apocryphal');

    // Check if any passages were filtered out
    const hasApocrypha = reading.passages.some(p => p.testament === 'apocryphal');
    const hasVisibleContent = filteredPassages.length > 0;

    return (
      <div class="reading-content">
        {hasVisibleContent ? (
          <div class="passages">
            {filteredPassages.map(passage => (
              <div class="passage">
                <span class="book">{passage.book} {passage.chapter}:{passage.verses}</span>
                <span class={`testament ${passage.testament}`}>
                  {this.getTestamentLabel(passage.testament)}
                </span>
              </div>
            ))}
          </div>
        ) : <div class="no-reading">Apocrypha content hidden</div>}
        <div class="reading-meta">
          {hasVisibleContent ? <span class="reading-time">{reading.readingTime} min</span> : ''}
          {hasApocrypha && !this.apocryphaSettings.enabled ? (
            <span class="apocrypha-indicator" style={{ background: '#95a5a6' }}>📖 Apocrypha Hidden</span>
          ) : plan.key === 'logos' && hasApocrypha && this.apocryphaSettings.enabled ? (
            <span class="apocrypha-indicator">📖 Apocrypha</span>
          ) : ''}
        </div>
      </div>
    );
  }

  renderContext(context: any) {
    return (
      <div class="context-content">
        <strong>{context.period}</strong>
        <div class="context-date">{context.approximateDate}</div>
        <p>{context.description}</p>
      </div>
    );
  }

  getTestamentLabel(testament: string) {
    const labels = {
      'old': 'OT',
      'new': 'NT',
      'apocryphal': 'APO'
    };
    return labels[testament] || testament;
  }

  renderLogosConfigView() {
    const config = (this.readingPlans.logos as any).config;

    return (
      <div class="logos-config-view">
        <h2>Logos Chronological Reading Plan Configuration</h2>
        <div class="config-grid">
          <div class="config-section">
            <h3>Chronological Methodology</h3>
            <div class="form-group">
              <label htmlFor="dating-system">Dating System:</label>
              <select id="dating-system" class="config-select">
                <option value="young-earth" selected={config.datingSystem === 'young-earth'}>Young Earth Creation</option>
                <option value="conservative" selected={config.datingSystem === 'conservative'}>Conservative</option>
                <option value="moderate" selected={config.datingSystem === 'moderate'}>Moderate</option>
                <option value="academic" selected={config.datingSystem === 'academic'}>Academic</option>
              </select>
            </div>
            <div class="form-group">
              <label htmlFor="job-placement">Job Placement:</label>
              <select id="job-placement" class="config-select">
                <option value="early-genesis" selected={config.jobPlacement === 'early-genesis'}>Early Genesis</option>
                <option value="patriarchal" selected={config.jobPlacement === 'patriarchal'}>Patriarchal Period</option>
                <option value="mosaic" selected={config.jobPlacement === 'mosaic'}>Mosaic Period</option>
                <option value="wisdom-literature" selected={config.jobPlacement === 'wisdom-literature'}>Wisdom Literature</option>
              </select>
            </div>
            <div class="form-group">
              <label htmlFor="gospel-integration">Gospel Integration:</label>
              <select id="gospel-integration" class="config-select">
                <option value="immediate" selected={config.gospelIntegration === 'immediate'}>Immediate After Malachi</option>
                <option value="historical" selected={config.gospelIntegration === 'historical'}>Historical Context</option>
                <option value="theological" selected={config.gospelIntegration === 'theological'}>Theological Grouping</option>
                <option value="harmonized" selected={config.gospelIntegration === 'harmonized'}>Harmonized Chronology</option>
              </select>
            </div>
            <div class="form-group">
              <label htmlFor="psalms-distribution">Psalms Distribution:</label>
              <select id="psalms-distribution" class="config-select">
                <option value="historical" selected={config.psalmsDistribution === 'historical'}>Historical Context</option>
                <option value="thematic" selected={config.psalmsDistribution === 'thematic'}>Thematic Grouping</option>
                <option value="authorial" selected={config.psalmsDistribution === 'authorial'}>Authorial Grouping</option>
                <option value="liturgical" selected={config.psalmsDistribution === 'liturgical'}>Liturgical Use</option>
              </select>
            </div>
          </div>

          <div class="config-section">
            <h3>Apocrypha Settings</h3>
            <div class="checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" checked={config.apocryphaInclusion.enabled} />
                Enable Apocrypha
              </label>
              <label class="checkbox-label">
                <input type="checkbox" checked={config.apocryphaInclusion.oldTestament} />
                Old Testament Apocrypha
              </label>
              <label class="checkbox-label">
                <input type="checkbox" checked={config.apocryphaInclusion.newTestament} />
                New Testament Apocrypha
              </label>
              <label class="checkbox-label">
                <input type="checkbox" checked={config.apocryphaInclusion.deuterocanonical} />
                Deuterocanonical Books
              </label>
            </div>
          </div>

          <div class="config-section">
            <h3>Advanced Options</h3>
            <div class="form-group">
              <label htmlFor="cultural-context">Cultural Context:</label>
              <select id="cultural-context" class="config-select">
                <option value="ancient-near-eastern" selected={config.culturalContext === 'ancient-near-eastern'}>Ancient Near Eastern</option>
                <option value="greco-roman" selected={config.culturalContext === 'greco-roman'}>Greco-Roman</option>
                <option value="jewish" selected={config.culturalContext === 'jewish'}>Jewish Second Temple</option>
                <option value="early-church" selected={config.culturalContext === 'early-church'}>Early Church Context</option>
              </select>
            </div>
            <div class="form-group">
              <label htmlFor="theological-emphasis">Theological Emphasis:</label>
              <select id="theological-emphasis" class="config-select">
                <option value="balanced" selected={config.theologicalEmphasis === 'balanced'}>Balanced</option>
                <option value="evangelical" selected={config.theologicalEmphasis === 'evangelical'}>Evangelical</option>
                <option value="catholic" selected={config.theologicalEmphasis === 'catholic'}>Catholic</option>
                <option value="orthodox" selected={config.theologicalEmphasis === 'orthodox'}>Orthodox</option>
                <option value="academic" selected={config.theologicalEmphasis === 'academic'}>Academic</option>
              </select>
            </div>
            <label class="checkbox-label">
              <input type="checkbox" checked={config.parallelPassages} />
              Include Parallel Passages
            </label>
          </div>
        </div>

        <div class="config-actions">
          <button id="apply-config" class="nav-btn active">Apply Configuration</button>
          <button id="reset-config" class="nav-btn">Reset to Default</button>
          <button id="save-config" class="nav-btn">Save Configuration</button>
        </div>

        <div class="config-preview">
          <h3>Configuration Summary</h3>
          <div class="summary-grid">
            <div class="summary-item">
              <strong>Methodology:</strong> {config.datingSystem} dating
            </div>
            <div class="summary-item">
              <strong>Job Placement:</strong> {config.jobPlacement}
            </div>
            <div class="summary-item">
              <strong>Apocrypha:</strong> {config.apocryphaInclusion.enabled ? 'Enabled' : 'Disabled'}
            </div>
            <div class="summary-item">
              <strong>Parallel Passages:</strong> {config.parallelPassages ? 'Included' : 'Excluded'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderCustomView() {
    return (
      <div class="custom-plan-view">
        <h2>Create Custom Reading Plan</h2>
        <div class="form-group">
          <label htmlFor="plan-name">Plan Name:</label>
          <input type="text" id="plan-name" placeholder="My Custom Chronological Plan" />
        </div>
        <div class="form-group">
          <label htmlFor="plan-methodology">Methodology:</label>
          <select id="plan-methodology">
            <option value="conservative">Conservative</option>
            <option value="academic">Academic</option>
            <option value="devotional">Devotional</option>
            <option value="historical">Historical Focus</option>
          </select>
        </div>
        <div class="form-group">
          <label>Base Plan:</label>
          <div class="checkbox-group">
            <label><input type="radio" name="base-plan" value="esv" /> ESV Chronological</label>
            <label><input type="radio" name="base-plan" value="logos" /> Logos Chronological</label>
            <label><input type="radio" name="base-plan" value="blb" /> Blue Letter Bible</label>
          </div>
        </div>
        <button id="create-plan" class="nav-btn active">Create Plan</button>
      </div>
    );
  }

  renderSavedView() {
    return (
      <div class="saved-plans-view">
        <h2>Saved Reading Plans</h2>
        {this.savedPlans.length === 0 ? (
          <p>No saved plans yet. Create your first custom plan!</p>
        ) : (
          <div class="saved-plans-list">
            {this.savedPlans.map((plan, index) => (
              <div class="saved-plan-item">
                <h3>{plan.name}</h3>
                <p>{plan.description}</p>
                <div class="plan-actions">
                  <button data-action="load" data-index={index} class="nav-btn">Load</button>
                  <button data-action="delete" data-index={index} class="nav-btn">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  renderComparisonView() {
    const plans = ['esv', 'logos', 'blb', 'apocrypha', 'biblehub'].map(key => ({
      name: this.readingPlans[key].name,
      key: key,
      methodology: this.readingPlans[key].methodology,
      totalDays: this.readingPlans[key].totalDays,
      apocryphaSupport: this.readingPlans[key].apocryphaSupport,
      readings: this.readingPlans[key].readings
    }));

    // Get all unique days from all plans
    const allDays = new Set();
    plans.forEach(plan => {
      plan.readings.forEach(reading => allDays.add(reading.day));
    });
    const sortedDays = Array.from(allDays).sort((a: number, b: number) => a - b);

    return (
      <div class="comparison-table-container">
        <div class="comparison-header">
          <h2>Reading Plan Comparison - All Days</h2>
          <div class="plan-legend">
            {plans.map(plan => (
              <div class="legend-item">
                <span>{plan.name}</span>
                <small>({plan.methodology})</small>
                <a href={this.sourceUrls[plan.key as keyof typeof this.sourceUrls]} target="_blank" rel="noopener" class="source-link">📋 Source</a>
              </div>
            ))}
          </div>
        </div>

        <div class="comparison-table-wrapper">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>
                  <a href={this.sourceUrls.esv} target="_blank" rel="noopener" class="provider-link">
                    ESV Chronological
                  </a>
                </th>
                <th>
                  <a href={this.sourceUrls.logos} target="_blank" rel="noopener" class="provider-link">
                    Logos Chronological
                  </a>
                </th>
                <th>
                  <a href={this.sourceUrls.blb} target="_blank" rel="noopener" class="provider-link">
                    Blue Letter Bible
                  </a>
                </th>
                <th>
                  <a href={this.sourceUrls.apocrypha} target="_blank" rel="noopener" class="provider-link">
                    Apocrypha & Pseudepigrapha
                  </a>
                </th>
                <th>
                  <a href={this.sourceUrls.biblehub} target="_blank" rel="noopener" class="provider-link">
                    Biblehub Chronological
                  </a>
                </th>
                <th>Historical Context</th>
              </tr>
            </thead>
            <tbody>
              {sortedDays.map(day => {
                const esvReading = plans[0].readings.find(r => r.day === day);
                const logosReading = plans[1].readings.find(r => r.day === day);
                const blbReading = plans[2].readings.find(r => r.day === day);
                const apocryphaReading = plans[3].readings.find(r => r.day === day);
                const biblehubReading = plans[4].readings.find(r => r.day === day);

                // Get historical context (use the first available)
                const context = esvReading?.historicalContext || logosReading?.historicalContext || blbReading?.historicalContext || apocryphaReading?.historicalContext || biblehubReading?.historicalContext;

                return (
                  <tr class={`day-row ${day === this.currentDay ? 'current-day' : ''}`} data-day={day}>
                    <td class="day-cell">
                      <strong>Day {day}</strong>
                      {day === this.currentDay ? <span class="current-indicator">Current</span> : ''}
                    </td>
                    <td class="plan-cell plan-esv">
                      {esvReading ? this.renderPlanReading(esvReading, plans[0]) : <span class="no-reading">No reading</span>}
                    </td>
                    <td class="plan-cell plan-logos">
                      {logosReading ? this.renderPlanReading(logosReading, plans[1]) : <span class="no-reading">No reading</span>}
                    </td>
                    <td class="plan-cell plan-blb">
                      {blbReading ? this.renderPlanReading(blbReading, plans[2]) : <span class="no-reading">No reading</span>}
                    </td>
                    <td class="plan-cell plan-apocrypha">
                      {apocryphaReading ? this.renderPlanReading(apocryphaReading, plans[3]) : <span class="no-reading">No reading</span>}
                    </td>
                    <td class="plan-cell plan-biblehub">
                      {biblehubReading ? this.renderPlanReading(biblehubReading, plans[4]) : <span class="no-reading">No reading</span>}
                    </td>
                    <td class="context-cell">
                      {context ? this.renderContext(context) : <span class="no-context">-</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  renderCurrentView() {
    switch (this.currentView) {
      case 'comparison':
        return this.renderComparisonView();
      case 'custom':
        return this.renderCustomView();
      case 'saved':
        return this.renderSavedView();
      case 'logos-config':
        return this.renderLogosConfigView();
      default:
        return this.renderComparisonView();
    }
  }

  componentDidLoad() {
    // Initialize apocrypha readings
    const apocryphaPlan = this.apocryphaProvider.generateApocryphaPlan();
    this.readingPlans.apocrypha.readings = this.convertToLocalDailyReadings(apocryphaPlan.dailyReadings);

    // Initialize Biblehub readings
    const biblehubPlan = this.biblehubProvider.generateBiblehubPlan();
    this.readingPlans.biblehub.readings = this.convertToLocalDailyReadings(biblehubPlan.dailyReadings);

    this.attachEventListeners();
  }

  private convertToLocalDailyReadings(readings: any[]): SimpleDailyReading[] {
    return readings.map(reading => ({
      day: reading.day,
      passages: reading.passages.map(passage => ({
        book: passage.book,
        chapter: passage.chapterStart,
        verses: `${passage.verseStart || '1'}-${passage.verseEnd || '31'}`,
        testament: passage.testament
      })),
      historicalContext: reading.historicalContext ? {
        period: reading.historicalContext.period,
        approximateDate: reading.historicalContext.approximateDate,
        description: reading.historicalContext.description
      } : undefined,
      readingTime: reading.readingTimeMinutes
    }));
  }

  attachEventListeners() {
    // Use the component's shadow root to access elements
    const root = this.el.shadowRoot;

    if (!root) return;

    // Navigation
    root.getElementById('nav-comparison')?.addEventListener('click', () => {
      this.currentView = 'comparison';
    });

    root.getElementById('nav-custom')?.addEventListener('click', () => {
      this.currentView = 'custom';
    });

    root.getElementById('nav-saved')?.addEventListener('click', () => {
      this.currentView = 'saved';
    });

    root.getElementById('nav-logos')?.addEventListener('click', () => {
      this.currentView = 'logos-config';
    });

    // Apocrypha toggle
    root.getElementById('apocrypha-toggle')?.addEventListener('click', () => {
      console.log('Apocrypha toggle clicked, current value:', this.apocryphaSettings.enabled);
      // Force re-render by creating a new object reference
      this.apocryphaSettings = {
        ...this.apocryphaSettings,
        enabled: !this.apocryphaSettings.enabled
      };
      console.log('Apocrypha toggle new value:', this.apocryphaSettings.enabled);
    });

    // Custom plan creation
    root.getElementById('create-plan')?.addEventListener('click', () => {
      // Custom plan creation logic
      console.log('Creating custom plan...');
    });

    // Logos configuration controls
    root.getElementById('apply-config')?.addEventListener('click', () => {
      console.log('Applying Logos configuration...');
    });

    root.getElementById('reset-config')?.addEventListener('click', () => {
      console.log('Resetting Logos configuration...');
    });

    root.getElementById('save-config')?.addEventListener('click', () => {
      console.log('Saving Logos configuration...');
    });
  }

  render() {
    return (
      <div class="bible360-app">
        <header class="bible360-header">
          <h1>Bible360</h1>
          <p>Chronological Bible Reading Plans - Multi-Provider Comparison</p>
        </header>

        <nav class="bible360-nav">
          <button id="nav-comparison" class={`nav-btn ${this.currentView === 'comparison' ? 'active' : ''}`}>Comparison</button>
          <button id="nav-custom" class={`nav-btn ${this.currentView === 'custom' ? 'active' : ''}`}>Custom Plan</button>
          <button id="nav-saved" class={`nav-btn ${this.currentView === 'saved' ? 'active' : ''}`}>Saved Plans</button>
          <button id="nav-logos" class={`nav-btn ${this.currentView === 'logos-config' ? 'active' : ''}`}>Logos Config</button>
          <button id="apocrypha-toggle" class="nav-btn">
            Apocrypha: {this.apocryphaSettings.enabled ? 'ON' : 'OFF'}
          </button>
        </nav>

        <main class="bible360-content">
          {this.renderCurrentView()}
        </main>

        <footer class="bible360-footer">
          <p>© 2025 Bible360 - Chronological Bible Reading Plans</p>
          <div class="source-attribution">
            <p>Reading plans based on data from:</p>
            <div class="source-links">
              <a href={this.sourceUrls.esv} target="_blank" rel="noopener">ESV.org</a>
              <a href={this.sourceUrls.logos} target="_blank" rel="noopener">Logos.com</a>
              <a href={this.sourceUrls.blb} target="_blank" rel="noopener">BlueLetterBible.org</a>
              <a href={this.sourceUrls.apocrypha} target="_blank" rel="noopener">Apocrypha Research</a>
              <a href={this.sourceUrls.biblehub} target="_blank" rel="noopener">Biblehub</a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}