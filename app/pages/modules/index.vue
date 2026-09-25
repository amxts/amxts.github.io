<script setup lang="ts">
import type { ModuleCategory, XenModule } from '#shared/modules'
import { moduleCategories } from '#shared/modules'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const locale = useSiteLocale()

const { data: modules, status } = await useFetch<XenModule[]>('/api/modules', {
  key: 'modules',
  default: () => [],
})

/** The search and the category live in the URL, so a filtered list can be linked to. */
const query = computed({
  get: () => typeof route.query.q === 'string' ? route.query.q : '',
  set: q => router.replace({ query: { ...route.query, q: q || undefined } }),
})

const category = computed<ModuleCategory | 'all'>({
  get: () => moduleCategories.find(c => c === route.query.category) ?? 'all',
  set: c => router.replace({ query: { ...route.query, category: c === 'all' ? undefined : c } }),
})

function matches(module: XenModule, text: string) {
  if (!text)
    return true
  const haystack = [module.slug, module.package, module.author, module.description[locale.value], module.description.en]
    .join(' ')
    .toLowerCase()
  return text.toLowerCase().split(/\s+/).every(word => haystack.includes(word))
}

const searched = computed(() => modules.value.filter(module => matches(module, query.value.trim())))
const filtered = computed(() => searched.value.filter(module => category.value === 'all' || module.category === category.value))

const categories = computed(() => [
  { value: 'all' as const, label: t('modules.all'), count: searched.value.length },
  ...moduleCategories.map(value => ({
    value,
    label: t(`modules.categories.${value}`),
    count: searched.value.filter(module => module.category === value).length,
  })),
])

function clear() {
  router.replace({ query: {} })
}

useSeoMeta({
  title: () => t('modules.title'),
  description: () => t('modules.description'),
})
</script>

<template>
  <UContainer>
    <UPageHero
      :title="t('modules.title')"
      :description="t('modules.description')"
      :ui="{ container: 'py-12 sm:py-16 lg:py-20' }"
    />

    <UPage>
      <template #left>
        <UPageAside>
          <nav :aria-label="t('modules.category')" class="flex flex-col gap-1">
            <UButton
              v-for="item in categories"
              :key="item.value"
              :label="item.label"
              :color="category === item.value ? 'primary' : 'neutral'"
              :variant="category === item.value ? 'soft' : 'ghost'"
              :aria-pressed="category === item.value"
              class="justify-between"
              @click="category = item.value"
            >
              <template #trailing>
                <span class="text-xs text-dimmed tabular-nums">{{ item.count }}</span>
              </template>
            </UButton>
          </nav>

          <USeparator class="my-6" />

          <div class="flex flex-col gap-2 text-sm">
            <p class="font-semibold text-highlighted">
              {{ t('modules.addYours') }}
            </p>

            <p class="text-muted">
              {{ t('modules.addYoursHint') }}
            </p>
          </div>
        </UPageAside>
      </template>

      <UPageBody>
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
          <UInput
            v-model="query"
            icon="i-lucide-search"
            :placeholder="t('modules.search')"
            :aria-label="t('modules.search')"
            :loading="status === 'pending'"
            size="lg"
            class="flex-1"
          />

          <USelect
            v-model="category"
            :items="categories"
            value-key="value"
            :aria-label="t('modules.category')"
            size="lg"
            class="w-full sm:w-48 lg:hidden"
          />
        </div>

        <p class="text-sm text-muted" aria-live="polite">
          {{ t('modules.count', filtered.length) }}
        </p>

        <UPageGrid v-if="filtered.length">
          <ModuleCard v-for="module in filtered" :key="module.package" :module="module" />
        </UPageGrid>

        <UEmpty
          v-else
          icon="i-lucide-package-search"
          :title="t('modules.empty')"
          :actions="[{ label: t('modules.clear'), color: 'neutral', variant: 'subtle', onClick: clear }]"
        />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
