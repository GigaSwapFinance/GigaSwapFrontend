<template>
  <div class="trade-card" @click="onClick">
    <div class="trade-card__header">
      <TokenLogoPairs :tokens="[trade.asset1, trade.asset2]" />
      <div class="trade-card__title">{{ trade.asset1.type === 'ERC721' ? `${trade.asset1.symbol} #${trade.count1}` : trade.asset1.symbol }} <span>/ {{ trade.asset2.symbol }}</span></div>
    </div>

    <Line />

    <div class="trade-card__parameters">
      <div class="trade-card__parameter">
        <div class="trade-card__parameter-title">Trade type</div>
        <div class="trade-card__parameter-value">{{ capitalize(trade.type) }}</div>
      </div>

      <div class="trade-card__parameter">
        <div class="trade-card__parameter-title">Trade ID</div>
        <div class="trade-card__parameter-value">#{{ trade.id }}</div>
      </div>

      <div class="trade-card__parameter">
        <div class="trade-card__parameter-title">Offered</div>

        <div v-if="trade.asset1.type === 'ERC721'" class="trade-card__parameter-value">
          <Number>{{ 1 }}</Number> {{ trade.asset1.symbol }}
        </div>

        <div v-else class="trade-card__parameter-value">
          <Number>{{ decimalsOff(trade.count1, trade.asset1.decimals) }}</Number> {{ trade.asset1.symbol }}
        </div>
      </div>

      <div class="trade-card__parameter">
        <div class="trade-card__parameter-title">Wants</div>

        <div v-if="trade.asset1.type === 'ERC721'" class="trade-card__parameter-value">
          <Number>{{ 1 }}</Number> {{ trade.asset2.symbol }}
        </div>

        <div v-else class="trade-card__parameter-value">
          <Number>{{ decimalsOff(Number(trade.count1) * price, trade.asset1.decimals) }}</Number> {{ trade.asset2.symbol }}
        </div>
      </div>

      <div class="trade-card__parameter">
        <div class="trade-card__parameter-title">Price</div>

        <div v-if="trade.asset1.type === 'ERC721'" class="trade-card__parameter-value">
          <Number>1</Number> {{ trade.asset1.symbol }} = <Number :decimals="trade.asset2.decimals">{{ decimalsOff(trade.count2, trade.asset2.decimals) }}</Number> {{ trade.asset2.symbol }}
        </div>

        <div v-else class="trade-card__parameter-value">
          <Number>1</Number> {{ trade.asset1.symbol }} = <Number :decimals="trade.asset2.decimals">{{ price }}</Number> {{ trade.asset2.symbol }}
        </div>
      </div>

      <div class="trade-card__parameter">
        <div class="trade-card__parameter-title">Creator</div>

        <div class="trade-card__parameter-value">
          <Link :href="getWalletExplorerUrl(trade.owner)">{{ shortAddress(trade.owner) }}</Link>
        </div>
      </div>

<!--      <div class="trade-card__parameter">-->
<!--        <div class="trade-card__parameter-title">Volume 24h</div>-->
<!--        <div class="trade-card__parameter-value">-->
<!--          <Number prefix="$">0</Number>-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script setup lang="ts">
import Link from '@/shared/ui/Link.vue'
import Line from '@/shared/ui/Line.vue'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import BigNumber from 'bignumber.js'
import { decimalsOff } from '@/shared/lib/utils/token'
import { capitalize } from '@/shared/lib/utils/string'
import TokenLogoPairs from '@/components/TokenLogoPairs.vue'
import { shortAddress } from '@/shared/lib/utils/address'
import { getWalletExplorerUrl } from '@/shared/const/tokens'

const props = defineProps({
  trade: {
    type: Object,
    required: true,
  }
})

const router = useRouter()

const price = computed(() => {
  const priceDenom = decimalsOff(props.trade.priceDenom, props.trade.asset1.decimals)
  const priceNom = decimalsOff(props.trade.priceNom, props.trade.asset2.decimals)

  return new BigNumber(priceNom).dividedBy(priceDenom).toString()
})

function onClick() {
  router.push(`/trade/${props.trade.id}`)
}
</script>

<style scoped lang="sass">
.trade-card
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
    gap: 8px

  &__title
    font-family: var(--font-1)
    font-weight: 700
    font-size: 16px

    span
      color: var(--color-secondary)
      font-size: 14px

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