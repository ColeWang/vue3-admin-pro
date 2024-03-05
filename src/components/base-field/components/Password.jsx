import { defineComponent, Fragment, ref, unref } from 'vue'
import { Input, Space } from 'ant-design-vue'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons-vue'
import { useLocaleReceiver } from '@/components/locale-provider'
import BaseFieldProps from '../BaseFieldProps'
import { isFunction } from 'lodash-es'

export default defineComponent({
    inheritAttrs: false,
    props: {
        ...BaseFieldProps,
        emptyText: {
            type: String,
            default: '-'
        }
    },
    setup (props, { slots }) {
        const { t } = useLocaleReceiver('Form')

        const { fieldProps } = props
        const visible = ref(fieldProps.visible || false)

        function onVisibleClick () {
            visible.value = !unref(visible)
        }

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const placeholder = fieldProps.placeholder || t('inputPlaceholder')
            const renderFormItem = props.renderFormItem || slots.renderFormItem

            if (mode === 'read') {
                if (text) {
                    const eyeIcon = unref(visible) ? <EyeOutlined/> : <EyeInvisibleOutlined/>
                    return (
                        <Space>
                            <span>{unref(visible) ? text : '＊＊＊＊＊'}</span>
                            <a onClick={onVisibleClick}>{eyeIcon}</a>
                        </Space>
                    )
                }
                return <Fragment>{emptyText}</Fragment>
            }
            if (mode === 'edit') {
                const renderDom = (
                    <Input.Password
                        v-slots={slots}
                        placeholder={placeholder}
                        allowClear={true}
                        {...fieldProps}
                    />
                )
                if (renderFormItem && isFunction(renderFormItem)) {
                    return renderFormItem(text, { mode, fieldProps }, renderDom)
                }
                return renderDom
            }
            return null
        }
    }
})
