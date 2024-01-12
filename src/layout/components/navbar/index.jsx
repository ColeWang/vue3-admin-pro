import { defineComponent } from 'vue'
import { Space } from 'ant-design-vue'
import Breadcrumb from '../breadcrumb'
import Fullscreen from '../fullscreen'
import Avatar from '../avatar'
import HamburgerOutlined from '@/icons/HamburgerOutlined'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

export default defineComponent({
    inheritAttrs: false,
    props: {
        collapsed: {
            type: Boolean,
            default: false
        }
    },
    emits: ['change'],
    setup (props, { emit, attrs }) {
        function handleCollapseClick () {
            emit('change', !props.collapsed)
        }

        return () => {
            const collapseClassNames = cx('collapse__icon', {
                'collapse__icon-down': props.collapsed
            })

            return (
                <div class={cx('navbar')}>
                    <div class={cx('navbar__left')}>
                        <div class={cx('collapse')} onClick={handleCollapseClick}>
                            <HamburgerOutlined class={collapseClassNames}/>
                        </div>
                        <Breadcrumb/>
                    </div>
                    <div class={cx('navbar__right')}>
                        <Space size={20}>
                            <Fullscreen/>
                            <Avatar {...attrs}/>
                        </Space>
                    </div>
                </div>
            )
        }
    }
})
