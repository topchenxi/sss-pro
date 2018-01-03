import auth from './common/auth'
import Parent from './components/layout/Parent.vue'
import PureIndex from './components/layout/pureIndex.vue'

const WxLogin = resolve => require(['./views/common/wxLogin/WxLogin.vue'], resolve)
const Login = resolve => require(['./views/common/login/Login.vue'], resolve)
const PrintDetail = resolve => require(['./views/common/printDetail/PrintDetail.vue'], resolve)
// 团队管理模块
const UserManage = resolve => require(['./views/team/user/userManage.vue'], resolve)
const RoleManage = resolve => require(['./views/team/role/roleManage.vue'], resolve)
// 报表管理 - 绩效管理
const JixiaoManage = resolve => require(['./views/report/jixiao/jixiaoManage.vue'], resolve);
const DhOrderManage = resolve => require(['./views/report/dahuo/dahuoManage.vue'], resolve);
const moneyManage = resolve => require(['./views/report/moneyManage/index.vue'], resolve)
// 商户管理
const BuyerList = resolve => require(['./views/merchant/buyer/list.vue'], resolve)
const BuyerDetails = resolve => require(['./views/merchant/buyer/details.vue'], resolve)
const BillDetails = resolve => require(['./views/merchant/buyer/billDetails.vue'], resolve)

const checkList = resolve => require(['./views/shop/checkList.vue'], resolve)
const customerList = resolve => require(['./views/customer/list.vue'], resolve)
const customerDetail = resolve => require(['./views/customer/detail.vue'], resolve)
const customerSave = resolve => require(['./views/customer/save.vue'], resolve)

const sellerList = resolve => require(['./views/seller/list.vue'], resolve)
const sellerDetail = resolve => require(['./views/seller/detail.vue'], resolve)
const sellerSave = resolve => require(['./views/seller/save.vue'], resolve)

const code = resolve => require(['./views/outbox/code.vue'], resolve)
// const EditBuyer = resolve => require(['./views/merchant/buyer/editBuyer.vue'], resolve)
/* import WxLogin from './views/common/wxLogin/WxLogin.vue'
import Login from './views/common/login/Login.vue'
*/
// If using Webpack 2, you can also do:
// const Foo = resolve => System.import('./Foo.vue'], resolve).then(resolve)

// 订单审核
// const Audit = resolve => require(['views/audit/index.vue'], resolve)
const AuditCutList = resolve => require(['views/audit/cut/list.vue'], resolve)
const AuditBulkList = resolve => require(['views/audit/bulk/list.vue'], resolve)
const AuditFindList = resolve => require(['views/audit/find/list.vue'], resolve)
const AuditCutDetails = resolve => require(['views/audit/cut/details.vue'], resolve)
const AuditBulkDetails = resolve => require(['views/audit/bulk/details.vue'], resolve)
const AuditFindDetails = resolve => require(['views/audit/find/details.vue'], resolve)

function requireAuth(route, redirect, next) {
  new Promise(function(resolve, reject) {
    auth.loggedIn(resolve, reject)
  }).then(function(value) {
    // success
    next()
  }, function(value) {
    // failure
    next({
      path: '/common/login',
      query: { redirect: route.fullPath }
    })
  })
}
export const route = {
  mode: 'history',
  saveScrollPosition: true,
  base: __dirname,
  routes: [
    { path: '/', redirect: '/team/userManage', beforeEnter: requireAuth },
    {
      path: '/common',
      component: PureIndex,
      children: [
        { path: 'login', component: Login },
        { path: 'wxlogin', component: WxLogin },
        { path: 'printDetail/:orderNumber', component: PrintDetail, beforeEnter: requireAuth },
      ]
    },
    {
      path: '/team',
      component: Parent,
      beforeEnter: requireAuth,
      children: [{
          path: 'userManage',
          component: UserManage,
          meta: { index: '0', keepAlive: true }
        },
        {
          path: 'roleManage',
          component: RoleManage,
          meta: { index: '1', keepAlive: true }
        }
      ]
    },
    {
      path: '/customer',
      component: Parent,
      beforeEnter: requireAuth,
      children: [{
          path: 'list',
          component: customerList,
          meta: { index: '5-2', keepAlive: true }
        },
        {
          path: 'save',
          component: customerSave,
          meta: { index: '5-2', keepAlive: true }
        },
        {
          path: 'detail',
          component: customerDetail,
          meta: { index: '5-2', keepAlive: true }
        }
      ]
    },
    {
      path: '/seller',
      component: Parent,
      beforeEnter: requireAuth,
      children: [{
          path: 'list',
          component: sellerList,
          meta: { index: '6-2', keepAlive: true }
        },
        {
          path: 'save',
          component: sellerSave,
          meta: { index: '6-2', keepAlive: true }
        },
        {
          path: 'detail',
          component: sellerDetail,
          meta: { index: '6-2', keepAlive: true }
        }
      ]
    },
    {
      path: '/shop',
      component: Parent,
      beforeEnter: requireAuth,
      children: [{
        path: 'checkList',
        component: checkList,
        meta: { index: '6', keepAlive: true }
      }]
    },
    {
      path: '/report',
      component: Parent,
      beforeEnter: requireAuth,
      children: [{
          path: 'jixiaoManage',
          component: JixiaoManage,
          meta: { index: '2', keepAlive: true }
        },
        {
          path: 'dahuoManage',
          component: DhOrderManage,
          meta: { index: '3', keepAlive: true }
        },
        {
          path: 'moneyManage',
          component: moneyManage,
          meta: { index: '2-1', keepAlive: true }
        }
      ]
    },
    {
      path: '/merchant',
      component: Parent,
      children: [{
          path: 'buyer/list',
          component: BuyerList,
          meta: { index: '5', keepAlive: true }
        },
        {
          path: 'buyer/details/id/:id',
          component: BuyerDetails,
          meta: { index: '5', keepAlive: true }
        },
        {
          path: 'bill/details/customerId=:customerId&billId=:billId&billTimeEnd=:billTimeEnd',
          name: 'billDetails',
          component: BillDetails,
          meta: { index: '5', keepAlive: true }
        },
        // {
        //   path: 'buyer/editBuyer/:customerId',
        //   name: 'editBuyer',
        //   component: EditBuyer,
        //   meta: { index: '5', keepAlive: true }
        // }
      ]
    },
    {
      path: '/audit',
      name: 'audit',
      component: Parent,
      beforeEnter: requireAuth,
      meta: { index: '4' },
      redirect: 'audit/cut/list',
      children: [
        { path: 'cut/list', name: 'auditCutList', component: AuditCutList, beforeEnter: requireAuth, meta: { index: '4-3' } },
        { path: 'bulk/list', name: 'auditBulkList', component: AuditBulkList, beforeEnter: requireAuth, meta: { index: '4-3' } },
        { path: 'find/list', name: 'auditFindList', component: AuditFindList, beforeEnter: requireAuth, meta: { index: '4-3' } },
        { path: 'cut/details', name: 'auditCutDetails', component: AuditCutDetails, beforeEnter: requireAuth, meta: { index: '4-3' } },
        { path: 'bulk/details', name: 'auditBulkDetails', component: AuditBulkDetails, beforeEnter: requireAuth, meta: { index: '4-3' } },
        { path: 'find/details', name: 'auditFindDetails', component: AuditFindDetails, beforeEnter: requireAuth, meta: { index: '4-3' } },
      ],
    },
    {
      path: '/outbox',
      component: Parent,
      beforeEnter: requireAuth,
      children: [{
        path: 'code',
        component: code,
        meta: { index: '7-2', keepAlive: true }
      }]
    }
  ]
}
