/**
 * Strapi admin Vite config override (CommonJS — loaded by Strapi via require()).
 *
 * Fixes: "Unrecognized extension value in extension set ... multiple instances
 * of @codemirror/state are loaded, breaking instanceof checks."
 *
 * Triggered by the CodeMirror editor Strapi uses for JSON fields (e.g. the
 * `show_on_paths` field on global-settings -> newsletter). Strapi pre-bundles
 * @strapi/design-system, which bundles @uiw/react-codemirror + @codemirror/*
 * into its optimized chunk. Anything else importing @codemirror/state then gets
 * a SECOND copy from source -> CodeMirror's instanceof checks break.
 *
 * Excluding the CodeMirror packages from dep pre-bundling externalizes them, so
 * every importer resolves to the single source copy of @codemirror/state.
 * `resolve.dedupe` keeps resolution consistent for the production build.
 */
const { mergeConfig } = require('vite');

const codeMirrorPackages = [
  '@codemirror/state',
  '@codemirror/view',
  '@codemirror/commands',
  '@codemirror/language',
  '@codemirror/autocomplete',
  '@codemirror/lint',
  '@codemirror/search',
  '@codemirror/lang-json',
  '@codemirror/theme-one-dark',
  '@uiw/react-codemirror',
];

module.exports = (config) =>
  mergeConfig(config, {
    resolve: {
      dedupe: codeMirrorPackages,
    },
    optimizeDeps: {
      exclude: codeMirrorPackages,
    },
  });
