import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
    plugins: [vueJsx()],
    resolve: {
        alias: {
            '@': resolve(__dirname, '')
        }
    }
})
