import { createApp } from 'vue'
import Root from '@/App'
import router from '@/router'
import pinia from '@/stores'
import i18n from '@/locale'
// CSS
import 'ant-design-vue/es/style/reset.css'
import '@/css/base.css'
import '@/css/transition.scss'
import '@/css/nprogress.scss'

const app = createApp(Root)
app.use(router)
app.use(pinia)
app.use(i18n)

app.mount('#app')
