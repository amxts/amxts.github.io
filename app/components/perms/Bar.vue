<script setup lang="ts">
import { useNow } from '@vueuse/core'

defineProps<{ demo: boolean }>()

const { t, locale } = useI18n()
const { edited, changes, expiresAt, tab, reviewing, save } = usePermsEditorContext()
const now = useNow({ interval: 1000 })

const server = computed(() => edited.value!.server)
const left = computed(() => Math.max(0, expiresAt.value - now.value.getTime()))
const expired = computed(() => left.value === 0)
// the session's hour as a ring that empties; the last five minutes are worth a glance
const lifetime = computed(() => Math.max(1, expiresAt.value - Date.parse(edited.value!.createdAt)))
const share = computed(() => Math.min(1, left.value / lifetime.value))
const urgent = computed(() => left.value < 5 * 60_000)
const clock = computed(() => {
  const seconds = Math.ceil(left.value / 1000)
  return urgent.value
    ? `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
    : t('perms.minutes', { n: Math.ceil(seconds / 60) })
})
const endsAt = computed(() => new Date(expiresAt.value).toLocaleTimeString(locale.value, { timeStyle: 'short' }))

const tabs = computed(() => [
  { value: 'permissions', label: t('perms.tabs.permissions'), icon: 'i-lucide-key-round' },
  { value: 'groups', label: t('perms.tabs.groups'), icon: 'i-lucide-layers', badge: { label: String(edited.value!.groups.length), color: 'neutral' as const, variant: 'soft' as const } },
  { value: 'players', label: t('perms.tabs.players'), icon: 'i-lucide-users', badge: { label: String(edited.value!.users.length), color: 'neutral' as const, variant: 'soft' as const } },
])

const busy = computed(() => save.value.state === 'sending' || save.value.state === 'waiting')

/**
 * Name and address on the left; the timer and Save to the right of both lines
 * on a wide screen, and on a phone the timer beside the name and Save beside
 * the address, so nothing runs into the other.
 */
const layout = {
  root: 'grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-0.5 pt-4 sm:grid-cols-[auto_minmax(0,1fr)_auto_auto] sm:gap-x-4',
  tile: 'row-span-2 grid size-10 place-items-center rounded-lg bg-primary/10 text-primary ring ring-primary/25',
  timer: 'col-start-3 row-start-1 justify-self-end sm:row-span-2',
  save: 'col-start-3 row-start-2 justify-self-end sm:col-start-4 sm:row-span-2 sm:row-start-1',
}
</script>

<template>
  <div class="border-b border-default">
    <UContainer :class="layout.root">
      <div :class="layout.tile">
        <UIcon name="i-lucide-server" class="size-5" />
      </div>

      <p class="col-start-2 row-start-1 flex min-w-0 items-center gap-2 font-semibold text-highlighted">
        <span class="truncate">{{ server.name }}</span>

        <UBadge v-if="demo" :label="t('perms.demoBadge')" color="primary" variant="subtle" size="sm" />
      </p>

      <p class="col-start-2 row-start-2 flex min-w-0 items-center gap-x-3 overflow-hidden text-xs whitespace-nowrap text-muted sm:text-sm">
        <span class="truncate font-mono sm:text-[13px]">{{ server.address }}</span>

        <span class="inline-flex items-center gap-1">
          <UIcon :name="server.storage === 'mysql' ? 'i-lucide-database' : 'i-lucide-file-text'" class="size-3.5" />

          {{ t(`perms.storage.${server.storage}`) }}
        </span>
      </p>

      <div :class="layout.timer">
        <p
          v-if="expired"
          class="flex items-center gap-1.5 text-sm font-medium text-error"
        >
          <UIcon name="i-lucide-timer-off" class="size-4" />

          {{ t('perms.expired') }}
        </p>

        <UTooltip v-else :text="t('perms.ends', { time: endsAt })">
          <p class="flex items-center gap-2 text-sm whitespace-nowrap tabular-nums" :class="urgent ? 'font-medium text-warning' : 'text-muted'">
            <svg viewBox="0 0 20 20" class="size-4.5 -rotate-90" aria-hidden="true">
              <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="2.5" class="opacity-20" />

              <circle
                cx="10"
                cy="10"
                r="8"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                pathLength="100"
                :stroke-dasharray="`${share * 100} 100`"
                class="transition-[stroke-dasharray] duration-1000 ease-linear"
              />
            </svg>

            {{ clock }}
          </p>
        </UTooltip>
      </div>

      <div :class="layout.save">
        <UButton
          v-if="changes.length || busy"
          :label="t('perms.save')"
          :aria-label="t('perms.save')"
          :icon="busy ? 'i-lucide-loader-circle' : 'i-lucide-upload'"
          :disabled="expired"
          :ui="{ leadingIcon: busy ? 'animate-spin' : '', label: 'max-sm:sr-only' }"
          class="max-sm:px-2 max-sm:py-1"
          @click="reviewing = true"
        >
          <template v-if="changes.length" #trailing>
            <span class="min-w-5 rounded-full bg-inverted/15 px-1.5 text-xs/5 font-semibold tabular-nums">{{ changes.length }}</span>
          </template>
        </UButton>

        <p v-else class="flex items-center gap-1.5 text-sm text-muted">
          <UIcon name="i-lucide-check" class="size-4 text-success" />

          <span class="max-sm:sr-only">{{ t('perms.saved') }}</span>
        </p>
      </div>

      <UTabs
        v-model="tab"
        :items="tabs"
        :content="false"
        variant="link"
        class="col-span-full mt-2 -mb-px w-full"
        :ui="{ list: 'border-0 overflow-x-auto overflow-y-hidden', trigger: 'pb-3', leadingIcon: 'max-sm:hidden' }"
      />
    </UContainer>

    <UAlert
      v-if="expired"
      color="error"
      variant="subtle"
      icon="i-lucide-timer-off"
      :ui="{ root: 'rounded-none border-t border-error/20' }"
    >
      <template #description>
        <i18n-t keypath="perms.expiredText" tag="span" scope="global">
          <template #command>
            <code class="font-mono">perms editor</code>
          </template>
        </i18n-t>
      </template>
    </UAlert>
  </div>
</template>
