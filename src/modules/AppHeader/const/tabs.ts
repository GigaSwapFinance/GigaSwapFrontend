import { ref } from 'vue'
import type { Tabs } from '@/modules/AppHeader/types/tab.type'

export const tabs = ref<Tabs>([
  {
    title: 'Browse',
    id: 'browse',
    to: '/',
  },

  {
    title: 'Create',
    id: 'create',
    to: '/create',
  },

  {
    title: 'Stats',
    id: 'stats',
    to: '/stats',
  },

  {
    title: 'Farming',
    id: 'farming',
    to: '/farming',
    // description: 'New',
  },

  {
    title: 'Locker',
    id: 'locker',
    to: '/lock',
    description: 'New',
  },
])

export const links = ref([
  {
    title: 'Whitepaper',
    url: 'https://giga-swap.gitbook.io/gigaswap/',
    icon: '/images/icons/document.svg',
  },

  {
    title: 'Telegram',
    url: 'https://t.me/gigaswapfinance',
    icon: '/images/socials/telegram.svg',
  },

  {
    title: 'X (Twitter)',
    url: 'https://x.com/gigaswapfinance',
    icon: '/images/socials/x.svg',
  },

  // {
  //   title: 'GitHub',
  //   url: 'https://github.com/GigaSwapFinance/GigaSwap',
  //   icon: '/images/socials/github.svg',
  // },

  // {
  //   title: 'About',
  //   url: 'https://gigaswap.finance',
  //   icon: '/images/icons/web.svg',
  // },
])