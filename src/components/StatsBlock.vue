<template>
  <div class="stats-block">
    <Image :src="icon" class="stats-block__icon" />
    <div class="stats-block__title">{{ title }}</div>

    <div class="stats-block__value heading-4">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },

  icon: {
    type: String,
    required: true,
  },
})
</script>

<style scoped lang="sass">
.stats-block
  border-radius: 16px
  border: 1px solid var(--background-stroke)
  padding: 16px 20px
  display: flex
  flex-direction: column
  gap: 8px

  &__icon
    height: 28px
    width: 28px
    margin-bottom: 6px
    color: var(--color-primary)

  &__value
    margin-bottom: 0
</style>
<script setup lang="ts">
</script>