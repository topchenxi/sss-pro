import { auth } from './utils/auth'

const Login = resolve => require(['pages/common/login.vue'], resolve)
const Index = resolve => require(['pages/index.vue'], resolve)
const PrintIndex = resolve => require(['pages/print/index.vue'], resolve)
const Weixin = resolve => require(['pages/common/weixin.vue'], resolve)

const FollowUp = resolve => require(['components/dahuo/followUp.vue'], resolve)
const All = resolve => require(['components/dahuo/all.vue'], resolve)

const WaitSubmit = resolve => require(['components/payManage/waitSubmit.vue'], resolve)
const FinishAccount = resolve => require(['components/payManage/finishAccount.vue'], resolve)
const FinishSubmit = resolve => require(['components/payManage/finishSubmit.vue'], resolve)

// 账单管理
const BillView = resolve => require(['pages/billManage/bill/billView.vue'], resolve)
const BillDetailView = resolve => require(['pages/billManage/bill/billDetailView.vue'], resolve)
const BillDetailEdit = resolve => require(['pages/billManage/bill/billDetailEdit.vue'], resolve)

// 共同打印
const PrintFind = resolve => require(['pages/print/findPrint.vue'], resolve)
const PrintGuiderCut = resolve => require(['pages/print/printGuiderCut.vue'], resolve)
const PrintSalesOrder = resolve => require(['pages/print/printSalesOrder.vue'], resolve)
const OutWarehouseOrder = resolve => require(['pages/print/outWarehouseOrder.vue'], resolve)
const printKsOrder = resolve => require(['pages/print/printKsOrder.vue'], resolve)
const printGuidKsOrder = resolve => require(['pages/print/printGuideKsOrder.vue'], resolve)
// 采购
const BuyerReject = resolve => require(['pages/buyer/returnReplace/buyerReject.vue'], resolve)
const PressPayDebt = resolve => require(['pages/buyer/pressPayDebt.vue'], resolve)
const VerifyGoodTicket = resolve => require(['pages/buyer/returnReplace/verifyGoodTicket.vue'], resolve)
const BuyOrderManage = resolve => require(['pages/buyer/orderManage/orderManage.vue'], resolve)
const ApplyOrder = resolve => require(['pages/buyer/orderManage/applyOrder.vue'], resolve)
const InputReturnReplace = resolve => require(['pages/buyer/returnReplace/inputReturnReplace.vue'], resolve)
// 买货员退换货模块新页面
const BuyerRRCancel = resolve => require(['pages/buyer/returnReplace/buyerCancel.vue'], resolve)
const BuyerRRFinish = resolve => require(['pages/buyer/returnReplace/buyerFinish.vue'], resolve)
const BuyerRRWaitCheck = resolve => require(['pages/buyer/returnReplace/buyerWaitCheck.vue'], resolve)
const BuyerRRHadCheck = resolve => require(['pages/buyer/returnReplace/buyerHadCheck.vue'], resolve)
const BuyerCheck = resolve => require(['pages/buyer/returnReplace/buyerCheck.vue'], resolve)
const BuyerEditOrder = resolve => require(['pages/buyer/returnReplace/buyerEditOrder.vue'], resolve)
const EntryRrMessage = resolve => require(['pages/buyer/returnReplace/entryRrMessage.vue'], resolve)
// 买货员供应商退款新页面
const BuyerRefunded = resolve => require(['pages/buyer/customerRefund/buyerRefunded.vue'], resolve)
const BuyerRefunding = resolve => require(['pages/buyer/customerRefund/buyerRefunding.vue'], resolve)
const BuyerWaitRefund = resolve => require(['pages/buyer/customerRefund/buyerWaitRefund.vue'], resolve)
const CustomerCheck = resolve => require(['pages/buyer/customerRefund/customerCheck.vue'], resolve)
// 共同订单详情
const OrderDetail = resolve => require(['pages/common/orderDetail.vue'], resolve)
const ReturnReplaceDetail = resolve => require(['pages/common/returnReplaceDetail.vue'], resolve)

// 待收付款记录
const PaymentsReceipts = resolve => require(['pages/buyer/PaymentsReceipts.vue'], resolve)
const RejectRecord = resolve => require(['pages/buyer/buyerRejectRecord.vue'], resolve)

const AppointConsult = resolve => require(['pages/consultManage/appoint.vue'], resolve)

// const CheckFindList = resolve => require(['pages/check/find/list.vue'], resolve)
// const CheckCutList = resolve => require(['pages/check/cut/list.vue'], resolve)
// const CheckBulkList = resolve => require(['pages/check/bulk/list.vue'], resolve)

// const CheckFindDetail = resolve => require(['pages/check/find/details.vue'], resolve)
// const CheckCutDetail = resolve => require(['pages/check/cut/details.vue'], resolve)
// const CheckBulkDetail = resolve => require(['pages/check/bulk/details.vue'], resolve)
// 订单审核
const orderCheckFind = resolve => require(['pages/merchandiser/order/check/tabs/find.vue'], resolve)
const orderCheckCut = resolve => require(['pages/merchandiser/order/check/tabs/cut.vue'], resolve)
const orderCheckBulk = resolve => require(['pages/merchandiser/order/check/tabs/bulk.vue'], resolve)
const orderCheckFindEdit = resolve => require(['pages/merchandiser/order/check/edits/find.vue'], resolve)
const orderCheckCutEdit = resolve => require(['pages/merchandiser/order/check/edits/cut.vue'], resolve)
const orderCheckBulkEdit = resolve => require(['pages/merchandiser/order/check/edits/bulk.vue'], resolve)

/*
 * 7.25版本组件加载
 */
/* 大货模块 */
// 大货订单
const DhManage = resolve => require(['pages/bulk/dhOrder/dhManage.vue'], resolve)
// 出入仓管理
const DeliverApplyOrder = resolve => require(['pages/bulk/dhdeliverManage/deliverApplyOrder.vue'], resolve)
const DeliverManage = resolve => require(['pages/bulk/dhdeliverManage/deliverManage.vue'], resolve)
// const DeliverManage = resolve => require(['pages/merchandiser/bulk/deliver/list.vue'], resolve)
// 发起申请退换货新页面
const BeforeApplyRrOrder = resolve => require(['pages/bulk/dhdeliverManage/beforeApplyRrOrder.vue'], resolve)
const AfterApplyRrOrder = resolve => require(['pages/bulk/dhdeliverManage/afterApplyRrOrder.vue'], resolve)
// 大货销售单
// const SalesManage = resolve => require(['pages/bulk/dhSalesOrder/salesManage.vue'], resolve)
// 跟单员扣数单
const KsFollowManage = resolve => require(['pages/bulk/ksManage/follow/ksManage.vue'], resolve)
const inputFollowKs = resolve => require(['pages/bulk/ksManage/follow/inputKs.vue'], resolve)
const followKsDetail = resolve => require(['pages/bulk/ksManage/follow/ksDetail.vue'], resolve)
// 买货员扣数单
const KsPurcherManage = resolve => require(['pages/bulk/ksManage/purchaser/ksManage.vue'], resolve)
const inputPurcherKs = resolve => require(['pages/bulk/ksManage/purchaser/inputKs.vue'], resolve)
const purcherKsDetail = resolve => require(['pages/bulk/ksManage/purchaser/ksDetail.vue'], resolve)
// 退换货管理
// const EditApplyOrder = resolve => require(['pages/bulk/returnReplace/editApplyOrder.vue'], resolve)
// const AddGoodTicket = resolve => require(['pages/bulk/returnReplace/addGoodTicket.vue'], resolve)
// const RejectManage = resolve => require(['pages/bulk/returnReplace/rejectManage.vue'], resolve)
// const ApplyReturnReplace = resolve => require(['pages/bulk/returnReplace/applyReturnReplace.vue'], resolve)

// 退换货管理
const bulkRRWaitAudit = resolve => require(['pages/merchandiser/bulk/returnReplace/tabs/waitAudit.vue'], resolve)
const bulkRRHadAudit = resolve => require(['pages/merchandiser/bulk/returnReplace/tabs/hadAudit.vue'], resolve)
const bulkRRFinish = resolve => require(['pages/merchandiser/bulk/returnReplace/tabs/finish.vue'], resolve)
const bulkRRCancel = resolve => require(['pages/merchandiser/bulk/returnReplace/tabs/cancel.vue'], resolve)
const bulkRREditOrder = resolve => require(['pages/merchandiser/bulk/returnReplace/editOrder.vue'], resolve)
const bulkRRWaitAuditDetail = resolve => require(['pages/merchandiser/bulk/returnReplace/details/waitCheckDetail.vue'], resolve)
const bulkRRHadAuditDetail = resolve => require(['pages/merchandiser/bulk/returnReplace/details/hadCheckDetail.vue'], resolve)
const bulkRRFinishDetail = resolve => require(['pages/merchandiser/bulk/returnReplace/details/finishDetail.vue'], resolve)
// 大货销售单
const salesTicket = resolve => require(['pages/merchandiser/bulk/salesTicket/index.vue'], resolve)
// const rrCancel = resolve => require(['pages/bulk/returnReplace/cancel.vue'], resolve)
// const rrFinish = resolve => require(['pages/bulk/returnReplace/finish.vue'], resolve)
// const rrHadCheck = resolve => require(['pages/bulk/returnReplace/hadCheck.vue'], resolve)
// const rrWaitCheck = resolve => require(['pages/bulk/returnReplace/waitCheck.vue'], resolve)
// const EditOrder = resolve => require(['pages/bulk/returnReplace/editOrder.vue'], resolve)
// const WaitCheckDetail = resolve => require(['pages/bulk/returnReplace/details/waitCheckDetail.vue'], resolve)
// const HadCheckDetail = resolve => require(['pages/bulk/returnReplace/details/hadCheckDetail.vue'], resolve)
// const FinishDetail = resolve => require(['pages/bulk/returnReplace/details/finishDetail.vue'], resolve)

/* 剪版模块 */
// 剪版订单
const CutManage = resolve => require(['pages/cut/cutManage/cutManage.vue'], resolve)
const CutDetail = resolve => require(['pages/cut/cutManage/cutDetail.vue'], resolve)
const InputJb = resolve => require(['pages/cut/cutManage/inputJb.vue'], resolve)

const GuiderAllBulkList = resolve => require(['pages/guider/bulk/allList.vue'], resolve)

const GuiderAllCutList = resolve => require(['pages/guider/cut/cutManage/allList.vue'], resolve)
const GuiderCutList = resolve => require(['pages/guider/cut/cutManage/list.vue'], resolve)
const GuiderCutDetail = resolve => require(['pages/guider/cut/cutManage/detail.vue'], resolve)
const GuiderCutUpdate = resolve => require(['pages/guider/cut/cutManage/update.vue'], resolve)
// const GuiderDebtCutList = resolve => require(['pages/guider/cut/cutManage/debt.vue'], resolve)
// const PickerOrderList = resolve => require(['pages/picker/list.vue'], resolve)
// 新版分拣员 ui
// 全部
const pickerOfAll = resolve => require(['pages/picker/tabs/all.vue'], resolve)
// 待收版
const pickerOfWaitToCollect = resolve => require(['pages/picker/tabs/waitToCollect.vue'], resolve)
// 待发货
const pickerOfWaitToSend = resolve => require(['pages/picker/tabs/waitToSend.vue'], resolve)
// 已发货
const pickerOfHadSended = resolve => require(['pages/picker/tabs/hadSended.vue'], resolve)

const TransportingOrder = resolve => require(['pages/picker/transportingOrder.vue'], resolve)

// 发布剪版
const JbPublish = resolve => require(['pages/cut/jbPublish/jbPublish.vue'], resolve)

/* 找版模块 */

/* 货款管理模块 */
// 通知付款
const NotifyPayView = resolve => require(['pages/paymentManage/notifyPay/notifyPayView.vue'], resolve)
const PayView = resolve => require(['pages/paymentManage/outRepoPayCheck/payView.vue'], resolve)
const submitChargeView = resolve => require(['pages/paymentManage/submitCharge/submitChargeView.vue'], resolve)
// 供应商退款
const Refunding = resolve => require(['pages/paymentManage/refund/refunding.vue'], resolve)
const Refunded = resolve => require(['pages/paymentManage/refund/refunded.vue'], resolve)
const RefundApply = resolve => require(['pages/paymentManage/refund/refundApply.vue'], resolve)
// 搜芽退补款
// const SoouyaRefund = resolve => require(['pages/paymentManage/soouyaRefund/soouyaRefund.vue'], resolve)
// const HadSoouyaRefund = resolve => require(['pages/paymentManage/soouyaRefund/hadSoouyaRefund.vue'], resolve)
// const EditSoouyaRefund = resolve => require(['pages/paymentManage/soouyaRefund/editSoouyaRefund.vue'], resolve)
// const SoouyaRefundDetail = resolve => require(['pages/paymentManage/soouyaRefund/soouyaRefundDetail.vue'], resolve)
// 搜芽退补款
const loanSoouyaRefunding = resolve => require(['pages/merchandiser/loan/soouyaRefund/tabs/refunding.vue'], resolve)
const loanSoouyaRefunded = resolve => require(['pages/merchandiser/loan/soouyaRefund/tabs/refunded.vue'], resolve)
const loanSoouyaRefundEdit = resolve => require(['pages/merchandiser/loan/soouyaRefund/edit.vue'], resolve)
const loanSoouyaRefundDetail = resolve => require(['pages/merchandiser/loan/soouyaRefund/detail.vue'], resolve)
// 退换货退补款单新页面
const RrSellerRefunded = resolve => require(['pages/buyer/rrSellerRefund/rrSellerRefunded.vue'], resolve)
const RrSellerRefunding = resolve => require(['pages/buyer/rrSellerRefund/rrSellerRefunding.vue'], resolve)
const EditSellerRefund = resolve => require(['pages/buyer/rrSellerRefund/editSellerRefund.vue'], resolve)
const rrSellerRefundDetail = resolve => require(['pages/buyer/rrSellerRefund/rrSellerRefundDetail.vue'], resolve)
// 新的详情页面
const NewDetail = resolve => require(['components/newDetail.vue'], resolve)
const CustomerAccountList = resolve => require(['pages/customerAccount/list.vue'], resolve)
// 采货员大货订单
// 全部订单详情fu
const AllAllDetail = resolve => require(['pages/guider/bulk/allAllDetail.vue'], resolve)
const DhIndex = resolve => require(['pages/guider/bulk/index.vue'], resolve)
const AllOrder = resolve => require(['pages/guider/bulk/tab/allOrder.vue'], resolve)
const WaitPay = resolve => require(['pages/guider/bulk/tab/waitPay.vue'], resolve)
const HadReceipt = resolve => require(['pages/guider/bulk/tab/hadReceipt.vue'], resolve)
const WaitInspect = resolve => require(['pages/guider/bulk/tab/waitInspect.vue'], resolve)
const WaitOutRepo = resolve => require(['pages/guider/bulk/tab/waitOutRepo.vue'], resolve)
const WaitReceipt = resolve => require(['pages/guider/bulk/tab/waitReceipt.vue'], resolve)

const DhOrderDetail = resolve => require(['pages/guider/bulk/orderDetail.vue'], resolve)
const QuoteAndEdit = resolve => require(['pages/guider/bulk/quoteAndEdit.vue'], resolve)
const GuiderRrApply = resolve => require(['pages/guider/bulk/returnReplaceApply.vue'], resolve)
// 采货员退换货
const GuiderRrFinish = resolve => require(['pages/guider/returnReplace/tab/guiderRrFinish.vue'], resolve)
const GuiderRrCancel = resolve => require(['pages/guider/returnReplace/tab/guiderRrCancel.vue'], resolve)
const GuiderRring = resolve => require(['pages/guider/returnReplace/tab/guiderRring.vue'], resolve)
const RrIndex = resolve => require(['pages/guider/returnReplace/index.vue'], resolve)
const GuiderEditRrOrder = resolve => require(['pages/guider/returnReplace/editRrOrder.vue'], resolve)
const GuiderRrDetail = resolve => require(['pages/guider/returnReplace/returnReplaceDetail.vue'], resolve)
// 采货员退换货退补款单
const GuiderRrRefunded = resolve => require(['pages/guider/rrRefund/tab/guiderRrRefunded.vue'], resolve)
const GuiderRrRefunding = resolve => require(['pages/guider/rrRefund/tab/guiderRrRefunding.vue'], resolve)
const ReIndex = resolve => require(['pages/guider/rrRefund/index.vue'], resolve)
// 采购商资金管理
const moneyManageList = resolve => require(['pages/guider/moneyManage/index.vue'], resolve)
const moneyManageDetail = resolve => require(['pages/guider/moneyManage/detail.vue'], resolve)
// 采货员扣数单
const GuiderKsManage = resolve => require(['pages/guider/bulk/KsManage/ksManage.vue'], resolve)
const GuiderKsDetail = resolve => require(['pages/guider/bulk/KsManage/ksDetail.vue'], resolve)
const GuiderInputKs = resolve => require(['pages/guider/bulk/KsManage/inputKs'], resolve) // 添加/编辑
// 审核员
// 通知找版
// const zbNotice = resolve => require(['pages/check/scalping/list.vue'], resolve) // 列表
// const zbNoticeInput = resolve => require(['pages/check/scalping/inputFind.vue'], resolve) // 编辑
// const zbNoticeDetail = resolve => require(['pages/check/scalping/detail.vue'], resolve) // 详情

const checkFindWait = resolve => require(['pages/check/scalping_new/tabs/findWait.vue'], resolve)
const checkFinding = resolve => require(['pages/check/scalping_new/tabs/finding.vue'], resolve)
const checkFinded = resolve => require(['pages/check/scalping_new/tabs/finded.vue'], resolve)

const checkFindWaitDetail = resolve => require(['pages/check/scalping_new/details/detail-findWait.vue'], resolve)
const checkFindingDetail = resolve => require(['pages/check/scalping_new/details/detail-finding.vue'], resolve)
const checkFindedDetail = resolve => require(['pages/check/scalping_new/details/detail-finded.vue'], resolve)

const GuiderEditRefundOrder = resolve => require(['pages/guider/rrRefund/editRefundOrder.vue'], resolve)
const GuiderRrRefundDetail = resolve => require(['pages/guider/rrRefund/guiderRrRefundDetail.vue'], resolve)

// 采货员供应商退款
const GuiderShopCompanyRefunded = resolve => require(['pages/guider/shopCompanyRefund/refunded.vue'], resolve)
const GuiderShopCompanyRefunding = resolve => require(['pages/guider/shopCompanyRefund/refunding.vue'], resolve)
const GuiderShopCompanyIndex = resolve => require(['pages/guider/shopCompanyRefund/index.vue'], resolve)
const GuiderShopCompanyRefundDetail = resolve => require(['pages/guider/shopCompanyRefund/orderDetail.vue'], resolve)
// 采货员货款管理
const GuiderMoneyMangeIndex = resolve => require(['pages/guider/outputMoney/index.vue'], resolve)
const GuiderMoneWaitSubmit = resolve => require(['pages/guider/outputMoney/waitSubmit.vue'], resolve)
const GuiderMoneyFinshSubmit = resolve => require(['pages/guider/outputMoney/finshSubmit.vue'], resolve)
const GuiderMoneyFinshAccount = resolve => require(['pages/guider/outputMoney/finshAccount.vue'], resolve)
const GuiderMoneyMangeDetail = resolve => require(['pages/guider/outputMoney/orderDetail.vue'], resolve)
const GuiderSubmitChargeView = resolve => require(['pages/guider/outputMoney/submitChargeView.vue'], resolve)
// 采货员商品管理
const GuiderClothList = resolve => require(['pages/guider/cloth/clothList.vue'], resolve)
const GuiderClothDetail = resolve => require(['pages/guider/cloth/clothDetail.vue'], resolve)
const GuiderClothEdit = resolve => require(['pages/guider/cloth/clothEdit.vue'], resolve)
// 采货员打印报表
const GuiderQuoteTable = resolve => require(['pages/print/guiderQuoteTable.vue'], resolve)
const GuiderSalesTable = resolve => require(['pages/print/guiderSalesTable.vue'], resolve)

// 数据员换卡
// const CardChangeManage = resolve => require(['pages/find/data/cardChangeManage.vue'], resolve)
// const CardChangeInput = resolve => require(['pages/find/data/cardChangeInput.vue'], resolve)
// const CardChangeDetail = resolve => require(['pages/find/data/cardChangeDetail.vue'], resolve)
// const FindClothList = resolve => require(['pages/find/data/clothList.vue'], resolve)
// const FindClothDetail = resolve => require(['pages/find/data/clothDetail.vue'], resolve)
// const FindSaveOrUpdateCloth = resolve => require(['pages/find/data/saveOrUpdateCloth.vue'], resolve)

const cardWait = resolve => require(['pages/dataer/card/tabs/wait.vue'], resolve);
const cardHad = resolve => require(['pages/dataer/card/tabs/had.vue'], resolve);
const cardNot = resolve => require(['pages/dataer/card/tabs/not.vue'], resolve);
// 换卡头
const changeCardEdit = resolve => require(['pages/dataer/card/changeCard.vue'], resolve);
// 详情
const cardDetailOfdata = resolve => require(['pages/dataer/card/detail.vue'], resolve);
// 商品管理
const productCardList = resolve => require(['pages/dataer/product/tabs/card.vue'], resolve);
const productSoouyaList = resolve => require(['pages/dataer/product/tabs/soouya.vue'], resolve);
const productDetail = resolve => require(['pages/dataer/product/detail.vue'], resolve);
const productEdit = resolve => require(['pages/dataer/product/edit.vue'], resolve);

// 采购商欠款记录

const buyerDebt = resolve => require(['pages/guider/buyerDebt/index.vue'], resolve)
const buyerDebtDahuo = resolve => require(['pages/guider/buyerDebt/bulk.vue'], resolve)
const buyerDebtJianban = resolve => require(['pages/guider/buyerDebt/cut.vue'], resolve)

// const debtOfUncleared = resolve => require(['pages/guider/buyerDebt_new/tabs/index.vue'], resolve)
const debtOfUncleared = resolve => require(['pages/saler/buyerDebt/tabs/uncleared.vue'], resolve)
const debtOfSubmit = resolve => require(['pages/saler/buyerDebt/tabs/submit.vue'], resolve)
const debtOfFinish = resolve => require(['pages/saler/buyerDebt/tabs/finish.vue'], resolve)
const debtOfAddBill = resolve => require(['pages/saler/buyerDebt/addBill.vue'], resolve)
const debtOfBillDetail = resolve => require(['pages/saler/buyerDebt/detail.vue'], resolve)

function requireAuth(to, from, next) {
  if (auth.loggedIn()) {
    next()
  } else {
    next({
      path: '/login',
      query: { redirect: route.fullPath }
    })
  }
}
// 总路由配置
export const route = {
  mode: 'history',
  base: __dirname,
  routes: [{
      path: '/',
      redirect: '/index/deliver',
      meta: {
        bg: 1
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        hideNav: 1,
        bg: 1
      }
    },
    {
      path: '/print',
      component: PrintIndex,
      children: [
        { path: 'printFind', name: 'printFind', component: PrintFind },
        { path: 'printGuiderCut', name: 'printGuiderCut', component: PrintGuiderCut },
        { path: 'printSalesOrder', name: 'printSalesOrder', component: PrintSalesOrder },
        { path: 'outWarehouseOrder', name: 'outWarehouseOrder', component: OutWarehouseOrder },
        { path: 'printKsOrder', name: 'printKsOrder', component: printKsOrder },
        { path: 'printGuidKsOrder', name: 'printGuidKsOrder', component: printGuidKsOrder },
        // 采货员打印报表路由
        { path: 'guiderquotetable', name: 'guiderQuoteTable', component: GuiderQuoteTable },
        { path: 'guidersalestable', name: 'guiderSalesTable', component: GuiderSalesTable },
      ]
    },
    {
      path: '/guider/allAllDetail',
      component: AllAllDetail,
      name: 'allAllDetail',
      // beforeEnter: requireAuth,+
      meta: { index: '1011' },
    },
    {
      path: '/customerAccount',
      name: 'customerAccount',
      component: Index,
      meta: { index: '514' },
      redirect: 'customerAccount/list',
      children: [
        { path: 'customerAccount/list', name: 'customerAccountList', component: CustomerAccountList, beforeEnter: requireAuth, meta: { index: '514' } }
      ],
    },
    {
      path: '/check',
      name: 'check',
      component: Index,
      meta: { index: '14' },
      redirect: 'check/cut/list',
      children: [
        { path: 'find/list', name: 'checkFindList', component: orderCheckFind, beforeEnter: requireAuth, meta: { index: '141' } },
        { path: 'cut/list', name: 'checkCutList', component: orderCheckCut, beforeEnter: requireAuth, meta: { index: '141' } },
        { path: 'bulk/list', name: 'checkBulkList', component: orderCheckBulk, beforeEnter: requireAuth, meta: { index: '141' } },
        { path: 'find/details', name: 'checkFindDetails', component: orderCheckFindEdit, beforeEnter: requireAuth, meta: { index: '141' } },
        { path: 'cut/details', name: 'checkCutDetails', component: orderCheckCutEdit, beforeEnter: requireAuth, meta: { index: '141' } },
        { path: 'bulk/details', name: 'checkBulkDetails', component: orderCheckBulkEdit, beforeEnter: requireAuth, meta: { index: '141' } },
      ],
    },
    /* 7.25版本修改路由环境配置 */
    {
      path: '/index',
      component: Index,
      redirect: '/index/deliver',
      children: [
        { path: 'deliver', name: 'deliver', component: DeliverManage, meta: { index: '2' }, beforeEnter: requireAuth, },
        { path: 'deliver/deliverApplyOrder', name: 'deliverApplyOrder', component: DeliverApplyOrder, meta: { index: '2' }, beforeEnter: requireAuth, },
        // 发起申请退换货新路由
        { path: 'deliver/beforeapplyrrorder', name: 'beforeApplyRrOrder', component: BeforeApplyRrOrder, meta: { index: '2' }, beforeEnter: requireAuth },
        { path: 'deliver/afterapplyrrorder', name: 'afterApplyRrOrder', component: AfterApplyRrOrder, meta: { index: '2' }, beforeEnter: requireAuth },
        // { path: 'bulk/returnReplace', name: 'reject', component: RejectManage, meta: { index: '3' }, beforeEnter: requireAuth, },
        // { path: 'bulk/returnReplace/applyReturnReplace', name: 'applyReturnReplace', component: ApplyReturnReplace, meta: { index: '3' }, beforeEnter: requireAuth, },
        // { path: 'bulk/returnReplace/addTicket', name: 'addGoodTicket', component: AddGoodTicket, meta: { index: '3' }, beforeEnter: requireAuth, },
        // { path: 'bulk/returnReplace/editApplyOrder', name: 'editApplyOrder', component: EditApplyOrder, meta: { index: '3' }, beforeEnter: requireAuth, },
        // 退换货管理模块
        { path: 'returnReplace/bulkRRWaitAudit', name: 'bulkRRWaitAudit', component: bulkRRWaitAudit, meta: { index: '31' }, beforeEnter: requireAuth },
        { path: 'returnReplace/bulkRRHadAudit', name: 'bulkRRHadAudit', component: bulkRRHadAudit, meta: { index: '31' }, beforeEnter: requireAuth },
        { path: 'returnReplace/bulkRRFinish', name: 'bulkRRFinish', component: bulkRRFinish, meta: { index: '31' }, beforeEnter: requireAuth },
        { path: 'returnReplace/bulkRRCancel', name: 'bulkRRCancel', component: bulkRRCancel, meta: { index: '31' }, beforeEnter: requireAuth },
        { path: 'returnReplace/bulkRREditOrder', name: 'bulkRREditOrder', component: bulkRREditOrder, meta: { index: '31' }, beforeEnter: requireAuth },
        { path: 'returnReplace/bulkRRWaitAuditDetail', name: 'bulkRRWaitAuditDetail', component: bulkRRWaitAuditDetail, meta: { index: '31' }, beforeEnter: requireAuth },
        { path: 'returnReplace/bulkRRHadAuditDetail', name: 'bulkRRHadAuditDetail', component: bulkRRHadAuditDetail, meta: { index: '31' }, beforeEnter: requireAuth },
        { path: 'returnReplace/bulkRRFinishDetail', name: 'bulkRRFinishDetail', component: bulkRRFinishDetail, meta: { index: '31' }, beforeEnter: requireAuth },

        // { path: 'returnReplace/cancel', name: 'rrCancel', component: rrCancel, meta: { index: '3' }, beforeEnter: requireAuth },
        // { path: 'returnReplace/finish', name: 'rrFinish', component: rrFinish, meta: { index: '3' }, beforeEnter: requireAuth },
        // { path: 'returnReplace/hadcheck', name: 'rrHadCheck', component: rrHadCheck, meta: { index: '3' }, beforeEnter: requireAuth },
        // { path: 'returnReplace/waitcheck', name: 'rrWaitCheck', component: rrWaitCheck, meta: { index: '3' }, beforeEnter: requireAuth },
        // { path: 'returnReplace/editorder', name: 'editOrder', component: EditOrder, meta: { index: '3' } },
        // { path: 'returnReplace/waitcheckdetail', name: 'waitCheckDetail', component: WaitCheckDetail, meta: { index: '3' }, beforeEnter: requireAuth },
        // { path: 'returnReplace/hadcheckdetail', name: 'hadCheckDetail', component: HadCheckDetail, meta: { index: '3' }, beforeEnter: requireAuth },
        // { path: 'returnReplace/finishdetail', name: 'finishDetail', component: FinishDetail, meta: { index: '3' }, beforeEnter: requireAuth },
        { path: 'refund/newdetail', name: 'newDetail', component: NewDetail, meta: { index: '100' }, beforeEnter: requireAuth },
        // { path: 'bulk/salesOrder', name: 'salesOrder', component: SalesManage, meta: { index: '4' }, beforeEnter: requireAuth, },
        { path: 'bulk/salesTicket', name: 'salesTicket', component: salesTicket, meta: { index: '4' }, beforeEnter: requireAuth, },
        { path: 'cut/cutManage&listStatus:listStatus?', name: 'cutManage', component: CutManage, meta: { index: '12' }, beforeEnter: requireAuth, },
        { path: 'cut/cutManage/cutDetail', name: 'cutDetail', component: CutDetail, meta: { index: '12' }, beforeEnter: requireAuth, },
        { path: 'cut/cutManage/inputJb', name: 'inputJb', component: InputJb, meta: { index: '12' }, beforeEnter: requireAuth, },

        { path: 'guider/bulk/allList', name: 'guiderAllBulkList', component: GuiderAllBulkList, meta: { index: '1032' }, beforeEnter: requireAuth, },

        { path: 'guider/cut/allList&listStatus:listStatus?', name: 'guiderAllCutList', component: GuiderAllCutList, meta: { index: '1031' }, beforeEnter: requireAuth, },
        { path: 'guider/cut/update', name: 'guiderCutUpdate', component: GuiderCutUpdate, meta: { index: '1021' }, beforeEnter: requireAuth, },
        { path: 'guider/cut/list&listStatus:listStatus?', name: 'guiderCutList', component: GuiderCutList, meta: { index: '1021' }, beforeEnter: requireAuth, },
        { path: 'guider/cut/detail', name: 'guiderCutDetail', component: GuiderCutDetail, meta: { index: '1021' }, beforeEnter: requireAuth, },
        // { path: 'guider/cut/debt&listStatus:listStatus?', name: 'guiderDebtCutList', component: GuiderDebtCutList, meta: { index: '1022' }, beforeEnter: requireAuth, },
        // { path: 'picker/list', name: 'pickerOrderList', component: PickerOrderList, meta: { index: '85' }, beforeEnter: requireAuth, },
        { path: 'picker/all', name: 'pickerOrderList', component: pickerOfAll, meta: { index: '86' }, beforeEnter: requireAuth, },
        { path: 'picker/waitToCollect', name: 'pickerOfWaitToCollect', component: pickerOfWaitToCollect, meta: { index: '86' }, beforeEnter: requireAuth, },
        { path: 'picker/waitToSend', name: 'pickerOfWaitToSend', component: pickerOfWaitToSend, meta: { index: '86' }, beforeEnter: requireAuth, },
        { path: 'picker/hadSended', name: 'pickerOfHadSended', component: pickerOfHadSended, meta: { index: '86' }, beforeEnter: requireAuth, },

        { path: 'picker/transportingOrder', name: 'transportingOrder', component: TransportingOrder, meta: { index: '86' }, beforeEnter: requireAuth, },
        {
          path: 'bulk/salesOrder/dhManage',
          name: 'dhManage',
          component: DhManage,
          meta: { index: '102' },
          beforeEnter: requireAuth,
          redirect: 'bulk/salesOrder/dhManage/follow',
          children: [
            { path: 'follow', name: 'dhManageFollow', component: FollowUp, beforeEnter: requireAuth, meta: { index: '102' } },
            { path: 'all', name: 'dhManageAll', component: All, beforeEnter: requireAuth, meta: { index: '102' }, },
          ]
        },
        { path: 'bulk/ksManage/follow/ksManage', name: 'KsFollowManage', component: KsFollowManage, meta: { index: '133' }, beforeEnter: requireAuth, },
        { path: 'bulk/ksManage/follow/inputKs', name: 'inputFollowKs', component: inputFollowKs, meta: { index: '133' }, beforeEnter: requireAuth, },
        { path: 'bulk/ksManage/follow/ksDetail', name: 'followKsDetail', component: followKsDetail, meta: { index: '133' }, beforeEnter: requireAuth, },
        // 采购元扣数单管理
        { path: 'bulk/ksManage/purchaser/ksManage', name: 'KsPurcherManage', component: KsPurcherManage, meta: { index: '133' }, beforeEnter: requireAuth, },
        { path: 'bulk/ksManage/purchaser/inputKs', name: 'inputPurcherKs', component: inputPurcherKs, meta: { index: '133' }, beforeEnter: requireAuth, },
        { path: 'bulk/ksManage/purchaser/ksDetail', name: 'purcherKsDetail', component: purcherKsDetail, meta: { index: '133' }, beforeEnter: requireAuth, },
        // 订单发布
        { path: 'cut/jbPublish', name: 'jbPublish', component: JbPublish, meta: { index: '491' }, beforeEnter: requireAuth, },

        { path: 'paymentmanage/notifyPayView', name: 'notifyPayView', component: NotifyPayView, meta: { index: '6' }, beforeEnter: requireAuth, },
        { path: 'paymentmanage/refunding', name: 'refunding', component: Refunding, beforeEnter: requireAuth, meta: { index: '6' }, },
        { path: 'paymentmanage/refunded', name: 'refunded', component: Refunded, beforeEnter: requireAuth, meta: { index: '6' }, },
        { path: 'paymentmanage/refundapply', name: 'refundApply', component: RefundApply, beforeEnter: requireAuth, meta: { index: '6' }, },

        { path: 'loan/loanSoouyaRefunding', name: 'loanSoouyaRefunding', component: loanSoouyaRefunding, meta: { index: '61' }, beforeEnter: requireAuth },
        { path: 'loan/loanSoouyaRefunded', name: 'loanSoouyaRefunded', component: loanSoouyaRefunded, meta: { index: '61' }, beforeEnter: requireAuth },
        { path: 'loan/loanSoouyaRefundEdit', name: 'loanSoouyaRefundEdit', component: loanSoouyaRefundEdit, meta: { index: '61' }, beforeEnter: requireAuth },
        { path: 'loan/loanSoouyaRefundDetail', name: 'loanSoouyaRefundDetail', component: loanSoouyaRefundDetail, meta: { index: '61' }, beforeEnter: requireAuth },

        // { path: 'paymentmanage/soouyarefund', name: 'soouyaRefund', component: SoouyaRefund, meta: { index: '6' }, beforeEnter: requireAuth },
        // { path: 'paymentmanage/hadsoouyarefund', name: 'hadSoouyaRefund', component: HadSoouyaRefund, meta: { index: '6' }, beforeEnter: requireAuth },
        // { path: 'paymentmanage/editsoouyarefund', name: 'editSoouyaRefund', component: EditSoouyaRefund, meta: { index: '6' }, beforeEnter: requireAuth },
        // { path: 'paymentmanage/soouyarefunddetail', name: 'soouyaRefundDetail', component: SoouyaRefundDetail, meta: { index: '6' }, beforeEnter: requireAuth },
        {
          path: 'paymentmanage/payView',
          name: 'payView',
          component: PayView,
          meta: { index: '6' },
          beforeEnter: requireAuth,
          redirect: 'paymentmanage/payView/waitSubmit',
          children: [
            { path: 'waitSubmit', name: 'waitSubmit', component: WaitSubmit, beforeEnter: requireAuth, meta: { index: '6' } },
            { path: 'finishSubmit', name: 'finishSubmit', component: FinishSubmit, beforeEnter: requireAuth, meta: { index: '6' } },
            { path: 'finishAccount', name: 'finishAccount', component: FinishAccount, beforeEnter: requireAuth, meta: { index: '6' } },
          ]
        },
        { path: 'paymentmanage/submitChargeView', name: 'submitChargeView', component: submitChargeView, meta: { index: '6' }, beforeEnter: requireAuth, },
        { path: 'billManage/billView', name: 'billView', component: BillView, meta: { index: '9' }, beforeEnter: requireAuth, },
        { path: 'billManage/billDetailView', name: 'billDetailView', component: BillDetailView, meta: { index: '9' }, beforeEnter: requireAuth, },
        { path: 'billManage/billDetailEdit', name: 'billDetailEdit', component: BillDetailEdit, meta: { index: '9' }, beforeEnter: requireAuth, },
        {
          path: 'buyer/orderManage',
          name: 'buyerOrderManage',
          component: BuyOrderManage,
          meta: { index: '10' },
          beforeEnter: requireAuth,
          redirect: 'buyer/orderManage/follow',
          children: [
            { path: 'follow', name: 'buyerOrderManageFollow', component: FollowUp, beforeEnter: requireAuth, meta: { index: '10' } },
            { path: 'all', name: 'buyerOrderManageAll', component: All, beforeEnter: requireAuth, meta: { index: '10' }, },
          ]
        },
        { path: 'buyer/applyOrder', name: 'applyOrder', component: ApplyOrder, meta: { index: '10' }, beforeEnter: requireAuth, },
        { path: 'buyer/inputReturnReplace', name: 'inputReturnReplace', component: InputReturnReplace, meta: { index: '5' }, beforeEnter: requireAuth, },
        { path: 'buyer/buyerReject', name: 'buyerReject', component: BuyerReject, meta: { index: '5' }, beforeEnter: requireAuth, },
        { path: 'buyer/verifyTicket', name: 'verifyTicket', component: VerifyGoodTicket, meta: { index: '5' }, beforeEnter: requireAuth, },
        { path: 'pressPayDebt', name: 'pressPayDebt', component: PressPayDebt, meta: { index: '6' }, beforeEnter: requireAuth, },
        // 买货员新页面路由配置
        { path: 'buyer/buyercancel', name: 'buyerCancel', component: BuyerRRCancel, meta: { index: '8' }, beforeEnter: requireAuth },
        { path: 'buyer/buyerfinish', name: 'buyerFinish', component: BuyerRRFinish, meta: { index: '8' }, beforeEnter: requireAuth },
        { path: 'buyer/buyerwaitcheck', name: 'buyerWaitCheck', component: BuyerRRWaitCheck, meta: { index: '8' }, beforeEnter: requireAuth },
        { path: 'buyer/buyerhadcheck', name: 'buyerHadCheck', component: BuyerRRHadCheck, meta: { index: '8' }, beforeEnter: requireAuth },
        { path: 'buyer/buyercheck', name: 'buyerCheck', component: BuyerCheck, meta: { index: '8' }, beforeEnter: requireAuth },
        { path: 'buyer/buyereditorder', name: 'buyerEditOrder', component: BuyerEditOrder, meta: { index: '8' }, beforeEnter: requireAuth },
        { path: 'buyer/buyerrefunded', name: 'buyerRefunded', component: BuyerRefunded, meta: { index: '8' }, beforeEnter: requireAuth },
        { path: 'buyer/buyerrefunding', name: 'buyerRefunding', component: BuyerRefunding, meta: { index: '8' }, beforeEnter: requireAuth },
        { path: 'buyer/buyerwaitrefund', name: 'buyerWaitRefund', component: BuyerWaitRefund, meta: { index: '8' }, beforeEnter: requireAuth },
        { path: 'buyer/rrsellerrefunding', name: 'rrSellerRefunding', component: RrSellerRefunding, meta: { index: '8' }, beforeEnter: requireAuth },
        { path: 'buyer/rrsellerrefunded', name: 'rrSellerRefunded', component: RrSellerRefunded, meta: { index: '8' }, beforeEnter: requireAuth },
        { path: 'buyer/editsellerrefund', name: 'editSellerRefund', component: EditSellerRefund, meta: { index: '8' }, beforeEnter: requireAuth },
        { path: 'buyer/rrsellerrefunddetail', name: 'rrSellerRefundDetail', component: rrSellerRefundDetail, meta: { index: '8' }, beforeEnter: requireAuth },
        { path: 'buyer/entryrrmessage', name: 'enterRrMessage', component: EntryRrMessage, meta: { index: '8' }, beforeEnter: requireAuth },
        { path: 'buyer/customercheck', name: 'customerCheck', component: CustomerCheck, meta: { index: '8' }, beforeEnter: requireAuth },

        { path: 'orderDetail', name: 'orderDetail', component: OrderDetail, meta: { index: '9' } },
        { path: 'bulk/returnReplaceDetail', name: 'returnReplaceDetail', component: ReturnReplaceDetail, meta: { index: '9' }, beforeEnter: requireAuth, },
        { path: 'PaymentsReceipts', name: 'PaymentsReceipts', component: PaymentsReceipts, meta: { index: '11' }, beforeEnter: requireAuth, },
        { path: 'buyerRejectRecord', name: 'buyerRejectRecord', component: RejectRecord, meta: { index: '6' }, beforeEnter: requireAuth, },
        { path: 'weixin', name: 'weixin', component: Weixin, meta: { index: '119' }, beforeEnter: requireAuth, },
        { path: 'appointConsult', name: 'appointConsult', component: AppointConsult, meta: { index: '120' }, beforeEnter: requireAuth, },
        // 采货员大货订单页面路由配置
        {
          path: 'guider/bulk',
          component: DhIndex,
          name: 'dhIndex',
          redirect: 'guider/bulk/hadreceipt',
          beforeEnter: requireAuth,
          meta: { index: '1010' },
          children: [{
              path: 'allorder',
              name: 'allOrder',
              component: AllOrder,
              meta: { index: '1011' },
              beforeEnter: requireAuth
            },
            {
              path: 'waitPay',
              name: 'waitPay',
              component: WaitPay,
              meta: { index: '1011' },
              beforeEnter: requireAuth
            },
            {
              path: 'hadreceipt',
              name: 'hadReceipt',
              component: HadReceipt,
              meta: { index: '1011' },
              beforeEnter: requireAuth
            },
            {
              path: 'waitinspect',
              name: 'waitInspect',
              component: WaitInspect,
              meta: { index: '1011' },
              beforeEnter: requireAuth
            },
            {
              path: 'waitoutrepo',
              name: 'waitOutRepo',
              component: WaitOutRepo,
              meta: { index: '1011' },
              beforeEnter: requireAuth
            },
            {
              path: 'waitreceipt',
              name: 'waitReceipt',
              component: WaitReceipt,
              meta: { index: '1011' },
              beforeEnter: requireAuth
            }
          ]
        },
        {
          path: 'guider/bulk/dhOrderDetail',
          component: DhOrderDetail,
          name: 'dhOrderDetail',
          beforeEnter: requireAuth,
          meta: { index: '1011' },
        },
        {
          path: 'guider/bulk/quoteAndEdit',
          component: QuoteAndEdit,
          name: 'quoteAndEdit',
          beforeEnter: requireAuth,
          meta: { index: '1011' },
        },
        {
          path: 'guider/bulk/returnReplaceApply',
          component: GuiderRrApply,
          name: 'guiderRrApply',
          beforeEnter: requireAuth,
          meta: { index: '1011' },
        },
        // 采货员退换货管理页面路由配置
        {
          path: 'guider/returnreplace',
          beforeEnter: requireAuth,
          component: RrIndex,
          name: 'rrIndex',
          meta: { index: '1012' },
          redirect: 'guider/returnreplace/guiderrring',
          children: [{
              path: 'guiderrring',
              beforeEnter: requireAuth,
              meta: { index: '1012' },
              name: 'guiderRring',
              component: GuiderRring,
            },
            {
              path: 'guiderrrfinish',
              beforeEnter: requireAuth,
              meta: { index: '1012' },
              name: 'guiderRrFinish',
              component: GuiderRrFinish
            },
            {
              path: 'guiderrrcancel',
              beforeEnter: requireAuth,
              meta: { index: '1012' },
              name: 'guiderRrCancel',
              component: GuiderRrCancel,
            }
          ]
        },
        {
          path: 'guider/returnreplace/editrrorder',
          name: 'guiderEditRrOrder',
          component: GuiderEditRrOrder,
          beforeEnter: requireAuth,
          meta: { index: '1012' },
        },
        {
          path: 'guider/returnreplace/returnreplacedetail',
          name: 'guiderRrDetail',
          component: GuiderRrDetail,
          beforeEnter: requireAuth,
          meta: { index: '1012' },
        },
        // 采货员退换货退补款路由配置
        {
          path: 'guider/rrRefund',
          beforeEnter: requireAuth,
          component: ReIndex,
          name: 'reIndex',
          meta: { index: '1033' },
          redirect: 'guider/rrRefund/guiderrrrefunding',
          children: [{
              path: 'guiderrrrefunding',
              component: GuiderRrRefunding,
              name: 'guiderRrRefunding',
              beforeEnter: requireAuth,
              meta: { index: '1033' },
            },
            {
              path: 'guiderrrrefunded',
              component: GuiderRrRefunded,
              name: 'guiderRrRefunded',
              beforeEnter: requireAuth,
              meta: { index: '1033' },
            }
          ]
        },
        // 导购扣数单
        { path: 'guider/bulk/ksManage/ksManage', name: 'guiderKsManage', component: GuiderKsManage, meta: { index: '1013' }, beforeEnter: requireAuth, },
        { path: 'guider/bulk/ksManage/inputKs', name: 'guiderInputKs', component: GuiderInputKs, meta: { index: '1013' }, beforeEnter: requireAuth, },
        { path: 'guider/bulk/ksManage/ksDetail', name: 'guiderKsDetail', component: GuiderKsDetail, meta: { index: '1013' }, beforeEnter: requireAuth, },
        // 采购商资金管理
        { path: 'guider/moneyManage/list', name: 'moneyManageList', component: moneyManageList, meta: { index: '1014' }, beforeEnter: requireAuth, },
        { path: 'guider/moneyManage/detail', name: 'moneyManageDetail', component: moneyManageDetail, meta: { index: '1014' }, beforeEnter: requireAuth, },
        // 单独添加审核员
        { path: 'check/scalping/checkFindWait', name: 'checkFindWait', component: checkFindWait, meta: { index: '1113' }, beforeEnter: requireAuth },
        { path: 'check/scalping/checkFinding', name: 'checkFinding', component: checkFinding, meta: { index: '1113' }, beforeEnter: requireAuth },
        { path: 'check/scalping/checkFinded', name: 'checkFinded', component: checkFinded, meta: { index: '1113' }, beforeEnter: requireAuth },
        { path: 'check/scalping/checkFindWaitDetail', name: 'checkFindWaitDetail', component: checkFindWaitDetail, meta: { index: '1113' }, beforeEnter: requireAuth },
        { path: 'check/scalping/checkFindingDetail', name: 'checkFindingDetail', component: checkFindingDetail, meta: { index: '1113' }, beforeEnter: requireAuth },
        { path: 'check/scalping/checkFindedDetail', name: 'checkFindedDetail', component: checkFindedDetail, meta: { index: '1113' }, beforeEnter: requireAuth },

        // { path: 'check/scalping/zbnotice', name: 'zbNotice', component: zbNotice, meta: { index: '1112' }, beforeEnter: requireAuth },
        // { path: 'check/scalping/zbnoticeinput', name: 'zbNoticeInput', component: zbNoticeInput, meta: { index: '1112' }, beforeEnter: requireAuth },
        // { path: 'check/scalping/zbnoticedetail', name: 'zbNoticeDetail', component: zbNoticeDetail, meta: { index: '1112' }, beforeEnter: requireAuth },
        // 单独添加数据员换卡头
        { path: 'card/cardManageWait', name: 'cardWait', component: cardWait, meta: { index: '1213' }, beforeEnter: requireAuth },
        { path: 'card/cardManageHad', name: 'cardHad', component: cardHad, meta: { index: '1213' }, beforeEnter: requireAuth },
        { path: 'card/cardManageNot', name: 'cardNot', component: cardNot, meta: { index: '1213' }, beforeEnter: requireAuth },
        { path: 'card/changeCard', name: 'changeCardEdit', component: changeCardEdit, meta: { index: '1213' }, beforeEnter: requireAuth },
        { path: 'card/detail', name: 'cardDetailOfdata', component: cardDetailOfdata, meta: { index: '1213' }, beforeEnter: requireAuth },
        // 商品管理
        { path: 'product/cardList', name: 'productCardList', component: productCardList, meta: { index: '1214' }, beforeEnter: requireAuth },
        { path: 'product/soouyaList', name: 'productSoouyaList', component: productSoouyaList, meta: { index: '1214' }, beforeEnter: requireAuth },
        { path: 'product/detail', name: 'productDetail', component: productDetail, meta: { index: '1214' }, beforeEnter: requireAuth },
        { path: 'product/edit', name: 'productEdit', component: productEdit, meta: { index: '1214' }, beforeEnter: requireAuth },

        // { path: 'find/data/cardmanage', name: 'cardManage', component: CardChangeManage, meta: { index: '1211' }, beforeEnter: requireAuth },
        // { path: 'find/data/cardinput', name: 'cardInput', component: CardChangeInput, meta: { index: '1211' }, beforeEnter: requireAuth },
        // { path: 'find/data/carddetail', name: 'cardDetail', component: CardChangeDetail, meta: { index: '1211' }, beforeEnter: requireAuth },
        // { path: 'find/data/findClothList', name: 'findClothList', component: FindClothList, meta: { index: '1212' }, beforeEnter: requireAuth },
        // { path: 'find/data/findClothDetail', name: 'findClothDetail', component: FindClothDetail, meta: { index: '1212' }, beforeEnter: requireAuth },
        // { path: 'find/data/findSaveOrUpdateCloth', name: 'findSaveOrUpdateCloth', component: FindSaveOrUpdateCloth, meta: { index: '1212' }, beforeEnter: requireAuth },
        {
          path: 'guider/rrRefund/editRefundOrder',
          component: GuiderEditRefundOrder,
          name: 'guiderEditRefundOrder',
          beforeEnter: requireAuth,
          meta: { index: 1033 },
        },
        {
          path: 'guider/rrRefund/rrrefunddetail',
          component: GuiderRrRefundDetail,
          name: 'guiderRrRefundDetail',
          beforeEnter: requireAuth,
          meta: { index: 1033 }
        },
        // 采货员供应商退款路由配置
        {
          path: 'guider/refund',
          beforeEnter: requireAuth,
          component: GuiderShopCompanyIndex,
          name: 'guiderShopCompanyIndex',
          meta: { index: '1040' },
          redirect: 'guider/refund/guidershopcompanyrefunding',
          children: [{
              path: 'guidershopcompanyrefunding',
              component: GuiderShopCompanyRefunding,
              name: 'guidershopcompanyrefunding',
              beforeEnter: requireAuth,
              meta: { index: '1040' },
            },
            {
              path: 'guiderShopCompanyRefunded',
              component: GuiderShopCompanyRefunded,
              name: 'guiderShopCompanyRefunded',
              beforeEnter: requireAuth,
              meta: { index: '1040' },
            }
          ]
        },
        {
          path: 'guider/refund/guiderShopCompanyRefundDetail',
          component: GuiderShopCompanyRefundDetail,
          name: 'guiderShopCompanyRefundDetail',
          beforeEnter: requireAuth,
          meta: { index: '1040' },
        },
        {
          path: 'guider/outputMoney',
          beforeEnter: requireAuth,
          component: GuiderMoneyMangeIndex,
          name: 'guiderMoneyMangeIndex',
          meta: { index: '1041' },
          redirect: 'guider/outputMoney/guiderMoneWaitSubmit',
          children: [{
              path: 'guiderMoneWaitSubmit',
              component: GuiderMoneWaitSubmit,
              name: 'guiderMoneWaitSubmit',
              beforeEnter: requireAuth,
              meta: { index: '1041' },
            },
            {
              path: 'guiderMoneyFinshSubmit',
              component: GuiderMoneyFinshSubmit,
              name: 'guiderMoneyFinshSubmit',
              beforeEnter: requireAuth,
              meta: { index: '1041' },
            },
            {
              path: 'guiderMoneyFinshAccount',
              component: GuiderMoneyFinshAccount,
              name: 'guiderMoneyFinshAccount',
              beforeEnter: requireAuth,
              meta: { index: '1041' },
            }
          ]
        },
        // 欠款记录
        {
          path: 'guider/buyerDebt',
          beforeEnter: requireAuth,
          component: buyerDebt,
          name: 'buyerDebt',
          meta: { index: '1043' },
          redirect: 'guider/buyerDebt/buyerDebtDahuo',
          children: [{
              path: 'buyerDebtDahuo',
              component: buyerDebtDahuo,
              name: 'buyerDebtDahuo',
              beforeEnter: requireAuth,
              meta: { index: '1043' },
            },
            {
              path: 'buyerDebtJianban',
              component: buyerDebtJianban,
              name: 'buyerDebtJianban',
              beforeEnter: requireAuth,
              meta: { index: '1043' },
            }
          ]
        },
        {
          path: 'guider/buyerDebt/debtOfUncleared',
          component: debtOfUncleared,
          name: 'debtOfUncleared',
          beforeEnter: requireAuth,
          meta: { index: '1042' },
        },
        {
          path: 'guider/buyerDebt/debtOfSubmit',
          component: debtOfSubmit,
          name: 'debtOfSubmit',
          beforeEnter: requireAuth,
          meta: { index: '1042' },
        },
        {
          path: 'guider/buyerDebt/debtOfFinish',
          component: debtOfFinish,
          name: 'debtOfFinish',
          beforeEnter: requireAuth,
          meta: { index: '1042' },
        },
        {
          path: 'guider/buyerDebt/debtOfAddBill',
          component: debtOfAddBill,
          name: 'debtOfAddBill',
          beforeEnter: requireAuth,
          meta: { index: '1042' },
        },
        {
          path: 'guider/buyerDebt/debtOfBillDetail',
          component: debtOfBillDetail,
          name: 'debtOfBillDetail',
          beforeEnter: requireAuth,
          meta: { index: '1042' },
        },
        {
          path: 'guider/outputMoney/guiderMoneyMangeDetail',
          component: GuiderMoneyMangeDetail,
          name: 'guiderMoneyMangeDetail',
          beforeEnter: requireAuth,
          meta: { index: '1041' },
        },
        {
          path: 'guider/outputMoney/guiderSubmitChargeView',
          component: GuiderSubmitChargeView,
          name: 'guiderSubmitChargeView',
          beforeEnter: requireAuth,
          meta: { index: '1041' },
        },
        {
          path: 'guider/cloth/guiderClothList',
          beforeEnter: requireAuth,
          component: GuiderClothList,
          name: 'guiderClothList',
          meta: { index: '1051' },
        },
        {
          path: 'guider/cloth/guiderClothDetail',
          beforeEnter: requireAuth,
          component: GuiderClothDetail,
          name: 'guiderClothDetail',
          meta: { index: '1051' }
        },
        {
          path: 'guider/cloth/guiderClothEdit',
          beforeEnter: requireAuth,
          component: GuiderClothEdit,
          name: 'guiderClothEdit',
          meta: { index: '1051' }
        },
      ]
    },
  ]
}
