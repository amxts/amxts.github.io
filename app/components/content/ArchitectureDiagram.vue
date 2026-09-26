<script setup lang="ts">
import { useElementVisibility, useIntervalFn, usePreferredReducedMotion } from '@vueuse/core'

const { t } = useI18n()

// One build, played step by step: the source is there from the start,
// AssemblyScript works (0) and the .wasm appears (1), wamrc works (2) and the
// .aot appears (3), it is loaded into amxts_amxx (4), its natives reach the
// modules (5), then everything holds (6-7) and it starts again.
const files = [
  { name: 'say-hp.ts', icon: 'i-vscode-icons-file-type-typescript', phase: -1 },
  { name: '.wasm', icon: 'i-vscode-icons-file-type-wasm', phase: 1 },
  { name: '.aot', icon: 'i-lucide-cpu', phase: 3 },
]
const tools = [{ name: 'AssemblyScript', phase: 0 }, { name: 'wamrc', phase: 2 }]
const phases = 8
const done = phases - 1

// Server-rendered, and with reduced motion, it shows the finished build.
const phase = ref(done)
const reducedMotion = usePreferredReducedMotion()

const { resume, pause } = useIntervalFn(() => {
  // -1 is the empty start: nothing built yet, so the first line fills again every cycle
  phase.value = phase.value === done ? -1 : phase.value + 1
}, 800, { immediate: false })

// It plays only while the diagram is on screen, from the start each time it
// comes into view.
const root = useTemplateRef('root')
const visible = useElementVisibility(root, { threshold: 0.4 })

onMounted(() => {
  watch([reducedMotion, visible], ([reduce, shown]) => {
    pause()
    phase.value = reduce === 'reduce' ? done : -1
    if (reduce !== 'reduce' && shown)
      resume()
  }, { immediate: true })
})

function state(at: number) {
  return phase.value < at ? 'pending' : phase.value === at ? 'active' : 'done'
}
</script>

<template>
  <div ref="root" class="flex flex-col gap-4 rounded-xl bg-default p-4 text-sm ring ring-default sm:p-5">
    <div class="flex flex-col items-start gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2 sm:gap-y-6 sm:pt-4">
      <span class="mb-1 text-xs font-medium text-dimmed uppercase sm:me-1 sm:mb-0">{{ t('architecture.build') }}</span>

      <template v-for="(file, index) in files" :key="file.name">
        <span
          class="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-xs ring transition duration-300"
          :class="{
            'bg-elevated/40 text-dimmed ring-default': state(file.phase) === 'pending',
            'bg-primary/10 text-highlighted ring-primary': state(file.phase) === 'active',
            'bg-elevated text-highlighted ring-default': state(file.phase) === 'done',
          }"
        >
          <UIcon :name="file.icon" class="size-4" :class="{ 'opacity-40': state(file.phase) === 'pending' }" />

          {{ file.name }}
        </span>

        <span v-if="tools[index]" class="relative ms-3 flex h-10 w-4 flex-col items-center sm:ms-0 sm:h-7 sm:w-24 sm:flex-row">
          <span
            class="absolute top-1/2 left-full ms-2 flex -translate-y-1/2 text-[11px] whitespace-nowrap transition-colors duration-300 sm:inset-x-0 sm:-top-4 sm:ms-0 sm:translate-y-0 sm:justify-center"
            :class="{ 'text-dimmed': state(tools[index].phase) === 'pending', 'text-primary': state(tools[index].phase) === 'active', 'text-muted': state(tools[index].phase) === 'done' }"
          >
            <span class="relative">
              <UIcon
                name="i-lucide-loader-circle"
                class="absolute top-1/2 right-full me-1 size-3 -translate-y-1/2 animate-spin transition-opacity duration-300"
                :class="{ 'opacity-0': state(tools[index].phase) !== 'active' }"
              />

              {{ tools[index].name }}
            </span>
          </span>

          <span class="relative w-0.5 flex-1 overflow-hidden rounded-full bg-accented sm:h-0.5 sm:w-auto">
            <span
              class="absolute top-0 left-0 rounded-full bg-primary"
              :class="phase >= tools[index].phase ? 'h-full w-full transition-[width,height] duration-700 ease-out' : 'h-0 w-full sm:h-full sm:w-0'"
            />
          </span>

          <UIcon
            name="i-lucide-chevron-right"
            class="-mt-1.5 size-4 shrink-0 rotate-90 transition-colors duration-300 sm:mt-0 sm:-ms-1.5 sm:rotate-0"
            :class="phase > tools[index].phase ? 'text-primary' : 'text-dimmed'"
          />
        </span>
      </template>
    </div>

    <div class="rounded-lg border border-dashed border-accented p-3">
      <p class="mb-3 flex items-center gap-1.5 text-xs text-muted">
        <UIcon name="i-lucide-server" class="size-4" />

        {{ t('architecture.server') }}
      </p>

      <div class="rounded-lg bg-elevated/50 p-3 ring ring-default">
        <p class="mb-3 flex items-center gap-1.5 text-xs text-muted">
          <UIcon name="i-lucide-box" class="size-4" />

          {{ t('architecture.amxx') }}
        </p>

        <div class="grid gap-2 sm:grid-cols-2">
          <div
            class="rounded-md p-3 ring transition duration-300"
            :class="state(4) === 'active' ? 'bg-primary/10 ring-primary' : 'bg-default ring-default'"
          >
            <p class="flex items-center gap-1.5 font-mono font-semibold text-highlighted">
              <UIcon name="i-lucide-cpu" class="size-4 text-primary" />

              amxts_amxx
            </p>

            <p class="mt-1 text-xs text-muted">
              {{ t('architecture.module') }}
            </p>

            <span
              class="mt-2 inline-flex items-center gap-1.5 rounded-md bg-elevated px-2 py-0.5 font-mono text-xs text-highlighted ring ring-default transition duration-300"
              :class="phase >= 4 ? 'opacity-100' : '-translate-y-1 opacity-0'"
            >
              <UIcon name="i-lucide-cpu" class="size-3.5 text-primary" />

              say-hp.aot

              <span class="text-success">{{ t('architecture.loaded') }}</span>
            </span>
          </div>

          <div class="rounded-md bg-default p-3 ring ring-default">
            <p class="flex items-center gap-1.5 font-mono font-semibold text-highlighted">
              <UIcon name="i-lucide-file-cog" class="size-4 text-muted" />

              amxts_host.amxx
            </p>

            <p class="mt-1 text-xs text-muted">
              {{ t('architecture.host') }}
            </p>
          </div>
        </div>

        <p
          class="my-2 flex items-center justify-center gap-1.5 text-xs transition-colors duration-300"
          :class="state(5) === 'active' ? 'text-primary' : 'text-muted'"
        >
          <UIcon name="i-lucide-arrow-down-up" class="size-4" />

          {{ t('architecture.natives') }}
        </p>

        <div
          class="rounded-md p-3 ring transition duration-300"
          :class="state(5) === 'active' ? 'bg-primary/10 ring-primary' : 'bg-default ring-default'"
        >
          <p class="flex items-center gap-1.5 font-semibold text-highlighted">
            <UIcon name="i-lucide-blocks" class="size-4 text-muted" />

            {{ t('architecture.others') }}
          </p>

          <p class="mt-1 font-mono text-xs text-muted">
            {{ t('architecture.othersHint') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
