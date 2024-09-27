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

export default readFile
