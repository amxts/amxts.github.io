// Where the content comes from, as nuxt.com reads the framework's docs: a
// checkout on disk when there is one, the GitHub repository otherwise.
//
// - The framework (github.com/amxts/amxts): its docs/ folder, in two versions
//   (shared/docs.ts): the current one from the branch of its latest release
//   line (0.N.x), the next one from main. On disk it is AMXTS_CORE_PATH, or
//   ../amxts beside the site, and both versions read that checkout as it is.
// - The modules catalog (github.com/amxts/modules): its modules.json, the
//   modules it lists. On disk it is AMXTS_REGISTRY_PATH, or ../amxts-registry.
// - A module of the catalog (github.com/<owner>/<name>): its README, from the
//   branch of its latest release line. On disk it is AMXTS_MODULES_PATH/<name>,
//   or ../amxts-modules/<name>, where the official modules are checked out.
import type { CollectionSource } from '@nuxt/content'
import type { DocsVersion } from '../../shared/docs'
import type { RegistryModule } from '../../shared/modules'
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const beside = (folder: string) => fileURLToPath(new URL(`../../../${folder}`, import.meta.url))

function checkout(variable: string | undefined, fallback: string) {
  if (variable)
    return resolve(variable)
  return existsSync(fallback) ? fallback : undefined
}

/** The framework on disk, when there is a checkout of it. */
export const corePath = checkout(process.env.AMXTS_CORE_PATH, beside('amxts'))

/** The modules on disk, each in a folder of its repository's name, when there are checkouts of them. */
export const modulesPath = checkout(process.env.AMXTS_MODULES_PATH, beside('amxts-modules'))

/** The catalog on disk, when there is a checkout of it. */
export const registryPath = checkout(process.env.AMXTS_REGISTRY_PATH, beside('amxts-registry'))

/** The framework's repository on GitHub. */
export const coreRepo = 'amxts/amxts'

const registryUrl = 'https://raw.githubusercontent.com/amxts/modules/main/modules.json'

let registry: Promise<RegistryModule[]> | undefined

/**
 * The modules the catalog lists: the registry's modules.json, which its CI
 * builds from one YAML file per module, read once. The site lists these and
 * no others.
 */
export function loadRegistry(): Promise<RegistryModule[]> {
  registry ??= registryPath
    ? Promise.resolve(JSON.parse(readFileSync(join(registryPath, 'modules.json'), 'utf8')))
    : fetch(registryUrl, { signal: AbortSignal.timeout(15_000) }).then((response) => {
        if (!response.ok)
          throw new Error(`The modules catalog: ${registryUrl} answered ${response.status}`)
        return response.json()
      })
  return registry
}

const lines = new Map<string, string | undefined>()

/**
 * The branch of a repository's latest release line: its highest
 * `<major>.<minor>.x` branch, which a release cuts at the tag of a new minor
 * version (v0.2.0 cuts 0.2.x) and which takes the fixes for that version.
 * Undefined while the repository has released nothing. Asked of GitHub once
 * per repository (`git ls-remote`): a branch is there whether or not the
 * repository makes GitHub Releases, and asking needs no token and has no
 * rate limit.
 */
export function releaseLine(repo: string): string | undefined {
  if (!lines.has(repo)) {
    const heads = execFileSync('git', ['ls-remote', '--heads', `https://github.com/${repo}.git`], { encoding: 'utf8', timeout: 30_000 })
    const [latest] = [...heads.matchAll(/refs\/heads\/(\d+)\.(\d+)\.x$/gm)]
      .map(([, major, minor]) => [Number(major), Number(minor)] as const)
      .sort((a, b) => b[0] - a[0] || b[1] - a[1])
    lines.set(repo, latest && `${latest[0]}.${latest[1]}.x`)
  }
  return lines.get(repo)
}

/**
 * The branch of a repository a docs version reads: the current version its
 * latest release line (main while there is none), the next one main.
 */
export function docsBranch(repo: string, version: DocsVersion) {
  return (version === 'current' && releaseLine(repo)) || 'main'
}

/** The framework's files of a docs version, `include` relative to its root: `docs/en/**`. */
export function coreSource(source: CollectionSource, version: DocsVersion): CollectionSource {
  return corePath
    ? { ...source, cwd: corePath }
    : { ...source, repository: { url: `https://github.com/${coreRepo}`, branch: docsBranch(coreRepo, version) } }
}

/** A module's files, `include` relative to its repository's root: its latest release line on GitHub. */
export function moduleSource(module: RegistryModule, source: CollectionSource): CollectionSource {
  const local = modulesPath && join(modulesPath, module.repo.split('/')[1]!)
  return local && existsSync(local)
    ? { ...source, cwd: local }
    : { ...source, repository: { url: `https://github.com/${module.repo}`, branch: docsBranch(module.repo, 'current') } }
}
