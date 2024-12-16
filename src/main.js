import 'element-plus/es/components/message/style/css' // 保证ElMessage 样式正常引入
import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import constantPlugin from './plugins/constant'
import router from './router'
const app = createApp(App)

// plugins
app.use(constantPlugin) // 全局常量

app.use(createPinia())
app.use(router)

app.mount('#app')
