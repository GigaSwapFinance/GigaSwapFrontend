<template>
  <Page class="page-stats">
    <PageSection class="page-stats__block">
      <InfoBlock
          title="GigaSwap Stats"
          description="Platform volume, TVL and more"
          image="/images/gigaswap/arts/handshake.png"
      />
    </PageSection>

    <PageSection class="page-stats__section page-stats__stats">
      <div class="page-stats__stats-header">
        <div class="page-stats__stats-title heading-4">Overview</div>
      </div>

      <div class="page-stats__stats-body">
        <StatsBlock
            title="Volume All Time"
            icon="/images/icons/chart.svg"
            class="page-stats__stats-block"
        >
          <Number prefix="$">811968.45</Number>
        </StatsBlock>

        <StatsBlock
            title="Volume 24h"
            value="$0"
            icon="/images/icons/grow.svg"
            class="page-stats__stats-block"
        >
          <Number prefix="$">0</Number>
        </StatsBlock>

        <StatsBlock
            title="Total Value Locked"
            icon="/images/icons/lock.svg"
            class="page-stats__stats-block"
        >
          —
        </StatsBlock>
      </div>
    </PageSection>

<!--    <PageSection class="page-stats__section page-stats__stats">-->
<!--      <div class="page-stats__stats-header">-->
<!--        <div class="page-stats__stats-title heading-4">Tokens</div>-->
<!--      </div>-->

<!--      <div class="page-stats__stats-body">-->
<!--        <TokenListTable class="page-stats__table" />-->
<!--      </div>-->
<!--    </PageSection>-->
  </Page>
</template>

<script setup>
import Page from '@/shared/ui/pages/Page.vue'
import PageSection from '@/shared/ui/pages/PageSection.vue'
import InfoBlock from '@/components/InfoBlock.vue'
import StatsBlock from '@/components/StatsBlock.vue'
import TokenListTable from '@/components/TokenListTable.vue'
import Number from '@/shared/ui/Number.vue'
</script>

<style scoped lang="sass">
.page-stats
  &__block
    background-color: var(--background-secondary)

  &__stats
    padding: 36px 16px

    &-body
      display: flex
      gap: 16px
      width: 100%

    &-block
      width: 100%

  &__table
    width: 100%

  @media screen and (max-width: $breakpointMobile)
    &__stats
      &-body
        flex-direction: column
</style>