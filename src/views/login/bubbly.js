function bubbly (canvas, image) {
    let cancel = null

    const width = window.innerWidth
    const height = window.innerHeight

    const cv = canvas || document.createElement('canvas')
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

    const objectCreator = () => ({
        f: `rgba(105, 177, 255, ${Math.random()})`,
        r: 4 + Math.random() * cv.width / 25,
        x: Math.random() * cv.width,
        y: Math.random() * cv.height,
        a: Math.random() * Math.PI * 2,
        v: 0.1 + Math.random() * 0.5,
        draw: (ctx, bubble) => {
            ctx.fillStyle = bubble.f
            ctx.beginPath()
            ctx.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2)
            ctx.fill()
        }
    })

    const count = Math.floor((cv.width + cv.height) * 0.02)
    const bubbleArray = Array.from({ length: count }, objectCreator)

    function draw () {
        cancel = requestAnimationFrame(draw)
        ctx.globalCompositeOperation = 'source-over'
        ctx.fillStyle = '#F5F5F5'
        ctx.fillRect(0, 0, cv.width, cv.height)
        image && ctx.drawImage(image, 0, 0, cv.width, cv.height)
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

    draw()

    return () => {
        cancel && cancelAnimationFrame(cancel)
    }
}

export default bubbly
