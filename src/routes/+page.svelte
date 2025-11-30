<script lang="ts">
	import ComparisonTable from '$lib/components/ComparisonTable.svelte';
	import { readingPlans } from '$lib/stores/readingPlansStore';
	import { onMount } from 'svelte';

	$: plans = {};
	$: sortedDays = [];
	$: allReadingProviders = [];
	$: currentMonth = 1;
	$: monthDays = [];
	$: maxMonth = 12;

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

			updateMonthDays();
		});

		// Clean up subscription when component is destroyed
		return unsubscribe;
	}

	function updateMonthDays() {
		const startDay = (currentMonth - 1) * 31 + 1;
		const endDay = Math.min(currentMonth * 31, 365);

		// Collect all unique days from all plans for the current month
		const allDaysSet = new Set();
		Object.values(plans).forEach(plan => {
			if (plan.dailyReadings) {
				plan.dailyReadings.forEach(reading => {
					if (reading.day >= startDay && reading.day <= endDay) {
						allDaysSet.add(reading.day);
					}
				});
			}
		});

		// If no readings found for this month, add placeholder days
		if (allDaysSet.size === 0) {
			for (let i = startDay; i <= endDay; i++) {
				allDaysSet.add(i);
			}
		}

		sortedDays = Array.from(allDaysSet).sort((a, b) => a - b);
		monthDays = Array.from({ length: endDay - startDay + 1 }, (_, i) => startDay + i);
	}

	function selectMonth(month: number) {
		currentMonth = month;
		updateMonthDays();
	}

	function getMonthLabel(month: number) {
		return `Month ${month}`;
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
			<h2>Reading Plan Comparison - {getMonthLabel(currentMonth)}</h2>
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

		<!-- Month Navigation -->
		<div class="month-navigation">
			<div class="month-nav-container">
				<button
					class="month-nav-btn"
					on:click={() => selectMonth(currentMonth - 1)}
					disabled={currentMonth === 1}
				>
					← Previous
				</button>

				<div class="month-selector">
					{#each Array(maxMonth) as _, i}
						<button
							class="month-btn {currentMonth === i + 1 ? 'active' : ''}"
							on:click={() => selectMonth(i + 1)}
						>
							{i + 1}
						</button>
					{/each}
				</div>

				<button
					class="month-nav-btn"
					on:click={() => selectMonth(currentMonth + 1)}
					disabled={currentMonth === maxMonth}
				>
					Next →
				</button>
			</div>
			<div class="month-info">
				Showing days {sortedDays.length > 0 ? sortedDays[0] : 1} - {sortedDays.length > 0 ? sortedDays[sortedDays.length - 1] : 31} of 365
			</div>
		</div>
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

<style>
	.month-navigation {
		margin-top: 2rem;
		padding: 1.5rem;
		background: white;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.month-nav-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.month-nav-btn {
		background: #6c757d;
		color: white;
		border: none;
		padding: 0.75rem 1rem;
		border-radius: 6px;
		cursor: pointer;
		font-size: 0.9rem;
		transition: all 0.2s ease;
	}

	.month-nav-btn:hover:not(:disabled) {
		background: #5a6268;
		transform: translateY(-1px);
	}

	.month-nav-btn:disabled {
		background: #e9ecef;
		color: #6c757d;
		cursor: not-allowed;
		transform: none;
	}

	.month-selector {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.month-btn {
		background: #f8f9fa;
		color: #495057;
		border: 2px solid #dee2e6;
		padding: 0.5rem 0.75rem;
		border-radius: 6px;
		cursor: pointer;
		font-size: 0.85rem;
		font-weight: 600;
		min-width: 40px;
		transition: all 0.2s ease;
	}

	.month-btn:hover {
		background: #e9ecef;
		border-color: #adb5bd;
		transform: translateY(-1px);
	}

	.month-btn.active {
		background: #007bff;
		color: white;
		border-color: #007bff;
		transform: translateY(-1px);
		box-shadow: 0 2px 4px rgba(0, 123, 255, 0.3);
	}

	.month-info {
		text-align: center;
		margin-top: 1rem;
		color: #6c757d;
		font-size: 0.9rem;
		font-weight: 500;
	}

	@media (max-width: 768px) {
		.month-nav-container {
			flex-direction: column;
			gap: 1rem;
		}

		.month-selector {
			order: -1;
		}

		.month-btn {
			padding: 0.4rem 0.6rem;
			font-size: 0.8rem;
			min-width: 35px;
		}

		.month-navigation {
			padding: 1rem;
		}
	}

	@media (max-width: 480px) {
		.month-btn {
			padding: 0.3rem 0.5rem;
			font-size: 0.75rem;
			min-width: 30px;
		}

		.month-nav-btn {
			padding: 0.6rem 0.8rem;
			font-size: 0.8rem;
		}
	}
</style>