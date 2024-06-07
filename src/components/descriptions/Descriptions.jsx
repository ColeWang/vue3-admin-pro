import { defineComponent, ref, unref } from 'vue'
import { ConfigProvider, Descriptions, Form, Space, Spin } from 'ant-design-vue'
import BaseField from '@/components/base-field'
import useFetchData from './hooks/useFetchData'
import { isFunction, omit, pick } from 'lodash-es'
import { filterEmptyElement, getPropsSlot } from '@/utils/props-util'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

const FIELD_MODE = 'read'

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
    setup (props, { attrs, emit, slots, expose }) {
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
                    mode: FIELD_MODE,
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
            const needColumns = [...columns, ...childrenColumns].filter((item) => {
                return !item.hide || !item.hideInDescriptions
            })
            return needColumns.sort((a, b) => {
                return (a.order || 0) - (b.order || 0)
            })
        }

        function getPopupContainer () {
            const plain = unref(popupContainer)
            return plain ? (plain.$el || plain) : plain
        }

        expose({ reload: onReload })

        return () => {
            const { columns, emptyText } = props

            const nodes = filterEmptyElement(slots.default ? slots.default() : [])

            const schemaColumns = getColumns(nodes, columns)
            const children = schemaToDescsItem(schemaColumns, emptyText)

            const slotScope = {
                loading: requestProps.loading,
                data: requestProps.dataSource
            }
            const titleDom = getPropsSlot(slots, props, 'title', slotScope)
            const extraDom = getPropsSlot(slots, props, 'extra', slotScope)

            const restProps = omit(props, ['title', 'extra'])
            const needDescsProps = {
                ...pick(restProps, Object.keys(Descriptions.props)),
                ...attrs
            }

            return (
                <div class={cx('descriptions')}>
                    <ConfigProvider getPopupContainer={getPopupContainer}>
                        <div class={cx('popup-container')} ref={popupContainer}>
                            {(titleDom || extraDom) && (
                                <div class={cx('descriptions-header')}>
                                    <div class={cx('descriptions-title')}>
                                        {titleDom}
                                    </div>
                                    <div class={cx('descriptions-extra')}>
                                        <Space size={8}>{extraDom}</Space>
                                    </div>
                                </div>
                            )}
                            <Spin spinning={requestProps.loading}>
                                <Descriptions {...needDescsProps}>
                                    {children}
                                </Descriptions>
                            </Spin>
                        </div>
                    </ConfigProvider>
                </div>
            )
        }
    }
})
