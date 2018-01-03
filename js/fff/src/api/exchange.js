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
// 获取未处理退换货数据
const getUndoneExchange = (data) => {
  return newRequest({
    url: '/redwood/returnReplaceFinance/listTo',
    method: 'get',
    data: data
  })
}
// 获取已处理退换货数据
const getDoneExchange = (data) => {
  return newRequest({
    url: '/redwood/returnReplaceFinance/listDone',
    method: 'get',
    data: data
  })
}
// 导出列表
const exportList = (data) => {
  return newRequest({
    url: '/redwood/returnReplaceFinance/exportDone',
    method: 'get',
    data: data
  }).then((response) => {
    if (response.success == 1) {
      window.open('http://www.soouya.com' + response.obj)
    }
  })
}
// 确认处理
const confirmHandle = (data) => {
  return request({
    url: '/redwood/returnReplaceFinance/handle',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(formatData(data))
  })
}
// 确认异常
const confirmException = (data) => {
  return request({
    url: '/redwood/returnReplaceFinance/editException',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(formatData(data))
  })
}
// 获取退换货详情
const getExchangeDetails = (data) => {
  return newRequest({
    url: '/redwood/returnReplaceFinance/getById',
    method: 'get',
    data: data
  })
}

export default {
  getUndoneExchange,
  getDoneExchange,
  exportList,
  confirmHandle,
  confirmException,
  getExchangeDetails
}
