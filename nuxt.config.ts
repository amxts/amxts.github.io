import process from 'node:process'
import { fileURLToPath } from 'node:url'
import pawn from './pawn.tmLanguage'
import { examplesOptions } from './shared/docs'
import { siteUrl } from './shared/site'

// The path the site is served under: '/' (the Pages site amxts.github.io);
// the deploy workflow sets NUXT_APP_BASE_URL from the Pages settings.
const baseURL = process.env.NUXT_APP_BASE_URL || '/'
// a redirect's target, under the base path (a static redirect page does not add it)
const to = (path: string) => `${baseURL}${path.slice(1)}`
// the origin (the deploy workflow passes the Pages one); site-config, OG
// images and i18n add the base path to it, llms.txt does not
const publicUrl = process.env.NUXT_PUBLIC_SITE_URL || siteUrl
// The docs' pages lived at /docs/<page> before they had groups: an old link
// goes to the page's place now. /docs/testing is the same page still.
const movedPages = {
  'introduction': 'getting-started/introduction',
  'getting-started': 'getting-started/quick-start',
  'cli': 'getting-started/cli',
  'limitations': 'getting-started/limitations',
  'plugin': 'core/plugin',
  'hooks': 'core/hooks',
  'forwards': 'core/forwards',
  'async': 'core/async',
  'entities': 'game/entities',
  'players': 'game/players',
  'flags': 'game/flags',
  'cvars': 'game/cvars',
  'storage': 'data/storage',
  'fs': 'data/fs',
  'shared-modules': 'modules/shared-modules',
  'modules': 'modules/creating-a-module',
  'natives': 'pawn/natives',
}
const movedRules = Object.fromEntries(['/docs', '/ru/docs'].flatMap(prefix => Object.entries(movedPages)
  .map(([from, page]) => [`${prefix}/${from}`, { redirect: to(`${prefix}/${page}`) }])))
// the framework's declarations (docs-types/), with forward slashes, the form
// TypeScript uses for paths
const declarations = fileURLToPath(new URL('./docs-types', import.meta.url)).replaceAll('\\', '/')

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
      // The site used to live under /site/ (github.io/site): an old link lands
      // on 404.html, and this sends it to the same page at the root, before
      // anything renders. Only when the site itself is at the root.
      script: [
        // a Mac shows ⌘ in keyboard shortcuts from the first paint (.kbd-meta)
        { innerHTML: `/Mac|iPhone|iPad/.test(navigator.userAgent)&&document.documentElement.classList.add('mac')` },
        ...(baseURL === '/'
          ? [{ innerHTML: `var p=location.pathname;if(p==='/site'||p.startsWith('/site/'))location.replace((p.slice(5)||'/')+location.search+location.hash)` }]
          : []),
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  // Icons come with the site's JS, not from the Iconify API at runtime: every
  // icon named in its code and content (and Nuxt UI's own) is bundled.
  icon: {
    clientBundle: {
      scan: {
        globInclude: ['app/**/*.{vue,ts}', 'shared/**/*.ts', 'content/**/*.md'],
      },
      // the docs' sidebar groups: their icons are in the framework's
      // docs/*/.navigation.yml, which is not in this repository
      icons: ['lucide:rocket', 'lucide:zap', 'lucide:gamepad-2', 'lucide:database', 'lucide:package', 'lucide:plug', 'lucide:flask-conical'],
    },
  },

  // The framework's declarations for the hovers: thousands of files that
  // `docs:types` rewrites and Twoslash reads itself, so dev does not watch them.
  ignore: ['docs-types', 'docs-types-ru', 'docs-types-next', 'docs-types-next-ru'],

  site: {
    name: 'amxts',
    url: publicUrl,
  },

  // Types on hover in the docs' TypeScript. The framework's declarations are
  // kept here (`bun run docs:types` copies them into docs-types/); an
  // example that is a fragment shows no errors instead of failing the build.
  twoslash: {
    includeNuxtTypes: false,
    throws: false,
    handbookOptions: { noErrors: true },
    compilerOptions: examplesOptions(declarations),
  },

  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
          searchDepth: 2,
        },
        highlight: {
          langs: ['ts', 'js', 'json', 'jsonc', 'yaml', 'sh', 'bash', 'ini', 'c', 'cpp', 'vue', pawn],
        },
      },
    },
    experimental: {
      sqliteConnector: 'native',
    },
  },

  // The whole site is static (GitHub Pages): the docs, the landing and the
  // modules catalog are prerendered, the catalog with the registry's modules
  // and npm's versions at build time - the deploy workflow rebuilds it every
  // day.
  routeRules: {
    '/docs': { redirect: to('/docs/getting-started/introduction') },
    '/ru/docs': { redirect: to('/ru/docs/getting-started/introduction') },
    // the next version's docs (main), beside the current ones
    '/docs/next': { redirect: to('/docs/next/getting-started/introduction') },
    '/ru/docs/next': { redirect: to('/ru/docs/next/getting-started/introduction') },
    ...movedRules,
    // module pages moved from the docs to the modules' catalog pages
    '/modules/http': { redirect: to('/docs/data/http') },
    '/ru/modules/http': { redirect: to('/ru/docs/data/http') },
    '/docs/menus': { redirect: to('/modules/menu-core') },
    '/ru/docs/menus': { redirect: to('/ru/modules/menu-core') },
    '/docs/universal-config': { redirect: to('/modules/config-core') },
    '/ru/docs/universal-config': { redirect: to('/ru/modules/config-core') },
    // universal-config is config-core now
    '/modules/universal-config': { redirect: to('/modules/config-core') },
    '/ru/modules/universal-config': { redirect: to('/ru/modules/config-core') },
    '/docs/extensions': { redirect: to('/modules/http') },
    '/ru/docs/extensions': { redirect: to('/ru/modules/http') },
  },

  experimental: {
    asyncContext: true,
  },

  compatibilityDate: '2026-06-30',

  nitro: {
    prerender: {
      // /api/modules and /api/changelog as JSON files (each docs page adds its
      // markdown itself)
      routes: [
        '/',
        '/ru',
        '/modules',
        '/ru/modules',
        '/api/modules',
        '/changelog',
        '/ru/changelog',
        '/api/changelog',
        '/api/next-docs',
        // the next version's docs: no page of the current ones links there
        '/docs/next/getting-started/introduction',
        '/ru/docs/next/getting-started/introduction',
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
