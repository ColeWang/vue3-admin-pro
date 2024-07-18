import { defineComponent } from 'vue'
import { Avatar, Dropdown, Menu } from 'ant-design-vue'
import { CaretDownOutlined, LoginOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons-vue'
import { useAppInstance } from '@/useAppInstance'
import classNames from '@utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

export default defineComponent({
    inheritAttrs: false,
    setup () {
        const { onLogout } = useAppInstance()

        function handleLogout () {
            onLogout && onLogout()
        }

        function getPopupContainer (trigger) {
            return trigger.parentNode || document.body
        }

        return () => {
            const dropdownSlots = {
                overlay: () => {
                    return (
                        <Menu class={cx('avatar-menu')} selectedKeys={[]}>
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

            return (
                <div class={cx('avatar-wrap')}>
                    <Dropdown
                        getPopupContainer={getPopupContainer}
                        placement={'bottomRight'}
                        v-slots={dropdownSlots}
                    >
                        <div class={cx('avatar-center')}>
                            <Avatar size={28} v-slots={{ icon: () => <UserOutlined/> }}/>
                            <div class={cx('avatar-center__icon-down')}>
                                <CaretDownOutlined/>
                            </div>
                        </div>
                    </Dropdown>
                </div>
            )
        }
    }
})
