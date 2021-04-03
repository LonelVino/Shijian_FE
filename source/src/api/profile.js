// request是一个axios实例，相当于统一配置一些请求参数和其他选项后的axios
import request from './request'

// 增加个人详细信息
export function postProfileInfo(ruleForm) {
  // 具体参数看axios文档
  // 返回的是一个Promise对象
  return request({
    url: '/user/profile',
    method: 'post',
    data: {
      form: ruleForm   //这里有问题，只有测试之后才知道能不能正确使用
    }
  })
}

// 获取个人详细信息
export function getProfileInfo() {
  return request({
    url: '/user/profile',
    method: 'get',
  })
}

// 修改个人详细信息
export function putProfileInfo(ruleForm) {
  return request({
    url: '/user/profile',
    method: 'put',
    data: ruleForm   //换名字，函数参数叫什么无所谓，但是‘form’要看后端需要的变量叫什么
  })
}

// 删除个人详细信息
export function deleteProfileInfo() {
  return request({
    url: '/user/profile',
    method: 'delete',
  })
}

//获取user信息
export function getUserInfo() {
  return request({
    url: '/user/info',
    method: 'get',
  })
}