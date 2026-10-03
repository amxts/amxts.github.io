// What .github/workflows/types.yml needs to know of a docs version, as lines
// for $GITHUB_OUTPUT:
//
//   bun scripts/docs-version.ts <current|next> [module repository...]
//
// branch=   the framework's branch the version reads (its latest release line
//           0.N.x for current, main for next - modules/amxts-docs/sources.ts)
// commit=   that branch's head now
// built=    the framework's commit the version's declarations here were built
//           from (<folder>/.commit, written by `bun run docs:types`)
// modules=  the module repositories asked for (`amxts/ftp`) at their branch of
//           the version, `<name>:<branch>` separated by spaces; for the current
//           version one that has released nothing yet is left out
import type { DocsVersion } from '../shared/docs'
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import process from 'node:process'
import { coreRepo, docsBranch, releaseLine } from '../modules/amxts-docs/sources'
import { typesFolder } from '../shared/docs'

const [version, ...repos] = process.argv.slice(2) as [DocsVersion, ...string[]]
if (version !== 'current' && version !== 'next')
  throw new Error('bun scripts/docs-version.ts <current|next> [module repository...]')

const branch = docsBranch(coreRepo, version)
const commit = execFileSync('git', ['ls-remote', `https://github.com/${coreRepo}.git`, `refs/heads/${branch}`], { encoding: 'utf8' }).split('\t')[0]
const stamp = `${typesFolder('en', version)}/.commit`
const built = existsSync(stamp) ? readFileSync(stamp, 'utf8').trim() : ''
const modules = repos.flatMap((repo) => {
  const ref = version === 'next' ? 'main' : releaseLine(repo)
  return ref ? [`${repo.split('/')[1]}:${ref}`] : []
})

console.log([`branch=${branch}`, `commit=${commit}`, `built=${built}`, `modules=${modules.join(' ')}`].join('\n'))
