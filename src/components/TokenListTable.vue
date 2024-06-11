<template>
  <div class="token-list-table">
    <Table class="token-list-table__body">
      <template v-slot:header>
        <th>Token</th>
        <th>Volume 24h</th>
        <th>Volume All Time</th>
        <th>TVL 24h</th>
      </template>

      <template v-slot:rows>
        <tr v-for="token in tokens" class="token-list-table__item">
          <td>
            <div class="token-item">
              <Image :src="token.icon" class="token-item__icon" />

              <div class="token-item__title">{{ token.title }}</div>
            </div>
          </td>

          <td>
            ≈ $0.0001
          </td>

          <td>
            ≈ $0.0001
          </td>

          <td>
            —
          </td>
        </tr>
      </template>
    </Table>
  </div>
</template>

<script setup>
import Table from '@/components/Table.vue'

const tokens = [
  {
    title: 'ERC20T',
    icon: '/images/icons/question-mark.svg',
  },

  // {
  //   title: 'gWETH',
  //   icon: '/images/currencies/gweth.svg',
  // },
]
</script>

<style scoped lang="sass">
.token-item
  display: flex
  align-items: center
  gap: 12px

  &__icon
    height: 32px
    width: 32px
    outline: 1px solid var(--background-stroke)
    border-radius: 50%
</style>