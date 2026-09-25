<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import type { NavigationMenuItem } from '@nuxt/ui'
import { en, ru } from '@nuxt/ui/locale'
import { repository } from '#shared/site'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const route = useRoute()
const { t, locale } = useI18n()
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

// The same page in the other language: switchLocalePath keeps the path.
const language = computed({
  get: () => locale.value,
  set: code => navigateTo(switchLocalePath(code as typeof locale.value)),
})

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

      <USelectMenu
        v-model="language"
        :items="[en, ru]"
        value-key="code"
        label-key="name"
        :search-input="false"
        variant="none"
        :aria-label="t('header.language')"
        :ui="{
          base: 'text-muted transition-colors hover:text-highlighted data-[state=open]:text-highlighted',
          content: 'rounded-lg',
          item: 'cursor-pointer items-center data-[state=checked]:cursor-default data-[state=checked]:text-highlighted data-[state=checked]:before:bg-elevated!',
          itemTrailing: 'hidden',
        }"
        class="w-32"
      >
        <template #leading>
          <span class="rounded bg-elevated px-1 py-0.5 text-[10px]/none font-semibold text-highlighted uppercase">{{ locale }}</span>
        </template>

        <template #item-leading="{ item }">
          <span class="rounded bg-elevated px-1 py-0.5 text-[10px]/none font-semibold text-highlighted uppercase">{{ item.code }}</span>
        </template>
      </USelectMenu>
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

      <UContentNavigation
        highlight
        :collapsible="false"
        :navigation="navigation"
        :ui="{ linkTrailingIcon: 'hidden' }"
      />
    </template>
  </UHeader>
</template>
