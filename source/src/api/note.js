// request是一个axios实例，相当于统一配置一些请求参数和其他选项后的axios
import request from './request'

// 增加留言
export function postNote(title, content) {
  // 具体参数看axios文档
  // 返回的是一个Promise对象
  return request({
    url: '/note',
    method: 'post',
    data: {
      title,
      content
    }
  })
}

// 查询全部留言
export function getAllNote(form) {
  return request({
    url: '/note/getAll',
    method: 'get',
    params: form
  })
}

// 查询我的留言
export function getMyNote(form) {
  return request({
    url: '/note/getMe',
    method: 'get',
    params: form
  })
}

// 修改个人详细信息
export function putNote(id, form) {
  return request({
    url: '/note/' + id,
    method: 'put',
    data: form
  })
}

// 删除留言
export function deleteNote(id) {
  return request({
    url: '/note/' + id,
    method: 'delete',
  })
}

//回复留言
export function replyNote(id, reply) {
  return request({
    url: '/admin/note/' + id,
    method: 'put',
    data: {
      "reply": reply   
    }
  })
}