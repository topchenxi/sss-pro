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
          label: '审核中',
          name: 'buyerWaitRefund',
          to: 'buyer/buyerwaitrefund'
        },
        {
          label: '退款中',
          name: 'buyerRefunding',
          to: 'buyer/buyerrefunding'
        },
        {
          label: '已退款',
          name: 'buyerRefunded',
          to: 'buyer/buyrefunded'
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

