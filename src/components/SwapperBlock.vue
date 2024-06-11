<template>
  <div class="swapper-block">
    <section class="swapper-block__section">
      <div class="swapper-block__title">{{ title }}</div>

      <div
          v-if="showCount && !isNft"
          class="swapper-block__point --clickable"
          @click="onCountClick"
      >
        Max: <Number class="swapper-block__point-value">{{ decimalsOff(tokenAmount, token?.decimals) }}</Number>
      </div>

      <div
          v-else-if="showBalances && token && !showCount"
          class="swapper-block__point --clickable"
          @click="onBalanceClick"
      >
        <Image src="/images/icons/wallet.svg" class="swapper-block__point-icon" />
        <Number class="swapper-block__point-value">{{ decimalsOff(tokenBalance, token?.decimals) }}</Number>
      </div>
    </section>

    <section class="swapper-block__section">
      <SelectTokenButton
          v-model="token"
          :can-select="canSelectTokens"
          :available-token-types="availableTokenTypes"
          class="swapper-block__token"
      />

      <SelectNftButton
          v-if="isNft"
          v-model="nftToken"
          :address="token?.address"
          :can-select="canSelectTokens"
          :owner-address="userStore.address"
          class="swapper-block__token"
      />

      <div v-else-if="isLoading" class="swapper-block__input">...</div>

      <InputNumber
          v-else
          v-model="tokenValue"
          :decimals="token?.decimals"
          :is-disabled="!canEnterValues"
          placeholder="0.00"
          class="swapper-block__input"
          @error:decimals="onDecimalsError"
          @event:blur="$emit('blur')"
          @event:focus="$emit('focus')"
      />
    </section>

<!--    <section v-for="asset in modelValue" class="swapper-block__section">-->
<!--      <SelectTokenButton-->
<!--          v-model="asset.token"-->
<!--          :can-select="canSelectTokens"-->
<!--          class="swapper-block__token"-->
<!--      />-->

<!--      <SelectNftButton-->
<!--          v-if="isNft && asset.token.address && canSelectTokens"-->
<!--          v-model="nftToken"-->
<!--          :address="asset.token.address"-->
<!--          :owner-address="userStore.address"-->
<!--          class="swapper-block__token"-->
<!--      />-->

<!--      <InputNumber-->
<!--          v-else-->
<!--          v-model="asset.value"-->
<!--          :decimals="asset.token.decimals"-->
<!--          :is-disabled="!canEnterValues"-->
<!--          placeholder="0.00"-->
<!--          class="swapper-block__input"-->
<!--          @error:decimals="onDecimalsError"-->
<!--      />-->
<!--    </section>-->

    <section class="swapper-block__section">
      <div class="swapper-block__point --count"></div>

      <div class="swapper-block__point">
        <Number prefix="$" decimals="2">{{ tokenPrice * tokenValue }}</Number>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import SelectTokenButton from '@/components/SelectTokenButton.vue'
import SelectNftButton from '@/components/SelectNftButton.vue'
import InputNumber from '@/shared/ui/InputNumber.vue'
import { computed, onMounted, type PropType, ref, watch } from 'vue'
import { useUserStore } from '@/stores'
import { getBalance, getEthBalance } from '@/entities/account/api/getBalance'
import { decimalsOff } from '@/shared/lib/utils/token'
import type { IAsset, INft, IToken } from '@/shared/types/swapper'
import { fetchCurrencyPrice, fetchTokenPriceByAddress } from '@/entities/token/api'

const props = defineProps({
  modelValue: {
    type: Array as PropType<IAsset[]>,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  showBalances: {
    type: Boolean,
    default: false,
  },

  canSelectTokens: {
    type: Boolean,
    default: true,
  },

  canEnterValues: {
    type: Boolean,
    default: true,
  },

  showCount: {
    type: Boolean,
    default: false,
  },

  isLoading: {
    type: Boolean,
    default: false,
  },

  availableTokenTypes: {
    type: Array,
  },
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

const userStore = useUserStore()

const assets = ref<IAsset[]>(props.modelValue || [])
const asset = ref<IAsset | null>(null)
const token = ref<IToken | null>(null)
const tokenValue = ref(null)
const tokenBalance = ref<string | null>(null)
const nftToken = ref<INft | null>(null)
const tokenPrice = ref(null)

const tokenAmount = computed(() => asset.value?.amount || null)
const isNft = computed(() => token.value?.type === 'ERC721')

watch(() => props.modelValue, init, { deep: true })
watch(() => token.value, () => {
  onTokenChange()
  getTokenPrice()
})
watch(() => tokenBalance.value, onChange)
watch(() => tokenValue.value, onChange)
watch(() => nftToken.value, onChange)

onMounted(() => {
  init(assets.value)
})

function init(newAssets) {
  const newAsset = newAssets[0]

  if (newAsset) {
    asset.value = newAsset
    token.value = newAsset.token
    tokenValue.value = props.canEnterValues ? newAsset.value : decimalsOff(newAsset.amount, newAsset.token?.decimals)

    if (newAsset.token.type === 'ERC721' && !nftToken.value?.id) {
      nftToken.value = { id: newAsset.amount }
    }
  }
}

function onChange() {
  const newAssets: IAsset[] = [{
    token: token.value,
    value: token.value?.type === 'ERC721' ? nftToken.value?.id?.toString() : tokenValue.value,
    balance: tokenBalance.value,
    amount: tokenAmount.value,
  }]

  emit('update:modelValue', newAssets)
}

async function onTokenChange() {
  onChange()

  tokenValue.value = null
  tokenBalance.value = 0

  if (token.value) {
    tokenBalance.value = await getTokenBalance()
  }
}

function onDecimalsError(decimals: number) {
  console.error(`Only ${decimals} allowed for this token!`)
}

function onBalanceClick() {
  tokenValue.value = decimalsOff(tokenBalance.value, token.value?.decimals)
  emit('focus')
  setTimeout(() => emit('blur'), 1000)
}

function onCountClick() {
  tokenValue.value = decimalsOff(tokenAmount.value, token.value?.decimals)
  emit('focus')
  setTimeout(() => emit('blur'), 1000)
}

async function getTokenBalance() {
  if (token.value.type === 'currency') {
    return getEthBalance(userStore.address)
  }

  return getBalance(token.value.address, userStore.address)
}

async function getTokenPrice() {
  if (token.value?.type === 'currency' || token.value.symbol === 'gWETH') {
    tokenPrice.value = await fetchCurrencyPrice()
  } else {
    tokenPrice.value = await fetchTokenPriceByAddress(token.value.address)
  }
}
</script>

<style scoped lang="sass">
.swapper-block
  display: flex
  flex-direction: column
  gap: 8px

  &__section
    display: flex
    align-items: center
    justify-content: space-between
    gap: 24px

  &__title
    cursor: default
    color: var(--color-secondary)

  &__token
    max-width: 48%
    height: 32px

    &.--disabled:active
      pointer-events: none

  &__input
    font-family: var(--font-1)
    text-align: right
    font-size: 30px
    line-height: 32px
    font-weight: 700
    width: 100%
    text-overflow: ellipsis
    white-space: nowrap

    &::placeholder
      color: var(--color-placeholder)

  &__point
    color: var(--color-secondary)
    font-weight: 500
    display: flex
    align-items: center
    gap: 6px
    cursor: default
    max-width: 60%

    &.--clickable
      cursor: pointer
      user-select: none
      color: var(--color-primary)

    &.--count
      //font-size: 12px

    &-icon
      height: 12px
      width: 12px
      min-width: 12px
      color: inherit

    &-value
      text-overflow: ellipsis
      overflow: hidden
      width: 100%
      text-align: right
      display: inline-block
      white-space: nowrap
</style>