import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from '../vite.config.js'

export default defineConfig((configEnv) => {
    return mergeConfig(viteConfig(configEnv), defineConfig({
        test: {
            environment: 'jsdom',
            setupFiles: ['./packages/tests/setup.js'],
            include: ['**/*.{test,spec,type-test}.{js,mjs,cjs,ts,tsx,jsx}'],
            coverage: {
                exclude: [
                    'packages/tests/**',
                    'packages/index.js',
                    '.eslintrc.cjs',
                    'entry.packages.js',
                    'vite.config.js',
                    'vite.packages.config.js',
                    'src/**',
                ]
            }
        }
    }))
})
