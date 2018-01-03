import { request } from 'common/utils'

const formatData = (data) => {
  const result = {}
  for (const key of Object.keys(data)) {
    if (data[key] !== '') {
      result[key] = data[key]
    }
  }
  return result
}

const getUndoneCutList = (data) => {
  return request({
    url: '/redwood/account/ChargeOffRecords/listCut',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(formatData(data))
  })
}

const getDoneCutList = (data) => {
  return request({
    url: '/redwood/account/ChargeOffRecords/listCutPost',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(formatData(data))
  })
}

const reimburseCut = (data) => {
  return request({
    url: '/redwood/account/ChargeOffRecords/baoxiaoCut',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(data)
  })
}

const exportCut = (data) => {
  window.open(`${window.location.origin}/redwood/account/ChargeOffRecords/exportCutPost?param=${JSON.stringify(formatData(data))}`)
}

const getCutDetails = (data) => {
  return request({
    url: '/redwood/account/ChargeOffRecords/getJBDetail',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(data)
  })
}

const getUndoneFreightList = (data) => {
  return request({
    url: '/redwood/account/ChargeOffRecords/listYunfei',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(formatData(data))
  })
}

const getDoneFreightList = (data) => {
  return request({
    url: '/redwood/account/ChargeOffRecords/listYunfeiPost',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(formatData(data))
  })
}

const reimburseFreight = (data) => {
  return request({
    url: '/redwood/account/ChargeOffRecords/baoxiaoYunfei',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(data)
  })
}

const getFreightDetails = (data) => {
  return request({
    url: '/redwood/account/ChargeOffRecords/getYFDetail',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(data)
  })
}

const exportFreight = (data) => {
  window.open(`${window.location.origin}/redwood/account/ChargeOffRecords/exportYunfeiPost?param=${JSON.stringify(formatData(data))}`)
}

export default {
  getUndoneCutList,
  getDoneCutList,
  reimburseCut,
  getCutDetails,
  exportCut,
  getUndoneFreightList,
  getDoneFreightList,
  reimburseFreight,
  getFreightDetails,
  exportFreight,
}

