<template>
  <section>
    <title>下单结果</title>
    <template v-if="result == 1">
      <div class="img-box">
        <img width="30%" src="../../../assets/success@1x.png"></img>
        </br>
        <div style="padding-top:50px;">
          <span style="font-weight:600;font-size:1.8rem;">下单成功!</span>
        </div>
        <div style="padding-top: 75px;">
            <el-button @click.native="anotherOrder" style="background-color: #08ce95; border:none; height:48px; color:#fff;width:89.3%;font-size:1.8rem">再来一单</el-button>
        </div>
        <router-link :to="{name: 'baitiao'}">
            <el-button style="width:80%;font-size:2.5rem;height:48px; margin-top: 20px;width:89.3%;font-size:1.8rem">返回首页</el-button>
          </router-link>
      </div>
    </template>
    <template v-else>
      <div class="img-box">
        <img width="30%" src="../../../assets/fail@1x.png"></img>
        </br>
        <div style="padding-top:50px;">
          <span style="font-weight:600;font-size:1.8rem;">下单失败!</span>
        </div>
        <!-- <div style="padding-top: 25px;">
          <span style="color:#999;font-size: 1.3rem">失败原因待定</span>
        </div> -->
        <div style="padding-top: 75px;">
          <router-link :to="{name: 'orderConfirm'}">
            <el-button style="background-color:#08ce95;border:none; height:48px; color:#fff;border:none;width:89.3%;font-size:1.8rem">重新下单</el-button>
          </router-link>
          <router-link :to="{name: 'myOrder'}">
            <el-button style="width:80%;font-size:2.5rem;height:48px; margin-top: 20px;width:89.3%;font-size:1.8rem">返回首页</el-button>
          </router-link>
        </div>
      </div>
    </template>
  </section>
</template>

<script>
import request from '@/utils/request'
import { MessageBox } from 'mint-ui'
export default {
  data() {
    return {
      result: 0,
    }
  },
  mounted() {
    this.result = this.$route.query.result
    console.log(this.result)
  },
  methods: {
    anotherOrder() {
      request('/redwood/shop/loanCount/my', {
        data: {},
        method: 'GET'
      }).then(res => {
        if (res.success == 1) {
          this.obj = res.obj
          if (this.obj > 0) {
            MessageBox('', '你尚有逾期欠款未结清,不能继续下大货,请尽快结清欠款!')
          } else {
            this.$router.push({ name: 'sendBulk' })
          }
        } else {
          this.Toast({
            message: res.msg,
            position: 'bottome',
            duration: 2000,
          })
        }
      })
    }
  }
}
</script>

<style>
section {
  width: 100%;
  background-color: #fff;
}

.img-box {
  width: 100%;
  text-align: center;
  margin-top: 30%;
}
</style>
