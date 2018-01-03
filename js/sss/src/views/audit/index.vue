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

</style>

