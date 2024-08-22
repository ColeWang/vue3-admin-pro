import { defineComponent, unref } from 'vue'
import { Dropdown, Menu, Space, theme } from 'ant-design-vue'
import { flattenChildren } from '@site-pro/utils'
import { take, takeRight } from 'lodash-es'
import Action from './Action'

export default defineComponent({
    inheritAttrs: false,
    props: {
        max: {
            type: Number,
            default: 2
        },
        size: {
            type: Number,
            default: undefined
        }
    },
    setup (props, { slots, attrs }) {
        const { token } = theme.useToken()
        return () => {
            const { max, size: propsSize } = props
            const { sizeMS } = unref(token)

            const nodes = flattenChildren(slots.default ? slots.default() : [])
            const spaceProps = { size: propsSize || sizeMS / 2, ...attrs }

            if (nodes.length && nodes.length > max) {
                // 前部分
                const firstHalfNodes = take(nodes, max)
                // 后部分
                const secondHalfNodes = takeRight(nodes, nodes.length - max)
                /* v8 ignore next 9 */
                const dropdownSlots = {
                    overlay: () => (
                        <Menu data-type={'dropdown'} selectedKeys={[]}>
                            {secondHalfNodes.map((item, index) => {
                                return <Menu.Item key={index}>{item}</Menu.Item>
                            })}
                        </Menu>
                    )
                }
                return (
                    <Space {...spaceProps}>
                        {firstHalfNodes}
                        <Dropdown placement={'bottomRight'} v-slots={dropdownSlots}>
                            <Action>...</Action>
                        </Dropdown>
                    </Space>
                )
            }
            return (
                <Space {...spaceProps}>{nodes}</Space>
            )
        }
    }
})
