import router from '@/router'
import { useUserStore } from '@/stores/user'
import axios from 'axios'
import { ElMessage } from 'element-plus'
// import { useAuthStore } from '@/stores/auth'

export default function useRequest() {
  const request = axios.create({
    baseURL: '/svc'
  })

  request.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/login')
      } else {
        config.headers.authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  request.interceptors.response.use(
    (response) => {
      // 对响应数据做点什么
      if (response.status >= 200 && response.status < 400) {
        if (response.data.success) {
          return response.data
        } else {
          ElMessage.error(response.data.message)
          return Promise.reject(response)
        }
      }
      return Promise.reject(response)
    },
    (error) => {
      if (error && error.response && error.response.status === 401) {
        useUserStore().token = null
        localStorage.removeItem('token')
        router.push('/login')
      } else {
        ElMessage.error(error.response.data.message || '后台服务异常，请稍后再试')
      }
      console.log(error)
      return Promise.reject(error)
    }
  )

  /**
   * @description: 用于下载文件
   * @param {String} url
   * @param {*} title
   * @return {*}
   */
  function download(url, title = '文件名字') {
    const a = document.createElement('a')
    a.href = url // 下载地址
    a.download = title // 所下载文件名字
    document.body.appendChild(a)
    a.style.display = 'none'
    a.click()
    document.body.removeChild(a)
  }

  /**
   * @description: 读取文件内容
   * @param {*} path
   * @return {*}
   */
  async function readFile(path) {
    try {
      const { data } = await axios.get(path)
      return data
    } catch (error) {
      console.warn(error)
      ElMessage.error(error.message)
    }
  }

  return { request, download, readFile }
}
