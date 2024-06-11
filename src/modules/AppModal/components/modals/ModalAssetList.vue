<template>
  <div class="modal-asset-list">
    <ModalCloseButton @click="emit('closeModal')" />

    <div class="modal-asset-list__header">
      <div class="modal-asset-list__title heading-4">Select asset</div>

      <Input
          v-model="filterText"
          icon="/images/icons/search.svg"
          placeholder="Search name or address"
          class="modal-asset-list__header-search"
      />

      <Tabs
          v-model="currentAssetType"
          :options="assetTypes"
      />

      <Line />
    </div>

    <div class="modal-asset-list__body">
      <div v-if="filteredTokens.length" :key="currentAssetType" class="modal-asset-list__list">
        <div
            v-for="asset in filteredTokens"
            class="modal-asset-list__asset"
            @click="onAssetClick(asset)"
        >
          <Image
              :src="asset.logoURI"
              :alternative-src="currentAssetType.id === 'nfts' ? '/images/icons/nft.svg' : '/images/icons/question-mark.svg'"
              class="modal-asset-list__asset-icon"
          />

          <div class="modal-asset-list__asset-info">
            <div class="modal-asset-list__asset-section">
              <div class="modal-asset-list__asset-title">{{ asset.symbol }}</div>
              <div class="modal-asset-list__asset-hint">
                {{ asset.name }}

                <Image
                    v-if="asset.type !== 'currency'"
                    src="/images/icons/etherscan.svg"
                    class="modal-asset-list__asset-link"
                    @click.stop="onLinkClick(asset)"
                />

                <Image
                    v-if="asset.type === 'currency'"
                    src="/images/icons/exchange.svg"
                    class="modal-asset-list__asset-link"
                    @click.stop="onWrapClick()"
                />
              </div>
            </div>

            <div v-if="asset.balance" class="modal-asset-list__asset-section">
              <div class="modal-asset-list__asset-subtitle">
                <Number>{{ decimalsOff(asset.balance, asset.decimals) }}</Number>
              </div>

<!--              <div class="modal-asset-list__asset-hint">-->
<!--                <Number prefix="$">0</Number>-->
<!--              </div>-->
            </div>
          </div>

<!--          <div class="modal-asset-list__asset-actions">-->
<!--            <Image src="/images/icons/search.svg" class="modal-asset-list__asset-action" />-->
<!--          </div>-->
        </div>
      </div>

      <div v-else class="modal-asset-list__empty">No results found.</div>
    </div>
  </div>
</template>

<script setup>
import ModalCloseButton from '@/modules/AppModal/components/ModalCloseButton.vue'
import Input from '@/shared/ui/Input.vue'
import Line from '@/shared/ui/Line.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { decimalsOff, tokenFilter } from '@/shared/lib/utils/token'
import { getTokenExplorerUrl } from '@/shared/const/tokens'
import { useAppStore, useUserStore, useValuesStore } from '@/stores'
import { getBalance, getEthBalance } from '@/entities/account/api/getBalance'
import Tabs from '@/shared/ui/Tabs.vue'
import { getTokens } from '@/shared/assets/tokens'
import { fetchTokenByAddress } from '@/entities/token/api'
import NFTS from '@/shared/assets/nfts'
import { fetchNftCollectionByAddress } from '@/entities/nft/api'
import { useRouter } from 'vue-router'

const props = defineProps({
  componentId: {
    type: String,
    required: true,
  },

  availableTypes: {
    type: Array,
  },
})

const emit = defineEmits(['closeModal'])
const appStore = useAppStore()
const valuesStore = useValuesStore()
const userStore = useUserStore()
const router = useRouter()

const filterText = ref('')
const tokens = ref([])
const nfts = ref([])
const searchedToken = ref(null)

const assetTypes = ref([
  { id: 'tokens', title: 'Tokens' },
])

const currentAssetType = ref(assetTypes.value[0])

const filteredTokens = computed(() => {
  const list = currentAssetType.value.id === 'tokens' ? tokens.value : nfts.value

  if (filterText.value) {
    if (searchedToken.value) {
      list.push(searchedToken.value)
    }

    return list.filter(token => tokenFilter(token, filterText.value))
  }

  return list
})

watch(() => filterText.value, async () => {
  await searchToken()
  initBalances()
})
watch(() => currentAssetType.value, initBalances)

onMounted(async () => {
  nfts.value = NFTS[appStore.currentChain.name] || []
  tokens.value = getTokens(appStore.currentChain.name)

  if (props.availableTypes.includes('currency')) {
    tokens.value = [{
      type: 'currency',
      symbol: 'ETH',
      name: 'Ethereum',
      logoURI: '/images/currencies/eth.svg',
      decimals: 18,
    }, ...tokens.value]
  }

  initTypes()
  initBalances()
})

function initTypes() {
  if (props.availableTypes.includes('ERC721')) {
    assetTypes.value.push({ id: 'nfts', title: 'NFTs' })
  }
}

async function initBalances() {
  for (let token of filteredTokens.value) {
    try {
      if (token.type === 'currency') {
        token.balance = await getEthBalance(userStore.address)
      } else {
        token.balance = Number(await getBalance(token.address, userStore.address))
      }
    } catch (e) {
      //
    }
  }
}

async function searchToken() {
  try {
    searchedToken.value = null

    if (!filterText.value.startsWith('0x') || filterText.value.length !== 42) {
      return
    }

    let token = currentAssetType.value.id === 'nfts'
        ? await fetchNftCollectionByAddress(filterText.value)
        : await fetchTokenByAddress(filterText.value)

    token.balance = await getBalance(token.address, userStore.address)
    searchedToken.value = token
  } catch (e) {
    //
  }
}

function onAssetClick(asset) {
  valuesStore.setValue(props.componentId, asset)
  emit('closeModal')
}

function onLinkClick(asset) {
  const url = getTokenExplorerUrl(asset.address)
  window.open(url, '_blank')
}

function onWrapClick() {
  router.push('/wrap')
}
</script>

<style scoped lang="sass">
.modal-asset-list
  padding: 24px 0
  height: 100%

  &__header
    padding: 0 24px
    display: flex
    flex-direction: column
    margin-bottom: 16px

    &-search
      margin-bottom: 16px

  &__body
    position: relative
    overflow: auto

  &__list
    display: flex
    flex-direction: column
    gap: 6px

  &__empty
    text-align: center
    padding-top: 16px

  &__asset
    display: flex
    justify-content: space-between
    align-items: center
    gap: 12px
    cursor: pointer
    padding: 12px 24px
    user-select: none

    &:hover
      background-color: var(--background-light)

    &.--disabled
      opacity: 0.5
      cursor: not-allowed

      &:active
        pointer-events: none

    &-info
      display: flex
      align-items: center
      justify-content: space-between
      gap: 10px
      width: 100%

    &-section
      display: flex
      flex-direction: column
      gap: 2px

      &:nth-child(2)
        text-align: right
        align-items: flex-end

    &-title
      font-size: 16px
      font-weight: 500

    &-icon
      height: 28px
      width: 28px
      min-width: 28px
      border-radius: 50%
      color: var(--color-secondary)

    &-hint
      font-size: 14px
      color: var(--color-secondary)
      display: flex
      align-items: center
      gap: 6px

    &-link
      height: 14px
      width: 14px
      color: inherit
      cursor: pointer
      transition: color 0.3s ease

      &:hover
        color: var(--color-primary)
</style>