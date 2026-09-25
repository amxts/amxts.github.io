<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { useClipboard } from '@vueuse/core'
import { withoutTrailingSlash } from 'ufo'

const route = useRoute()
const toast = useToast()
const { t } = useI18n()
const { copy, copied } = useClipboard()
const site = useSiteConfig()

const routePath = computed(() => withoutTrailingSlash(route.path))
const mdPath = computed(() => `${site.url}/raw${routePath.value}.md`)
const prompt = computed(() => encodeURIComponent(t('page.prompt', { url: mdPath.value })))

const items = computed<DropdownMenuItem[]>(() => [
  {
    label: t('page.copyLink'),
    icon: 'i-lucide-link',
    onSelect() {
      copy(mdPath.value)
      toast.add({
        title: t('page.copied'),
        icon: 'i-lucide-check-circle',
      })
    },
  },
  {
    label: t('page.viewMarkdown'),
    icon: 'i-simple-icons:markdown',
    target: '_blank',
    to: `/raw${routePath.value}.md`,
  },
  {
    label: t('page.openIn', { app: 'ChatGPT' }),
    icon: 'i-simple-icons:openai',
    target: '_blank',
    to: `https://chatgpt.com/?hints=search&q=${prompt.value}`,
  },
  {
    label: t('page.openIn', { app: 'Claude' }),
    icon: 'i-simple-icons:anthropic',
    target: '_blank',
    to: `https://claude.ai/new?q=${prompt.value}`,
  },
])

async function copyPage() {
  copy(await $fetch<string>(`/raw${routePath.value}.md`))
}
</script>

<template>
  <UFieldGroup>
    <UButton
      :label="t('page.copy')"
      :icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'"
      color="neutral"
      variant="outline"
      :ui="{
        leadingIcon: [copied && 'text-primary', 'size-3.5'],
      }"
      @click="copyPage"
    />

    <UDropdownMenu
      :items="items"
      :content="{
        align: 'end',
        side: 'bottom',
        sideOffset: 8,
      }"
      :ui="{
        content: 'w-52',
      }"
    >
      <UButton
        icon="i-lucide-chevron-down"
        size="sm"
        color="neutral"
        variant="outline"
        :aria-label="t('page.more')"
      />
    </UDropdownMenu>
  </UFieldGroup>
</template>
