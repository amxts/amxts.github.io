<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { counts, defaultGroup, deleteGroup, groupNamePattern } from '#shared/perms'

const { t } = useI18n()
const { edited, base, group: selected, tab, user, formatDate } = usePermsEditorContext()

// the heaviest group opens first: default has nothing of its own to show
const groups = computed(() => [...edited.value!.groups].sort((a, b) => b.weight - a.weight))
const current = computed(() => edited.value!.groups.find(g => g.name === selected.value) ?? groups.value[0]!)

function members(name: string) {
  return name === defaultGroup
    ? edited.value!.users.length
    : edited.value!.users.filter(u => u.groups.some(m => m.group === name)).length
}

const menu = computed<NavigationMenuItem[]>(() => groups.value.map(g => ({
  label: g.name,
  weight: g.weight,
  fresh: isNew(g.name),
  badge: members(g.name),
  active: g.name === current.value.name,
  onSelect: () => selected.value = g.name,
})))

const choices = computed(() => groups.value.map(g => ({ value: g.name, label: `${g.name} (${g.weight})` })))
const choice = computed({
  get: () => current.value.name,
  set: (name: string) => selected.value = name,
})

/** The players in the current group, with the end of their membership if it has one. */
const players = computed(() => edited.value!.users.flatMap((u) => {
  const membership = u.groups.find(m => m.group === current.value.name)
  return membership ? [{ id: u.id, name: u.name || u.id, online: u.online, until: membership.until }] : []
}).sort((a, b) => Number(b.online) - Number(a.online) || a.name.localeCompare(b.name)))

/** A row of the group's players, as tall as a grant's: the whole row opens the player. */
const playerRow = 'flex w-full items-center gap-3 px-3 py-2 text-start text-sm transition-colors hover:bg-elevated/50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary'

function openPlayer(id: string) {
  user.value = id
  tab.value = 'players'
}

function isNew(name: string) {
  return !base.value!.groups.some(g => g.name === name)
}

/** The groups a group may inherit from: any but itself and those that already inherit from it (no circles). */
const parentChoices = computed(() => {
  const heirs = new Set([current.value.name])
  let grew = true
  while (grew) {
    grew = false
    for (const g of edited.value!.groups) {
      if (!heirs.has(g.name) && g.inherits.some(p => heirs.has(p))) {
        heirs.add(g.name)
        grew = true
      }
    }
  }
  return groups.value.filter(g => !heirs.has(g.name)).map(g => g.name)
})

/** Every group the current one falls back on, nearest first and default last: the order the module asks them in. */
const ancestors = computed(() => {
  const found: string[] = []
  const queue = [...current.value.inherits]
  while (queue.length) {
    const name = queue.shift()!
    if (found.includes(name))
      continue
    found.push(name)
    queue.push(...edited.value!.groups.find(g => g.name === name)?.inherits ?? [])
  }
  if (current.value.name !== defaultGroup && !found.includes(defaultGroup))
    found.push(defaultGroup)
  return found
})

/** What the groups of the chain grant here, each marked when the current group says it itself. */
const inherited = computed(() => {
  const own = new Set(current.value.grants.map(g => g.node))
  const context = edited.value!.server.context
  return ancestors.value.flatMap((name) => {
    const grants = (edited.value!.groups.find(g => g.name === name)?.grants ?? [])
      .filter(g => counts(g, context))
      .map(g => ({ ...g, overridden: own.has(g.node) }))
    return grants.length ? [{ group: name, grants }] : []
  })
})

const weight = computed({
  get: () => current.value.weight,
  set: (w: number | null) => current.value.weight = Math.round(w ?? 0),
})

// the weight's - and + are quiet: the number is what the field is about
const stepper = { color: 'neutral', variant: 'ghost', size: 'xs', class: 'text-muted hover:bg-elevated hover:text-highlighted transition-[scale,background-color,color] duration-120 ease-out active:scale-95 disabled:opacity-50' } as const
const weightUi = { base: 'font-mono tabular-nums', increment: 'pe-0.5', decrement: 'ps-0.5' }

const creating = ref(false)
const draft = reactive({ name: '', weight: 10, inherits: [] as string[] })

/** Where a new group's weight puts it: the group it decides before (lighter) and after (heavier). */
const place = computed(() => {
  const lighter = groups.value.find(g => g.weight < draft.weight)?.name
  const heavier = groups.value.findLast(g => g.weight >= draft.weight)?.name
  if (lighter && heavier)
    return t('perms.groups.placeBetween', { lighter, heavier })
  return lighter ? t('perms.groups.placeFirst', { lighter }) : t('perms.groups.placeLast', { heavier })
})

/** The groups by weight with the new one among them. */
const ladder = computed(() => {
  const fresh = { name: draft.name || t('perms.groups.newOne'), weight: draft.weight, fresh: true }
  return [...groups.value.map(g => ({ name: g.name, weight: g.weight, fresh: false })), fresh]
    .sort((a, b) => b.weight - a.weight || Number(a.fresh) - Number(b.fresh))
})
const nameError = computed(() => {
  if (!draft.name)
    return
  if (!groupNamePattern.test(draft.name))
    return t('perms.groups.nameInvalid')
  if (edited.value!.groups.some(g => g.name === draft.name))
    return t('perms.groups.nameTaken')
  return undefined
})

function create() {
  if (!draft.name || nameError.value)
    return
  edited.value!.groups.push({ name: draft.name, weight: draft.weight, inherits: [...draft.inherits], grants: [] })
  selected.value = draft.name
  draft.name = ''
  draft.inherits = []
  creating.value = false
}

const confirming = ref(false)

function remove() {
  deleteGroup(edited.value!, current.value.name)
  selected.value = undefined
  confirming.value = false
}
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-8">
    <nav class="flex gap-2 lg:sticky lg:top-[calc(var(--perms-top)+1rem)] lg:flex-col lg:self-start">
      <UButton
        :label="t('perms.groups.create')"
        icon="i-lucide-plus"
        color="neutral"
        variant="subtle"
        class="order-last justify-center lg:order-first"
        @click="creating = true"
      />

      <USelect
        v-model="choice"
        :items="choices"
        value-key="value"
        icon="i-lucide-layers"
        :aria-label="t('perms.groups.pick')"
        class="min-w-0 flex-1 lg:hidden"
      />

      <UNavigationMenu
        :items="menu"
        orientation="vertical"
        :aria-label="t('perms.groups.pick')"
        class="max-lg:hidden"
        :ui="{ linkLabel: 'font-mono text-[13px]', linkTrailingBadge: 'tabular-nums' }"
      >
        <template #item-leading="{ item }">
          <span class="w-7 shrink-0 text-end font-mono text-xs text-dimmed tabular-nums">{{ item.weight }}</span>
        </template>

        <template #item-label="{ item }">
          <span class="flex items-center gap-2">
            {{ item.label }}

            <span v-if="item.fresh" class="size-1.5 rounded-full bg-primary" />
          </span>
        </template>
      </UNavigationMenu>
    </nav>

    <section class="flex min-w-0 flex-col gap-8">
      <header class="flex flex-wrap items-start justify-between gap-3">
        <div class="min-w-0">
          <h2 class="font-mono text-2xl font-semibold text-highlighted">
            {{ current.name }}
          </h2>

          <p v-if="current.name === defaultGroup" class="mt-1 text-sm text-muted">
            {{ t('perms.groups.defaultText') }}
          </p>

          <p v-else class="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
            <span class="flex items-center gap-1.5">
              <UIcon name="i-lucide-users" class="size-4" />

              {{ t('perms.groups.members', { n: players.length }) }}
            </span>

            <span v-if="current.inherits.length" class="flex items-center gap-1.5">
              <UIcon name="i-lucide-git-merge" class="size-4" />

              {{ current.inherits.join(', ') }}
            </span>
          </p>
        </div>

        <UPopover v-if="current.name !== defaultGroup" v-model:open="confirming" modal>
          <UButton :label="t('perms.groups.delete')" icon="i-lucide-trash-2" color="error" variant="ghost" size="sm" />

          <template #content>
            <div class="max-w-72 space-y-3 p-4 text-sm">
              <p>{{ t('perms.groups.deleteConfirm', { group: current.name }) }}</p>

              <div class="flex justify-end gap-2">
                <UButton :label="t('perms.groups.cancel')" color="neutral" variant="ghost" size="sm" @click="confirming = false" />

                <UButton :label="t('perms.groups.delete')" color="error" size="sm" @click="remove" />
              </div>
            </div>
          </template>
        </UPopover>
      </header>

      <div class="rounded-lg border border-default">
        <div class="grid gap-x-8 gap-y-5 p-4 sm:grid-cols-2">
          <UFormField :label="t('perms.groups.weight')" :help="t('perms.groups.weightHint')">
            <UInputNumber v-model="weight" :min="0" :max="1000" :increment="stepper" :decrement="stepper" :ui="weightUi" class="w-32" />
          </UFormField>

          <UFormField v-if="current.name !== defaultGroup" :label="t('perms.groups.parents')" :help="t('perms.groups.parentsHint')">
            <USelectMenu
              v-model="current.inherits"
              :items="parentChoices"
              multiple
              :search-input="false"
              :placeholder="t('perms.groups.noParents')"
              icon="i-lucide-git-merge"
              class="w-full"
            >
              <template #default="{ modelValue }">
                <span v-if="modelValue?.length" class="flex flex-wrap gap-1">
                  <UBadge v-for="parent in modelValue" :key="parent" :label="parent" color="neutral" variant="soft" size="sm" />
                </span>
              </template>
            </USelectMenu>
          </UFormField>
        </div>

        <div v-if="ancestors.length" class="flex flex-wrap items-center gap-1.5 border-t border-default bg-elevated/40 px-4 py-3">
          <span class="me-2 text-xs text-muted">{{ t('perms.groups.order') }}</span>

          <UBadge :label="current.name" color="primary" variant="subtle" class="font-mono" />

          <template v-for="name in ancestors" :key="name">
            <UIcon name="i-lucide-chevron-right" class="size-3.5 text-dimmed" />

            <UButton :label="name" color="neutral" variant="soft" size="xs" class="font-mono" @click="selected = name" />
          </template>
        </div>
      </div>

      <div>
        <h3 class="mb-3 text-sm font-semibold text-highlighted">
          {{ t('perms.grants.title') }}
        </h3>

        <PermsGrants :owner="{ group: current.name }" />
      </div>

      <div v-if="inherited.length">
        <h3 class="mb-3 text-sm font-semibold text-highlighted">
          {{ t('perms.groups.inherited') }}
        </h3>

        <div class="divide-y divide-default rounded-lg border border-dashed border-default">
          <div v-for="source in inherited" :key="source.group" class="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-start sm:gap-4">
            <UButton :label="source.group" icon="i-lucide-layers" color="neutral" variant="link" size="xs" class="w-32 shrink-0 font-mono" @click="selected = source.group" />

            <div class="flex flex-wrap gap-1.5">
              <UTooltip v-for="grant in source.grants" :key="grant.node" :text="grant.overridden ? t('perms.groups.overridden') : undefined" :disabled="!grant.overridden">
                <UBadge
                  :label="grant.value ? grant.node : `-${grant.node}`"
                  :color="grant.value ? 'success' : 'error'"
                  variant="soft"
                  class="font-mono"
                  :class="grant.overridden && 'line-through opacity-50'"
                />
              </UTooltip>
            </div>
          </div>
        </div>
      </div>

      <div v-if="current.name !== defaultGroup">
        <h3 class="mb-3 text-sm font-semibold text-highlighted">
          {{ t('perms.groups.players') }}
        </h3>

        <ul class="divide-y divide-default overflow-hidden rounded-lg ring ring-default">
          <li v-for="p in players" :key="p.id">
            <button type="button" :class="playerRow" @click="openPlayer(p.id)">
              <span class="size-2 shrink-0 rounded-full" :class="p.online ? 'bg-success' : 'bg-accented'" />

              <span class="w-40 shrink-0 truncate font-medium text-highlighted">{{ p.name }}</span>

              <span class="min-w-0 flex-1 truncate font-mono text-xs text-dimmed">{{ p.id }}</span>

              <UIcon v-if="p.until" name="i-lucide-clock" class="size-3.5 shrink-0 text-muted" :title="t('perms.change.until', { date: formatDate(p.until) })" />

              <UIcon name="i-lucide-chevron-right" class="size-4 shrink-0 text-dimmed" />
            </button>
          </li>

          <li v-if="!players.length" class="px-3 py-2.5 text-sm text-muted">
            {{ t('perms.groups.noPlayers') }}
          </li>
        </ul>
      </div>
    </section>

    <UModal v-model:open="creating" :title="t('perms.groups.create')" :ui="{ content: 'max-w-md' }">
      <template #body>
        <form id="perms-group" class="space-y-5" @submit.prevent="create">
          <UFormField :label="t('perms.groups.name')" :help="t('perms.groups.nameHint')" :error="nameError">
            <UInput v-model.trim="draft.name" autofocus placeholder="moder" class="w-full font-mono" />
          </UFormField>

          <UFormField :label="t('perms.groups.weight')">
            <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
              <UInputNumber v-model="draft.weight" :min="0" :max="1000" :increment="stepper" :decrement="stepper" :ui="weightUi" class="w-32" />

              <p class="text-sm text-muted">
                {{ place }}
              </p>
            </div>

            <ol class="mt-3 flex flex-wrap items-center gap-1">
              <li v-for="(g, i) in ladder" :key="`${g.name} ${g.fresh}`" class="flex items-center gap-1">
                <UIcon v-if="i" name="i-lucide-chevron-right" class="size-3 text-dimmed" />

                <UBadge
                  :label="`${g.name} ${g.weight}`"
                  :color="g.fresh ? 'primary' : 'neutral'"
                  :variant="g.fresh ? 'subtle' : 'soft'"
                  size="sm"
                  class="font-mono tabular-nums"
                />
              </li>
            </ol>
          </UFormField>

          <UFormField :label="t('perms.groups.parents')" :hint="t('perms.groups.optional')" :help="t('perms.groups.parentsHint')">
            <USelectMenu
              v-model="draft.inherits"
              :items="groups.map(g => g.name)"
              multiple
              :search-input="false"
              :placeholder="t('perms.groups.noParents')"
              icon="i-lucide-git-merge"
              class="w-full"
            />
          </UFormField>
        </form>
      </template>

      <template #footer>
        <div class="flex w-full justify-end gap-2">
          <UButton :label="t('perms.groups.cancel')" color="neutral" variant="ghost" @click="creating = false" />

          <UButton type="submit" form="perms-group" icon="i-lucide-plus" :label="t('perms.groups.add')" :disabled="!draft.name || !!nameError" />
        </div>
      </template>
    </UModal>
  </div>
</template>
