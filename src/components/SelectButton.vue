<template>
  <div class="select-button" :title="fullTitle">
    <Image
        v-if="icon"
        :src="icon"
        :alt="altText"
        class="select-button__icon"
    />

    <Image
        v-else-if="showIcon && title"
        :src="alternativeIcon"
        :alt="altText"
        class="select-button__icon"
    />

    <!---->

    <div class="select-button__title">{{ title || 'Select' }}</div>

    <Image
        v-if="canSelect"
        src="/images/icons/arrow.svg"
        class="select-button__arrow"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
  },

  fullTitle: {
    type: String,
    default: '',
  },

  icon: {
    type: String,
  },

  alternativeIcon: {
    type: String,
    default: '/images/icons/question-mark.svg',
  },

  showIcon: {
    type: Boolean,
    default: true,
  },

  canSelect: {
    type: Boolean,
    default: true,
  },
})

const altText = computed(() => props.fullTitle)
</script>

<style scoped lang="sass">
.select-button
  display: flex
  align-items: center
  cursor: pointer
  user-select: none
  font-family: var(--font-1)

  &:hover
    .select-button
      &__title,
      &__arrow,
      &__icon
        color: var(--color-primary)

  &__title
    font-size: 28px
    line-height: 36px
    font-weight: 600
    text-overflow: ellipsis
    overflow: hidden
    white-space: nowrap

  &__icon
    height: 32px
    width: 32px
    min-width: 32px
    margin-right: 6px
    border-radius: 50%
  //outline: 1px solid var(--background-stroke)

  &__arrow
    margin-left: 4px
</style>