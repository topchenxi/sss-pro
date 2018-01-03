<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import './style/init.scss';
@import '~normalize.css/normalize.css';
@import './style/base.scss';
@import './style/find.scss';
@import './style/cut.scss';
@import './style/newBulk.scss';
@import '../theme/index.css';
@import '~element-ui/lib/theme-default/index.css';
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.el-table td, .el-table th {
  height: 30px;
}

.el-table .cell, .el-table th >div {
  padding-left: 10px;
  padding-right: 10px;
}
</style>

