<template>
  <div>
    <div class="header" v-if="$route.query.noBar != 1">
      <div class="logo-wrap">
        <router-link to="/" tag="span">
          <h2 class="logo">红杉系统</h2>
        </router-link>
      </div>
      <div style="float: right; cursor: pointer;">
        <el-badge :value="notifyData.length" class="sy-message" v-if="canShowBader">
          <el-button icon="message" size="small" @click="setTimer(true)"></el-button>
        </el-badge>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link" style="position: relative; z-index: 1000; color: #fff;">
            {{userName}}
            <i class="el-icon-caret-bottom el-icon-right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div style="height: 50px;"></div>
  </div>
</template>
<script>
import { request, getCache, formatTimeString } from 'utils/tool'
import { request as newRequest } from 'utils/request'
import tokenApi from 'api/account'
export default {
  data() {
    return {
      userName: '',
      currentUserInfo: {},
      timer: null,
      notifyData: [],
      notifyDom: null
    }
  },
  mounted() {
    const currentUser = getCache({ key: 'currentUser' })
    this.currentUserInfo = currentUser.loginInfo
    this.userName = (currentUser && currentUser.loginInfo.user.realName)
  },
  computed: {
    canShowBader: function() {
      let currentUserInfo = this.currentUserInfo
      if (!currentUserInfo) {
        return false
      } else {
        let authArray = [
          currentUserInfo.woodFollowLeader, // 跟单员访问大货管理
          currentUserInfo.woodPurchaser // 买货员访问订单管理
        ]
        return authArray.some(item => { return item })
      }
    }
  },
  watch: {
    'canShowBader': function(val, oldVal) {
      if (val) {
        this.setTimer()
      }
    }
  },
  methods: {
    getMessage(type) {
      newRequest('/redwood/sys/Msg/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {}
      }).then(response => {
        if (response.success) {
          if (type) {
            this.notifyData = response.list
            this.openNotify()
          } else {
            if (response.list.length !== this.notifyData.length) {
              this.notifyData = response.list
              this.openNotify()
            }
          }
        } else {
          this.$message({
            type: 'error',
            message: response.msg,
            duration: 1200
          })
        }
      })
    },
    logout() {
      request({
        url: tokenApi.logout,
        data: {},
        method: 'post'
      }, (res) => {
        const that = this
        if (res.success == 1) {
          clearInterval(this.timer)
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 1000,
            onClose() {
              sessionStorage.removeItem('currentUser')
              that.$router.push({ name: 'login' })
            }
          })
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    openNotify() {
      const h = this.$createElement
      let notifyData = this.notifyData
      let li = notifyData.map(item => {
        let orderNumber = h('div', null, `订单号：${item.serviceNumber}`)
        let operatorer = h('div', null, `变更执行人：${item.operatorer}`)
        let left = h('div', null, [orderNumber, operatorer])
        let right = h('div', null, formatTimeString(item.createTime))
        return h('li', {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px'
          }
        }, [left, right])
      })
      let message = li.length ? h('ul', null, li) : h('div', null, '暂无消息通知')
      this.notifyDom && this.notifyDom.close()
      this.notifyDom = this.$notify({
        title: '订单快报',
        message,
        customClass: 'message-card',
      })
      this.notifyDom.$el.querySelector('.el-notification__closeBtn').addEventListener('click', (e) => {
        this.clearMessage()
      })
    },
    clearMessage() {
      newRequest('/redwood/sys/Msg/clear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {}
      }).then(response => {
        if (response.success !== '1') {
          this.$message({
            type: 'error',
            message: response.msg,
            duration: 1200
          })
        } else {
          this.notifyData = []
        }
        this.notifyDom.close()
      })
    },
    setTimer(type) {
      this.getMessage(type)
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.getMessage()
      }, 30000)
    }
  }
}

</script>
<style lang="scss" scoped>
.header {
  padding: 10px 30px 10px 0;
  height: 50px;
  background-color: #3c8dbc;
  position: fixed;
  z-index: 1000;
  left: 0;
  right: 0;
  z-index: 20;
  .logo-wrap {
    position: absolute;
    left: 0;
    top: 0;
    height: 50px;
    line-height: 50px;
    text-align: center;
    width: 180px;
    background: #367fa9;
  }
  .logo {
    color: #fff;
  }
}

.sy-message {
  margin-right: 50px;
  .el-button--text {
    color: #fff;
  }
}

</style>
<style lang="scss">
.message-card.el-notification {
  width: 400px;
  a {
    text-decoration: none;
    color: #666;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
}

</style>
