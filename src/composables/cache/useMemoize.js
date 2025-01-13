import { useMemoize } from '@vueuse/core'

// 避免内存泄漏，需要手动清除缓存
// 使用useMemoize
// 请求的缓存保证访问同一块内存，减少内存占用

export const getCache = useMemoize(async (path) => await fetch(path).then((res) => res.json()))
