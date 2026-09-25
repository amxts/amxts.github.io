# Xen site

The website of Xen, the framework for writing AMX Mod X (Counter-Strike 1.6)
plugins in TypeScript: a landing page, the documentation in English and
Russian, and a catalog of modules.

Built with Nuxt 4, Nuxt UI 4 and Nuxt Content 3, from the official Nuxt UI
docs template (`nuxi init -t ui/docs`).

## Running it

Needs [Bun](https://bun.sh) and Node.js 22.5 or later (Nuxt Content uses Node's
built-in SQLite).

```sh
bun install
bun run dev          # http://localhost:3000
bun run build        # .output/, run with: node .output/server/index.mjs
bun run preview      # serve the build
bun run lint         # ESLint: @antfu/eslint-config + @nuxt/eslint
bun run typecheck
```

The build prerenders the landing and every docs page. The modules catalog
(`/modules`, `/modules/<name>`) is server-rendered on request, because it
reads npm through `/api/modules`.

## Pages

| Route                                   | What                                                                      |
| --------------------------------------- | ------------------------------------------------------------------------- |
| `/`, `/ru`                              | landing (`content/<locale>/index.md`)                                     |
| `/docs/<page>`, `/ru/docs/<page>`       | the reference (`content/<locale>/docs/`)                                  |
| `/modules`, `/ru/modules`               | the modules catalog: search and categories                                |
| `/modules/<name>`, `/ru/modules/<name>` | a module: install command, README from npm or its description             |
| `/api/modules`, `/api/modules/<name>`   | the catalog as JSON                                                       |
| `/raw/docs/<page>.md`                   | a docs page as Markdown (template feature, as are `/llms.txt` and `/mcp`) |

## Languages

English is the default and has no prefix, Russian lives under `/ru`: the
`prefix_except_default` strategy of `@nuxtjs/i18n`. The UI strings are in
`i18n/locales/{en,ru}.json`.

Content is one pair of Nuxt Content collections per language
(`content.config.ts`): `landing_en`/`docs_en` read `content/en/`,
`landing_ru`/`docs_ru` read `content/ru/`, each with the path prefix its
language's routes have. A page picks the collection of the current locale
(`useLocaleContent()`), and so does the search. Separate collections rather
than one with a locale field, because Nuxt Content v3 builds navigation,
search sections and prev/next links per collection, so each language gets
its own for free.

## Where the docs come from

The reference is written in the framework repository, in `docs/api/*.md`
(English) and `docs/api/ru/*.md` (Russian), for VitePress. The site does not
edit those pages; it imports them:

```sh
bun run docs:import                        # from ../ts2pawn/docs/api
bun run docs:import D:/path/to/docs/api    # or from anywhere
```

`scripts/import-docs.ts` writes `content/en/docs/` and `content/ru/docs/`
and changes only what VitePress and Nuxt Content read differently: the first
heading becomes the page's title, links to other pages become site paths,
"Status:" paragraphs become callouts, and file names are numbered in sidebar
order. The sidebar itself - "Getting started", then the "API" group, with the
titles of the framework's `.vitepress/config.ts` - is `shared/docs.ts`. A new
page in the framework goes there too, in both languages.

## How a module gets into the catalog

Publish it to npm with the keyword `xen-module` in its `package.json`:

```json
{
  "name": "xen-votes",
  "keywords": ["xen-module", "xen-menus"]
}
```

A second keyword picks the category: `xen-menus`, `xen-config`,
`xen-network`; without one it is "Other". The catalog reads the npm search
API (`keywords:xen-module`) on the server and caches the answer for an hour
(`server/utils/modules.ts`); a module's page shows its npm README.

Modules that ship with the framework and are not on npm yet - menu-core,
universal-config, http - are listed from `shared/modules.ts`. When a package
of the same name is published, it takes their place.

## Not decided yet

Each lives in one constant in `shared/site.ts`:

- `repository` - the framework's repository (GitHub or GitLab). Empty for
  now, so the header's button is disabled.
- `officialScope` - the npm scope of the official modules (`@xen` may be
  taken).
- `siteUrl` - the public address (`https://xen.example` is a placeholder);
  `NUXT_PUBLIC_SITE_URL` overrides it.
