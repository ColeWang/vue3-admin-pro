import { computed, defineComponent, ref, unref, watch } from 'vue'
import { ConfigProvider, Form } from 'ant-design-vue'
import RowWrap from '../helpers/RowWrap'
import { createFromInstance } from './hooks/useFormInstance'
import { forIn, isObject, isString } from 'lodash-es'
import { cloneProxyToRaw } from '@/utils'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

export default defineComponent({
    inheritAttrs: false,
    props: {
        ...Form.props,
        initialValues: {
            type: Object, // 设置整体默认值
            default: () => ({})
        },
        submitOnReset: {
            type: Boolean,
            default: false
        },
        grid: {
            type: Boolean,
            default: false
        },
        rowProps: {
            type: Object,
            default: () => ({ gutter: [32, 0] })
        }
    },
    emits: ['finish', 'submit', 'reset', 'valuesChange'],
    setup (props, { emit, slots, attrs, expose }) {
        const popupContainer = ref(null)
        const formInstanceRef = ref(null)

        const defaultValues = cloneProxyToRaw(props.initialValues)
        const model = ref(props.model || {})

        const formProps = computed(() => {
            return { ...props, ...attrs }
        })

        forIn(defaultValues, (value, name) => {
            setModelValue(value, name)
        })

        watch(model, (curr) => {
            emit('valuesChange', curr)
        }, { deep: true })

        function setModelValue (value, name) {
            if (name && isString(name)) {
                model.value[name] = value
            } else if (isObject(value)) {
                model.value = cloneProxyToRaw(value)
            }
        }

        function getModelValue (name) {
            if (name && isString(name)) {
                return unref(model)[name]
            }
        }

        async function validate (names) {
            return unref(formInstanceRef).validate(names)
        }

        function submit () {
            if (!unref(formInstanceRef)) return
            validate().then((res) => {
                const values = cloneProxyToRaw(res)
                emit('finish', values)
                emit('submit', values)
            }, (err) => {
                console.warn(err)
            })
        }

        function resetFields (names) {
            const context = unref(formInstanceRef)
            context && context.resetFields(names)
            emit('reset', unref(model))
            props.submitOnReset && submit()
        }

        function resetForm () {
            resetFields()
        }

        function getPopupContainer () {
            const plain = unref(popupContainer)
            return plain ? (plain.$el || plain) : plain
        }

        const instance = {
            formInstanceRef,
            model,
            formProps,
            setModelValue,
            getModelValue,
            submit,
            validate,
            resetFields,
            resetForm
        }

        expose(instance)
        createFromInstance(instance)

        return () => {
            const { grid, rowProps, ...restProps } = props

            const formProps = {
                ...attrs,
                ...restProps,
                model: unref(model)
            }
            const rowWrapProps = { grid, ...rowProps }
            return (
                <ConfigProvider getPopupContainer={getPopupContainer}>
                    <div class={cx('form-wrap')} ref={popupContainer}>
                        <Form ref={formInstanceRef} {...formProps}>
                            <RowWrap {...rowWrapProps} v-slots={slots}/>
                        </Form>
                    </div>
                </ConfigProvider>
            )
        }
    }
})
