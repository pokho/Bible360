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
  'Sophia of Jesus Christ': {
    baseUrl: 'https://sacred-texts.com/chr/gno/',
    pathPattern: 'sophia.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/sophiajesus.html'
  },
  'Apocryphon of James': {
    baseUrl: 'https://sacred-texts.com/chr/gno/',
    pathPattern: 'apocjame.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/apocryphonjames.html'
  },
  'Treatise on the Resurrection': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'treatiseonresurrection.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/chr/gno/treatrez.htm'
  },
  'Three Steles of Seth': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'threestelesseth.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/chr/gno/3seth.htm'
  },
  'Vision of Paul': {
    baseUrl: 'https://sacred-texts.com/chr/apo/',
    pathPattern: 'vispaul.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/visionpaul.html'
  },
  'Prayer of Paul': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'prayerpaul.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/chr/gno/prayerpaul.htm'
  },
  'Acts of Peter and the Twelve': {
    baseUrl: 'https://sacred-texts.com/chr/gno/',
    pathPattern: 'actpet12.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/actspeterandtwelve.html'
  },
  'Teachings of Silvanus': {
    baseUrl: 'https://sacred-texts.com/chr/gno/',
    pathPattern: 'teachsyl.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/teachingssilvanus.html'
  },
  'Sentences of Sextus': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'sentencessextus.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/bib/poly/sextus.htm'
  },
  'Interpretation of Knowledge': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'interpretationknowledge.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/chr/gno/interk.htm'
  },
  'Valentinian Exposition': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'valentinianexposition.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/chr/gno/valent.htm'
  },
  'Papias': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'papias.html',
    requiresChapter: false,
    fallbackUrl: 'https://www.newadvent.org/fathers/0102.htm'
  },

  // Dead Sea Scrolls
  'Great Isaiah Scroll': {
    baseUrl: 'https://www.deadseascrolls.org.il/',
    pathPattern: '',
    requiresChapter: false,
    fallbackUrl: 'https://dss.collections.imj.org.il/israel-antiquities-authority/the-great-isaiah-scroll'
  },

  // Additional Old Testament Pseudepigrapha
  'The First Book of Adam and Eve': {
    baseUrl: 'https://sacred-texts.com/bib/poly/',
    pathPattern: 'adam01.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/adamandeve.html'
  },
  'The Second Book of Adam and Eve': {
    baseUrl: 'https://sacred-texts.com/bib/poly/',
    pathPattern: 'adam02.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/adamandeve.html'
  },
  'The Book of Jasher': {
    baseUrl: 'https://sacred-texts.com/bib/poly/',
    pathPattern: 'jasher.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/jasher.html'
  },
  'The Book of the Secrets of Enoch (2 Enoch)': {
    baseUrl: 'https://sacred-texts.com/bib/boe/',
    pathPattern: 'index.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/2enoch.html'
  },
  'Prayer of Manasseh': {
    baseUrl: 'https://www.biblegateway.com/passage/',
    pathPattern: '?search=Prayer+of+Manasseh&version=NRSVUE',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/bib/apo/prman.htm'
  },
  'Psalm 151': {
    baseUrl: 'https://www.biblegateway.com/passage/',
    pathPattern: '?search=Psalm+151&version=NRSVUE',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/bib/apo/ps151.htm'
  },

  // New Testament Apocrypha Additional
  'Gospel of the Hebrews': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'gospelhebrews.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/chr/apo/gosphebr.htm'
  },
  'Gospel of the Ebionites': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'gospolebionites.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/chr/apo/gosebio.htm'
  },
  'Gospel of the Nazoreans': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'gospelnazoreans.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/chr/apo/gosnaz.htm'
  },
  'Gospel of the Egyptians': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'gosphegyptians.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/chr/apo/gosegyp.htm'
  },
  'Gospel of Nicodemus (Acts of Pilate)': {
    baseUrl: 'https://sacred-texts.com/chr/apo/',
    pathPattern: 'nicodem.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/gospelnicodemus.html'
  },
  'Pistis Sophia': {
    baseUrl: 'https://sacred-texts.com/chr/gno/',
    pathPattern: 'psop.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/pistissophia.html'
  },
  'Acts of John': {
    baseUrl: 'https://sacred-texts.com/chr/apo/',
    pathPattern: 'actjohn.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/actsjohn.html'
  },
  'Acts of Andrew': {
    baseUrl: 'https://sacred-texts.com/chr/apo/',
    pathPattern: 'actandre.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/actsandrew.html'
  },
  'Acts of Thomas': {
    baseUrl: 'https://sacred-texts.com/chr/apo/',
    pathPattern: 'actthoma.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/actsthomas.html'
  },
  'Preaching of Peter': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'preachingpeter.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/chr/apo/prepe.htm'
  },
  'Apocalypse of Peter': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'apocalypsepeter.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/chr/apo/apopet.htm'
  },
  'Apocalypse of Paul': {
    baseUrl: 'https://sacred-texts.com/chr/apo/',
    pathPattern: 'apopaul.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/apocalypsepaul.html'
  },
  'Coptic Apocalypse of Paul': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'copticapocalypsepaul.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/chr/gno/apopaul.htm'
  },
  'Apocalypse of Thomas': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'apocalypsethomas.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/chr/apo/apothom.htm'
  },
  '2 Baruch': {
    baseUrl: 'https://sacred-texts.com/bib/poly/',
    pathPattern: '2baruch.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/2baruch.html'
  },
  'Testament of Job': {
    baseUrl: 'https://sacred-texts.com/bib/apo/',
    pathPattern: 'testjob.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/testamentjob.html'
  },
  'Joseph and Aseneth': {
    baseUrl: 'https://sacred-texts.com/bib/apo/',
    pathPattern: 'joseph.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/josephandaseneth.html'
  },
  'Ascension of Isaiah': {
    baseUrl: 'https://sacred-texts.com/bib/apo/',
    pathPattern: 'ascenisa.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/ascensionisaiah.html'
  },
  '3 Baruch': {
    baseUrl: 'https://sacred-texts.com/bib/apo/',
    pathPattern: '3baruch.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/3baruch.html'
  },
  'Letter of Aristeas': {
    baseUrl: 'https://sacred-texts.com/bib/apo/',
    pathPattern: 'aristeas.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/aristeas.html'
  },

  // Qumran/Dead Sea Scrolls Texts
  'Community Rule': {
    baseUrl: 'https://www.deadseascrolls.org.il/',
    pathPattern: '',
    requiresChapter: false,
    fallbackUrl: 'https://dss.collections.imj.org.il/israel-antiquities-authority/community-rules'
  },
  'War Scroll': {
    baseUrl: 'https://www.deadseascrolls.org.il/',
    pathPattern: '',
    requiresChapter: false,
    fallbackUrl: 'https://dss.collections.imj.org.il/israel-antiquities-authority/war-scroll'
  },
  'Damascus Document': {
    baseUrl: 'https://www.deadseascrolls.org.il/',
    pathPattern: '',
    requiresChapter: false,
    fallbackUrl: 'https://dss.collections.imj.org.il/israel-antiquities-authority/damascus-document'
  },
  'Hodayot (Thanksgiving Hymns)': {
    baseUrl: 'https://www.deadseascrolls.org.il/',
    pathPattern: '',
    requiresChapter: false,
    fallbackUrl: 'https://dss.collections.imj.org.il/israel-antiquities-authority/thanksgiving-hymns'
  },

  // Gnostic Texts Additional
  'Zostrianos': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'zostrianos.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/chr/gno/zostrian.htm'
  },
  'Allogenes': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'allogenes.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/chr/gno/allogen.htm'
  },
  'Marsanes': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'marsanes.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/chr/gno/marsanes.htm'
  },
  'The Thought of Norea': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'thoughtofnorea.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/chr/gno/norea.htm'
  },
  'Melchizedek': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'melchizedek.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/chr/gno/melch.htm'
  },
  'The Interpretation of Knowledge': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'interpretationknowledge.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/chr/gno/interk.htm'
  },
  'A Valentinian Exposition': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'valentinianexposition.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/chr/gno/valent.htm'
  },
  'Teachings of Silvanus': {
    baseUrl: 'https://sacred-texts.com/chr/gno/',
    pathPattern: 'teachsyl.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/teachingssilvanus.html'
  },
  'Sentences of Sextus': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'sentencessextus.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/bib/poly/sextus.htm'
  },
  'Tripartite Tractate': {
    baseUrl: 'https://sacred-texts.com/chr/gno/',
    pathPattern: 'tripart.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/tripartitetractate.html'
  },
  'Thunder, Perfect Mind': {
    baseUrl: 'https://sacred-texts.com/chr/gno/',
    pathPattern: 'thunder.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/thunder.html'
  },
  'Hypostasis of the Archons': {
    baseUrl: 'https://sacred-texts.com/chr/gno/',
    pathPattern: 'hyparch.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/hypostasisarchons.html'
  },
  'On the Origin of the World': {
    baseUrl: 'https://sacred-texts.com/chr/gno/',
    pathPattern: 'origin.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/originworld.html'
  },
  'The Sophia of Jesus Christ': {
    baseUrl: 'https://sacred-texts.com/chr/gno/',
    pathPattern: 'sophia.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/sophiajesus.html'
  },
  'The Apocryphon of James': {
    baseUrl: 'https://sacred-texts.com/chr/gno/',
    pathPattern: 'apocjame.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/apocryphonjames.html'
  },
  'The Treatise on the Resurrection': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'treatiseonresurrection.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/chr/gno/treatrez.htm'
  },
  'The Three Steles of Seth': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'threestelesseth.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/chr/gno/3seth.htm'
  },
  'The Vision of Paul': {
    baseUrl: 'https://sacred-texts.com/chr/apo/',
    pathPattern: 'vispaul.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/visionpaul.html'
  },
  'The Prayer of the Apostle Paul': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'prayerpaul.html',
    requiresChapter: false,
    fallbackUrl: 'https://sacred-texts.com/chr/gno/prayerpaul.htm'
  },
  'The Acts of Peter and the Twelve Apostles': {
    baseUrl: 'https://sacred-texts.com/chr/gno/',
    pathPattern: 'actpet12.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/actspeterandtwelve.html'
  },

  // Early Church Fathers Additional
  'Polycarp to Philippians': {
    baseUrl: 'https://sacred-texts.com/chr/fathers/',
    pathPattern: 'polycarp.htm',
    requiresChapter: false,
    fallbackUrl: 'https://www.earlychristianwritings.com/polycarp.html'
  },
  'Papias Fragments': {
    baseUrl: 'https://www.earlychristianwritings.com/',
    pathPattern: 'papias.html',
    requiresChapter: false,
    fallbackUrl: 'https://www.newadvent.org/fathers/0102.htm'
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
  'The Book of the Secrets of Enoch (2 Enoch)': '2 Enoch',
  'Testament of the Twelve Patriarchs': 'Testament of the Twelve Patriarchs',
  'Testament of Job': 'Testament of Job',
  'Psalms of Solomon': 'Psalms of Solomon',
  '2 Baruch': '2 Baruch',
  '2 Baruch (Syriac Apocalypse)': '2 Baruch',
  '3 Baruch': '3 Baruch',
  '1 Clement': '1 Clement',
  '2 Clement': '2 Clement',
  'Epistle of Barnabas': 'Epistle of Barnabas',
  'Ignatius Letters': 'Ignatius Letters',
  'Polycarp to Philippians': 'Polycarp to Philippians',
  'Shepherd of Hermas': 'Shepherd of Hermas',
  'Shepherd of Hermas (Part 1)': 'Shepherd of Hermas',
  'Shepherd of Hermas (Part 2)': 'Shepherd of Hermas',
  'The Odes of Solomon': 'Odes of Solomon',
  'Gospel of the Hebrews': 'Gospel of the Hebrews',
  'Gospel of the Ebionites': 'Gospel of the Ebionites',
  'Gospel of the Nazoreans': 'Gospel of the Nazoreans',
  'Gospel of the Egyptians': 'Gospel of the Egyptians',
  'Gospel of Thomas': 'Gospel of Thomas',
  'Gospel of Peter': 'Gospel of Peter',
  'Gospel of Mary': 'Gospel of Mary',
  'Gospel of Philip': 'Gospel of Philip',
  'Gospel of Nicodemus (Acts of Pilate)': 'Gospel of Nicodemus (Acts of Pilate)',
  'Acts of Paul': 'Acts of Paul',
  'Acts of Peter': 'Acts of Peter',
  'Acts of John': 'Acts of John',
  'Acts of Andrew': 'Acts of Andrew',
  'Acts of Thomas': 'Acts of Thomas',
  'The Acts of Peter and the Twelve Apostles': 'Acts of Peter and the Twelve',
  'Apocalypse of Peter': 'Apocalypse of Peter',
  'Apocalypse of Paul': 'Apocalypse of Paul',
  'Coptic Apocalypse of Paul': 'Coptic Apocalypse of Paul',
  'Apocalypse of Thomas': 'Apocalypse of Thomas',
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
  'The Teachings of Silvanus': 'Teachings of Silvanus',
  'The Sentences of Sextus': 'Sentences of Sextus',
  'Great Isaiah Scroll (1QIsa^a)': 'Great Isaiah Scroll',
  'Community Rule (1QS)': 'Community Rule',
  'War Scroll (1QM)': 'War Scroll',
  'Damascus Document (CD)': 'Damascus Document',
  'Hodayot (Thanksgiving Hymns)': 'Hodayot (Thanksgiving Hymns)',
  'The First Book of Adam and Eve': 'The First Book of Adam and Eve',
  'The Second Book of Adam and Eve': 'The Second Book of Adam and Eve',
  'The Book of Jasher': 'The Book of Jasher',
  'Jubilees': 'Jubilees',
  'Pistis Sophia': 'Pistis Sophia',
  'Pistis Sophia (Part 1)': 'Pistis Sophia',
  'Pistis Sophia (Part 2)': 'Pistis Sophia',
  'Preaching of Peter': 'Preaching of Peter',
  'Testament of Job': 'Testament of Job',
  'Joseph and Aseneth': 'Joseph and Aseneth',
  'Ascension of Isaiah': 'Ascension of Isaiah',
  'Letter of Aristeas': 'Letter of Aristeas',
  'Zostrianos': 'Zostrianos',
  'Allogenes': 'Allogenes',
  'Marsanes': 'Marsanes',
  'The Thought of Norea': 'The Thought of Norea',
  'Melchizedek': 'Melchizedek',
  'The Interpretation of Knowledge': 'Interpretation of Knowledge',
  'A Valentinian Exposition': 'Valentinian Exposition',
  'Papias Fragments': 'Papias'
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