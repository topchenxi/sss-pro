<template>
  <el-tabs type="card" v-model="activeName" class="has-link">
    <el-tab-pane v-for="item in tabOptions" :name="item.name" :key="item.name">
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
          label: '待分账',
          name: '/finance/pendingAccount'
        },
        {
          label: '已分账',
          name: '/finance/splitAccount'
        }
      ],
      activeName: this.$route.path
    }
  }
}
</script>
