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
          label: '大货',
          name: 'newBulkReport',
          to: 'newBulkReport',
        },
        {
          label: '剪版',
          name: 'jianbanReports',
          to: 'jianbanReports',
        },
      ],
      activeName: this.$route.name,
    }
  }
}
</script>
