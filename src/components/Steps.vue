<template>
  <div class="steps">
    <div class="steps__steps">
      <div class="steps__line"></div>

      <div
          v-for="(step, stepIndex) in steps"
          class="steps__step"
          :class="{ '--active': step.id === currentStep.id }"
      >
        {{ stepIndex + 1 }}
      </div>
    </div>

    <div class="steps__title">{{ currentStep.title }}</div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

interface IStep {
  id: string
  title: string
  description: string
}

defineProps({
  steps: {
    type: Array as PropType<IStep[]>,
    required: true,
  },

  currentStep: {
    type: Object as PropType<IStep>,
    required: true,
  },
})
</script>

<style scoped lang="sass">
.steps
  position: relative

  &__steps
    display: flex
    align-items: center
    justify-content: space-around

  &__step
    z-index: 1
    background-color: var(--background-primary-light-2)
    border: 1px solid var(--background-primary)
    color: var(--color-primary)
    border-radius: 1000px
    text-align: center
    padding: 12px
    height: 24px
    width: 24px
    display: flex
    justify-content: center
    align-items: center
    font-size: 12px
    font-weight: 700
    cursor: help
    user-select: none

    &.--active
      background-color: var(--background-primary)
      color: black

  &__line
    height: 2px
    background-color: var(--background-primary)
    width: 100%
    position: absolute

  &__title
    text-align: center
    margin-top: 16px
    font-size: 14px
    color: var(--color-primary)
</style>