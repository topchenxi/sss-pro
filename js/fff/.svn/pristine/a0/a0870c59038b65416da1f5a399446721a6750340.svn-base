import auth from './common/auth'
import Parent from './components/layout/Parent.vue'
import PureIndex from './components/layout/pureIndex.vue'

const WxLogin = resolve => require(['./views/common/wxLogin/WxLogin.vue'], resolve)
const Login = resolve => require(['./views/common/login/Login.vue'], resolve)
const PrintDetail = resolve => require(['./views/common/printDetail/PrintDetail.vue'], resolve)
const NewCheckAccount = resolve => require(['./views/finance/checkAccount/newCheckAccount.vue'], resolve)
const CheckAccountMingxi = resolve => require(['./views/finance/checkAccount/checkAccountMingxi.vue'], resolve)
const CheckMingxiPrint = resolve => require(['./views/finance/checkAccount/checkMingxiPrint.vue'], resolve)
// const CheckAccount = resolve => require(['./views/finance/checkAccount/CheckAccount.vue'], resolve)
const WaitingAccount = resolve => require(['./views/finance/checkAccount/WaitingAccount.vue'], resolve)
const CheckAccountDetail = resolve => require(['./views/finance/checkAccount/CheckAccountDetail.vue'], resolve)
const CheckAccountDebtDetail = resolve => require(['./views/finance/checkAccount/CheckAccountDebtDetail.vue'], resolve)
const PendingAccount = resolve => require(['./views/finance/pendingAccount/PendingAccount.vue'], resolve)
const PendingDetail = resolve => require(['./views/finance/pendingAccount/PendingDetail.vue'], resolve)
const PendingList = resolve => require(['./views/finance/pendingAccount/PendingList.vue'], resolve)
const PendingOutline = resolve => require(['./views/finance/pendingAccount/PendingOutline.vue'], resolve)
const PendingPay = resolve => require(['./views/finance/pendingAccount/PendingPay.vue'], resolve)
const PendingPayResult = resolve => require(['./views/finance/pendingAccount/PendingPayResult.vue'], resolve)
const NewReconciliation = resolve => require(['./views/finance/reconciliation/newReconciliation.vue'], resolve)
// const Reconciliation = resolve => require(['./views/finance/reconciliation/reconciliation.vue'], resolve)
const reconciliationDetail = resolve => require(['./views/finance/reconciliation/reconciliationDetail.vue'], resolve)
const reconciliationDebetDetail = resolve => require(['./views/finance/reconciliation/debetDetail.vue'], resolve)
const SplitAccount = resolve => require(['./views/finance/splitAccount/SplitAccount.vue'], resolve)
const SplitAccountDetail = resolve => require(['./views/finance/splitAccount/SplitAccountDetail.vue'], resolve)
const PayTransactionList = resolve => require(['./views/finance/splitAccount/PayTransactionList.vue'], resolve)
// 资金管理
const MoneyRecord = resolve => require(['./views/finance/moneyManage/moneyRecord.vue'], resolve)
const MoneyManage = resolve => require(['./views/finance/moneyManage/moneyManage.vue'], resolve)
const MoneyManageDetail = resolve => require(['./views/finance/moneyManage/moneyManageDetail.vue'], resolve)
// 旧数据处理
const OldDataList = resolve => require(['./views/finance/oldDataResolve/oldDataList.vue'], resolve)
const OldDataDetail = resolve => require(['./views/finance/oldDataResolve/oldDataDetail.vue'], resolve)
// 账单金管理
const BillManage = resolve => require(['./views/finance/billManage/billManage.vue'], resolve)
const BillManageDetail = resolve => require(['./views/finance/billManage/billManageDetail.vue'], resolve)

// 退换货管理
const UnGetAndPayIndex = resolve => require(['./views/exchange/unGetAndPay/Index.vue'], resolve) // 线上收款
const UnGetAndPayDetail = resolve => require(['./views/exchange/unGetAndPay/detail.vue'], resolve) // 线上收款
const UnGetAndPayJbDetail = resolve => require(['./views/exchange/unGetAndPay/jbDetail.vue'], resolve) // 线下销账剪版
const UnGetAndPayYfDetail = resolve => require(['./views/exchange/unGetAndPay/yfDetail.vue'], resolve) // 线下销账运费
const HasPayIndex = resolve => require(['./views/exchange/hasGetAndPay/Index.vue'], resolve) // 已收款
const HasPayDetail = resolve => require(['./views/exchange/hasGetAndPay/detail.vue'], resolve) // 已收款
const HasPayJbDetail = resolve => require(['./views/exchange/hasGetAndPay/jbDetail.vue'], resolve) // 已销账-剪版
const HasPayYfDetail = resolve => require(['./views/exchange/hasGetAndPay/yfDetail.vue'], resolve) // 已销账-运费
// 进销存管理
const BaoBiaoDown = resolve => require(['./views/cangKu/baoBiao/baoBiaoDown.vue'], resolve)
const OldCheckAccount = resolve => require(['./views/finance/oldCheckAccount/CheckAccount.vue'], resolve)
// 欠款
const Debt = resolve => require(['./views/finance/debt/index.vue'], resolve)
const DebtDone = resolve => require(['./views/finance/debt/done/index.vue'], resolve)
const DebtUndone = resolve => require(['./views/finance/debt/undone/index.vue'], resolve)
const debetDetail = resolve => require(['./views/finance/debt/debetDetail.vue'], resolve)
// 退换货
const Exchange = resolve => require(['./views/finance/exchange/index.vue'], resolve)
const DoneExchange = resolve => require(['./views/finance/exchange/done/index.vue'], resolve)
const UndoneExchange = resolve => require(['./views/finance/exchange/undone/index.vue'], resolve)
const ExchangeDetails = resolve => require(['./views/finance/exchange/details.vue'], resolve)
// 扣数单
const Deduction = resolve => require(['./views/finance/deduction/index.vue'], resolve)
const DoneDeduction = resolve => require(['./views/finance/deduction/done/index.vue'], resolve)
const UndoneDeduction = resolve => require(['./views/finance/deduction/undone/index.vue'], resolve)
const DetailsDeduction = resolve => require(['./views/finance/deduction/details/index.vue'], resolve)
// 白条
const Loan = resolve => require(['./views/baitiao/loan/index.vue'], resolve)
const LoanExportTo = resolve => require(['./views/baitiao/loan/exportTo/exportTo.vue'], resolve)
const LoanExportDone = resolve => require(['./views/baitiao/loan/exportDone/exportDone.vue'], resolve)
const Repayment = resolve => require(['./views/baitiao/repayment/index.vue'], resolve)
const RepaymentListTo = resolve => require(['./views/baitiao/repayment/listTo/repaymentListTo.vue'], resolve)
const RepaymentListDone = resolve => require(['./views/baitiao/repayment/listDone/repaymentListDone.vue'], resolve)
// 白条手机端
const BaitiaoApply = resolve => require(['./views/baitiao/apply.vue'], resolve)
const BaitiaoContract = resolve => require(['./views/baitiao/contract.vue'], resolve)
const BaitiaoAdvanceContract = resolve => require(['./views/baitiao/advanceContract'], resolve)
const NewBaitiaoContract = resolve => require(['./views/baitiao/newBaitiaocontract'], resolve)
const YanzhenContract = resolve => require(['./views/baitiao/yanzhenContract'], resolve)
// 报销
// const Reimburse = resolve => require(['./views/reimburse/index.vue'], resolve)
const CutReimburse = resolve => require(['./views/reimburse/cut/index.vue'], resolve)
const DoneCutReimburse = resolve => require(['./views/reimburse/cut/done/index.vue'], resolve)
const UndoneCutReimburse = resolve => require(['./views/reimburse/cut/undone/index.vue'], resolve)
const FreightReimburse = resolve => require(['./views/reimburse/freight/index.vue'], resolve)
const DoneFreightReimburse = resolve => require(['./views/reimburse/freight/done/index.vue'], resolve)
const UndoneFreightReimburse = resolve => require(['./views/reimburse/freight/undone/index.vue'], resolve)
const FreightReimburseDetails = resolve => require(['./views/reimburse/freight/details.vue'], resolve)
const CutReimburseDetails = resolve => require(['./views/reimburse/cut/details.vue'], resolve)
// 已付应收报表
// const DaHuoReports = resolve => require(['./views/orderManage/dahuoReports.vue'], resolve)
const NewBulkReport = resolve => require(['./views/orderManage/newBulkReport.vue'], resolve)
const JianBanReports = resolve => require(['./views/orderManage/jianbanReports.vue'], resolve)
const CustomerPay = resolve => require(['./views/orderManage/customerPay.vue'], resolve)
const DebtOrder = resolve => require(['./views/orderManage/debtOrder.vue'], resolve)
const CustomerPayDetail = resolve => require(['./views/orderManage/customerPayDetail.vue'], resolve)
const ExchangeOrder = resolve => require(['./views/orderManage/exchangeOrder.vue'], resolve)
const ExchangeOrderDetail = resolve => require(['./views/orderManage/exchangeOrderDetail.vue'], resolve)
// 供应链金融
const Shop = resolve => require(['./views/baitiao/shop/index.vue'], resolve)
const ShopLoan = resolve => require(['./views/baitiao/shop/shopLoan.vue'], resolve)
const ShopInterest = resolve => require(['./views/baitiao/shop/shopInterest.vue'], resolve)
const ShopAll = resolve => require(['./views/baitiao/shop/shopAll.vue'], resolve)

function requireAuth(route, redirect, next) {
  new Promise(function (resolve, reject) {
    auth.loggedIn(resolve, reject)
  }).then(function (value) {
    // success
    next()
  }, function (value) {
    // failure
    next({
      path: '/common/login',
      query: {
        redirect: route.fullPath
      }
    })
  })
}
export const route = {
  mode: 'history',
  saveScrollPosition: true,
  base: __dirname,
  routes: [{
    path: '/',
    redirect: '/finance/pendingAccount',
    beforeEnter: requireAuth
  }, {
    path: '/common',
    component: PureIndex,
    children: [{
      path: 'login',
      component: Login
    }, {
      path: 'wxlogin',
      component: WxLogin
    }, {
      path: 'printDetail/:orderNumber',
      component: PrintDetail,
      beforeEnter: requireAuth
    }, {
      path: 'print/checkMingxiPrint',
      name: 'checkMingxiPrint',
      component: CheckMingxiPrint,
      beforeEnter: requireAuth,
    }]
  }, {
    path: '/finance',
    component: Parent,
    beforeEnter: requireAuth,
    children: [{
      path: 'pendingAccount',
      component: PendingAccount,
      meta: {
        index: '1-1',
        keepAlive: true
      }
    }, {
      path: 'pendingAccount/detail/:id',
      component: PendingDetail,
      meta: {
        index: '1-1'
      }
    }, {
      path: 'pendingAccount/list/:id',
      component: PendingList,
      meta: {
        index: '1-1'
      }
    }, {
      path: 'pendingAccount/payOutline/:id',
      component: PendingOutline,
      meta: {
        index: '1-1'
      }
    }, {
      path: 'pendingAccount/pay/:batchNo',
      component: PendingPay,
      meta: {
        index: '1-1'
      }
    }, {
      path: 'pendingAccount/payResult',
      component: PendingPayResult,
      meta: {
        index: '1-1'
      }
    },
    // {
    //   path: 'checkAccount',
    //   component: CheckAccount,
    //   meta: {
    //     index: '1-2',
    //     keepAlive: true
    //   }
    // },
    {
      path: 'newCheckAccount',
      component: NewCheckAccount,
      meta: {
        index: '1-2',
        keepAlive: true
      }
    },
    {
      path: 'checkAccountMingxi',
      component: CheckAccountMingxi,
      name: 'checkAccountMingxi',
      meta: {
        index: '1-2',
        keepAlive: true
      }
    },
    {
      path: 'oldCheckAccount',
      component: OldCheckAccount,
      meta: {
        index: '1-2',
        keepAlive: true
      }
    },
    {
      path: 'checkAccount/WaitingAccount',
      component: WaitingAccount,
      meta: {
        index: '1-2'
      }
    }, {
      path: 'checkAccount/detail',
      component: CheckAccountDetail,
      name: 'checkAccountDetail',
      meta: {
        index: '1-2'
      }
    }, {
      path: 'checkAccount/debtDetail',
      component: CheckAccountDebtDetail,
      meta: {
        index: '1-3'
      }
    },
    {
      path: 'debt',
      component: Debt,
      redirect: '/finance/debt/undone',
      meta: {
        index: '1-3'
      },
      children: [
        {
          path: 'done',
          component: DebtDone,
          name: 'doneDebt',
          meta: {
            index: '1-3'
          }
        },
        {
          path: 'undone',
          component: DebtUndone,
          name: 'undoneDebt',
          meta: {
            index: '1-3'
          }
        },
        {
          path: 'debetDetail/:id',
          component: debetDetail,
          name: 'debetDetail',
          meta: {
            index: '1-3'
          }
        }
      ]
    },
    {
      path: 'exchange',
      component: Exchange,
      redirect: '/finance/exchange/undone',
      meta: {
        index: '1-4'
      },
      children: [
        {
          path: 'done',
          component: DoneExchange,
          name: 'doneExchange',
          meta: {
            index: '1-4'
          },
        },
        {
          path: 'undone',
          component: UndoneExchange,
          name: 'undoneExchange',
          meta: {
            index: '1-4'
          },
        },
        {
          path: 'details/:status',
          component: ExchangeDetails,
          name: 'exchangeDetails',
          meta: {
            index: '1-4'
          }
        }
      ]
    },
    {
      path: 'deduction',
      component: Deduction,
      redirect: '/finance/deduction/undone',
      meta: {
        index: '1-5'
      },
      children: [
        {
          path: 'done',
          component: DoneDeduction,
          name: 'doneDeduction',
          meta: {
            index: '1-5'
          },
        },
        {
          path: 'undone',
          component: UndoneDeduction,
          name: 'undoneDeduction',
          meta: {
            index: '1-5'
          },
        },
        {
          path: 'details/:status',
          component: DetailsDeduction,
          name: 'detailsDeduction',
          meta: {
            index: '1-5'
          }
        }
      ]
    },
    {
      path: 'splitAccount',
      component: SplitAccount,
      meta: {
        index: '1-1',
        keepAlive: true
      }
    }, {
      path: 'splitAccount/detail/:id',
      component: SplitAccountDetail,
      meta: {
        index: '1-1'
      }
    }, {
      path: 'splitAccount/list',
      component: PayTransactionList,
      meta: {
        index: '1-1',
        keepAlive: true
      }
    },
    {
      path: 'newreconciliation',
      component: NewReconciliation,
      meta: {
        index: '1-2',
        keepAlive: true
      }
    },
    // {
    //   path: 'reconciliation',
    //   component: Reconciliation,
    //   meta: {
    //     index: '1-2',
    //     keepAlive: true
    //   }
    // },
    {
      path: 'reconciliation/detail/:id',
      component: reconciliationDetail,
      meta: {
        index: '1-2'
      }
    }, {
      path: 'reconciliation/debetDetail/:id',
      component: reconciliationDebetDetail,
      meta: {
        index: '1-3'
      }
    }, {
      path: 'moneyManage',
      component: MoneyManage,
      name: 'moneyManage',
      meta: {
        index: '1-6',
        keepAlive: true
      }
    }, {
      path: 'moneyRecord',
      component: MoneyRecord,
      name: 'moneyRecord',
      meta: {
        index: '1-6',
        keepAlive: true
      }
    }, {
      path: 'moneyManage/moneyManageDetail',
      component: MoneyManageDetail,
      name: 'moneyManageDetail',
      meta: {
        index: '1-6'
      }
    }, {
      path: 'billManage',
      component: BillManage,
      name: 'billManage',
      meta: {
        index: '1-7',
        keepAlive: true
      }
    }, {
      path: 'billManage/billManageDetail',
      component: BillManageDetail,
      name: 'billManageDetail',
      meta: {
        index: '1-7'
      }
    }, {
      path: 'oldData/oldDataList',
      component: OldDataList,
      name: 'oldDataList',
      meta: {
        index: '1-8'
      }
    }, {
      path: 'oldData/oldDataDetail',
      component: OldDataDetail,
      name: 'oldDataDetail',
      meta: {
        index: '1-8'
      }
    }
    ]
  },
  {
    path: '/reimburse',
    redirect: '/reimburse/cut/undone',
    beforeEnter: requireAuth,
    component: Parent,
    meta: {
      index: '2',
    },
    children: [
      {
        path: 'cut',
        redirect: '/reimburse/cut/undone',
        component: CutReimburse,
        meta: {
          index: '2-1',
        },
        children: [
          {
            path: 'done',
            name: 'doneCutReimburse',
            component: DoneCutReimburse,
            meta: {
              index: '2-1',
            },
          },
          {
            path: 'undone',
            name: 'undoneCutReimburse',
            component: UndoneCutReimburse,
            meta: {
              index: '2-1',
            },
          }
        ]
      },
      {
        path: 'freight',
        redirect: '/reimburse/freight/undone',
        component: FreightReimburse,
        meta: {
          index: '2-2',
        },
        children: [
          {
            path: 'done',
            name: 'doneFreightReimburse',
            component: DoneFreightReimburse,
            meta: {
              index: '2-2',
            },
          },
          {
            path: 'undone',
            name: 'undoneFreightReimburse',
            component: UndoneFreightReimburse,
            meta: {
              index: '2-2',
            },
          }
        ]
      },
      {
        path: 'cut/details/:status',
        component: CutReimburseDetails,
        name: 'cutReimburseDetails',
        meta: {
          index: '2-1',
        },
      },
      {
        path: 'freight/details/:status',
        component: FreightReimburseDetails,
        name: 'freightReimburseDetails',
        meta: {
          index: '2-2',
        },
      }
    ],
  },
  {
    path: '/exchange',
    component: Parent,
    beforeEnter: requireAuth,
    children: [{
      path: 'unGetAndPay',
      component: UnGetAndPayIndex,
      meta: {
        index: '8'
      }
    }, {
      path: 'unGetAndPay/detail',
      component: UnGetAndPayDetail,
      meta: {
        index: '8'
      }
    }, {
      path: 'unGetAndPay/jbDetail',
      component: UnGetAndPayJbDetail,
      meta: {
        index: '8'
      }
    }, {
      path: 'unGetAndPay/yfDetail',
      component: UnGetAndPayYfDetail,
      meta: {
        index: '8'
      }
    }, {
      path: 'hasGetAndPay',
      component: HasPayIndex,
      meta: {
        index: '9'
      }
    }, {
      path: 'hasGetAndPay/detail',
      component: HasPayDetail,
      meta: {
        index: '9'
      }
    }, {
      path: 'hasGetAndPay/jbDetail',
      component: HasPayJbDetail,
      meta: {
        index: '9'
      }
    }, {
      path: 'hasGetAndPay/yfDetail',
      component: HasPayYfDetail,
      meta: {
        index: '9'
      }
    }]
  }, {
    path: '/cangKu',
    component: Parent,
    beforeEnter: requireAuth,
    children: [{
      path: 'baoBiaoDown',
      component: BaoBiaoDown,
      meta: {
        index: '10'
      }
    }]
  },
  {
    path: '/orderManage',
    component: Parent,
    redirect: '/orderManage/dahuoReports',
    meta: {
      index: '3'
    },
    children: [
      // {
      //   path: 'dahuoReports',
      //   component: DaHuoReports,
      //   name: 'dahuoReports',
      //   meta: {
      //     index: '3-1'
      //   }
      // },
      {
        path: 'newBulkReport',
        component: NewBulkReport,
        name: 'newBulkReport',
        meta: {
          index: '3-1'
        }
      },
      {
        path: 'jianbanReports',
        component: JianBanReports,
        name: 'jianbanReports',
        meta: {
          index: '3-1'
        },
      },
      {
        path: 'customerPay',
        component: CustomerPay,
        name: 'customerPay',
        meta: {
          index: '3-3'
        }
      },
      {
        path: 'debtOrder',
        component: DebtOrder,
        name: 'debtOrder',
        meta: {
          index: '3-7'
        }
      },
      {
        path: 'customerPayDetail',
        component: CustomerPayDetail,
        name: 'customerPayDetail',
        meta: {
          index: '3-3'
        }
      },
      {
        path: 'exchangeOrder',
        component: ExchangeOrder,
        name: 'exchangeOrder',
        meta: {
          index: '3-4'
        }
      },
      {
        path: 'exchangeOrderDetail',
        component: ExchangeOrderDetail,
        name: 'exchangeOrderDetail',
        meta: {
          index: '3-4'
        }
      },
    ]
  },
  // 手机页面->支用申请
  {
    path: '/baitiao/apply',
    name: 'baitiaoApply',
    component: BaitiaoApply,
    meta: {
      index: '6 ',
    }
  },
  // 手机页面->借款合同
  {
    path: '/baitiao/contract',
    name: 'BaitiaoContract',
    component: BaitiaoContract,
    meta: {
      index: '6'
    }
  },
  {
    path: '/baitiao/yanzhenContract',
    name: 'yanzhenContract',
    component: YanzhenContract,
    meta: {
      index: '6'
    }
  },
  {
    path: '/baitiao/advanceContract',
    name: 'BaitiaoAdvanceContract',
    component: BaitiaoAdvanceContract,
    meta: {
      index: '6'
    }
  },
  {
    path: '/baitiao/newBaitiaoContract',
    name: 'newBaitiaoContract',
    component: NewBaitiaoContract,
    meta: {
      index: '6'
    }
  },
  // 白条
  {
    path: '/baitiao',
    redirect: '/baitiao/loan/loanexportto',
    beforeEnter: requireAuth,
    component: Parent,
    meta: {
      index: '4'
    },
    children: [
      {
        path: 'shop',
        redirect: '/baitiao/shop/loan',
        component: Shop,
        meta: {
          index: '4-4'
        },
        children: [
          {
            path: 'shopLoan',
            name: 'shopLoan',
            component: ShopLoan,
            meta: {
              index: '4-4'
            }
          },
          {
            path: 'shopInterest',
            name: 'shopInterest',
            component: ShopInterest,
            meta: {
              index: '4-4'
            }
          },
          {
            path: 'shopAll',
            name: 'shopAll',
            component: ShopAll,
            meta: {
              index: '4-4'
            }
          }
        ]
      },
      {
        path: 'loan',
        redirect: '/baitiao/loan/loanexportto',
        component: Loan,
        meta: {
          index: '4-1'
        },
        children: [
          {
            path: 'loanexportto',
            name: 'loanExportTo',
            component: LoanExportTo,
            meta: {
              index: '4-1'
            }
          },
          {
            path: 'loanexportdone',
            name: 'loanExportDone',
            component: LoanExportDone,
            meta: {
              index: '4-1'
            }
          }
        ]
      },
      {
        path: 'repayment',
        redirect: '/baitiao/repayment/repaymentlistto',
        component: Repayment,
        meta: {
          index: '4-2'
        },
        children: [
          {
            path: 'repaymentlistto',
            name: 'repaymentListTo',
            component: RepaymentListTo,
            meta: {
              index: '4-2'
            }
          },
          {
            path: 'repaymentlistdone',
            name: 'repaymentListDone',
            component: RepaymentListDone,
            meta: {
              index: '4-2'
            }
          }
        ]
      }
    ]
  },
  ]
}
