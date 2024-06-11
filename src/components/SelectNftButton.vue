<template>
  <SelectButton
      :title="title"
      :show-icon="false"
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
import type { INft } from '@/shared/types/swapper'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Object as PropType<INft | null>,
  },

  address: {
    type: String,
    required: true,
  },

  ownerAddress: {
    type: String,
  },

  canSelect: {
    type: Boolean,
    default: true,
  },
})

const layoutStore = useLayoutStore()
const valuesStore = useValuesStore()
const componentId = ref(uniqueId())
const componentValue = computed(() => valuesStore.values[componentId.value])
const title = computed(() => props.modelValue?.id ? `#${props.modelValue.id}` : '')

watch(() => componentValue.value, (newValue) => emit('update:modelValue', newValue))
onUnmounted(() => valuesStore.removeValue(componentId.value))

function onClick() {
  if (!props.canSelect) {
    return
  }

  layoutStore.openModal('ChooseNft', {
    tokenAddress: props.address,
    address: props.ownerAddress,
    componentId: componentId.value,
  })
}
</script>