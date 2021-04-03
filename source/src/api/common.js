// request是一个axios实例，相当于统一配置一些请求参数和其他选项后的axios
import request from './request'

// 通过netid查询姓名,学生仅限在本站注册
export function getByNetId(id) {
  return request({
    url: '/common/getByNetId?net_id=' + id,
    method: 'get',
  })
}

// 通过netid查询老师姓名
export function getByNetIdForTeacher(id) {
  return request({
    url: '/common/getByNetIdForTeacher?net_id=' + id,
    method: 'get',
  })
}

// 通过内部id查询姓名
export function getByUserId(id) {
  return request({
    url: '/common/getById/' + id,
    method: 'get',
  })
}