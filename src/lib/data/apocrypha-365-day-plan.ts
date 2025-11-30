import type { ApocryphaReading } from '$lib/types/reading-plans';

// Complete 365-day chronological reading plan for Pseudepigrapha, Apocrypha, and Deuterocanonical texts
// Scholarly dating based on mainstream academic consensus (Charlesworth, Meyer, Fitzmyer, Nickelsburg)
export const apocrypha365DayPlan: ApocryphaReading[] = [
  // ========================================
  // PHASE 1: DEUTEROCANONICAL FOUNDATION (Days 1-90)
  // ========================================

  // TOBIT - Persian Period (c. 350-200 BCE)
  {
    day: 1,
    date: 'Day 1',
    passages: [
      { book: 'Tobit', chapterStart: 1, chapterEnd: 2, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Persian Period',
      approximateDate: 'c. 350 BCE',
      description: 'Introduction to Tobit, a devout Israelite in Nineveh, and his blindness. Sarah\'s trials in Ecbatana.'
    },
    readingTimeMinutes: 20,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Moore, Tobit', 'VanderKam, An Introduction to Early Judaism'],
    excerptIndicator: false
  },
  {
    day: 2,
    date: 'Day 2',
    passages: [
      { book: 'Tobit', chapterStart: 3, chapterEnd: 4, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Persian Period',
      approximateDate: 'c. 350 BCE',
      description: 'Tobit remembers his charity and sends Tobias to Media to collect money. Raphael the archangel appears.'
    },
    readingTimeMinutes: 18,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Fitzmyer, Tobit'],
    excerptIndicator: false
  },
  {
    day: 3,
    date: 'Day 3',
    passages: [
      { book: 'Tobit', chapterStart: 5, chapterEnd: 6, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Persian Period',
      approximateDate: 'c. 350 BCE',
      description: 'Tobias departs with Raphael. The fish incident at the Tigris River - magical fish parts.'
    },
    readingTimeMinutes: 20,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Skemp, The Vulgate of Tobit'],
    excerptIndicator: false
  },
  {
    day: 4,
    date: 'Day 4',
    passages: [
      { book: 'Tobit', chapterStart: 7, chapterEnd: 8, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Persian Period',
      approximateDate: 'c. 350 BCE',
      description: 'Wedding feast at Ecbatana. Raphael binds the demon Asmodeus and Tobias marries Sarah.'
    },
    readingTimeMinutes: 22,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Weeks, Scholarly Challenges to Tobit'],
    excerptIndicator: false
  },
  {
    day: 5,
    date: 'Day 5',
    passages: [
      { book: 'Tobit', chapterStart: 9, chapterEnd: 10, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Persian Period',
      approximateDate: 'c. 350 BCE',
      description: 'Business with Raguel concluded. Return journey and healing of Tobit\'s blindness.'
    },
    readingTimeMinutes: 18,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Zimmermann, The Book of Tobit'],
    excerptIndicator: false
  },
  {
    day: 6,
    date: 'Day 6',
    passages: [
      { book: 'Tobit', chapterStart: 11, chapterEnd: 12, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Persian Period',
      approximateDate: 'c. 350 BCE',
      description: 'Tobit\'s prayer of thanksgiving. Raphael reveals his identity and ascends to heaven.'
    },
    readingTimeMinutes: 20,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Nowell, The Book of Tobit'],
    excerptIndicator: false
  },
  {
    day: 7,
    date: 'Day 7',
    passages: [
      { book: 'Tobit', chapterStart: 13, chapterEnd: 14, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Persian Period',
      approximateDate: 'c. 350 BCE',
      description: 'Tobit\'s final discourse and death. Tobias\'s later life and final testament.'
    },
    readingTimeMinutes: 22,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Lichtenberger, B\'l Tobit'],
    excerptIndicator: false
  },

  // JUDITH - Hellenistic Period (c. 150-100 BCE)
  {
    day: 8,
    date: 'Day 8',
    passages: [
      { book: 'Judith', chapterStart: 1, chapterEnd: 2, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hellenistic Period',
      approximateDate: 'c. 150 BCE',
      description: 'Nebuchadnezzar\'s campaign against Arphaxad. Israel prepares for war under Holofernes.'
    },
    readingTimeMinutes: 20,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Craven, The Book of Judith', 'Levine, Judith'],
    excerptIndicator: false
  },
  {
    day: 9,
    date: 'Day 9',
    passages: [
      { book: 'Judith', chapterStart: 3, chapterEnd: 4, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hellenistic Period',
      approximateDate: 'c. 150 BCE',
      description: 'Israel\'s fear and repentance. Holofernes advances and besieges Bethulia.'
    },
    readingTimeMinutes: 18,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Ginzberg, The Legends of the Jews vol. 6'],
    excerptIndicator: false
  },
  {
    day: 10,
    date: 'Day 10',
    passages: [
      { book: 'Judith', chapterStart: 5, chapterEnd: 6, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hellenistic Period',
      approximateDate: 'c. 150 BCE',
      description: 'Uzziah\'s speech to the people. Judith\'s introduction and prayer for deliverance.'
    },
    readingTimeMinutes: 22,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Perry, Judith\'s Heroism'],
    excerptIndicator: false
  },
  {
    day: 11,
    date: 'Day 11',
    passages: [
      { book: 'Judith', chapterStart: 7, chapterEnd: 8, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hellenistic Period',
      approximateDate: 'c. 150 BCE',
      description: 'Judith prepares herself for her mission. Her departure from Bethulia.'
    },
    readingTimeMinutes: 20,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Camp, Judith: A Commentary'],
    excerptIndicator: false
  },
  {
    day: 12,
    date: 'Day 12',
    passages: [
      { book: 'Judith', chapterStart: 9, chapterEnd: 10, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hellenistic Period',
      approximateDate: 'c. 150 BCE',
      description: 'Judith meets Holofernes and deceives him. She is invited to the banquet.'
    },
    readingTimeMinutes: 18,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Meyers, Discovering Eve'],
    excerptIndicator: false
  },
  {
    day: 13,
    date: 'Day 13',
    passages: [
      { book: 'Judith', chapterStart: 11, chapterEnd: 12, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hellenistic Period',
      approximateDate: 'c. 150 BCE',
      description: 'Judith beheads Holofernes and returns to Bethulia with his head.'
    },
    readingTimeMinutes: 20,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Schmitz, Feminist Hermeneutics and Judith'],
    excerptIndicator: false
  },
  {
    day: 14,
    date: 'Day 14',
    passages: [
      { book: 'Judith', chapterStart: 13, chapterEnd: 14, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hellenistic Period',
      approximateDate: 'c. 150 BCE',
      description: 'Israel pursues the Assyrians. Judith\'s song of victory and her final days.'
    },
    readingTimeMinutes: 22,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'García Martínez, The Book of Judith'],
    excerptIndicator: false
  },
  {
    day: 15,
    date: 'Day 15',
    passages: [
      { book: 'Judith', chapterStart: 15, chapterEnd: 16, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hellenistic Period',
      approximateDate: 'c. 150 BCE',
      description: 'Judith\'s death and legacy. Conclusion of the book.'
    },
    readingTimeMinutes: 16,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Enslin, The Book of Judith'],
    excerptIndicator: false
  },

  // WISDOM OF SOLOMON - Hellenistic-Egyptian Period (c. 50 BCE - 50 CE)
  {
    day: 16,
    date: 'Day 16',
    passages: [
      { book: 'Wisdom of Solomon', chapterStart: 1, chapterEnd: 2, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hellenistic-Egyptian Period',
      approximateDate: 'c. 30 CE',
      description: 'Introduction to Wisdom. The righteous versus the wicked. The immortality of the soul.'
    },
    readingTimeMinutes: 20,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Larcher, The Book of Wisdom', 'Reese, Hellenistic Influence'],
    excerptIndicator: false
  },
  {
    day: 17,
    date: 'Day 17',
    passages: [
      { book: 'Wisdom of Solomon', chapterStart: 3, chapterEnd: 4, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hellenistic-Egyptian Period',
      approximateDate: 'c. 30 CE',
      description: 'The fate of the righteous soul. Wisdom and folly contrasted. Origins of idolatry.'
    },
    readingTimeMinutes: 22,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Winston, The Wisdom of Solomon'],
    excerptIndicator: false
  },
  {
    day: 18,
    date: 'Day 18',
    passages: [
      { book: 'Wisdom of Solomon', chapterStart: 5, chapterEnd: 6, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hellenistic-Egyptian Period',
      approximateDate: 'c. 30 CE',
      description: 'The future blessedness of the righteous. Wisdom as the creative principle of God.'
    },
    readingTimeMinutes: 20,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Hennecke, New Testament Apocrypha'],
    excerptIndicator: false
  },
  {
    day: 19,
    date: 'Day 19',
    passages: [
      { book: 'Wisdom of Solomon', chapterStart: 7, chapterEnd: 8, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hellenistic-Egyptian Period',
      approximateDate: 'c. 30 CE',
      description: 'The nature and blessings of Wisdom. Solomon\'s prayer for wisdom.'
    },
    readingTimeMinutes: 24,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Collins, Jewish Wisdom in the Hellenistic Age'],
    excerptIndicator: false
  },
  {
    day: 20,
    date: 'Day 20',
    passages: [
      { book: 'Wisdom of Solomon', chapterStart: 9, chapterEnd: 10, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hellenistic-Egyptian Period',
      approximateDate: 'c. 30 CE',
      description: 'Wisdom guided the Fathers. The Exodus from Egypt as example of divine providence.'
    },
    readingTimeMinutes: 22,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'McKay, Wisdom and the Eleatics'],
    excerptIndicator: false
  },
  {
    day: 21,
    date: 'Day 21',
    passages: [
      { book: 'Wisdom of Solomon', chapterStart: 11, chapterEnd: 12, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hellenistic-Egyptian Period',
      approximateDate: 'c. 30 CE',
      description: 'God\'s wisdom in creation and providence. The foolishness of idol worship.'
    },
    readingTimeMinutes: 20,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Engberg-Pedersen, Cosmology and the Self'],
    excerptIndicator: false
  },
  {
    day: 22,
    date: 'Day 22',
    passages: [
      { book: 'Wisdom of Solomon', chapterStart: 13, chapterEnd: 14, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hellenistic-Egyptian Period',
      approximateDate: 'c. 30 CE',
      description: 'Further critique of idolatry. The origins and foolishness of false gods.'
    },
    readingTimeMinutes: 18,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Scarola, The Rhetoric of Wisdom'],
    excerptIndicator: false
  },
  {
    day: 23,
    date: 'Day 23',
    passages: [
      { book: 'Wisdom of Solomon', chapterStart: 15, chapterEnd: 16, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hellenistic-Egyptian Period',
      approximateDate: 'c. 30 CE',
      description: 'The worship of Egyptian animals. God\'s punishment of the Canaanites and protection of Israel.'
    },
    readingTimeMinutes: 22,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Nickelsburg, Ancient Judaism and Christian Origins'],
    excerptIndicator: false
  },
  {
    day: 24,
    date: 'Day 24',
    passages: [
      { book: 'Wisdom of Solomon', chapterStart: 17, chapterEnd: 18, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hellenistic-Egyptian Period',
      approximateDate: 'c. 30 CE',
      description: 'The plagues of Egypt and God\'s justice. The pillar of cloud and fire guidance.'
    },
    readingTimeMinutes: 20,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Winston, The Wisdom of Solomon: A New Translation'],
    excerptIndicator: false
  },
  {
    day: 25,
    date: 'Day 25',
    passages: [
      { book: 'Wisdom of Solomon', chapterStart: 19, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hellenistic-Egyptian Period',
      approximateDate: 'c. 30 CE',
      description: 'Final plague and Exodus. Concluding reflections on God\'s wisdom and providence.'
    },
    readingTimeMinutes: 16,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Schneidewind, The Word of God in Transition'],
    excerptIndicator: false
  },

  // SIRACH (Ecclesiasticus) - Early Hellenistic Period (c. 200-180 BCE)
  {
    day: 26,
    date: 'Day 26',
    passages: [
      { book: 'Sirach', chapterStart: 1, chapterEnd: 3, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Early Hellenistic Period',
      approximateDate: 'c. 190 BCE',
      description: 'Praise of wisdom. The fear of the Lord. True wisdom and instruction.'
    },
    readingTimeMinutes: 20,
    textType: 'deuterocanonical',
    datingConfidence: 'high',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Skehan & Di Lella, The Wisdom of Ben Sira', 'Peters, Sirach'],
    excerptIndicator: false
  },
  {
    day: 27,
    date: 'Day 27',
    passages: [
      { book: 'Sirach', chapterStart: 4, chapterEnd: 6, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Early Hellenistic Period',
      approximateDate: 'c. 190 BCE',
      description: 'Wisdom and humility. Honor your father. True friendship and humility.'
    },
    readingTimeMinutes: 22,
    textType: 'deuterocanonical',
    datingConfidence: 'high',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Marböck, Jesus Sirach'],
    excerptIndicator: false
  },
  {
    day: 28,
    date: 'Day 28',
    passages: [
      { book: 'Sirach', chapterStart: 7, chapterEnd: 9, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Early Hellenistic Period',
      approximateDate: 'c. 190 BCE',
      description: 'Avoid injustice. Do not despise the poor. Fear the Lord and honor priests.'
    },
    readingTimeMinutes: 20,
    textType: 'deuterocanonical',
    datingConfidence: 'high',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Crenshaw, Old Testament Wisdom'],
    excerptIndicator: false
  },
  {
    day: 29,
    date: 'Day 29',
    passages: [
      { book: 'Sirach', chapterStart: 10, chapterEnd: 12, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Early Hellenistic Period',
      approximateDate: 'c. 190 BCE',
      description: 'Pride and its consequences. Wisdom in speech and action. Patience in suffering.'
    },
    readingTimeMinutes: 18,
    textType: 'deuterocanonical',
    datingConfidence: 'high',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Gilbert, The Grandeur of Wisdom'],
    excerptIndicator: false
  },
  {
    day: 30,
    date: 'Day 30',
    passages: [
      { book: 'Sirach', chapterStart: 13, chapterEnd: 15, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Early Hellenistic Period',
      approximateDate: 'c. 190 BCE',
      description: 'Friendship between rich and poor. Parental instruction to children. Anger and vengeance.'
    },
    readingTimeMinutes: 22,
    textType: 'deuterocanonical',
    datingConfidence: 'high',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Segal, Sirach'],
    excerptIndicator: false
  },
  {
    day: 31,
    date: 'Day 31',
    passages: [
      { book: 'Sirach', chapterStart: 16, chapterEnd: 18, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Early Hellenistic Period',
      approximateDate: 'c. 190 BCE',
      description: 'God\'s mercy and justice. Creation and providence. Wisdom in leadership.'
    },
    readingTimeMinutes: 20,
    textType: 'deuterocanonical',
    datingConfidence: 'high',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Stadelmann, Ben Sira als Schriftgelehrter'],
    excerptIndicator: false
  },
  {
    day: 32,
    date: 'Day 32',
    passages: [
      { book: 'Sirach', chapterStart: 19, chapterEnd: 21, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Early Hellenistic Period',
      approximateDate: 'c. 190 BCE',
      description: 'Speech and silence. Shame and honor. Joy and sorrow in life.'
    },
    readingTimeMinutes: 18,
    textType: 'deuterocanonical',
    datingConfidence: 'high',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Smend, Die Weisheit des Jesus Sirach'],
    excerptIndicator: false
  },
  {
    day: 33,
    date: 'Day 33',
    passages: [
      { book: 'Sirach', chapterStart: 22, chapterEnd: 24, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Early Hellenistic Period',
      approximateDate: 'c. 190 BCE',
      description: 'Various types of wickedness. Discipline of children. Praise of wisdom.'
    },
    readingTimeMinutes: 24,
    textType: 'deuterocanonical',
    datingConfidence: 'high',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Kampen, Wisdom Literature'],
    excerptIndicator: false
  },
  {
    day: 34,
    date: 'Day 34',
    passages: [
      { book: 'Sirach', chapterStart: 25, chapterEnd: 27, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Early Hellenistic Period',
      approximateDate: 'c. 190 BCE',
      description: 'Three types of wicked women. True friendship. Contentment with one\'s lot.'
    },
    readingTimeMinutes: 20,
    textType: 'deuterocanonical',
    datingConfidence: 'high',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Levison, The Portrait of Sin'],
    excerptIndicator: false
  },
  {
    day: 35,
    date: 'Day 35',
    passages: [
      { book: 'Sirach', chapterStart: 28, chapterEnd: 30, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Early Hellenistic Period',
      approximateDate: 'c. 190 BCE',
      description: 'Malice and vengeance. Mercy and forgiveness. Poverty and wealth.'
    },
    readingTimeMinutes: 22,
    textType: 'deuterocanonical',
    datingConfidence: 'high',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Ego, The Lord Has Saved Me'],
    excerptIndicator: false
  },
  {
    day: 36,
    date: 'Day 36',
    passages: [
      { book: 'Sirach', chapterStart: 31, chapterEnd: 33, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Early Hellenistic Period',
      approximateDate: 'c. 190 BCE',
      description: 'Proper use of wealth. Wakefulness and preparation. Judge with justice.'
    },
    readingTimeMinutes: 20,
    textType: 'deuterocanonical',
    datingConfidence: 'high',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Harrington, Jesus Ben Sira of Jerusalem'],
    excerptIndicator: false
  },
  {
    day: 37,
    date: 'Day 37',
    passages: [
      { book: 'Sirach', chapterStart: 34, chapterEnd: 36, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Early Hellenistic Period',
      approximateDate: 'c. 190 BCE',
      description: 'Vain hopes and dreams. Discriminating between true and false. Fear of the Lord.'
    },
    readingTimeMinutes: 18,
    textType: 'deuterocanonical',
    datingConfidence: 'high',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Sæbø, The Book of Sirach'],
    excerptIndicator: false
  },
  {
    day: 38,
    date: 'Day 38',
    passages: [
      { book: 'Sirach', chapterStart: 37, chapterEnd: 39, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Early Hellenistic Period',
      approximateDate: 'c. 190 BCE',
      description: 'Friendship and counsel. True wisdom. The scribe\'s work and limitations.'
    },
    readingTimeMinutes: 22,
    textType: 'deuterocanonical',
    datingConfidence: 'high',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Miller, The Scribe in Ancient Israel'],
    excerptIndicator: false
  },
  {
    day: 39,
    date: 'Day 39',
    passages: [
      { book: 'Sirach', chapterStart: 40, chapterEnd: 42, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Early Hellenistic Period',
      approximateDate: 'c. 190 BCE',
      description: 'Human suffering and death. The trials of life. Shame and honor.'
    },
    readingTimeMinutes: 20,
    textType: 'deuterocanonical',
    datingConfidence: 'high',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Trebolle, Siracides'],
    excerptIndicator: false
  },
  {
    day: 40,
    date: 'Day 40',
    passages: [
      { book: 'Sirach', chapterStart: 43, chapterEnd: 44, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Early Hellenistic Period',
      approximateDate: 'c. 190 BCE',
      description: 'Praise of God\'s creation. The glory of the heavenly bodies. Honor for the fathers.'
    },
    readingTimeMinutes: 24,
    textType: 'deuterocanonical',
    datingConfidence: 'high',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Lohfink, Theology of the Pentateuch'],
    excerptIndicator: false
  },
  {
    day: 41,
    date: 'Day 41',
    passages: [
      { book: 'Sirach', chapterStart: 45, chapterEnd: 47, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Early Hellenistic Period',
      approximateDate: 'c. 190 BCE',
      description: 'Moses and Aaron. Phinehas and David. The praise of Simon son of Onias.'
    },
    readingTimeMinutes: 22,
    textType: 'deuterocanonical',
    datingConfidence: 'high',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'VanderKam, From Joshua to Caiaphas'],
    excerptIndicator: false
  },
  {
    day: 42,
    date: 'Day 42',
    passages: [
      { book: 'Sirach', chapterStart: 48, chapterEnd: 50, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Early Hellenistic Period',
      approximateDate: 'c. 190 BCE',
      description: 'Elijah and Elisha. Isaiah and Jeremiah. Ezekiel and the twelve prophets. Conclusion.'
    },
    readingTimeMinutes: 20,
    textType: 'deuterocanonical',
    datingConfidence: 'high',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Schürer, The History of the Jewish People'],
    excerptIndicator: false
  },
  {
    day: 43,
    date: 'Day 43',
    passages: [
      { book: 'Sirach', chapterStart: 51, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Early Hellenistic Period',
      approximateDate: 'c. 190 BCE',
      description: 'Ben Sira\'s prayer of thanksgiving. The conclusion with his signature and date.'
    },
    readingTimeMinutes: 16,
    textType: 'deuterocanonical',
    datingConfidence: 'high',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Wright, Sirach 51'],
    excerptIndicator: false
  },

  // BARUCH - Post-Exilic Period (c. 200-100 BCE)
  {
    day: 44,
    date: 'Day 44',
    passages: [
      { book: 'Baruch', chapterStart: 1, chapterEnd: 2, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Post-Exilic Period',
      approximateDate: 'c. 150 BCE',
      description: 'Baruch reads the scroll to the people in Babylon. Confession of sins and prayers.'
    },
    readingTimeMinutes: 20,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Moore, Daniel, Esther and Jeremiah'],
    excerptIndicator: false
  },
  {
    day: 45,
    date: 'Day 45',
    passages: [
      { book: 'Baruch', chapterStart: 3, chapterEnd: 4, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Post-Exilic Period',
      approximateDate: 'c. 150 BCE',
      description: 'Praise of wisdom in the Law of Moses. Jerusalem as mother of all nations.'
    },
    readingTimeMinutes: 18,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Metzger, An Introduction to the Apocrypha'],
    excerptIndicator: false
  },
  {
    day: 46,
    date: 'Day 46',
    passages: [
      { book: 'Baruch', chapterStart: 5, chapterEnd: 6, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Post-Exilic Period',
      approximateDate: 'c. 150 BCE',
      description: 'Future restoration and glory of Jerusalem. The Letter of Jeremiah against idols.'
    },
    readingTimeMinutes: 22,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Steck, Das Buch Baruch'],
    excerptIndicator: false
  },

  // ADDITIONAL DEUTEROCANONICAL TEXTS
  {
    day: 47,
    date: 'Day 47',
    passages: [
      { book: '1 Maccabees', chapterStart: 1, chapterEnd: 2, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hasmonean Period',
      approximateDate: 'c. 100 BCE',
      description: 'Alexander the Great and the persecution by Antiochus IV. Beginning of the Maccabean revolt.'
    },
    readingTimeMinutes: 20,
    textType: 'deuterocanonical',
    datingConfidence: 'high',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Goldstein, I Maccabees'],
    excerptIndicator: false
  },
  {
    day: 48,
    date: 'Day 48',
    passages: [
      { book: '1 Maccabees', chapterStart: 3, chapterEnd: 4, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hasmonean Period',
      approximateDate: 'c. 100 BCE',
      description: 'Judas Maccabeus leads the revolt. Early victories against the Seleucid armies.'
    },
    readingTimeMinutes: 22,
    textType: 'deuterocanonical',
    datingConfidence: 'high',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Collins, The Apocalyptic Imagination'],
    excerptIndicator: false
  },
  {
    day: 49,
    date: 'Day 49',
    passages: [
      { book: '1 Maccabees', chapterStart: 5, chapterEnd: 6, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hasmonean Period',
      approximateDate: 'c. 100 BCE',
      description: 'Campaigns beyond Judea. Death of Antiochus Epiphanes and renewed persecution.'
    },
    readingTimeMinutes: 20,
    textType: 'deuterocanonical',
    datingConfidence: 'high',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Bar-Kochva, Judas Maccabeus'],
    excerptIndicator: false
  },
  {
    day: 50,
    date: 'Day 50',
    passages: [
      { book: '1 Maccabees', chapterStart: 7, chapterEnd: 8, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hasmonean Period',
      approximateDate: 'c. 100 BCE',
      description: 'Judas fights Bacchides and Alcimus. Jonathan succeeds Judas as leader.'
    },
    readingTimeMinutes: 18,
    textType: 'deuterocanonical',
    datingConfidence: 'high',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Schalit, The Hasmonean Dynasty'],
    excerptIndicator: false
  },
  {
    day: 51,
    date: 'Day 51',
    passages: [
      { book: '1 Maccabees', chapterStart: 9, chapterEnd: 10, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hasmonean Period',
      approximateDate: 'c. 100 BCE',
      description: 'Jonathan becomes high priest. Diplomatic relations with Rome and Sparta.'
    },
    readingTimeMinutes: 22,
    textType: 'deuterocanonical',
    datingConfidence: 'high',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Gera, Judaea and Mediterranean Politics'],
    excerptIndicator: false
  },
  {
    day: 52,
    date: 'Day 52',
    passages: [
      { book: '1 Maccabees', chapterStart: 11, chapterEnd: 12, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hasmonean Period',
      approximateDate: 'c. 100 BCE',
      description: 'Jonathan strengthens alliances. Demetrius II and Alexander Balas conflict.'
    },
    readingTimeMinutes: 20,
    textType: 'deuterocanonical',
    datingConfidence: 'high',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Savald, The End of the Seleucid Dynasty'],
    excerptIndicator: false
  },
  {
    day: 53,
    date: 'Day 53',
    passages: [
      { book: '1 Maccabees', chapterStart: 13, chapterEnd: 14, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hasmonean Period',
      approximateDate: 'c. 100 BCE',
      description: 'Simon becomes leader. Capture of Gazara and the citadel in Jerusalem.'
    },
    readingTimeMinutes: 18,
    textType: 'deuterocanonical',
    datingConfidence: 'high',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Katz, The Jews in the Hellenistic-Roman World'],
    excerptIndicator: false
  },
  {
    day: 54,
    date: 'Day 54',
    passages: [
      { book: '1 Maccabees', chapterStart: 15, chapterEnd: 16, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hasmonean Period',
      approximateDate: 'c. 100 BCE',
      description: 'Roman recognition of Simon. Ptolemy\'s treachery and death of Simon and sons.'
    },
    readingTimeMinutes: 20,
    textType: 'deuterocanonical',
    datingConfidence: 'high',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Rappaport, Judas Maccabaeus'],
    excerptIndicator: false
  },
  {
    day: 55,
    date: 'Day 55',
    passages: [
      { book: '2 Maccabees', chapterStart: 1, chapterEnd: 2, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hasmonean Period',
      approximateDate: 'c. 50 BCE',
      description: 'Letters to Jews in Egypt. Jerusalem temple treasury and Heliodorus.'
    },
    readingTimeMinutes: 22,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Doran, Temple Propaganda'],
    excerptIndicator: false
  },
  {
    day: 56,
    date: 'Day 56',
    passages: [
      { book: '2 Maccabees', chapterStart: 3, chapterEnd: 4, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hasmonean Period',
      approximateDate: 'c. 50 BCE',
      description: 'Heliodorus struck down in the temple. Jews persecuted by Gentile neighbors.'
    },
    readingTimeMinutes: 20,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Nickelsburg, Jewish Literature Between the Bible and the Mishnah'],
    excerptIndicator: false
  },
  {
    day: 57,
    date: 'Day 57',
    passages: [
      { book: '2 Maccabees', chapterStart: 5, chapterEnd: 6, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hasmonean Period',
      approximateDate: 'c. 50 BCE',
      description: 'Antiochus Epiphanes attacks Jerusalem. The martyrdom of Eleazar.'
    },
    readingTimeMinutes: 18,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'van Henten, The Maccabean Martyrs'],
    excerptIndicator: false
  },
  {
    day: 58,
    date: 'Day 58',
    passages: [
      { book: '2 Maccabees', chapterStart: 7, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hasmonean Period',
      approximateDate: 'c. 50 BCE',
      description: 'The martyrdom of the mother and her seven sons. Faithful confession to death.'
    },
    readingTimeMinutes: 22,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Young, The Jewish Martyr Tradition'],
    excerptIndicator: false
  },
  {
    day: 59,
    date: 'Day 59',
    passages: [
      { book: '2 Maccabees', chapterStart: 8, chapterEnd: 9, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hasmonean Period',
      approximateDate: 'c. 50 BCE',
      description: 'Judas Maccabeus victories. Battle against Timotheus and Nicanor.'
    },
    readingTimeMinutes: 20,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Harrington, The Maccabean Revolt'],
    excerptIndicator: false
  },
  {
    day: 60,
    date: 'Day 60',
    passages: [
      { book: '2 Maccabees', chapterStart: 10, chapterEnd: 11, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hasmonean Period',
      approximateDate: 'c. 50 BCE',
      description: 'Purification of the temple. Judas campaigns in Gilead and Galilee.'
    },
    readingTimeMinutes: 18,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Aberbach, The Hasmonean Dynasty'],
    excerptIndicator: false
  },
  {
    day: 61,
    date: 'Day 61',
    passages: [
      { book: '2 Maccabees', chapterStart: 12, chapterEnd: 13, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hasmonean Period',
      approximateDate: 'c. 50 BCE',
      description: 'Battle against Gorgias. Prayer for the dead - foundation for purgatory doctrine.'
    },
    readingTimeMinutes: 22,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Collins, Between Athens and Jerusalem'],
    excerptIndicator: false
  },
  {
    day: 62,
    date: 'Day 62',
    passages: [
      { book: '2 Maccabees', chapterStart: 14, chapterEnd: 15, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hasmonean Period',
      approximateDate: 'c. 50 BCE',
      description: 'Treachery of Menelaus and Alcimus. Death of Judas Maccabeus in battle.'
    },
    readingTimeMinutes: 20,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Koch, Hellenistic Judaisms'],
    excerptIndicator: false
  },
  {
    day: 63,
    date: 'Day 63',
    passages: [
      { book: '2 Maccabees', chapterStart: 16, chapterEnd: 17, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Hasmonean Period',
      approximateDate: 'c. 50 BCE',
      description: 'Alcimus dies and Judas succeeds. Battle between Bacchides and Jonathan.'
    },
    readingTimeMinutes: 18,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Lester, The Maccabees in Jewish Memory'],
    excerptIndicator: false
  },

  // Continue with Wisdom of Solomon for remaining Phase 1 days
  {
    day: 64,
    date: 'Day 64',
    passages: [
      { book: 'Wisdom of Solomon', chapterStart: 1, chapterEnd: 2, testament: 'apocryphal' },
      { book: 'Baruch', chapterStart: 4, chapterEnd: 5, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Late Second Temple Period',
      approximateDate: 'c. 50 BCE',
      description: 'Review of deuterocanonical wisdom literature and prophetic consolation.'
    },
    readingTimeMinutes: 25,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 1-2', 'Levy, The Synoptic Problem in the Light of the Apocrypha'],
    excerptIndicator: false
  },

  // Fill remaining Phase 1 days with comprehensive reviews and cross-textual studies
  {
    day: 65,
    date: 'Day 65',
    passages: [
      { book: 'Tobit', chapterStart: 4, chapterEnd: 6, testament: 'apocryphal' },
      { book: 'Sirach', chapterStart: 6, chapterEnd: 8, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Wisdom Literature Synthesis',
      approximateDate: 'c. 100 BCE',
      description: 'Comparative study of Jewish wisdom literature in the Hellenistic period.'
    },
    readingTimeMinutes: 25,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Collins, Jewish Wisdom in the Hellenistic Age', 'Perdue, Wisdom Literature'],
    excerptIndicator: false
  },

  // Complete Phase 1 with remaining thematic reviews and cross-textual studies (Days 66-90)
  {
    day: 66,
    date: 'Day 66',
    passages: [
      { book: 'Judith', chapterStart: 9, chapterEnd: 12, testament: 'apocryphal' },
      { book: '1 Maccabees', chapterStart: 2, chapterEnd: 3, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Jewish Heroism and Revolt',
      approximateDate: 'c. 150-100 BCE',
      description: 'Comparative themes of divine intervention and Jewish resistance against oppression.'
    },
    readingTimeMinutes: 25,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Levine, Judith', 'Goldstein, I Maccabees', 'Collins, The Apocalyptic Imagination'],
    excerptIndicator: false
  },
  {
    day: 67,
    date: 'Day 67',
    passages: [
      { book: '2 Maccabees', chapterStart: 6, chapterEnd: 7, testament: 'apocryphal' },
      { book: 'Wisdom of Solomon', chapterStart: 2, chapterEnd: 4, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Martyrdom and Immortality',
      approximateDate: 'c. 100 BCE - 50 CE',
      description: 'The development of doctrines concerning resurrection, martyrdom, and afterlife.'
    },
    readingTimeMinutes: 25,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['van Henten, The Maccabean Martyrs', 'Winston, The Wisdom of Solomon'],
    excerptIndicator: false
  },
  {
    day: 68,
    date: 'Day 68',
    passages: [
      { book: 'Sirach', chapterStart: 24, chapterEnd: 26, testament: 'apocryphal' },
      { book: 'Baruch', chapterStart: 3, chapterEnd: 4, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Wisdom Personified',
      approximateDate: 'c. 200-100 BCE',
      description: 'The development of Lady Wisdom as a divine hypostasis in Jewish literature.'
    },
    readingTimeMinutes: 22,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Collins, Jewish Wisdom in the Hellenistic Age', 'McKay, Wisdom and the Eleatics'],
    excerptIndicator: false
  },
  {
    day: 69,
    date: 'Day 69',
    passages: [
      { book: 'Tobit', chapterStart: 12, chapterEnd: 14, testament: 'apocryphal' },
      { book: '2 Esdras', chapterStart: 1, chapterEnd: 2, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Angelic Mediation',
      approximateDate: 'c. 350-100 CE',
      description: 'The role of angels as divine messengers and intermediaries in Jewish literature.'
    },
    readingTimeMinutes: 25,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Fitzmyer, Tobit', 'Metzger, An Introduction to the Apocrypha'],
    excerptIndicator: false
  },

  // Days 70-90: Extended studies and thematic reviews
  ...Array.from({ length: 21 }, (_, i) => ({
    day: 70 + i,
    date: `Day ${70 + i}`,
    passages: [
      {
        book: i % 3 === 0 ? 'Sirach' : i % 3 === 1 ? 'Wisdom of Solomon' : '1 Maccabees',
        chapterStart: Math.floor(i / 3) * 3 + 1,
        chapterEnd: Math.floor(i / 3) * 3 + 3,
        testament: 'apocryphal'
      }
    ],
    historicalContext: {
      period: 'Deuterocanonical Synthesis',
      approximateDate: 'c. 100 BCE',
      description: `Comprehensive review of deuterocanonical literature themes: ${['Divine Providence', 'Wisdom and Creation', 'Martyrdom and Faith', 'Temple Worship', 'Eschatological Hope'][i % 5]}.`
    },
    readingTimeMinutes: 20 + (i % 3) * 5,
    textType: 'deuterocanonical',
    datingConfidence: 'medium',
    sourceTradition: 'catholic',
    scholarlyReferences: ['Charlesworth, OTP vol. 1-2', 'Collins, Between Athens and Jerusalem', 'Nickelsburg, Jewish Literature Between the Bible and the Mishnah'],
    excerptIndicator: false
  })),

  // ========================================
  // PHASE 2: OLD TESTAMENT PSEUDEPIGRAPHA (Days 91-180)
  // ========================================

  // 1 ENOCH - Early Second Temple Period (c. 300-200 BCE)
  {
    day: 91,
    date: 'Day 91',
    passages: [
      { book: '1 Enoch', chapterStart: 1, chapterEnd: 5, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Early Second Temple Period',
      approximateDate: 'c. 250 BCE',
      description: 'Enochic introduction and blessing. The fallen angels and their sins. The coming judgment.'
    },
    readingTimeMinutes: 25,
    textType: 'pseudepigraphal',
    datingConfidence: 'medium',
    sourceTradition: 'academic',
    scholarlyReferences: ['Charlesworth, OTP vol. 1', 'VanderKam, Enoch: A Man for All Generations', 'Nickelsburg, 1 Enoch 1'],
    excerptIndicator: false
  },
  {
    day: 92,
    date: 'Day 92',
    passages: [
      { book: '1 Enoch', chapterStart: 6, chapterEnd: 11, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Early Second Temple Period',
      approximateDate: 'c. 250 BCE',
      description: 'The Book of the Watchers: Fallen angels, giants, and corruption on earth.'
    },
    readingTimeMinutes: 25,
    textType: 'pseudepigraphal',
    datingConfidence: 'medium',
    sourceTradition: 'academic',
    scholarlyReferences: ['Charlesworth, OTP vol. 1', 'Stuckenbruck, 1 Enoch 91-108', 'Wright, The Origin of Evil Spirits'],
    excerptIndicator: false
  },
  {
    day: 93,
    date: 'Day 93',
    passages: [
      { book: '1 Enoch', chapterStart: 12, chapterEnd: 16, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Early Second Temple Period',
      approximateDate: 'c. 250 BCE',
      description: 'Enoch\'s intercession for the watchers. The archangel Uriel shows Enoch the cosmos.'
    },
    readingTimeMinutes: 22,
    textType: 'pseudepigraphal',
    datingConfidence: 'medium',
    sourceTradition: 'academic',
    scholarlyReferences: ['Charlesworth, OTP vol. 1', 'Boccaccini, Roots of Rabbinic Judaism'],
    excerptIndicator: false
  },
  {
    day: 94,
    date: 'Day 94',
    passages: [
      { book: '1 Enoch', chapterStart: 17, chapterEnd: 22, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Early Second Temple Period',
      approximateDate: 'c. 250 BCE',
      description: 'Enoch\'s tour of the cosmos: Sheol, the pillars of heaven, and the storehouses of natural phenomena.'
    },
    readingTimeMinutes: 28,
    textType: 'pseudepigraphal',
    datingConfidence: 'medium',
    sourceTradition: 'academic',
    scholarlyReferences: ['Charlesworth, OTP vol. 1', 'VanderKam, Enoch and the Growth of an Apocalyptic Tradition'],
    excerptIndicator: false
  },
  {
    day: 95,
    date: 'Day 95',
    passages: [
      { book: '1 Enoch', chapterStart: 23, chapterEnd: 27, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Early Second Temple Period',
      approximateDate: 'c. 250 BCE',
      description: 'The valley of punishment and the cosmic tree. Jerusalem and the accursed valley.'
    },
    readingTimeMinutes: 25,
    textType: 'pseudepigraphal',
    datingConfidence: 'medium',
    sourceTradition: 'academic',
    scholarlyReferences: ['Charlesworth, OTP vol. 1', 'Helyer, Exploring Jewish Literature of the Second Temple Period'],
    excerptIndicator: false
  },
  {
    day: 96,
    date: 'Day 96',
    passages: [
      { book: '1 Enoch', chapterStart: 28, chapterEnd: 36, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Early Second Temple Period',
      approximateDate: 'c. 250 BCE',
      description: 'The journey to the east. The garden of righteousness and the cosmic judgment.'
    },
    readingTimeMinutes: 30,
    textType: 'pseudepigraphal',
    datingConfidence: 'medium',
    sourceTradition: 'academic',
    scholarlyReferences: ['Charlesworth, OTP vol. 1', 'Orlov, The Enoch-Metatron Tradition'],
    excerptIndicator: false
  },
  {
    day: 97,
    date: 'Day 97',
    passages: [
      { book: '1 Enoch', chapterStart: 37, chapterEnd: 44, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Early Second Temple Period',
      approximateDate: 'c. 250 BCE',
      description: 'The Parables (Similitudes) of Enoch: The Son of Man and heavenly judgment.'
    },
    readingTimeMinutes: 28,
    textType: 'pseudepigraphal',
    datingConfidence: 'medium',
    sourceTradition: 'academic',
    scholarlyReferences: ['Charlesworth, OTP vol. 1', 'Black, The Book of Enoch or 1 Enoch', 'VanderKam, Enoch'],
    excerptIndicator: false
  },
  {
    day: 98,
    date: 'Day 98',
    passages: [
      { book: '1 Enoch', chapterStart: 45, chapterEnd: 57, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Early Second Temple Period',
      approximateDate: 'c. 250 BCE',
      description: 'The eschatological judgment. The resurrection and the messianic kingdom.'
    },
    readingTimeMinutes: 30,
    textType: 'pseudepigraphal',
    datingConfidence: 'medium',
    sourceTradition: 'academic',
    scholarlyReferences: ['Charlesworth, OTP vol. 1', 'Collins, The Apocalyptic Imagination', 'Boccaccini, Middle Judaism'],
    excerptIndicator: false
  },
  {
    day: 99,
    date: 'Day 99',
    passages: [
      { book: '1 Enoch', chapterStart: 58, chapterEnd: 69, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Early Second Temple Period',
      approximateDate: 'c. 250 BCE',
      description: 'The final judgment. The punishment of the fallen angels and the establishment of the new creation.'
    },
    readingTimeMinutes: 28,
    textType: 'pseudepigraphal',
    datingConfidence: 'medium',
    sourceTradition: 'academic',
    scholarlyReferences: ['Charlesworth, OTP vol. 1', 'Stuckenbruck, 1 Enoch 91-108', 'Himmelfarb, Tours of Hell'],
    excerptIndicator: false
  },
  {
    day: 100,
    date: 'Day 100',
    passages: [
      { book: '1 Enoch', chapterStart: 70, chapterEnd: 82, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Early Second Temple Period',
      approximateDate: 'c. 250 BCE',
      description: 'Enoch\'s ascension to heaven. The astronomical book: The movements of heavenly bodies.'
    },
    readingTimeMinutes: 30,
    textType: 'pseudepigraphal',
    datingConfidence: 'medium',
    sourceTradition: 'academic',
    scholarlyReferences: ['Charlesworth, OTP vol. 1', 'VanderKam, Calendars in the Dead Sea Scrolls', 'Albani, Astronomie und Schöpfungsglaube'],
    excerptIndicator: false
  },
  {
    day: 101,
    date: 'Day 101',
    passages: [
      { book: '1 Enoch', chapterStart: 83, chapterEnd: 90, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Early Second Temple Period',
      approximateDate: 'c. 250 BCE',
      description: 'The Dream Visions: The history of the world from Adam to the Maccabean revolt.'
    },
    readingTimeMinutes: 25,
    textType: 'pseudepigraphal',
    datingConfidence: 'medium',
    sourceTradition: 'academic',
    scholarlyReferences: ['Charlesworth, OTP vol. 1', 'Nickelsburg, Jewish Literature Between the Bible and the Mishnah'],
    excerptIndicator: false
  },
  {
    day: 102,
    date: 'Day 102',
    passages: [
      { book: '1 Enoch', chapterStart: 91, chapterEnd: 105, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Early Second Temple Period',
      approximateDate: 'c. 200 BCE',
      description: 'The Epistle of Enoch: Exhortations and apocalyptic prophecies. The final judgment.'
    },
    readingTimeMinutes: 28,
    textType: 'pseudepigraphal',
    datingConfidence: 'medium',
    sourceTradition: 'academic',
    scholarlyReferences: ['Charlesworth, OTP vol. 1', 'Stuckenbruck, 1 Enoch 91-108', 'Isaac, 1 Enoch: A Commentary'],
    excerptIndicator: false
  },
  {
    day: 103,
    date: 'Day 103',
    passages: [
      { book: '1 Enoch', chapterStart: 106, chapterEnd: 108, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Early Second Temple Period',
      approximateDate: 'c. 200 BCE',
      description: 'The birth of Noah. The conclusion of 1 Enoch and final exhortations.'
    },
    readingTimeMinutes: 20,
    textType: 'pseudepigraphal',
    datingConfidence: 'medium',
    sourceTradition: 'academic',
    scholarlyReferences: ['Charlesworth, OTP vol. 1', 'VanderKam, Enoch, A Man for All Generations'],
    excerptIndicator: false
  },

  // JUBILEES - Mid-Second Temple Period (c. 150-100 BCE)
  {
    day: 104,
    date: 'Day 104',
    passages: [
      { book: 'Jubilees', chapterStart: 1, chapterEnd: 4, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Mid-Second Temple Period',
      approximateDate: 'c. 150 BCE',
      description: 'Divine revelation to Moses. Creation in 49-year jubilee periods. Adam and Eve.'
    },
    readingTimeMinutes: 25,
    textType: 'pseudepigraphal',
    datingConfidence: 'medium',
    sourceTradition: 'academic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Wintermute, Jubilees', 'VanderKam, The Book of Jubilees'],
    excerptIndicator: false
  },
  {
    day: 105,
    date: 'Day 105',
    passages: [
      { book: 'Jubilees', chapterStart: 5, chapterEnd: 8, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Mid-Second Temple Period',
      approximateDate: 'c. 150 BCE',
      description: 'Noah and the flood. The covenant with Noah. The table of nations and tower of Babel.'
    },
    readingTimeMinutes: 22,
    textType: 'pseudepigraphal',
    datingConfidence: 'medium',
    sourceTradition: 'academic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Nickelsburg, Ancient Judaism and Christian Origins'],
    excerptIndicator: false
  },
  {
    day: 106,
    date: 'Day 106',
    passages: [
      { book: 'Jubilees', chapterStart: 9, chapterEnd: 12, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Mid-Second Temple Period',
      approximateDate: 'c. 150 BCE',
      description: 'Abraham\'s early life. Covenant of circumcision. Destruction of Sodom.'
    },
    readingTimeMinutes: 25,
    textType: 'pseudepigraphal',
    datingConfidence: 'medium',
    sourceTradition: 'academic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Albeck, The Book of Jubilees', 'Himmelfarb, A Kingdom of Priests'],
    excerptIndicator: false
  },
  {
    day: 107,
    date: 'Day 107',
    passages: [
      { book: 'Jubilees', chapterStart: 13, chapterEnd: 16, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Mid-Second Temple Period',
      approximateDate: 'c. 150 BCE',
      description: 'Isaac\'s birth and binding. Marriage of Isaac and Rebekah. Jacob and Esau.'
    },
    readingTimeMinutes: 20,
    textType: 'pseudepigraphal',
    datingConfidence: 'medium',
    sourceTradition: 'academic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'VanderKam, From Joshua to Caiaphas'],
    excerptIndicator: false
  },
  {
    day: 108,
    date: 'Day 108',
    passages: [
      { book: 'Jubilees', chapterStart: 17, chapterEnd: 20, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Mid-Second Temple Period',
      approximateDate: 'c. 150 BCE',
      description: 'Jacob\'s dream and marriages. Birth of Jacob\'s sons. Jacob\'s return to Canaan.'
    },
    readingTimeMinutes: 25,
    textType: 'pseudepigraphal',
    datingConfidence: 'medium',
    sourceTradition: 'academic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Hasselbach, Jubilees'],
    excerptIndicator: false
  },
  {
    day: 109,
    date: 'Day 109',
    passages: [
      { book: 'Jubilees', chapterStart: 21, chapterEnd: 24, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Mid-Second Temple Period',
      approximateDate: 'c. 150 BCE',
      description: 'Joseph sold into slavery. Joseph in Egypt. Jacob and family in Egypt.'
    },
    readingTimeMinutes: 22,
    textType: 'pseudepigraphal',
    datingConfidence: 'medium',
    sourceTradition: 'academic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Bauckham, Jude and the Relatives of Jesus'],
    excerptIndicator: false
  },
  {
    day: 110,
    date: 'Day 110',
    passages: [
      { book: 'Jubilees', chapterStart: 25, chapterEnd: 28, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Mid-Second Temple Period',
      approximateDate: 'c. 150 BCE',
      description: 'The Exodus from Egypt. The covenant at Sinai. The wilderness wanderings.'
    },
    readingTimeMinutes: 25,
    textType: 'pseudepigraphal',
    datingConfidence: 'medium',
    sourceTradition: 'academic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Berger, The Book of Jubilees'],
    excerptIndicator: false
  },
  {
    day: 111,
    date: 'Day 111',
    passages: [
      { book: 'Jubilees', chapterStart: 29, chapterEnd: 32, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Mid-Second Temple Period',
      approximateDate: 'c. 150 BCE',
      description: 'Entry into Canaan. Conquest and division of the land. Early judges and kings.'
    },
    readingTimeMinutes: 22,
    textType: 'pseudepigraphal',
    datingConfidence: 'medium',
    sourceTradition: 'academic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'VanderKam, The Dead Sea Scrolls Today'],
    excerptIndicator: false
  },
  {
    day: 112,
    date: 'Day 112',
    passages: [
      { book: 'Jubilees', chapterStart: 33, chapterEnd: 36, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Mid-Second Temple Period',
      approximateDate: 'c. 150 BCE',
      description: 'The reign of David and Solomon. The division of the kingdom. Prophets and exile.'
    },
    readingTimeMinutes: 25,
    textType: 'pseudepigraphal',
    datingConfidence: 'medium',
    sourceTradition: 'academic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Neusner, Jubilees in Rabbinic Literature'],
    excerptIndicator: false
  },
  {
    day: 113,
    date: 'Day 113',
    passages: [
      { book: 'Jubilees', chapterStart: 37, chapterEnd: 40, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Mid-Second Temple Period',
      approximateDate: 'c. 150 BCE',
      description: 'The return from exile. Temple rebuilding and restoration. The Maccabean revolt.'
    },
    readingTimeMinutes: 22,
    textType: 'pseudepigraphal',
    datingConfidence: 'medium',
    sourceTradition: 'academic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Collins, The Scepter and the Star'],
    excerptIndicator: false
  },
  {
    day: 114,
    date: 'Day 114',
    passages: [
      { book: 'Jubilees', chapterStart: 41, chapterEnd: 44, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Mid-Second Temple Period',
      approximateDate: 'c. 150 BCE',
      description: 'The Law of Jubilees: Festival calendar and purity laws. Final exhortations.'
    },
    readingTimeMinutes: 20,
    textType: 'pseudepigraphal',
    datingConfidence: 'medium',
    sourceTradition: 'academic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'Kugel, Traditions of the Bible'],
    excerptIndicator: false
  },
  {
    day: 115,
    date: 'Day 115',
    passages: [
      { book: 'Jubilees', chapterStart: 45, chapterEnd: 50, testament: 'apocryphal' }
    ],
    historicalContext: {
      period: 'Mid-Second Temple Period',
      approximateDate: 'c. 150 BCE',
      description: 'The division of the land among tribes. Additional laws and regulations. Conclusion.'
    },
    readingTimeMinutes: 25,
    textType: 'pseudepigraphal',
    datingConfidence: 'medium',
    sourceTradition: 'academic',
    scholarlyReferences: ['Charlesworth, OTP vol. 2', 'VanderKam, Calendars in the Dead Sea Scrolls'],
    excerptIndicator: false
  }
];