import type { ReadingPlan } from '../../types/reading-plans';

export class BiblehubReadingProvider {
  generateBiblehubPlan(): ReadingPlan {
    return {
      provider: 'biblehub',
      methodology: {
        datingSystem: 'conservative',
        jobPlacement: 'patriarchal',
        gospelIntegration: 'historical',
        psalmsDistribution: 'historical',
        apocryphaInclusion: {
          includeDeuterocanonical: false,
          includeNTApocrypha: false,
          denominationalPreference: 'protestant',
          intertestamentalPlacement: 'historical-gap'
        }
      },
      dailyReadings: this.generateBiblehubReadings(),
      metadata: {
        title: 'Biblehub Chronological Timeline',
        description: 'Complete chronological reading plan following Biblehub timeline structure with chapter-by-chapter progression through biblical history',
        totalDays: 365,
        averageReadingTime: 20,
        language: 'en',
        version: '1.0',
        sourceUrl: 'https://biblehub.com/timeline/'
      }
    };
  }

  private generateBiblehubReadings() {
    const readings = [];

    // Biblehub Timeline - Complete Chronological Reading Plan
    // Based on Biblehub's comprehensive timeline structure with accurate chapter links

    // Phase 1: Creation and Early History (Days 1-60)
    const creationPhase = [
      // Days 1-50: Genesis - Creation to Patriarchs
      { book: 'Genesis', startDay: 1, endDay: 50, period: 'Creation to Patriarchs', date: '4004-2000 BCE', description: 'Genesis: Creation, Fall, Flood, Tower of Babel, and call of Abraham' },

      // Days 51-55: Job - Contemporary with Patriarchs
      { book: 'Job', startDay: 51, endDay: 55, period: 'Patriarchal Period', date: '2000-1800 BCE', description: 'Job: Wisdom literature set during the time of the patriarchs' },

      // Days 56-60: Early Genesis Supplementary
      { book: 'Genesis', startDay: 56, endDay: 60, period: 'Patriarchs Complete', date: '2000-1800 BCE', description: 'Genesis completion: Jacob, Joseph, and migration to Egypt' }
    ];

    // Phase 2: Exodus and Wilderness (Days 61-100)
    const exodusPhase = [
      // Days 61-75: Exodus - Liberation from Egypt
      { book: 'Exodus', startDay: 61, endDay: 75, period: 'Egyptian Period', date: '1526-1446 BCE', description: 'Exodus: Moses, plagues, Passover, Red Sea crossing, and Sinai' },

      // Days 76-85: Leviticus - Priestly Laws
      { book: 'Leviticus', startDay: 76, endDay: 85, period: 'Wilderness Wanderings', date: '1446-1406 BCE', description: 'Leviticus: Sacrificial system, priestly duties, and holiness laws' },

      // Days 86-100: Numbers - Wilderness Journey
      { book: 'Numbers', startDay: 86, endDay: 100, period: 'Wilderness Wanderings', date: '1446-1406 BCE', description: 'Numbers: Census, rebellion, and journey to promised land' }
    ];

    // Phase 3: Conquest and Judges (Days 101-130)
    const conquestPhase = [
      // Days 101-110: Deuteronomy - Law Renewal
      { book: 'Deuteronomy', startDay: 101, endDay: 110, period: 'Pre-Conquest', date: '1406 BCE', description: 'Deuteronomy: Moses\' final addresses and covenant renewal' },

      // Days 111-120: Joshua - Conquest of Canaan
      { book: 'Joshua', startDay: 111, endDay: 120, period: 'Conquest Period', date: '1406-1390 BCE', description: 'Joshua: Conquest of Canaan and division of the land' },

      // Days 121-130: Judges - Period of the Judges
      { book: 'Judges', startDay: 121, endDay: 130, period: 'Judges Period', date: '1390-1050 BCE', description: 'Judges: Cycle of sin, oppression, and deliverance' }
    ];

    // Phase 4: United Monarchy (Days 131-180)
    const monarchyPhase = [
      // Days 131-133: Ruth - Bridge to Monarchy
      { book: 'Ruth', startDay: 131, endDay: 133, period: 'Judges Period', date: '1150-1100 BCE', description: 'Ruth: Kinsman-redeemer and David\'s ancestry' },

      // Days 134-155: 1 Samuel - Saul and David Begins
      { book: '1 Samuel', startDay: 134, endDay: 155, period: 'United Monarchy', date: '1100-970 BCE', description: '1 Samuel: Samuel, Saul, and David\'s rise to power' },

      // Days 156-170: 2 Samuel - David\'s Reign
      { book: '2 Samuel', startDay: 156, endDay: 170, period: 'United Monarchy', date: '1010-970 BCE', description: '2 Samuel: David\'s reign, successes, and failures' },

      // Days 171-180: 1 Chronicles - David\'s Reign (Priestly Perspective)
      { book: '1 Chronicles', startDay: 171, endDay: 180, period: 'United Monarchy', date: '1010-970 BCE', description: '1 Chronicles: Genealogies and David\'s reign from priestly perspective' }
    ];

    // Phase 5: Divided Monarchy (Days 181-240)
    const dividedPhase = [
      // Days 181-195: 1 Kings - Solomon and Division
      { book: '1 Kings', startDay: 181, endDay: 195, period: 'Divided Monarchy', date: '970-586 BCE', description: '1 Kings: Solomon\'s glory, temple building, and kingdom division' },

      // Days 196-210: 2 Kings - Fall of Israel and Judah
      { book: '2 Kings', startDay: 196, endDay: 210, period: 'Divided Monarchy', date: '922-586 BCE', description: '2 Kings: Prophets, exile, and fall of both kingdoms' },

      // Days 211-225: 2 Chronicles - Southern Kingdom
      { book: '2 Chronicles', startDay: 211, endDay: 225, period: 'Divided Monarchy', date: '970-586 BCE', description: '2 Chronicles: Southern kingdom history and temple focus' }
    ];

    // Phase 6: Exile and Return (Days 226-260)
    const exilePhase = [
      // Days 226-230: Ezra - Return and Rebuilding
      { book: 'Ezra', startDay: 226, endDay: 230, period: 'Post-Exilic', date: '538-457 BCE', description: 'Ezra: Return from exile and temple rebuilding' },

      // Days 231-235: Nehemiah - Wall Rebuilding
      { book: 'Nehemiah', startDay: 231, endDay: 235, period: 'Post-Exilic', date: '445-432 BCE', description: 'Nehemiah: Wall rebuilding and spiritual renewal' },

      // Days 236-240: Esther - Persian Period
      { book: 'Esther', startDay: 236, endDay: 240, period: 'Persian Period', date: '483-473 BCE', description: 'Esther: Divine providence in Persian court' }
    ];

    // Phase 7: Wisdom Literature (Days 241-280)
    const wisdomPhase = [
      // Days 241-260: Psalms - Worship and Prayer
      { book: 'Psalms', startDay: 241, endDay: 260, period: 'Various Periods', date: '1400-400 BCE', description: 'Psalms: Hebrew worship, prayers, and messianic prophecies' },

      // Days 261-270: Proverbs - Wisdom Teachings
      { book: 'Proverbs', startDay: 261, endDay: 270, period: 'Solomonic Period', date: '970-930 BCE', description: 'Proverbs: Practical wisdom and godly living' },

      // Days 271-275: Ecclesiastes - Life\'s Meaning
      { book: 'Ecclesiastes', startDay: 271, endDay: 275, period: 'Post-Exilic', date: '935 BCE', description: 'Ecclesiastes: Meaning of life and fearing God' },

      // Days 276-280: Song of Solomon - Love and Marriage
      { book: 'Song of Solomon', startDay: 276, endDay: 280, period: 'Solomonic Period', date: '965 BCE', description: 'Song of Solomon: Divine love and marriage' }
    ];

    // Phase 8: Major Prophets (Days 281-320)
    const majorProphetsPhase = [
      // Days 281-300: Isaiah - Messianic Prophecies
      { book: 'Isaiah', startDay: 281, endDay: 300, period: 'Prophetic Period', date: '740-680 BCE', description: 'Isaiah: Messianic prophecies and holiness of God' },

      // Days 301-315: Jeremiah - Pre-Exilic Warnings
      { book: 'Jeremiah', startDay: 301, endDay: 315, period: 'Pre-Exilic', date: '627-586 BCE', description: 'Jeremiah: Judgment and New Covenant promises' },

      // Days 316-320: Lamentations - Jeremiah\'s Lament
      { book: 'Lamentations', startDay: 316, endDay: 320, period: 'Exilic', date: '586 BCE', description: 'Lamentations: Grief over Jerusalem\'s destruction' }
    ];

    // Phase 9: Exilic Prophets (Days 321-340)
    const exilicProphetsPhase = [
      // Days 321-330: Ezekiel - Exilic Visions
      { book: 'Ezekiel', startDay: 321, endDay: 330, period: 'Exilic', date: '593-571 BCE', description: 'Ezekiel: Temple visions and restoration promises' },

      // Days 331-340: Daniel - Kingdom Prophecies
      { book: 'Daniel', startDay: 331, endDay: 340, period: 'Exilic', date: '605-530 BCE', description: 'Daniel: Kingdom prophecies and faithful living' }
    ];

    // Phase 10: Minor Prophets (Days 341-365)
    const minorProphetsPhase = [
      // Days 341-345: Hosea - God\'s Faithful Love
      { book: 'Hosea', startDay: 341, endDay: 345, period: 'Pre-Exilic', date: '755-710 BCE', description: 'Hosea: God\'s faithful love despite unfaithfulness' },

      // Days 346-347: Joel - Day of the Lord
      { book: 'Joel', startDay: 346, endDay: 347, period: 'Post-Exilic', date: '835 BCE', description: 'Joel: Day of the Lord and Pentecost prophecy' },

      // Days 348-350: Amos - Social Justice
      { book: 'Amos', startDay: 348, endDay: 350, period: 'Pre-Exilic', date: '760-750 BCE', description: 'Amos: Social justice and true worship' },

      // Days 351: Obadiah - Edom\'s Judgment
      { book: 'Obadiah', startDay: 351, endDay: 351, period: 'Post-Exilic', date: '586 BCE', description: 'Obadiah: Judgment on Edom' },

      // Days 352-353: Jonah - God\'s Mercy
      { book: 'Jonah', startDay: 352, endDay: 353, period: 'Pre-Exilic', date: '793-753 BCE', description: 'Jonah: God\'s mercy to all nations' },

      // Days 354-356: Micah - Justice and Mercy
      { book: 'Micah', startDay: 354, endDay: 356, period: 'Pre-Exilic', date: '735-710 BCE', description: 'Micah: Justice, mercy, and Bethlehem prophecy' },

      // Days 357-358: Nahum - Nineveh\'s Fall
      { book: 'Nahum', startDay: 357, endDay: 358, period: 'Pre-Exilic', date: '663-612 BCE', description: 'Nahum: Nineveh\'s judgment' },

      // Days 359-360: Habakkuk - Faith Questions
      { book: 'Habakkuk', startDay: 359, endDay: 360, period: 'Pre-Exilic', date: '609-605 BCE', description: 'Habakkuk: Questions of faith and God\'s justice' },

      // Days 361-362: Zephaniah - Day of the Lord
      { book: 'Zephaniah', startDay: 361, endDay: 362, period: 'Pre-Exilic', date: '640-621 BCE', description: 'Zephaniah: Coming day of the Lord' },

      // Days 363-364: Haggai - Temple Rebuilding
      { book: 'Haggai', startDay: 363, endDay: 364, period: 'Post-Exilic', date: '520 BCE', description: 'Haggai: Priorities and temple rebuilding' },

      // Days 365: Zechariah - Messianic Hope
      { book: 'Zechariah', startDay: 365, endDay: 365, period: 'Post-Exilic', date: '520-518 BCE', description: 'Zechariah: Messianic prophecies and restoration' }
    ];

    // Combine all phases
    const allPhases = [...creationPhase, ...exodusPhase, ...conquestPhase, ...monarchyPhase, ...dividedPhase, ...exilePhase, ...wisdomPhase, ...majorProphetsPhase, ...exilicProphetsPhase, ...minorProphetsPhase];

    // Generate daily readings from all phases
    allPhases.forEach(({ book, startDay, endDay, period, date, description }) => {
      const chapters = this.getBookChapters(book);
      const daysToAllocate = endDay - startDay + 1;
      const chaptersPerDay = Math.ceil(chapters / daysToAllocate);

      for (let day = startDay; day <= endDay; day++) {
        if (day <= 365) {
          const dayOffset = day - startDay;
          const startChapter = (dayOffset * chaptersPerDay) + 1;
          const endChapter = Math.min(startChapter + chaptersPerDay - 1, chapters);

          if (startChapter <= chapters) {
            readings.push({
              day,
              date: `2025-01-${day.toString().padStart(2, '0')}`,
              passages: [{
                book,
                chapterStart: startChapter,
                chapterEnd: endChapter,
                isApocryphal: false,
                testament: this.getTestament(book),
                parallelEvents: []
              }],
              historicalContext: {
                period,
                approximateDate: date,
                description: `Biblehub Timeline: ${book} ${startChapter}${endChapter > startChapter ? '-' + endChapter : ''} - ${description}`,
                parallelEvents: []
              },
              readingTimeMinutes: 20,
              apocryphaIncluded: false
            });
          }
        }
      }
    });

    // Ensure exactly 365 days
    while (readings.length < 365) {
      readings.push({
        day: readings.length + 1,
        date: `2025-01-${(readings.length + 1).toString().padStart(2, '0')}`,
        passages: [{
          book: 'Zechariah',
          chapterStart: 14,
          chapterEnd: 14,
          isApocryphal: false,
          testament: 'old',
          parallelEvents: []
        }],
        historicalContext: {
          period: 'Messianic Hope',
          approximateDate: '520-518 BCE',
          description: 'Biblehub Timeline: Final prophecy of restoration and triumph',
          parallelEvents: []
        },
        readingTimeMinutes: 15,
        apocryphaIncluded: false
      });
    }

    return readings.slice(0, 365);
  }

  private getBookChapters(book: string): number {
    const chapterCounts: { [key: string]: number } = {
      'Genesis': 50, 'Exodus': 40, 'Leviticus': 27, 'Numbers': 36, 'Deuteronomy': 34,
      'Joshua': 24, 'Judges': 21, 'Ruth': 4, '1 Samuel': 31, '2 Samuel': 24,
      '1 Kings': 22, '2 Kings': 25, '1 Chronicles': 29, '2 Chronicles': 36, 'Ezra': 10,
      'Nehemiah': 13, 'Esther': 10, 'Job': 42, 'Psalms': 150, 'Proverbs': 31,
      'Ecclesiastes': 12, 'Song of Solomon': 8, 'Isaiah': 66, 'Jeremiah': 52,
      'Lamentations': 5, 'Ezekiel': 48, 'Daniel': 12, 'Hosea': 14, 'Joel': 3,
      'Amos': 9, 'Obadiah': 1, 'Jonah': 4, 'Micah': 7, 'Nahum': 3, 'Habakkuk': 3,
      'Zephaniah': 3, 'Haggai': 2, 'Zechariah': 14, 'Malachi': 4, 'Matthew': 28,
      'Mark': 16, 'Luke': 24, 'John': 21, 'Acts': 28, 'Romans': 16,
      '1 Corinthians': 16, '2 Corinthians': 13, 'Galatians': 6, 'Ephesians': 6,
      'Philippians': 4, 'Colossians': 4, '1 Thessalonians': 5, '2 Thessalonians': 3,
      '1 Timothy': 6, '2 Timothy': 4, 'Titus': 3, 'Philemon': 1, 'Hebrews': 13,
      'James': 5, '1 Peter': 5, '2 Peter': 3, '1 John': 5, '2 John': 1, '3 John': 1,
      'Jude': 1, 'Revelation': 22
    };
    return chapterCounts[book] || 10;
  }

  private getTestament(book: string): 'old' | 'new' | 'apocryphal' {
    const oldTestamentBooks = [
      'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth',
      '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra',
      'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon',
      'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos',
      'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah',
      'Malachi'
    ];

    const newTestamentBooks = [
      'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians',
      'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians',
      '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter',
      '1 John', '2 John', '3 John', 'Jude', 'Revelation'
    ];

    if (oldTestamentBooks.includes(book)) return 'old';
    if (newTestamentBooks.includes(book)) return 'new';
    return 'apocryphal';
  }
}