import { newRequest, request } from 'common/utils'

const formatData = (data) => {
  const result = {}
  for (const key of Object.keys(data)) {
    if (data[key] !== '') {
      result[key] = data[key]
    }
  }
  return result
}

// 待处理扣数单
const getUndoneDeduction = (data) => {
  return request({
    url: '/redwood/buyfollow/ButtonNumber/listHandling',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(formatData(data))
  })
}
// 已处理扣数单
const getDoneDeduction = (data) => {
  return request({
    url: '/redwood/buyfollow/ButtonNumber/listHandled',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(formatData(data))
  })
}
// 处理扣数单
const handleDeduction = (data) => {
  return request({
    url: '/redwood/buttonNumberFinance/handle',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(formatData(data))
  })
}
// 异常扣数单
const exceptionDeduction = (data) => {
  return request({
    url: '/redwood/buttonNumberFinance/editException',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(formatData(data))
  })
}
// 扣数单详情
const getDeductionDetails = (data) => {
  return request({
    url: '/redwood/buyfollow/ButtonNumber/getFinanceDetail',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(formatData(data))
  })
}
// 获取余额
const getRemain = (data) => {
  return newRequest({
    url: '/redwood/account/CustomerAccount/getById',
    method: 'get',
    data: {id: data}
  })
}
// 导出扣数单
const exportList = (data) => {
  window.open(`${window.location.origin}/redwood/buyfollow/ButtonNumber/exportHandled?param=${JSON.stringify(formatData(data))}`)
}

export default {
  getUndoneDeduction,
  getDoneDeduction,
  handleDeduction,
  getRemain,
  exceptionDeduction,
  getDeductionDetails,
  exportList
}
