import http from "../utils/request";

//请求首页数据
export const getData = () => {
  //返回一个promise 对象
  return http.get('/first/getData')//后端的地址
}
export const getUser = (params) => {
  // 返回员工列表
  return http.get('/workers/getUser', params)
}
export const addUser = (data) => {
  return http.post('/workers/add', data)
}

export const editUser = (data) => {
  return http.post('/workers/edit', data)
}

export const delUser = (data) => {
  return http.post('/workers/del', data)
}
