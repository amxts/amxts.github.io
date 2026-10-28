import type { InjectionKey } from 'vue'
import type { PermsApplied, PermsChange, PermsGrant, PermsOwner, PermsSession } from '#shared/perms'
import { applyChanges, diffSessions, permsVersion } from '#shared/perms'

export type PermsLoad = 'empty' | 'loading' | 'ready' | 'notFound' | 'version' | 'error'

/** Where a save is: sending, waiting for the game server, its answer. */
export type PermsSave
  = | { state: 'idle' }
    | { state: 'sending' }
    | { state: 'waiting', revision: number }
    | { state: 'done', result: PermsApplied }
    | { state: 'failed', message: string }

// the store answers status in a few ms; the server takes a few seconds to poll
const pollEvery = 2000

/**
 * The editor of one session: the session as the store gave it, the edits
 * made to it, and saving them. The edits are kept as the session edited
 * (`edited`); the changes to send are its difference from what the server
 * has (`changes`), so an edit undone leaves no change. Unsaved edits are kept
 * in localStorage under the session's id.
 */
export function usePermsEditor() {
  const store = usePermsStore()
  const id = ref('')
  // loading until the page has read the link: a link with no session turns it to empty
  const load = ref<PermsLoad>('loading')
  const loadError = ref('')
  const snapshot = shallowRef<PermsSession>()
  /** what was saved and applied since the page loaded */
  const saved = ref<PermsChange[]>([])
  const revision = ref(0)
  const edited = ref<PermsSession>()
  const save = ref<PermsSave>({ state: 'idle' })
  const expiresAt = ref(0)
  // where the page is: the tab, the group and the player open in theirs, the review
  const tab = ref<'permissions' | 'groups' | 'players'>('permissions')
  const group = ref<string>()
  const user = ref<string>()
  const reviewing = ref(false)
  const { locale } = useI18n()

  const base = computed(() => snapshot.value && applyChanges(snapshot.value, saved.value))
  const changes = computed(() => base.value && edited.value ? diffSessions(base.value, edited.value) : [])

  const storageKey = () => `amxts-perms:${id.value}`

  function remembered(): { saved: PermsChange[], pending: PermsChange[], revision: number } | undefined {
    try {
      return JSON.parse(localStorage.getItem(storageKey()) ?? 'null') ?? undefined
    }
    catch {}
  }

  watch([changes, saved, revision], () => {
    if (load.value !== 'ready')
      return
    try {
      localStorage.setItem(storageKey(), JSON.stringify({ saved: saved.value, pending: changes.value, revision: revision.value }))
    }
    catch {}
  }, { deep: true })

  async function open(sessionId: string) {
    id.value = sessionId
    load.value = 'loading'
    try {
      const session = await store.session(sessionId)
      if (session.version !== permsVersion) {
        loadError.value = String(session.version)
        load.value = 'version'
        return
      }
      const kept = remembered()
      snapshot.value = session
      saved.value = kept?.saved ?? []
      revision.value = Math.max(kept?.revision ?? 0, session.revision ?? 0)
      edited.value = applyChanges(base.value!, kept?.pending ?? [])
      expiresAt.value = Date.parse(session.expiresAt)
      load.value = 'ready'
    }
    catch (error) {
      loadError.value = error instanceof Error ? error.message : String(error)
      load.value = (error as { statusCode?: number }).statusCode === 404 ? 'notFound' : 'error'
    }
  }

  async function send() {
    const sent = changes.value
    if (!sent.length || save.value.state === 'sending' || save.value.state === 'waiting')
      return
    save.value = { state: 'sending' }
    try {
      const answer = await store.send(id.value, revision.value, sent)
      revision.value = answer.revision
      saved.value = [...saved.value, ...sent]
      save.value = { state: 'waiting', revision: answer.revision }
      await waitFor(answer.revision, sent)
    }
    catch (error) {
      save.value = { state: 'failed', message: error instanceof Error ? error.message : String(error) }
    }
  }

  async function waitFor(sent: number, sentChanges: PermsChange[]) {
    while (save.value.state === 'waiting' && save.value.revision === sent) {
      await new Promise(resolve => setTimeout(resolve, pollEvery))
      const status = await store.status(id.value)
      expiresAt.value = Date.parse(status.expiresAt)
      const result = status.applied.find(a => a.revision === sent)
      if (!result)
        continue
      // what the server passed over is not on it: it goes back to what it was,
      // and the edits made while waiting stay
      if (result.skipped.length) {
        const pending = changes.value
        const skipped = new Set(result.skipped.map(s => JSON.stringify(s.change)))
        saved.value = saved.value.filter(c => !sentChanges.includes(c) || !skipped.has(JSON.stringify(c)))
        edited.value = applyChanges(base.value!, pending)
      }
      save.value = { state: 'done', result }
    }
  }

  /** The grant an owner has for a node on every server (`server: null`), the one the grid edits. */
  function ownGrant(owner: PermsOwner, node: string) {
    return grantsOf(owner)?.find(g => g.node === node && g.server === null)
  }

  function grantsOf(owner: PermsOwner): PermsGrant[] | undefined {
    const session = edited.value
    return 'group' in owner
      ? session?.groups.find(g => g.name === owner.group)?.grants
      : session?.users.find(u => u.id === owner.user)?.grants
  }

  /** Sets (true/false) or removes (null) an owner's grant on every server. */
  function setGrant(owner: PermsOwner, node: string, value: boolean | null) {
    const grants = grantsOf(owner)
    if (!grants)
      return
    const at = grants.findIndex(g => g.node === node && g.server === null)
    if (value === null) {
      if (at >= 0)
        grants.splice(at, 1)
    }
    else if (at >= 0) {
      grants[at]!.value = value
    }
    else {
      grants.push({ node, value, until: null, server: null })
    }
  }

  /** Whether an owner's grant differs from what the server has. */
  function isChanged(owner: PermsOwner, node: string) {
    const key = JSON.stringify(owner)
    return changes.value.some(c => (c.op === 'grant' || c.op === 'revoke') && c.node === node && JSON.stringify(c.owner) === key)
  }

  function discard() {
    if (base.value)
      edited.value = applyChanges(base.value, [])
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleString(locale.value, { dateStyle: 'medium', timeStyle: 'short' })
  }

  return { id, load, loadError, snapshot, edited, base, changes, save, expiresAt, tab, group, user, reviewing, open, send, discard, ownGrant, setGrant, isChanged, formatDate }
}

export type PermsEditor = ReturnType<typeof usePermsEditor>

export const permsEditorKey: InjectionKey<PermsEditor> = Symbol('perms editor')

/** The editor the page made, in its parts. */
export function usePermsEditorContext() {
  return inject(permsEditorKey)!
}
