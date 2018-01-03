<template>
  <div class="login-container" :style="{height:windowHeight+'px'}">
    <div class="left">
      <div class="logo"></div>
      <div class="img"></div>
    </div>
    <div class="right">
      <div class="login-content">
        <h3>红杉系统</h3>
        <h5>欢迎您！</h5>
        <el-form :model='ruleForm2' :rules='rules2' ref='ruleForm2' class='form'>
          <el-form-item prop='name'>
            <el-input class="login-input" type='text' v-model='ruleForm2.name' auto-complete='off' placeholder="账号" @keydown.enter.native.prevent='handleSubmit2'></el-input>
          </el-form-item>
          <el-form-item prop='password'>
            <el-input class="login-input" type='password' v-model='ruleForm2.password' auto-complete='off' placeholder="密码" @keydown.enter.native.prevent='handleSubmit2'></el-input>
          </el-form-item>
          <el-form-item prop='rememberPwd'>
            <el-checkbox label='记住密码' v-model='ruleForm2.rememberPwd'></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn" type='primary' :loading='load' :disabled="(ruleForm2.password && ruleForm2.name) ? false : true" @click.native.prevent='handleSubmit2'>提<span class="blank"></span>交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- <div class='login_body bounce-enter-active'>
      <el-row type='flex' :gutter='20' justify='center' align='middle'>
        <el-col :span='9'>
          <el-form :model='ruleForm2' :rules='rules2' ref='ruleForm2' class='form'>
            <h2 class="f-title">请登录</h2>
            <div style="padding: 0 20px;">
              <el-form-item prop='name'>
                <el-input type='text' v-model='ruleForm2.name' auto-complete='off' placeholder="账号" @keydown.enter.native.prevent='handleSubmit2'></el-input>
              </el-form-item>
              <el-form-item prop='password'>
                <el-input type='password' v-model='ruleForm2.password' auto-complete='off' placeholder="密码" @keydown.enter.native.prevent='handleSubmit2'></el-input>
              </el-form-item>
              <el-form-item prop='rememberPwd'>
                <el-checkbox label='记住密码' v-model='ruleForm2.rememberPwd'></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-button style="width: 100%;" type='primary' :loading='load' :disabled="(ruleForm2.password && ruleForm2.name) ? false : true" @click.native.prevent='handleSubmit2'>提交(Enter)</el-button>
              </el-form-item>
            </div>
          </el-form>
        </el-col>
      </el-row>
    </div> -->
  </div>
</template>
<script type='text/javascript'>
import MD5 from 'md5'
import * as Cookies from 'js-cookie'
import {
  request,
  setCache,
  getCache
} from 'utils/tool'
import tokenApi from 'api/account'
import AuthSub from 'utils/subNav'
export default {
  components: {},
  data() {
    var validaePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else {
        if (this.ruleForm2.password !== '') {
          this.$refs.ruleForm2.validateField('password');
        }
        callback()
      }
    }
    var validaePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback()
      }
    }
    return {
      markEnter: 1, // 防止多次enter
      ruleForm2: {
        name: '',
        password: '',
        rememberPwd: true
      },
      load: false,
      rules2: {
        name: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          },
          {
            validator: validaePass
          }
        ],
        password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            validator: validaePass2
          }
        ],
        rememberPwd: [{
          required: false
        }]
      },
      isRole: []
    }
  },
  mounted() {
    this.fillPwd()
    // document.addEventListener('keyup', this.listenEnter)
  },
  computed: {},
  beforeRouteEnter(to, from, next) {
    if (getCache({
        key: 'currentUser'
      })) {
      next({
        path: '/index'
      })
    } else {
      next()
    }
  },
  methods: {
    listenEnter(e) {
      if (e.keyCode === 13 && this.markEnter === 1 && this.ruleForm2.password && this.ruleForm2.name) {
        this.markEnter = 2
        this.submit()
      }
    },
    // 填充原来密码
    fillPwd() {
      let userInfo = Cookies.get('userInfo')
      if (userInfo) {
        userInfo = JSON.parse(userInfo)
        this.ruleForm2.name = userInfo.name
        this.ruleForm2.password = userInfo.password
      }
    },
    submit() {
      this.load = true
      const {
        name,
        password
      } = this.ruleForm2
      if (!name || !password) {
        this.$message({
          type: 'error',
          message: '请输入账号或密码'
        })
        this.load = false
        return false
      }
      request({
        url: tokenApi.login,
        data: {
          userName: name,
          pwd: MD5(password)
        },
        method: 'post'
      }, (res) => {
        const that = this
        this.load = false
        if (res.success == 1) {
          sessionStorage.removeItem('currentUser');
          sessionStorage.removeItem('omsCurrentUser');
          this.$message({
            message: '登录成功',
            type: 'success',
            duration: 1200,
            onClose() {
              setCache({
                key: 'currentUser',
                value: res
              })
              setCache({
                key: 'omsCurrentUser',
                value: res
              })
              if (that.ruleForm2.rememberPwd) {
                Cookies.set('userInfo', {
                  name: name,
                  password: password
                }, {
                  expires: 90
                })
              } else {
                Cookies.remove('userInfo')
              }
              that.roleJump()
              that.markEnter = 1
            }
          })
        } else {
          this.markEnter = 1
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    handleSubmit2(ev) {
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          this.submit()
        } else {
          return false
        }
      })
    },
    cutRole() { // 剪版员（未确定）
      return new AuthSub().cutRole()
    },
    guiderRole() { // 导购
      return new AuthSub().guiderRole()
    },
    guiderAdminRole() { // 导购
      return new AuthSub().guiderAdminRole()
    },
    pickerRole() {
      return new AuthSub().pickerRole()
    },
    checkerRole() { // 审核员
      return new AuthSub().checkerRole()
    },
    dataClerkRole() {
      return new AuthSub().dataClerkRole()
    },
    buyerRole() { // 买货员（未确定）
      return new AuthSub().buyerRole()
    },
    buyerLeaderRole() {
      return new AuthSub().buyerLeaderRole()
    },
    orderRoleControl() { // 订单管理
      return new AuthSub().orderRoleControl()
    },
    deliverRoleControl() { // 发货管理
      return new AuthSub().deliverRoleControl()
    },
    returnReplaceRoleControl() { // 退换货管理
      return new AuthSub().returnReplaceRoleControl()
    },
    payRoleControl() { // 支付
      return new AuthSub().payRoleControl()
    },
    billRoleControl() { // 账单管理
      return new AuthSub().billRoleControl()
    },
    saleControl() {
      return new AuthSub().saleRole()
    },
    roleJump() {
      // 默认跳转页
      if (this.orderRoleControl()) { // 订单管理
        // this.$router.push({ name: 'salesOrder' })
        // this.$router.push({ name: 'deliver' })
        this.$router.push({
          name: 'dhManageAll'
        })
      } else if (this.buyerRole()) { // 买货角色
        this.$router.push({
          name: 'buyerOrderManage'
        })
      } else if (this.deliverRoleControl()) { // 发货管理
        this.$router.push({
          name: 'deliver'
        })
      } else if (this.returnReplaceRoleControl()) { // 退换货管理
        this.$router.push({
          name: 'reject'
        })
      } else if (this.payRoleControl()) { // 支付
        this.$router.push({
          name: 'notifyPayView'
        })
      } else if (this.billRoleControl()) { // 账单管理
        this.$router.push({
          name: 'billView'
        })
      } else if (this.cutRole()) { // 账单管理
        this.$router.push({
          name: 'cutManage'
        })
      } else if (this.buyerLeaderRole()) {
        this.$router.push({
          name: 'appointConsult'
        })
      } else if (this.guiderRole()) {
        this.$router.push({
          name: 'allOrder',
          query: {
            type: 'all'
          }
        })
      } else if (this.guiderAdminRole()) {
        this.$router.push({
          name: 'guiderAllCutList'
        })
      } else if (this.pickerRole()) {
        this.$router.push({
          name: 'pickerOrderList'
        })
      } else if (this.checkerRole()) {
        this.$router.push({
          name: 'checkFindWait'
        })
      } else if (this.dataClerkRole()) {
        this.$router.push({
          name: 'cardWait'
        })
      } else if (this.saleControl()) {
        this.$router.push({
          name: 'debtOfUncleared'
        })
      }
    },
    updated() {},
    destroyed() {
      document.removeEventListener('keyup', this.listenEnter)
    }
  }
};

</script>
<style lang='scss' scoped>
@import './login.scss';

</style>
