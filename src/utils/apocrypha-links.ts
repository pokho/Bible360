/**
 * Utility for generating URLs for apocryphal and deuterocanonical texts
 * Since these texts are scattered across different sources, this utility
 * maps each book to its most reliable online location
 */

export interface ApocryphaUrlConfig {
  baseUrl: string;
  pathPattern: string;
  requiresChapter: boolean;
  fallbackUrl?: string;
}

/**
 * Primary URL configurations for different categories of apocryphal texts
 */
const URL_CONFIGS: Record<string, ApocryphaUrlConfig> = {
  // Deuterocanonical Books (Catholic/Orthodox Tradition)
  'Tobit': {
    baseUrl: 'https://www.biblegateway.com/passage/',
    pathPattern: '?search=Tobit+{chapter}&version=NABRE',
    requiresChapter: true,
    fallbackUrl: 'https://www.earlychristianwritings.com/tobit.html'
  },
  'Judith': {
    baseUrl: 'https://www.biblegateway.com/passage/',
    pathPattern: '?search=Judith+{chapter}&version=NABRE',
    requiresChapter: true,
    fallbackUrl: 'https://www.earlychristianwritings.com/judith.html'
  },
  'Wisdom of Solomon': {
    baseUrl: 'https://www.biblegateway.com/passage/',
    pathPattern: '?search=Wisdom+{chapter}&version=NABRE',
    requiresChapter: true,
    fallbackUrl: 'https://www.earlychristianwritings.com/wisdom.html'
  },
  'Sirach': {
    baseUrl: 'https://www.biblegateway.com/passage/',
    pathPattern: '?search=Sirach+{chapter}&version=NABRE',
    requiresChapter: true,
    fallbackUrl: 'https://www.earlychristianwritings.com/sirach.html'
  },
  'Baruch': {
    baseUrl: 'https://www.biblegateway.com/passage/',
    pathPattern: '?search=Baruch+{chapter}&version=NABRE',
    requiresChapter: true,
    fallbackUrl: 'https://www.earlychristianwritings.com/baruch.html'
  },
  '1 Maccabees': {
    baseUrl: 'https://www.biblegateway.com/passage/',
    pathPattern: '?search=1+Maccabees+{chapter}&version=NABRE',
    requiresChapter: true,
    fallbackUrl: 'https://www.earlychristianwritings.com/1maccabees.html'
  },
  '2 Maccabees': {
    baseUrl: 'https://www.biblegateway.com/passage/',
    pathPattern: '?search=2+Maccabees+{chapter}&version=NABRE',
    requiresChapter: true,
    fallbackUrl: 'https://www.earlychristianwritings.com/2maccabees.html'
  },
  '1 Esdras': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: '1esdras.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/bib/apo/esdr001.htm'
  },
  '2 Esdras': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: '2esdras.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/bib/apo/esdr002.htm'
  },

  // Old Testament Pseudepigrapha
  '1 Enoch': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: '1enoch.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/bib/eno/index.htm'
  },
  '2 Enoch': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: '2enoch.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/bib/eno/index.htm'
  },
  'Jubilees': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'jubilees.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/bib/apo/jubilees.htm'
  },
  'Testament of the Twelve Patriarchs': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'testament.htm',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/bib/apo/testamen.htm'
  },
  'Psalms of Solomon': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'psalmsolomon.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/bib/apo/psalm151.htm'
  },

  // New Testament Apocrypha
  'Gospel of Thomas': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'thomas.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/chr/thomas.htm'
  },
  'Gospel of Peter': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'gospelpeter.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/chr/gospete.htm'
  },
  'Gospel of Mary': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'gospelmary.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/chr/gomary.htm'
  },
  'Gospel of Philip': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'philip.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/chr/gphilip.htm'
  },
  'Acts of Paul': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'actspaul.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/chr/actspaul.htm'
  },
  'Acts of Peter': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'actspeter.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/chr/actpete.htm'
  },

  // Early Church Fathers
  '1 Clement': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: '1clement.html',
    requiresChapter: false,
    fallbackUrl: 'https://www.newadvent.org/fathers/1010.htm'
  },
  'Didache': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'didache.html',
    requiresChapter: false,
    fallbackUrl: 'https://www.newadvent.org/fathers/0714.htm'
  },
  'Ignatius Letters': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'ignatius.html',
    requiresChapter: false,
    fallbackUrl: 'https://www.newadvent.org/fathers/0103.htm'
  },

  // Gnostic Texts (Nag Hammadi Library)
  'Apocryphon of John': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'apocjohn.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/chr/gno/apocjn.htm'
  },
  'Gospel of Truth': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'gospeltruth.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/chr/gno/gostruth.htm'
  },

  // Dead Sea Scrolls
  'Great Isaiah Scroll': {
    baseUrl: 'https://www.deadseascrolls.org.il/',
    pathPattern: '',
    requiresChapter: false,
    fallbackUrl: 'https://dss.collections.imj.org.il/israel-antiquities-authority/the-great-isaiah-scroll'
  }
};

/**
 * Book name variations to normalize different naming conventions
 */
const BOOK_MAPPINGS: Record<string, string> = {
  'Sirach (Ecclesiasticus)': 'Sirach',
  'Wisdom of Solomon': 'Wisdom',
  'Prayer of Manasseh': 'Manasseh',
  'Psalm 151': 'Psalms of Solomon',
  '1 Maccabees': '1 Maccabees',
  '2 Maccabees': '2 Maccabees',
  '3 Maccabees': '3 Maccabees',
  '4 Maccabees': '4 Maccabees',
  '1 Esdras': '1 Esdras',
  '2 Esdras (4 Ezra)': '2 Esdras',
  '4 Ezra': '2 Esdras',
  '1 Enoch': '1 Enoch',
  '2 Enoch': '2 Enoch',
  'Testament of the Twelve Patriarchs': 'Testament of the Twelve Patriarchs',
  'Testament of Job': 'Testament of Job',
  'Psalms of Solomon': 'Psalms of Solomon',
  '2 Baruch': '2 Baruch',
  '3 Baruch': '3 Baruch',
  '1 Clement': '1 Clement',
  '2 Clement': '2 Clement',
  'Epistle of Barnabas': 'Barnabas',
  'Ignatius Letters': 'Ignatius',
  'Polycarp to Philippians': 'Polycarp',
  'Shepherd of Hermas': 'Shepherd of Hermas',
  'Gospel of the Hebrews': 'Gospel of the Hebrews',
  'Gospel of the Ebionites': 'Gospel of the Ebionites',
  'Gospel of the Egyptians': 'Gospel of the Egyptians',
  'Gospel of Thomas': 'Gospel of Thomas',
  'Gospel of Peter': 'Gospel of Peter',
  'Gospel of Mary': 'Gospel of Mary',
  'Gospel of Philip': 'Gospel of Philip',
  'Acts of Paul': 'Acts of Paul',
  'Acts of Peter': 'Acts of Peter',
  'Acts of Thomas': 'Acts of Thomas',
  'Apocalypse of Peter': 'Apocalypse of Peter',
  'Apocryphon of John': 'Apocryphon of John',
  'Gospel of Truth': 'Gospel of Truth',
  'Tripartite Tractate': 'Tripartite Tractate',
  'Thunder, Perfect Mind': 'Thunder, Perfect Mind',
  'Hypostasis of the Archons': 'Hypostasis of the Archons',
  'On the Origin of the World': 'On the Origin of the World',
  'The Sophia of Jesus Christ': 'Sophia of Jesus Christ',
  'The Apocryphon of James': 'Apocryphon of James',
  'The Treatise on the Resurrection': 'Treatise on the Resurrection',
  'The Three Steles of Seth': 'Three Steles of Seth',
  'The Vision of Paul': 'Vision of Paul',
  'The Prayer of the Apostle Paul': 'Prayer of Paul',
  'The Acts of Peter and the Twelve Apostles': 'Acts of Peter and the Twelve',
  'The Teachings of Silvanus': 'Teachings of Silvanus',
  'Great Isaiah Scroll (1QIsa^a)': 'Great Isaiah Scroll',
  'Community Rule (1QS)': 'Community Rule',
  'War Scroll (1QM)': 'War Scroll',
  'Damascus Document (CD)': 'Damascus Document',
  'Papias Fragments': 'Papias',
  'The Sentences of Sextus': 'Sentences of Sextus',
  'The Odes of Solomon': 'Odes of Solomon'
};

/**
 * Generate URL for apocryphal text reading
 * @param bookName - Name of the apocryphal book
 * @param chapter - Chapter number (optional)
 * @returns Generated URL or fallback URL
 */
export function generateApocryphaUrl(bookName: string, chapter?: number): string | null {
  // Normalize book name
  const normalizedName = BOOK_MAPPINGS[bookName] || bookName;

  // Get configuration for this book
  const config = URL_CONFIGS[normalizedName];

  if (!config) {
    // Fallback to Early Christian Writings for unknown books
    return 'https://www.earlychristianwritings.com/';
  }

  try {
    let url = config.baseUrl;

    // Add path pattern
    if (config.pathPattern) {
      url += config.pathPattern;

      // Replace chapter placeholder if needed
      if (config.requiresChapter && chapter) {
        url = url.replace('{chapter}', chapter.toString());
      }
    }

    return url;
  } catch (error) {
    console.warn(`Error generating URL for ${normalizedName}:`, error);

    // Return fallback URL if available
    return config.fallbackUrl || 'https://www.earlychristianwritings.com/';
  }
}

/**
 * Get description of the source for a given apocryphal text
 * @param bookName - Name of the apocryphal book
 * @returns Source description
 */
export function getApocryphaSourceDescription(bookName: string): string {
  const normalizedName = BOOK_MAPPINGS[bookName] || bookName;
  const config = URL_CONFIGS[normalizedName];

  if (!config) {
    return 'Source: Early Christian Writings';
  }

  if (config.baseUrl.includes('biblegateway.com')) {
    return 'Source: Bible Gateway (New American Bible, Revised Edition)';
  } else if (config.baseUrl.includes('earlychristianwritings.com')) {
    return 'Source: Early Christian Writings';
  } else if (config.baseUrl.includes('deadseascrolls.org.il')) {
    return 'Source: Israel Antiquities Authority - Dead Sea Scrolls';
  } else {
    return 'Source: Academic Online Repository';
  }
}

/**
 * Check if a book has chapter-level linking available
 * @param bookName - Name of the apocryphal book
 * @returns Boolean indicating if chapter linking is available
 */
export function supportsChapterLinking(bookName: string): boolean {
  const normalizedName = BOOK_MAPPINGS[bookName] || bookName;
  const config = URL_CONFIGS[normalizedName];

  return config?.requiresChapter === true;
}

/**
 * Get all supported apocryphal books
 * @returns Array of supported book names
 */
export function getSupportedApocryphaBooks(): string[] {
  return Object.keys(URL_CONFIGS);
}