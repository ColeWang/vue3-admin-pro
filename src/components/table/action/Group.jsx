import { defineComponent } from 'vue'
import { Dropdown, Menu, Space } from 'ant-design-vue'
import { filterEmptyElement } from '@/utils'
import { take, takeRight } from 'lodash-es'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

export default defineComponent({
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
                        <a class={cx('action', 'action__primary')}>...</a>
                    )
                },
                overlay: () => {
                    const children = secondNodes.map((item) => {
                        return <Menu.Item>{item}</Menu.Item>
                    })
                    return (
                        <Menu selectedKeys={[]}>{children}</Menu>
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
