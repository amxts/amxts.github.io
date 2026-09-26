<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import type { AmxtsModule } from '#shared/modules'
import { createReusableTemplate, useClipboard } from '@vueuse/core'
import { categoryIcons, isOfficial } from '#shared/modules'

const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()
const locale = useSiteLocale()
const toast = useToast()
const { copy } = useClipboard()

const slug = computed(() => String(route.params.slug))

// the links and details: under the README's contents when it has any, else on their own
const [DefineAside, ReuseAside] = createReusableTemplate()

const { data, error } = await useFetch<{ module: AmxtsModule, readme: string | null }>(
  () => `/api/modules/${slug.value}`,
  { key: `module-${slug.value}` },
)
if (error.value || !data.value) {
  throw createError({ statusCode: 404, statusMessage: error.value?.statusMessage ?? 'Module not found', fatal: true })
}

const module = computed(() => data.value!.module)

// An official module's page is its README (the importer brings it into
// content/*/modules); a package from npm shows its npm README.
const content = useLocaleContent()
const { data: doc } = await useAsyncData(
  () => `module-doc-${content.value.locale}-${slug.value}`,
  () => queryCollection(content.value.moduleDocs).path(`${content.value.prefix.slice(0, -'/docs'.length)}/modules/${slug.value}`).first(),
)

const title = computed(() => module.value.title?.[locale.value] || module.value.package)
const description = computed(() => module.value.description[locale.value] || module.value.description.en)

const breadcrumb = computed(() => [
  { label: t('modules.title'), to: localePath('/modules') },
  { label: t(`modules.categories.${module.value.category}`), to: localePath({ path: '/modules', query: { category: module.value.category } }) },
  { label: module.value.package },
])

// "Install this module": each package manager's command, copied on a click.
const install = computed<DropdownMenuItem[]>(() => packageManagers.map(manager => ({
  label: `${manager.add} ${module.value.package}`,
  icon: manager.icon,
  onSelect: () => {
    copy(`${manager.add} ${module.value.package}`)
    toast.add({ title: t('modules.copied'), icon: 'i-lucide-copy-check' })
  },
})))

const links = computed(() => [
  module.value.repository && {
    label: module.value.repository.replace(/^https:\/\/(github|gitlab)\.com\//, ''),
    icon: module.value.repository.includes('gitlab') ? 'i-simple-icons-gitlab' : 'i-simple-icons-github',
    to: module.value.repository,
  },
  module.value.published && {
    label: module.value.package,
    icon: 'i-simple-icons-npm',
    to: `https://www.npmjs.com/package/${module.value.package}`,
  },
].filter(link => !!link))

useSeoMeta({
  title: () => title.value,
  description: () => description.value,
})
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader :description="description" :ui="{ headline: 'mb-4' }">
        <template #headline>
          <UBreadcrumb :items="breadcrumb" />
        </template>

        <template #title>
          <span class="flex items-center gap-3">
            <LogoMark v-if="isOfficial(module.package)" class="size-9 shrink-0 text-primary" />

            <UIcon v-else :name="categoryIcons[module.category]" class="size-9 shrink-0 text-primary" />

            {{ title }}

            <UTooltip v-if="isOfficial(module.package)" :text="t('modules.officialModule')">
              <UIcon name="i-lucide-badge-check" class="size-6 shrink-0 text-primary" />
            </UTooltip>
          </span>
        </template>

        <template #links>
          <UDropdownMenu :items="install" :content="{ align: 'end' }" :ui="{ content: 'min-w-72', itemLabel: 'font-mono text-xs' }">
            <UButton
              :label="t('modules.installThis')"
              icon="i-lucide-square-terminal"
              trailing-icon="i-lucide-chevron-down"
              color="neutral"
            />
          </UDropdownMenu>
        </template>

        <div class="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
          <span v-if="module.version" class="inline-flex items-center gap-1">
            <UIcon name="i-lucide-tag" class="size-4" />

            v{{ module.version }}
          </span>

          <UBadge v-else :label="t('modules.unpublished')" color="warning" variant="subtle" />

          <ULink
            v-if="module.author"
            :to="module.authorUrl ?? undefined"
            target="_blank"
            class="inline-flex items-center gap-1.5 text-muted hover:text-highlighted"
          >
            <UAvatar v-if="module.authorAvatar" :src="module.authorAvatar" :alt="module.author" size="2xs" />

            <UIcon v-else name="i-lucide-user" class="size-4" />

            {{ module.author }}
          </ULink>
        </div>
      </UPageHeader>

      <UPageBody>
        <ContentRenderer v-if="doc" :value="doc" />

        <MDC v-else-if="data?.readme" :value="data.readme" tag="article" />

        <p v-else class="text-muted">
          {{ t('modules.noReadme') }}
        </p>
      </UPageBody>

      <template #right>
        <DefineAside>
          <div v-if="links.length" class="flex flex-col gap-2 text-sm">
            <p class="font-semibold text-highlighted">
              {{ t('modules.links') }}
            </p>

            <ULink
              v-for="link in links"
              :key="link.to"
              :to="link.to"
              target="_blank"
              class="inline-flex items-center gap-1.5 text-muted hover:text-highlighted"
            >
              <UIcon :name="link.icon" class="size-4 shrink-0" />

              {{ link.label }}

              <UIcon name="i-lucide-arrow-up-right" class="size-3 shrink-0" />
            </ULink>
          </div>

          <USeparator class="my-6" type="dashed" />

          <div class="flex flex-col gap-2 text-sm">
            <p class="font-semibold text-highlighted">
              {{ t('modules.details') }}
            </p>

            <p class="inline-flex items-center gap-1.5 text-muted">
              <UIcon :name="categoryIcons[module.category]" class="size-4 shrink-0" />

              {{ t(`modules.categories.${module.category}`) }}
            </p>

            <div v-if="module.requires.length" class="flex flex-wrap items-center gap-1.5 text-muted">
              <UIcon name="i-lucide-plug" class="size-4 shrink-0" />

              {{ t('modules.requires') }}:

              <UBadge v-for="name in module.requires" :key="name" :label="name" color="neutral" variant="outline" size="sm" />
            </div>
          </div>
        </DefineAside>

        <UContentToc
          v-if="doc?.body?.toc?.links?.length"
          :title="t('docs.toc')"
          :links="doc.body.toc.links"
        >
          <template #bottom>
            <USeparator class="my-6" type="dashed" />

            <ReuseAside />
          </template>
        </UContentToc>

        <UPageAside v-else>
          <ReuseAside />
        </UPageAside>
      </template>
    </UPage>
  </UContainer>
</template>
