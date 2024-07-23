import { defineComponent, unref } from 'vue'
import { Dropdown, Menu, Space, theme } from 'ant-design-vue'
import Action from './Action'
import { filterEmptyElement } from '../../../_utils/props-util'
import { take, takeRight } from 'lodash-es'

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
            const { sizeXS } = unref(token)

            const nodes = filterEmptyElement(slots.default ? slots.default() : [])
            const spaceProps = { size: propsSize || sizeXS, ...attrs }

            if (nodes.length && nodes.length > max) {
                /* v8 ignore next 9 */
                const dropdownSlots = {
                    overlay: () => (
                        <Menu data-type={'dropdown'} selectedKeys={[]}>
                            {takeRight(nodes, nodes.length - max).map((item, index) => {
                                return <Menu.Item key={index}>{item}</Menu.Item>
                            })}
                        </Menu>
                    )
                }
                return (
                    <Space {...spaceProps}>
                        {take(nodes, max)}
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
