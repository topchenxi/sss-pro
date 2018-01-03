<template>
  <el-tabs v-model="tabsConfig.activeName" type="card">
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
            label: '找版',
            to: '/check/find/list',
            name: 'checkFindList',
          },
          {
            label: '剪版',
            to: '/check/cut/list',
            name: 'checkCutList',
          },
          {
            label: '大货',
            to: '/check/bulk/list',
            name: 'checkBulkList',
          },
        ]
      }
    }
  }
}
</script>

<style>

</style>
