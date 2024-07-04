import { computed, defineComponent, unref } from 'vue'
import { Breadcrumb } from 'ant-design-vue'
import useShowTitle from '../../hooks/useShowTitle'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

export default defineComponent({
    inheritAttrs: false,
    props: {
        router: {
            type: Object,
            default: undefined
        }
    },
    setup (props) {
        const { showTitle } = useShowTitle()

        const levels = computed(() => {
            if (props.router && props.router.currentRoute) {
                return unref(props.router.currentRoute).matched.concat().filter((item) => {
                    return !!item.meta.title
                })
            } else {
                return []
            }
        })

        return () => {
            return (
                <Breadcrumb class={cx('breadcrumb')}>
                    {unref(levels).map((item) => {
                        return (
                            <Breadcrumb.Item>
                                {showTitle && showTitle(item)}
                            </Breadcrumb.Item>
                        )
                    })}
                </Breadcrumb>
            )
        }
    }
})
