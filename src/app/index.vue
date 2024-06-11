<template>
  <template v-if="showElements">
    <AppAside icon="/images/icons/star.svg">The long-awaited V2.5 is finally here!</AppAside>
    <AppHeader class="app__header" />
  </template>

  <RouterView class="app__page" />
  <AppModal class="app__modal" />
  <AppLoader v-if="layoutStore.isLoading" class="app__loader" />
</template>

<script setup>
import AppHeader from '@/modules/AppHeader'
import AppModal from '@/modules/AppModal'
import AppLoader from '@/components/AppLoader.vue'
import AppAside from '@/modules/AppAside'
import { computed, onMounted } from 'vue'
import { checkForConnection } from '@/shared/lib/user'
import { useRoute } from 'vue-router'
import { useAppStore, useLayoutStore } from '@/stores'

const layoutStore = useLayoutStore()
const appStore = useAppStore()
const route = useRoute()
const showElements = computed(() => !route.meta.hideLayout)

onMounted(initApp)

function initApp() {
  appStore.resetSettings()
  checkForConnection()
}
</script>

<style scoped lang="sass">
//.app
</style>