import type { PermsGrant, PermsNode, PermsSession, PermsUser } from '#shared/perms'

// The session a KZ server would upload: the editor's ?mock works on it, with
// no store. Times are counted from now, so the session is always fresh.

const flags: [string, string, string][] = [
  ['immunity', 'a', 'Immunity: cannot be kicked, banned or slain'],
  ['reservation', 'b', 'A reserved slot'],
  ['kick', 'c', 'amx_kick'],
  ['ban', 'd', 'amx_ban and amx_unban'],
  ['slay', 'e', 'amx_slay and amx_slap'],
  ['map', 'f', 'amx_map'],
  ['cvar', 'g', 'amx_cvar (most cvars)'],
  ['cfg', 'h', 'amx_cfg'],
  ['chat', 'i', 'amx_chat and other chat commands'],
  ['vote', 'j', 'amx_vote and other votes'],
  ['password', 'k', 'Change sv_password'],
  ['rcon', 'l', 'amx_rcon and the rcon cvars'],
  ['levelA', 'm', 'Custom level A'],
  ['levelB', 'n', 'Custom level B'],
  ['menu', 'u', 'Menu access'],
  ['banTemp', 'v', 'amx_ban for a time only'],
  ['admin', 'y', 'Is an admin (is_user_admin)'],
]

const declared: PermsNode[] = [
  { node: 'kz.top', description: 'Open /top15 and the map\'s records', everyone: true, plugin: 'kz', pawn: false, letter: '' },
  { node: 'kz.checkpoint', description: 'Save and go back to checkpoints', everyone: true, plugin: 'kz', pawn: false, letter: '' },
  { node: 'kz.spec', description: 'Go to spectators during a run', everyone: true, plugin: 'kz', pawn: false, letter: '' },
  { node: 'kz.hook', description: 'Use the hook outside a run', everyone: false, plugin: 'kz', pawn: false, letter: '' },
  { node: 'kz.noclip', description: 'Fly with noclip (the run stops)', everyone: false, plugin: 'kz', pawn: false, letter: '' },
  { node: 'kz.admin.kick', description: 'Kick a player from the menu', everyone: false, plugin: 'kz', pawn: false, letter: '' },
  { node: 'kz.admin.setstart', description: 'Set the map\'s start and finish', everyone: false, plugin: 'kz', pawn: false, letter: '' },
  { node: 'kz.admin.route', description: 'Mark a run as a different route', everyone: false, plugin: 'kz', pawn: false, letter: '' },
  { node: 'kz.admin.wipe', description: 'Wipe a map\'s records', everyone: false, plugin: 'kz', pawn: false, letter: '' },
  { node: 'shop.buy', description: 'Buy in /shop', everyone: true, plugin: 'shop', pawn: false, letter: '' },
  { node: 'shop.discount', description: '20% off everything in the shop', everyone: false, plugin: 'shop', pawn: false, letter: '' },
  { node: 'shop.vip.models', description: 'VIP player models', everyone: false, plugin: 'shop', pawn: false, letter: '' },
  { node: 'shop.vip.trails', description: 'VIP trails behind the player', everyone: false, plugin: 'shop', pawn: false, letter: '' },
  { node: 'shop.admin.give', description: 'Give coins to a player', everyone: false, plugin: 'shop', pawn: false, letter: '' },
  ...flags.map(([name, letter, description]) => ({ node: `amxx.${name}`, description, everyone: false, plugin: 'amxx', pawn: true, letter })),
]

const nicks = 'Kpacaba xPaw SiMeN Ghost` nkz.Lord bhopper Dmitry ToxiC p1ka Nemesis shadow_ Ruslan ZERO kz-rush Pinguin w1ndy Fl0w Sasha climber m0ss Lucky Vortex r1ck Artem Bob Kirill Snake Felix nr.Pro Ice hellman Odin Mikki Raptor zx Leha Vasya Monk'.split(' ')

export function demoSession(now = Date.now()): PermsSession {
  const at = (hours: number) => new Date(now + hours * 3_600_000).toISOString().replace(/\.\d+Z$/, 'Z')
  const grant = (node: string, value = true, until: string | null = null, server: string | null = null): PermsGrant => ({ node, value, until, server })
  const users: PermsUser[] = nicks.map((name, i) => ({
    id: `STEAM_0:${i % 2}:${(48_211_093 * (i + 7)) % 210_000_000}`,
    name,
    online: i % 3 === 0,
    groups: [],
    grants: [],
  }))
  const member = (i: number, group: string, until: string | null = null, server: string | null = null) => users[i]!.groups.push({ group, until, server })
  member(0, 'owner')
  member(1, 'headadmin')
  member(2, 'admin')
  member(3, 'admin', null, 'kz1')
  member(4, 'moder')
  member(5, 'moder', at(24 * 6))
  member(6, 'admin', null, 'kz2')
  for (const i of [7, 9, 12, 15, 18, 21, 24, 27, 30, 33])
    member(i, 'vip', i % 2 ? at(24 * (i + 3)) : null)
  member(10, 'vip', at(-30))
  member(13, 'trial', at(24 * 2))
  member(24, 'trial')
  users[2]!.grants.push(grant('kz.admin.wipe', true, at(24 * 10)))
  users[4]!.grants.push(grant('kz.noclip'), grant('amxx.ban', false))
  users[9]!.grants.push(grant('shop.admin.give', true, null, 'kz1'))
  users.push(
    { id: 'ip:46.39.12.104', name: 'LAN party PC', online: false, groups: [{ group: 'vip', until: null, server: null }], grants: [] },
    { id: 'name:Alice', name: 'Alice', online: true, groups: [{ group: 'admin', until: null, server: null }], grants: [] },
  )
  return {
    version: 1,
    revision: 0,
    server: { name: 'KZ #1 · Climb & Bhop', address: '46.174.52.17:27015', storage: 'mysql', context: 'kz1' },
    createdAt: at(-0.2),
    expiresAt: at(0.8),
    nodes: declared,
    groups: [
      { name: 'default', weight: 0, inherits: [], grants: [grant('deathrun.trap', false)] },
      { name: 'vip', weight: 10, inherits: [], grants: [grant('amxx.reservation'), grant('shop.discount'), grant('shop.vip.*'), grant('kz.hook')] },
      { name: 'trial', weight: 20, inherits: ['vip'], grants: [grant('amxx.kick'), grant('amxx.chat'), grant('amxx.admin')] },
      { name: 'moder', weight: 30, inherits: ['vip'], grants: [grant('amxx.kick'), grant('amxx.slay'), grant('amxx.chat'), grant('amxx.vote'), grant('amxx.admin'), grant('amxx.menu'), grant('kz.admin.kick'), grant('amxx.banTemp')] },
      { name: 'admin', weight: 50, inherits: ['moder'], grants: [grant('amxx.ban'), grant('amxx.map'), grant('amxx.cvar'), grant('amxx.immunity'), grant('kz.admin.*'), grant('kz.admin.wipe', false), grant('shop.admin.give', true, null, 'kz2')] },
      { name: 'headadmin', weight: 80, inherits: ['admin'], grants: [grant('amxx.*'), grant('kz.admin.wipe'), grant('amxx.rcon', false)] },
      { name: 'owner', weight: 100, inherits: [], grants: [grant('*')] },
    ],
    users,
  }
}
