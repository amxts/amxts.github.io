import type { ContentNavigationItem } from '@nuxt/content'
import type { SiteLocale } from '#shared/docs'
import { collections, docsPrefix, firstDocPage, sidebarTitles } from '#shared/docs'

/** The current language as the content knows it: 'en' or 'ru'. */
export function useSiteLocale() {
  const { locale } = useI18n()
  return computed<SiteLocale>(() => locale.value === 'ru' ? 'ru' : 'en')
}

/** The collections and the docs prefix of the current language. */
export function useLocaleContent() {
  const locale = useSiteLocale()
  return computed(() => ({
    locale: locale.value,
    prefix: docsPrefix(locale.value),
    ...collections(locale.value),
  }))
}

function pagesOf(items: ContentNavigationItem[]): ContentNavigationItem[] {
  return items.flatMap(item => item.children?.length ? pagesOf(item.children) : [item])
}

/**
 * The sidebar the framework's VitePress config has: "Getting started", then
 * the "API" group. Nuxt Content gives the pages in file order (the importer
 * numbers them); only the grouping is added here.
 */
export function groupDocs(items: ContentNavigationItem[], locale: SiteLocale): ContentNavigationItem[] {
  const prefix = docsPrefix(locale)
  const pages = pagesOf(items)
  const start = pages.filter(page => page.path === `${prefix}/${firstDocPage}`)
  const api = pages.filter(page => page.path !== `${prefix}/${firstDocPage}`)

  return [
    ...start,
    { title: sidebarTitles[locale].api, path: `${prefix}/api`, children: api },
  ]
}
