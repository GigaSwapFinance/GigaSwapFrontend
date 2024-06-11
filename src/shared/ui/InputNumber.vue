<template>
  <input
    :value="modelValue"
    @keydown="onKeydown"
    @input="onInput"
    @blur="onBlur"
    @focus="onFocus"
    :disabled="isDisabled"
    class="input-number"
  >
</template>

<script setup>
import { getCurrentInstance } from 'vue'
import { isDecimalsCorrect } from '@/shared/lib/utils/number'
import { insertByIndex } from '@/shared/lib/utils/string'
const instance = getCurrentInstance()

const ALLOWED_SYMBOLS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight']

const props = defineProps({
  modelValue: {
    type: [String, null],
  },

  decimals: {
    type: Number,
    default: 9,
  },

  isDisabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'error:decimals', 'event:blur', 'event:focus'])

function onKeydown(event) {
  const pressedKey = event.key
  const prevInputValue = String(event.target.value)
  const selectorIndex = event.target.selectionStart
  const currentInputValue = insertByIndex(prevInputValue, selectorIndex, pressedKey)

  if (
      !ALLOWED_SYMBOLS.includes(pressedKey)
      || pressedKey === '.' && !props.decimals
      || pressedKey === '.' && prevInputValue.includes('.')
      || pressedKey === '.' && !prevInputValue
      || pressedKey === '0' && prevInputValue === '0'
  ) {
    return event.preventDefault()
  }

  if (
      currentInputValue.includes('.')
      && !Number.isNaN(Number(pressedKey))
      && !isDecimalsCorrect(currentInputValue, props.decimals)
  ) {
    event.preventDefault()
    emit('update:modelValue', prevInputValue)
    emit('error:decimals', props.decimals)
    return instance?.proxy?.$forceUpdate()
  }
}

function onInput(event) {
  const currentInputValue = event.target.value
  const valueToEmit = currentInputValue ? String(currentInputValue) : null

  emit('update:modelValue', valueToEmit)
}

function onBlur(event) {
  const currentInputValue = event.target.value

  if (
      currentInputValue.startsWith('.')
      || currentInputValue.endsWith('.')
  ) {
    const correctValue = currentInputValue.replace('.', '')
    emit('update:modelValue', correctValue)
  }

  if (
      currentInputValue.startsWith('0')
      && !currentInputValue.includes('.')
  ) {
    const correctValue = currentInputValue.substr(1, currentInputValue.length - 1)
    emit('update:modelValue', correctValue)
  }

  emit('event:blur')
}

function onFocus() {
  emit('event:focus')
}
</script>