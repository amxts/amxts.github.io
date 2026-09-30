import type { SiteLocale } from './docs'

/** The catalog's categories, as the registry (github.com/amxts/modules) has them. */
export const moduleCategories = ['ui', 'gameplay', 'admin', 'config', 'data', 'network', 'tools'] as const
export type ModuleCategory = typeof moduleCategories[number]

export const categoryIcons: Record<ModuleCategory, string> = {
  ui: 'i-lucide-panels-top-left',
  gameplay: 'i-lucide-gamepad-2',
  admin: 'i-lucide-shield',
  config: 'i-lucide-file-cog',
  data: 'i-lucide-database',
  network: 'i-lucide-globe',
  tools: 'i-lucide-wrench',
}

/** Official: by the amxts team, under its npm scope; community: anyone else's. */
export type ModuleType = 'official' | 'community'

/** A module as the registry's modules.json lists it. */
export interface RegistryModule {
  name: string
  npm: string
  /** `owner/name` on GitHub */
  repo: string
  description: string
  category: ModuleCategory
  type: ModuleType
  /** the logo's URL in its repository */
  logo: string | null
  maintainers: { github: string }[]
  /** the other listed modules it needs, by npm name */
  requires: string[]
}

export interface AmxtsModule {
  /** The catalog's name, the last part of the URL: /modules/menu-core. */
  slug: string
  /** The npm package: what `bun add` installs. */
  package: string
  type: ModuleType
  /** Its name for people ("Menu Core"), from its README; null: the package name. */
  title: Record<SiteLocale, string> | null
  description: Record<SiteLocale, string>
  logo: string | null
  author: string
  /** The author's profile and picture, when the catalog says who they are. */
  authorUrl: string | null
  authorAvatar: string | null
  repository: string | null
  category: ModuleCategory
  /** What else has to be on the server for it to work. */
  requires: string[]
  /** Its latest version on npm; null while it is not published. */
  version: string | null
}
