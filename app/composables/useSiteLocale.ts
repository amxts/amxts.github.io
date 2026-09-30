import type { ContentNavigationItem } from '@nuxt/content'
import type { SiteLocale } from '#shared/docs'
import { collections, docsPrefix } from '#shared/docs'

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

/**
 * The sidebar: the groups under the locale's docs (`/docs`, `/ru/docs`), each
 * with its pages. The groups, their titles and icons are the framework's
 * numbered folders and their .navigation.yml; Nuxt Content builds the tree.
 */
export function docsNavigation(items: ContentNavigationItem[], locale: SiteLocale): ContentNavigationItem[] {
  const prefix = docsPrefix(locale)
  const node = items.find(item => prefix === item.path || prefix.startsWith(`${item.path}/`))
  if (!node)
    return []
  return node.path === prefix ? node.children ?? [] : docsNavigation(node.children ?? [], locale)
}
