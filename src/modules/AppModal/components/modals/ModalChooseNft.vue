<template>
  <div class="modal-choose-nft">
    <ModalCloseButton @click="emit('closeModal')" />

    <div class="modal-choose-nft__header">
      <div class="modal-choose-nft__title heading-4">Select NFT</div>
    </div>

    <div class="modal-choose-nft__body">
      <Input
          v-model="filterText"
          is-number
          :decimals="0"
          icon="/images/icons/search.svg"
          placeholder="Search token ID"
          class="modal-choose-nft__header-search"
      />

      <NftList
          v-if="tokens.length"
          :tokens="tokens"
          class="modal-choose-nft__list"
          only-owned
          @select="onSelectNft"
      />

      <div v-else class="modal-choose-nft__empty">No results found.</div>
    </div>
  </div>
</template>

<script setup>
import ModalCloseButton from '@/modules/AppModal/components/ModalCloseButton.vue'
import { onMounted, ref, watch } from 'vue'
import NftList from '@/components/NftList.vue'
import { fetchNftBalanceByAddress, fetchNftByTokenId } from '@/entities/nft/api'
import { useUserStore, useValuesStore } from '@/stores'
import Input from '@/shared/ui/Input.vue'

const emit = defineEmits(['closeModal'])

const props = defineProps({
  componentId: {
    type: String,
    required: true,
  },

  tokenAddress: {
    type: String,
    required: true,
  },

  address: {
    type: String,
  },
})

const userStore = useUserStore()
const valuesStore = useValuesStore()

const filterText = ref('')
const lastText = ref('')
const tokens = ref([])

onMounted(initList)
watch(() => filterText.value, (newValue) => {
  lastText.value = newValue
  onSearch()
})

async function onSearch() {
  const tokenId = filterText.value

  if (!tokenId) {
    return initList()
  }

  const token = await fetchNftByTokenId(props.tokenAddress, tokenId)

  if (lastText.value && tokenId !== lastText.value) {
    return
  }

  if (token) {
    tokens.value = [token]
  } else {
    tokens.value = []
  }
}

async function initList() {
  const balance = await fetchNftBalanceByAddress(props.tokenAddress, userStore.address) || []
  tokens.value = balance
}

function onSelectNft(token) {
  valuesStore.setValue(props.componentId, token)
  emit('closeModal')
}
</script>

<style scoped lang="sass">
.modal-choose-nft
  padding: 24px 12px

  &__header
    padding: 0 12px

    &-search
      margin-bottom: 16px

  &__body
    padding: 0 12px 12px

  &__list
    width: 100%

  &__empty
    color: var(--color-secondary)
    text-align: center
    margin-top: 36px
</style>