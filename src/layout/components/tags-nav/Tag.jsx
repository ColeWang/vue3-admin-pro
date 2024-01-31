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
        }
    },
    emits: ['click', 'close'],
    setup (props, { emit, slots, attrs }) {
        function onClick (evt) {
            emit('click', evt)
        }

        function onClose (evt) {
            preventDefault(evt, true)
            emit('close', evt)
        }

        return () => {
            const { closable, color } = props

            const dotInnerClassNames = cx('dot-inner', {
                'dot-inner__primary': color === 'primary'
            })

            const children = slots.default ? slots.default() : null

            return (
                <div class={cx('tag')} {...attrs} onClick={onClick}>
                    <span class={dotInnerClassNames}/>
                    <span class={cx('tag_text')}>{children}</span>
                    {
                        closable ? (
                            <span class={cx('close')} onClick={withModifiers(onClose, ['stop'])}>
                                <CloseOutlined/>
                            </span>
                        ) : null
                    }
                </div>
            )
        }
    }
})
