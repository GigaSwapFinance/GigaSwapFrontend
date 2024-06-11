<template>
  <div class="modal-success">
    <ModalCloseButton @click="emit('closeModal')" />

    <div class="modal-success__content">
      <Image src="/images/icons/checkmark-2.svg" class="modal-success__icon" />
      <div class="modal-success__title heading-4">Your transaction was successful</div>

      <div class="modal-success__description">
        Swap <b>{{ sendAmount }} {{ sendAsset.symbol }}</b>
        to <b>{{ receiveAmount }} {{ receiveAsset.symbol }}</b>
      </div>

      <Link
          with-icon
          :href="getTxExplorerUrl(txHash)"
          target="_blank"
          class="modal-success__link"
      >View on Explorer</Link>
    </div>

    <div class="modal-success__buttons">
      <BigButton class="modal-success__button" @click="emit('closeModal')">Got it</BigButton>
    </div>
  </div>
</template>

<script setup>
import ModalCloseButton from '@/modules/AppModal/components/ModalCloseButton.vue'
import BigButton from '@/shared/ui/BigButton.vue'
import Link from '@/shared/ui/Link.vue'
import { getTxExplorerUrl } from '@/shared/const/tokens'

defineProps({
  sendAsset: {
    type: Object,
    required: true,
  },

  receiveAsset: {
    type: Object,
    required: true,
  },

  sendAmount: {
    type: String,
  },

  receiveAmount: {
    type: String
  },

  txHash: {
    type: String,
  },
})

const emit = defineEmits(['closeModal'])
</script>

<style scoped lang="sass">
.modal-success
  padding: 36px 24px 24px
  max-width: 500px
  width: 100%

  &__content
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    gap: 16px

  &__title
    margin-bottom: 0
    text-align: center

  &__icon
    height: 64px
    width: 64px
    margin-bottom: 16px
    color: var(--color-primary)

  &__buttons
    margin-top: 36px
    display: flex
    flex-direction: column
    gap: 12px

  &__button
    width: 100%
</style>