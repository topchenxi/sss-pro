<template>
  <div class="finance-parent clearfix">
    <div class="header">
      <navbar />
    </div>
    <div class="sidebar">
      <sidebar />
    </div>
    <div class="main-content clearfix">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Navbar from 'components/layout/Navbar.vue'
import Sidebar from 'components/layout/Sidebar.vue'
export default {
  components: {
    Navbar,
    Sidebar
  },
  data() {
    return {
      
    }
  }
}
</script>

<style lang="scss">
.finance-parent {
  .header {
    height: 50px;
    border-bottom: 1px solid #dedede;
  }
  .sidebar {
    position: absolute;
    left: 0;
    width: 200px; // height: 100%;
    // box-shadow: 1px 0 8px #d3d4d6;
  }
  .main-content {
    background-color: #f5f7fa;
    margin-left: 201px;
    padding: 20px;
    box-shadow: -1px 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
  }
}
</style>
