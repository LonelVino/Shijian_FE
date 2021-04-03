import axios from 'axios'
import Vue from 'vue'

// create an axios instance
const _axios = axios.create({
  /**
   * api 的 base_url
   * 统一配置过/api后
   * 则所有使用此axios前面请求时自动添加/api
   * 也就是说代码中/api就必须要省略掉了
   */
  baseURL: '/api'
})

// response interceptor
_axios.interceptors.response.use(
  response => {
    if (response) {
      if (response.data) {
        if (response.data.success) {
          return response.data.data
        } else {
          /*Vue.prototype.$message({
            type: 'warning',
            message: response.data.err_msg
          });
          return null*/
          return Promise.reject(response.data.err_msg)
        }
      } else {
        return Promise.reject('网络异常')
      }
    } else {
      return Promise.reject('异常')
    }
  },
  error => {
    return Promise.reject(error.message)
  }
)

export default _axios