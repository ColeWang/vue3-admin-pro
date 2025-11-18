import { defineComponent } from 'vue'
import { useGlobalProperties } from '@site-pro/hooks'
import ErrorPage from './ErrorPage'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProError500',
    setup (props, { attrs }) {
        const { $t } = useGlobalProperties()
        return () => {
            const subTitle = $t ? $t('errorPages.500') : '服务器错误'
            return (
                <ErrorPage status={500} title={500} subTitle={subTitle}/>
            )
        }
    }
})
