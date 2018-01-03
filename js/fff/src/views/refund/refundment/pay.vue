<template lang="html">
  <div class="content" v-loading.fullscreen="fullscreenLoading">
    <!-- <h1>付款列表</h1> -->
    <div class="box">
      <p> 账户余额: <a href="http://pay.suning.com" target="_blank">查询</a> </p>
      <el-row>
        <el-col :span="12" :offset="7"> 退款金额：{{dispatch.applyMoney}}元 </el-col>
      </el-row>
      <el-col :span="12" :offset="3">
        <el-form :model="payForm" label-width="150px">
          <el-form-item label="短信验证码" prop="accountName">
            <el-col :span="11">
              <el-input v-model="payForm.smsCode"></el-input>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-button type="primary" @click.native.prevent="getCode" :disabled="getCodeDisabled">{{getCodeStr}}</el-button>
            </el-col>
          </el-form-item>
          <el-form-item label="请输入支付密码">
            <el-input v-model="payForm.payPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.native.prevent="onSubmit">确认付款</el-button>
            <el-button @click.native.prevent="handleReturn">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12" :offset="7" class="text-red">
        确认付款后，资金将直接进入对方账户，无法退款。
      </el-col>
    </div>
  </div>
</template>

<script>
import {
  request,
  getCache,
  setCache,
} from 'src/common/utils.js'
import SeedApi from 'api/seed'
import AccountApi from 'api/account'
import MD5 from 'md5'
export default {
  data() {
    return {
      time: new Date().getTime(),
      payForm: {
        batchNo: '', // 付款编号
        smsCode: '',
        payPassword: ''
      },
      dispatch: {},
      fullscreenLoading: false,
      getCodeDisabled: false,
      getCodeStr: '获取短信验证码',
    };
  },
  mounted() {
    this.payForm.batchNo = this.$route.params.batchNo;
    this.dispatch = getCache({
      key: 'dispatch'
    });
  },
  computed: {},
  ready() {},
  attached() {},
  methods: {
    onSubmit() {
      // console.log('PayTransaction.comfirmPay!');
      this.fullscreenLoading = true;
      const param = {
        batchNo: this.payForm.batchNo,
        smsCode: this.payForm.smsCode,
        payPassword: MD5(this.payForm.payPassword),
        _time: this.time,
      }
      request({
        url: AccountApi.BuyerRefund.comfirmPayRefund,
        method: 'post',
        data: {
          param: JSON.stringify(param)
        },
      }).then(data => {
        console.log('data', data);
        this.fullscreenLoading = false;
        if (data.success === '1') { // 业务正常，但包含付款失败
          setCache({
            key: 'payResult',
            value: data.obj
          });
          this.$router.push('/refund/refundment/payResult');
        } else { // 短信验证码及支付密码错误
          this.$message({
            type: 'error',
            showClose: true,
            message: data.msg
          });
        }
      })
    },
    /**
     * 获取短信验证码
     */
    getCode() {
      this.fullscreenLoading = true;
      request({
        url: SeedApi.sendCode,
        method: 'post',
      }).then(data => {
        console.log('data', data);
        this.fullscreenLoading = false;
        if (data.success === '1') {
          this.getCodeDisabled = true;
          this.cutdown(60);
          this.$message({
            type: 'success',
            message: '短信验证码发送成功！'
          });
        } else {
          this.$message({
            type: 'error',
            message: '短信验证码发送失败！'
          });
        }
      }).catch(err => {
        console.log('err', err);
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
          that.getCodeStr = `重新发送`;
        } else {
          setTimeout(loop, 1000); // 使用 setTimeout对性能影响小
        }
      })();
    },
    /**
     * 返回上一页
     */
    handleReturn() {
      this.$router.back();
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.text-red {
    color: red;
}
.box{
  overflow: hidden;
}
.el-row{
  margin-bottom: 20px;
}
</style>
