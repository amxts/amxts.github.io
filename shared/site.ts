// Things about the project that are not decided yet, each in one place.

/**
 * The framework's repository: the header's link, the modules' fallback
 * repository. Not decided yet (GitHub or GitLab, which group): while `url` is
 * empty the header shows the button disabled.
 */
export const repository = {
  provider: 'github' as 'github' | 'gitlab',
  url: '',
}

/**
 * The npm scope of the official modules. `@xen` may be taken on npm; the
 * name here is what the catalog shows in `bun add` and looks up on npm.
 */
export const officialScope = '@xen'

/** The keyword a package puts in its package.json to be listed in the catalog. */
export const moduleKeyword = 'xen-module'

/**
 * The site's public address, for OG images, llms.txt and hreflang links. Not
 * decided yet: `.example` is the reserved placeholder domain. NUXT_PUBLIC_SITE_URL
 * overrides it at build time.
 */
export const siteUrl = 'https://xen.example'
