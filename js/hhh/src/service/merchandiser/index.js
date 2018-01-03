import $http from 'src/utils/http';

// 退换货管理 - count
export const getBulkRRCount = (params, url = '/redwood/returnreplace/getCount') => $http.get(url, params);

// 退换货管理 - 待审核
export const getListOfRRWaitAudit = (params, url = '/redwood/returnreplace/listWaitReviewForFollower') => $http.get(url, params);

// 退换货管理 - 已审核
export const getListOfRRHadAudit = (params, url = '/redwood/returnreplace/listReviewedForFollower') => $http.get(url, params);

// 退换货管理 - 已完成
export const getListOfRRFinish = (params, url = '/redwood/returnreplace/listFinishedForFollower') => $http.get(url, params);

// 退换货管理 - 已取消
export const getListOfRRCancel = (params, url = '/redwood/returnreplace/listCancel') => $http.get(url, params);

// 退换货管理 - 取消退换货
export const cancelRR = (params, url = '/redwood/returnreplace/cancel') => $http.postJsonNew(url, params);

// 大货销售单 - 列表
export const getSaleTicketList = (params, url = '/redwood/buyfollow/OrderProcess/searchOrderForXiaoShouDan.do') => $http.postReq(url, params);

// 搜芽退款单 - count
export const getSoouyaRefundCount = (params, url = '/redwood/returnReplaceSoouyaRefund/getSumary') => $http.get(url, params);

// 搜芽退款单 - 列表
export const getSoouyaRefundList = (params, url = '/redwood/returnReplaceSoouyaRefund/list') => $http.get(url, params);

// 订单审核 - 找版 - 列表
export const getOrderOfFind = (params, url = '/redwood/check/find') => $http.get(url, params);

// 订单审核 - 剪版 - 列表
export const getOrderOfCut = (params, url = '/redwood/check/cut') => $http.get(url, params);

// 订单审核 - 大货 - 列表
export const getOrderOfBulk = (params, url = '/redwood/check/bulk') => $http.get(url, params);

// 订单审核 - 大货 - 列表
export const getListForSend = (params, url = '/redwood/reposity/InReposity/listForSend') => $http.postJsonNew(url, params);
