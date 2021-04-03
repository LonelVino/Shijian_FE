// request是一个axios实例，相当于统一配置一些请求参数和其他选项后的axios
import request from './request'

// 获取本人所有建议
export function getCurrentAllsuggestion() {
  return request({
    url: '/suggestions',
    method: 'get',
  })
}

// 获取某个建议
export function getOnesuggestion(id) {
  return request({
    url: 'suggestion/' + id,
    method: 'get',
  })
}

// 新增建议
export function createSuggestion(content) {
  return request({
    url: 'suggestion',
    method: 'post',
    data: {
      "content": content
    }
  })
}

// 删除某个建议
export function deleteSuggestion(id) {
  return request({
    url: '/suggestion/' + id,
    method: 'delete',
  })
}

// 回复
export function reaplySuggestion(id, reply) {
  return request({
    url: '/admin/suggestion/reply/' + id,
    method: 'put',
    data: {
      "reply": reply
    }
  })
}