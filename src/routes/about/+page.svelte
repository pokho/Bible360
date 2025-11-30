<script lang="ts">
	import { onMount } from 'svelte';

	$: features = [
		{
			title: 'Multi-Provider Comparison',
			description: 'Compare 5 different chronological reading plans side by side',
			icon: '📊'
		},
		{
			title: 'Historical Context',
			description: 'Understand the historical background of each day\'s readings',
			icon: '📚'
		},
		{
			title: 'Color-Coded Providers',
			description: 'Easily distinguish between different reading methodologies',
			icon: '🎨'
		},
		{
			title: 'Academic Rigor',
			description: 'Scholarly approaches from conservative to academic perspectives',
			icon: '🎓'
		},
		{
			title: 'Complete Coverage',
			description: 'Includes canonical, deuterocanonical, and pseudepigraphal texts',
			icon: '📖'
		},
		{
			title: 'Flexible Reading',
			description: 'Adaptable to different schedules and reading preferences',
			icon: '⏰'
		}
	];

	$: providers = [
		{
			name: 'ESV Chronological',
			color: '#e74c3c',
			methodology: 'Young-earth creationism, literal historical approach',
			denomination: 'Evangelical Protestant',
			sources: 'ESV.org'
		},
		{
			name: 'Logos Academic',
			color: '#3498db',
			methodology: 'Conservative dating, historical-critical approach',
			denomination: 'Interdenominational Academic',
			sources: 'Logos.com'
		},
		{
			name: 'Blue Letter Bible',
			color: '#9b59b6',
			methodology: 'Conservative evangelical scholarship',
			denomination: 'Evangelical Protestant',
			sources: 'BlueLetterBible.org'
		},
		{
			name: 'Apocrypha & Pseudepigrapha',
			color: '#e67e22',
			methodology: 'Academic chronological approach through Deuterocanonical and Pseudepigraphal writings',
			denomination: 'Academic/Comparative',
			sources: 'Academic research'
		},
		{
			name: 'Biblehub Chronological',
			color: '#27ae60',
			methodology: 'Complete chronological timeline following traditional Hebrew chronology',
			denomination: 'Traditional Protestant',
			sources: 'Biblehub.com'
		}
	];
</script>

<svelte:head>
	<title>About - Bible360</title>
	<meta name="description" content="Learn about Bible360's comprehensive chronological Bible reading plan comparison system" />
</svelte:head>

<header class="bible360-header">
	<h1>Bible360</h1>
	<p>Chronological Bible Reading Plans - About</p>
</header>

<nav class="bible360-nav">
	<a href="/" class="nav-btn">Comparison</a>
	<a href="/plans" class="nav-btn">Reading Plans</a>
	<a href="/about" class="nav-btn active">About</a>
</nav>

<main class="bible360-content">
	<div class="about-container">
		<section class="mission-section">
			<h2>Our Mission</h2>
			<p>Bible360 provides a comprehensive platform for comparing and understanding different chronological approaches to reading the Bible. We bring together multiple scholarly and theological perspectives to help you deepen your understanding of Scripture's historical and literary context.</p>
		</section>

		<section class="features-section">
			<h2>Key Features</h2>
			<div class="features-grid">
				{#each features as feature (feature.title)}
					<div class="feature-card">
						<div class="feature-icon">{feature.icon}</div>
						<h3>{feature.title}</h3>
						<p>{feature.description}</p>
					</div>
				{/each}
			</div>
		</section>

		<section class="providers-section">
			<h2>Reading Plan Providers</h2>
			<div class="providers-grid">
				{#each providers as provider (provider.name)}
					<div class="provider-card">
						<div class="provider-header" style="border-left: 4px solid {provider.color}">
							<h3>{provider.name}</h3>
						</div>
						<div class="provider-content">
							<p><strong>Methodology:</strong> {provider.methodology}</p>
							<p><strong>Tradition:</strong> {provider.denomination}</p>
							<p><strong>Sources:</strong> {provider.sources}</p>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<section class="chronology-section">
			<h2>Why Chronological Reading?</h2>
			<div class="chronology-content">
				<p>Reading the Bible chronologically offers unique insights into Scripture's development and historical context:</p>
				<ul>
					<li><strong>Historical Flow:</strong> Experience events in the order they occurred</li>
					<li><strong>Prophetic Context:</strong> Understand prophecies in their historical setting</li>
					<li><strong>Literary Development:</strong> See how biblical literature evolved over time</li>
					<li><strong>Cultural Understanding:</strong> Appreciate the cultural and historical backgrounds</li>
					<li><strong>Theological Progression:</strong> Trace the development of biblical theology</li>
				</ul>
			</div>
		</section>

		<section class="technical-section">
			<h2>Technical Information</h2>
			<div class="technical-content">
				<p>Bible360 is built with modern web technologies to provide the best user experience:</p>
				<div class="tech-stack">
					<div class="tech-item">
						<strong>Frontend:</strong> SvelteKit with TypeScript
					</div>
					<div class="tech-item">
						<strong>Styling:</strong> Scoped CSS with custom design system
					</div>
					<div class="tech-item">
						<strong>Build:</strong> Vite for fast development and optimized production builds
					</div>
					<div class="tech-item">
						<strong>Deployment:</strong> Static site generation for optimal performance
					</div>
				</div>
			</div>
		</section>

		<section class="contact-section">
			<h2>Contact & Contributions</h2>
			<p>Bible360 is an open-source project dedicated to making biblical scholarship accessible to everyone. We welcome feedback, suggestions, and contributions from the community.</p>
			<div class="contact-info">
				<p><strong>GitHub:</strong> Available for open-source collaboration</p>
				<p><strong>License:</strong> MIT License</p>
				<p><strong>Version:</strong> 1.0.0</p>
			</div>
		</section>
	</div>
</main>

<footer class="bible360-footer">
	<p>© 2025 Bible360 - Chronological Bible Reading Plans</p>
	<div class="footer-links">
		<a href="/">Home</a>
		<a href="/plans">Reading Plans</a>
		<a href="/about">About</a>
	</div>
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

	.about-container {
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	section {
		background: white;
		border-radius: 8px;
		padding: 2rem;
		box-shadow: 0 2px 10px rgba(0,0,0,0.1);
	}

	section h2 {
		color: #2c3e50;
		margin-bottom: 1.5rem;
		border-bottom: 2px solid #3498db;
		padding-bottom: 0.5rem;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
		margin-top: 1.5rem;
	}

	.feature-card {
		text-align: center;
		padding: 1.5rem;
		border-radius: 8px;
		border: 1px solid #e0e0e0;
		transition: transform 0.2s ease;
	}

	.feature-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 15px rgba(0,0,0,0.1);
	}

	.feature-icon {
		font-size: 2.5rem;
		margin-bottom: 1rem;
	}

	.providers-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
		margin-top: 1.5rem;
	}

	.provider-card {
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 2px 10px rgba(0,0,0,0.1);
	}

	.provider-header {
		padding: 1rem 1.5rem;
		background: #f8f9fa;
	}

	.provider-header h3 {
		margin: 0;
		color: #2c3e50;
	}

	.provider-content {
		padding: 1rem 1.5rem;
	}

	.provider-content p {
		margin: 0.5rem 0;
	}

	.chronology-content ul {
		list-style: none;
		padding: 0;
	}

	.chronology-content li {
		padding: 0.5rem 0;
		border-bottom: 1px solid #f0f0f0;
	}

	.chronology-content li:last-child {
		border-bottom: none;
	}

	.tech-stack {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
		margin-top: 1rem;
	}

	.tech-item {
		padding: 1rem;
		background: #f8f9fa;
		border-radius: 4px;
		border-left: 3px solid #3498db;
	}

	.contact-info {
		margin-top: 1rem;
		padding: 1rem;
		background: #f8f9fa;
		border-radius: 4px;
	}

	.contact-info p {
		margin: 0.5rem 0;
	}

	.bible360-footer {
		background: #2c3e50;
		color: white;
		text-align: center;
		padding: 2rem;
		margin-top: 3rem;
	}

	.footer-links {
		margin-top: 1rem;
		display: flex;
		justify-content: center;
		gap: 2rem;
	}

	.footer-links a {
		color: white;
		text-decoration: none;
		opacity: 0.8;
		transition: opacity 0.2s ease;
	}

	.footer-links a:hover {
		opacity: 1;
	}

	@media (max-width: 768px) {
		.bible360-content {
			padding: 1rem;
		}

		section {
			padding: 1.5rem;
		}

		.features-grid,
		.providers-grid {
			grid-template-columns: 1fr;
		}
	}
</style>