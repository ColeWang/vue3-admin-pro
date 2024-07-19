import { defineComponent, ref, Transition, unref } from 'vue'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

export default defineComponent({
    props: {
        onClose: {
            type: Function,
            default: undefined
        }
    },
    setup (props, { expose }) {
        const spinning = ref(true)

        function doClose () {
            props.onClose && props.onClose()
        }

        function hide () {
            spinning.value = false
        }

        expose({ spinning, hide })

        return () => {
            return (
                <Transition name={'fade'} appear={true} onAfterLeave={doClose}>
                    <div class={cx('loading')} v-show={unref(spinning)}>
                        <div class={cx('loading-container')}>
                            <svg viewBox="25 25 50 50" class={cx('circular')}>
                                <circle cx="50" cy="50" r="20" fill="none" class={cx('path')}/>
                            </svg>
                        </div>
                    </div>
                </Transition>
            )
        }
    }
})
