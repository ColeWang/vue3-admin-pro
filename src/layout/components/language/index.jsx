import { defineComponent, getCurrentInstance } from 'vue'
import { Dropdown, Menu } from 'ant-design-vue'
import { GlobalOutlined } from '@ant-design/icons-vue'
import { useAppInstance } from '@/useAppInstance'
import { map } from 'lodash-es'
import { localCache, LOCALE__LOCAL } from '@/utils/storage'
import { useConfigInject } from '@utils/extend'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    setup (props, { attrs }) {
        const { prefixCls } = useConfigInject('pro-language', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        const { setLocale } = useAppInstance()
        // 需要修改为不需要依赖 useI18n 的方式
        // 并且不干涉 layout 的逻辑
        const { appContext } = getCurrentInstance()
        const { globalProperties } = appContext ? appContext.config : {}
        const { $i18n = { locale: 'zh-CN' } } = globalProperties || {}

        const language = navigator.language
        const localeLang = (language === 'zh-CN' || language === 'en-US') ? language : false
        const lang = localCache.get(LOCALE__LOCAL) || localeLang || 'zh-CN'

        const langList = {
            'zh-CN': '语言',
            'en-US': 'Lang'
        }

        const localeList = {
            'zh-CN': '中文简体',
            'en-US': 'English'
        }

        // 先执行 缓存的 lang
        onLocaleChange(lang)

        function onLocaleChange (value) {
            setLocale && setLocale(value)
            localCache.set(LOCALE__LOCAL, value)
        }

        function getPopupContainer (trigger) {
            return trigger.parentNode || document.body
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
                    <Dropdown
                        placement={'bottom'}
                        getPopupContainer={getPopupContainer}
                        v-slots={dropdownSlots}
                    >
                        <div class={`${prefixCls.value}-content`}>
                            <GlobalOutlined/>
                        </div>
                    </Dropdown>
                </div>
            )
        }
    }
})
