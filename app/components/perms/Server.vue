<script setup lang="ts">
// Which server or mode a grant or a membership counts on: all (null), the one
// in effect, another the server knows, or one the entry already names. All, the
// usual case, is a quiet globe; the choice opens up once it is clicked.
const server = defineModel<string | null>({ required: true })

const { t } = useI18n()
const { edited } = usePermsEditorContext()

const context = computed(() => edited.value!.server.context)
// a perms older than the list of modes names only the one in effect
const contexts = computed(() => edited.value!.server.contexts ?? (context.value ? [context.value] : []))
const choosing = ref(false)

// '@all' stands for every server (null), so each choice has a key
const all = '@all'
const value = computed({
  get: () => server.value ?? all,
  set: v => server.value = v === all ? null : String(v),
})

const items = computed(() => {
  const list = [{ value: all, label: t('perms.grants.allServers'), icon: 'i-lucide-globe' }]
  const names = server.value && !contexts.value.includes(server.value) ? [...contexts.value, server.value] : contexts.value
  for (const name of names)
    list.push({ value: name, label: name, icon: name === context.value ? 'i-lucide-server' : 'i-lucide-server-off' })
  return list
})
</script>

<template>
  <UTooltip v-if="!server && !choosing && context" :text="`${t('perms.grants.allServers')}. ${t('perms.grants.limitTo', { server: context })}`">
    <UButton
      icon="i-lucide-globe"
      color="neutral"
      variant="ghost"
      size="xs"
      class="text-dimmed"
      :aria-label="t('perms.grants.limitTo', { server: context })"
      @click="contexts.length > 1 ? choosing = true : server = context"
    />
  </UTooltip>

  <UTooltip v-else-if="server || choosing" :text="server && server !== context ? t('perms.grants.otherServer', { server }) : server ? t('perms.grants.thisServer', { server }) : t('perms.grants.allServers')">
    <UFieldGroup size="xs">
      <UButton
        v-for="item in items"
        :key="item.value"
        :label="item.label"
        :icon="item.icon"
        color="neutral"
        variant="outline"
        :aria-pressed="value === item.value"
        :class="value === item.value ? 'bg-elevated text-highlighted' : 'text-muted'"
        @click="value = item.value"
      />
    </UFieldGroup>
  </UTooltip>
</template>
