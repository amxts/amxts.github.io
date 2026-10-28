<script setup lang="ts">
import type { PermsChange, PermsOwner, PermsSkipCode } from '#shared/perms'

const { t, te } = useI18n()
const { edited, changes, save, reviewing, send, discard, formatDate } = usePermsEditorContext()

function ownerName(owner: PermsOwner) {
  return 'group' in owner ? owner.group : playerName(owner.user)
}

function playerName(id: string) {
  return edited.value!.users.find(u => u.id === id)?.name ?? id
}

/** A change in words: what it does, and its expiry and server if it has them. */
function describe(change: PermsChange) {
  const extra: string[] = []
  if ('until' in change && change.until)
    extra.push(t('perms.change.until', { date: formatDate(change.until) }))
  if ('server' in change && change.server)
    extra.push(t('perms.change.onServer', { server: change.server }))
  let text: string
  switch (change.op) {
    case 'grant':
      text = t(change.value ? 'perms.change.grant' : 'perms.change.negate', { owner: ownerName(change.owner), node: change.node })
      break
    case 'revoke':
      text = t('perms.change.revoke', { owner: ownerName(change.owner), node: change.node })
      break
    case 'memberAdd':
    case 'memberRemove':
      text = t(`perms.change.${change.op}`, { user: playerName(change.user), group: change.group })
      break
    case 'userCreate':
      text = t('perms.change.userCreate', { user: change.name ? `${change.name} (${change.user})` : change.user })
      break
    default:
      text = t(`perms.change.${change.op}`, change)
  }
  return { text, extra: extra.join(', ') }
}

/** Whom a change is about: a group or a player. */
function ownerOf(change: PermsChange): PermsOwner {
  if ('owner' in change)
    return change.owner
  return 'user' in change ? { user: change.user } : { group: change.group }
}

/** A change in a row of its owner: the verb, then what it acts on, and its expiry and server. */
function row(change: PermsChange) {
  const verb = change.op === 'grant' && !change.value ? 'negate' : change.op
  let object = ''
  let mono = true
  switch (change.op) {
    case 'grant':
    case 'revoke':
      object = change.node
      break
    case 'parentAdd':
    case 'parentRemove':
      object = change.parent
      break
    case 'memberAdd':
    case 'memberRemove':
      object = change.group
      break
    case 'userCreate':
      object = change.user
      break
    case 'groupWeight':
      object = String(change.weight)
      break
    case 'groupCreate':
      object = t('perms.review.weight', { weight: change.weight })
      mono = false
      break
  }
  return { verb: t(`perms.verb.${verb}`), object, mono, extra: describe(change).extra, tone: tone(change) }
}

/** The changes by owner, in the order they go: a header per group or player, then its rows. */
const owners = computed(() => {
  const byOwner = new Map<string, { owner: PermsOwner, changes: PermsChange[] }>()
  for (const change of changes.value) {
    const owner = ownerOf(change)
    const key = JSON.stringify(owner)
    if (!byOwner.has(key))
      byOwner.set(key, { owner, changes: [] })
    byOwner.get(key)!.changes.push(change)
  }
  return [...byOwner.values()].map(o => ({
    key: JSON.stringify(o.owner),
    group: 'group' in o.owner,
    name: ownerName(o.owner),
    rows: o.changes.map(row),
  }))
})

function tone(change: PermsChange) {
  if (change.op === 'grant')
    return change.value ? 'text-success' : 'text-error'
  return change.op === 'revoke' || change.op.endsWith('Delete') || change.op.endsWith('Remove') ? 'text-muted' : 'text-primary'
}

function why(skip: { reason: string, code?: PermsSkipCode }) {
  return skip.code && te(`perms.skip.${skip.code}`) ? t(`perms.skip.${skip.code}`) : skip.reason
}

const busy = computed(() => save.value.state === 'sending' || save.value.state === 'waiting')

// a finished save's answer is shown until the review is opened again
watch(reviewing, (open) => {
  if (open && !busy.value && changes.value.length)
    save.value = { state: 'idle' }
})

function discardAll() {
  discard()
  reviewing.value = false
}
</script>

<template>
  <UModal
    v-model:open="reviewing"
    :title="t('perms.review.title')"
    :description="save.state === 'idle' ? `${t('perms.review.count', changes.length)}. ${t('perms.review.text')}` : undefined"
    :ui="{ content: 'max-w-xl', body: 'p-0 sm:p-0' }"
  >
    <template #body>
      <div v-if="save.state === 'idle' || save.state === 'failed'" class="max-h-[50vh] overflow-y-auto">
        <section v-for="o in owners" :key="o.key" class="border-b border-default last:border-b-0">
          <h3 class="flex items-center gap-2 bg-elevated/50 px-4 py-2 text-sm font-semibold text-highlighted sm:px-6">
            <UIcon :name="o.group ? 'i-lucide-layers' : 'i-lucide-user'" class="size-4 text-muted" />

            <span :class="{ 'font-mono': o.group }">{{ o.name }}</span>

            <UBadge :label="String(o.rows.length)" color="neutral" variant="soft" size="sm" class="tabular-nums" />
          </h3>

          <ol class="divide-y divide-default">
            <li v-for="(r, i) in o.rows" :key="i" class="flex flex-wrap items-baseline gap-x-3 px-4 py-2 text-sm sm:px-6">
              <span class="w-16 shrink-0 text-muted">{{ r.verb }}</span>

              <span class="min-w-0 break-all" :class="[r.tone, { 'font-mono text-[13px]': r.mono }]">{{ r.object }}</span>

              <span v-if="r.extra" class="text-xs text-muted">{{ r.extra }}</span>
            </li>
          </ol>
        </section>
      </div>

      <div v-else-if="busy" class="flex flex-col items-center gap-3 px-6 py-10 text-center">
        <div class="relative grid size-12 place-items-center">
          <span class="absolute inset-0 animate-ping rounded-full bg-primary/20 motion-reduce:animate-none" />

          <UIcon name="i-lucide-radio-tower" class="size-6 text-primary" />
        </div>

        <p class="font-medium text-highlighted">
          {{ save.state === 'sending' ? t('perms.review.sending') : t('perms.review.waiting') }}
        </p>

        <p class="max-w-sm text-sm text-muted">
          {{ t('perms.review.waitingText') }}
        </p>
      </div>

      <div v-else-if="save.state === 'done'" class="px-4 py-6 sm:px-6">
        <div class="flex items-center gap-3">
          <div v-if="save.result.done.length" class="grid size-10 place-items-center rounded-full bg-success/15 text-success">
            <UIcon name="i-lucide-check-check" class="size-5" />
          </div>

          <div v-else class="grid size-10 place-items-center rounded-full bg-warning/15 text-warning">
            <UIcon name="i-lucide-circle-slash" class="size-5" />
          </div>

          <div>
            <p class="font-medium text-highlighted">
              {{ save.result.done.length ? `${t('perms.review.applied')} · ${t('perms.review.count', save.result.done.length)}` : t('perms.review.nothing') }}
            </p>

            <p v-if="save.result.done.length" class="text-sm text-muted">
              {{ t('perms.review.appliedText') }}
            </p>
          </div>
        </div>

        <div v-if="save.result.skipped.length" class="mt-5 rounded-lg bg-warning/8 p-3 ring ring-warning/25">
          <p class="flex items-center gap-2 text-sm font-medium text-warning">
            <UIcon name="i-lucide-triangle-alert" class="size-4" />

            {{ t('perms.review.skipped', { n: save.result.skipped.length }) }}
          </p>

          <ul class="mt-2 space-y-1.5 text-sm">
            <li v-for="(skip, i) in save.result.skipped" :key="i">
              <span class="text-highlighted">{{ describe(skip.change).text }}</span>

              <span class="text-muted"> - {{ why(skip) }}</span>
            </li>
          </ul>
        </div>
      </div>

      <UAlert
        v-if="save.state === 'failed'"
        color="error"
        variant="subtle"
        icon="i-lucide-circle-x"
        :title="t('perms.review.failed')"
        :description="save.message"
        class="m-4 w-auto sm:mx-6"
      />
    </template>

    <template #footer>
      <div class="flex w-full items-center gap-2">
        <template v-if="save.state === 'idle' || save.state === 'failed'">
          <UButton :label="t('perms.review.discard')" icon="i-lucide-undo-2" color="neutral" variant="ghost" @click="discardAll" />

          <UButton :label="t('perms.review.send', { n: changes.length })" icon="i-lucide-send" class="ms-auto" :disabled="!changes.length" @click="send" />
        </template>

        <UButton v-else :label="t('perms.review.close')" color="neutral" variant="subtle" class="ms-auto" @click="reviewing = false" />
      </div>
    </template>
  </UModal>
</template>
