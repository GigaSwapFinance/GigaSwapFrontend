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
  isDisabled: {
    type: Boolean,
    default: false,
  },

  icon: {
    type: String,
  },

  isSecondary: {
    type: Boolean,
    default: false,
  },
})

const buttonClasses = computed(() => {
  return {
    '--disabled': props.isDisabled,
    '--secondary': props.isSecondary,
  }
})
</script>

<style scoped lang="sass">
.button
  cursor: pointer
  padding: 0 24px
  font-size: 16px
  white-space: nowrap
  font-weight: 500
  min-height: 56px
  border-radius: 12px
  border: 1px solid transparent
  transition: background-color 0.3s ease, opacity 0.3s ease
  background-color: var(--background-primary)
  color: rgb(0, 0, 0)

  display: flex
  align-items: center
  justify-content: center
  gap: 12px

  &:hover
    background-color: var(--background-primary-light)

  &.--disabled
    background-color: var(--background-secondary)
    cursor: not-allowed
    color: var(--color-secondary)

    &:active
      pointer-events: none

  &.--secondary
    background-color: var(--background-primary-light-2)
    color: var(--color-primary)

    &:hover
      background-color: var(--background-primary-light)

  &__icon
    height: 16px
    width: 16px

  @media screen and (max-width: $breakpointMobile)
    padding: 0 20px
    min-height: 48px
</style>