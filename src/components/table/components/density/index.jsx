import { defineComponent } from 'vue'
import { Button, Dropdown, Menu, Tooltip } from 'ant-design-vue'
import { ColumnHeightOutlined } from '@ant-design/icons-vue'
import { useSharedContext } from '../../hooks/useSharedContext'
import { useLocaleReceiver } from '@/components/locale-provider'

export default defineComponent({
    inheritAttrs: false,
    props: {
        size: {
            type: String,
            default: 'middle'
        }
    },
    setup (props) {
        const { setSize } = useSharedContext()
        const { t } = useLocaleReceiver('Table.toolbar')

        function onChangeClick (params) {
            if (props.size !== params.key) {
                setSize && setSize(params.key)
            }
        }

        return () => {
            const { size } = props

            const dropdownSlots = {
                overlay: () => {
                    const menuProps = {
                        style: { width: '88px' },
                        selectedKeys: [size],
                        onClick: onChangeClick
                    }
                    return (
                        <Menu {...menuProps}>
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
