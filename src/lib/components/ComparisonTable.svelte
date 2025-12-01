<script>
	import { readingPlans } from '$lib/stores/readingPlansStore';

	export let plans;
	export let sortedDays;

	
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
</script>

<div class="comparison-table-wrapper">
	<table class="comparison-table">
		<thead>
			<tr>
				<th>Day</th>
				<th>
					<a href="https://www.logos.com/grow/nook-chronological-bible-reading-plan/" target="_blank" rel="noopener" class="provider-link">
						Logos Academic
					</a>
				</th>
				<th>
					<a href="https://www.blueletterbible.org/dailyreading/" target="_blank" rel="noopener" class="provider-link">
						Blue Letter Bible
					</a>
				</th>
				<th>
					<a href="https://biblehub.com/timeline/" target="_blank" rel="noopener" class="provider-link">
						Biblehub Chronological
					</a>
				</th>
				<th>
					<a href="https://github.com/anthropics/bible360-research" target="_blank" rel="noopener" class="provider-link">
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

				<tr class="day-row">
					<td class="day-cell">
						<strong>Day {day}</strong>
					</td>
					<td class="plan-cell plan-logos">
						{@html logosReading ? renderPlanReading(logosReading, plans.logos) : '<span class="no-reading">No reading</span>'}
					</td>
					<td class="plan-cell plan-blb">
						{@html blbReading ? renderPlanReading(blbReading, plans.blb) : '<span class="no-reading">No reading</span>'}
					</td>
					<td class="plan-cell plan-biblehub">
						{@html biblehubReading ? renderPlanReading(biblehubReading, plans.biblehub) : '<span class="no-reading">No reading</span>'}
					</td>
					<td class="plan-cell plan-apocrypha">
						{@html apocryphaReading ? renderPlanReading(apocryphaReading, plans.apocrypha) : '<span class="no-reading">No reading</span>'}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	/* Additional styles specific to this component can go here */
	.comparison-table {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}

	.plan-cell {
		/* Additional component-specific styling */
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
		color: #007bff;
		text-decoration: none;
		font-weight: 500;
	}

	.passage-link:hover {
		text-decoration: underline;
		color: #0056b3;
	}
</style>