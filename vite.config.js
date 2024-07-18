import Vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import vueDevTools from 'vite-plugin-vue-devtools'

const pathSrc = fileURLToPath(new URL('./src', import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': pathSrc
    }
  },
  plugins: [
    Vue(),
    vueJsx(),
    vueDevTools(),
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue', 'vue-router', 'pinia'],

      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver({ importStyle: 'sass' }),

        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon'
        })
      ],

      dts: path.resolve(pathSrc, 'auto-imports.d.ts')
    }),

    Components({
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep']
        }),
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver({ importStyle: 'sass' })
      ],

      dts: path.resolve(pathSrc, 'components.d.ts')
    }),

    Icons({
      autoInstall: true
    }),

    Inspect(),
    codeInspectorPlugin({
      bundler: 'vite' // https://github.com/zh-lx/code-inspector/blob/main/docs/README-ZH.md
    })
    // legacy({
    //   // browserslist https://browsersl.ist/
    //   targets: [
    //     // "> 1%, last 1 version, ie >= 11",
    //     'Chrome >= 75',
    //     'Edge >= 50'
    //   ],
    //   additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    //   // polyfills 使用的 core-js https://unpkg.com/browse/core-js@3.35.1/modules/
    //   // 配置规则 https://www.npmjs.com/package/@vitejs/plugin-legacy?activeTab=readme#polyfill-specifiers
    //   // polyfills: ["es.promise.finally", "es/map", "es/set"],
    //   // 为现代浏览器提供 polyfill
    //   // modernPolyfills: ["es.promise.finally"]
    // })
  ]
})
