import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { ConfigProvider } from 'ant-design-vue'
import dayjs from 'dayjs'
// language
import zhCN_ant from 'ant-design-vue/es/locale/zh_CN'
import zhCN_day from 'dayjs/locale/zh-cn'

dayjs.locale(zhCN_day)

export default defineComponent({
    setup () {
        return () => {
            const providerProps = {
                locale: zhCN_ant
            }
            return (
                <ConfigProvider {...providerProps}>
                    <RouterView/>
                </ConfigProvider>
            )
        }
    }
})
