<template>
  <ImagePair :images="images" class="token-logos-pair" />
</template>

<script setup lang="ts">
import ImagePair from '@/shared/ui/ImagePair.vue'
import { computed, type PropType } from 'vue'
import type { IToken } from '@/shared/types/swapper'

const props = defineProps({
  tokens: {
    type: Array as PropType<IToken[]>,
    required: true,
  },
})

const images = computed(() => {
  const list = []

  for (let token of props.tokens) {
    const isNft = token.type === 'ERC721'
    const alternativeLogo = isNft ? '/images/icons/nft.svg' : '/images/icons/question-mark.svg'

    list.push(token.logoURI || alternativeLogo)
  }

  return list
})
</script>