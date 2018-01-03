import request from '@/utils/request'
import { Message } from 'element-ui'

export default function (params) {
  return request('/redwood/trace/bulk', {
    method: 'GET',
    data: Object.assign({}, params, {})
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
