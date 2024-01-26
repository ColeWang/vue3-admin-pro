import { createApp } from 'vue'
import Root from '@/App'
import router from '@/router'
import pinia from '@/store'
import i18n from '@/locale'
// CSS
import '@/styles/base.css'
import '@/styles/transition.scss'
import '@/styles/nprogress.scss'

const app = createApp(Root)
app.use(router)
app.use(pinia)
app.use(i18n)

app.mount('#app')
