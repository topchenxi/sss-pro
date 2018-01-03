import Fetch from 'isomorphic-fetch'
import { Message } from 'element-ui'

const transformData = (data) => {
  if (data instanceof FormData) return data
  let params = []
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      params.push(`${key}=${data[key]}`)
    }
  }
  return params.join('&')
}

function runCallBack(functionArray, response) {
  functionArray.forEach(item => {
    try {
      if (typeof item === 'function') {
        item(response)
      } else {
        throw new Error('参数必须传递function')
      }
    } catch (error) {
      console.error(error)
    }
  })
}

function Request(url, params) {
  let fetchOptions = Object.assign({
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {},
    credentials: 'include'
  }, params)
  if (fetchOptions.method === 'GET') {
    if (Object.keys(fetchOptions.data).length) {
      url += url.includes('?') ? '&' : '?' + transformData(fetchOptions.data)
    }
  } else {
    if (fetchOptions.headers['Content-Type'] === 'application/json') {
      fetchOptions.body = JSON.stringify(fetchOptions.data)
    } else {
      if (fetchOptions.data instanceof FormData) {
        fetchOptions.headers['Content-Type'] = 'multipart/form-data'
      }
      fetchOptions.body = transformData(fetchOptions.data)
    }
  }
  this.resolve = []
  this.reject = []
  let that = this
  delete fetchOptions.data
  Fetch(url, fetchOptions)
    .then((response) => response.json())
    .then((response) => {
      if (response.success !== '1') {
        if (that.reject.length) {
          runCallBack(that.reject, response)
        } else {
          let errorObj = {
            type: 'error',
            message: response.msg,
            duration: 2000
          }
          if (response.success === '10009') {
            sessionStorage.clear()
            location.href = '/login'
          } else {
            Message(errorObj)
          }
        }
      } else {
        if (that.resolve.length) runCallBack(that.resolve, response)
      }
    })
}

Request.prototype.then = function (resolve, reject) {
  resolve && this.resolve.push(resolve)
  reject && this.reject.push(reject)
  return this
}

export default function (url, params) {
  return new Request(url, params)
}
