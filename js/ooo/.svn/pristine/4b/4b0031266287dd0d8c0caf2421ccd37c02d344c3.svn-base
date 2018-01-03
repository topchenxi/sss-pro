<template>
  <div style="height: 100%;">
    <!-- <el-row type="flex" justify="center" align="middle">
      <el-col :span="10">
        <el-form class="sy-login-form" label-width="100px" ref="loginForm" :model="loginForm">
          <header>搜芽订单跟踪系统</header>
          <el-form-item label="账号" prop="username" :rules="[{ required: true, message: '请输入账号', trigger: 'blur' }]">
            <el-input placeholder="账号" v-model="loginForm.username">
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
            <el-input placeholder="密码" type="password" v-model="loginForm.pwd">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">
              提交(Enter)
            </el-button>
            <el-button @click="resetForm('loginForm')">
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row> -->
    <el-row style="height:100%;">
      <el-col :span="14" class="login-left">
        <div class="title">
          <span class="icon-login-logo"></span>
          <span>订单跟踪系统</span>
        </div>
        <div class="body-img">
          <span class="login-img"></span>
        </div>
      </el-col>
      <el-col :span="10" class="login-right">
        <div class="login-content">
          <el-input v-model="loginForm.username" placeholder="账号">
            <template slot="prepend">
              <span class="login-user"></span>
            </template>
          </el-input>
          <el-input type="password" v-model="loginForm.pwd" style="margin-top: 25px;" placeholder="密码">
            <template slot="prepend">
              <span class="login-pwd"></span>
            </template>
          </el-input>
          <el-button size="large" type="" @click.native="submitForm" class="forgive-color login-btn" style="margin-top: 35px;">登录</el-button>
          <el-button size="large" @click.native="resetForm" class="reset-btn">重置</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import login from '@/api/auth/login'
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
  methods: {
    bindKeyLogin(event) {
      if (event.keyCode === 13) {
        this.submitForm()
      }
    },
    submitForm() {
      let loginForm = this.loginForm
      login(loginForm.username, loginForm.pwd).then((response) => {
        if (response.success === '1') {
          this.$message({
            message: '登录成功',
            type: 'success',
            duration: 1200
          })
          setCache({
            key: 'currentUser',
            value: response.loginInfo
          })
          setCache({
            key: 'omsCurrentUser',
            value: response.loginInfo
          })
          document.removeEventListener('keyup', this.bindKeyLogin)
          console.log(response.loginInfo)
          if (response.loginInfo.woodClothHunterAdmin | response.loginInfo.woodSalesLeader | response.loginInfo.woodFinance | response.loginInfo.woodGuiderAdmin) {
            this.$router.replace({ name: 'findAll' })
          } else if (response.loginInfo.woodAdmin | response.loginInfo.woodFinance | response.loginInfo.woodCutClothLeader) {
            this.$router.replace({ name: 'bulkOrder' })
          } else if (response.loginInfo.woodAdmin | response.loginInfo.woodPurchaserLeader | response.loginInfo.woodFinance | response.loginInfo.woodFollowTeamLeader) {
            this.$router.replace({ name: 'cutAll' })
          } else {
            this.$message({
              message: '无权限登录',
              type: 'error',
              duration: 1200
            })
          }
        }
      })
    },
    resetForm() {
      this.loginForm.username = ''
      this.loginForm.pwd = ''
    }
  }
}
</script>
<style lang="scss">
// header {
//   font-size: 40px;
//   height: 60px;
//   padding-left: 10px;
//   margin-bottom: 30px;
//   color: #36AC70;
//   text-align: center;
// }
// .sy-login-form {
//   margin-top: 200px;
// }
.icon-login-logo {
  background: url("../../assets/login-logo.png") 0 0 no-repeat;
  display: inline-block;
  width: 140px;
  height: 50px;
  background-size: 100% 100%;
  vertical-align: bottom;
}
.login-img {
  background: url("../../assets/login-img.png") 0 0 no-repeat;
  display: inline-block;
  width: 527px;
  height: 438px;
  background-size: 100% 100%;
  vertical-align: bottom;
}
.login-user {
  background: url("../../assets/user.png") 0 0 no-repeat;
  display: inline-block;
  width: 25px;
  height: 25px;
  background-size: 100% 100%;
  vertical-align: bottom;
}
.login-pwd {
  background: url("../../assets/pwd.png") 0 0 no-repeat;
  display: inline-block;
  width: 25px;
  height: 25px;
  background-size: 100% 100%;
  vertical-align: bottom;
}
.login-left {
  background-color: #fff;
  height: 100%;
  .title {
    margin-left: 100px;
    margin-top: 50px;
    span {
      color: #39ab65;
      font-size: 22px;
      font-weight: 500;
    }
  }
  .body-img {
    margin-left: 25%;
    margin-top: 15%;
  }
}
.login-right {
  height: 100%;
  background: -webkit-linear-gradient(#28ce70, #2fb468); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(#28ce70, #2fb468); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(#28ce70, #2fb468); /* Firefox 3.6 - 15 */
  background: linear-gradient(#28ce70, #2fb468); /* 标准的语法 */
  .login-content {
    width: 50%;
    margin-left: 25%;
    margin-top: 56%;
    .el-input {
      height: 35px;
    }
    .el-input-group__prepend {
      height: 40px;
      background-color: #2bc363;
      border-color: #fff;
      border-right: 0;
      border-radius: 0px !important;
    }
    .el-input__inner {
      height: 40px;
      border-left: 0;
      background-color: #2bc363;
      border-color: #fff;
      color: #fff;
      border-radius: 0px !important;
      &:focus {
        border-color: #fff !important;
      }
      &:-ms-input-placeholder {
        color: #fff;
      }
      &::placeholder {
        color: #fff;
      }
    }
    .el-button {
      width: 100%;
    }
    .login-btn {
      border: none;
      box-shadow: 0px -2px 9px rgba(77,116,94,0.35);
    }
    .reset-btn {
      margin-top: 25px;
      margin-left: 0px;
      background-color: #2cc26c;
      border: 0px;
      color: #fff;
      &:hover {
        background-color: #fff !important;
        color: #666 !important;
        box-shadow: 0px -2px 9px rgba(77,116,94,0.35);
      }
    }
  }
}
@media screen and (max-width: 1920px) {
  .login-content {
    width: 55% !important;
    margin-left: 22.5% !important;
  }
}
@media screen and (max-width: 1600px) {
  .login-content {
    width: 65% !important;
    margin-left: 17.5% !important;
  }
}
@media screen and (max-width: 1366px) {
  .login-content {
    width: 75% !important;
    margin-left: 12.5% !important;
  }
}
</style>
