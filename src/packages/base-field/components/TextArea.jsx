import { defineComponent } from 'vue'
import { Input } from 'ant-design-vue'
import { useLocaleReceiver } from '../../locale-provider'
import baseFieldProps from '../props'
import { getSlotVNode } from '../../_utils/props-util'

export default defineComponent({
    inheritAttrs: false,
    props: { ...baseFieldProps },
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const placeholder = fieldProps.placeholder || t('inputPlaceholder')

            if (mode === 'read') {
                const styles = {
                    display: 'inline-block',
                    padding: '4px 11px',
                    lineHeight: '1.5715',
                    maxWidth: '100%',
                    whiteSpace: 'pre-wrap',
                }
                return (
                    <span class={'field-textarea__read'} style={styles}>
                        {text ?? emptyText}
                    </span>
                )
            }
            const needFieldProps = {
                rows: 3,
                ...fieldProps,
                placeholder: placeholder
            }
            const dom = <Input.TextArea {...needFieldProps} v-slots={slots}/>
            const slotScope = { text, props: { mode, ...fieldProps }, dom }
            const renderDom = getSlotVNode(slots, props, 'renderField', slotScope)
            return renderDom || dom
        }
    }
})
