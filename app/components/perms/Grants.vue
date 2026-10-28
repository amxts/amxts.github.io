<script setup lang="ts">
import type { CommandPaletteGroup } from '@nuxt/ui'
import type { PermsGrant, PermsNode, PermsOwner } from '#shared/perms'
import { counts, isWildcard } from '#shared/perms'
import { cellBase, cellClass } from './cells'

const props = defineProps<{ owner: PermsOwner }>()

const { t } = useI18n()
const { edited, changes } = usePermsEditorContext()

const grants = computed(() => {
  const session = edited.value!
  const owner = props.owner
  return ('group' in owner ? session.groups.find(g => g.name === owner.group) : session.users.find(u => u.id === owner.user))?.grants ?? []
})

const declared = computed(() => new Map(edited.value!.nodes.map(n => [n.node, n])))

/** The grants by plugin, as the grid has them: a declared node's plugin, else the node's first part; `*` on its own, amxx last. */
const sections = computed(() => {
  const byPlugin = new Map<string, PermsGrant[]>()
  for (const grant of grants.value) {
    // a bare * stands first, with no heading of its own
    const plugin = declared.value.get(grant.node)?.plugin ?? grant.node.split('.')[0]!
    byPlugin.set(plugin, [...byPlugin.get(plugin) ?? [], grant])
  }
  return [...byPlugin]
    .sort(([a], [b]) => Number(b === '*') - Number(a === '*') || Number(a === 'amxx') - Number(b === 'amxx') || a.localeCompare(b))
    .map(([plugin, list]) => ({
      plugin,
      icon: plugin === '*' ? 'i-lucide-asterisk' : edited.value!.nodes.some(n => n.plugin === plugin && n.pawn) ? 'i-lucide-plug' : 'i-lucide-puzzle',
      grants: list.sort((a, b) => a.node.localeCompare(b.node)),
    }))
})

const nodePattern = /^(?:\*|[a-z][\w-]*(?:\.[a-z][\w-]*)*(?:\.\*)?)$/i

const picking = ref(false)
const term = ref('')

function add(node: string) {
  grants.value.push({ node, value: true, until: null, server: null })
  picking.value = false
  term.value = ''
}

/**
 * The palette of nodes to add: `*` and a row per plugin that opens into its
 * wildcard and nodes; a search lists the matches of every plugin, and a
 * node no plugin declares can be added as typed.
 */
const palette = computed((): CommandPaletteGroup[] => {
  const free = (node: string) => !grants.value.some(g => g.node === node && g.server === null)
  const item = (node: string, description: string, letter = '') => ({
    label: node,
    suffix: description,
    kbds: letter ? [letter] : undefined,
    disabled: !free(node),
    onSelect: () => add(node),
  })
  const byPlugin = new Map<string, PermsNode[]>()
  for (const node of edited.value!.nodes)
    byPlugin.set(node.plugin, [...byPlugin.get(node.plugin) ?? [], node])
  const plugins = [...byPlugin]
    .sort(([a], [b]) => Number(a === 'amxx') - Number(b === 'amxx') || a.localeCompare(b))
    .map(([plugin, nodes]) => ({
      plugin,
      pawn: nodes.some(n => n.pawn),
      items: [item(`${plugin}.*`, t('perms.grid.under', { prefix: plugin })), ...nodes.map(n => item(n.node, n.description, n.letter))],
    }))
  const everything = item('*', t('perms.grid.everythingText'))
  const typed = term.value.trim()
  if (!typed) {
    return [{
      id: 'plugins',
      items: [everything, ...plugins.map(p => ({
        label: p.plugin,
        suffix: t('perms.grid.nodes', { n: p.items.length - 1 }),
        icon: p.pawn ? 'i-lucide-plug' : 'i-lucide-puzzle',
        children: p.items,
      }))],
    }]
  }
  const known = typed === '*' || plugins.some(p => p.items.some(i => i.label === typed))
  const custom = !known && nodePattern.test(typed) && free(typed)
    ? [{ id: 'custom', items: [{ label: typed, suffix: t('perms.grants.custom'), icon: 'i-lucide-plus', onSelect: () => add(typed) }] }]
    : []
  return [...custom, { id: 'everything', items: [everything] }, ...plugins.map(p => ({ id: p.plugin, label: p.plugin, items: p.items }))]
})

const ownerKey = computed(() => JSON.stringify(props.owner))

function changed(node: string, server: string | null) {
  return changes.value.some(c => (c.op === 'grant' || c.op === 'revoke') && c.node === node && c.server === server && JSON.stringify(c.owner) === ownerKey.value)
}

/** Adding is the list's last row: a dashed cell where the grants' cells stand, then its words. */
const addRow = 'flex w-full items-center gap-3 px-3 py-0.5 text-start text-sm text-muted transition-colors hover:bg-elevated/50 hover:text-highlighted focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary'

function remove(grant: (typeof grants.value)[number]) {
  grants.value.splice(grants.value.indexOf(grant), 1)
}
</script>

<template>
  <div class="overflow-hidden rounded-lg ring ring-default">
    <section v-for="section in sections" :key="section.plugin">
      <h4 v-if="section.plugin !== '*'" class="flex items-center gap-2.5 border-b border-default bg-elevated/50 px-3 py-2 text-sm font-semibold text-highlighted">
        <span class="grid size-6 place-items-center rounded-md bg-default ring ring-default">
          <UIcon :name="section.icon" class="size-3.5 text-muted" />
        </span>

        <span class="font-mono">{{ section.plugin }}</span>

        <UBadge :label="String(section.grants.length)" color="neutral" variant="soft" size="sm" class="tabular-nums" />
      </h4>

      <ul class="divide-y divide-default border-b border-default">
        <li
          v-for="grant in section.grants"
          :key="`${grant.node} ${grant.server}`"
          class="flex flex-wrap items-center gap-x-3 gap-y-1 px-3 py-0.5"
          :class="{ 'opacity-60': !counts(grant, edited!.server.context) }"
        >
          <button
            type="button"
            :class="[cellBase, grant.value ? cellClass.granted : cellClass.negated]"
            class="my-0.5 size-7"
            :aria-label="`${grant.node}: ${grant.value ? t('perms.grants.granted') : t('perms.grants.negated')}`"
            :title="grant.value ? t('perms.grants.granted') : t('perms.grants.negated')"
            @click="grant.value = !grant.value"
          >
            <UIcon :name="grant.value ? 'i-lucide-check' : 'i-lucide-x'" class="size-4" />
          </button>

          <code class="flex items-center gap-2 font-mono text-[13px] sm:w-40" :class="isWildcard(grant.node) ? 'font-semibold text-primary' : 'text-highlighted'">
            {{ grant.node }}

            <span v-if="changed(grant.node, grant.server)" class="size-2 rounded-full bg-primary" :title="t('perms.grid.changed')" />
          </code>

          <UBadge
            v-if="!isWildcard(grant.node) && !declared.has(grant.node)"
            :label="t('perms.grid.undeclared')"
            color="warning"
            variant="subtle"
            size="sm"
            icon="i-lucide-circle-help"
          />

          <span class="min-w-0 flex-1 basis-40 truncate text-xs text-muted">{{ declared.get(grant.node)?.description }}</span>

          <PermsUntil v-model="grant.until" />

          <PermsServer v-model="grant.server" />

          <UButton
            icon="i-lucide-trash-2"
            color="neutral"
            variant="ghost"
            size="xs"
            class="text-dimmed hover:text-highlighted"
            :aria-label="t('perms.grants.remove')"
            @click="remove(grant)"
          />
        </li>
      </ul>
    </section>

    <UPopover v-model:open="picking" modal :content="{ align: 'start' }">
      <button type="button" :class="addRow">
        <span class="my-0.5 grid size-7 shrink-0 place-items-center rounded-md border border-dashed border-accented text-muted">
          <UIcon name="i-lucide-plus" class="size-4" />
        </span>

        <span class="font-medium">{{ t('perms.grants.pick') }}</span>

        <span class="ms-auto truncate text-xs text-dimmed">{{ grants.length ? t('perms.grants.searchAll') : t('perms.grants.none') }}</span>
      </button>

      <template #content>
        <UCommandPalette
          v-model:search-term="term"
          :groups="palette"
          :placeholder="t('perms.grants.node')"
          :fuse="{ resultLimit: 100 }"
          :ui="{
            root: 'max-h-96 w-[min(36rem,calc(100vw-2rem))]',
            label: 'px-2 pt-1 text-xs text-muted',
            itemLabelBase: 'font-mono text-[13px]',
            itemLabelSuffix: 'ms-2 font-sans text-xs text-muted',
          }"
        />
      </template>
    </UPopover>
  </div>
</template>
