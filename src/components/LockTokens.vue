<template>
  <div class="lock-tokens">
    <WarningBlock class="lock-tokens__warning">To harvest crops you have to be locked for 2 intervals (14 days)</WarningBlock>

    <SelectTabs
        v-model="currentAction"
        :options="actions"
        class="lock-tokens__options"
    />

    <Input
        v-model="tokenAmount"
        is-number
        placeholder="0.00"
        :symbol-icon="GIGA_TOKEN.logoURI"
        :symbol="GIGA_TOKEN.symbol"
        :max-value="currentAction.id === 'lock' ? decimalsOff(tokenBalance, GIGA_TOKEN.decimals) : decimalsOff(tokenLockedAmount, GIGA_TOKEN.decimals)"
        class="lock-tokens__input"
    />

    <div class="lock-tokens__description">
      <div
          v-if="currentAction.id === 'lock'"
          class="lock-tokens__description-point"
          @click="tokenAmount = decimalsOff(tokenBalance, GIGA_TOKEN.decimals)"
      >
        Balance: <Number>{{ decimalsOff(tokenBalance, GIGA_TOKEN.decimals) }}</Number> {{ GIGA_TOKEN.symbol }}
      </div>

      <div
          v-else
          class="lock-tokens__description-point"
          @click="tokenAmount = decimalsOff(tokenLockedAmount, GIGA_TOKEN.decimals)"
      >
        You locked: <Number>{{ decimalsOff(tokenLockedAmount, GIGA_TOKEN.decimals) }}</Number> {{ GIGA_TOKEN.symbol }}
      </div>

<!--      <a-->
<!--          :href="getUniswapSwapUrl(GIGA_TOKEN.address)"-->
<!--          target="_blank"-->
<!--          class="lock-tokens__description-point"-->
<!--      >Buy more</a>-->
    </div>

    <BigButton
        v-if="!userStore.address"
        is-secondary
        class="lock-tokens__button"
        @click="connect"
    >Connect Wallet</BigButton>

    <BigButton
        v-else-if="!isAllowed"
        is-secondary
        class="lock-tokens__button"
        @click="onApproveClick"
    >Allow GigaSwap Farming to use GIGA</BigButton>

    <BigButton
        v-else-if="appStore.currentChain?.isFarmingEnabled"
        class="lock-tokens__button"
        @click="onLockClick"
    >{{ currentAction.title }} tokens</BigButton>

    <BigButton
        v-else
        is-disabled
        class="lock-tokens__button"
    >Switch to another chain</BigButton>
  </div>
</template>

<script setup>
import Input from '@/shared/ui/Input.vue'
import BigButton from '@/shared/ui/BigButton.vue'
import WarningBlock from '@/shared/ui/WarningBlock.vue'
import { useAppStore, useLayoutStore, useUserStore } from '@/stores'
import { ref, watch } from 'vue'
import { GIGA_TOKEN } from '@/shared/const/tokens'
import { decimalsOff, decimalsOn } from '@/shared/lib/utils/token'
import Number from '@/shared/ui/Number.vue'
import { connect } from '@/shared/lib/user'
import SelectTabs from '@/shared/ui/SelectTabs.vue'
import { CONTRACTS } from '@/shared/const/contracts'
import { approveAsset, isAssetApproved } from '@/services/asset'

const emit = defineEmits(['action'])

defineProps({
  tokenBalance: {
    type: String,
    default: null,
  },

  tokenLockedAmount: {
    type: String,
    default: null,
  },
})

const appStore = useAppStore()
const userStore = useUserStore()
const layoutStore = useLayoutStore()

const actions = ref([
  { id: 'lock', title: 'Lock' },
  { id: 'unlock', title: 'Unlock' },
])

const currentAction = ref(actions.value[0])
const tokenAmount = ref(null)
const isAllowed = ref(true)

watch(() => tokenAmount.value, checkIfAllowed)

function onLockClick() {
  emit(
      'action',
      {
        type: currentAction.value.id,
        amount: decimalsOn(tokenAmount.value, GIGA_TOKEN.decimals),
      },
  )
}

async function checkIfAllowed() {
  const asset = {
    value: tokenAmount.value,
    token: {
      address: CONTRACTS.token.address,
    }
  }

  const addressToApprove = CONTRACTS.farming.address

  isAllowed.value = await isAssetApproved(asset, addressToApprove)
}

async function onApproveClick() {
  layoutStore.startLoading()

  try {
    const asset = {
      value: tokenAmount.value,
      token: {
        address: CONTRACTS.token.address,
      }
    }

    await approveAsset(asset, CONTRACTS.farming.address)
  } catch (e) {
    console.error(e)
  }

  checkIfAllowed()

  layoutStore.stopLoading()
}
</script>

<style scoped lang="sass">
.lock-tokens
  background-color: var(--background-default)
  border-radius: 16px
  padding: 32px
  max-width: 620px
  width: 100%

  &__button
    width: 100%
    margin-top: 24px

  &__warning
    margin-bottom: 16px

  &__options
    margin-bottom: 16px
    width: auto

  &__description
    display: flex
    justify-content: space-between
    align-items: center
    color: var(--color-secondary)
    margin-top: 12px

    a
      color: var(--color-primary)

    &-point
      cursor: pointer

  @media screen and (max-width: $breakpointMobile)
    padding: 24px 16px
</style>