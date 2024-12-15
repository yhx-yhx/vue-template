import pkg from 'mockjs'

const { Random } = pkg
export default [
  {
    url: '/api/getTestData',
    method: 'post',
    response: () => ({
      code: 200,
      message: '获取数据成功',
      success: true,
      data: {
        // 随机30-50个中文字符
        content: Random.cparagraph(30, 50)
      }
    })
  }
]
