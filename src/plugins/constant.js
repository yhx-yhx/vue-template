import { file, global } from '@/utils/constant'
export default {
  install: (app) => {
    app.config.globalProperties.$constant = {
      global,
      file
    }
  }
}
