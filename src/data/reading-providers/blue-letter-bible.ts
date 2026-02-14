import type { ReadingPlan, DailyReading, BiblePassage, HistoricalContext, PlanMetadata } from '../../types/reading-plans';
import { generateBiblehubHref } from '../../utils/biblehub-utils.js';

export class BlueLetterBibleProvider {
  readonly name = 'Blue Letter Bible';
  readonly key = 'blb';
  readonly description = 'Chronological reading plan from Blue Letter Bible ministry';
  readonly color = '#1E40AF';

  // Parse chapter range like "Gen 1-3" or "Psa 11, 59"
  private parseChapters(text: string): string[] {
    if (!text) return [];

    // Handle special cases with multiple books separated by " / "
    if (text.includes(' / ')) {
      return text.split(' / ');
    }

    return [text];
  }

  // Convert chapter notation to chapter numbers
  private getChapterNumbers(chapterText: string): { start: number; end?: number }[] {
    const chapters: { start: number; end?: number }[] = [];

    // Handle comma-separated chapters (e.g., "Psa 11, 59")
    if (chapterText.includes(',')) {
      const chapterParts = chapterText.split(',').map(s => s.trim());
      chapterParts.forEach(part => {
        if (part.includes('-')) {
          const [start, end] = part.split('-').map(n => parseInt(n.trim()));
          chapters.push({ start, end });
        } else {
          const chapter = parseInt(part.trim());
          if (!isNaN(chapter)) {
            chapters.push({ start: chapter });
          }
        }
      });
    } else if (chapterText.includes('-')) {
      // Handle range (e.g., "Gen 1-3")
      const [start, end] = chapterText.split('-').map(n => parseInt(n.trim()));
      chapters.push({ start, end });
    } else {
      // Handle single chapter
      const chapter = parseInt(chapterText.trim());
      if (!isNaN(chapter)) {
        chapters.push({ start: chapter });
      }
    }

    return chapters;
  }

  // Extract book name from chapter text
  private extractBookName(chapterText: string): string {
    // Remove chapter numbers and special characters
    // Handle both single and multi-word book names (Gen, 1Sa, Sng, etc.)
    // Use word boundary to ensure we don't capture digits as part of the book name
    const bookName = chapterText.replace(/^([1-2]*\w+)\s+\d.*$/, '$1').trim();
    return bookName;
  }

  getTestament(book: string): 'old' | 'new' | 'apocryphal' {
    const otBooks = ['Gen', 'Exo', 'Lev', 'Num', 'Deu', 'Jos', 'Jdg', 'Rth', '1Sa', '2Sa', '1Ki', '2Ki', '1Ch', '2Ch', 'Ezr', 'Neh', 'Est', 'Job', 'Psa', 'Pro', 'Ecc', 'Sng', 'Isa', 'Jer', 'Lam', 'Eze', 'Dan', 'Hos', 'Joe', 'Amo', 'Oba', 'Jon', 'Mic', 'Nah', 'Hab', 'Zep', 'Hag', 'Zec', 'Mal'];
    const ntBooks = ['Mat', 'Mar', 'Luk', 'Jhn', 'Act', 'Rom', '1Co', '2Co', 'Gal', 'Eph', 'Phl', 'Col', '1Th', '2Th', '1Ti', '2Ti', 'Tit', 'Phm', 'Heb', 'Jas', '1Pe', '2Pe', '1Jo', '2Jo', '3Jo', 'Jde', 'Rev'];

    const bookPrefix = this.extractBookName(book);
    if (otBooks.some(ot => bookPrefix.startsWith(ot))) return 'old';
    if (ntBooks.some(nt => bookPrefix.startsWith(nt))) return 'new';
    return 'old'; // Default to Old Testament
  }

  isApocryphal(book: string): boolean {
    // Blue Letter Bible plan doesn't include apocryphal books
    return false;
  }

  async loadReadingPlan(pdfBuffer?: Buffer): Promise<ReadingPlan> {
    // Official Blue Letter Bible chronological reading plan
    const readings = [
      "Gen 1-3", "Gen 4-7", "Gen 8-11", "Job 1-5", "Job 6-9", "Job 10-13", "Job 14-16", "Job 17-20",
      "Job 21-23", "Job 24-28", "Job 29-31", "Job 32-34", "Job 35-37", "Job 38-39", "Job 40-42",
      "Gen 12-15", "Gen 16-18", "Gen 19-21", "Gen 22-24", "Gen 25-26", "Gen 27-29", "Gen 30-31",
      "Gen 32-34", "Gen 35-37", "Gen 38-40", "Gen 41-42", "Gen 43-45", "Gen 46-47", "Gen 48-50",
      "Exo 1-3", "Exo 4-6", "Exo 7-9", "Exo 10-12", "Exo 13-15", "Exo 16-18", "Exo 19-21", "Exo 22-24",
      "Exo 25-27", "Exo 28-29", "Exo 30-32", "Exo 33-35", "Exo 36-38", "Exo 39-40", "Lev 1-4", "Lev 5-7",
      "Lev 8-10", "Lev 11-13", "Lev 14-15", "Lev 16-18", "Lev 19-21", "Lev 22-23", "Lev 24-25", "Lev 26-27",
      "Num 1-2", "Num 3-4", "Num 5-6", "Num 7", "Num 8-10", "Num 11-13", "Num 14-15", "Num 16-17",
      "Num 18-20", "Num 21-22", "Num 23-25", "Num 26-27", "Num 28-30", "Num 31-32", "Num 33-34", "Num 35-36",
      "Deu 1-2", "Deu 3-4", "Deu 5-7", "Deu 8-10", "Deu 11-13", "Deu 14-16", "Deu 17-20", "Deu 21-23",
      "Deu 24-27", "Deu 28-29", "Deu 30-31", "Deu 32-34 / Psa 90", "Jos 1-4", "Jos 5-8", "Jos 9-11",
      "Jos 12-15", "Jos 16-18", "Jos 19-21", "Jos 22-24", "Jdg 1-2", "Jdg 3-5", "Jdg 6-7", "Jdg 8-9",
      "Jdg 10-12", "Jdg 13-15", "Jdg 16-18", "Jdg 19-21", "Rth 1-4", "1Sa 1-3", "1Sa 4-8", "1Sa 9-12",
      "1Sa 13-14", "1Sa 15-17", "1Sa 18-20 / Psa 11, 59", "1Sa 21-24 / Psa 91", "Psa 7, 27, 31, 34, 52",
      "Psa 56, 120, 140-142", "1Sa 25-27", "Psa 17, 35, 54, 63", "1Sa 28-31 / Psa 18", "Psa 121, 123-125, 128-130",
      "2Sa 1-4", "Psa 6, 8-10, 14, 16, 19, 21", "1Ch 1-2", "Psa 43-45, 49, 84-85, 87", "1Ch 3-5",
      "Psa 73, 77-78", "1Ch 6", "Psa 81, 88, 92-93", "1Ch 7-10", "Psa 102-104", "2Sa 5 / 1Ch 11-12",
      "Psa 133", "Psa 106-107", "1Ch 13-16", "Psa 1-2, 15, 22-24, 47, 68", "Psa 89, 96, 100-101, 105, 132",
      "2Sa 6-7 / 1Ch 17", "Psa 25, 29, 33, 36, 39", "2Sa 8-9 / 1Ch 18", "Psa 50, 53, 60, 75",
      "2Sa 10 / 1Ch 19 / Psa 20", "Psa 65-67, 69-70", "2Sa 11-12 / 1Ch 20", "Psa 32, 51, 86, 122",
      "2Sa 13-15", "Psa 3-4, 12-13, 28, 55", "2Sa 16-18", "Psa 26, 40, 58, 61-62, 64", "2Sa 19-21",
      "Psa 5, 38, 41-42", "2Sa 22-23 / Psa 57", "Psa 95, 97-99", "2Sa 24 / 1Ch 21-22 / Psa 30",
      "Psa 108-110", "1Ch 23-25", "Psa 131, 138-139, 143-145", "1Ch 26-29 / Psa 127", "Psa 111-118",
      "1Ki 1-2 / Psa 37, 71, 94", "Psa 119", "1Ki 3-4", "2Ch 1 / Psa 72", "Sng 1-8", "Pro 1-3",
      "Pro 4-6", "Pro 7-9", "Pro 10-12", "Pro 13-15", "Pro 16-18", "Pro 19-21", "Pro 22-24",
      "1Ki 5-6 / 2Ch 2-3", "1Ki 7 / 2Ch 4", "1Ki 8 / 2Ch 5", "2Ch 6-7 / Psa 136", "Psa 134, 146-150",
      "1Ki 9 / 2Ch 8", "Pro 25-26", "Pro 27-29", "Ecc 1-6", "Ecc 7-12", "1Ki 10-11 / 2Ch 9", "Pro 30-31",
      "1Ki 12-14", "2Ch 10-12", "1Ki 15 / 2Ch 13-16", "1Ki 16 / 2Ch 17", "1Ki 17-19", "1Ki 20-21",
      "1Ki 22 / 2Ch 18", "2Ch 19-23", "Oba 1 / Psa 82-83", "2Ki 1-4", "2Ki 5-8", "2Ki 9-11",
      "2Ki 12-13 / 2Ch 24", "2Ki 14 / 2Ch 25", "Jon 1-4", "2Ki 15 / 2Ch 26", "Isa 1-4", "Isa 5-8",
      "Amo 1-5", "Amo 6-9", "2Ch 27 / Isa 9-12", "Mic 1-7", "2Ch 28 / 2Ki 16-17", "Isa 13-17", "Isa 18-22",
      "Isa 23-27", "2Ki 18 / 2Ch 29-31 / Psa 48", "Hos 1-7", "Hos 8-14", "Isa 28-30", "Isa 31-34",
      "Isa 35-36", "Isa 37-39 / Psa 76", "Isa 40-43", "Isa 44-48", "2Ki 19 / Psa 46, 80, 135",
      "Isa 49-53", "Isa 54-58", "Isa 59-63", "Isa 64-66", "2Ki 20-21 / 2Ch 32-33", "Nah 1-3",
      "2Ki 22-23 / 2Ch 34-35", "Zep 1-3", "Jer 1-3", "Jer 4-6", "Jer 7-9", "Jer 10-13", "Jer 14-17",
      "Jer 18-22", "Jer 23-25", "Jer 26-29", "Jer 30-31", "Jer 32-34", "Jer 35-37", "Jer 38-40 / Psa 74, 79",
      "2Ki 24-25 / 2Ch 36", "Hab 1-3", "Jer 41-45", "Jer 46-48", "Jer 49-50", "Jer 51-52", "Lam 1-2",
      "Lam 3-5", "Eze 1-4", "Eze 5-8", "Eze 9-12", "Eze 13-15", "Eze 16-17", "Eze 18-20", "Eze 21-22",
      "Eze 23-24", "Eze 25-27", "Eze 28-30", "Eze 31-33", "Eze 34-36", "Eze 37-39", "Eze 40-42",
      "Eze 43-45", "Eze 46-48", "Dan 1-3", "Dan 4-6", "Dan 7-9", "Dan 10-12", "Ezr 1-3", "Ezr 4-6 / Psa 137",
      "Hag 1-2", "Zec 1-4", "Zec 5-9", "Zec 10-14", "Est 1-5", "Est 6-10", "Ezr 7-10", "Neh 1-5",
      "Neh 6-7", "Neh 8-10", "Neh 11-13 / Psa 126", "Mal 1-4", "Luk 1 / Jhn 1", "Mat 1 / Luk 2",
      "Mat 2", "Mat 3 / Mar 1 / Luk 3", "Mat 4 / Luk 5-5", "Jhn 2-4", "Mat 8 / Mar 2", "Jhn 5",
      "Mat 12 / Mar 3 / Luk 6", "Mat 5-7", "Mat 9 / Luk 7", "Mat 11", "Luk 11", "Mat 13 / Luk 8",
      "Mar 4-5", "Mat 10", "Mat 14 / Mar 6 / Luk 9", "Jhn 6", "Mat 15 / Mar 7", "Mat 16 / Mar 8",
      "Mat 17 / Mar 9", "Mat 18", "Jhn 7-8", "Jhn 9-10", "Luk 10", "Luk 12-13", "Luk 14-15",
      "Luk 16-17", "Jhn 11", "Luk 18", "Mat 19 / Mar 10", "Mat 20-21", "Luk 19", "Mar 11 / Jhn 12",
      "Mat 22 / Mar 12", "Mat 23 / Luk 20-21", "Mar 13", "Mat 24", "Mat 25", "Mat 26 / Mar 14",
      "Luk 22 / Jhn 13", "Jhn 14-17", "Mat 27 / Mar 15", "Luk 23 / Jhn 18-19", "Mat 28 / Mar 16",
      "Luk 24 / Jhn 20-21", "Act 1-3", "Act 4-6", "Act 7-8", "Act 9-10", "Act 11-12", "Act 13-14",
      "Jas 1-5", "Act 15-16", "Gal 1-3", "Gal 4-6", "Act 17", "1Th 1-5", "2Th 1-3", "Act 18-19",
      "1Co 1-4", "1Co 5-8", "1Co 9-11", "1Co 12-14", "1Co 15-16", "2Co 1-4", "2Co 5-9", "2Co 10-13",
      "Rom 1-3", "Rom 4-7", "Rom 8-10", "Rom 11-13", "Rom 14-16", "Act 20-23", "Act 24-26",
      "Act 27-28", "Col 1-4 / Phm 1", "Eph 1-6", "Phl 1-4", "1Ti 1-6", "Tit 1-3", "1Pe 1-5",
      "Heb 1-6", "Heb 7-10", "Heb 11-13", "2Ti 1-4", "2Pe 1-3 / Jde 1", "1Jo 1-5", "2Jo 1", "3Jo 1",
      "Rev 1-5", "Rev 6-11", "Rev 12-18", "Rev 19-22"
    ];

    const dailyReadings: DailyReading[] = readings.map((reading, index) => {
      const day = index + 1;
      const date = new Date(2025, 0, day); // Starting January 1, 2025

      // Handle multiple books in one reading (e.g., "2Sa 24 / 1Ch 21-22 / Psa 30")
      const bookReadings = this.parseChapters(reading);
      const passages = [];

      bookReadings.forEach(bookReading => {
        const bookName = this.extractBookName(bookReading);
        const chapterNumbers = this.getChapterNumbers(bookReading.replace(bookName, '').trim());

        chapterNumbers.forEach(chapterRange => {
          const passage: BiblePassage = {
            book: bookName,
            chapterStart: chapterRange.start,
            chapterEnd: chapterRange.end || chapterRange.start,
            testament: this.getTestament(bookName),
            isApocryphal: this.isApocryphal(bookName)
          };

          // Add href as a non-standard property for the template
          (passage as any).href = generateBiblehubHref(bookName, chapterRange.start);

          passages.push(passage);
        });
      });

      // Determine historical context based on reading content
      let historicalContext;
      const bookNames = passages.map(p => p.book);

      if (bookNames.includes('Gen') || bookNames.includes('Job')) {
        historicalContext = {
          period: 'Primeval History',
          approximateDate: 'c. 2000-1800 BCE',
          description: 'Creation, patriarchal narratives, and early human history'
        };
      } else if (bookNames.includes('Exo') || bookNames.includes('Lev')) {
        historicalContext = {
          period: 'Exodus and Law',
          approximateDate: 'c. 1445-1400 BCE',
          description: 'Deliverance from Egypt, Sinai covenant, and sacrificial system'
        };
      } else if (bookNames.includes('Num') || bookNames.includes('Deu')) {
        historicalContext = {
          period: 'Wilderness Wanderings',
          approximateDate: 'c. 1400-1350 BCE',
          description: 'Desert journey, covenant renewal, and preparation for conquest'
        };
      } else if (bookNames.includes('Jos') || bookNames.includes('Jdg') || bookNames.includes('Rth')) {
        historicalContext = {
          period: 'Conquest and Judges',
          approximateDate: 'c. 1350-1050 BCE',
          description: 'Canaan conquest, tribal settlement, and period of the judges'
        };
      } else if (bookNames.some(b => b.includes('Sa'))) {
        historicalContext = {
          period: 'United Monarchy',
          approximateDate: 'c. 1050-930 BCE',
          description: 'Samuel, Saul, and David\'s reigns, establishment of the monarchy'
        };
      } else if (bookNames.some(b => b.includes('Ki') || b.includes('Ch'))) {
        historicalContext = {
          period: 'Divided Kingdom',
          approximateDate: 'c. 930-586 BCE',
          description: 'Kingdom division, prophets, and eventual exile'
        };
      } else if (bookNames.includes('Ezr') || bookNames.includes('Neh') || bookNames.includes('Est')) {
        historicalContext = {
          period: 'Post-Exilic Period',
          approximateDate: 'c. 538-400 BCE',
          description: 'Return from exile, temple rebuilding, and restoration'
        };
      } else if (bookNames.some(b => ['Mat', 'Mar', 'Luk', 'Jhn'].includes(b))) {
        historicalContext = {
          period: 'Life of Christ',
          approximateDate: 'c. 4 BCE-30 CE',
          description: 'Jesus Christ\'s life, ministry, death, and resurrection'
        };
      } else if (bookNames.includes('Act')) {
        historicalContext = {
          period: 'Early Church',
          approximateDate: 'c. 30-70 CE',
          description: 'Pentecost, apostolic ministry, and church expansion'
        };
      } else if (bookNames.some(b => ['Rom', '1Co', '2Co', 'Gal', 'Eph', 'Phl', 'Col', '1Th', '2Th', '1Ti', '2Ti', 'Tit', 'Phm'].includes(b))) {
        historicalContext = {
          period: 'Pauline Epistles',
          approximateDate: 'c. 50-68 CE',
          description: 'Paul\'s letters to churches and individuals, Christian theology and practice'
        };
      } else if (bookNames.includes('Heb') || bookNames.includes('Jas') || bookNames.some(b => ['1Pe', '2Pe', '1Jo', '2Jo', '3Jo', 'Jde'].includes(b))) {
        historicalContext = {
          period: 'General Epistles',
          approximateDate: 'c. 60-95 CE',
          description: 'Letters to scattered believers, Christian faith and perseverance'
        };
      } else if (bookNames.includes('Rev')) {
        historicalContext = {
          period: 'Apocalypse',
          approximateDate: 'c. 95 CE',
          description: 'Prophecy of end times, final victory, and eternal kingdom'
        };
      } else {
        historicalContext = {
          period: 'Wisdom and Prophecy',
          approximateDate: 'Various',
          description: 'Scriptural wisdom and prophetic messages'
        };
      }

      // Add commentary for specific days
      let commentary;
      if (day === 1) {
        commentary = '🔍GENERIC_COMMENT: The beginning of God\'s redemptive story. Genesis 1-3 reveals the perfect creation, the tragedy of the Fall, and contains the first promise of the Gospel that sets the stage for all of Scripture.';
      } else if (day === 15) {
        commentary = '🔍GENERIC_COMMENT: The call of Abraham represents God\'s choice to work through one family to bless all nations. This pivotal moment establishes the covenant framework that will culminate in Christ.';
      } else if (day === 45) {
        commentary = '🔍GENERIC_COMMENT: The crossing of the Red Sea demonstrates God\'s power to save His people from impossible situations. This event serves as a powerful type of baptism and redemption throughout Scripture.';
      }

      return {
        day,
        date: date.toISOString().split('T')[0],
        passages,
        readingTimeMinutes: Math.max(15, passages.length * 8), // Minimum 15 minutes, 8 minutes per passage
        historicalContext,
        commentary
      };
    });

    const metadata: PlanMetadata = {
      title: 'Blue Letter Bible Chronological Reading Plan',
      description: 'Official chronological Bible reading plan from Blue Letter Bible ministry',
      totalDays: 365,
      averageReadingTime: 20,
      language: 'English',
      version: '1.0',
      sourceUrl: 'https://www.blueletterbible.org/dailyreading/'
    };

    return {
      provider: 'blue-letter-bible',
      methodology: {
        datingSystem: 'conservative',
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
      metadata
    };
  }
}