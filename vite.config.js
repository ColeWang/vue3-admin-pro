import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

import { defineConfig, isCSSRequest, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { reduce } from 'lodash-es'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const vendors = reduce({
    'vendor-vue': ['vue', 'vue-router', 'pinia'],
    'vendor-antd': ['ant-design-vue', '@ant-design/icons-vue'],
    'vendor-site-pro': ['@site-pro/components', '@site-pro/hooks', '@site-pro/plugins', '@site-pro/utils'],
    'vendor-utils': ['lodash-es', 'dayjs', 'axios', 'vue-i18n'],
    'vendor-common': ['js-cookie', 'crypto-js']
}, (result, modules, key) => {
    const needVendors = modules.map((name) => {
        return { name: name, vendor: key }
    })
    return [...result, ...needVendors]
}, [])

function manualChunks (id) {
    if (id.includes('/node_modules/') && !isCSSRequest(id)) {
        const result = vendors.find((item) => {
            return id.includes(`/node_modules/${item.name}/`)
        })
        return result ? result.vendor : 'vendor-common'
    }
    // 业务代码保持默认分包
    return null
}

function readPackageFile () {
    const urlPath = new URL('./package.json', import.meta.url)
    const file = readFileSync(urlPath, 'utf-8')
    return JSON.parse(file)
}

export default defineConfig((config) => {
    const env = loadEnv(config.mode, __dirname, ['VITE_', 'ENV_'])
    const { version } = readPackageFile()

    const APP_ENV = env['VITE_VUE_APP_ENV'] || 'production'
    const isProd = APP_ENV === 'production'

    return {
        base: './',
        plugins: [
            vue(),
            vueJsx()
        ],
        build: {
            rollupOptions: {
                output: {
                    manualChunks: manualChunks
                }
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import \'@/css/mixin.scss\';@import \'@/css/theme.scss\';'
                }
            }
        },
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src')
            }
        },
        define: {
            '__VERSION__': `'${version}'`
        }
    }
})
