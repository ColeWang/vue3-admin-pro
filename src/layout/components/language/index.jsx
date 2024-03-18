import { defineComponent, ref, unref } from 'vue'
import { Dropdown, Menu } from 'ant-design-vue'
import { CaretDownOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
import { map } from 'lodash-es'
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
        const { t, locale } = useI18n()

        const selectedKeys = ref([unref(locale)])

        const localList = {
            'zh-CN': '中文简体',
            'en-US': 'English'
        }

        function onChange (local) {
            selectedKeys.value = [local]
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
                            <span>{t('lang')}</span>
                            <div class={cx('language-center__icon-down')}>
                                <CaretDownOutlined/>
                            </div>
                        </div>
                    )
                },
                overlay: () => {
                    const nodes = map(localList, (value, key) => {
                        return (
                            <Menu.Item key={key} onClick={onChange.bind(null, key)}>
                                {value}
                            </Menu.Item>
                        )
                    })
                    return (
                        <Menu class={cx('language-menu')} selectedKeys={unref(selectedKeys)}>
                            {nodes}
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
