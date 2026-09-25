// The project's addresses and names, each in one place.

/**
 * The amxts organization on GitHub: the header's link. An official module's
 * repository is `<url>/<name>` (github.com/amxts/menu-core).
 */
export const repository = {
  provider: 'github' as 'github' | 'gitlab',
  url: 'https://github.com/amxts',
}

/**
 * The npm scope of the official modules (@amxts, free on npm); the
 * name here is what the catalog shows in `bun add` and looks up on npm.
 */
export const officialScope = '@amxts'

/** The keyword a package puts in its package.json to be listed in the catalog. */
export const moduleKeyword = 'amxts-module'

/**
 * The site's public address, for OG images, llms.txt and hreflang links. Not
 * decided yet: `.example` is the reserved placeholder domain. NUXT_PUBLIC_SITE_URL
 * overrides it at build time.
 */
export const siteUrl = 'https://amxts.example'
