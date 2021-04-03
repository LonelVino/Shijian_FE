// request是一个axios实例，相当于统一配置一些请求参数和其他选项后的axios
import request from './request'

// 查询所有资料
export function getAllGuide(form) {
  return request({
    url: '/guide/getAll',
    method: 'get',
    params: form
  })
}

// 获取实践指南
export function getOneGuide(id) {
  return request({
    url: '/guide/' + id,
    method: 'get',
  })
}

// 删除实践指南
export function deleteOneGuide(id) {
  return request({
    url: '/admin/guide/' + id,
    method: 'delete',
  })
}

// 增加实践指南
export function addOneGuide(form) {
  return request({
    url: '/admin/guide',
    method: 'post',
    data: form
  })
}