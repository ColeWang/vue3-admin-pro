import { computed, defineComponent, ref, unref, watch } from 'vue'
import { ConfigProvider, Form } from 'ant-design-vue'
import RowWrap from '../helpers/RowWrap'
import { createFromInstance } from './hooks/useFormInstance'
import { forIn, isObject, isString, pick } from 'lodash-es'
import { cloneProxyToRaw } from '@/utils'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

const baseFormProps = {
    ...Form.props,
    initialValues: {
        type: Object,
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
}

export default defineComponent({
    inheritAttrs: false,
    props: baseFormProps,
    emits: ['finish', 'submit', 'reset', 'valuesChange'],
    setup (props, { emit, slots, attrs, expose }) {
        const popupContainer = ref(null)
        const formInstanceRef = ref(null)

        const defaultValues = cloneProxyToRaw(props.initialValues)
        // 考虑到 model 传递就不再需要 initialValues
        const model = ref(props.model || defaultValues)

        const formProps = computed(() => {
            return { ...props, ...attrs }
        })

        watch(model, (curr) => {
            emit('valuesChange', curr)
        }, { deep: true })

        function setModelValue (value, name) {
            if (name && isString(name)) {
                model.value[name] = value
            } else if (isObject(value)) {
                const copyModel = cloneProxyToRaw(unref(model))
                const newModel = cloneProxyToRaw(value)
                forIn(copyModel, (value, name) => {
                    setModelValue(name, newModel[name])
                })
            }
        }

        function getModelValue (name) {
            if (name && isString(name)) {
                return unref(model)[name]
            }
        }

        async function validate (names) {
            const context = unref(formInstanceRef)
            if (context && context.validate) {
                return context.validate(names)
            }
            const error = new Event('Error: context is not defined')
            return Promise.reject(error)
        }

        function submit () {
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
            resetFields
        }

        expose(instance)
        createFromInstance(instance)

        return () => {
            const { grid, rowProps } = props

            const formProps = {
                ...attrs,
                ...pick(props, Object.keys(Form.props)),
                model: unref(model)
            }

            return (
                <ConfigProvider getPopupContainer={getPopupContainer}>
                    <div class={cx('form-wrap')} ref={popupContainer}>
                        <Form ref={formInstanceRef} {...formProps}>
                            <RowWrap {...rowProps} grid={grid} v-slots={slots}/>
                        </Form>
                    </div>
                </ConfigProvider>
            )
        }
    }
})
