import { cloneVNode, defineComponent, onMounted, ref, unref } from 'vue'
import { QueryFilter } from '../../../form'
import { Card, theme } from 'ant-design-vue'
import { filterEmptyElement, isValidElement } from '../../../_utils/props-util'

export default defineComponent({
    inheritAttrs: false,
    props: {
        ...QueryFilter.props,
        manualRequest: {
            type: Boolean,
            default: false
        }
    },
    setup (props, { attrs, slots }) {
        const queryFilterRef = ref(null)

        const { token } = theme.useToken()

        onMounted(() => {
            !props.manualRequest && onSubmit()
        })

        function onSubmit () {
            const context = unref(queryFilterRef)
            if (context && context.getFormInstance) {
                const formInstance = context.getFormInstance()
                formInstance && formInstance.submit()
            }
        }

        return () => {
            const { sizeMS } = unref(token)

            const children = filterEmptyElement(slots.default ? slots.default() : [])
            const queryFilterProps = { ...attrs, ...props }
            return (
                <Card style={{ marginBlockEnd: `${sizeMS}px` }}>
                    <QueryFilter {...queryFilterProps} ref={queryFilterRef}>
                        {(slotScope) => {
                            return children.map((vNode) => {
                                if (!isValidElement(vNode)) return vNode
                                const { fieldProps, formItemProps } = vNode.props
                                const extraProps = {
                                    fieldProps: { ...fieldProps, style: { width: '100%' } },
                                    formItemProps: { ...formItemProps, ...slotScope.props }
                                }
                                return cloneVNode(vNode, extraProps)
                            })
                        }}
                    </QueryFilter>
                </Card>
            )
        }
    }
})
