import { computed, defineComponent, getCurrentInstance, unref } from 'vue'
import { Dropdown, Menu } from 'ant-design-vue'
import { CaretDownOutlined } from '@ant-design/icons-vue'
import { head, map } from 'lodash-es'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

export default defineComponent({
    inheritAttrs: false,
    props: {
        onChange: {
            type: Function,
            default: undefined
        }
    },
    emits: ['change'],
    setup (props, { emit }) {
        // 需要修改为不需要依赖 useI18n 的方式
        const { appContext } = getCurrentInstance()
        const { globalProperties } = appContext ? appContext.config : {}
        const { $i18n } = globalProperties || {}

        const messages = {
            'zh-CN': {
                lang: '语言',
                value: '中文简体',
            },
            'en-US': {
                lang: 'Lang',
                value: 'English'
            }
        }

        const selectedKeys = computed(() => {
            return $i18n ? [$i18n.locale] : ['zh-CN']
        })

        const localeLang = computed(() => {
            const locale = head(unref(selectedKeys))
            const option = messages[locale] || {}
            return option.lang || '语言'
        })

        function onChange (local) {
            emit('change', local)
        }

        function getPopupContainer (trigger) {
            return trigger.parentNode || document.body
        }

        return () => {
            const dropdownSlots = {
                default: () => {
                    return (
                        <div class={cx('language-center')}>
                            <span>{unref(localeLang)}</span>
                            <div class={cx('language-center__icon-down')}>
                                <CaretDownOutlined/>
                            </div>
                        </div>
                    )
                },
                overlay: () => {
                    return (
                        <Menu class={cx('language-menu')} selectedKeys={unref(selectedKeys)}>
                            {
                                map(messages, (option, key) => {
                                    return (
                                        <Menu.Item key={key} onClick={onChange.bind(null, key)}>
                                            {option.value}
                                        </Menu.Item>
                                    )
                                })
                            }
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
                    />
                </div>
            )
        }
    }
})
