import Vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vitePluginAutoVersion from '@yhx392/vite-plugin-auto-version'
import vitePluginZipDist from '@yhx392/vite-plugin-zip-dist'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import path from 'node:path'
import { URL, fileURLToPath } from 'node:url'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import { viteMockServe } from 'vite-plugin-mock'
import vueDevTools from 'vite-plugin-vue-devtools'

const pathSrc = fileURLToPath(new URL('./src', import.meta.url))

// https://vitejs.dev/config/
export default defineConfig(() => {
  // const isBuild = command === 'build'
  // const env = loadEnv(mode, process.cwd());
  // const { VITE_APP_ENV } = env;
  return {
    resolve: {
      alias: {
        '@': pathSrc
      }
    },
    plugins: [
      viteMockServe({
        mockPath: './src/mock', // 指定 mock 文件存放路径
        localEnabled: true, // 开发环境启用 mock
        prodEnabled: false, // 生产环境不启用 mock
        logger: true // 打印请求日志
      }),
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
      // 自动引入图标
      Icons({
        autoInstall: true
      }),
      Inspect(),
      codeInspectorPlugin({
        bundler: 'vite' // https://github.com/zh-lx/code-inspector/blob/main/docs/README-ZH.md
      }),
      visualizer(),
      vitePluginZipDist(),
      vitePluginAutoVersion()
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
    ],
    // server: {
    //   proxy: {
    //     '/svc': {
    //       target: 'http://127.0.0.1:18080/',
    //       rewrite: (path) => path.replace(/^\/svc/, '')
    //     },
    //     '/download': {
    //       target: 'http://127.0.0.1:32780/download',
    //       rewrite: (path) => path.replace(/^\/download/, '')
    //     }
    //   }
    // },
    build: {
      minify: 'terser',
      rollupOptions: {
        output: {
          // 最小化拆分包
          manualChunks(id) {
            // if (id.includes('node_modules')) {
            //   return id.toString().split('node_modules/')[1].split('/')[0].toString()
            // }
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          },
          // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
          entryFileNames: 'js/[name]-[hash].js',
          // 用于命名代码拆分时创建的共享块的输出命名
          // 用于输出静态资源的命名，[ext]表示文件扩展名
          assetFileNames: '[ext]/[name]-[hash].[ext]',
          // 拆分js到模块文件夹
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId
              ? chunkInfo.facadeModuleId.split('/')
              : []
            const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]'
            return `js/${fileName}/[name]-[hash].js`
          }
        }
      },
      terserOptions: {
        compress: {
          drop_console: true,
          pure_funcs: ['console.log'] // 删除所有 console.log 语句
        }
      }
    }
  }
})
