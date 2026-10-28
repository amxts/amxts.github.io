import type { PermsApplied, PermsChange, PermsSession, PermsStatus } from '#shared/perms'
import { applyChanges } from '#shared/perms'
import { permsStore } from '#shared/site'
import { demoSession } from '~/components/perms/fixture'

export interface PermsStore {
  session: (id: string) => Promise<PermsSession>
  send: (id: string, base: number, changes: PermsChange[]) => Promise<{ revision: number }>
  status: (id: string) => Promise<PermsStatus>
}

/**
 * The store the perms editor talks to: ours, a self-hosted one from
 * `?store=<url>`, or with `?mock` one in memory that plays both the store and
 * the game server, on the demo session.
 */
export function usePermsStore(): PermsStore {
  const query = useRoute().query
  if (query.mock !== undefined)
    return mockStore()
  const base = (typeof query.store === 'string' && query.store ? query.store : permsStore).replace(/\/+$/, '')
  const url = (id: string, path = '') => `${base}/session/${encodeURIComponent(id)}${path}`
  return {
    session: id => $fetch(url(id)),
    send: (id, revision, changes) => $fetch(url(id, '/changes'), { method: 'POST', body: { base: revision, changes } }),
    status: id => $fetch(url(id, '/status')),
  }
}

// the game server polls the store every few seconds; the mock answers in about as long
const mockDelay = 2500

function mockStore(): PermsStore {
  const snapshot = demoSession()
  let current = snapshot
  let revision = 0
  const applied: PermsApplied[] = []
  return {
    session: async () => structuredClone(snapshot),
    send: async (_, __, changes) => {
      const sent = ++revision
      setTimeout(() => {
        const skipped: PermsApplied['skipped'] = []
        current = applyChanges(current, changes, (change, reason, code) => skipped.push({ change, reason, code }))
        applied.push({ revision: sent, done: changes.filter(c => !skipped.some(s => s.change === c)), skipped })
      }, mockDelay)
      return { revision: sent }
    },
    status: async () => ({ revision, expiresAt: snapshot.expiresAt, applied: structuredClone(applied) }),
  }
}
