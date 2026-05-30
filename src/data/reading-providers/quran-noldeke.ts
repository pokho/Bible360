import type { ReadingPlan, DailyReading, BiblePassage, PlanMetadata } from '../../types/reading-plans';
import { quranSurahData, type QuranSurah } from './quran-data';
import { surahThemes } from './quran-surah-themes';

export class QuranNoldekeProvider {
	async loadReadingPlan(): Promise<ReadingPlan> {
		const dailyReadings = this.generateDailyReadings();
		return {
			provider: 'quran-noldeke',
			methodology: {
				datingSystem: 'academic',
				jobPlacement: 'custom',
				gospelIntegration: 'custom',
				psalmsDistribution: 'custom',
				apocryphaInclusion: {
					includeDeuterocanonical: false,
					includeNTApocrypha: false,
					denominationalPreference: 'academic',
					intertestamentalPlacement: 'historical-gap'
				}
			},
			dailyReadings,
			metadata: {
				title: 'Quran — Nöldeke Chronological Order',
				description: "Surah-level chronological ordering following Theodor Nöldeke's 1860s Western academic chronology. Diverges significantly from Egyptian Standard.",
				totalDays: dailyReadings.length,
				averageReadingTime: 5,
				language: 'English',
				version: '1.0',
				sourceUrl: 'https://quran.com/'
			}
		};
	}

	private generateDailyReadings(): DailyReading[] {
		const sorted = [...quranSurahData].sort(
			(a, b) => a.noldekeChronologicalOrder - b.noldekeChronologicalOrder
		);

		const dailyReadings: DailyReading[] = [];
		let day = 1;
		let dayVerses = 0;
		let dayPassages: BiblePassage[] = [];
		const TARGET = 17;

		for (const surah of sorted) {
			let v = 1;
			while (v <= surah.totalVerses) {
				const space = TARGET - dayVerses;
				const available = surah.totalVerses - v + 1;
				const take = Math.min(space, available);

				dayPassages.push({
					book: surah.englishName,
					chapterStart: surah.surahNumber,
					chapterEnd: surah.surahNumber,
					verseStart: v,
					verseEnd: v + take - 1,
					testament: surah.revelationType === 'Meccan' ? 'meccan' : 'medinan',
					href: `https://quran.com/${surah.surahNumber}/${v}-${v + take - 1}`
				});

				dayVerses += take;
				v += take;

				if (dayVerses >= TARGET) {
					dailyReadings.push({
						day,
						passages: dayPassages,
						readingTimeMinutes: Math.max(3, Math.ceil(dayVerses / 4)),
						historicalContext: this.getHistoricalContext(surah)
					});
					day++;
					dayVerses = 0;
					dayPassages = [];
				}
			}
		}

		// Flush remaining verses
		if (dayPassages.length > 0) {
			dailyReadings.push({
				day,
				passages: dayPassages,
				readingTimeMinutes: Math.max(3, Math.ceil(dayVerses / 4)),
				historicalContext: this.getHistoricalContext(dayPassages[0] as any)
			});
		}

		// Cap at 365: merge overflow into last day
		while (dailyReadings.length > 365) {
			const overflow = dailyReadings.pop()!;
			dailyReadings[dailyReadings.length - 1].passages.push(...overflow.passages);
		}

		return dailyReadings;
	}

	private getHistoricalContext(surah: QuranSurah): { period: string; approximateDate: string; description: string } {
		const theme = surahThemes[surah.surahNumber] || '';
		if (surah.revelationType === 'Meccan') {
			return {
				period: 'Meccan Period (Nöldeke)',
				approximateDate: '610–622 CE',
				description: theme
			};
		} else {
			return {
				period: 'Medinan Period (Nöldeke)',
				approximateDate: '622–632 CE',
				description: theme
			};
		}
	}

	private getOrdinal(n: number): string {
		const s = ['th', 'st', 'nd', 'rd'];
		const v = n % 100;
		return n + (s[(v - 20) % 10] || s[v] || s[0]);
	}
}
