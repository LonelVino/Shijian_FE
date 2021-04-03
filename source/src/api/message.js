// request是一个axios实例，相当于统一配置一些请求参数和其他选项后的axios
import request from './request'

// 获取本人所有消息
export function getCurrentAllmessage(type) {
  return request({
    url: '/messages?status=' + type,
    method: 'get',
  })
}

// 获取某个消息
export function getOnemessage(id) {
  return request({
    url: '/message/' + id,
    method: 'get',
  })
}

// 全部已读
export function getAllRead() {
  return request({
    url: '/message/allRead',
    method: 'put',
  })
}

