<template>
  <ProseCodeGroup
    :ui="{
      root: 'my-0 rounded-xl bg-elevated/50 p-2 ring ring-default',
      list: 'mb-2 rounded-none border-0 bg-transparent p-0',
      indicator: 'inset-y-0 bg-accented/60',
      trigger: 'hover:bg-accented/60 data-[state=active]:hover:bg-transparent',
    }"
  >
    <slot />
  </ProseCodeGroup>
</template>

<style scoped>
:deep(pre) {
  margin: 0;
  height: 31rem; /* hello.ts, the longer tab, fits without a scrollbar */
  border: 0;
  padding: 0.75rem 1rem;
  border-radius: calc(var(--ui-radius) * 2);
  background: var(--ui-bg);
  font-size: 0.75rem;
  line-height: 1.25rem;
}
</style>
