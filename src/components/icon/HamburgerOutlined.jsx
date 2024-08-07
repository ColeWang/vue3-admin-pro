import { defineComponent } from 'vue'
import Icon from '@ant-design/icons-vue'

export default defineComponent({
    inheritAttrs: false,
    setup (props, { attrs }) {
        return () => {
            const iconSlots = {
                component: (svgProps) => {
                    return (
                        <svg viewBox="0 0 1024 1024" width="1em" height="1em" {...svgProps}>
                            <path d="M78.85973333 286.01386667c0-20.80106667 16.91626667-37.664 37.78026667-37.664h790.72c20.86506667 0 37.78026667 16.71786667 37.78026667 37.664 0 20.80106667-16.91626667 37.664-37.78026667 37.664h-790.72c-20.86506667 0-37.78026667-16.71786667-37.78026667-37.664z m0 225.98613333c0-20.80106667 16.91626667-37.664 37.78026667-37.664h790.72c20.86506667 0 37.78026667 16.71786667 37.78026667 37.664 0 20.80106667-16.91626667 37.664-37.78026667 37.664h-790.72c-20.86506667 0-37.78026667-16.71786667-37.78026667-37.664z m0 225.98613333c0-20.80106667 16.91626667-37.664 37.78026667-37.664h790.72c20.86506667 0 37.78026667 16.71786667 37.78026667 37.664 0 20.80106667-16.91626667 37.664-37.78026667 37.664h-790.72c-20.86506667 0-37.78026667-16.71786667-37.78026667-37.664z"/>
                        </svg>
                    )
                }
            }
            return <Icon v-slots={iconSlots} {...attrs}/>
        }
    }
})

