<script lang="ts">
	import ComparisonTable from '$lib/components/ComparisonTable.svelte';
	import { readingPlans } from '$lib/stores/readingPlansStore';
	import { onMount } from 'svelte';

	$: plans = {};
	$: sortedDays = [];
	$: allReadingProviders = [];

	onMount(async () => {
		// Load actual reading plan data
		await loadReadingPlans();
	});

	async function loadReadingPlans() {
		// Subscribe to the store to get plans
		const unsubscribe = readingPlans.subscribe(storePlans => {
			plans = storePlans;

			// Create a more detailed structure for the legend
			allReadingProviders = [
				{
					name: 'ESV Chronological',
					key: 'esv',
					methodology: 'Young-earth creationism, literal historical approach',
					totalDays: 365,
					apocryphaSupport: 'None (Protestant)',
					color: '#e74c3c'
				},
				{
					name: 'Logos Academic',
					key: 'logos',
					methodology: 'Conservative dating, historical-critical approach',
					totalDays: 365,
					apocryphaSupport: 'Full (Catholic/Orthodox)',
					color: '#3498db'
				},
				{
					name: 'Blue Letter Bible',
					key: 'blb',
					methodology: 'Conservative evangelical scholarship',
					totalDays: 365,
					apocryphaSupport: 'None (Protestant)',
					color: '#9b59b6'
				},
				{
					name: 'Apocrypha & Pseudepigrapha',
					key: 'apocrypha',
					methodology: 'Academic chronological approach through Deuterocanonical, Pseudepigrapha, and Early Christian writings',
					totalDays: 365,
					apocryphaSupport: 'Complete (Academic)',
					color: '#e67e22'
				},
				{
					name: 'Biblehub Chronological',
					key: 'biblehub',
					methodology: 'Complete chronological timeline following traditional Hebrew chronology with chapter-by-chapter progression through biblical history',
					totalDays: 365,
					apocryphaSupport: 'None (Protestant)',
					color: '#27ae60'
				}
			];

			// Collect all unique days from all plans
			const allDaysSet = new Set();
			Object.values(plans).forEach(plan => {
				if (plan.dailyReadings) {
					plan.dailyReadings.forEach(reading => {
						allDaysSet.add(reading.day);
					});
				}
			});

			// For now, let's add some sample days to demonstrate functionality
			if (allDaysSet.size === 0) {
				for (let i = 1; i <= 7; i++) {
					allDaysSet.add(i);
				}
			}

			sortedDays = Array.from(allDaysSet).sort((a, b) => a - b);
		});

		// Clean up subscription when component is destroyed
		return unsubscribe;
	}
</script>

<svelte:head>
	<title>Bible360 - Chronological Bible Reading Plans</title>
	<meta name="description" content="Multi-provider chronological Bible reading plans with Blue Letter Bible, ESV, Logos, Apocrypha, and Biblehub methodologies" />
</svelte:head>

<header class="bible360-header">
	<h1>Bible360</h1>
	<p>Chronological Bible Reading Plans - Multi-Provider Comparison</p>
</header>

<nav class="bible360-nav">
	<a href="/" class="nav-btn active">Comparison</a>
	<a href="/plans" class="nav-btn">Reading Plans</a>
	<a href="/about" class="nav-btn">About</a>
</nav>

<main class="bible360-content">
	<div class="comparison-table-container">
		<div class="comparison-header">
			<h2>Reading Plan Comparison - All Days</h2>
			<div class="plan-legend">
				{#each allReadingProviders as plan}
					<div class="legend-item">
						<span class="legend-color plan-{plan.key}"></span>
						<span>{plan.name}</span>
						<small>({plan.methodology})</small>
					</div>
				{/each}
			</div>
		</div>

		<ComparisonTable {plans} {sortedDays} />
	</div>
</main>

<footer class="bible360-footer">
	<p>© 2025 Bible360 - Chronological Bible Reading Plans</p>
	<div class="source-attribution">
		<p>Reading plans based on data from:</p>
		<div class="source-links">
			<a href="https://www.esv.org/resources/reading-plans/chronological/" target="_blank" rel="noopener">ESV.org</a>
			<a href="https://www.logos.com/grow/nook-chronological-bible-reading-plan/" target="_blank" rel="noopener">Logos.com</a>
			<a href="https://www.blueletterbible.org/dailyreading/" target="_blank" rel="noopener">BlueLetterBible.org</a>
			<a href="https://biblehub.com/timeline/" target="_blank" rel="noopener">Biblehub</a>
		</div>
	</div>
</footer>