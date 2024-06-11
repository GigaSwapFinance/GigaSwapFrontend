<template>
  <Page padded class="page-wrap">
    <PageSection class="page-wrap__content">
      <div class="page-wrap__header">
        <div class="heading-4 page-wrap__title">Wrap ETH</div>
      </div>

      <div class="page-wrap__body">
        <Swapper
            v-model="assets"
            can-switch-sides
            can-enter-values
            show-balances
            class="page-wrap__body-swapper"
            @update:new-token-value="initValues"
        />

        <Line />

        <div class="page-wrap__bottom">
          <BigButton
              v-if="!userStore.address"
              is-secondary
              class="page-wrap__bottom-button"
              @click="onConnectClick"
          >Connect Wallet</BigButton>

          <BigButton
              v-else-if="errorText"
              is-disabled
              class="page-wrap__bottom-button"
          >{{ errorText }}</BigButton>

          <BigButton
              v-else
              class="page-wrap__bottom-button"
              @click="onWrapClick"
          >{{ isWrap ? 'Wrap' : 'Unwrap' }}</BigButton>
        </div>
      </div>
    </PageSection>
  </Page>
</template>

<script setup lang="ts">
import Page from '@/shared/ui/pages/Page.vue'
import PageSection from '@/shared/ui/pages/PageSection.vue'
import Swapper from '@/components/Swapper.vue'
import { computed, onMounted, ref } from 'vue'
import type { IAsset, ISwapperAssets } from '@/shared/types/swapper'
import { useAppStore, useLayoutStore, useUserStore } from '@/stores'
import TOKENS from '@/shared/assets/tokens'
import BigButton from '@/shared/ui/BigButton.vue'
import { decimalsOn } from '@/shared/lib/utils/token'
import Line from '@/shared/ui/Line.vue'
import { unwrapEth, wrapEth } from '@/entities/gweth/api'
import { useRoute } from 'vue-router'

const appStore = useAppStore()
const userStore = useUserStore()
const layoutStore = useLayoutStore()
const route = useRoute()

const assets = ref<ISwapperAssets>({ send: [], receive: [] })

const isWrap = computed(() => assets.value.send[0]?.token?.type === 'currency')

const errorText = computed(() => {
  let errorText = ''

  if (!appStore?.currentChain?.isTradesEnabled) {
    return 'Switch to another chain'
  }

  for (let asset of assets.value.send) {
    if (!Number(asset.value)) {
      errorText = 'Enter the amount'; break
    } else if (Number(asset.balance) < decimalsOn(asset.value, asset.token?.decimals)) {
      errorText = `Insufficient ${asset.token.symbol} balance`; break
    }
  }

  for (let asset of assets.value.receive) {
    if (!Number(asset.value)) {
      errorText = 'Enter the amount'; break
    }
  }

  return errorText
})

onMounted(() => {
  const isUnwrap = Object.keys(route.query).includes('unwrap')

  if (isUnwrap) {
    switchSides()
  }

  const currentChain = appStore.currentChain

  const ethToken: IAsset = {
    type: 'currency',
    symbol: 'ETH',
    name: 'Ethereum',
    logoURI: '/images/currencies/eth.svg',
    decimals: 18,
  }

  assets.value.send.push({
    token: ethToken,
    value: null,
  })

  assets.value.receive.push({
    token: TOKENS[currentChain.name].find(a => a.symbol === 'gWETH'),
    value: null,
  })
})

function switchSides() {
  assets.value = { send: assets.value?.receive, receive: assets.value?.send }
}

function initValues(side: 'send' | 'receive') {
  if (side === 'send') {
    const typedValue = assets.value.send[0].value
    assets.value.receive[0].value = typedValue
  } else {
    const typedValue = assets.value.receive[0].value
    assets.value.send[0].value = typedValue
  }
}

async function onWrapClick() {
  layoutStore.startLoading()

  try {
    const asset = assets.value.send[0]
    const amount = decimalsOn(asset.value, asset.token.decimals)

    isWrap.value
      ? await wrapEth(amount)
      : await unwrapEth(amount)

    window.location.reload()
  } catch (e) {
    console.error(e)
  }

  layoutStore.stopLoading()
}

function onConnectClick() {
  layoutStore.openModal('ConnectWallet')
}
</script>

<style scoped lang="sass">
.page-wrap
  &__content
    max-width: 480px
    margin: 0 auto

  &__bottom
    padding-top: 20px

    &-button
      width: 100%

  &__title
    margin-bottom: 0

  &__header
    display: flex
    justify-content: space-between
    align-items: center
    margin-bottom: 16px
</style>