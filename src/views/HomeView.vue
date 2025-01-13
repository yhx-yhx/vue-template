<script setup>
import { getTestData } from '@/api'

// import { useCache } from '@/composables/cache'
// import '@/composables/cache/cache.demo.js'
import { getCache } from '@/composables/cache/useMemoize'

// const getUser = useMemoize(async (path) => await fetch(path).then((res) => res.json()))
;(async () => {
  const user1 = await getCache('/configs/test1.json') // Request users/1
  console.log(user1, 'user1')

  const user2 = await getCache('/configs/test2.json') // Request users/2
  console.log(user2, 'user2')
})()
// // ...
// const user1_load = await getUser.load('/configs/test1.json') // Request users/1

// console.log(user1_cached, user1_load)

// console.log(user1, user2)

// ...
// ;(async () => {
//   try {
//     const cache = useCache()
//     // console.log(cache, 'cache')

//     // // 使用 Promise.all 优化并发请求
//     const [test1Data, test2Data] = await Promise.all([
//       cache.get('/configs/test1.json'),
//       cache.get('/configs/test2.json')
//     ])

//     // debugger
//     console.log(test1Data, 'test1Data')
//     console.log(test2Data, 'test2Data')

//     // 这个会从缓存中获取
//     const cachedTest2Data = await cache.get('/configs/test2.json')
//     console.log(cachedTest2Data, 'cached test2Data')
//   } catch (error) {
//     console.error('Error:', error)
//   }
// })()

// 获取数据
const data = ref(null)
async function getData() {
  const res = await getTestData()
  data.value = res.data
}
getData()
</script>

<template>
  <main class="text-center flex flex-col gap-20 p-4">
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
    <div class="link" @click="$router.push('/about')">about</div>
    <!-- 获取测试mock数据 -->
    <div>{{ data?.content }}</div>
  </main>
</template>
<style lang="scss" scoped>
.link {
  @apply text-blue-500 text-xl hover:underline cursor-pointer;
}
</style>
