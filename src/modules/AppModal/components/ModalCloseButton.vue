<template>
  <button class="modal-close-button">
    <Image src="/images/icons/close.svg" class="modal-close-button__icon" />
  </button>
</template>

<script setup lang="ts">

</script>

<style scoped lang="sass">
.modal-close-button
  position: absolute
  right: 16px
  top: 16px
  background-color: var(--background-secondary)
  border: none
  height: 34px
  width: 34px
  display: flex
  align-items: center
  justify-content: center
  border-radius: 50%
  cursor: pointer
  color: var(--color-secondary)
  transition: opacity 0.3s ease

  &:hover
    opacity: 0.8

  &__icon
    width: 16px
    height: 16px
</style>