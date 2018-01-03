<template>
  <section>
    <title>白条买布</title>
    <div class="tip-box">
      <span>白条在手,买布无忧</span>
    </div>
    <div class="form-box">
      <el-form>
        <el-form-item>
          <el-input v-model="loginForm.username" placeholder="账号">
            <template slot="prepend"><img width="22px" src="../../assets/account@1x.png"></img>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-top:35px;">
          <el-input v-model="loginForm.pwd" placeholder="密码" type="password">
            <template slot="prepend"><img width="22px" src="../../assets/pwd@1x.png"></img>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div style="text-align:center">
      <el-button type="success" :disabled="checkOut()" @click.native="submitForm">登录</el-button>
    </div>
  </section>
</template>
<script>
import login from '@/api/auth/login'
import { Toast, MessageBox } from 'mint-ui'
import setCache from '@/utils/setCache'
export default {
  data() {
    return {
      loginForm: {
        username: '',
        pwd: ''
      }
    }
  },
  mounted() {
    document.addEventListener('keyup', this.bindKeyLogin)
  },
  beforeRouteEnter(to, from, next) {
    let auth = localStorage.getItem('weChatUser')
    auth = JSON.parse(auth)
    // auth = JSON.parse(auth.value)
    if (auth) {
      if (auth.id) {
        next({ name: 'baitiao' })
      } else {
        next()
      }
    } else {
      next()
    }
  },
  methods: {
    bindKeyLogin(event) {
      if (event.keyCode === 13) {
        this.submitForm('loginForm')
      }
    },
    submitForm(formName) {
      let loginForm = this.loginForm
      login(loginForm.username, loginForm.pwd).then((response) => {
        if (response.success === '1') {
          Toast({
            message: response.msg,
            position: 'bottom',
            duration: 2000
          })
          setCache({
            key: 'weChatUser',
            value: response.obj
          })
          localStorage.removeItem('weChatUser')
          localStorage.setItem('weChatUser', JSON.stringify(response.obj))
          document.removeEventListener('keyup', this.bindKeyLogin)
          console.log(response.loginInfo)
          if (response.success == 1) {
            this.$router.replace({ name: 'baitiao' })
          } else {
            MessageBox('温馨提示', response.msg)
          }
        }
      })
    },
    checkOut() {
      let bool = true
      if (this.loginForm.username && this.loginForm.pwd) {
        bool = false
      }
      return bool
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
.tip-box {
  text-align: center;
  color: #08ce95;
  margin-top: 12.5%;
  margin-left: 18.8%;
  width: 62.5%;
  height: 3.9%;
  &>span {
    font-size: 2.4rem;
    font-weight: bold;
  }
}

.form-box {
  text-align: center;
  margin-top: 25%;
  margin-left: 12.4%;
  width: 75.3%;
  .el-input {
    height: 3.1%;
  }
}

.el-button {
  // background-color: #08ce95;
  width: 75.3%; // margin-left: 5.3%;
  margin-top: 50px;
}
</style>
