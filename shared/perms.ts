// The web editor of @amxts/perms: the session the store keeps and the
// changes the page sends (the module's "editor contract", version 1), and the
// rules the page needs to show what a group ends up with.

/** The contract's version this page reads. */
export const permsVersion = 1

export interface PermsGrant {
  node: string
  value: boolean
  until: string | null
  server: string | null
}

export interface PermsMembership {
  group: string
  until: string | null
  server: string | null
}

export interface PermsNode {
  node: string
  description: string
  /** whether a player no grant answers for has it (`default: true` in perms.declare) */
  everyone: boolean
  plugin: string
  pawn: boolean
  /** the AMX Mod X flag of an amxx.* node, "" for the others */
  letter: string
}

export interface PermsGroup {
  name: string
  weight: number
  inherits: string[]
  grants: PermsGrant[]
}

export interface PermsUser {
  id: string
  name: string | null
  online: boolean
  groups: PermsMembership[]
  grants: PermsGrant[]
}

export interface PermsSession {
  version: number
  revision?: number
  server: { name: string, address: string, storage: 'file' | 'mysql', context: string | null }
  createdAt: string
  expiresAt: string
  nodes: PermsNode[]
  groups: PermsGroup[]
  users: PermsUser[]
}

export type PermsOwner = { group: string } | { user: string }

export type PermsChange
  = | { op: 'grant', owner: PermsOwner, node: string, value: boolean, until: string | null, server: string | null }
    | { op: 'revoke', owner: PermsOwner, node: string, server: string | null }
    | { op: 'groupCreate', group: string, weight: number }
    | { op: 'groupDelete', group: string }
    | { op: 'groupWeight', group: string, weight: number }
    | { op: 'parentAdd', group: string, parent: string }
    | { op: 'parentRemove', group: string, parent: string }
    | { op: 'memberAdd', user: string, group: string, until: string | null, server: string | null }
    | { op: 'memberRemove', user: string, group: string, server: string | null }
    | { op: 'userCreate', user: string, name: string | null }

/** What the server did with one saved revision (`GET /status`'s `applied`). */
export interface PermsApplied {
  revision: number
  done: PermsChange[]
  skipped: { change: PermsChange, reason: string, code?: PermsSkipCode }[]
}

/** Why the server passed a change over; the page words it itself, `reason` is the fallback. */
export type PermsSkipCode = 'groupMissing' | 'groupExists' | 'userMissing' | 'parentMissing' | 'cycle' | 'defaultGroup' | 'invalid'

export interface PermsStatus {
  revision: number
  expiresAt: string
  applied: PermsApplied[]
}

/** The group every player is in; it cannot be deleted. */
export const defaultGroup = 'default'

/** A group's name: lower-case words, as the console's `perms group <name> create` takes. */
export const groupNamePattern = /^[a-z][\w-]{0,31}$/

/** A SteamID a player can be added by; the LAN ids name no one. */
export const steamIdPattern = /^STEAM_[0-5]:[01]:\d{1,10}$/

export function isWildcard(node: string) {
  return node === '*' || node.endsWith('.*')
}

/**
 * How specific a grant is for a node it matches: an exact node beats any
 * wildcard, a longer wildcard a shorter one; -1 when it does not match.
 */
export function specificity(grant: string, node: string) {
  if (grant === node)
    return 1000
  if (grant === '*')
    return 0
  if (grant.endsWith('.*') && node.startsWith(grant.slice(0, -1)))
    return grant.split('.').length - 1
  return -1
}

/** Whether a grant counts now on the session's server. */
export function counts(grant: { until: string | null, server: string | null }, context: string | null, now = Date.now()) {
  return (grant.server === null || grant.server === context) && (grant.until === null || Date.parse(grant.until) > now)
}

/** The grant of a list that decides a node: the most specific, a negation on a tie. */
export function decisive(grants: PermsGrant[], node: string, context: string | null, now = Date.now()) {
  let best: PermsGrant | undefined
  let bestScore = -1
  for (const grant of grants) {
    if (!counts(grant, context, now))
      continue
    const score = specificity(grant.node, node)
    if (score > bestScore || (score === bestScore && score >= 0 && !grant.value)) {
      best = grant
      bestScore = score
    }
  }
  return best
}

export interface PermsAnswer {
  value: boolean
  /** the group whose grant gave it; null for the node's declared default */
  group: string | null
  grant: PermsGrant | null
}

/**
 * What a player in `group` (and so in `default`) gets for a node: the group's
 * own grants, then its parents' (heavier first), then `default`'s, then the
 * node's declared default - the module's resolution with no own grants.
 */
export function resolve(session: Pick<PermsSession, 'groups' | 'nodes' | 'server'>, group: string, node: string, now = Date.now()): PermsAnswer {
  const byName = new Map(session.groups.map(g => [g.name, g]))
  const seen = new Set<string>()
  const walk = (name: string): PermsAnswer | undefined => {
    const current = byName.get(name)
    if (!current || seen.has(name))
      return
    seen.add(name)
    const grant = decisive(current.grants, node, session.server.context, now)
    if (grant)
      return { value: grant.value, group: name, grant }
    const parents = current.inherits
      .map(parent => byName.get(parent))
      .filter(parent => parent !== undefined)
      .sort((a, b) => b.weight - a.weight)
    for (const parent of parents) {
      const answer = walk(parent.name)
      if (answer)
        return answer
    }
  }
  const declared = session.nodes.find(n => n.node === node)
  return walk(group) ?? walk(defaultGroup) ?? { value: declared?.everyone ?? false, group: null, grant: null }
}

const sameGrant = (node: string, server: string | null) => (g: PermsGrant) => g.node === node && g.server === server
const sameMembership = (group: string, server: string | null) => (m: PermsMembership) => m.group === group && m.server === server

type Skip = [reason: string, code: PermsSkipCode]

const noGroup = (name: string): Skip => [`There is no group ${name}.`, 'groupMissing']
const noUser = (id: string): Skip => [`There is no player ${id}.`, 'userMissing']

/** Makes one change to a session in place; why not, when it does not fit. */
function applyOne(session: PermsSession, change: PermsChange): Skip | undefined {
  const group = (name: string) => session.groups.find(g => g.name === name)
  const user = (id: string) => session.users.find(u => u.id === id)
  switch (change.op) {
    case 'grant':
    case 'revoke':
      return applyGrant(session, change)
    case 'groupCreate':
      if (group(change.group))
        return [`The group ${change.group} exists already.`, 'groupExists']
      session.groups.push({ name: change.group, weight: change.weight, inherits: [], grants: [] })
      return
    case 'groupDelete':
      if (change.group === defaultGroup)
        return ['The default group cannot be deleted.', 'defaultGroup']
      if (!group(change.group))
        return noGroup(change.group)
      deleteGroup(session, change.group)
      return
    case 'groupWeight':
    case 'parentAdd':
    case 'parentRemove':
      return applyToGroup(session, change)
    case 'memberAdd':
    case 'memberRemove':
      return applyMembership(session, change)
    case 'userCreate':
      if (user(change.user))
        return [`The player ${change.user} exists already.`, 'invalid']
      session.users.push({ id: change.user, name: change.name, online: false, groups: [], grants: [] })
  }
}

function applyGrant(session: PermsSession, change: Extract<PermsChange, { op: 'grant' | 'revoke' }>): Skip | undefined {
  const { owner } = change
  const target = 'group' in owner ? session.groups.find(g => g.name === owner.group) : session.users.find(u => u.id === owner.user)
  if (!target)
    return 'group' in owner ? noGroup(owner.group) : noUser(owner.user)
  target.grants = target.grants.filter(g => !sameGrant(change.node, change.server)(g))
  if (change.op === 'grant')
    target.grants.push({ node: change.node, value: change.value, until: change.until, server: change.server })
}

function applyMembership(session: PermsSession, change: Extract<PermsChange, { op: 'memberAdd' | 'memberRemove' }>): Skip | undefined {
  const target = session.users.find(u => u.id === change.user)
  if (!target)
    return noUser(change.user)
  if (change.op === 'memberAdd' && !session.groups.some(g => g.name === change.group))
    return noGroup(change.group)
  target.groups = target.groups.filter(m => !sameMembership(change.group, change.server)(m))
  if (change.op === 'memberAdd')
    target.groups.push({ group: change.group, until: change.until, server: change.server })
}

function applyToGroup(session: PermsSession, change: Extract<PermsChange, { op: 'groupWeight' | 'parentAdd' | 'parentRemove' }>): Skip | undefined {
  const group = session.groups.find(g => g.name === change.group)
  if (!group)
    return noGroup(change.group)
  if (change.op === 'groupWeight') {
    group.weight = change.weight
  }
  else if (change.op === 'parentRemove') {
    group.inherits = group.inherits.filter(p => p !== change.parent)
  }
  else if (!session.groups.some(g => g.name === change.parent)) {
    return [`There is no group ${change.parent}.`, 'parentMissing']
  }
  else if (!group.inherits.includes(change.parent)) {
    group.inherits.push(change.parent)
  }
}

/** Deletes a group with its traces: its players leave it, the groups inheriting it stop. */
export function deleteGroup(session: PermsSession, name: string) {
  session.groups = session.groups.filter(g => g.name !== name)
  for (const g of session.groups)
    g.inherits = g.inherits.filter(p => p !== name)
  for (const u of session.users)
    u.groups = u.groups.filter(m => m.group !== name)
}

/**
 * The session with changes made to it (a copy), as the server applies them:
 * a change that no longer fits is passed over, and `skip` hears why.
 */
export function applyChanges(session: PermsSession, changes: PermsChange[], skip?: (change: PermsChange, reason: string, code: PermsSkipCode) => void): PermsSession {
  const next: PermsSession = JSON.parse(JSON.stringify(session))
  for (const change of changes) {
    const skipped = applyOne(next, change)
    if (skipped)
      skip?.(change, ...skipped)
  }
  return next
}

function diffGrants(owner: PermsOwner, before: PermsGrant[], after: PermsGrant[]): PermsChange[] {
  const changes: PermsChange[] = []
  for (const grant of before) {
    if (!after.some(sameGrant(grant.node, grant.server)))
      changes.push({ op: 'revoke', owner, node: grant.node, server: grant.server })
  }
  for (const grant of after) {
    const old = before.find(sameGrant(grant.node, grant.server))
    if (!old || old.value !== grant.value || old.until !== grant.until)
      changes.push({ op: 'grant', owner, ...grant })
  }
  return changes
}

function diffGroup(group: PermsGroup, old: PermsGroup | undefined): PermsChange[] {
  const changes: PermsChange[] = []
  if (old && old.weight !== group.weight)
    changes.push({ op: 'groupWeight', group: group.name, weight: group.weight })
  for (const parent of old?.inherits ?? []) {
    if (!group.inherits.includes(parent))
      changes.push({ op: 'parentRemove', group: group.name, parent })
  }
  for (const parent of group.inherits) {
    if (!old?.inherits.includes(parent))
      changes.push({ op: 'parentAdd', group: group.name, parent })
  }
  return [...changes, ...diffGrants({ group: group.name }, old?.grants ?? [], group.grants)]
}

function diffUser(user: PermsUser, old: PermsUser | undefined, groups: Set<string>): PermsChange[] {
  const changes: PermsChange[] = []
  for (const m of old?.groups ?? []) {
    // a deleted group takes its members with it
    if (groups.has(m.group) && !user.groups.some(sameMembership(m.group, m.server)))
      changes.push({ op: 'memberRemove', user: user.id, group: m.group, server: m.server })
  }
  for (const m of user.groups) {
    const was = old?.groups.find(sameMembership(m.group, m.server))
    if (!was || was.until !== m.until)
      changes.push({ op: 'memberAdd', user: user.id, ...m })
  }
  return [...changes, ...diffGrants({ user: user.id }, old?.grants ?? [], user.grants)]
}

/**
 * The changes that turn `base` into `edited`, in an order the server can
 * apply: new groups and players first, deleted groups last. Edits that undo
 * each other leave nothing.
 */
export function diffSessions(base: PermsSession, edited: PermsSession): PermsChange[] {
  const oldGroups = new Map(base.groups.map(g => [g.name, g]))
  const oldUsers = new Map(base.users.map(u => [u.id, u]))
  const names = new Set(edited.groups.map(g => g.name))
  return [
    ...edited.groups.filter(g => !oldGroups.has(g.name)).map((g): PermsChange => ({ op: 'groupCreate', group: g.name, weight: g.weight })),
    ...edited.users.filter(u => !oldUsers.has(u.id)).map((u): PermsChange => ({ op: 'userCreate', user: u.id, name: u.name })),
    ...edited.groups.flatMap(g => diffGroup(g, oldGroups.get(g.name))),
    ...edited.users.flatMap(u => diffUser(u, oldUsers.get(u.id), names)),
    ...base.groups.filter(g => !names.has(g.name)).map((g): PermsChange => ({ op: 'groupDelete', group: g.name })),
  ]
}
