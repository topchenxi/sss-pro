<template>
  <el-tabs v-model="tabsConfig.activeName" type="card" class="tabs-containter">
    <el-tab-pane :name="item.name" v-for="item in tabsConfig.options">
      <router-link slot="label" :to="item.to">{{item.label}}</router-link>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      tabsConfig: {
        activeName: this.$route.name,
        options: [
          {
            label: '跟单绩效',
            to: '/report/JixiaoFollowManage',
            name: 'JixiaoFollowManage',
          },
          {
            label: '采购绩效',
            to: '/report/JixiaoPurchaseManage',
            name: 'JixiaoPurchaseManage',
          }
        ]
      }
    }
  }
}
</script>

<style>

</style>
