import { c as create_ssr_component, e as each, v as validate_component } from "../../chunks/ssr.js";
import { w as writable } from "../../chunks/index.js";
import { e as escape } from "../../chunks/escape.js";
function createReadingPlansStore() {
  const { subscribe, set, update } = writable({
    esv: {
      provider: "esv",
      dailyReadings: [],
      color: "#e74c3c",
      sourceUrl: "https://www.esv.org/resources/reading-plans/chronological/"
    },
    logos: {
      provider: "logos",
      dailyReadings: [],
      color: "#3498db",
      sourceUrl: "https://www.logos.com/grow/nook-chronological-bible-reading-plan/"
    },
    blb: {
      provider: "blue-letter-bible",
      dailyReadings: [],
      color: "#9b59b6",
      sourceUrl: "https://www.blueletterbible.org/dailyreading/"
    },
    apocrypha: {
      provider: "apocrypha",
      dailyReadings: [],
      color: "#e67e22",
      sourceUrl: "https://github.com/anthropics/bible360-research"
    },
    biblehub: {
      provider: "biblehub",
      dailyReadings: [],
      color: "#27ae60",
      sourceUrl: "https://biblehub.com/timeline/"
    }
  });
  return {
    subscribe,
    set,
    update
  };
}
createReadingPlansStore();
const css = {
  code: ".comparison-table.svelte-1j2boiw{font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif}",
  map: `{"version":3,"file":"ComparisonTable.svelte","sources":["ComparisonTable.svelte"],"sourcesContent":["<script>\\n\\timport { readingPlans } from '$lib/stores/readingPlansStore';\\n\\n\\texport let plans;\\n\\texport let sortedDays;\\n\\n\\t$: contextCache = new Map();\\n\\n\\tfunction getContextForDay(day) {\\n\\t\\t// Check cache first\\n\\t\\tif (contextCache.has(day)) {\\n\\t\\t\\treturn contextCache.get(day);\\n\\t\\t}\\n\\n\\t\\t// Get context from the first available plan that has a reading for this day\\n\\t\\tfor (const planKey of Object.keys(plans)) {\\n\\t\\t\\tconst plan = plans[planKey];\\n\\t\\t\\tconst reading = plan.dailyReadings.find(r => r.day === day);\\n\\t\\t\\tif (reading && reading.historicalContext) {\\n\\t\\t\\t\\tcontextCache.set(day, reading.historicalContext);\\n\\t\\t\\t\\treturn reading.historicalContext;\\n\\t\\t\\t}\\n\\t\\t}\\n\\n\\t\\treturn null;\\n\\t}\\n\\n\\tfunction renderPlanReading(reading, plan) {\\n\\t\\tif (!reading || !reading.passages || reading.passages.length === 0) {\\n\\t\\t\\treturn '<span class=\\"no-reading\\">No reading</span>';\\n\\t\\t}\\n\\n\\t\\tconst passagesHtml = reading.passages.map(passage => {\\n\\t\\t\\tconst testamentClass = passage.testament === 'old' ? 'old' :\\n\\t\\t\\t\\t\\t\\t\\t\\t  passage.testament === 'new' ? 'new' :\\n\\t\\t\\t\\t\\t\\t\\t\\t  passage.testament === 'apocryphal' ? 'apocryphal' : '';\\n\\n\\t\\t\\treturn \`\\n\\t\\t\\t\\t<div class=\\"passage\\">\\n\\t\\t\\t\\t\\t<span class=\\"book\\">\${passage.book} \${passage.chapterStart}\${passage.chapterEnd && passage.chapterEnd !== passage.chapterStart ? '-' + passage.chapterEnd : ''}</span>\\n\\t\\t\\t\\t\\t<span class=\\"testament \${testamentClass}\\">\${getTestamentLabel(passage.testament)}</span>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\`;\\n\\t\\t}).join('');\\n\\n\\t\\tconst readingTime = reading.readingTimeMinutes || 20;\\n\\t\\tconst hasApocrypha = reading.passages.some(p => p.testament === 'apocryphal');\\n\\n\\t\\tconst readingMeta = \`\\n\\t\\t\\t<div class=\\"reading-meta\\">\\n\\t\\t\\t\\t<span class=\\"reading-time\\">\${readingTime} min</span>\\n\\t\\t\\t\\t\${hasApocrypha ? '<span class=\\"apocrypha-indicator\\">📖 Apocrypha</span>' : ''}\\n\\t\\t\\t</div>\\n\\t\\t\`;\\n\\n\\t\\treturn \`\\n\\t\\t\\t<div class=\\"reading-content\\">\\n\\t\\t\\t\\t\${passagesHtml}\\n\\t\\t\\t\\t\${readingMeta}\\n\\t\\t\\t</div>\\n\\t\\t\`;\\n\\t}\\n\\n\\tfunction renderContext(context) {\\n\\t\\tif (!context) {\\n\\t\\t\\treturn '<span class=\\"no-context\\">-</span>';\\n\\t\\t}\\n\\n\\t\\treturn \`\\n\\t\\t\\t<div class=\\"context-content\\">\\n\\t\\t\\t\\t<strong>\${context.period}</strong>\\n\\t\\t\\t\\t<div class=\\"context-date\\">\${context.approximateDate}</div>\\n\\t\\t\\t\\t<p>\${context.description}</p>\\n\\t\\t\\t</div>\\n\\t\\t\`;\\n\\t}\\n\\n\\tfunction getTestamentLabel(testament) {\\n\\t\\tconst labels = {\\n\\t\\t\\t'old': 'OT',\\n\\t\\t\\t'new': 'NT',\\n\\t\\t\\t'apocryphal': 'APO'\\n\\t\\t};\\n\\t\\treturn labels[testament] || testament;\\n\\t}\\n<\/script>\\n\\n<div class=\\"comparison-table-wrapper\\">\\n\\t<table class=\\"comparison-table\\">\\n\\t\\t<thead>\\n\\t\\t\\t<tr>\\n\\t\\t\\t\\t<th>Day</th>\\n\\t\\t\\t\\t<th>\\n\\t\\t\\t\\t\\t<a href=\\"https://www.esv.org/resources/reading-plans/chronological/\\" target=\\"_blank\\" rel=\\"noopener\\" class=\\"provider-link\\">\\n\\t\\t\\t\\t\\t\\tESV Chronological\\n\\t\\t\\t\\t\\t</a>\\n\\t\\t\\t\\t</th>\\n\\t\\t\\t\\t<th>\\n\\t\\t\\t\\t\\t<a href=\\"https://www.logos.com/grow/nook-chronological-bible-reading-plan/\\" target=\\"_blank\\" rel=\\"noopener\\" class=\\"provider-link\\">\\n\\t\\t\\t\\t\\t\\tLogos Chronological\\n\\t\\t\\t\\t\\t</a>\\n\\t\\t\\t\\t</th>\\n\\t\\t\\t\\t<th>\\n\\t\\t\\t\\t\\t<a href=\\"https://www.blueletterbible.org/dailyreading/\\" target=\\"_blank\\" rel=\\"noopener\\" class=\\"provider-link\\">\\n\\t\\t\\t\\t\\t\\tBlue Letter Bible\\n\\t\\t\\t\\t\\t</a>\\n\\t\\t\\t\\t</th>\\n\\t\\t\\t\\t<th>\\n\\t\\t\\t\\t\\t<a href=\\"https://github.com/anthropics/bible360-research\\" target=\\"_blank\\" rel=\\"noopener\\" class=\\"provider-link\\">\\n\\t\\t\\t\\t\\t\\tApocrypha & Pseudepigrapha\\n\\t\\t\\t\\t\\t</a>\\n\\t\\t\\t\\t</th>\\n\\t\\t\\t\\t<th>\\n\\t\\t\\t\\t\\t<a href=\\"https://biblehub.com/timeline/\\" target=\\"_blank\\" rel=\\"noopener\\" class=\\"provider-link\\">\\n\\t\\t\\t\\t\\t\\tBiblehub Chronological\\n\\t\\t\\t\\t\\t</a>\\n\\t\\t\\t\\t</th>\\n\\t\\t\\t\\t<th>Historical Context</th>\\n\\t\\t\\t</tr>\\n\\t\\t</thead>\\n\\t\\t<tbody>\\n\\t\\t\\t{#each sortedDays as day}\\n\\t\\t\\t\\t{@const esvReading = plans.esv?.dailyReadings.find(r => r.day === day)}\\n\\t\\t\\t\\t{@const logosReading = plans.logos?.dailyReadings.find(r => r.day === day)}\\n\\t\\t\\t\\t{@const blbReading = plans.blb?.dailyReadings.find(r => r.day === day)}\\n\\t\\t\\t\\t{@const apocryphaReading = plans.apocrypha?.dailyReadings.find(r => r.day === day)}\\n\\t\\t\\t\\t{@const biblehubReading = plans.biblehub?.dailyReadings.find(r => r.day === day)}\\n\\t\\t\\t\\t{@const context = getContextForDay(day)}\\n\\n\\t\\t\\t\\t<tr class=\\"day-row\\">\\n\\t\\t\\t\\t\\t<td class=\\"day-cell\\">\\n\\t\\t\\t\\t\\t\\t<strong>Day {day}</strong>\\n\\t\\t\\t\\t\\t</td>\\n\\t\\t\\t\\t\\t<td class=\\"plan-cell plan-esv\\">\\n\\t\\t\\t\\t\\t\\t{@html esvReading ? renderPlanReading(esvReading, plans.esv) : '<span class=\\"no-reading\\">No reading</span>'}\\n\\t\\t\\t\\t\\t</td>\\n\\t\\t\\t\\t\\t<td class=\\"plan-cell plan-logos\\">\\n\\t\\t\\t\\t\\t\\t{@html logosReading ? renderPlanReading(logosReading, plans.logos) : '<span class=\\"no-reading\\">No reading</span>'}\\n\\t\\t\\t\\t\\t</td>\\n\\t\\t\\t\\t\\t<td class=\\"plan-cell plan-blb\\">\\n\\t\\t\\t\\t\\t\\t{@html blbReading ? renderPlanReading(blbReading, plans.blb) : '<span class=\\"no-reading\\">No reading</span>'}\\n\\t\\t\\t\\t\\t</td>\\n\\t\\t\\t\\t\\t<td class=\\"plan-cell plan-apocrypha\\">\\n\\t\\t\\t\\t\\t\\t{@html apocryphaReading ? renderPlanReading(apocryphaReading, plans.apocrypha) : '<span class=\\"no-reading\\">No reading</span>'}\\n\\t\\t\\t\\t\\t</td>\\n\\t\\t\\t\\t\\t<td class=\\"plan-cell plan-biblehub\\">\\n\\t\\t\\t\\t\\t\\t{@html biblehubReading ? renderPlanReading(biblehubReading, plans.biblehub) : '<span class=\\"no-reading\\">No reading</span>'}\\n\\t\\t\\t\\t\\t</td>\\n\\t\\t\\t\\t\\t<td class=\\"context-cell\\">\\n\\t\\t\\t\\t\\t\\t{@html context ? renderContext(context) : '<span class=\\"no-context\\">-</span>'}\\n\\t\\t\\t\\t\\t</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t{/each}\\n\\t\\t</tbody>\\n\\t</table>\\n</div>\\n\\n<style>\\n\\t/* Additional styles specific to this component can go here */\\n\\t.comparison-table {\\n\\t\\tfont-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\\n\\t}\\n\\n\\t.plan-cell {\\n\\t\\t/* Additional component-specific styling */\\n\\t}\\n</style>"],"names":[],"mappings":"AA+JC,gCAAkB,CACjB,WAAW,CAAE,OAAO,CAAC,CAAC,aAAa,CAAC,CAAC,kBAAkB,CAAC,CAAC,UAAU,CAAC,CAAC,MAAM,CAAC,CAAC,UAC9E"}`
};
function renderPlanReading(reading, plan) {
  if (!reading || !reading.passages || reading.passages.length === 0) {
    return '<span class="no-reading">No reading</span>';
  }
  const passagesHtml = reading.passages.map((passage) => {
    const testamentClass = passage.testament === "old" ? "old" : passage.testament === "new" ? "new" : passage.testament === "apocryphal" ? "apocryphal" : "";
    return `
				<div class="passage">
					<span class="book">${passage.book} ${passage.chapterStart}${passage.chapterEnd && passage.chapterEnd !== passage.chapterStart ? "-" + passage.chapterEnd : ""}</span>
					<span class="testament ${testamentClass}">${getTestamentLabel(passage.testament)}</span>
				</div>
			`;
  }).join("");
  const readingTime = reading.readingTimeMinutes || 20;
  const hasApocrypha = reading.passages.some((p) => p.testament === "apocryphal");
  const readingMeta = `
			<div class="reading-meta">
				<span class="reading-time">${readingTime} min</span>
				${hasApocrypha ? '<span class="apocrypha-indicator">📖 Apocrypha</span>' : ""}
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
    "old": "OT",
    "new": "NT",
    "apocryphal": "APO"
  };
  return labels[testament] || testament;
}
const ComparisonTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let contextCache;
  let { plans } = $$props;
  let { sortedDays } = $$props;
  function getContextForDay(day) {
    if (contextCache.has(day)) {
      return contextCache.get(day);
    }
    for (const planKey of Object.keys(plans)) {
      const plan = plans[planKey];
      const reading = plan.dailyReadings.find((r) => r.day === day);
      if (reading && reading.historicalContext) {
        contextCache.set(day, reading.historicalContext);
        return reading.historicalContext;
      }
    }
    return null;
  }
  if ($$props.plans === void 0 && $$bindings.plans && plans !== void 0) $$bindings.plans(plans);
  if ($$props.sortedDays === void 0 && $$bindings.sortedDays && sortedDays !== void 0) $$bindings.sortedDays(sortedDays);
  $$result.css.add(css);
  contextCache = /* @__PURE__ */ new Map();
  return `<div class="comparison-table-wrapper"><table class="comparison-table svelte-1j2boiw"><thead data-svelte-h="svelte-mdlvwh"><tr><th>Day</th> <th><a href="https://www.esv.org/resources/reading-plans/chronological/" target="_blank" rel="noopener" class="provider-link">ESV Chronological</a></th> <th><a href="https://www.logos.com/grow/nook-chronological-bible-reading-plan/" target="_blank" rel="noopener" class="provider-link">Logos Chronological</a></th> <th><a href="https://www.blueletterbible.org/dailyreading/" target="_blank" rel="noopener" class="provider-link">Blue Letter Bible</a></th> <th><a href="https://github.com/anthropics/bible360-research" target="_blank" rel="noopener" class="provider-link">Apocrypha &amp; Pseudepigrapha</a></th> <th><a href="https://biblehub.com/timeline/" target="_blank" rel="noopener" class="provider-link">Biblehub Chronological</a></th> <th>Historical Context</th></tr></thead> <tbody>${each(sortedDays, (day) => {
    let esvReading = plans.esv?.dailyReadings.find((r) => r.day === day), logosReading = plans.logos?.dailyReadings.find((r) => r.day === day), blbReading = plans.blb?.dailyReadings.find((r) => r.day === day), apocryphaReading = plans.apocrypha?.dailyReadings.find((r) => r.day === day), biblehubReading = plans.biblehub?.dailyReadings.find((r) => r.day === day), context = getContextForDay(day);
    return `      <tr class="day-row"><td class="day-cell"><strong>Day ${escape(day)}</strong></td> <td class="plan-cell plan-esv svelte-1j2boiw"><!-- HTML_TAG_START -->${esvReading ? renderPlanReading(esvReading, plans.esv) : '<span class="no-reading">No reading</span>'}<!-- HTML_TAG_END --></td> <td class="plan-cell plan-logos svelte-1j2boiw"><!-- HTML_TAG_START -->${logosReading ? renderPlanReading(logosReading, plans.logos) : '<span class="no-reading">No reading</span>'}<!-- HTML_TAG_END --></td> <td class="plan-cell plan-blb svelte-1j2boiw"><!-- HTML_TAG_START -->${blbReading ? renderPlanReading(blbReading, plans.blb) : '<span class="no-reading">No reading</span>'}<!-- HTML_TAG_END --></td> <td class="plan-cell plan-apocrypha svelte-1j2boiw"><!-- HTML_TAG_START -->${apocryphaReading ? renderPlanReading(apocryphaReading, plans.apocrypha) : '<span class="no-reading">No reading</span>'}<!-- HTML_TAG_END --></td> <td class="plan-cell plan-biblehub svelte-1j2boiw"><!-- HTML_TAG_START -->${biblehubReading ? renderPlanReading(biblehubReading, plans.biblehub) : '<span class="no-reading">No reading</span>'}<!-- HTML_TAG_END --></td> <td class="context-cell"><!-- HTML_TAG_START -->${context ? renderContext(context) : '<span class="no-context">-</span>'}<!-- HTML_TAG_END --></td> </tr>`;
  })}</tbody></table> </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let allReadingProviders;
  let sortedDays;
  allReadingProviders = [];
  sortedDays = [];
  return `${$$result.head += `<!-- HEAD_svelte-1wcjt5o_START -->${$$result.title = `<title>Bible360 - Chronological Bible Reading Plans</title>`, ""}<meta name="description" content="Multi-provider chronological Bible reading plans with Blue Letter Bible, ESV, Logos, Apocrypha, and Biblehub methodologies"><!-- HEAD_svelte-1wcjt5o_END -->`, ""} <header class="bible360-header" data-svelte-h="svelte-1fwwzv8"><h1>Bible360</h1> <p>Chronological Bible Reading Plans - Multi-Provider Comparison</p></header> <nav class="bible360-nav" data-svelte-h="svelte-1msdb8z"><a href="/" class="nav-btn active">Comparison</a> <a href="/plans" class="nav-btn">Reading Plans</a> <a href="/about" class="nav-btn">About</a></nav> <main class="bible360-content"><div class="comparison-table-container"><div class="comparison-header"><h2 data-svelte-h="svelte-qml09">Reading Plan Comparison - All Days</h2> <div class="plan-legend">${each(allReadingProviders, (plan) => {
    return `<div class="legend-item"><span class="${"legend-color plan-" + escape(plan.key, true)}"></span> <span>${escape(plan.name)}</span> <small>(${escape(plan.methodology)})</small> </div>`;
  })}</div></div> ${validate_component(ComparisonTable, "ComparisonTable").$$render($$result, { plans: allReadingProviders, sortedDays }, {}, {})}</div></main> <footer class="bible360-footer" data-svelte-h="svelte-1xzsabr"><p>© 2025 Bible360 - Chronological Bible Reading Plans</p> <div class="source-attribution"><p>Reading plans based on data from:</p> <div class="source-links"><a href="https://www.esv.org/resources/reading-plans/chronological/" target="_blank" rel="noopener">ESV.org</a> <a href="https://www.logos.com/grow/nook-chronological-bible-reading-plan/" target="_blank" rel="noopener">Logos.com</a> <a href="https://www.blueletterbible.org/dailyreading/" target="_blank" rel="noopener">BlueLetterBible.org</a> <a href="https://biblehub.com/timeline/" target="_blank" rel="noopener">Biblehub</a></div></div></footer>`;
});
export {
  Page as default
};
