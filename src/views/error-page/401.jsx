import { defineComponent } from 'vue'
import ErrorContent from './ErrorContent'
import error401 from './images/error-401.svg'

export default defineComponent({
    setup () {
        return () => {
            return <ErrorContent code="401" desc="Oh~~您没有浏览这个页面的权限~" src={ error401 }/>
        }
    }
})
