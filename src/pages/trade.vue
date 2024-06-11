<template>
  <Page padded class="page-trade">
    <PageSection v-if="trade" class="page-trade__content">
      <div class="page-trade__swapper-header">
        <div class="heading-4 page-trade__swapper-title">Trade #{{ tradeId }}</div>

        <div class="page-trade__swapper-actions">
          <Image
              src="/images/icons/share.svg"
              class="page-trade__swapper-action"
              @click="onShareClick"
          />

          <Image
              v-if="isOwner && isFractional"
              src="/images/icons/settings.svg"
              class="page-trade__swapper-action"
              @click="onSettingsClick"
          />
        </div>
      </div>

      <WarningBlock
          v-if="trade.chainId !== appStore.currentChain?.name"
          class="page-trade__swapper-warning"
      >Switch the chain to interact with this trade</WarningBlock>

      <WarningBlock
          v-else-if="(isFractional && !Number(trade.count1)) || (!isFractional && trade.state === 3)"
          class="page-trade__swapper-warning"
      >This trade is empty!</WarningBlock>

      <WarningBlock
          v-else-if="!isFractional && isOwner && trade.state === 'created'"
          class="page-trade__swapper-warning"
      >Until the assets are sent to the trade, it will not be visible to other traders</WarningBlock>

      <template v-else>
        <WarningBlock
            v-if="isFractional && Number(trade.buyLimit)"
            class="page-trade__swapper-warning"
        >Only <Number>{{ decimalsOff(trade.buyLimit, trade.asset1.decimals) }}</Number> {{ trade.asset1.symbol }} per wallet are available for purchase in this trade</WarningBlock>

        <WarningBlock
            v-if="withLockSettings"
            class="page-trade__swapper-warning"
        >Vesting is enabled for this trade.<br><br>After purchase you get {{ trade.lockSettings.releaseOnBuyPercent }}% of tokens of the purchase amount, the rest will be locked for {{ secondsToHours(trade.lockSettings.secondsToLock) }}</WarningBlock>

        <WarningBlock
            v-if="isFractional && shouldWrap"
            class="page-trade__swapper-warning"
        >You can wrap your ETH and get gWETH via <Link href="/wrap">wrapper page</Link></WarningBlock>
      </template>

      <div class="page-trade__body">
        <Swapper
            v-if="trade"
            v-model="assets"
            :can-select="false"
            :can-enter-values="isFractional"
            :loading-side="loadingSide"
            show-balances
            show-max-count
            @update:new-token-value="initValues"
            @blur="onBlur"
            @focus="onFocus"
        />

        <Line />

        <Steps
            v-if="!isFractional && trade.state !== 'created'"
            :current-step="currentStep"
            :steps="steps"
            class="page-trade__steps"
        />

        <div class="page-trade__bottom">
          <BigButton
              v-if="!userStore.address"
              is-secondary
              class="page-trade__bottom-button"
              @click="onConnectClick"
          >Connect Wallet</BigButton>

          <BigButton
              v-else-if="isWhitelisted && !canTrade"
              is-disabled
              class="page-trade__bottom-button"
          >It's a private trade</BigButton>

          <BigButton
              v-else-if="errorText && !isWaitingForPartner"
              is-disabled
              class="page-trade__bottom-button"
          >{{ errorText }}</BigButton>

          <BigButton
              v-else-if="!isAllowed"
              is-secondary
              class="page-trade__bottom-button"
              @click="onApproveClick"
          >Allow GigaSwap to use {{ assets.send[0].token.symbol }}</BigButton>

          <BigButton
              v-else-if="isFractional"
              class="page-trade__bottom-button"
              @click="onSwapClick"
          >Swap</BigButton>

          <template v-else>
            <BigButton
                v-if="trade.state === 'created' && isOwner"
                class="page-trade__bottom-button"
                @click="onExecuteClick"
            >Send assets</BigButton>

            <BigButton
                v-else-if="isWaitingForPartner"
                is-disabled
                class="page-trade__bottom-button"
                @click="onExecuteClick"
            >Waiting for partner</BigButton>

            <BigButton
                v-else-if="trade.state === 'waiting_for_partner'"
                class="page-trade__bottom-button"
                @click="onExecuteClick"
            >Join the trade</BigButton>

            <BigButton
                v-else-if="trade.state === 'executed'"
                class="page-trade__bottom-button"
                @click="onSwapSidesClick"
            >Swap the sides</BigButton>

            <BigButton
                v-else-if="trade.state === 'swapped' && canWithdraw"
                class="page-trade__bottom-button"
                @click="onWithdrawClick"
            >Withdraw</BigButton>

            <BigButton
                v-else
                is-disabled
                class="page-trade__bottom-button"
            >Trade is empty</BigButton>
          </template>

          <BigButton
              v-if="!isFractional && isOwner && trade.state === 'waiting_for_partner'"
              is-secondary
              class="page-trade__bottom-button"
              @click="onWithdrawClick"
          >Withdraw the assets and delete the trade</BigButton>
        </div>
      </div>
    </PageSection>
  </Page>
</template>

<script setup lang="ts">
import Page from '@/shared/ui/pages/Page.vue'
import PageSection from '@/shared/ui/pages/PageSection.vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore, useLayoutStore, useLocalStore, useUserStore } from '@/stores'
import WarningBlock from '@/shared/ui/WarningBlock.vue'
import { fetchTradeById, updateTradeById } from '@/entities/trade/api'
import Swapper from '@/components/Swapper.vue'
import { decimalsOff, decimalsOn } from '@/shared/lib/utils/token'
import { swap } from '@/entities/erc20sale/api/swap'
import BigButton from '@/shared/ui/BigButton.vue'
import { approveAsset, isAssetApproved } from '@/services/asset'
import Line from '@/shared/ui/Line.vue'
import { getTokenSwapValues } from '@/services/trade'
import { executeDirectTrade, swapDirectTrade, withdrawDirectTrade } from '@/entities/direct/api'
import { CONTRACTS } from '@/shared/const/contracts'
import Steps from '@/components/Steps.vue'
import { secondsToHours } from '@/shared/lib/utils/date'
import { getTxExplorerUrl } from '@/shared/const/tokens'
import Link from '@/shared/ui/Link.vue'

const route = useRoute()
const router = useRouter()
const layoutStore = useLayoutStore()
const userStore = useUserStore()
const appStore = useAppStore()
const localStore = useLocalStore()

const tradeId = ref(route.params.id)
const trade = ref(null)
const assets = ref({ send: [], receive: [] })

const isOwner = computed(() => userStore.address === trade.value?.owner)
const isFractional = computed(() => trade.value?.type === 'fractional')
const isAllowed = ref(true)
const loadingSide = ref(null)
const currentSide = ref(null)

const errorText = computed(() => {
  let errorText = ''

  if (!appStore?.currentChain?.isTradesEnabled) {
    return 'Switch to another chain'
  }

  if (
      !isFractional.value
      && isOwner.value
      && trade.value?.state !== 'created'
  ) {
    return
  }

  for (let asset of assets.value.send) {
    if (
        isFractional.value
        && !Number(asset.value)
    ) {
      errorText = 'Enter the amount'; break
    } else if (
        isFractional.value
        && asset.token.type !== 'ERC721'
        && Number(asset.balance) < decimalsOn(asset.value, asset.token?.decimals)
    ) {
      errorText = `Insufficient ${asset.token.symbol} balance`; break
    } else if (
        !isFractional.value
        && asset.token.type !== 'ERC721'
        && Number(asset.balance) < Number(asset.amount)
    ) {
      errorText = `Insufficient ${asset.token.symbol} balance`; break
    }
  }

  for (let asset of assets.value.receive) {
    if (isFractional.value) {
      if (!Number(asset.value)) {
        errorText = 'Enter the amount'; break
      } else if (trade.value) {
        const maxAmount = Number(decimalsOff(trade.value.count1, asset.token.decimals))

        if (Number(asset.value) > maxAmount) {
          errorText = `Maximum ${maxAmount} ${asset.token.symbol}`
        }
      }
    }
  }

  return errorText
})

const steps = ref([
  { title: '1. Join the trade', description: '', id: 'waiting_for_partner' },
  { title: '2. Trade is ready for swap', description: '', id: 'executed' },
  { title: '3. Now you can withdraw your assets', description: '', id: 'swapped' },
  { title: '4. Trade is over', description: '', id: 'withdrawn' },
])

const currentStep = computed(() => {
  return steps.value.find(step => step.id === trade.value?.state)
})

const myDealPoints = computed(() => trade.value?.dealPoints.filter(point => point.owner.toLowerCase() === userStore.address.toLowerCase()) || [])

const canWithdraw = computed(() => {
  return myDealPoints.value.some(point => !point.isWithdrawn)
})

const withLockSettings = computed(() => isFractional.value && Number(trade.value.lockSettings?.secondsToLock))

const shouldWrap = computed(() => trade.value.asset2.symbol === 'gWETH')
const isWaitingForPartner = computed(() => !isFractional.value && trade.value.state === 'waiting_for_partner' && isOwner.value)
const isWhitelisted = computed(() => trade.value?.whitelistedAddresses?.length)
const canTrade = computed(() => trade.value?.whitelistedAddresses.some(address => address.toLowerCase() === userStore.address.toLowerCase()) || isOwner.value)

onMounted(initTrade)

async function initTrade() {
  layoutStore.startLoading()

  trade.value = await fetchTradeById(tradeId.value)
  console.log({ trade: trade.value })

  if (trade.value) {
    if (!isFractional.value && isOwner.value) {
      assets.value = {
        send: [{ token: trade.value.asset1, amount: trade.value.count1, value: trade.value.count1 }],
        receive: [{ token: trade.value.asset2, amount: trade.value.count2, value: trade.value.count2 }],
      }
    } else {
      assets.value = {
        send: [{ token: trade.value.asset2, amount: trade.value.count2, value: trade.value.count2 }],
        receive: [{ token: trade.value.asset1, amount: trade.value.count1, value: trade.value.count1 }],
      }
    }
  } else {
    router.push('/404')
  }

  checkIfAllowed().then()

  layoutStore.stopLoading()
}

async function initValues(side: 'send' | 'receive') {
  if (!isFractional.value || (currentSide.value && side !== currentSide.value)) {
    return
  }

  const isReceive = side === 'receive'

  loadingSide.value = side

  const { sendValue, receiveValue } = await getTokenSwapValues({
    blockchainId: trade.value.blockchainId,
    assets: assets.value,
    priceNom: trade.value?.priceNom,
    priceDenom: trade.value?.priceDenom,
    isReceive,
  })

  // console.log({ isReceive, sendValue, receiveValue })

  if (isReceive) {
    assets.value.send[0].value = sendValue
  } else {
    assets.value.receive[0].value = receiveValue
  }

  loadingSide.value = null
}

async function onSwapClick() {
  layoutStore.startLoading()

  try {
    const receiveAsset = assets.value.receive[0]
    const sendAsset = assets.value.send[0]

    const { transactionHash } = await swap(trade.value.blockchainId.toString(), decimalsOn(receiveAsset.value, receiveAsset.token.decimals))

    layoutStore.openModal('SwapSuccess', {
      sendAsset: sendAsset.token,
      receiveAsset: receiveAsset.token,
      sendAmount: sendAsset.value,
      receiveAmount: receiveAsset.value,
      txHash: transactionHash,
    })

    await updateTrade()

    localStore.addTransaction({
      title: 'Swap',
      description: `Swap in the fractional trade #${trade.value.blockchainId}`,
      url: getTxExplorerUrl(transactionHash),
    })
  } catch (e) {
    console.error(e)
  }

  layoutStore.stopLoading()
  checkIfAllowed().then()
}

async function onExecuteClick() {
  layoutStore.startLoading()

  try {
    const asset = isOwner.value ? trade.value.asset1 : trade.value.asset2
    const amount = isOwner.value ? trade.value.count1 : trade.value.count2

    let ethAmount = null

    if (asset.type === 'currency') {
      ethAmount = amount
    }

    const { transactionHash } = await executeDirectTrade(trade.value.blockchainId.toString(), ethAmount)
    await updateTrade()

    localStore.addTransaction({
      title: 'Execute',
      description: `Execute the direct trade #${trade.value.blockchainId}`,
      url: getTxExplorerUrl(transactionHash),
    })
  } catch (e) {
    console.error(e)
  }

  layoutStore.stopLoading()
}

async function onSwapSidesClick() {
  layoutStore.startLoading()

  try {
    await swapDirectTrade(trade.value.blockchainId.toString())
    await updateTrade()
  } catch (e) {
    console.error(e)
  }

  layoutStore.stopLoading()
}

async function onWithdrawClick() {
  layoutStore.startLoading()

  try {
    const { transactionHash } = await withdrawDirectTrade(trade.value.blockchainId.toString())
    await updateTrade()

    localStore.addTransaction({
      title: 'Withdraw',
      description: `Withdrew the trade #${trade.value.blockchainId}`,
      url: getTxExplorerUrl(transactionHash),
    })
  } catch (e) {
    console.error(e)
  }

  layoutStore.stopLoading()
}

async function checkIfAllowed() {
  if (
      !isFractional.value
      && isOwner.value
      && trade.value?.state !== 'created'
  ) {
    return
  }

  const asset = assets.value.send[0]
  const isNft = asset.token.type === 'ERC721'
  let addressToApprove = ''

  if (isFractional.value) {
    addressToApprove = CONTRACTS.erc20Sale.address
  } else {
    addressToApprove = isNft ? CONTRACTS.directErc721Controller.address : CONTRACTS.directErc20Controller.address
  }

  isAllowed.value = await isAssetApproved(asset, addressToApprove)
}

async function onApproveClick() {
  layoutStore.startLoading()

  try {
    const asset = assets.value.send[0]
    const isNft = asset.token.type === 'ERC721'
    let addressToApprove = ''

    if (isFractional.value) {
      addressToApprove = CONTRACTS.erc20Sale.address
    } else {
      addressToApprove = isNft ? CONTRACTS.directErc721Controller.address : CONTRACTS.directErc20Controller.address
    }

    await approveAsset(asset, addressToApprove)
    await updateTrade()
  } catch (e) {
    console.error(e)
  }

  checkIfAllowed().then()

  layoutStore.stopLoading()
}

function onConnectClick() {
  layoutStore.openModal('ConnectWallet')
}

function onSettingsClick() {
  layoutStore.openModal('TradeActions', { trade: trade.value })
}

function onShareClick() {
  layoutStore.openModal('ShareLink', { url: window.location.href })
}

async function updateTrade() {
  await updateTradeById(trade.value.id)
  await initTrade()
}

function onBlur() {
  currentSide.value = null
}

function onFocus(side: 'receive' | 'send') {
  currentSide.value = side
}
</script>

<style scoped lang="sass">
.page-trade
  &__content
    max-width: 480px
    margin: 0 auto

  &__swapper
    display: flex
    flex-direction: column
    justify-content: center

    &-title
      margin-bottom: 0

    &-header
      display: flex
      justify-content: space-between
      align-items: center
      margin-bottom: 16px

    &-actions
      display: flex
      align-items: center
      gap: 16px

    &-action
      height: 24px
      width: 24px
      cursor: pointer
      color: var(--color-default)
      transition: opacity 400ms ease

      &:hover
        opacity: 0.6

    &-warning
      margin-bottom: 12px

  &__bottom
    padding-top: 20px
    display: flex
    flex-direction: column
    gap: 12px

    &-button
      width: 100%

  &__steps
    margin-top: 16px
</style>