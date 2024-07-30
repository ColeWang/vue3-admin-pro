import { defineComponent } from 'vue'
import ErrorPage from './ErrorPage'
import useGlobalProperties from '@packages/hooks/useGlobalProperties'

export default defineComponent({
    inheritAttrs: false,
    name: 'Error500',
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
