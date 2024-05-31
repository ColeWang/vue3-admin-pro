import { cloneVNode, defineComponent, onMounted, ref, unref } from 'vue'
import { QueryFilter } from '@/components/form'
import { Card } from 'ant-design-vue'
import { isValidElement } from '@/utils/props-util'

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
            const queryFilterProps = { ...attrs, ...props }

            const cardProps = {
                bodyStyle: {
                    paddingInline: '24px'
                },
                style: {
                    marginBottom: '16px'
                }
            }

            return (
                <Card {...cardProps}>
                    <QueryFilter{...queryFilterProps} ref={queryFilterRef}>
                        {
                            (slotScope) => {
                                const children = slots.default ? slots.default() : []
                                return children.map((vNode) => {
                                    if (!isValidElement(vNode)) {
                                        return vNode
                                    }
                                    const { fieldProps, formItemProps } = vNode.props
                                    const extraProps = {
                                        fieldProps: { ...fieldProps, style: { width: '100%' } },
                                        formItemProps: { ...formItemProps, ...slotScope.props }
                                    }
                                    return cloneVNode(vNode, extraProps)
                                })
                            }
                        }
                    </QueryFilter>
                </Card>
            )
        }
    }
})
