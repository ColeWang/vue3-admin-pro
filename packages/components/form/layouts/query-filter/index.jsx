import { computed, defineComponent, ref, unref } from 'vue'
import { Col, Form, Row, theme } from 'ant-design-vue'
import { ResizeObserver } from '../../../resize-observer'
import { BaseForm } from '../../base-form'
import Actions from './Actions'
import useQueryFilter from './hooks/useQueryFilter'
import { genFormItemFixStyle } from '../../utils'
import { flattenChildren } from '../../../../utils/props-util'
import { useConfigInject } from '../../../../utils/extend'
import useStyle from './style'
import { pick } from 'lodash-es'

const queryFilterProps = {
    ...BaseForm.props,
    ...Actions.props,
    labelWidth: {
        type: [Number, String],
        default: undefined // 'auto'
    },
    defaultRowsNumber: {
        type: Number,
        default: 1
    },
    getSpanConfig: {
        type: Function,
        default: undefined
    },
    onResize: {
        type: Function,
        default: undefined
    },
    onCollapse: {
        type: Function,
        default: undefined
    }
}

export default defineComponent({
    inheritAttrs: false,
    props: queryFilterProps,
    emits: ['resize', 'collapse'],
    setup (props, { emit, slots, attrs, expose }) {
        const { prefixCls } = useConfigInject('pro-query-filter', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const { token } = theme.useToken()

        const baseFormRef = ref(null)

        const size = ref({ width: 0, height: 0 })

        const { layout, span, collapsed, setCollapse, genColNodes } = useQueryFilter(size, props)

        const rowProps = computed(() => {
            const { sizeMS, sizeLG } = unref(token)
            const baseProps = { gutter: [sizeMS, sizeLG] }
            return { ...baseProps, ...props.rowProps }
        })

        function onResize (value) {
            size.value = value
            emit('resize', value)
        }

        function onSubmit () {
            const context = unref(baseFormRef)
            context && context.submit()
        }

        function onReset () {
            const context = unref(baseFormRef)
            context && context.resetFields()
        }

        function onCollapse (value) {
            setCollapse && setCollapse(value)
            emit('collapse', value)
        }

        function getFormInstance () {
            return unref(baseFormRef)
        }

        expose({ getFormInstance })

        return () => {
            const { labelWidth } = props
            const { sizeMD } = unref(token)

            const formItemProps = genFormItemFixStyle(labelWidth || sizeMD * 4, unref(layout))
            const slotScope = { layout: unref(layout), props: formItemProps }

            const children = flattenChildren(slots.default ? slots.default(slotScope) : [])
            const { nodes: colNodes, offset, haveRow } = genColNodes(children, (item) => {
                const { child: fieldNode, hidden, key } = item || {}
                const colClass = { [`${prefixCls.value}-col-hidden`]: hidden }
                return (
                    <Col key={key} class={colClass} span={unref(span)}>
                        {() => fieldNode}
                    </Col>
                )
            })

            const baseFormProps = {
                ...pick(props, Object.keys(BaseForm.props)),
                layout: unref(layout),
                grid: false
            }

            const actionsProps = {
                ...pick(props, Object.keys(Actions.props)),
                collapsed: unref(collapsed),
                onSubmit: onSubmit,
                onReset: onReset,
                onCollapse: onCollapse
            }

            const needRowProps = { ...unref(rowProps), justify: 'start' }
            const colActionProps = { span: unref(span), offset: offset, key: 'action' }
            const formItemClass = {
                [`${prefixCls.value}-form-item__vertical`]: unref(layout) === 'vertical' && !haveRow
            }

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <ResizeObserver onResize={onResize}>
                        <BaseForm {...baseFormProps} ref={baseFormRef}>
                            <Row {...needRowProps}>
                                {colNodes}
                                <Col class={`${prefixCls.value}-action-col`} {...colActionProps}>
                                    <Form.Item class={formItemClass} colon={false}>
                                        <Actions {...actionsProps}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </BaseForm>
                    </ResizeObserver>
                </div>
            )
        }
    }
})
