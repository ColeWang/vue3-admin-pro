import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.js'

export default defineConfig((configEnv) => {
    return mergeConfig(viteConfig(configEnv), defineConfig({
        test: {
            environment: 'jsdom',
            setupFiles: ['./tests/setup.js'],
            include: ['**/*.{test,spec,type-test}.{js,mjs,cjs,ts,tsx,jsx}'],
            coverage: {
                exclude: [
                    'tests/**',
                    '.eslintrc.cjs',
                    'entry.packages.js',
                    'vite.packages.config.js',
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
