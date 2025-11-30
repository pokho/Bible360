<script lang="ts">
	import { onMount } from 'svelte';

	$: readingPlans = [];
	$: selectedProvider = null;

	onMount(() => {
		// Initialize reading plans data
		readingPlans = [
			{
				name: 'ESV Chronological',
				key: 'esv',
				description: 'Young-earth creationism, literal historical approach',
				totalDays: 365,
				averageTime: 20,
				color: '#e74c3c'
			},
			{
				name: 'Logos Academic',
				key: 'logos',
				description: 'Conservative dating, historical-critical approach',
				totalDays: 365,
				averageTime: 25,
				color: '#3498db'
			},
			{
				name: 'Blue Letter Bible',
				key: 'blb',
				description: 'Conservative evangelical scholarship',
				totalDays: 365,
				averageTime: 22,
				color: '#9b59b6'
			},
			{
				name: 'Apocrypha & Pseudepigrapha',
				key: 'apocrypha',
				description: 'Academic chronological approach through Deuterocanonical and Pseudepigraphal writings',
				totalDays: 365,
				averageTime: 30,
				color: '#e67e22'
			},
			{
				name: 'Biblehub Chronological',
				key: 'biblehub',
				description: 'Complete chronological timeline following traditional Hebrew chronology',
				totalDays: 365,
				averageTime: 20,
				color: '#27ae60'
			}
		];
	});

	function selectPlan(plan) {
		selectedProvider = plan;
	}
</script>

<svelte:head>
	<title>Reading Plans - Bible360</title>
	<meta name="description" content="Detailed information about chronological Bible reading plans from multiple providers" />
</svelte:head>

<header class="bible360-header">
	<h1>Bible360</h1>
	<p>Chronological Bible Reading Plans - Detailed View</p>
</header>

<nav class="bible360-nav">
	<a href="/" class="nav-btn">Comparison</a>
	<a href="/plans" class="nav-btn active">Reading Plans</a>
	<a href="/about" class="nav-btn">About</a>
</nav>

<main class="bible360-content">
	<div class="plans-container">
		<div class="plans-header">
			<h2>Available Reading Plans</h2>
			<p>Choose from our comprehensive collection of chronological Bible reading plans, each with unique methodologies and approaches.</p>
		</div>

		<div class="plans-grid">
			{#each readingPlans as plan (plan.key)}
				<div class="plan-card" class:active={selectedProvider?.key === plan.key} on:click={() => selectPlan(plan)}>
					<div class="plan-header" style="border-left: 4px solid {plan.color}">
						<h3>{plan.name}</h3>
						<div class="plan-stats">
							<span class="stat">{plan.totalDays} days</span>
							<span class="stat">~{plan.averageTime} min/day</span>
						</div>
					</div>
					<div class="plan-content">
						<p>{plan.description}</p>
					</div>
					<div class="plan-footer">
						<button class="start-plan-btn" style="background-color: {plan.color}">
							Start Plan
						</button>
					</div>
				</div>
			{/each}
		</div>

		{#if selectedProvider}
			<div class="selected-plan-details">
				<h3>Selected: {selectedProvider.name}</h3>
				<div class="plan-details">
					<p><strong>Duration:</strong> {selectedProvider.totalDays} days</p>
					<p><strong>Average Reading Time:</strong> {selectedProvider.averageTime} minutes per day</p>
					<p><strong>Approach:</strong> {selectedProvider.description}</p>
					<div class="action-buttons">
						<button class="primary-btn">Begin Reading Plan</button>
						<button class="secondary-btn">View Sample Day</button>
					</div>
				</div>
			</div>
		{/if}
	</div>
</main>

<footer class="bible360-footer">
	<p>© 2025 Bible360 - Chronological Bible Reading Plans</p>
</footer>

<style>
	.bible360-header {
		background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
		color: white;
		padding: 2rem;
		text-align: center;
	}

	.bible360-nav {
		background: white;
		padding: 1rem;
		border-bottom: 1px solid #e0e0e0;
		display: flex;
		justify-content: center;
		gap: 1rem;
	}

	.nav-btn {
		padding: 0.5rem 1rem;
		text-decoration: none;
		color: #666;
		border-radius: 4px;
		transition: all 0.3s ease;
	}

	.nav-btn.active {
		background: #3498db;
		color: white;
	}

	.bible360-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	.plans-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.plans-header {
		text-align: center;
	}

	.plans-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	.plan-card {
		background: white;
		border-radius: 8px;
		box-shadow: 0 2px 10px rgba(0,0,0,0.1);
		cursor: pointer;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
		overflow: hidden;
	}

	.plan-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 20px rgba(0,0,0,0.15);
	}

	.plan-card.active {
		border: 2px solid #3498db;
	}

	.plan-header {
		padding: 1.5rem;
		background: #f8f9fa;
	}

	.plan-header h3 {
		margin: 0 0 0.5rem 0;
		color: #2c3e50;
	}

	.plan-stats {
		display: flex;
		gap: 1rem;
	}

	.stat {
		background: rgba(52, 152, 219, 0.1);
		padding: 0.25rem 0.5rem;
		border-radius: 12px;
		font-size: 0.8rem;
		color: #3498db;
	}

	.plan-content {
		padding: 1rem 1.5rem;
	}

	.plan-footer {
		padding: 1rem 1.5rem;
		border-top: 1px solid #f0f0f0;
	}

	.start-plan-btn {
		width: 100%;
		padding: 0.75rem;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-weight: bold;
		transition: opacity 0.2s ease;
	}

	.start-plan-btn:hover {
		opacity: 0.9;
	}

	.selected-plan-details {
		background: white;
		border-radius: 8px;
		padding: 2rem;
		box-shadow: 0 2px 10px rgba(0,0,0,0.1);
	}

	.action-buttons {
		display: flex;
		gap: 1rem;
		margin-top: 1rem;
	}

	.primary-btn {
		padding: 0.75rem 1.5rem;
		background: #3498db;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	.secondary-btn {
		padding: 0.75rem 1.5rem;
		background: white;
		color: #3498db;
		border: 2px solid #3498db;
		border-radius: 4px;
		cursor: pointer;
	}

	.bible360-footer {
		background: #2c3e50;
		color: white;
		text-align: center;
		padding: 2rem;
		margin-top: 3rem;
	}
</style>