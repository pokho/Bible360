import { c as create_ssr_component } from "../../chunks/ssr.js";
const css = {
  code: "body{font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;line-height:1.6;color:#333;background:#f8f9fa;margin:0;padding:0;min-height:100vh}*{box-sizing:border-box}#app.svelte-yv1pdf{min-height:100vh;display:flex;flex-direction:column}",
  map: `{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script lang=\\"ts\\">\\n\\timport '../app.css';\\n<\/script>\\n\\n<div id=\\"app\\">\\n\\t<slot />\\n</div>\\n\\n<style>\\n\\t:global(body) {\\n\\t\\tfont-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\\n\\t\\tline-height: 1.6;\\n\\t\\tcolor: #333;\\n\\t\\tbackground: #f8f9fa;\\n\\t\\tmargin: 0;\\n\\t\\tpadding: 0;\\n\\t\\tmin-height: 100vh;\\n\\t}\\n\\n\\t:global(*) {\\n\\t\\tbox-sizing: border-box;\\n\\t}\\n\\n\\t#app {\\n\\t\\tmin-height: 100vh;\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t}\\n</style>"],"names":[],"mappings":"AASS,IAAM,CACb,WAAW,CAAE,OAAO,CAAC,CAAC,aAAa,CAAC,CAAC,kBAAkB,CAAC,CAAC,UAAU,CAAC,CAAC,MAAM,CAAC,CAAC,UAAU,CACvF,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,OAAO,CACnB,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,KACb,CAEQ,CAAG,CACV,UAAU,CAAE,UACb,CAEA,kBAAK,CACJ,UAAU,CAAE,KAAK,CACjB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MACjB"}`
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div id="app" class="svelte-yv1pdf">${slots.default ? slots.default({}) : ``} </div>`;
});
export {
  Layout as default
};
