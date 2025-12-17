import type { ReadingPlan, BiblePassage } from '../../types/reading-plans';
import { generateApocryphaUrl } from '../../utils/apocrypha-links';

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
        description: '365-day chronological reading plan through Deuterocanonical books, Old Testament Pseudepigrapha, New Testament Apocrypha, and early Christian writings',
        totalDays: 365,
        averageReadingTime: 25,
        language: 'en',
        version: '2.0 Updated',
        sourceUrl: 'https://github.com/anthropics/bible360-research'
      }
    };
  }

  private generateApocryphaReadings() {
    const readings = [];

    // Phase 1: Creation and Primeval History (Days 1-35) - Adam to Noah Period
    const phase1 = [
      // Days 1-8: Adam and Eve books (describe earliest events)
      { book: 'The First Book of Adam and Eve', startDay: 1, endDay: 4, period: 'Primeval History', date: '50-100 CE', description: 'Expansion of Genesis narrative describing Adam and Eve\'s life after expulsion from Eden, focusing on their repentance and early human struggles' },
      { book: 'The Second Book of Adam and Eve', startDay: 5, endDay: 8, period: 'Primeval History', date: '50-100 CE', description: 'Continuation of Adam and Eve\'s story with Cain\'s history, the fall of man\'s descendants, and early human civilization before the Flood' },
      // Days 9-20: 1 Enoch (Enoch was Adam\'s descendant, lived before the Flood)
      { book: '1 Enoch', startDay: 9, endDay: 20, period: 'Antediluvian Revelation', date: '300-200 BCE', description: 'Enoch\'s heavenly visions, the Watcher angels, Nephilim, and cosmic secrets revealed before the Great Flood - foundational for Jewish angelology and eschatology' },
      // Days 21-26: Other Primeval Expansions
      { book: 'The Book of Jasher', startDay: 21, endDay: 24, period: 'Biblical Supplements', date: '100-150 CE', description: 'Chronicle supplementing Genesis with details about patriarchs, angels, and early human history from creation to Israel\'s entry into Canaan' },
      { book: 'The Book of the Secrets of Enoch (2 Enoch)', startDay: 25, endDay: 27, period: 'Heavenly Ascent', date: '50-70 CE', description: 'Enoch\'s transformation into Metatron the heavenly scribe, with detailed cosmology and angelology from Slavic tradition' },
      // Days 28-35: Flood and Post-Flood Expansion
      { book: 'Testament of Solomon', startDay: 28, endDay: 35, period: 'Solomonic Wisdom', date: '100-300 CE', description: 'Solomon\'s magical wisdom for controlling demons, revealing spiritual hierarchy and angelic assistance - though written later, describes events from Solomon\'s time (970-931 BCE)' }
    ];

    // Phase 2: Patriarchal to Kingdom Period (Days 36-75) - Abraham to Solomon Era
    const phase2 = [
      // Days 36-45: Jubilees (covers Genesis-Exodus period)
      { book: 'Jubilees', startDay: 36, endDay: 45, period: 'Chronological Revision', date: '160-150 BCE', description: 'Rewritten Genesis and Exodus with 364-day solar calendar, angelic mediation, and division of history into jubilee periods' },
      // Days 46-58: Testament of the Twelve Patriarchs (Jacob's sons, c. 1900-1700 BCE)
      { book: 'Testament of the Twelve Patriarchs', startDay: 46, endDay: 58, period: 'Patriarchal Instructions', date: '140-100 BCE', description: 'Ethical testaments from Jacob\'s sons containing moral teachings, prophecies of the Messiah, and future apocalyptic visions' },
      // Days 59-62: Psalms of Solomon (attributed to Solomon, 970-931 BCE)
      { book: 'Psalms of Solomon', startDay: 59, endDay: 62, period: 'Davidic-Solomonic Era', date: '50 BCE', description: 'Wisdom psalms attributed to Solomon\'s era, though reflecting later Pharisaic theology on righteousness and divine justice' },
      // Days 63-75: Wisdom Literature (Solomon to Exile period)
      { book: 'Wisdom of Solomon', startDay: 63, endDay: 70, period: 'Solomonic Wisdom', date: '50-20 BCE', description: 'Alexandrian philosophical wisdom attributed to Solomon, contrasting righteousness and wickedness, personifying divine Wisdom' },
      { book: 'Sirach (Ecclesiasticus)', startDay: 71, endDay: 75, period: 'Post-exilic Wisdom', date: '180-115 BCE', description: 'Practical ethical teachings from Jesus ben Sirach, representing wisdom tradition from Solomon through the exile' }
    ];

    // Phase 3: Divided Kingdom to Exilic Period (Days 76-140) - 931-538 BCE Events
    const phase3 = [
      // Days 76-80: Manasseh's Repentance (c. 695-642 BCE)
      { book: 'Prayer of Manasseh', startDay: 76, endDay: 77, period: 'Assyrian Captivity', date: '100-50 BCE', description: 'Penitential prayer of King Manasseh during Assyrian captivity, showing possibility of repentance even for the wicked' },
      { book: 'Psalm 151', startDay: 78, endDay: 78, period: 'Davidic Period', date: '100 BCE', description: 'Additional Davidic psalm attributed to David\'s humble origins and divine election, connecting to pre-exilic worship' },
      // Days 79-85: Babylonian Exile (586-538 BCE)
      { book: 'Baruch', startDay: 79, endDay: 83, period: 'Babylonian Exile', date: '150-100 BCE', description: 'Jeremiah\'s scribe\'s confession and wisdom poem during Babylonian exile, urging repentance and hope' },
      { book: 'Letter of Jeremiah', startDay: 84, endDay: 85, period: 'Babylonian Exile', date: '150-100 BCE', description: 'Warning against idolatry addressed to Jewish exiles in Babylon, maintaining faith in foreign land' },
      // Days 86-95: Return from Exile and Restoration (538-450 BCE)
      { book: '1 Esdras', startDay: 86, endDay: 92, period: 'Return from Exile', date: '150-100 BCE', description: 'Alternative version of Ezra-Nehemiah material with unique traditions about Zerubbabel and temple restoration' },
      { book: 'Greek Esther', startDay: 93, endDay: 95, period: 'Persian Period', date: '100-50 BCE', description: 'Greek additions to Esther providing prayers and explicit divine intervention during Persian rule' },
      // Days 96-105: Hellenistic Period Wisdom (300-50 BCE)
      { book: 'Tobit', startDay: 96, endDay: 100, period: 'Assyrian Captivity', date: '200-150 BCE', description: 'Set during Assyrian captivity but reflects Hellenistic Jewish values of piety, family, and divine providence' },
      { book: 'Judith', startDay: 101, endDay: 105, period: 'Hellenistic Period', date: '150-100 BCE', description: 'Story of faith during Assyrian threat, reflecting Hellenistic Jewish identity under foreign domination' },
      // Days 106-120: Maccabean Revolt (167-160 BCE)
      { book: '1 Maccabees', startDay: 106, endDay: 115, period: 'Maccabean Revolt', date: '175-134 BCE', description: 'Historical account of Jewish resistance against Seleucid religious oppression and fight for independence' },
      { book: '2 Maccabees', startDay: 116, endDay: 125, period: 'Maccabean Revolt', date: '124-63 BCE', description: 'Theological reflection on martyrdom, resurrection, and divine intervention during Maccabean persecution' },
      { book: '3 Maccabees', startDay: 126, endDay: 130, period: 'Ptolemaic Egypt', date: '50-20 BCE', description: 'Earlier Jewish persecution in Egypt under Ptolemy IV, paralleling Maccabean themes of deliverance' },
      { book: '4 Maccabees', startDay: 131, endDay: 135, period: 'Philosophical Discourse', date: '25-50 CE', description: 'Hellenistic Jewish philosophy using Maccabean martyrs as examples of reason over passion' },
      // Days 136-140: Post-Temple Destruction Response
      { book: '2 Esdras (4 Ezra)', startDay: 136, endDay: 140, period: 'Post-Temple Destruction', date: '90-120 CE', description: 'Apocalyptic responses to the destruction of the Second Temple (70 CE), dealing with theodicy and messianic hope' }
    ];

    // Phase 4: Second Temple Judaism Continued (Days 141-180) - Dead Sea Scrolls and Qumran
    const phase4 = [
      // Days 141-150: Qumran Community Texts (c. 150 BCE - 68 CE)
      { book: 'Great Isaiah Scroll (1QIsa^a)', startDay: 141, endDay: 143, period: 'Dead Sea Scrolls', date: '125 BCE', description: 'Nearly complete Hebrew Isaiah showing remarkable textual preservation and messianic interpretations from Qumran community' },
      { book: 'Community Rule (1QS)', startDay: 144, endDay: 146, period: 'Qumran Community', date: '100 BCE', description: 'Essene community regulations, theological teachings, and sectarian identity separating from Jerusalem temple worship' },
      { book: 'War Scroll (1QM)', startDay: 147, endDay: 149, period: 'Qumran Eschatology', date: '50 BCE - 25 CE', description: 'Eschatological war between Sons of Light and Darkness with detailed battle plans for final conflict' },
      { book: 'Damascus Document (CD)', startDay: 150, endDay: 152, period: 'Qumran Law', date: '100 BCE - 50 CE', description: 'Community laws, theological teachings, and polemics against Jerusalem establishment' },
      // Days 153-160: Qumran Worship and Wisdom
      { book: 'Hodayot (Thanksgiving Hymns)', startDay: 153, endDay: 155, period: 'Qumran Worship', date: '50 BCE - 25 CE', description: 'Personal thanksgiving hymns expressing praise and gratitude for divine revelation and community identity' },
      { book: 'Testament of Job', startDay: 156, endDay: 158, period: 'Wisdom Expansion', date: '100 BCE - 100 CE', description: 'Expanded story of Job with details about his daughters\' prophecies, reflecting Second Temple wisdom traditions' },
      { book: 'Joseph and Aseneth', startDay: 159, endDay: 160, period: 'Jewish Romance', date: '100-200 CE', description: 'Story of Joseph\'s marriage to Egyptian convert Aseneth, exploring themes of conversion and identity' },
      // Days 161-170: Other Second Temple Texts
      { book: 'Letter of Aristeas', startDay: 161, endDay: 163, period: 'Hellenistic Judaism', date: '200 BCE', description: 'Legendary account of Septuagint translation with Hellenistic propaganda about Jewish wisdom' },
      { book: '3 Baruch', startDay: 164, endDay: 166, period: 'Cosmic Tour', date: '100-200 CE', description: 'Journey through heavens with angelological revelations about creation and restoration' },
      { book: 'Ascension of Isaiah', startDay: 167, endDay: 170, period: 'Christian Vision', date: '100-150 CE', description: 'Isaiah\'s vision of Christ and cosmic journey through seven heavens, blending Jewish and Christian traditions' },
      // Days 171-180: Transitional Period
      { book: '2 Baruch (Syriac Apocalypse)', startDay: 171, endDay: 175, period: 'Post-Temple Apocalypse', date: '100-130 CE', description: 'Syriac apocalypse responding to temple destruction with messianic hope and eschatological expectations' },
      { book: 'The Sentences of Sextus', startDay: 176, endDay: 177, period: 'Christian Wisdom', date: '150-200 CE', description: 'Christian wisdom sayings influenced by pagan philosophical traditions' },
      { book: 'The Odes of Solomon', startDay: 178, endDay: 180, period: 'Early Christian Hymns', date: '100-150 CE', description: 'Early Christian hymns showing poetic theology and Christ-centered praise from Jewish-Christian background' }
    ];

    // Phase 5: Early Christianity - Apostolic Fathers (Days 181-230)
    const phase5 = [
      // Days 181-190: Earliest Christian Documents (30-100 CE)
      { book: 'Didache', startDay: 181, endDay: 185, period: 'Apostolic Teaching', date: '50-120 CE', description: 'Teaching of the Twelve - earliest Christian manual for life, baptism, Eucharist, and church order from apostolic era' },
      { book: '1 Clement', startDay: 186, endDay: 190, period: 'Post-Apostolic Church', date: '95-97 CE', description: 'Roman church\'s letter to Corinth on unity, humility, and resurrection - earliest post-apostolic writing (96 CE)' },
      // Days 191-200: Early Christian Leaders and Martyrdom
      { book: 'Ignatius Letters', startDay: 191, endDay: 195, period: 'Martyrdom Theology', date: '105-115 CE', description: 'Seven letters from Bishop Ignatius of Antioch emphasizing unity with bishop, Eucharist, and martyrdom (c. 110 CE)' },
      { book: 'Polycarp to Philippians', startDay: 196, endDay: 197, period: 'Pastoral Epistle', date: '110-140 CE', description: 'Pastoral letter from Polycarp (John\'s disciple) to Philippian church on righteousness and perseverance' },
      { book: 'Martyrdom of Polycarp', startDay: 198, endDay: 200, period: 'Early Martyrdom', date: '155-160 CE', description: 'Earliest extant martyrdom account, describing Polycarp\'s witness and death for Christ (155 CE)' },
      // Days 201-210: Christian Teaching and Tradition
      { book: 'Epistle of Barnabas', startDay: 201, endDay: 203, period: 'Allegorical Interpretation', date: '80-120 CE', description: 'Allegorical Old Testament interpretation from Christian perspective, showing typology of Christ' },
      { book: '2 Clement', startDay: 204, endDay: 206, period: 'Early Preaching', date: '140-160 CE', description: 'Oldest extant complete Christian sermon on practical Christian living and repentance' },
      { book: 'Papias Fragments', startDay: 207, endDay: 208, period: 'Early Tradition', date: '110-130 CE', description: 'Traditions about gospel origins and apostolic teachings from early church father' },
      { book: 'Shepherd of Hermas (Part 1)', startDay: 209, endDay: 210, period: 'Roman Christianity', date: '140-155 CE', description: 'Visions and commands about repentance and church discipline from Roman Christian community' },
      // Days 211-220: Shepherd of Hermas and Early Expansions
      { book: 'Shepherd of Hermas (Part 2)', startDay: 211, endDay: 215, period: 'Roman Christianity', date: '140-155 CE', description: 'Similitudes and parables about building the church and Christian virtues' },
      { book: 'Preaching of Peter', startDay: 216, endDay: 217, period: 'Early Apology', date: '130-150 CE', description: 'Early Christian apologetic work defending Christian beliefs against pagan criticism' },
      { book: 'Teachings of Silvanus', startDay: 218, endDay: 220, period: 'Christian Philosophy', date: '150-250 CE', description: 'Christian philosophical teachings drawing on Platonic thought for ethical instruction' }
    ];

    // Phase 6: New Testament Apocrypha - Gospels and Acts (Days 231-290)
    const phase6 = [
      // Days 231-240: Jewish-Christian Gospels (50-100 CE)
      { book: 'Gospel of the Hebrews', startDay: 231, endDay: 234, period: 'Jewish Christianity', date: '65-100 CE', description: 'Jewish-Christian gospel quoted by early church fathers, used by Jewish-Christian communities in Egypt' },
      { book: 'Gospel of the Ebionites', startDay: 235, endDay: 237, period: 'Jewish Christian', date: '100-150 CE', description: 'Jewish-Christian gospel harmonizing synoptic traditions with vegetarianism and Torah observance' },
      { book: 'Gospel of the Nazoreans', startDay: 238, endDay: 240, period: 'Jewish Christian', date: '100-160 CE', description: 'Jewish-Christian gospel expanding on Matthew with Hebrew traditions for Nazarene communities' },
      // Days 241-255: Alternative Gospel Traditions (50-200 CE)
      { book: 'Gospel of Thomas', startDay: 241, endDay: 248, period: 'Sayings Collection', date: '50-140 CE', description: '114 sayings of Jesus with parallels to canonical gospels, influential for Gnostic and synoptic studies' },
      { book: 'Gospel of the Egyptians', startDay: 249, endDay: 250, period: 'Encratite Teaching', date: '80-150 CE', description: 'Ascetic gospel rejecting marriage and procreation, focusing on salvation through celibacy' },
      { book: 'Gospel of Peter', startDay: 251, endDay: 255, period: 'Passion Narrative', date: '70-160 CE', description: 'Passion narrative with resurrection appearances, early Christian alternative to canonical gospels' },
      // Days 256-265: Passion and Resurrection Expansions (100-400 CE)
      { book: 'Gospel of Nicodemus (Acts of Pilate)', startDay: 256, endDay: 260, period: 'Passion Expansion', date: '150-400 CE', description: 'Expansion on passion narrative with Pilate\'s report and Christ\'s descent to hell' },
      { book: 'Gospel of Mary', startDay: 261, endDay: 263, period: 'Mary Magdalene', date: '120-180 CE', description: 'Mary Magdalene\'s revelation and teaching authority, early Christian feminist perspective' },
      { book: 'Pistis Sophia (Part 1)', startDay: 264, endDay: 265, period: 'Gnostic Revelation', date: '200-300 CE', description: 'Post-resurrection dialogue about cosmic redemption and Sophia\'s restoration, Sethian Gnosticism' },
      // Days 266-275: Acts of Apostles and Apostolic Expansions (150-250 CE)
      { book: 'Acts of Paul', startDay: 266, endDay: 270, period: 'Pauline Tradition', date: '150-200 CE', description: 'Expanded acts including Thecla\'s story of ministry and celibacy advocacy, influential for women in church' },
      { book: 'Acts of Peter', startDay: 271, endDay: 274, period: 'Peter Tradition', date: '150-200 CE', description: 'Peter\'s ministry, conflict with Simon Magus, and martyrdom in Rome' },
      { book: 'Acts of John', startDay: 275, endDay: 277, period: 'John Tradition', date: '150-200 CE', description: 'John\'s ministry, miracles, and theological discourses in Ephesus with Gnostic elements' },
      { book: 'Acts of Andrew', startDay: 278, endDay: 280, period: 'Andrew Tradition', date: '150-200 CE', description: 'Andrew\'s missionary journeys and martyrdom in Patras' },
      { book: 'Acts of Thomas', startDay: 281, endDay: 285, period: 'Syrian Tradition', date: '200-250 CE', description: 'Thomas\' mission to India with Hymn of the Pearl and ascetic teachings, Syrian Christianity' },
      { book: 'The Acts of Peter and the Twelve Apostles', startDay: 286, endDay: 288, period: 'Gnostic Acts', date: '150-225 CE', description: 'Gnostic account of apostolic missionary activities with allegorical interpretations' },
      { book: 'Pistis Sophia (Part 2)', startDay: 289, endDay: 290, period: 'Gnostic Revelation', date: '200-300 CE', description: 'Continuation of post-resurrection dialogues about cosmic mysteries and salvation' }
    ];

    // Phase 7: Gnostic Texts and Apocalyptic Literature (Days 291-365)
    const phase7 = [
      // Days 291-310: Major Gnostic Revelations (120-200 CE)
      { book: 'Apocryphon of John', startDay: 291, endDay: 297, period: 'Sethian Gnosticism', date: '120-180 CE', description: 'Classic Gnostic creation myth revealing the transcendent Monad, fall of Sophia, and redemption through gnosis' },
      { book: 'Gospel of Truth', startDay: 298, endDay: 299, period: 'Valentinian Gnosticism', date: '140-180 CE', description: 'Poetic Valentinian gospel of spiritual illumination and the error of ignorance in material world' },
      { book: 'Gospel of Philip', startDay: 300, endDay: 304, period: 'Valentinian Teaching', date: '180-250 CE', description: 'Valentinian Gnostic theological collection focusing on sacraments, symbolism, and spiritual marriage' },
      { book: 'The Sophia of Jesus Christ', startDay: 305, endDay: 307, period: 'Gnostic Dialogue', date: '150-200 CE', description: 'Post-resurrection dialogue between apostles and Christ about Gnostic mysteries and salvation' },
      { book: 'The Apocryphon of James', startDay: 308, endDay: 310, period: 'Gnostic Revelation', date: '150-200 CE', description: 'Revelation dialogue between James and Jesus about salvation knowledge and resurrection' },
      // Days 311-325: Advanced Gnostic Cosmology (150-350 CE)
      { book: 'Hypostasis of the Archons', startDay: 311, endDay: 315, period: 'Sethian Cosmology', date: '200-300 CE', description: 'Gnostic interpretation of Genesis and salvation history, revealing archontic rulers and cosmic hierarchy' },
      { book: 'On the Origin of the World', startDay: 316, endDay: 320, period: 'Gnostic Creation', date: '250-350 CE', description: 'Comprehensive Gnostic creation and salvation narrative with divine feminine and cosmic restoration' },
      { book: 'Tripartite Tractate', startDay: 321, endDay: 325, period: 'Valentinian System', date: '200-300 CE', description: 'Systematic Valentinian theological exposition of Pleroma, fall, and restoration of fullness' },
      // Days 326-340: Specialized Gnostic Texts (150-330 CE)
      { book: 'Thunder, Perfect Mind', startDay: 326, endDay: 328, period: 'Divine Feminine', date: '150-250 CE', description: 'Divine feminine revelation with paradoxical statements and self-revelation from transcendent wisdom' },
      { book: 'The Treatise on the Resurrection', startDay: 329, endDay: 330, period: 'Gnostic Theology', date: '180-200 CE', description: 'Gnostic understanding of resurrection and spiritual body versus physical resurrection' },
      { book: 'The Three Steles of Seth', startDay: 331, endDay: 332, period: 'Sethian Liturgy', date: '200-300 CE', description: 'Sethian liturgical text with hymns and revelations about transcendent realm and divine seed' },
      { book: 'The Prayer of the Apostle Paul', startDay: 333, endDay: 333, period: 'Early Christian Prayer', date: '150-250 CE', description: 'Early Christian prayer with Gnostic elements seeking deliverance from cosmic forces' },
      { book: 'The Gospel of the Egyptians', startDay: 334, endDay: 335, period: 'Sethian Gnosticism', date: '100-150 CE', description: 'Sethian Gnostic creation myth and liturgical text about overcoming archontic rulers' },
      { book: 'The Vision of Paul', startDay: 336, endDay: 338, period: 'Apocalyptic Vision', date: '250-400 CE', description: 'Paul\'s heavenly tour and vision of afterlife rewards and punishments, medieval influence' },
      { book: 'Coptic Apocalypse of Paul', startDay: 339, endDay: 340, period: 'Apocalyptic Vision', date: '150-300 CE', description: 'Alternative version of Paul\'s heavenly journey with Gnostic elements and cosmic revelations' },
      // Days 341-355: Later Gnostic Development (200-350 CE)
      { book: 'Zostrianos', startDay: 341, endDay: 343, period: 'Sethian Mysticism', date: '200-230 CE', description: 'Detailed account of heavenly ascent and visions of transcendent realm through purification rites' },
      { book: 'Allogenes', startDay: 344, endDay: 345, period: 'Sethian Mysticism', date: '300-350 CE', description: 'Final revelation about unknowable God and contemplation practices for spiritual ascent' },
      { book: 'Marsanes', startDay: 346, endDay: 347, period: 'Sethian Mysticism', date: '270-330 CE', description: 'Advanced Gnostic teachings about cosmic ascent and spiritual contemplation of divine mysteries' },
      { book: 'The Thought of Norea', startDay: 348, endDay: 349, period: 'Sethian Tradition', date: '170-230 CE', description: 'Revelation to Norea, Seth\'s sister, about spiritual ignorance and salvation through gnosis' },
      { book: 'Melchizedek', startDay: 350, endDay: 351, period: 'Gnostic Christology', date: '150-300 CE', description: 'Melchizedek as heavenly high priest and cosmic redeemer figure in Gnostic theology' },
      { book: 'The Interpretation of Knowledge', startDay: 352, endDay: 353, period: 'Valentinian Exegesis', date: '150-200 CE', description: 'Valentinian interpretation of salvation through knowledge and spiritual understanding' },
      { book: 'A Valentinian Exposition', startDay: 354, endDay: 355, period: 'Valentinian System', date: '150-350 CE', description: 'Complete outline of Valentinian theological system with Pleroma and salvation plan' },
      // Days 356-365: Final Apocalyptic Texts (100-400 CE)
      { book: 'Apocalypse of Peter', startDay: 356, endDay: 358, period: 'Afterlife Vision', date: '100-150 CE', description: 'Vision of hell and final judgment scenes influencing later medieval visions of afterlife' },
      { book: 'Apocalypse of Thomas', startDay: 359, endDay: 360, period: 'Apocalyptic Revelation', date: '300-400 CE', description: 'Apocalyptic revelation about end times and divine judgment with mystical teachings' },
      { book: 'Sentences of Sextus', startDay: 361, endDay: 362, period: 'Christian Wisdom', date: '150-200 CE', description: 'Christian wisdom sayings influenced by pagan philosophical traditions for ethical living' },
      { book: 'The Teachings of Silvanus', startDay: 363, endDay: 364, period: 'Christian Philosophy', date: '150-250 CE', description: 'Christian philosophical teachings drawing on Platonic thought for spiritual instruction' },
      { book: 'Apocalypse of Paul', startDay: 365, endDay: 365, period: 'Apocalyptic Vision', date: '250-400 CE', description: 'Paul\'s heavenly tour and vision of afterlife - culmination of apocalyptic tradition' }
    ];

    // Generate daily readings from all phases
    const allPhases = [...phase1, ...phase2, ...phase3, ...phase4, ...phase5, ...phase6, ...phase7];

    allPhases.forEach(({ book, startDay, endDay, period, date, description }) => {
      for (let day = startDay; day <= endDay; day++) {
        if (day <= 365) {
          // Add commentary for specific key days
          let commentary;
          if (day === 181 && book === 'Didache') {
            commentary = '🔍GENERIC_COMMENT: The Didache represents one of the most important discoveries in early Christian literature. This practical manual provides a window into how the earliest Christians lived, worshipped, and organized their communities. Its teachings on baptism, the Eucharist, and ethical living show the transition from Jewish practices to distinctly Christian faith.';
          } else if (day === 186 && book === '1 Clement') {
            commentary = '🔍GENERIC_COMMENT: 1 Clement is the earliest post-apostolic writing we possess, written by the Roman church to address division in Corinth. Its emphasis on humility, unity, and the resurrection demonstrates how the early church dealt with internal conflicts while maintaining apostolic faith and practice.';
          } else if (day === 241 && book === 'Gospel of Thomas') {
            commentary = '🔍GENERIC_COMMENT: The Gospel of Thomas offers a different perspective on Jesus\' teachings through its collection of sayings. While not included in the canon, it provides valuable insights into early Christian diversity and how Jesus was remembered in different communities, particularly those with Gnostic influences.';
          } else if (day === 291 && book === 'Apocryphon of John') {
            commentary = '🔍GENERIC_COMMENT: The Apocryphon of John is the foundational text of Sethian Gnosticism, revealing the complex Gnostic creation myth. Its depiction of the Monad, the fall of Sophia, and the creation of the material world profoundly influenced alternative Christian movements and our understanding of early Christian diversity.';
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
              const href = generateApocryphaUrl(book, passage.chapterStart);
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
            readingTimeMinutes: 25,
            apocryphaIncluded: true,
            commentary
          });
        }
      }
    });

    // Ensure exactly 365 days
    while (readings.length < 365) {
      readings.push({
        day: readings.length + 1,
        date: `2025-01-${(readings.length + 1).toString().padStart(2, '0')}`,
        passages: [{
          book: 'Apocrypha Reflection',
          chapterStart: 1,
          isApocryphal: true,
          testament: 'apocryphal' as const,
          parallelEvents: []
        }].map((passage: BiblePassage) => {
          // Add href for clickable links
          const href = generateApocryphaUrl('Apocrypha Reflection', passage.chapterStart);
          return {
            ...passage,
            ...(href && { href: href as any })
          };
        }),
        historicalContext: {
          period: 'Study Completion',
          approximateDate: '2025 CE',
          description: 'Reflection on the breadth of apocryphal and pseudepigraphal traditions',
          parallelEvents: []
        },
        readingTimeMinutes: 15,
        apocryphaIncluded: true
      });
    }

    return readings.slice(0, 365);
  }
}