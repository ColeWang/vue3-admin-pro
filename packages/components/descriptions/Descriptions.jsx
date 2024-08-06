import { defineComponent, ref } from 'vue'
import { ConfigProvider, Descriptions, Form, Spin } from 'ant-design-vue'
import { BaseField } from '../base-field'
import useFetchData from './hooks/useFetchData'
import { flattenChildren, getPropsSlot, getSlotVNode } from '../../utils/props-util'
import { getElement } from '../../utils/dom'
import { useConfigInject } from '../../utils/extend'
import useStyle from './style'
import { isFunction, omit, pick } from 'lodash-es'

const extraProps = {
    dataSource: {
        type: Object,
        default: () => ({})
    },
    columns: {
        type: Array,
        default: () => ([])
    },
    emptyText: {
        type: String,
        default: '-'
    }
}

export default defineComponent({
    inheritAttrs: false,
    props: {
        ...Descriptions.props,
        ...extraProps,
        request: {
            type: Function,
            default: undefined
        },
        params: {
            type: Object,
            default: () => ({})
        },
        onLoad: {
            type: Function,
            default: undefined
        },
        onRequestError: {
            type: Function,
            default: undefined
        }
    },
    emits: ['load', 'requestError'],
    setup (props, { emit, slots, attrs, expose }) {
        const { prefixCls } = useConfigInject('pro-descriptions', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        const popupContainer = ref(null)

        const { context: requestProps, onReload } = useFetchData(props.request, props, {
            manualRequest: !props.request,
            onLoad: (dataSource) => emit('load', dataSource),
            onRequestError: (err) => emit('requestError', err)
        })

        function schemaToDescsItem (columns, emptyText) {
            return columns.map((item, index) => {
                const { fieldProps, formItemProps, __SLOTS__: itemSlots } = item
                const { valueType, dataIndex, name, label } = item

                const namePath = dataIndex || name || item.key
                const title = isFunction(item.title) ? item.title() : (item.title || label)

                const descsItemProps = {
                    ...pick(item, Object.keys(Descriptions.Item.props)),
                    key: item.key || label || index,
                    label: title
                }
                const needItemSlots = pick(itemSlots, ['label'])
                if (!valueType && !namePath) {
                    const children = itemSlots.default && itemSlots.default(requestProps.dataSource)
                    return (
                        <Descriptions.Item {...descsItemProps} v-slots={needItemSlots}>
                            {children ?? emptyText}
                        </Descriptions.Item>
                    )
                }

                const needFormItemProps = {
                    ...pick(item, Object.keys(Form.Item.props)),
                    ...formItemProps,
                    name: namePath,
                    model: requestProps.dataSource
                }
                const needFieldProps = {
                    ...pick(item, Object.keys(BaseField.props)),
                    mode: 'read',
                    emptyText: emptyText,
                    fieldProps: fieldProps,
                    formItemProps: needFormItemProps
                }
                const fieldSlots = omit(itemSlots, ['label'])
                return (
                    <Descriptions.Item {...descsItemProps} v-slots={needItemSlots}>
                        <BaseField {...needFieldProps} v-slots={fieldSlots}/>
                    </Descriptions.Item>
                )
            })
        }

        function getColumns (children, columns) {
            const childrenColumns = children.map((item) => {
                const slots = omit((item.children || {}), ['_ctx'])
                return { ...item.props, __SLOTS__: slots }
            })
            return [...columns, ...childrenColumns]
                .filter((item) => !item.hide && !item.hideInDescriptions)
                .sort((a, b) => (a.order || 0) - (b.order || 0))
        }

        expose({ reload: onReload })

        return () => {
            const { columns, emptyText } = props

            const nodes = flattenChildren(slots.default ? slots.default() : [])

            const schemaColumns = getColumns(nodes, columns)
            const children = schemaToDescsItem(schemaColumns, emptyText)

            const slotScope = {
                loading: requestProps.loading,
                data: requestProps.dataSource
            }
            const titleDom = getPropsSlot(slots, props, 'title', slotScope)
            const extraDom = getSlotVNode(slots, props, 'extra', slotScope)

            const restProps = omit(props, ['title', 'extra'])
            const needDescsProps = { ...pick(restProps, Object.keys(Descriptions.props)) }
            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <ConfigProvider getPopupContainer={getElement.bind(null, popupContainer)}>
                        <div class={`${prefixCls.value}-popup-container`} ref={popupContainer}>
                            <div class={`${prefixCls.value}-container`}>
                                {(titleDom || extraDom) && (
                                    <div class={`${prefixCls.value}-header`}>
                                        <div class={`${prefixCls.value}-title`}>
                                            {titleDom}
                                        </div>
                                        <div class={`${prefixCls.value}-extra`}>
                                            {extraDom}
                                        </div>
                                    </div>
                                )}
                                <Spin spinning={requestProps.loading}>
                                    <Descriptions {...needDescsProps}>
                                        {children}
                                    </Descriptions>
                                </Spin>
                            </div>
                        </div>
                    </ConfigProvider>
                </div>
            )
        }
    }
})
