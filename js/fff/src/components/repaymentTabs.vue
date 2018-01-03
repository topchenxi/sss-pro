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
          label: '待还款',
          name: 'repaymentListTo',
          to: 'repaymentlistto'
        },
        {
          label: '已还款',
          name: 'repaymentListDone',
          to: 'repaymentlistdone'
        }
      ],
      activeName: this.$route.name
    }
  }
}
</script>