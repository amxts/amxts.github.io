<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import type { DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui'
import { repository } from '#shared/site'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const route = useRoute()
const { t, locale, locales } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const items = computed<NavigationMenuItem[]>(() => [{
  label: t('nav.docs'),
  to: localePath('/docs/getting-started'),
  active: route.path.startsWith(localePath('/docs')),
}, {
  label: t('nav.modules'),
  to: localePath('/modules'),
  active: route.path.startsWith(localePath('/modules')),
}])

const languages = computed<DropdownMenuItem[]>(() => locales.value.map(item => ({
  label: item.name ?? item.code,
  to: switchLocalePath(item.code),
  type: 'checkbox',
  checked: item.code === locale.value,
})))

const providerName = repository.provider === 'gitlab' ? 'GitLab' : 'GitHub'
const repositoryLabel = computed(() => repository.url
  ? t('header.repository', { provider: providerName })
  : t('header.repositoryUnset'))
</script>

<template>
  <UHeader :to="localePath('/')">
    <template #title>
      <AppLogo />
    </template>

    <UNavigationMenu :items="items" variant="link" />

    <template #right>
      <UContentSearchButton class="lg:hidden" />

      <UContentSearchButton :collapsed="false" class="hidden lg:inline-flex" />

      <UDropdownMenu :items="languages" :content="{ align: 'end' }">
        <UButton
          icon="i-lucide-languages"
          color="neutral"
          variant="ghost"
          :label="locale.toUpperCase()"
          :aria-label="t('header.language')"
        />
      </UDropdownMenu>

      <UColorModeButton />

      <UTooltip :text="repositoryLabel">
        <UButton
          :icon="repository.provider === 'gitlab' ? 'i-simple-icons-gitlab' : 'i-simple-icons-github'"
          color="neutral"
          variant="ghost"
          :to="repository.url || undefined"
          target="_blank"
          :disabled="!repository.url"
          :aria-label="repositoryLabel"
        />
      </UTooltip>
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />

      <USeparator class="my-4" />

      <UContentNavigation highlight :navigation="navigation" />
    </template>
  </UHeader>
</template>
