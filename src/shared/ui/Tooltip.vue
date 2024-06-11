<template>
  <div
    class="tooltip"
    @mouseover="onHover"
    @mouseleave="onUnhover"
  >
    <slot />

    <div class="tooltip__content" :class="{ '--visible': isVisible }">
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isVisible = ref(false)

function onHover() {
  isVisible.value = true
}

function onUnhover() {
  isVisible.value = false
}
</script>

<style scoped lang="sass">
.tooltip
  position: relative

  &__content
    visibility: hidden
    pointer-events: none
    opacity: 0
    color: var(--color-default)
    position: absolute
    top: 100%
    transition: visibility 0.3s ease, opacity 0.3s ease

    &.--visible
      visibility: visible
      opacity: 1
      pointer-events: all

</style>