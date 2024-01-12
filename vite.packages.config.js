import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
    plugins: [vue(), vueJsx()],
    build: {
        lib: {
            entry: resolve(__dirname, './entry.packages.js'),
            name: 'packages',
            fileName: 'index'
        },
        outDir: resolve(__dirname, './docs/packages'),
        rollupOptions: {
            exports: 'named',
            external: ['vue', 'dayjs'],
            globals: { vue: 'Vue', dayjs: 'dayjs' }
        }
    },
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
