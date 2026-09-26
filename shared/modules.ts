import type { SiteLocale } from './docs'
import officialModules from './official-modules.json'
import { officialScope } from './site'

export const moduleCategories = ['menus', 'config', 'network', 'other'] as const
export type ModuleCategory = typeof moduleCategories[number]

export const categoryIcons: Record<ModuleCategory, string> = {
  menus: 'i-lucide-list',
  config: 'i-lucide-file-cog',
  network: 'i-lucide-globe',
  other: 'i-lucide-package',
}

export interface AmxtsModule {
  /** The catalog's name, the last part of the URL: /modules/menu-core. */
  slug: string
  /** The npm package: what `bun add` installs. */
  package: string
  /** Its name for people ("Menu Core"), from its README; null: the package name. */
  title: Record<SiteLocale, string> | null
  description: Record<SiteLocale, string>
  author: string
  /** The author's profile and picture, when the package says who they are. */
  authorUrl: string | null
  authorAvatar: string | null
  repository: string | null
  category: ModuleCategory
  /** The docs page about it, without the locale prefix (`/docs/menus`). */
  docs: string | null
  /** What else has to be on the server for it to work. */
  requires: string[]
  /** Published on npm with the `amxts-module` keyword, or only listed here. */
  published: boolean
  version: string | null
}

/**
 * The URL name of a package: `@amxts/menu-core` is `menu-core`, a package of
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
 * A package names its category with a second keyword, `amxts-menus`,
 * `amxts-config`, `amxts-network`; without one it is "other".
 */
export function categoryFromKeywords(keywords: string[] = []): ModuleCategory {
  for (const category of moduleCategories) {
    if (keywords.includes(`amxts-${category}`))
      return category
  }
  return 'other'
}

/**
 * The official modules, as each says it about itself: its README's title and
 * tagline and its package.json (author, repository, keywords, peer modules),
 * written by `bun run docs:import` into official-modules.json. Not on npm yet:
 * a package on npm with the same name replaces its entry here.
 */
export const fallbackModules: AmxtsModule[] = [
  ...officialModules.map(module => ({
    slug: moduleSlug(module.package),
    package: module.package,
    title: module.title,
    description: module.description,
    author: module.author,
    authorUrl: module.authorUrl,
    authorAvatar: module.authorAvatar,
    repository: module.repository,
    category: categoryFromKeywords(module.keywords),
    docs: null,
    requires: module.requires,
    published: false,
    version: null,
  })),
  // http is not a module of its own yet: the framework's page is its page
  {
    slug: 'http',
    package: `${officialScope}/http`,
    title: null,
    description: {
      en: 'fetch() for plugins over the easy_http module: a real Promise<Response> to await or give .then and .catch, GET, POST, PUT, PATCH and DELETE, headers, and cancelling with an AbortSignal.',
      ru: 'fetch() для плагинов поверх модуля easy_http: настоящий Promise<Response>, который можно ждать через await или .then и .catch, GET, POST, PUT, PATCH и DELETE, заголовки и отмена через AbortSignal.',
    },
    author: 'amxts',
    authorUrl: null,
    authorAvatar: null,
    repository: null,
    category: 'network',
    docs: null,
    requires: ['easy_http'],
    published: false,
    version: null,
  },
]
