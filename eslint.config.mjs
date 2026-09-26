// @ts-check
import antfu from '@antfu/eslint-config'
import betterTailwindcss from 'eslint-plugin-better-tailwindcss'
import { getDefaultAttributes } from 'eslint-plugin-better-tailwindcss/api/defaults'
import nuxt from './.nuxt/eslint.config.mjs'

/**
 * The setup of antfu/vitesse-nuxt: @antfu/eslint-config owns the style, and
 * @nuxt/eslint (standalone: false in nuxt.config.ts) adds only the Nuxt rules.
 */
export default antfu(
  {
    formatters: true,
    antislop: true,
    // content/ and docs-types/ are imported from the framework repository
    // (scripts/import-docs.ts): its pages, whose code blocks are fragments
    // ("..."), and its generated type declarations.
    markdown: false,
    ignores: ['content/**', 'docs-types/**', 'docs-types-ru/**'],
  },
  {
    ...betterTailwindcss.configs['correctness-error'],
    files: ['**/*.vue'],
    settings: {
      'better-tailwindcss': {
        entryPoint: 'app/assets/css/main.css',
        attributes: [
          ...getDefaultAttributes(),
          ['^v-bind:ui$', [{ match: 'objectValues' }]],
        ],
      },
    },
    rules: {
      ...betterTailwindcss.configs['correctness-error'].rules,
      // StarsBg.vue styles these itself, in its <style> block.
      'better-tailwindcss/no-unknown-classes': ['error', { ignore: ['^stars$', '^star-layer$', '^star$'] }],
    },
  },
)
  .append(nuxt())
