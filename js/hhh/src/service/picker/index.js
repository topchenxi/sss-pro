import $http from 'src/utils/http';

// 收发货管理 - 列表
export const getOrderList = (params, url = '/redwood/pick/list') => $http.get(url, params);

// 收发货管理 - 修改快递单号
export const updateSendExpress = (params, url = '/redwood/pick/updateSendExpress') => $http.postJsonNew(url, params);

// 收发货管理 - 确认收货
export const orderReceive = (params, url = '/redwood/pick/receive') => $http.postJsonNew(url, params);

// 收发货管理 - 确认发货
export const orderSend = (params, url = '/redwood/pick/send') => $http.postJsonNew(url, params);
