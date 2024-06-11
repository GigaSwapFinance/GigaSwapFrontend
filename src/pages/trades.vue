<template>
  <Page padded class="page-trades">
    <PageSection>
      <div class="page-trades__header">
        <div class="heading-4 page-trades__header-title">Trades</div>

        <SelectTabs
            v-if="userStore.address"
            v-model="currentTradeType"
            :options="tradeTypes"
            class="page-trades__header-tabs"
        />
      </div>

<!--      <Input icon="/images/icons/search.svg" placeholder="Search asset address" />-->

      <TradeList v-if="trades.length && appStore.currentChain?.isTradesEnabled" :trades="trades" class="page-trades__list" />

      <div v-else class="page-trades__empty">
        No trades available.
        <Link href="/create" target="_self">Create</Link>
      </div>
    </PageSection>
  </Page>
</template>

<script setup lang="ts">
import Page from '@/shared/ui/pages/Page.vue'
import PageSection from '@/shared/ui/pages/PageSection.vue'
import Input from '@/shared/ui/Input.vue'
import TradeList from '@/components/TradeList.vue'
import { computed, onMounted, ref, watch } from 'vue'
import Link from '@/shared/ui/Link.vue'
import { useAppStore, useUserStore } from '@/stores'
import { fetchTrades, fetchTradesByAddress } from '@/entities/trade/api'
import SelectTabs from '@/shared/ui/SelectTabs.vue'

const appStore = useAppStore()
const userStore = useUserStore()

const trades = ref([])
const tradeTypes = ref([
  { id: 'all', title: 'All' },
  { id: 'my', title: 'My' },
])
const currentTradeType = ref(tradeTypes.value[0])

const onlyMy = computed(() => currentTradeType.value.id === 'my')

watch(() => onlyMy.value, getTrades)
watch(() => appStore.currentChain?.name, getTrades)

onMounted(getTrades)

async function getTrades() {
  if (onlyMy.value) {
    trades.value = await fetchTradesByAddress(userStore.address)
  } else {
    trades.value = await fetchTrades()
  }

  console.log({ trades: trades.value })
}
</script>

<style lang="sass">
.page-trades
  &__list
    margin-top: 24px

  &__empty
    text-align: center
    color: var(--color-secondary)
    margin-top: 36px

  &__header
    display: flex
    align-items: center
    justify-content: space-between
    gap: 12px
    margin-bottom: 24px

    &-title
      margin-bottom: 0

    &-tabs
      .select-tabs__tab
        padding: 4px 12px
</style>