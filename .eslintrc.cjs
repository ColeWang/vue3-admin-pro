/* eslint-env node */
module.exports = {
    globals: { __SITE_VERSION__: 'readonly' },
    env: { browser: true, node: true },
    plugins: ['vue'],
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-essential'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    rules: {
        'no-unused-vars': 'off',
        'vue/multi-word-component-names': 'off',
    },
    overrides: [
        {
            files: ['*.jsx', '*.tsx'],
            rules: {
                // 针对JSX文件的特定规则配置
            }
        },
        {
            files: ['*.vue'],
            rules: {
                // 针对Vue文件的特定规则配置
            }
        }
    ]
}
