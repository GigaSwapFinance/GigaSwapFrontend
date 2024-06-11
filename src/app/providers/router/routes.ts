export const routes = [
  {
    path: '/',
    name: 'browse',
    component: () => import('@/pages/trades.vue'),
  },

  {
    path: '/direct',
    name: 'direct',
    component: () => import('@/pages/trades.vue'),
  },

  {
    path: '/fractional',
    name: 'fractional',
    component: () => import('@/pages/trades.vue'),
  },

  {
    path: '/trade/:id',
    name: 'trade',
    component: () => import('@/pages/trade.vue'),
  },

  {
    path: '/farming',
    name: 'farming',
    component: () => import('@/pages/farming.vue'),
    meta: { title: 'GigaSwap: Farming' },
  },

  {
    path: '/create',
    name: 'create',
    component: () => import('@/pages/create.vue'),
  },

  {
    path: '/stats',
    name: 'stats',
    component: () => import('@/pages/stats.vue'),
    meta: { title: 'GigaSwap: Stats' },
  },

  {
    path: '/terms',
    name: 'terms',
    component: () => import('@/pages/terms.vue'),
    meta: { title: 'GigaSwap: Terms of Use' },
  },

  {
    path: '/token',
    name: 'token',
    component: () => import('@/pages/token.vue'),
    meta: { title: 'GigaSwap: $GIGA Token' },
  },

  {
    path: '/wrap',
    name: 'wrap',
    component: () => import('@/pages/wrap.vue'),
    meta: { title: 'GigaSwap: Wrap Ether' },
  },

  {
    path: '/unwrap',
    redirect: '/wrap?unwrap',
  },

  {
    path: '/lock',
    name: 'lock',
    component: () => import('@/pages/lock.vue'),
    meta: { title: 'GigaSwap: Locker' },
  },

  {
    path: '/locks',
    name: 'locks',
    component: () => import('@/pages/locks.vue'),
    meta: { title: 'GigaSwap: Locker' },
  },

  {
    path: '/403',
    name: 'restricted',
    component: () => import('@/pages/restricted.vue'),
    meta: { title: 'GigaSwap: 403', hideLayout: true },
  },

  {
    path: '/404',
    name: 'not-found',
    component: () => import('@/pages/not-found.vue'),
    meta: { title: 'GigaSwap: 404' },
  },

  {
    path: "/:pathMatch(.*)*",
    redirect: '/404',
  },
]