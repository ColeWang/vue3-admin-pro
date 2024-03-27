import { getCurrentScope, onScopeDispose } from 'vue'

function tryOnScopeDispose (stop) {
    const scope = getCurrentScope()
    scope && onScopeDispose(stop)
    return scope
}

export default tryOnScopeDispose
