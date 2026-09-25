<script setup lang="ts">
import type { AmxtsModule } from '#shared/modules'
import { useClipboard } from '@vueuse/core'
import { categoryIcons, isOfficial } from '#shared/modules'

const props = defineProps<{
  module: AmxtsModule
}>()

const { t } = useI18n()
const localePath = useLocalePath()
const locale = useSiteLocale()
const { copy, copied } = useClipboard()

const description = computed(() => props.module.description[locale.value] || props.module.description.en)
const { command } = usePackageManager(() => props.module.package)
</script>

<template>
  <UPageCard
    :to="localePath(`/modules/${module.slug}`)"
    :title="module.package"
    :description="description"
    variant="subtle"
    :ui="{ leading: 'flex w-full', description: 'line-clamp-2', footer: 'w-full' }"
  >
    <template #leading>
      <div class="flex w-full items-start justify-between gap-2">
        <LogoMark v-if="isOfficial(module.package)" class="size-8 text-primary" />

        <UIcon v-else :name="categoryIcons[module.category]" class="size-8 text-primary" />

        <UBadge v-if="isOfficial(module.package)" :label="t('modules.official')" color="primary" variant="subtle" />
      </div>
    </template>

    <template #footer>
      <div class="flex items-center justify-between gap-3 border-t border-dashed border-default pt-3 text-sm text-muted">
        <div class="flex min-w-0 items-center gap-4">
          <span v-if="module.version" class="flex items-center gap-1">
            <UIcon name="i-lucide-tag" class="size-4" />

            {{ module.version }}
          </span>

          <UBadge v-else :label="t('modules.unpublished')" color="warning" variant="subtle" size="sm" />
        </div>

        <UTooltip :text="copied ? t('modules.copied') : t('modules.copy')">
          <UButton
            :icon="copied ? 'i-lucide-copy-check' : 'i-lucide-terminal'"
            color="neutral"
            variant="outline"
            size="xs"
            class="relative z-10"
            :aria-label="t('modules.copy')"
            @click.prevent.stop="copy(command)"
          />
        </UTooltip>
      </div>
    </template>
  </UPageCard>
</template>
