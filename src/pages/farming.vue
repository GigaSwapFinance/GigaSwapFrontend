<template>
  <Page class="page-farming">
    <PageSection class="page-farming__block">
      <InfoBlock
          title="Farming"
          description="Lock your $GIGA tokens to harvest valuable rewards every week"
          image="/images/gigaswap/arts/throne.png"
      >
        <BigButton class="info-block__button" @click="onStartClick">Start farming</BigButton>
      </InfoBlock>
    </PageSection>

    <PageSection class="page-farming__section page-farming__stats">
      <div class="page-farming__stats-header">
        <div class="page-farming__stats-title heading-4">Overview</div>
      </div>

      <div class="page-farming__stats-body">
        <StatsBlock
            v-if="periodEndDate"
            title="End of current interval"
            icon="/images/icons/clock.svg"
            class="page-farming__stats-block"
        >
          <Countdown :end-date="periodEndDate" />
        </StatsBlock>

        <StatsBlock
            title="Locked $GIGA"
            icon="/images/icons/lock.svg"
            class="page-farming__stats-block"
        >
          <Number decimals="0">{{ decimalsOff(tokenLockedAmountTotal, GIGA_TOKEN?.decimals) }}</Number>
        </StatsBlock>

        <StatsBlock
            title="$GIGA price"
            icon="/images/gigaswap/logo-head-only.svg"
            class="page-farming__stats-block"
        >
          <Number prefix="$" :prevent-long-zero="false">{{ tokenPrice }}</Number>
        </StatsBlock>

        <StatsBlock
            title="$GIGA total supply"
            icon="/images/icons/wallet-2.svg"
            class="page-farming__stats-block"
        >
          <Number>{{ 90320000000 }}</Number>
        </StatsBlock>
      </div>
    </PageSection>

    <PageSection class="page-farming__locking" id="lock-form">
      <div class="page-farming__lock">
        <div class="heading-4">Manage your $GIGA tokens</div>

        <LockTokens
            :token-balance="tokenBalance"
            :token-locked-amount="tokenLockedAmount"
            @action="onLockAction"
        />

        <CropsList
            v-if="assetsToHarvest.length"
            :assets="assetsToHarvest"
            class="page-farming__list"
            @harvest="onHarvest"
        />
      </div>
    </PageSection>
  </Page>
</template>

<script setup lang="ts">
import Page from '@/shared/ui/pages/Page.vue'
import PageSection from '@/shared/ui/pages/PageSection.vue'
import InfoBlock from '@/components/InfoBlock.vue'
import BigButton from '@/shared/ui/BigButton.vue'
import LockTokens from '@/components/LockTokens.vue'
import StatsBlock from '@/components/StatsBlock.vue'
import { scrollToElementById } from '@/shared/lib/utils/scroll'
import { onMounted, ref, watch } from 'vue'
import {
  claimRewards,
  getClaimAmounts,
  getEthInFarming,
  getLockedTokensAmount, getNextIntervalDate, getTotalLockedTokensAmount,
  lockTokens,
  unlockTokens,
} from '@/entities/farming/api'
import { useAppStore, useLayoutStore, useUserStore } from '@/stores'
import { getBalance } from '@/entities/account/api/getBalance'
import { GIGA_TOKEN, GIGA_TOKEN_ADDRESS } from '@/shared/const/tokens'
import CropsList from '@/components/CropsList.vue'
import { decimalsOff } from '@/shared/lib/utils/token'
import Countdown from '@/shared/ui/Countdown.vue'
import TOKENS from '@/shared/assets/tokens'
import { fetchTokenPriceByAddress } from '@/entities/token/api'
import { CONTRACTS } from '@/shared/const/contracts'

const userStore = useUserStore()
const appStore = useAppStore()
const layoutStore = useLayoutStore()

const assets = ref(TOKENS.farming || [])
const tokenBalance = ref(null)
const tokenLockedAmount = ref(null)
const tokenLockedAmountTotal = ref(null)
const tokenPrice = ref(null)
const assetsToHarvest = ref([])
const periodEndDate = ref(null)

onMounted(() => {
  initData()
  initTokenPrice()
})
watch(() => appStore.chainId, initData)
watch(() => userStore.address, initData)

function onStartClick() {
  scrollToElementById('lock-form')
}

async function onLockAction({ type, amount }) {
  layoutStore.startLoading()

  try {
    type === 'lock'
        ? await lockTokens(amount)
        : await unlockTokens(amount)

    initData()
  } catch (e) {
    console.error(e)
  }

  layoutStore.stopLoading()
}

async function onHarvest({ assetAddresses, withNative }) {
  console.log({ assetAddresses, withNative })

  layoutStore.startLoading()

  try {
    await claimRewards(assetAddresses, withNative)
    await initData()
  } catch (e) {
    console.error(e)
  }

  layoutStore.stopLoading()
}

async function initData() {
  if (!userStore.address || !appStore.currentChain.isFarmingEnabled) {
    return
  }

  const [
    lockedAmountTotal,
    lockedAmount,
    claimAmounts,
    nativeBalance,
    gigaTokenBalance,
    endDate,
  ] = await Promise.all([
    getTotalLockedTokensAmount(),
    getLockedTokensAmount(userStore.address),
    getClaimAmounts(assets.value, userStore.address),
    getEthInFarming(),
    getBalance(CONTRACTS.token.address),
    getNextIntervalDate(),
  ])

  console.log({
    lockedAmount,
    lockedAmountTotal,
    claimAmounts,
    nativeBalance,
    gigaTokenBalance,
    endDate,
  })

  tokenBalance.value = gigaTokenBalance
  tokenLockedAmount.value = lockedAmount
  tokenLockedAmountTotal.value = lockedAmountTotal
  assetsToHarvest.value = claimAmounts.filter(asset => Number(asset.amount))
  periodEndDate.value = new Date(endDate)
}

async function initTokenPrice() {
  tokenPrice.value = await fetchTokenPriceByAddress(GIGA_TOKEN_ADDRESS)
}
</script>

<style scoped lang="sass">
.page-farming
  &__block
    background-color: var(--background-secondary)

  &__locking
    background-color: var(--background-secondary)
    padding: 64px 0

  &__lock
    display: flex
    flex-direction: column
    align-items: center

  &__overview
    padding: 36px 0

  &__stats
    padding: 54px 16px 96px

    &-body
      display: flex
      gap: 16px
      width: 100%

    &-block
      width: 100%

  &__list
    margin-top: 36px

  @media screen and (max-width: $breakpointMobile)
    &__stats
      padding: 36px 16px

      &-body
        flex-direction: column
</style>