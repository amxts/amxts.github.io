// The framework's Markdown on the site: Nuxt Content reads the pages straight
// from the framework and the catalog's modules (content.config.ts), and this
// module changes what only the site needs (markdown.ts) as each file is read.
// A change here is not seen by pages parsed before it: remove .data.
import type { DocsVersion } from '../../shared/docs'
import type { Locale } from './markdown'
import { defineNuxtModule } from '@nuxt/kit'
import { docsPage, modulePage } from './markdown'
import { loadRegistry } from './sources'

/**
 * A file of a docs collection by its id: `docs_ru/ru/docs/2.core/01.plugin.md`
 * is the framework's `docs/ru/2.core/01.plugin.md`, `docs_next_en/docs/next/...`
 * the same page of the next version, `module_docs_en/modules/http.md` its
 * `docs/modules/en/http.md`, and `module_docs_en/modules/menu-core/README.md`
 * the README of menu-core.
 */
function fileOf(id: string) {
  const match = id.match(/^(docs|docs_next|module_docs)_(en|ru)\/(?:ru\/)?(?:docs(?:\/next)?|modules)\/(.+)$/)
  if (!match)
    return null
  const [, collection, locale, key] = match as [string, string, Locale, string]
  const readme = key.match(/^([\w-]+)\/README(?:\.\w+)?\.md$/)
  if (collection === 'module_docs' && readme)
    return { locale, module: readme[1]! }
  if (!key.endsWith('.md'))
    return null
  const version: DocsVersion = collection === 'docs_next' ? 'next' : 'current'
  return { locale, version, path: collection === 'module_docs' ? `docs/modules/${locale}/${key}` : `docs/${locale}/${key}` }
}

/** A node of a parsed page (minimark): text, or `[tag, props, ...children]`. */
type MarkNode = string | [string, Record<string, unknown>, ...MarkNode[]]

/** A line of a page's contents, with the version its heading's `:since` mark names. */
interface TocLink { id: string, since?: string, children?: TocLink[] }

/** The version each marked heading names (`## Bots :since{v="0.2"}`), by the heading's id. */
function sinceMarks(nodes: MarkNode[], marks = new Map<string, string>()) {
  for (const node of nodes) {
    if (typeof node === 'string')
      continue
    const [tag, props, ...children] = node
    const mark = /^h[2-6]$/.test(tag) && children.find(child => typeof child !== 'string' && child[0] === 'since')
    if (mark)
      marks.set(String(props.id), String((mark as Exclude<MarkNode, string>)[1].v))
    else
      sinceMarks(children, marks)
  }
  return marks
}

/** A heading's `:since` mark shows in the page's contents too (its line's `since`). */
function markContents(links: TocLink[], marks: Map<string, string>) {
  for (const link of links) {
    link.since = marks.get(link.id)
    markContents(link.children ?? [], marks)
  }
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
        file.body = docsPage(file.body, source.path, source.locale, source.version)
    })
    // a README is its module's page: /modules/menu-core, not .../readme
    nuxt.hook('content:file:afterParse', ({ file, content }) => {
      if (fileOf(file.id)?.module)
        content.path = String(content.path).replace(/\/readme(?:\.\w+)?$/, '')
      const body = content.body as { value?: MarkNode[], toc?: { links: TocLink[] } } | undefined
      if (body?.value && body.toc)
        markContents(body.toc.links, sinceMarks(body.value))
    })
  },
})
