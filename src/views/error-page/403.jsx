import { defineComponent } from 'vue'
import ErrorPage from './ErrorPage'

export default defineComponent({
    inheritAttrs: false,
    setup (props, { attrs }) {
        return () => {
            return (
                <ErrorPage
                    status={403}
                    title={'403'}
                    subTitle={'Sorry, you are not authorized to access this page.'}
                />
            )
        }
    }
})
