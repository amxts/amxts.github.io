// The docs' languages and where each lives. The sidebar itself - its groups,
// their order, titles and icons - is the framework's docs/ folder: a numbered
// folder per group with its .navigation.yml, a numbered page in it.

export type SiteLocale = 'en' | 'ru'

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
