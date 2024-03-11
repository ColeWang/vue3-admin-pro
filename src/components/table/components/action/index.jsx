import { defineComponent } from 'vue'
import { Dropdown, Menu, Space } from 'ant-design-vue'
import { filterEmptyElement } from '@/utils'
import { take, takeRight } from 'lodash-es'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

const ActionItem = defineComponent({
    inheritAttrs: false,
    props: {
        type: {
            type: String,
            default: 'primary' // warning error
        }
    },
    setup (props, { slots, attrs }) {
        return () => {
            const actionItemNames = cx('action-item', {
                'action-item__primary': props.type === 'primary',
                'action-item__warning': props.type === 'warning',
                'action-item__error': props.type === 'error',
            })

            return (
                <a {...attrs} class={actionItemNames}>
                    {slots.default && slots.default()}
                </a>
            )
        }
    }
})

const Action = defineComponent({
    inheritAttrs: false,
    props: {
        ...Space.props,
        max: {
            type: Number,
            default: 2
        },
        size: {
            type: Number,
            default: 8
        }
    },
    setup (props, { slots }) {
        return () => {
            const { max, ...restProps } = props

            const slotsItems = filterEmptyElement(slots.default ? slots.default() : [])
            if (slotsItems.length < (max + 1)) {
                return (
                    <Space {...restProps}>
                        {slotsItems}
                    </Space>
                )
            }

            const dropdownSlots = {
                default: () => {
                    return (
                        <ActionItem>...</ActionItem>
                    )
                },
                overlay: () => {
                    const len = slotsItems.length - max
                    return (
                        <Menu selectedKeys={[]}>
                            {
                                takeRight(slotsItems, len).map((item) => {
                                    return (
                                        <Menu.Item>{item}</Menu.Item>
                                    )
                                })
                            }
                        </Menu>
                    )
                }
            }

            const children = [
                ...take(slotsItems, max),
                <Dropdown placement={'bottomRight'} v-slots={dropdownSlots}/>
            ]

            return (
                <Space {...restProps}>
                    {children}
                </Space>
            )
        }
    }
})

Action.Item = ActionItem

export default Action
