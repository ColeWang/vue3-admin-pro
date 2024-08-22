import { ref, unref, watch } from 'vue'
import { tryOnScopeDispose } from '@site-pro/hooks'
import { isFunction } from 'lodash-es'
import { BaseForm } from '../../base-form'

const extraProps = {
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
    }
}

export const floatProps = {
    ...BaseForm.props,
    ...extraProps,
    extraProps: {
        type: Object,
        default: () => ({})
    },
    submitter: {
        type: Object,
        default: () => ({})
    },
    trigger: {
        type: Function,
        default: undefined
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
    const sOpen = ref(props.open)
    const loading = ref(false)

    const stopWatchOpen = watch(() => props.open, (value) => {
        sOpen.value = value
    }, { immediate: true })

    function setOpenValue (value) {
        sOpen.value = value
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
        if (!isFunction(props.onFinish) || unref(loading)) return
        loading.value = true
        try {
            const result = await props.onFinish(values)
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

    return { sOpen, loading, onOpen, onCancel, onFinish }
}

export default useFloatForm
