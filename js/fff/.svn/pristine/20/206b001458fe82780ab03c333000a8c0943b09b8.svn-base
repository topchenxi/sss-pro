<template>
  <el-tabs type="card" v-model="activeName" class="has-link">
    <el-tab-pane :key="item.name" v-for="item in tabOptions" :name="item.name">
      <router-link slot="label" :to="item.name">{{item.label}}</router-link>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  data() {
    return {
      tabOptions: [
        {
          label: '待对账',
          name: '/finance/newCheckAccount'
        },
        {
          label: '已对账',
          name: '/finance/newReconciliation'
        }
      ],
      activeName: this.$route.path
    }
  }
}
</script>
