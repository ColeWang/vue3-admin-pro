import { defineComponent } from 'vue'
import Icon from '@ant-design/icons-vue'

export default defineComponent({
    inheritAttrs: false,
    name: 'PasswordFilled',
    setup (props, { attrs }) {
        return () => {
            const iconSlots = {
                component: (svgProps) => {
                    return (
                        <svg viewBox="0 0 1024 1024" width="1em" height="1em" {...svgProps}>
                            <path d="M803.428295 409.14341h-34.28529563v-119.99994188a257.14299937 257.14299937 0 0 0-514.28599875 0v119.99994188h-34.28529562A102.85682438 102.85682438 0 0 0 117.71487969 512.00023437v85.71464532a394.28512031 394.28512031 0 0 0 788.57024062 0V512.00023437a102.85682438 102.85682438 0 0 0-102.85682531-102.85682437z m-445.7135325-119.99994188a154.2852375 154.2852375 0 0 1 308.570475 0v119.99994188H357.7157zM546.28435813 717.71482156a34.28529563 34.28529563 0 0 1-68.57059126 0V580.57176313a34.28529563 34.28529563 0 0 1 68.57059125 0z"/>
                        </svg>
                    )
                }
            }
            return <Icon v-slots={iconSlots} {...attrs}/>
        }
    }
})
