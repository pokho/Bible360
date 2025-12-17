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

    // Phase 1: Primordial History (Days 1-30) - Early Enoch Literature and Creation Texts
    const phase1 = [
      // Days 1-15: 1 Enoch (earliest major apocalyptic work)
      { book: '1 Enoch', startDay: 1, endDay: 15, period: 'Antediluvian Revelation', date: '300-200 BCE', description: 'Apocalyptic visions, angelology, and eschatology that profoundly influenced Second Temple Judaism and early Christianity' },
      // Days 16-22: Books of Adam and Eve
      { book: 'The First Book of Adam and Eve', startDay: 16, endDay: 19, period: 'Primeval History', date: '50-100 CE', description: 'Expansion of Genesis narrative describing Adam and Eve\'s life after expulsion from Eden' },
      { book: 'The Second Book of Adam and Eve', startDay: 20, endDay: 22, period: 'Primeval History', date: '50-100 CE', description: 'Continuation of Adam and Eve\'s story with Cain\'s history and early human civilization' },
      // Days 23-30: Other Early Pseudepigrapha
      { book: 'The Book of Jasher', startDay: 23, endDay: 26, period: 'Biblical Supplements', date: '100-150 CE', description: 'Alleged lost biblical book mentioned in Joshua and 2 Samuel, providing additional details about biblical events' },
      { book: 'The Book of the Secrets of Enoch (2 Enoch)', startDay: 27, endDay: 30, period: 'Heavenly Ascent', date: '50-70 CE', description: 'Enoch\'s journey through multiple heavens and transformation into the angel Metatron' }
    ];

    // Phase 2: Pre-Exilic to Exilic Period (Days 31-75) - Wisdom and Testament Literature
    const phase2 = [
      // Days 31-40: Jubilees
      { book: 'Jubilees', startDay: 31, endDay: 40, period: 'Chronological Revision', date: '160-150 BCE', description: 'Rewritten Genesis and Exodus with 364-day solar calendar and extensive angelic mediation' },
      // Days 41-55: Testament of the Twelve Patriarchs
      { book: 'Testament of the Twelve Patriarchs', startDay: 41, endDay: 55, period: 'Patriarchal Instructions', date: '140-100 BCE', description: 'Ethical testaments from Jacob\'s sons containing moral teachings and future apocalyptic visions' },
      // Days 56-60: Psalms of Solomon
      { book: 'Psalms of Solomon', startDay: 56, endDay: 60, period: 'Hasmonean Reflection', date: '50 BCE', description: 'Pharisaic response to Roman occupation and Pompey\'s conquest of Jerusalem' },
      // Days 61-75: Deuterocanonical Wisdom
      { book: 'Wisdom of Solomon', startDay: 61, endDay: 68, period: 'Hellenistic Judaism', date: '50-20 BCE', description: 'Alexandrian philosophical wisdom contrasting righteousness and wickedness, personifying Wisdom' },
      { book: 'Sirach (Ecclesiasticus)', startDay: 69, endDay: 75, period: 'Post-exilic Wisdom', date: '180-115 BCE', description: 'Practical ethical teachings from Jesus ben Sirach, bridging Torah wisdom and Hellenistic thought' }
    ];

    // Phase 3: Second Temple Judaism - Deuterocanonical (Days 76-140)
    const phase3 = [
      // Days 76-85: Tobit and Judith
      { book: 'Tobit', startDay: 76, endDay: 80, period: 'Post-exilic Period', date: '200-150 BCE', description: 'Religious novel about piety, family, and divine providence in the Assyrian captivity context' },
      { book: 'Judith', startDay: 81, endDay: 85, period: 'Assyrian Period Setting', date: '150-100 BCE', description: 'Story of widow heroism and faith during Assyrian threat, showing divine deliverance' },
      // Days 86-95: Baruch and Related Texts
      { book: 'Baruch', startDay: 86, endDay: 90, period: 'Babylonian Exile', date: '150-100 BCE', description: 'Jeremiah\'s scribe\'s confession and wisdom poem during Babylonian exile' },
      { book: 'Letter of Jeremiah', startDay: 91, endDay: 92, period: 'Babylonian Exile', date: '150-100 BCE', description: 'Warning against idolatry addressed to exiles in Babylon' },
      { book: 'Prayer of Manasseh', startDay: 93, endDay: 94, period: 'Assyrian Captivity', date: '100-50 BCE', description: 'Penitential prayer of wicked King Manasseh showing possibility of repentance' },
      { book: 'Psalm 151', startDay: 95, endDay: 95, period: 'Davidic Period', date: '100 BCE', description: 'Additional Davidic psalm on humble origins and divine election' },
      // Days 96-115: Maccabean History
      { book: '1 Maccabees', startDay: 96, endDay: 105, period: 'Maccabean Revolt', date: '175-134 BCE', description: 'Historical account of Jewish resistance against Seleucid religious oppression and persecution' },
      { book: '2 Maccabees', startDay: 106, endDay: 115, period: 'Maccabean Revolt', date: '124-63 BCE', description: 'Theological reflection on martyrdom, resurrection, and divine intervention during persecution' },
      // Days 116-125: Additional Maccabean Literature
      { book: '3 Maccabees', startDay: 116, endDay: 120, period: 'Ptolemaic Egypt', date: '50-20 BCE', description: 'Jewish persecution in Egypt under Ptolemy IV Philopator, showing divine deliverance' },
      { book: '4 Maccabees', startDay: 121, endDay: 125, period: 'Philosophical Discourse', date: '25-50 CE', description: 'Hellenistic Jewish philosophy on reason controlling passions, using Maccabean martyrs as examples' },
      // Days 126-140: Post-Exilic and Return Literature
      { book: '1 Esdras', startDay: 126, endDay: 132, period: 'Return from Exile', date: '150-100 BCE', description: 'Alternative version of Ezra-Nehemiah material with unique traditions about Zerubbabel' },
      { book: 'Greek Esther', startDay: 133, endDay: 135, period: 'Post-Exilic Enhancement', date: '100-50 BCE', description: 'Greek additions to Esther providing prayer and explicit divine intervention' },
      { book: '2 Esdras (4 Ezra)', startDay: 136, endDay: 140, period: 'Post-Temple Destruction', date: '90-120 CE', description: 'Apocalyptic responses to the destruction of the Second Temple, dealing with theodicy' }
    ];

    // Phase 4: Early Christianity - Apostolic Fathers (Days 141-180)
    const phase4 = [
      // Days 141-150: Earliest Christian Documents
      { book: 'Didache', startDay: 141, endDay: 145, period: 'Apostolic Teaching', date: '50-120 CE', description: 'Teaching of the Twelve - manual for Christian life, baptism, Eucharist, and church order' },
      { book: '1 Clement', startDay: 146, endDay: 150, period: 'Post-Apostolic Church', date: '95-97 CE', description: 'Roman church\'s letter to Corinth on unity, humility, and resurrection - earliest post-apostolic writing' },
      // Days 151-160: Martyrdom and Persecution
      { book: 'Ignatius Letters', startDay: 151, endDay: 155, period: 'Martyrdom Theology', date: '105-115 CE', description: 'Seven letters from Bishop Ignatius emphasizing unity with bishop, Eucharist, and martyrdom' },
      { book: 'Martyrdom of Polycarp', startDay: 156, endDay: 158, period: 'Early Martyrdom', date: '155-160 CE', description: 'Earliest extant martyrdom account, describing Polycarp\'s witness and death for Christ' },
      { book: 'Polycarp to Philippians', startDay: 159, endDay: 160, period: 'Pastoral Epistle', date: '110-140 CE', description: 'Pastoral letter from John\'s disciple to Philippian church on righteousness' },
      // Days 161-170: Early Christian Teaching
      { book: 'Epistle of Barnabas', startDay: 161, endDay: 163, period: 'Allegorical Interpretation', date: '80-120 CE', description: 'Allegorical Old Testament interpretation from Christian perspective, typology of Christ' },
      { book: '2 Clement', startDay: 164, endDay: 166, period: 'Early Preaching', date: '140-160 CE', description: 'Oldest extant complete Christian sermon on practical Christian living and repentance' },
      { book: 'Papias Fragments', startDay: 167, endDay: 168, period: 'Early Tradition', date: '110-130 CE', description: 'Traditions about gospel origins and apostolic teachings from early church father' },
      { book: 'Shepherd of Hermas (Part 1)', startDay: 169, endDay: 170, period: 'Roman Christianity', date: '140-155 CE', description: 'Visions and commands about repentance and church discipline' },
      // Days 171-180: More Early Christian Texts
      { book: 'Shepherd of Hermas (Part 2)', startDay: 171, endDay: 175, period: 'Roman Christianity', date: '140-155 CE', description: 'Similitudes and parables about building the church and Christian virtues' },
      { book: 'The Odes of Solomon', startDay: 176, endDay: 180, period: 'Early Christian Hymns', date: '100-150 CE', description: 'Early Christian hymns showing poetic theology and Christ-centered praise' }
    ];

    // Phase 5: New Testament Apocrypha - Gospels and Acts (Days 181-230)
    const phase5 = [
      // Days 181-190: Jewish-Christian Gospels
      { book: 'Gospel of the Hebrews', startDay: 181, endDay: 184, period: 'Jewish Christianity', date: '65-100 CE', description: 'Jewish-Christian gospel quoted by early church fathers, possibly used by Nazarene communities' },
      { book: 'Gospel of the Ebionites', startDay: 185, endDay: 187, period: 'Jewish Christian', date: '100-150 CE', description: 'Jewish-Christian gospel harmonizing synoptic traditions with vegetarianism and Torah observance' },
      { book: 'Gospel of the Nazoreans', startDay: 188, endDay: 190, period: 'Jewish Christian', date: '100-160 CE', description: 'Jewish-Christian gospel expanding on Matthew with Hebrew traditions' },
      // Days 191-200: Sayings Gospels
      { book: 'Gospel of Thomas', startDay: 191, endDay: 198, period: 'Sayings Collection', date: '50-140 CE', description: '114 sayings of Jesus with some parallels to canonical gospels, Gnostic influences' },
      { book: 'Gospel of the Egyptians', startDay: 199, endDay: 200, period: 'Encratite Teaching', date: '80-150 CE', description: 'Ascetic gospel rejecting marriage and procreation, focusing on salvation through celibacy' },
      // Days 201-215: Passion and Resurrection Narratives
      { book: 'Gospel of Peter', startDay: 201, endDay: 205, period: 'Passion Narrative', date: '70-160 CE', description: 'Passion narrative with resurrection appearances, early Christian alternative perspective' },
      { book: 'Gospel of Nicodemus (Acts of Pilate)', startDay: 206, endDay: 210, period: 'Passion Expansion', date: '150-400 CE', description: 'Expansion on passion narrative with Pilate\'s report and Christ\'s descent to hell' },
      { book: 'Gospel of Mary', startDay: 211, endDay: 213, period: 'Mary Magdalene', date: '120-180 CE', description: 'Mary Magdalene\'s revelation and teaching authority in Gnostic context' },
      { book: 'Pistis Sophia (Part 1)', startDay: 214, endDay: 215, period: 'Gnostic Revelation', date: '200-300 CE', description: 'Post-resurrection dialogue about cosmic redemption and Sophia\'s restoration' },
      // Days 216-230: Acts of Apostles
      { book: 'Acts of Paul', startDay: 216, endDay: 220, period: 'Pauline Tradition', date: '150-200 CE', description: 'Expanded acts including Thecla\'s story of ministry and celibacy advocacy' },
      { book: 'Acts of Peter', startDay: 221, endDay: 224, period: 'Peter Tradition', date: '150-200 CE', description: 'Peter\'s ministry, conflict with Simon Magus, and martyrdom in Rome' },
      { book: 'Acts of John', startDay: 225, endDay: 227, period: 'John Tradition', date: '150-200 CE', description: 'John\'s ministry, miracles, and theological discourses in Ephesus' },
      { book: 'Acts of Andrew', startDay: 228, endDay: 230, period: 'Andrew Tradition', date: '150-200 CE', description: 'Andrew\'s missionary journeys and martyrdom in Patras' }
    ];

    // Phase 6: Gnostic Traditions (Days 231-290)
    const phase6 = [
      // Days 231-245: Major Gnostic Revelations
      { book: 'Apocryphon of John', startDay: 231, endDay: 237, period: 'Sethian Gnosticism', date: '120-180 CE', description: 'Classic Gnostic creation myth revealing the transcendent Monad and fall of Sophia' },
      { book: 'The Sophia of Jesus Christ', startDay: 238, endDay: 240, period: 'Gnostic Dialogue', date: '150-200 CE', description: 'Post-resurrection dialogue between apostles and Christ about Gnostic mysteries' },
      { book: 'The Apocryphon of James', startDay: 241, endDay: 243, period: 'Gnostic Revelation', date: '150-200 CE', description: 'Revelation dialogue between James and Jesus about salvation knowledge' },
      { book: 'Gospel of Truth', startDay: 244, endDay: 245, period: 'Valentinian Gnosticism', date: '140-180 CE', description: 'Poetic Valentinian gospel of spiritual illumination and error' },
      // Days 246-255: Gnostic Cosmology and Anthropology
      { book: 'Hypostasis of the Archons', startDay: 246, endDay: 250, period: 'Sethian Cosmology', date: '200-300 CE', description: 'Gnostic interpretation of Genesis and salvation history, revealing archontic rulers' },
      { book: 'On the Origin of the World', startDay: 251, endDay: 255, period: 'Gnostic Creation', date: '250-350 CE', description: 'Comprehensive Gnostic creation and salvation narrative with divine feminine' },
      // Days 256-265: Valentinian and Other Systems
      { book: 'Tripartite Tractate', startDay: 256, endDay: 260, period: 'Valentinian System', date: '200-300 CE', description: 'Systematic Valentinian theological exposition of Pleroma, fall, and restoration' },
      { book: 'Gospel of Philip', startDay: 261, endDay: 265, period: 'Valentinian Teaching', date: '180-250 CE', description: 'Valentinian Gnostic theological collection focusing on sacraments and symbolism' },
      // Days 266-275: Unique Gnostic Texts
      { book: 'Thunder, Perfect Mind', startDay: 266, endDay: 268, period: 'Divine Feminine', date: '150-250 CE', description: 'Divine feminine revelation with paradoxical statements and self-revelation' },
      { book: 'The Treatise on the Resurrection', startDay: 269, endDay: 270, period: 'Gnostic Theology', date: '180-200 CE', description: 'Gnostic understanding of resurrection and spiritual body' },
      { book: 'The Three Steles of Seth', startDay: 271, endDay: 272, period: 'Sethian Liturgy', date: '200-300 CE', description: 'Sethian liturgical text with hymns and revelations about transcendent realm' },
      { book: 'The Prayer of the Apostle Paul', startDay: 273, endDay: 273, period: 'Early Christian Prayer', date: '150-250 CE', description: 'Early Christian prayer with Gnostic elements seeking deliverance' },
      { book: 'The Gospel of the Egyptians', startDay: 274, endDay: 275, period: 'Sethian Gnosticism', date: '100-150 CE', description: 'Sethian Gnostic creation myth and liturgical text about overcoming rulers' },
      // Days 276-290: Later Gnostic Development
      { book: 'Zostrianos', startDay: 276, endDay: 278, period: 'Sethian Mysticism', date: '200-230 CE', description: 'Detailed account of heavenly ascent and visions of transcendent realm' },
      { book: 'Allogenes', startDay: 279, endDay: 280, period: 'Sethian Mysticism', date: '300-350 CE', description: 'Final revelation about unknowable God and contemplation practices' },
      { book: 'Marsanes', startDay: 281, endDay: 282, period: 'Sethian Mysticism', date: '270-330 CE', description: 'Advanced Gnostic teachings about cosmic ascent and spiritual contemplation' },
      { book: 'The Thought of Norea', startDay: 283, endDay: 284, period: 'Sethian Tradition', date: '170-230 CE', description: 'Revelation to Norea, Seth\'s sister, about spiritual ignorance and salvation' },
      { book: 'Melchizedek', startDay: 285, endDay: 286, period: 'Gnostic Christology', date: '150-300 CE', description: 'Melchizedek as heavenly high priest and cosmic redeemer figure' },
      { book: 'The Interpretation of Knowledge', startDay: 287, endDay: 288, period: 'Valentinian Exegesis', date: '150-200 CE', description: 'Valentinian interpretation of salvation through knowledge' },
      { book: 'A Valentinian Exposition', startDay: 289, endDay: 290, period: 'Valentinian System', date: '150-350 CE', description: 'Complete outline of Valentinian theological system' }
    ];

    // Phase 7: Later Christian Texts and Dead Sea Scrolls (Days 291-365)
    const phase7 = [
      // Days 291-305: Later Apostolic Acts
      { book: 'Acts of Thomas', startDay: 291, endDay: 295, period: 'Syrian Tradition', date: '200-250 CE', description: 'Thomas\' mission to India with Hymn of the Pearl and ascetic teachings' },
      { book: 'Acts of Peter and the Twelve Apostles', startDay: 296, endDay: 298, period: 'Gnostic Acts', date: '150-225 CE', description: 'Gnostic account of apostolic missionary activities with allegorical interpretations' },
      { book: 'Preaching of Peter', startDay: 299, endDay: 300, period: 'Early Apology', date: '130-150 CE', description: 'Early Christian apologetic work defending Christian beliefs' },
      { book: 'Teachings of Silvanus', startDay: 301, endDay: 303, period: 'Gnostic Philosophy', date: '150-250 CE', description: 'Gnostic philosophical teachings drawing on Platonic thought' },
      { book: 'Sentences of Sextus', startDay: 304, endDay: 305, period: 'Christian Wisdom', date: '150-200 CE', description: 'Christian wisdom sayings influenced by pagan philosophical traditions' },
      // Days 306-320: Apocalyptic and Vision Literature
      { book: 'Apocalypse of Peter', startDay: 306, endDay: 308, period: 'Afterlife Vision', date: '100-150 CE', description: 'Vision of hell and final judgment scenes influencing later medieval visions' },
      { book: 'Apocalypse of Paul', startDay: 309, endDay: 311, period: 'Apocalyptic Vision', date: '250-400 CE', description: 'Paul\'s heavenly tour and vision of afterlife rewards and punishments' },
      { book: 'Coptic Apocalypse of Paul', startDay: 312, endDay: 313, period: 'Apocalyptic Vision', date: '150-300 CE', description: 'Alternative version of Paul\'s heavenly journey with Gnostic elements' },
      { book: 'Apocalypse of Thomas', startDay: 314, endDay: 315, period: 'Apocalyptic Revelation', date: '300-400 CE', description: 'Apocalyptic revelation about end times and divine judgment' },
      { book: '2 Baruch (Syriac Apocalypse)', startDay: 316, endDay: 320, period: 'Post-Temple Apocalypse', date: '100-130 CE', description: 'Syriac apocalypse responding to temple destruction with messianic hope' },
      // Days 321-335: Other Later Pseudepigrapha
      { book: 'Testament of Job', startDay: 321, endDay: 323, period: 'Wisdom Expansion', date: '100 BCE - 100 CE', description: 'Expanded story of Job with details about his daughters\' prophecies' },
      { book: 'Joseph and Aseneth', startDay: 324, endDay: 326, period: 'Jewish Romance', date: '100-200 CE', description: 'Story of Joseph\'s marriage to Egyptian convert Aseneth with conversion themes' },
      { book: 'Ascension of Isaiah', startDay: 327, endDay: 329, period: 'Christian Vision', date: '100-150 CE', description: 'Isaiah\'s vision of Christ and cosmic journey through seven heavens' },
      { book: '3 Baruch', startDay: 330, endDay: 332, period: 'Cosmic Tour', date: '100-200 CE', description: 'Journey through heavens with angelological revelations about creation' },
      { book: 'Letter of Aristeas', startDay: 333, endDay: 335, period: 'Hellenistic Judaism', date: '200 BCE', description: 'Legendary account of Septuagint translation with Hellenistic propaganda' },
      // Days 336-350: Dead Sea Scrolls and Qumran Literature
      { book: 'Great Isaiah Scroll (1QIsa^a)', startDay: 336, endDay: 338, period: 'Dead Sea Scrolls', date: '125 BCE', description: 'Nearly complete Hebrew Isaiah showing remarkable textual preservation and messianic interpretations' },
      { book: 'Community Rule (1QS)', startDay: 339, endDay: 341, period: 'Qumran Community', date: '100 BCE', description: 'Essene community regulations, theological teachings, and sectarian identity' },
      { book: 'War Scroll (1QM)', startDay: 342, endDay: 344, period: 'Qumran Eschatology', date: '50 BCE - 25 CE', description: 'Eschatological war between Sons of Light and Darkness with detailed battle plans' },
      { book: 'Damascus Document (CD)', startDay: 345, endDay: 347, period: 'Qumran Law', date: '100 BCE - 50 CE', description: 'Community laws, theological teachings, and polemics against Jerusalem establishment' },
      { book: 'Hodayot (Thanksgiving Hymns)', startDay: 348, endDay: 350, period: 'Qumran Worship', date: '50 BCE - 25 CE', description: 'Personal thanksgiving hymns expressing praise and gratitude for divine revelation' },
      // Days 351-365: Final Texts and Reflections
      { book: 'Pistis Sophia (Part 2)', startDay: 351, endDay: 355, period: 'Gnostic Revelation', date: '200-300 CE', description: 'Continuation of post-resurrection teachings about cosmic mysteries' },
      { book: '4 Ezra (Latin)', startDay: 356, endDay: 358, period: 'Post-Temple Theodicy', date: '100-120 CE', description: 'Latin version of Ezra\'s dialogues about divine justice and suffering' },
      { book: 'Questions of Bartholomew', startDay: 359, endDay: 361, period: 'Apocalyptic Dialogue', date: '200-400 CE', description: 'Questions to Christ about cosmic mysteries and afterlife conditions' },
      { book: 'Testament of Solomon', startDay: 362, endDay: 364, period: 'Magic Tradition', date: '100-300 CE', description: 'Solomon\'s magical wisdom for controlling demons with angelic assistance' },
      { book: 'Summary and Reflection', startDay: 365, endDay: 365, period: 'Study Completion', date: '2025 CE', description: 'Reflection on the breadth of apocryphal and pseudepigraphal traditions and their influence' }
    ];

    // Generate daily readings from all phases
    const allPhases = [...phase1, ...phase2, ...phase3, ...phase4, ...phase5, ...phase6, ...phase7];

    allPhases.forEach(({ book, startDay, endDay, period, date, description }) => {
      for (let day = startDay; day <= endDay; day++) {
        if (day <= 365) {
          // Add commentary for specific key days
          let commentary;
          if (day === 141 && book === 'Didache') {
            commentary = '🔍GENERIC_COMMENT: The Didache represents one of the most important discoveries in early Christian literature. This practical manual provides a window into how the earliest Christians lived, worshipped, and organized their communities. Its teachings on baptism, the Eucharist, and ethical living show the transition from Jewish practices to distinctly Christian faith.';
          } else if (day === 146 && book === '1 Clement') {
            commentary = '🔍GENERIC_COMMENT: 1 Clement is the earliest post-apostolic writing we possess, written by the Roman church to address division in Corinth. Its emphasis on humility, unity, and the resurrection demonstrates how the early church dealt with internal conflicts while maintaining apostolic faith and practice.';
          } else if (day === 191 && book === 'Gospel of Thomas') {
            commentary = '🔍GENERIC_COMMENT: The Gospel of Thomas offers a different perspective on Jesus\' teachings through its collection of sayings. While not included in the canon, it provides valuable insights into early Christian diversity and how Jesus was remembered in different communities, particularly those with Gnostic influences.';
          } else if (day === 231 && book === 'Apocryphon of John') {
            commentary = '🔍GENERIC_COMMENT: The Apocryryphon of John is the foundational text of Sethian Gnosticism, revealing the complex Gnostic creation myth. Its depiction of the Monad, the fall of Sophia, and the creation of the material world profoundly influenced alternative Christian movements and our understanding of early Christian diversity.';
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