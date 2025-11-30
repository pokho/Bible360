import { writable } from 'svelte/store';
import type { ReadingPlan, DailyReading } from '$lib/types/reading-plans';

// Create a simple placeholder store for now
function createReadingPlansStore() {
	const { subscribe, set, update } = writable({
		esv: {
			provider: 'esv',
			dailyReadings: [],
			color: '#e74c3c',
			sourceUrl: 'https://www.esv.org/resources/reading-plans/chronological/'
		},
		logos: {
			provider: 'logos',
			dailyReadings: [],
			color: '#3498db',
			sourceUrl: 'https://www.logos.com/grow/nook-chronological-bible-reading-plan/'
		},
		blb: {
			provider: 'blue-letter-bible',
			dailyReadings: [],
			color: '#9b59b6',
			sourceUrl: 'https://www.blueletterbible.org/dailyreading/'
		},
		apocrypha: {
			provider: 'apocrypha',
			dailyReadings: [],
			color: '#e67e22',
			sourceUrl: 'https://github.com/anthropics/bible360-research'
		},
		biblehub: {
			provider: 'biblehub',
			dailyReadings: [],
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