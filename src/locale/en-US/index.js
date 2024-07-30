import antd from 'ant-design-vue/es/locale/en_US'
import packages from '@packages/components/locale-provider/lang/en-US'
import dayjs from 'dayjs/locale/en'
// --
import routes from './routes'
import layout from './layout'
import errorPages from './error-pages'

export default {
    locale: 'en-US',
    antd: antd,
    packages: packages,
    dayjs: dayjs,
    routes: routes,
    layout: layout,
    errorPages: errorPages
}
