<template>
  <div class="connect-wallet-modal">
    <ModalCloseButton @click="emit('closeModal')" />

    <div class="connect-wallet-modal__title">Select a wallet to connect.</div>

    <div class="connect-wallet-modal__wallets">
      <div
        v-for="wallet in wallets"
        class="connect-wallet-modal__wallet"
        :class="{ '--disabled': wallet.isDisabled }"
        @click="onWalletClick(wallet)"
      >
        <Image :src="wallet.icon" class="connect-wallet-modal__wallet-icon" />
        <div class="connect-wallet-modal__wallet-title">{{ wallet.title }}</div>
      </div>
    </div>

    <div class="connect-wallet-modal__description">
      By connecting a wallet, you agree to <router-link to="/terms" @click="emit('closeModal')">GigaSwap's Terms of Use</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import ModalCloseButton from '@/modules/AppModal/components/ModalCloseButton.vue'
import { ref } from 'vue'
import { connect } from '@/shared/lib/user'

type Wallet = {
  id: string;
  title: string;
  icon: string;
  isDisabled?: boolean;
  hint?: string;
}

const emit = defineEmits(['closeModal'])

const wallets = ref<Wallet[]>([
  {
    id: 'wallet-connect',
    title: 'Wallet Connect',
    icon: '/images/wallets/wallet-connect.svg',
  },

  // {
  //   id: 'internet-identity',
  //   title: 'Internet Identity',
  //   icon: '/images/wallets/internet-identity.png',
  //   isDisabled: true,
  //   hint: 'Soon in V3',
  // },
])

async function onWalletClick() {
  connect()
  emit('closeModal')
}
</script>

<style scoped lang="sass">
.connect-wallet-modal
  display: flex
  flex-direction: column
  align-items: center
  padding: 44px 24px 24px
  font-family: var(--font-1)

  &__title
    font-weight: 600
    margin-bottom: 26px
    color: var(--color-secondary)
    cursor: default

  &__description
    font-weight: 600
    font-size: 14px
    margin-top: 30px
    user-select: none
    text-align: center

    a
      color: var(--color-primary)

      &:hover
        opacity: 0.8

  &__wallets
    display: grid
    grid-template-columns: 1fr
    row-gap: 10px
    padding: 10px 0

  &__wallet
    padding: 12px 8px 8px
    display: flex
    flex-direction: column
    align-items: center
    width: 92px
    cursor: pointer
    user-select: none
    border-radius: 16px
    transition: opacity 0.3s ease

    &:hover
      opacity: 0.7

    &.--disabled
      user-select: none
      pointer-events: none
      opacity: 0.3
      cursor: not-allowed

    &-icon
      width: 48px
      height: 48px
      border-radius: 12px
      margin-bottom: 8px

    &-title
      font-weight: 600
      text-align: center
</style>