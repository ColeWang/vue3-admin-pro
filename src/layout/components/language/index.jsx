import { computed, defineComponent, getCurrentInstance, unref } from 'vue'
import { Dropdown, Menu } from 'ant-design-vue'
import { CaretDownOutlined } from '@ant-design/icons-vue'
import { useAppInstance } from '@/useAppInstance'
import { map } from 'lodash-es'
import { localCache, LOCALE__LOCAL } from '@/utils/storage'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

export default defineComponent({
    inheritAttrs: false,
    setup () {
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

        const title = computed(() => {
            return langList[$i18n.locale]
        })

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
                        <Menu class={cx('language-menu')} selectedKeys={[$i18n.locale]}>
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

            return (
                <div class={cx('language-wrap')}>
                    <Dropdown
                        placement={'bottom'}
                        getPopupContainer={getPopupContainer}
                        v-slots={dropdownSlots}
                    >
                        <div class={cx('language-center')}>
                            <span>{unref(title)}</span>
                            <div class={cx('language-center__icon-down')}>
                                <CaretDownOutlined/>
                            </div>
                        </div>
                    </Dropdown>
                </div>
            )
        }
    }
})
