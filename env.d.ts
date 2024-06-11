/// <reference types="vite/client" />

import index from '@/app/providers/i18n'

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $t: typeof index
  }
}