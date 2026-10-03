<script setup lang="ts">
import type { ContentNavigationItem, TocLink } from '@nuxt/content'
import { findPageHeadline } from '@nuxt/content/utils'
import { withoutTrailingSlash } from 'ufo'
import { collections, docsPrefix } from '#shared/docs'

definePageMeta({
  layout: 'docs',
})

const route = useRoute()
const { t } = useI18n()
const content = useLocaleContent()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
const routePath = computed(() => withoutTrailingSlash(route.path))

const { data: page } = await useAsyncData(routePath.value, () => queryCollection(content.value.docs).path(routePath.value).first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: t('docs.notFound'), fatal: true })
}

// the page's Markdown for "Copy page", which is a menu, not a link the
// crawler follows
prerenderRoutes(`/raw${page.value.path}.md`)

const { data: surround } = await useAsyncData(`${routePath.value}-surround`, () => {
  return queryCollectionItemSurroundings(content.value.docs, routePath.value, {
    fields: ['description'],
  })
})

// A page of the next version says so, and links to the same page of the
// current docs - to their introduction when the page is new in next.
const { data: currentPage } = await useAsyncData(`${routePath.value}-current`, async () => {
  if (content.value.version !== 'next')
    return null
  const prefix = docsPrefix(content.value.locale)
  const current = await queryCollection(collections(content.value.locale).docs)
    .path(routePath.value.replace(content.value.prefix, prefix))
    .select('path')
    .first()
  return current?.path ?? `${prefix}/getting-started/introduction`
})

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
})

// the contents, a heading's `:since` mark beside its line (modules/amxts-docs)
const tocLinks = computed(() => page.value?.body?.toc?.links as (TocLink & { since?: string })[] | undefined)

const headline = computed(() => findPageHeadline(navigation?.value, page.value?.path))

defineOgImage('Docs', { title, description, headline: headline.value })
</script>

<template>
  <UPage v-if="page">
    <UPageHeader
      :title="page.title"
      :headline="headline"
    >
      <template #links>
        <PageHeaderLinks />
      </template>
    </UPageHeader>

    <UPageBody>
      <UAlert
        v-if="currentPage"
        color="warning"
        variant="subtle"
        icon="i-lucide-flask-conical"
        :title="t('docs.next.title')"
        :description="t('docs.next.description')"
        :actions="[{ label: t('docs.next.current'), to: currentPage, color: 'warning', variant: 'outline' }]"
      />

      <ContentRenderer
        v-if="page"
        :value="page"
      />

      <USeparator v-if="surround?.length" />

      <UContentSurround :surround="surround" />
    </UPageBody>

    <template
      v-if="tocLinks?.length"
      #right
    >
      <UContentToc
        :title="t('docs.toc')"
        :links="tocLinks"
      >
        <template #link="{ link }">
          <span class="truncate">{{ link.text }}</span>

          <Since v-if="link.since" :v="link.since" class="ms-1.5 shrink-0" />
        </template>
      </UContentToc>
    </template>
  </UPage>
</template>
