import Fetch from 'isomorphic-fetch'
import { Message } from 'element-ui'
import { MessageBox } from 'mint-ui'

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
  if (url.indexOf('?') != -1) {
    url = url + '&_urlId=' + new Date().getTime()
  } else {
    url = url + '?_urlId=' + new Date().getTime()
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
          // response.success = '10009'
          // 注意要求以后pc网页任何路由不得包含/index
          // 微信端路由必须添加/index
          if (response.success === '10009') {
            // 待定
            sessionStorage.clear()
            localStorage.removeItem('weChatUser')
            if (window.location.pathname.indexOf('/index') === -1) {
              location.href = '/login'
            } else {
              location.href = '/index/newLogin'
            }
          } else if (window.location.pathname.indexOf('/index') === -1) {
            Message(errorObj)
          } else if (window.location.pathname.indexOf('newLogin') !== -1) {
            console.log(location)
            MessageBox('温馨提示', response.msg);
          } else {
            runCallBack(that.resolve, response)
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
