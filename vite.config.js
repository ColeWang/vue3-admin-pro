import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import stringHash from 'string-hash'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig((config) => {
    const env = loadEnv(config.mode, __dirname, ['VITE_', 'ENV_'])

    const APP_ENV = env['VITE_VUE_APP_ENV'] || 'production'
    const isProd = APP_ENV === 'production'

    return {
        base: './',
        plugins: [
            vue(),
            vueJsx()
        ],
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import \'@/styles/mixin.scss\';'
                }
            },
            modules: {
                generateScopedName: (name, filename, css) => {
                    const index = css.indexOf(`.${name}`)
                    const lineNumber = css.slice(0, index).split(/[\r\n]/).length
                    const hash = stringHash(css).toString(36).slice(0, 5)
                    return `${name}_${hash}_${lineNumber}`
                }
            }
        },
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src')
            }
        }
    }
})
