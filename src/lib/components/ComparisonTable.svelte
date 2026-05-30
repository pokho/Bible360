<script>
	import { readingPlans } from '$lib/stores/readingPlansStore';
	import CommentButton from './CommentButton.svelte';
	import CommentModal from './CommentModal.svelte';

	export let plans;
	export let sortedDays;

	// Dropdown state for Logos/BLB toggle
	let selectedAcademicProvider = 'logos'; // 'logos' or 'blb'

	// Dropdown state for BibleHub toggle
	let selectedBiblehubProvider = 'interleaved'; // 'interleaved' or 'chronological'

	// Dropdown state for Quran toggle
	let selectedQuranProvider = 'egyptian'; // 'egyptian' or 'noldeke'

	// Modal state
	let showModal = false;
	let modalCommentary = '';
	let modalProvider = '';
	let modalDay = 0;

	function openCommentModal(commentary, provider, day) {
		modalCommentary = commentary;
		modalProvider = provider;
		modalDay = day;
		showModal = true;
	}

	function closeModal() {
		showModal = false;
		modalCommentary = '';
		modalProvider = '';
		modalDay = 0;
	}


	function renderPlanReading(reading, plan) {
		if (!reading || !reading.passages || reading.passages.length === 0) {
			return '<span class="no-reading">No reading</span>';
		}

		// Debug: Log the reading data
		console.log('Reading data for plan:', plan, 'Historical context:', reading.historicalContext);

		const passagesHtml = reading.passages.map(passage => {
			const testamentClass = passage.testament === 'old' ? 'old' :
								  passage.testament === 'new' ? 'new' :
								  passage.testament === 'apocryphal' ? 'apocryphal' :
								  passage.testament === 'meccan' ? 'meccan' :
								  passage.testament === 'medinan' ? 'medinan' : '';

			let passageLabel;
			if (passage.verseStart != null) {
				// Quran-style: show surah name with verse range
				passageLabel = `${passage.book} ${passage.verseStart}${passage.verseEnd && passage.verseEnd !== passage.verseStart ? '-' + passage.verseEnd : ''}`;
			} else {
				passageLabel = `${passage.book} ${passage.chapterStart}${passage.chapterEnd && passage.chapterEnd !== passage.chapterStart ? '-' + passage.chapterEnd : ''}`;
			}
			const passageContent = passage.href
				? `<a href="${passage.href}" target="_blank" rel="noopener" class="passage-link">${passageLabel}</a>`
				: `<span>${passageLabel}</span>`;

			return `
				<div class="passage">
					<span class="book">${passageContent}</span>
					<span class="testament ${testamentClass}">${getTestamentLabel(passage.testament)}</span>
				</div>
			`;
		}).join('');

		const readingTime = reading.readingTimeMinutes || 20;
		const hasApocrypha = reading.passages.some(p => p.testament === 'apocryphal');

		// Add text type badge if available
		let textTypeBadge = '';
		if (reading.textType) {
			const textTypeClass = `text-type-${reading.textType.replace('_', '-')}`;
			textTypeBadge = `<span class="text-type-badge ${textTypeClass}">${getTextTypeLabel(reading.textType)}</span>`;
		}

		// Add historical context if available
		let contextHtml = '';
		if (reading.historicalContext) {
			contextHtml = `
				<div class="reading-context">
					<strong>${reading.historicalContext.period}</strong>
					<div class="context-date">${reading.historicalContext.approximateDate}</div>
					<p>${reading.historicalContext.description}</p>
				</div>
			`;
		}

		const readingMeta = `
			<div class="reading-meta">
				<span class="reading-time">${readingTime} min</span>
				${textTypeBadge}
			</div>
		`;

		return `
			<div class="reading-content">
				${passagesHtml}
				${contextHtml}
				${readingMeta}
			</div>
		`;
	}


	function getTestamentLabel(testament) {
		const labels = {
			'old': 'OT',
			'new': 'NT',
			'apocryphal': 'APO',
			'meccan': 'MEC',
			'medinan': 'MED'
		};
		return labels[testament] || testament;
	}

	function getTextTypeLabel(textType) {
		const labels = {
			'archaeological': 'Archaeological',
			'deuterocanonical': 'Deuterocanonical',
			'pseudepigrapha': 'Pseudepigrapha',
			'apostolic_fathers': 'Apostolic Fathers',
			'nt_apocrypha': 'NT Apocrypha',
			'gnostic': 'Gnostic'
		};
		return labels[textType] || textType;
	}

	// Get the currently selected academic reading
	$: academicReading = (day) => {
		if (selectedAcademicProvider === 'logos') {
			return plans.logos?.dailyReadings.find(r => r.day === day);
		} else {
			return plans.blb?.dailyReadings.find(r => r.day === day);
		}
	};

	// Get the CSS class for the academic provider cell
	$: academicCellClass = selectedAcademicProvider === 'logos' ? 'plan-cell plan-logos' : 'plan-cell plan-blb';
</script>

<div class="comparison-table-wrapper">
	<table class="comparison-table">
		<thead>
			<tr>
				<th>Day</th>
				<th class="academic-provider-header">
					<div class="provider-selector">
						<select bind:value={selectedAcademicProvider} class="provider-dropdown">
							<option value="logos">Logos Academic</option>
							<option value="blb">Blue Letter Bible</option>
						</select>
						{#if selectedAcademicProvider === 'logos'}
							<a href="https://www.logos.com/grow/nook-chronological-bible-reading-plan/" target="_blank" rel="noopener" class="provider-external-link" title="Open Logos Academic">
								↗
							</a>
						{:else}
							<a href="https://www.blueletterbible.org/dailyreading/" target="_blank" rel="noopener" class="provider-external-link" title="Open Blue Letter Bible">
								↗
							</a>
						{/if}
					</div>
				</th>
				<th class="biblehub-provider-header">
					<div class="provider-selector">
						<select bind:value={selectedBiblehubProvider} class="provider-dropdown">
							<option value="interleaved">BibleHub Interleaved</option>
							<option value="chronological">BibleHub Chronological</option>
						</select>
						<a href="https://biblehub.com/timeline/" target="_blank" rel="noopener" class="provider-external-link" title="Open BibleHub Timeline">
							↗
						</a>
					</div>
				</th>
				<th>
					<a href="/noncanonical" class="provider-link">
						Apocrypha & Pseudepigrapha
					</a>
				</th>
				<th class="quran-provider-header">
					<div class="provider-selector">
						<select bind:value={selectedQuranProvider} class="provider-dropdown">
							<option value="egyptian">Quran (Egyptian)</option>
							<option value="noldeke">Quran (Noldeke)</option>
						</select>
						<a href="https://quran.com/" target="_blank" rel="noopener" class="provider-external-link" title="Open Quran.com">
							↗
						</a>
					</div>
				</th>
			</tr>
		</thead>
		<tbody>
			{#each sortedDays as day}
				{@const logosReading = plans.logos?.dailyReadings.find(r => r.day === day)}
				{@const blbReading = plans.blb?.dailyReadings.find(r => r.day === day)}
				{@const biblehubInterleavedReading = plans.biblehub?.dailyReadings.find(r => r.day === day)}
				{@const biblehubChronologicalReading = plans.biblehubChronological?.dailyReadings.find(r => r.day === day)}
				{@const apocryphaReading = plans.apocrypha?.dailyReadings.find(r => r.day === day)}
				{@const quranEgyptianReading = plans.quranEgyptian?.dailyReadings.find(r => r.day === day)}
				{@const quranNoldekeReading = plans.quranNoldeke?.dailyReadings.find(r => r.day === day)}
				{@const currentAcademicReading = selectedAcademicProvider === 'logos' ? logosReading : blbReading}
				{@const currentBiblehubReading = selectedBiblehubProvider === 'interleaved' ? biblehubInterleavedReading : biblehubChronologicalReading}
				{@const currentQuranReading = selectedQuranProvider === 'egyptian' ? quranEgyptianReading : quranNoldekeReading}

				<tr class="day-row">
					<td class="day-cell">
						<strong>Day {day}</strong>
					</td>
					<td class={academicCellClass}>
						{@html currentAcademicReading ? renderPlanReading(currentAcademicReading, selectedAcademicProvider === 'logos' ? plans.logos : plans.blb) : '<span class="no-reading">No reading</span>'}
						{#if currentAcademicReading?.commentary}
							<CommentButton
								commentary={currentAcademicReading.commentary}
								provider={selectedAcademicProvider}
								onClick={() => openCommentModal(currentAcademicReading.commentary, selectedAcademicProvider, day)}
							/>
						{/if}
					</td>
					<td class="plan-cell plan-biblehub">
						{@html currentBiblehubReading ? renderPlanReading(currentBiblehubReading, selectedBiblehubProvider === 'interleaved' ? plans.biblehub : plans.biblehubChronological) : '<span class="no-reading">No reading</span>'}
						{#if currentBiblehubReading?.commentary}
							<CommentButton
								commentary={currentBiblehubReading.commentary}
								provider={selectedBiblehubProvider === 'interleaved' ? 'biblehub' : 'biblehubChronological'}
								onClick={() => openCommentModal(currentBiblehubReading.commentary, selectedBiblehubProvider === 'interleaved' ? 'biblehub' : 'biblehubChronological', day)}
							/>
						{/if}
					</td>
					<td class="plan-cell plan-apocrypha">
						{@html apocryphaReading ? renderPlanReading(apocryphaReading, plans.apocrypha) : '<span class="no-reading">No reading</span>'}
						{#if apocryphaReading?.commentary}
							<CommentButton
								commentary={apocryphaReading.commentary}
								provider="apocrypha"
								onClick={() => openCommentModal(apocryphaReading.commentary, 'apocrypha', day)}
							/>
						{/if}
					</td>
					<td class="plan-cell plan-quran">
						{@html currentQuranReading ? renderPlanReading(currentQuranReading, selectedQuranProvider === 'egyptian' ? plans.quranEgyptian : plans.quranNoldeke) : '<span class="no-reading">No reading</span>'}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<!-- Mobile card layout (hidden on desktop, shown via CSS below 768px) -->
<div class="mobile-cards">
	<div class="mobile-provider-selectors">
		<div class="mobile-selector-group">
			<label for="mobile-academic-select">Academic:</label>
			<select id="mobile-academic-select" bind:value={selectedAcademicProvider} class="provider-dropdown">
				<option value="logos">Logos Academic</option>
				<option value="blb">Blue Letter Bible</option>
			</select>
		</div>
		<div class="mobile-selector-group">
			<label for="mobile-biblehub-select">BibleHub:</label>
			<select id="mobile-biblehub-select" bind:value={selectedBiblehubProvider} class="provider-dropdown">
				<option value="interleaved">Interleaved</option>
				<option value="chronological">Chronological</option>
			</select>
		</div>
		<div class="mobile-selector-group">
			<label for="mobile-quran-select">Quran:</label>
			<select id="mobile-quran-select" bind:value={selectedQuranProvider} class="provider-dropdown">
				<option value="egyptian">Egyptian</option>
				<option value="noldeke">Noldeke</option>
			</select>
		</div>
	</div>

	{#each sortedDays as day}
		{@const mobileLogosReading = plans.logos?.dailyReadings.find(r => r.day === day)}
		{@const mobileBlbReading = plans.blb?.dailyReadings.find(r => r.day === day)}
		{@const mobileBiblehubInterleavedReading = plans.biblehub?.dailyReadings.find(r => r.day === day)}
		{@const mobileBiblehubChronologicalReading = plans.biblehubChronological?.dailyReadings.find(r => r.day === day)}
		{@const mobileApocryphaReading = plans.apocrypha?.dailyReadings.find(r => r.day === day)}
		{@const mobileQuranEgyptianReading = plans.quranEgyptian?.dailyReadings.find(r => r.day === day)}
		{@const mobileQuranNoldekeReading = plans.quranNoldeke?.dailyReadings.find(r => r.day === day)}
		{@const mobileAcademicReading = selectedAcademicProvider === 'logos' ? mobileLogosReading : mobileBlbReading}
		{@const mobileBiblehubReading = selectedBiblehubProvider === 'interleaved' ? mobileBiblehubInterleavedReading : mobileBiblehubChronologicalReading}
		{@const mobileQuranReading = selectedQuranProvider === 'egyptian' ? mobileQuranEgyptianReading : mobileQuranNoldekeReading}

		<div class="day-card">
			<div class="day-card-header">
				<strong>Day {day}</strong>
			</div>

			<div class="provider-section {selectedAcademicProvider === 'logos' ? 'plan-logos' : 'plan-blb'}">
				<div class="provider-label">
					{selectedAcademicProvider === 'logos' ? 'Logos Academic' : 'Blue Letter Bible'}
				</div>
				{@html mobileAcademicReading ? renderPlanReading(mobileAcademicReading, selectedAcademicProvider === 'logos' ? plans.logos : plans.blb) : '<span class="no-reading">No reading</span>'}
				{#if mobileAcademicReading?.commentary}
					<CommentButton
						commentary={mobileAcademicReading.commentary}
						provider={selectedAcademicProvider}
						onClick={() => openCommentModal(mobileAcademicReading.commentary, selectedAcademicProvider, day)}
					/>
				{/if}
			</div>

			<div class="provider-section plan-biblehub">
				<div class="provider-label">
					{selectedBiblehubProvider === 'interleaved' ? 'BibleHub Interleaved' : 'BibleHub Chronological'}
				</div>
				{@html mobileBiblehubReading ? renderPlanReading(mobileBiblehubReading, selectedBiblehubProvider === 'interleaved' ? plans.biblehub : plans.biblehubChronological) : '<span class="no-reading">No reading</span>'}
				{#if mobileBiblehubReading?.commentary}
					<CommentButton
						commentary={mobileBiblehubReading.commentary}
						provider={selectedBiblehubProvider === 'interleaved' ? 'biblehub' : 'biblehubChronological'}
						onClick={() => openCommentModal(mobileBiblehubReading.commentary, selectedBiblehubProvider === 'interleaved' ? 'biblehub' : 'biblehubChronological', day)}
					/>
				{/if}
			</div>

			<div class="provider-section plan-apocrypha">
				<div class="provider-label">
					Apocrypha & Pseudepigrapha
				</div>
				{@html mobileApocryphaReading ? renderPlanReading(mobileApocryphaReading, plans.apocrypha) : '<span class="no-reading">No reading</span>'}
				{#if mobileApocryphaReading?.commentary}
					<CommentButton
						commentary={mobileApocryphaReading.commentary}
						provider="apocrypha"
						onClick={() => openCommentModal(mobileApocryphaReading.commentary, 'apocrypha', day)}
					/>
				{/if}
			</div>

			<div class="provider-section plan-quran">
				<div class="provider-label">
					{selectedQuranProvider === 'egyptian' ? 'Quran (Egyptian Standard)' : 'Quran (Noldeke)'}
				</div>
				{@html mobileQuranReading ? renderPlanReading(mobileQuranReading, selectedQuranProvider === 'egyptian' ? plans.quranEgyptian : plans.quranNoldeke) : '<span class="no-reading">No reading</span>'}
			</div>
		</div>
	{/each}
</div>

<CommentModal
	isOpen={showModal}
	commentary={modalCommentary}
	provider={modalProvider}
	day={modalDay}
	onClose={closeModal}
/>

<style>
	/* Additional styles specific to this component can go here */
	.comparison-table {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}

	.academic-provider-header {
		min-width: 200px;
	}

	.biblehub-provider-header {
		min-width: 200px;
	}

	.quran-provider-header {
		min-width: 200px;
	}

	.provider-selector {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.provider-dropdown {
		padding: 0.4rem 0.75rem;
		border: 1px solid #bdc3c7;
		border-radius: 6px;
		background: white;
		font-size: 0.9rem;
		font-weight: 600;
		color: #2c3e50;
		cursor: pointer;
		transition: all 0.2s ease;
		outline: none;
	}

	.provider-dropdown:hover {
		border-color: #3498db;
	}

	.provider-dropdown:focus {
		border-color: #3498db;
		box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
	}

	.provider-external-link {
		color: #3498db;
		text-decoration: none;
		font-size: 1rem;
		transition: color 0.2s ease;
	}

	.provider-external-link:hover {
		color: #2980b9;
		text-decoration: none;
	}

	.plan-cell {
		position: relative;
		padding: 12px;
		min-width: 180px;
		max-width: 220px;
		vertical-align: top;
	}

	.reading-context {
		margin-top: 0.5rem;
		padding: 0.5rem;
		background-color: #f8f9fa;
		border-left: 3px solid #6c757d;
		border-radius: 0.25rem;
		font-size: 0.8rem;
		line-height: 1.3;
	}

	.reading-context strong {
		color: #495057;
		display: block;
		margin-bottom: 0.25rem;
		font-weight: 600;
	}

	.context-date {
		color: #6c757d;
		font-size: 0.75rem;
		margin-bottom: 0.25rem;
		font-style: italic;
	}

	.reading-context p {
		margin: 0;
		color: #495057;
	}

	.passage-link {
		color: #2c3e50;
		text-decoration: none;
		font-weight: 500;
	}

	.passage-link:hover {
		text-decoration: underline;
		color: #0056b3;
	}

	.reading-meta {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}

	.text-type-badge {
		font-size: 0.7rem;
		padding: 0.15rem 0.4rem;
		border-radius: 3px;
		font-weight: 500;
		text-transform: capitalize;
	}

	.text-type-archaeological {
		background: #fff3e0;
		color: #856404;
		border: 1px solid #ffd700;
	}

	.text-type-deuterocanonical {
		background: #e8f4fd;
		color: #1a5276;
		border: 1px solid #2c3e50;
	}

	.text-type-pseudepigrapha {
		background: #fdf2e8;
		color: #92400e;
		border: 1px solid #f97316;
	}

	.text-type-apostolic-fathers {
		background: #f0fdf4;
		color: #166534;
		border: 1px solid #22c55e;
	}

	.text-type-nt-apocrypha {
		background: #fdf4ff;
		color: #7c3aed;
		border: 1px solid #9b59b6;
	}

	.text-type-gnostic {
		background: #f5f0ff;
		color: #6b21a8;
		border: 1px solid #a855f7;
	}
</style>
