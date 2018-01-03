<template>
  <section class="section-box">
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1, user-scalable=no;" name="viewport" />
    <div class="uglyTitle">
      <div class="toLeft">
        <img src="../../assets/iconToLeft.png" @click="toLeftClick" width="30" height="30"></img>
      </div>
      <div class="titleTitle">支用申请</div>
    </div>
    <template v-if="!submitSuccess">
      <template v-if="baitiaoApply">
        <div class="applyBody">
          <!-- <label class="titleContainer">贷款申请</label> -->
          <div class="orderMsgContainer">
            <label class="orderMsg">订单编号：
              <span>{{baitiaoApply.number}}</span>
            </label>
            <label class="orderMsg">下单时间：
              <span>{{dateFormat(baitiaoApply.createTime)}}</span>
            </label>
            <label class="orderMsg">订单金额：
              <span>{{moneyFormat(baitiaoApply.money)}}元</span>
            </label>
          </div>
          <div class="applyMsgContainer">
            <label class="applyMsg">申请金额：
              <span>{{moneyFormat(baitiaoApply.money)}}元</span>
            </label>
            <label class="applyMsg">到期日期：
              <span>{{timeFormat(baitiaoApply.expectedRepaymentTime)}}</span>
            </label>
            <label class="applyMsg">逾期服务费率：
              <span style="margin-left:0.9rem">{{baitiaoApply.interest}}%</span>
            </label>
          </div>
          <div class="confirmContainer">
            <!-- <label class="myBaitiaoMsg">我的白条可用额度为
              <span>{{moneyFormat(baitiaoApply.baitiaoRemainLine)}}元</span>
            </label> -->
            <div class="confirmRead">
              <input type="checkbox" style="vertical-align:bottom" v-model="checked">
              <span>我已同意并阅读</span>
              <a style="text-decoration:none" @click="toContract">《保理用户服务协议》</a>
              </input>
            </div>
            <div class="confirmBtn">
              <template v-if="!checked">
                <el-button :disabled="!checked" style="background-color:#8b8b8b" type="primary" @click.native="confirmUpload">
                  <span class="btu">确认提交</span>
                </el-button>
              </template>
              <template v-else>
                <el-button :disabled="!checked" style="background-color:#0074C6" type="primary" @click.native="confirmUpload">
                  <span class="btu">确认提交</span>
                </el-button>
              </template>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="hadPayContainer">
          <div class="logo_text_container">
            <div class="logo">
              <img src="../../assets/hadPay.png" width="140" height="140"></img>
            </div>
            <div class="text">
              <span>订单已完成支付</span>
            </div>
          </div>
        </div>
      </template>
    </template>
    <template v-else>
      <div class="submit-success-container">
        <div class="submit-success-box">
          <div class="laugh-logo">
            <img src="../../assets/laugh.png" width="90" height="90"></img>
          </div>
          <div class="laugh-text">
            <span>申请成功!</span>
            </br>
            <span>您可以在“我的贷款”中查看</span>
          </div>
        </div>
        <div class="orderNumber-box">
          <span>订单编号
            <a>{{baitiaoApply.number}}</a>
          </span>
        </div>
      </div>
    </template>
  </section>
</template>

<script>
import { newRequest } from 'common/utils'
export default {
  data() {
    return {
      baitiaoApply: {
        number: '',
        createTime: '',
        money: 0,
        expectedRepaymentTime: '',
        interest: 0,
        baitiaoRemainLine: 0,
        id: ''
      },
      checked: false,
      submitSuccess: false,
    }
  },
  mounted() {
    this.baitiaoApply.id = this.$route.query.id
    this.getData()
  },
  methods: {
    toContract() {
      this.$router.push({
        path: '/baitiao/contract',
        query: {
          id: this.baitiaoApply.customerId,
          expectedRepaymentTime: this.baitiaoApply.expectedRepaymentTime,
          money: this.baitiaoApply.money,
          number: this.baitiaoApply.number,
        },
      })
      // console.log(this.$router)
    },
    confirmUpload() {
      console.log('confirm')
      newRequest({
        url: '/redwood/v1/apply/' + this.baitiaoApply.id,
        method: 'put',
        contentType: 'application/json',
        data: {}
      }).then((response) => {
        if (response.success == '1') {
          this.submitSuccess = true
        } else {
          this.$message.error(response.msg);
        }
      })
    },
    getData() {
      newRequest({
        url: '/redwood/v1/apply/' + this.baitiaoApply.id,
        method: 'get',
        data: {}
      }).then((response) => {
        console.log(response)
        if (response.success == '1') {
          this.baitiaoApply = response.obj
        } else {
          this.$message.error(response.msg)
        }
      })
    },
    // 调用外部方法
    toLeftClick() {
      // this.closeXiMuView()
      // 判断ios android
      var u = navigator.userAgent.toLowerCase()
      var isAndroid = (u.indexOf('android') > -1) // android终端
      // var isiOS = u.indexOf('ios') > -1 // ios终端
      if (isAndroid) {
        window.app.javascriptInvoke('goback')
      } else {
        this.setupWebViewJavascriptBridge()
        window.WebViewJavascriptBridge.callHandler('closeXiMuView')
      }
    },
    setupWebViewJavascriptBridge(callback) {
      if (window.WebViewJavascriptBridge) { return callback(window.WebViewJavascriptBridge); }
      if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
      window.WVJBCallbacks = [callback];
      var WVJBIframe = document.createElement('iframe');
      WVJBIframe.style.display = 'none';
      WVJBIframe.src = 'wvjbscheme://__bridge_loaded__';
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
    },
    timeFormat(data) {
      let date = new Date(data)
      // console.log(date)
      if (date) {
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        var d = date.getDate();
      }
      return y + '-' + m + '-' + d
    },
    moneyFormat(data) {
      var dataStr = String(data)
      var dataArr = dataStr.split('.')
      var len = dataArr[0].length
      var len1 = len % 3
      var dataBack = ''
      dataBack = dataArr[0].substr(0, len1)
      for (var i = len1; i < len;) {
        if (dataBack != '') {
          dataBack = dataBack + ',' + dataArr[0].substr(i, 3)
        } else {
          dataBack = dataArr[0].substr(i, 3)
        }
        i = i + 3
      }
      if (dataArr[1]) {
        dataBack = dataBack + '.' + dataArr[1]
      } else {
        dataBack = dataBack + '.' + '00'
      }
      return dataBack
    },
    dateFormat(data) {
      let date = new Date(data)
      if (date) {
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        var d = date.getDate()
        var h = date.getHours()
        var min = date.getMinutes()
        var s = date.getSeconds()
        m = m < 10 ? ('0' + m) : m
        d = d < 10 ? ('0' + d) : d
        h = h < 10 ? ('0' + h) : h
        min = min < 10 ? ('0' + min) : min
        s = s < 10 ? ('0' + s) : s
        return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s
      }
    }
  },
}
</script>

<style scoped>
.section-box{
  height: 100%;
  overflow: hidden;
}
.uglyTitle {
  background-color: #383A3E;
  height: 55px;
  border-bottom: 1px solid;
  width: 100%;
  text-align: center;
  display: inline-block;
  line-height: 60px;
  position: fixed;
}

.uglyTitle .toLeft {
  margin-top: 12.5px;
  width: 30px;
  height: 30px;
  float: left;
  position: absolute;
}

.uglyTitle .titleTitle {
  font-size: 104%;
  text-align: center;
  font-weight: 600;
  color: #fff;
  font-family: "Helvetica Neue", Helvetica, Tahoma, STHeiTi, Simhei, sans-serif;
}

.applyBody {
  height: 100%;
  background-color: #EDEDEE;
  width: 100%;
  padding-top:70px;
  font-weight: 500;
  font-family: "Helvetica Neue", Helvetica, Tahoma, STHeiTi, Simhei, sans-serif;
}

.titleContainer {
  width: 60%;
  padding-top: 16px;
  padding-left: 12px;
  padding-bottom: 10px;
  text-align: left;
  display: inline-block;
  font-size: 0.9rem;
  color: grey;
}

.orderMsgContainer {
  margin-left: 2px;
  margin-right: 2px;
  background-color: #fff;
  padding-left: 20px;
  border-top: 1px solid #e5e4e4;
}

.orderMsgContainer .orderMsg {
  width: 100%;
  display: inline-block;
  font-size: 111%;
  text-align: left;
  height: 39.5px;
  line-height: 39.5px;
}

.orderMsg>span {
  font-family: "Helvetica Neue", Helvetica, Tahoma, STHeiTi, Simhei, sans-serif;
  margin-left: 0.8rem;
  font-size: 111%;
}

.applyMsgContainer {
  margin-top: 15px;
  background-color: #fff;
  margin-left: 2px;
  margin-right: 2px;
  padding-left: 20px;
}

.applyMsgContainer .applyMsg {
  display: inline-block;
  line-height: 40px;
  height: 40px;
  text-align: left;
  width: 100%;
  font-size: 111%;
}

.applyMsg>span {
  font-family: "Helvetica Neue", Helvetica, Tahoma, STHeiTi, Simhei, sans-serif;
  text-align: left;
  margin-left: 3.1rem;
  font-size: 111%;
}

.confirmContainer {
  margin-left: 1%;
  margin-right: 1%;
  ;
  width: 98%;
  text-align: center;
}

.confirmContainer .myBaitiaoMsg {
  width: 85%;
  padding-top: 3px;
  margin-top: 1px;
  padding-left: 5px;
  display: inline-block;
  line-height: 3rem;
  height: 3rem;
  text-align: left;
  font-size: 104%;
}

.myBaitiaoMsg>span {
  font-family: "Helvetica Neue", Helvetica, Tahoma, STHeiTi, Simhei, sans-serif;
  color: #2C2CFD;
  font-weight: bold;
  font-size: 20px;
}

.confirmRead {
  padding-top: 10px;
  margin-top: 10px;
  text-align: center;
  margin-bottom: 0.5rem;
  font-size: 104%;
}

.confirmRead>a {
  cursor: pointer;
  color: #2C2CFD;
  font-family: "Helvetica Neue", Helvetica, Tahoma, STHeiTi, Simhei, sans-serif;
}

.confirmBtn {
  margin-top: 21px;
  width: 95%;
  margin-left: 2%;
}

.confirmBtn .el-button {
  width: 100%;
  height: auto;
  border: 0 color;
}

.btu {
  font-family: "Helvetica Neue", Helvetica, Tahoma, STHeiTi, Simhei, sans-serif;
  font-weight: 550;
  display: inline-block;
  line-height: 17px;
  font-size: 17px;
  color: #fff;
}

.hadPayContainer {
  width: 100%;
  height: 100%;
  background-color: #F2F2F2;
}

.logo_text_container {
  text-align: center;
  width: 100%;
  height: 100%;
}

.logo_text_container .logo {
  padding-top: 40%;
}

.logo_text_container .text {}

.text>span {
  font-family: "Helvetica Neue", Helvetica, Tahoma, STHeiTi, Simhei, sans-serif;
  color: #666666;
}

.submit-success-container {
  background-color: #eee;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 100px;
}

.submit-success-container .submit-success-box {
  padding-top: 30px;
  text-align: center;
  width: 100%;
  background: #fff;
  padding-bottom: 30px;
}

.submit-success-box .laugh-logo {
  background: #fff;
}

.submit-success-box .laugh-text {}

.laugh-text>span {
  font-family: "Helvetica Neue", Helvetica, Tahoma, STHeiTi, Simhei, sans-serif;
  font-size: 18px;
}

.submit-success-container .orderNumber-box {
  width: 98%;
  text-align: right;
}

.orderNumber-box>span {
  font-size: 16px;
  font-family: "Helvetica Neue", Helvetica, Tahoma, STHeiTi, Simhei, sans-serif;
}

.orderNumber-box>span>a {
  font-size: 16px;
  color: #4343EE;
  font-family: "Helvetica Neue", Helvetica, Tahoma, STHeiTi, Simhei, sans-serif;
}
</style>
