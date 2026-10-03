import type { DocsVersion, SiteLocale as Locale } from './shared/docs'
import type { RegistryModule } from './shared/modules'
import { defineCollection, defineCollectionSource, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'
import { coreSource, loadRegistry, moduleSource } from './modules/amxts-docs/sources'
import { docsPrefix } from './shared/docs'
import { moduleCategories } from './shared/modules'

// One set of collections per language. English is the default and has no
// prefix (/docs/core/plugin), Russian lives under /ru (/ru/docs/core/plugin),
// the way @nuxtjs/i18n's `prefix_except_default` routes the pages. The docs
// come twice, the current version and the next one (/docs/next/core/plugin).
const localized = (locale: Locale, path: string) => locale === 'en' ? path : `/${locale}${path}`

function landing(locale: Locale) {
  return defineCollection({
    type: 'page',
    source: { include: `${locale}/index.md`, prefix: localized(locale, '/') },
  })
}

// The framework's docs/<locale> of a version (the current one at /docs, the
// next at /docs/next): a numbered folder is a sidebar group (its
// .navigation.yml has the title and icon), a numbered file a page.
function docs(locale: Locale, version: DocsVersion) {
  return defineCollection({
    type: 'page',
    source: coreSource({ include: `docs/${locale}/**`, prefix: docsPrefix(locale, version) }, version),
  })
}

// A module's catalog page: the README of its repository, or, for a module that
// comes with the framework, the framework's page about it
// (docs/modules/<locale>).
function moduleDocs(locale: Locale, registry: RegistryModule[]) {
  return defineCollection({
    type: 'page',
    source: [
      coreSource({
        include: `docs/modules/${locale}/*.md`,
        exclude: registry.map(module => `docs/modules/${locale}/${module.name}.md`),
        prefix: localized(locale, '/modules'),
      }, 'current'),
      ...registry.map(module => moduleSource(module, {
        include: locale === 'en' ? 'README.md' : `README.${locale}.md`,
        prefix: localized(locale, `/modules/${module.name}`),
      })),
    ],
  })
}

/**
 * A function: c12, which loads this file, awaits it, and the catalog is
 * read before the collections that list its modules are defined.
 */
export default async () => {
  const registry = await loadRegistry()
  return defineContentConfig({
    collections: {
      landing_en: landing('en'),
      landing_ru: landing('ru'),
      docs_en: docs('en', 'current'),
      docs_ru: docs('ru', 'current'),
      docs_next_en: docs('en', 'next'),
      docs_next_ru: docs('ru', 'next'),
      module_docs_en: moduleDocs('en', registry),
      module_docs_ru: moduleDocs('ru', registry),
      // the modules the catalog lists, one document each, as the registry's
      // modules.json has them (modules/amxts-docs/sources.ts)
      catalog: defineCollection({
        type: 'data',
        source: defineCollectionSource({
          getKeys: async () => registry.map(module => `${module.name}.json`),
          getItem: async key => JSON.stringify(registry.find(module => `${module.name}.json` === key)),
        }),
        schema: z.object({
          name: z.string(),
          npm: z.string(),
          repo: z.string(),
          description: z.string(),
          category: z.enum(moduleCategories),
          type: z.enum(['official', 'community']),
          logo: z.string().nullable(),
          maintainers: z.array(z.object({ github: z.string() })),
          requires: z.array(z.string()),
        }),
      }),
    },
  })
}
