<template>
  <div class="header-tabs">
    <router-link
      v-for="tab in tabs"
      :to="tab.to"
      class="header-tabs__tab"
    >
      {{ tab.title }}

      <InlineTip
          v-if="tab.description"
          class="header-tabs__tab-hint"
      >{{ tab.description }}</InlineTip>
    </router-link>

    <Tooltip class="header-tabs__tab">
      More

      <template v-slot:content>
        <HeaderMenu />
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import Tooltip from '@/shared/ui/Tooltip.vue'
import HeaderMenu from '@/modules/AppHeader/components/HeaderLinks.vue'
import { tabs } from '@/modules/AppHeader/const/tabs'
import InlineTip from '@/shared/ui/InlineTip.vue'
</script>

<style scoped lang="sass">
.header-tabs
  display: flex
  align-items: center
  user-select: none

  &__tab
    position: relative
    padding: 20px 10px
    line-height: 1.35
    cursor: pointer
    transition: color 0.2s ease

    &:hover
      color: var(--color-primary)

    &.router-link-active
      color: var(--color-primary)

      &:after
        content: ''
        position: absolute
        bottom: 0
        right: 0
        height: 2px
        width: 100%
        background-color: var(--color-primary)
</style>