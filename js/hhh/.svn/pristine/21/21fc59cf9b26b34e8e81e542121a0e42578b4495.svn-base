import $http from 'src/utils/http';

// 通知找版 - 待通知找版 - 列表
export const getFindWaitList = (params, url = '/redwood/need/list') => $http.get(url, params);

// 通知找版 - 待通知找版 - 列表 - 通知找版
export const chgNeedNotify = (params, url = '/redwood/need/notify') => $http.postJson(url, params);

// 通知找版 - 待通知找版 - 列表 - 取消需求
export const chgNeedCancel = (params, url = '/redwood/need/cancel') => $http.postJson(url, params);

// 通知找版 - 待通知找版 - 详情
export const getNeedDetail = (params, url = '/redwood/need/getById') => $http.getHttp(url, params);

// 通知找版 - 待通知找版 - 详情 - 保存
export const saveFindWaitOrderInfo = (params, url = '/redwood/need/edit') => $http.postJson(url, params);

// 通知找版 - 找版中 - 列表
export const getFindingList = (params, url = '/redwood/find/list') => $http.get(url, params);

// 通知找版 - 找版中 - 列表 - 取消订单
export const chgFindOrderCancel = (params, url = '/redwood/find/cancel') => $http.postJson(url, params);

// 通知找版 - 已结束 - 列表
export const getFindedList = (params, url = '/redwood/find/list') => $http.get(url, params);

// 通知找版 - 已结束 - 详情
export const getFindedDetail = (params, url = '/redwood/find/getDetail') => $http.getForm(url, params);

// 通知找版 - 找版中 - 详情 - 保存
export const saveFindingOrderInfo = (params, url = '/redwood/find/edit') => $http.postJson(url, params);
