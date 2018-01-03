<template>
  <section>
    <title>我的订单</title>
    <Tab>
    </Tab>
    <mt-loadmore :top-method="loadTop" ref="loadmore" style="font-size:1.5rem">
      <template v-if="obj.result && obj.result.length">
        <ul class="orderList-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
          <template v-for="(item,index) in obj.result">
            <div class="order-box" :key="index">
              <div style="">
                <div style="border-bottom:1px solid #f9f9f9;padding: 10px 4% 10px 4%;">
                  <span style="font-size: 1.5rem; color:#000">订单号：{{item.number}}</span>
                  </br>
                  <span style="font-size:1.3rem ;color:#999;line-height: 2.5rem">{{item.createTime | formatTime}}</span>
                  <span style="float:right; color:#08ce95; font-size: 1.5rem;">{{item.statusDescr}}</span>
                </div>
              </div>
              <div style="border-bottom: 1px solid #f9f9f9;padding:12px 4% 12px 4%;">
                <span style="font-size: 1.5rem; color:#000;">货号：{{item.productNumber}}</span>
                <router-link :to="{name: 'orderDetail', query: {id: item.id}}">
                  <el-button style="border:none;float:right;height:25px;padding:0px; width:50px;">
                    <i style="float:right" class="el-icon-arrow-right"></i>
                  </el-button>
                </router-link>
              </div>
              <div style="border-bottom: 1px solid #f9f9f9;padding:12px 4% 12px 4%;text-align:right;">
                <span style="font-size: 1.5rem; color:#000">总计：
                  <a style="font-size: 1.5rem; color: #e63939">{{item.totalMoney | formatNumber}}</a>
                </span>
              </div>
            </div>
          </template>
        </ul>
      </template>
      <template v-else>
        <div class="ordernull-box">
          <img src="../../../assets/orders-null@1x.png" width="32%"></img>
          <div style="padding-top: 20px;padding-bottom: 50%;">
            <span style="font-size: 1.3rem; color: #999;">暂无订单记录~</span>
          </div>
        </div>
      </template>
      <template v-if="!result || result.length < 3">
        <div style="background-color: #f9f9f9;height:150px;"></div>
      </template>
    </mt-loadmore>
  </section>
</template>

<script>
import Tab from '../bottomTab.vue'
// import config from '../data.json'
import request from '@/utils/request'
import formatTime from '@/utils/formatTime'
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
          // pageSize: 2
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (res.success == 1) {
          this.obj.hasNextPage = res.page.hasNextPage
          res.page.result.forEach(item => {
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
    }
  },
  filters: {
    formatTime1(val) {
      return Number(val) !== 0 ? formatTime(val) : '--'
    },
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

.orderList-box {
  // min-height: 100%;
  padding-bottom: 50px;
  background-color: #f9f9f9;
  .order-box {
    background-color: #fff;
    display: table;
    width: 100%;
    margin-bottom: 12px;
  }
}

.ordernull-box {
  margin-top: 30%;
  text-align: center;
}
</style>
