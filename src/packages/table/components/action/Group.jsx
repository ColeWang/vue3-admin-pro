import { defineComponent } from 'vue'
import { Dropdown, Menu, Space } from 'ant-design-vue'
import { filterEmptyElement } from '../../../_utils/props-util'
import { take, takeRight } from 'lodash-es'
import { preventDefault } from '../../../_utils/event'
import classNames from '../../../_utils/classNames/bind'
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
                    <Space {...restProps}>
                        {take(nodes, max)}
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
