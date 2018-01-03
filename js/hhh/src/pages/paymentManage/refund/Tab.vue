<template>
  <div class="tab-wrap y-tab">
    <el-tabs v-model="activeName" type="card" class="has-link">
      <!-- <el-tab-pane></el-tab-pane> -->
      <el-tab-pane v-for="item in tabsOptions" :name="item.name" :key="item.name">
        <router-link :to="{name: item.name}" slot="label" tag="a">{{item.label}}</router-link>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabsOptions: [
        {
          label: '申请中',
          name: 'refundApply',
          to: 'paymentmanage/refundapply'
        },
        {
          label: '退款中',
          name: 'refunding',
          to: 'paymentmanage/refunding'
        },
        {
          label: '已退款',
          name: 'refunded',
          to: 'paymentmanage/refunded'
        },
      ],
      activeName: this.$route.name
    }
  }
}
</script>
<style lang="scss" scoped>
.el-tabs.has-link{
 & .el-tabs__nav{
  & .el-tabs__item {
    padding: 0;
   &>a{
        padding: 0 15px;
        display: block;
        color: inherit;
        text-decoration: none;
      }
    }  
  }
}
</style>

