<script setup lang="ts">
import type { Release } from '~~/server/utils/changelog'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const router = useRouter()

// Every release of every amxts repository, read from GitHub when the site is
// built; the notes stay in English, as GitHub has them.
const { data: releases } = await useFetch<Release[]>('/api/changelog', {
  key: 'changelog',
  default: () => [],
})

/** The repositories that have a release, for the filter. */
const repos = computed(() => [...new Set(releases.value.map(release => release.repo))].sort())

/** The package filter lives in the URL, so a filtered feed can be linked to. */
const selected = computed<string | undefined>({
  get: () => repos.value.find(repo => repo === route.query.package),
  set: repo => router.replace({ query: { ...route.query, package: repo } }),
})

const shown = computed(() => releases.value.filter(release => !selected.value || release.repo === selected.value))

useSeoMeta({
  title: () => t('changelog.title'),
  description: () => t('changelog.description'),
})
</script>

<template>
  <UContainer>
    <UPageHeader :title="t('changelog.title')" :description="t('changelog.description')" />

    <UPageBody :ui="{ base: 'mt-8 pb-16' }">
      <UAlert
        :title="t('changelog.next.title')"
        :description="t('changelog.next.description')"
        icon="i-lucide-flask-conical"
        color="warning"
        variant="subtle"
        class="mb-10"
        :actions="[{ label: t('changelog.next.action'), to: localePath('/docs/next'), color: 'warning', variant: 'outline', trailingIcon: 'i-lucide-arrow-right' }]"
      />

      <div v-if="repos.length > 1" class="mb-10 flex flex-wrap gap-2">
        <UButton
          :label="t('changelog.all')"
          :color="selected ? 'neutral' : 'primary'"
          :variant="selected ? 'outline' : 'subtle'"
          size="sm"
          @click="selected = undefined"
        />

        <UButton
          v-for="repo in repos"
          :key="repo"
          :label="repo"
          :color="selected === repo ? 'primary' : 'neutral'"
          :variant="selected === repo ? 'subtle' : 'outline'"
          size="sm"
          @click="selected = repo"
        />
      </div>

      <UChangelogVersions v-if="shown.length">
        <UChangelogVersion
          v-for="release in shown"
          :key="release.url"
          :title="release.version"
          :badge="{ label: release.repo, color: 'neutral', variant: 'outline' }"
          :date="release.date"
        >
          <template #body>
            <MDC v-if="release.body.trim()" :value="release.body" tag="div" class="text-sm" />
          </template>

          <template #actions>
            <UButton
              :to="release.url"
              target="_blank"
              :label="t('changelog.onGitHub')"
              icon="i-simple-icons-github"
              trailing-icon="i-lucide-arrow-up-right"
              color="neutral"
              variant="link"
              size="sm"
              class="px-0"
            />
          </template>
        </UChangelogVersion>
      </UChangelogVersions>

      <p v-else class="text-muted">
        {{ t('changelog.empty') }}
      </p>
    </UPageBody>
  </UContainer>
</template>
