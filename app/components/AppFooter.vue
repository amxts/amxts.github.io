<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <UFooter>
    <template #left>
      <p>Xen · {{ t('footer.tagline') }}</p>
    </template>

    <template #right>
      <UButton :to="localePath('/docs/getting-started')" :label="t('nav.docs')" color="neutral" variant="link" />

      <UButton :to="localePath('/modules')" :label="t('nav.modules')" color="neutral" variant="link" />
    </template>
  </UFooter>
</template>
