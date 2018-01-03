<template>
  <div class="finance-parent clearfix">
     <div class="header"><navbar /></div>
      <div class="sidebar"><sidebar /></div>
      <div class="main-content clearfix">
          <!-- <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view> -->
          <router-view></router-view>
      </div>
  </div>
</template>
<script>
import Navbar from './Navbar.vue'
import Sidebar from './Sidebar.vue'
export default {
  components: {
   Navbar,
   Sidebar
  }
}
</script>

<style lang="scss">
.finance-parent {
  overflow: hidden;
  .header {
    position: fixed;
    height: 50px;
    left: 0;
    top: 0;
    width: 100%;
    border-bottom: 1px solid #dedede;
    z-index: 999;
    box-sizing: border-box;
  }
  .sidebar {
    background-color: #404C5A;
    position: fixed;
    left: 0;
    top: 50px;
    width: 200px;
    bottom: 0;
    border-right: 1px solid #dedede;
    overflow-y: auto;
    // height: 100%;
    // box-shadow: 1px 0 8px #d3d4d6;
  }
  .main-content {
    background-color: #f2f2f2;
    position: relative;
    margin-left: 201px;
    padding: 20px;
    padding-bottom: 5px;
    overflow: hidden;
    margin-top: 50px;
    // box-shadow: -1px 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
  }
}

</style>
