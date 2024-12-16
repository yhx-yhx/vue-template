// 增删改查状态
export const CRUD_STATUS = {
  ADD: 'add',
  EDIT: 'edit',
  DELETE: 'delete'
}

export const HTTP_ERROR_MSG = {
  DEFAULT: '后台服务异常，请稍后再试', // 默认错误信息
  UNAUTHORIZED: '未授权，请重新登录', // 未授权错误信息
  FORBIDDEN: '禁止访问，请联系管理员', // 禁止访问错误信息
  NOT_FOUND: '未找到，请检查路径是否正确', // 未找到错误信息
  METHOD_NOT_ALLOWED: '方法不允许，请检查请求方法是否正确', // 方法不允许错误信息
  CONFLICT: '冲突，请检查请求参数是否正确', // 冲突错误信息
  INTERNAL_SERVER_ERROR: '内部服务器错误，请稍后再试' // 内部服务器错误信息
}

export const HTTP_CODE = {
  SUCCESS: {
    code: 200,
    message: '请求成功'
  },
  ERROR: {
    code: 500,
    message: '请求失败'
  },
  UNAUTHORIZED: {
    code: 401,
    message: '未授权'
  },
  FORBIDDEN: {
    code: 403,
    message: '禁止访问'
  },
  NOT_FOUND: {
    code: 404,
    message: '未找到'
  },
  METHOD_NOT_ALLOWED: {
    code: 405,
    message: '方法不允许'
  },
  CONFLICT: {
    code: 409,
    message: '冲突'
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: '内部服务器错误'
  }
}

const GLOBAL = {
  CRUD_STATUS,
  HTTP_CODE,
  HTTP_ERROR_MSG
}

export default GLOBAL
