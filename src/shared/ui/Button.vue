<template>
  <button class="button" :class="buttonClasses">
    <Image v-if="props.icon" :src="props.icon" class="button__icon"></Image>

    <span class="button__text">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">

import { computed } from 'vue'

const props = defineProps({
  isSecondary: {
    type: Boolean,
    default: false
  },

  isSquare: {
    type: Boolean,
    default: false,
  },

  isDisabled: {
    type: Boolean,
    default: false,
  },

  icon: {
    type: String,
  },
})

const buttonClasses = computed(() => {
  return {
    '--primary': props.isPrimary,
    '--secondary': props.isSecondary,
    '--square': props.isSquare,
    '--disabled': props.isDisabled,
  }
})
</script>

<style scoped lang="sass">
.button
  cursor: pointer
  padding: 0 12px
  font-size: 16px
  white-space: nowrap
  font-weight: 500
  height: 36px
  border-radius: 8px
  border: 1px solid transparent
  transition: background-color 0.3s ease, opacity 0.3s ease
  background-color: var(--background-primary)
  color: rgb(0, 0, 0)

  &:hover
    background-color: var(--background-primary-light)

  &.--disabled
    background-color: var(--background-secondary)
    cursor: not-allowed
    color: var(--color-secondary)

    &:active
      pointer-events: none

  &.--secondary
    background-color: transparent
    border: 1px solid var(--background-stroke)
    font-weight: 500

    &:hover
      background-color: var(--background-stroke)

  &.--square
    padding: 5px
    color: var(--color-default)

    svg,
    img
      max-height: 24px
      max-width: 24px
      min-width: 24px
      min-height: 24px
      width: 100%
      height: 100%

</style>