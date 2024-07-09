import { defineComponent, unref } from 'vue'
import { Menu } from 'ant-design-vue'
import { useSharedContext } from '../../hooks/useSharedContext'
import { useLocaleReceiver } from '@/packages/locale-provider'

export default defineComponent({
    inheritAttrs: false,
    props: { ...Menu.props },
    setup (props, { attrs }) {
        const { tableSize, setTableSize } = useSharedContext()
        const { t } = useLocaleReceiver(['Table', 'toolbar'])

        function onMenuClick (params) {
            if (unref(tableSize) !== params.key) {
                setTableSize && setTableSize(params.key)
            }
            props.onClick && props.onClick(params)
        }

        return () => {
            const menuProps = {
                ...attrs,
                ...props,
                style: { width: '88px' },
                selectedKeys: [unref(tableSize)],
                onClick: onMenuClick
            }
            return (
                <Menu {...menuProps}>
                    <Menu.Item key={'large'}>
                        {t('densityLarger')}
                    </Menu.Item>
                    <Menu.Item key={'middle'}>
                        {t('densityMiddle')}
                    </Menu.Item>
                    <Menu.Item key={'small'}>
                        {t('densitySmall')}
                    </Menu.Item>
                </Menu>
            )
        }
    }
})
