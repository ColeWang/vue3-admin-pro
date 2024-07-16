import { defineComponent } from 'vue'
import classNames from '../../../_utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

export default defineComponent({
    inheritAttrs: false,
    setup (props, { slots, attrs }) {
        return () => {
            return (
                <div class={cx('extra')} {...attrs}>
                    {slots.default && slots.default()}
                </div>
            )
        }
    }
})
