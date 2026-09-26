<script setup lang="ts">
import * as uiLocales from '@nuxt/ui/locale'

const { seo } = useAppConfig()
const content = useLocaleContent()
const head = useLocaleHead()
// a page can go without the footer: definePageMeta({ footer: false })
const route = useRoute()

const { data: navigation } = await useAsyncData(
  () => `navigation-${content.value.locale}`,
  async () => groupDocs(await queryCollectionNavigation(content.value.docs), content.value.locale),
)
const { data: files } = useLazyAsyncData(
  () => `search-${content.value.locale}`,
  () => queryCollectionSearchSections(content.value.docs),
  { server: false },
)

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  htmlAttrs: {
    lang: () => head.value.htmlAttrs.lang,
  },
  link: () => head.value.link,
})

useSeoMeta({
  titleTemplate: `%s - ${seo?.siteName}`,
  ogSiteName: seo?.siteName,
  twitterCard: 'summary_large_image',
})

provide('navigation', navigation)
</script>

<template>
  <UApp :locale="uiLocales[content.locale]">
    <NuxtLoadingIndicator />

    <AppHeader />

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <AppFooter v-if="route.meta.footer !== false" />

    <MobileNavigation />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
      />
    </ClientOnly>
  </UApp>
</template>
