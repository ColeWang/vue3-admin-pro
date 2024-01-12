import { defineComponent } from 'vue'
import { Avatar, Dropdown, Menu } from 'ant-design-vue'
import { CaretDownOutlined, LoginOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons-vue'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

export default defineComponent({
    inheritAttrs: false,
    setup (props, { attrs }) {
        function handleLogout () {
            attrs.onLogout && attrs.onLogout()
        }

        function getPopupContainer (trigger) {
            return trigger.parentNode || document.body
        }

        return () => {
            const dropdownSlots = {
                default: () => {
                    return (
                        <div class={cx('avatar-center')}>
                            <Avatar size={28} v-slots={{ icon: () => <UserOutlined/> }}/>
                            <div class={cx('avatar-center__icon-down')}>
                                <CaretDownOutlined/>
                            </div>
                        </div>
                    )
                },
                overlay: () => {
                    return (
                        <Menu class={cx('avatar-menu')} selectedKeys={[]}>
                            <Menu.Item key={'center'} v-slots={{
                                default: () => '个人中心',
                                icon: () => <UserOutlined/>
                            }}/>
                            <Menu.Item key={'settings'} v-slots={{
                                default: () => '个人设置',
                                icon: () => <SettingOutlined/>
                            }}/>
                            <Menu.Divider/>
                            <Menu.Item key={'logout'} onClick={handleLogout} v-slots={{
                                default: () => '退出登录',
                                icon: () => <LoginOutlined/>
                            }}/>
                        </Menu>
                    )
                }
            }

            return (
                <div class={cx('avatar-wrap')}>
                    <Dropdown placement={'bottomRight'} getPopupContainer={getPopupContainer} v-slots={dropdownSlots}/>
                </div>
            )
        }
    }
})
