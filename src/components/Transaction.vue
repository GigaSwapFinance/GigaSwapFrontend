<template>
  <div class="transaction">
    <div class="transaction__side">
      <div class="transaction__title">
        {{ title }}

        <a :href="link" target="_blank">
          <Image src="/images/icons/etherscan.svg" class="transaction__link" />
        </a>
      </div>
      <div class="transaction__description">{{ description }}</div>
    </div>

    <div class="transaction__side">
      <Image src="/images/icons/success.svg" class="transaction__status" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },

  link: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
})
</script>

<style scoped lang="sass">
.transaction
  display: flex
  //align-items: center
  justify-content: space-between

  &__title
    font-family: var(--font-2)
    display: flex
    align-items: center
    gap: 6px

  &__description
    color: var(--color-secondary)
    font-size: 14px
    margin-top: 5px

  &__link
    height: 14px
    width: 14px
    color: var(--color-secondary)
    cursor: pointer

  &__status
    height: 16px
    width: 16px
</style>