<template>
  <div class="modal-share-link">
    <ModalCloseButton @click="emit('closeModal')" />

    <div class="modal-share-link__title">Trade actions</div>

    <div class="modal-share-link__body">
      <div class="modal-share-link__list">
        <div class="modal-share-link__way" :class="{ '--disabled': !Number(trade.count1) }" @click="onWithdraw(1)">
          <Image src="/images/icons/link.svg" class="modal-share-link__way-icon" />
          <div class="modal-share-link__way-title">
            Withdraw <Number>{{ decimalsOff(trade.count1, trade.asset1.decimals) }}</Number> {{ trade.asset1.symbol }}
          </div>
        </div>

        <div class="modal-share-link__way" :class="{ '--disabled': !Number(trade.count2) }" @click="onWithdraw(2)">
          <Image src="/images/icons/link.svg" class="modal-share-link__way-icon" />
          <div class="modal-share-link__way-title">
            Withdraw <Number>{{ decimalsOff(trade.count2, trade.asset2.decimals) }}</Number> {{ trade.asset2.symbol }}
          </div>
        </div>

        <div class="modal-share-link__way" @click="onEditPriceClick">
          <Image src="/images/icons/edit.svg" class="modal-share-link__way-icon" />

          <div class="modal-share-link__way-title">
            Edit price
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ModalCloseButton from '@/modules/AppModal/components/ModalCloseButton.vue'
import { withdraw } from '@/entities/erc20sale/api/withdraw'
import { useLayoutStore } from '@/stores'
import { decimalsOff } from '@/shared/lib/utils/token'

const layoutStore = useLayoutStore()

const props = defineProps({
  trade: {
    type: Object,
    required: true,
  }
})

const emit = defineEmits(['closeModal'])

async function onWithdraw(assetCode) {
  layoutStore.startLoading()

  try {
    await withdraw(props.trade.blockchainId, assetCode)

    layoutStore.openModal('Success', {
      title: 'Success',
      description: `You withdrew your tokens`,
    })
  } catch (e) {
    console.error(e)
  }

  layoutStore.stopLoading()
}

async function onEditPriceClick() {
  layoutStore.openModal('EditPrice', { trade: props.trade })
}
</script>

<style scoped lang="sass">
.modal-share-link
  padding: 24px
  max-width: 500px
  width: 100%
  font-family: var(--font-1)

  &__title
    font-weight: 700
    font-size: 24px
    margin-bottom: 24px

  &__list
    display: flex
    flex-direction: column
    gap: 12px

  &__way
    font-family: var(--font-1)
    display: flex
    align-items: center
    gap: 16px
    padding: 16px 20px
    background-color: var(--background-input)
    border-radius: 12px
    cursor: pointer
    user-select: none
    transition: background-color 0.3s ease

    &.--disabled
      opacity: 0.5
      pointer-events: none

    &:hover
      background-color: var(--background-primary-light)

    &-icon
      height: 24px
      width: 24px

    &-title
      font-weight: 500
</style>