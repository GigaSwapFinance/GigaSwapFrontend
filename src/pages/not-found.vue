<template>
  <Page padded class="page-not-found">
    <PageSection>
      <InfoBlock title="404" description="Page not found 🥲">
        <BigButton @click="router.push('/')">Return to home page</BigButton>
      </InfoBlock>
    </PageSection>
  </Page>
</template>

<script setup>
import Page from '@/shared/ui/pages/Page.vue'
import PageSection from '@/shared/ui/pages/PageSection.vue'
import BigButton from '@/shared/ui/BigButton.vue'
import InfoBlock from '@/components/InfoBlock.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>