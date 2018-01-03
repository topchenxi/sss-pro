import request from '@/utils/request';
const $http = {
  get(url = '', params = {}) {
    return request(url, {
      method: 'GET',
      data: params,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },
  put(url = '', params = {}) {
    return request(url, {
      method: 'PUT',
      data: params,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
export default $http;
