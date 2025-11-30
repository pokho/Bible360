import { writable } from 'svelte/store';
import type { ReadingPlan, DailyReading } from '$lib/types/reading-plans';

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
		esv: {
			provider: 'esv',
			dailyReadings: sampleReadings,
			color: '#e74c3c',
			sourceUrl: 'https://www.esv.org/resources/reading-plans/chronological/'
		},
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
			dailyReadings: sampleReadings.slice(0, 3).map(reading => ({
				...reading,
				passages: [
					...reading.passages,
					{ book: '1 Maccabees', chapterStart: 1, testament: 'apocryphal' }
				],
				apocryphaIncluded: true
			})),
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