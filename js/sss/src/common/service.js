import $http from 'common/http';

// 资金管理 - 列表
export const getFundList = (params, url = '/redwood/bind/customerAccount') => $http.get(url, params);

// 资金管理 - 本月账单
export const exportFundList = (params, url = '/redwood/report/debt') => $http.get(url, params);

// 采购商 - 列表
export const getCustomerList = (params, url = '/soouya/oms/customer') => $http.get(url, params);

// 供应商 - 列表
export const getSellerList = (params, url = '/soouya/oms/seller') => $http.get(url, params);

// 供应商审核 - 列表
export const getSellerAuditList = (params, url = '/soouya/oms/shop') => $http.get(url, params);

// 订单审核 - 找版
export const getOrderListByFind = (params, url = '/redwood/check/find') => $http.get(url, params);

// 订单审核 - 剪版
export const getOrderListByCut = (params, url = '/redwood/check/cut') => $http.get(url, params);

// 订单审核 - 大货
export const getOrderListByBluk = (params, url = '/redwood/check/bulk') => $http.get(url, params);

// 供应商审核 - 通过，废弃
export const chgSellerStatus = (params, url = '/soouya/oms/shop') => {
  url = `${url}/${params.id}`;
  return $http.put(url, params);
};

// 获取短信验证码
export const getTelCode = (tel, url = '/soouya/oms/outbox') => {
  url = `${url}/${tel}`;
  return $http.get(url);
};

// 获取所有销售员
export const getAllSellerList = (params, url = '/redwood/sys/OmsSeed/listXiaoShou4OMS') => $http.post(url, params);

// 数据统计 - 绩效管理 - 跟单绩效
export const getFollowPFMList = (params, url = '/redwood/buyfollow/OmsOrder/listFollowerAchievements') => $http.post(url, params);

// 数据统计 - 绩效管理 - 采购绩效
export const getPurchasePFMList = (params, url = '/redwood/buyfollow/OmsOrder/listPurchaserAchievements') => $http.postJson(url, params);
