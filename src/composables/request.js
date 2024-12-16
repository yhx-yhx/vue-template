// import { useUserStore } from '@/stores/user'
import router from '@/router'
import axios from 'axios'
import { ElMessage } from 'element-plus'
// import { useAuthStore } from '@/stores/auth'

export default function useRequest() {
  const request = axios.create({
    baseURL: '/svc'
  })

  request.interceptors.request.use(
    async (config) =>
      //   const token = localStorage.getItem('token')
      //   if (!token) {
      //     router.push('/login')
      //   } else {
      //     config.headers.authorization = `Bearer ${token}`
      //   }
      config,
    (error) => Promise.reject(error)
  )

  request.interceptors.response.use(
    (response) => {
      // 对响应数据做点什么
      if (response.status >= 200 && response.status < 400) {
        if (response.data.success) {
          return response.data
        }
        ElMessage.error(response.data.message)
        return Promise.reject(response)
      }
      return Promise.reject(response)
    },
    (error) => {
      if (error && error.response && error.response.status === 401) {
        // useUserStore().token = null
        localStorage.removeItem('token')
        router.push('/login')
      } else {
        ElMessage.error(error.response.data.message || $constant.global.HTTP_ERROR_MSG)
      }
      console.log(error)
      return Promise.reject(error)
    }
  )

  return request
}
