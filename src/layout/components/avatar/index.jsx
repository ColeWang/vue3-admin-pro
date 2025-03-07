import { defineComponent, unref } from 'vue'
import { Avatar, Dropdown, Menu, theme } from 'ant-design-vue'
import { LoginOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons-vue'
import { useConfigInject, useGlobalProperties } from '@site-pro/hooks'
import useAppShare from '@/hooks/useAppShare'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProLayoutAvatar',
    setup (props, { attrs }) {
        const { prefixCls } = useConfigInject('pro-layout-avatar', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const { token } = theme.useToken()
        const { $t } = useGlobalProperties()

        const { onAvatarAction } = useAppShare()

        function onMenuClick (key) {
            onAvatarAction && onAvatarAction(key)
        }

        return () => {
            const { controlHeight } = unref(token)

            const dropdownSlots = {
                overlay: () => {
                    return (
                        <Menu class={`${prefixCls.value}-menu`} selectedKeys={[]}>
                            <Menu.Item
                                key={'profile'}
                                onClick={onMenuClick.bind(null, 'profile')}
                                v-slots={{ icon: () => <UserOutlined/> }}
                            >
                                {$t ? $t('layout.navbar.profile') : '个人中心'}
                            </Menu.Item>
                            <Menu.Item
                                key={'settings'}
                                onClick={onMenuClick.bind(null, 'settings')}
                                v-slots={{ icon: () => <SettingOutlined/> }}
                            >
                                {$t ? $t('layout.navbar.settings') : '个人设置'}
                            </Menu.Item>
                            <Menu.Divider/>
                            <Menu.Item
                                key={'logout'}
                                onClick={onMenuClick.bind(null, 'logout')}
                                v-slots={{ icon: () => <LoginOutlined/> }}
                            >
                                {$t ? $t('layout.navbar.logout') : '退出登录'}
                            </Menu.Item>
                        </Menu>
                    )
                }
            }

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <Dropdown placement={'bottomRight'} v-slots={dropdownSlots}>
                        <div class={`${prefixCls.value}-content`}>
                            <Avatar size={controlHeight - 4}>
                                {{ icon: () => <UserOutlined/> }}
                            </Avatar>
                        </div>
                    </Dropdown>
                </div>
            )
        }
    }
})
