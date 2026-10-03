import type { ContentNavigationItem } from '@nuxt/content'
import type { SiteLocale } from '#shared/docs'
import { collections, docsOf, docsPrefix } from '#shared/docs'

/** The current language as the content knows it: 'en' or 'ru'. */
export function useSiteLocale() {
  const { locale } = useI18n()
  return computed<SiteLocale>(() => locale.value === 'ru' ? 'ru' : 'en')
}

/**
 * The collections and the docs prefix of the current language and docs
 * version: the next version's on /docs/next, the current one's elsewhere.
 */
export function useLocaleContent() {
  const locale = useSiteLocale()
  const route = useRoute()
  return computed(() => {
    const { version } = docsOf(route.path)
    return {
      locale: locale.value,
      version,
      prefix: docsPrefix(locale.value, version),
      ...collections(locale.value, version),
    }
  })
}

/**
 * The sidebar: the groups under a docs prefix (`/docs`, `/ru/docs/next`),
 * each with its pages. The groups, their titles and icons are the framework's
 * numbered folders and their .navigation.yml; Nuxt Content builds the tree.
 */
export function docsNavigation(items: ContentNavigationItem[], prefix: string): ContentNavigationItem[] {
  const node = items.find(item => prefix === item.path || prefix.startsWith(`${item.path}/`))
  if (!node)
    return []
  return node.path === prefix ? node.children ?? [] : docsNavigation(node.children ?? [], prefix)
}
