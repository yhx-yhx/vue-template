export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      overrideBrowserslist: [
        'Chrome > 68',
        'ff > 31',
        'last 10 versions' // 所有主流浏览器最近10版本用
      ],
      grid: true
    }
  }
}
