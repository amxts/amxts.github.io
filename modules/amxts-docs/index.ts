// The framework's Markdown on the site: Nuxt Content reads the pages straight
// from the framework and the catalog's modules (content.config.ts), and this
// module changes what only the site needs (markdown.ts) as each file is read.
// A change here is not seen by pages parsed before it: remove .data.
import type { Locale } from './markdown'
import { defineNuxtModule } from '@nuxt/kit'
import { docsPage, modulePage } from './markdown'
import { loadRegistry } from './sources'

/**
 * A file of a docs collection by its id: `docs_ru/ru/docs/2.core/01.plugin.md`
 * is the framework's `docs/ru/2.core/01.plugin.md`,
 * `module_docs_en/modules/http.md` its `docs/modules/en/http.md`, and
 * `module_docs_en/modules/menu-core/README.md` the README of menu-core.
 */
function fileOf(id: string) {
  const match = id.match(/^(docs|module_docs)_(en|ru)\/(?:ru\/)?(?:docs|modules)\/(.+)$/)
  if (!match)
    return null
  const [, collection, locale, key] = match as [string, string, Locale, string]
  const readme = key.match(/^([\w-]+)\/README(?:\.\w+)?\.md$/)
  if (readme)
    return { locale, module: readme[1]! }
  if (!key.endsWith('.md'))
    return null
  return { locale, path: collection === 'docs' ? `docs/${locale}/${key}` : `docs/modules/${locale}/${key}` }
}

export default defineNuxtModule({
  meta: { name: 'amxts-docs' },
  async setup(_, nuxt) {
    const repos = new Map((await loadRegistry()).map(module => [module.name, module.repo]))
    nuxt.hook('content:file:beforeParse', ({ file }) => {
      const source = fileOf(file.id)
      if (source?.module)
        file.body = modulePage(file.body, source.module, repos.get(source.module)!, source.locale)
      else if (source?.path)
        file.body = docsPage(file.body, source.path, source.locale)
    })
    // a README is its module's page: /modules/menu-core, not .../readme
    nuxt.hook('content:file:afterParse', ({ file, content }) => {
      if (fileOf(file.id)?.module)
        content.path = String(content.path).replace(/\/readme(?:\.\w+)?$/, '')
    })
  },
})
