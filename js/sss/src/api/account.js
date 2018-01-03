export default {
  PayGroup: {
    // list: '/redwood/account/PayGroup/list.do', // 实款-待对账列表  作废
    export: '/redwood/account/PayGroup/export.do', // 实款-导出待对账列表
    // confirmIncome: '/redwood/account/PayGroup/confirmIncome.do', // 实款-确认对账
    // sendbackIncome: '/redwood/account/PayGroup/sendbackIncome.do', // 实款-对账异常
    getDetail: '/redwood/account/PayGroup/getDetail.do', // 实款-明细
  },
  PayGroupOrderX: {
    list: '/redwood/account/PayGroupOrderX/list', // 实款-待对账列表
    listPost: '/redwood/account/PayGroupOrderX/listPost', // 已分账列表
    updateDescr: '/redwood/account/PayGroupOrderX/updateDescr', // 待分账-编辑备注
    getDetail: '/redwood/account/PayGroupOrderX/getDetail', // 分账-明细
    sendbackIncome: '/redwood/account/PayGroupOrderX/sendbackIncome', // 垫付-分账异常
    close: '/redwood/account/PayGroupOrderX/close', // 关闭退款
    export: '/redwood/account/PayGroupOrderX/export', // 导出报表
    passPay: '/redwood/account/PayGroupOrderX/passPay', // 无需分账
  },
  PayTransaction: {
    dispatch: '/redwood/account/PayTransaction/dispatch.do', // 分账(可批量分账
    list: '/redwood/account/PayTransaction/list.do', // 已分账-付款列表
    update: '/redwood/account/PayTransaction/update.do', // 付款文件列表-编辑收款方式
    comfirmPay: '/redwood/account/PayTransaction/comfirmPay.do', // 确认付款
    offlineComfirmPay: '/redwood/account/PayTransaction/offlineComfirmPay.do', // 确认付款
  },
  PayPassword: {
    modifyPayPassword: '/redwood/account/PayPassword/modifyPayPassword.do',
  },
  PayDebt: {
    list: '/redwood/account/PayDebt/list', // 欠款-待对账列表
    export: '/redwood/account/PayDebt/export.do', // 欠款-导出待对账列表
    confirmIncome: '/redwood/account/PayDebt/confirmIncome', // 欠款-确认对账
    sendbackIncome: '/redwood/account/PayDebt/sendbackIncome', // 欠款-对账异常
    getDetail: '/redwood/account/PayDebt/getDetail', // 待对账欠款-明细
    listPost: '/redwood/account/PayDebt/listPost'
  },
  FinanceAccount: {
    list: '/redwood/account/FinanceAccount/list.do', // 财务收款方式列表
  },
  OrderProcess: {
    getPayApply: '/redwood/buyfollow/OrderProcess/getPayApply.do' // 获取付款申请单
  },
  BuyerRefund: {
    PayTransaction_listRefund: '/redwood/account/PayTransaction/listRefund.do', // 采购商退款-退款记录
    dispatchRefund: '/redwood/account/PayTransaction/dispatchRefund.do', // 采购商退款-待退款列表
    offlineComfirmPayRefund: '/redwood/account/PayTransaction/offlineComfirmPayRefund.do', // 采购商退款-线下退款
    comfirmPayRefund: '/redwood/account/PayTransaction/comfirmPayRefund.do', // 采购商退款-确认退款
    list: '/redwood/account/BuyerRefund/list', // 采购商退款-待退款列表
    listPost: '/redwood/account/BuyerRefund/listPost', // 采购商退款-待退款列表
    sendbackIncome: '/redwood/account/BuyerRefund/sendbackIncome', // 采购商退款-线下退款
    getDetail: '/redwood/account/BuyerRefund/getDetail', // 采购商退款-明细
    listFinish: '/redwood/account/BuyerRefund/listFinish', // 采购商退款-已退款列表
    listByBuyerId: '/redwood/sys/BankAccount/listByBuyerId', // 收款方式-采购商的收款方式列表
    close: '/redwood/account/BuyerRefund/close', // 关闭退款
    confirmIncome: '/redwood/account/BuyerRefund/confirmIncome', // 确认退款
  },
  InReposity: {
    exportInReposityBaoBiao: '/redwood/reposity/InReposity/exportInReposityBaoBiao', // 导出入仓单
    exportOutReposityBaoBiao: '/redwood/reposity/OutReposity/exportOutReposityBaoBiao', // 导出出仓单
  },
  Reconciliation: {
    list: '/redwood/account/Reconciliation/list', // 待对账列表中的对账列表
    listPost: '/redwood/account/Reconciliation/listPost', // 已对账列表中的对账列表
    confirmIncome: '/redwood/account/Reconciliation/confirmIncome', // 待对账-实款对账
    sendbackIncome: '/redwood/account/Reconciliation/sendbackIncome', // 待对账-实款异常
    getDetail: '/redwood/account/Reconciliation/getDetail', // 对账-实款明细
    getPostDetail: '/redwood/account/Reconciliation/getPostDetail', // 已对账-实款明细
  },
  Account: {
    searchPageForCaiwu: '/redwood/account/CustomerAccount/searchPageForCaiwu',
    prestore: '/redwood/account/CustomerAccount/prestore',
    drawCash: '/redwood/account/CustomerAccount/drawCash',
    CustomerAccount_getDetail: '/redwood/account/CustomerAccount/getDetail',
    CustomerAccount_getTransactionRecordList: '/redwood/account/CustomerAccount/getTransactionRecordList',
    CustomerAccount_lineAdjust: '/redwood/account/CustomerAccount/lineAdjust',
    Bill_searchForFinance: '/redwood/account/Bill/searchForFinance',
    Bill_confirmDischarge: '/redwood/account/Bill/confirmDischarge',
    Bill_reconciliationAbnormal: '/redwood/account/Bill/reconciliationAbnormal',
    Bill_getDetail: '/redwood/account/Bill/getDetail',
    getById: '/redwood/account/CustomerAccount/getById',
    CustomerAccount_updateRemark: '/redwood/account/CustomerAccount/updateRemark',
  },
  // 财务线上收款
  OnlineReceiveSeller: {
    list: '/redwood/account/OnlineReceiveSeller/list', // 线上收款列表
    getDetail: '/redwood/account/OnlineReceiveSeller/getDetail', // 查看明细
    confirmIncome: '/redwood/account/OnlineReceiveSeller/confirmIncome', // 确认收款
    listPost: '/redwood/account/OnlineReceiveSeller/listPost', // 已收款列表
    sendbackIncome: '/redwood/account/OnlineReceiveSeller/sendbackIncome', // 异常
  },
  // 财务线下销账
  ChargeOffRecords: {
    waitHandleList: '/redwood/accessory/ChargeOffRecords/waitHandleList', // 线上收款列表
    xiaozhang: '/redwood/accessory/ChargeOffRecords/xiaozhang', // 销账
    batchXiaozhang: '/redwood/accessory/ChargeOffRecords/batchXiaozhang', // 批量销账
    waitHandleDetail: '/redwood/accessory/ChargeOffRecords/waitHandleDetail', // 查看明细
    handledList: '/redwood/accessory/ChargeOffRecords/handledList', // 已销账列表
  }
}
