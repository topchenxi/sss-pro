<template>
  <section>
    <title>订单确认</title>
    <mt-loadmore :top-method="loadTop" ref="loadmore" style="font-size:1.5rem;">
      <div class="productNumber-box">
        <span>货号：{{obj.productNumber}}</span>
      </div>
      <div style="color: #999;margin: 10px 4% 3px 4%;">
        <span style="font-size: 1.3rem">色号</span>
      </div>
      <template v-for="(item, index) in obj.colors">
        <div class="color-box" :key="index">
          <span>色号：{{item.color}}</span>
          </br>
          <span>数量：{{item.quantity}}</span>
          </br>
          <span>单价：{{item.price}}</span>
        </div>
      </template>
      <div style="color: #999;margin: 10px 4% 7px 4%;">
        <span style="font-size:1.3rem">收货地址</span>
      </div>
      <div class="address-box">
        <span style="font-weight:600;font-size:1.5rem">{{obj.addressName}}</span>
        </br>
        <span style="font-size:1.5rem; color:#000;">{{obj.addressTel}}</span>
        </br>
        <span style="font-size:1.3rem; color:#999;">{{obj.addressProvince}}&nbsp{{obj.addressCity}}&nbsp{{obj.addressArea}}&nbsp{{obj.addressAddr}}</span>
      </div>
      <div style="color: #999;margin: 10px 4%;">
        <span style="font-size:1.3rem">备注：</span>
      </div>
      <div class="remark-box">
        <span>{{obj.remark}}</span>
      </div>
      <div style="background-color:#f9f9f9;height:150px;"></div>
    </mt-loadmore>
    <div class="btn-box">
      <span>总计：
        <a style="color:#e63939">{{obj.totalMoney | formatNumber}}</a>
      </span>
      <el-button @click="orderConfirm" style="border-radius:0px;border:0px;height:50px;width:40%; float:right;" type="success">确认下单</el-button>
    </div>
  </section>
</template>

<script>
import request from '@/utils/request'
import { Indicator } from 'mint-ui'
export default {
  data() {
    return {
      obj: {}
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      let obj = JSON.parse(sessionStorage.getItem('orderConfirm'))
      this.obj = obj
      obj.set = false
      sessionStorage.removeItem('orderConfirm')
      sessionStorage.setItem('orderConfirm', JSON.stringify(obj))
    },
    orderConfirm() {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      request('/redwood/shop/bulk', {
        data: this.obj,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (res.success == 1) {
          this.$router.push({ name: 'orderResult', query: { result: 1 } })
        } else {
          sessionStorage.removeItem('orderResult')
          sessionStorage.setItem('orderResult', res)
          this.this.$router.push({ name: 'orderResult', query: { result: 2 } })
        }
        Indicator.close()
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
.bg-box {
  padding: 10px 4%;
  background-color: #fff;
}

.productNumber-box {
  @extend .bg-box;
  font-size: 1.5rem;
}

.color-box {
  @extend .bg-box;
  margin-top: 3px;
  font-size: 1.3rem;
  >span {
    line-height: 25px;
  }
}

.address-box {
  @extend .bg-box;
  >span {
    line-height: 25px;
  }
}

.remark-box {
  @extend .bg-box;
  font-size: 1.3rem;
  >span {
    line-height: 25px;
    width: inherit;
    word-break: break-all;
  }
}

.btn-box {
  background-color: #fff;
  width: 100%;
  position: fixed;
  bottom: 0px;
  padding: 0px 4% 0px 4%;
  font-size: 1.5rem;
  line-height: 50px;
  height: 50px;
  display: inline-block;
}
</style>
