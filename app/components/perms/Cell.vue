<script setup lang="ts">
// One cell of the grid: the button that goes round granted, negated, not set.
// Its explanation is the grid's one tooltip, which the cell calls on hover
// and focus (a tooltip per cell made the grid slow to open).
defineProps<{
  view: {
    class: string[]
    icon: string
    /** an inherited answer, drawn smaller than the group's own */
    small: boolean
    /** the state in a few words, for a screen reader */
    state: string
    changed: boolean
    /** grants for other servers only, which the grid does not edit */
    elsewhere: number
    timed: boolean
    label: string
  }
}>()

defineEmits<{ cycle: [], show: [HTMLElement], hide: [] }>()
</script>

<template>
  <button
    type="button"
    :class="view.class"
    class="mx-auto my-1"
    :aria-label="`${view.label}: ${view.state}`"
    @click="$emit('cycle')"
    @pointerenter="$emit('show', $event.currentTarget as HTMLElement)"
    @pointerleave="$emit('hide')"
    @focus="$emit('show', $event.currentTarget as HTMLElement)"
    @blur="$emit('hide')"
  >
    <UIcon :name="view.icon" :class="view.small ? 'size-3.5' : 'size-4'" />

    <span v-if="view.changed" class="absolute -top-1 -right-1 size-2.5 rounded-full bg-primary ring-2 ring-default" />

    <UIcon v-if="view.timed" name="i-lucide-clock" class="absolute -right-1 -bottom-1 size-3 rounded-full bg-default text-muted" />

    <span v-if="view.elsewhere" class="absolute -bottom-1 -left-1 grid size-3 place-items-center rounded-full bg-default text-[9px] font-bold text-info">+</span>
  </button>
</template>
