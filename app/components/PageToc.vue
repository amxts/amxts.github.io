<script setup lang="ts">
import type { TocLink } from '@nuxt/content'
import { useEventListener, useResizeObserver } from '@vueuse/core'

// A page's contents with the section being read always marked: the last
// heading in the upper third of the screen. One line slides to the marked link.

const props = defineProps<{
  title: string
  links: TocLink[]
}>()

const flat = computed(() => props.links.flatMap(link => [link, ...(link.children ?? [])]))
const active = ref(flat.value[0]?.id)

// A click marks its link at once; the scroll it starts does not move the mark
// back while it runs.
let clickedAt = 0

// A heading marks its section once it is in the upper third of the screen,
// or at least where a click on its link puts it (its scroll-margin).
function line(heading: HTMLElement) {
  return Math.max(Number.parseFloat(getComputedStyle(heading).scrollMarginTop || '0') + 8, window.innerHeight / 3)
}

function update() {
  if (Date.now() - clickedAt < 1000)
    return
  let current = flat.value[0]?.id
  for (const link of flat.value) {
    const heading = document.getElementById(link.id)
    if (heading && heading.getBoundingClientRect().top <= line(heading))
      current = link.id
  }
  // the page's end: its last sections cannot scroll up that far
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2)
    current = flat.value.at(-1)?.id
  active.value = current
}

function select(id: string) {
  clickedAt = Date.now()
  active.value = id
}

const list = useTemplateRef('list')
const indicator = ref<{ top: number, height: number } | null>(null)

function place() {
  const link = list.value?.querySelector<HTMLElement>(`a[href="#${CSS.escape(active.value ?? '')}"]`)
  indicator.value = link ? { top: link.offsetTop, height: link.offsetHeight } : null
}

watch(active, () => nextTick(place))
onMounted(() => {
  update()
  nextTick(place)
})
useEventListener('scroll', update, { passive: true })
useResizeObserver(list, place)
</script>

<template>
  <nav :aria-label="title" class="text-sm">
    <p class="mb-3 font-semibold text-highlighted">
      {{ title }}
    </p>

    <ul ref="list" class="relative flex flex-col border-s border-default">
      <li v-for="link in flat" :key="link.id">
        <a
          :href="`#${link.id}`"
          class="block py-1 transition-colors"
          :class="[
            link.depth > 2 ? 'ps-6' : 'ps-3',
            active === link.id ? 'text-primary' : 'text-muted hover:text-highlighted',
          ]"
          @click="select(link.id)"
        >
          {{ link.text }}
        </a>
      </li>

      <li
        v-if="indicator"
        aria-hidden="true"
        class="pointer-events-none absolute -start-px w-px rounded-full bg-primary transition-[top,height] duration-300 ease-out motion-reduce:transition-none"
        :style="{ top: `${indicator.top}px`, height: `${indicator.height}px` }"
      />
    </ul>
  </nav>
</template>
