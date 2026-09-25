<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const props = defineProps<{
  package: string
}>()

const { t } = useI18n()
const { copy, copied } = useClipboard()
const { manager, command } = usePackageManager(() => props.package)
</script>

<template>
  <div class="relative z-10 min-w-0 rounded-lg bg-elevated/50 p-1 ring ring-default">
    <div class="flex gap-1" role="tablist">
      <UButton
        v-for="item in packageManagers"
        :key="item.name"
        :icon="item.icon"
        :label="item.name"
        role="tab"
        :aria-selected="manager === item.name"
        color="neutral"
        :variant="manager === item.name ? 'soft' : 'ghost'"
        size="xs"
        @click.prevent.stop="manager = item.name"
      />
    </div>

    <div class="mt-1 flex min-w-0 items-center gap-1 rounded-md bg-default py-1 ps-3 pe-1">
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
  </div>
</template>
