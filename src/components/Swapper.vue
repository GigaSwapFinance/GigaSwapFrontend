<template>
  <div class="swapper">
    <div class="swapper__inner">
      <div class="swapper__body">
        <SwapperBlock
            title="You send"
            v-model="modelValue.send"
            :can-select-tokens="canSelectTokens"
            :can-enter-values="canEnterValues"
            :show-balances="showBalances"
            :available-token-types="availableTokenTypes"
            :is-loading="loadingSide === 'receive'"
            class="swapper__block"
            @blur="$emit('blur', 'send')"
            @focus="$emit('focus', 'send')"
        />

        <div class="swapper__center">
          <Line class="swapper__center-line" />

          <div class="swapper__center-button" :class="{ '--clickable': canSwitchSides }" @click="onSwitchClick">
            <Image :src="canSwitchSides ? `/images/icons/arrows.svg` : `/images/icons/arrow-down.svg`" class="swapper__center-icon" />
          </div>
        </div>

        <SwapperBlock
            title="You receive"
            v-model="modelValue.receive"
            :can-select-tokens="canSelectTokens"
            :can-enter-values="canEnterValues"
            :show-balances="showBalances"
            :show-count="showMaxCount"
            :available-token-types="availableTokenTypes"
            :is-loading="loadingSide === 'send'"
            class="swapper__block"
            @blur="$emit('blur', 'receive')"
            @focus="$emit('focus', 'receive')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SwapperBlock from '@/components/SwapperBlock.vue'
import Line from '@/shared/ui/Line.vue'
import type { ISwapperAssets } from '@/shared/types/swapper'
import { computed, type PropType, watch } from 'vue'
import { useTradeStore } from '@/stores'

const emit = defineEmits(['update:modelValue', 'update:newTokenValue', 'blur', 'focus'])

const props = defineProps({
  modelValue: {
    type: Object as PropType<ISwapperAssets>,
    required: true,
  },

  canEnterValues: {
    type: Boolean,
    default: false,
  },

  canSelectTokens: {
    type: Boolean,
    default: false,
  },

  showBalances: {
    type: Boolean,
    default: false,
  },

  canSwitchSides: {
    type: Boolean,
    default: false,
  },

  showMaxCount: {
    type: Boolean,
    default: false,
  },

  loadingSide: {
    type: String,
  },
})

const tradeStore = useTradeStore()

const availableTokenTypes = computed(() => {
  if (tradeStore.tradeType === 'fractional') {
    return ['currency', 'ERC20']
  } else if (tradeStore.tradeType === 'direct') {
    return ['currency', 'ERC20', 'ERC721']
  }
})

watch(() => props.modelValue.send, () => emit('update:newTokenValue', 'send'), { deep: true })
watch(() => props.modelValue.receive, () => emit('update:newTokenValue', 'receive'), { deep: true })

function onSwitchClick() {
  if (!props.canSwitchSides) {
    return
  }

  const currentAssets = JSON.parse(JSON.stringify(props.modelValue))
  const newAssets = { send: currentAssets?.receive, receive: currentAssets?.send }

  emit('update:modelValue', newAssets)
}
</script>

<style scoped lang="sass">
.swapper
  width: 100%

  &__body
    display: flex
    flex-direction: column
    gap: 4px
    padding: 16px 0

  &__block
    width: 100%

  &__center
    position: relative
    display: flex
    justify-content: center
    align-items: center

    &-button
      position: relative
      height: 36px
      width: 36px
      outline: 1px solid var(--background-stroke)
      border-radius: 50%
      display: flex
      justify-content: center
      align-items: center
      background-color: var(--background-default)
      cursor: pointer

      &.--clickable
        color: var(--color-primary)

    &-icon
      height: 22px
      width: 22px

    &-line
      position: absolute
      top: 50%
      left: 0
</style>