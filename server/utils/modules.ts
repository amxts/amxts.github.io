import type { AmxtsModule } from '#shared/modules'
import { categoryFromKeywords, fallbackModules, moduleSlug } from '#shared/modules'
import { moduleKeyword } from '#shared/site'

interface NpmSearch {
  objects: {
    package: {
      name: string
      version: string
      description?: string
      keywords?: string[]
      publisher?: { username: string }
      author?: { name?: string }
      links?: { repository?: string, homepage?: string }
    }
  }[]
}

interface NpmPackage {
  'readme'?: string
  'repository'?: string | { url?: string }
  'dist-tags'?: Record<string, string>
}

const registry = 'https://registry.npmjs.org'

/**
 * Every package on npm with the `amxts-module` keyword, cached for an hour. A
 * failed request throws, so that it is not what gets cached.
 */
const searchNpmCached = defineCachedFunction(async (): Promise<AmxtsModule[]> => {
  const result = await $fetch<NpmSearch>(`${registry}/-/v1/search`, {
    query: { text: `keywords:${moduleKeyword}`, size: 250 },
    timeout: 8000,
  })

  return result.objects.map(({ package: pkg }) => ({
    slug: moduleSlug(pkg.name),
    package: pkg.name,
    description: { en: pkg.description ?? '', ru: pkg.description ?? '' },
    author: pkg.author?.name ?? pkg.publisher?.username ?? '',
    repository: pkg.links?.repository ?? pkg.links?.homepage ?? null,
    category: categoryFromKeywords(pkg.keywords),
    docs: null,
    requires: [],
    published: true,
    version: pkg.version,
  }))
}, { name: 'npm-search', maxAge: 60 * 60, swr: true })

/** npm's packages, or none when npm does not answer: the catalog then shows the fallback list. */
async function searchNpm() {
  try {
    return await searchNpmCached()
  }
  catch (error) {
    console.warn(`npm search failed, showing the fallback modules: ${(error as Error).message}`)
    return []
  }
}

/**
 * The catalog: npm's packages, and the fallback list for the ones not
 * published yet. A published package takes the place of its fallback entry
 * and keeps what npm does not say (docs page, requirements, a Russian
 * description).
 */
export async function listModules(): Promise<AmxtsModule[]> {
  const published = await searchNpm()
  const byPackage = new Map(published.map(module => [module.package, module]))

  const merged = fallbackModules.map((fallback) => {
    const npm = byPackage.get(fallback.package)
    if (!npm)
      return fallback
    byPackage.delete(fallback.package)
    return {
      ...fallback,
      ...npm,
      description: npm.description.en ? { en: npm.description.en, ru: fallback.description.ru } : fallback.description,
      author: npm.author || fallback.author,
      repository: npm.repository ?? fallback.repository,
      category: npm.category === 'other' ? fallback.category : npm.category,
      docs: fallback.docs,
      requires: fallback.requires,
    }
  })

  return [...merged, ...byPackage.values()]
}

/** A package's README from the registry, or null when it has none or npm does not answer. */
export const fetchReadme = defineCachedFunction(async (packageName: string): Promise<string | null> => {
  try {
    const pkg = await $fetch<NpmPackage>(`${registry}/${packageName.replace('/', '%2F')}`, { timeout: 8000 })
    const readme = pkg.readme?.trim()
    return readme && readme !== 'ERROR: No README data found!' ? readme : null
  }
  catch {
    return null
  }
}, { name: 'npm-readme', maxAge: 60 * 60, swr: true, getKey: (packageName: string) => packageName })
