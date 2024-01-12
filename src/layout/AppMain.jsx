import { defineComponent } from 'vue'
import classNames from '@/utils/classNames/bind'
import styles from './style/app-main.module.scss'

const cx = classNames.bind(styles)

export default defineComponent({
    inheritAttrs: false,
    setup (props, { slots }) {
        return () => {
            return (
                <div class={cx('app-main')}>
                    {slots.sidebar ? slots.sidebar() : null}
                    <div class={cx('app-main__prime')}>
                        {slots.navbar ? slots.navbar() : null}
                        <div class={cx('app-main__content')}>
                            {slots.default ? slots.default() : null}
                        </div>
                    </div>
                </div>
            )
        }
    }
})
