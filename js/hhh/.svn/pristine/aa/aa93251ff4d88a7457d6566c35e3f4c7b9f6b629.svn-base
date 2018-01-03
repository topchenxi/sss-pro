import { newRequest } from 'utils/tool';
import { request } from 'utils/request'
import { Message } from 'element-ui';
let $http = {
  get(url, data = {}) {
    return newRequest({
      method: 'get',
      url,
      data,
      contentType: 'application/json',
    }).then(res => {
      if (res.success !== '1') {
        Message.error(res.msg);
      }
      return res;
    })
  },
  getHttp(url, data = {}) {
    return request(url, {
      method: 'GET',
      data,
    }).then(res => {
      if (res.success !== '1') {
        Message.error(res.msg);
      }
      return res;
    })
  },
  getJson(url, data = {}) {
    return request(url, {
      method: 'GET',
      data,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.success !== '1') {
        Message.error(res.msg);
      }
      return res;
    })
  },
  postJson(url, data = {}) {
    return request(url, {
      method: 'POST',
      data,
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => {
      if (res.success !== '1') {
        Message.error(res.msg);
      }
      return res;
    })
  },
  postJsonNew(url, data = {}) {
    return newRequest({
      method: 'post',
      url,
      data,
      contentType: 'application/json',
    }).then(res => {
      if (res.success !== '1') {
        Message.error(res.msg);
      }
      return res;
    })
  },
  getForm(url, data = {}) {
    return request(url, {
      method: 'GET',
      data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    }).then(res => {
      if (res.success !== '1') {
        Message.error(res.msg);
      }
      return res;
    })
  },
  postReq(url, data = {}) {
    return request(url, {
      method: 'post',
      data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    }).then(res => {
      if (res.success !== '1') {
        Message.error(res.msg);
      }
      return res;
    })
  },
}
export default $http;
