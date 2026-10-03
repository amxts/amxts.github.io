# amxts site

The website of amxts, the framework for writing AMX Mod X (Counter-Strike 1.6)
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

`bun run generate` prerenders the whole site for GitHub Pages: the landing,
every docs page and the modules catalog (`/modules`, `/modules/<name>`,
`/api/modules`), as the registry and npm are when it runs.

## Pages

| Route                                        | What                                                                      |
| -------------------------------------------- | ------------------------------------------------------------------------- |
| `/`, `/ru`                                   | landing (`content/<locale>/index.md`)                                     |
| `/docs/<group>/<page>`, `/ru/docs/...`       | the reference of the latest release (the framework's `docs/<locale>/`)    |
| `/docs/next/<group>/<page>`, `/ru/docs/next` | the reference of the next version, unreleased (the framework's `main`)    |
| `/modules`, `/ru/modules`                    | the modules catalog: search and categories                                |
| `/modules/<name>`, `/ru/modules/<name>`      | a module: install command, the README of its repository                   |
| `/api/modules`, `/api/modules/<name>`        | the catalog as JSON                                                       |
| `/raw/docs/<group>/<page>.md`                | a docs page as Markdown (template feature, as are `/llms.txt` and `/mcp`) |

## Languages

English is the default and has no prefix, Russian lives under `/ru`: the
`prefix_except_default` strategy of `@nuxtjs/i18n`. The UI strings are in
`i18n/locales/{en,ru}.json`.

Content is one set of Nuxt Content collections per language
(`content.config.ts`): `landing_en` reads `content/en/`, `docs_en` the
framework's `docs/en/`, `docs_next_en` the same of the next version,
`module_docs_en` the official modules' READMEs; the `_ru` ones the same in
Russian, each with the path prefix its language's routes have. A page picks
the collection of the current locale and docs version (`useLocaleContent()`,
`shared/docs.ts`), and so do the sidebar and the search. Separate collections
rather than one with a locale field, because Nuxt Content v3 builds
navigation, search sections and prev/next links per collection, so each
language and version gets its own for free. `/llms.txt` and the MCP tools
serve the current docs only.

## Where the docs come from

The reference is written in the framework repository, in its `docs/` folder
(raw Markdown, `docs/README.md`): `docs/en/` and `docs/ru/`, a numbered folder
per sidebar group with its `.navigation.yml` (title and icon), a numbered page
in it (`docs/en/2.core/01.plugin.md` is `/docs/core/plugin`). Nuxt Content
reads it as it is, the way nuxt.com reads Nuxt's docs:

- from a checkout on disk: `AMXTS_CORE_PATH`, or `../amxts` beside this
  repository when it is there - for both versions;
- from https://github.com/amxts/amxts otherwise (the deploy): the docs of the
  latest release from the branch of its release line - the highest
  `<major>.<minor>.x` branch, which each minor release cuts at its tag - and
  the next version's from `main`, at `/docs/next` with a banner that says it
  is unreleased. The build finds the line itself (`git ls-remote`,
  `modules/amxts-docs/sources.ts`).

A module's page is its README (`README.md`, `README.ru.md`; a module with an
English one only shows it on `/ru` too): from `AMXTS_MODULES_PATH/<name>` or
`../amxts-modules/<name>` (`<name>`: its repository's), or from its GitHub
repository's branch of its latest release line (its default branch while it
has released nothing).

The site does not edit those pages. What only it needs is added as each file
is read (`modules/amxts-docs/`, the `content:file:beforeParse` hook): links
between pages become site paths, containers become callouts, shell commands
become package manager tabs, TypeScript examples get types on hover, a
README's header becomes the page's title and description. After changing that
code, remove `.data`: the pages parsed before keep their old form.

The hovers read the framework's declarations, one set per docs version and
language: `docs-types/` and `docs-types-ru/` for the current version,
`docs-types-next/` and `docs-types-next-ru/` for the next (a code block's
`types-<set>` meta picks the folder). The framework builds them with its
whole toolchain (`bun run types:site`, `bun run types:site -- --lang ru`
there), and

```sh
bun run docs:types              # from the checkout of the current version
bun run docs:types -- --next    # from the checkout of main
bun run docs:types -- --check   # only check the examples
```

copies them here from `AMXTS_CORE_PATH` (or `../amxts`) and checks every
example of that version's docs - and, for the current one, of the READMEs -
against them: an example whose hover would say `any` fails it. The `types`
workflow (`.github/workflows/types.yml`) does the same every day and when the
framework asks: it builds a version's set again from that version's branch
when the branch has moved (`<folder>/.commit`), commits it, then deploys the
site.

## How a module gets into the catalog

The catalog is the registry [amxts/modules](https://github.com/amxts/modules):
one YAML file per module, added by a pull request, checked by its CI, which
builds them into `modules.json`. The site lists those modules and no others
(its CONTRIBUTING says how to add one). It reads `modules.json` when it
builds (`modules/amxts-docs/sources.ts`): from `AMXTS_REGISTRY_PATH`, or
`../amxts-registry` when it is there, else from
`https://raw.githubusercontent.com/amxts/modules/main/modules.json`. Each
module is a document of the `catalog` collection (`content.config.ts`), and
its README a page of `module_docs_<locale>`.

A module's card and page show its logo (the entry's `logo`, from its
repository), whether it is official or from the community, its category (the
registry's: `ui`, `gameplay`, `admin`, `config`, `data`, `network`, `tools` -
`moduleCategories` in `shared/modules.ts`) and its version on npm, asked of
the npm registry and cached for an hour (`server/utils/modules.ts`).

## Not decided yet

Each lives in one constant in `shared/site.ts`:

- `repository` - the framework's repository (GitHub or GitLab). Empty for
  now, so the header's button is disabled.
- `officialScope` - the npm scope of the official modules (`@amxts`).
- `siteUrl` - the public address (`https://amxts.example` is a placeholder);
  `NUXT_PUBLIC_SITE_URL` overrides it.
