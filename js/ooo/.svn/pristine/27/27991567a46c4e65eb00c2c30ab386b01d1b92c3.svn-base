<template>
  <el-menu mode="horizontal" :default-active="tabsConfig._function" class="el-menu-demo">
    <a :href="item.to" v-for="item in tabsConfig.options" :key="item.name">
      <el-menu-item :index="item.name">
        {{item.label}}
      </el-menu-item>
    </a>
  </el-menu>
</template>
<script>
import getbuilkAccount from '@/api/bulk/getAccount'
export default {
  data() {
    return {
      tabsConfig: {
        _function: this.$route.query._function || 'order',
        options: []
      },
      Account: {}
    }
  },
  mounted() {
    this.getMenu(null)
    this.getAccount()
  },
  methods: {
    getAccount() {
      this.fullscreenLoading = true
      getbuilkAccount().then(response => {
        this.fullscreenLoading = false
        // let tmp = response.obj.toPay;
        // response.obj.toPay = response.obj.toSubmitPay;
        // response.obj.toSubmitPay = tmp;
        this.getMenu(response.obj);
      })
    },
    getMenu(count) {
      this.tabsConfig.options = []
      var menus = [
        { 'label': '下单中', 'key': 'order' },
        { 'label': '付款中', 'key': 'pay' },
        { 'label': '提交客户支付', 'key': 'toSubmitPay' },
        { 'label': '等待客户支付', 'key': 'toPay' },
        { 'label': '待对账', 'key': 'debt0' },
        { 'label': '已对账', 'key': 'debt1' },
        { 'label': '提货中', 'key': 'lading' },
        { 'label': '验货中', 'key': 'check' },
        { 'label': '发货中', 'key': 'send' },
        { 'label': '退换货中', 'key': 'returnReplace' },
        { 'label': '供应商退款', 'key': 'refund' },
        { 'label': '全部订单', 'key': 'all' },
      ]
      this.tabsConfig.options = []
      for (var i = 0; i < menus.length; i++) {
        var key = menus[i]['key']
        let to = ''
        if (key !== 'debt1' && key !== 'debt0') {
          to = '/bulk/order/' + (key !== 'all' ? 'list' : 'report') + '?_function=' + key
        } else {
          to = '/bulk/order/list?_function=' + key + '&reconciliationStatus=' + (key === 'debt0' ? '0' : '1')
        }
        let label = ''
        if (key !== 'debt1' && key !== 'debt0') {
          label = menus[i]['label'] + '(' + (count == null ? '...' : (count[key] || '')) + ')'
        } else {
          if (key === 'debt0') {
            label = menus[i]['label'] + '(' + (count == null ? '...' : (count['toDebt'] || '')) + ')'
          } else {
            label = menus[i]['label'] + '(' + (count == null ? '...' : (count['debted'] || '')) + ')'
          }
        }
        var value = {
          'label': label,
          'to': to,
          'name': key
        }
        this.tabsConfig.options.push(value)
      }
    }
  }
}

</script>
<style>

</style>
