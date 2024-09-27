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

export default download
