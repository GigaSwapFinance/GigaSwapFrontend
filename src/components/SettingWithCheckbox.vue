<template>
  <div class="setting-with-checkbox">
    <div class="setting-with-checkbox__title">
      <Image v-if="icon" :src="icon" class="setting-with-checkbox__icon" />

      <slot></slot>
    </div>

    <Checkbox v-model="checkboxValue" class="setting-with-checkbox__checkbox" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Checkbox from '@/shared/ui/Checkbox.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },

  icon: {
    type: String,
  },
})

const emit = defineEmits(['update:modelValue'])

const checkboxValue = ref(props.modelValue)

watch(() => checkboxValue.value, () => emit('update:modelValue', checkboxValue.value))
</script>

<style scoped lang="sass">
.setting-with-checkbox
  display: flex
  align-items: center
  justify-content: space-between

  &__title
    font-weight: 500

  &__icon
    display: inline
    height: 16px
    width: 16px
    margin-right: 12px
    vertical-align: middle
</style>