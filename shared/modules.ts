import type { SiteLocale } from './docs'
import { officialScope, repository } from './site'

export const moduleCategories = ['menus', 'config', 'network', 'other'] as const
export type ModuleCategory = typeof moduleCategories[number]

export const categoryIcons: Record<ModuleCategory, string> = {
  menus: 'i-lucide-list',
  config: 'i-lucide-file-cog',
  network: 'i-lucide-globe',
  other: 'i-lucide-package',
}

export interface XenModule {
  /** The catalog's name, the last part of the URL: /modules/menu-core. */
  slug: string
  /** The npm package: what `bun add` installs. */
  package: string
  description: Record<SiteLocale, string>
  author: string
  repository: string | null
  category: ModuleCategory
  /** The docs page about it, without the locale prefix (`/docs/menus`). */
  docs: string | null
  /** What else has to be on the server for it to work. */
  requires: string[]
  /** Published on npm with the `xen-module` keyword, or only listed here. */
  published: boolean
  version: string | null
}

/**
 * The URL name of a package: `@xen/menu-core` is `menu-core`, a package of
 * another scope keeps it (`@someone/votes` is `someone-votes`), an unscoped
 * one is its name.
 */
export function moduleSlug(packageName: string) {
  if (isOfficial(packageName))
    return packageName.slice(officialScope.length + 1)
  return packageName.replace(/^@/, '').replace('/', '-')
}

/** An official module: one of the framework's own, under its npm scope. */
export function isOfficial(packageName: string) {
  return packageName.startsWith(`${officialScope}/`)
}

/**
 * A package names its category with a second keyword, `xen-menus`,
 * `xen-config`, `xen-network`; without one it is "other".
 */
export function categoryFromKeywords(keywords: string[] = []): ModuleCategory {
  for (const category of moduleCategories) {
    if (keywords.includes(`xen-${category}`))
      return category
  }
  return 'other'
}

function official(name: string, module: Omit<XenModule, 'slug' | 'package' | 'author' | 'repository' | 'published' | 'version'>): XenModule {
  const packageName = `${officialScope}/${name}`
  return {
    ...module,
    slug: moduleSlug(packageName),
    package: packageName,
    author: 'Xen',
    repository: repository.url || null,
    published: false,
    version: null,
  }
}

/**
 * The modules that ship with the framework (as/modules/ in the Xen
 * repository) and are not on npm yet. A package on npm with the same name
 * replaces its entry here.
 */
export const fallbackModules: XenModule[] = [
  official('menu-core', {
    category: 'menus',
    docs: '/docs/menus',
    requires: ['universal-config'],
    description: {
      en: 'Menus described in an .ini file or built in code: items with conditions, actions, placeholders and restrictions, list menus with a row per player, countdowns and pages. The menu-core plugin gives Pawn plugins menu_core\'s 29 mc_* natives, so compiled .amxx plugins work against it unchanged.',
      ru: 'Меню из .ini-файла или из кода: пункты с условиями, действиями, плейсхолдерами и ограничениями, меню-списки со строкой на игрока, таймеры и страницы. Плагин menu-core даёт Pawn-плагинам 29 нативов mc_* из menu_core, и скомпилированные .amxx работают с ним без изменений.',
    },
  }),
  official('universal-config', {
    category: 'config',
    docs: '/docs/universal-config',
    requires: [],
    description: {
      en: 'INI configs: [sections], key = value lines, lines of several values and key = { ... } blocks. Typed values (getInt, getNumber, getBoolean, getWords), paths into blocks, and saving that keeps comments and blank lines. The plugin gives Pawn plugins universal_config\'s 28 cfg_* natives.',
      ru: 'INI-конфиги: [секции], строки key = value, строки из нескольких значений и блоки key = { ... }. Типизированные значения (getInt, getNumber, getBoolean, getWords), пути внутрь блоков и сохранение с комментариями и пустыми строками. Плагин даёт Pawn-плагинам 28 нативов cfg_* из universal_config.',
    },
  }),
  official('http', {
    category: 'network',
    docs: '/docs/extensions',
    requires: ['easy_http'],
    description: {
      en: 'fetch() for plugins over the easy_http module: a real Promise<Response> to await or give .then and .catch, GET, POST, PUT, PATCH and DELETE, headers, and cancelling with an AbortSignal.',
      ru: 'fetch() для плагинов поверх модуля easy_http: настоящий Promise<Response>, который можно ждать через await или .then и .catch, GET, POST, PUT, PATCH и DELETE, заголовки и отмена через AbortSignal.',
    },
  }),
]
