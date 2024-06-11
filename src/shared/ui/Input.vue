<template>
  <div class="input" :class="{ '--disabled': isDisabled }" @click="onClick">
    <Image v-if="icon" :src="icon" class="input__icon" />

    <InputNumber
      v-if="isNumber"
      ref="field"
      :value="modelValue"
      :placeholder="placeholder"
      :decimals="decimals"
      class="input__field"
      @update:model-value="$emit('update:modelValue', ($event))"
    />

    <input
      v-else
      ref="field"
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      class="input__field"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
    />

    <div
        v-if="maxValue"
        class="input__max"
        @click="onMaxClick"
    >Max</div>

    <div v-if="symbol" class="input__symbol">
      <Image
          v-if="symbolIcon"
          :src="symbolIcon"
          class="input__symbol-icon"
      />

      <div class="input__symbol-title">{{ symbol }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { RefValue } from 'vue/macros'
import InputNumber from '@/shared/ui/InputNumber.vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
  },

  placeholder: {
    type: String,
    default: 'Write something...',
  },

  isDisabled: {
    type: Boolean,
    default: false,
  },

  isNumber: {
    type: Boolean,
    default: false,
  },

  icon: {
    type: String,
  },

  symbol: {
    type: String,
  },

  symbolIcon: {
    type: String,
  },

  maxValue: {
    type: [String, Number],
  },

  decimals: {
    type: Number,
  },
})

const emit = defineEmits(['update:modelValue'])

const field = ref<RefValue<any>>(null)

function onClick() {
  if (!field.value.focus) {
    return
  }

  field.value.focus()
}

function onMaxClick() {
  emit('update:modelValue', props.maxValue)
}
</script>

<style scoped lang="sass">
$placeholderColor: color-mix(in srgb, var(--color-secondary) 40%, transparent)

.input
  padding: 15px 18px
  border-radius: 12px
  background-color: var(--background-input)
  border: 1px solid var(--background-stroke)
  transition: border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease
  display: flex
  align-items: center
  gap: 8px

  &:hover,
  &:has(.input__field:focus)
    box-shadow: var(--shadow-primary)
    border-color: var(--background-primary)

  &:has(.input__field:focus)
    background-color: var(--background-default)

  &.--disabled
    pointer-events: none
    opacity: 0.6

  &__field
    width: 100%

    &::placeholder
      color: $placeholderColor

  &__icon
    height: 16px
    width: 16px
    min-height: 16px
    min-width: 16px
    margin-right: 8px
    color: $placeholderColor

  &__symbol
    display: flex
    align-items: center
    gap: 8px
    user-select: none

    &-icon
      height: 24px
      width: 24px
      border: 1px solid var(--border-light)
      border-radius: 50%

    &-title
      font-weight: 500

  &__max
    font-size: 14px
    color: var(--color-primary)
    font-weight: 500
    cursor: pointer
    transition: opacity 400ms ease

    &:hover
      opacity: 0.6
</style>