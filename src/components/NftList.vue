<template>
  <div class="nft-list">
    <div
        v-for="token in tokens"
        class="nft-list__token"
        :class="{ '--disabled': isDisabled(token) }"
        @click="emit('select', token)"
    >
      <Image src="/images/icons/nft.svg" class="nft-list__token-icon" />
      <div class="nft-list__token-title">#{{ token.id }}</div>

      <InlineTip
          v-if="isDisabled(token)"
          class="nft-list__token-hint"
      >Not yours</InlineTip>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores'
import InlineTip from '@/shared/ui/InlineTip.vue'

defineProps({
  tokens: {
    type: Array,
    required: true,
  },

  onlyOwned: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['select'])

const userStore = useUserStore()

function isDisabled(token) {
  if (!token.owner) {
    return false
  }

  return token.owner.toLowerCase() !== userStore.address.toLowerCase()
}
</script>

<style scoped lang="sass">
.nft-list
  display: grid
  grid-template-columns: 1fr 1fr 1fr 1fr
  grid-gap: 12px

  &__token
    display: flex
    flex-direction: column
    align-items: center
    cursor: pointer
    transition: transform 400ms ease
    padding: 12px 20px
    border-radius: 12px
    border: 1px solid var(--border-light)
    box-shadow: var(--shadow-card)

    &:hover
      transform: scale(1.015)

    &.--disabled
      opacity: 0.6
      pointer-events: none

    &-icon
      height: 48px
      width: 48px

    &-title
      font-weight: 500
      margin-top: 12px

    &-hint
      color: var(--color-warning)
      font-size: 12px
      margin-top: 8px

  @media screen and (max-width: $breakpointMobile)
    grid-template-columns: 1fr 1fr 1fr
</style>