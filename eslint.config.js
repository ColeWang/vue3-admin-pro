import defineEslintConfig from '@antfu/eslint-config'

export default defineEslintConfig({
    globals: { __VERSION__: 'readonly' },
    ignores: [
        'eslint.config.js',
        'vite.config.js',
        'node_modules',
        'public',
        'dist'
    ],
    yaml: false,
    jsonc: false,
    stylistic: false,
    // stylistic: {
    //     // 缩进 2 | 4
    //     indent: 4,
    //     // 单引号双引号 'single' | 'double' | 'backtick'
    //     quotes: 'single',
    //     // 分号
    //     semi: false,
    // },
    typescript: false,
    vue: {
        overrides: {
            'vue/multi-word-component-names': 'off'
        }
    }
}, {
    rules: {
        'no-console': 'off',
        'no-unused-vars': 'off',
        'no-useless-call': 'off',
        'comma-dangle': 'off',
        'prefer-spread': 'off',
        'object-shorthand': 'off',
        'dot-notation': 'off',
        'unused-imports/no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'off',
        'unicorn/new-for-builtins': 'off',
        'perfectionist/sort-imports': 'off',
        'perfectionist/sort-exports': 'off',
        'perfectionist/sort-named-exports': 'off',
        'perfectionist/sort-named-imports': 'off'
    }
}, {
    files: ['**/*.jsx'],
    rules: {
        'vue/no-unused-components': 'off',
        'unused-imports/ no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'off'
    }
})
