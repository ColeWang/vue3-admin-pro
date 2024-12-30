import { defineComponent, unref } from 'vue'
import { Switch, theme as antTheme, Tooltip } from 'ant-design-vue'
import { CheckOutlined } from '@ant-design/icons-vue'
import { useConfigInject } from '@site-pro/hooks'
import useAppShare from '@/hooks/useAppShare'
import useStyle from './style/theme-settings'

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

        const { theme, setTheme } = useAppShare()

        function onUpdateTheme (value) {
            setTheme && setTheme({
                ...unref(theme),
                theme: value
            })
        }

        function onUpdatePrimary (value) {
            setTheme && setTheme({
                ...unref(theme),
                primary: value
            })
        }

        function onUpdateCompact (value) {
            setTheme && setTheme({
                ...unref(theme),
                compact: value
            })
        }

        return () => {
            const { primary, compact } = unref(theme)

            const themeDom = themeList.map((item) => {
                return (
                    <Tooltip title={item.title}>
                        <div
                            class={[`${prefixCls.value}-theme`, `${prefixCls.value}-theme-${item.name}`]}
                            onClick={onUpdateTheme.bind(null, item.name)}
                        >
                            {theme === item.name ? <CheckOutlined/> : null}
                        </div>
                    </Tooltip>
                )
            })

            const primaryDom = primaryList.map((item) => {
                return (
                    <Tooltip title={item.title}>
                        <div
                            class={`${prefixCls.value}-primary`}
                            style={{ backgroundColor: unref(token)[item.name] }}
                            onClick={onUpdatePrimary.bind(null, item.name)}
                        >
                            {primary === item.name ? <CheckOutlined/> : null}
                        </div>
                    </Tooltip>
                )
            })

            const compactProps = { checked: compact, ['onUpdate:checked']: onUpdateCompact }
            const compactDom = <Switch {...compactProps}/>

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <div class={`${prefixCls.value}-block-wrapper`}>
                        <div class={`${prefixCls.value}-title`}>整体风格</div>
                        <div class={`${prefixCls.value}-theme-block`}>
                            {themeDom}
                        </div>
                    </div>
                    <div class={`${prefixCls.value}-block-wrapper`}>
                        <div class={`${prefixCls.value}-title`}>主题色</div>
                        <div class={`${prefixCls.value}-primary-block`}>
                            {primaryDom}
                        </div>
                    </div>
                    <div class={`${prefixCls.value}-block-wrapper`}>
                        <div class={`${prefixCls.value}-title`}>紧凑主题</div>
                        <div class={`${prefixCls.value}-compact-block`}>
                            {compactDom}
                        </div>
                    </div>
                </div>
            )
        }
    }
})
