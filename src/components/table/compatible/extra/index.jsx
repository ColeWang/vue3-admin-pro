import { defineComponent } from 'vue'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

export default defineComponent({
    inheritAttrs: false,
    setup (props, { slots }) {
        return () => {
            const children = slots.default && slots.default()

            return <div class={cx('extra')}>{children}</div>
        }
    }
})
