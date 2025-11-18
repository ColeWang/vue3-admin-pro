import { defineComponent, ref, unref } from 'vue'
import { Drawer } from 'ant-design-vue'
import { SettingOutlined } from '@ant-design/icons-vue'
import { useConfigInject } from '@site-pro/hooks'
import ThemeSettings from './ThemeSettings'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProLayoutSettings',
    setup (props, { attrs }) {
        const { prefixCls } = useConfigInject('pro-layout-settings', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        const popupContainer = ref(null)

        const open = ref(false)

        function onDrawerOpen () {
            open.value = true
        }

        function onDrawerClose () {
            open.value = false
        }

        return () => {
            const drawerProps = {
                width: 320,
                open: unref(open),
                onClose: onDrawerClose,
                getContainer: () => unref(popupContainer)
            }
            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <div class={`${prefixCls.value}-popup-container`} ref={popupContainer}>
                        <div class={`${prefixCls.value}-content`} onClick={onDrawerOpen}>
                            <SettingOutlined/>
                        </div>
                        <Drawer {...drawerProps}>
                            <ThemeSettings/>
                        </Drawer>
                    </div>
                </div>
            )
        }
    }
})
