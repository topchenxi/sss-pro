<template>
  <div class="login-container">
    <div class="logo"></div>
    <div class="login-wrap">
      <el-form :model="ruleForm2" ref="ruleForm2" :rules='rules2'>
        <div class="item">
          <i></i>
          <input autocomplete="off" placeholder="账号" v-model="ruleForm2.username" type="text" validateevent="true">
        </div>
        <div class="item">
          <i></i>
          <input autocomplete="off" placeholder="密码" v-model="ruleForm2.password" type="password" validateevent="true">
        </div>
        <div class="btn-group">
          <button type="button" @click="handleSubmit2">登录</button>
          <button type="button" @click="handleReset2">重置</button>
        </div>
      </el-form>
    </div>
    <div class="login-bg"></div>
  </div>
</template>
<script type="text/javascript">
import MD5 from 'md5'
import { request, setCache } from '../../../common/utils'
import Seed from '../../../api/seed'

export default {
  data() {
    var validaePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else {
        if (this.ruleForm2.password !== '') {
          this.$refs.ruleForm2.validateField('password');
        }
        callback();
      }
    }
    var validaePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    }
    return {
      ruleForm2: {
        username: '',
        password: ''
      },
      load: false,
      rules2: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { validator: validaePass }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validaePass2 }
        ]
      }
    }
  },
  mounted() {
    this.keyCodeBind()
  },
  computed: {},
  methods: {
    keyCodeBind() {
      const that = this
      document.addEventListener('keyup', function(event) {
        if (event.keyCode == '13') {
          if (location.href.indexOf('login') > -1) {
            that.handleSubmit2()
          }
        }
      }, true);
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
        if (res.code == 1 && res.loginInfo.admin) {
          const that = this
          this.$message({
            message: '登录成功',
            type: 'success',
            duration: 1000,
            onClose() {
              setCache({
                key: 'currentUser',
                value: res
              })
              that.$router.push({ path: '/team/userManage' })
              // location.href = '/'
            }
          })
        } else if (res.code == 1 && !res.loginInfo.admin) {
          this.$message.error('登录权限受限')
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
    handleReset2() {
      // this.$refs.ruleForm2.resetFields();
      this.ruleForm2.username = '';
      this.ruleForm2.password = '';
    },
    handleSubmit2(ev) {
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          this.submit()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}

</script>
<style lang="scss" scoped>
@import './login.scss';

</style>
