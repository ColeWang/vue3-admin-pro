import { defineComponent } from 'vue'
import { useGlobalProperties } from '@site-pro/hooks'
import ErrorPage from './ErrorPage'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProError404',
    setup (props, { attrs }) {
        const { $t } = useGlobalProperties()
        return () => {
            const subTitle = $t ? $t('errorPages.404') : '您访问的页面不存在'
            return (
                <ErrorPage status={404} title={404} subTitle={subTitle}/>
            )
        }
    }
})
