import request from '@/utils/request'
import MD5 from 'md5'
import {
  Message
} from 'element-ui'

export default function (userName, pwd) {
  let url = '/soouya/v1/shopToken?_function=';
  // console.log(window.location, '1')
  if (window.navigator.userAgent.toLowerCase().indexOf('micromessenger') != -1 || window.location.pathname == '/index/newLogin') {
    url += 'customer'
  } else {
    url += 'seller'
  }
  return request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      name: userName,
      pwd: MD5(pwd)
    }
  }).then((response) => {
    if (response.success !== '1') {
      // console.log(window.location.pathname, '2')
      Message({
        type: 'error',
        message: response.msg,
        duration: 1000
      })
    }
    return response
  })
}
