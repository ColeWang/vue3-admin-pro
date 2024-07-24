import { defineComponent, nextTick, ref, unref, watch } from 'vue'
import { Button, Dropdown, Menu } from 'ant-design-vue'
import { CloseCircleOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
import Tag from './Tag'
import useShowTitle from '../../hooks/useShowTitle'
import { omitNil } from '@utils/util'
import { isString } from 'lodash-es'
import { useConfigInject } from '@utils/extend'
import useStyle from './style'

const outerPadding = 4

export default defineComponent({
    props: {
        homeName: {
            type: String,
            default: undefined
        },
        route: {
            type: Object,
            default: undefined
        },
        tags: {
            type: Array,
            default: () => ([])
        },
        onClick: {
            type: Function,
            default: undefined
        },
        onClose: {
            type: Function,
            default: undefined
        }
    },
    emits: ['click', 'close'],
    setup (props, { emit, attrs }) {
        const { prefixCls } = useConfigInject('pro-layout-tags', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        let tagRefsMap = {}

        const scrollOuterRef = ref(null)
        const scrollBodyRef = ref(null)

        const { showTitle } = useShowTitle()

        const bodyLeft = ref(0)

        function onTagRefs (key, instance) {
            if (key && isString(key)) {
                const values = { ...tagRefsMap, [key]: instance }
                tagRefsMap = omitNil(values)
            }
        }

        watch(() => props.route, (currentRoute) => {
            currentRoute && getTagInstanceByRoute(currentRoute.name)
        }, { immediate: true, deep: true })

        function setBodyLeft (value) {
            bodyLeft.value = value
        }

        function onClick (current) {
            return function () {
                getTagInstanceByRoute(current.name)
                emit('click', current)
            }
        }

        function onClose (current) {
            return function () {
                const { route: currentRoute, tags } = props
                const result = tags.filter((item) => {
                    return item.name !== current.name
                })
                if (currentRoute.name === current.name) {
                    const len = result.length - 1
                    const index = tags.findIndex((item) => {
                        return item.name === current.name
                    })
                    const value = len >= index ? index : len
                    emit('close', result, result[value].name)
                } else {
                    emit('close', result)
                }
            }
        }

        function onMenuClose (type) {
            const { homeName, route: currentRoute, tags } = props
            const finalAction = {
                all: () => {
                    const result = tags.filter((item) => {
                        return item.name === homeName
                    })
                    emit('close', result, homeName)
                    setTimeout(() => {
                        getTagInstanceByRoute(homeName)
                    }, 100)
                },
                others: () => {
                    const result = tags.filter((item) => {
                        return item.name === currentRoute.name || item.name === homeName
                    })
                    emit('close', result)
                    setTimeout(() => {
                        getTagInstanceByRoute(currentRoute.name)
                    }, 100)
                }
            }
            finalAction[type] && finalAction[type]()
        }

        function handleScroll (offset) {
            const { offsetWidth: outerWidth } = unref(scrollOuterRef)
            const { offsetWidth: bodyWidth } = unref(scrollBodyRef)
            if (offset > 0) {
                setBodyLeft(Math.min(0, unref(bodyLeft) + offset))
            } else {
                if (outerWidth < bodyWidth) {
                    if (unref(bodyLeft) < -(bodyWidth - outerWidth)) {
                        setBodyLeft(unref(bodyLeft))
                    } else {
                        setBodyLeft(Math.max(unref(bodyLeft) + offset, outerWidth - bodyWidth))
                    }
                } else {
                    setBodyLeft(0)
                }
            }
        }

        function getTagInstanceByRoute (name) {
            nextTick().then(() => {
                setTimeout(() => {
                    const instance = tagRefsMap[name] || {}
                    instance.$el && onMoveToView(instance.$el)
                }, 0)
            })
        }

        function onMoveToView (evt) {
            const { offsetWidth: outerWidth } = unref(scrollOuterRef)
            const { offsetWidth: bodyWidth } = unref(scrollBodyRef)
            const { offsetLeft: left, offsetWidth: width } = evt
            if (bodyWidth < outerWidth) {
                setBodyLeft(0)
            } else if (left < -unref(bodyLeft)) {
                setBodyLeft(-left + outerPadding)
            } else if (left > -unref(bodyLeft) && left + width < -unref(bodyLeft) + outerWidth) {
                setBodyLeft(Math.min(0, outerWidth - width - left - outerPadding))
            } else {
                setBodyLeft(-(left - (outerWidth - width - outerPadding)))
            }
        }

        return () => {
            const { tags, route: currentRoute, homeName } = props

            const scrollBodyStyle = {
                left: unref(bodyLeft) + 'px'
            }

            const tagNodes = tags.map((item) => {
                const { name: key } = item || {}
                const tagProps = {
                    color: currentRoute.name === key ? 'primary' : 'default',
                    closable: key !== homeName,
                    onClick: onClick(item),
                    onClose: onClose(item)
                }
                return (
                    <Tag {...tagProps} class={`${prefixCls.value}-tag`} key={key} ref={onTagRefs.bind(null, key)}>
                        {showTitle && showTitle(item)}
                    </Tag>
                )
            })

            const dropdownSlots = {
                overlay: () => {
                    return (
                        <Menu selectedKeys={[]}>
                            <Menu.Item onClick={onMenuClose.bind(null, 'all')}>
                                关闭所有
                            </Menu.Item>
                            <Menu.Item onClick={onMenuClose.bind(null, 'others')}>
                                关闭其他
                            </Menu.Item>
                        </Menu>
                    )
                }
            }

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <div class={`${prefixCls.value}-content`}>
                        <div class={[`${prefixCls.value}-button-wrap`, `${prefixCls.value}-button-wrap-left`]}>
                            <Button
                                class={`${prefixCls.value}-button`}
                                type={'text'}
                                v-slots={{ icon: () => <LeftOutlined/> }}
                                onClick={handleScroll.bind(null, 240)}
                            />
                        </div>
                        <div class={`${prefixCls.value}-scroll-outer`} ref={scrollOuterRef}>
                            <div class={`${prefixCls.value}-scroll-body`} style={scrollBodyStyle} ref={scrollBodyRef}>
                                {tagNodes}
                            </div>
                        </div>
                        <div class={[`${prefixCls.value}-button-wrap`, `${prefixCls.value}-button-wrap-right`]}>
                            <Button
                                class={`${prefixCls.value}-button`}
                                type={'text'}
                                v-slots={{ icon: () => <RightOutlined/> }}
                                onClick={handleScroll.bind(null, -240)}
                            />
                        </div>
                        <div class={`${prefixCls.value}-close-wrap`}>
                            <Dropdown placement={'bottomRight'} v-slots={dropdownSlots}>
                                <Button
                                    class={`${prefixCls.value}-button`}
                                    type={'text'}
                                    v-slots={{ icon: () => <CloseCircleOutlined/> }}
                                />
                            </Dropdown>
                        </div>
                    </div>
                </div>
            )
        }
    }
})
