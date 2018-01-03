import { request, newRequest } from 'common/utils'

const formatData = (data) => {
  const result = {}
  for (const key of Object.keys(data)) {
    if (data[key] !== '') {
      result[key] = data[key]
    }
  }
  return result
}

const queryDahuoReports = (data) => { // 大货获取列表
  return newRequest({
    url: '/redwood/report/financePayedReceive/list',
    method: 'get',
    data: data
  })
}
const queryJianbanReports = (data) => { // 剪版获取列表
  console.log(data)
  return newRequest({
    url: '/redwood/toReceive/cut',
    method: 'get',
    data: formatData(data)
  })
}
const exportReports = (data) => {
  console.log(2)
  newRequest({
    url: '/redwood/report/bulkToReceive/export',
    method: 'get',
    data: formatData(data)
  }).then(res => {
    console.log(res)
    if (res.success == 1) {
      if (res.obj) {
        window.open('http://www.soouya.com' + res.obj)
      } else {
        this.$message({
          type: 'error',
          message: res.msg,
          duration: 1000
        })
      }
    }
  })
  // window.open(`${window.location.origin}/redwood/report/financePayedReceive/export?${formatData(data)}`)
}

const editDifference = (data) => { // 大货差异修改
  return request({
    url: '/redwood/buyfollow/Order/updateThCha',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(formatData(data))
  })
}
const jianbanEdit = (data) => { // 剪版的差异和备注修改接口
  return request({
    url: `/redwood/toReceive/cut/${data.id}`,
    method: 'PUT',
   contentType: 'application/json',
    data: JSON.stringify(formatData(data))
  })
}
const setRemark = (data) => {
  return newRequest({
    url: '/redwood/buyfollow/Order/updateRemark',
    method: 'POST',
    contentType: 'application/json',
    data: data
  })
}

export default {
  queryDahuoReports,
  queryJianbanReports,
  exportReports,
  editDifference,
  jianbanEdit,
  setRemark
}
