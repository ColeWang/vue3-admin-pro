import { defineComponent } from 'vue'
import { Icon, MenuOutlined } from '@/components/icon'
import { isFunction, isString } from 'lodash-es'

export default defineComponent({
    inheritAttrs: false,
    props: {
        type: {
            type: [String, Function],
            default: undefined
        }
    },
    setup (props, { attrs }) {
        return () => {
            if (isFunction(props.type)) {
                return props.type(attrs)
            }
            if (props.type && isString(props.type)) {
                return <Icon type={props.type}/>
            }
            return <MenuOutlined/>
        }
    }
})
