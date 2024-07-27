import { defineComponent, unref } from 'vue'
import { Dropdown, Menu } from 'ant-design-vue'
import { GlobalOutlined } from '@ant-design/icons-vue'
import { useConfigInject } from '@utils/extend'
import useStyle from './style'
import { map } from 'lodash-es'
// --
import { localCache, LOCALE__LOCAL } from '@/utils/storage'
import { useAppInstance } from '@/useAppInstance'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'

export default defineComponent({
    inheritAttrs: false,
    setup (props, { attrs }) {
        const { prefixCls } = useConfigInject('pro-language', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        const { locale, getLocaleMessage } = useI18n()
        const { setLocaleMessage } = useAppInstance()

        const language = navigator.language
        const lang = (language === 'zh-CN' || language === 'en-US') ? language : false
        const localeLang = localCache.get(LOCALE__LOCAL) || lang || 'zh-CN'
        // 先执行 缓存的 localeLang
        onLocaleChange(localeLang)

        const localeList = {
            'zh-CN': '中文简体',
            'en-US': 'English'
        }

        function onLocaleChange (value) {
            locale.value = value
            localCache.set(LOCALE__LOCAL, value)
            const message = getLocaleMessage(value)
            dayjs.locale(message.dayjs)
            setLocaleMessage && setLocaleMessage(message)
        }

        function getPopupContainer (trigger) {
            return trigger.parentNode || document.body
        }

        return () => {
            const dropdownSlots = {
                overlay: () => {
                    return (
                        <Menu class={`${prefixCls.value}-menu`} selectedKeys={[unref(locale)]}>
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
