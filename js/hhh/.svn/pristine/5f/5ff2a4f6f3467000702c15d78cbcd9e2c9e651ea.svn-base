import $http from 'src/utils/http';

// 收发货管理 - 列表
export const getOrderList = (params, url = '/redwood/pick/list') => $http.get(url, params);

// 收发货管理 - 修改快递单号
export const updateSendExpress = (params, url = '/redwood/pick/updateSendExpress') => $http.postJsonNew(url, params);

// 采购商欠款记录 - 欠款（已对账） - 列表
export const getDebtList = (params) => {
  let data = Object.assign({}, params);
  const url = data.type == 1 ? '/redwood/repo/out' : '/redwood/ziying/cut';
  if (data._function == 'toBill' && data.type == 1) {
    data['bulk.createTimeBegin'] = data['bulk.createTimeBegin'] ? new Date(data['bulk.createTimeBegin']).getTime() : '';
    data['bulk.createTimeEnd'] = data['bulk.createTimeEnd'] ? new Date(data['bulk.createTimeEnd']).getTime() : '';
    delete data.createTimeBegin;
    delete data.createTimeEnd;
  }
  if (data._function == 'toBill' && data.type == 2) {
    data.createTimeBegin = data.createTimeBegin ? new Date(data.createTimeBegin).getTime() : '';
    data.createTimeEnd = data.createTimeEnd ? new Date(data.createTimeEnd).getTime() : '';
    delete data['bulk.createTimeBegin'];
    delete data['bulk.createTimeEnd'];
  }
  if (data._function == 'billed') {
    data.reconciliationTimeBegin = data.reconciliationTimeBegin ? new Date(data.reconciliationTimeBegin).getTime() : '';
    data.reconciliationTimeEnd = data.reconciliationTimeEnd ? new Date(data.reconciliationTimeEnd).getTime() : '';
    delete data.createTimeBegin;
    delete data.createTimeEnd;
  }
  delete data.type;
  return $http.get(url, data);
}

// 采购商欠款记录 - 已提交账单 - 列表
export const getDebtListOfSubmit = (params) => {
  params = Object.assign({}, params);
  params.createTimeBegin = params.createTimeBegin ? new Date(params.createTimeBegin).getTime() : '';
  params.createTimeEnd = params.createTimeEnd ? new Date(params.createTimeEnd).getTime() : '';
  return $http.get('/redwood/bill', params)
};

// 获取欠款采购商 - 列表 (key,number)
export const getCustomerList = (params, url = '/redwood/customerDebt') => $http.get(url, params);

// 创建对账单
export const saveBill = (params, url = '/redwood/bill') => $http.postJsonNew(url, params);

// 获取对账单详情
export const getBillDetail = (id) => $http.get('/redwood/bill/' + id, {});

