import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'bible360',
  devServer: {
    port: 3334,
    reloadStrategy: 'hmr',
  },
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      dir: 'www',
      buildDir: 'build',
      baseUrl: '/',
      appDir: 'src'
    },
  ],
  testing: {
    browserHeadless: "new",
  },
  extras: {
    cssVarsShim: true,
    dynamicImportShim: true,
    shadowDomShim: true,
    safari10: true,
    scriptDataOpts: true,
    appendChildSlotFix: true,
    cloneNodeFix: true,
    patchEsm: true,
  },
};