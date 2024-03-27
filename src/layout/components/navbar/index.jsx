import { defineComponent } from 'vue'
import { Space } from 'ant-design-vue'
import Breadcrumb from '../breadcrumb'
import Fullscreen from '../fullscreen'
import Avatar from '../avatar'
// 不需要多语言的话 去掉 Language 就好
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
        },
        onLocal: {
            type: Function,
            default: undefined
        }
    },
    emits: ['change', 'local'],
    setup (props, { emit, attrs }) {
        function handleCollapseClick () {
            emit('change', !props.collapsed)
        }

        function onLanguageChange (local) {
            emit('local', local)
        }

        return () => {
            const { router, collapsed } = props

            const collapseClassNames = cx('collapse__icon', {
                'collapse__icon-down': !!collapsed
            })

            return (
                <div class={cx('navbar')}>
                    <div class={cx('navbar__left')}>
                        <div class={cx('collapse')} onClick={handleCollapseClick}>
                            <HamburgerOutlined class={collapseClassNames}/>
                        </div>
                        <Breadcrumb router={router}/>
                    </div>
                    <div class={cx('navbar__right')}>
                        <Space size={20}>
                            <Fullscreen/>
                            <Language onChange={onLanguageChange}/>
                            <Avatar {...attrs}/>
                        </Space>
                    </div>
                </div>
            )
        }
    }
})
