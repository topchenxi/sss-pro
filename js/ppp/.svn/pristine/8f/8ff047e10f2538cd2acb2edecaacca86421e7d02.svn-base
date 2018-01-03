<template>
  <section>
    <title>订单详情</title>
    <div class="order-box">
      <div class="orderNumber-box">
        <span style="font-size: 1.5rem; color:#000">订单号：{{obj.number}}</span>
        </br>
        <span style="font-size:1.3rem ;color:#999;line-height: 2.5rem">{{obj.createTime | formatTime}}</span>
        <span style="float:right; color:#08ce95; font-size: 1.5rem;">{{obj.statusDescr}}</span>
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
      <div class="remark-box">
        <span style="font-size: 1.5rem">备注：
          <a style="font-size: 1.3rem">{{obj.remark}}</a>
        </span>
      </div>
      <div class="totalPrice-box">
        <span style="font-size: 1.5rem; color:#000">总计：
          <a style="font-size: 1.5rem; color: #e63939">{{obj.totalMoney | formatNumber}}</a>
        </span>
      </div>
    </div>
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
      },
      obj: {
        colors: []
      },
    }
  },
  mounted() {
    this.reqParams.id = this.$route.query.id
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
    }
  }
}
</script>

<style lang="scss" scoped>
section{
  background-color: #f9f9f9;
}
.order-box {
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
        line-height: 2.8rem;
      }
    }
  }
  .remark-box {
    margin-top: 5px;
    // margin-bottom: 5px;
    padding: 10px 4%;
    background-color: #fff;
  }
  .totalPrice-box {
    margin-top: 10px;
    padding: 10px 4% 10px 4%;
    background-color: #fff;
    text-align: right;
  }
}
</style>
