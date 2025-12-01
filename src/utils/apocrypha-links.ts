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
  // Deuterocanonical Books (Catholic/Orthodox Tradition) - NRSVUE Priority
  'Tobit': {
    baseUrl: 'https://www.biblegateway.com/passage/',
    pathPattern: '?search=Tobit+{chapter}&version=NRSVUE',
    requiresChapter: true,
    fallbackUrl: 'https://sacred-texts.com/bib/poly/tob.htm'
  },
  'Judith': {
    baseUrl: 'https://www.biblegateway.com/passage/',
    pathPattern: '?search=Judith+{chapter}&version=NRSVUE',
    requiresChapter: true,
    fallbackUrl: 'https://sacred-texts.com/bib/apo/jdt.htm'
  },
  'Wisdom of Solomon': {
    baseUrl: 'https://www.biblegateway.com/passage/',
    pathPattern: '?search=Wisdom+{chapter}&version=NRSVUE',
    requiresChapter: true,
    fallbackUrl: 'https://sacred-texts.com/chr/apo/index.htm'
  },
  'Sirach': {
    baseUrl: 'https://www.biblegateway.com/passage/',
    pathPattern: '?search=Sirach+{chapter}&version=NRSVUE',
    requiresChapter: true,
    fallbackUrl: 'https://sacred-texts.com/bib/apo/sirach.htm'
  },
  'Baruch': {
    baseUrl: 'https://www.biblegateway.com/passage/',
    pathPattern: '?search=Baruch+{chapter}&version=NRSVUE',
    requiresChapter: true,
    fallbackUrl: 'https://sacred-texts.com/bib/apo/baruch.htm'
  },
  '1 Maccabees': {
    baseUrl: 'https://www.biblegateway.com/passage/',
    pathPattern: '?search=1+Maccabees+{chapter}&version=NRSVUE',
    requiresChapter: true,
    fallbackUrl: 'https://sacred-texts.com/bib/apo/1macc.htm'
  },
  '2 Maccabees': {
    baseUrl: 'https://www.biblegateway.com/passage/',
    pathPattern: '?search=2+Maccabees+{chapter}&version=NRSVUE',
    requiresChapter: true,
    fallbackUrl: 'https://sacred-texts.com/bib/apo/2macc.htm'
  },
  '3 Maccabees': {
    baseUrl: 'https://sacred-texts.com/bib/apo/',
    pathPattern: '3macc.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/3maccabees.html'
  },
  '4 Maccabees': {
    baseUrl: 'https://sacred-texts.com/bib/apo/',
    pathPattern: '4macc.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/4maccabees.html'
  },
  'Greek Esther': {
    baseUrl: 'https://www.biblegateway.com/passage/',
    pathPattern: '?search=Greek+Esther+{chapter}&version=NRSVUE',
    requiresChapter: true,
    fallbackUrl: 'https://sacred-texts.com/bib/apo/gesth.htm'
  },
  'Letter of Jeremiah': {
    baseUrl: 'https://www.biblegateway.com/passage/',
    pathPattern: '?search=Letter+of+Jeremiah+{chapter}&version=NRSVUE',
    requiresChapter: true,
    fallbackUrl: 'https://sacred-texts.com/bib/apo/epjer.htm'
  },
  'Prayer of Azariah': {
    baseUrl: 'https://www.biblegateway.com/passage/',
    pathPattern: '?search=Prayer+of+Azariah&version=NRSVUE',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/bib/apo/prazar.htm'
  },
  'Susanna': {
    baseUrl: 'https://www.biblegateway.com/passage/',
    pathPattern: '?search=Susanna&version=NRSVUE',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/bib/poly/sus.htm'
  },
  'Bel and the Dragon': {
    baseUrl: 'https://www.biblegateway.com/passage/',
    pathPattern: '?search=Bel+and+the+Dragon&version=NRSVUE',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/bib/poly/bel.htm'
  },
  '1 Esdras': {
    baseUrl: 'https://sacred-texts.com/bib/apo/',
    pathPattern: 'esdr001.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/1esdras.html'
  },
  '2 Esdras': {
    baseUrl: 'https://sacred-texts.com/bib/apo/',
    pathPattern: 'esdr002.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/2esdras.html'
  },

  // Old Testament Pseudepigrapha (Note: Many use Sacred Texts as primary since ECW doesn't have them)
  '1 Enoch': {
    baseUrl: 'https://sacred-texts.com/bib/boe/',
    pathPattern: 'index.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/'
  },
  '2 Enoch': {
    baseUrl: 'https://sacred-texts.com/bib/boe/',
    pathPattern: 'index.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/'
  },
  'Jubilees': {
    baseUrl: 'https://sacred-texts.com/bib/apo/',
    pathPattern: 'jubilees.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/'
  },
  'Testament of the Twelve Patriarchs': {
    baseUrl: 'https://sacred-texts.com/bib/apo/',
    pathPattern: 'testamen.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/patriarchs.html'
  },
  'Psalms of Solomon': {
    baseUrl: 'https://sacred-texts.com/bib/poly/',
    pathPattern: 'pss.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/'
  },

  // New Testament Apocrypha - Sacred Texts Priority when available
  'Gospel of Thomas': {
    baseUrl: 'https://sacred-texts.com/chr/',
    pathPattern: 'thomas.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/thomas.html'
  },
  'Gospel of Peter': {
    baseUrl: 'https://sacred-texts.com/chr/',
    pathPattern: 'gospete.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/gospelpeter.html'
  },
  'Gospel of Mary': {
    baseUrl: 'https://sacred-texts.com/chr/',
    pathPattern: 'gomary.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/gospelmary.html'
  },
  'Gospel of Philip': {
    baseUrl: 'https://sacred-texts.com/chr/',
    pathPattern: 'gphilip.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/gospelphilip.html'
  },
  'Acts of Paul': {
    baseUrl: 'https://sacred-texts.com/chr/',
    pathPattern: 'actspaul.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/actspaul.html'
  },
  'Acts of Peter': {
    baseUrl: 'https://sacred-texts.com/chr/',
    pathPattern: 'actpete.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/actspeter.html'
  },

  // Early Church Fathers - Sacred Texts Priority when available
  '1 Clement': {
    baseUrl: 'https://sacred-texts.com/chr/fathers/',
    pathPattern: '1clement.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/1clement.html'
  },
  '2 Clement': {
    baseUrl: 'https://sacred-texts.com/chr/fathers/',
    pathPattern: '2clement.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/2clement.html'
  },
  'Didache': {
    baseUrl: 'https://sacred-texts.com/chr/fathers/',
    pathPattern: 'didache.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/didache.html'
  },
  'Epistle of Barnabas': {
    baseUrl: 'https://sacred-texts.com/chr/fathers/',
    pathPattern: 'barnabas.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/barnabas.html'
  },
  'Shepherd of Hermas': {
    baseUrl: 'https://sacred-texts.com/chr/fathers/',
    pathPattern: 'hermas.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/shepherd.html'
  },
  'Ignatius Letters': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'ignatius.html',
    requiresChapter: false,
    fallbackUrl: 'https://www.newadvent.org/fathers/0103.htm'
  },
  'Martyrdom of Polycarp': {
    baseUrl: 'https://sacred-texts.com/chr/fathers/',
    pathPattern: 'polycarp.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/polycarp.html'
  },
  'Odes of Solomon': {
    baseUrl: 'https://sacred-texts.com/chr/solomon/',
    pathPattern: 'index.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/odes.html'
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
  'Prayer of Manasseh': 'Prayer of Manasseh',
  'Psalm 151': 'Psalm 151',
  '1 Maccabees': '1 Maccabees',
  '2 Maccabees': '2 Maccabees',
  '3 Maccabees': '3 Maccabees',
  '4 Maccabees': '4 Maccabees',
  'Greek Esther': 'Greek Esther',
  'Letter of Jeremiah': 'Letter of Jeremiah',
  'Prayer of Azariah': 'Prayer of Azariah',
  'Susanna': 'Susanna',
  'Bel and the Dragon': 'Bel and the Dragon',
  'Martyrdom of Polycarp': 'Martyrdom of Polycarp',
  'Odes of Solomon': 'Odes of Solomon',
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
  'Epistle of Barnabas': 'Epistle of Barnabas',
  'Ignatius Letters': 'Ignatius Letters',
  'Polycarp to Philippians': 'Polycarp to Philippians',
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
    return 'Source: Sacred Texts (Primary)';
  }

  if (config.baseUrl.includes('biblegateway.com')) {
    return 'Source: Bible Gateway (NRSVUE - Preferred)';
  } else if (config.baseUrl.includes('sacred-texts.com')) {
    return 'Source: Sacred Texts (Preferred)';
  } else if (config.baseUrl.includes('earlychristianwritings.com')) {
    return 'Source: Early Christian Writings (Secondary)';
  } else if (config.baseUrl.includes('deadseascrolls.org.il')) {
    return 'Source: Israel Antiquities Authority - Dead Sea Scrolls';
  } else if (config.baseUrl.includes('newadvent.org')) {
    return 'Source: Christian Classics Ethereal Library';
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