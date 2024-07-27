import { defineComponent } from 'vue'
import ErrorPage from './ErrorPage'

export default defineComponent({
    inheritAttrs: false,
    setup (props, { attrs }) {
        return () => {
            return (
                <ErrorPage
                    status={404}
                    title={'404'}
                    subTitle={'Sorry, the page you visited does not exist.'}
                />
            )
        }
    }
})
