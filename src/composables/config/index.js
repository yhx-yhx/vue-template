/**
 * 配置管理类 - 负责与Web Worker通信并管理配置
 */
class ConfigManager {
  /** Web Worker实例 */
  static worker

  /** 回调函数映射表 */
  static callbacks = new Map()

  /**
   * 初始化配置管理器
   * 创建Web Worker并设置消息监听
   */
  static init() {
    this.worker = new Worker(new URL('./config.worker.js', import.meta.url))

    this.worker.addEventListener('message', (e) => {
      const { type, data, error } = e.data

      switch (type) {
        case 'CONFIG_LOADED':
        case 'CONFIG_VALUE':
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
   * 加载配置
   * @param {string} configName - 配置名称
   * @returns {Promise<any>} 配置数据
   */
  static loadConfig(configName) {
    return new Promise((resolve) => {
      this.callbacks.set('CONFIG_LOADED', [resolve])
      this.worker.postMessage({ type: 'LOAD_CONFIG', configName })
    })
  }

  /**
   * 获取配置
   * @param {string} configName - 配置名称
   * @returns {Promise<any>} 配置数据
   */
  static getConfig(configName) {
    return new Promise((resolve) => {
      this.callbacks.set('CONFIG_VALUE', [resolve])
      this.worker.postMessage({ type: 'GET_CONFIG', configName })
    })
  }

  /**
   * 清除配置缓存
   * @param {string} configName - 配置名称
   */
  static clearCache(configName) {
    this.worker.postMessage({ type: 'CLEAR_CACHE', configName })
  }
}

/**
 * 配置管理Hook
 * @returns {typeof ConfigManager} 配置管理器类
 */
export const useConfig = () => {
  if (!ConfigManager.worker) {
    ConfigManager.init()
  }

  return ConfigManager
}
