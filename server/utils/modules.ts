import type { H3Event } from 'h3'
import type { AmxtsModule } from '#shared/modules'
import { queryCollection } from '@nuxt/content/server'

/**
 * A package's latest version on npm, cached for an hour; null when npm has no
 * such package. Any other failure throws, so that it is not what gets cached.
 */
const npmVersionCached = defineCachedFunction(async (name: string): Promise<string | null> => {
  try {
    return (await $fetch<{ version: string }>(`https://registry.npmjs.org/${name.replace('/', '%2F')}/latest`, { timeout: 8000 })).version
  }
  catch (error) {
    if ((error as { statusCode?: number }).statusCode === 404)
      return null
    throw error
  }
}, { name: 'npm-version', maxAge: 60 * 60, swr: true, getKey: (name: string) => name })

/** A package's version on npm, or null - not published, or npm not answering. */
async function npmVersion(name: string) {
  try {
    return await npmVersionCached(name)
  }
  catch (error) {
    console.warn(`npm did not answer for ${name}: ${(error as Error).message}`)
    return null
  }
}

/**
 * The catalog: the modules the registry lists (the catalog collection), each
 * with its README's title and tagline (the module_docs collections) and its
 * version on npm, then the ones that come with the framework. The official
 * modules first.
 */
export async function listModules(event: H3Event): Promise<AmxtsModule[]> {
  const [catalog, en, ru] = await Promise.all([
    queryCollection(event, 'catalog').all(),
    queryCollection(event, 'module_docs_en').select('path', 'title', 'description').all(),
    queryCollection(event, 'module_docs_ru').select('path', 'title', 'description').all(),
  ])
  const versions = await Promise.all(catalog.map(module => npmVersion(module.npm)))
  const pages = { en: new Map(en.map(page => [page.path, page])), ru: new Map(ru.map(page => [page.path, page])) }
  const names = new Map(catalog.map(module => [module.npm, module.name]))

  const listed = catalog.map((module, i): AmxtsModule => {
    const readme = { en: pages.en.get(`/modules/${module.name}`), ru: pages.ru.get(`/ru/modules/${module.name}`) }
    const maintainer = module.maintainers[0]!.github
    return {
      slug: module.name,
      package: module.npm,
      type: module.type,
      title: { en: readme.en?.title || module.name, ru: readme.ru?.title || readme.en?.title || module.name },
      description: {
        en: readme.en?.description || module.description,
        ru: readme.ru?.description || readme.en?.description || module.description,
      },
      logo: module.logo,
      author: maintainer,
      authorUrl: `https://github.com/${maintainer}`,
      authorAvatar: `https://github.com/${maintainer}.png?size=64`,
      repository: `https://github.com/${module.repo}`,
      category: module.category,
      requires: module.requires.map(name => names.get(name) ?? name),
      version: versions[i] ?? null,
    }
  })

  return listed
    .sort((a, b) => Number(a.type !== 'official') - Number(b.type !== 'official') || a.slug.localeCompare(b.slug))
}
