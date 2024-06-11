<template>
  <div class="header-links">
    <a v-for="link in links" :href="link.url" target="_blank" class="header-links__link">
      <Image :src="link.icon" class="header-links__link-icon" />
      {{ link.title }}
    </a>
  </div>
</template>

<script setup lang="ts">

import { links } from '@/modules/AppHeader/const/tabs'
</script>

<style scoped lang="sass">
.header-links
  display: flex
  flex-direction: column
  padding: 8px 0
  background-color: var(--background-default)
  border: 1px solid var(--background-light)
  box-shadow: var(--shadow-light)
  border-radius: 16px
  width: 100%
  min-width: 196px

  &__link
    display: flex
    align-items: center
    padding: 12px 16px
    font-weight: 500
    transition: background-color 0.3s ease

    &:hover
      background-color: var(--background-light)

    &-icon
      margin-right: 12px
      height: 16px
      width: 16px

</style>