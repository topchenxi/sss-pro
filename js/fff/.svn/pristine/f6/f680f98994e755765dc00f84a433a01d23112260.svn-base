<template>
  <Tabs :config="tabsConfig">
  </Tabs>
</template>

<script>
import Tabs from 'components/routerTabs.vue'

export default {
  components: {
    Tabs
  },
  data() {
    const isCutReimburse = this.$route.path.indexOf('reimburse/cut') > -1
    const tabsConfig = [
      {
        label: '待报销',
        name: isCutReimburse ? 'undoneCutReimburse' : 'undoneFreightReimburse',
        to: 'undone',
      },
      {
        label: '已报销',
        name: isCutReimburse ? 'doneCutReimburse' : 'doneFreightReimburse',
        to: 'done',
      },
    ];
    return {
      tabsConfig,
    }
  }
}
</script>
