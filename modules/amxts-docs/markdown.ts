// What the site changes in the framework's Markdown as Nuxt Content reads it
// (index.ts calls these from the `content:file:beforeParse` hook). The pages
// are written to be read anywhere - on GitHub too - so they keep plain
// Markdown; the site adds what only it has:
// - a link to another page (`../2.core/01.plugin.md#commands`) becomes the
//   page's address (`/docs/core/plugin#commands`, `/ru/docs/...`), a link to
//   a module's page (`../../modules/en/http.md`) its catalog page
//   (`/modules/http`), and a site link (`/modules`) gets the page's language;
// - a container (`::: warning Title` ... `:::`) becomes a Nuxt UI callout
//   (`::warning`), its title a bold first line (a `<br>`: the callout unwraps
//   paragraphs, so a blank line would not break it); `::: code-group` becomes
//   `::code-group`;
// - the space (or line break) before a dash becomes a non-breaking one, so a
//   wrapped line never starts with a dash;
// - a shell block of package manager commands becomes tabs, one per package
//   manager;
// - a TypeScript example gets `twoslash`, so the site shows its types on
//   hover (from docs-types/, `bun run docs:types`);
// - a module's README (its repository) becomes its catalog page:
//   the header block gives the title and description, links into the
//   repository open on GitHub, alerts become callouts.
import { existsSync } from 'node:fs'
import { posix } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as ts from 'typescript'

export type Locale = 'en' | 'ru'

/** A locale's part of an address: '' for English, '/ru' for Russian. */
export const localePrefix = (locale: Locale) => locale === 'en' ? '' : `/${locale}`

/**
 * The site's address of a page of the framework's docs/, by its path there:
 * `docs/en/2.core/01.plugin.md` is `/docs/core/plugin`,
 * `docs/modules/ru/http.md` is `/ru/modules/http`; null for anything else.
 */
export function sitePath(file: string) {
  const module = file.match(/^docs\/modules\/(en|ru)\/([\w-]+)\.md$/)
  if (module)
    return `${localePrefix(module[1] as Locale)}/modules/${module[2]}`
  const page = file.match(/^docs\/(en|ru)\/(.+)\.md$/)
  if (!page)
    return null
  const path = page[2]!.split('/').map(part => part.replace(/^\d+\./, '')).filter(part => part !== 'index').join('/')
  return `${localePrefix(page[1] as Locale)}/docs${path ? `/${path}` : ''}`
}

/**
 * The text as prose and code blocks in turn: prose at even places, a fenced
 * block (its fences included) at odd ones. Code blocks stay exactly as they
 * are; only the prose between them is rewritten.
 */
export function splitFences(text: string) {
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

/** The front matter (with its `---` lines) and the text after it. */
function frontMatter(markdown: string) {
  const front = markdown.match(/^---\n[\s\S]*?\n---\n/)?.[0] ?? ''
  return { front, body: markdown.slice(front.length) }
}

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

/**
 * `::: code-group` ... `:::` around code blocks becomes Nuxt UI's
 * `::code-group` ... `::`, its tabs synced site-wide like the package-manager
 * ones. The closing line is the first bare `:::` outside a code block.
 */
function codeGroups(text: string) {
  const lines = text.split('\n')
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
  return lines.join('\n')
}

/**
 * A link to another page of docs/, relative to `from` (the page's own path
 * there), becomes the site's address of it; a site link (`/modules`) gets the
 * page's language.
 */
function links(prose: string, from: string, locale: Locale) {
  return prose
    .replace(/\]\((?![a-z]+:|#|\/)([^)\s#]+\.md)(#[^)\s]*)?\)/g, (match, target: string, hash = '') => {
      const path = sitePath(posix.join(posix.dirname(from), target))
      return path ? `](${path}${hash})` : match
    })
    .replace(/\]\(\/(?!docs\/|ru\/)/g, `](${localePrefix(locale)}/`)
}

// Each package manager's words. `dlx` runs a command from the registry,
// outside a project (`amxts init`); `bun test` is bun's own runner, so the
// project's `test` script is `bun run test`.
const managers = [
  { name: 'npm', run: 'npm run', add: 'npm i', install: 'npm install', test: 'npm test', exec: 'npx', dlx: 'npx', create: 'npm create' },
  { name: 'pnpm', run: 'pnpm run', add: 'pnpm add', install: 'pnpm install', test: 'pnpm test', exec: 'pnpm', dlx: 'pnpm dlx', create: 'pnpm create' },
  { name: 'yarn', run: 'yarn run', add: 'yarn add', install: 'yarn install', test: 'yarn test', exec: 'yarn', dlx: 'yarn dlx', create: 'yarn create' },
  { name: 'bun', run: 'bun run', add: 'bun add', install: 'bun install', test: 'bun run test', exec: 'bunx', dlx: 'bunx', create: 'bun create' },
]

type Manager = typeof managers[number]

// A command as the docs write it (npm's words, or bun's) and what it is.
const commands: [RegExp, (manager: Manager, rest: string) => string][] = [
  [/^(?:bun|npm) run(?= |$)/, (manager, rest) => manager.name === 'yarn' ? `${manager.run}${rest.replace(' -- ', ' ')}` : `${manager.run}${rest}`],
  [/^(?:bun add|npm install|npm i)(?= \S)/, (manager, rest) => `${manager.add}${rest}`],
  [/^npm install$/, manager => manager.install],
  [/^npm test$/, manager => manager.test],
  [/^npx(?= \S+ init\b)/, (manager, rest) => `${manager.dlx}${rest}`],
  [/^npx(?= )/, (manager, rest) => `${manager.exec}${rest}`],
  // `npm create amxts@latest`: the others take the latest starter anyway
  [/^npm create(?= )/, (manager, rest) => `${manager.create}${rest.replace(/@latest\b/, '')}`],
]

function translate(line: string, manager: Manager) {
  for (const [pattern, write] of commands) {
    const match = line.match(pattern)
    if (match)
      return write(manager, line.slice(match[0].length))
  }
  return line
}

/**
 * A shell block of package manager commands (`npx amxts ...`, `npm test`,
 * `bun add ...`; `cd` between them) becomes tabs, one per package manager,
 * synced across the site like nuxt.com's: the framework does not tie a
 * project to one. Trailing `# comments` stay lined up.
 */
function packageManagers(block: string) {
  const lines = block.split('\n')
  const body = lines.slice(1, -1).map((line) => {
    const [, command = line, comment] = line.match(/^(.*?\S)(\s+#.*)?$/) ?? []
    return { command, comment: comment?.trim() }
  })
  const known = (command: string) => commands.some(([pattern]) => pattern.test(command))
  if (!/^```(?:sh|bash)\s*$/.test(lines[0]!) || !body.some(line => known(line.command)) || !body.every(line => known(line.command) || line.command.startsWith('cd ')))
    return block

  const tabs = managers.map((manager) => {
    const translated = body.map(line => ({ ...line, command: translate(line.command, manager) }))
    const width = Math.max(...translated.filter(line => line.comment).map(line => line.command.length))
    return [
      `\`\`\`sh [${manager.name}]`,
      ...translated.map(line => line.comment ? `${line.command.padEnd(width)}   ${line.comment}` : line.command),
      '```',
    ].join('\n')
  })
  return `::code-group{sync="pm"}\n${tabs.join('\n\n')}\n::`
}

let facade: string[] | undefined

/**
 * What `~/facade` exports, read with the TypeScript compiler from the
 * framework's declarations (docs-types/): an example that uses `Player` or
 * `server` without importing them gets a hidden import of all of them (above
 * `// ---cut---`, which Twoslash does not show), so their types still show on
 * hover. Read once.
 */
function facadeExports() {
  if (facade)
    return facade
  const file = fileURLToPath(new URL('../../docs-types/amxts/facade.d.ts', import.meta.url))
  if (!existsSync(file))
    return facade = []
  const program = ts.createProgram([file], { noEmit: true, types: [] })
  const checker = program.getTypeChecker()
  const module = checker.getSymbolAtLocation(program.getSourceFile(file)!)
  return facade = module ? checker.getExportsOfModule(module).map(symbol => symbol.name).filter(name => !name.startsWith('__')) : []
}

/** A TypeScript example with hovers: a Russian page's blocks read the Russian declarations (`locale-ru`). */
function twoslash(block: string, locale: Locale) {
  if (!/^```ts\s/.test(block))
    return block
  const [fence, ...rest] = block.split('\n')
  const code = rest.join('\n')
  const names = facadeExports()
  // what the example declares itself stays its own: `const text` is not the facade's text
  const declared = new Set([...code.matchAll(/\b(?:const|let|var|function|class|interface|type|enum)\s+(\w+)/g)].map(match => match[1]))
  const hidden = names.length && !/from "(?:~\/facade|@amxts\/core)"/.test(block)
    ? [`import { ${names.filter(name => !declared.has(name)).join(', ')} } from "~/facade";`]
    : []
  // An example that talks about `player` without declaring it gets one, so
  // what it reads from the player has its types too.
  if (/\bplayer\b/.test(code) && !/(?:\b(?:const|let|var)\s+|[(,]\s*)player\b/.test(code))
    hidden.push('declare const player: import("~/facade").Player;')
  const prelude = hidden.length ? [...hidden, '// ---cut---'] : []
  return [fence!.replace(/^```ts/, locale === 'en' ? '```ts twoslash' : `\`\`\`ts twoslash locale-${locale}`), ...prelude, ...rest].join('\n')
}

const code = (block: string, locale: Locale) => twoslash(packageManagers(block), locale)

/** A page of the framework's docs/, `from` its path there (`docs/en/2.core/01.plugin.md`). */
export function docsPage(markdown: string, from: string, locale: Locale) {
  const { front, body } = frontMatter(markdown)
  const text = splitFences(codeGroups(body)).map((part, i) => i % 2
    ? code(part, locale)
    : containers(links(part, from, locale)).replace(/(\S)[ \n]\u2014/g, '$1\u00A0\u2014')).join('\n')
  return `${front}${text}`
}

const alerts: Record<string, string> = { NOTE: 'note', TIP: 'tip', IMPORTANT: 'note', WARNING: 'warning', CAUTION: 'caution' }

/** A module's README as its catalog page: `name` in the catalog, `repo` its repository on GitHub, `owner/name`. */
export function modulePage(markdown: string, name: string, repo: string, locale: Locale) {
  let text = markdown
  let title = name
  let description = ''
  const header = text.match(/^<div align="center">\n([\s\S]*?)\n<\/div>\n/)
  if (header) {
    title = header[1]!.match(/^# (.+)$/m)?.[1]?.trim() ?? name
    description = header[1]!.match(/^\*([^*\n]+)\*$/m)?.[1]?.trim() ?? ''
    text = text.slice(header[0].length)
  }

  const repository = `https://github.com/${repo}/blob/HEAD/`
  const body = splitFences(text.trim()).map((part, i) => i % 2
    ? code(part, locale)
    : part
        // a link into the repository (PAWN.md, LICENSE, include/...) opens on GitHub
        .replace(/\]\((?!https?:|#|\/)([^)\s]+)\)/g, (_, path: string) => `](${repository}${path})`)
        // > [!WARNING] + quoted lines -> ::warning ... ::
        .replace(/^> \[!(\w+)\]\n((?:>.*(?:\n|$))+)/gm, (match, kind: string, quoted: string) => {
          const callout = alerts[kind.toUpperCase()]
          if (!callout)
            return match
          const lines = quoted.trimEnd().split('\n').map(line => line.replace(/^> ?/, ''))
          return `::${callout}\n${lines.join('\n')}\n::\n`
        })).join('\n')

  const front = ['---', `title: ${JSON.stringify(title)}`]
  if (description)
    front.push(`description: ${JSON.stringify(description)}`)
  front.push('---')
  return `${front.join('\n')}\n\n${body.trim()}\n`
}
