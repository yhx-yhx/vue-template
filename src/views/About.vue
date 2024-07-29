<script setup>
import { getTestData } from '@/api/module';

// 获取数据
const data = ref(null)
async function getData() {
    const res = await getTestData();
    data.value = res.data
}
getData()


</script>

<template>
    <main class="text-center flex flex-col gap-20 p-4">
        <h1 class="text-3xl font-bold underline">
            About world!
        </h1>
        <div class="link" @click="$router.push('/')">home</div>
        <!-- 获取测试mock数据 -->
        <div>{{ data?.content }}</div>
    </main>
</template>
<style lang="scss" scoped>
.link {
    @apply text-blue-500 text-xl hover:underline cursor-pointer;
}
</style>
