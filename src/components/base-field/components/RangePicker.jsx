import { defineComponent, Fragment } from 'vue'
import { RangePicker } from 'ant-design-vue'
import { useLocaleReceiver } from '@/components/locale-provider'
import baseFieldProps from '../props'
import { formatDate } from '../utils'
import { getSlotVNode } from '@/utils/props-util'
import { isArray } from 'lodash-es'

export default defineComponent({
    inheritAttrs: false,
    props: { ...baseFieldProps },
    setup (props, { slots }) {
        const { t } = useLocaleReceiver('global')

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const placeholder = fieldProps.placeholder || [t('selectPlaceholder'), t('selectPlaceholder')]

            if (mode === 'read') {
                const [startText, endText] = isArray(text) ? text : []
                const valueStartText = formatDate(startText, fieldProps.format)
                const valueEndText = formatDate(endText, fieldProps.format)
                return (
                    <Fragment>
                        {valueStartText ?? emptyText}
                        {'~'}
                        {valueEndText ?? emptyText}
                    </Fragment>
                )
            }
            const needFieldProps = {
                placeholder: placeholder,
                allowClear: true,
                ...fieldProps
            }
            const dom = <RangePicker {...needFieldProps} v-slots={slots}/>
            const slotScope = { text, props: { mode, ...fieldProps }, dom }
            const renderDom = getSlotVNode(slots, props, 'renderField', slotScope)
            return renderDom || dom
        }
    }
})
