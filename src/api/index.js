import http from "../utils/request";


/*post里面的内容由后端*/

//请求首页数据
/*export const getData = () => {
  //返回一个promise 对象
  return http.get('/first/getData')//后端的地址
}*/
export const UserLogin = (data) => {
  return http.post('/loginCheck', data)
}

export const UserRegist= (data) =>{
  return http.post('/registerCheck',data)
}


/**
 * 个人信息查询
 */

export const personal=(data)=>{
  return http.post('/userInfo',data)
}
/**
 * 客户的订单查询
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export const searchEmployee = (params) => {
  return http.post('/userInfo', params)
}
/**
 * 员工表
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export const getUser = (params) => {
  // 返回员工列表
  console.log("--->"+params)
  return http.get('/employee/selectAll', params)
}
export const addUser = (data) => {
  return http.post('/employee/add', data)
}

export const editUser = (data) => {
  return http.post('/employee/update', data)
}

export const delUser = (data) => {
  return http.post('/employee/delete',data)
}

export const searchUser = (params) => {
  return http.post('/employee/selectByName',params)
}
export const maketotal = () => {
  return http.post('/employee/sumOfEmployee')
}

export const PageUser = (params) => {
  console.log(params)
  return http.get('/employee/selectByPage',params)
}


/**
 * 客户表
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export const getClient = (params) => {
  // 返回员工列表
  console.log("--->"+params)
  return http.get('/client/selectAll', params)
}
export const addClient = (data) => {
  return http.post('/client/add', data)
}

export const editClient = (data) => {
  return http.post('/client/update', data)
}

export const delClient = (data) => {
  return http.post('/client/delete',data)
}

export const searchClient = (params) => {
  return http.post('/client/selectByName',params)
}

export const PageClient = (params) => {
  console.log(params)
  return http.get('/client/selectByPage',params)
}

/**
 * 包装管理
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export const getPackage = (params) => {
  // 返回员工列表
  console.log("--->"+params)
  return http.get('/package/selectAll', params)
}
export const addPackage = (data) => {
  return http.post('/package/add', data)
}

export const editPackage = (data) => {
  return http.post('/package/update', data)
}

export const delPackage = (data) => {
  return http.post('/package/delete',data)
}

export const searchPackage = (data) => {
  return http.post('/package/selectById',data)
}

export const PagePackage = (params) => {
  console.log(params)
  return http.get('/package/selectByPage',params)
}

/**
 * 运输管理
 */

export const getTransport = (params) => {
  // 返回员工列表
  console.log("--->"+params)
  return http.get('/trucks/selectAll', params)
}
export const addTransport = (data) => {
  return http.post('/trucks/add', data)
}

export const editTransport = (data) => {
  return http.post('/trucks/update', data)
}

export const delTransport = (data) => {
  return http.post('/trucks/delete',data)
}

export const searchTransport = (data) => {
  return http.post('/trucks/selectById',data)
}

export const PageTransport = (params) => {
  console.log(params)
  return http.get('/trucks/selectByPage',params)
}

/**
 * 订单表查询
 */

export const getIndent = (params) => {
  // 返回员工列表
  console.log("--->"+params)
  return http.get('/indent/selectAll', params)
}
export const addIndent = (data) => {
  return http.post('/indent/add', data)
}

export const editIndent = (data) => {
  return http.post('/indent/update', data)
}

export const delIndent = (data) => {
  return http.post('/indent/delete',data)
}

export const searchIndent = (data) => {
  return http.post('/indent/selectById',data)
}

export const PageIndent = (params) => {
  console.log(params)
  return http.get('/indent/selectByPage',params)
}
export const totalIndent = () => {
  return http.post('/indent/sumOfIndent')
}

/**
 * 库存查询
 */

export const getDepot = (params) => {
  // 返回员工列表
  console.log("--->"+params)
  return http.get('/depot/selectAll', params)
}
export const addDepot = (data) => {
  return http.post('/depot/add', data)
}

export const editDepot = (data) => {
  return http.post('/depot/update', data)
}

export const delDepot = (data) => {
  return http.post('/depot/delete',data)
}

export const searchDepot = (data) => {
  return http.post('/depot/selectById',data)
}

export const PageDepot = (params) => {
  console.log(params)
  return http.get('/depot/selectByPage',params)
}

/**
 * 入库处理
 */

export const getEnterDepot = (params) => {
  // 返回员工列表
  console.log("--->"+params)
  return http.get('/depot/enterSelectAll', params)
}
export const addEnterDepot = (data) => {
  return http.post('/depot/addEnterDepot', data)
}

export const editEnterDepot = (data) => {
  return http.post('/depot/updateEnterDrop', data)
}

export const delEnterDepot = (data) => {
  return http.post('/depot/deleteEnterDepot',data)
}

export const searchEnterDepot = (data) => {
  return http.post('/depot/enterDropSelectByIndentId',data)
}

export const PageEnterDepot = (params) => {
  console.log(params)
  return http.get('/depot/enterDropSelectAll',params)
}

/**
 * 出库处理
 */

export const getOuterDepot = (params) => {
  // 返回员工列表
  console.log("--->"+params)
  return http.get('/depot/outSelectAll', params)
}
export const addOuterDepot = (data) => {
  return http.post('/depot/addOutDepot', data)
}

export const editOuterDepot = (data) => {
  return http.post('/depot/updateOutDrop', data)
}

export const delOuterDepot = (data) => {
  return http.post('/depot/deleteOutDepot',data)
}

export const searchOuterDepot = (data) => {
  return http.post('/depot/outOfDropSelectByIndentId',data)
}

export const PageOuterDepot = (params) => {
  console.log(params)
  return http.get('/depot/outOfDropSelectAll',params)
}
