<template>
  <section>
    <title>待付款</title>
    <Tab></Tab>
    <mt-loadmore :top-method="loadTop" ref="loadmore" style="font-size: 1.5rem">
      <template v-if="obj.result && obj.result.length">
        <ul class="payList-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
          <template v-for="(item,index) in obj.result">
            <div class="pay-box" :key="index">
              <div style="">
                <div style="border-bottom:1px solid #f9f9f9;padding: 10px 4% 10px 4%;">
                  <span style="font-size: 1.5rem; color:#000">订单号：{{item.number}}</span>
                  </br>
                  <span style="font-size:1.3rem ;color:#999;line-height: 2.5rem">{{item.createTime | formatTime}}</span>
                  <router-link :to="{name: 'payDetail', query: {number: item.number, id: item.id}}">
                    <el-button style="border:none;float:right;height:25px;padding:0px; width:50px;">
                      <i style="float:right" class="el-icon-arrow-right"></i>
                    </el-button>
                  </router-link>
                </div>
              </div>
              <div style="border-bottom: 1px solid #f9f9f9;padding:12px 4% 12px 4%;">
                <span style="line-height:25px;font-size: 1.5rem; color:#000;">货号：{{item.productNumber}}</span>
                <span style="margin-left:20px;line-height:25px;font-size: 1.5rem; color:#000;">总数量：{{item.totalQuantity | formatNumber}}{{item.unit}}</span>
                </br>
                <span style="line-height:25px;font-size: 1.5rem; color:#000">总计：
                  <a style="font-size: 1.5rem; color: #e63939">{{item.totalMoney | formatNumber}}</a>
                </span>
                <el-button @click.native="baitiaoPay(item.number)" type="success" style="float:right;padding:8px;">白条支付
                </el-button>
              </div>
            </div>
          </template>
        </ul>
      </template>
      <template v-else>
        <div class="paynull-box">
          <img src="../../../assets/pay-null@1x.png" width="32%"></img>
          <div style="padding-top: 20px;padding-bottom: 50%;">
            <span style="font-size: 1.3rem; color: #999;">暂无需待付款记录~</span>
          </div>
        </div>
      </template>
      <template v-if="!result || result.length < 4">
        <div style="background-color: #f9f9f9;height:150px;"></div>
      </template>
    </mt-loadmore>
    <!-- <el-button style="width:89.3%;margin-left:5.35%;" type="success" @click.native="signOut">退出</el-button> -->
    <!-- 测试专用退出按钮 -->
  </section>
</template>

<script>
import Tab from '../bottomTab.vue'
import request from '@/utils/request'
import { Toast, Indicator } from 'mint-ui'
export default {
  components: {
    Tab,
  },
  data() {
    return {
      pageNumber: 1,
      loading: false,
      obj: {
        hasNextPage: 0,
        result: [],
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 测试专用按钮
    signOut() {
      request('/soouya/v1/shopToken/my', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if (response.success !== '1') {
          this.$Message({
            type: 'error',
            message: response.msg,
            duration: 1000
          })
        } else {
          localStorage.clear()
          sessionStorage.clear()
          this.$router.replace({
            name: 'newLogin'
          })
        }
      })
    },
    getData() {
      this.loading = true
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      // let res = config.myOrder
      request('/redwood/shop/bulk', {
        method: 'GET',
        data: {
          pageNumber: this.pageNumber,
          status: 601
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (res.success == 1) {
          this.obj.hasNextPage = res.page.hasNextPage
          res.page.result.forEach(item => {
            item.totalQuantity = 0
            item.colors.forEach(color => {
              item.totalQuantity += color.quantity
            })
            this.obj.result.push(item)
          })
        } else {
          Toast({
            message: res.msg,
            position: 'bottom',
            duration: 2000
          })
        }
        Indicator.close()
        this.loading = !this.obj.hasNextPage
      })
    },
    loadMore() {
      this.pageNumber += 1
      this.getData()
    },
    loadTop() {
      window.location.reload()
    },
    baitiaoPay(number) {
      request('/redwood/v1/link/pay', {
        method: 'GET',
        data: {
          payId: number
        },
      }).then(res => {
        if (res.success == 1) {
          // 待定
          window.location.href = res.obj
        } else {
          Toast({
            message: res.msg,
            position: 'bottom',
            duration: 2000,
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
.el-icon-arrow-right {
  color: #999;
}

.payList-box {
  // min-height: 100%;
  padding-bottom: 50px;
  background-color: #f9f9f9;
  .pay-box {
    background-color: #fff;
    display: table;
    width: 100%;
    margin-bottom: 12px;
  }
}

.paynull-box {
  margin-top: 30%;
  text-align: center;
}
</style>
