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
            default: 'primary'
        },
        onClick: {
            type: Function,
            default: undefined
        }
    },
    emits: ['click'],
    setup (props, { emit, slots, attrs }) {
        function onClick (evt) {
            emit('click', evt)
        }

        return () => {
            const actionItemNames = cx('action-item', {
                'action-item__primary': props.type === 'primary',
                'action-item__warning': props.type === 'warning',
                'action-item__error': props.type === 'error'
            })

            return (
                <a class={actionItemNames} {...attrs} onClick={onClick}>
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
                    <Space {...restProps}>{nodes}</Space>
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
                    const nodes = secondNodes.map((item) => {
                        return (
                            <Menu.Item>{item}</Menu.Item>
                        )
                    })
                    return (
                        <Menu selectedKeys={[]}>{nodes}</Menu>
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
