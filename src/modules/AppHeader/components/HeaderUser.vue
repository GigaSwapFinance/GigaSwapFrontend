<template>
  <div class="header-user">
    <Jazzicon :address="address" class="header-user__logo" />
    <div class="header-user__text">{{ shortAddress(address) }}</div>
  </div>
</template>

<script setup lang="ts">
import Jazzicon from '@/shared/ui/Jazzicon.vue'
import { shortAddress } from '@/shared/lib/utils/address'

defineProps({
  address: {
    type: String,
    required: true,
  },

  walletId: {
    type: String,
    default: 'plug',
  },
})
</script>

<style scoped lang="sass">
.header-user
  display: flex
  align-items: center
  padding: 0 8px
  border-radius: 8px
  height: 36px
  cursor: pointer
  user-select: none
  transition: background-color 0.3s ease

  &:hover
    background-color: var(--background-secondary)

  &__logo
    width: 18px
    height: 18px
    margin-right: 6px
    border-radius: 50%

  &__text
    white-space: nowrap
</style>