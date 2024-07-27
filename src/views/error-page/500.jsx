import { defineComponent } from 'vue'
import ErrorPage from './ErrorPage'

export default defineComponent({
    inheritAttrs: false,
    setup (props, { attrs }) {
        return () => {
            return (
                <ErrorPage
                    status={500}
                    title={'500'}
                    subTitle={'Sorry, the server is wrong.'}
                />
            )
        }
    }
})
