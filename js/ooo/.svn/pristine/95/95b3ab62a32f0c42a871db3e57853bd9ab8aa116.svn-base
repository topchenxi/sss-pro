import request from '@/utils/request'
import { Message } from 'element-ui'

export default function (params) {
  var url = `/redwood/buyfollow/OrderProcess/assignAskPrice.do`
  var contentType = 'application/x-www-form-urlencoded'
  if (params.guiderId !== undefined && params.guiderId !== '') {
    url = `/redwood/bulk/reAssignGuider`
    contentType = 'application/json'
  }
  return request(url, {
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': contentType
    }
  }).then(response => {
    if (response.success !== '1') {
      Message({
        type: 'error',
        message: response.msg,
        duration: 1000
      })
    }
    return response
  })
}
