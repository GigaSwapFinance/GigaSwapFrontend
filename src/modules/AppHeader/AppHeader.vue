<template>
  <header class="header">
    <div class="header__body container">
      <router-link to="/" class="header__logo">
        <Image v-if="layoutStore.isMobile" src="/images/gigaswap/logo-head.svg" class="header__logo-image" />
        <Image v-else src="/images/gigaswap/logo-full.svg" class="header__logo-image" />
      </router-link>

      <HeaderTabs v-if="!layoutStore.isMobile" class="header__tabs" />

      <div class="header__buttons">
        <ChainSwitcher class="header__buttons-button" />

        <Button v-if="!isAuthorised" is-primary class="header__buttons-button" @click="onConnectClick">Connect</Button>
        <HeaderUser v-else :address="userStore.address" :wallet-id="userStore.walletId" class="header__user" @click="onUserClick" />

        <div
            v-if="!layoutStore.isMobile"
            class="header__settings"
            @click="onSettingsClick"
        >
          <Image src="/images/icons/settings-2.svg" class="header__settings-icon" />
        </div>

        <div
            v-if="layoutStore.isMobile"
            class="header__button"
            @click="onMenuButtonClick"
        >
          <Image :src="isMenuVisible ? '/images/icons/close.svg' : '/images/icons/menu.svg'" class="header__button-icon" />
        </div>
      </div>
    </div>

    <HeaderMenu v-if="isMenuVisible" @close="onMenuClose" class="header__menu" />
  </header>
</template>

<script setup lang="ts">
import Button from '@/shared/ui/Button.vue'
import HeaderTabs from '@/modules/AppHeader/components/HeaderTabs.vue'
import HeaderMenu from '@/modules/AppHeader/components/HeaderMenu.vue'
import HeaderUser from '@/modules/AppHeader/components/HeaderUser.vue'
import ChainSwitcher from '@/components/ChainSwitcher.vue'
import { useUserStore, useLayoutStore } from '@/stores'
import { ref, computed } from 'vue'

const userStore = useUserStore()
const layoutStore = useLayoutStore()

const isMenuVisible = ref(false)
const isAuthorised = computed(() => !!userStore.address)

function onConnectClick() {
  layoutStore.openModal('ConnectWallet')
}

function onMenuButtonClick() {
  const isVisible = !isMenuVisible.value

  if (isVisible) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }

  isMenuVisible.value = isVisible
}

function onMenuClose() {
  isMenuVisible.value = false
  document.body.style.overflow = 'auto'
}

function onUserClick() {
  layoutStore.openModal('Account')
}

function onSettingsClick() {
  layoutStore.openModal('GeneralSettings')
}
</script>

<style lang="sass">
.header
  width: 100%
  border-bottom: 1px solid var(--border-light)
  padding: 0 16px
  position: sticky
  top: 0
  font-family: var(--font-2)
  background-color: color-mix(in srgb, var(--background-default) 80%, transparent)
  backdrop-filter: blur(25px)
  z-index: 1

  &__body
    display: flex
    align-items: center
    gap: 12px
    height: 60px
    margin: 0 auto
    width: 100%

  &__tabs
    width: 100%

  &__logo
    display: flex
    align-items: center
    transition: opacity 0.3s ease

    &:hover
      opacity: 0.7

    &-image
      height: 32px

  &__buttons
    display: flex
    align-items: center
    gap: 12px

    &-button
      color: var(--color-default)

  &__menu
    animation: fade-in-bottom 0.3s ease

  &__settings
    display: flex
    align-items: center
    justify-content: center
    height: 36px
    width: 36px
    border-radius: 8px
    transition: background-color 0.3s ease
    cursor: pointer

    &:hover
      background-color: var(--background-secondary)

    &-icon
      min-height: 16px
      height: 16px
      min-width: 16px
      width: 16px

  &__button
    display: flex
    align-items: center
    justify-content: center
    height: 36px
    width: 36px
    border-radius: 8px
    transition: background-color 0.3s ease
    cursor: pointer

    &:hover
      background-color: var(--background-secondary)

    &-icon
      min-height: 24px
      height: 24px
      min-width: 24px
      width: 24px

  @media screen and (max-width: $breakpointMobile)
    &__body
      justify-content: space-between
      height: 56px
</style>