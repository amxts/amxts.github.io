// The docs sidebar: groups of pages, as on nuxt.com. The order here is the
// order of the sidebar, the prev/next links and the search; the importer
// (`bun run docs:import`) numbers the files by it. A new framework page goes
// into a group here, with its title in both languages, and the import brings
// its text.

export type SiteLocale = 'en' | 'ru'

export const docGroups = [
  { key: 'start', icon: 'i-lucide-rocket', pages: ['introduction', 'getting-started'] },
  { key: 'core', icon: 'i-lucide-zap', pages: ['plugin', 'hooks', 'forwards', 'async'] },
  { key: 'game', icon: 'i-lucide-gamepad-2', pages: ['entities', 'players', 'flags', 'cvars'] },
  { key: 'data', icon: 'i-lucide-database', pages: ['storage', 'fs'] },
  { key: 'modules', icon: 'i-lucide-package', pages: ['shared-modules', 'modules'] },
  { key: 'pawn', icon: 'i-lucide-plug', pages: ['natives'] },
  { key: 'testing', icon: 'i-lucide-flask-conical', pages: ['testing'] },
] as const

export type DocGroup = typeof docGroups[number]['key']

export const docPages: string[] = docGroups.flatMap(group => group.pages)

/**
 * Framework pages about an official module: not in the docs, but on the
 * module's own catalog page (/modules/menu-core), like a package's README.
 */
export const modulePages: Record<string, string> = {
  'menus': 'menu-core',
  'config-core': 'config-core',
  'http': 'http',
}

export const groupTitles: Record<SiteLocale, Record<DocGroup, string>> = {
  en: { start: 'Getting started', core: 'Core', game: 'Game', data: 'Data', modules: 'Modules', pawn: 'Pawn', testing: 'Testing' },
  ru: { start: 'Начало работы', core: 'Основы', game: 'Игра', data: 'Данные', modules: 'Модули', pawn: 'Pawn', testing: 'Тесты' },
}

export const pageTitles: Record<SiteLocale, Record<string, string>> = {
  en: {
    'introduction': 'Introduction',
    'getting-started': 'Quick start',
    'plugin': 'Plugin',
    'hooks': 'Hookchains',
    'forwards': 'Forwards',
    'async': 'Async and promises',
    'entities': 'Players and entities',
    'players': 'Players: actions',
    'flags': 'Flags',
    'cvars': 'Cvars',
    'storage': 'Storage',
    'fs': 'Files',
    'shared-modules': 'Shared modules',
    'modules': 'Creating a module',
    'natives': 'Natives',
    'testing': 'Testing',
  },
  ru: {
    'introduction': 'Введение',
    'getting-started': 'Быстрый старт',
    'plugin': 'Плагин',
    'hooks': 'Хукчейны',
    'forwards': 'Форварды',
    'async': 'Async и промисы',
    'entities': 'Игроки и сущности',
    'players': 'Игроки: действия',
    'flags': 'Флаги',
    'cvars': 'Квары',
    'storage': 'Хранилище',
    'fs': 'Файлы',
    'shared-modules': 'Общие модули',
    'modules': 'Свой модуль',
    'natives': 'Нативы',
    'testing': 'Тесты',
  },
}

/** Where a locale's docs live: `/docs` for English, `/ru/docs` for Russian. */
export function docsPrefix(locale: SiteLocale) {
  return locale === 'en' ? '/docs' : `/${locale}/docs`
}

/** The Nuxt Content collections of a locale (content.config.ts). */
export function collections(locale: SiteLocale) {
  return locale === 'ru'
    ? { docs: 'docs_ru', landing: 'landing_ru', moduleDocs: 'module_docs_ru' } as const
    : { docs: 'docs_en', landing: 'landing_en', moduleDocs: 'module_docs_en' } as const
}
