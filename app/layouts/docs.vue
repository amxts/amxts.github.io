<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { useResizeObserver } from '@vueuse/core'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
const route = useRoute()

// One highlight line for the whole sidebar that slides to the current page,
// like the tabs' indicator, instead of a line per link that just appears.
const nav = useTemplateRef('nav')
const indicator = ref<{ top: number, left: number, height: number } | null>(null)

function place() {
  const box = nav.value
  const link = box?.querySelector<HTMLElement>(`a[href="${route.path}"]`)
  const list = link?.closest('ul')
  if (!box || !link || !list) {
    indicator.value = null
    return
  }
  const origin = box.getBoundingClientRect()
  const rect = link.getBoundingClientRect()
  indicator.value = {
    top: rect.top - origin.top + 2,
    left: list.getBoundingClientRect().left - origin.left,
    height: rect.height - 4,
  }
}

watch(() => route.path, () => nextTick(place))
onMounted(() => nextTick(place))
useResizeObserver(nav, place)
</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UPageAside>
          <div ref="nav" class="relative">
            <UContentNavigation
              highlight
              :collapsible="false"
              :navigation="navigation"
              :ui="{ linkTrailingIcon: 'hidden', link: 'after:hidden' }"
            />

            <span
              v-if="indicator"
              class="pointer-events-none absolute w-px rounded-full bg-primary transition-[top,height,left] duration-300 ease-out motion-reduce:transition-none"
              :style="{ top: `${indicator.top}px`, left: `${indicator.left}px`, height: `${indicator.height}px` }"
            />
          </div>
        </UPageAside>
      </template>

      <slot />
    </UPage>
  </UContainer>
</template>
