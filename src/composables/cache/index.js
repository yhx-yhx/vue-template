/**
 * 请求缓存管理类 - 负责与Web Worker通信并管理请求缓存
 */
class CacheManager {
  /** Web Worker实例 */
  static worker

  /** 回调函数映射表 */
  static callbacks = new Map()

  /**
   * 初始化请求缓存管理器
   * 创建Web Worker并设置消息监听
   */
  static init() {
    this.worker = new Worker(new URL('./cache.worker.js', import.meta.url))

    this.worker.addEventListener('message', (e) => {
      const { type, data, error } = e.data

      switch (type) {
        case 'CACHE_LOADED':
        case 'CACHE_VALUE':
          const callbacks = this.callbacks.get(type) || []
          callbacks.forEach((cb) => cb(data))
          this.callbacks.delete(type)
          break

        case 'ERROR':
          console.error(error)
          break
      }
    })
  }

  /**
   * 加载请求缓存
   * @param {string} cacheName - 请求地址
   * @returns {Promise<any>} 请求数据
   */
  // static loadConfig(cacheName) {
  //   return new Promise((resolve) => {
  //     this.callbacks.set('CACHE_LOADED', [resolve])
  //     this.worker.postMessage({ type: 'LOAD_CACHE', cacheName })
  //   })
  // }

  /**
   * 获取请求缓存
   * @param {string} cacheName - 数据地址
   * @returns {Promise<any>} 请求数据
   */
  static get(cacheName) {
    return new Promise((resolve) => {
      this.callbacks.set('CACHE_VALUE', [resolve])
      this.worker.postMessage({ type: 'GET_CACHE', cacheName })
    })
  }

  /**
   * 清除缓存
   * @param {string} cacheName - 数据地址
   */
  static clear(cacheName) {
    this.worker.postMessage({ type: 'CLEAR_CACHE', cacheName })
  }

  /**
   * 清空所有缓存
   */
  static clearAll() {
    this.worker.postMessage({ type: 'CLEAR_ALL_CACHE' })
  }
}

/**
 * 请求缓存管理Hook
 * @returns {typeof CacheManager} 请求缓存管理器类
 */
export const useCache = () => {
  if (!CacheManager.worker) {
    CacheManager.init()
  }

  return CacheManager
}
