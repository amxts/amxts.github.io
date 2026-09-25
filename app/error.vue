<script setup lang="ts">
import type { NuxtError } from '#app'
import * as uiLocales from '@nuxt/ui/locale'

defineProps<{
  error: NuxtError
}>()

const { t } = useI18n()
const content = useLocaleContent()

useHead({
  htmlAttrs: {
    lang: () => content.value.locale,
  },
})

useSeoMeta({
  title: () => t('page.notFound'),
  description: () => t('page.notFoundDescription'),
})

const { data: navigation } = await useAsyncData(
  () => `navigation-${content.value.locale}`,
  async () => groupDocs(await queryCollectionNavigation(content.value.docs), content.value.locale),
)
const { data: files } = useLazyAsyncData(
  () => `search-${content.value.locale}`,
  () => queryCollectionSearchSections(content.value.docs),
  { server: false },
)

provide('navigation', navigation)
</script>

<template>
  <UApp :locale="uiLocales[content.locale]">
    <AppHeader />

    <UError :error="error" />

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
      />
    </ClientOnly>
  </UApp>
</template>
