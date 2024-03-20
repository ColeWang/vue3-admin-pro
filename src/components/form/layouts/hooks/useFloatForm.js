import { ref, unref, watch } from 'vue'
import { default as BaseForm, Submitter } from '../../base-form'
import { tryOnScopeDispose } from '@/utils'
import { isFunction } from 'lodash-es'

export const FloatProps = {
    ...BaseForm.props,
    ...Submitter.props,
    layout: {
        type: String,
        default: 'vertical'
    },
    open: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: undefined
    },
    width: {
        type: Number,
        default: 512
    },
    maskClosable: {
        type: Boolean,
        default: true
    },
    destroyOnClose: {
        type: Boolean,
        default: true
    },
    extraProps: {
        type: Object,
        default: () => ({})
    },
    onOpen: {
        type: Function,
        default: undefined
    },
    onCancel: {
        type: Function,
        default: undefined
    },
    onAfterClose: {
        type: Function,
        default: undefined
    },
    onOpenChange: {
        type: Function,
        default: undefined
    },
    onLoadingChange: {
        type: Function,
        default: undefined
    }
}

function useFloatForm (props, options) {
    const open = ref(props.open)
    const loading = ref(false)

    const stopWatchOpen = watch(() => props.open, (value) => {
        open.value = value
    }, { immediate: true })

    function setOpenValue (value) {
        open.value = value
        options.onUpdateOpen && options.onUpdateOpen(value)
    }

    function onOpen () {
        setOpenValue(true)
        options.onOpen && options.onOpen()
        isFunction(props.extraProps.onOpen) && props.extraProps.onOpen()
    }

    function onCancel () {
        if (unref(loading)) return
        setOpenValue(false)
        options.onCancel && options.onCancel()
        isFunction(props.extraProps.onCancel) && props.extraProps.onCancel()
    }

    async function onFinish (values) {
        const request = props.onFinish || props.onSubmit
        if (!isFunction(request) || unref(loading)) return
        loading.value = true
        try {
            const result = await request(values)
            loading.value = false
            result && onCancel()
        } catch (err) {
            loading.value = false
            console.warn(err)
        }
    }

    function onStop () {
        stopWatchOpen && stopWatchOpen()
    }

    tryOnScopeDispose(onStop)

    return { open, loading, onOpen, onCancel, onFinish }
}

export default useFloatForm
