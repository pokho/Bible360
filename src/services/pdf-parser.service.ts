import pdfParse from 'pdf-parse';

export interface ParsedReadingPlan {
  dailyReadings: Array<{
    day: number;
    date?: string;
    passages: Array<{
      book: string;
      chapters: string;
    }>;
    historicalContext?: {
      period: string;
      approximateDate: string;
      description: string;
    };
  }>;
  metadata: {
    totalDays: number;
    source: string;
  };
}

export class PDFParserService {
  private static instance: PDFParserService;

  public static getInstance(): PDFParserService {
    if (!PDFParserService.instance) {
      PDFParserService.instance = new PDFParserService();
    }
    return PDFParserService.instance;
  }

  async parseBlueLetterBiblePlan(pdfBuffer: Buffer): Promise<ParsedReadingPlan> {
    try {
      const pdfData = await pdfParse(pdfBuffer);
      const text = pdfData.text;

      return this.extractReadingsFromText(text);
    } catch (error) {
      console.error('Error parsing PDF:', error);
      throw new Error('Failed to parse PDF reading plan');
    }
  }

  private extractReadingsFromText(text: string): ParsedReadingPlan {
    const lines = text.split('\n').filter(line => line.trim());
    const dailyReadings: ParsedReadingPlan['dailyReadings'] = [];

    let currentDay = 0;
    let currentDate = '';

    for (const line of lines) {
      const trimmedLine = line.trim();

      // Skip headers and empty lines
      if (this.isHeaderOrFooter(trimmedLine)) {
        continue;
      }

      // Check for date patterns (e.g., "Jan 1", "January 1", "01/01")
      const dateMatch = trimmedLine.match(/^(Jan|January|Feb|February|Mar|March|Apr|April|May|Jun|June|Jul|July|Aug|August|Sep|September|Oct|October|Nov|November|Dec|December)\s+\d{1,2}/i);
      if (dateMatch) {
        currentDate = dateMatch[0];
        currentDay++;
        continue;
      }

      // Check for reading patterns (e.g., "Gen 1-3", "Exo 30-32 / Psa 90")
      const readingMatch = trimmedLine.match(/^([A-Za-z]{2,5})\s+(\d+)(?:-\d+)?(?:\s*\/\s*[A-Za-z]{2,5}\s+\d+(?:-\d+)?)*/);
      if (readingMatch && currentDay > 0) {
        const passages = this.parsePassages(trimmedLine);

        if (passages.length > 0) {
          dailyReadings.push({
            day: currentDay,
            date: currentDate || `Day ${currentDay}`,
            passages
          });
        }
      }
    }

    return {
      dailyReadings,
      metadata: {
        totalDays: currentDay,
        source: 'Blue Letter Bible'
      }
    };
  }

  private parsePassages(text: string): Array<{ book: string; chapters: string }> {
    const passages: Array<{ book: string; chapters: string }> = [];

    // Split by " / " for multiple passages on the same day
    const passageParts = text.split(' / ');

    for (const part of passageParts) {
      const trimmedPart = part.trim();

      // Match book abbreviation and chapters
      const match = trimmedPart.match(/^([A-Za-z]{2,5})\s+(\d+)(?:-\d+)?/);
      if (match) {
        const book = this.expandBookAbbreviation(match[1]);
        const chapters = match[2] + (trimmedPart.includes('-') ? trimmedPart.match(/-\d+/)?.[0] : '');

        passages.push({
          book,
          chapters: chapters || match[2]
        });
      }
    }

    return passages;
  }

  private expandBookAbbreviation(abbreviation: string): string {
    const bookMap: Record<string, string> = {
      'Gen': 'Genesis',
      'Exo': 'Exodus',
      'Lev': 'Leviticus',
      'Num': 'Numbers',
      'Deu': 'Deuteronomy',
      'Jos': 'Joshua',
      'Jdg': 'Judges',
      'Rth': 'Ruth',
      '1Sa': '1 Samuel',
      '2Sa': '2 Samuel',
      '1Ki': '1 Kings',
      '2Ki': '2 Kings',
      '1Ch': '1 Chronicles',
      '2Ch': '2 Chronicles',
      'Ezr': 'Ezra',
      'Neh': 'Nehemiah',
      'Est': 'Esther',
      'Job': 'Job',
      'Psa': 'Psalms',
      'Pro': 'Proverbs',
      'Ecc': 'Ecclesiastes',
      'Sng': 'Song of Solomon',
      'Isa': 'Isaiah',
      'Jer': 'Jeremiah',
      'Lam': 'Lamentations',
      'Eze': 'Ezekiel',
      'Dan': 'Daniel',
      'Hos': 'Hosea',
      'Joe': 'Joel',
      'Amo': 'Amos',
      'Oba': 'Obadiah',
      'Jon': 'Jonah',
      'Mic': 'Micah',
      'Nah': 'Nahum',
      'Hab': 'Habakkuk',
      'Zep': 'Zephaniah',
      'Hag': 'Haggai',
      'Zec': 'Zechariah',
      'Mal': 'Malachi',
      'Mat': 'Matthew',
      'Mar': 'Mark',
      'Luk': 'Luke',
      'Jhn': 'John',
      'Act': 'Acts',
      'Rom': 'Romans',
      '1Co': '1 Corinthians',
      '2Co': '2 Corinthians',
      'Gal': 'Galatians',
      'Eph': 'Ephesians',
      'Phl': 'Philippians',
      'Col': 'Colossians',
      '1Th': '1 Thessalonians',
      '2Th': '2 Thessalonians',
      '1Ti': '1 Timothy',
      '2Ti': '2 Timothy',
      'Tit': 'Titus',
      'Phm': 'Philemon',
      'Heb': 'Hebrews',
      'Jas': 'James',
      '1Pe': '1 Peter',
      '2Pe': '2 Peter',
      '1Jo': '1 John',
      '2Jo': '2 John',
      '3Jo': '3 John',
      'Jde': 'Jude',
      'Rev': 'Revelation'
    };

    return bookMap[abbreviation] || abbreviation;
  }

  private isHeaderOrFooter(line: string): boolean {
    const headerFooterPatterns = [
      /Bible\s+Reading\s+Plan/i,
      /Chronological\s+Plan/i,
      /Blue\s+Letter\s+Bible/i,
      /Daily/i,
      /^\d+$/, // Page numbers
      /^Page\s+\d+/i,
      /^\s*$/,
      /These\s+readings\s+are\s+compiled/i
    ];

    return headerFooterPatterns.some(pattern => pattern.test(line));
  }
}