import { defineComponent } from 'vue'
import { Dropdown, Menu } from 'ant-design-vue'
import { GlobalOutlined } from '@ant-design/icons-vue'
import { useConfigInject, useGlobalProperties } from '@site-pro/hooks'
import { map } from 'lodash-es'
import { useAppInstance } from '@/hooks'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    setup (props, { attrs }) {
        const { prefixCls } = useConfigInject('pro-language', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        const { $i18n = {} } = useGlobalProperties()
        const { setLocaleMessage } = useAppInstance()

        const localeList = {
            'zh-CN': '中文简体',
            'en-US': 'English'
        }

        function onLocaleChange (value) {
            setLocaleMessage && setLocaleMessage(value)
        }

        return () => {
            const dropdownSlots = {
                overlay: () => {
                    return (
                        <Menu class={`${prefixCls.value}-menu`} selectedKeys={[$i18n.locale]}>
                            {map(localeList, (value, key) => {
                                return (
                                    <Menu.Item key={key} onClick={onLocaleChange.bind(null, key)}>
                                        {value}
                                    </Menu.Item>
                                )
                            })}
                        </Menu>
                    )
                }
            }

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <Dropdown placement={'bottom'} v-slots={dropdownSlots}>
                        <div class={`${prefixCls.value}-content`}>
                            <GlobalOutlined/>
                        </div>
                    </Dropdown>
                </div>
            )
        }
    }
})
