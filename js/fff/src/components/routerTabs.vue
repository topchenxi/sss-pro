<template>
  <el-tabs v-model="activeName" type="card" class="has-link">
    <el-tab-pane v-for="item in config" :name="item.name" :key="item.name">
      <router-link :to="item.to" slot="label" tag="a">{{item.label}}</router-link>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  props: ['config'],
  data() {
    return {
      tabsOptions: [
        {
          label: '待报销',
          name: 'undoneCutReimburse',
          to: 'undone',
        },
        {
          label: '已报销',
          name: 'doneCutReimburse',
          to: 'done',
        },
      ],
      activeName: this.$route.name,
    }
  }
}
</script>
