import $http from 'src/utils/http';

// 换卡头管理 - 列表
export const getCardList = (params, url = '/redwood/find/listChange') => $http.getJson(url, params);

// 换卡头管理 - 列表 - 编辑换卡头
export const updateChangeCard = (params, url = '/redwood/find/editChangeCard') => $http.postJson(url, params);

// 获取店铺列表
export const getShopList = (params, url = '/soouya/ziying/shop') => $http.get(url, params);

// 获取店铺列表
export const getProductList = (params, url = '/soouya/ziying/cloth') => $http.get(url, params);
