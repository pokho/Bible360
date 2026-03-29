<script>
	import { readingPlans } from '$lib/stores/readingPlansStore';
	import CommentButton from './CommentButton.svelte';
	import CommentModal from './CommentModal.svelte';

	export let plans;
	export let sortedDays;

	// Dropdown state for Logos/BLB toggle
	let selectedAcademicProvider = 'logos'; // 'logos' or 'blb'

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
								  passage.testament === 'apocryphal' ? 'apocryphal' : '';

			const passageContent = passage.href
				? `<a href="${passage.href}" target="_blank" rel="noopener" class="passage-link">${passage.book} ${passage.chapterStart}${passage.chapterEnd && passage.chapterEnd !== passage.chapterStart ? '-' + passage.chapterEnd : ''}</a>`
				: `<span>${passage.book} ${passage.chapterStart}${passage.chapterEnd && passage.chapterEnd !== passage.chapterStart ? '-' + passage.chapterEnd : ''}</span>`;

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
			'apocryphal': 'APO'
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
				<th>
					<a href="https://biblehub.com/timeline/" target="_blank" rel="noopener" class="provider-link">
						Biblehub Chronological
					</a>
				</th>
				<th>
					<a href="/noncanonical" class="provider-link">
						Apocrypha & Pseudepigrapha
					</a>
				</th>
			</tr>
		</thead>
		<tbody>
			{#each sortedDays as day}
				{@const logosReading = plans.logos?.dailyReadings.find(r => r.day === day)}
				{@const blbReading = plans.blb?.dailyReadings.find(r => r.day === day)}
				{@const biblehubReading = plans.biblehub?.dailyReadings.find(r => r.day === day)}
				{@const apocryphaReading = plans.apocrypha?.dailyReadings.find(r => r.day === day)}
				{@const currentAcademicReading = selectedAcademicProvider === 'logos' ? logosReading : blbReading}

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
						{@html biblehubReading ? renderPlanReading(biblehubReading, plans.biblehub) : '<span class="no-reading">No reading</span>'}
						{#if biblehubReading?.commentary}
							<CommentButton
								commentary={biblehubReading.commentary}
								provider="biblehub"
								onClick={() => openCommentModal(biblehubReading.commentary, 'biblehub', day)}
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
				</tr>
			{/each}
		</tbody>
	</table>
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
