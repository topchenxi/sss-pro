<template>
  <div>
    <el-menu mode="vertical" :default-active="String($route.meta.index)" theme="dark" class="menu-content">
      <el-submenu :key="item.index" :index="item.index" v-for="item in menu">
        <template slot="title">
          <i :class="item.icon"></i>{{item.name}}
        </template>
        <template v-for="(val,index) in item.children">
          <template v-if="val.type === '_blank'">
            <a :key="index" :href="val.path" :target="val.type">
              <el-menu-item :index="val.index">
                <span class="circle-ele"></span>{{val.name}}</el-menu-item>
            </a>
          </template>
          <template v-else>
            <router-link :key="index" :to="{path: val.path}" tag="a" data-list='111'>
              <el-menu-item :index="val.index">
                <span class="circle-ele"></span>{{val.name}}</el-menu-item>
            </router-link>
          </template>
        </template>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      defaultIndex: '0',
      menu: [{
        name: '财务管理',
        path: '/finance/checkAccount',
        index: '50',
        icon: 'el-icon-menu',
        meta: {
          icon: 'fa-building-o',
          expanded: false,
          index: '50'
        },
        children: [{
          name: '分账',
          path: '/finance/pendingAccount',
          index: '1-1'
        },
        {
          name: '对账',
          path: '/finance/newCheckAccount',
          index: '1-2'
        },
        // {
        //   name: '欠款',
        //   path: '/finance/debt/undone',
        //   index: '1-3'
        // },
        {
          name: '退补款处理',
          path: '/finance/exchange/undone',
          index: '1-4'
        },
        {
          name: '扣数款处理',
          path: '/finance/deduction/undone',
          index: '1-5'
        },
        {
          name: '采购商资金',
          path: '/finance/moneyManage',
          index: '1-6'
        }, {
          name: '跟单剪版对账',
          path: '/finance/oldData/oldDataList',
          index: '1-8'
        }
          // {
          //   name: '账单管理',
          //   path: '/finance/billManage',
          //   index: '1-7'
          // }
        ]
      },
      {
        name: '报销管理',
        path: '/reimburse/cut/undone',
        index: '2',
        icon: 'el-icon-share',
        children: [{
          name: '剪版',
          path: '/reimburse/cut/undone',
          index: '2-1',
        }, {
          name: '运费',
          path: '/reimburse/freight/undone',
          index: '2-2',
        }]
      },
      {
        name: '订单管理',
        path: '/orderManage/dahuoReports',
        index: '3',
        icon: 'el-icon-setting',
        children: [
          {
            name: '全部订单',
            path: `${location.host.indexOf('local') > -1 || location.host.indexOf('test') > -1 ? 'http://testorder.soouya.com/bulk/order/bulkAll' : 'http://order.soouya.com/bulk/order/bulkAll'}`,
            index: '80',
            icon: 'el-icon-setting',
            type: '_blank',
            meta: {
              icon: 'fa-building-o',
              expanded: false,
            },
          },
          {
            name: '客户支付订单',
            path: '/orderManage/customerPay',
            index: '3-3',
          },
          {
            name: '客户欠款订单',
            path: '/orderManage/debtOrder',
            index: '3-7',
          },
          {
            name: '退换货订单',
            path: '/orderManage/exchangeOrder',
            index: '3-4',
          },
          {
            name: '进销存报表',
            path: '/cangKu/baoBiaoDown',
            index: '10',
            icon: 'el-icon-setting',
            meta: {
              icon: 'fa-building-o',
              expanded: false,
            },
          },
          {
            name: '已付应收报表',
            path: '/orderManage/newBulkReport',
            index: '3-1',
          },
        ]
      },
      {
        name: '金融管理',
        path: '/baitiao/loan/loanexportto',
        index: '4',
        icon: 'el-icon-menu',
        children: [{
          name: '放款',
          path: '/baitiao/loan/loanexportto',
          index: '4-1'
        },
        {
          name: '还款',
          path: '/baitiao/repayment/repaymentlistto',
          index: '4-2'
        },
        {
          name: '供应链金融',
          path: '/baitiao/shop/shopLoan',
          index: '4-4'
        }
        ]
      },
        // {
        //   name: '销账管理',
        //   path: '/exchange/unGetAndPay',
        //   index: '60',
        //   icon: 'el-icon-share',
        //   meta: {
        //     icon: 'fa-building-o',
        //     expanded: false,
        //   },
        //   children: [
        //     {
        //       name: '待收付',
        //       path: '/exchange/unGetAndPay',
        //       index: '8'
        //     },
        //     {
        //       name: '已收付',
        //       path: '/exchange/hasGetAndPay',
        //       index: '9'
        //     }
        //   ]
        // },
        // {
        //   name: '进销存管理',
        //   path: '/cangKu/baoBiaoDown',
        //   index: '70',
        //   icon: 'el-icon-setting',
        //   meta: {
        //     icon: 'fa-building-o',
        //     expanded: false,
        //   },
        //   children: [
        //     {
        //       name: '报表下载',
        //       path: '/cangKu/baoBiaoDown',
        //       index: '10'
        //     }
        //   ]
        // }
      ]
    }
  },
  mounted() { },
  methods: {},
}
</script>

<style lang="scss">
.menu-content {
  .el-submenu__title {
    color:#fff !important;
    &:hover {
      background-color: #414754 !important;
    }
  }
  background-color: #4F5E70 !important;
  .is-active.is-opened {
    background-color: #2FB468 !important;
  }
  .el-menu {
    .el-menu-item {
      color: #bbb;
      background-color: #404c5a;
      display: inline-block;
      &:hover {
        background-color: #2D3444 !important;
      }
      .circle-ele {
        margin-left: -12px;
        margin-top: 23px;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        float: left;
        background-color: #fff;
      }
    }
    .is-active {
      .circle-ele {
        background-color: #2FB468;
      }
      background-color:#2D3444;
      color:#fff;
    }
  }
}
</style>
