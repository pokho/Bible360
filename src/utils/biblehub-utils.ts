/**
 * BibleHub URL Generation Utilities
 *
 * Utility functions for generating BibleHub.com URLs for Bible passages.
 * Handles proper book name normalization for all 66 Bible books.
 */

// Comprehensive mapping of all 66 Bible books to BibleHub URL format
const BOOK_NAME_MAPPINGS: Record<string, string> = {
  // Old Testament (39 books)
  'Genesis': 'genesis',
  'Exodus': 'exodus',
  'Leviticus': 'leviticus',
  'Numbers': 'numbers',
  'Deuteronomy': 'deuteronomy',
  'Joshua': 'joshua',
  'Judges': 'judges',
  'Ruth': 'ruth',
  '1 Samuel': '1samuel',
  '2 Samuel': '2samuel',
  '1 Kings': '1kings',
  '2 Kings': '2kings',
  '1 Chronicles': '1chronicles',
  '2 Chronicles': '2chronicles',
  'Ezra': 'ezra',
  'Nehemiah': 'nehemiah',
  'Esther': 'esther',
  'Job': 'job',
  'Psalms': 'psalms',
  'Proverbs': 'proverbs',
  'Ecclesiastes': 'ecclesiastes',
  'Song of Solomon': 'songofsolomon',
  'Isaiah': 'isaiah',
  'Jeremiah': 'jeremiah',
  'Lamentations': 'lamentations',
  'Ezekiel': 'ezekiel',
  'Daniel': 'daniel',
  'Hosea': 'hosea',
  'Joel': 'joel',
  'Amos': 'amos',
  'Obadiah': 'obadiah',
  'Jonah': 'jonah',
  'Micah': 'micah',
  'Nahum': 'nahum',
  'Habakkuk': 'habakkuk',
  'Zephaniah': 'zephaniah',
  'Haggai': 'haggai',
  'Zechariah': 'zechariah',
  'Malachi': 'malachi',

  // New Testament (27 books)
  'Matthew': 'matthew',
  'Mark': 'mark',
  'Luke': 'luke',
  'John': 'john',
  'Acts': 'acts',
  'Romans': 'romans',
  '1 Corinthians': '1corinthians',
  '2 Corinthians': '2corinthians',
  'Galatians': 'galatians',
  'Ephesians': 'ephesians',
  'Philippians': 'philippians',
  'Colossians': 'colossians',
  '1 Thessalonians': '1thessalonians',
  '2 Thessalonians': '2thessalonians',
  '1 Timothy': '1timothy',
  '2 Timothy': '2timothy',
  'Titus': 'titus',
  'Philemon': 'philemon',
  'Hebrews': 'hebrews',
  'James': 'james',
  '1 Peter': '1peter',
  '2 Peter': '2peter',
  '1 John': '1john',
  '2 John': '2john',
  '3 John': '3john',
  'Jude': 'jude',
  'Revelation': 'revelation'
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