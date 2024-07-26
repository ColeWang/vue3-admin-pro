import { defineComponent } from 'vue'

export default defineComponent({
    inheritAttrs: false,
    setup () {
        return () => {
            return (
                <div>
                    <div class="bar" role="bar">
                        <div class="peg"></div>
                    </div>
                    <div class="spinner" role="spinner">
                        <div class="spinner-icon"></div>
                    </div>
                </div>
            )
        }
    }
})
