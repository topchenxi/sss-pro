import Fetch from 'isomorphic-fetch'
import { Message } from 'element-ui'

const transformData = (data) => {
  if (data instanceof FormData) return data
  let params = []
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      params.push(`${key}=${data[key]}`);
    }
  }
  return params.join('&');
}

export const request = (url, params) => {
  let fetchOptions = Object.assign({
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {},
    credentials: 'include',
  }, params)
  if (fetchOptions.method === 'GET') {
    if (fetchOptions.data && typeof fetchOptions.data == 'object' && !fetchOptions.data._time) {
      fetchOptions.data._time = new Date().getTime();
    }
    url += url.includes('?') ? '&' : '?' + transformData(fetchOptions.data)
  } else {
    if (fetchOptions.headers['Content-Type'] === 'application/json') {
      fetchOptions.body = JSON.stringify(fetchOptions.data)
    } else {
      if (fetchOptions.data instanceof FormData) {
        delete fetchOptions.headers
        // fetchOptions.headers['Content-Type'] = 'multipart/form-data'
      }
      fetchOptions.body = transformData(fetchOptions.data)
    }
  }
  delete fetchOptions.data
  return Fetch(url, fetchOptions)
    .then((response) => response.json())
    .then((response) => {
      if (response.success == 10009) {
        Message({
          type: 'error',
          message: '后端报错,错误码=10009',
          duration: 1200,
          onClose() {
            sessionStorage.removeItem('currentUser')
            location.href = '/login'
          }
        })
      }
      return response
    })
}
