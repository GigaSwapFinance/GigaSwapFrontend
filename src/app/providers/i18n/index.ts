import { createI18n } from 'vue-i18n'
import { messages } from './locales'

const index = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
  globalInjection: true,
})

export default index