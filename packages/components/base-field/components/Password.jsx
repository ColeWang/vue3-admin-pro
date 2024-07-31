import { defineComponent, ref, unref } from 'vue'
import { Input, Space, theme } from 'ant-design-vue'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons-vue'
import { useLocaleReceiver } from '../../locale-provider'
import baseFieldProps from '../props'
import { getSlotVNode } from '../../../utils/props-util'
import { preventDefault } from '../../../utils/event'
import { isEmpty } from '../../../utils/is'

export default defineComponent({
    inheritAttrs: false,
    props: { ...baseFieldProps },
    setup (props, { slots }) {
        const { token } = theme.useToken()
        const { t } = useLocaleReceiver(['global'])

        const { fieldProps } = props
        const visible = ref(fieldProps.visible || false)

        function onVisibleClick (evt) {
            preventDefault(evt)
            visible.value = !unref(visible)
        }

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const { sizeXXS } = unref(token)
            const placeholder = fieldProps.placeholder || t('inputPlaceholder')

            if (mode === 'read') {
                if (isEmpty(text)) {
                    return emptyText
                }
                const eyeIcon = unref(visible) ? <EyeOutlined/> : <EyeInvisibleOutlined/>
                return (
                    <Space size={sizeXXS}>
                        <span>{unref(visible) ? text : '＊＊＊＊＊'}</span>
                        <a onClick={onVisibleClick}>{eyeIcon}</a>
                    </Space>
                )
            }
            const needFieldProps = {
                allowClear: true,
                ...fieldProps,
                placeholder: placeholder
            }
            const dom = <Input.Password {...needFieldProps} v-slots={slots}/>
            const slotScope = { text, props: { mode, ...fieldProps }, dom }
            const renderDom = getSlotVNode(slots, props, 'renderField', slotScope)
            return renderDom || dom
        }
    }
})
