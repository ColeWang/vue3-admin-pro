import { defineComponent, unref } from 'vue'
import { Space } from 'ant-design-vue'
import { useFormInstance } from '../base-form'
import useMediaQuery from '@/utils/hooks/useMediaQuery'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

export default defineComponent({
    inheritAttrs: false,
    props: {
        title: {
            type: String,
            default: undefined
        },
        size: {
            type: Number,
            default: 32
        },
        align: {
            type: String,
            default: 'start'
        }
    },
    setup (props, { slots }) {
        const { className } = useMediaQuery()
        const formInstance = useFormInstance()

        return () => {
            const { title, size, align } = props
            const { formProps = {} } = formInstance
            const { title: titleSlot, ...restSlots } = slots
            const layout = unref(formProps).layout || 'vertical'

            const children = titleSlot && titleSlot()

            const titleDom = (children || title) && (
                <div class={cx('group-title')}>{children || title}</div>
            )

            const spaceStyles = {
                rowGap: 0,
                marginBottom: 0,
                flexWrap: 'wrap',
                maxWidth: '100%'
            }

            const spaceProps = {
                wrap: true,
                align: align,
                size: layout === 'inline' ? 0 : size
            }

            const groupClassNames = cx('group', {
                'group__inline': layout === 'inline',
                'group__vertical': 'xs' === unref(className) || layout === 'vertical',
            })

            return (
                <div class={groupClassNames}>
                    {titleDom}
                    <Space {...spaceProps} style={spaceStyles} v-slots={restSlots}/>
                </div>
            )
        }
    }
})
