import { defineComponent } from 'vue'
import { Dropdown, Menu, Space } from 'ant-design-vue'
import { filterEmptyElement } from '@/utils/props-util'
import { take, takeRight } from 'lodash-es'
import { preventDefault } from '@/utils/event'
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
        function onClick (evt) {
            preventDefault(evt)
        }

        return () => {
            const { max, ...restProps } = props
            const nodes = filterEmptyElement(slots.default ? slots.default() : [])

            if (nodes.length && nodes.length > max) {
                const firstNodes = take(nodes, max)
                const secondNodes = takeRight(nodes, nodes.length - max)

                const dropdownSlots = {
                    overlay: () => (
                        <Menu selectedKeys={[]}>
                            {secondNodes.map((item) => {
                                return (
                                    <Menu.Item>{item}</Menu.Item>
                                )
                            })}
                        </Menu>
                    )
                }
                return (
                    <Space {...restProps}>
                        {firstNodes}
                        <Dropdown placement={'bottomRight'} v-slots={dropdownSlots}>
                            <a class={cx('action', 'action__primary')} onClick={onClick}>...</a>
                        </Dropdown>
                    </Space>
                )
            }
            return (
                <Space {...restProps}>{nodes}</Space>
            )
        }
    }
})
