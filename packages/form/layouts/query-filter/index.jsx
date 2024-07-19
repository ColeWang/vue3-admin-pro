import { defineComponent, ref, unref } from 'vue'
import { Col, Form, Row } from 'ant-design-vue'
import ResizeObserver from '../../../resize-observer'
import BaseForm from '../../base-form'
import Actions from './Actions'
import useQueryFilter from './hooks/useQueryFilter'
import { genFormItemFixStyle } from '../../utils'
import { filterEmptyElement } from '../../../_utils/props-util'
import { useConfigInject } from '../../../_utils/extend'
import useStyle from './style'
import { pick } from 'lodash-es'

const queryFilterProps = {
    ...BaseForm.props,
    ...Actions.props,
    span: {
        type: Number,
        default: undefined
    },
    gutter: {
        type: [Number, String],
        default: 24
    },
    labelWidth: {
        type: [Number, String],
        default: 80 // 'auto'
    },
    defaultRowsNumber: {
        type: Number,
        default: 1
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
    setup (props, { slots, emit, attrs, expose }) {
        const { prefixCls } = useConfigInject('pro-query-filter', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        const baseFormRef = ref(null)

        const size = ref({ width: 0, height: 0 })

        const { layout, span, collapsed, setCollapse, genColNodes } = useQueryFilter(size, props)

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
            const { labelWidth, gutter } = props

            const slotScope = {
                layout: unref(layout),
                props: genFormItemFixStyle(labelWidth, unref(layout))
            }

            const children = filterEmptyElement(slots.default ? slots.default(slotScope) : [])
            const { nodes: colNodes, offset, haveRow } = genColNodes(children, (item) => {
                const { child, hidden, key } = item || {}
                const colClass = { [`${prefixCls.value}-col-hidden`]: hidden }
                return (
                    <Col key={key} class={colClass} span={unref(span)}>{child}</Col>
                )
            })

            const baseFormProps = {
                ...attrs,
                ...pick(props, Object.keys(BaseForm.props)),
                layout: unref(layout)
            }

            const actionsProps = {
                ...pick(props, Object.keys(Actions.props)),
                collapsed: unref(collapsed),
                onSubmit: onSubmit,
                onReset: onReset,
                onCollapse: onCollapse
            }

            const formItemClass = { [`${prefixCls.value}-form-item__vertical`]: unref(layout) === 'vertical' && !haveRow }

            return wrapSSR(
                <BaseForm {...baseFormProps} ref={baseFormRef}>
                    <ResizeObserver class={[prefixCls.value, hashId.value]} onResize={onResize}>
                        <Row class={`${prefixCls.value}-row`} gutter={gutter} justify={'start'}>
                            {colNodes}
                            <Col
                                class={`${prefixCls.value}-action-col`}
                                key={'action'}
                                span={unref(span)}
                                offset={offset}
                            >
                                <Form.Item class={formItemClass} colon={false}>
                                    <Actions {...actionsProps}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </ResizeObserver>
                </BaseForm>
            )
        }
    }
})
