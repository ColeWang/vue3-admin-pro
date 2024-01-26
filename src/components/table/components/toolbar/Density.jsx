import { defineComponent } from 'vue'
import { Button, Dropdown, Menu, Tooltip } from 'ant-design-vue'
import { ColumnHeightOutlined } from '@ant-design/icons-vue'
import { useLocaleReceiver } from '@/components/locale-provider'

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
        const { t } = useLocaleReceiver('Table.toolbar')

        function onSizeClick (params) {
            if (props.size !== params.key) {
                emit('sizeChange', params.key)
            }
        }

        return () => {
            const { size } = props

            const dropdownSlots = {
                overlay: () => {
                    const menuProps = {
                        style: { width: '88px' },
                        selectedKeys: [size],
                    }
                    return (
                        <Menu {...menuProps} onClick={onSizeClick}>
                            <Menu.Item key={'large'}>{t('densityLarger')}</Menu.Item>
                            <Menu.Item key={'middle'}>{t('densityMiddle')}</Menu.Item>
                            <Menu.Item key={'small'}>{t('densitySmall')}</Menu.Item>
                        </Menu>
                    )
                }
            }
            return (
                <Dropdown trigger={'click'} placement={'bottomRight'} v-slots={dropdownSlots}>
                    <Tooltip title={t('density')}>
                        <Button>
                            <ColumnHeightOutlined/>
                        </Button>
                    </Tooltip>
                </Dropdown>
            )
        }
    }
})
