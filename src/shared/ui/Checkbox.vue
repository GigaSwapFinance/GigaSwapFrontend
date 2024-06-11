<template>
  <div class="checkbox">
    <input
        :value="modelValue"
        :checked="modelValue"
        type="checkbox"
        :id="checkboxId"
        class="checkbox__input"
        @input="onInput"
    />

    <label :for="checkboxId" class="checkbox__label">Toggle</label>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import uniqueId from 'lodash.uniqueid'

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const checkboxId = ref('checkbox-' + uniqueId())

function onInput(event) {
  emit('update:modelValue', event.target.checked)
}
</script>

<style scoped lang="sass">
$height: 32px
$width: 58px

.checkbox
  position: relative
  display: flex
  user-select: none
  height: $height

  &__input
    position: absolute
    height: 0
    width: 0
    visibility: hidden

    &:checked
      & + label
        background: var(--background-primary)

        &:after
          left: calc(100% - 3px)
          transform: translateX(-100%)

  &__label
    cursor: pointer
    text-indent: -9999px
    width: $width
    height: $height
    background-color: var(--background-stroke)
    display: inline-block
    border-radius: 1000px
    position: relative
    transition: background-color 0.7s ease

    &:active
      &:after
        width: calc($height + ($height * 0.1))

    &:after
      content: ''
      position: absolute
      top: 3px
      left: 3px
      width: 26px
      height: 26px
      background-color: var(--background-default)
      border-radius: 1000px
      transition: 0.3s
</style>