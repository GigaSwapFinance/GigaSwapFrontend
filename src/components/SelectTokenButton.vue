<template>
  <SelectButton
      :title="modelValue?.symbol"
      :icon="modelValue?.logoURI"
      :alternative-icon="isNft ? '/images/icons/nft.svg' : '/images/icons/question-mark.svg'"
      :can-select="canSelect"
      class="select-token-button"
      @click="onClick"
  />
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import { useLayoutStore, useValuesStore } from '@/stores'
import uniqueId from 'lodash.uniqueid'
import SelectButton from '@/components/SelectButton.vue'
import type { PropType } from 'vue'
import type { IToken } from '@/shared/types/swapper'
import { getTokenExplorerUrl } from '@/shared/const/tokens'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Object as PropType<IToken>,
  },

  canSelect: {
    type: Boolean,
    default: true,
  },

  availableTokenTypes: {
    type: Array,
  },
})

const layoutStore = useLayoutStore()
const valuesStore = useValuesStore()
const componentId = ref(uniqueId())
const componentValue = computed(() => valuesStore.values[componentId.value])
const isNft = computed(() => props.modelValue?.type === 'ERC721')

watch(() => componentValue.value, (newValue) => emit('update:modelValue', newValue))
onUnmounted(() => valuesStore.removeValue(componentId.value))

function onClick() {
  if (!props.canSelect) {
    const url = getTokenExplorerUrl(props.modelValue?.address)
    return window.open(url, '_blank')
  }

  layoutStore.openModal('AssetList', {
    componentId: componentId.value,
    availableTypes: props.availableTokenTypes,
    isModalFullHeight: true,
  })
}
</script>