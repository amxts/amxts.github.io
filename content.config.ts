import { defineCollection, defineContentConfig } from '@nuxt/content'

// One pair of collections per language. English is the default and has no
// prefix (/docs/plugin), Russian lives under /ru (/ru/docs/plugin), the way
// @nuxtjs/i18n's `prefix_except_default` routes the pages.
function landing(locale: 'en' | 'ru') {
  return defineCollection({
    type: 'page',
    source: { include: `${locale}/index.md`, prefix: locale === 'en' ? '/' : `/${locale}` },
  })
}

function docs(locale: 'en' | 'ru') {
  return defineCollection({
    type: 'page',
    source: { include: `${locale}/docs/**`, prefix: locale === 'en' ? '/docs' : `/${locale}/docs` },
  })
}

export default defineContentConfig({
  collections: {
    landing_en: landing('en'),
    landing_ru: landing('ru'),
    docs_en: docs('en'),
    docs_ru: docs('ru'),
  },
})
