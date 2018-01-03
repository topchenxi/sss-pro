<template>
  <div class="sub-wrap">
    <header>
      <section class="h-left">
        <span class="logo"></span><span class="point"></span>
        <span class="font">后台管理</span>
      </section>
      <section class="h-right">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            {{ realName }}<i class="el-icon-caret-bottom el-icon--right"></i>
         </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="modifyLoginPassword">修改登录密码</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </section>
    </header>
    <el-dialog title="修改登录密码" v-model="loginDialogFormVisible">
      <el-form :model="loginForm">
        <el-form-item label="*原密码" :label-width="formLabelWidth">
          <el-input v-model="loginForm.oldPassword" type="password" auto-complete="off" style="width: 85%"></el-input>
        </el-form-item>
        <el-form-item label="*新密码" :label-width="formLabelWidth">
          <el-input v-model="loginForm.newPassword" type="password" auto-complete="off" style="width: 85%"></el-input>
        </el-form-item>
        <el-form-item label="*再次输入新密码" :label-width="formLabelWidth">
          <el-input v-model="loginForm.repeatNewPassword" type="password" auto-complete="off" style="width: 85%"></el-input>
        </el-form-item>
        <el-form-item label="*短信验证码" :label-width="formLabelWidth">
          <el-input v-model="loginForm.code" auto-complete="off" style="display: inline-block; width: 57%"></el-input>
          &nbsp;
          <el-button type="primary" @click.native.prevent="sendCode" :disabled="getCodeDisabled">{{getCodeStr}}</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="loginDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="modifyLoginPasswordApply">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import MD5 from 'md5'
import { request, getCache } from '../../common/utils'
import Expanding from 'vue-bulma-expanding'
import Seed from 'api/seed'
import Account from 'api/account'
import auth from '../../common/auth'
import Cookies from 'js-cookie'
export default {
  components: {
    Expanding
  },
  props: {
    show: Boolean
  },
  data() {
    return {
      visible: true,
      auth: false,
      loginDialogFormVisible: false,
      payDialogFormVisible: false,
      loginForm: {
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: '',
        code: ''
      },
      payForm: {
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: '',
        code: ''
      },
      formLabelWidth: '120px',
      expanded: false,
      getCodeDisabled: false,
      getCodeStr: '获取短信验证码',
    }
  },
  // beforeCreate () {
  //   new Promise(function(resolve, reject){ auth.loggedIn(resolve, reject)}).then(function(success) {
  //     this.auth = true
  //   }, function(error) {
  //     this.auth = false
  //   })
  // },
  beforeMount() {
    this.filterShow();
  },
  computed: {
    realName() {
      const currentUser = getCache({ key: 'currentUser' })
      // console.log('currentUser1:', currentUser)
      if (currentUser && currentUser.loginInfo && currentUser.loginInfo.user && currentUser.loginInfo.user.userName) {
        return currentUser.loginInfo.user.realName
      } else {
        return ''
      }
    }
  },
  methods: {
    modifyLoginPassword() {
      this.loginDialogFormVisible = true
    },
    modifyLoginPasswordApply() {
      if (!this.loginForm.oldPassword) {
        this.$message({
          message: '请输入原密码',
          type: 'error'
        })
        return false
      }
      if (!this.loginForm.newPassword) {
        this.$message({
          message: '请输入新密码',
          type: 'error'
        })
        return false
      }
      if (!this.loginForm.repeatNewPassword) {
        this.$message({
          message: '请再次输入新密码',
          type: 'error'
        })
        return false
      }
      if (this.loginForm.newPassword !== this.loginForm.repeatNewPassword) {
        this.$message({
          message: '两次密码不一致',
          type: 'error'
        })
        return false
      }
      if (!this.loginForm.code) {
        this.$message({
          message: '请输入短信验证码',
          type: 'error'
        })
        return false
      }
      request({
        url: Seed.modifyLoginPassword,
        data: {
          oldPassword: MD5(this.loginForm.oldPassword),
          newPassword: MD5(this.loginForm.newPassword),
          code: this.loginForm.code
        }
      }, (res) => {
        if (res.success == 1) {
          this.loginDialogFormVisible = false
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    modifyPayPassword() {
      this.payDialogFormVisible = true
    },
    modifyPayPasswordApply() {
      if (!this.payForm.oldPassword) {
        this.$message({
          message: '请输入原密码',
          type: 'error'
        })
        return false
      }
      if (!this.payForm.newPassword) {
        this.$message({
          message: '请输入新密码',
          type: 'error'
        })
        return false
      }
      if (!this.payForm.repeatNewPassword) {
        this.$message({
          message: '请再次输入新密码',
          type: 'error'
        })
        return false
      }
      if (this.payForm.newPassword !== this.payForm.repeatNewPassword) {
        this.$message({
          message: '两次密码不一致',
          type: 'error'
        })
        return false
      }
      if (!this.payForm.code) {
        this.$message({
          message: '请输入短信验证码',
          type: 'error'
        })
        return false
      }
      request({
        url: Account.PayPassword.modifyPayPassword,
        data: {
          oldPassword: MD5(this.payForm.oldPassword),
          newPassword: MD5(this.payForm.newPassword),
          code: this.payForm.code
        }
      }, (res) => {
        if (res.success == 1) {
          this.payDialogFormVisible = false
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    logout() {
      request({
        url: Seed.logout
      }, (res) => {
        if (res.success == 1) {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1000,
            onClose() {
              sessionStorage.removeItem('currentUser')
              sessionStorage.removeItem('isAuthed')
              Cookies.remove('isAuthed')
              location.href = '/'
            }
          })
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    sendCode(event) {
      request({
        url: Seed.sendCode
      }, (res) => {
        if (res.success == 1) {
          this.getCodeDisabled = true;
          this.cutdown(60);
          this.$message({
            message: '短信验证码已发送，请注意查收',
            type: 'success'
          })
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    /**
     * 倒计时
     */
    cutdown(time) {
      const that = this;
      let currentTime = time;
      (function loop() {
        that.getCodeStr = `重新发送(${currentTime})`;
        if (--currentTime < 0) { // 20分钟后请求开奖数据，重置倒计时时间
          that.getCodeDisabled = false;
          that.getCodeStr = `重新发送验证码`;
        } else {
          setTimeout(loop, 1000); // 使用 setTimeout对性能影响小
        }
      })();
    },
    isExpanded() {
      return this.expanded
    },
    toggle() {
      this.expanded = !this.expanded
    },
    shouldExpandMatchItem(route) {
      const matched = route.matched
      const lastMatched = matched[matched.length - 1]
      let parent = lastMatched.parent || lastMatched

      if (parent === lastMatched) {
        const p = this.findParentFromMenu(route)
        if (p) {
          parent = p
        }
      }

      if ('expanded' in parent.meta && parent !== lastMatched) {
        parent.meta.expanded = true
      }
    },
    generatePath(item, subItem) {
      return `${item.component ? item.path + '/' : ''}${subItem.path}`
    },
    findParentFromMenu(route) {
      const menu = this.menu
      for (let i = 0, l = menu.length; i < l; i++) {
        const item = menu[i]
        const k = item.children && item.children.length
        if (k) {
          for (let j = 0; j < k; j++) {
            if (item.children[j].name === route.name) {
              return item
            }
          }
        }
      }
    },
    // 选择性显示头部和倾边栏
    filterShow() {
      const link = location.href
      const that = this
      if (link.indexOf('common/printDetail') > -1 || link.indexOf('common/login') > -1) {
        that.auth = false;
      } else {
        // console.log('false', auth.loggedIn())
        // that.auth = auth.loggedIn();
        new Promise(function(resolve, reject) {
          auth.loggedIn(resolve, reject)
        }).then(function(success) {
          that.auth = success
        }, function(error) {
          that.auth = error
        })
      }
    }
  },
  watch: {
    loginDialogFormVisible(val) {
      if (!val) {
        for (const key of Object.keys(this.loginForm)) {
          this.loginForm[key] = ''
        }
      }
    },
    payDialogFormVisible(val) {
      if (!val) {
        for (const key of Object.keys(this.payForm)) {
          this.payForm[key] = ''
        }
      }
    }
  }
}

</script>
<style lang="scss">

</style>
