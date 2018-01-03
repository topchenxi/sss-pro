const api = {
  'fundManagement': {
    'list': '/redwood/bind/customerAccount',
    'detail': '',
    'report': '/redwood/report/debt'
  },
  'buyerDebt': {
    'bulkList': '/redwood/repo/out',
    'bulkReport': '/redwood/repo/out',
    'cutList': '/redwood/ziying/cut',
    'cutReport': '/redwood/ziying/cut',
  },
  // 供应商退款
  'refund': {
    'list': '/redwood/returnReplaceOnlyRefund/list'
  },
  // 退换货退补款单
  'rrRefund': {
    'list': '/redwood/returnReplaceSellerRefund/list'
  }
};
export default api;
