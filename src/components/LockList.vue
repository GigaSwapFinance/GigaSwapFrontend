<template>
  <div class="trade-list">
    <LockCard v-for="lock in locks" :lock="lock" class="trade-list__trade" />
  </div>
</template>

<script setup>
import LockCard from '@/components/LockCard.vue'

defineProps({
  locks: {
    type: Array,
    required: true,
  }
})
</script>

<style scoped lang="sass">
.trade-list
  display: grid
  grid-template-columns: 1fr 1fr 1fr
  grid-gap: 16px

  &__trade
    transition: all 0.4s ease

    &:hover
      transform: scale(1.015)
      //box-shadow: var(--shadow-primary)

  @media screen and (max-width: $breakpointTablet)
    grid-template-columns: 1fr 1fr

  @media screen and (max-width: $breakpointMobile)
    grid-template-columns: 1fr
</style>