<template>
  <span class="number">
    <template v-if="isNegative && !onlyPositive">-</template>
    <template v-if="prefix">{{ prefix }}</template>
    <span v-html="correctedNumber"></span>
    <template v-if="postfix">{{ postfix }}</template>
  </span>
</template>

<script setup>
import { initCorrectNumber } from '@/shared/lib/utils/number'
import { onMounted, ref, watch, useSlots, computed } from 'vue'

const props = defineProps({
  prefix: {
    type: String,
  },

  postfix: {
    type: String,
  },

  onlyPositive: {
    type: Boolean,
    default: false,
  },

  decimals: {
    type: [String, Number],
    default: 6,
  },

  preventLongZero: {
    type: Boolean,
    default: true,
  },
})

const slots = useSlots()

const number = computed(() => slots.default?.()?.[0]?.children || 0)
const correctedNumber = ref(null)
const isNegative = ref(false)

watch(() => number.value, formatNumber)
onMounted(formatNumber)

function formatNumber() {
  if (!number.value && number.value !== 0) {
    return
  }

  if (number.value < 0) {
    isNegative.value = true
  }

  correctedNumber.value = initCorrectNumber(number.value, props.preventLongZero, Number(props.decimals))
}
</script>

<style lang="sass">
.number
  overflow-wrap: anywhere
  display: inline-block

  span
    overflow-wrap: anywhere

  small
    font-size: 50%
    position: relative
    bottom: -0.125rem
</style>