<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

defineProps<{
  headline?: string
  title?: string
  description?: string
}>()
</script>

<template>
  <div
    class="w-full h-full flex bg-neutral-950 relative overflow-hidden"
    data-theme="dark"
  >
    <div class="absolute top-0 left-0 w-1.5 h-full bg-primary-400" />

    <div class="flex flex-col justify-between flex-1 px-20 py-16">
      <div />

      <div class="flex flex-col gap-5">
        <span
          v-if="headline"
          class="text-2xl font-medium text-primary-400"
        >
          {{ headline }}
        </span>

        <h1
          v-if="title"
          class="text-6xl font-bold text-highlighted"
        >
          {{ title }}
        </h1>

        <p
          v-if="description"
          class="text-3xl/11 text-muted"
          :style="{ lineClamp: 2, textOverflow: 'ellipsis' }"
        >
          {{ description }}
        </p>
      </div>

      <div class="flex items-center gap-4">
        <svg
          class="size-10"
          viewBox="0 0 128 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="128" height="128" rx="28" fill="#15181D" />
          <rect x="59" y="16" width="10" height="24" rx="5" fill="#F2C94C" />
          <rect x="59" y="88" width="10" height="24" rx="5" fill="#F2C94C" />
          <path d="M48 40C40 40 40 46 40 52C40 60 34 62 30 64C34 66 40 68 40 76C40 82 40 88 48 88" stroke="#F2C94C" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M80 40C88 40 88 46 88 52C88 60 94 62 98 64C94 66 88 68 88 76C88 82 88 88 80 88" stroke="#F2C94C" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
          <circle cx="64" cy="64" r="7" fill="#F2C94C" />
        </svg>
        <div class="h-px flex-1 bg-border" />
        <span class="text-xl text-dimmed">Xen</span>
      </div>
    </div>
  </div>
</template>
