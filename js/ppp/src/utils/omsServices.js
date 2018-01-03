import api from '@/api/constant';
import $http from '@/utils/http';
const service = {
  getOrderList(params) {
    return $http.get(api.getOrderList, params);
  },
  getOrderDetail(id) {
    return $http.get(`${api.getOrderDetail}/${id}`);
  },
  saveOrderInfo(id, params) {
    return $http.put(`${api.saveOrderDetail}/${id}?_function=updateInfo`, params);
  },
  submitOrderInfo(id, params) {
    return $http.put(`${api.submitOrderDetail}/${id}?_function=input`, params);
  },
  getCustomerList(params) {
    return $http.get(api.getCustomerList, params);
  },
  getOrderByDebt(params) {
    return $http.get(api.getOrderByDebt, params);
  }
};
export default service;
