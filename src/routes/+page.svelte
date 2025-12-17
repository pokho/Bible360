<script lang="ts">
	import ComparisonTable from '$lib/components/ComparisonTable.svelte';
	import { readingPlans } from '$lib/stores/readingPlansStore';
	import { onMount } from 'svelte';
	import { LogosAcademicProvider } from '../data/reading-providers/logos-academic';
	import { BlueLetterBibleProvider } from '../data/reading-providers/blue-letter-bible';
	import { BiblehubReadingProvider } from '../data/reading-providers/biblehub-chronological';
	import { ApocryphaReadingProvider } from '../data/reading-providers/apocrypha-chronological';

	$: plans = {};
	$: sortedDays = [];
	$: allReadingProviders = [];
	$: currentMonth = 1;
	$: monthDays = [];
	$: maxMonth = 12;
	$: loading = true;
	$: error = null;

	onMount(async () => {
		// Load actual reading plan data from provider classes
		await loadReadingPlans();
	});

	async function loadReadingPlans() {
		try {
			loading = true;
			error = null;

			// Initialize provider classes
			const logosProvider = new LogosAcademicProvider();
			const blbProvider = new BlueLetterBibleProvider();
			const biblehubProvider = new BiblehubReadingProvider();
			const apocryphaProvider = new ApocryphaReadingProvider();

			// Load data from all providers in parallel
			const [logosPlan, blbPlan, biblehubPlan, apocryphaPlan] = await Promise.all([
				logosProvider.loadReadingPlan(),
				blbProvider.loadReadingPlan(),
				biblehubProvider.loadReadingPlan(),
				apocryphaProvider.loadReadingPlan()
			]);

			// Create plans object with loaded data
			plans = {
				logos: {
					provider: logosPlan.provider,
					dailyReadings: logosPlan.dailyReadings,
					color: '#3498db',
					sourceUrl: 'https://www.logos.com/grow/nook-chronological-bible-reading-plan/'
				},
				blb: {
					provider: blbPlan.provider,
					dailyReadings: blbPlan.dailyReadings,
					color: '#9b59b6',
					sourceUrl: 'https://www.blueletterbible.org/dailyreading/'
				},
				apocrypha: {
					provider: apocryphaPlan.provider,
					dailyReadings: apocryphaPlan.dailyReadings,
					color: '#e67e22',
					sourceUrl: 'https://github.com/anthropics/bible360-research'
				},
				biblehub: {
					provider: biblehubPlan.provider,
					dailyReadings: biblehubPlan.dailyReadings,
					color: '#27ae60',
					sourceUrl: 'https://biblehub.com/timeline/'
				}
			};

			// Create a more detailed structure for the legend
			allReadingProviders = [
				{
					name: 'Logos Academic',
					key: 'logos',
					methodology: 'Conservative dating with historical-critical approach and scholarly academic methodology for comprehensive study.',
					totalDays: logosPlan.metadata.totalDays,
					apocryphaSupport: 'Full (Catholic/Orthodox)',
					color: '#3498db'
				},
				{
					name: 'Blue Letter Bible',
					key: 'blb',
					methodology: 'Conservative evangelical scholarship with traditional young-earth creationist timeline and chronological reading plan.',
					totalDays: blbPlan.metadata.totalDays,
					apocryphaSupport: 'None (Protestant)',
					color: '#9b59b6'
				},
				{
					name: 'Biblehub Chronological',
					key: 'biblehub',
					methodology: 'Complete chronological timeline following traditional Hebrew chronology with chapter-by-chapter progression through biblical history.',
					totalDays: biblehubPlan.metadata.totalDays,
					apocryphaSupport: 'None (Protestant)',
					color: '#27ae60'
				},
				{
					name: 'Apocrypha & Pseudepigrapha',
					key: 'apocrypha',
					methodology: 'Comprehensive academic chronological journey through Deuterocanonical texts, Old Testament Pseudepigrapha, and New Testament Apocrypha with scholarly dating.',
					totalDays: apocryphaPlan.metadata.totalDays,
					apocryphaSupport: 'Complete Academic Coverage (Scholarly References)',
					color: '#e67e22'
				}
			];

			// Update max month based on actual data
			const maxDays = Math.max(
				logosPlan.metadata.totalDays,
				blbPlan.metadata.totalDays,
				apocryphaPlan.metadata.totalDays,
				biblehubPlan.metadata.totalDays
			);
			maxMonth = Math.ceil(maxDays / 31);

			updateMonthDays();
		} catch (err) {
			console.error('Error loading reading plans:', err);
			error = err.message || 'Failed to load reading plans';
		} finally {
			loading = false;
		}
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

	function selectMonth(month) {
		currentMonth = month;
		updateMonthDays();
	}

	function getMonthLabel(month) {
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
	<a href="/about" class="nav-btn">About</a>
</nav>

<main class="bible360-content">
	{#if loading}
		<div class="loading-container">
			<div class="loading-spinner"></div>
			<p>Loading reading plans from providers...</p>
		</div>
	{:else if error}
		<div class="error-container">
			<h3>Error Loading Reading Plans</h3>
			<p>{error}</p>
			<button on:click={loadReadingPlans}>Retry</button>
		</div>
	{:else}
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
	{/if}
</main>

<footer class="bible360-footer">
	<p>© 2025 Bible360 - Chronological Bible Reading Plans</p>
	<div class="source-attribution">
		<p>Reading plans based on data from:</p>
		<div class="source-links">
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

	/* Loading and Error States */
	.loading-container, .error-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 4rem 2rem;
		text-align: center;
		background: white;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		margin: 2rem 0;
		min-height: 200px;
	}

	.loading-spinner {
		width: 40px;
		height: 40px;
		border: 4px solid #f3f3f3;
		border-top: 4px solid var(--primary-color);
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin-bottom: 1rem;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	.error-container {
		color: #e74c3c;
	}

	.error-container h3 {
		margin-bottom: 1rem;
		color: #c0392b;
	}

	.error-container button {
		background: var(--primary-color);
		color: white;
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 6px;
		cursor: pointer;
		font-size: 1rem;
		margin-top: 1rem;
		transition: background-color 0.2s ease;
	}

	.error-container button:hover {
		background: var(--secondary-color);
	}
</style>