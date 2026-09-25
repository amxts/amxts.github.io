import process from 'node:process'
import { fileURLToPath } from 'node:url'
import pawn from './pawn.tmLanguage'
import { docPages, docsPrefix } from './shared/docs'
import { siteUrl } from './shared/site'

// The path the site is served under: '/' locally, '/site/' on the GitHub Pages
// project page (the deploy workflow sets NUXT_APP_BASE_URL).
const baseURL = process.env.NUXT_APP_BASE_URL || '/'
// a redirect's target, under the base path (a static redirect page does not add it)
const to = (path: string) => `${baseURL}${path.slice(1)}`
// the origin (the deploy workflow passes the Pages one); site-config, OG
// images and i18n add the base path to it, llms.txt does not
const publicUrl = process.env.NUXT_PUBLIC_SITE_URL || siteUrl

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
    baseURL,
    head: {
      link: [{ rel: 'icon', type: 'image/svg+xml', href: `${baseURL}logo.svg` }],
    },
  },

  css: ['~/assets/css/main.css'],

  site: {
    name: 'amxts',
    url: publicUrl,
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

  // The whole site is static (GitHub Pages): the docs, the landing and the
  // modules catalog are prerendered, the catalog with npm's answer at build
  // time - the deploy workflow rebuilds it every day.
  routeRules: {
    '/docs': { redirect: to('/docs/introduction') },
    '/ru/docs': { redirect: to('/ru/docs/introduction') },
    // module pages moved from the docs to the modules' catalog pages
    '/docs/menus': { redirect: to('/modules/menu-core') },
    '/ru/docs/menus': { redirect: to('/ru/modules/menu-core') },
    '/docs/universal-config': { redirect: to('/modules/universal-config') },
    '/ru/docs/universal-config': { redirect: to('/ru/modules/universal-config') },
    '/docs/extensions': { redirect: to('/modules/http') },
    '/ru/docs/extensions': { redirect: to('/ru/modules/http') },
  },

  experimental: {
    asyncContext: true,
  },

  compatibilityDate: '2026-06-30',

  nitro: {
    prerender: {
      // /api/modules as a JSON file; each page's markdown for "Copy page",
      // which is a menu, not a link the crawler follows
      routes: [
        '/',
        '/ru',
        '/modules',
        '/ru/modules',
        '/api/modules',
        ...(['en', 'ru'] as const).flatMap(locale => docPages.map(page => `/raw${docsPrefix(locale)}/${page}.md`)),
      ],
      crawlLinks: true,
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
    baseUrl: publicUrl,
  },

  llms: {
    domain: `${publicUrl}${baseURL}`.replace(/\/$/, ''),
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
