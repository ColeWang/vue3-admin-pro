import { defineComponent } from 'vue'
import { Layout } from 'ant-design-vue'

export default defineComponent({
    inheritAttrs: false,
    setup () {
        return () => {
            return (
                <Layout style={{ height: '100%' }}>
                    <Layout.Sider collapsed={true} collapsible={true}></Layout.Sider>
                    <Layout>
                        <Layout.Header></Layout.Header>
                    </Layout>
                </Layout>
            )
        }
    }
})
