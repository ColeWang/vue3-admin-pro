import { computed, defineComponent, ref, unref, watch } from 'vue'
import { ConfigProvider, Form } from 'ant-design-vue'
import RowWrap from '../helpers/RowWrap'
import { createFromInstance } from './hooks/useFormInstance'
import { get, head, isFunction, isObject, pick, set, unset, update } from 'lodash-es'
import { cloneProxyToRaw } from '@/utils/props-util'
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
    },
    transform: {
        type: Function,
        default: undefined
    },
    onSubmit: {
        type: Function,
        default: undefined
    },
    onFinish: {
        type: Function,
        default: undefined
    },
    onFinishFailed: {
        type: Function,
        default: undefined
    },
    onReset: {
        type: Function,
        default: undefined
    },
    onValuesChange: {
        type: Function,
        default: undefined
    }
}

function resetLayoutOfGrid (props) {
    // 当 grid = true 时 layout 不支持 inline
    const { layout, grid } = props || {}
    return (grid && layout === 'inline') ? 'vertical' : layout
}

export default defineComponent({
    inheritAttrs: false,
    props: baseFormProps,
    emits: ['submit', 'finish', 'finishFailed', 'reset', 'valuesChange'],
    setup (props, { emit, slots, attrs, expose }) {
        const popupContainer = ref(null)
        const formInstanceRef = ref(null)

        const defaultValues = cloneProxyToRaw(props.initialValues)
        // 考虑到 model 传递就不再需要 initialValues
        const model = ref(props.model || defaultValues)

        const formProps = computed(() => {
            const layout = resetLayoutOfGrid(props)
            return { ...attrs, ...props, layout }
        })

        watch(model, (curr) => {
            emit('valuesChange', curr)
        }, { immediate: true, deep: true })

        function setModelValue (namePath, value) {
            return set(model.value, namePath, value)
        }

        function getModelValue (namePath) {
            return get(model.value, namePath, undefined)
        }

        function updateModelValue (namePath, updater) {
            return update(model.value, namePath, updater)
        }

        function deleteModelValue (namePath) {
            return unset(model.value, namePath)
        }

        async function validate (names) {
            const context = unref(formInstanceRef)
            if (context && context.validate) {
                return context.validate(names)
            }
            const error = new Error('Error: context is not defined')
            return Promise.reject(error)
        }

        function onFinish (values) {
            // 支持 form 的 submit 事件, html-type="submit"
            const nextValues = cloneProxyToRaw(values)
            if (props.transform && isFunction(props.transform)) {
                const resultValues = props.transform(nextValues) || {}
                emit('finish', resultValues)
            } else {
                emit('finish', nextValues)
            }
        }

        function onScrollToField (namePath, options) {
            const context = unref(formInstanceRef)
            context && context.scrollToField(namePath, options)
        }

        function onFinishFailed (error) {
            const { scrollToFirstError } = props
            if (scrollToFirstError && error.errorFields.length) {
                const headField = head(error.errorFields)
                const options = isObject(scrollToFirstError) ? scrollToFirstError : {}
                onScrollToField(headField.name, options)
            }
            emit('finishFailed', error)
        }

        function submit () {
            emit('submit', { __MARK__: 'submit' })
            validate().then((values) => {
                onFinish(values)
            }, (error) => {
                console.warn('Validate Failed:', error)
                onFinishFailed(error)
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

        const fromInstance = {
            formInstanceRef,
            model,
            formProps,
            setModelValue,
            getModelValue,
            updateModelValue,
            deleteModelValue,
            submit,
            validate,
            resetFields
        }

        createFromInstance(fromInstance)
        expose(fromInstance)

        return () => {
            const { grid, rowProps } = props

            const formProps = {
                ...attrs,
                ...pick(props, Object.keys(Form.props)),
                layout: resetLayoutOfGrid(props),
                model: unref(model),
                onFinish: onFinish
            }

            const rowWrapProps = { ...rowProps, grid }

            return (
                <ConfigProvider getPopupContainer={getPopupContainer}>
                    <div class={cx('form-wrap')} ref={popupContainer}>
                        <Form {...formProps} ref={formInstanceRef}>
                            <RowWrap {...rowWrapProps} v-slots={slots}/>
                        </Form>
                    </div>
                </ConfigProvider>
            )
        }
    }
})
