<script setup lang="ts">
import { examples } from '~/components/playground/examples'

// the editor fills the screen below the header
definePageMeta({ footer: false })

const { t } = useI18n()

// It opens on the /hp example.
const code = ref(examples[0]!.code)

useSeoMeta({
  title: () => t('playground.title'),
  description: () => t('playground.description'),
})
</script>

<template>
  <div class="h-[calc(100dvh-var(--ui-header-height)-4rem)] lg:h-[calc(100dvh-var(--ui-header-height))]">
    <h1 class="sr-only">
      {{ t('playground.title') }}
    </h1>

    <PlaygroundEditor v-model="code" />
  </div>
</template>
