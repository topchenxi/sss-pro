import request from '@/utils/request'
import { Message } from 'element-ui'

export default function (params) {
  return request('/redwood/count/bulk', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
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
