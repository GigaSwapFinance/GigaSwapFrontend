<template>
  <div class="modal-success">
    <ModalCloseButton @click="emit('closeModal')" />

    <div class="modal-success__content">
      <Image src="/images/icons/checkmark-2.svg" class="modal-success__icon" />
      <div class="modal-success__title heading-4">Your transaction was successful</div>

      <div v-if="isDirect" class="modal-success__description">
        You have created a new trade. Now you need to send assets to the trade contract
      </div>

      <div v-else class="modal-success__description">
        You have created a new trade
      </div>

      <Link
          with-icon
          :href="getTxExplorerUrl(txHash)"
          target="_blank"
          class="modal-success__link"
      >View on Explorer</Link>
    </div>

    <div class="modal-success__buttons">
      <BigButton
          class="modal-success__button"
          @click="router.push(`/trade/${tradeId}`)"
      >Go to the trade</BigButton>
    </div>
  </div>
</template>

<script setup>
import ModalCloseButton from '@/modules/AppModal/components/ModalCloseButton.vue'
import BigButton from '@/shared/ui/BigButton.vue'
import Link from '@/shared/ui/Link.vue'
import { getTxExplorerUrl } from '@/shared/const/tokens'
import { useRouter } from 'vue-router'

defineProps({
  tradeId: {
    type: Number,
  },

  txHash: {
    type: String,
  },

  isDirect: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(['closeModal'])
const router = useRouter()
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

  &__description
    text-align: center
</style>