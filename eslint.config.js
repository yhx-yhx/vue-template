import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import { readFileSync } from 'fs'
import globals from 'globals'
import vueParser from 'vue-eslint-parser'

const autoImportConfig = JSON.parse(readFileSync('./.eslintrc-auto-import.json', 'utf-8'))

export default [
  {
    ignores: ['dist/**', 'node_modules/**', '**/*.d.ts']
  },
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...autoImportConfig.globals
      },
      parser: vueParser,
      parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false,
        sourceType: 'module',
        ecmaVersion: 2022
      }
    },
    plugins: {
      vue: pluginVue
    },
    rules: {
      ...js.configs.recommended.rules
    }
  }
]
