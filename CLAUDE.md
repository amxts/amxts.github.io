# Xen site

The website of **Xen**, a framework for writing AMX Mod X (Counter-Strike 1.6)
server plugins in plain TypeScript. It is like https://nuxt.com: the
documentation plus a searchable modules catalog like https://nuxt.com/modules.

## Where things are

- The framework itself: `D:\ts2pawn` (to be renamed `D:\xen`). Its
  `CLAUDE.md`, `docs/API-DESIGN.md` (decisions and plans) and
  `.claude/skills/code-style/SKILL.md` (how plugin code is written) are the
  source of truth about Xen. Read them before writing about the framework.
- The docs content comes from `D:\ts2pawn\docs\api\*.md` (English) and
  `docs\api\ru\*.md` (Russian); `scripts/import-docs.ts` here brings them in.
  Every page exists in both languages: change both.
- Do not invent features, numbers or testimonials: describe only what the
  framework's docs say is done.

## Decided (2026-09-25, see D:\ts2pawn\docs\API-DESIGN.md)

- Xen becomes a group (GitLab) / organization (GitHub) with repositories
  `core` (the framework: compiler patches, the xen_amxx module, the host, the
  facade, a `xen` CLI), `modules/*` (official modules: menu-core,
  universal-config, http - each a package) and `site` (this one: docs + the
  modules catalog). Projects such as nhnse live apart and depend on them, like
  an app on Nuxt.
- Modules will be Nuxt-style: `defineModule({ meta, requires, defaults,
setup })`, and a project lists them in `xen.config.ts` - not built yet.
- The catalog lists npm packages with the keyword `xen-module` (npm registry
  search API, fetched on the server with caching), merged with a local
  fallback list for modules not published yet.

## Open - ask the developer, do not decide

- GitLab or GitHub for the group; the repository URL in the header is a
  placeholder until then.
- The npm scope: `@xen/...` may be taken. Package names live in one constant.
- Nothing is published, pushed or deployed without the developer saying so.

## How it is built

- Created with the Nuxt CLI (`nuxi init`) from the official Nuxt UI docs
  template; modules added through the CLI (`nuxi module add`): ui, content,
  eslint, i18n. Follow the template's structure rather than inventing one.
- ESLint as in https://github.com/antfu/vitesse-nuxt: `@nuxt/eslint` with
  `eslint: { config: { standalone: false } }`, and `eslint.config.mjs` =
  `antfu({...}).append(nuxt())`. `bun run lint` must be clean.
- bun is the package manager. English EN at `/docs/...`, Russian at
  `/ru/docs/...`.

## The developer

- Speaks Russian; answer in Russian. Commit messages in English, Conventional
  Commits, and never a `Co-Authored-By` trailer or any AI attribution.
- Vue templates: a blank line between sibling elements and blocks; no HTML
  comments inside `<template>`.
- When they remark on how code reads, turn it into a rule (see how the
  framework does it in its code-style skill) and apply it.
