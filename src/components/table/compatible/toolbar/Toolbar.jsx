import { defineComponent, ref, unref } from 'vue'
import { ConfigProvider, Space } from 'ant-design-vue'
import ToolList from './ToolList'
import { getSlotVNode } from '@/utils/props-util'
import { pick } from 'lodash-es'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

const defaultOptions = {
    reload: true,
    density: true,
    export: true,
    setting: true
}

export default defineComponent({
    inheritAttrs: false,
    props: {
        toolbar: {

        },
        title: {
            type: Function,
            default: undefined
        },
        actions: {
            type: Function,
            default: undefined
        },
        settings: {
            type: Function,
            default: undefined
        },
        options: {
            type: Object,
            default: () => (defaultOptions)
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
            const { loading, pageData } = props

            const slotScope = { loading, pageData }
            const titleDom = getSlotVNode(slots, props, 'title', slotScope)

            const toolListProps = {
                ...attrs,
                ...pick(props, Object.keys(ToolList.props))
            }

            return (
                <ConfigProvider getPopupContainer={getPopupContainer}>
                    <div class={cx('popup-container')} ref={popupContainer}>
                        <div class={cx('toolbar')}>
                            <div class={cx('toolbar-title')}>
                                {titleDom}
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
