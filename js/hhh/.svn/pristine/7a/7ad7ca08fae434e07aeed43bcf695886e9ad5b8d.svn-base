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
    listWaitPay: '/redwood/account/Reconciliation/listWaitPay', // 实款-待结算列表
    listPost: '/redwood/account/PayGroupOrderX/listPost', // 已分账列表
    updateDescr: '/redwood/account/PayGroupOrderX/updateDescr', // 待分账-编辑备注
    getDetail: '/redwood/account/PayGroupOrderX/getDetail', // 分账-明细
    sendbackIncome: '/redwood/account/PayGroupOrderX/sendbackIncome', // 垫付-分账异常
    close: '/redwood/account/PayGroupOrderX/close', // 关闭退款
    export: '/redwood/account/PayGroupOrderX/export', // 导出报表
    passPay: '/redwood/account/PayGroupOrderX/passPay', // 无需分账
    exportOrderList: '/redwood/account/PayGroupOrderX/exportOrderList', // 导出订单已分账
  },
  PayTransaction: {
    dispatch: '/redwood/account/PayTransaction/dispatch', // 分账(可批量分账
    list: '/redwood/account/PayTransaction/list.do', // 已分账-付款列表
    updateAccount: '/redwood/account/PayTransaction/updateAccount', // 付款文件列表-编辑收款方式
    comfirmPay: '/redwood/account/PayTransaction/comfirmPay', // 确认付款
    offlineComfirmPay: '/redwood/account/PayTransaction/offlineComfirmPay', // 确认付款
  },
  PayPassword: {
    modifyPayPassword: '/redwood/account/PayPassword/modifyPayPassword.do',
  },
  PayDebt: { // 欠款模块
    financeAccountList: '/redwood/account/FinanceAccount/list.do', // 财务收款账户列表
    listTo: '/redwood/payDebt/listTo', // 待分账列表
    exportTo: '/redwood/payDebt/exportTo', // 待分账列表的导出
    listDone: '/redwood/payDebt/listDone', // 已分账列表
    exportDone: '/redwood/payDebt/exportDone', // 已分账列表的导出
    getToSumary: '/redwood/payDebt/getToSumary', // 待收欠款获取头部的信息
    getDoneSumary: '/redwood/payDebt/getDoneSumary', // 已收欠款获取头部的信息
    batchConfirmIncome: '/redwood/payDebt/batchConfirmIncome', // 催缴接口
    sendbackIncome: '/redwood/payDebt/sendbackIncome', // 打回跟单的接口
    getDetail: '/redwood/payDebt/getDetail', // 欠款详情
    updateFinanceRemark: '/redwood/payDebt/updateFinanceRemark', // 财务备注接口
  },
  FinanceAccount: {
    list: '/redwood/account/FinanceAccount/list.do', // 财务收款方式列表
  },
  OrderProcess: {
    getPayApply: '/redwood/buyfollow/OrderProcess/getPayApply.do', // 获取付款申请单
    getPayApplyList: '/redwood/buyfollow/Order/getPayApplyList', // 批量获取付款申请单
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
  Reconciliation: { // 对账模块
    list: '/redwood/account/Reconciliation/list', // 待对账列表中的对账列表
    listPost: '/redwood/account/Reconciliation/listPost', // 已对账列表中的对账列表
    batchConfirmIncome: '/redwood/account/Reconciliation/batchConfirmIncome', // 对账弹框的确认按钮
    sendbackIncome: '/redwood/account/Reconciliation/sendbackIncome', // 待对账-实款异常
    getOutReposityDetail: '/redwood/account/Reconciliation/getOutReposityDetail', // 对账-实款明细
    getCutDetail: '/redwood/account/Reconciliation/getCutDetail', // 对账-实款明细
    getDetail: '/redwood/account/Reconciliation/getDetail', // 对账-实款明细
    getPostDetail: '/redwood/account/Reconciliation/getPostDetail', // 已对账-实款明细
    reconciliationConfirm: '/redwood/account/ReconciliationConfirm/getById', // 对账确认弹框
    reConfirmIncome: '/redwood/account/Reconciliation/reConfirmIncome', // 保存重新对账
    updateFinanceRemark: '/redwood/account/Reconciliation/updateFinanceRemark', // 财务备注接口
  },
  Account: {
    searchPageForCaiwu: '/redwood/account/CustomerAccount/searchPageForCaiwu',
    exportPageForCaiwu: '/redwood/account/CustomerAccount/exportPageForCaiwu',
    prestore: '/redwood/account/CustomerAccount/prestore',
    drawCash: '/redwood/account/CustomerAccount/drawCash',
    CustomerAccount_getDetail: '/redwood/account/CustomerAccount/getDetail',
    CustomerAccount_getTransactionRecordList: '/redwood/account/CustomerAccount/getTransactionRecordList',
    CustomerAccount_lineAdjust: '/redwood/account/CustomerAccount/lineAdjust',
    baiTiaoLineAdjust: '/redwood/account/CustomerAccount/baiTiaoLineAdjust',
    Bill_searchForFinance: '/redwood/account/Bill/searchForFinance',
    Bill_confirmDischarge: '/redwood/account/Bill/confirmDischarge',
    Bill_reconciliationAbnormal: '/redwood/account/Bill/reconciliationAbnormal',
    Bill_getDetail: '/redwood/account/Bill/getDetail',
    getById: '/redwood/account/CustomerAccount/getById',
    CustomerAccount_updateRemark: '/redwood/account/CustomerAccount/updateRemark',
    splitAccountConfirmById: '/redwood/account/SplitAccountConfirm/getById', // 分账的时候验证弹框信息类型
  },
  // 财务线上收款
  OnlineReceiveSeller: {
    list: '/redwood/account/OnlineReceiveSeller/list', // 线上收款列表
    getDetail: '/redwood/account/OnlineReceiveSeller/getDetail', // 查看明细
    confirmCheck: '/redwood/account/Reconciliation/batchConfirmIncome', // 确认对账
    listPost: '/redwood/account/OnlineReceiveSeller/listPost', // 已收款列表
    sendbackIncome: '/redwood/account/OnlineReceiveSeller/sendbackIncome', // 异常
  },
  // 财务线下销账
  ChargeOffRecords: {
    waitHandleList: '/redwood/accessory/ChargeOffRecords/waitHandleList', // 线下销账列表
    xiaozhang: '/redwood/accessory/ChargeOffRecords/xiaozhang', // 销账
    batchXiaozhang: '/redwood/accessory/ChargeOffRecords/batchXiaozhang', // 批量销账
    waitHandleDetail: '/redwood/accessory/ChargeOffRecords/waitHandleDetail', // 查看明细
    waitHandleJbDetail: '/redwood/accessory/ChargeOffRecords/getJBDetail', // 查看明细--剪版
    waitHandleYfDetail: '/redwood/accessory/ChargeOffRecords/getYFDetail', // 查看明细--运费
    handledList: '/redwood/accessory/ChargeOffRecords/handledList', // 已销账列表
    export: '/redwood/accessory/ChargeOffRecords/export', // 已销账-导出
  }
}
