// The framework's declarations for the docs' hovers, from a checkout of it
// (AMXTS_CORE_PATH, or ../amxts), where `bun run types:site` and
// `bun run types:site -- --lang ru` wrote them:
//
//   bun run docs:types
//
// dist-docs-types/en -> docs-types/ (the docs' hovers and the playground)
// dist-docs-types/ru -> docs-types-ru/ (the same on /ru)
//
// They are kept in this repository: the framework builds them with its whole
// toolchain, which the site's build does not have. After the copy every
// TypeScript example of the docs and of the official modules' READMEs is
// checked against them: a hover that would say `any` fails this script.
import type { Locale } from '../modules/amxts-docs/markdown'
import { cpSync, existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import process from 'node:process'
import * as ts from 'typescript'
import { docsPage, modulePage, splitFences } from '../modules/amxts-docs/markdown'
import { corePath, modulesPath } from '../modules/amxts-docs/sources'

if (!corePath)
  throw new Error('No checkout of the framework: set AMXTS_CORE_PATH, or put it at ../amxts')

const locales: { code: Locale, types: string }[] = [{ code: 'en', types: 'docs-types' }, { code: 'ru', types: 'docs-types-ru' }]

for (const { code, types } of locales) {
  const from = join(corePath, 'dist-docs-types', code)
  if (!existsSync(from))
    throw new Error(`${from} is missing: run \`bun run types:site${code === 'en' ? '' : ` -- --lang ${code}`}\` in the framework`)
  const out = resolve(types)
  rmSync(out, { recursive: true, force: true })
  cpSync(from, out, { recursive: true })
  // The AssemblyScript prelude (i32, bool...) is global: every declaration
  // file under amxts/ references it, so an example sees it whatever it imports.
  const framework = join(out, 'amxts')
  for (const file of readdirSync(framework, { recursive: true, encoding: 'utf8' }).filter(file => file.endsWith('.d.ts'))) {
    const path = join(framework, file)
    const up = relative(dirname(path), out).replaceAll('\\', '/') || '.'
    writeFileSync(path, `/// <reference path="${up}/as-types.d.ts" />\n${readFileSync(path, 'utf8')}`)
  }
  console.log(`types: ${from} -> ${types}`)
}

/** Every Markdown file under `dir`, relative to it, with forward slashes. */
function markdown(dir: string) {
  return readdirSync(dir, { recursive: true, encoding: 'utf8' })
    .filter(file => file.endsWith('.md'))
    .map(file => file.replaceAll('\\', '/'))
}

function read(path: string) {
  return readFileSync(path, 'utf8').replace(/\r\n/g, '\n')
}

// The pages as the site shows them (markdown.ts): the framework's docs, and
// the READMEs of the official modules checked out in modulesPath.
const corePages = locales.flatMap(({ code }) => [`docs/${code}`, `docs/modules/${code}`]
  .flatMap(dir => markdown(join(corePath, dir)).map(file => `${dir}/${file}`))
  .map(path => ({ from: path, locale: code, text: docsPage(read(join(corePath, path)), path, code) })))

const readmes = locales.flatMap(({ code }) => (modulesPath ? readdirSync(modulesPath) : []).flatMap((name) => {
  const file = code === 'en' ? 'README.md' : `README.${code}.md`
  const path = modulesPath && join(modulesPath, name, file)
  return path && existsSync(path) ? [{ from: `${name}/${file}`, locale: code, text: modulePage(read(path), name, `amxts/${name}`, code) }] : []
}))

/** Every TypeScript example: the code Twoslash checks, the hidden prelude included. */
const snippets = [...corePages, ...readmes].flatMap(page => splitFences(page.text)
  .filter((part, i) => i % 2 === 1 && part.startsWith('```ts twoslash'))
  .map(part => ({ from: page.from, locale: page.locale, code: part.split('\n').slice(1, -1).join('\n') })))

/**
 * An example's files: Twoslash's `// @filename: x.ts` lines split one block
 * into several (a module and what imports it), each in the example's folder.
 */
function filesOf(snippet: { from: string, code: string }, index: number) {
  const parts: { name: string, lines: string[] }[] = [{ name: 'example.ts', lines: [] }]
  for (const line of snippet.code.split('\n')) {
    const file = line.match(/^\/\/ @filename: (\S+)/)?.[1]
    if (file)
      parts.push({ name: file, lines: [] })
    else
      parts.at(-1)!.lines.push(line)
  }
  return parts
    .filter(part => part.lines.some(line => line.trim()))
    .map(part => [`/snippets/${index}/${part.name}`, { from: snippet.from, name: part.name, code: part.lines.join('\n') }] as const)
}

/** The diagnostics that mean `any` on hover: an untyped parameter, a module not found - the test runner's own aside (the site does not carry vitest's or bun's types). */
function untyped(diagnostics: readonly ts.Diagnostic[]) {
  return diagnostics
    .filter(diagnostic => [7006, 7031, 2307].includes(diagnostic.code))
    .map(diagnostic => ({ start: diagnostic.start ?? 0, text: ts.flattenDiagnosticMessageText(diagnostic.messageText, ' ') }))
    .filter(({ text }) => !/'(?:vitest|bun:test)'/.test(text))
}

/**
 * A hover that says `any` is a broken hover: an example has a parameter
 * TypeScript cannot type (7006, 7031) or a module it cannot find (2307),
 * under the site's own compiler setup - one program per language.
 */
function checkSnippets() {
  return locales.flatMap(({ code, types }) => {
    const root = resolve(types).replaceAll('\\', '/')
    const files = new Map(snippets.filter(snippet => snippet.locale === code).flatMap((snippet, i) => filesOf(snippet, i)))
    const options: ts.CompilerOptions = {
      lib: ['lib.esnext.d.ts'],
      strict: true,
      noEmit: true,
      types: [],
      paths: { '~/*': [`${root}/amxts/*`], '@amxts/core': [`${root}/amxts/facade.d.ts`], '@amxts/core/test-utils': [`${root}/root/src/testing/index.d.ts`], '@amxts/core/*': [`${root}/amxts/*`], '@amxts/*': [`${root}/packages/*/index.d.ts`] },
    }
    const host: ts.LanguageServiceHost = {
      getScriptFileNames: () => [...files.keys(), `${root}/as-types.d.ts`],
      getScriptVersion: () => '1',
      getScriptSnapshot: file => ts.ScriptSnapshot.fromString(files.get(file)?.code ?? ts.sys.readFile(file) ?? ''),
      getCurrentDirectory: () => '/',
      getCompilationSettings: () => options,
      getDefaultLibFileName: settings => ts.getDefaultLibFilePath(settings),
      fileExists: file => files.has(file) || ts.sys.fileExists(file),
      readFile: file => files.get(file)?.code ?? ts.sys.readFile(file),
    }
    const service = ts.createLanguageService(host)
    return [...files].flatMap(([file, snippet]) => untyped(service.getSemanticDiagnostics(file))
      .map(({ start, text }) => `${snippet.from} (${code}), ${snippet.name} line ${snippet.code.slice(0, start).split('\n').length}: ${text}`))
  })
}

const problems = checkSnippets()
if (problems.length) {
  console.error(`${problems.length} example(s) would show \`any\` on hover:\n${problems.map(problem => `  ${problem}`).join('\n')}`)
  process.exitCode = 1
}
else {
  console.log(`examples: ${snippets.length} typed`)
}
