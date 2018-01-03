export default {
  OrderProcess: {
    listShoppingCart: '/redwood/buyfollow/OrderProcess/listShoppingCart.do', // 跟单员 支付
    submitShoppingCart: '/redwood/buyfollow/OrderProcess/submitShoppingCart.do',
    cancel: '/redwood/buyfollow/OrderProcess/cancel.do',
    rejectToFollower: '/redwood/buyfollow/OrderProcess/rejectToFollower.do',
  },
  Account_Bill: {
    getDetail: '/redwood/account/Bill/getDetail',
    getPostponeOrderList: '/redwood/account/Bill/getPostponeOrderList',
    search: '/redwood/account/Bill/search',
    edit: '/redwood/account/Bill/edit',
    commit: '/redwood/account/Bill/commit',
    review: '/redwood/reconciliation/review',
    commitToFinance: '/redwood/account/Reconciliation/commitToFinance',
    CustomerAccount_getById: '/redwood/account/CustomerAccount/getById',
  },
  Reposity: {
    OutReposity_getListForPay: '/redwood/reposity/OutReposity/getListForPay',
    saveFreightAndNeedSaleMoney: '/redwood/reposity/OutReposity/saveFreightAndNeedSaleMoney', // 跟单员通知出仓
  },
  Replace: {
    input: '/redwood/buyfollow/Replace/input'
  },
  Order: {
    listForPurchaser: '/redwood/buyfollow/Order/listForPurchaser',
    sendbackToPurchaser: '/redwood/buyfollow/Order/sendbackToPurchaser',
  },
  Sys: {
    Shop_list: '/redwood/sys/Shop/list',
    Buyer_select: '/redwood/sys/Buyer/select',
  },
  Address: {
    list: '/redwood/buyfollow/Address/list',
    getDefault: '/redwood/buyfollow/Address/getDefault',
    deleteAddr: '/redwood/buyfollow/Address/delete',
    editAddr: '/redwood/buyfollow/Address/update',
    addAddr: '/redwood/buyfollow/Address/add',
  },
  cut: {
    cut: '/redwood/cut'
  }

}
