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
          label: '待收欠款',
          name: 'undoneDebt',
          to: 'undone',
        },
        {
          label: '已收欠款',
          name: 'doneDebt',
          to: 'done',
        },
      ],
      activeName: this.$route.name,
    }
  }
}
</script>
