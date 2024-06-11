<template>
  <div class="trade-list">
    <TradeCard v-for="trade in trades" :trade="trade" class="trade-list__trade" />
  </div>
</template>

<script setup>
import TradeCard from '@/components/TradeCard.vue'

defineProps({
  trades: {
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