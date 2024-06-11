<template>
  <Page padded class="page-locks">
    <PageSection>
      <div class="heading-4">Your vested positions</div>
<!--      <Input icon="/images/icons/search.svg" placeholder="Search asset address" />-->

      <LockList v-if="locks.length && appStore.currentChain?.isTradesEnabled" :locks="locks" class="page-locks__list" />

      <div v-else class="page-locks__empty">
        No positions available.
        <Link href="/lock" target="_self">Lock</Link>
      </div>
    </PageSection>
  </Page>
</template>

<script setup lang="ts">
import Page from '@/shared/ui/pages/Page.vue'
import PageSection from '@/shared/ui/pages/PageSection.vue'
import Input from '@/shared/ui/Input.vue'
import TradeList from '@/components/TradeList.vue'
import { onMounted, ref, watch } from 'vue'
import Link from '@/shared/ui/Link.vue'
import { useAppStore, useUserStore } from '@/stores'
import { fetchTrades } from '@/entities/trade/api'
import LockList from '@/components/LockList.vue'
import { fetchLocksByAddress } from '@/entities/locker/api'

const appStore = useAppStore()
const userStore = useUserStore()

const locks = ref([])

watch(() => userStore.address, updateLocks)
onMounted(updateLocks)

async function updateLocks() {
  if (!userStore.address) {
    return
  }

  locks.value = await fetchLocksByAddress(userStore.address)

  console.log(locks.value)
}
</script>

<style scoped lang="sass">
.page-locks
  &__list
    margin-top: 24px

  &__empty
    text-align: center
    color: var(--color-secondary)
    margin-top: 36px
</style>