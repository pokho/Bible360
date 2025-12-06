/**
 * BibleHub URL Generation Utilities
 *
 * Utility functions for generating BibleHub.com URLs for Bible passages.
 * Handles proper book name normalization for all 66 Bible books.
 */

// Comprehensive mapping of all 66 Bible books to BibleHub URL format
// Includes both full names and abbreviations used in reading providers
const BOOK_NAME_MAPPINGS: Record<string, string> = {
  // Old Testament (39 books)
  'Genesis': 'genesis',
  'Gen': 'genesis',
  'Exodus': 'exodus',
  'Exo': 'exodus',
  'Leviticus': 'leviticus',
  'Lev': 'leviticus',
  'Numbers': 'numbers',
  'Num': 'numbers',
  'Deuteronomy': 'deuteronomy',
  'Deu': 'deuteronomy',
  'Joshua': 'joshua',
  'Jos': 'joshua',
  'Judges': 'judges',
  'Jdg': 'judges',
  'Ruth': 'ruth',
  'Rth': 'ruth',
  '1 Samuel': '1_samuel',
  '1Sa': '1_samuel',
  '2 Samuel': '2_samuel',
  '2Sa': '2_samuel',
  '1 Kings': '1_kings',
  '1Ki': '1_kings',
  '2 Kings': '2_kings',
  '2Ki': '2_kings',
  '1 Chronicles': '1_chronicles',
  '1Ch': '1_chronicles',
  '2 Chronicles': '2_chronicles',
  '2Ch': '2_chronicles',
  'Ezra': 'ezra',
  'Ezr': 'ezra',
  'Nehemiah': 'nehemiah',
  'Neh': 'nehemiah',
  'Esther': 'esther',
  'Est': 'esther',
  'Job': 'job',
  'Psalms': 'psalms',
  'Psa': 'psalms',
  'Proverbs': 'proverbs',
  'Pro': 'proverbs',
  'Ecclesiastes': 'ecclesiastes',
  'Ecc': 'ecclesiastes',
  'Song of Solomon': 'song_of_solomon',
  'Sng': 'song_of_solomon',
  'Isaiah': 'isaiah',
  'Isa': 'isaiah',
  'Jeremiah': 'jeremiah',
  'Jer': 'jeremiah',
  'Lamentations': 'lamentations',
  'Lam': 'lamentations',
  'Ezekiel': 'ezekiel',
  'Eze': 'ezekiel',
  'Daniel': 'daniel',
  'Dan': 'daniel',
  'Hosea': 'hosea',
  'Hos': 'hosea',
  'Joel': 'joel',
  'Joe': 'joel',
  'Amos': 'amos',
  'Amo': 'amos',
  'Obadiah': 'obadiah',
  'Oba': 'obadiah',
  'Jonah': 'jonah',
  'Jon': 'jonah',
  'Micah': 'micah',
  'Mic': 'micah',
  'Nahum': 'nahum',
  'Nah': 'nahum',
  'Habakkuk': 'habakkuk',
  'Hab': 'habakkuk',
  'Zephaniah': 'zephaniah',
  'Zep': 'zephaniah',
  'Haggai': 'haggai',
  'Hag': 'haggai',
  'Zechariah': 'zechariah',
  'Zec': 'zechariah',
  'Malachi': 'malachi',
  'Mal': 'malachi',

  // New Testament (27 books)
  'Matthew': 'matthew',
  'Mat': 'matthew',
  'Mark': 'mark',
  'Mar': 'mark',
  'Luke': 'luke',
  'Luk': 'luke',
  'John': 'john',
  'Jhn': 'john',
  'Acts': 'acts',
  'Act': 'acts',
  'Romans': 'romans',
  'Rom': 'romans',
  '1 Corinthians': '1_corinthians',
  '1Co': '1_corinthians',
  '2 Corinthians': '2_corinthians',
  '2Co': '2_corinthians',
  'Galatians': 'galatians',
  'Gal': 'galatians',
  'Ephesians': 'ephesians',
  'Eph': 'ephesians',
  'Philippians': 'philippians',
  'Phl': 'philippians',
  'Colossians': 'colossians',
  'Col': 'colossians',
  '1 Thessalonians': '1_thessalonians',
  '1Th': '1_thessalonians',
  '2 Thessalonians': '2_thessalonians',
  '2Th': '2_thessalonians',
  '1 Timothy': '1_timothy',
  '1Ti': '1_timothy',
  '2 Timothy': '2_timothy',
  '2Ti': '2_timothy',
  'Titus': 'titus',
  'Tit': 'titus',
  'Philemon': 'philemon',
  'Phm': 'philemon',
  'Hebrews': 'hebrews',
  'Heb': 'hebrews',
  'James': 'james',
  'Jas': 'james',
  '1 Peter': '1_peter',
  '1Pe': '1_peter',
  '2 Peter': '2_peter',
  '2Pe': '2_peter',
  '1 John': '1_john',
  '1Jo': '1_john',
  '2 John': '2_john',
  '2Jo': '2_john',
  '3 John': '3_john',
  '3Jo': '3_john',
  'Jude': 'jude',
  'Jde': 'jude',
  'Revelation': 'revelation',
  'Rev': 'revelation'
};

/**
 * Normalizes Bible book name for BibleHub URL format
 * @param bookName The standard Bible book name
 * @returns Normalized book name for URL
 */
export function normalizeBookNameForUrl(bookName: string): string {
  return BOOK_NAME_MAPPINGS[bookName] || bookName.toLowerCase().replace(/\s+/g, '');
}

/**
 * Generates BibleHub URL for a given Bible passage
 * @param book The Bible book name
 * @param chapterStart The starting chapter number
 * @returns Complete BibleHub URL
 */
export function generateBiblehubHref(book: string, chapterStart: number): string {
  const normalizedBook = normalizeBookNameForUrl(book);
  return `https://biblehub.com/${normalizedBook}/${chapterStart}.htm`;
}