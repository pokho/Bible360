<script lang="ts">
	import ComparisonTable from '$lib/components/ComparisonTable.svelte';
	import { onMount } from 'svelte';

	
	$: allReadingProviders = [];
	$: allDays = new Set();
	$: sortedDays = [];

	onMount(() => {
		// We'll initialize reading providers here after we create them
		initializeReadingProviders();
	});

	function initializeReadingProviders() {
		// This will be implemented once we migrate the reading providers
		// For now, we'll create a placeholder structure
		allReadingProviders = [
			{
				name: 'ESV Chronological',
				key: 'esv',
				methodology: 'Young-earth creationism, literal historical approach',
				totalDays: 365,
				apocryphaSupport: 'None (Protestant)',
				readings: []
			},
			{
				name: 'Logos Academic',
				key: 'logos',
				methodology: 'Conservative dating, historical-critical approach',
				totalDays: 365,
				apocryphaSupport: 'Full (Catholic/Orthodox)',
				readings: []
			},
			{
				name: 'Blue Letter Bible',
				key: 'blb',
				methodology: 'Conservative evangelical scholarship',
				totalDays: 365,
				apocryphaSupport: 'None (Protestant)',
				readings: []
			},
			{
				name: 'Apocrypha & Pseudepigrapha',
				key: 'apocrypha',
				methodology: 'Academic chronological approach through Deuterocanonical, Pseudepigrapha, and Early Christian writings',
				totalDays: 365,
				apocryphaSupport: 'Complete (Academic)',
				readings: []
			},
			{
				name: 'Biblehub Chronological',
				key: 'biblehub',
				methodology: 'Complete chronological timeline following traditional Hebrew chronology with chapter-by-chapter progression through biblical history',
				totalDays: 365,
				apocryphaSupport: 'None (Protestant)',
				readings: []
			}
		];

		// Collect all days for the comparison table
		allReadingProviders.forEach(plan => {
			plan.readings.forEach(reading => {
				allDays.add(reading.day);
			});
		});

		sortedDays = Array.from(allDays).sort((a, b) => a - b);
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

		<ComparisonTable plans={allReadingProviders} sortedDays={sortedDays} />
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