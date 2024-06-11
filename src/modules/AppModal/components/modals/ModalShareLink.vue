<template>
  <div class="modal-share-link">
    <ModalCloseButton @click="emit('closeModal')" />

    <div class="modal-share-link__title">Share</div>

    <div class="modal-share-link__body">
      <div class="modal-share-link__list">
        <div
            v-for="way in shareWays"
            class="modal-share-link__way"
            @click="onWayClick(way.action)"
        >
          <Image :src="way.icon" class="modal-share-link__way-icon" />
          <div class="modal-share-link__way-title">{{ way.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ModalCloseButton from '@/modules/AppModal/components/ModalCloseButton.vue'
import { ref } from 'vue'
import { copyToClipboard } from '@/shared/lib/utils/clipboard'

const props = defineProps({
  url: {
    type: String,
    required: true,
  }
})

const emit = defineEmits(['closeModal'])
const shareWays = ref([
  {
    title: 'Copy link',
    icon: '/images/icons/copy.svg',
    action: (url: string) => copyToClipboard(url),
  },

  {
    title: 'Share via Telegram',
    icon: '/images/socials/telegram.svg',
    action: (url: string) => window.open(`https://telegram.me/share/url?url=${url}`, '_blank'),
  },

  {
    title: 'Share via X',
    icon: '/images/socials/x.svg',
    action: (url: string) => window.open(`https://x.com/intent/tweet?text=${url}`, '_blank'),
  },
])

function onWayClick(callback: Function) {
  callback(props.url)
  emit('closeModal')
}
</script>

<style scoped lang="sass">
.modal-share-link
  padding: 24px
  max-width: 500px
  width: 100%
  font-family: var(--font-1)

  &__title
    font-weight: 700
    font-size: 24px
    margin-bottom: 24px

  &__list
    display: flex
    flex-direction: column
    gap: 12px

  &__way
    font-family: var(--font-1)
    display: flex
    align-items: center
    gap: 16px
    padding: 16px 20px
    background-color: var(--background-input)
    border-radius: 12px
    cursor: pointer
    user-select: none
    transition: background-color 0.3s ease

    &:hover
      background-color: var(--background-primary-light)

    &-icon
      height: 24px
      width: 24px

    &-title
      font-weight: 500
</style>