// request是一个axios实例，相当于统一配置一些请求参数和其他选项后的axios
import request from './request'

// 查询所有通知
export function getAllNotification(form) {
  return request({
    url: '/notification/getAll',
    method: 'get',
    params: form
  })
}

// 查询通知详情
export function getNotification(id) {
  return request({
    url: '/notification/' + id,
    method: 'get',
  })
}

// 删除通知（管理员）
export function deleteNotification(id) {
  return request({
    url: '/admin/notification/' + id,
    method: 'delete',
  })
}

// 增加通知（管理员）
export function addNotification(form) {
  return request({
    url: '/admin/notification',
    method: 'post',
    data: form
  })
}

// 修改通知（管理员）
export function editNotification(id, form) {
  return request({
    url: '/admin/notification/' + id,
    method: 'put',
    data: form
  })
}