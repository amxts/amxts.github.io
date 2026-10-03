<script setup lang="ts">
// The version a feature arrived in, written in the docs' Markdown as
// `:since{v="0.2"}` beside its heading, in a table cell or in text. A prop,
// not slot text: a heading's anchor and its line in the contents are made
// from its text, and stay `#fake-clients` with the mark.
defineProps<{
  /** The minor version, `0.2`. */
  v: string
}>()

const { t } = useI18n()
</script>

<template>
  <UBadge
    :label="t('docs.since.label', { version: v })"
    :title="t('docs.since.title', { version: v })"
    color="primary"
    variant="subtle"
    size="sm"
    class="align-middle font-medium whitespace-nowrap"
  />
</template>
