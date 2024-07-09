import { defineComponent, ref, unref } from 'vue'
import { Popover } from 'ant-design-vue'
import { pick } from 'lodash-es'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

export default defineComponent({
    inheritAttrs: false,
    props: {
        ...Popover.props,
        trigger: {
            type: String,
            default: 'click'
        },
        placement: {
            type: String,
            default: 'topLeft'
        },
        errors: {
            type: Array,
            default: () => ([])
        }
    },
    setup (props, { slots }) {
        const sOpen = ref(false)

        const cacheErrors = ref(props.errors || [])

        function onOpenChange (value) {
            if (value !== unref(sOpen)) {
                sOpen.value = value
            }
        }

        return () => {
            const { errors } = props

            const popoverProps = {
                ...pick(props, Object.keys(Popover.props)),
                destroyTooltipOnHide: true,
                open: errors.length !== 0 ? unref(sOpen) : false,
                onOpenChange: onOpenChange
            }

            // @todo 收回时 errors 先置空了, 导致了浮层的塌陷
            const popoverSlots = {
                content: () => (
                    <div class={cx('with-help')}>
                        {errors}
                    </div>
                )
            }
            return (
                <Popover {...popoverProps} v-slots={popoverSlots}>
                    <div onClick={() => false}>
                        {slots.default && slots.default()}
                    </div>
                </Popover>
            )
        }
    }
})
