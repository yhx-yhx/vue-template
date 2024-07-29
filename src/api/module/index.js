import useRequest from '@/hooks/request.js'

const { request } = useRequest()

/**
 * @description: 获取测试数据
 * @return {*}
 */
export function getTestData(data) {
  return request({
    baseURL: '/',
    url: '/api/getTestData',
    method: 'POST',
    data
  })
}
