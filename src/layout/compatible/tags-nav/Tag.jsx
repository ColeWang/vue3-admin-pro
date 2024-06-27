import { defineComponent, withModifiers } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'
import { preventDefault } from '@/utils/event'
import classNames from '@/utils/classNames/bind'
import styles from './style/tag.module.scss'

const cx = classNames.bind(styles)

export default defineComponent({
    props: {
        closable: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            default: 'default' // primary
        },
        onClick: {
            type: Function,
            default: undefined
        },
        onClose: {
            type: Function,
            default: undefined
        }
    },
    emits: ['click', 'close'],
    setup (props, { emit, slots }) {
        function onClick (evt) {
            emit('click', evt)
        }

        function onClose (evt) {
            preventDefault(evt, true)
            emit('close', evt)
        }

        return () => {
            const { closable, color } = props

            const dotInnerClass = cx('dot-inner', {
                'dot-inner__primary': color === 'primary'
            })

            return (
                <div class={cx('tag')} onClick={onClick}>
                    <span class={dotInnerClass}/>
                    <span class={cx('tag_text')}>{slots.default && slots.default()}</span>
                    {closable && (
                        <span class={cx('close')} onClick={withModifiers(onClose, ['stop'])}>
                            <CloseOutlined/>
                        </span>
                    )}
                </div>
            )
        }
    }
})
