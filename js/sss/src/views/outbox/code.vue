<template>
  <div>
    <div class="oms-title-wrap">
      <h2>短信验证码</h2>
    </div>
    <div class="containter code-wrap" :style="{ height : windowHeight-160 , overflowY : 'auto' }">
      <h4>手机号</h4>
      <p>请输入相应的手机号</p>
      <el-input v-model="tel" placeholder="手机号" @keyup.enter.native="getCode"></el-input>
      <div>
        <el-button @click.native="getCode">获取验证码</el-button>
      </div>
      <div class="mobile-wrap">
        <div class="code">验证码：{{code}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getTelCode } from 'src/common/service';
export default {
  data() {
    return {
      tel: '',
      code: ''
    }
  },
  methods: {
    async getCode() {
      if (!this.tel) {
        this.$message.error('请先输入手机号');
        return;
      }
      let res = await getTelCode(this.tel);
      if (res.success !== '1') return;
      this.code = !res.obj ? '无' : res.obj;
    }
  }
};

</script>
<style lang="scss" scoped>
.code-wrap {
  position: relative;
  min-height: 600px;
  padding-left: 60px;
  h4 {
    font-size: 30px;
    font-weight: normal;
    margin-top: 200px;
    color: #333;
  }
  p {
    font-size: 14px;
    margin-top: 30px;
    color: #666;
  }
  .el-input {
    width: 320px;
    margin-top: 20px;
  }
  button {
    margin-top: 30px;
  }
  .mobile-wrap {
    position: absolute;
    top: 40px;
    left: 500px;
    width: 423px;
    height: 676px;
    background: url('../../static/images/mobile.png') center center no-repeat;
    background-size: 423px 676px;
    .code {
      font-size: 30px;
      position: absolute;
      top: 278px;
      left: 0;
      width: 100%;
      text-align: center;
      color: #fff;
    }
  }
}

</style>
