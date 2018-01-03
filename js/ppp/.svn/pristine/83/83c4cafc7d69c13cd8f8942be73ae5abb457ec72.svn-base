<template>
  <section>
    <title>详情</title>
    <mt-loadmore :top-method="loadTop" ref="loadmore" style="font-size:1.5rem;">
    <div class="order-box">
      <div class="orderNumber-box">
        <span style="font-size: 1.5rem; color:#000">订单号：{{obj.number}}</span>
        </br>
        <span style="font-size:1.3rem ;color:#999;line-height: 2.5rem">{{obj.createTime | formatTime}}</span>
      </div>
      <div class="productNumber-box">
        <span style="font-size: 1.5rem; color:#000">货号：{{obj.productNumber}}</span>
      </div>
      <div class="colorList-box">
        <template v-for="(item, index) in obj.colors">
          <div class="color-box" :key="index">
            <span>色号：{{item.color}}</span>
            </br>
            <span>数量：{{item.quantity}}{{obj.unit}}</span>
            </br>
            <span>单价：{{item.price}}元/{{obj.unit}}</span>
          </div>
        </template>
      </div>
      <div class="totalPrice-box">
        <span style="font-size: 1.5rem; color:#000">总计：
          <a style="font-size: 1.5rem; color: #e63939">{{obj.totalMoney | formatNumber}}</a>
        </span>
      </div>
    </div>
    <template v-if="!obj.colors || obj.colors.length < 3">
        <div style="background-color: #f9f9f9;height: 150px"></div>
      </template>
    </mt-loadmore>
    <el-button @click.native="baitiaoPay" type="success">白条支付</el-button>
  </section>
</template>

<script>
// import config from '../data.json'
import request from '@/utils/request'
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      reqParams: {
        id: '',
        number: ''
      },
      obj: {
        colors: []
      },
    }
  },
  mounted() {
    this.reqParams.id = this.$route.query.id
    this.reqParams.number = this.$route.query.number
    this.getData()
  },
  methods: {
    getData() {
      // let res = config.orderDetail
      // this.obj = res.obj
      request(`/redwood/shop/bulk/${this.reqParams.id}`, {
        // data: this.reqParams,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (res.success == 1) {
          this.obj = res.obj
        } else {
          Toast({
            message: res.msg,
            position: 'bottom',
            duration: 2000
          })
        }
      })
    },
    baitiaoPay() {
      request('/redwood/v1/link/pay', {
        method: 'GET',
        data: {
          payId: this.reqParams.number
        }
      }).then(res => {
        if (res.success == 1) {
          // 待定
          window.open(res.obj)
        } else {
          Toast({
            message: res.msg,
            position: 'bottom',
            duration: 2000,
          })
        }
      })
    },
    loadTop() {
      window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
section{
  background-color: #f9f9f9;
}
.order-box {
  padding-bottom: 60px;
  .orderNumber-box {
    padding: 10px 4% 10px 4%;
    background-color: #fff;
  }
  .productNumber-box {
    padding: 10px 4% 10px 4%;
    background-color: #fff;
    margin-top: 10px;
  }
  .colorList-box {
    .color-box {
      margin-top: 3px;
      padding: 10px 4% 10px 4%;
      background-color: #fff;
      font-size: 1.5rem;
      &>span {
        line-height: 3rem;
      }
    }
  }
  .totalPrice-box {
    margin-top: 10px;
    padding: 10px 4% 10px 4%;
    background-color: #fff;
    text-align: right;
  }
}

.el-button {
  // margin-top: 10px;
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 50px;
}
</style>
