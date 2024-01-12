import { defineComponent } from 'vue'
import { Button, Dropdown, Menu, Tooltip } from 'ant-design-vue'
import { ColumnHeightOutlined } from '@ant-design/icons-vue'

export default defineComponent({
    inheritAttrs: false,
    props: {
        size: {
            type: String,
            default: 'middle'
        }
    },
    emits: ['sizeChange'],
    setup (props, { emit }) {
        function onSizeClick (params) {
            if (props.size !== params.key) {
                emit('sizeChange', params.key)
            }
        }

        return () => {
            const dropdownSlots = {
                overlay: () => {
                    const menuProps = {
                        style: { width: '80px' },
                        selectedKeys: [props.size],
                    }
                    return (
                        <Menu {...menuProps} onClick={onSizeClick}>
                            <Menu.Item key={'large'}>默认</Menu.Item>
                            <Menu.Item key={'middle'}>中等</Menu.Item>
                            <Menu.Item key={'small'}>紧凑</Menu.Item>
                        </Menu>
                    )
                }
            }
            return (
                <Dropdown trigger={'click'} placement={'bottomRight'} v-slots={dropdownSlots}>
                    <Tooltip title={'密度'}>
                        <Button>
                            <ColumnHeightOutlined/>
                        </Button>
                    </Tooltip>
                </Dropdown>
            )
        }
    }
})
