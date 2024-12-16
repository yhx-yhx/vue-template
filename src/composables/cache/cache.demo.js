import { useCache } from '.'

const cache = useCache()
;(async () => {
  try {
    console.log('config.getConfig')
    const test1Data = await cache.get('/configs/test1.json')
    console.log(test1Data, 'test1Data')

    const test1Data1 = await cache.get('/configs/test1.json')
    console.log(test1Data1, 'test1Data1')
    const test1Data2 = await cache.get('/configs/test1.json')
    console.log(test1Data2, 'test1Data2')

    const test2Data0 = await cache.get('/configs/test2.json')
    console.log(test2Data0, 'test2Data0')
  } catch (error) {
    console.error('配置加载失败:', error)
  }
})()

/**
 * @description: 如何使用 config
 * 1. 在需要使用的地方引入 config.demo.js
 */

// import '@/composables/config/config.demo.js'
