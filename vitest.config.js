import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.js'

export default defineConfig((configEnv) => {
    return mergeConfig(viteConfig(configEnv), defineConfig({
        test: {
            environment: 'jsdom',
            include: ['**/*.{test,spec,type-test}.{js,mjs,cjs,ts,tsx,jsx}'],
        }
    }))
})
