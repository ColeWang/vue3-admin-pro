import { defineComponent } from 'vue'
import ErrorContent from './ErrorContent'
import error500 from './images/error-500.svg'

export default defineComponent({
    setup () {
        return () => {
            return <ErrorContent code="500" desc="Oh~~鬼知道服务器经历了什么~" src={ error500 }/>
        }
    }
})
