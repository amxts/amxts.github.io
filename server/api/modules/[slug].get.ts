export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const module = (await listModules()).find(module => module.slug === slug)
  if (!module)
    throw createError({ statusCode: 404, statusMessage: `No module "${slug}" in the catalog` })

  const readme = module.published ? await fetchReadme(module.package) : null
  return { module, readme }
})
