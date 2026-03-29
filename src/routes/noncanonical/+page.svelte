<script lang="ts">
	import { onMount } from 'svelte';

	const textCategories = [
		{
			name: 'Archaeological Discoveries',
			icon: '🏺',
			description: 'Actual ancient manuscripts discovered in modern times',
			examples: ['Dead Sea Scrolls (Qumran, 1947)', 'Nag Hammadi Library (Egypt, 1945)'],
			texts: [
				'Great Isaiah Scroll, Community Rule, War Scroll, Damascus Document, Hodayot',
				'Gospel of Thomas, Apocryphon of John, Gospel of Philip, Gospel of Mary'
			]
		},
		{
			name: 'Deuterocanonical Books',
			icon: '📜',
			description: 'Continuously preserved through church tradition; accepted by Catholic and Orthodox churches',
			examples: ['Included in Septuagint (Greek OT)', 'Preserved in Latin Vulgate'],
			texts: [
				'Tobit, Judith, Wisdom of Solomon, Sirach, Baruch, 1-2 Maccabees',
				'Additions to Esther, Additions to Daniel (Susanna, Bel & Dragon, Prayer of Azariah)'
			]
		},
		{
			name: 'Old Testament Pseudepigrapha',
			icon: '✍️',
			description: 'Later re-dramatizations written centuries after events, claiming ancient authorship',
			examples: ['Attributed to patriarchs but written 200 BCE - 200 CE'],
			texts: [
				'1-2 Enoch, Jubilees, Testament of Twelve Patriarchs, Books of Adam & Eve',
				'Testament of Solomon, Testament of Job, Letter of Aristeas, 2-3 Baruch'
			]
		},
		{
			name: 'Apostolic Fathers',
			icon: '⛪',
			description: 'Genuine early Christian writings from 1st-2nd century by actual church leaders',
			examples: ['Written about their own time, not pseudepigrapha'],
			texts: [
				'Didache, 1-2 Clement, Ignatius Letters, Polycarp, Martyrdom of Polycarp',
				'Epistle of Barnabas, Shepherd of Hermas, Papias Fragments'
			]
		},
		{
			name: 'New Testament Apocrypha',
			icon: '📖',
			description: 'Later gospels, acts, and epistles not included in the canon',
			examples: ['Written 2nd-4th century, expand on biblical narratives'],
			texts: [
				'Gospel of Thomas, Gospel of Peter, Gospel of Mary, Gospel of Nicodemus',
				'Acts of Paul, Acts of Peter, Acts of Thomas, Apocalypse of Peter'
			]
		},
		{
			name: 'Gnostic Texts',
			icon: '🔮',
			description: 'Esoteric Christian texts emphasizing secret knowledge (gnosis) for salvation',
			examples: ['Most discovered at Nag Hammadi in 1945'],
			texts: [
				'Apocryphon of John, Gospel of Truth, Gospel of Philip, Pistis Sophia',
				'Tripartite Tractate, Hypostasis of the Archons, Thunder Perfect Mind'
			]
		}
	];

	const canons = [
		{
			tradition: 'Protestant',
			color: '#2c3e50',
			oldTestament: 39,
			newTestament: 27,
			apocrypha: 0,
			total: 66,
			notes: 'Rejects Apocrypha as non-canonical. Luther moved them to intertestamental section (useful for reading but not doctrine). Most Protestants exclude entirely.',
			apocryphaStatus: 'Excluded or "useful for edification" only'
		},
		{
			tradition: 'Roman Catholic',
			color: '#9b59b6',
			oldTestament: 46,
			newTestament: 27,
			apocrypha: 7,
			total: 73,
			notes: 'Council of Trent (1546) affirmed Deuterocanonical books as fully canonical. Includes Tobit, Judith, Wisdom, Sirach, Baruch, 1-2 Maccabees, plus additions.',
			apocryphaStatus: 'Fully canonical (Deuterocanonical)'
		},
		{
			tradition: 'Greek Orthodox',
			color: '#27ae60',
			oldTestament: 49,
			newTestament: 27,
			apocrypha: 10,
			total: 76,
			notes: 'Based on Septuagint. Includes all Catholic deuterocanonical plus 1 Esdras, Prayer of Manasseh, 3 Maccabees, Psalm 151.',
			apocryphaStatus: 'Canonical (Anagignoskomena)'
		},
		{
			tradition: 'Russian Orthodox',
			color: '#e74c3c',
			oldTestament: 49,
			newTestament: 27,
			apocrypha: 10,
			total: 76,
			notes: 'Similar to Greek Orthodox. Uses Septuagint-based canon. 2 Esdras included in some Slavic Bibles.',
			apocryphaStatus: 'Canonical (varies by local tradition)'
		},
		{
			tradition: 'Ethiopian Orthodox',
			color: '#f39c12',
			oldTestament: 46,
			newTestament: 35,
			apocrypha: 19,
			total: 81,
			notes: 'Largest biblical canon. Includes Enoch, Jubilees, 1-3 Meqabyan (different from Maccabees), and unique NT books like 1-2 Clement.',
			apocryphaStatus: 'Widest canonical scope'
		},
		{
			tradition: 'Coptic Orthodox',
			color: '#1abc9c',
			oldTestament: 46,
			newTestament: 27,
			apocrypha: 7,
			total: 73,
			notes: 'Similar to Catholic canon but with different liturgical use of apocryphal texts.',
			apocryphaStatus: 'Deuterocanonical'
		},
		{
			tradition: 'Syriac Orthodox (Peshitta)',
			color: '#34495e',
			oldTestament: 39,
			newTestament: 22,
			apocrypha: 0,
			total: 61,
			notes: 'Historically excluded 2 Peter, 2-3 John, Jude, Revelation. Some modern editions include these plus Apocrypha.',
			apocryphaStatus: 'Generally excluded'
		}
	];

	const timeline = [
		{ period: '300-200 BCE', event: 'Septuagint (LXX) Translation', description: 'Hebrew Bible translated to Greek in Alexandria. Includes books later called Apocrypha.' },
		{ period: '90 CE', event: 'Council of Jamnia (Traditional)', description: 'Jewish scholars allegedly fixed Hebrew canon, excluding Apocrypha. Historical accuracy debated.' },
		{ period: '382 CE', event: 'Council of Rome', description: 'Pope Damasus commissions Latin Vulgate. Jerome includes Apocrypha as deuterocanonical.' },
		{ period: '397 CE', event: 'Council of Carthage', description: 'Affirms 27-book New Testament canon.' },
		{ period: '1546 CE', event: 'Council of Trent', description: 'Catholic Church formally affirms Apocrypha as canonical in response to Reformation.' },
		{ period: '1534 CE', event: "Luther's Bible", description: 'Luther moves Apocrypha to separate section: "useful and good to read" but not authoritative.' },
		{ period: '1827 CE', event: 'British & Foreign Bible Society', description: 'Stops printing Apocrypha in Protestant Bibles, solidifying Protestant exclusion.' }
	];
</script>

<svelte:head>
	<title>Non-Canonical Texts & Biblical Canons - Bible360</title>
	<meta name="description" content="Understanding apocrypha, pseudepigrapha, and different biblical canons across Christian traditions" />
</svelte:head>

<header class="bible360-header">
	<h1>Non-Canonical Texts & Biblical Canons</h1>
	<p>Understanding the diversity of sacred texts across Christian traditions</p>
</header>

<nav class="bible360-nav">
	<a href="/" class="nav-btn">Comparison</a>
	<a href="/about" class="nav-btn">About</a>
	<a href="/noncanonical" class="nav-btn active">Non-Canonical</a>
</nav>

<main class="bible360-content">
	<div class="content-container">

		<!-- Introduction -->
		<section class="intro-section">
			<h2>What Are Non-Canonical Texts?</h2>
			<p class="intro-text">
				The Bible360 reading plan includes texts beyond the standard Protestant canon. These texts fall into several categories with different levels of acceptance across Christian traditions. Understanding these distinctions helps readers contextualize what they're reading.
			</p>
			<div class="key-distinction">
				<h3>Key Distinction</h3>
				<p><strong>Archaeological discoveries</strong> (Dead Sea Scrolls, Nag Hammadi) are actual ancient manuscripts found in modern times. <strong>Pseudepigrapha</strong> are later texts claiming ancient authorship—written centuries after the events they describe by unknown authors.</p>
			</div>
			<div class="resource-links">
				<h3>Read These Texts Online</h3>
				<p>Many non-canonical texts are available for free online:</p>
				<ul>
					<li><a href="https://biblehub.com/apocrypha/" target="_blank" rel="noopener">BibleHub Apocrypha</a> - Deuterocanonical books with study tools</li>
					<li><a href="https://www.biblegateway.com/versions/New-Revised-Standard-Version-Updated-Edition-NRSVue-Bible/#booklist" target="_blank" rel="noopener">BibleGateway NRSVue</a> - Deuterocanonical books in the New Revised Standard Version Updated Edition</li>
					<li><a href="https://wesley.nnu.edu/noncanonical-literature/" target="_blank" rel="noopener">Wesley NNU Non-Canonical Literature</a> - Comprehensive collection of OT pseudepigrapha, NT apocrypha, and Apostolic Fathers</li>
					<li><a href="https://www.sacred-texts.com/chr/apo/index.htm" target="_blank" rel="noopener">Sacred Texts: Apocrypha</a> - Deuterocanonical books and pseudepigrapha</li>
					<li><a href="https://www.earlychristianwritings.com/" target="_blank" rel="noopener">Early Christian Writings</a> - New Testament apocrypha and Apostolic Fathers</li>
				</ul>
			</div>
		</section>

		<!-- Text Categories -->
		<section class="categories-section">
			<h2>Categories of Non-Canonical Texts</h2>
			<div class="categories-grid">
				{#each textCategories as category (category.name)}
					<div class="category-card">
						<div class="category-header">
							<span class="category-icon">{category.icon}</span>
							<h3>{category.name}</h3>
						</div>
						<p class="category-description">{category.description}</p>
						<div class="category-examples">
							<strong>Examples:</strong>
							{#each category.examples as example}
								<span class="example-tag">{example}</span>
							{/each}
						</div>
						<div class="category-texts">
							{#each category.texts as text}
								<p>{text}</p>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Canon Comparison Table -->
		<section class="canon-section">
			<h2>Biblical Canons Across Traditions</h2>
			<p class="section-intro">
				Different Christian traditions accept different books as authoritative Scripture. Here's how major traditions compare:
			</p>
			<div class="canon-table-container">
				<table class="canon-table">
					<thead>
						<tr>
							<th>Tradition</th>
							<th>OT</th>
							<th>NT</th>
							<th>Apocrypha</th>
							<th>Total</th>
							<th>Apocrypha Status</th>
						</tr>
					</thead>
					<tbody>
						{#each canons as canon (canon.tradition)}
							<tr style="border-left: 4px solid {canon.color}">
								<td><strong>{canon.tradition}</strong></td>
								<td>{canon.oldTestament}</td>
								<td>{canon.newTestament}</td>
								<td>{canon.apocrypha}</td>
								<td><strong>{canon.total}</strong></td>
								<td class="status-cell">{canon.apocryphaStatus}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<div class="canon-details">
				{#each canons as canon (canon.tradition)}
					<div class="canon-detail-card" style="border-top: 3px solid {canon.color}">
						<h4>{canon.tradition}</h4>
						<p>{canon.notes}</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- Historical Timeline -->
		<section class="timeline-section">
			<h2>Historical Development of the Canon</h2>
			<div class="timeline">
				{#each timeline as item (item.period)}
					<div class="timeline-item">
						<div class="timeline-period">{item.period}</div>
						<div class="timeline-content">
							<h4>{item.event}</h4>
							<p>{item.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Terminology -->
		<section class="terminology-section">
			<h2>Key Terminology</h2>
			<div class="term-grid">
				<div class="term-card">
					<h4>Apocrypha</h4>
					<p>From Greek "hidden things." Protestant term for deuterocanonical books. Catholic/Orthodox consider these canonical.</p>
				</div>
				<div class="term-card">
					<h4>Deuterocanonical</h4>
					<p>"Second canon." Catholic/Orthodox term for books added to the Hebrew canon. Same books Protestants call Apocrypha.</p>
				</div>
				<div class="term-card">
					<h4>Pseudepigrapha</h4>
					<p>"False writings." Texts falsely attributed to biblical figures. Written centuries after claimed authors lived.</p>
				</div>
				<div class="term-card">
					<h4>Septuagint (LXX)</h4>
					<p>Greek translation of Hebrew Bible (3rd c. BCE). Includes Apocrypha. Used by early church and Eastern churches.</p>
				</div>
				<div class="term-card">
					<h4>Vulgate</h4>
					<p>Latin translation by Jerome (4th c. CE). Catholic Church's official Bible until Vatican II.</p>
				</div>
				<div class="term-card">
					<h4>Anagignoskomena</h4>
					<p>"Things that are read." Orthodox term for deuterocanonical books—edifying but not always doctrinally authoritative.</p>
				</div>
			</div>
		</section>

		<!-- Ethiopian Canon Note -->
		<section class="special-note">
			<h2>The Ethiopian Exception</h2>
			<p>
				The Ethiopian Orthodox Tewahedo Church has the largest biblical canon, including 1 Enoch and Jubilees—which most other traditions consider pseudepigrapha. This is significant because:
			</p>
			<ul>
				<li>1 Enoch is quoted in Jude 14-15, showing its early authority</li>
				<li>Jubilees was found among the Dead Sea Scrolls, showing its ancient use</li>
				<li>These texts were likely more widely accepted in early Christianity than later</li>
			</ul>
			<p>
				Our reading plan includes these texts because of their historical significance and continued canonical status in one major tradition.
			</p>
		</section>

	</div>
</main>

<footer class="bible360-footer">
	<p>&copy; 2026 Bible360 - Chronological Bible Reading Plans</p>
</footer>

<style>
	.bible360-header {
		background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
		color: white;
		padding: 2rem;
		text-align: center;
	}

	.bible360-header h1 {
		margin: 0 0 0.5rem 0;
	}

	.bible360-header p {
		margin: 0;
		opacity: 0.9;
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

	.nav-btn:hover {
		background: #f0f0f0;
	}

	.nav-btn.active {
		background: #2c3e50;
		color: white;
	}

	.bible360-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	.content-container {
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
		border-bottom: 2px solid #2c3e50;
		padding-bottom: 0.5rem;
	}

	.intro-text {
		font-size: 1.1rem;
		line-height: 1.8;
	}

	.key-distinction {
		background: #e8f4fd;
		border-left: 4px solid #2c3e50;
		padding: 1.5rem;
		margin-top: 1.5rem;
		border-radius: 0 8px 8px 0;
	}

	.key-distinction h3 {
		margin: 0 0 0.5rem 0;
		color: #1a252f;
	}

	.resource-links {
		background: #f0f9f0;
		border-left: 4px solid #27ae60;
		padding: 1.5rem;
		margin-top: 1.5rem;
		border-radius: 0 8px 8px 0;
	}

	.resource-links h3 {
		margin: 0 0 0.5rem 0;
		color: #27ae60;
	}

	.resource-links p {
		margin: 0.5rem 0;
		color: #555;
	}

	.resource-links ul {
		margin: 0.5rem 0;
		padding-left: 1.5rem;
	}

	.resource-links li {
		margin: 0.5rem 0;
	}

	.resource-links a {
		color: #27ae60;
		font-weight: 500;
	}

	.resource-links a:hover {
		text-decoration: underline;
	}

	/* Categories Grid */
	.categories-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 1.5rem;
	}

	.category-card {
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		padding: 1.5rem;
		transition: transform 0.2s ease;
	}

	.category-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 15px rgba(0,0,0,0.1);
	}

	.category-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.category-icon {
		font-size: 2rem;
	}

	.category-header h3 {
		margin: 0;
		color: #2c3e50;
	}

	.category-description {
		color: #555;
		margin-bottom: 1rem;
	}

	.category-examples {
		margin-bottom: 1rem;
	}

	.example-tag {
		display: inline-block;
		background: #f0f0f0;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-size: 0.85rem;
		margin: 0.25rem 0.25rem 0.25rem 0;
	}

	.category-texts {
		font-size: 0.9rem;
		color: #666;
		border-top: 1px solid #eee;
		padding-top: 1rem;
	}

	.category-texts p {
		margin: 0.5rem 0;
	}

	/* Canon Table */
	.section-intro {
		margin-bottom: 1.5rem;
	}

	.canon-table-container {
		overflow-x: auto;
	}

	.canon-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.95rem;
	}

	.canon-table th {
		background: #2c3e50;
		color: white;
		padding: 1rem;
		text-align: left;
	}

	.canon-table td {
		padding: 1rem;
		border-bottom: 1px solid #e0e0e0;
	}

	.canon-table tbody tr:hover {
		background: #f8f9fa;
	}

	.status-cell {
		font-size: 0.85rem;
		color: #666;
	}

	.canon-details {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1rem;
		margin-top: 2rem;
	}

	.canon-detail-card {
		background: #f8f9fa;
		padding: 1rem;
		border-radius: 0 0 8px 8px;
	}

	.canon-detail-card h4 {
		margin: 0 0 0.5rem 0;
		color: #2c3e50;
	}

	.canon-detail-card p {
		margin: 0;
		font-size: 0.9rem;
		color: #555;
	}

	/* Timeline */
	.timeline {
		position: relative;
		padding-left: 2rem;
	}

	.timeline::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 3px;
		background: #2c3e50;
	}

	.timeline-item {
		position: relative;
		padding-bottom: 1.5rem;
		padding-left: 1.5rem;
	}

	.timeline-item::before {
		content: '';
		position: absolute;
		left: -2rem;
		top: 0.5rem;
		width: 12px;
		height: 12px;
		background: #2c3e50;
		border-radius: 50%;
		border: 3px solid white;
		box-shadow: 0 0 0 3px #2c3e50;
	}

	.timeline-period {
		font-weight: bold;
		color: #2c3e50;
		margin-bottom: 0.25rem;
	}

	.timeline-content h4 {
		margin: 0 0 0.25rem 0;
		color: #2c3e50;
	}

	.timeline-content p {
		margin: 0;
		color: #555;
		font-size: 0.95rem;
	}

	/* Terminology */
	.term-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1rem;
	}

	.term-card {
		background: #f8f9fa;
		padding: 1rem 1.5rem;
		border-radius: 8px;
		border-left: 3px solid #2c3e50;
	}

	.term-card h4 {
		margin: 0 0 0.5rem 0;
		color: #2c3e50;
	}

	.term-card p {
		margin: 0;
		font-size: 0.9rem;
		color: #555;
	}

	/* Special Note */
	.special-note {
		background: #fff9e6;
		border: 1px solid #f0e6c0;
	}

	.special-note h2 {
		border-bottom-color: #f39c12;
	}

	.special-note ul {
		margin: 1rem 0;
		padding-left: 1.5rem;
	}

	.special-note li {
		margin: 0.5rem 0;
	}

	/* Footer */
	.bible360-footer {
		background: #2c3e50;
		color: white;
		text-align: center;
		padding: 2rem;
		margin-top: 3rem;
	}

	@media (max-width: 768px) {
		.bible360-content {
			padding: 1rem;
		}

		section {
			padding: 1.5rem;
		}

		.categories-grid,
		.canon-details,
		.term-grid {
			grid-template-columns: 1fr;
		}

		.canon-table {
			font-size: 0.8rem;
		}

		.canon-table th,
		.canon-table td {
			padding: 0.5rem;
		}
	}
</style>
