/*
 * @Author: yhx 2045399856@qq.com
 * @Date: 2024-01-26 14:50:05
 * @LastEditTime: 2024-04-03 15:39:03
 * @FilePath: \hagh-frontend\.eslintrc.cjs
 * @Description:
 *
 */
module.exports = {
  env: {
    browser: true
  },
  extends: ['eslint:recommended', 'airbnb'],
  // "extends": ['eslint-config-ali'],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': 'error',
    'no-undef': 'error',
    semi: 'error',
    'no-console': 'off',
    'no-debugger': 'off'
  },
  ignorePatterns: ['node_modules/', 'build/', 'dist/'],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']]
      }
    }
  }
}
