/**
 * Thematic content descriptions for all books of the Bible plus
 * major Apocrypha and Pseudepigrapha texts.
 * Used in daily reading plans to give readers a preview of each book's
 * main themes, key figures, and notable content.
 */
export const bibleBookThemes: Record<string, string> = {
	// ============================================================
	// Old Testament
	// ============================================================

	Genesis:
		"The book of beginnings: God creates the universe, humanity falls into sin, and God initiates His covenant plan through Abraham, Isaac, Jacob, and Joseph. Readers encounter the foundational stories of creation, the flood, the tower of Babel, and the origins of Israel's twelve tribes.",

	Exodus:
		"God delivers Israel from Egyptian slavery through ten plagues and the Passover, then establishes His covenant at Sinai with the Ten Commandments. The narrative follows Moses' call at the burning bush, the Red Sea crossing, and the building of the Tabernacle where God's glory dwells among His people.",

	Leviticus:
		"A manual of holiness prescribing sacrificial rituals, priestly ordination, dietary laws, and the annual Day of Atonement. Central themes include God's absolute holiness, the seriousness of sin requiring blood atonement, and the call for Israel to be set apart as a holy nation.",

	Numbers:
		"Israel's forty-year wilderness wanderings, recorded with census data, rebellion narratives, and military campaigns. Key episodes include the spies' report on Canaan, Korah's rebellion, Moses striking the rock, Balaam's prophecies, and the transition of leadership toward the promised land.",

	Deuteronomy:
		"Moses' farewell addresses to Israel before entering Canaan, reiterating the Law with passionate exhortation to love God wholeheartedly. Contains the Shema ('Hear, O Israel'), blessings and curses of the covenant, and the promise of a future prophet like Moses.",

	Joshua:
		"The conquest of Canaan under Joshua's leadership, beginning with the crossing of the Jordan and the fall of Jericho. Readers follow the military campaigns dividing the land among the twelve tribes, and Joshua's final charge to choose whom they will serve.",

	Judges:
		"Israel's cyclical pattern of sin, oppression, repentance, and deliverance during the era before kings. Features colorful deliverers including Deborah, Gideon, Samson, and Jephthah, illustrating the consequences of spiritual compromise and the persistent mercy of God.",

	Ruth:
		"A tender story of loyalty and redemption set during the Judges period. The Moabite widow Ruth chooses Israel's God and people, gleans in the fields of Boaz, and becomes the great-grandmother of King David, demonstrating God's grace extending beyond Israel's borders.",

	"1 Samuel":
		"The transition from the era of judges to the monarchy, centering on the prophet Samuel, the failed reign of Saul, and the anointing of David. Readers witness David's victory over Goliath, his complicated relationship with Saul, and God's sovereignty in establishing His chosen king.",

	"2 Samuel":
		"David's reign over a united Israel, marked by military victories, the capture of Jerusalem, and God's eternal covenant with David's dynasty. The narrative does not shy from David's failures with Bathsheba and Absalom's rebellion, presenting a complex portrait of a man after God's own heart.",

	"1 Kings":
		"Solomon's glorious reign and the construction of the Temple give way to national division after his death. The northern kingdom of Israel and the southern kingdom of Judah begin their separate paths, and the prophet Elijah emerges to confront the idolatry of King Ahab and Queen Jezebel.",

	"2 Kings":
		"The continuing decline of both kingdoms through dynastic intrigue, prophetic ministry, and military conquest. Elijah's ascension, Elisha's miracles, the fall of Samaria to Assyria, and finally Babylon's destruction of Jerusalem and the Temple bring the monarchy era to a tragic close.",

	"1 Chronicles":
		"A priestly retelling of Israel's history from Adam to David, emphasizing genealogical records and the centrality of worship. David's reign is presented through the lens of Temple preparation, worship organization, and covenant faithfulness rather than his personal failures.",

	"2 Chronicles":
		"The history of Judah from Solomon's Temple dedication through the Babylonian exile, focusing on the spiritual faithfulness or apostasy of each king. The Temple and proper worship serve as the measuring stick, and the book concludes with Cyrus's decree allowing return from exile.",

	Ezra:
		"The return from Babylonian exile and the rebuilding of the Temple in Jerusalem under Zerubbabel and the priestly scribe Ezra. Readers see the challenges of restoration, opposition from surrounding peoples, and Ezra's reforms calling the returned community back to Torah faithfulness.",

	Nehemiah:
		"The cupbearer-turned-governor Nehemiah leads the rebuilding of Jerusalem's walls despite fierce opposition. Combines leadership narrative with spiritual renewal as Ezra reads the Law publicly, the people confess their sins, and the community recommits to covenant obedience.",

	Esther:
		"A dramatic tale of divine providence working through a Jewish queen in the Persian court to save her people from genocide. Though God's name never appears, His sovereignty permeates the story of Esther's courage, Mordecai's integrity, and Haman's downfall.",

	Job:
		"A profound exploration of suffering and divine wisdom, centered on a righteous man who loses everything. Through Job's dialogues with friends who offer conventional but inadequate answers and God's own thunderous response from the whirlwind, readers grapple with the mystery of innocent suffering and the limits of human understanding.",

	Psalms:
		"Israel's prayer book and hymnal, spanning the full range of human emotion in its 150 poems. Readers encounter songs of praise, laments of despair, royal coronation hymns, pilgrimage songs, and messianic prophecies, attributed largely to David but also to Moses, Asaph, and the sons of Korah.",

	Proverbs:
		"A collection of wisdom sayings attributed primarily to Solomon, teaching the art of godly living through practical instruction. Themes include the fear of the Lord as the beginning of wisdom, the contrast between the wise and the foolish, and guidance on speech, work, relationships, and justice.",

	Ecclesiastes:
		"A philosophical meditation on the meaning of life, traditionally attributed to Solomon reflecting in old age. The Preacher examines pleasure, wisdom, work, and wealth, concluding that all is vanity apart from fearing God and keeping His commandments.",

	"Song of Solomon":
		"A lyrical love poem celebrating romantic intimacy between a bride and groom, rich in garden and nature imagery. Interpreted both as a celebration of human marriage and as an allegory of God's love for His people or Christ's love for the Church.",

	Isaiah:
		"The messianic prophet's sweeping vision of God's holiness, Israel's sin, and future redemption. Contains the Immanuel prophecies, the Suffering Servant songs, and vivid depictions of the coming Messiah's reign, making it the Old Testament book most quoted in the New Testament.",

	Jeremiah:
		"The weeping prophet's forty-year ministry warning Judah of coming Babylonian judgment while holding out hope for a new covenant written on the heart. Readers encounter Jeremiah's personal struggles, his temple sermon, the potter's house analogy, and his letters to the exiles.",

	Lamentations:
		"A collection of five poignant laments over the destruction of Jerusalem and the Temple in 586 BC. Written in acrostic poetry, the book expresses raw grief and sorrow while yet clinging to the hope that God's mercies are new every morning and His faithfulness is great.",

	Ezekiel:
		"A priest-prophet's dramatic visions during the Babylonian exile, including the wheel within a wheel, the valley of dry bones coming to life, and the departure and return of God's glory. Combines bizarre symbolic acts with oracles against nations and a detailed vision of a restored Temple.",

	Daniel:
		"A statesman-prophet's experiences in the Babylonian and Persian courts, featuring fiery furnace deliverance, the lion's den, and the handwriting on the wall. Daniel's apocalyptic visions of four beasts, the seventy weeks, and the son of man establish key end-times prophecies.",

	Hosea:
		"A prophet commanded to marry an unfaithful wife as a living parable of Israel's spiritual adultery against God. Through personal heartbreak and divine analogy, Hosea conveys God's agonizing love for His wayward people and His promise of ultimate restoration.",

	Joel:
		"A prophecy centered on a devastating locust plague as a foretaste of the Day of the Lord. Joel calls for repentance, promises the outpouring of God's Spirit on all flesh, and describes God's final judgment in the Valley of Decision.",

	Amos:
		"A shepherd from Judah sent to prophesy against the northern kingdom, denouncing social injustice, religious hypocrisy, and exploitation of the poor. Amos insists that God demands justice rolling down like waters, not mere ritual observance, and warns of coming exile.",

	Obadiah:
		"The shortest Old Testament book, a single chapter pronouncing judgment on Edom for betraying Judah during Jerusalem's destruction. The prophecy ends with the promise that deliverance will come from Mount Zion and the kingdom will belong to the Lord.",

	Jonah:
		"A prophet who flees God's call to preach repentance to Israel's enemy Nineveh, is swallowed by a great fish, and finally reluctantly delivers God's message. The book explores God's mercy extending beyond Israel and challenges readers to examine their own attitude toward their enemies.",

	Micah:
		"A prophet from Moresheth who alternates between oracles of judgment and hope, addressing both the northern and southern kingdoms. Contains the famous summary of God's requirements -- to act justly, love mercy, and walk humbly with God -- and the prophecy of a ruler born in Bethlehem.",

	Nahum:
		"A poetic oracle against Nineveh, capital of Assyria, celebrating its impending destruction as divine justice for its cruelty and oppression. Vivid military imagery depicts the fall of the empire that once terrorized the ancient Near East.",

	Habakkuk:
		"A prophet's anguished dialogue with God about the injustice of using wicked Babylon to punish Judah. Concludes with the foundational declaration that the righteous shall live by faith, and a psalm of trust in God's salvation despite national catastrophe.",

	Zephaniah:
		"A prophet during Josiah's reign announcing the Day of the Lord as universal judgment against Judah's idolatry and the surrounding nations. The book ends with a beautiful promise that God will rejoice over His restored people with singing.",

	Haggai:
		"A post-exilic prophet urging the returned community to rebuild the Temple instead of prioritizing their own houses. Contains four messages delivered over four months, promising that the latter glory of the rebuilt Temple will surpass the former.",

	Zechariah:
		"A post-exilic prophet whose night visions encourage Temple rebuilding, paired with messianic prophecies including the humble king riding on a donkey and the pierced one whom the nations will mourn. Combines apocalyptic imagery with practical exhortation.",

	Malachi:
		"The final Old Testament prophet who addresses Israel's spiritual apathy through a series of disputations. Confronts corrupt priests, divorce, and withholding tithes, and closes with the promise that Elijah will return before the great and terrible Day of the Lord.",

	// ============================================================
	// New Testament
	// ============================================================

	Matthew:
		"The Gospel written for a Jewish audience, presenting Jesus as the promised Messiah and Davidic King. Features the Sermon on the Mount, extensive teaching in five discourses, frequent Old Testament quotations, and the Great Commission to make disciples of all nations.",

	Mark:
		"The shortest and most action-packed Gospel, emphasizing Jesus as the suffering Servant who moves rapidly from one event to the next. Mark's fast-paced narrative highlights Jesus' authority over demons, disease, and nature, while the disciples struggle to understand the necessity of the cross.",

	Luke:
		"The most detailed Gospel, written by a physician-historian to provide an orderly account for Theophilus. Luke highlights Jesus' concern for the marginalized -- women, the poor, Samaritans, and sinners -- and includes unique parables like the Good Samaritan and the Prodigal Son.",

	John:
		"The most theological Gospel, presenting Jesus as the divine Word made flesh through seven signs and seven 'I am' declarations. Written so that readers may believe that Jesus is the Christ, the Son of God, and have life in His name.",

	Acts:
		"Luke's sequel to his Gospel, chronicling the birth and expansion of the early Church from Jerusalem to Rome. Readers follow the outpouring of the Spirit at Pentecost, Peter's leadership, Stephen's martyrdom, and Paul's dramatic missionary journeys across the Roman world.",

	Romans:
		"Paul's most systematic theological letter, presenting the gospel of justification by faith alone. Walks through humanity's universal sin, God's grace through Christ's sacrifice, the transformation of the believer's life, and God's sovereign plan for Israel and the Gentiles.",

	"1 Corinthians":
		"Paul addresses a divided Greek church struggling with factionalism, sexual immorality, lawsuits, and disorder in worship. Contains the famous love chapter (1 Corinthians 13), teaching on spiritual gifts, and the earliest written account of the resurrection appearances.",

	"2 Corinthians":
		"Paul's most personal and emotionally raw letter, defending his apostolic authority against false teachers in Corinth. Reveals the apostle's suffering, his thorn in the flesh, and his theology of weakness as the avenue of God's power, culminating in the appeal to be reconciled to God.",

	Galatians:
		"Paul's fiery letter defending the gospel of grace against Judaizers who insisted on circumcision for Gentile converts. Argues passionately for freedom in Christ, justification by faith, and the fruit of the Spirit as evidence of the new life.",

	Ephesians:
		"Paul's expansive letter on the Church as the body of Christ, written from prison. Unfolds the cosmic scope of God's redemption, the unity of Jews and Gentiles, and practical instruction for Christian living including the famous armor of God passage.",

	Philippians:
		"A letter of joy written from prison to Paul's beloved Macedonian church. Contains the great Christological hymn describing Jesus' self-emptying and exaltation, and calls believers to rejoice in all circumstances while pressing toward the goal of Christlikeness.",

	Colossians:
		"Paul's letter countering false teaching that mixed Christianity with philosophy and angel worship. Exalts Christ as the supreme Creator and head of the Church, and teaches that believers are complete in Him, needing no supplementary spiritual powers.",

	"1 Thessalonians":
		"Likely Paul's earliest letter, written to encourage a young church facing persecution. Addresses concerns about believers who have died, teaching about the rapture and the Day of the Lord, while commending their faith, love, and hope.",

	"2 Thessalonians":
		"A follow-up letter clarifying end-times teaching, warning against the deception that the Day of the Lord has already come. Describes the man of lawlessness who must be revealed before Christ's return, and exhorts believers to stand firm and work diligently.",

	"1 Timothy":
		"Paul's pastoral letter to his younger protoge overseeing the church in Ephesus. Provides practical instruction on church leadership, confronting false teaching, caring for widows, and the qualifications for elders and deacons.",

	"2 Timothy":
		"Paul's final letter, written from a Roman prison shortly before his execution. A moving appeal to Timothy to guard the gospel, endure suffering, preach the Word faithfully, and finish the race, as Paul himself has fought the good fight.",

	Titus:
		"A brief pastoral letter guiding Titus in establishing orderly churches on the island of Crete. Covers elder qualifications, sound doctrine contrasted with Cretan laziness and falsehood, and practical instruction for different age groups in the Christian community.",

	Philemon:
		"Paul's shortest and most personal letter, appealing on behalf of the runaway slave Onesimus. A masterful appeal to Philemon to receive Onesimus back not as a slave but as a brother in Christ, demonstrating the gospel's power to transform social relationships.",

	Hebrews:
		"A sermon-letter showing Christ's superiority to angels, Moses, the priesthood, and the Old Covenant sacrificial system. Presents Jesus as the great High Priest offering Himself once for all, and includes the famous hall of faith chapter showcasing heroes who trusted God's promises.",

	James:
		"A practical letter from Jesus' brother addressing the Jewish diaspora, emphasizing that genuine faith produces works. Covers trials, the tongue, wisdom from above, the danger of wealth, and the duty to care for orphans and widows.",

	"1 Peter":
		"A letter to suffering Christians scattered across Asia Minor, offering hope through the living hope of Christ's resurrection. Teaches believers to submit to authorities, endure unjust suffering after Christ's example, and live holy lives as God's chosen people.",

	"2 Peter":
		"Peter's final warning against false teachers who deny Christ's return and exploit believers with destructive heresies. Reminds readers of God's past judgments, affirms that the Day of the Lord will come unexpectedly, and urges growth in grace and knowledge.",

	"1 John":
		"A pastoral letter addressing a community shaken by false teachers who denied Christ's incarnation. Emphasizes walking in the light, loving one another, testing the spirits, and provides assurance of salvation through faith in God's testimony about His Son.",

	"2 John":
		"A brief letter to a chosen lady and her children, balancing truth and love. Warns against receiving false teachers who deny Christ's coming in the flesh, while urging adherence to the commandment to love one another.",

	"3 John":
		"The shortest New Testament book, a personal letter commending Gaius for his hospitality to traveling missionaries and criticizing Diotrephes for his pride and refusal to welcome them. Models the tension between supporting gospel work and confronting obstruction.",

	Jude:
		"A single-chapter letter from Jesus' brother urging believers to contend earnestly for the faith against immoral false teachers. Draws on Old Testament examples of divine judgment and apocalyptic imagery to warn against spiritual apostasy.",

	Revelation:
		"The Bible's climactic apocalyptic prophecy, revealed to John on the island of Patmos. Features visions of Christ among the churches, the throne room of heaven, the seven seals, trumpets, and bowls, the rise and fall of Babylon, and the new heaven and new earth where God dwells with His people.",

	// ============================================================
	// Apocrypha / Deuterocanonical Books
	// ============================================================

	Tobit:
		"A deuterocanonical narrative of a pious Israelite exiled in Assyria who is blinded and then healed through the archangel Raphael's guidance. The story highlights family devotion, almsgiving, marriage, and divine providence, while introducing the angel Raphael as a companion and healer.",

	Judith:
		"A deuterocanonical tale of a courageous widow who saves Israel by seducing and beheading the Assyrian general Holofernes. Celebrates female heroism, trust in God's deliverance, and the power of prayer and fasting in the face of overwhelming military threat.",

	"Additions to Esther":
		"Deuterocanonical expansions of the Esther narrative found in the Greek Septuagint, adding prayers of Mordecai and Esther, dreams, and explicit references to God absent from the Hebrew text. These passages give the story a more overtly theological dimension.",

	"Wisdom of Solomon":
		"A deuterocanonical wisdom text attributed to Solomon but written in Greek, blending Jewish theology with Hellenistic philosophy. Explores the nature of divine wisdom as a cosmic principle, the immortality of the righteous, and God's justice in history.",

	"Sirach (Ecclesiasticus)":
		"A deuterocanonical wisdom collection by the Jewish scribe Ben Sira, covering practical and theological topics including friendship, family, speech, wealth, and the fear of the Lord. Uniquely among wisdom books, it praises famous figures from Israel's history as models of virtuous living.",

	Baruch:
		"A deuterocanonical book attributed to Jeremiah's scribe, containing a prayer of confession, a wisdom poem, and a letter to the exiles. Provides theological reflection on the Babylonian exile, attributing the catastrophe to Israel's sin while affirming hope for return and restoration.",

	"Letter of Jeremiah":
		"A deuterocanonical text often appended to Baruch, presented as a letter from Jeremiah to the exiles in Babylon. Satirically mocks idol worship, contrasting the powerlessness of pagan idols with the living God of Israel.",

	"Additions to Daniel (Prayer of Azariah, Susanna, Bel and the Dragon)":
		"Deuterocanonical expansions to the book of Daniel: the Prayer of Azariah and the Song of the Three Young Men in the furnace, the detective story of Susanna and the false elders, and the tales of Daniel exposing Babylonian idolatry through Bel and the Dragon.",

	"1 Maccabees":
		"A deuterocanonical historical narrative of the Jewish revolt against the Seleucid tyrant Antiochus IV Epiphanes and the subsequent establishment of the Hasmonean dynasty. Covers the heroic leadership of Mattathias and his sons, especially Judas Maccabeus, and the rededication of the Temple.",

	"2 Maccabees":
		"A deuterocanonical abridgment of a longer history covering the same period as 1 Maccabees, with greater theological emphasis. Highlights martyrdom as atoning, prayers for the dead, and the resurrection hope, providing the theological basis for certain Catholic doctrines.",

	"3 Maccabees":
		"A deuterocanonical text set in Egypt, recounting the persecution of Jews under Ptolemy IV Philopator and their miraculous deliverance. Though sharing the Maccabean title, it concerns a different period and location, emphasizing God's protection of His faithful people in the diaspora.",

	"4 Maccabees":
		"A philosophical discourse on the supremacy of devout reason over the passions, using the Maccabean martyrs as supreme examples. Blends Stoic philosophy with Jewish theology to argue that torments of the body cannot overcome reason grounded in the law of God.",

	"1 Esdras":
		"A deuterocanonical retelling of material from 2 Chronicles, Ezra, and Nehemiah in Greek, with unique additions including the story of the three bodyguards' debate about what is strongest. The answer -- truth -- leads to Zerubbabel's role in rebuilding the Temple.",

	"2 Esdras":
		"An apocalyptic text (also called 4 Ezra) containing seven revelations given to Ezra concerning the problem of evil, the fate of the wicked, and the coming messianic age. Written in response to the destruction of Jerusalem in 70 AD, it grapples with God's justice in permitting national catastrophe.",

	"Prayer of Manasseh":
		"A short penitential psalm attributed to the wicked King Manasseh of Judah, composed as the prayer mentioned in 2 Chronicles 33 but not recorded there. A model of contrition acknowledging God's boundless mercy toward repentant sinners.",

	"Psalms of Solomon":
		"A collection of eighteen Jewish psalms from the first century BC, reflecting on the Roman conquest of Jerusalem and the rise of the Hasmonean dynasty. Express messianic expectation, condemn the hypocrisy of sinful rulers, and affirm resurrection hope.",

	"Odes of Solomon":
		"An early Christian collection of forty-two hymns or odes, likely composed in Syriac around the late first or early second century. Rich in poetic imagery celebrating salvation, the incarnation, and the believer's union with Christ, representing some of the earliest Christian worship poetry.",

	"Testaments of the Twelve Patriarchs":
		"A pseudepigraphal work presenting the deathbed speeches of Jacob's twelve sons, each confessing their failings and prophesying about the future. Blends ethical instruction with messianic expectation and was valued by both Jewish and early Christian communities.",

	"Assumption of Moses":
		"A pseudepigraphal text presenting Moses' secret prophecy to Joshua about Israel's future apostasy and eventual restoration. Surviving only in a fragmentary Latin manuscript, it provides insight into Jewish apocalyptic thought around the turn of the eras.",

	"Apocalypse of Baruch":
		"A pseudepigraphal apocalyptic text attributed to Baruch, Jeremiah's scribe, responding to the destruction of Jerusalem in 70 AD. Contains visions of heaven's storehouses, the ages of history, and the coming messianic age, offering hope amid national devastation.",

	"3 Baruch":
		"A pseudepigraphal text recounting Baruch's heavenly journey guided by an angel through five heavens, seeing the fate of the righteous and wicked. Blends apocalyptic vision with ethical teaching about repentance and the consequences of human sin.",

	"Martyrdom of Isaiah":
		"A pseudepigraphal narrative describing the prophet Isaiah's death by being sawn in half under the wicked King Manasseh. Presents Isaiah as a faithful witness who prophesied the coming of Christ and was martyred for his uncompromising message.",

	"Ascension of Isaiah":
		"A composite pseudepigraphal work combining the Martyrdom of Isaiah with a visionary account of Isaiah's ascent through the seven heavens, where he witnesses the descent and ascent of Christ. Important for understanding early Christian angelology and christology.",

	"Sibylline Oracles":
		"A collection of Jewish and Christian prophetic poetry composed in the style of the pagan Sibyl, blending Greco-Roman prophetic conventions with biblical themes. Includes predictions of divine judgment, messianic hope, and apocalyptic cosmology from a monotheistic perspective.",

	"Life of Adam and Eve":
		"A pseudepigraphal narrative expanding on the Genesis story of Adam and Eve after their expulsion from Eden. Describes their repentance, Satan's fall, Adam's illness and death, and Eve's instructions to her children, providing vivid detail about the first family's post-Edenic life.",

	"The First Book of Adam and Eve":
		"A pseudepigraphal text also known as the Conflict of Adam and Eve, recounting the first couple's struggles after the expulsion from Paradise. Depicts their anguish, repeated attempts to regain Eden, divine encounters, and the first murder of Abel by Cain in elaborate narrative detail.",

	"The Second Book of Adam and Eve":
		"A continuation of the First Book, following the story of Adam's descendants after Cain's murder of Abel. Chronicles the genealogy of Seth, the corruption of humanity leading to the flood, and Adam's final days, emphasizing the ongoing cosmic battle between the seed of Seth and the seed of Cain.",

	"The Book of the Secrets of Enoch (2 Enoch)":
		"A pseudepigraphal text recounting Enoch's journey through ten heavens, where he sees the storehouses of the elements, the angelic orders, and the throne of God. Describes God's creation of the world in eight days and Enoch's transformation into a celestial being.",

	"1 Enoch (Ethiopic Enoch)":
		"A comprehensive pseudepigraphal work compiling visions of the pre-Flood patriarch Enoch, including the Book of Watchers on fallen angels, the Book of Parables on the Son of Man, astronomical and calendar revelations, and the Animal Apocalypse surveying all of history.",

	Jubilees:
		"A pseudepigraphal retelling of Genesis through Exodus 24, presented as revelation given to Moses on Sinai. Reorganizes biblical history into jubilee periods of forty-nine years, expands narrative details, and promotes a solar calendar and strict Sabbath observance.",

	Jasher:
		"A pseudepigraphal text purporting to be the Book of Jasher mentioned in Joshua and 2 Samuel. Retells biblical history from creation through Joshua's conquest with expanded dialogues, military details, and moral commentary, serving as a midrashic supplement to Scripture.",

	"Apocalypse of Abraham":
		"A pseudepigraphal text describing Abraham's rejection of idolatry, his heavenly journey guided by the archangel Yahoel, and his vision of the future history of his descendants. Combines apocalyptic imagery with a powerful monotheistic polemic against pagan worship.",

	"Testament of Abraham":
		"A pseudepigraphal narrative of Abraham's reluctant encounter with Death, sent by God to collect his soul. Abraham delays through requests to see the world, witnesses the judgment of souls, and the text explores themes of divine mercy and human mortality.",

	"Testament of Isaac":
		"A pseudepigraphal text presenting Isaac's farewell instructions before his death, emphasizing sacrifice, hospitality, and the importance of the temple. Reflects on the near-sacrifice of Isaac as a type of spiritual self-offering and calls hearers to faithful obedience.",

	"Testament of Jacob":
		"A pseudepigraphal farewell discourse attributed to Jacob, recounting his life story and offering ethical instruction to his sons. Emphasizes the importance of preserving the covenant lineage and looks forward to God's faithfulness to the patriarchal promises.",

	"Joseph and Aseneth":
		"A pseudepigraphal romance expanding the brief biblical mention of Joseph's marriage to Aseneth, daughter of an Egyptian priest. Describes Aseneth's dramatic conversion from idolatry to the worship of Israel's God, her marriage to Joseph, and themes of divine election and transformation.",

	"Aristeas the Exegete":
		"A fragmentary text attributed to a Jewish interpreter of Scripture, representing early Jewish allegorical exegesis. Provides insight into how Hellenistic Jewish thinkers read the Torah symbolically, bridging biblical narrative with Greek philosophical categories.",

	"Philo the Epic Poet":
		"A fragmentary pseudepigraphal epic poem attributed to a Jewish poet dramatizing biblical history in hexameter verse. Represents the attempt to express Jewish Scripture in classical Greek literary form, similar to Theodotus and other Jewish Hellenistic poets.",

	"Theodotus the Epic Poet":
		"A fragmentary Jewish epic poem surviving in quotations, retelling portions of the Genesis narrative in Homeric Greek hexameters. Illustrates how Hellenistic Jews adapted biblical stories to the conventions of classical epic poetry for a Greek-speaking audience.",

	"Testament of Job":
		"A pseudepigraphal text presenting Job's deathbed speech to his children, recounting his sufferings from his own perspective with added details. Emphasizes patience as the supreme virtue, includes angelic revelations, and describes Job's heavenly reward for his endurance.",

	"Testament of Solomon":
		"A pseudepigraphal text in which King Solomon recounts how he received a magical ring from the archangel Michael to control demons and build the Temple. Provides a fascinating window into Jewish magical tradition and angelology, blending wisdom literature with demonology.",

	"Lives of the Prophets":
		"A pseudepigraphal collection of brief biographies of the Old Testament prophets, describing their origins, ministries, and often their martyrdoms. Attributed to Epiphanius of Salamis, it provides traditional lore about figures like Isaiah, Jeremiah, Ezekiel, and the twelve minor prophets.",

	"4 Ezra":
		"An alternative name for 2 Esdras chapters 3-14, containing Ezra's seven apocalyptic revelations responding to the destruction of Jerusalem in 70 AD. Grapples with theodicy, the narrowness of salvation, and the coming new creation in some of the most profound Jewish apocalyptic literature.",

	"2 Baruch (Syriac Apocalypse)":
		"A pseudepigraphal apocalyptic text attributed to Baruch after the Roman destruction of Jerusalem in 70 AD. Contains visions of the coming messianic age, the resurrection, and the new creation, offering theological consolation through the certainty of God's ultimate triumph over evil.",

	"3 Baruch (Greek Apocalypse)":
		"A pseudepigraphal text describing Baruch's angel-guided tour through five heavens, witnessing the fate of souls and the workings of the cosmos. Combines apocalyptic tourism with moral teaching, revealing divine justice in the afterlife and the consequences of sin.",

	// ============================================================
	// Nag Hammadi / Gnostic Texts
	// ============================================================

	"Gospel of Thomas":
		"A sayings gospel containing 114 purported sayings of Jesus without narrative framework, discovered at Nag Hammadi. Valued for preserving possible early traditions of Jesus' teachings, though its Gnostic context reinterprets salvation as secret knowledge of one's divine origin.",

	"Gospel of Philip":
		"A Valentinian Gnostic text from Nag Hammadi, presenting sacramental theology through cryptic sayings and reflections. Discusses the nature of the sacraments, the relationship between Christ and the Church, and spiritual transformation through mystical union.",

	"Gospel of Mary":
		"A Gnostic dialogue text featuring Mary Magdalene as a prominent disciple who receives special revelations from the Savior. Notable for depicting Mary as a spiritual leader among the male apostles, raising questions about women's authority in early Christian communities.",

	"Apocryphon of John":
		"A central Sethian Gnostic text presenting a revelation of the risen Christ to John son of Zebedee, describing the true supreme God, the fallen demiurge who created the material world, and the divine spark trapped in humanity. A foundational document of Gnostic cosmology.",

	"Gospel of Truth":
		"A Valentinian Gnostic homily on the nature of knowledge and redemption, celebrating the Father's revelation through Christ. Describes error as a nightmare from which the awakened soul is freed by the gnosis of the Father's name and the returning to unity.",

	"Treatise on Resurrection":
		"A Valentinian letter addressing the nature of resurrection as a present spiritual reality rather than a future bodily event. Argues that the true resurrection is the soul's awakening to its divine nature through knowledge of Christ, already accomplished in the present.",

	"Tripartite Tractate":
		"The longest single treatise from Nag Hammadi, a systematic Valentinian theology covering the origin of the spiritual world, the fall, and redemption through Christ. Provides the most comprehensive philosophical exposition of Gnostic cosmological and soteriological thought.",

	"Gospel of the Egyptians":
		"A Sethian Gnostic dialogue between Jesus and Salome, emphasizing asceticism and the transcendence of sexual duality. Surviving in Nag Hammadi copies, it presents a radically encratite vision of salvation through renouncing marriage and procreation to restore primordial androgyny.",

	"Sophia of Jesus Christ":
		"A Gnostic revelation discourse in which the risen Christ explains the structure of the spiritual universe to his disciples. Describes the emanation of divine beings from the supreme Father and the fall of Sophia, blending Christian revelation with philosophical speculation.",

	"Dialogue of the Savior":
		"A fragmentary Gnostic dialogue between Jesus and three disciples -- Judas, Matthew, and Mary -- exploring themes of knowledge, the soul's ascent, and the transcendent nature of true prayer. Represents an early form of Gnostic revelatory discourse.",

	// ============================================================
	// Apocryphal Apocalypses
	// ============================================================

	"Apocalypse of Peter":
		"An early Christian apocalyptic text attributed to Peter, featuring a detailed vision of heaven and hell with vivid descriptions of punishments matching specific sins. One of the earliest Christian tours of the afterlife, influencing medieval visions of purgatory and judgment.",

	"Apocalypse of Paul":
		"A pseudepigraphal text claiming to record Paul's ascent through the heavens, witnessing the fate of souls and the throne of God. Heavily influenced by earlier apocalyptic literature, it shaped medieval imagination about the afterlife, including Dante's Divine Comedy.",

	// ============================================================
	// Apocryphal Acts
	// ============================================================

	"Acts of Paul":
		"An apocryphal narrative expanding on the ministry of the apostle Paul, including the famous story of Thecla, a young woman who abandons her fiance to follow Paul's teaching on chastity. Illustrates early Christian asceticism and the prominent role of women in some Christian communities.",

	"Acts of Peter":
		"An apocryphal text narrating Peter's miracles and martyrdom in Rome, including his confrontation with Simon Magus and his crucifixion upside down. Provides legendary material that shaped later traditions about Peter's ministry and death in the imperial capital.",

	"Acts of John":
		"An apocryphal account of John's ministry in Ephesus, featuring miraculous healings, a hymn of Christ's cosmic dance, and docetic Christology presenting Christ as a purely spiritual being. Significant for its distinctive theological perspective and liturgical fragments.",

	"Acts of Andrew":
		"An apocryphal narrative of Andrew's missionary journeys and martyrdom by crucifixion on an X-shaped cross in Patras. Emphasizes ascetic teaching and the superiority of the spiritual over the physical, reflecting early Christian celibacy movements.",

	"Acts of Thomas":
		"An apocryphal account of Thomas's mission to India, including the famous Hymn of the Pearl and numerous miracle stories. Promotes encratite theology with strong emphasis on sexual renunciation, and is the only major apocryphal Acts with plausible historical connection to its claimed region.",

	"Epistle of the Apostles":
		"A post-resurrection dialogue between the risen Christ and the eleven apostles, containing a discourse on the end times, the incarnation, and the descent into hell. Combines orthodox teaching with apocalyptic elements to counter Gnostic heresies circulating in the second century.",

	// ============================================================
	// Apostolic Fathers
	// ============================================================

	Didache:
		"One of the earliest Christian texts outside the New Testament, a manual of church order covering the Two Ways of life and death, baptism, fasting, the Lord's Prayer, the Eucharist, and hospitality rules. Provides invaluable evidence of Jewish-Christian liturgical practice around the late first century.",

	"1 Clement":
		"A letter from the church in Rome to the church in Corinth, written around 95-96 AD, making it nearly contemporary with the latest New Testament writings. Addresses factionalism and envy, using Old Testament examples and the martyrdoms of Peter and Paul to urge humility and concord.",

	"2 Clement":
		"An early Christian homily, the oldest complete surviving sermon outside the New Testament, probably delivered around 120-140 AD. Expounds on the sayings of Jesus, urging ethical transformation and warning that mere profession without obedient living will not save on the day of judgment.",

	"Epistle of Barnabas":
		"An early Christian treatise arguing that the Jews lost their covenant through disobedience and that Christians are the true heirs of God's promises. Provides an allegorical interpretation of Old Testament laws and rituals, reflecting the theological tensions between synagogue and church.",

	"Shepherd of Hermas":
		"A lengthy early Christian apocalypse composed of visions, commandments, and parables given to a former slave named Hermas in Rome. Emphasizes the possibility of post-baptismal repentance for serious sin, the necessity of good works, and the building of the Church as a great tower.",

	"Letters of Ignatius":
		"Seven letters written by Ignatius, bishop of Antioch, while being escorted to martyrdom in Rome around 110 AD. Urges unity around the bishop, warns against docetic and Judaizing heresies, and articulates an early theology of the Eucharist and the real presence of Christ.",

	"Letter of Polycarp":
		"A letter from Polycarp, bishop of Smyrna, to the Philippians, written around 110-140 AD. Merges pastoral encouragement with extensive quotations from New Testament writings, providing early evidence of the collection and authority of apostolic texts.",

	"Martyrdom of Polycarp":
		"The earliest detailed account of a Christian martyrdom outside the New Testament, describing Polycarp's arrest, trial, and execution by burning in Smyrna around 155 AD. Presents martyrdom as a faithful imitation of Christ's passion and a witness to the surrounding pagan society.",

	"Fragments of Papias":
		"Surviving quotations from Papias, bishop of Hierapolis around 110-140 AD, who compiled oral traditions about Jesus and the apostles. Uniquely attributes the Gospel of Mark to Peter's preaching and Matthew to a Hebrew collection of sayings, providing crucial early testimony on Gospel origins.",
};
