// The docs sidebar, as the framework's VitePress config has it
// (docs/api/.vitepress/config.ts in the Xen repository): "Getting started",
// then the API pages in this order. A new page there goes here too, with its
// title in both languages, and `bun run docs:import` brings its text.

export type SiteLocale = 'en' | 'ru'

export const firstDocPage = 'getting-started'

export const apiPages = [
  'plugin',
  'entities',
  'players',
  'flags',
  'hooks',
  'forwards',
  'storage',
  'cvars',
  'async',
  'fs',
  'shared-modules',
  'universal-config',
  'menus',
  'extensions',
  'natives',
  'testing',
]

export const docPages = [firstDocPage, ...apiPages]

export const sidebarTitles: Record<SiteLocale, { start: string, api: string, pages: string[] }> = {
  en: {
    start: 'Getting started',
    api: 'API',
    pages: [
      'Plugin',
      'Players and entities',
      'Players: actions',
      'Flags',
      'Hookchains',
      'Forwards',
      'Storage',
      'Cvars',
      'Async and promises',
      'Files',
      'Shared modules',
      'INI configs',
      'Menus',
      'Extensions',
      'Natives',
      'Testing',
    ],
  },
  ru: {
    start: 'Начало работы',
    api: 'API',
    pages: [
      'Плагин',
      'Игроки и сущности',
      'Игроки: действия',
      'Флаги',
      'Хукчейны',
      'Форварды',
      'Хранилище',
      'Квары',
      'Async и промисы',
      'Файлы',
      'Общие модули',
      'INI-конфиги',
      'Меню',
      'Расширения',
      'Нативы',
      'Тесты',
    ],
  },
}

/** Where a locale's docs live: `/docs` for English, `/ru/docs` for Russian. */
export function docsPrefix(locale: SiteLocale) {
  return locale === 'en' ? '/docs' : `/${locale}/docs`
}

/** The Nuxt Content collections of a locale (content.config.ts). */
export function collections(locale: SiteLocale) {
  return locale === 'ru'
    ? { docs: 'docs_ru', landing: 'landing_ru' } as const
    : { docs: 'docs_en', landing: 'landing_en' } as const
}
