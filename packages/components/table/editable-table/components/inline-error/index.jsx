import { defineComponent, ref, unref } from 'vue'
import { Popover, theme } from 'ant-design-vue'
import { cloneProxyToRaw } from '../../../../../utils/util'
import { pick } from 'lodash-es'

const WithHelp = defineComponent({
    inheritAttrs: false,
    props: {
        errors: {
            type: Array,
            default: () => ([])
        }
    },
    setup (props) {
        const { token } = theme.useToken()

        const cacheErrors = cloneProxyToRaw(props.errors)
        return () => {
            const { fontSize, colorError, lineHeight } = unref(token)

            const errorStyle = {
                fontSize: fontSize,
                color: colorError,
                lineHeight: lineHeight
            }
            return (
                <div style={errorStyle}>
                    {cacheErrors}
                </div>
            )
        }
    }
})

export default defineComponent({
    inheritAttrs: false,
    props: {
        ...Popover.props,
        trigger: {
            type: String,
            default: 'click'
        },
        placement: {
            type: String,
            default: 'topLeft'
        },
        errors: {
            type: Array,
            default: () => ([])
        }
    },
    setup (props, { slots }) {
        const sOpen = ref(false)

        function onOpenChange (value) {
            if (value !== unref(sOpen)) {
                sOpen.value = value
            }
        }

        return () => {
            const { errors } = props

            const popoverProps = {
                ...pick(props, Object.keys(Popover.props)),
                destroyTooltipOnHide: true,
                open: errors.length !== 0 ? unref(sOpen) : false,
                onOpenChange: onOpenChange
            }
            return (
                <Popover {...popoverProps} v-slots={{
                    content: () => <WithHelp errors={errors}/>
                }}>
                    {slots.default && slots.default()}
                </Popover>
            )
        }
    }
})
