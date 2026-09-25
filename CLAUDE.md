# amxts site

The website of **amxts**, a framework for writing AMX Mod X (Counter-Strike
1.6) server plugins in plain TypeScript. It is like https://nuxt.com: the
documentation plus a searchable modules catalog like https://nuxt.com/modules.
The project was called Xen until 2026-09-26 (`xen` is taken on npm); the
folders `D:\xen-site` and `D:\ts2pawn` keep their old names for now.

## Where things are

- The framework itself: `D:\ts2pawn`. Its `CLAUDE.md`, `docs/API-DESIGN.md`
  (decisions and plans) and `.claude/skills/code-style/SKILL.md` (how plugin
  code is written) are the source of truth about amxts. Read them before
  writing about the framework.
- The docs content comes from `D:\ts2pawn\docs\api\*.md` (English) and
  `docs\api\ru\*.md` (Russian); `bun run docs:import` (`scripts/import-docs.ts`)
  brings them in, with the framework's type declarations for the hovers
  (`docs/api/types` → `docs-types/`). Every page exists in both languages:
  change both - in the framework's sources, not in `content/*/docs`.
- Do not invent features, numbers or testimonials: describe only what the
  framework's docs say is done.

## Decided (see D:\ts2pawn\docs\API-DESIGN.md)

- amxts is the GitHub organization https://github.com/amxts with repositories
  `core` (the framework: compiler patches, the amxts_amxx module, the host, the
  facade, a CLI), `modules/*` (official modules: menu-core, universal-config,
  http - each a package) and `amxts.github.io` (this one: docs + the modules
  catalog, served by GitHub Pages at https://amxts.github.io, built by
  .github/workflows/deploy.yml on push, daily and by hand; it was at /site/
  before, and old links redirect).
  Projects such as nhnse live apart and depend on them, like an app on Nuxt.
  menu-core and universal-config have their repositories already; npm
  packages are ready but not published (the npm org is not created yet).
- Packages: `@amxts/core`, `@amxts/menu-core`, `@amxts/universal-config`,
  `@amxts/http`; the scope lives in one constant (`shared/site.ts`).
- Modules will be Nuxt-style: `defineModule({ meta, requires, defaults,
setup })`, listed in the project's config file - not built yet.
- The catalog lists npm packages with the keyword `amxts-module` (npm registry
  search API, fetched on the server with caching), merged with a local
  fallback list for modules not published yet; a second keyword
  (`amxts-menus`, `amxts-config`, `amxts-network`) picks the category.
- Users bring any package manager and any test runner: install and run
  commands are shown as npm / pnpm / yarn / bun tabs, tests as Vitest or
  bun test. The site itself uses bun.

## Open - ask the developer, do not decide

- Nothing is published, pushed or deployed without the developer saying so.

## How it is built

- Created with the Nuxt CLI (`nuxi init`) from the official Nuxt UI docs
  template; modules added through the CLI (`nuxi module add`): ui, content,
  eslint, i18n, nuxt-content-twoslash. Follow the template's structure rather
  than inventing one.
- ESLint as in https://github.com/antfu/vitesse-nuxt: `@nuxt/eslint` with
  `eslint: { config: { standalone: false } }`, and `eslint.config.mjs` =
  `antfu({...}).append(nuxt())`. `bun run lint` must be clean.
- bun is the package manager. English EN at `/docs/...`, Russian at
  `/ru/docs/...`.
- Types on hover (Twoslash) are shaped by patches in `patches/` (twoslash,
  @shikijs/twoslash): members as an interface, a local function without a
  hover, the first line colored as TypeScript. `bun patch --commit` and
  `bun install` run `nuxt prepare` and break a running dev server - stop it
  first; after a change to the hovers, restart dev with `.data` removed.

## The developer

- Speaks Russian; answer in Russian. Commit messages in English, Conventional
  Commits, and never a `Co-Authored-By` trailer or any AI attribution.
- Vue templates: a blank line between sibling elements and blocks; no HTML
  comments inside `<template>`.
- When they remark on how code reads, turn it into a rule (see how the
  framework does it in its code-style skill) and apply it.
