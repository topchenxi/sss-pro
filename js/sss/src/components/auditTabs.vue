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
            label: '找版',
            to: '/audit/find/list',
            name: 'auditFindList',
          },
          {
            label: '剪版',
            to: '/audit/cut/list',
            name: 'auditCutList',
          },
          {
            label: '大货',
            to: '/audit/bulk/list',
            name: 'auditBulkList',
          },
        ]
      }
    }
  }
}
</script>

<style>

</style>
