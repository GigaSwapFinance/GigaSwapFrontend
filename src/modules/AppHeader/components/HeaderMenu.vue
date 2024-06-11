<template>
  <div class="header-menu">
    <div class="header-menu__content">
      <router-link
          v-for="tab in tabs"
          :to="tab.to"
          class="header-menu__item"
          @click="onTabClick"
      >
        <div class="header-menu__item-left">
          <div class="header-menu__item-title">
            {{ tab.title }}
          </div>

          <InlineTip v-if="tab.description">{{ tab.description }}</InlineTip>
        </div>
      </router-link>

      <Line />

      <a
          v-for="link in links"
          :href="link.url"
          target="_blank"
          class="header-menu__item"
          @click="onTabClick"
      >
        <div class="header-menu__item-left">
          <!--        <Image :src="link.icon" class="header-menu__item-icon" />-->
          <div class="header-menu__item-title">{{ link.title }}</div>
        </div>

        <Image src="/images/icons/arrow-link.svg" class="header-menu__item-arrow" />
      </a>

      <Line />

      <div class="header-menu__item" @click="onSettingsClick">
        <div class="header-menu__item-left">
          <div class="header-menu__item-title">Settings</div>
        </div>

        <Image src="/images/icons/settings.svg" class="header-menu__item-arrow" />
      </div>

      <Line />

      <a
          href="https://app.uniswap.org/swap?inputCurrency=eth&outputCurrency=0x83249c6794bca5a77eb8c0af9f1a86e055459cea&chain=mainnet"
          target="_blank"
          class="header-menu__item"
      >
        <div class="header-menu__item-left">
          <Image src="/images/currencies/giga.svg" class="header-menu__item-icon" />
          <div class="header-menu__item-title">Buy $GIGA</div>
        </div>

        <Image src="/images/icons/arrow-link.svg" class="header-menu__item-arrow" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">

import { tabs } from '@/modules/AppHeader/const/tabs'
import { links } from '@/modules/AppHeader/const/tabs'
import Line from '@/shared/ui/Line.vue'
import InlineTip from '@/shared/ui/InlineTip.vue'
import { useLayoutStore } from '@/stores'

const emit = defineEmits(['close'])

const layoutStore = useLayoutStore()

function onTabClick() {
  emit('close')
}

function onSettingsClick() {
  layoutStore.openModal('GeneralSettings')
  emit('close')
}
</script>

<style scoped lang="sass">
.header-menu
  background-color: var(--background-secondary)
  position: absolute
  width: 100%
  height: calc(100vh - 100px)
  left: 0
  top: 56px
  padding: 16px
  border-top: 1px solid var(--border-light)
  overflow: auto

  &__content
    display: flex
    flex-direction: column
    gap: 10px

  &__item
    display: flex
    justify-content: space-between
    font-weight: 500
    font-size: 22px
    padding: 12px 0
    transition: opacity 0.3s ease

    &:hover
      opacity: 0.5

    &-left
      display: flex
      align-items: center
      gap: 10px

    &-icon
      width: 24px
      height: 24px
      //color: var(--color-primary)

    &-arrow
      height: 24px
      width: 24px
</style>