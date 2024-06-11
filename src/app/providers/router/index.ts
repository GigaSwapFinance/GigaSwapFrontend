import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { nextTick } from 'vue'
import { DEFAULT_APP_TITLE } from '@/shared/const/app'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.afterEach((to, from) => {
  // @ts-ignore
  const changeTitle = () => document.title = to.meta.title || DEFAULT_APP_TITLE
  return nextTick(changeTitle)
})

export default router
