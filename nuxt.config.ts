import { fileURLToPath } from 'node:url'
import pawn from './pawn.tmLanguage'
import { siteUrl } from './shared/site'

/** https://nuxt.com/docs/api/configuration/nuxt-config */
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    'nuxt-content-twoslash',
    '@nuxt/content',
    'nuxt-og-image',
    'nuxt-llms',
    '@nuxtjs/mcp-toolkit',
    '@nuxtjs/i18n',
  ],

  devtools: {
    enabled: true,
  },

  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    },
  },

  css: ['~/assets/css/main.css'],

  site: {
    name: 'amxts',
    url: siteUrl,
  },

  // Types on hover in the docs' TypeScript. The framework's declarations come
  // with the docs (`bun run docs:import` copies them into docs-types/); an
  // example that is a fragment shows no errors instead of failing the build.
  twoslash: {
    includeNuxtTypes: false,
    throws: false,
    handbookOptions: { noErrors: true },
    compilerOptions: {
      // lib by file name: under TypeScript 6 Twoslash does not find 'esnext'
      // (the module's default), and without it `number[]` reads as `{}`. No DOM:
      // the framework declares its own Event and AbortSignal.
      lib: ['lib.esnext.d.ts'],
      // with forward slashes, the form TypeScript uses for paths
      paths: { '~/*': [fileURLToPath(new URL('./docs-types/amxts/*', import.meta.url)).replaceAll('\\', '/')] },
    },
  },

  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
          searchDepth: 2,
        },
        highlight: {
          langs: ['ts', 'js', 'json', 'sh', 'bash', 'ini', 'c', 'cpp', 'vue', pawn],
        },
      },
    },
    experimental: {
      sqliteConnector: 'native',
    },
  },

  // Docs and the landing are prerendered. The modules catalog is not: it is
  // rendered on request from /api/modules, which caches npm's answer for an hour.
  routeRules: {
    '/docs': { redirect: '/docs/introduction' },
    '/ru/docs': { redirect: '/ru/docs/introduction' },
    // module pages moved from the docs to the modules' catalog pages
    '/docs/menus': { redirect: '/modules/menu-core' },
    '/ru/docs/menus': { redirect: '/ru/modules/menu-core' },
    '/docs/universal-config': { redirect: '/modules/universal-config' },
    '/ru/docs/universal-config': { redirect: '/ru/modules/universal-config' },
    '/docs/extensions': { redirect: '/modules/http' },
    '/ru/docs/extensions': { redirect: '/ru/modules/http' },
    '/modules/**': { prerender: false },
    '/ru/modules/**': { prerender: false },
  },

  experimental: {
    asyncContext: true,
  },

  compatibilityDate: '2026-06-30',

  nitro: {
    prerender: {
      routes: ['/', '/ru'],
      crawlLinks: true,
      ignore: ['/modules', '/ru/modules'],
    },
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'ru', language: 'ru-RU', name: 'Русский', file: 'ru.json' },
    ],
    detectBrowserLanguage: false,
    baseUrl: siteUrl,
  },

  llms: {
    domain: siteUrl,
    title: 'amxts',
    description: 'AMX Mod X plugins for Counter-Strike 1.6 in TypeScript.',
    full: {
      title: 'amxts - full documentation',
      description: 'The whole amxts reference in one file.',
    },
    sections: [
      {
        title: 'Documentation',
        contentCollection: 'docs_en',
      },
    ],
  },

  mcp: {
    name: 'amxts docs',
  },

  ogImage: {
    zeroRuntime: true,
  },
})
