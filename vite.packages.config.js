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
        outDir: resolve(__dirname, './packages'),
        minify: false,
        rollupOptions: {
            exports: 'named',
            external: [
                'vue',
                'ant-design-vue',
                '@ant-design/icons-vue',
                'dayjs',
                'lodash-es'
            ],
            // output: [
            //     {
            //         format: 'es',
            //         entryFileNames: '[name].mjs',
            //         preserveModules: true,
            //         exports: 'named',
            //         dir: './packages/components',
            //     }
            // ]
        },
        lib: {
            entry: resolve(__dirname, './entry.packages.js'),
            name: 'packages',
            fileName: 'index',
            formats: ['es']
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
            '@': resolve(__dirname, 'src'),
            '@site': resolve(__dirname, 'packages')
        }
    }
})
