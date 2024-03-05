import { defineComponent } from 'vue'
import { Input } from 'ant-design-vue'
import { useLocaleReceiver } from '@/components/locale-provider'
import BaseFieldProps from '../BaseFieldProps'
import { stopPropagation } from '@/utils/event'
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

        function onKeyPress (evt) {
            if (evt.key === 'Enter') {
                stopPropagation(evt)
            }
        }

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const placeholder = fieldProps.placeholder || t('inputPlaceholder')
            const renderFormItem = props.renderFormItem || slots.renderFormItem

            if (mode === 'read') {
                const styles = {
                    display: 'inline-block',
                    padding: '4px 11px',
                    lineHeight: '1.5715',
                    maxWidth: '100%',
                    whiteSpace: 'pre-wrap',
                }
                return (
                    <span style={styles}>{text || emptyText}</span>
                )
            }
            if (mode === 'edit') {
                const renderDom = (
                    <Input.TextArea
                        v-slots={slots}
                        rows={3}
                        placeholder={placeholder}
                        onKeyPress={onKeyPress}
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
