<template>
  <Page padded class="page-token">
    <PageSection >
      <InfoBlock title="$GIGA Token" description="The best ERC-20 token ever" image="/images/currencies/giga.svg">
        <BigButton @click="router.push('/')">Return to home page</BigButton>
      </InfoBlock>
    </PageSection>
  </Page>
</template>

<script setup lang="ts">
import Page from '@/shared/ui/pages/Page.vue'
import PageSection from '@/shared/ui/pages/PageSection.vue'
import BigButton from '@/shared/ui/BigButton.vue'
import InfoBlock from '@/components/InfoBlock.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>