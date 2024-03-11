import { defineComponent } from 'vue'
import { Dropdown, Menu, Space } from 'ant-design-vue'
import { filterEmptyElement } from '@/utils'
import { take, takeRight } from 'lodash-es'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

export const actionEnum = {
    PRIMARY: 'primary',
    WARNING: 'warning',
    ERROR: 'error'
}

const ActionItem = defineComponent({
    inheritAttrs: false,
    props: {
        type: {
            type: String,
            default: actionEnum.PRIMARY
        }
    },
    setup (props, { slots, attrs }) {
        return () => {
            const actionItemNames = cx('action-item', {
                'action-item__primary': props.type === actionEnum.PRIMARY,
                'action-item__warning': props.type === actionEnum.WARNING,
                'action-item__error': props.type === actionEnum.ERROR,
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

            const nodes = filterEmptyElement(slots.default ? slots.default() : [])
            if (nodes.length < (max + 1)) {
                return (
                    <Space {...restProps}>
                        {nodes}
                    </Space>
                )
            }

            const firstNodes = take(nodes, max)
            const secondNodes = takeRight(nodes, nodes.length - max)

            const dropdownSlots = {
                default: () => {
                    return (
                        <ActionItem>...</ActionItem>
                    )
                },
                overlay: () => {
                    return (
                        <Menu selectedKeys={[]}>
                            {
                                secondNodes.map((item) => {
                                    return (
                                        <Menu.Item>{item}</Menu.Item>
                                    )
                                })
                            }
                        </Menu>
                    )
                }
            }

            return (
                <Space {...restProps}>
                    {firstNodes}
                    <Dropdown placement={'bottomRight'} v-slots={dropdownSlots}/>
                </Space>
            )
        }
    }
})

Action.Item = ActionItem

export default Action
