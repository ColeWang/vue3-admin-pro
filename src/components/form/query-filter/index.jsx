import { defineComponent, ref, unref } from 'vue'
import { Col, Form, Row } from 'ant-design-vue'
import { useLocaleReceiver } from '@/components/locale-provider'
import BaseForm from '../base-form'
import Submitter from '../components/Submitter'
import { filterEmptyElement } from '@/utils'
import useResizeObserver from '@/hooks/useResizeObserver'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

const breakpoints = {
    vertical: [
        [513, 24, 'vertical'],
        [785, 12, 'vertical'],
        [1057, 8, 'vertical'],
        [Infinity, 6, 'vertical']
    ],
    default: [
        [513, 24, 'vertical'],
        [701, 12, 'vertical'],
        [1352, 8, 'horizontal'],
        [Infinity, 6, 'horizontal']
    ]
}

function getSpanConfig (layout, width) {
    const spanConfig = breakpoints[layout || 'default']
    const breakPoint = spanConfig.find((item) => width < item[0])
    return { span: breakPoint[1], layout: breakPoint[2] }
}

function getOffset (length, span) {
    const cols = 24 / span
    return (cols - 1 - (length % cols)) * span
}

export default defineComponent({
    inheritAttrs: false,
    props: {
        ...BaseForm.props,
        style: {
            type: Object,
            default: undefined
        },
        layout: {
            type: String,
            default: 'default' // vertical
        },
        loading: {
            type: Boolean,
            default: false
        },
        gutter: {
            type: [Number, String],
            default: 24
        },
        labelWidth: {
            type: [Number, String],
            default: 80 // Number || 'auto' 只有在 layout 为 vertical 时生效
        },
        submitText: {
            type: String,
            default: undefined
        },
        resetText: {
            type: String,
            default: undefined
        }
    },
    setup (props, { slots, attrs, expose }) {
        const resizeRef = ref(null)
        const baseFormRef = ref(null)

        const { t } = useLocaleReceiver('Form')

        const colLayout = ref('vertical')
        const colSpan = ref(24)

        useResizeObserver(resizeRef, (entries) => {
            const entry = entries[0]
            const { width } = entry.contentRect
            const spanSize = getSpanConfig(props.layout, width)
            colLayout.value = spanSize.layout
            colSpan.value = spanSize.span
        })

        function onSubmit () {
            const context = unref(baseFormRef)
            context && context.submit()
        }

        function onReset () {
            const context = unref(baseFormRef)
            context && context.resetForm()
        }

        function genFormItemFixStyle (labelWidth) {
            if (labelWidth && unref(colLayout) !== 'vertical' && labelWidth !== 'auto') {
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

        function getFormInstance () {
            return unref(baseFormRef)
        }

        expose({ getFormInstance })

        return () => {
            const { loading, labelWidth, gutter, submitText, resetText, ...restProps } = props

            const baseFormProps = {
                ...attrs,
                ...restProps,
                ref: baseFormRef,
                layout: unref(colLayout)
            }

            const submitterProps = {
                config: {
                    submitText: submitText || t('search'),
                    resetText: resetText
                },
                loading: loading,
                onSubmit: onSubmit,
                onReset: onReset
            }

            const slotScope = {
                layout: unref(colLayout),
                props: genFormItemFixStyle(labelWidth)
            }

            const nodes = filterEmptyElement(slots.default ? slots.default(slotScope) : [])
            const offset = getOffset(nodes.length, unref(colSpan))

            return (
                <BaseForm {...baseFormProps}>
                    <div ref={resizeRef}>
                        <Row gutter={gutter} class={cx('query-filter')} justify={'start'}>
                            {
                                nodes.map((item) => {
                                    return <Col span={unref(colSpan)}>{item}</Col>
                                })
                            }
                            <Col key={'submitter'} class={cx('submitter-col')} span={unref(colSpan)} offset={offset}>
                                <Form.Item colon={false}>
                                    <Submitter {...submitterProps}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                </BaseForm>
            )
        }
    }
})
