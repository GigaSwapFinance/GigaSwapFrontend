<template>
  <div class="locker">
    <div class="locker__inner">
      <div class="locker__body">
        <SwapperBlock
            title="Token"
            v-model="modelValue.assets"
            can-select-tokens
            can-enter-values
            show-balances
            :available-token-types="['ERC20']"
            class="locker__block"
        />

        <div class="locker__picker">
          <div class="locker__picker-title">Lock until</div>

          <DatePicker
              v-model="modelValue.unlockDate"
              class="locked__picker-input"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SwapperBlock from '@/components/SwapperBlock.vue'
import DatePicker from '@/shared/ui/DatePicker.vue'
import { type PropType, watch } from 'vue'
import type { ILockerValue } from '@/shared/types/locker'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Object as PropType<ILockerValue>,
    required: true,
  },
})
</script>

<style scoped lang="sass">
.locker
  width: 100%

  &__body
    display: flex
    flex-direction: column
    gap: 4px
    padding: 16px 0

  &__block
    width: 100%

  &__line
    margin: 12px 0

  &__picker
    display: flex
    flex-direction: column
    gap: 8px

    &-title
      cursor: default
      color: var(--color-secondary)
</style>