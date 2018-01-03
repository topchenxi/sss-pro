<template>
  <div class="root">
    <loading :loading="$store.state.b.loading" />
    <!-- <y-header /> -->
    <leftnav />
    <div class="rightnav">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
import Header from 'components/header'
import Leftnav from 'components/leftnav'
import Loading from 'components/loading'
export default {
  components: {
    'y-header': Header,
    Leftnav,
    Loading
    // lightbox
  },
  data() {
    return {
      loading: false
    }
  },
  mounted() {
    // this.getCurrentUser()
  },
  methods: {
    // getCurrentUser () {
    //   request({
    //     url: tokenApi.tokenMy,
    //     data: {}
    //   }, (res) => {
    //     if (res.success != 1 && !res.obj) {
    //       sessionStorage.removeItem('currentUser')
    //       this.$router.push({ path: '/login' })
    //     }
    //   })
    // }
  }
}
</script>
<style lang='scss'>
.sy-tabs-link {
  .el-tabs__item{
    padding: 0;
    a{
      display: block;
      padding: 0 16px;
      text-decoration: none;
      color: inherit;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all .2s ease;
}

.tab-wrap {
  position: relative;
}

.tab-wrap .el-tabs {
  width: 100%;
  .el-tabs__item.is-active {
    color: #fff;
    background: #3c8dbc;
  }
  .el-tabs__header {
    margin-bottom: 10px;
    border-bottom-width: 2px;
  }
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.clearfix:after {
  content: " ";
  display: block;
  clear: both;
  height: 0;
}

.clearfix {
  zoom: 1;
}

.y_table_wrap {
  td {
    text-align: center;
    border-right: 1px solid #ddd;
  }
  th {
    text-align: center;
    border-right: none;
  }
  .el-table td .cell {
    padding: 5px 0 0;
    line-height: 1.5;
    word-break: break-word;
  }
  position: relative;
}
</style>
