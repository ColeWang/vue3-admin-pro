class ResizeObserver {
    constructor (callback) {
        const entry = {
            contentRect: { width: 1024, height: 768 }
        }
        callback([entry])
    }

    observe () {
    }

    unobserve () {
    }

    disconnect () {
    }
}

export default ResizeObserver
