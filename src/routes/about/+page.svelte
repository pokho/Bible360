<script lang="ts">
	import { onMount } from 'svelte';

	$: features = [
		{
			title: 'Complete Bible Coverage',
			description: '365-day chronological plan covering entire Bible from Genesis to Revelation',
			icon: '📖'
		},
		{
			title: 'Rich Historical Context',
			description: 'Scholarly dating and theological insights integrated throughout each reading',
			icon: '🏛️'
		},
		{
			title: 'Comprehensive Apocrypha',
			description: '365-day plan with 41 unique apocryphal and pseudepigraphal texts',
			icon: '📚'
		},
		{
			title: 'Working URL Generation',
			description: 'Direct links to BibleGateway, Sacred Texts, and other biblical sources',
			icon: '🔗'
		},
		{
			title: '584 Timeline Events',
			description: 'Complete BibleHub chronological timeline properly distributed',
			icon: '📅'
		},
		{
			title: 'Academic Excellence',
			description: 'Conservative evangelical scholarship with proper historical dating',
			icon: '🎓'
		}
	];

	$: providers = [
		{
			name: 'BibleHub Chronological',
			color: '#27ae60',
			methodology: 'Complete 584-event timeline covering entire Bible from Genesis to Revelation',
			denomination: 'Conservative Evangelical',
			sources: 'BibleHub.com Timeline',
			coverage: 'Complete Bible (365 days)'
		},
		{
			name: 'Logos Academic',
			color: '#3498db',
			methodology: 'Conservative dating with configurable parameters and academic framework',
			denomination: 'Interdenominational Academic',
			sources: 'Logos.com Academic Resources',
			coverage: 'Standard canonical books'
		},
		{
			name: 'Blue Letter Bible',
			color: '#9b59b6',
			methodology: 'Traditional conservative evangelical scholarship with historical context',
			denomination: 'Evangelical Protestant',
			sources: 'BlueLetterBible.org DBRP',
			coverage: 'Standard canonical books'
		},
		{
			name: 'Apocrypha & Pseudepigrapha',
			color: '#e67e22',
			methodology: 'Academic chronological approach through 41 unique texts from deuterocanonical to Nag Hammadi',
			denomination: 'Academic/Comparative Study',
			sources: 'BibleGateway NRSVUE, Sacred Texts, Early Christian Writings',
			coverage: '365 days of non-canonical texts'
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
	<a href="/about" class="nav-btn active">About</a>
</nav>

<main class="bible360-content">
	<div class="about-container">
		<section class="mission-section">
			<h2>Our Mission</h2>
			<p>Bible360 provides a complete chronological journey through Scripture, offering comprehensive 365-day reading plans that cover the entire Bible from Genesis to Revelation. We integrate rich historical context, scholarly insights, and working URL links to create the most thorough chronological Bible study experience available.</p>
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
							<p><strong>Coverage:</strong> {provider.coverage}</p>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<section class="chronology-section">
			<h2>Why Complete Chronological Reading?</h2>
			<div class="chronology-content">
				<p>Our comprehensive chronological reading plans provide unique insights into Scripture's complete historical and theological development:</p>
				<ul>
					<li><strong>Complete Historical Flow:</strong> Experience the entire biblical narrative from Creation to Revelation in chronological order</li>
					<li><strong>584 Timeline Events:</strong> Every major biblical event properly placed in historical context</li>
					<li><strong>Rich Historical Context:</strong> Scholarly dating and cultural insights for each reading</li>
					<li><strong>Theological Connections:</strong> Understand how doctrines develop across biblical history</li>
					<li><strong>Comprehensive Coverage:</strong> Complete Bible plus 41 apocryphal texts for full historical understanding</li>
					<li><strong>Academic Excellence:</strong> Conservative evangelical scholarship with proper historical methodology</li>
				</ul>
			</div>
		</section>

		
		<section class="contact-section">
			<h2>Contact & Licensing</h2>
			<p>Bible360 is a source-available project dedicated to providing comprehensive chronological Bible study resources. We welcome feedback and contributions from the community.</p>
			<div class="contact-info">
				<p><strong>GitHub:</strong> <a href="https://github.com/pokho/Bible360" target="_blank" rel="noopener">github.com/pokho/Bible360</a></p>
				<p><strong>License:</strong> Bible360 Source Available License by Paul Henckel</p>
				<p><strong>Personal Use:</strong> ✅ Free for personal, educational, and religious/non-profit use</p>
				<p><strong>Commercial Use:</strong> ❌ Commercial use prohibited without written permission</p>
				<p><strong>Commercial Inquiries:</strong> <a href="mailto:bible360@travail.mozmail.com">bible360@travail.mozmail.com</a></p>
				<p><strong>Version:</strong> 2.0 - Complete Chronological Implementation</p>
			</div>
		</section>
	</div>
</main>

<footer class="bible360-footer">
	<p>© 2026 Bible360 by Paul Henckel - Complete Chronological Bible Reading Plans</p>
	<p><em>Built with ❤️ for the Bible study community</em></p>
	<div class="footer-links">
		<a href="/">Home</a>
		<a href="/about">About</a>
		<a href="https://github.com/pokho/Bible360" target="_blank" rel="noopener">GitHub</a>
		<a href="mailto:bible360@travail.mozmail.com">Contact</a>
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

	
	.contact-info {
		margin-top: 1rem;
		padding: 1rem;
		background: #f8f9fa;
		border-radius: 4px;
	}

	.contact-info p {
		margin: 0.5rem 0;
	}

	.contact-info a {
		color: #3498db;
		text-decoration: none;
	}

	.contact-info a:hover {
		text-decoration: underline;
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