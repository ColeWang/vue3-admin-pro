import { defineComponent, KeepAlive, ref, unref } from 'vue'
import { RouterView } from 'vue-router'
import { BackTop } from 'ant-design-vue'
import classNames from '@utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

export default defineComponent({
    inheritAttrs: false,
    props: {
        include: {
            type: Array,
            default: () => ([])
        }
    },
    setup (props) {
        const spaceRef = ref(null)

        return () => {
            const { include } = props

            return (
                <div class={cx('container')}>
                    <div class={cx('content-space')} ref={spaceRef}>
                        <div id={'viewContainer'} class={cx('view-container')}>
                            <div class={cx('content__fill')}/>
                            <div class={cx('content__view')}>
                                <RouterView>
                                    {({ Component }) => {
                                        return (
                                            <KeepAlive max={10} include={include}>
                                                {Component}
                                            </KeepAlive>
                                        )
                                    }}
                                </RouterView>
                            </div>
                            <div class={cx('content__fill')}/>
                        </div>
                        <BackTop class={cx('back-top')} target={() => unref(spaceRef)}/>
                    </div>
                </div>
            )
        }
    }
})
