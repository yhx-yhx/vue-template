/**
 * 请求缓存存储类 - 使用 Map 实现的请求缓存
 */
class CacheWorker {
  // 设置缓存，默认30天过期
  DEFAULT_TTL = 3600000 * 24 * 30 // 30天

  /**
   * 构造函数 - 初始化缓存Map
   */
  constructor() {
    this.cache = new Map()
  }

  /**
   * 获取CacheStore单例
   * @returns {CacheStore} CacheStore实例
   */
  static getInstance() {
    if (!CacheWorker.instance) {
      CacheWorker.instance = new CacheWorker()
    }
    return CacheWorker.instance
  }

  /**
   * 设置请求缓存
   * @param {string} key - 请求地址
   * @param {*} value - 请求数据
   * @param {number} [ttl] - 过期时间(毫秒)
   */
  set(key, value, ttl) {
    const item = {
      value,
      timestamp: Date.now(),
      expiry: ttl ? Date.now() + ttl : undefined
    }
    this.cache.set(key, item)
  }

  /**
   * 获取请求缓存
   * @param {string} key - 请求地址
   * @returns {*} 请求数据，过期或不存在时返回null
   */
  get(key) {
    const item = this.cache.get(key)
    if (!item) return null

    if (item.expiry && Date.now() > item.expiry) {
      this.cache.delete(key)
      return null
    }

    return item.value
  }

  /**
   * 删除请求缓存
   * @param {string} key - 请求地址
   * @returns {boolean} 是否删除成功
   */
  delete(key) {
    return this.cache.delete(key)
  }

  /**
   * 清空所有请求缓存
   */
  clear(key) {
    this.cache.delete(key)
  }

  /**
   * 获取缓存中的请求缓存数量
   * @returns {number} 请求缓存数量
   */
  size() {
    return this.cache.size
  }

  /**
   * 清理过期的请求缓存
   */
  cleanup() {
    const now = Date.now()
    for (const [key, item] of this.cache.entries()) {
      if (item.expiry && now > item.expiry) {
        this.cache.delete(key)
      }
    }
  }

  /**
   * 清空所有缓存
   */
  clearAll() {
    this.cache.clear()
  }
}

// 创建CacheStore单例
const CacheStore = CacheWorker.getInstance()

/**
 * Worker消息处理
 */
self.addEventListener('message', async (e) => {
  const { type, cacheName, ttl } = e.data

  switch (type) {
    case 'LOAD_CACHE':
    case 'GET_CACHE':
      try {
        // 尝试从缓存获取配置
        let config = CacheStore.get(cacheName)

        // 缓存未命中则从服务器获取
        if (!config) {
          const response = await fetch(cacheName)
          config = await response.json()
          CacheStore.set(cacheName, config, ttl || this.DEFAULT_TTL)
        }

        self.postMessage({
          type: 'CACHE_VALUE',
          data: config
        })
      } catch (error) {
        self.postMessage({
          type: 'ERROR',
          error: `加载配置失败: ${error.message}`
        })
      }
      break

    case 'CLEAR_CACHE':
      CacheStore.clear()
      break

    case 'CLEAR_ALL_CACHE':
      CacheStore.clearAll()
      break
  }
})

// 定期清理过期配置
// const CLEANUP_INTERVAL = 5 * 60 * 1000 // 5分钟
// setInterval(() => {
//   CacheStore.cleanup()
// }, CLEANUP_INTERVAL)
