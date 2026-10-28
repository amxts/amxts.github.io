// The project's addresses and names, each in one place.

/**
 * The amxts organization on GitHub: the header's link. An official module's
 * repository is `<url>/<name>` (github.com/amxts/menu-core).
 */
export const repository = {
  provider: 'github' as 'github' | 'gitlab',
  url: 'https://github.com/amxts',
}

/** The npm scope of the official modules and the framework (@amxts). */
export const officialScope = '@amxts'

/**
 * The site's origin, for OG images, canonical and hreflang links: GitHub Pages.
 * Without the base path: a site served under a base (app.baseURL) gets it
 * from those modules themselves. NUXT_PUBLIC_SITE_URL overrides it at build
 * time.
 */
export const siteUrl = 'https://amxts.github.io'

/**
 * The store of @amxts/perms' editor sessions, which the editor page (/modules/perms/editor)
 * reads and writes (a Cloudflare Worker; the module's PERMS_EDITOR_URL points
 * at it by default); `?store=<url>` on the page names a self-hosted one.
 */
export const permsStore = 'https://perms-store.brokukaschannel.workers.dev'
