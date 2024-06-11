<template>
  <div class="modal-general-settings">
    <ModalCloseButton @click="emit('closeModal')" />

    <div class="modal-general-settings__title">General settings</div>

    <div class="modal-general-settings__body">
      <div class="modal-general-settings__section --disabled">
        <SettingWithCheckbox icon="/images/icons/moon.svg" :model-value="true">Auto dark mode</SettingWithCheckbox>
<!--        <SettingWithCheckbox icon="/images/icons/chain.svg" :model-value="false">Show test networks</SettingWithCheckbox>-->
      </div>

      <Line class="modal-general-settings__line" />

<!--      <div class="modal-general-settings__section">-->
<!--        <div class="modal-general-settings__subtitle">Trading</div>-->

<!--        <SettingWithCheckbox :model-value="false">Save imported tokens</SettingWithCheckbox>-->
<!--        <SettingWithCheckbox :model-value="false">Unwrap gWETH while trading</SettingWithCheckbox>-->
<!--      </div>-->

      <div class="modal-general-settings__section">
        <div class="modal-general-settings__subtitle">Language</div>

        <div class="modal-general-settings__select">
          <div class="modal-general-settings__select-title">English</div>

          <Image src="/images/icons/arrow-right.svg" class="modal-general-settings__select-icon" />
        </div>

<!--        <SettingWithCheckbox :model-value="false">Show testnets</SettingWithCheckbox>-->
      </div>
    </div>
  </div>
</template>

<script setup>
import ModalCloseButton from '@/modules/AppModal/components/ModalCloseButton.vue'
import SettingWithCheckbox from '@/components/SettingWithCheckbox.vue'
import Line from '@/shared/ui/Line.vue'

const emit = defineEmits(['closeModal'])
</script>

<style scoped lang="sass">
.modal-general-settings
  padding: 24px
  max-width: 500px
  width: 100%
  font-family: var(--font-1)

  &__title
    font-weight: 700
    font-size: 24px
    margin-bottom: 24px

  &__subtitle
    color: var(--color-secondary)
    text-transform: uppercase
    font-family: var(--font-1)
    font-weight: 600
    font-size: 14px

  &__line
    margin: 20px 0

  &__body
    display: flex
    flex-direction: column
    //gap: 12px

  &__section
    display: flex
    flex-direction: column
    gap: 12px

    &.--disabled
      pointer-events: none

    &:not(:last-child):not(:first-child)
      margin-bottom: 24px

  &__select
    display: flex
    align-items: center
    justify-content: space-between
    height: 32px
    font-weight: 500
    cursor: not-allowed
    transition: opacity 0.3s ease

    &:hover
      opacity: 0.5

    &-icon
      width: 20px
      height: 20px
      color: var(--color-placeholder)
</style>