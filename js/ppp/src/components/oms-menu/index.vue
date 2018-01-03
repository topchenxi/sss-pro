<template>
  <div class="nav-warp">
    <title>搜芽纺织ERP系统</title>
    <div class="oms-title">
      <div class="logo"></div>
    </div>
    <div class="menu-warp">
      <ul>
        <li>
          <router-link tag="a" class="menu-title" to='/orderMgr/' @click.native="orderAction()">
            订单中心
          </router-link>
          <ol class="sub-menu">
            <li :class="{ current:flag.isOrder }">
              <router-link tag="div" class="sub-warp" to='/orderMgr/' @click.native="orderAction()">
                <span class="icon icon-order"></span>
                <i>我的订单</i>
              </router-link>
            </li>
          </ol>
        </li>
        <li>
          <router-link tag="a" class="menu-title" to='/customerMgr/'>
            客户中心
          </router-link>
          <ol class="sub-menu">
            <li :class="{ current: flag.isCustomer }">
              <router-link tag="div" class="sub-warp" to='/customerMgr/'>
                <span class="icon icon-customer"></span>
                <i>我的客户</i>
              </router-link>
            </li>
          </ol>
        </li>
      </ul>
    </div>
    <div class="signout-warp">
      <p>{{userName}}</p>
      <span @click="signOut"></span>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request';
export default {
  name: 'order',
  data() {
    return {
      flag: {
        isOrder: false,
        isCustomer: false
      },
      userName: '用户名11'
    }
  },
  methods: {
    orderAction() {
      sessionStorage.orderRepayStatus = '';
      sessionStorage.orderStatus = '';
    },
    signOut() {
      request('/soouya/v1/shopToken/my', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if (response.success !== '1') {
          this.$Message({
            type: 'error',
            message: response.msg,
            duration: 1000
          })
        } else {
          sessionStorage.currentUser = '';
          this.$router.replace({
            name: 'login'
          })
        }
      })
    }
  },
  mounted() {
    let currentPathName = this.$router.history.current.name;
    function searchPath(src, target = currentPathName) {
      return src.indexOf(target) != -1;
    }
    this.flag.isOrder = searchPath('orderMgr,orderOmsDetail,orderOmsEdit');
    this.flag.isCustomer = searchPath('customerMgr,debtOrderList');
    if (sessionStorage.currentUser) {
      let info = JSON.parse(sessionStorage.currentUser);
      this.userName = JSON.parse(info.value).nickName || '';
    }
    let height = window.innerHeight;
    document.querySelector('.main-content').style.minHeight = height + 'px';
    window.onresize = function() {
      let height = window.innerHeight;
      document.querySelector('.main-content').style.minHeight = height + 'px';
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../common/scss/oms-base.scss";
.oms-title {
  overflow: hidden;
  margin-bottom: 20px;
  .logo {
    display: block;
    width: 102px;
    height: 36px;
    margin: 0 auto;
    margin-top: 72px/2-36px/2;
    background: url(images/logo-s.png) 0 0 no-repeat;
  }
}

.icon-order {
  background: url('images/orders@1x.png') 0 0 no-repeat;
}

.icon-customer {
  background: url('images/customer@1x.png') 0 0 no-repeat;
}

.current {
  .icon-order {
    background: url('images/orders-active@1x.png') 0 0 no-repeat;
  }
  .icon-customer {
    background: url('images/customer-active@1x.png') 0 0 no-repeat;
  }
}

.signout-warp {
  position: fixed;
  left: 0;
  bottom: 36px;
  @include clearfix;
  padding-left: 25px;
  width: 180px;
  p {
    float: left;
    font-size: 12px;
    color: #FFFFFF;
    height: 18px;
    line-height: 18px;
    width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  span {
    float: right;
    display: inline-block;
    width: 18px;
    height: 18px;
    background: url(images/exit-active@1x.png) 0 0 no-repeat;
    background-size: 18px 18px;
    margin-right: 30px;
    cursor: pointer;
  }
}
</style>
