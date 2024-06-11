<template>
  <Page padded class="page-restricted">
    <PageSection>
      <InfoBlock title="403" description="Sorry! GigaSwap is not allowed in your country or region." />
    </PageSection>
  </Page>
</template>

<script setup>
import InfoBlock from '@/components/InfoBlock.vue'
import PageSection from '@/shared/ui/pages/PageSection.vue'
import Page from '@/shared/ui/pages/Page.vue'
</script>