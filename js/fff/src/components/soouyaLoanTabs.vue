<template>
  <el-tabs v-model="activeName" type="card" class="has-link">
    <el-tab-pane v-for="item in tabsOptions" :name="item.name" :key="item.name">
      <router-link :to="item.to" slot="label" tag="a">{{item.label}}</router-link>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  data() {
    return {
      tabsOptions: [
        {
          label: '搜芽放款',
          name: 'shopLoan',
          to: 'shopLoan'
        },
        {
          label: '利息结算',
          name: 'shopInterest',
          to: 'shopInterest'
        },
        {
          label: '全部订单',
          name: 'shopAll',
          to: 'shopAll'
        }
      ],
      activeName: this.$route.name
    }
  }
}
</script>
