import { computed, defineComponent, unref } from 'vue'
import { Dropdown, Menu } from 'ant-design-vue'
import { GlobalOutlined } from '@ant-design/icons-vue'
import { useConfigInject, useGlobalProperties } from '@site-pro/hooks'
import { map } from 'lodash-es'
import { useAppReceiver } from '@/hooks/useAppReceiver'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProLayoutLanguage',
    setup (props, { attrs }) {
        const { prefixCls } = useConfigInject('pro-layout-language', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        const { $i18n = {} } = useGlobalProperties()
        const { setMessage } = useAppReceiver()

        const localeList = {
            'zh-CN': '中文简体',
            'en-US': 'English'
        }

        const keys = computed(() => {
            return $i18n.locale ? [$i18n.locale] : []
        })

        function onLocaleChange (value) {
            setMessage && setMessage(value)
        }

        return () => {
            const dropdownSlots = {
                overlay: () => {
                    return (
                        <Menu class={`${prefixCls.value}-menu`} selectedKeys={unref(keys)}>
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
