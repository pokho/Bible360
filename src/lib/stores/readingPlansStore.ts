import { writable } from 'svelte/store';
import type { ReadingPlan, DailyReading } from '$lib/types/reading-plans';
import { apocrypha365DayPlan } from '$lib/data/apocrypha-365-day-plan';

// Correct BLB reading plan data extracted from PDF
const blbChronologicalReadings: DailyReading[] = [
	{
		day: 1,
		date: '2025-01-01',
		passages: [
			{ book: 'Genesis', chapterStart: 1, chapterEnd: 2, testament: 'old' }
		],
		historicalContext: {
			period: 'Creation',
			approximateDate: 'c. 4000 BC',
			description: 'The beginning of creation and the formation of the universe'
		},
		readingTimeMinutes: 15
	},
	{
		day: 2,
		date: '2025-01-02',
		passages: [
			{ book: 'Genesis', chapterStart: 3, chapterEnd: 5, testament: 'old' }
		],
		historicalContext: {
			period: 'The Fall',
			approximateDate: 'c. 4000 BC',
			description: 'The fall of humanity and the consequences of sin'
		},
		readingTimeMinutes: 20
	},
	{
		day: 3,
		date: '2025-01-03',
		passages: [
			{ book: 'Genesis', chapterStart: 6, chapterEnd: 9, testament: 'old' }
		],
		historicalContext: {
			period: 'The Flood',
			approximateDate: 'c. 2500 BC',
			description: 'Noah and the great flood that destroyed the earth'
		},
		readingTimeMinutes: 25
	},
	{
		day: 4,
		date: '2025-01-04',
		passages: [
			{ book: 'Genesis', chapterStart: 10, chapterEnd: 11, testament: 'old' }
		],
		historicalContext: {
			period: 'Post-Flood Nations',
			approximateDate: 'c. 2400 BC',
			description: 'The repopulation of the earth and the Table of Nations'
		},
		readingTimeMinutes: 18
	},
	{
		day: 5,
		date: '2025-01-05',
		passages: [
			{ book: 'Job', chapterStart: 1, chapterEnd: 2, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Period',
			approximateDate: 'c. 2100 BC',
			description: 'The suffering of Job, possibly contemporary with Abraham'
		},
		readingTimeMinutes: 20
	},
	{
		day: 6,
		date: '2025-01-06',
		passages: [
			{ book: 'Job', chapterStart: 3, chapterEnd: 5, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Period',
			approximateDate: 'c. 2100 BC',
			description: 'Job\'s dialogue with his friends about suffering'
		},
		readingTimeMinutes: 22
	},
	{
		day: 7,
		date: '2025-01-07',
		passages: [
			{ book: 'Job', chapterStart: 6, chapterEnd: 7, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Period',
			approximateDate: 'c. 2100 BC',
			description: 'Continued discourse on human suffering'
		},
		readingTimeMinutes: 18
	},
	{
		day: 8,
		date: '2025-01-08',
		passages: [
			{ book: 'Job', chapterStart: 8, chapterEnd: 10, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Period',
			approximateDate: 'c. 2100 BC',
			description: 'Bildad\'s response and Job\'s reply'
		},
		readingTimeMinutes: 24
	},
	{
		day: 9,
		date: '2025-01-09',
		passages: [
			{ book: 'Job', chapterStart: 11, chapterEnd: 13, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Period',
			approximateDate: 'c. 2100 BC',
			description: 'Zophar\'s speech and Job\'s response'
		},
		readingTimeMinutes: 20
	},
	{
		day: 10,
		date: '2025-01-10',
		passages: [
			{ book: 'Job', chapterStart: 14, chapterEnd: 16, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Period',
			approximateDate: 'c. 2100 BC',
			description: 'Eliphaz\'s second speech and Job\'s continued defense'
		},
		readingTimeMinutes: 22
	},
	{
		day: 11,
		date: '2025-01-11',
		passages: [
			{ book: 'Job', chapterStart: 17, chapterEnd: 19, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Period',
			approximateDate: 'c. 2100 BC',
			description: 'Bildad\'s second speech and Job\'s lament'
		},
		readingTimeMinutes: 20
	},
	{
		day: 12,
		date: '2025-01-12',
		passages: [
			{ book: 'Job', chapterStart: 20, chapterEnd: 22, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Period',
			approximateDate: 'c. 2100 BC',
			description: 'Zophar\'s second speech and Job\'s final defense'
		},
		readingTimeMinutes: 24
	},
	{
		day: 13,
		date: '2025-01-13',
		passages: [
			{ book: 'Job', chapterStart: 23, chapterEnd: 25, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Period',
			approximateDate: 'c. 2100 BC',
			description: 'Job\'s desire to speak with God and final words to friends'
		},
		readingTimeMinutes: 18
	},
	{
		day: 14,
		date: '2025-01-14',
		passages: [
			{ book: 'Job', chapterStart: 26, chapterEnd: 31, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Period',
			approximateDate: 'c. 2100 BC',
			description: 'Elihu\'s speeches about God\'s justice'
		},
		readingTimeMinutes: 28
	},
	{
		day: 15,
		date: '2025-01-15',
		passages: [
			{ book: 'Job', chapterStart: 32, chapterEnd: 34, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Period',
			approximateDate: 'c. 2100 BC',
			description: 'Elihu continues his discourse on God\'s wisdom'
		},
		readingTimeMinutes: 20
	},
	{
		day: 16,
		date: '2025-01-16',
		passages: [
			{ book: 'Job', chapterStart: 35, chapterEnd: 37, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Period',
			approximateDate: 'c. 2100 BC',
			description: 'Elihu\'s conclusion and God\'s first response'
		},
		readingTimeMinutes: 22
	},
	{
		day: 17,
		date: '2025-01-17',
		passages: [
			{ book: 'Job', chapterStart: 38, chapterEnd: 39, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Period',
			approximateDate: 'c. 2100 BC',
			description: 'God speaks from the whirlwind, questioning Job'
		},
		readingTimeMinutes: 18
	},
	{
		day: 18,
		date: '2025-01-18',
		passages: [
			{ book: 'Job', chapterStart: 40, chapterEnd: 42, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Period',
			approximateDate: 'c. 2100 BC',
			description: 'God\'s second speech and Job\'s restoration'
		},
		readingTimeMinutes: 24
	},
	{
		day: 19,
		date: '2025-01-19',
		passages: [
			{ book: 'Genesis', chapterStart: 12, chapterEnd: 14, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Period',
			approximateDate: 'c. 2100 BC',
			description: 'Call of Abraham and journey to Canaan; Abram and Sarai in Egypt'
		},
		readingTimeMinutes: 20
	},
	{
		day: 20,
		date: '2025-01-20',
		passages: [
			{ book: 'Genesis', chapterStart: 15, chapterEnd: 16, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Period',
			approximateDate: 'c. 2100 BC',
			description: 'Abrahamic covenant and birth of Ishmael'
		},
		readingTimeMinutes: 18
	},
	{
		day: 21,
		date: '2025-01-21',
		passages: [
			{ book: 'Genesis', chapterStart: 17, chapterEnd: 18, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Period',
			approximateDate: 'c. 2100 BC',
			description: 'Covenant of circumcision and visitation to Abraham'
		},
		readingTimeMinutes: 16
	},
	{
		day: 22,
		date: '2025-01-22',
		passages: [
			{ book: 'Genesis', chapterStart: 19, chapterEnd: 20, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Period',
			approximateDate: 'c. 2100 BC',
			description: 'Destruction of Sodom and Gomorrah; Abraham in Gerar'
		},
		readingTimeMinutes: 22
	},
	{
		day: 23,
		date: '2025-01-23',
		passages: [
			{ book: 'Genesis', chapterStart: 21, chapterEnd: 22, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Period',
			approximateDate: 'c. 2100 BC',
			description: 'Birth of Isaac and binding of Isaac'
		},
		readingTimeMinutes: 15
	},
	{
		day: 24,
		date: '2025-01-24',
		passages: [
			{ book: 'Genesis', chapterStart: 23, chapterEnd: 25, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Period',
			approximateDate: 'c. 2100 BC',
			description: 'Death of Sarah and marriage of Isaac'
		},
		readingTimeMinutes: 18
	},
	{
		day: 25,
		date: '2025-01-25',
		passages: [
			{ book: 'Genesis', chapterStart: 26, chapterEnd: 27, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Period',
			approximateDate: 'c. 2000 BC',
			description: 'Isaac and Abimelech; Jacob obtains Esau\'s birthright'
		},
		readingTimeMinutes: 20
	},
	{
		day: 26,
		date: '2025-01-26',
		passages: [
			{ book: 'Genesis', chapterStart: 28, chapterEnd: 29, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Period',
			approximateDate: 'c. 2000 BC',
			description: 'Jacob\'s ladder and marriages to Leah and Rachel'
		},
		readingTimeMinutes: 22
	},
	{
		day: 27,
		date: '2025-01-27',
		passages: [
			{ book: 'Genesis', chapterStart: 30, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Period',
			approximateDate: 'c. 2000 BC',
			description: 'Jacob\'s family grows with birth of his sons'
		},
		readingTimeMinutes: 16
	},
	{
		day: 28,
		date: '2025-01-28',
		passages: [
			{ book: 'Genesis', chapterStart: 31, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Period',
			approximateDate: 'c. 2000 BC',
			description: 'Jacob flees from Laban and returns to Canaan'
		},
		readingTimeMinutes: 20
	},
	{
		day: 29,
		date: '2025-01-29',
		passages: [
			{ book: 'Genesis', chapterStart: 32, chapterEnd: 33, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Period',
			approximateDate: 'c. 2000 BC',
			description: 'Jacob wrestles with God and meets Esau'
		},
		readingTimeMinutes: 18
	},
	{
		day: 30,
		date: '2025-01-30',
		passages: [
			{ book: 'Genesis', chapterStart: 34, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Period',
			approximateDate: 'c. 2000 BC',
			description: 'Dinah and the Shechem incident'
		},
		readingTimeMinutes: 15
	},
	{
		day: 31,
		date: '2025-01-31',
		passages: [
			{ book: 'Genesis', chapterStart: 35, chapterEnd: 37, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Period',
			approximateDate: 'c. 1900 BC',
			description: 'Jacob returns to Bethel and Joseph\'s dreams'
		},
		readingTimeMinutes: 20
	},
	{
		day: 32,
		date: '2025-02-01',
		passages: [
			{ book: 'Genesis', chapterStart: 38, chapterEnd: 40, testament: 'old' }
		],
			historicalContext: {
			period: 'Patriarchal Period',
			approximateDate: 'c. 2000 BC',
			description: 'Judah\'s moral failure with Tamar highlights the need for redemption; Joseph\'s integrity in Potiphar\'s house and God-given ability to interpret dreams demonstrates God\'s sovereignty over human circumstances, setting up divine providence for Israel\'s preservation in Egypt'
		},
		readingTimeMinutes: 18
	},
	{
		day: 33,
		date: '2025-02-02',
		passages: [
			{ book: 'Genesis', chapterStart: 41, chapterEnd: 42, testament: 'old' }
		],
		historicalContext: {
			period: 'Egyptian Era',
			approximateDate: 'c. 1995 BC',
			description: 'Joseph\'s dramatic rise from prisoner to prime minister demonstrates God\'s providential care; his brothers\' journey to Egypt begins the fulfillment of Jacob\'s prophecy that his family will bow before him, while Joseph\'s forgiveness and restoration showcase Christ-like forgiveness and divine reconciliation'
		},
		readingTimeMinutes: 20
	},
	{
		day: 34,
		date: '2025-02-03',
		passages: [
			{ book: 'Genesis', chapterStart: 43, chapterEnd: 45, testament: 'old' }
		],
		historicalContext: {
			period: 'Egyptian Era',
			approximateDate: 'c. 1990 BC',
			description: 'Joseph\'s dramatic revelation to his brothers demonstrates divine forgiveness and reconciliation; the brothers\' remorse and Joseph\'s gracious welcome showcase God\'s redemptive plan, while Jacob\'s impending move to Egypt fulfills the Abrahamic promise of becoming a great nation in a foreign land'
		},
		readingTimeMinutes: 22
	},
	{
		day: 35,
		date: '2025-02-04',
		passages: [
			{ book: 'Genesis', chapterStart: 46, chapterEnd: 47, testament: 'old' }
		],
		historicalContext: {
			period: 'Egyptian Era',
			approximateDate: 'c. 1985 BC',
			description: 'Jacob\'s family settles in the fertile land of Goshen, establishing the Hebrew presence in Egypt; Joseph\'s wise administration preserves both Egyptians and Israelites during the prolonged famine, demonstrating God\'s providential care and blessing through faithful stewardship in foreign lands'
		},
		readingTimeMinutes: 18
	},
	{
		day: 36,
		date: '2025-02-05',
		passages: [
			{ book: 'Genesis', chapterStart: 48, chapterEnd: 50, testament: 'old' }
		],
		historicalContext: {
			period: 'Egyptian Era',
			approximateDate: 'c. 1980 BC',
			description: 'Jacob\'s final blessings reflect prophetic insight into each tribe\'s future, with particular emphasis on Judah\'s royal line and Joseph\'s fruitfulness; his death in Egypt marks the end of the patriarchal period but assures the continuation of God\'s covenant promises through his descendants in the land of Egypt'
		},
		readingTimeMinutes: 20
	},
	{
		day: 37,
		date: '2025-02-06',
		passages: [
			{ book: 'Exodus', chapterStart: 1, chapterEnd: 3, testament: 'old' }
		],
		historicalContext: {
			period: 'Egyptian Bondage',
			approximateDate: 'c. 1525 BC',
			description: 'The Israelites multiply rapidly under Egyptian oppression, prompting Pharaoh\'s decree to kill Hebrew male infants; Moses\' miraculous preservation and adoption into the Egyptian royal household sets the stage for his future role as deliverer, while his flight to Midian after killing an Egyptian shows his human limitations before divine calling'
		},
		readingTimeMinutes: 19
	},
	{
		day: 38,
		date: '2025-02-07',
		passages: [
			{ book: 'Exodus', chapterStart: 4, chapterEnd: 6, testament: 'old' }
		],
		historicalContext: {
			period: 'Egyptian Bondage',
			approximateDate: 'c. 1445 BC',
			description: 'The burning bush encounter reveals God\'s holy name "I AM" and divine plan for deliverance; Moses\' divine commission at Mount Sinai demonstrates God\'s power to work through reluctant servants, while the initial confrontation with Pharaoh establishes the epic struggle between Yahweh and the Egyptian gods, setting the stage for the ten plagues'
		},
		readingTimeMinutes: 21
	},
	{
		day: 39,
		date: '2025-02-08',
		passages: [
			{ book: 'Exodus', chapterStart: 7, chapterEnd: 10, testament: 'old' }
		],
		historicalContext: {
			period: 'The Exodus',
			approximateDate: 'c. 1446 BC',
			description: 'The final plagues demonstrate Yahweh\'s supremacy over all Egyptian deities, culminating in the devastating Passover that strikes every Egyptian household; the establishment of Passover as an eternal memorial and the Israelites\' preparation for hasty departure highlight themes of divine judgment, redemption through blood, and God\'s faithfulness to His covenant promises'
		},
		readingTimeMinutes: 23
	},
	{
		day: 40,
		date: '2025-02-09',
		passages: [
			{ book: 'Exodus', chapterStart: 11, chapterEnd: 13, testament: 'old' }
		],
		historicalContext: {
			period: 'The Exodus',
			approximateDate: 'c. 1446 BC',
			description: 'The dramatic Exodus showcases God\'s mighty deliverance as He parts the Red Sea, destroying the Egyptian army and leading His people to freedom; this foundational event establishes God as the divine Warrior and Savior, while the journey into the wilderness begins the period of testing and preparation for entering the Promised Land'
		},
		readingTimeMinutes: 20
	},
	{
		day: 41,
		date: '2025-02-10',
		passages: [
			{ book: 'Exodus', chapterStart: 14, chapterEnd: 17, testament: 'old' }
		],
		historicalContext: {
			period: 'Wilderness Wanderings',
			approximateDate: 'c. 1446 BC',
			description: 'God\'s miraculous provision demonstrates His faithfulness amidst testing; the sweetening of bitter waters, daily manna from heaven, quail for meat, and water from the rock reveal God as Provider who sustains His people through impossible circumstances, teaching trust and dependence on divine care'
		},
		readingTimeMinutes: 22
	},
	{
		day: 42,
		date: '2025-02-11',
		passages: [
			{ book: 'Exodus', chapterStart: 18, chapterEnd: 20, testament: 'old' }
		],
		historicalContext: {
			period: 'Wilderness Wanderings',
			approximateDate: 'c. 1446 BC',
			description: 'Jethro\'s wise counsel leads to Moses delegating leadership authority, establishing a model of shared governance that prevents burnout and ensures effective justice; the arrival at Mount Sinai prepares the people for receiving God\'s law, demonstrating the importance of godly leadership and organizational wisdom'
		},
		readingTimeMinutes: 18
	},
	{
		day: 43,
		date: '2025-02-12',
		passages: [
			{ book: 'Exodus', chapterStart: 21, chapterEnd: 24, testament: 'old' }
		],
		historicalContext: {
			period: 'Mount Sinai',
			approximateDate: 'c. 1446 BC',
			description: 'The giving of the Ten Commandments establishes God\'s moral law and covenant relationship with Israel; thunder, lightning, and trumpet sounds demonstrate God\'s awesome holiness, while the comprehensive laws cover worship, justice, and daily life, providing a foundation for righteous living and national identity'
		},
		readingTimeMinutes: 25
	},
	{
		day: 44,
		date: '2025-02-13',
		passages: [
			{ book: 'Exodus', chapterStart: 25, chapterEnd: 27, testament: 'old' }
		],
		historicalContext: {
			period: 'Mount Sinai',
			approximateDate: 'c. 1446 BC',
			description: 'Detailed instructions for the Tabernacle reveal God\'s desire to dwell among His people; the precious materials and skilled craftsmanship reflect the value of worship, while the free-will offerings demonstrate generous hearts responding to God\'s invitation to participate in His divine plan'
		},
		readingTimeMinutes: 20
	},
	{
		day: 45,
		date: '2025-02-14',
		passages: [
			{ book: 'Exodus', chapterStart: 28, chapterEnd: 31, testament: 'old' }
		],
		historicalContext: {
			period: 'Mount Sinai',
			approximateDate: 'c. 1446 BC',
			description: 'The consecration of priests and completion of the Tabernacle establish the formal worship system; Aaron\'s priestly garments represent the beauty of holiness and intercession, while the finished Tabernacle becomes God\'s dwelling place among Israel, foreshadowing Christ as our High Priest and the Church as God\'s temple'
		},
		readingTimeMinutes: 22
	},
	{
		day: 46,
		date: '2025-02-15',
		passages: [
			{ book: 'Exodus', chapterStart: 32, chapterEnd: 34, testament: 'old' }
		],
		historicalContext: {
			period: 'Mount Sinai',
			approximateDate: 'c. 1446 BC',
			description: 'The golden calf incident reveals Israel\'s quick fall into idolatry despite witnessing God\'s power; Moses\' passionate intercession demonstrates effective mediation that preserves God\'s people, while God\'s reaffirmation of His presence shows divine mercy and faithfulness to His covenant despite human failure'
		},
		readingTimeMinutes: 19
	},
	{
		day: 47,
		date: '2025-02-16',
		passages: [
			{ book: 'Exodus', chapterStart: 35, chapterEnd: 40, testament: 'old' }
		],
		historicalContext: {
			period: 'Wilderness Wanderings',
			approximateDate: 'c. 1445 BC',
			description: 'The Tabernacle\'s erection and God\'s glorious presence demonstrate His desire to dwell among His people; the beginning of sacrificial worship establishes the pattern of approaching God through atonement, foreshadowing Christ\'s ultimate sacrifice and the indwelling presence of the Holy Spirit in believers'
		},
		readingTimeMinutes: 24
	},
	{
		day: 48,
		date: '2025-02-17',
		passages: [
			{ book: 'Leviticus', chapterStart: 1, chapterEnd: 4, testament: 'old' }
		],
		historicalContext: {
			period: 'Mount Sinai',
			approximateDate: 'c. 1445 BC',
			description: 'The detailed sacrificial laws reveal God\'s holiness and the seriousness of sin, while providing the means for restoration; the consecration of priests establishes the mediatorial role that foreshadows Christ\'s priesthood, and the clean/unclean distinctions teach principles of holiness that apply to spiritual purity'
		},
		readingTimeMinutes: 21
	},
	{
		day: 49,
		date: '2025-02-18',
		passages: [
			{ book: 'Leviticus', chapterStart: 5, chapterEnd: 7, testament: 'old' }
		],
		historicalContext: {
			period: 'Mount Sinai',
			approximateDate: 'c. 1445 BC',
			description: 'Guilt offerings, priestly portions, and laws of ceremonial purity'
		},
		readingTimeMinutes: 18
	},
	{
		day: 50,
		date: '2025-02-19',
		passages: [
			{ book: 'Leviticus', chapterStart: 8, chapterEnd: 10, testament: 'old' }
		],
		historicalContext: {
			period: 'Mount Sinai',
			approximateDate: 'c. 1445 BC',
			description: 'Priesthood consecrated, Nadab and Abihu judged, dietary laws established'
		},
		readingTimeMinutes: 20
	},
	{
		day: 51,
		date: '2025-02-20',
		passages: [
			{ book: 'Leviticus', chapterStart: 11, chapterEnd: 13, testament: 'old' }
		],
		historicalContext: {
			period: 'Mount Sinai',
			approximateDate: 'c. 1445 BC',
			description: 'Clean and unclean animals, purification after childbirth, and laws of leprosy'
		},
		readingTimeMinutes: 19
	},
	{
		day: 52,
		date: '2025-02-21',
		passages: [
			{ book: 'Leviticus', chapterStart: 14, chapterEnd: 16, testament: 'old' }
		],
		historicalContext: {
			period: 'Mount Sinai',
			approximateDate: 'c. 1445 BC',
			description: 'Day of Atonement, blood regulations, and sexual morality laws'
		},
		readingTimeMinutes: 22
	},
	{
		day: 53,
		date: '2025-02-22',
		passages: [
			{ book: 'Leviticus', chapterStart: 17, chapterEnd: 20, testament: 'old' }
		],
		historicalContext: {
			period: 'Mount Sinai',
			approximateDate: 'c. 1445 BC',
			description: 'Sacrificial and dietary laws, priestly conduct, and Year of Jubilee'
		},
		readingTimeMinutes: 21
	},
	{
		day: 54,
		date: '2025-02-23',
		passages: [
			{ book: 'Leviticus', chapterStart: 21, chapterEnd: 23, testament: 'old' }
		],
		historicalContext: {
			period: 'Mount Sinai',
			approximateDate: 'c. 1445 BC',
			description: 'Festival calendar, laws for priests, and Sabbath year regulations'
		},
		readingTimeMinutes: 18
	},
	{
		day: 55,
		date: '2025-02-24',
		passages: [
			{ book: 'Leviticus', chapterStart: 24, chapterEnd: 27, testament: 'old' }
		],
		historicalContext: {
			period: 'Mount Sinai',
			approximateDate: 'c. 1445 BC',
			description: 'Blessings and curses, vows and tithes, conclusion of covenant laws'
		},
		readingTimeMinutes: 23
	},
	{
		day: 56,
		date: '2025-02-25',
		passages: [
			{ book: 'Numbers', chapterStart: 1, chapterEnd: 3, testament: 'old' }
		],
		historicalContext: {
			period: 'Wilderness Wanderings',
			approximateDate: 'c. 1444 BC',
			description: 'Census of Israel, organization of tribes, and Levitical duties'
		},
		readingTimeMinutes: 20
	},
	{
		day: 57,
		date: '2025-02-26',
		passages: [
			{ book: 'Numbers', chapterStart: 4, chapterEnd: 6, testament: 'old' }
		],
		historicalContext: {
			period: 'Wilderness Wanderings',
			approximateDate: 'c. 1444 BC',
			description: 'Nazirite vow, Tabernacle offerings, and Levitical purification'
		},
		readingTimeMinutes: 18
	},
	{
		day: 58,
		date: '2025-02-27',
		passages: [
			{ book: 'Numbers', chapterStart: 7, chapterEnd: 9, testament: 'old' }
		],
		historicalContext: {
			period: 'Wilderness Wanderings',
			approximateDate: 'c. 1444 BC',
			description: 'Dedication of altar, Passover celebration, and cloud guidance'
		},
		readingTimeMinutes: 16
	},
	{
		day: 59,
		date: '2025-02-28',
		passages: [
			{ book: 'Numbers', chapterStart: 10, chapterEnd: 12, testament: 'old' }
		],
		historicalContext: {
			period: 'Wilderness Wanderings',
			approximateDate: 'c. 1442 BC',
			description: 'Silver trumpets, departure from Sinai, and complaints about food'
		},
		readingTimeMinutes: 19
	},
	{
		day: 60,
		date: '2025-03-01',
		passages: [
			{ book: 'Numbers', chapterStart: 13, chapterEnd: 14, testament: 'old' }
		],
		historicalContext: {
			period: 'Wilderness Wanderings',
			approximateDate: 'c. 1442 BC',
			description: 'Twelve spies sent to Canaan, majority report brings fear and rebellion'
		},
		readingTimeMinutes: 17
	},
	{
		day: 61,
		date: '2025-03-02',
		passages: [
			{ book: 'Numbers', chapterStart: 15, chapterEnd: 16, testament: 'old' }
		],
		historicalContext: {
			period: 'Wilderness Wanderings',
			approximateDate: 'c. 1442 BC',
			description: 'Rebellion punished, Korah\'s rebellion, and Aaron\'s rod buds'
		},
		readingTimeMinutes: 20
	},
	{
		day: 62,
		date: '2025-03-03',
		passages: [
			{ book: 'Numbers', chapterStart: 17, chapterEnd: 19, testament: 'old' }
		],
		historicalContext: {
			period: 'Wilderness Wanderings',
			approximateDate: 'c. 1440 BC',
			description: 'Red heifer purification, Moses strikes the rock, and bronze serpent'
		},
		readingTimeMinutes: 18
	},
	{
		day: 63,
		date: '2025-03-04',
		passages: [
			{ book: 'Numbers', chapterStart: 20, chapterEnd: 22, testament: 'old' }
		],
		historicalContext: {
			period: 'Wilderness Wanderings',
			approximateDate: 'c. 1400 BC',
			description: 'Victory over Arad, fiery serpents, and journey toward Moab'
		},
		readingTimeMinutes: 21
	},
	{
		day: 64,
		date: '2025-03-05',
		passages: [
			{ book: 'Numbers', chapterStart: 23, chapterEnd: 25, testament: 'old' }
		],
		historicalContext: {
			period: 'Plains of Moab',
			approximateDate: 'c. 1400 BC',
			description: 'Balaam hired to curse Israel, God speaks through donkey, blessings instead'
		},
		readingTimeMinutes: 23
	},
	{
		day: 65,
		date: '2025-03-06',
		passages: [
			{ book: 'Numbers', chapterStart: 26, chapterEnd: 28, testament: 'old' }
		],
		historicalContext: {
			period: 'Plains of Moab',
			approximateDate: 'c. 1400 BC',
			description: 'Second census, inheritance laws, and Joshua appointed as leader'
		},
		readingTimeMinutes: 19
	},
	{
		day: 66,
		date: '2025-03-07',
		passages: [
			{ book: 'Numbers', chapterStart: 29, chapterEnd: 31, testament: 'old' }
		],
		historicalContext: {
			period: 'Plains of Moab',
			approximateDate: 'c. 1400 BC',
			description: 'Vows and offerings, battle against Midian, and tribal territories'
		},
		readingTimeMinutes: 20
	},
	{
		day: 67,
		date: '2025-03-08',
		passages: [
			{ book: 'Numbers', chapterStart: 32, chapterEnd: 33, testament: 'old' }
		],
		historicalContext: {
			period: 'Plains of Moab',
			approximateDate: 'c. 1400 BC',
			description: 'Review of wilderness journey, boundaries of Canaan, and cities of refuge'
		},
		readingTimeMinutes: 16
	},
	{
		day: 68,
		date: '2025-03-09',
		passages: [
			{ book: 'Numbers', chapterStart: 34, chapterEnd: 36, testament: 'old' }
		],
		historicalContext: {
			period: 'Plains of Moab',
			approximateDate: 'c. 1400 BC',
			description: 'Tribal allotments, Levitical cities, and daughters of Zelophehad'
		},
		readingTimeMinutes: 18
	},
	{
		day: 69,
		date: '2025-03-10',
		passages: [
			{ book: 'Deuteronomy', chapterStart: 1, chapterEnd: 4, testament: 'old' }
		],
		historicalContext: {
			period: 'Plains of Moab',
			approximateDate: 'c. 1400 BC',
			description: 'Moses\' first address, review of wilderness journey, and call to obedience'
		},
		readingTimeMinutes: 22
	},
	{
		day: 70,
		date: '2025-03-11',
		passages: [
			{ book: 'Deuteronomy', chapterStart: 5, chapterEnd: 7, testament: 'old' }
		],
		historicalContext: {
			period: 'Plains of Moab',
			approximateDate: 'c. 1400 BC',
			description: 'Ten Commandments restated, call to love God, and warning against idolatry'
		},
		readingTimeMinutes: 19
	},
	{
		day: 71,
		date: '2025-03-12',
		passages: [
			{ book: 'Deuteronomy', chapterStart: 8, chapterEnd: 10, testament: 'old' }
		],
		historicalContext: {
			period: 'Plains of Moab',
			approximateDate: 'c. 1400 BC',
			description: 'Remember God\'s provision, warning against pride, and blessings for obedience'
		},
		readingTimeMinutes: 21
	},
	{
		day: 72,
		date: '2025-03-13',
		passages: [
			{ book: 'Deuteronomy', chapterStart: 11, chapterEnd: 13, testament: 'old' }
		],
		historicalContext: {
			period: 'Plains of Moab',
			approximateDate: 'c. 1400 BC',
			description: 'Love and obey God, false prophets, and clean and unclean foods'
		},
		readingTimeMinutes: 18
	},
	{
		day: 73,
		date: '2025-03-14',
		passages: [
			{ book: 'Deuteronomy', chapterStart: 14, chapterEnd: 16, testament: 'old' }
		],
		historicalContext: {
			period: 'Plains of Moab',
			approximateDate: 'c. 1400 BC',
			description: 'Tithes and offerings, Sabbath year, three annual feasts, and justice system'
		},
		readingTimeMinutes: 23
	},
	{
		day: 74,
		date: '2025-03-15',
		passages: [
			{ book: 'Deuteronomy', chapterStart: 17, chapterEnd: 18, testament: 'old' }
		],
		historicalContext: {
			period: 'Plains of Moab',
			approximateDate: 'c. 1400 BC',
			description: 'Legal decisions, kingship laws, and provision for priests and prophets'
		},
		readingTimeMinutes: 20
	},
	{
		day: 75,
		date: '2025-03-16',
		passages: [
			{ book: 'Deuteronomy', chapterStart: 19, chapterEnd: 21, testament: 'old' }
		],
		historicalContext: {
			period: 'Plains of Moab',
			approximateDate: 'c. 1400 BC',
			description: 'Cities of refuge, laws of evidence, warfare regulations, and treatment of trees'
		},
		readingTimeMinutes: 19
	},
	{
		day: 76,
		date: '2025-03-17',
		passages: [
			{ book: 'Deuteronomy', chapterStart: 22, chapterEnd: 24, testament: 'old' }
		],
		historicalContext: {
			period: 'Plains of Moab',
			approximateDate: 'c. 1400 BC',
			description: 'Marriage and family laws, protection for the vulnerable, and miscellaneous laws'
		},
		readingTimeMinutes: 21
	},
	{
		day: 77,
		date: '2025-03-18',
		passages: [
			{ book: 'Deuteronomy', chapterStart: 25, chapterEnd: 27, testament: 'old' }
		],
		historicalContext: {
			period: 'Plains of Moab',
			approximateDate: 'c. 1400 BC',
			description: 'Firstfruits and tithes, covenant renewal ceremony, blessings and curses'
		},
		readingTimeMinutes: 18
	},
	{
		day: 78,
		date: '2025-03-19',
		passages: [
			{ book: 'Deuteronomy', chapterStart: 28, chapterEnd: 30, testament: 'old' }
		],
		historicalContext: {
			period: 'Plains of Moab',
			approximateDate: 'c. 1400 BC',
			description: 'Covenant blessings, consequences of disobedience, and call to choose life'
		},
		readingTimeMinutes: 20
	},
	{
		day: 79,
		date: '2025-03-20',
		passages: [
			{ book: 'Deuteronomy', chapterStart: 31, chapterEnd: 34, testament: 'old' }
		],
		historicalContext: {
			period: 'Plains of Moab',
			approximateDate: 'c. 1400 BC',
			description: 'Moses blesses the tribes, song of Moses, and final charge to Israel'
		},
		readingTimeMinutes: 22
	},
	{
		day: 80,
		date: '2025-03-21',
		passages: [
			{ book: 'Deuteronomy', chapterStart: 35, chapterEnd: 36, testament: 'old' }
		],
		historicalContext: {
			period: 'Plains of Moab',
			approximateDate: 'c. 1400 BC',
			description: 'Moses views Promised Land, death of Moses, and succession of Joshua'
		},
		readingTimeMinutes: 15
	},
	{
		day: 81,
		date: '2025-03-22',
		passages: [
			{ book: 'Joshua', chapterStart: 1, chapterEnd: 3, testament: 'old' }
		],
		historicalContext: {
			period: 'Conquest of Canaan',
			approximateDate: 'c. 1400 BC',
			description: 'God commissions Joshua, spies sent to Jericho, and crossing the Jordan'
		},
		readingTimeMinutes: 18
	},
	{
		day: 82,
		date: '2025-03-23',
		passages: [
			{ book: 'Joshua', chapterStart: 4, chapterEnd: 6, testament: 'old' }
		],
		historicalContext: {
			period: 'Conquest of Canaan',
			approximateDate: 'c. 1400 BC',
			description: 'Memorial stones, circumcision renewed, Passover celebrated, commander appears'
		},
		readingTimeMinutes: 20
	},
	{
		day: 83,
		date: '2025-03-24',
		passages: [
			{ book: 'Joshua', chapterStart: 7, chapterEnd: 9, testament: 'old' }
		],
		historicalContext: {
			period: 'Conquest of Canaan',
			approximateDate: 'c. 1400 BC',
			description: 'Victory at Jericho, sin at Ai, conquest of southern Canaan'
		},
		readingTimeMinutes: 22
	},
	{
		day: 84,
		date: '2025-03-25',
		passages: [
			{ book: 'Joshua', chapterStart: 10, chapterEnd: 12, testament: 'old' }
		],
		historicalContext: {
			period: 'Conquest of Canaan',
			approximateDate: 'c. 1390 BC',
			description: 'Northern campaign, kings defeated, land distribution begins',
		},
		readingTimeMinutes: 19
	},
	{
		day: 85,
		date: '2025-03-26',
		passages: [
			{ book: 'Joshua', chapterStart: 13, chapterEnd: 15, testament: 'old' }
		],
		historicalContext: {
			period: 'Settlement of Canaan',
			approximateDate: 'c. 1380 BC',
			description: 'Caleb inherits Hebron, land allotment continues, cities of refuge established'
		},
		readingTimeMinutes: 21
	},
	{
		day: 86,
		date: '2025-03-27',
		passages: [
			{ book: 'Joshua', chapterStart: 16, chapterEnd: 18, testament: 'old' }
		],
		historicalContext: {
			period: 'Settlement of Canaan',
			approximateDate: 'c. 1370 BC',
			description: 'Allocation for Joseph\'s tribes, boundaries for remaining tribes, Levitical cities'
		},
		readingTimeMinutes: 18
	},
	{
		day: 87,
		date: '2025-03-28',
		passages: [
			{ book: 'Joshua', chapterStart: 19, chapterEnd: 21, testament: 'old' }
		],
		historicalContext: {
			period: 'Settlement of Canaan',
			approximateDate: 'c. 1360 BC',
			description: 'Six cities of refuge, more Levitical cities, eastern tribes return home'
		},
		readingTimeMinutes: 17
	},
	{
		day: 88,
		date: '2025-03-29',
		passages: [
			{ book: 'Joshua', chapterStart: 22, chapterEnd: 24, testament: 'old' }
		],
		historicalContext: {
			period: 'Settlement of Canaan',
			approximateDate: 'c. 1350 BC',
			description: 'Eastern tribes altar, Joshua\'s farewell address, covenant renewal at Shechem'
		},
		readingTimeMinutes: 19
	},
	{
		day: 89,
		date: '2025-03-30',
		passages: [
			{ book: 'Judges', chapterStart: 1, chapterEnd: 3, testament: 'old' }
		],
		historicalContext: {
			period: 'Judges Period',
			approximateDate: 'c. 1340 BC',
			description: 'Israel\'s failure to drive out Canaanites, cycle of sin and deliverance begins'
		},
		readingTimeMinutes: 20
	},
	{
		day: 90,
		date: '2025-03-31',
		passages: [
			{ book: 'Judges', chapterStart: 4, chapterEnd: 6, testament: 'old' }
		],
		historicalContext: {
			period: 'Judges Period',
			approximateDate: 'c. 1320 BC',
			description: 'Deborah and Barak deliver Israel, Gideon called, testing with fleece'
		},
		readingTimeMinutes: 22
	}
];

// Biblehub chronological timeline data extracted from https://biblehub.com/timeline/
const biblehubChronologicalEvents: DailyReading[] = [
	{
		day: 1,
		date: 'Day 1',
		passages: [
			{ book: 'John', chapterStart: 1, testament: 'new' }
		],
		historicalContext: {
			period: 'Eternal Past',
			approximateDate: 'Before Time',
			description: 'In the Beginning was the Word - The eternal existence of Christ before creation'
		},
		readingTimeMinutes: 10
	},
	{
		day: 2,
		date: 'Day 2',
		passages: [
			{ book: 'Genesis', chapterStart: 1, testament: 'old' }
		],
		historicalContext: {
			period: 'Creation Week',
			approximateDate: 'Before 4000 BC',
			description: 'The Creation - Six days of divine creation of the universe and earth'
		},
		readingTimeMinutes: 15
	},
	{
		day: 3,
		date: 'Day 3',
		passages: [
			{ book: 'Genesis', chapterStart: 2, testament: 'old' }
		],
		historicalContext: {
			period: 'Creation Week',
			approximateDate: 'Before 4000 BC',
			description: 'The Garden of Eden - The perfect state of humanity before the fall'
		},
		readingTimeMinutes: 12
	},
	{
		day: 4,
		date: 'Day 4',
		passages: [
			{ book: 'Genesis', chapterStart: 3, testament: 'old' }
		],
		historicalContext: {
			period: 'The Fall',
			approximateDate: 'Before 4000 BC',
			description: 'The Fall of Man - The entry of sin into the world through Adam and Eve'
		},
		readingTimeMinutes: 14
	},
	{
		day: 5,
		date: 'Day 5',
		passages: [
			{ book: 'Genesis', chapterStart: 4, testament: 'old' }
		],
		historicalContext: {
			period: 'Early Post-Fall Period',
			approximateDate: 'Before 3000 BC',
			description: 'Cain kills Abel - The first murder and beginning of human violence'
		},
		readingTimeMinutes: 10
	},
	{
		day: 6,
		date: 'Day 6',
		passages: [
			{ book: 'Genesis', chapterStart: 5, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: 'Before 3000 BC',
			description: 'From Adam to Noah - The genealogies leading from Adam to Noah'
		},
		readingTimeMinutes: 12
	},
	{
		day: 7,
		date: 'Day 7',
		passages: [
			{ book: 'Genesis', chapterStart: 6, testament: 'old' }
		],
		historicalContext: {
			period: 'Pre-Flood Judgment',
			approximateDate: 'Before 2500 BC',
			description: 'Wickedness Provokes God\'s wrath - The corruption that leads to the flood'
		},
		readingTimeMinutes: 14
	},
	{
		day: 8,
		date: 'Day 8',
		passages: [
			{ book: 'Genesis', chapterStart: 7, testament: 'old' }
		],
		historicalContext: {
			period: 'The Flood',
			approximateDate: 'Before 2500 BC',
			description: 'The Great Flood - God\'s judgment on the wicked world'
		},
		readingTimeMinutes: 16
	},
	{
		day: 9,
		date: 'Day 9',
		passages: [
			{ book: 'Genesis', chapterStart: 8, testament: 'old' }
		],
		historicalContext: {
			period: 'Post-Flood',
			approximateDate: 'Before 2500 BC',
			description: 'The Flood Subsides - The beginning of the new world after the flood'
		},
		readingTimeMinutes: 12
	},
	{
		day: 10,
		date: 'Day 10',
		passages: [
			{ book: 'Genesis', chapterStart: 9, testament: 'old' }
		],
		historicalContext: {
			period: 'Post-Flood Covenant',
			approximateDate: 'Before 2500 BC',
			description: 'Covenant of the Rainbow - God\'s promise to never again destroy the earth with water'
		},
		readingTimeMinutes: 10
	},
	{
		day: 11,
		date: 'Day 11',
		passages: [
			{ book: 'Genesis', chapterStart: 10, testament: 'old' }
		],
		historicalContext: {
			period: 'Table of Nations',
			approximateDate: 'Before 2500 BC',
			description: 'Shem, Ham and Japheth - The dispersion of Noah\'s sons and the nations that descend from them'
		},
		readingTimeMinutes: 14
	},
	{
		day: 12,
		date: 'Day 12',
		passages: [
			{ book: 'Job', chapterStart: 1, chapterEnd: 5, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: 'Before 2100 BC',
			description: 'Job\'s Suffering and Faith - The testing of Job\'s faith amidst extreme suffering'
		},
		readingTimeMinutes: 25
	},
	{
		day: 13,
		date: 'Day 13',
		passages: [
			{ book: 'Job', chapterStart: 6, chapterEnd: 10, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: 'Before 2100 BC',
			description: 'Job\'s dialogue with friends - The theological discourse on human suffering'
		},
		readingTimeMinutes: 20
	},
	{
		day: 14,
		date: 'Day 14',
		passages: [
			{ book: 'Job', chapterStart: 11, chapterEnd: 15, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: 'Before 2100 BC',
			description: 'Continued debate on suffering - Job\'s defense against his friends\' accusations'
		},
		readingTimeMinutes: 22
	},
	{
		day: 15,
		date: 'Day 15',
		passages: [
			{ book: 'Job', chapterStart: 16, chapterEnd: 20, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: 'Before 2100 BC',
			description: 'More friends speak - Additional speeches about Job\'s supposed guilt'
		},
		readingTimeMinutes: 20
	},
	{
		day: 16,
		date: 'Day 16',
		passages: [
			{ book: 'Job', chapterStart: 21, chapterEnd: 25, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: 'Before 2100 BC',
			description: 'Job\'s final defense - His desire to present his case directly to God'
		},
		readingTimeMinutes: 18
	},
	{
		day: 17,
		date: 'Day 17',
		passages: [
			{ book: 'Job', chapterStart: 26, chapterEnd: 31, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: 'Before 2100 BC',
			description: 'Elihu speaks - A young man\'s perspective on God\'s justice and wisdom'
		},
		readingTimeMinutes: 24
	},
	{
		day: 18,
		date: 'Day 18',
		passages: [
			{ book: 'Job', chapterStart: 32, chapterEnd: 37, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: 'Before 2100 BC',
			description: 'Elihu concludes and God speaks - God answers Job out of the whirlwind'
		},
		readingTimeMinutes: 22
	},
	{
		day: 19,
		date: 'Day 19',
		passages: [
			{ book: 'Job', chapterStart: 38, chapterEnd: 42, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: 'Before 2100 BC',
			description: 'God\'s speech and Job\'s restoration - God\'s revelation of His power and Job\'s restoration'
		},
		readingTimeMinutes: 20
	},
	{
		day: 20,
		date: 'Day 20',
		passages: [
			{ book: 'Genesis', chapterStart: 11, testament: 'old' }
		],
		historicalContext: {
			period: 'Post-Flood Rebellion',
			approximateDate: 'Before 2100 BC',
			description: 'The Tower of Babel - Human rebellion and the confusion of languages'
		},
		readingTimeMinutes: 14
	},
	{
		day: 21,
		date: 'Day 21',
		passages: [
			{ book: 'Genesis', chapterStart: 12, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: '2091 BC',
			description: 'God Sends Abram to Egypt - The call of Abram and journey to Canaan'
		},
		readingTimeMinutes: 16
	},
	{
		day: 22,
		date: 'Day 22',
		passages: [
			{ book: 'Genesis', chapterStart: 13, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: '2085 BC',
			description: 'Abram and Lot Part Ways - The separation due to land and resources'
		},
		readingTimeMinutes: 15
	},
	{
		day: 23,
		date: 'Day 23',
		passages: [
			{ book: 'Genesis', chapterStart: 14, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: '2084 BC',
			description: 'Abram Rescues Lot - The battle of the kings and rescue of Lot from captivity'
		},
		readingTimeMinutes: 18
	},
	{
		day: 24,
		date: 'Day 24',
		passages: [
			{ book: 'Genesis', chapterStart: 15, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: '2081 BC',
			description: 'God\'s Covenant with Abram - The promise of numerous descendants and the land of Canaan'
		},
		readingTimeMinutes: 14
	},
	{
		day: 25,
		date: 'Day 25',
		passages: [
			{ book: 'Genesis', chapterStart: 16, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: '2081 BC',
			description: 'Sarai and Hagar - The birth of Ishmael through Hagar'
		},
		readingTimeMinutes: 12
	},
	{
		day: 26,
		date: 'Day 26',
		passages: [
			{ book: 'Genesis', chapterStart: 17, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: '2067 BC',
			description: 'The Covenant of Circumcision - The sign of God\'s covenant with Abraham'
		},
		readingTimeMinutes: 15
	},
	{
		day: 27,
		date: 'Day 27',
		passages: [
			{ book: 'Genesis', chapterStart: 18, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: '2067 BC',
			description: 'God Promises the Birth of Isaac - The visit of the three angels and promise of a son'
		},
		readingTimeMinutes: 16
	},
	{
		day: 28,
		date: 'Day 28',
		passages: [
			{ book: 'Genesis', chapterStart: 19, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: '2067 BC',
			description: 'The Destruction of Sodom - Judgment on the wicked cities of the plain'
		},
		readingTimeMinutes: 20
	},
	{
		day: 29,
		date: 'Day 29',
		passages: [
			{ book: 'Genesis', chapterStart: 20, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: '2067 BC',
			description: 'Abraham, Sarah and Abimelech - Abraham\'s deception in Gerar and God\'s protection'
		},
		readingTimeMinutes: 12
	},
	{
		day: 30,
		date: 'Day 30',
		passages: [
			{ book: 'Genesis', chapterStart: 21, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: '2066 BC',
			description: 'Isaac Born - The fulfillment of God\'s promise to Abraham and Sarah'
		},
		readingTimeMinutes: 14
	},
	{
		day: 31,
		date: 'Day 31',
		passages: [
			{ book: 'Genesis', chapterStart: 22, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: '2054 BC',
			description: 'The Offering of Isaac - Abraham\'s test of faith on Mount Moriah'
		},
		readingTimeMinutes: 12
	}
];

// Correct Logos reading plan data extracted from https://www.logos.com/grow/nook-chronological-bible-reading-plan/
const logosChronologicalReadings: DailyReading[] = [
	{
		day: 1,
		date: 'Day 1',
		passages: [
			{ book: 'Genesis', chapterStart: 1, chapterEnd: 3, testament: 'old' }
		],
		historicalContext: {
			period: 'Creation Era',
			approximateDate: 'c. 4000 BC',
			description: 'The Creation and the Fall - Creation of the universe, humanity, and the entry of sin'
		},
		readingTimeMinutes: 25
	},
	{
		day: 2,
		date: 'Day 2',
		passages: [
			{ book: 'Genesis', chapterStart: 4, chapterEnd: 7, testament: 'old' }
		],
		historicalContext: {
			period: 'Early Humanity',
			approximateDate: 'c. 3900 BC',
			description: 'Cain and Abel, the line of Cain, and the wickedness that provokes God\'s wrath'
		},
		readingTimeMinutes: 20
	},
	{
		day: 3,
		date: 'Day 3',
		passages: [
			{ book: 'Genesis', chapterStart: 8, chapterEnd: 11, testament: 'old' }
		],
		historicalContext: {
			period: 'Post-Flood Era',
			approximateDate: 'c. 2500 BC',
			description: 'The Great Flood subsides, Noah\'s covenant, and the Tower of Babel'
		},
		readingTimeMinutes: 22
	},
	{
		day: 4,
		date: 'Day 4',
		passages: [
			{ book: 'Job', chapterStart: 1, chapterEnd: 5, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: 'c. 2100 BC',
			description: 'Job\'s suffering begins - The testing of Job\'s faith and the first cycle of dialogue'
		},
		readingTimeMinutes: 18
	},
	{
		day: 5,
		date: 'Day 5',
		passages: [
			{ book: 'Job', chapterStart: 6, chapterEnd: 9, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: 'c. 2100 BC',
			description: 'Job\'s suffering continues - The second cycle of dialogue with friends'
		},
		readingTimeMinutes: 16
	},
	{
		day: 6,
		date: 'Day 6',
		passages: [
			{ book: 'Job', chapterStart: 10, chapterEnd: 13, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: 'c. 2100 BC',
			description: 'Job\'s response and the third cycle of dialogue with friends'
		},
		readingTimeMinutes: 17
	},
	{
		day: 7,
		date: 'Day 7',
		passages: [
			{ book: 'Job', chapterStart: 14, chapterEnd: 16, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: 'c. 2100 BC',
			description: 'Job\'s final response and the speeches of Eliphaz and Bildad'
		},
		readingTimeMinutes: 15
	},
	{
		day: 8,
		date: 'Day 8',
		passages: [
			{ book: 'Job', chapterStart: 17, chapterEnd: 20, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: 'c. 2100 BC',
			description: 'Job\'s lament continues and the final words of Zophar and Eliphaz'
		},
		readingTimeMinutes: 16
	},
	{
		day: 9,
		date: 'Day 9',
		passages: [
			{ book: 'Job', chapterStart: 21, chapterEnd: 23, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: 'c. 2100 BC',
			description: 'Job\'s final defense and the response of Eliphaz'
		},
		readingTimeMinutes: 14
	},
	{
		day: 10,
		date: 'Day 10',
		passages: [
			{ book: 'Job', chapterStart: 24, chapterEnd: 28, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: 'c. 2100 BC',
			description: 'Bildal\'s final speech, Job\'s discourse on wisdom, and his continued defense'
		},
		readingTimeMinutes: 18
	},
	{
		day: 11,
		date: 'Day 11',
		passages: [
			{ book: 'Job', chapterStart: 29, chapterEnd: 31, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: 'c. 2100 BC',
			description: 'Job\'s final words and the Elihu\'s speeches begin'
		},
		readingTimeMinutes: 16
	},
	{
		day: 12,
		date: 'Day 12',
		passages: [
			{ book: 'Job', chapterStart: 32, chapterEnd: 34, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: 'c. 2100 BC',
			description: 'Elihu continues his discourse and Job prepares for God\'s response'
		},
		readingTimeMinutes: 15
	},
	{
		day: 13,
		date: 'Day 13',
		passages: [
			{ book: 'Job', chapterStart: 35, chapterEnd: 37, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: 'c. 2100 BC',
			description: 'Elihu concludes and God speaks to Job from the whirlwind'
		},
		readingTimeMinutes: 14
	},
	{
		day: 14,
		date: 'Day 14',
		passages: [
			{ book: 'Job', chapterStart: 38, chapterEnd: 39, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: 'c. 2100 BC',
			description: 'God continues His discourse on creation and the natural world'
		},
		readingTimeMinutes: 15
	},
	{
		day: 15,
		date: 'Day 15',
		passages: [
			{ book: 'Job', chapterStart: 40, chapterEnd: 42, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: 'c. 2100 BC',
			description: 'God concludes His discourse, Job repents, and God restores Job\'s fortunes'
		},
		readingTimeMinutes: 18
	},
	{
		day: 16,
		date: 'Day 16',
		passages: [
			{ book: 'Genesis', chapterStart: 12, chapterEnd: 15, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: '2091 BC',
			description: 'God\'s call to Abram, the journey to Egypt, and the Abrahamic covenant'
		},
		readingTimeMinutes: 20
	},
	{
		day: 17,
		date: 'Day 17',
		passages: [
			{ book: 'Genesis', chapterStart: 16, chapterEnd: 18, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: '2085 BC',
			description: 'Hagar and Ishmael, the covenant of circumcision, and the destruction of Sodom'
		},
		readingTimeMinutes: 18
	},
	{
		day: 18,
		date: 'Day 18',
		passages: [
			{ book: 'Genesis', chapterStart: 19, chapterEnd: 21, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: '2080 BC',
			description: 'Lot\'s escape, Abraham and Abimelech, and the birth of Isaac'
		},
		readingTimeMinutes: 17
	},
	{
		day: 19,
		date: 'Day 19',
		passages: [
			{ book: 'Genesis', chapterStart: 22, chapterEnd: 24, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: '2070 BC',
			description: 'The binding of Isaac, Sarah\'s death, and the marriage of Isaac and Rebekah'
		},
		readingTimeMinutes: 19
	},
	{
		day: 20,
		date: 'Day 20',
		passages: [
			{ book: 'Genesis', chapterStart: 25, chapterEnd: 26, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: '2060 BC',
			description: 'Abraham\'s death, Jacob and Esau, and Isaac among the Philistines'
		},
		readingTimeMinutes: 16
	},
	{
		day: 21,
		date: 'Day 21',
		passages: [
			{ book: 'Genesis', chapterStart: 27, chapterEnd: 29, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: '2050 BC',
			description: 'Jacob obtains Esau\'s blessing, Jacob\'s dream at Bethel, and Jacob meets Rachel'
		},
		readingTimeMinutes: 18
	},
	{
		day: 22,
		date: 'Day 22',
		passages: [
			{ book: 'Genesis', chapterStart: 30, chapterEnd: 31, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: '2045 BC',
			description: 'Jacob\'s family grows, Jacob flees from Laban, and prepares to meet Esau'
		},
		readingTimeMinutes: 17
	},
	{
		day: 23,
		date: 'Day 23',
		passages: [
			{ book: 'Genesis', chapterStart: 32, chapterEnd: 34, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: '2040 BC',
			description: 'Jacob wrestles with God, reconciles with Esau, and the incident at Shechem'
		},
		readingTimeMinutes: 16
	},
	{
		day: 24,
		date: 'Day 24',
		passages: [
			{ book: 'Genesis', chapterStart: 35, chapterEnd: 37, testament: 'old' }
		],
		historicalContext: {
			period: 'Patriarchal Era',
			approximateDate: '2035 BC',
			description: 'Jacob returns to Bethel, Benjamin is born, and Joseph\'s dreams'
		},
		readingTimeMinutes: 18
	},
	{
		day: 25,
		date: 'Day 25',
		passages: [
			{ book: 'Genesis', chapterStart: 38, chapterEnd: 40, testament: 'old' }
		],
		historicalContext: {
			period: 'Egyptian Era',
			approximateDate: '2000 BC',
			description: 'Judah and Tamar, Joseph in Potiphar\'s house, and Joseph interprets dreams'
		},
		readingTimeMinutes: 17
	},
	{
		day: 26,
		date: 'Day 26',
		passages: [
			{ book: 'Genesis', chapterStart: 41, chapterEnd: 42, testament: 'old' }
		],
		historicalContext: {
			period: 'Egyptian Era',
			approximateDate: '1995 BC',
			description: 'Joseph rises to power in Egypt and his brothers come to buy grain'
		},
		readingTimeMinutes: 18
	},
	{
		day: 27,
		date: 'Day 27',
		passages: [
			{ book: 'Genesis', chapterStart: 43, chapterEnd: 45, testament: 'old' }
		],
		historicalContext: {
			period: 'Egyptian Era',
			approximateDate: '1990 BC',
			description: 'Joseph\'s brothers return, Joseph reveals himself, and Jacob moves to Egypt'
		},
		readingTimeMinutes: 19
	},
	{
		day: 28,
		date: 'Day 28',
		passages: [
			{ book: 'Genesis', chapterStart: 46, chapterEnd: 47, testament: 'old' }
		],
		historicalContext: {
			period: 'Egyptian Era',
			approximateDate: '1985 BC',
			description: 'Jacob\'s family settles in Egypt and Joseph administers during famine'
		},
		readingTimeMinutes: 16
	},
	{
		day: 29,
		date: 'Day 29',
		passages: [
			{ book: 'Genesis', chapterStart: 48, chapterEnd: 50, testament: 'old' }
		],
		historicalContext: {
			period: 'Egyptian Era',
			approximateDate: '1980 BC',
			description: 'Jacob blesses Joseph\'s sons, Jacob\'s final blessings, and Jacob\'s death'
		},
		readingTimeMinutes: 17
	},
	{
		day: 30,
		date: 'Day 30',
		passages: [
			{ book: 'Exodus', chapterStart: 1, chapterEnd: 3, testament: 'old' }
		],
		historicalContext: {
			period: 'Egyptian Bondage',
			approximateDate: '1525 BC',
			description: 'Israel\'s oppression in Egypt, the birth of Moses, and Moses flees to Midian'
		},
		readingTimeMinutes: 15
	},
	{
		day: 31,
		date: 'Day 31',
		passages: [
			{ book: 'Exodus', chapterStart: 4, chapterEnd: 6, testament: 'old' }
		],
		historicalContext: {
			period: 'Egyptian Bondage',
			approximateDate: '1445 BC',
			description: 'Moses called at the burning bush, returns to Egypt, and first confrontation with Pharaoh'
		},
		readingTimeMinutes: 16
	}
];

// Sample readings for other providers (maintaining previous data for now)
const sampleReadings: DailyReading[] = biblehubChronologicalEvents.slice(0, 7);

// Create a sample store for demonstration
function createReadingPlansStore() {
	const { subscribe, set, update } = writable({
		logos: {
			provider: 'logos',
			dailyReadings: logosChronologicalReadings,
			color: '#3498db',
			sourceUrl: 'https://www.logos.com/grow/nook-chronological-bible-reading-plan/'
		},
		blb: {
			provider: 'blue-letter-bible',
			dailyReadings: blbChronologicalReadings,
			color: '#9b59b6',
			sourceUrl: 'https://www.blueletterbible.org/dailyreading/'
		},
		apocrypha: {
			provider: 'apocrypha',
			dailyReadings: apocrypha365DayPlan,
			color: '#e67e22',
			sourceUrl: 'https://github.com/anthropics/bible360-research'
		},
		biblehub: {
			provider: 'biblehub',
			dailyReadings: biblehubChronologicalEvents,
			color: '#27ae60',
			sourceUrl: 'https://biblehub.com/timeline/'
		}
	});

	return {
		subscribe,
		set,
		update
	};
}

export const readingPlansStore = createReadingPlansStore();
export const readingPlans = readingPlansStore;