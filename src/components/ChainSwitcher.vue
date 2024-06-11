<template>
  <div class="chain-switcher" @click="onClick">
    <Image v-if="currentChain" :src="currentChain.icon" class="chain-switcher__icon" />
    <Image v-else src="/images/icons/question-mark.svg" class="chain-switcher__icon" />

    <Image src="/images/icons/arrow-down.svg" class="chain-switcher__arrow" />
  </div>
</template>

<script setup>
import { useAppStore, useLayoutStore } from '@/stores'
import { computed } from 'vue'

const layoutStore = useLayoutStore()
const appStore = useAppStore()

const currentChain = computed(() => appStore.currentChain)

function onClick() {
  layoutStore.openModal('ChainList')
}
</script>

<style scoped lang="sass">
.chain-switcher
  display: flex
  align-items: center
  gap: 8px
  color: var(--color-secondary)
  cursor: pointer

  padding: 0 8px
  border-radius: 8px
  height: 36px
  transition: background-color 0.3s ease

  &:hover
    background-color: var(--background-secondary)

  &__icon
    height: 20px
    width: 20px

  &__arrow
    height: 12px
    width: 12px
</style>