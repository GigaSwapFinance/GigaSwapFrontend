<template>
  <div class="warning-block">
    <Image :src="icon" class="warning-block__icon" />

    <div class="warning-block__text">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: '/images/icons/warning.svg',
  }
})
</script>

<style scoped lang="sass">
.warning-block
  display: flex
  gap: 16px
  background-color: var(--background-secondary)
  padding: 16px
  border-radius: 16px
  line-height: 1.4

  &__icon
    width: 20px
    height: 20px
    min-width: 20px

  @media screen and (max-width: $breakpointMobile)
    flex-direction: column
    gap: 12px
    padding: 16px
</style>