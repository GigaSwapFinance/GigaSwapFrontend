<template>
  <aside class="aside" @click="onAsideClick">
    <Image v-if="icon" :src="icon" class="aside__icon" />
    <slot />
  </aside>
</template>

<script setup lang="ts">
const props = defineProps({
  icon: {
    type: String,
  },

  clickUrl: {
    type: String,
  },
})

function onAsideClick() {
  if (props.clickUrl) {
    window.open(props.clickUrl)
  }
}
</script>

<style scoped lang="sass">
.aside
  display: flex
  align-items: center
  justify-content: center
  height: 46px
  text-align: center
  user-select: none
  font-weight: 600
  background: var(--gradient-primary)
  font-family: var(--font-1)
  color: rgb(0, 0, 0)

  &__icon
    width: 20px
    height: 20px
    margin-right: 8px
    filter: drop-shadow(var(--shadow-text))

  @media screen and (max-width: $breakpointMobile)
    height: 44px
</style>