<template>
  <DateCountdown
      :end-date="endDate"
      v-slot="{ days, hours, minutes, seconds }"
  >
    {{ Number(days) ? `${days}d ` : '' }}{{ Number(hours) ? `${hours}h ` : '' }}{{ minutes }}m {{ seconds }}s
  </DateCountdown>
</template>

<script setup>
import { DateCountdown } from 'vue-date-countdown'

defineProps({
  endDate: {
    type: [Date],
    required: true,
  }
})
</script>