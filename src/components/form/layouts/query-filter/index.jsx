import { defineComponent, ref, unref } from 'vue'
import { Col, Form, Row } from 'ant-design-vue'
import BaseForm from '../../base-form'
import Actions from './Actions'
import { useLocaleReceiver } from '@/components/locale-provider'
import useQueryFilter from './hooks/useQueryFilter'
import { pick } from 'lodash-es'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

function genFormItemFixStyle (labelWidth, layout) {
    if (labelWidth && layout !== 'vertical' && labelWidth !== 'auto') {
        return {
            labelCol: {
                flex: `0 0 ${labelWidth}px`,
            },
            wrapperCol: {
                style: {
                    maxWidth: `calc(100% - ${labelWidth}px)`,
                }
            },
            style: {
                flexWrap: 'nowrap'
            }
        }
    }
    return undefined
}

const queryFilterProps = {
    ...BaseForm.props,
    ...Actions.props,
    gutter: {
        type: [Number, String],
        default: 24
    },
    labelWidth: {
        type: [Number, String],
        default: 80
    },
    defaultRowsNumber: {
        type: Number,
        default: 1
    },
    onCollapse: {
        type: Function,
        default: undefined
    }
}

export default defineComponent({
    inheritAttrs: false,
    props: queryFilterProps,
    emits: ['collapse'],
    setup (props, { slots, emit, attrs, expose }) {
        const resizeRef = ref(null)
        const baseFormRef = ref(null)

        const { t } = useLocaleReceiver('Form')
        const { layout, span, collapsed, setCollapse, genColNodes } = useQueryFilter(resizeRef, props)

        function onSubmit () {
            const context = unref(baseFormRef)
            context && context.submit()
        }

        function onReset () {
            const context = unref(baseFormRef)
            context && context.resetFields()
        }

        function onCollapse (value) {
            setCollapse(value)
            emit('collapse', value)
        }

        function getFormInstance () {
            return unref(baseFormRef)
        }

        expose({ getFormInstance })

        return () => {
            const { labelWidth, gutter, submitText } = props

            const slotScope = {
                layout: unref(layout),
                props: genFormItemFixStyle(labelWidth, unref(layout))
            }

            const children = slots.default ? slots.default(slotScope) : []
            const { nodes: colNodes, offset, haveRow } = genColNodes(children, (item) => {
                const { child, hidden, key } = item
                const colClassNames = cx({ 'col-hidden': hidden })
                return (
                    <Col key={key} class={colClassNames} span={unref(span)}>{child}</Col>
                )
            })

            const baseFormProps = {
                ...attrs,
                ...pick(props, Object.keys(BaseForm.props)),
                layout: unref(layout)
            }

            const actionsProps = {
                ...pick(props, Object.keys(Actions.props)),
                submitText: submitText || t('search'),
                collapsed: unref(collapsed),
                onSubmit: onSubmit,
                onReset: onReset,
                onCollapse: onCollapse
            }

            const formItemClassNames = cx({
                'form-item__vertical': unref(layout) === 'vertical' && !haveRow
            })

            return (
                <BaseForm {...baseFormProps} ref={baseFormRef}>
                    <div ref={resizeRef}>
                        <Row gutter={gutter} class={cx('query-filter')} justify={'start'}>
                            {colNodes}
                            <Col key={'action'} class={cx('action-col')} span={unref(span)} offset={offset}>
                                <Form.Item class={formItemClassNames} colon={false}>
                                    <Actions {...actionsProps}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                </BaseForm>
            )
        }
    }
})
