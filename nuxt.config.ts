import { siteUrl } from './shared/site'

/** https://nuxt.com/docs/api/configuration/nuxt-config */
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
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
    name: 'Xen',
    url: siteUrl,
  },

  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
          searchDepth: 2,
        },
        highlight: {
          langs: ['ts', 'js', 'json', 'sh', 'bash', 'ini', 'c', 'cpp', 'vue'],
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
    '/docs': { redirect: '/docs/getting-started' },
    '/ru/docs': { redirect: '/ru/docs/getting-started' },
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
    title: 'Xen',
    description: 'AMX Mod X plugins for Counter-Strike 1.6 in TypeScript.',
    full: {
      title: 'Xen - full documentation',
      description: 'The whole Xen reference in one file.',
    },
    sections: [
      {
        title: 'Documentation',
        contentCollection: 'docs_en',
      },
    ],
  },

  mcp: {
    name: 'Xen docs',
  },

  ogImage: {
    zeroRuntime: true,
  },
})
