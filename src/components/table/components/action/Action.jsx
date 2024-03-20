import { defineComponent } from 'vue'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

export default defineComponent({
    inheritAttrs: false,
    props: {
        type: {
            type: String,
            default: 'primary'
        },
        onClick: {
            type: Function,
            default: undefined
        }
    },
    emits: ['click'],
    setup (props, { emit, slots }) {
        function onClick (evt) {
            emit('click', evt)
        }

        return () => {
            const actionClassNames = cx('action', {
                'action__primary': props.type === 'primary',
                'action__warning': props.type === 'warning',
                'action__error': props.type === 'error'
            })

            return (
                <a class={actionClassNames} onClick={onClick}>
                    {slots.default && slots.default()}
                </a>
            )
        }
    }
})
