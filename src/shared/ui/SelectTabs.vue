<template>
  <div class="select-tabs">
    <div
        v-for="option in options"
        :key="option.id"
        class="select-tabs__tab"
        :class="{ '--active': option.id === modelValue.id }"
        @click="onOptionClick(option)"
    >{{ option.title }}</div>
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue'

interface ITabsOption {
  id: string
  title: string
}

const emit = defineEmits(['update:modelValue'])

defineProps({
  modelValue: {
    type: Object as PropType<ITabsOption>,
    required: true,
  },

  options: {
    type: Array as PropType<ITabsOption[]>,
    required: true,
  },
})

function onOptionClick(option: ITabsOption) {
  emit('update:modelValue', option)
}
</script>

<style scoped lang="sass">
.select-tabs
  display: flex
  justify-content: space-between
  gap: 6px
  background-color: var(--background-input)
  padding: 4px
  border-radius: 12px
  border: 1px solid var(--background-stroke)
  box-sizing: content-box
  overflow-y: auto
  scrollbar-width: none
  width: fit-content

  &::-webkit-scrollbar
    display: none

  &__tab
    display: flex
    align-items: center
    justify-content: center
    user-select: none
    border-radius: 8px
    cursor: pointer
    font-size: 14px
    font-weight: 500
    padding: 12px 12px
    color: var(--grey-text)
    width: inherit
    width: -webkit-fill-available
    text-align: center
    background-color: transparent
    transition: all 0.2s linear
    width: 100%

    &:hover
      background-color: var(--background-stroke)

    &.--active
      background-color: var(--background-default)
      box-shadow: var(--shadow-light)
</style>