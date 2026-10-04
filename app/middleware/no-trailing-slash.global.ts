/**
 * GitHub Pages serves a page from its folder's index.html and sends a link
 * without the slash to the one with it: /docs/data/http/. The site's links and
 * the sidebar's active page have no slash, so the address loses it here.
 */
export default defineNuxtRouteMiddleware((to) => {
  if (to.path.length > 1 && to.path.endsWith('/'))
    return navigateTo({ path: to.path.replace(/\/+$/, ''), query: to.query, hash: to.hash }, { replace: true })
})
