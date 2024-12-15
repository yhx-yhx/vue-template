import airbnb from 'eslint-config-airbnb'
import globals from 'globals'

// 创建一个清理后的 globals 对象
const cleanGlobals = Object.fromEntries(
  Object.entries({
    ...globals.browser,
    ...globals.es2021,
    ...globals.node
  }).map(([key, value]) => [key.trim(), value])
)

export default [
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    ignores: ['dist/**', 'node_modules/**', 'src/auto-imports.d.ts', 'src/components.d.ts'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: cleanGlobals,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      ...airbnb.plugins
    },
    rules: {
      ...airbnb.rules,
      'import/no-extraneous-dependencies': 'off',
      'import/prefer-default-export': 'off',
      'no-param-reassign': 'off',
      'no-unused-vars': 'warn'
    }
  }
]
