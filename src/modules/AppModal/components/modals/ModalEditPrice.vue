<template>
  <div class="modal-edit-price">
    <ModalCloseButton @click="emit('closeModal')" />

    <div class="modal-edit-price__title">Edit price</div>

    <div class="modal-edit-price__body">
      <div class="modal-edit-price__description">
        Write new price for <Number>{{ decimalsOff(trade.count1, trade.asset1.decimals) }}</Number> {{ trade.asset1.symbol }}
      </div>

      <Input
          v-model="newAmount"
          is-number
          placeholder="0.00"
          :symbol-icon="trade.asset2.logoURI"
          :symbol="trade.asset2.symbol"
          :decimals="trade.asset2.decimals"
      />

      <BigButton
          class="modal-edit-price__button"
          :is-disabled="Number(newAmount) <= 0"
          @click="onEditClick"
      >Set new price</BigButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import ModalCloseButton from '@/modules/AppModal/components/ModalCloseButton.vue'
import BigButton from '@/shared/ui/BigButton.vue'
import Input from '@/shared/ui/Input.vue'
import { decimalsOff, decimalsOn } from '@/shared/lib/utils/token'
import { useLayoutStore } from '@/stores'
import { ref } from 'vue'
import { editPrice } from '@/entities/erc20sale/api/editPrice'

const emit = defineEmits(['closeModal'])

const props = defineProps({
  trade: {
    type: Object,
    required: true,
  },
})

const layoutStore = useLayoutStore()
const newAmount = ref(null)

async function onEditClick() {
  layoutStore.startLoading()

  try {
    const priceNom = decimalsOn(newAmount.value, props.trade.asset2.decimals)
    const priceDenom = props.trade.count1

    await editPrice(props.trade.blockchainId, priceNom, priceDenom)

    layoutStore.openModal('Success', {
      title: 'Success',
      description: `Price changed!`,
    })
  } catch (e) {
    console.error(e)
  }

  layoutStore.stopLoading()
}
</script>

<style scoped lang="sass">
.modal-edit-price
  padding: 24px
  max-width: 500px
  width: 100%
  font-family: var(--font-1)

  &__title
    font-weight: 700
    font-size: 24px
    margin-bottom: 24px
    padding-right: 24px

  &__body
    display: flex
    flex-direction: column
    gap: 8px

  &__button
    width: 100%
    margin-top: 12px
</style>