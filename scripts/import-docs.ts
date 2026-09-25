// Copies the framework's reference (docs/api in the Xen repository, written
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
// - a "Status:" paragraph becomes a callout: `::tip` when it says the page is
//   verified or done, `::warning` when it is in progress, `::note` otherwise.
// index.md is VitePress' home page; the site's landing (content/*/index.md)
// replaces it.
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import process from 'node:process'
import { docPages, docsPrefix, sidebarTitles } from '../shared/docs'

const source = resolve(process.argv[2] ?? '../ts2pawn/docs/api')
const target = resolve('content')

const known = new Set(docPages)
const locales = [
  { code: 'en' as const, dir: source, status: /^Status\b/ },
  { code: 'ru' as const, dir: join(source, 'ru'), status: /^Статус\b/ },
]

function callout(paragraph: string) {
  const verdict = paragraph.split(/[.;(-]/)[0] ?? ''
  const kind = /verified|works|done|проверено|работает|готово/i.test(verdict)
    ? 'tip'
    : /in progress|в работе|собирается/i.test(paragraph) ? 'warning' : 'note'

  return `::${kind}\n${paragraph}\n::`
}

interface Page {
  markdown: string
  prefix: string
  status: RegExp
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

function convert({ markdown, prefix, status, titles, navigation }: Page) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n')
  const h1 = lines.findIndex(line => line.startsWith('# '))
  const title = h1 >= 0 ? lines[h1]!.slice(2).trim() : navigation
  if (h1 >= 0)
    lines.splice(h1, 1)

  const body = splitFences(lines.join('\n').trim()).map((part, i) => {
    if (i % 2 === 1)
      return part

    const linked = part.replace(
      /\[([^\]]*)\]\((?:\.\/)?([a-z-]+)(?:\.md)?(#[^)]*)?\)/g,
      (match, text: string, page: string, hash = '') => {
        if (!known.has(page))
          return match
        const label = /^[\w-]+\.md(?:#.*)?$/.test(text) ? titles[docPages.indexOf(page)] : text
        return `[${label}](${prefix}/${page}${hash})`
      },
    )

    return linked
      .split(/\n{2,}/)
      .map(paragraph => status.test(paragraph) ? callout(paragraph) : paragraph)
      .join('\n\n')
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

for (const { code, dir, status } of locales) {
  const out = join(target, code, 'docs')
  const { start, pages } = sidebarTitles[code]
  const titles = [start, ...pages]
  rmSync(out, { recursive: true, force: true })
  mkdirSync(out, { recursive: true })

  const files = readdirSync(dir).filter(file => file.endsWith('.md') && file !== 'index.md')
  for (const file of files) {
    const page = file.slice(0, -3)
    const place = docPages.indexOf(page)
    if (place < 0) {
      console.warn(`${code}/${file}: not in the sidebar (shared/docs.ts), skipped`)
      continue
    }

    const markdown = readFileSync(join(dir, file), 'utf8')
    const navigation = titles[place]!
    writeFileSync(
      join(out, `${String(place + 1).padStart(2, '0')}.${file}`),
      convert({ markdown, prefix: docsPrefix(code), status, titles, navigation }),
    )
  }

  for (const page of docPages) {
    if (!files.includes(`${page}.md`))
      console.warn(`${code}: ${page}.md is in the sidebar but missing in ${dir}`)
  }

  console.log(`${code}: ${files.length} pages -> ${out}`)
}
