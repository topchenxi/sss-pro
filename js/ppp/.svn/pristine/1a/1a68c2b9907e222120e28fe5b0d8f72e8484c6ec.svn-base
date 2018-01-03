<template>
  <mt-tabbar v-model="selected" fixed style="background-color: #fff">
    <mt-tab-item id="baitiao">
      <template v-if="selected == 'baitiao'">
        <img slot="icon" src="../../assets/home-active@1x.png">
        <span style="color:#08ce95">白条首页</span>
      </template>
      <template v-else>
        <img slot="icon" src="../../assets/home@1x.png">
        <span style="color:#999">白条首页</span>
      </template>
    </mt-tab-item>
    <mt-tab-item id="pay">
      <template v-if="selected == 'pay'">
        <img slot="icon" src="../../assets/pay-active@1x.png">
        <span style="color:#08ce95">待付款</span>
      </template>
      <template v-else>
        <img slot="icon" src="../../assets/pay@1x.png">
        <span style="color:#999">待付款</span>
      </template>
    </mt-tab-item>
    <mt-tab-item id="sendBulk" style="background-color: #08ce95">
      <img slot="icon" src="../../assets/fabu@1x.png">
      <span style="color: #fff">下大货</span>
    </mt-tab-item>
    <mt-tab-item id="myDebt">
      <template v-if="selected == 'myDebt'">
        <img slot="icon" src="../../assets/credit-active@1x.png">
        <span style="color:#08ce95">我的欠款</span>
      </template>
      <template v-else>
        <img slot="icon" src="../../assets/credit@1x.png">
        <span style="color:#999">我的欠款</span>
      </template>
    </mt-tab-item>
    <mt-tab-item id="myOrder">
      <template v-if="selected == 'myOrder'">
        <img slot="icon" src="../../assets/order-active@1x.png">
        <span style="color:#08ce95">我的订单</span>
      </template>
      <template v-else>
        <img slot="icon" src="../../assets/order@1x.png">
        <span style="color:#999">我的订单</span>
      </template>
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
import request from '@/utils/request'
import { MessageBox, Indicator } from 'mint-ui'
export default {
  data() {
    return {
      obj: 0,
      selected: '',
    }
  },
  watch: {
    selected: {
      handler: function(val) {
        // console.log(val)
        this.handleSelectedChange(val)
      },
      deep: true
    }
  },
  mounted() {
    this.getName()
  },
  methods: {
    getName() {
      const url = window.location.href
      // console.log(url)
      if (url.indexOf('baitiao') != -1) {
        this.selected = 'baitiao'
      } else if (url.indexOf('pay') != -1) {
        this.selected = 'pay'
      } else if (url.indexOf('sendBulk') != -1) {
        this.selected = 'sendBulk'
      } else if (url.indexOf('myDebt') != -1) {
        this.selected = 'myDebt'
      } else if (url.indexOf('myOrder') != -1) {
        this.selected = 'myOrder'
      }
    },
    handleSelectedChange(val) {
      if (val != 'sendBulk') {
        this.$router.push({ name: val })
      } else {
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        })
        request('/redwood/shop/loanCount/my', {
          data: {},
          method: 'GET'
        }).then(res => {
          if (res.success == 1) {
            this.obj = res.obj
            if (this.obj > 0) {
              MessageBox('', '你尚有逾期欠款未结清,不能继续下大货,请尽快结清欠款!')
            } else {
              this.$router.push({ name: val })
            }
          } else {
            this.Toast({
              message: res.msg,
              position: 'bottome',
              duration: 2000,
            })
          }
          Indicator.close()
        })
      }
    }
  }
}
</script>

<style>

</style>
