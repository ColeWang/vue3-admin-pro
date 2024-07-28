import { defineComponent, ref, unref, watch } from 'vue'
import { Switch, theme as antTheme, Tooltip } from 'ant-design-vue'
import { CheckOutlined } from '@ant-design/icons-vue'
import { useConfigInject } from '@utils/extend'
import useStyle from './style/theme-settings'
import { useAppInstance } from '@/useAppInstance'

const themeList = [
    {
        name: 'light',
        title: '亮色主题'
    },
    {
        name: 'dark',
        title: '暗色主题'
    },
    {
        name: 'real-dark',
        title: '暗黑模式'
    }
]

const primaryList = [
    {
        name: 'blue',
        title: '拂晓蓝'
    },
    {
        name: 'red',
        title: '薄暮'
    },
    {
        name: 'volcano',
        title: '火山'
    },
    {
        name: 'gold',
        title: '日暮'
    },
    {
        name: 'cyan',
        title: '明青'
    },
    {
        name: 'green',
        title: '极光绿'
    },
    {
        name: 'geekblue',
        title: '极客蓝'
    },
    {
        name: 'purple',
        title: '酱紫'
    }
]

export default defineComponent({
    inheritAttrs: false,
    setup (props, { attrs }) {
        const { prefixCls } = useConfigInject('pro-theme-settings', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const { token } = antTheme.useToken()
        const { darkAlgorithm, compactAlgorithm } = antTheme

        const { setConfigTheme } = useAppInstance()

        const theme = ref('dark')
        const primary = ref('blue')
        const compact = ref(false)

        watch([theme, primary, compact], ([themeValue, primaryValue, compactValue]) => {
            const algorithm = [
                themeValue === 'real-dark' ? darkAlgorithm : null,
                compactValue ? compactAlgorithm : null
            ]
            setConfigTheme && setConfigTheme(themeValue, {
                algorithm: algorithm.filter((value) => !!value),
                token: { colorPrimary: unref(token)[primaryValue] }
            })
        })

        function onThemeClick (value) {
            theme.value = value
        }

        function onPrimaryClick (value) {
            primary.value = value
        }

        return () => {
            const themeDom = themeList.map((item) => {
                return (
                    <Tooltip title={item.title}>
                        <div
                            class={[`${prefixCls.value}-theme`, `${prefixCls.value}-theme-${item.name}`]}
                            onClick={onThemeClick.bind(null, item.name)}
                        >
                            {unref(theme) === item.name ? <CheckOutlined/> : null}
                        </div>
                    </Tooltip>
                )
            })

            const primaryDom = primaryList.map((item) => {
                const primaryStyle = { backgroundColor: unref(token)[item.name] }
                return (
                    <Tooltip title={item.title}>
                        <div
                            class={`${prefixCls.value}-primary`}
                            style={primaryStyle}
                            onClick={onPrimaryClick.bind(null, item.name)}
                        >
                            {unref(primary) === item.name ? <CheckOutlined/> : null}
                        </div>
                    </Tooltip>
                )
            })

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <div class={`${prefixCls.value}-block-wrap`}>
                        <div class={`${prefixCls.value}-title`}>整体风格</div>
                        <div class={`${prefixCls.value}-theme-block`}>
                            {themeDom}
                        </div>
                    </div>
                    <div class={`${prefixCls.value}-block-wrap`}>
                        <div class={`${prefixCls.value}-title`}>主题色</div>
                        <div class={`${prefixCls.value}-primary-block`}>
                            {primaryDom}
                        </div>
                    </div>
                    <div class={`${prefixCls.value}-block-wrap`}>
                        <div class={`${prefixCls.value}-title`}>紧凑主题</div>
                        <div class={`${prefixCls.value}-compact-block`}>
                            <Switch v-model:checked={compact.value}/>
                        </div>
                    </div>
                </div>
            )
        }
    }
})
