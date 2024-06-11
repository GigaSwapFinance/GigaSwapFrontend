<template>
  <div class="modal-chain-list">
    <ModalCloseButton @click="emit('closeModal')" />

    <div class="modal-chain-list__header">
      <div class="modal-chain-list__title heading-4">Switch chain</div>
    </div>

    <div class="modal-chain-list__body">
      <WarningBlock
          v-if="!currentChain"
          class="modal-chain-list__description"
      >Your wallet's network is currently unsupported. Select one from the list.</WarningBlock>

      <div class="modal-chain-list__list">
        <div
            v-for="chain in chains"
            class="modal-chain-list__chain"
            :class="{ '--disabled': chain.isDisabled }"
            @click="onChainClick(chain.id)"
        >
          <div class="modal-chain-list__chain-info">
            <Image :src="chain.icon" class="modal-chain-list__chain-icon" />
            <div class="modal-chain-list__chain-title">{{ chain.title }}</div>
            <div v-if="chain.hint" class="modal-chain-list__chain-hint">{{ chain.hint }}</div>
          </div>

          <Image
              v-if="chain.id === appStore.chainId"
              src="/images/icons/checkmark.svg"
              class="modal-chain-list__chain-status"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ModalCloseButton from '@/modules/AppModal/components/ModalCloseButton.vue'
import WarningBlock from '@/shared/ui/WarningBlock.vue'
import { CHAINS } from '@/shared/const/chains'
import { computed, ref } from 'vue'
import { useAppStore } from '@/stores'
import { switchChain } from '@/shared/lib/chain'

const appStore = useAppStore()

const chains = ref(CHAINS.sort((a, b) => Number(a.isDisabled) - Number(b.isDisabled)))
const currentChain = computed(() => appStore.currentChain)
const emit = defineEmits(['closeModal'])

function onChainClick(chainId) {
  switchChain(chainId)
  emit('closeModal')
}
</script>

<style scoped lang="sass">
.modal-chain-list
  padding: 24px 12px

  &__header
    padding: 0 12px

  &__description
    margin-bottom: 12px

  &__list
    display: flex
    flex-direction: column
    gap: 6px

  &__chain
    display: flex
    justify-content: space-between
    align-items: center
    cursor: pointer
    border-radius: 8px
    padding: 8px 12px
    user-select: none
    transition: background-color 0.3s ease

    &:hover
      background-color: var(--background-light)

    &.--disabled
      opacity: 0.5
      cursor: not-allowed

      &:active
        pointer-events: none

    &-info
      display: flex
      align-items: center
      gap: 10px

    &-icon
      height: 24px
      width: 24px

    &-status
      height: 16px
      width: 16px
      color: var(--color-primary)

    &-hint
      font-size: 10px
      background-color: var(--background-primary-light)
      padding: 4px 6px
      border-radius: 6px
</style>