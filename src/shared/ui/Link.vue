<template>
  <router-link v-if="href.startsWith('/')" :to="href" class="link-element">
    <Image v-if="withIcon" src="/images/icons/link.svg" class="link-element__icon" />
    <slot></slot>
  </router-link>

  <a v-else :href="href" class="link-element" target="_blank">
    <Image v-if="withIcon" src="/images/icons/link.svg" class="link-element__icon" />
    <slot></slot>
  </a>
</template>

<script setup>
defineProps({
  withIcon: {
    type: Boolean,
    default: false,
  },

  href: {
    type: String,
    required: true,
  },
})
</script>

<style scoped lang="sass">
.link-element
  color: var(--color-primary)
  position: relative
  display: inline-flex
  align-items: center
  gap: 6px
  cursor: pointer
  font-weight: 500
  user-select: none

  &:after
    bottom: -2px
    content: ""
    display: block
    height: 1px
    left: 50%
    position: absolute
    background: var(--color-primary)
    transition: width 0.3s ease 0s, left 0.3s ease 0s
    width: 0

  &:hover:after
    width: 100%
    left: 0

  &__icon
    height: 1rem
    width: 1rem
    position: relative
    top: 1px
</style>