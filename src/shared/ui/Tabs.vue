<template>
  <div class="tabs">
    <div
        v-for="option in options"
        class="tabs__tab"
        :class="{ '--active': option.id === modelValue.id }"
        @click="onOptionClick(option)"
    >
      {{ option.title }}
    </div>
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
.tabs
  display: flex
  align-items: center
  user-select: none

  &__tab
    position: relative
    padding: 14px 10px
    line-height: 1.35
    cursor: pointer
    transition: color 0.2s ease
    font-size: 15px

    &:hover
      color: var(--color-primary)

    &.--active
      color: var(--color-primary)

      &:after
        content: ''
        position: absolute
        bottom: -1px
        right: 0
        height: 2px
        width: 100%
        background-color: var(--color-primary)
</style>