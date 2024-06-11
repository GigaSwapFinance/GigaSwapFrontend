<template>
  <div class="inline-tip">
    <slot></slot>
  </div>
</template>

<style scoped lang="sass">
.inline-tip
  display: inline
  font-size: 13px
  font-weight: 500
  background-color: var(--background-primary-light-2)
  color: var(--color-primary)
  padding: 2px 4px
  border-radius: 6px
  white-space: nowrap
</style>