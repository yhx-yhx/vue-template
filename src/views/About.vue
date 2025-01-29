<script setup></script>

<template>
  <main class="text-center flex flex-col gap-6 p-6 max-w-2xl mx-auto">
    <h1 class="text-3xl font-semibold text-gray-800 mb-4">项目介绍</h1>

    <section class="text-left space-y-4 text-gray-600">
      <div class="p-4 border rounded-lg">
        <h2 class="text-xl font-medium mb-2 text-gray-700">项目功能</h2>
        <p class="leading-relaxed">
          本项目是一个基于Vue3的现代化前端开发模板，集成了Vite、Pinia等主流技术栈，提供了开箱即用的开发环境，支持快速构建高性能的Web应用。
        </p>
      </div>

      <div class="p-4 border rounded-lg">
        <h2 class="text-xl font-medium mb-2 text-gray-700">项目能力</h2>
        <ul class="list-disc pl-6 space-y-1">
          <li>基于Vite的极速开发体验</li>
          <li>Pinia状态管理方案</li>
          <li>Tailwind CSS快速样式开发</li>
          <li>集成Element Plus UI组件库</li>
          <li>集成Vue DevTools vue 开发工具</li>
          <li>集成Vite Plugin Vite-plugin-inspect 检查vite配置</li>
          <li>集成快速打包插件 vite-plugin-visualizer 可视化打包体积</li>
          <li>集成mockjs 模拟数据</li>
          <li>集成axios 请求工具</li>
          <li>集成pinia 状态管理</li>
          <li>集成vue-router 路由管理</li>
          <li>集成vueuse 常用hooks</li>
          <li>集成sass 快速样式</li>
          <li>集成husky 提交规范</li>
          <li>集成commitlint 提交规范</li>
          <li>集成standard-version 版本管理</li>
          <li>集成prettier 代码格式化</li>
          <li>集成stylelint 样式规范</li>
          <li>集成eslint 代码规范</li>
          <li>集成git-cz 提交工具</li>
          <li>集成 vite-plugin-zip-dist 打包压缩插件</li>
        </ul>
      </div>
    </section>

    <div
      class="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md text-base font-medium hover:bg-blue-600 transition-colors cursor-pointer"
      @click="$router.push('/')"
    >
      返回首页
    </div>
  </main>
</template>

<style lang="scss" scoped>
section {
  h2 {
    @apply border-b border-gray-200 pb-2;
  }
}
</style>
