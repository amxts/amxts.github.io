import type { ContentNavigationItem } from '@nuxt/content'
import type { SiteLocale } from '#shared/docs'
import { collections, docGroups, docsPrefix, groupTitles } from '#shared/docs'

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
 * The sidebar in groups (shared/docs.ts), each with its icon: the group's
 * title is also the page header's headline. Nuxt Content gives the pages; only
 * the grouping is added here.
 */
export function groupDocs(items: ContentNavigationItem[], locale: SiteLocale): ContentNavigationItem[] {
  const prefix = docsPrefix(locale)
  const byPath = new Map(pagesOf(items).map(page => [page.path, page]))

  return docGroups.map(group => ({
    title: groupTitles[locale][group.key],
    icon: group.icon,
    path: `${prefix}/${group.pages[0]}`,
    children: group.pages.flatMap(page => byPath.get(`${prefix}/${page}`) ?? []),
  }))
}
