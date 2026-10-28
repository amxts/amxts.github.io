<script setup lang="ts">
import type { PermsUser } from '#shared/perms'
import { counts, defaultGroup, steamIdPattern } from '#shared/perms'

const { t } = useI18n()
const { edited, changes, user: selected } = usePermsEditorContext()

const query = ref('')
const weightOf = (name: string) => edited.value!.groups.find(g => g.name === name)?.weight ?? 0

/** The group with the highest weight among those counting on this server: `player.group` on the server. */
function primary(user: PermsUser) {
  const context = edited.value!.server.context
  const counting = user.groups
    .filter(m => counts(m, context) && edited.value!.groups.some(g => g.name === m.group))
    .sort((a, b) => weightOf(b.group) - weightOf(a.group))
  return counting[0]?.group ?? defaultGroup
}

// online first, then the heavier group, then the name
const players = computed(() => {
  const words = query.value.trim().toLowerCase().split(/\s+/).filter(Boolean)
  return edited.value!.users
    .filter(u => words.every(w => `${u.name ?? ''} ${u.id}`.toLowerCase().includes(w)))
    .sort((a, b) => Number(b.online) - Number(a.online)
      || weightOf(primary(b)) - weightOf(primary(a))
      || (a.name ?? a.id).localeCompare(b.name ?? b.id))
})

const current = computed(() => edited.value!.users.find(u => u.id === selected.value))

// on a phone the player opens below the list: the page goes to them
const detail = useTemplateRef<HTMLElement>('detail')
watch(selected, async () => {
  await nextTick()
  if (!matchMedia('(min-width: 64rem)').matches)
    detail.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
})

function kind(id: string) {
  return id.startsWith('ip:') ? t('perms.players.ip') : id.startsWith('name:') ? t('perms.players.byName') : ''
}

const touched = (id: string) => changes.value.some(c => ('user' in c && c.user === id) || ('owner' in c && 'user' in c.owner && c.owner.user === id))

const groupChoices = computed(() => current.value
  ? [...edited.value!.groups]
      .filter(g => g.name !== defaultGroup && !current.value!.groups.some(m => m.group === g.name && m.server === null))
      .sort((a, b) => b.weight - a.weight)
      .map(g => g.name)
  : [])

// the select only adds: it goes back to its placeholder after each pick
const joining = ref<string>()

function join(group: string | undefined) {
  if (group)
    current.value?.groups.push({ group, until: null, server: null })
  nextTick(() => joining.value = undefined)
}

const adding = ref(false)
const draft = reactive({ id: '', name: '', group: undefined as string | undefined, until: null as string | null })
const newGroupChoices = computed(() => [...edited.value!.groups].filter(g => g.name !== defaultGroup).sort((a, b) => b.weight - a.weight).map(g => g.name))
const idError = computed(() => {
  if (!draft.id)
    return
  if (!steamIdPattern.test(draft.id))
    return t('perms.players.idInvalid')
  if (edited.value!.users.some(u => u.id === draft.id))
    return t('perms.players.idTaken')
  return undefined
})

function add() {
  if (!draft.id || idError.value)
    return
  const groups = draft.group ? [{ group: draft.group, until: draft.until, server: null }] : []
  edited.value!.users.push({ id: draft.id, name: draft.name || null, online: false, groups, grants: [] })
  selected.value = draft.id
  query.value = ''
  Object.assign(draft, { id: '', name: '', group: undefined, until: null })
  adding.value = false
}
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-8">
    <div class="flex flex-col gap-2">
      <div class="flex gap-2">
        <UInput
          v-model="query"
          icon="i-lucide-search"
          :placeholder="t('perms.players.search')"
          :aria-label="t('perms.players.search')"
          class="flex-1"
        />

        <UTooltip :text="t('perms.players.add')">
          <UButton icon="i-lucide-user-plus" color="neutral" variant="subtle" :aria-label="t('perms.players.add')" @click="adding = true" />
        </UTooltip>
      </div>

      <p class="px-1 text-xs text-dimmed">
        {{ t('perms.players.count', { n: players.length }) }}
      </p>

      <ul>
        <li v-for="u in players" :key="u.id">
          <button
            type="button"
            class="flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-start transition-colors"
            :class="u.id === selected ? 'bg-primary/10 ring ring-primary/25' : 'hover:bg-elevated'"
            @click="selected = u.id"
          >
            <span class="size-2 shrink-0 rounded-full" :class="u.online ? 'bg-success shadow-[0_0_0_3px] shadow-success/20' : 'bg-accented'" :title="u.online ? t('perms.players.online') : t('perms.players.offline')" />

            <span class="min-w-0 flex-1">
              <span class="block truncate text-sm font-medium text-highlighted">{{ u.name ?? u.id }}</span>

              <span class="block truncate font-mono text-[11px] text-dimmed">{{ u.id }}</span>
            </span>

            <span v-if="touched(u.id)" class="size-2 shrink-0 rounded-full bg-primary" :title="t('perms.grid.changed')" />

            <UBadge v-if="primary(u) !== 'default'" :label="primary(u)" color="neutral" variant="soft" size="sm" />
          </button>
        </li>
      </ul>

      <UEmpty v-if="!players.length" icon="i-lucide-user-search" :title="t('perms.players.empty', { query })" variant="naked" size="sm" />
    </div>

    <section v-if="current" ref="detail" class="min-w-0 scroll-mt-[calc(var(--perms-top)+1rem)] lg:sticky lg:top-[calc(var(--perms-top)+1rem)] lg:self-start">
      <header>
        <h2 class="flex flex-wrap items-center gap-2 text-xl font-semibold text-highlighted">
          {{ current.name ?? current.id }}

          <UBadge v-if="current.online" :label="t('perms.players.online')" color="success" variant="subtle" size="sm" />
        </h2>

        <p class="mt-0.5 flex flex-wrap items-center gap-x-3 text-sm text-muted">
          <span class="font-mono text-[13px]">{{ current.id }}</span>

          <span v-if="kind(current.id)">{{ kind(current.id) }}</span>

          <span>{{ t('perms.players.primary') }}: <b class="font-semibold text-highlighted">{{ primary(current) }}</b></span>
        </p>
      </header>

      <h3 class="mt-6 mb-3 text-sm font-semibold text-highlighted">
        {{ t('perms.players.groups') }}
      </h3>

      <ul v-if="current.groups.length" class="divide-y divide-default rounded-lg ring ring-default">
        <li
          v-for="(m, i) in current.groups"
          :key="`${m.group} ${m.server}`"
          class="flex flex-wrap items-center gap-x-3 gap-y-1.5 px-3 py-2"
          :class="{ 'opacity-60': !counts(m, edited!.server.context) }"
        >
          <UBadge :label="m.group" color="neutral" variant="outline" icon="i-lucide-layers" class="min-w-0" />

          <span class="text-xs text-dimmed tabular-nums">{{ weightOf(m.group) }}</span>

          <span class="flex-1" />

          <PermsUntil v-model="m.until" />

          <PermsServer v-model="m.server" />

          <UButton icon="i-lucide-trash-2" color="neutral" variant="ghost" size="xs" :aria-label="t('perms.grants.remove')" @click="current.groups.splice(i, 1)" />
        </li>
      </ul>

      <p v-else class="rounded-lg border border-dashed border-default px-3 py-4 text-sm text-muted">
        {{ t('perms.players.noGroups') }}
      </p>

      <USelectMenu
        v-model="joining"
        :items="groupChoices"
        :placeholder="t('perms.players.addGroup')"
        icon="i-lucide-plus"
        :search-input="false"
        class="mt-3 w-full sm:w-64"
        @update:model-value="join"
      />

      <h3 class="mt-8 mb-3 text-sm font-semibold text-highlighted">
        {{ t('perms.grants.title') }}
      </h3>

      <PermsGrants :owner="{ user: current.id }" />
    </section>

    <div v-else class="hidden place-items-center rounded-lg border border-dashed border-default p-8 text-center text-sm text-muted lg:sticky lg:top-[calc(var(--perms-top)+1rem)] lg:grid lg:self-start">
      {{ t('perms.players.select') }}
    </div>

    <UModal v-model:open="adding" :title="t('perms.players.add')" :ui="{ content: 'max-w-sm' }">
      <template #body>
        <form id="perms-player" class="space-y-4" @submit.prevent="add">
          <UFormField :label="t('perms.players.steamId')" :help="t('perms.players.steamHelp')" :error="idError">
            <UInput
              v-model.trim="draft.id"
              autofocus
              :placeholder="t('perms.players.steamHint')"
              :trailing-icon="draft.id && !idError ? 'i-lucide-circle-check' : undefined"
              :ui="{ trailingIcon: 'text-success' }"
              class="w-full font-mono"
            />
          </UFormField>

          <UFormField :label="t('perms.players.nameLabel')" :hint="t('perms.players.nameHint')">
            <UInput v-model.trim="draft.name" class="w-full" />
          </UFormField>

          <UFormField :label="t('perms.players.groups')" :hint="t('perms.groups.optional')">
            <div class="flex flex-wrap items-center gap-2">
              <USelectMenu
                v-model="draft.group"
                :items="newGroupChoices"
                :search-input="false"
                :placeholder="t('perms.players.noGroup')"
                icon="i-lucide-layers"
                class="min-w-0 flex-1"
              />

              <PermsUntil v-if="draft.group" v-model="draft.until" />
            </div>
          </UFormField>
        </form>
      </template>

      <template #footer>
        <div class="flex w-full justify-end gap-2">
          <UButton :label="t('perms.groups.cancel')" color="neutral" variant="ghost" @click="adding = false" />

          <UButton type="submit" form="perms-player" :label="t('perms.players.add')" :disabled="!draft.id || !!idError" />
        </div>
      </template>
    </UModal>
  </div>
</template>
