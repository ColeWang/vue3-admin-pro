import { defineComponent, unref } from 'vue'
import { Space } from 'ant-design-vue'
import { useFormInstance } from '../base-form'
import useMediaQuery from '@/utils/hooks/useMediaQuery'
import { getPropsSlot } from '@/utils/props-util'
import { omit } from 'lodash-es'
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
            const { size, align } = props
            const { formProps = {} } = formInstance
            const layout = unref(formProps).layout || 'vertical'

            const groupClass = cx('group', {
                'group__inline': layout === 'inline',
                'group__vertical': 'xs' === unref(className) || layout === 'vertical',
            })

            const spaceProps = {
                wrap: true,
                align: align,
                size: layout === 'inline' ? 0 : size
            }
            const spaceStyle = {
                rowGap: 0,
                marginBottom: 0,
                flexWrap: 'wrap',
                maxWidth: '100%'
            }

            const titleDom = getPropsSlot(slots, props, 'title')
            const needSlots = omit(slots, ['title'])

            return (
                <div class={groupClass}>
                    {titleDom && (
                        <div class={cx('group-title')}>{titleDom}</div>
                    )}
                    <Space {...spaceProps} style={spaceStyle} v-slots={needSlots}/>
                </div>
            )
        }
    }
})
