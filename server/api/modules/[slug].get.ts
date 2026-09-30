export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const module = (await listModules(event)).find(module => module.slug === slug)
  if (!module)
    throw createError({ statusCode: 404, statusMessage: `No module "${slug}" in the catalog` })

  return module
})
