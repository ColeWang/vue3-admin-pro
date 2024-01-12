import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * 打包分析
 * @returns {null|Plugin}
 */
function buildReport () {
    if (process.env.npm_lifecycle_event === 'build:report') {
        return visualizer({
            open: true,
            brotliSize: true,
            gzipSize: true,
            filename: 'dist/report.html'
        })
    }
    return null
}

export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        buildReport()
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import \'@/styles/mixin.scss\';'
            }
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    }
})
