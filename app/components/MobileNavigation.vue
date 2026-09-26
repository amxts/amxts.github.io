<script setup lang="ts">
// The site's sections as a bar fixed to the bottom of the screen on a phone,
// in reach of a thumb; the header's menu keeps the docs' pages.
const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

const items = computed(() => [
  { label: t('nav.home'), icon: 'i-lucide-house', to: localePath('/'), active: route.path === localePath('/') },
  { label: t('nav.docs'), icon: 'i-lucide-book-open', to: localePath('/docs/introduction'), active: route.path.startsWith(localePath('/docs')) },
  { label: t('nav.modules'), icon: 'i-lucide-blocks', to: localePath('/modules'), active: route.path.startsWith(localePath('/modules')) },
  { label: t('nav.playground'), icon: 'i-lucide-square-terminal', to: localePath('/playground'), active: route.path.startsWith(localePath('/playground')) },
])
</script>

<template>
  <nav
    :aria-label="t('nav.sections')"
    class="fixed inset-x-0 bottom-0 z-50 border-t border-default bg-default/90 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
  >
    <ul class="grid h-16 grid-cols-4">
      <li v-for="item in items" :key="item.to">
        <NuxtLink
          :to="item.to"
          :aria-current="item.active ? 'page' : undefined"
          class="flex h-full flex-col items-center justify-center gap-1 text-xs font-medium transition-colors"
          :class="item.active ? 'text-primary' : 'text-muted hover:text-highlighted'"
        >
          <UIcon :name="item.icon" class="size-5" />

          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
