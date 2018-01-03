import request from '@/utils/request'
import { Message } from 'element-ui'

export default function (id, type, params) {
  var model = 'cut'
  if (type === 'updateGuider') {
    model = 'ziying/cut'
  }
  return request(`/redwood/${model}/${id}?_function=${type}`, {
    method: 'PUT',
    data: params,
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
