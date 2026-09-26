<script setup lang="ts">
import type * as Monaco from 'monaco-editor'

// Monaco with the framework's types: the same declarations the docs' hovers
// use (docs-types/, `bun run docs:import`), so `~/facade` completes, hovers
// and shows its errors as in an editor. Monaco and the types load in the
// browser after mounting, only on this page; until then a loader stands in.

const code = defineModel<string>({ required: true })

const { t } = useI18n()
const state = ref<'loading' | 'ready' | 'failed'>('loading')

const colorMode = useColorMode()
const host = useTemplateRef('host')
let editor: Monaco.editor.IStandaloneCodeEditor | undefined

// Every declaration file, as text: amxts/** answers `~/*` and @amxts/core,
// packages/<name>/ an official module's @amxts/<name>, as-types.d.ts is the
// AssemblyScript prelude they reference.
const declarations = {
  en: import.meta.glob(['../../../docs-types/as-types.d.ts', '../../../docs-types/amxts/**/*.d.ts', '../../../docs-types/packages/**/*.d.ts', '../../../docs-types/root/**/*.d.ts'], { query: '?raw', import: 'default' }),
  // the same declarations with Russian descriptions, for /ru/playground
  ru: import.meta.glob(['../../../docs-types-ru/as-types.d.ts', '../../../docs-types-ru/amxts/**/*.d.ts', '../../../docs-types-ru/packages/**/*.d.ts', '../../../docs-types-ru/root/**/*.d.ts'], { query: '?raw', import: 'default' }),
}
const locale = useSiteLocale()

onMounted(async () => {
  try {
    await mount()
    state.value = 'ready'
  }
  catch (error) {
    console.error(error)
    state.value = 'failed'
  }
})

async function mount() {
  const [monaco, { default: EditorWorker }, { default: TsWorker }] = await Promise.all([
    import('monaco-editor'),
    import('monaco-editor/editor/editor.worker?worker'),
    import('monaco-editor/language/typescript/ts.worker?worker'),
  ])

  globalThis.MonacoEnvironment = {
    getWorker: (_, label) => label === 'typescript' || label === 'javascript' ? new TsWorker() : new EditorWorker(),
  }

  const ts = monaco.typescript
  ts.typescriptDefaults.setCompilerOptions({
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    lib: ['esnext'],
    strict: true,
    noEmit: true,
    allowNonTsExtensions: true,
    baseUrl: 'file:///',
    paths: {
      '~/*': ['types/amxts/*'],
      '@amxts/core': ['types/amxts/facade.d.ts'],
      '@amxts/core/test-utils': ['types/root/src/testing/index.d.ts'],
      '@amxts/core/*': ['types/amxts/*'],
      '@amxts/*': ['types/packages/*/index.d.ts'],
    },
  })

  for (const [path, load] of Object.entries(declarations[locale.value])) {
    const name = path.replace(/^.*docs-types(?:-ru)?\//, '')
    ts.typescriptDefaults.addExtraLib(await load() as string, `file:///types/${name}`)
  }

  const model = monaco.editor.createModel(code.value, 'typescript', monaco.Uri.parse('file:///plugin.ts'))
  editor = monaco.editor.create(host.value!, {
    model,
    theme: colorMode.value === 'dark' ? 'vs-dark' : 'vs',
    automaticLayout: true,
    fontSize: 13,
    minimap: { enabled: false },
    // only TypeScript's completions: `event.` lists the event's fields, not every word in the file
    wordBasedSuggestions: 'off',
    scrollBeyondLastLine: false,
    tabSize: 4,
  })

  model.onDidChangeContent(() => {
    code.value = model.getValue()
  })

  watch(code, (value) => {
    if (value !== model.getValue())
      model.setValue(value)
  })

  watch(() => colorMode.value, mode => monaco.editor.setTheme(mode === 'dark' ? 'vs-dark' : 'vs'))
}

onBeforeUnmount(() => {
  editor?.getModel()?.dispose()
  editor?.dispose()
})
</script>

<template>
  <div class="relative size-full">
    <div ref="host" class="size-full" />

    <div
      v-if="state !== 'ready'"
      class="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-default text-base text-muted"
      role="status"
    >
      <template v-if="state === 'loading'">
        <UIcon name="i-lucide-loader-circle" class="size-12 animate-spin text-primary" />

        <p>{{ t('playground.loading') }}</p>
      </template>

      <template v-else>
        <UIcon name="i-lucide-circle-alert" class="size-12 text-error" />

        <p>{{ t('playground.failed') }}</p>
      </template>
    </div>
  </div>
</template>
