import antd from 'ant-design-vue/es/locale/en_US'
import { enUS } from '@site-pro/components/locale'
import dayjs from 'dayjs/locale/en'
// --
import routes from './routes'
import layout from './layout'
import errorPages from './error-pages'

export default {
    locale: 'en-US',
    antd: antd,
    site: enUS,
    dayjs: dayjs,
    routes: routes,
    layout: layout,
    errorPages: errorPages
}
