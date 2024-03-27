import { defineComponent } from 'vue'
import { getSlotVNode } from '@/utils/props-util'
import classNames from '@/utils/classNames/bind'
import styles from './style/app-main.module.scss'

const cx = classNames.bind(styles)

export default defineComponent({
    inheritAttrs: false,
    props: {
        sidebar: {
            type: Function,
            default: undefined
        },
        navbar: {
            type: Function,
            default: undefined
        }
    },
    setup (props, { slots }) {
        return () => {
            const sidebarDom = getSlotVNode(slots, props, 'sidebar')
            const navbarDom = getSlotVNode(slots, props, 'navbar')

            return (
                <div class={cx('app-main')}>
                    {sidebarDom}
                    <div class={cx('app-main__prime')}>
                        {navbarDom}
                        <div class={cx('app-main__content')}>
                            {slots.default && slots.default()}
                        </div>
                    </div>
                </div>
            )
        }
    }
})
