<template>
  <div
      v-if="layoutStore.modalName"
      class="modal"
      :class="{ '--closed': isClosed, '--full': layoutStore.isModalFullHeight }"
  >
    <div
        ref="content"
        class="modal__content"
        :class="{ '--full': isFull }"
    >
      <Component
          :is="modal"
          v-bind="layoutStore.modalProps"
          @closeModal="onCloseModal"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useLayoutStore } from '@/stores'

import modalComponents from '@/modules/AppModal/components/modals'
import { useRoute } from 'vue-router'

const CLOSE_TIMEOUT = 295

const layoutStore = useLayoutStore()
const route = useRoute()

const isFull = ref(false)
const isClosed = ref(false)
const content = ref(null)
const modal = computed(() => {
  const modalName = `Modal${layoutStore.modalName}`

  if (!modalName) {
    return null
  }

  return modalComponents[modalName]
})

watch(() => route.fullPath, onCloseModal)
watch(() => layoutStore.modalName, () => nextTick(checkViewport))
onClickOutside(content, onCloseModal)

function onCloseModal() {
  isClosed.value = true
  setTimeout(closeModal, CLOSE_TIMEOUT)
}

function closeModal() {
  layoutStore.closeModal()
  isClosed.value = false
}

function checkViewport() {
  if (!layoutStore.modalName) {
    return isFull.value = false
  }

  const content = document.querySelector('.modal__content')

  isFull.value = Number(content?.clientHeight) >= window.innerHeight
}
</script>

<style scoped lang="sass">
$animationDuration: 0.3s

.modal
  position: fixed
  top: 0
  background-color: var(--background-modal)
  height: 100%
  width: 100%
  display: flex
  justify-content: center
  align-items: center
  animation: fadeIn $animationDuration ease
  z-index: 10
  cursor: pointer

  &.--closed
    animation: fadeOut $animationDuration ease

    .modal__content
      animation: fadeOutBottom $animationDuration ease

  &.--full
    .modal__content
      height: 100%

  &__content
    position: relative
    background-color: var(--background-default)
    box-shadow: var(--shadow-modal)
    max-width: 500px
    width: 100%
    border-radius: 24px
    max-height: 76vh
    animation: fadeInUp $animationDuration ease
    cursor: default
    overflow: auto

  @media screen and (max-width: $breakpointMobile)
    align-items: flex-end

    &__content
      border-radius: 24px 24px 0 0
      animation: fadeInUp $animationDuration ease
      max-height: 100vh

      &.--full
        border-radius: 0
</style>