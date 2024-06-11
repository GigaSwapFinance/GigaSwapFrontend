<template>
  <div class="lock-card">
    <div class="lock-card__header">
      <div class="lock-card__header-info">
        <Image :src="lock.asset.logoURI" class="lock-card__logo" />
        <div class="lock-card__title"><Number>{{ decimalsOff(lock.amount, lock.asset.decimals) }}</Number> {{ lock.asset.symbol }}</div>
      </div>

      <Button
          is-primary
          :is-disabled="!canUnlock"
          @click="onUnlockClick"
      >Claim</Button>
    </div>

    <Line />

    <div class="lock-card__parameters">
      <div class="lock-card__parameter">
        <div class="lock-card__parameter-title">Unlock type</div>
        <div class="lock-card__parameter-value">{{ isByPeriod ? 'By period' : 'One-time' }}</div>
      </div>

      <div class="lock-card__parameter">
        <div class="lock-card__parameter-title">Lock ID</div>
        <div class="lock-card__parameter-value">#{{ lock.blockchainId }}</div>
      </div>

<!--      <div class="lock-card__parameter">-->
<!--        <div class="lock-card__parameter-title">Locked</div>-->

<!--        <div v-if="trade.asset1.type === 'ERC721'" class="lock-card__parameter-value">-->
<!--          100 DAI-->

<!--&lt;!&ndash;          <Number>{{ 1 }}</Number> {{ trade.asset1.symbol }}&ndash;&gt;-->
<!--        </div>-->

<!--        <div v-else class="lock-card__parameter-value">-->
<!--          <Number>{{ decimalsOff(trade.count1, trade.asset1.decimals) }}</Number> {{ trade.asset1.symbol }}-->
<!--        </div>-->
<!--      </div>-->

      <div class="lock-card__parameter">
        <div class="lock-card__parameter-title">Unlock date</div>

        <div class="lock-card__parameter-value">
          {{ getTimeWithDate(lock.unlockDate, true) }}
        </div>
      </div>

      <div class="lock-card__parameter">
        <div class="lock-card__parameter-title">Claim in</div>
        <div class="lock-card__parameter-value">
          <Countdown :end-date="new Date(isByPeriod ? lock.nextUnlockDate : lock.unlockDate)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Line from '@/shared/ui/Line.vue'
import { getTimeWithDate } from '@/shared/lib/utils/date'
import Countdown from '@/shared/ui/Countdown.vue'
import Button from '@/shared/ui/Button.vue'
import { computed } from 'vue'
import { useLayoutStore } from '@/stores'
import { unlockPosition } from '@/entities/locker'
import { decimalsOff } from '@/shared/lib/utils/token'
import Number from '@/shared/ui/Number.vue'

const props = defineProps({
  lock: {
    type: Object,
    required: true,
  }
})

const layoutStore = useLayoutStore()

const canUnlock = computed(() => props.lock.unlockDate <= Date.now())
const isByPeriod = computed(() => props.lock.nextUnlockDate)

async function onUnlockClick() {
  layoutStore.startLoading()

  try {
    await unlockPosition(props.lock.blockchainId)

    layoutStore.openModal('Success', {
      title: 'Success',
      description: `You withdrew your ${props.lock.asset.symbol}`,
    })
  } catch (e) {
    console.error(e)
  }

  layoutStore.stopLoading()
}
</script>

<style scoped lang="sass">
.lock-card
  border: 1px solid var(--background-stroke)
  padding: 16px
  border-radius: 12px
  box-shadow: var(--shadow-card)
  display: flex
  flex-direction: column
  gap: 16px
  background-color: var(--background-default)
  cursor: pointer

  &__header
    display: flex
    align-items: center
    justify-content: space-between
    gap: 8px

    &-info
      display: flex
      align-items: center
      gap: 8px

  &__logo
    height: 32px
    width: 32px

  &__title
    font-family: var(--font-1)
    font-weight: 700
    font-size: 16px

  &__parameters
    display: grid
    grid-template-columns: 1fr 1fr
    row-gap: 16px

  &__parameter
    &:nth-child(2n)
      border-left: 1px solid var(--background-stroke)
      text-align: right

    &-title
      color: var(--color-secondary)
      margin-bottom: 4px
      font-size: 14px

    &-value
      font-weight: 600
      font-size: 14px
</style>