/**
 * 订单接口
 */

const OrderApi = {
  getTaskSummary: '/redwood/buyfollow/OrderProcess/getTaskSummary.do', // 获取各类任务的数量
  getDetail: '/redwood/buyfollow/OrderProcess/getDetail.do',
  updateSeller: '/redwood/buyfollow/OrderProcess/updateSeller.do', // 编辑供应商
  updateSendStyle: '/redwood/buyfollow/OrderProcess/updateSendStyle.do', // 编辑配送方式
  updateProductColorPrice: '/redwood/buyfollow/OrderProcess/updateProductColorPrice.do', // 编辑配色号
  commit: '/redwood/buyfollow/OrderProcess/commit.do', // 发布订单
  updateProductNumber: '/redwood/buyfollow/OrderProcess/updateProductNumber.do', // 编辑货号
  getDhTaskNotice: '/redwood/buyfollow/OrderProcess/getDhTaskNotice.do', // 获取大货任务通知单
  getPayApply: '/redwood/buyfollow/OrderProcess/getPayApply.do', // 获取付款申请单
  send: '/redwood/buyfollow/OrderProcess/send.do', // 发货
  cancel: '/redwood/buyfollow/OrderProcess/cancel.do', // 取消订单
  getMoneyDetail: '/redwood/payDebt/getMoneyDetail', // 获取费用明细
  updateMoney: '/redwood/buyfollow/OrderProcess/updateMoney.do', // 编辑费用明细
  notifyAskPrice: '/redwood/buyfollow/OrderProcess/notifyAskPrice.do', // 通知询价
  assignAskPrice: '/redwood/buyfollow/OrderProcess/assignAskPrice.do', // 指派询价
  assignDeliver: '/redwood/buyfollow/OrderProcess/assignDeliver.do', // 指派提货
  assignCheck: '/redwood/buyfollow/OrderProcess/assignCheck.do', // 指派验货
  assignSend: '/redwood/buyfollow/OrderProcess/assignSend.do', // 指派送货
  searchOrderList: '/redwood/buyfollow/OrderProcess/searchOrderList.do', // 搜索订单
  notifyPay: '/redwood/buyfollow/OrderProcess/notifyPay.do', // 通知付款
  notifyReceive: '/redwood/buyfollow/OrderProcess/notifyReceive.do', // 通知取货
  confirmReceiveForBuyer: '/redwood/buyfollow/OrderProcess/confirmReceiveForBuyer.do', // 采购商确认收到货(或者跟单员代替采购商确认收到货)
  updateReplySendTime: '/redwood/buyfollow/OrderProcess/updateReplySendTime.do', // 录入(更新)供货商送货时间
  inputReplaceTime: '/redwood/buyfollow/OrderProcess/inputReplaceTime.do', // 录入换货时间
  confirmReceive: '/redwood/buyfollow/OrderProcess/confirmReceive.do', // soouya验布中心确认收货
  inputPayCertificate: '/redwood/buyfollow/OrderProcess/inputPayCertificate.do', // 录入付款凭证
  getCertificateList: '/redwood/buyfollow/OrderProcess/getCertificateList.do', // 根据订单编号获取收(付)款凭据列表 跟单员
  getCheckReportList: '/redwood/buyfollow/OrderProcess/getCheckReportList.do', // 根据订单编号获取验货报告列表
  notifyReplace: '/redwood/buyfollow/OrderProcess/notifyReplace.do', // 通知换货 跟单员
  notifySend: '/redwood/buyfollow/OrderProcess/notifySend.do', // 通知发货 跟单员
  inputDh: '/redwood/buyfollow/Order/inputDh', // 录入大货信息
  inputFinal: '/redwood/buyfollow/OrderProcess/inputFinal.do', // 录入尾款信息
  inputCheckReport: '/redwood/buyfollow/OrderProcess/inputCheckReport.do', // 上传(编辑)验货报告
  getOrderSummary: '/redwood/buyfollow/OrderProcess/getOrderSummary.do', // 获取各订单进度状态数量
  searchOrderByListKey: '/redwood/buyfollow/OrderProcess/searchOrderByListKey.do', // 获取采购订单列表
  searchAll: '/redwood/buyfollow/OrderProcess/searchAll.do',
  getStatusGroup: '/redwood/buyfollow/OrderProcess/getStatusGroup.do', // 获取listKey对应的订单状态集合
  payAndInputCertificate: '/redwood/buyfollow/OrderProcess/payAndInputCertificate.do', // 已付款并上传付款凭据调用页面
  assignReplace: '/redwood/buyfollow/OrderProcess/assignReplace.do', // 指派换货
  updateCheckReport: '/redwood/buyfollow/OrderProcess/updateCheckReport.do', // 修改验布报告评价
  updateCheckFlaw: '/redwood/buyfollow/OrderProcess/updateCheckFlaw.do', // 修改验布报告评价
  // inputDebtPayCertificate: '/redwood/buyfollow/DebtReminder/inputDebtPayCertificate.do', // 录入欠款的尝付  (2016-9-14 作废 更改为下面的)
  inputDebtPayCertificate: '/redwood/payDebt/inputDebtPayCertificate', // 录入欠款的尝付
  // getTaskList: '/redwood/buyfollow/OrderProcess/getTaskList.do',
  getTaskList: '/redwood/buyfollow/Task/list.do',
  // 2016-06-20
  commitZb: '/redwood/buyfollow/OrderProcess/commitZb.do', // 发布找版
  updateZb: '/redwood/buyfollow/OrderProcess/updateZb.do', // 编辑找版
  assignZb: '/redwood/buyfollow/OrderProcess/assignZb.do', // 指派找版
  assignJb: '/redwood/buyfollow/OrderProcess/assignJb.do', // 指派剪版
  inputSk: '/redwood/buyfollow/OrderProcess/inputSk.do', // 录入色卡
  listSk: '/redwood/buyfollow/OrderProcess/listSk.do', // 色卡列表
  notifyZb: '/redwood/buyfollow/OrderProcess/notifyZb.do', // 找版-通知找版
  submitZbToAudit: '/redwood/buyfollow/OrderProcess/submitZbToAudit.do', // 找版-提交审核
  auditZb: '/redwood/buyfollow/OrderProcess/auditZb.do', // 找版-审核找版
  confirmReceiveSk: '/redwood/buyfollow/OrderProcess/confirmReceiveSk.do', // 找版-确认收色卡
  commitJb: '/redwood/buyfollow/OrderProcess/commitJb.do', // 剪版-发布剪版
  updateJb: '/redwood/buyfollow/OrderProcess/updateJb.do', // 剪版-更新剪版
  inputJb: '/redwood/buyfollow/OrderProcess/inputJb.do', // 剪版-录入剪版
  notifyJb: '/redwood/buyfollow/OrderProcess/notifyJb.do', // 剪版-通知剪版
  submitJbToAudit: '/redwood/buyfollow/OrderProcess/submitJbToAudit.do', // 剪版-提交审核
  auditJb: '/redwood/buyfollow/OrderProcess/auditJb.do', // 剪版-审核剪版
  confirmReceiveJb: '/redwood/buyfollow/ReceiveClothReminder/confirmReceiveCloth.do', // 剪版-确认收版
  getSendCertificateList: '/redwood/buyfollow/OrderProcess/getSendCertificateList.do', // 根据订单编号获取发货凭据列表
  // confirmJbMoneyPay: '/redwood/account/PayConfirm/confirmJbMoneyPay.do', // 剪版-确认收款 (2016-9-22 作废 更改为下面的)
  confirmJbMoneyPay: '/redwood/buyfollow/DebtReminder/confirmJbMoneyPay.do', // 剪版-确认收款
  // confirmJbMoneyPay4zy: '/redwood/account/PayConfirm/confirmJbMoneyPay4zy.do', // 剪版员和组长-确认收款 (2016-9-22 作废 更改为下面的)
  confirmJbMoneyPay4zy: '/redwood/buyfollow/DebtReminder/confirmJbMoneyPay4zy.do', // 剪版员和组长-确认收款
  // 2016-07-12
  commitLs: '/redwood/buyfollow/OrderProcess/commitLs.do', // 发布流水订单
  updateLs: '/redwood/buyfollow/OrderProcess/updateLs.do', // 编辑流水订单
  listShoppingCart: '/redwood/buyfollow/OrderProcess/listShoppingCart.do', // 支付购物车列表
  submitShoppingCart: '/redwood/buyfollow/OrderProcess/submitShoppingCart.do', // 提交结算
  listPayResult: '/redwood/buyfollow/OrderProcess/listPayResult.do', // 收付款列表
  getPayResult: '/redwood/buyfollow/OrderProcess/getPayResult.do', // 支付结果页
  applyAdvance: '/redwood/buyfollow/OrderProcess/applyAdvance.do', // 申请垫付
  confirmIncome: '/redwood/account/PayConfirm/confirmIncome.do', // 确认收到款,
  sendbackIncome: '/redwood/account/PayConfirm/sendbackIncome.do', // 财务实收页-异常,
  updateDh: '/redwood/buyfollow/Order/updateDh', // 编辑大货,
  updateFinal: '/redwood/buyfollow/OrderProcess/updateFinal.do', // 编辑大货,
  assignZbZz: '/redwood/buyfollow/OrderProcess/assignZbZz.do', // 大组长指派组长
  // sendDebtSms: '/redwood/buyfollow/DebtReminder/sendDebtSms.do', // 跟单员发送催缴短信  (2016-9-14 作废 更改为下面的)
  // sendDebtSms: '/redwood/account/PayDebt/sendDebtSms.do', // 跟单员发送催缴短信
  sendDebtSms: '/redwood/payDebt/sendDebtSms', // 跟单员发送催缴短信
  // getDebtDetail: '/redwood/buyfollow/DebtReminder/getDebtDetail.do', // 欠款明细信息 (2016-9-14 作废 更改为下面的)
  getDebtDetail: '/redwood/account/PayDebt/getDebtDetail.do', // 欠款明细信息
  editJb: '/redwood/buyfollow/OrderProcess/editJb.do', // 编辑剪版
  // 2016-10-10
  sendbackJb: '/redwood/buyfollow/OrderProcess/sendbackJb.do', //剪版退回此单
  rejectToFollower: '/redwood/buyfollow/OrderProcess/rejectToFollower.do', // 买货员打回给跟单员
  searchCutOrder: '/redwood/cut',
  getCountCut: '/redwood/count/cut'
}

export default OrderApi
