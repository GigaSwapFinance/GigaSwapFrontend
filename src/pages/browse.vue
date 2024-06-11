<template>
  <Page padded class="page-browse">
    <PageSection>
      <div class="page-browse__header">
        <div class="heading-4 page-browse__header-title">Fractional Trades</div>
      </div>

      <TradeList v-if="trades.length && appStore.currentChain?.isTradesEnabled" :trades="trades" class="page-browse__list" />

      <div v-else class="page-browse__empty">
        No trades available.
        <Link href="/create" target="_self">Create</Link>
      </div>
    </PageSection>

    <PageSection>
      <div class="page-browse__header">
        <div class="heading-4 page-browse__header-title">Direct Trades</div>
      </div>

      <TradeList v-if="trades.length && appStore.currentChain?.isTradesEnabled" :trades="trades" class="page-browse__list" />

      <div v-else class="page-browse__empty">
        No trades available.
        <Link href="/create" target="_self">Create</Link>
      </div>
    </PageSection>
  </Page>
</template>

<script setup lang="ts">
import Page from '@/shared/ui/pages/Page.vue'
import PageSection from '@/shared/ui/pages/PageSection.vue'
import TradeList from '@/components/TradeList.vue'
import { onMounted, ref } from 'vue'
import Link from '@/shared/ui/Link.vue'
import { useAppStore, useUserStore } from '@/stores'
import { fetchTrades } from '@/entities/trade/api'

const appStore = useAppStore()
const userStore = useUserStore()

const trades = ref([])

onMounted(async () => {
  trades.value = await fetchTrades()
})
</script>

<style lang="sass">
.page-browse
  display: flex
  flex-direction: column
  gap: 36px

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
</style>