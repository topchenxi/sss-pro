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
@import 'src/static/scss/mixin/variables.scss';
.finance-parent {
  position: relative;

  background-color: #fff;
  .header {
    line-height: 60px;

    position: relative;
    z-index: 3;

    width: 100%;
    height: 60px;
    padding: 0 36px 0 27px;

    background-color: $green;

    @include clearfix;
    .h-left {
      float: left;

      @include clearfix;
      span {
        display: inline-block;
        float: left;
      }
      .logo {
        display: inline-block;

        width: 94px;
        height: 33px;
        margin: (60px-33px)/2 0;

        background: url('../../static/images/logo.png') 0 0 no-repeat;
      }
      .point {
        width: 5px;
        height: 5px;
        margin: (60px-5px)/2 9px;

        border-radius: 50%;
        background-color: #fff;
      }
      .font {
        font-size: 24px;

        color: #fff;
      }
    }
    .h-right {
      float: right;
      .el-dropdown {
        cursor: pointer;
        .el-dropdown-link {
          font-size: 14px;

          color: #fff;
          .el-icon--right {
            color: #fff;
          }
        }
      }
    }
  }
  .sidebar {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;

    width: 190px;
    height: 100%;
    padding-top: 60px;

    background-color: #fff;
  }
  .main-content {
    width: 100%;
    min-height: 100%;
    margin-top: -60px;
    padding: 60px 0 20px 190px;

    background-color: #f5f7fa;
  }
}

</style>
