<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import type { PermsAnswer, PermsGrant } from '#shared/perms'
import { counts, isWildcard, resolve } from '#shared/perms'
import { cellBase, cellClass } from './cells'

const { t } = useI18n()
const { edited, ownGrant, setGrant, isChanged, tab, group: openGroup, formatDate } = usePermsEditorContext()

const query = ref('')

interface Row {
  node: string
  description: string
  /** how many wildcard rows above it cover it */
  depth: number
  wildcard: boolean
  undeclared: boolean
  byDefault: boolean
  letter?: string
}

const groups = computed(() => [...edited.value!.groups].sort((a, b) => b.weight - a.weight))

/**
 * Every node the grid has a row for, by plugin: the declared ones, the ones
 * only grants name (undeclared), and a wildcard for each plugin and each
 * prefix two nodes share (kz.admin.*) - the wildcards a grant can name.
 */
const sections = computed(() => {
  const session = edited.value!
  const declared = new Map(session.nodes.map(n => [n.node, n]))
  const granted = [...session.groups, ...session.users].flatMap(owner => owner.grants.map(g => g.node))
  const names = new Set([...declared.keys(), ...granted])
  names.delete('*')
  const children = new Map<string, number>()
  for (const name of names) {
    if (isWildcard(name))
      continue
    const words = name.split('.')
    for (let i = 1; i < words.length; i++) {
      const prefix = `${words.slice(0, i).join('.')}.*`
      children.set(prefix, (children.get(prefix) ?? 0) + 1)
    }
  }
  for (const [prefix, n] of children) {
    if (n > 1 || !prefix.includes('.', prefix.indexOf('.') + 1))
      names.add(prefix)
  }
  const plugins = new Map<string, string[]>()
  for (const name of names) {
    const plugin = name.split('.')[0]!
    plugins.set(plugin, [...plugins.get(plugin) ?? [], name])
  }
  // a wildcard sorts before what it covers: kz.* < kz.admin.* < kz.admin.kick
  const key = (name: string) => name.replace(/\*$/, '')
  return [...plugins]
    .map(([plugin, nodes]) => {
      nodes.sort((a, b) => key(a).localeCompare(key(b)))
      const wildcards = nodes.filter(isWildcard)
      const rows: Row[] = nodes.map((node) => {
        const info = declared.get(node)
        const wildcard = isWildcard(node)
        return {
          node,
          description: info?.description ?? (wildcard ? t('perms.grid.under', { prefix: node.slice(0, -2) }) : ''),
          depth: wildcards.filter(w => w !== node && node.startsWith(w.slice(0, -1))).length,
          wildcard,
          undeclared: !info && !wildcard,
          byDefault: info?.everyone ?? false,
          letter: info?.letter,
        }
      })
      return { plugin, pawn: rows.some(r => declared.get(r.node)?.pawn), rows }
    })
    .sort((a, b) => Number(a.plugin === 'amxx') - Number(b.plugin === 'amxx') || a.plugin.localeCompare(b.plugin))
})

const visible = computed(() => {
  const words = query.value.trim().toLowerCase().split(/\s+/).filter(Boolean)
  if (!words.length)
    return sections.value
  return sections.value
    .map(s => ({ ...s, rows: s.rows.filter(r => words.every(w => `${r.node} ${r.description} ${s.plugin}`.toLowerCase().includes(w))) }))
    .filter(s => s.rows.length)
})

// the plugin the grid shows, from the list beside it, or all of them; a search looks through all
const everyPlugin = '@all'
const plugin = ref(everyPlugin)
const single = computed(() => !query.value.trim() && sections.value.some(s => s.plugin === plugin.value))
const shown = computed(() => single.value ? visible.value.filter(s => s.plugin === plugin.value) : visible.value)

const count = (section: { rows: Row[] }) => section.rows.filter(r => !r.wildcard).length

// a plugin's section folds by its heading; all start open
const folded = ref<string[]>([])
const chevron = 'size-4 shrink-0 text-dimmed transition-transform duration-200 ease-[cubic-bezier(.23,1,.32,1)]'

function fold(plugin: string, open: boolean) {
  folded.value = open ? folded.value.filter(p => p !== plugin) : [...folded.value, plugin]
}
const pluginIcon = (section: { pawn: boolean }) => section.pawn ? 'i-lucide-plug' : 'i-lucide-puzzle'

const menu = computed<NavigationMenuItem[]>(() => [
  {
    label: t('perms.grid.all'),
    icon: 'i-lucide-list-tree',
    badge: sections.value.reduce((n, s) => n + count(s), 0),
    active: !single.value,
    onSelect: () => plugin.value = everyPlugin,
  },
  ...sections.value.map(s => ({
    label: s.plugin,
    icon: pluginIcon(s),
    badge: count(s),
    active: single.value && plugin.value === s.plugin,
    onSelect: () => plugin.value = s.plugin,
  })),
])

const choices = computed(() => [
  { value: everyPlugin, label: t('perms.grid.all'), icon: 'i-lucide-list-tree' },
  ...sections.value.map(s => ({ value: s.plugin, label: `${s.plugin} (${count(s)})`, icon: pluginIcon(s) })),
])

// one column for the permission, one per group; every row of every section shares them
const columns = computed(() => `minmax(14rem, 2fr) repeat(${groups.value.length}, minmax(4.5rem, 1fr))`)
const rowHover = 'group-hover/row:bg-[color-mix(in_oklab,var(--ui-bg-elevated)_60%,var(--ui-bg))]'

type Cell = { kind: 'granted' | 'negated', grant: PermsGrant } | { kind: 'inherited', answer: PermsAnswer }

function cell(groupName: string, node: string): Cell {
  const own = ownGrant({ group: groupName }, node)
  if (own)
    return { kind: own.value ? 'granted' : 'negated', grant: own }
  return { kind: 'inherited', answer: resolve(edited.value!, groupName, node) }
}

// a click goes round: not set -> granted -> negated -> not set
function cycle(groupName: string, node: string) {
  const own = ownGrant({ group: groupName }, node)
  setGrant({ group: groupName }, node, !own ? true : own.value ? false : null)
}

function explain(groupName: string, node: string, c: Cell) {
  const lines: string[] = []
  if (c.kind !== 'inherited') {
    lines.push(t(`perms.grid.${c.kind}`))
    if (c.grant.until)
      lines.push(t('perms.grid.until', { date: formatDate(c.grant.until) }))
    if (!counts(c.grant, edited.value!.server.context))
      lines.push(t('perms.grants.expired'))
  }
  else {
    const value = t(c.answer.value ? 'perms.grid.yes' : 'perms.grid.no')
    lines.push(t('perms.grid.notSet'))
    if (c.answer.group) {
      lines.push(t('perms.grid.from', { value, group: c.answer.group }))
      if (c.answer.grant!.node !== node)
        lines.push(t('perms.grid.via', { node: c.answer.grant!.node }))
    }
    else {
      lines.push(t('perms.grid.fromDefault', { value }))
    }
  }
  if (isChanged({ group: groupName }, node))
    lines.push(t('perms.grid.changed'))
  return lines
}

/** The other servers' grants of a group for a node, which the grid does not edit but shows. */
function elsewhere(groupName: string, node: string) {
  return edited.value!.groups.find(g => g.name === groupName)?.grants.filter(g => g.node === node && g.server !== null) ?? []
}

/** What one cell shows, worked out once per render. */
function view(groupName: string, node: string) {
  const c = cell(groupName, node)
  return {
    class: [cellBase, 'size-8 sm:size-9', classOf(c)],
    icon: iconOf(c),
    small: c.kind === 'inherited',
    state: c.kind === 'inherited' ? t('perms.grid.notSet') : t(`perms.grid.${c.kind}`),
    changed: isChanged({ group: groupName }, node),
    elsewhere: elsewhere(groupName, node).length,
    timed: c.kind !== 'inherited' && c.grant.until !== null,
    label: `${groupName}: ${node}`,
  }
}

/** The cell under the pointer or the focus, which the grid's one tooltip explains. */
const tip = shallowRef<{ el: HTMLElement, group: string, node: string }>()
const tipLines = computed(() => tip.value ? explain(tip.value.group, tip.value.node, cell(tip.value.group, tip.value.node)) : [])

function showGroup(name: string) {
  openGroup.value = name
  tab.value = 'groups'
}

function classOf(c: Cell) {
  if (c.kind !== 'inherited')
    return cellClass[c.kind]
  if (c.answer.value)
    return cellClass.inheritedYes
  return c.answer.grant ? cellClass.inheritedNegated : cellClass.inheritedNo
}

function iconOf(c: Cell) {
  if (c.kind !== 'inherited')
    return c.kind === 'granted' ? 'i-lucide-check' : 'i-lucide-x'
  return c.answer.value ? 'i-lucide-check' : c.answer.grant ? 'i-lucide-x' : 'i-lucide-dot'
}
</script>

<template>
  <div class="grid gap-6 lg:grid-cols-[13rem_minmax(0,1fr)]">
    <aside class="hidden lg:block">
      <UNavigationMenu
        :items="menu"
        orientation="vertical"
        :aria-label="t('perms.grid.plugin')"
        class="sticky top-[calc(var(--perms-top)+1rem)]"
        :ui="{ linkLabel: 'font-mono text-[13px]', linkTrailingBadge: 'tabular-nums' }"
      />
    </aside>

    <div class="flex min-w-0 flex-col gap-3">
      <div class="flex flex-wrap items-center gap-x-5 gap-y-2">
        <UInput
          v-model="query"
          icon="i-lucide-search"
          :placeholder="t('perms.grid.search')"
          :aria-label="t('perms.grid.search')"
          class="w-full max-w-140 sm:w-auto sm:flex-[1_1_20rem]"
        >
          <template v-if="query" #trailing>
            <UButton icon="i-lucide-x" color="neutral" variant="link" size="xs" :aria-label="t('perms.grid.clear')" @click="query = ''" />
          </template>
        </UInput>

        <USelect
          v-model="plugin"
          :items="choices"
          value-key="value"
          :aria-label="t('perms.grid.plugin')"
          :icon="choices.find(c => c.value === plugin)?.icon"
          class="w-full sm:w-56 lg:hidden"
        />

        <ul class="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
          <li class="flex items-center gap-1.5">
            <span class="grid size-5 place-items-center rounded bg-success/15 text-success ring ring-success/35"><UIcon name="i-lucide-check" class="size-3.5" /></span>

            {{ t('perms.grid.granted') }}
          </li>

          <li class="flex items-center gap-1.5">
            <span class="grid size-5 place-items-center rounded bg-error/12 text-error ring ring-error/35"><UIcon name="i-lucide-x" class="size-3.5" /></span>

            {{ t('perms.grid.negated') }}
          </li>

          <li class="flex items-center gap-1.5">
            <span class="grid size-5 place-items-center rounded text-success/45"><UIcon name="i-lucide-check" class="size-3.5" /></span>

            {{ t('perms.grid.inherited') }}
          </li>

          <li class="hidden items-center gap-1.5 sm:flex">
            <UIcon name="i-lucide-mouse-pointer-click" class="size-3.5" />

            {{ t('perms.grid.click') }}
          </li>
        </ul>
      </div>

      <div class="overflow-x-auto rounded-lg ring ring-default lg:overflow-clip">
        <div class="min-w-max text-sm lg:min-w-0" :style="{ '--cols': columns }">
          <div class="sticky top-0 z-20 grid grid-cols-(--cols) border-b border-default bg-default lg:top-(--perms-top)">
            <div class="sticky left-0 z-10 flex items-center bg-default px-3 text-xs font-medium text-muted">
              {{ t('perms.grid.node') }}
            </div>

            <div v-for="g in groups" :key="g.name" class="px-0.5 py-1.5">
              <UButton
                color="neutral"
                variant="ghost"
                size="xs"
                class="mx-auto flex w-full max-w-20 flex-col gap-0"
                @click="showGroup(g.name)"
              >
                <span class="max-w-full truncate text-xs font-semibold text-highlighted">{{ g.name }}</span>

                <span class="text-[10px] font-normal text-dimmed tabular-nums">{{ g.weight }}</span>
              </UButton>
            </div>
          </div>

          <div v-if="!query.trim()" class="group/row grid grid-cols-(--cols) border-b border-default">
            <div class="sticky left-0 z-10 flex items-center gap-2 bg-default px-3 py-2" :class="rowHover">
              <code class="rounded bg-primary/10 px-1.5 font-mono text-[13px] font-semibold text-primary">*</code>

              <span class="text-xs text-muted">{{ t('perms.grid.everythingText') }}</span>
            </div>

            <div v-for="g in groups" :key="g.name" :class="rowHover">
              <PermsCell :view="view(g.name, '*')" @cycle="cycle(g.name, '*')" @show="el => tip = { el, group: g.name, node: '*' }" @hide="tip = undefined" />
            </div>
          </div>

          <UCollapsible
            v-for="section in shown"
            :key="section.plugin"
            :open="single || !folded.includes(section.plugin)"
            @update:open="open => fold(section.plugin, open)"
          >
            <template v-if="!single" #default="{ open }">
              <button
                type="button"
                class="sticky left-0 flex w-full items-center gap-2.5 border-b border-default bg-elevated/50 px-3 py-2.5 text-start transition-colors hover:bg-elevated focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
              >
                <span class="grid size-6 shrink-0 place-items-center rounded-md bg-default ring ring-default">
                  <UIcon :name="pluginIcon(section)" class="size-3.5 text-muted" />
                </span>

                <span class="font-semibold text-highlighted">{{ section.plugin }}</span>

                <UBadge :label="String(count(section))" color="neutral" variant="soft" size="sm" class="tabular-nums" />

                <span class="flex-1" />

                <UBadge v-if="section.pawn" :label="section.plugin === 'amxx' ? t('perms.grid.flags') : t('perms.grid.pawn')" color="neutral" variant="outline" size="sm" icon="i-lucide-plug" />

                <UIcon name="i-lucide-chevron-down" :class="[chevron, { '-rotate-90': !open }]" />
              </button>
            </template>

            <template #content>
              <div v-for="row in section.rows" :key="row.node" class="group/row grid grid-cols-(--cols) border-b border-default">
                <div
                  class="sticky left-0 z-10 bg-default py-1.5 pe-3"
                  :class="rowHover"
                  :style="{ paddingInlineStart: `${0.75 + row.depth * 0.875}rem` }"
                >
                  <span class="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <code class="font-mono text-[13px]" :class="row.wildcard ? 'font-semibold text-primary' : 'text-highlighted'">{{ row.node }}</code>

                    <UTooltip v-if="row.letter" :text="t('perms.grid.flag', { letter: row.letter })">
                      <UKbd :value="row.letter" size="sm" />
                    </UTooltip>

                    <UTooltip v-if="row.undeclared" :text="t('perms.grid.undeclaredText')">
                      <UBadge :label="t('perms.grid.undeclared')" color="warning" variant="subtle" size="sm" icon="i-lucide-circle-help" />
                    </UTooltip>

                    <UBadge v-if="row.byDefault" :label="t('perms.grid.byDefault')" color="neutral" variant="outline" size="sm" />
                  </span>

                  <span v-if="row.description" class="mt-0.5 line-clamp-2 block text-xs text-muted">{{ row.description }}</span>
                </div>

                <div v-for="g in groups" :key="g.name" class="flex items-center" :class="rowHover">
                  <PermsCell :view="view(g.name, row.node)" @cycle="cycle(g.name, row.node)" @show="el => tip = { el, group: g.name, node: row.node }" @hide="tip = undefined" />
                </div>
              </div>
            </template>
          </UCollapsible>
        </div>

        <UTooltip
          :open="!!tip"
          :reference="tip?.el"
          :content="{ side: 'top' }"
          :ui="{ content: 'h-auto py-1.5' }"
        >
          <template #content>
            <span class="flex flex-col py-0.5">
              <span v-for="(line, i) in tipLines" :key="i" :class="i ? 'text-muted' : 'font-medium text-highlighted'">{{ line }}</span>
            </span>
          </template>
        </UTooltip>

        <UEmpty
          v-if="!visible.length"
          icon="i-lucide-search-x"
          :title="t('perms.grid.empty', { query })"
          :actions="[{ label: t('perms.grid.clear'), color: 'neutral', variant: 'subtle', onClick: () => { query = '' } }]"
          variant="naked"
          class="py-12"
        />
      </div>
    </div>
  </div>
</template>
