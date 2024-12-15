/**
 * 配置存储类 - 使用 Map 实现的配置缓存
 */
class ConfigStore {
  // 设置缓存，默认30小时过期
  DEFAULT_TTL = 3600000 * 24 * 30 // 30天

  /**
   * 构造函数 - 初始化缓存Map
   */
  constructor() {
    this.cache = new Map()
  }

  /**
   * 获取ConfigStore单例
   * @returns {ConfigStore} ConfigStore实例
   */
  static getInstance() {
    if (!ConfigStore.instance) {
      ConfigStore.instance = new ConfigStore()
    }
    return ConfigStore.instance
  }

  /**
   * 设置配置项
   * @param {string} key - 配置键名
   * @param {*} value - 配置值
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
   * 获取配置项
   * @param {string} key - 配置键名
   * @returns {*} 配置值，过期或不存在时返回null
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
   * 删除配置项
   * @param {string} key - 配置键名
   * @returns {boolean} 是否删除成功
   */
  delete(key) {
    return this.cache.delete(key)
  }

  /**
   * 清空所有配置
   */
  clear() {
    this.cache.clear()
  }

  /**
   * 获取缓存中的配置项数量
   * @returns {number} 配置项数量
   */
  size() {
    return this.cache.size
  }

  /**
   * 清理过期的配置项
   */
  cleanup() {
    const now = Date.now()
    for (const [key, item] of this.cache.entries()) {
      if (item.expiry && now > item.expiry) {
        this.cache.delete(key)
      }
    }
  }
}

// 创建ConfigStore单例
const configStore = ConfigStore.getInstance()

/**
 * Worker消息处理
 */
self.addEventListener('message', async (e) => {
  const { type, configName, ttl } = e.data

  switch (type) {
    case 'LOAD_CONFIG':
    case 'GET_CONFIG':
      try {
        // 尝试从缓存获取配置
        let config = configStore.get(configName)

        // 缓存未命中则从服务器获取
        if (!config) {
          const response = await fetch(`/configs/${configName}.json`)
          config = await response.json()
          console.log('config inner', config)
          configStore.set(configName, config, ttl || this.DEFAULT_TTL)
        }
        console.log('config ', config)

        self.postMessage({
          type: 'CONFIG_VALUE',
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
      configStore.clear()
      break
  }
})

// 定期清理过期配置
// const CLEANUP_INTERVAL = 5 * 60 * 1000 // 5分钟
// setInterval(() => {
//   configStore.cleanup()
// }, CLEANUP_INTERVAL)
