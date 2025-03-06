import { defineComponent, unref } from 'vue'
import { Switch, theme as antTheme, Tooltip } from 'ant-design-vue'
import { CheckOutlined } from '@ant-design/icons-vue'
import { useConfigInject } from '@site-pro/hooks'
import useAppShare from '@/hooks/useAppShare'
import useStyle from './style/theme-settings'

export default defineComponent({
    inheritAttrs: false,
    setup (props, { attrs }) {
        const { prefixCls } = useConfigInject('pro-layout-theme-settings', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const { token: antToken } = antTheme.useToken()

        const { theme, setTheme } = useAppShare()

        function setState (state) {
            setTheme && setTheme({ ...unref(theme), ...state })
        }

        return () => {
            const { dark, compact, token, sideDark } = unref(theme) || {}

            const colors = [
                {
                    title: '拂晓蓝',
                    name: 'blue',
                    colorPrimary: unref(antToken)['blue']
                },
                {
                    title: '薄暮',
                    name: 'red',
                    colorPrimary: unref(antToken)['red']
                },
                {
                    title: '火山',
                    name: 'volcano',
                    colorPrimary: unref(antToken)['volcano']
                },
                {
                    title: '日暮',
                    name: 'gold',
                    colorPrimary: unref(antToken)['gold']
                },
                {
                    title: '明青',
                    name: 'cyan',
                    colorPrimary: unref(antToken)['cyan']
                },
                {
                    title: '极光绿',
                    name: 'green',
                    colorPrimary: unref(antToken)['green']
                },
                {
                    title: '极客蓝',
                    name: 'geekblue',
                    colorPrimary: unref(antToken)['geekblue']
                },
                {
                    title: '酱紫',
                    name: 'purple',
                    colorPrimary: unref(antToken)['purple']
                }
            ]

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <div class={`${prefixCls.value}-block-wrapper`}>
                        <div class={`${prefixCls.value}-title`}>整体风格</div>
                        <div class={`${prefixCls.value}-theme-block`}>
                            <Tooltip title={'亮色主题'}>
                                <div
                                    class={[`${prefixCls.value}-theme`, `${prefixCls.value}-theme-light`]}
                                    onClick={setState.bind(null, { dark: false, sideDark: false })}
                                >
                                    {!dark && !sideDark ? <CheckOutlined/> : null}
                                </div>
                            </Tooltip>
                            <Tooltip title={'暗色主题'}>
                                <div
                                    class={[`${prefixCls.value}-theme`, `${prefixCls.value}-theme-side-dark`]}
                                    onClick={setState.bind(null, { dark: false, sideDark: true })}
                                >
                                    {!dark && sideDark ? <CheckOutlined/> : null}
                                </div>
                            </Tooltip>
                            <Tooltip title={'暗黑模式'}>
                                <div
                                    class={[`${prefixCls.value}-theme`, `${prefixCls.value}-theme-dark`]}
                                    onClick={setState.bind(null, { dark: true, sideDark: false })}
                                >
                                    {dark && sideDark ? <CheckOutlined/> : null}
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                    <div class={`${prefixCls.value}-block-wrapper`}>
                        <div class={`${prefixCls.value}-title`}>主题色</div>
                        <div class={`${prefixCls.value}-primary-block`}>
                            {colors.map((item) => (
                                <Tooltip title={item.title} key={item.name}>
                                    <div
                                        class={`${prefixCls.value}-primary`}
                                        style={{ backgroundColor: unref(antToken)[item.name] }}
                                        onClick={setState.bind(null, { token: { colorPrimary: item.colorPrimary } })}
                                    >
                                        {token && token.colorPrimary === item.colorPrimary ? <CheckOutlined/> : null}
                                    </div>
                                </Tooltip>
                            ))}
                        </div>
                    </div>
                    <div class={`${prefixCls.value}-block-wrapper`}>
                        <div class={`${prefixCls.value}-title`}>紧凑主题</div>
                        <div class={`${prefixCls.value}-compact-block`}>
                            <Switch checked={compact} onUpdate:checked={setState.bind(null, { compact: !compact })}/>
                        </div>
                    </div>
                </div>
            )
        }
    }
})
