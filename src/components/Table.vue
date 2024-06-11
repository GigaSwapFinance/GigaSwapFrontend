<template>
  <div class="table__wrapper scrollbar-visible">
    <table class="table">
      <tr class="table__header">
        <slot name="header"></slot>
      </tr>

      <slot name="rows"></slot>
    </table>
  </div>
</template>

<style lang="sass">
.table
  &__wrapper
    display: flex
    flex-direction: column
    overflow-y: auto
    width: inherit

  &__header
    border-bottom: 1px solid var(--background-stroke)

    th
      padding: 16px 0
      color: var(--color-secondary)
      text-align: left

      &:not(:last-child)
        padding-right: 16px

  td
    padding: 16px 0
    white-space: nowrap
    color: var(--color-default)
    vertical-align: middle
    font-weight: 500

    &:not(:last-child)
      padding-right: 16px
</style>