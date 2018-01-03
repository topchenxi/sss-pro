import auth from '@/utils/auth'
import setCache from '@/utils/setCache'
import request from '@/utils/request'

const Login = resolve => require(['../pages/login/login.vue'], resolve)
// 待删除
const Test = resolve => require(['../pages/login/test.vue'], resolve)
// 微信端路由
const NewIndex = resolve => require(['../pages/weiChat/index.vue'], resolve)
const NewLogin = resolve => require(['../pages/weiChat/newLogin.vue'], resolve)
const Baitiao = resolve => require(['../pages/weiChat/homePages/baitiao.vue'], resolve)
const Pay = resolve => require(['../pages/weiChat/homePages/pay.vue'], resolve)
const SendBulk = resolve => require(['../pages/weiChat/homePages/sendBulk.vue'], resolve)
const MyDebt = resolve => require(['../pages/weiChat/homePages/myDebt.vue'], resolve)
const MyOrder = resolve => require(['../pages/weiChat/homePages/myOrder.vue'], resolve)
// 详情页
const OrderDetail = resolve => require(['../pages/weiChat/detailPages/orderDetail.vue'], resolve)
const AddressList = resolve => require(['../pages/weiChat/detailPages/addressList.vue'], resolve)
const AddAddress = resolve => require(['../pages/weiChat/detailPages/addAddress.vue'], resolve)
const EditAddress = resolve => require(['../pages/weiChat/detailPages/editAddress.vue'], resolve)
const OrderConfirm = resolve => require(['../pages/weiChat/detailPages/orderConfirm.vue'], resolve)
const OrderResult = resolve => require(['../pages/weiChat/detailPages/orderResult.vue'], resolve)
const DebtList = resolve => require(['../pages/weiChat/detailPages/debtList.vue'], resolve)
const DebtDetail = resolve => require(['../pages/weiChat/detailPages/debtDetail.vue'], resolve)
const PayDetail = resolve => require(['../pages/weiChat/detailPages/payDetail.vue'], resolve)
// 订单管理
const orderMgr = resolve => require(['../pages/oms/order/index.vue'], resolve);
const orderOmsDetail = resolve => require(['../pages/oms/order/detail.vue'], resolve);
const orderOmsEdit = resolve => require(['../pages/oms/order/edit.vue'], resolve);
const orderOmPrint = resolve => require(['../pages/oms/order/print.vue'], resolve);
// 客户管理
const customerList = resolve => require(['../pages/oms/customer/index.vue'], resolve);
const debtOrderList = resolve => require(['../pages/oms/customer/debtOrder.vue'], resolve);

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
          path: '/login',
        })
      }
    })
  }
}
// 注意要求以后pc网页任何路由不得包含/index
// 微信端路由必须添加/index
// 否则会引发路由跳转紊乱
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
    component: Login,
  },
  {
    path: '/test',
    name: 'test',
    component: Test,
    beforeEnter: requireAuth,
  },
  // 订单
  {
    path: '/orderMgr',
    name: 'orderMgr',
    component: orderMgr,
  },
  {
    path: '/orderOmsDetail/:id',
    name: 'orderOmsDetail',
    component: orderOmsDetail,
  },
  {
    path: '/orderOmsEdit/:id',
    name: 'orderOmsEdit',
    component: orderOmsEdit,
  },
  {
    path: '/orderOmPrint/:id',
    name: 'orderOmPrint',
    component: orderOmPrint,
  },
  {
    path: '/customerMgr',
    name: 'customerMgr',
    component: customerList,

  },
  {
    path: '/debtOrderList/:id',
    name: 'debtOrderList',
    component: debtOrderList
  },
  // 微信端路由
  {
    path: '/index',
    redirect: '/index/newLogin',
    component: NewIndex,
    children: [{
      path: 'newLogin',
      name: 'newLogin',
      component: NewLogin
    },
    {
      path: 'baitiao',
      name: 'baitiao',
      component: Baitiao
    },
    {
      path: 'pay',
      name: 'pay',
      component: Pay
    },
    {
      path: 'sendBulk',
      name: 'sendBulk',
      component: SendBulk
    },
    {
      path: 'myDebt',
      name: 'myDebt',
      component: MyDebt
    },
    {
      path: 'myOrder',
      name: 'myOrder',
      component: MyOrder
    },
    {
      path: 'orderDetail',
      name: 'orderDetail',
      component: OrderDetail
    },
    {
      path: 'addressList',
      name: 'addressList',
      component: AddressList
    },
    {
      path: 'addAddress',
      name: 'addAddress',
      component: AddAddress
    },
    {
      path: 'editAddress',
      name: 'editAddress',
      component: EditAddress
    },
    {
      path: 'orderConfirm',
      name: 'orderConfirm',
      component: OrderConfirm
    },
    {
      path: 'orderResult',
      name: 'orderResult',
      component: OrderResult
    },
    {
      path: 'debtList',
      name: 'debtList',
      component: DebtList
    },
    {
      path: 'payDetail',
      name: 'payDetail',
      component: PayDetail,
    },
    {
      path: 'debtDetail',
      name: 'debtDetail',
      component: DebtDetail,
    }
    ]
  }
  ]
}
