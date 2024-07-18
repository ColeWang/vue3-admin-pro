import { defineComponent } from 'vue'
import { preventDefault } from '../../../_utils/event'
import classNames from '../../../_utils/classNames/bind'
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
            preventDefault(evt)
            emit('click', evt)
        }

        return () => {
            const actionClass = cx('action', {
                'action__primary': props.type === 'primary',
                'action__warning': props.type === 'warning',
                'action__error': props.type === 'error'
            })

            return (
                <a class={actionClass} onClick={onClick}>
                    {slots.default && slots.default()}
                </a>
            )
        }
    }
})
