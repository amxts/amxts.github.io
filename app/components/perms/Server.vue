<script setup lang="ts">
// Which server a grant or a membership counts on: all (null) or this one, or
// another the entry already names. All servers, the usual case, is a quiet
// globe; the choice opens up once the entry names a server.
const server = defineModel<string | null>({ required: true })

const { t } = useI18n()
const { edited } = usePermsEditorContext()

const context = computed(() => edited.value!.server.context)

// '@all' stands for every server (null), so each choice has a key
const all = '@all'
const value = computed({
  get: () => server.value ?? all,
  set: v => server.value = v === all ? null : String(v),
})

const items = computed(() => {
  const list = [{ value: all, label: t('perms.grants.allServers'), icon: 'i-lucide-globe' }]
  if (context.value)
    list.push({ value: context.value, label: context.value, icon: 'i-lucide-server' })
  if (server.value && server.value !== context.value)
    list.push({ value: server.value, label: server.value, icon: 'i-lucide-server-off' })
  return list
})
</script>

<template>
  <UTooltip v-if="!server && context" :text="`${t('perms.grants.allServers')}. ${t('perms.grants.limitTo', { server: context })}`">
    <UButton
      icon="i-lucide-globe"
      color="neutral"
      variant="ghost"
      size="xs"
      class="text-dimmed"
      :aria-label="t('perms.grants.limitTo', { server: context })"
      @click="server = context"
    />
  </UTooltip>

  <UTooltip v-else-if="server" :text="server && server !== context ? t('perms.grants.otherServer', { server }) : server ? t('perms.grants.thisServer', { server }) : t('perms.grants.allServers')">
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
