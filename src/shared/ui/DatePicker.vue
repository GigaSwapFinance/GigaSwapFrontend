<template>
  <VueDatePicker placeholder="Select a date" class="date-picker" />
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
</script>

<style lang="sass">
$placeholderColor: color-mix(in srgb, var(--color-secondary) 40%, transparent)

.dp
  &__input
    font-size: 16px
    padding: 15px 18px 15px 48px
    border-radius: 12px
    height: 50px
    background-color: var(--background-input)
    transition: border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease

    &.dp__input_focus,
    &:hover
      box-shadow: var(--shadow-primary)
      border-color: var(--background-primary)

    &.dp__input_focus
      background-color: var(--background-default)

    &::placeholder
      color: $placeholderColor

  &__icon:not(.dp__clear_icon)
    padding: 0 0 0 18px
    color: $placeholderColor

  &__menu
    border-radius: 12px

  &__action_button
    padding: 4px 8px
    height: auto
    font-size: 16px
    border-radius: 8px

  &__action_select
    background-color: var(--background-primary) !important
    color: var(--color-default) !important
    font-weight: 500
</style>