import { defineComponent, unref } from 'vue'
import { Input, theme } from 'ant-design-vue'
import { useLocaleReceiver } from '../../locale-provider'
import baseFieldProps from '../props'
import { getSlotVNode } from '../../_utils/props-util'
import { useConfigInject } from '../../_utils/extend'

export default defineComponent({
    inheritAttrs: false,
    props: { ...baseFieldProps },
    setup (props, { slots }) {
        const { prefixCls } = useConfigInject('pro-field-textarea', props)
        const { token } = theme.useToken()
        const { t } = useLocaleReceiver(['global'])

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const { lineHeight, paddingXXS, paddingSM } = unref(token)
            const placeholder = fieldProps.placeholder || t('inputPlaceholder')

            if (mode === 'read') {
                const styles = {
                    display: 'inline-block',
                    paddingBlock: `${paddingXXS}px`,
                    paddingInline: `${paddingSM}px`,
                    lineHeight: lineHeight,
                    maxWidth: '100%',
                    whiteSpace: 'pre-wrap',
                }
                return (
                    <span class={`${prefixCls.value}__read`} style={styles}>
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
