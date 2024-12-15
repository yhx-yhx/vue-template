module.exports = {
  extends: [
    'stylelint-config-standard', // 普通css，默认
    'stylelint-config-standard-scss' // scss 支持
  ],
  rules: {},
  overrides: [
    {
      files: ['**/*.{html,vue}'],
      customSyntax: 'postcss-html' // 支持 HTML 包括 Vue SFC
    }
  ]
}
