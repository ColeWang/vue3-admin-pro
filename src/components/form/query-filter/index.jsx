import { defineComponent, ref, unref, watch, computed } from 'vue'
import { Col, Form, Row, Space, Button } from 'ant-design-vue'
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue'
import { useLocaleReceiver } from '@/components/locale-provider'
import BaseForm from '../base-form'
import Submitter from '../components/Submitter'
import { cloneProxyToRaw, filterEmptyElement, isValidElement } from '@/utils'
import { isUndefined, filter } from 'lodash-es'
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
        [725, 12, 'vertical'],
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
        },
        collapseRender: {
            type: Boolean,
            default: false
        },
        collapsed: {
            type: Boolean,
            default: true
        },
        defaultRowsNumber: {
            type: Number,
            default: 1
        }
    },
    emits: ['collapse'],
    setup (props, { slots, emit, attrs, expose }) {
        const resizeRef = ref(null)
        const baseFormRef = ref(null)

        const { t } = useLocaleReceiver('Form')

        const colLayout = ref('vertical')
        const colSpan = ref(24)

        const sCollapsed = ref(props.collapsed)

        const colsNumber = computed(() => {
            const n = 24 / unref(colSpan)
            if (!isUndefined(props.defaultRowsNumber)) {
                return Math.max(1, (n * props.defaultRowsNumber) - 1)
            }
            return Math.max(1, n - 1)
        })

        watch(() => props.collapsed, (value) => {
            sCollapsed.value = value
        }, { immediate: true })

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

        function onCollapse () {
            const nextValue = !unref(sCollapsed)
            sCollapsed.value = nextValue
            emit('collapse', nextValue)
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

        function getValues () {
            const formInstance = unref(baseFormRef)
            if (formInstance && formInstance.model) {
                const { model } = formInstance
                return cloneProxyToRaw(unref(model))
            }
            return {}
        }

        expose({ getFormInstance, getValues })

        return () => {
            const { loading, labelWidth, gutter, submitText, resetText, collapseRender, ...restProps } = props

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

            const children = slots.default ? slots.default(slotScope) : []
            const nodes = filterEmptyElement(children).map((child, index) => {
                const propsHidden = child.props && child.props.hidden || false
                const colHidden = propsHidden || unref(sCollapsed) && (index > unref(colsNumber) - 1)
                const hidden = collapseRender ? colHidden : propsHidden
                const key = (isValidElement(child) && child.key) || index
                const node = (
                    <Col class={cx({ 'col-hidden': hidden })} span={unref(colSpan)} key={key}>
                        {child}
                    </Col>
                )
                return { child: node, hidden: hidden }
            })

            const showCols = filter(nodes, (c) => !c.hidden)
            const offset = getOffset(showCols.length, unref(colSpan))

            const haveRow = unref(colSpan) + offset === 24
            const formItemClassNames = cx({ 'form-item-vertical': unref(colLayout) === 'vertical' && !haveRow })

            const collapseDom = collapseRender && (
                <Button class={cx('collapse-button')} type={'link'} onClick={onCollapse}>
                    <span>{!unref(sCollapsed) ? t('expand') : t('collapsed')}</span>
                    {unref(sCollapsed) ? <DownOutlined/> : <UpOutlined/>}
                </Button>
            )

            return (
                <BaseForm {...baseFormProps}>
                    <div ref={resizeRef}>
                        <Row gutter={gutter} class={cx('query-filter')} justify={'start'}>
                            {nodes.map((c) => c.child)}
                            <Col key={'action'} class={cx('action-col')} span={unref(colSpan)} offset={offset}>
                                <Form.Item class={formItemClassNames} colon={false}>
                                    <Space size={8}>
                                        <Submitter {...submitterProps}/>
                                        {collapseDom}
                                    </Space>
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                </BaseForm>
            )
        }
    }
})
