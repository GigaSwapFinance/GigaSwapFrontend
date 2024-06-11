<template>
  <Page padded class="page-create">
    <PageSection class="page-create__content">
      <div class="page-create__swapper-header">
        <div class="heading-4 page-create__swapper-title">Create trade</div>

        <div class="page-create__swapper-actions">
          <Image
              src="/images/icons/settings.svg"
              class="page-create__swapper-action"
              @click="onSettingsClick"
          />
        </div>
      </div>

      <div class="page-create__body">
        <SelectTabs
            v-model="currentTradeType"
            :options="tradeTypes"
            class="page-create__tabs"
        />

        <Swapper
            v-model="assets"
            can-enter-values
            can-select-tokens
            can-switch-sides
            show-balances
            class="page-create__body-swapper"
        />

        <Line />

        <WarningBlock v-if="needToWrap" class="page-create__warning">Only ERC-20 tokens are supported in fractional trades, so you need to wrap ETH into gWETH</WarningBlock>
        <WarningBlock v-else-if="needToReplace" class="page-create__warning">Only ERC-20 tokens are supported in fractional trades, so you need to replace ETH with wrapped ETH. You can unwrap it at any time.</WarningBlock>

        <div class="page-create__bottom">
          <BigButton
              v-if="!userStore.address"
              is-secondary
              class="page-create__bottom-button"
              @click="onConnectClick"
          >Connect Wallet</BigButton>

          <BigButton
              v-else-if="needToWrap"
              :is-disabled="!Number(assets.send[0].value)"
              class="page-create__bottom-button"
              @click="onWrapClick"
          >Wrap <Number>{{ assets.send[0].value }}</Number> {{ assets.send[0].token.symbol }}</BigButton>

          <BigButton
              v-else-if="needToReplace"
              class="page-create__bottom-button"
              @click="onReplaceClick"
          >Replace {{ assets.receive[0].token.symbol }} with gWETH</BigButton>

          <BigButton
              v-else-if="errorText"
              is-disabled
              class="page-create__bottom-button"
          >{{ errorText }}</BigButton>

          <BigButton
              v-else-if="!isAllowed"
              is-secondary
              class="page-create__bottom-button"
              @click="onApproveClick"
          >Allow GigaSwap to use {{ assets.send[0].token.symbol }}</BigButton>

          <BigButton
              v-else
              class="page-create__bottom-button"
              @click="onCreateClick"
          >Create</BigButton>
        </div>
      </div>

      <div class="page-create__audit">
        <Image src="/images/icons/verified.svg" class="page-create__audit-icon" />
        <Link href="https://skynet.certik.com/projects/gigaswap" class="page-create__audit-title">Audited by Certik</Link>
      </div>
    </PageSection>
  </Page>
</template>

<script setup lang="ts">
import type { ISwapperAssets } from '@/shared/types/swapper'

import Page from '@/shared/ui/pages/Page.vue'
import PageSection from '@/shared/ui/pages/PageSection.vue'
import Link from '@/shared/ui/Link.vue'
import Swapper from '@/components/Swapper.vue'
import Line from '@/shared/ui/Line.vue'
import BigButton from '@/shared/ui/BigButton.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useAppStore, useLayoutStore, useLocalStore, useTradeStore, useUserStore } from '@/stores'
import { decimalsOn } from '@/shared/lib/utils/token'
import { CONTRACTS } from '@/shared/const/contracts'
import { createTrade } from '@/services/trade'
import { approveAsset, isAssetApproved } from '@/services/asset'
import SelectTabs from '@/shared/ui/SelectTabs.vue'
import WarningBlock from '@/shared/ui/WarningBlock.vue'
import { unwrapEth, wrapEth } from '@/entities/gweth/api'
import { getTokens } from '@/shared/assets/tokens'
import { getTxExplorerUrl } from '@/shared/const/tokens'

const layoutStore = useLayoutStore()
const tradeStore = useTradeStore()
const userStore = useUserStore()
const appStore = useAppStore()
const localStore = useLocalStore()

const assets = ref<ISwapperAssets>({ send: [], receive: [] })
const isAllowed = ref(true)
const tradeTypes = ref([
  { id: 'fractional', title: 'Fractional' },
  { id: 'direct', title: 'Direct' },
])
const currentTradeType = ref(tradeTypes.value[0])
const isDirect = computed(() => currentTradeType.value.id === 'direct')

const needToWrap = computed(() => !isDirect.value && assets.value.send[0]?.token.type === 'currency')
const needToReplace = computed(() => !isDirect.value && assets.value.receive[0]?.token.type === 'currency')

watch(() => currentTradeType.value, () => tradeStore.tradeType = currentTradeType.value.id)
watch(() => assets.value, checkIfAllowed, { deep: true })

onMounted(tradeStore.resetSettings)

function onSettingsClick() {
  layoutStore.openModal('CreateSettings', {
    receiveAsset: assets.value.send[0]?.token,
    isDirect: isDirect.value,
  })
}

// ----------------

const errorText = computed(() => {
  const assetList = [...assets.value.send, ...assets.value.receive]
  let errorText = ''

  if (!appStore?.currentChain?.isTradesEnabled) {
    return 'Switch to another chain'
  }

  if (!assetList.length) {
    return 'Select a token'
  }

  for (let asset of assets.value.send) {
    const isNft = asset.token.type === 'ERC721'

    if (isNft && tradeStore.tradeType === 'fractional') {
      errorText = 'NFTs available only in direct trades'
    } else if (!asset.token?.type) {
      errorText = 'Select a token'; break
    } else if (!Number(asset.value)) {
      errorText = 'Enter the amount'; break
    } else if (!isNft && Number(asset.balance) < decimalsOn(asset.value, asset.token?.decimals)) {
      errorText = `Insufficient ${asset.token.symbol} balance`; break
    }
  }

  for (let asset of assets.value.receive) {
    if (!asset.token?.address) {
      errorText = 'Select a token'; break
    } else if (!Number(asset.value)) {
      errorText = 'Enter the amount'; break
    }

    // else if (trade.value) {
    //   const maxAmount = Number(decimalsOff(props.trade.count1, asset.token.decimals))
    //
    //   if (Number(asset.value) > maxAmount) {
    //     errorText = `Maximum ${maxAmount} ${asset.token.symbol}`
    //   }
    // }
  }

  return errorText
})

async function checkIfAllowed() {
  const asset = assets.value.send[0]

  if (!asset) {
    return
  }

  const isNft = asset.token?.type === 'ERC721'
  const isCurrency = asset.token?.type === 'currency'
  let addressToApprove = ''

  if (!asset.token || isCurrency) {
    return
  }

  if (!isDirect.value) {
    addressToApprove = CONTRACTS.erc20Sale.address
  } else {
    addressToApprove = isNft ? CONTRACTS.directErc721Controller.address : CONTRACTS.directErc20Controller.address
  }

  isAllowed.value = await isAssetApproved(asset, addressToApprove)
}

function onConnectClick() {
  layoutStore.openModal('ConnectWallet')
}

async function onApproveClick() {
  const sendAsset = assets.value.send[0]

  layoutStore.startLoading()

  try {
    const asset = assets.value.send[0]
    const isNft = asset.token.type === 'ERC721'
    let addressToApprove = ''

    if (!isDirect.value) {
      addressToApprove = CONTRACTS.erc20Sale.address
    } else {
      addressToApprove = isNft ? CONTRACTS.directErc721Controller.address : CONTRACTS.directErc20Controller.address
    }

    await approveAsset(sendAsset, addressToApprove)
  } catch (e) {
    console.error(e)
  }

  checkIfAllowed()

  layoutStore.stopLoading()
}

async function onWrapClick() {
  layoutStore.startLoading()

  try {
    const asset = assets.value.send[0]
    const amount = decimalsOn(asset.value, asset.token.decimals)

    await wrapEth(amount)

    assets.value.send[0].token = getTokens(appStore.currentChain.name)[0]
  } catch (e) {
    console.error(e)
  }

  layoutStore.stopLoading()
}

function onReplaceClick() {
  assets.value.receive[0].token = getTokens(appStore.currentChain.name)[0]
}

// ------------------

async function onCreateClick() {
  layoutStore.startLoading()

  try {
    const tradeType = isDirect.value ? 'direct' : 'fractional'

    let partnerAddress = null

    if (tradeStore.isWhitelistEnabled) {
      partnerAddress = tradeStore.whitelistedAddress
    }

    const { newTrade, transactionHash } = await createTrade({
      assets: assets.value,
      type: tradeType,
      partnerAddress,
    })

    layoutStore.openModal('CreationSuccess', {
      tradeId: newTrade?.id,
      txHash: transactionHash,
      isDirect: isDirect.value,
    })

    localStore.addTransaction({
      title: 'Trade created',
      description: `Created ${tradeType} trade #${newTrade?.id}`,
      url: getTxExplorerUrl(transactionHash),
    })
  } catch (e) {
    console.error(e)
  }

  layoutStore.stopLoading()
}
</script>

<style scoped lang="sass">
.page-create
  display: flex
  flex-direction: column
  align-items: center

  &__tabs
    width: auto
    margin-bottom: 8px

  &__swapper
    display: flex
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

  &__audit
    display: flex
    align-items: center
    justify-content: center
    gap: 6px
    margin-top: 36px

    &-icon
      height: 16px
      width: 16px
      color: var(--color-primary)

    &-title
      font-size: 14px

  &__bottom
    padding-top: 20px

    &-button
      width: 100%

  &__content
    max-width: 480px

  &__warning
    margin-top: 16px
    animation: fadeIn 500ms ease
</style>