<template>
  <div class="loader">
    <div class="loader__inner">
      <Image src="/images/gigaswap/logo-head.svg" class="loader__logo" />
    </div>
  </div>
</template>

<style scoped lang="sass">
$animationDuration: 2s

.loader
  height: 100%
  width: 100%
  position: fixed
  top: 0
  left: 0
  background-color: var(--background-default)
  display: flex
  justify-content: center
  align-items: center
  z-index: 1000
  animation: fadeIn 0.5s ease

  &__logo
    height: 148px
    width: 148px
    animation: logo-animation $animationDuration ease infinite

  @media screen and (max-width: $breakpointMobile)
    &__logo
      height: 124px
      width: 124px

@keyframes logo-animation
  0%
    opacity: 1

  50%
    opacity: 0

  100%
    opacity: 1
</style>