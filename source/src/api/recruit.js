// request是一个axios实例，相当于统一配置一些请求参数和其他选项后的axios
import request from './request'

// 增加招募
export function postRecruit(form) {
  // 具体参数看axios文档
  // 返回的是一个Promise对象
  return request({
    url: '/recruit',
    method: 'post',
    data: form
  })
}

// 查询所有招募
export function getAllRecruits(form) {
  return request({
    url: '/recruit/getAll',
    method: 'get',
    params: form,
  })
}

// 查询我的招募
export function getMyRecruits(form) {
  return request({
    url: '/recruit/getMe',
    method: 'get',
    params: form,
  })
}
