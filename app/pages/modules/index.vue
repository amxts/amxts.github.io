<script setup lang="ts">
import type { AmxtsModule, ModuleCategory } from '#shared/modules'
import { categoryIcons, moduleCategories } from '#shared/modules'
import { moduleKeyword } from '#shared/site'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const router = useRouter()
const locale = useSiteLocale()

const { data: modules, status } = await useFetch<AmxtsModule[]>('/api/modules', {
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

function matches(module: AmxtsModule, text: string) {
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
  { value: 'all' as const, label: t('modules.all'), icon: 'i-lucide-layout-grid', count: searched.value.length },
  ...moduleCategories.map(value => ({
    value,
    label: t(`modules.categories.${value}`),
    icon: categoryIcons[value],
    count: searched.value.filter(module => module.category === value).length,
  })),
])

const npmSearch = `https://www.npmjs.com/search?q=keywords:${moduleKeyword}`

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
      :ui="{ container: 'py-12 sm:py-16 lg:py-20', title: 'text-4xl sm:text-5xl' }"
    />

    <UPage>
      <template #left>
        <UPageAside>
          <UInput
            v-model="query"
            icon="i-lucide-search"
            :placeholder="t('modules.search')"
            :aria-label="t('modules.search')"
            :loading="status === 'pending'"
            class="mb-4 w-full"
          />

          <nav :aria-label="t('modules.category')" class="flex flex-col gap-0.5">
            <UButton
              v-for="item in categories"
              :key="item.value"
              :label="item.label"
              :icon="item.icon"
              :color="category === item.value ? 'primary' : 'neutral'"
              :variant="category === item.value ? 'soft' : 'ghost'"
              :aria-pressed="category === item.value"
              @click="category = item.value"
            >
              <template #trailing>
                <span class="ms-auto text-xs text-dimmed tabular-nums">{{ item.count }}</span>
              </template>
            </UButton>
          </nav>

          <div class="mt-6 rounded-lg bg-elevated/50 p-4 text-sm ring ring-default">
            <p class="flex items-center gap-1.5 font-semibold text-highlighted">
              <UIcon name="i-lucide-package-plus" class="size-4 text-primary" />

              {{ t('modules.addYours') }}
            </p>

            <p class="mt-2 text-muted">
              {{ t('modules.addYoursHint') }}
            </p>

            <UButton
              :to="npmSearch"
              target="_blank"
              :label="t('modules.browseNpm')"
              trailing-icon="i-lucide-arrow-up-right"
              color="neutral"
              variant="link"
              size="sm"
              class="mt-2 px-0"
            />
          </div>
        </UPageAside>
      </template>

      <UPageBody :ui="{ base: 'mt-8 space-y-4 pb-16' }">
        <div class="flex flex-col gap-3 lg:hidden">
          <UInput
            v-model="query"
            icon="i-lucide-search"
            :placeholder="t('modules.search')"
            :aria-label="t('modules.search')"
            :loading="status === 'pending'"
            size="lg"
          />

          <USelect
            v-model="category"
            :items="categories"
            value-key="value"
            :aria-label="t('modules.category')"
            size="lg"
          />
        </div>

        <div class="flex items-center justify-between gap-3">
          <p class="text-sm text-muted" aria-live="polite">
            {{ t('modules.count', filtered.length) }}
          </p>

          <UButton
            :to="localePath('/docs/modules')"
            :label="t('modules.create')"
            trailing-icon="i-lucide-arrow-right"
            color="neutral"
            variant="link"
            size="sm"
            class="px-0"
          />
        </div>

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
