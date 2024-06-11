<template>
  <div class="line" :class="{ 'line--vertical': isVertical }"></div>
</template>

<script setup>
defineProps({
  isVertical: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="sass">
.line
  height: 1px
  min-height: 1px
  width: 100%
  background-color: var(--background-stroke)

  &--vertical
    height: 100%
    width: 1px
    min-width: 1px
</style>