import { createApp } from 'vue'
import { createPinia } from 'pinia'

// styles
import '@/app/styles/index.sass'
import 'vue-image-svg/dist/style.css'

// providers
import i18n from '@/app/providers/i18n'
import router from '@/app/providers/router'

// components
import Image from 'vue-image-svg'
import Number from '@/shared/ui/Number.vue'
import App from '@/app/index.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(Image)
app.component('Number', Number)

app.mount('#app')

export default App