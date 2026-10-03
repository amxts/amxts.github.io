// The docs' languages and versions, and where each lives. The sidebar itself -
// its groups, their order, titles and icons - is the framework's docs/ folder:
// a numbered folder per group with its .navigation.yml, a numbered page in it.

export type SiteLocale = 'en' | 'ru'

/**
 * A version of the docs: `current` is the latest release, read from its
 * line's branch of the framework (0.N.x); `next` is the coming one, read from
 * main and served under /docs/next.
 */
export type DocsVersion = 'current' | 'next'

/** Where a locale's docs of a version live: `/docs`, `/ru/docs`, `/docs/next`, `/ru/docs/next`. */
export function docsPrefix(locale: SiteLocale, version: DocsVersion = 'current') {
  const docs = locale === 'en' ? '/docs' : `/${locale}/docs`
  return version === 'next' ? `${docs}/next` : docs
}

/** The Nuxt Content collections of a locale and a docs version (content.config.ts). */
export function collections(locale: SiteLocale, version: DocsVersion = 'current') {
  return {
    docs: version === 'next' ? `docs_next_${locale}` as const : `docs_${locale}` as const,
    landing: `landing_${locale}` as const,
    moduleDocs: `module_docs_${locale}` as const,
  }
}

/** The language and docs version of a path: `/ru/docs/next/core/plugin` is Russian, next. */
export function docsOf(path: string) {
  const locale: SiteLocale = path === '/ru' || path.startsWith('/ru/') ? 'ru' : 'en'
  const next = docsPrefix(locale, 'next')
  const version: DocsVersion = path === next || path.startsWith(`${next}/`) ? 'next' : 'current'
  return { locale, version }
}

/**
 * The folder of the framework's declarations the examples of a language and
 * docs version read (scripts/docs-types.ts): `docs-types` (English, current),
 * `docs-types-ru`, `docs-types-next`, `docs-types-next-ru`.
 */
export function typesFolder(locale: SiteLocale, version: DocsVersion) {
  return `docs-types${version === 'next' ? '-next' : ''}${locale === 'en' ? '' : `-${locale}`}`
}

/**
 * The compiler options of the docs' examples, which read the declarations in
 * `root` (a folder of them, with forward slashes): the site's Twoslash
 * (nuxt.config.ts) and the check of the examples (scripts/docs-types.ts).
 */
export function examplesOptions(root: string) {
  return {
    // lib by file name: under TypeScript 6 Twoslash does not find 'esnext'
    // (the module's default), and without it `number[]` reads as `{}`. No DOM:
    // the framework declares its own Event and AbortSignal.
    lib: ['lib.esnext.d.ts'],
    // a caught error is an `Error` in a plugin, not `unknown`
    useUnknownInCatchVariables: false,
    // `~/*` inside the framework, and the packages a project imports
    paths: {
      '~/*': [`${root}/amxts/*`],
      '@amxts/core': [`${root}/amxts/facade.d.ts`],
      '@amxts/core/test-utils': [`${root}/root/src/testing/index.d.ts`],
      '@amxts/core/*': [`${root}/amxts/*`],
      '@amxts/*': [`${root}/packages/*/index.d.ts`],
    },
  }
}
