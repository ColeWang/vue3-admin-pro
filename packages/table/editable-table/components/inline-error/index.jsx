import { defineComponent, ref, unref } from 'vue'
import { Popover } from 'ant-design-vue'
import { pick } from 'lodash-es'
import { cloneProxyToRaw } from '../../../../_utils/props-util'
import classNames from '../../../../_utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

const WithHelp = defineComponent({
    inheritAttrs: false,
    props: {
        errors: {
            type: Array,
            default: () => ([])
        }
    },
    setup (props) {
        const cacheErrors = cloneProxyToRaw(props.errors)
        return () => {
            return (
                <div class={cx('with-help')}>
                    {cacheErrors}
                </div>
            )
        }
    }
})

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
            return (
                <Popover {...popoverProps} v-slots={{
                    content: () => <WithHelp errors={errors}/>
                }}>
                    {slots.default && slots.default()}
                </Popover>
            )
        }
    }
})
