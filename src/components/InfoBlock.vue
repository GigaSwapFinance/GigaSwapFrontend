<template>
  <div class="info-block">
    <div class="info-block__info">
      <div class="info-block__title heading-2">{{ title }}</div>
      <div class="info-block__description">{{ description }}</div>

      <div class="info-block__buttons">
        <slot></slot>
      </div>
    </div>

    <Image v-if="image" :src="image" class="info-block__image" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  image: {
    type: String,
  },
})
</script>

<style scoped lang="sass">
.info-block
  display: flex
  align-items: center
  justify-content: space-between
  gap: 44px

  &__info
    padding: 60px 0
    display: flex
    flex-direction: column
    gap: 12px

  &__title
    //margin-bottom: 12px

  &__description
    font-size: 18px
    margin-bottom: 20px
    line-height: 1.5

  &__image
    max-width: 35%
    padding: 24px 0
    max-height: 278px
    height: 100%

  &__buttons
    display: flex
    align-items: center

  @media screen and (max-width: $breakpointMobile)
    flex-direction: column-reverse
    gap: 24px
    text-align: center
    padding: 40px 0

    &__info
      padding: 0
      gap: 12px

    &__image
      max-width: unset
      padding: 0
      max-height: 228px

    &__description
      font-size: 16px
      margin-bottom: 0

    &__buttons
      justify-content: center
</style>