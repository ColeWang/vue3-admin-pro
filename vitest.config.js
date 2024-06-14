import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.js'

export default defineConfig((configEnv) => {
    return mergeConfig(viteConfig(configEnv), defineConfig({
        test: {
            environment: 'jsdom',
            include: ['**/*.{test,spec,type-test}.{js,mjs,cjs,ts,tsx,jsx}'],
            coverage: {
                exclude: [
                    'src/assets/**',
                    'src/boot/**',
                    'src/components/**',
                    'src/config/**',
                    'src/css/**',
                    'src/layout/**',
                    'src/locale/**',
                    'src/permission/**',
                    'src/router/**',
                    'src/stores/**',
                    'src/utils/**',
                    'src/views/**',
                    'src/App.jsx',
                    'src/main.js',
                    'src/useAppInstance.js',
                ]
            }
        }
    }))
})
