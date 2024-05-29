import { defineComponent } from 'vue'
import { Space } from 'ant-design-vue'
import Breadcrumb from '../breadcrumb'
import Fullscreen from '../fullscreen'
import Avatar from '../avatar'
import Language from '../language'
import { HamburgerOutlined } from '@/components/icon'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

export default defineComponent({
    inheritAttrs: false,
    props: {
        router: {
            type: Object,
            default: undefined
        },
        collapsed: {
            type: Boolean,
            default: false
        },
        onChange: {
            type: Function,
            default: undefined
        }
    },
    emits: ['change'],
    setup (props, { emit }) {
        function handleCollapseClick () {
            emit('change', !props.collapsed)
        }

        return () => {
            const { router, collapsed } = props

            const collapseClass = cx('collapse__icon', {
                'collapse__icon-down': !!collapsed
            })

            return (
                <div class={cx('navbar')}>
                    <div class={cx('navbar__left')}>
                        <div class={cx('collapse')} onClick={handleCollapseClick}>
                            <HamburgerOutlined class={collapseClass}/>
                        </div>
                        <Breadcrumb router={router}/>
                    </div>
                    <div class={cx('navbar__right')}>
                        <Space size={20}>
                            <Fullscreen/>
                            <Language/>
                            <Avatar/>
                        </Space>
                    </div>
                </div>
            )
        }
    }
})
