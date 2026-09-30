<script setup lang="ts">
const content = useLocaleContent()

const { data: page } = await useAsyncData(
  () => `landing-${content.value.locale}`,
  () => queryCollection(content.value.landing).first(),
)
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  titleTemplate: '',
  title: () => page.value?.seo?.title || page.value?.title,
  ogTitle: () => page.value?.seo?.title || page.value?.title,
  description: () => page.value?.description,
  ogDescription: () => page.value?.description,
})
</script>

<template>
  <ContentRenderer
    v-if="page"
    :value="page"
    :prose="false"
    :components="{ a: 'prose-a', code: 'landing-code' }"
  />
</template>
