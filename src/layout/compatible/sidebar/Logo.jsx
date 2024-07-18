import { defineComponent } from 'vue'
import classNames from '@utils/classNames/bind'
import styles from './style/logo.module.scss'

const cx = classNames.bind(styles)

export default defineComponent({
    inheritAttrs: false,
    props: {
        collapsed: {
            type: Boolean,
            default: false
        }
    },
    setup (props) {
        return () => {
            return (
                <div class={cx('sidebar-logo')}>
                    <div class={cx('logo__text')}>
                        {'-'}
                    </div>
                </div>
            )
        }
    }
})
