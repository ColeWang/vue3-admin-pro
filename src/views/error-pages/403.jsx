import { defineComponent } from 'vue'
import ErrorPage from './ErrorPage'
import useGlobalProperties from '@packages/hooks/useGlobalProperties'

export default defineComponent({
    inheritAttrs: false,
    name: 'Error403',
    setup (props, { attrs }) {
        const { $t } = useGlobalProperties()
        return () => {
            const subTitle = $t ? $t('errorPages.403') : '您无权访问此页面'
            return (
                <ErrorPage status={403} title={403} subTitle={subTitle}/>
            )
        }
    }
})
