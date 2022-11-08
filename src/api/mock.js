import Mock from 'mockjs'
import firstApi from './mockServeData/first'
import worker from './mockServeData/worker'

// 定义mock请求拦截
Mock.mock('/api/first/getData',firstApi.getStatisticalData)

// 用户列表的数据
Mock.mock('/api/workers/add', 'post', worker.createUser)
Mock.mock('/api/workers/edit', 'post', worker.updateUser)
Mock.mock('/api/workers/del', 'post', worker.deleteUser)
Mock.mock(/\api\/workers\/getUser/, worker.getUserList)

