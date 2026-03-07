import type { ReadingPlan, BiblePassage } from '../../types/reading-plans';
import { generateApocryphaUrl } from '../../utils/apocrypha-links';

/**
 * Text type categories for non-canonical texts:
 * - archaeological: Actual ancient manuscripts discovered in modern times (Dead Sea Scrolls, Nag Hammadi)
 * - deuterocanonical: Continuously preserved through church tradition, accepted by Catholic/Orthodox
 * - pseudepigrapha: Later texts claiming ancient authorship, written centuries after events described
 * - apostolic_fathers: Genuine early Christian writings from actual church leaders (1st-2nd century)
 * - nt_apocrypha: Later gospels, acts, epistles not included in canon (2nd-4th century)
 * - gnostic: Esoteric Christian texts emphasizing secret knowledge (gnosis) for salvation
 */
type TextType = 'archaeological' | 'deuterocanonical' | 'pseudepigrapha' | 'apostolic_fathers' | 'nt_apocrypha' | 'gnostic';

export class ApocryphaReadingProvider {
  async loadReadingPlan(): Promise<ReadingPlan> {
    return this.generateApocryphaPlan();
  }

  generateApocryphaPlan(): ReadingPlan {
    return {
      provider: 'apocrypha',
      methodology: {
        datingSystem: 'academic',
        jobPlacement: 'custom',
        gospelIntegration: 'custom',
        psalmsDistribution: 'custom',
        apocryphaInclusion: {
          includeDeuterocanonical: true,
          includeNTApocrypha: true,
          denominationalPreference: 'academic',
          intertestamentalPlacement: 'detailed-chronology'
        }
      },
      dailyReadings: this.generateApocryphaReadings(),
      metadata: {
        title: 'Apocrypha & Pseudepigrapha Chronological',
        description: '365-day chronological reading plan aligned to BibleHub chronology, providing supplementary non-canonical texts for each canonical period',
        totalDays: 365,
        averageReadingTime: 20,
        language: 'en',
        version: '3.0 BibleHub Aligned',
        sourceUrl: 'https://github.com/anthropics/bible360-research'
      }
    };
  }

  private generateApocryphaReadings() {
    const readings = [];

    // ============================================================
    // PHASE 1: Primeval History (Days 1-14) - Aligned to BibleHub
    // BibleHub: Creation to Babel (Days 1-4), Job (Days 5-14)
    // ============================================================

    // Days 1-4: Creation to Babel → Adam and Eve books (describe earliest events after Eden)
    const primevalTexts = [
      // Days 1-4: Adam & Eve after Eden
      { book: 'The First Book of Adam and Eve', startDay: 1, endDay: 4, period: 'Primeval History', date: '50-100 CE', textType: 'pseudepigrapha' as TextType, description: 'Expansion of Genesis narrative describing Adam and Eve\'s life after expulsion from Eden, their repentance and early human struggles' },
      // Days 5-8: Continue Adam & Eve story
      { book: 'The Second Book of Adam and Eve', startDay: 5, endDay: 8, period: 'Primeval History', date: '50-100 CE', textType: 'pseudepigrapha' as TextType, description: 'Continuation with Cain\'s history, the fall of man\'s descendants, and early human civilization before the Flood' },
      // Days 9-14: Enoch's visions (aligned with Job period in BibleHub)
      { book: '1 Enoch', startDay: 9, endDay: 14, period: 'Antediluvian Revelation', date: '300-200 BCE', textType: 'pseudepigrapha' as TextType, description: 'Enoch\'s heavenly visions, the Watcher angels, Nephilim, and cosmic secrets - foundational for Jewish angelology and eschatology' }
    ];

    // ============================================================
    // PHASE 2: Patriarchal Era (Days 15-31) - Aligned to BibleHub
    // BibleHub: Genesis 12-50 (Abraham, Isaac, Jacob, Joseph)
    // ============================================================

    const patriarchalTexts = [
      // Days 15-19: Abraham period → Jubilees (covers Abraham's covenant)
      { book: 'Jubilees', startDay: 15, endDay: 19, period: 'Patriarchal Era', date: '160-150 BCE', textType: 'pseudepigrapha' as TextType, description: 'Rewritten Genesis with 364-day solar calendar, angelic mediation, and Abraham\'s covenant details' },
      // Days 20-22: Abraham → Apocalypse of Abraham
      { book: 'Apocalypse of Abraham', startDay: 20, endDay: 22, period: 'Patriarchal Era', date: '70-100 CE', textType: 'pseudepigrapha' as TextType, description: 'Abraham\'s heavenly visions and divine revelations about creation and future events' },
      // Days 23-27: Isaac, Jacob → Testament of Twelve Patriarchs
      { book: 'Testament of the Twelve Patriarchs', startDay: 23, endDay: 27, period: 'Patriarchal Era', date: '140-100 BCE', textType: 'pseudepigrapha' as TextType, description: 'Ethical testaments from Jacob\'s sons containing moral teachings, prophecies of the Messiah, and apocalyptic visions' },
      // Days 28-31: Joseph → Joseph and Aseneth
      { book: 'Joseph and Aseneth', startDay: 28, endDay: 31, period: 'Patriarchal Era', date: '100-200 CE', textType: 'pseudepigrapha' as TextType, description: 'Story of Joseph\'s marriage to Egyptian convert Aseneth, exploring themes of conversion and identity' }
    ];

    // ============================================================
    // PHASE 3: Exodus & Wilderness (Days 32-75) - Aligned to BibleHub
    // BibleHub: Exodus (Days 32-44), Leviticus (45-53), Numbers (54-63), Deuteronomy (64-75)
    // ============================================================

    const exodusTexts = [
      // Days 32-40: Exodus period → Jubilees continuation (covers Exodus)
      { book: 'Jubilees', startDay: 32, endDay: 40, period: 'Exodus Period', date: '160-150 BCE', textType: 'pseudepigrapha' as TextType, description: 'Rewritten Exodus with angelic mediation and detailed laws given at Sinai' },
      // Days 41-45: Letter of Aristeas (origin of Septuagint, relates to Torah)
      { book: 'Letter of Aristeas', startDay: 41, endDay: 45, period: 'Hellenistic Judaism', date: '200 BCE', textType: 'pseudepigrapha' as TextType, description: 'Legendary account of Septuagint translation, emphasizing Jewish wisdom for Hellenistic world' },
      // Days 46-55: Book of Jasher (supplements Exodus-Numbers)
      { book: 'The Book of Jasher', startDay: 46, endDay: 55, period: 'Wilderness Period', date: '100-150 CE', textType: 'pseudepigrapha' as TextType, description: 'Chronicle supplementing Exodus through Deuteronomy with additional details about the wilderness journey' },
      // Days 56-65: 2 Enoch (cosmology, relates to Sinai theophany)
      { book: 'The Book of the Secrets of Enoch (2 Enoch)', startDay: 56, endDay: 65, period: 'Sinai Revelation', date: '50-70 CE', textType: 'pseudepigrapha' as TextType, description: 'Enoch\'s transformation into Metatron with detailed cosmology complementing Sinai revelations' },
      // Days 66-75: Testament of Job (wisdom from patriarchal era)
      { book: 'Testament of Job', startDay: 66, endDay: 75, period: 'Wisdom Tradition', date: '100 BCE - 100 CE', textType: 'pseudepigrapha' as TextType, description: 'Expanded story of Job with details about his daughters\' prophecies, reflecting wisdom traditions' }
    ];

    // ============================================================
    // PHASE 4: Conquest & Judges (Days 76-102) - Aligned to BibleHub
    // BibleHub: Joshua (76-84), Judges (85-94), Ruth (95), 1 Samuel begins (96+)
    // ============================================================

    const conquestTexts = [
      // Days 76-85: Tobit (set in Assyrian captivity, wisdom for exile)
      { book: 'Tobit', startDay: 76, endDay: 80, period: 'Assyrian Period', date: '200-150 BCE', textType: 'deuterocanonical' as TextType, description: 'Story of piety and divine providence during Assyrian captivity, teaching faithfulness in foreign lands' },
      // Days 81-90: Judith (deliverance from foreign oppression)
      { book: 'Judith', startDay: 81, endDay: 90, period: 'Assyrian Threat', date: '150-100 BCE', textType: 'deuterocanonical' as TextType, description: 'Story of faith and deliverance during Assyrian threat, reflecting Jewish identity under foreign domination' },
      // Days 91-102: Sirach begins (wisdom for covenant faithfulness)
      { book: 'Sirach (Ecclesiasticus)', startDay: 91, endDay: 102, period: 'Wisdom Literature', date: '180-115 BCE', textType: 'deuterocanonical' as TextType, description: 'Practical ethical teachings from Jesus ben Sirach, representing wisdom tradition for maintaining covenant faithfulness' }
    ];

    // ============================================================
    // PHASE 5: Samuel & David (Days 103-158) - Aligned to BibleHub
    // BibleHub: 1 Samuel (103-120), 1 Chronicles (121-122), David's Reign (123-133), Temple Prep (134-135), Psalms (136-158)
    // ============================================================

    const davidicTexts = [
      // Days 103-115: Psalms of Solomon (Davidic psalms)
      { book: 'Psalms of Solomon', startDay: 103, endDay: 110, period: 'Davidic-Solomonic Era', date: '50 BCE', textType: 'pseudepigrapha' as TextType, description: 'Wisdom psalms reflecting on Davidic kingship and messianic hope, though written in Roman period' },
      // Days 111-120: Psalm 151 and Odes of Solomon
      { book: 'Psalm 151', startDay: 111, endDay: 111, period: 'Davidic Period', date: '100 BCE', textType: 'deuterocanonical' as TextType, description: 'Additional Davidic psalm about David\'s humble origins and divine election' },
      { book: 'The Odes of Solomon', startDay: 112, endDay: 120, period: 'Early Jewish-Christian', date: '100-150 CE', textType: 'apostolic_fathers' as TextType, description: 'Early hymns showing poetic theology and Christ-centered praise from Jewish-Christian background' },
      // Days 121-135: Wisdom of Solomon (Solomonic wisdom)
      { book: 'Wisdom of Solomon', startDay: 121, endDay: 135, period: 'Solomonic Wisdom', date: '50-20 BCE', textType: 'deuterocanonical' as TextType, description: 'Alexandrian philosophical wisdom attributed to Solomon, contrasting righteousness and wickedness' },
      // Days 136-150: Sirach continued (wisdom for kings and worship)
      { book: 'Sirach (Ecclesiasticus)', startDay: 136, endDay: 150, period: 'Temple Wisdom', date: '180-115 BCE', textType: 'deuterocanonical' as TextType, description: 'Continued wisdom teachings focusing on temple worship, prayer, and proper reverence for God' },
      // Days 151-158: Testament of Solomon (Solomonic wisdom over demons)
      { book: 'Testament of Solomon', startDay: 151, endDay: 158, period: 'Solomonic Wisdom', date: '100-300 CE', textType: 'pseudepigrapha' as TextType, description: 'Solomon\'s magical wisdom for controlling demons, revealing spiritual hierarchy and angelic assistance' }
    ];

    // ============================================================
    // PHASE 6: Solomon & Divided Kingdom (Days 159-206) - Aligned to BibleHub
    // BibleHub: Solomon (159-181), Divided Kingdom (182-206)
    // ============================================================

    const kingdomTexts = [
      // Days 159-170: 1 Maccabees (historical context for resistance to foreign rule)
      { book: '1 Maccabees', startDay: 159, endDay: 170, period: 'Maccabean Revolt', date: '175-134 BCE', textType: 'deuterocanonical' as TextType, description: 'Historical account of Jewish resistance against Seleucid religious oppression and fight for independence' },
      // Days 171-180: 2 Maccabees (theological reflection on martyrdom)
      { book: '2 Maccabees', startDay: 171, endDay: 180, period: 'Maccabean Revolt', date: '124-63 BCE', textType: 'deuterocanonical' as TextType, description: 'Theological reflection on martyrdom, resurrection, and divine intervention during Maccabean persecution' },
      // Days 181-190: 3 Maccabees and 4 Maccabees
      { book: '3 Maccabees', startDay: 181, endDay: 185, period: 'Ptolemaic Egypt', date: '50-20 BCE', textType: 'deuterocanonical' as TextType, description: 'Earlier Jewish persecution in Egypt under Ptolemy IV, paralleling Maccabean themes of deliverance' },
      { book: '4 Maccabees', startDay: 186, endDay: 190, period: 'Philosophical Discourse', date: '25-50 CE', textType: 'deuterocanonical' as TextType, description: 'Hellenistic Jewish philosophy using Maccabean martyrs as examples of reason over passion' },
      // Days 191-200: Prayer of Manasseh and Ascension of Isaiah
      { book: 'Prayer of Manasseh', startDay: 191, endDay: 192, period: 'Assyrian Captivity', date: '100-50 BCE', textType: 'deuterocanonical' as TextType, description: 'Penitential prayer of King Manasseh during Assyrian captivity, showing possibility of repentance' },
      { book: 'Ascension of Isaiah', startDay: 193, endDay: 200, period: 'Prophetic Vision', date: '100-150 CE', textType: 'pseudepigrapha' as TextType, description: 'Isaiah\'s vision of Christ and cosmic journey through seven heavens, blending Jewish and Christian traditions' },
      // Days 201-206: Baruch and Letter of Jeremiah
      { book: 'Baruch', startDay: 201, endDay: 204, period: 'Babylonian Exile', date: '150-100 BCE', textType: 'deuterocanonical' as TextType, description: 'Jeremiah\'s scribe\'s confession and wisdom poem during Babylonian exile, urging repentance and hope' },
      { book: 'Letter of Jeremiah', startDay: 205, endDay: 206, period: 'Babylonian Exile', date: '150-100 BCE', textType: 'deuterocanonical' as TextType, description: 'Warning against idolatry addressed to Jewish exiles in Babylon' }
    ];

    // ============================================================
    // PHASE 7: Prophets, Exile & Restoration (Days 207-280) - Aligned to BibleHub
    // BibleHub: Isaiah & Hezekiah (207-221), Fall of Judah (222-231), Exile (232-252), Restoration (253-280)
    // ============================================================

    const propheticTexts = [
      // Days 207-215: Greek Esther (Persian period, God's providence)
      { book: 'Greek Esther', startDay: 207, endDay: 215, period: 'Persian Period', date: '100-50 BCE', textType: 'deuterocanonical' as TextType, description: 'Greek additions to Esther providing prayers and explicit divine intervention during Persian rule' },
      // Days 216-225: 1 Esdras (alternative Ezra-Nehemiah account)
      { book: '1 Esdras', startDay: 216, endDay: 225, period: 'Return from Exile', date: '150-100 BCE', textType: 'deuterocanonical' as TextType, description: 'Alternative version of Ezra-Nehemiah material with unique traditions about Zerubbabel and temple restoration' },
      // Days 226-235: 2 Esdras (apocalyptic response to temple destruction)
      { book: '2 Esdras (4 Ezra)', startDay: 226, endDay: 235, period: 'Post-Temple Destruction', date: '90-120 CE', textType: 'deuterocanonical' as TextType, description: 'Apocalyptic responses to the destruction of the Second Temple (70 CE), dealing with theodicy and messianic hope' },
      // Days 236-245: Dead Sea Scrolls - Great Isaiah Scroll
      { book: 'Great Isaiah Scroll (1QIsa^a)', startDay: 236, endDay: 240, period: 'Dead Sea Scrolls', date: '125 BCE', textType: 'archaeological' as TextType, description: 'Nearly complete Hebrew Isaiah showing remarkable textual preservation and messianic interpretations' },
      // Days 241-245: Community Rule
      { book: 'Community Rule (1QS)', startDay: 241, endDay: 245, period: 'Qumran Community', date: '100 BCE', textType: 'archaeological' as TextType, description: 'Essene community regulations and theological teachings from Qumran' },
      // Days 246-255: War Scroll and Damascus Document
      { book: 'War Scroll (1QM)', startDay: 246, endDay: 250, period: 'Qumran Eschatology', date: '50 BCE - 25 CE', textType: 'archaeological' as TextType, description: 'Eschatological war between Sons of Light and Darkness with detailed battle plans' },
      { book: 'Damascus Document (CD)', startDay: 251, endDay: 255, period: 'Qumran Law', date: '100 BCE - 50 CE', textType: 'archaeological' as TextType, description: 'Community laws and theological teachings from the Damascus community' },
      // Days 256-265: Hodayot (Thanksgiving Hymns)
      { book: 'Hodayot (Thanksgiving Hymns)', startDay: 256, endDay: 265, period: 'Qumran Worship', date: '50 BCE - 25 CE', textType: 'archaeological' as TextType, description: 'Personal thanksgiving hymns expressing praise and gratitude for divine revelation' },
      // Days 266-275: 2 Baruch and 3 Baruch
      { book: '2 Baruch (Syriac Apocalypse)', startDay: 266, endDay: 270, period: 'Post-Temple Apocalypse', date: '100-130 CE', textType: 'pseudepigrapha' as TextType, description: 'Syriac apocalypse responding to temple destruction with messianic hope' },
      { book: '3 Baruch', startDay: 271, endDay: 275, period: 'Cosmic Tour', date: '100-200 CE', textType: 'pseudepigrapha' as TextType, description: 'Journey through heavens with angelological revelations about creation' },
      // Days 276-280: Sentences of Sextus
      { book: 'The Sentences of Sextus', startDay: 276, endDay: 280, period: 'Christian Wisdom', date: '150-200 CE', textType: 'apostolic_fathers' as TextType, description: 'Christian wisdom sayings influenced by philosophical traditions' }
    ];

    // ============================================================
    // PHASE 8: Early Christianity - Apostolic Fathers (Days 281-310) - Aligned to BibleHub
    // BibleHub: Gospels (281-330), Acts (309-325)
    // ============================================================

    const earlyChristianTexts = [
      // Days 281-285: Didache (earliest Christian manual)
      { book: 'Didache', startDay: 281, endDay: 285, period: 'Apostolic Teaching', date: '50-120 CE', textType: 'apostolic_fathers' as TextType, description: 'Teaching of the Twelve - earliest Christian manual for life, baptism, Eucharist, and church order' },
      // Days 286-290: 1 Clement
      { book: '1 Clement', startDay: 286, endDay: 290, period: 'Post-Apostolic Church', date: '95-97 CE', textType: 'apostolic_fathers' as TextType, description: 'Roman church\'s letter to Corinth on unity, humility, and resurrection - earliest post-apostolic writing' },
      // Days 291-295: Ignatius Letters
      { book: 'Ignatius Letters', startDay: 291, endDay: 295, period: 'Martyrdom Theology', date: '105-115 CE', textType: 'apostolic_fathers' as TextType, description: 'Seven letters from Bishop Ignatius of Antioch emphasizing unity with bishop, Eucharist, and martyrdom' },
      // Days 296-298: Polycarp
      { book: 'Polycarp to Philippians', startDay: 296, endDay: 297, period: 'Pastoral Epistle', date: '110-140 CE', textType: 'apostolic_fathers' as TextType, description: 'Pastoral letter from Polycarp (John\'s disciple) to Philippian church on righteousness' },
      { book: 'Martyrdom of Polycarp', startDay: 298, endDay: 300, period: 'Early Martyrdom', date: '155-160 CE', textType: 'apostolic_fathers' as TextType, description: 'Earliest extant martyrdom account, describing Polycarp\'s witness and death for Christ' },
      // Days 301-305: Epistle of Barnabas
      { book: 'Epistle of Barnabas', startDay: 301, endDay: 305, period: 'Allegorical Interpretation', date: '80-120 CE', textType: 'apostolic_fathers' as TextType, description: 'Allegorical Old Testament interpretation from Christian perspective, showing typology of Christ' },
      // Days 306-310: 2 Clement
      { book: '2 Clement', startDay: 306, endDay: 310, period: 'Early Preaching', date: '140-160 CE', textType: 'apostolic_fathers' as TextType, description: 'Oldest extant complete Christian sermon on practical Christian living and repentance' }
    ];

    // ============================================================
    // PHASE 9: Apostolic Fathers Continued (Days 311-330) - Aligned to BibleHub
    // BibleHub: Gospels continued, Acts
    // ============================================================

    const apostolicTexts = [
      // Days 311-315: Papias Fragments
      { book: 'Papias Fragments', startDay: 311, endDay: 315, period: 'Early Tradition', date: '110-130 CE', textType: 'apostolic_fathers' as TextType, description: 'Traditions about gospel origins and apostolic teachings from early church father' },
      // Days 316-325: Shepherd of Hermas
      { book: 'Shepherd of Hermas', startDay: 316, endDay: 325, period: 'Roman Christianity', date: '140-155 CE', textType: 'apostolic_fathers' as TextType, description: 'Visions, commands, and similitudes about repentance, church discipline, and Christian virtues' },
      // Days 326-330: Preaching of Peter
      { book: 'Preaching of Peter', startDay: 326, endDay: 330, period: 'Early Apology', date: '130-150 CE', textType: 'nt_apocrypha' as TextType, description: 'Early Christian apologetic work defending Christian beliefs against pagan criticism' }
    ];

    // ============================================================
    // PHASE 10: NT Apocrypha - Gospels (Days 331-355) - Aligned to BibleHub
    // BibleHub: Acts, Pauline Epistles
    // ============================================================

    const gospelApocrypha = [
      // Days 331-335: Jewish-Christian Gospels
      { book: 'Gospel of the Hebrews', startDay: 331, endDay: 333, period: 'Jewish Christianity', date: '65-100 CE', textType: 'nt_apocrypha' as TextType, description: 'Jewish-Christian gospel quoted by early church fathers, used by Jewish-Christian communities' },
      { book: 'Gospel of the Ebionites', startDay: 334, endDay: 335, period: 'Jewish Christian', date: '100-150 CE', textType: 'nt_apocrypha' as TextType, description: 'Jewish-Christian gospel harmonizing synoptic traditions with Torah observance' },
      // Days 336-340: Gospel of Thomas
      { book: 'Gospel of Thomas', startDay: 336, endDay: 340, period: 'Sayings Collection', date: '50-140 CE', textType: 'archaeological' as TextType, description: '114 sayings of Jesus with parallels to canonical gospels, influential for synoptic studies' },
      // Days 341-345: Gospel of Peter
      { book: 'Gospel of Peter', startDay: 341, endDay: 345, period: 'Passion Narrative', date: '70-160 CE', textType: 'nt_apocrypha' as TextType, description: 'Passion narrative with resurrection appearances, early Christian alternative perspective' },
      // Days 346-350: Gospel of Mary
      { book: 'Gospel of Mary', startDay: 346, endDay: 350, period: 'Mary Magdalene', date: '120-180 CE', textType: 'archaeological' as TextType, description: 'Mary Magdalene\'s revelation and teaching authority, early Christian perspective on women leaders' },
      // Days 351-355: Gospel of Nicodemus
      { book: 'Gospel of Nicodemus (Acts of Pilate)', startDay: 351, endDay: 355, period: 'Passion Expansion', date: '150-400 CE', textType: 'nt_apocrypha' as TextType, description: 'Expansion on passion narrative with Pilate\'s report and Christ\'s descent to hell' }
    ];

    // ============================================================
    // PHASE 11: NT Apocrypha - Acts & Epistles (Days 356-365) - Aligned to BibleHub
    // BibleHub: Final Epistles, Revelation
    // ============================================================

    const actsApocrypha = [
      // Days 356-358: Acts of Paul
      { book: 'Acts of Paul', startDay: 356, endDay: 358, period: 'Pauline Tradition', date: '150-200 CE', textType: 'nt_apocrypha' as TextType, description: 'Expanded acts including Thecla\'s story of ministry and celibacy advocacy' },
      // Days 359-361: Acts of Peter
      { book: 'Acts of Peter', startDay: 359, endDay: 361, period: 'Peter Tradition', date: '150-200 CE', textType: 'nt_apocrypha' as TextType, description: 'Peter\'s ministry, conflict with Simon Magus, and martyrdom in Rome' },
      // Days 362-364: Acts of Thomas
      { book: 'Acts of Thomas', startDay: 362, endDay: 364, period: 'Syrian Tradition', date: '200-250 CE', textType: 'nt_apocrypha' as TextType, description: 'Thomas\' mission to India with Hymn of the Pearl and ascetic teachings' },
      // Day 365: Apocalypse of Peter
      { book: 'Apocalypse of Peter', startDay: 365, endDay: 365, period: 'Afterlife Vision', date: '100-150 CE', textType: 'nt_apocrypha' as TextType, description: 'Vision of heaven and hell, early Christian understanding of divine judgment and afterlife' }
    ];

    // Generate daily readings from all phases
    const allPhases = [
      ...primevalTexts,
      ...patriarchalTexts,
      ...exodusTexts,
      ...conquestTexts,
      ...davidicTexts,
      ...kingdomTexts,
      ...propheticTexts,
      ...earlyChristianTexts,
      ...apostolicTexts,
      ...gospelApocrypha,
      ...actsApocrypha
    ];

    allPhases.forEach(({ book, startDay, endDay, period, date, textType, description }) => {
      for (let day = startDay; day <= endDay; day++) {
        if (day <= 365) {
          // Add commentary for specific key days
          let commentary;
          if (day === 281 && book === 'Didache') {
            commentary = '🔍GENERIC_COMMENT: The Didache represents one of the most important discoveries in early Christian literature. This practical manual provides a window into how the earliest Christians lived, worshipped, and organized their communities. Its teachings on baptism, the Eucharist, and ethical living show the transition from Jewish practices to distinctly Christian faith.';
          } else if (day === 286 && book === '1 Clement') {
            commentary = '🔍GENERIC_COMMENT: 1 Clement is the earliest post-apostolic writing we possess, written by the Roman church to address division in Corinth. Its emphasis on humility, unity, and the resurrection demonstrates how the early church dealt with internal conflicts while maintaining apostolic faith and practice.';
          } else if (day === 336 && book === 'Gospel of Thomas') {
            commentary = '🔍GENERIC_COMMENT: The Gospel of Thomas offers a different perspective on Jesus\' teachings through its collection of sayings. While not included in the canon, it provides valuable insights into early Christian diversity and how Jesus was remembered in different communities.';
          }

          readings.push({
            day,
            date: `2025-01-${day.toString().padStart(2, '0')}`,
            passages: [{
              book,
              chapterStart: day - startDay + 1,
              chapterEnd: day - startDay + 1,
              isApocryphal: true,
              testament: 'apocryphal' as const,
              parallelEvents: []
            }].map((passage: BiblePassage) => {
              // Add href for clickable links
              let href;
              if (book === 'The First Book of Adam and Eve') {
                href = `https://www.sacred-texts.com/bib/fbe/fbe${passage.chapterStart.toString().padStart(3, '0')}.htm`;
              } else if (book === 'The Second Book of Adam and Eve') {
                href = `https://www.sacred-texts.com/bib/fbe/fbe${(84 + passage.chapterStart).toString().padStart(3, '0')}.htm`;
              } else {
                href = generateApocryphaUrl(book, passage.chapterStart);
              }
              return {
                ...passage,
                ...(href && { href: href as any })
              };
            }),
            historicalContext: {
              period,
              approximateDate: date,
              description,
              parallelEvents: []
            },
            readingTimeMinutes: 20,
            apocryphaIncluded: true,
            textType,
            commentary
          });
        }
      }
    });

    // Fill any remaining days with reflection readings
    while (readings.length < 365) {
      const day = readings.length + 1;
      readings.push({
        day,
        date: `2025-01-${day.toString().padStart(2, '0')}`,
        passages: [{
          book: 'Apocrypha Reflection',
          chapterStart: 1,
          isApocryphal: true,
          testament: 'apocryphal' as const,
          parallelEvents: []
        }],
        historicalContext: {
          period: 'Study Completion',
          approximateDate: '2025 CE',
          description: 'Reflection on the breadth of apocryphal and pseudepigraphal traditions alongside canonical Scripture',
          parallelEvents: []
        },
        readingTimeMinutes: 15,
        apocryphaIncluded: true
      });
    }

    return readings.slice(0, 365);
  }
}
