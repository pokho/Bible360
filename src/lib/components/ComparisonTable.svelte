<script>
	import { readingPlans } from '$lib/stores/readingPlansStore';

	export let plans;
	export let sortedDays;

	$: contextCache = new Map();

	function getContextForDay(day) {
		// Check cache first
		if (contextCache.has(day)) {
			return contextCache.get(day);
		}

		// Get context from the first available plan that has a reading for this day
		for (const planKey of Object.keys(plans)) {
			const plan = plans[planKey];
			const reading = plan.dailyReadings.find(r => r.day === day);
			if (reading && reading.historicalContext) {
				contextCache.set(day, reading.historicalContext);
				return reading.historicalContext;
			}
		}

		return null;
	}

	function renderPlanReading(reading, plan) {
		if (!reading || !reading.passages || reading.passages.length === 0) {
			return '<span class="no-reading">No reading</span>';
		}

		const passagesHtml = reading.passages.map(passage => {
			const testamentClass = passage.testament === 'old' ? 'old' :
								  passage.testament === 'new' ? 'new' :
								  passage.testament === 'apocryphal' ? 'apocryphal' : '';

			return `
				<div class="passage">
					<span class="book">${passage.book} ${passage.chapterStart}${passage.chapterEnd && passage.chapterEnd !== passage.chapterStart ? '-' + passage.chapterEnd : ''}</span>
					<span class="testament ${testamentClass}">${getTestamentLabel(passage.testament)}</span>
				</div>
			`;
		}).join('');

		const readingTime = reading.readingTimeMinutes || 20;
		const hasApocrypha = reading.passages.some(p => p.testament === 'apocryphal');

		const readingMeta = `
			<div class="reading-meta">
				<span class="reading-time">${readingTime} min</span>
				${hasApocrypha ? '<span class="apocrypha-indicator">📖 Apocrypha</span>' : ''}
			</div>
		`;

		return `
			<div class="reading-content">
				${passagesHtml}
				${readingMeta}
			</div>
		`;
	}

	function renderContext(context) {
		if (!context) {
			return '<span class="no-context">-</span>';
		}

		return `
			<div class="context-content">
				<strong>${context.period}</strong>
				<div class="context-date">${context.approximateDate}</div>
				<p>${context.description}</p>
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
				<th>Historical Context</th>
			</tr>
		</thead>
		<tbody>
			{#each sortedDays as day}
				{@const logosReading = plans.logos?.dailyReadings.find(r => r.day === day)}
				{@const blbReading = plans.blb?.dailyReadings.find(r => r.day === day)}
				{@const biblehubReading = plans.biblehub?.dailyReadings.find(r => r.day === day)}
				{@const apocryphaReading = plans.apocrypha?.dailyReadings.find(r => r.day === day)}
				{@const context = getContextForDay(day)}

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
					<td class="context-cell">
						{@html context ? renderContext(context) : '<span class="no-context">-</span>'}
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
</style>