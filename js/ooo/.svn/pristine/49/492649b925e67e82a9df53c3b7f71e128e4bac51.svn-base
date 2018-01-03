import request from '@/utils/request'
import { Message } from 'element-ui'

export default function () {
  return request('/redwood/count/cut?_function=all', {
    method: 'GET'
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
