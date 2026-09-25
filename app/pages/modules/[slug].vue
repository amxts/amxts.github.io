<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'
import type { XenModule } from '#shared/modules'

const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()
const locale = useSiteLocale()

const slug = computed(() => String(route.params.slug))

const { data, error } = await useFetch<{ module: XenModule, readme: string | null }>(
  () => `/api/modules/${slug.value}`,
  { key: `module-${slug.value}` },
)
if (error.value || !data.value) {
  throw createError({ statusCode: 404, statusMessage: error.value?.statusMessage ?? 'Module not found', fatal: true })
}

const module = computed(() => data.value!.module)
const description = computed(() => module.value.description[locale.value] || module.value.description.en)

const links = computed(() => {
  const links: ButtonProps[] = []
  if (module.value.docs)
    links.push({ label: t('modules.docs'), icon: 'i-lucide-book-open', to: localePath(module.value.docs) })
  if (module.value.repository) {
    links.push({
      label: t('modules.repository'),
      icon: module.value.repository.includes('gitlab') ? 'i-simple-icons-gitlab' : 'i-simple-icons-github',
      to: module.value.repository,
      target: '_blank',
      color: 'neutral',
      variant: 'subtle',
    })
  }
  if (module.value.published) {
    links.push({
      label: t('modules.npm'),
      icon: 'i-simple-icons-npm',
      to: `https://www.npmjs.com/package/${module.value.package}`,
      target: '_blank',
      color: 'neutral',
      variant: 'subtle',
    })
  }
  return links
})

useSeoMeta({
  title: () => module.value.slug,
  description: () => description.value,
})
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader :title="module.slug" :description="description" :links="links">
        <template #headline>
          <ULink :to="localePath('/modules')" class="inline-flex items-center gap-1 text-sm">
            <UIcon name="i-lucide-arrow-left" class="size-4" />
            {{ t('modules.back') }}
          </ULink>
        </template>
      </UPageHeader>

      <UPageBody>
        <ModuleInstall :package="module.package" class="max-w-md" />

        <UAlert
          v-if="!module.published"
          icon="i-lucide-package-open"
          color="warning"
          variant="subtle"
          :title="t('modules.unpublished')"
          :description="t('modules.unpublishedHint')"
        />

        <MDC v-if="data?.readme" :value="data.readme" tag="article" />

        <p v-else-if="module.published" class="text-muted">
          {{ t('modules.noReadme') }}
        </p>
      </UPageBody>

      <template #right>
        <UPageAside>
          <dl class="flex flex-col gap-4 text-sm">
            <div>
              <dt class="text-muted">
                {{ t('modules.package') }}
              </dt>

              <dd class="font-mono text-highlighted break-all">
                {{ module.package }}
              </dd>
            </div>

            <div>
              <dt class="text-muted">
                {{ t('modules.category') }}
              </dt>

              <dd class="text-highlighted">
                <ULink :to="localePath({ path: '/modules', query: { category: module.category } })">
                  {{ t(`modules.categories.${module.category}`) }}
                </ULink>
              </dd>
            </div>

            <div v-if="module.author">
              <dt class="text-muted">
                {{ t('modules.author') }}
              </dt>

              <dd class="text-highlighted">
                {{ module.author }}
              </dd>
            </div>

            <div v-if="module.version">
              <dt class="text-muted">
                {{ t('modules.version') }}
              </dt>

              <dd class="font-mono text-highlighted">
                {{ module.version }}
              </dd>
            </div>

            <div v-if="module.requires.length">
              <dt class="text-muted">
                {{ t('modules.requires') }}
              </dt>

              <dd class="flex flex-wrap gap-1 pt-1">
                <UBadge v-for="name in module.requires" :key="name" :label="name" color="neutral" variant="outline" />
              </dd>
            </div>
          </dl>
        </UPageAside>
      </template>
    </UPage>
  </UContainer>
</template>
