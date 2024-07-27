import { defineComponent } from 'vue'
import ErrorPage from './ErrorPage'
import useGlobalProperties from '@utils/hooks/useGlobalProperties'

export default defineComponent({
    inheritAttrs: false,
    name: 'Error404',
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
