import { request, newRequest } from 'common/utils';
import { Message } from 'element-ui';

let $http = {
  get(url = '', data = {}) {
    return request({
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
  put(url = '', data = {}) {
    return newRequest({
      url,
      data,
      method: 'put',
      contentType: 'application/json',
    }).then(res => {
      if (res.success !== '1') {
        Message.error(res.msg);
      }
      return res;
    })
  },
  post(url = '', data = {}) {
    return request({
      url,
      data,
      method: 'post'
    }).then(res => {
      if (res.success !== '1') {
        Message.error(res.msg);
      }
      return res;
    })
  },
  postJson(url = '', data = {}) {
    return request({
      url,
      data,
      method: 'post',
      contentType: 'application/json',
    }).then(res => {
      if (res.success !== '1') {
        Message.error(res.msg);
      }
      return res;
    })
  }
}

export default $http;
