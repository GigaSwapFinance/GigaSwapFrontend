<template>
  <div class="image-pair">
    <Image
        v-for="image in images"
        :src="image"
        :alternative-src="alternativeSrc"
        class="image-pair__image"
    />
  </div>
</template>

<script setup>
defineProps({
  images: {
    type: Array,
    required: true,
  },

  alternativeSrc: {
    type: String,
    default: '/images/icons/question-mark.svg',
  },
})
</script>

<style scoped lang="sass">
.image-pair
  height: 32px

  &__image
    height: inherit
    width: auto
    aspect-ratio: 1 / 1
    outline: 3px solid var(--background-default)
    border-radius: 50%

    &:first-child
      position: relative
</style>