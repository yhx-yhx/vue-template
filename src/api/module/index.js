import useRequest from '@/hooks/request.js'

const { request } = useRequest()

/**
 * @description: 创建文章
 * @return {*}
 */
export function createArticle(data) {
  return request({
    url: '/article',
    method: 'POST',
    data
  })
}
