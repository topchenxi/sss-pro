import {
    request
} from 'utils/request'
import { Message } from 'element-ui'

export default function (params) {
  return request('/redwood/sys/Seed/listCutCloth.do', {
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
