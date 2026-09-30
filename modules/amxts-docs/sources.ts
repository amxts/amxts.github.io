// Where the content comes from, as nuxt.com reads the framework's docs: a
// checkout on disk when there is one, the GitHub repository otherwise.
//
// - The framework (github.com/amxts/amxts): its docs/ folder. On disk it is
//   AMXTS_CORE_PATH, or ../amxts beside the site.
// - The modules catalog (github.com/amxts/modules): its modules.json, the
//   modules it lists. On disk it is AMXTS_REGISTRY_PATH, or ../amxts-registry.
// - A module of the catalog (github.com/<owner>/<name>): its README. On disk
//   it is AMXTS_MODULES_PATH/<name>, or ../amxts-modules/<name>, where the
//   official modules are checked out.
import type { CollectionSource } from '@nuxt/content'
import type { RegistryModule } from '../../shared/modules'
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

/** The framework's files, `include` relative to its root: `docs/en/**`. */
export function coreSource(source: CollectionSource): CollectionSource {
  return corePath
    ? { ...source, cwd: corePath }
    : { ...source, repository: 'https://github.com/amxts/amxts/tree/main' }
}

/** A module's files, `include` relative to its repository's root: its default branch on GitHub. */
export function moduleSource(module: RegistryModule, source: CollectionSource): CollectionSource {
  const local = modulesPath && join(modulesPath, module.repo.split('/')[1]!)
  return local && existsSync(local)
    ? { ...source, cwd: local }
    : { ...source, repository: { url: `https://github.com/${module.repo}` } }
}
