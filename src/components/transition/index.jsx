import { defineComponent, Transition } from 'vue'
import collapseMotion from './collapseMotion'
import classNames from '@utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

export default defineComponent({
    inheritAttrs: false,
    props: {
        name: {
            type: String,
            default: cx('collapse-motion'),
        },
        appear: {
            type: Boolean,
            default: false,
        }
    },
    setup (props, { slots }) {
        return () => {
            const { name, appear } = props

            return (
                <Transition {...collapseMotion(name, appear)}>
                    {slots.default && slots.default()}
                </Transition>
            )
        }
    }
})
