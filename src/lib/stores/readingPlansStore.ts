import { writable } from 'svelte/store';
import type { ReadingPlan, DailyReading } from '$lib/types/reading-plans';
import { apocrypha365DayPlan } from '$lib/data/apocrypha-365-day-plan';

// ============================================================================
// NOTE: All reading plan data has been MOVED to proper provider files:
// - Blue Letter Bible data: src/data/reading-providers/blue-letter-bible.ts
// - Logos Academic data: src/data/reading-providers/logos-academic.ts
// - Biblehub data: src/data/reading-providers/biblehub-chronological.ts
// - Apocrypha data: src/data/reading-providers/apocrypha-chronological.ts
// ============================================================================

// Create clean store interface - data now comes from provider files
function createReadingPlansStore() {
	const { subscribe, set, update } = writable({
		logos: {
			provider: 'logos',
			dailyReadings: [], // Data loaded from LogosAcademicProvider
			color: '#3498db',
			sourceUrl: 'https://www.logos.com/grow/nook-chronological-bible-reading-plan/'
		},
		blb: {
			provider: 'blue-letter-bible',
			dailyReadings: [], // Data loaded from BlueLetterBibleProvider
			color: '#9b59b6',
			sourceUrl: 'https://www.blueletterbible.org/dailyreading/'
		},
		apocrypha: {
			provider: 'apocrypha',
			dailyReadings: apocrypha365DayPlan, // Already properly organized
			color: '#e67e22',
			sourceUrl: 'https://github.com/anthropics/bible360-research'
		},
		biblehub: {
			provider: 'biblehub',
			dailyReadings: [], // Data loaded from BiblehubReadingProvider
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