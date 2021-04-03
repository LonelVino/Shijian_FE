// request是一个axios实例，相当于统一配置一些请求参数和其他选项后的axios
import request from './request'

// 获取当前用户登录信息
export function getCurrentUserInfo() {
  // 具体参数看axios文档
  // 返回的是一个Promise对象
  return request({
    url: '/cas',
    method: 'get'
  })
}

// 获取：用户点击登录时，前端应该前台跳转过去的地址
export function getRedirectUrl() {
  return request({
    url: '/cas',   //此处还有问题，看一下后端文档
    method: 'post'
  })
}

// 执行后端回调，将guid参数交给后端，让后端获取用户信息
export function runCallback(guid) {
  return request({
    url: '/cas/callback',
    method: 'post',
    data: {
      guid: guid
    }
  })
}
