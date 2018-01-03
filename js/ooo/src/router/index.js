import auth from '@/utils/auth'
import setCache from '@/utils/setCache'
import request from '@/utils/request'

const Login = resolve => require(['../pages/login/login.vue'], resolve)
const Layout = resolve => require(['../components/layout/layout.vue'], resolve)
// 老版本界面
// const FindOrderList = resolve => require(['../pages/find/list.vue'], resolve)
// const FndTransform = resolve => require(['../pages/find/findTransform.vue'], resolve)
// const BulkOrderList = resolve => require(['../pages/bulk/order/list.vue'], resolve)
// const BulkReport = resolve => require(['../pages/bulk/order/report.vue'], resolve)
// const BulkOrderDetail = resolve => require(['../pages/bulk/order/detail.vue'], resolve)
// const ZiyingCutEdit = resolve => require(['../pages/ziying/cut/edit.vue'], resolve)
// const ZiyingCutList = resolve => require(['../pages/ziying/cut/list.vue'], resolve)
// const ZiyingCutDetail = resolve => require(['../pages/ziying/cut/detail.vue'], resolve)
// const buyerDebtBulk = resolve => require(['../pages/buyerDebt/bulk.vue'], resolve)
// const buyerDebtCut = resolve => require(['../pages/buyerDebt/cut.vue'], resolve)
const QuoteTable = resolve => require(['../pages/bulk/order/quoteTable.vue'], resolve)
const SalesTable = resolve => require(['../pages/bulk/order/salesTable.vue'], resolve)

// 20171121UI更新 + 代码重构
const FindAll = resolve => require(['../pages/find/findList/tabs/findAll.vue'], resolve)
const Finding = resolve => require(['../pages/find/findList/tabs/finding.vue'], resolve)
const Sending = resolve => require(['../pages/find/findList/tabs/sending.vue'], resolve)
const FindTransRate = resolve => require(['../pages/find/findTransRate/findTransRate.vue'], resolve)
const CutAll = resolve => require(['../pages/cut/cutManage/tabs/cutAll.vue'], resolve)
const Cuting = resolve => require(['../pages/cut/cutManage/tabs/cuting.vue'], resolve)
const CutSending = resolve => require(['../pages/cut/cutManage/tabs/cutSending.vue'], resolve)
const CutChecking = resolve => require(['../pages/cut/cutManage/tabs/cutChecking.vue'], resolve)
const CutReimburse = resolve => require(['../pages/cut/cutManage/tabs/cutReimburse.vue'], resolve)
const CutDebt = resolve => require(['../pages/cut/cutManage/tabs/cutDebt.vue'], resolve)
const CutDetail = resolve => require(['../pages/cut/cutManage/cutDetail.vue'], resolve)
const CutEdit = resolve => require(['../pages/cut/cutManage/cutEdit.vue'], resolve)
const BulkOrder = resolve => require(['../pages/bulk/bulkManage/tabs/bulkOrder.vue'], resolve)
const BulkPaying = resolve => require(['../pages/bulk/bulkManage/tabs/bulkPaying.vue'], resolve)
const BulkToSubmitPay = resolve => require(['../pages/bulk/bulkManage/tabs/bulkToSubmitPay.vue'], resolve)
const BulkToPay = resolve => require(['../pages/bulk/bulkManage/tabs/bulkToPay.vue'], resolve)
const BulkWaitCheck = resolve => require(['../pages/bulk/bulkManage/tabs/bulkWaitCheck.vue'], resolve)
const BulkHadChecked = resolve => require(['../pages/bulk/bulkManage/tabs/bulkHadChecked.vue'], resolve)
const BulkPicking = resolve => require(['../pages/bulk/bulkManage/tabs/bulkPicking.vue'], resolve)
const BulkInspecting = resolve => require(['../pages/bulk/bulkManage/tabs/bulkInspecting.vue'], resolve)
const BulkSending = resolve => require(['../pages/bulk/bulkManage/tabs/bulkSending.vue'], resolve)
const BulkRRing = resolve => require(['../pages/bulk/bulkManage/tabs/bulkRRing.vue'], resolve)
const BulkRefund = resolve => require(['../pages/bulk/bulkManage/tabs/bulkRefund.vue'], resolve)
const BulkAll = resolve => require(['../pages/bulk/bulkManage/tabs/bulkAll.vue'], resolve)
const BulkDetail = resolve => require(['../pages/bulk/bulkManage/bulkDetail.vue'], resolve)

function requireAuth(to, from, next) {
  if (auth.loggedIn()) {
    next()
  } else {
    // 解决从其它系统跳转进来未登录问题
    request(`/redwood/sys/Seed/getCurrentUser.do`, {
      method: 'GET'
    }).then((response) => {
      if (response.success === '1') {
        setCache({
          key: 'currentUser',
          value: response.loginInfo
        })
        next()
        return
      } else {
        next({
          path: '/login'
        })
      }
    })
  }
}

export default {
  mode: 'history',
  saveScrollPosition: true,
  base: __dirname,
  routes: [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/quoteTable',
    name: 'bulkQuoteTable',
    meta: { index: '3', keepAlive: true },
    component: QuoteTable
  },
  {
    path: '/salesTable',
    name: 'bulkSalesTable',
    meta: { index: '3', keepAlive: true },
    component: SalesTable
  },
  {
    path: '/find',
    component: Layout,
    beforeEnter: requireAuth,
    children: [
      // {
      //   path: 'list',
      //   name: 'findOrderList',
      //   meta: { index: '5', keepAlive: true },
      //   component: FindOrderList
      // },
      // {
      //   path: 'transform',
      //   name: 'fndTransform',
      //   meta: { index: '6', keepAlive: true },
      //   component: FndTransform
      // },
      {
        path: 'findAll',
        name: 'findAll',
        meta: { index: '5', keepAlive: true },
        component: FindAll,
      },
      {
        path: 'finding',
        name: 'finding',
        meta: { index: '5', keepAlive: true },
        component: Finding,
      },
      {
        path: 'sending',
        name: 'sending',
        meta: { index: '5', keepAlive: true },
        component: Sending,
      },
      {
        path: 'findTransRate',
        name: 'findTransRate',
        meta: { index: '6', keepAlive: true },
        component: FindTransRate
      }
    ]
  },
  {
    path: '/bulk',
    component: Layout,
    beforeEnter: requireAuth,
    children: [
      // {
      //   path: 'order/list',
      //   name: 'bulkOrderList',
      //   meta: { index: '3', keepAlive: true },
      //   component: BulkOrderList
      // },
      // {
      //   path: 'order/report',
      //   name: 'bulkOrderReport',
      //   meta: { index: '3', keepAlive: true },
      //   component: BulkReport
      // },
      // 新路由
      {
        path: 'order/bulkOrder',
        name: 'bulkOrder',
        meta: { index: '3', keepAlive: true },
        component: BulkOrder
      },
      {
        path: 'order/bulkPaying',
        name: 'bulkPaying',
        meta: { index: '3', keepAlive: true },
        component: BulkPaying
      },
      {
        path: 'order/bulkToSubmitPay',
        name: 'bulkToSubmitPay',
        meta: { index: '3', keepAlive: true },
        component: BulkToSubmitPay
      },
      {
        path: 'order/bulkToPay',
        name: 'bulkToPay',
        meta: { index: '3', keepAlive: true },
        component: BulkToPay
      },
      {
        path: 'order/bulkWaitCheck',
        name: 'bulkWaitCheck',
        meta: { index: '3', keepAlive: true },
        component: BulkWaitCheck
      },
      {
        path: 'order/bulkHadChecked',
        name: 'bulkHadChecked',
        meta: { index: '3', keepAlive: true },
        component: BulkHadChecked
      },
      {
        path: 'order/bulkPicking',
        name: 'bulkPicking',
        meta: { index: '3', keepAlive: true },
        component: BulkPicking
      },
      {
        path: 'order/bulkInspecting',
        name: 'bulkInspecting',
        meta: { index: '3', keepAlive: true },
        component: BulkInspecting
      },
      {
        path: 'order/bulkSending',
        name: 'bulkSending',
        meta: { index: '3', keepAlive: true },
        component: BulkSending
      },
      {
        path: 'order/bulkRRing',
        name: 'bulkRRing',
        meta: { index: '3', keepAlive: true },
        component: BulkRRing
      },
      {
        path: 'order/bulkRefund',
        name: 'bulkRefund',
        meta: { index: '3', keepAlive: true },
        component: BulkRefund
      },
      {
        path: 'order/bulkAll',
        name: 'bulkAll',
        meta: { index: '3', keepAlive: true },
        component: BulkAll
      },
      {
        path: 'order/bulkDetail',
        name: 'bulkDetail',
        meta: { index: '3', keepAlive: true },
        component: BulkDetail
      },
      // 新路由end
      // {
      //   path: 'order/detail',
      //   name: 'bulkOrderDetail',
      //   meta: { index: '3', keepAlive: true },
      //   component: BulkOrderDetail
      // },
    ]
  },
  {
    path: '/ziying/cut',
    component: Layout,
    beforeEnter: requireAuth,
    children: [
      // {
      //   path: 'list',
      //   name: 'ziyingCutList',
      //   meta: { index: '4', keepAlive: true },
      //   component: ZiyingCutList
      // },
      // {
      //   path: 'edit',
      //   name: 'ziyingCutEdit',
      //   meta: { index: '4', keepAlive: true },
      //   component: ZiyingCutEdit
      // },
      // {
      //   path: 'detail',
      //   name: 'ziyingCutDetail',
      //   meta: { index: '4', keepAlive: true },
      //   component: ZiyingCutDetail
      // },
      {
        path: 'cutAll',
        name: 'cutAll',
        meta: { index: '4', keepAlive: true },
        component: CutAll
      },
      {
        path: 'cuting',
        name: 'cuting',
        meta: { index: '4', keepAlive: true },
        component: Cuting
      },
      {
        path: 'cutSending',
        name: 'cutSending',
        meta: { index: '4', keepAlive: true },
        component: CutSending
      },
      {
        path: 'cutChecking',
        name: 'cutChecking',
        meta: { index: '4', keepAlive: true },
        component: CutChecking
      },
      {
        path: 'cutReimburse',
        name: 'cutReimburse',
        meta: { index: '4', keepAlive: true },
        component: CutReimburse
      },
      {
        path: 'cutDebt',
        name: 'cutDebt',
        meta: { index: '4', keepAlive: true },
        component: CutDebt
      },
      {
        path: 'cutDetail',
        name: 'cutDetail',
        meta: { index: '4', keepAlive: true },
        component: CutDetail
      },
      {
        path: 'cutEdit',
        name: 'cutEdit',
        meta: { index: '4', keepAlive: true },
        component: CutEdit
      },
    ]
  },
    // 欠款记录
    // {
    //   path: '/buyerDebt',
    //   component: Layout,
    //   beforeEnter: requireAuth,
    //   children: [{
    //     path: 'buyerDebtBulk',
    //     component: buyerDebtBulk,
    //     name: 'buyerDebtBulk',
    //     meta: { index: '7', keepAlive: true },
    //   },
    //   {
    //     path: 'buyerDebtCut',
    //     component: buyerDebtCut,
    //     name: 'buyerDebtCut',
    //     meta: { index: '7', keepAlive: true },
    //   }
    //   ]
    // },
  ]
}
