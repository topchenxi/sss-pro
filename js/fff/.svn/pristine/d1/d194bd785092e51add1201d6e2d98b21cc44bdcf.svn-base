<template>
  <section class="section-content">
    <div class="logo-content">
      <span class="logo-login"></span>
      </br>
      <span class="logo-pic"></span>
    </div>
    <div class="login-content">
      <div class="title">
        <p>搜芽财务管理系统</p>
      </div>
      <div class="login-box">
        <el-form :rules="rules" ref="ruleForm2" :model="ruleForm2">
          <el-form-item prop="username">
            <p>账号</p>
            <el-input v-model="ruleForm2.username" @keyup.enter.native="submit" placeholder="请输入您的账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <p>密码</p>
            <el-input v-model="ruleForm2.password" @keyup.enter.native="submit" placeholder="请输入您的密码" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit-btn" :disabled="!ruleForm2.username || !ruleForm2.password" @click="submit">登录</el-button>
            <el-button @click="reset" class="reset-btn">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </section>
</template>
<style lang="scss">
.section-content {
  background-color: #fff;
  width: 100%;
  height: 100%;
  .logo-content {
    float: left;
    width: 50%;
    height: 100%;
    // background-color: #ccc;
    .logo-login {
      margin-top: 6%;
      margin-left: 10%;
      background: url(../../../assets/icon/logo-login.png) 0 0 no-repeat;
      display: inline-block;
      height: 50px;
      width: 136px;
      background-size: 100% 100%;
      vertical-align: bottom;
    }
    .logo-pic {
      margin-left: 16%;
      margin-top: 23%;
      background: url(../../../assets/icon/pic.png) 0 0 no-repeat;
      display: inline-block;
      height: 338;
      width: 527px;
      background-size: 100% 100%;
      vertical-align: bottom;
    }
  }
  .login-content {
    float: right;
    width: 50%;
    padding-top: 15%;
    .title {
      p {
        padding-left: 7.5%;
        padding-right: 30%;
        color: #333;
        font-size: 50px;
        text-align: left;
        font-weight: 500;
      }
    }
    .login-box {
      padding-left: 7.5%;
      padding-right: 30%;
      margin-top: 5%;
      text-align: left;
      p {
        font-size: 17px;
        color: #bbb;
      }
      .el-form {
        .el-form-item {
          margin-top: 35px !important;
          margin-bottom: 0px !important;
        }
      }
      .el-input__inner {
        margin-top: 10px;
        border: none;
        border-bottom: 2px solid #ddd;
        font-size: 19px;
        color: #666 !important;
      }
      .is-error {
         .el-input__inner {
           border-bottom: 2px solid #f00;
         }
      }
      .el-button {
        width: 45%;
      }
      .reset-btn {
        float: right;
        color: #999;
        font-size: 19;
        border-color: #ddd;
        &:hover {
          background-color: #f2f2f2;
          border-color: #f2f2f2;
        }
      }
      .submit-btn {
        float: left;
        font-size: 19;
        color: #fff;
        &:hover {
          background-color: #22A65C;
          border-color: #22A65C;
        }
      }
    }
  }
}
</style>

<script type="text/javascript">
import MD5 from 'md5'
import { request, setCache } from '../../../common/utils'
import Seed from '../../../api/seed'

export default {
  data() {
    return {
      rules: {
        username: [
          { required: true, message: '请输入您的账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入您的密码', trigger: 'blur' }
        ]
      },
      ruleForm2: {
        username: '',
        password: ''
      },
      arr: [],
      width: '',
      load: false,
    }
  },
  mounted() {
    this.width = document.body.clientWidth
    let number = parseInt(this.width / 105)
    this.arr = []
    for (let i = 0; i < number; i++) {
      let rnum = Math.ceil(Math.random() * 400)
      if (rnum < 100) {
        rnum += 50
      }
      let obj = {
        left: 105 * i + 80,
        height: rnum > 150 ? rnum : rnum * 2
      }
      this.arr.push(obj)
    }
  },
  computed: {
  },
  methods: {
    reset() {
      this.ruleForm2.username = ''
      this.ruleForm2.password = ''
    },
    submit() {
      this.load = true
      const { username, password } = this.ruleForm2
      if (!username || !password) {
        this.$message({
          type: 'error',
          message: '请输入账号或密码'
        });
        this.load = false
        return false
      }
      request({
        url: Seed.login,
        data: {
          userName: username,
          pwd: MD5(password)
        },
        method: 'post'
      }, (res) => {
        this.load = false;
        if (res.code == 1) {
          console.log('ssss')
          this.$message({
            message: '登录成功',
            type: 'success',
            duration: 1000,
            onClose() {
              setCache({
                key: 'currentUser',
                value: res
              })
              // this.$router.push({ path: '/finance/pendingAccount' })
              location.href = '/finance/pendingAccount'
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
  }
}
</script>
