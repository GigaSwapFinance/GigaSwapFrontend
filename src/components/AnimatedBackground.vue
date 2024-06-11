<template>
  <div class="animated-background">
    <div class="loader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped lang="sass">
.animated-background
  top: 0
  //background: #fff
  right: 0
  bottom: 0
  position: absolute
  left: 0
  overflow: hidden
  filter: blur(4px)
  width: 100vw

.loader
  text-align: center
  display: flex
  justify-content: space-around
  flex-wrap: wrap

  span
    width: 128px
    height: 128px
    background: url("/images/gigaswap/logo-head.svg")
    background-size: cover
    opacity: 0
    animation: loader 10s infinite linear

    &:nth-child(5n+5)
      -webkit-animation-delay: 1.3s
      -moz-animation-delay: 1.3s
      animation-delay: 1.3s

    &:nth-child(3n+2)
      -webkit-animation-delay: 1.5s
      -moz-animation-delay: 1.5s
      animation-delay: 1.5s

    &:nth-child(2n+5)
      -webkit-animation-delay: 1.7s
      -moz-animation-delay: 1.7s
      animation-delay: 1.7s

    &:nth-child(3n+10)
      -webkit-animation-delay: 2.7s
      -moz-animation-delay: 2.7s
      animation-delay: 2.7s

    &:nth-child(7n+2)
      -webkit-animation-delay: 3.5s
      -moz-animation-delay: 3.5s
      animation-delay: 3.5s

    &:nth-child(4n+5)
      -webkit-animation-delay: 5.5s
      -moz-animation-delay: 5.5s
      animation-delay: 5.5s

    &:nth-child(3n+7)
      -webkit-animation-delay: 8s
      -moz-animation-delay: 8s
      animation-delay: 8s

@keyframes loader
  0%
    width: 128px
    height: 128px
    opacity: 0
    transform: translate(0, 0vh) rotateZ(0deg)

  25%
    width: 128px
    height: 128px
    opacity: 1
    transform: translate(0, 25vh) rotateZ(90deg)

  75%
    width: 128px
    height: 128px
    opacity: 1
    transform: translate(5vw, 75vh) rotateZ(270deg)

  100%
    width: 128px
    height: 128px
    opacity: 0
    transform: translate(10vw, 100vh) rotateZ(360deg)

@media screen and (max-width: $breakpointMobile)
  .loader span
    max-height: 48px
    max-width: 48px
</style>