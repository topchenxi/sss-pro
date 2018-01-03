<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    // 不知道成不成功的动态设置高度
    mounted() {
      // let height = window.screen.availHeight - 70
      // document.getElementsByTagName('html')[0].style.height = height.toString() + 'px'
    }
  }
</script>

<style>
  @import '~normalize.css/normalize.css';
  @import './style/base.scss';
  @import '~element-ui/lib/theme-default/index.css';
  @import '~mint-ui/lib/style.css';
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #f9f9f9;
  }
  body {
    font-family: 'Tahoma', Helvetica, 'Microsoft YaHei', Arial, sans-serif !important;
  }
</style>

