<script setup></script>

<template>
  <main class="text-center flex flex-col gap-6 p-6 max-w-2xl mx-auto">
    <h1 class="text-3xl font-semibold text-gray-800 mb-4">欢迎使用vue3-template</h1>

    <section class="text-left space-y-4">
      <div class="p-4 border rounded-lg">
        <h2 class="text-xl font-medium mb-2 text-gray-700">项目特点</h2>
        <ul class="list-disc pl-6 space-y-1 text-gray-600">
          <li>基于Vite的极速开发体验</li>
          <li>TypeScript类型安全支持</li>
          <li>Pinia状态管理方案</li>
          <li>Tailwind CSS快速样式开发</li>
          <li>集成丰富vite插件</li>
        </ul>
      </div>

      <div class="p-4 border rounded-lg">
        <h2 class="text-xl font-medium mb-2 text-gray-700">快速开始</h2>
        <p class="leading-relaxed text-gray-600">
          立即开始您的项目开发，基于vite实现快速开发脚手架，提供开箱即用的开发环境。
        </p>
      </div>
    </section>

    <div
      class="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md text-base font-medium hover:bg-blue-600 transition-colors cursor-pointer"
      @click="$router.push('/about')"
    >
      了解更多
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
