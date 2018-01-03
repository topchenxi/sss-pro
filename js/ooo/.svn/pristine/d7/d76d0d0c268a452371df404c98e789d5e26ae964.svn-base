import request from '@/utils/request'
import MD5 from 'md5'
import { Message } from 'element-ui'

export default function (userName, pwd) {
  return request('/redwood/sys/Seed/login.do', {
    method: 'POST',
    data: {
      userName: userName,
      pwd: MD5(pwd)
    }
  }).then((response) => {
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
