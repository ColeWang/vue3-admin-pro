import { defineComponent, onMounted, onUnmounted, ref, unref } from 'vue'
import { theme } from 'ant-design-vue'
import { getWindowSize } from '@site-pro/utils'
import { random } from 'lodash-es'
import BACKGROUND from './background.svg'

function hexToRgba (colorStr, opacity) {
    const genRgba = (r, g, b, a) => {
        return `rgba(${r}, ${g}, ${b}, ${a})`
    }
    const hexRegex = /^#?[0-9A-F]{6}$/i
    if (colorStr && hexRegex.test(colorStr)) {
        const needColor = colorStr.replace('#', '')
        const match = needColor.match(/../g)
        const [r, g, b] = match.map((value) => Number.parseInt(value, 16))
        return genRgba(r, g, b, opacity)
    }
    return genRgba(22, 119, 255, opacity)
}

function bubbly (cv, colorStr, fillStyle, fillImage) {
    let cancel = null

    const { width, height } = getWindowSize()

    const ctx = cv.getContext('2d')
    const devicePixelRatio = (window.devicePixelRatio || 1)
    const backingStoreRatio = (
        ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1
    )
    const ratio = devicePixelRatio / backingStoreRatio
    cv.width = width * ratio
    cv.height = height * ratio

    const objectCreator = () => {
        const draw = (ctx, bubble) => {
            ctx.fillStyle = bubble.f
            ctx.beginPath()
            ctx.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2)
            ctx.fill()
        }
        return {
            f: hexToRgba(colorStr, random(0.00, 0.50, true)),
            r: 4 + Math.random() * Math.max(cv.width, cv.height) / 25,
            x: Math.random() * cv.width,
            y: Math.random() * cv.height,
            a: Math.random() * Math.PI * 2,
            v: 0.1 + Math.random() * 0.5,
            draw: draw
        }
    }

    const count = Math.floor((cv.width + cv.height) * 0.02)
    const bubbleArray = Array.from({ length: count }, objectCreator)

    function onDrawBg () {
        cancel = requestAnimationFrame(onDrawBg)
        ctx.globalCompositeOperation = 'source-over'
        ctx.fillStyle = fillStyle
        ctx.fillRect(0, 0, cv.width, cv.height)
        fillImage && ctx.drawImage(fillImage, 0, 0, cv.width, cv.height)
        for (const bubble of bubbleArray) {
            bubble.draw(ctx, bubble)
            bubble.x += Math.cos(bubble.a) * bubble.v
            bubble.y += Math.sin(bubble.a) * bubble.v
            if (bubble.x - bubble.r > cv.width) {
                bubble.x = -bubble.r
            }
            if (bubble.x + bubble.r < 0) {
                bubble.x = cv.width + bubble.r
            }
            if (bubble.y - bubble.r > cv.height) {
                bubble.y = -bubble.r
            }
            if (bubble.y + bubble.r < 0) {
                bubble.y = cv.height + bubble.r
            }
        }
    }

    onDrawBg()

    return () => {
        cancel && cancelAnimationFrame(cancel)
    }
}

function loadImage (src) {
    return new Promise((resolve, reject) => {
        const image = new Image()
        image.src = src
        image.onload = () => {
            resolve(image)
        }
        image.onerror = (err) => {
            reject(err)
        }
    })
}

export default defineComponent({
    inheritAttrs: false,
    name: 'Bubbly',
    setup (props, { attrs }) {
        const { token } = theme.useToken()

        const canvasRef = ref(null)
        let destroy = null

        onMounted(() => {
            loadImage(BACKGROUND).then((image) => {
                const context = unref(canvasRef)
                const { colorPrimary, colorBgLayout } = unref(token)
                context && (destroy = bubbly(context, colorPrimary, colorBgLayout, image))
            })
        })
        onUnmounted(() => {
            destroy && destroy()
            destroy = null
        })
        return () => {
            const needStyle = { width: '100%', height: '100%' }
            return (
                <div style={needStyle} {...attrs}>
                    <canvas style={needStyle} ref={canvasRef}/>
                </div>
            )
        }
    }
})
