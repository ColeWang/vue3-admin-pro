import antd from 'ant-design-vue/es/locale/zh_CN'
import { zhCN } from '@site-pro/components/locale'
import dayjs from 'dayjs/locale/zh-cn'
// --
import routes from './routes'
import layout from './layout'
import errorPages from './error-pages'

export default {
    locale: 'zh-CN',
    antd: antd,
    site: zhCN,
    dayjs: dayjs,
    // --
    routes: routes,
    layout: layout,
    errorPages: errorPages
}
