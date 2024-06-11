<template>
  <div class="account-modal">
    <ModalCloseButton @click="emit('closeModal')" />

    <div class="account-modal__title">Account</div>

    <div class="account-modal__body">
      <div class="account-modal__balance">
        <div class="account-modal__balance-title">Balance</div>

        <div class="account-modal__balance-values">
          <div class="account-modal__balance-value">
            <Image src="/images/currencies/eth.svg" class="account-modal__balance-icon" />
            <Number decimals="2">{{ decimalsOff(ethBalance, 18) }}</Number>
          </div>

          <div class="account-modal__balance-value">
            <Image src="/images/currencies/gweth.svg" class="account-modal__balance-icon" />
            <Number decimals="2">{{ decimalsOff(wethBalance, 18) }}</Number>
            <div v-if="Number(wethBalance)" class="account-modal__balance-button" @click="router.push('/unwrap')">Unwrap</div>
          </div>

          <div v-if="Number(gigaBalance)" class="account-modal__balance-value">
            <Image src="/images/currencies/giga.svg" class="account-modal__balance-icon" />
            <Number decimals="2">{{ decimalsOff(gigaBalance, 9) }}</Number>
          </div>
        </div>
      </div>

      <div class="account-modal__info">
        <div class="account-modal__info-user">
          <div class="account-modal__info-address">{{ shortAddress(userStore.address) }}</div>

          <div class="account-modal__button" @click="onCopyClick">
            <Image src="/images/icons/copy.svg" class="account-modal__button-image"/>
          </div>

          <div class="account-modal__button" @click="onProviderClick">
            <Image src="/images/icons/etherscan.svg" class="account-modal__button-image"/>
          </div>

          <div class="account-modal__button" @click="onDisconnectClick">
            <Image src="/images/icons/exit.svg" class="account-modal__button-image"/>
          </div>
        </div>

        <div class="account-modal__info-wallet">{{ userStore.connector.name || DEFAULT_CONNECTOR_NAME }}</div>
      </div>
    </div>

    <div v-if="localStore.transactions.length" class="account-modal__transactions">
      <div class="account-modal__transactions-title">Recent transactions</div>

      <div class="account-modal__transactions-list">
        <Transaction
            v-for="transaction in localStore.transactions"
            v-bind="transaction"
            class="account-modal__transactions-transaction"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ModalCloseButton from '@/modules/AppModal/components/ModalCloseButton.vue'
import Transaction from '@/components/Transaction.vue'
import { useLocalStore, useUserStore } from '@/stores'
import { shortAddress } from '@/shared/lib/utils/address'
import { disconnect } from '@/shared/lib/user'
import { copyToClipboard } from '@/shared/lib/utils/clipboard'
import { onMounted, ref } from 'vue'
import { getBalance, getEthBalance } from '@/entities/account/api/getBalance'
import { decimalsOff } from '@/shared/lib/utils/token'
import { CONTRACTS } from '@/shared/const/contracts'
import { useRouter } from 'vue-router'

const DEFAULT_CONNECTOR_NAME = 'WalletConnect'

const emit = defineEmits(['closeModal'])
const userStore = useUserStore()
const localStore = useLocalStore()
const router = useRouter()

const ethBalance = ref(null)
const gigaBalance = ref(null)
const wethBalance = ref(null)

onMounted(initBalances)

async function initBalances() {
  ethBalance.value = await getEthBalance(userStore.address)
  wethBalance.value = await getBalance(CONTRACTS.gweth.address, userStore.address)

  if (CONTRACTS.token.address) {
    gigaBalance.value = await getBalance(CONTRACTS.token.address, userStore.address)
  }
}

function onDisconnectClick() {
  disconnect()
  emit('closeModal')
}

function onProviderClick() {
  const provider = 'https://goerli.etherscan.io'
  window.open(provider + '/address/' + userStore.address, '_blank')
}

function onCopyClick() {
  copyToClipboard(userStore.address)
}
</script>

<style scoped lang="sass">
.account-modal
  padding: 24px
  max-width: 500px
  width: 100%
  font-family: var(--font-1)

  &__title
    font-weight: 700
    font-size: 24px
    margin-bottom: 24px

  &__body
    display: flex
    flex-direction: column
    padding: 16px 20px
    border-radius: 16px
    background-color: var(--background-secondary)
    color: var(--color-default)

  &__info
    display: flex
    justify-content: space-between
    align-items: center
    font-weight: 600

    &-user
      display: flex
      align-items: center
      gap: 8px

  &__balance
    margin-bottom: 30px

    &-title
      font-size: 14px
      margin-bottom: 8px

    &-values
      display: flex
      align-items: center
      gap: 8px
      flex-wrap: wrap

    &-icon
      display: inline-flex
      height: 22px
      border-radius: 50%

    &-value
      font-family: var(--font-1)
      font-weight: 800
      font-size: 24px
      border: 1px solid var(--border-light)
      padding: 2px 6px
      border-radius: 8px
      width: fit-content
      display: flex
      align-items: center
      gap: 6px

    &-button
      font-size: 14px
      cursor: pointer
      color: var(--color-primary)

  &__button
    height: 32px
    width: 32px
    border: 1px solid var(--border-light)
    border-radius: 8px
    display: flex
    justify-content: center
    align-items: center
    cursor: pointer
    transition: background-color 0.3s ease
    user-select: none

    &:hover
      background-color: var(--border-light)

    &-image
      height: 16px
      width: 16px
      filter: drop-shadow(var(--shadow-text))

  &__transactions
    margin-top: 24px

    &-list
      display: flex
      flex-direction: column
      gap: 12px

    &-title
      font-weight: 600
      margin-bottom: 16px
</style>