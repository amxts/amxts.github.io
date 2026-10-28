<script setup lang="ts">
import type { CalendarDate } from '@internationalized/date'
import { getLocalTimeZone, now, parseAbsoluteToLocal, Time, toCalendarDate, toCalendarDateTime, toZoned } from '@internationalized/date'

// When a grant or a membership ends: an ISO time, or null for never; picked
// in the reader's local time.
const until = defineModel<string | null>({ required: true })

const { t } = useI18n()
const { formatDate } = usePermsEditorContext()

const open = ref(false)

const local = computed(() => toCalendarDateTime(until.value ? parseAbsoluteToLocal(until.value) : now(getLocalTimeZone())))

function store(date: ReturnType<typeof toCalendarDateTime>) {
  until.value = toZoned(date, getLocalTimeZone()).toAbsoluteString().replace(/\.\d+Z$/, 'Z')
}

// the calendar picks the day and keeps the time; a permanent entry gets the time of now
const day = computed({
  get: () => until.value ? toCalendarDate(local.value) : undefined,
  set: (date: CalendarDate | undefined) => {
    if (date)
      store(local.value.set({ year: date.year, month: date.month, day: date.day }))
  },
})

const time = computed({
  get: () => new Time(local.value.hour, local.value.minute),
  set: (value: Time | undefined) => {
    if (value && until.value)
      store(local.value.set({ hour: value.hour, minute: value.minute }))
  },
})

const expired = computed(() => until.value !== null && Date.parse(until.value) <= Date.now())

function forever() {
  until.value = null
  open.value = false
}
</script>

<template>
  <UPopover v-model:open="open" modal>
    <UButton
      :label="until ? formatDate(until) : undefined"
      :icon="until ? 'i-lucide-calendar-clock' : 'i-lucide-infinity'"
      :color="expired ? 'error' : 'neutral'"
      :variant="until ? 'outline' : 'ghost'"
      size="xs"
      :aria-label="until ? t('perms.grants.until') : t('perms.grants.forever')"
      :title="until ? undefined : t('perms.grants.forever')"
      :class="{ 'text-dimmed': !until }"
    />

    <template #content>
      <div class="flex flex-col gap-2 p-2">
        <UCalendar v-model="day" size="sm" />

        <div class="flex items-center gap-2 border-t border-default pt-2">
          <UInputTime v-model="time" :disabled="!until" size="sm" :aria-label="t('perms.grants.until')" class="flex-1" />

          <UButton
            :label="t('perms.grants.forever')"
            icon="i-lucide-infinity"
            color="neutral"
            :variant="until ? 'ghost' : 'soft'"
            size="sm"
            @click="forever"
          />
        </div>
      </div>
    </template>
  </UPopover>
</template>
