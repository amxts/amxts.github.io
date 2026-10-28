<script setup lang="ts">
import { useElementBounding } from '@vueuse/core'
import { permsVersion } from '#shared/perms'
import { officialScope, permsStore } from '#shared/site'

// the editor fills the screen below the header, as the playground does; one key
// for both languages keeps the page, and the session it read, across a switch;
// the fragment is a session's id, not an element to scroll to
definePageMeta({ footer: false, key: 'perms-editor', scrollToTop: to => !to.hash })

const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const editor = usePermsEditor()
provide(permsEditorKey, editor)

const demo = computed(() => route.query.mock !== undefined)
const store = computed(() => typeof route.query.store === 'string' && route.query.store ? route.query.store : permsStore)

/** The session's id is the link's fragment (`/modules/perms/editor#k3x9q2mw7a`), which never reaches a server; ?mock opens the demo. */
function openFromHash() {
  const id = decodeURIComponent(route.hash.slice(1)) || (demo.value ? 'demo' : '')
  if (id)
    editor.open(id)
  else
    editor.load.value = 'empty'
}

// Read the fragment once Nuxt is ready, not on mount: GitHub Pages sends
// /editor to /editor/, and while the prerendered page hydrates Nuxt shows the
// address without the slash and without the fragment, giving it back after
const ready = ref(false)
onNuxtReady(() => {
  ready.value = true
  openFromHash()
})

// a fragment changed by hand opens that session
watch(() => route.hash, (hash) => {
  if (ready.value && decodeURIComponent(hash.slice(1)) !== editor.id.value)
    openFromHash()
})

const command = 'perms editor'

// the editor's bar sticks under the site's header, and the grid's group names under both
const bar = useTemplateRef<HTMLElement>('bar')
const { height: barHeight } = useElementBounding(bar)

useSeoMeta({
  title: () => t('perms.title'),
  description: () => t('perms.description'),
})
</script>

<template>
  <div class="flex min-h-[calc(100dvh-var(--ui-header-height)-4rem)] flex-col lg:min-h-[calc(100dvh-var(--ui-header-height))]" :style="{ '--perms-top': `calc(var(--ui-header-height) + ${barHeight}px)` }">
    <h1 class="sr-only">
      {{ t('perms.title') }}
    </h1>

    <ClientOnly>
      <template v-if="editor.load.value === 'ready'">
        <div ref="bar" class="sticky top-(--ui-header-height) z-40 bg-default/85 backdrop-blur-md">
          <PermsBar :demo="demo" />
        </div>

        <UContainer class="w-full flex-1 pt-4 pb-8">
          <KeepAlive>
            <PermsGrid v-if="editor.tab.value === 'permissions'" />

            <PermsGroups v-else-if="editor.tab.value === 'groups'" />

            <PermsPlayers v-else />
          </KeepAlive>
        </UContainer>

        <PermsReview />
      </template>

      <div v-else class="grid flex-1 place-items-center px-4">
        <div v-if="editor.load.value === 'loading'" class="flex items-center gap-2 text-muted">
          <UIcon name="i-lucide-loader-circle" class="size-4 animate-spin" />

          {{ t('perms.loading') }}
        </div>

        <UEmpty
          v-else-if="editor.load.value === 'empty'"
          icon="i-lucide-shield-check"
          :title="t('perms.empty.title')"
          :actions="[{ label: t('perms.empty.demo'), icon: 'i-lucide-play', color: 'neutral', variant: 'subtle', to: { path: localePath('/modules/perms/editor'), query: { mock: null } } }]"
          variant="naked"
          class="max-w-md"
        >
          <template #description>
            <i18n-t keypath="perms.empty.text" tag="p" scope="global">
              <template #command>
                <code class="rounded bg-elevated px-1.5 py-0.5 font-mono text-sm text-highlighted">{{ command }}</code>
              </template>
            </i18n-t>
          </template>
        </UEmpty>

        <UEmpty
          v-else-if="editor.load.value === 'notFound'"
          icon="i-lucide-hourglass"
          :title="t('perms.notFound.title')"
          variant="naked"
          class="max-w-md"
        >
          <template #description>
            <i18n-t keypath="perms.notFound.text" tag="p" scope="global">
              <template #command>
                <code class="rounded bg-elevated px-1.5 py-0.5 font-mono text-sm text-highlighted">{{ command }}</code>
              </template>
            </i18n-t>
          </template>
        </UEmpty>

        <UEmpty
          v-else-if="editor.load.value === 'version'"
          icon="i-lucide-refresh-cw"
          :title="t('perms.version.title')"
          :description="t('perms.version.text', { version: editor.loadError.value, known: permsVersion, package: `${officialScope}/perms` })"
          variant="naked"
          class="max-w-md"
        />

        <UEmpty
          v-else
          icon="i-lucide-wifi-off"
          :title="t('perms.error.title')"
          :description="t('perms.error.text', { store, message: editor.loadError.value })"
          :actions="[{ label: t('perms.error.retry'), icon: 'i-lucide-rotate-cw', color: 'neutral', variant: 'subtle', onClick: openFromHash }]"
          variant="naked"
          class="max-w-md"
        />
      </div>

      <template #fallback>
        <div class="grid flex-1 place-items-center px-4">
          <div class="flex items-center gap-2 text-muted">
            <UIcon name="i-lucide-loader-circle" class="size-4 animate-spin" />

            {{ t('perms.loading') }}
          </div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
