import { defineComponent, ref, unref } from 'vue'
import { ConfigProvider, Space } from 'ant-design-vue'
import ToolList from './ToolList'
import { pick } from 'lodash-es'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

export default defineComponent({
    inheritAttrs: false,
    props: {
        ...ToolList.props,
        title: {
            type: Function,
            default: undefined
        },
        pageData: {
            type: Array,
            default: () => ([])
        }
    },
    setup (props, { slots, attrs }) {
        const popupContainer = ref(null)

        function getPopupContainer () {
            const plain = unref(popupContainer)
            return plain ? (plain.$el || plain) : plain
        }

        return () => {
            const { title, loading, pageData } = props

            const renderTitle = slots.title || title
            const slotScope = { loading, pageData }

            const toolListProps = {
                ...attrs,
                ...pick(props, Object.keys(ToolList.props))
            }

            return (
                <ConfigProvider getPopupContainer={getPopupContainer}>
                    <div class={cx('popup-container')} ref={popupContainer}>
                        <div class={cx('toolbar')}>
                            <div class={cx('toolbar-title')}>
                                {renderTitle && renderTitle(slotScope)}
                            </div>
                            <div class={cx('toolbar-action')}>
                                <Space size={8} style={{ marginRight: '12px' }}>
                                    {slots.default && slots.default(slotScope)}
                                </Space>
                                <ToolList {...toolListProps}/>
                            </div>
                        </div>
                    </div>
                </ConfigProvider>
            )
        }
    }
})
