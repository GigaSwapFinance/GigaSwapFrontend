<template>
  <Page padded class="page-lock">
    <PageSection class="page-lock__content">
      <div class="page-lock__header">
        <div class="heading-4 page-lock__title">Lock tokens</div>
      </div>

      <div class="page-lock__body">
        <Locker
            v-model="lockerData"
            class="page-lock__body-swapper"
        />

        <Line />

        <div class="page-lock__bottom">
          <BigButton
              v-if="!userStore.address"
              is-secondary
              class="page-lock__bottom-button"
              @click="onConnectClick"
          >Connect Wallet</BigButton>

          <BigButton
              v-else-if="!isAllowed"
              is-secondary
              class="page-lock__bottom-button"
              @click="onApproveClick"
          >Allow GigaSwap Locker to use {{ lockerData.assets[0]?.token.symbol }}</BigButton>

          <BigButton
              v-else-if="errorText"
              is-disabled
              class="page-lock__bottom-button"
          >{{ errorText }}</BigButton>

          <BigButton
              v-else
              class="page-lock__bottom-button"
              @click="onLockClick"
          >Lock</BigButton>

          <Link
              with-icon
              href="/locks"
              target="_self"
              class="page-lock__bottom-link"
          >View my locked positions</Link>
        </div>
      </div>
    </PageSection>
  </Page>
</template>

<script setup lang="ts">
import Page from '@/shared/ui/pages/Page.vue'
import PageSection from '@/shared/ui/pages/PageSection.vue'
import BigButton from '@/shared/ui/BigButton.vue'
import Line from '@/shared/ui/Line.vue'
import Locker from '@/components/Locker.vue'
import Link from '@/shared/ui/Link.vue'
import { computed, ref, watch } from 'vue'
import { useAppStore, useLayoutStore, useUserStore } from '@/stores'
import { decimalsOn } from '@/shared/lib/utils/token'
import type { ILockerValue } from '@/shared/types/locker'
import { CONTRACTS } from '@/shared/const/contracts'
import { approveAsset, isAssetApproved } from '@/services/asset'
import { lockTokens } from '@/entities/locker'

const appStore = useAppStore()
const userStore = useUserStore()
const layoutStore = useLayoutStore()

const lockerData = ref<ILockerValue>({
  assets: [],
  unlockDate: null,
})

const isAllowed = ref(true)

const errorText = computed(() => {
  let errorText = ''

  if (!appStore?.currentChain?.isTradesEnabled) {
    return 'Switch to another chain'
  }

  const assets = lockerData.value.assets

  if (!assets.length) {
    return 'Select a token'
  }

  if (!lockerData.value.unlockDate) {
    return 'Select a date'
  }

  if (Number(lockerData.value.unlockDate) < Date.now()) {
    return 'Select a date in the future'
  }

  for (let asset of assets) {
    if (!Number(asset.value)) {
      errorText = 'Enter the amount'; break
    } else if (Number(asset.balance) < decimalsOn(asset.value, asset.token?.decimals)) {
      errorText = `Insufficient ${asset.token.symbol} balance`; break
    }
  }

  return errorText
})

watch(() => lockerData.value.assets, checkIfAllowed, { deep: true })

async function onLockClick() {
  layoutStore.startLoading()

  try {
    const asset = lockerData.value.assets[0]
    const amount = decimalsOn(asset.value, asset.token.decimals)
    const date = new Date(lockerData.value.unlockDate).getTime() / 1000

    await lockTokens(asset.token.address, amount, date)

    layoutStore.openModal('Success', {
      title: 'Success',
      description: `You locked the tokens. Vested position will be visible soon.`,
    })
  } catch (e) {
    console.error(e)
  }

  layoutStore.stopLoading()
}

async function checkIfAllowed() {
  const asset = lockerData.value.assets[0]

  if (!asset.value) {
    return
  }

  isAllowed.value = await isAssetApproved(asset, CONTRACTS.locker.address)
}

async function onApproveClick() {
  const asset = lockerData.value.assets[0]

  layoutStore.startLoading()

  try {
    await approveAsset(asset, CONTRACTS.locker.address)
  } catch (e) {
    console.error(e)
  }

  checkIfAllowed()

  layoutStore.stopLoading()
}

function onConnectClick() {
  layoutStore.openModal('ConnectWallet')
}
</script>

<style scoped lang="sass">
.page-lock
  &__content
    max-width: 480px
    margin: 0 auto

  &__bottom
    padding-top: 20px
    display: flex
    flex-direction: column
    align-items: center
    gap: 24px

    &-button
      width: 100%

    &-link
      text-align: center
      //width: 100%

  &__title
    margin-bottom: 0

  &__header
    display: flex
    justify-content: space-between
    align-items: center
    margin-bottom: 16px
</style>