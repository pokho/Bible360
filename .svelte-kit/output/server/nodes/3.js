

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.CgQ0P401.js","_app/immutable/chunks/DYjCt7Qj.js","_app/immutable/chunks/B-yGD48A.js","_app/immutable/chunks/BEKGeloz.js"];
export const stylesheets = ["_app/immutable/assets/3.CKdDZ4Dt.css"];
export const fonts = [];
