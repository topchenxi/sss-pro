<template>
  <div class="login-container">
    <title>搜芽纺织ERP系统</title>
    <div class="login-warp">
      <section class="top-logo-warp">
        <span class="logo"></span>
      </section>
      <section class="login-content">
        <section class="login-form">
          <h4>搜芽纺织ERP系统</h4>
          <div class="input-warp" ref="userWarp" :class="{'focus':isUserFocus}">
            <span class="title">账号</span>
            <input type="text" ref="username" name="username" autocomplete="off" v-model="loginForm.username">
            <!-- <input type="text" name="username" id="username" class="hide"> -->
            <p class="line"></p>
          </div>
          <div class="input-warp" ref="pwdWarp" :class="{'focus':isPwdFocus}">
            <span class="title">密码</span>
            <input type="password" ref="password" name="password" autocomplete="off" v-model="loginForm.pwd">
            <!-- <input type="password" name="password" id="password" class="hide"> -->
            <input type="hidden">
            <p class="line"></p>
          </div>
          <button class="login-btn" @click="submitForm" :disabled="!isRight">登录</button>
        </section>
      </section>
    </div>
    <div class="picture-warp">
      <div class="bg"></div>
    </div>
  </div>
</template>
<script>
import login from '@/api/auth/login'
import setCache from '@/utils/setCache'
export default {
  data() {
    return {
      isUserFocus: false,
      isPwdFocus: false,
      loginForm: {
        username: '',
        pwd: ''
      }
    }
  },
  mounted() {
    document.addEventListener('keyup', this.bindKeyLogin);
    console.log(sessionStorage.currentUser);
    if (sessionStorage.currentUser) {
      this.$router.replace({
        name: 'orderMgr'
      })
    }
    this.bindKeyFocus();
  },
  computed: {
    isRight() {
      return !!this.loginForm.username && !!this.loginForm.pwd;
    },
    btnBg() {
      return this.isRight ? '#2FB468' : '#ddd';
    }
  },
  methods: {
    bindKeyFocus() {
      this.$refs.username.addEventListener('focus', () => {
        this.isUserFocus = true;
        this.isPwdFocus = false;
      })
      this.$refs.password.addEventListener('focus', () => {
        this.isUserFocus = false;
        this.isPwdFocus = true;
      })
    },
    bindKeyLogin(event) {
      if (event.keyCode === 13) {
        this.submitForm('loginForm')
      }
    },
    submitForm(formName) {
      let loginForm = this.loginForm;
      if (!this.isRight) return;
      login(loginForm.username, loginForm.pwd).then((response) => {
        if (response.success === '1') {
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 2000
          });
          setCache({
            key: 'currentUser',
            value: response.obj
          })
          // setCache({
          //   key: 'currentUser',
          //   value: response.loginInfo
          // })
          // setCache({
          //   key: 'omsCurrentUser',
          //   value: response.loginInfo
          // })
          document.removeEventListener('keyup', this.bindKeyLogin)
          console.log(response.loginInfo)
          if (response.success == 1) {
            this.$router.replace({
              name: 'orderMgr'
            })
          }
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}

</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.hide {
  height: 0;
  opacity: 0;
  position: absolute;
}

input:-webkit-autofill {
  background-color: #fff !important;
}

.logo {
  display: inline-block;
  width: 136px;
  height: 49px;
  background: url(images/login-logo.png) 0 0 no-repeat;
}

.login-container {
  &::after {
    display: block;
    clear: both;
    content: "";
  }
  height: 100%;
  width: 100%;
  .login-warp {
    height: 100%;
    width: 55%;
    background: #fff;
    float: left;
  }
  .picture-warp {
    width: 45%;
    background: #fff;
    float: left;
    height: 100%;
    .bg {
      width: 100%;
      height: 100%;
      background: url(images/login-bg.png) 0 0 no-repeat;
      background-size: 100% 100%;
    }
  }
}

.top-logo-warp {
  padding: 57px 0 0 65px;
  &::after {
    display: block;
    clear: both;
    content: "";
  }
  height: 50px;
  line-height: 50px;
  img {
    float: left;
    background: #22A65C;
    margin-right: 6px;
  }
}

.login-form {
  display: block;
  width: 60%;
  margin: 0 auto;
  padding-top: 20%;
  h4 {
    width: 100%;
    text-align: left;
    font-size: 46px;
    color: #333333;
    font-weight: normal;
    margin: 0;
    padding: 0;
    margin-bottom: 60px;
  }
  .input-warp {
    position: relative;
    margin-bottom: 50px;
  }
  .title {
    font-size: 16px;
    color: #999999;
    position: absolute;
    display: inline-block;
    width: 45px;
    height: 36px;
    line-height: 36px;
  }
  input {
    border: 0;
    outline: none;
    font-size: 16px;
    color: #333333;
    width: 100%;
    height: 36px;
    padding-left: 45px;
    box-shadow: 0 0 0px 1000px white inset !important;
  }
  .line {
    height: 2px;
    width: 100%;
    border-bottom: 1px solid #DDDDDD;
    margin-bottom: 17px;
  }
  .focus {
    .title {
      color: #333;
    }
    .line {
      border-bottom: 2px solid #2FB468;
    }
  }
  .login-btn {
    background: #2FB468;
    border-radius: 50px;
    width: 200px;
    margin: 0 auto;
    margin-top: 61px-17px;
    padding: 10.5px 0;
    font-size: 16px;
    color: #FFFFFF;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    user-select: none;
    background-image: none;
    border: 0;
    display: block;
    outline: none;
  }
  .login-btn[disabled] {
    background: #DDDDDD;
  }
}

header {
  font-size: 40px;
  height: 60px;
  padding-left: 10px;
  margin-bottom: 30px;
  color: #36AC70;
  text-align: center;
}

.sy-login-form {
  margin-top: 200px;
}

</style>
