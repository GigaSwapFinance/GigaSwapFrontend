<template>
  <div class="page" :class="{ 'page--padded': padded }">
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  padded: {
    type: Boolean,
    default: false,
  }
})
</script>

<style lang="sass">
.page
  animation: fade-in-bottom 0.3s ease

  &--padded
    padding: 36px 0
</style>