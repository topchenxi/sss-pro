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
          label: '待放款',
          name: 'loanExportTo',
          to: 'loanexportto'
        },
        {
          label: '已放款',
          name: 'loanExportDone',
          to: 'loanexportdone'
        }
      ],
      activeName: this.$route.name
    }
  }
}
</script>
