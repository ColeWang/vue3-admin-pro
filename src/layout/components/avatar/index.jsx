import { defineComponent, unref } from 'vue'
import { Avatar, Dropdown, Menu, theme } from 'ant-design-vue'
import { LoginOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons-vue'
import { useAppInstance } from '@/useAppInstance'
import { useConfigInject } from '@utils/extend'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    setup (props, { attrs }) {
        const { prefixCls } = useConfigInject('pro-avatar', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const { token } = theme.useToken()

        const { onLogout } = useAppInstance()

        function handleLogout () {
            onLogout && onLogout()
        }

        function getPopupContainer (trigger) {
            return trigger.parentNode || document.body
        }

        return () => {
            const { controlHeight } = unref(token)

            const dropdownSlots = {
                overlay: () => {
                    return (
                        <Menu class={`${prefixCls.value}-menu`} selectedKeys={[]}>
                            <Menu.Item
                                key={'center'}
                                v-slots={{ icon: () => <UserOutlined/> }}
                            >
                                个人中心
                            </Menu.Item>
                            <Menu.Item
                                key={'settings'}
                                v-slots={{ icon: () => <SettingOutlined/> }}
                            >
                                个人设置
                            </Menu.Item>
                            <Menu.Divider/>
                            <Menu.Item
                                key={'logout'}
                                onClick={handleLogout}
                                v-slots={{ icon: () => <LoginOutlined/> }}
                            >
                                退出登录
                            </Menu.Item>
                        </Menu>
                    )
                }
            }

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <Dropdown
                        getPopupContainer={getPopupContainer}
                        placement={'bottomRight'}
                        v-slots={dropdownSlots}
                    >
                        <div class={`${prefixCls.value}-content`}>
                            <Avatar
                                size={controlHeight - 4}
                                v-slots={{ icon: () => <UserOutlined/> }}
                            />
                        </div>
                    </Dropdown>
                </div>
            )
        }
    }
})
