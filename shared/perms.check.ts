// The perms editor's rules against the demo KZ server: `bun shared/perms.check.ts`
// prints "ok" or throws. (admin has kz.admin.* and -kz.admin.wipe and
// inherits moder <- vip.)
import type { PermsSession } from './perms'
import assert from 'node:assert/strict'
import process from 'node:process'
import { demoSession } from '../app/components/perms/fixture'
import { applyChanges, diffSessions, resolve } from './perms'

const session = demoSession(Date.parse('2026-10-28T12:00:00Z'))
function answer(group: string, node: string) {
  const { value, group: from } = resolve(session, group, node)
  return { value, from }
}

// the most specific grant wins, inherited through parents and default
assert.deepEqual(answer('admin', 'kz.admin.route'), { value: true, from: 'admin' })
assert.deepEqual(answer('admin', 'kz.admin.wipe'), { value: false, from: 'admin' })
assert.deepEqual(answer('headadmin', 'kz.admin.wipe'), { value: true, from: 'headadmin' })
assert.deepEqual(answer('admin', 'shop.vip.trails'), { value: true, from: 'vip' })
assert.deepEqual(answer('vip', 'deathrun.trap'), { value: false, from: 'default' })
assert.deepEqual(answer('vip', 'kz.top'), { value: true, from: null })
// a grant for another server does not count here
assert.equal(answer('admin', 'shop.admin.give').value, false)

// the changes of an edit rebuild it, and no edit leaves none
const edited: PermsSession = structuredClone(session)
edited.groups.find(g => g.name === 'vip')!.grants.push({ node: 'kz.noclip', value: true, until: null, server: null })
edited.groups.push({ name: 'helper', weight: 15, inherits: ['vip'], grants: [] })
edited.groups = edited.groups.filter(g => g.name !== 'trial')
edited.users[0]!.groups.push({ group: 'helper', until: null, server: null })
const changes = diffSessions(session, edited)
assert.deepEqual(changes.map(c => c.op), ['groupCreate', 'grant', 'parentAdd', 'memberAdd', 'groupDelete'])
assert.deepEqual(diffSessions(edited, applyChanges(session, changes)), [])
assert.deepEqual(diffSessions(session, applyChanges(session, [])), [])

process.stdout.write('ok\n')
