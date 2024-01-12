import { defineComponent } from 'vue'
import ErrorContent from './ErrorContent'
import error404 from './images/error-404.svg'

export default defineComponent({
    setup () {
        return () => {
            return <ErrorContent code="404" desc="Oh~~您的页面好像飞走了~" src={ error404 }/>
        }
    }
})
