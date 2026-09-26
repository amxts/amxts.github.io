// Copies the framework's reference (docs/api in the amxts repository, written
// for VitePress) into content/en/docs and content/ru/docs, in the form Nuxt
// Content reads it:
//
//   bun run docs:import                      # from ../ts2pawn/docs/api
//   bun run docs:import D:/path/to/docs/api  # from anywhere else
//
// The pages keep the framework's text. What changes:
// - the file name gets the page's place in the sidebar (shared/docs.ts):
//   `02.plugin.md`, so Nuxt Content orders the pages, the search and the
//   prev/next links the way VitePress did; the number is not in the URL;
// - the first `# heading` becomes the page's `title` (the page header shows
//   it), and the sidebar's title becomes `navigation.title`;
// - links to another page (`plugin.md`, `./async`, `entities.md#vectors-vector`)
//   become site paths (`/docs/plugin`, `/ru/docs/async`), and a link that reads
//   as a file name (`[plugin.md](plugin.md)`) reads as the page's title;
// - a VitePress container (`::: warning Title` ... `:::`) becomes a Nuxt UI
//   callout (`::warning`), its title a bold first line (a `<br>`: the callout
//   unwraps paragraphs, so a blank line would not break it);
// - the space (or line break) before a dash becomes a non-breaking one, so a
//   wrapped line never starts with a dash;
// - a TypeScript example gets `twoslash`, so the site shows its types on
//   hover; the declarations it needs (docs/api/types) go to docs-types/;
// - an official module's page is its README (see below).
// index.md is VitePress' home page; the site's landing (content/*/index.md)
// replaces it.
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import process from 'node:process'
import * as ts from 'typescript'
import { docPages, docsPrefix, modulePages, pageTitles } from '../shared/docs'

const source = resolve(process.argv[2] ?? '../ts2pawn/docs/api')
const target = resolve('content')

const known = new Set([...docPages, ...Object.keys(modulePages)])
const locales = [
  { code: 'en' as const, dir: source },
  { code: 'ru' as const, dir: join(source, 'ru') },
]

const callouts: Record<string, string> = { tip: 'tip', warning: 'warning', danger: 'caution', info: 'note', details: 'note' }

// ponytail: a container with a code block inside is cut in two by splitFences and stays as it is; handle it when the docs get one.
function containers(prose: string) {
  return prose.replace(
    /^::: (\w+)(?: (\S.*))?\n([\s\S]*?)\n:::$/gm,
    (match, kind: string, title: string | undefined, body: string) => callouts[kind]
      ? `::${callouts[kind]}\n${title ? `**${title}**<br>\n` : ''}${body}\n::`
      : match,
  )
}

const managers = [
  { name: 'npm', run: 'npm run', add: 'npm i' },
  { name: 'pnpm', run: 'pnpm run', add: 'pnpm add' },
  { name: 'yarn', run: 'yarn run', add: 'yarn add' },
  { name: 'bun', run: 'bun run', add: 'bun add' },
]

/**
 * A shell block of `bun run ...` / `bun add ...` lines becomes tabs, one per
 * package manager, synced across the site like nuxt.com's: the framework
 * does not tie a project to bun.
 */
function packageManagers(block: string) {
  const lines = block.split('\n')
  const commands = lines.slice(1, -1)
  if (!/^```(?:sh|bash)\s*$/.test(lines[0]!) || !commands.length || !commands.every(line => /^bun (?:run|add) /.test(line)))
    return block

  const tabs = managers.map(manager => [
    `\`\`\`sh [${manager.name}]`,
    ...commands.map((line) => {
      const command = line.replace(/^bun run /, `${manager.run} `).replace(/^bun add /, `${manager.add} `)
      // yarn passes a script's arguments on without the `--` separator
      return manager.name === 'yarn' ? command.replace(' -- ', ' ') : command
    }),
    '```',
  ].join('\n'))
  return `::code-group{sync="pm"}\n${tabs.join('\n\n')}\n::`
}

/**
 * What `~/facade` exports, read with the TypeScript compiler from the
 * framework's declarations: an example that uses `Player` or `server` without
 * importing them gets a hidden import of all of them (above `// ---cut---`,
 * which Twoslash does not show), so their types still show on hover.
 */
function facadeExports() {
  const file = join(source, 'types/amxts/facade.d.ts')
  if (!existsSync(file))
    return []
  const program = ts.createProgram([file], { noEmit: true, types: [] })
  const checker = program.getTypeChecker()
  const module = checker.getSymbolAtLocation(program.getSourceFile(file)!)
  return module ? checker.getExportsOfModule(module).map(symbol => symbol.name).filter(name => !name.startsWith('__')) : []
}

const facade = facadeExports()

/** `locale`: a translated page's blocks read that language's declarations (`locale-ru`). */
function twoslash(block: string, locale?: string) {
  if (!/^```ts\s/.test(block))
    return block
  const [fence, ...rest] = block.split('\n')
  const code = rest.join('\n')
  const hidden = facade.length && !/from "(?:~\/facade|@amxts\/core)"/.test(block)
    ? [`import { ${facade.join(', ')} } from "~/facade";`]
    : []
  // An example that talks about `player` without declaring it gets one, so
  // what it reads from the player has its types too.
  if (/\bplayer\b/.test(code) && !/(?:\b(?:const|let|var)\s+|[(,]\s*)player\b/.test(code))
    hidden.push('declare const player: import("~/facade").Player;')
  const prelude = hidden.length ? [...hidden, '// ---cut---'] : []
  return [fence!.replace(/^```ts/, locale ? `\`\`\`ts twoslash locale-${locale}` : '```ts twoslash'), ...prelude, ...rest].join('\n')
}

interface Page {
  markdown: string
  prefix: string
  titles: string[]
  navigation: string
}

/**
 * The text as prose and code blocks in turn: prose at even places, a fenced
 * block (its fences included) at odd ones. Code blocks stay exactly as they
 * are; only the prose between them is rewritten.
 */
function splitFences(text: string) {
  const parts: string[] = []
  let current: string[] = []
  let fenced = false
  for (const line of text.split('\n')) {
    const fence = line.trimStart().startsWith('```')
    if (fence && !fenced) {
      parts.push(current.join('\n'))
      current = [line]
      fenced = true
    }
    else if (fence && fenced) {
      current.push(line)
      parts.push(current.join('\n'))
      current = []
      fenced = false
    }
    else {
      current.push(line)
    }
  }
  parts.push(current.join('\n'))
  return parts
}

/**
 * VitePress' `::: code-group` ... `:::` around code blocks becomes Nuxt UI's
 * `::code-group` ... `::`, its tabs synced site-wide like the package-manager
 * ones. The closing line is the first bare `:::` outside a code block.
 */
function codeGroups(lines: string[]) {
  let fenced = false
  let open = false
  for (const [i, line] of lines.entries()) {
    if (line.trimStart().startsWith('```'))
      fenced = !fenced
    else if (!fenced && line.trim() === '::: code-group')
      [lines[i], open] = ['::code-group{sync="pm"}', true]
    else if (!fenced && open && line.trim() === ':::')
      [lines[i], open] = ['::', false]
  }
}

function convert({ markdown, prefix, titles, navigation }: Page) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n')
  const h1 = lines.findIndex(line => line.startsWith('# '))
  // the page header shows the title as text: `Map` reads as Map there
  const title = (h1 >= 0 ? lines[h1]!.slice(2).trim() : navigation).replaceAll('`', '')
  if (h1 >= 0)
    lines.splice(h1, 1)
  codeGroups(lines)

  const body = splitFences(lines.join('\n').trim()).map((part, i) => {
    if (i % 2 === 1)
      return twoslash(packageManagers(part), prefix.startsWith('/ru/') ? 'ru' : undefined)

    const linked = part.replace(
      /\[([^\]]*)\]\((?:\.\/)?([a-z-]+)(?:\.md)?(#[^)]*)?\)/g,
      (match, text: string, page: string, hash = '') => {
        if (!known.has(page))
          return match
        // a module's page lives on the module's catalog page
        const module = modulePages[page]
        const label = /^[\w-]+\.md(?:#.*)?$/.test(text) ? (module ?? titles[docPages.indexOf(page)]) : text
        return module
          ? `[${label}](${prefix.slice(0, -'/docs'.length)}/modules/${module}${hash})`
          : `[${label}](${prefix}/${page}${hash})`
      },
    )
      // the site's own pages (`/modules`) in the page's language: `/ru/modules`
      .replace(/\]\(\/(?!docs\/|ru\/)/g, `](${prefix.slice(0, -'/docs'.length)}/`)

    return containers(linked).replace(/(\S)[ \n]\u2014/g, '$1\u00A0\u2014')
  }).join('\n')

  const frontmatter = [
    '---',
    `title: ${JSON.stringify(title)}`,
    'navigation:',
    `  title: ${JSON.stringify(navigation)}`,
    '---',
  ].join('\n')

  return `${frontmatter}\n\n${body.trim()}\n`
}

for (const { code, dir } of locales) {
  const out = join(target, code, 'docs')
  const modulesOut = join(target, code, 'modules')
  const titles = docPages.map(page => pageTitles[code][page]!)
  rmSync(out, { recursive: true, force: true })
  rmSync(modulesOut, { recursive: true, force: true })
  mkdirSync(out, { recursive: true })
  mkdirSync(modulesOut, { recursive: true })

  const files = readdirSync(dir).filter(file => file.endsWith('.md') && file !== 'index.md')
  for (const file of files) {
    const page = file.slice(0, -3)
    const module = modulePages[page]
    if (module) {
      const markdown = readFileSync(join(dir, file), 'utf8')
      writeFileSync(join(modulesOut, `${module}.md`), convert({ markdown, prefix: docsPrefix(code), titles, navigation: module }))
      continue
    }
    const place = docPages.indexOf(page)
    if (place < 0) {
      console.warn(`${code}/${file}: not in the sidebar (shared/docs.ts), skipped`)
      continue
    }

    const markdown = readFileSync(join(dir, file), 'utf8')
    const navigation = titles[place]!
    writeFileSync(
      join(out, `${String(place + 1).padStart(2, '0')}.${file}`),
      convert({ markdown, prefix: docsPrefix(code), titles, navigation }),
    )
  }

  for (const page of docPages) {
    if (!files.includes(`${page}.md`))
      console.warn(`${code}: ${page}.md is in the sidebar but missing in ${dir}`)
  }

  console.log(`${code}: ${files.length} pages -> ${out}`)
}

// A module's page is its README (../amxts-modules/<name>/README{,.ru}.md),
// replacing the framework's own page about it: the header block gives the
// title and description, repository links point at GitHub, alerts become
// callouts, TypeScript examples get hovers.
const modulesSource = resolve(process.argv[3] ?? '../amxts-modules')
const alerts: Record<string, string> = { NOTE: 'note', TIP: 'tip', IMPORTANT: 'note', WARNING: 'warning', CAUTION: 'caution' }

function readme(markdown: string, name: string, locale: 'en' | 'ru') {
  let text = markdown.replace(/\r\n/g, '\n')
  let title = name
  let description = ''
  const header = text.match(/^<div align="center">\n([\s\S]*?)\n<\/div>\n/)
  if (header) {
    title = header[1]!.match(/^# (.+)$/m)?.[1]?.trim() ?? name
    description = header[1]!.match(/^\*([^*\n]+)\*$/m)?.[1]?.trim() ?? ''
    text = text.slice(header[0].length)
  }

  const repository = `https://github.com/amxts/${name}/blob/main/`
  const body = splitFences(text.trim()).map((part, i) => {
    if (i % 2 === 1)
      return twoslash(part, locale === 'ru' ? 'ru' : undefined)
    return part
      // a link into the repository (PAWN.md, LICENSE, include/...) opens on GitHub
      .replace(/\]\((?!https?:|#|\/)([^)\s]+)\)/g, (_, path: string) => `](${repository}${path})`)
      // > [!WARNING] + quoted lines -> ::warning ... ::
      .replace(/^> \[!(\w+)\]\n((?:>.*(?:\n|$))+)/gm, (match, kind: string, quoted: string) => {
        const callout = alerts[kind.toUpperCase()]
        if (!callout)
          return match
        const lines = quoted.trimEnd().split('\n').map(line => line.replace(/^> ?/, ''))
        return `::${callout}\n${lines.join('\n')}\n::\n`
      })
  }).join('\n')

  const frontmatter = ['---', `title: ${JSON.stringify(title)}`]
  if (description)
    frontmatter.push(`description: ${JSON.stringify(description)}`)
  frontmatter.push('---')
  return `${frontmatter.join('\n')}\n\n${body.trim()}\n`
}

if (existsSync(modulesSource)) {
  for (const name of readdirSync(modulesSource)) {
    for (const [locale, file] of [['en', 'README.md'], ['ru', 'README.ru.md']] as const) {
      const path = join(modulesSource, name, file)
      if (!existsSync(path))
        continue
      writeFileSync(join(target, locale, 'modules', `${name}.md`), readme(readFileSync(path, 'utf8'), name, locale))
    }
    console.log(`module: ${name} <- ${join(modulesSource, name)}`)
  }
}
else {
  console.warn(`modules: ${modulesSource} is missing, the module pages come from the framework's docs`)
}

// The framework's declarations: English (docs-types/, the docs' hovers and the
// playground) and Russian (docs-types-ru/, the playground on /ru), when the
// framework wrote them (`bun run types:site -- --lang ru`).
for (const [from, to] of [['types', 'docs-types'], ['types-ru', 'docs-types-ru']] as const) {
  const types = join(source, from)
  const out = resolve(to)
  rmSync(out, { recursive: true, force: true })
  if (!existsSync(types)) {
    mkdirSync(out)
    console.warn(`types: ${types} is missing, the examples show no framework types on hover`)
    continue
  }
  cpSync(types, out, { recursive: true })
  // The AssemblyScript prelude (i32, bool...) is global: every declaration
  // file under amxts/ references it, so an example sees it whatever it imports.
  const framework = join(out, 'amxts')
  for (const file of readdirSync(framework, { recursive: true, encoding: 'utf8' }).filter(file => file.endsWith('.d.ts'))) {
    const path = join(framework, file)
    const up = relative(dirname(path), out).replaceAll('\\', '/') || '.'
    writeFileSync(path, `/// <reference path="${up}/as-types.d.ts" />\n${readFileSync(path, 'utf8')}`)
  }
  console.log(`types: ${types} -> ${to}`)
}
