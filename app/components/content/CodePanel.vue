<script setup lang="ts">
defineProps<{
  /** A fixed height, so that switching to a shorter tab does not move the page. */
  height?: string
}>()
</script>

<template>
  <ProseCodeGroup
    :style="{
      '--code-panel-height': height,
      // bg-elevated/50 laid over bg-default: the hero's shade on any section behind it
      'background': 'linear-gradient(var(--code-panel-tint), var(--code-panel-tint)), var(--ui-bg)',
      '--code-panel-tint': 'color-mix(in oklab, var(--ui-bg-elevated) 50%, transparent)',
    }"
    :ui="{
      root: 'my-0 rounded-xl p-2 ring ring-default',
      list: 'mb-2 rounded-none border-0 bg-transparent p-0',
      indicator: 'inset-y-0 bg-accented/60',
      trigger: 'hover:bg-transparent hover:text-highlighted',
    }"
  >
    <slot />
  </ProseCodeGroup>
</template>

<style scoped>
:deep(pre) {
  margin: 0;
  height: var(--code-panel-height, auto);
  border: 0;
  padding: 0.75rem 1rem;
  border-radius: calc(var(--ui-radius) * 2);
  background: var(--ui-bg);
  font-size: 0.75rem;
  line-height: 1.25rem;
}
</style>
