<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const props = defineProps<{
  package: string
}>()

const { t } = useI18n()
const { copy, copied } = useClipboard()

const command = computed(() => `bun add ${props.package}`)
</script>

<template>
  <div class="relative z-10 flex min-w-0 items-center gap-1 rounded-md bg-elevated/60 py-1 ps-3 pe-1 ring ring-default">
    <UIcon name="i-lucide-terminal" class="size-4 shrink-0 text-dimmed" />

    <code class="min-w-0 flex-1 truncate font-mono text-sm text-default">{{ command }}</code>

    <UTooltip :text="copied ? t('modules.copied') : t('modules.copy')">
      <UButton
        :icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'"
        color="neutral"
        variant="link"
        size="sm"
        :aria-label="t('modules.copy')"
        @click.prevent.stop="copy(command)"
      />
    </UTooltip>
  </div>
</template>
