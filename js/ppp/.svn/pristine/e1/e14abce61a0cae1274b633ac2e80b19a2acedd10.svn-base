<template>
  <section>
    <title>白条首页</title>
    <Tab>
    </Tab>
    <mt-loadmore :top-method="loadTop" ref="loadmore" style="font-size:1.5rem;">
      <!-- 最上方显示内容 -->
      <template v-if="obj.templateId == 1">
        <div class="topBg-box">
          <div>
            <span style="font-size: 1.3rem">本月应还(元)</span>
          </div>
          <div style="margin-top: 20px;">
            <span style="font-size: 2.5rem">{{obj.currentDebtMoney | formatNumber}}</span>
          </div>
          <div style="margin-top: 20px">
            <span style="font-size: 1.3rem">记得
              <span style="color:#f6a623">{{obj.repaymentTime | formatPayDate}}</span>前还款哦~</span>
          </div>
        </div>
      </template>
      <template v-if="obj.templateId == 2">
        <div class="topBg-box">
          <div>
            <span style="font-size: 1.3rem">可用额度(元)</span>
          </div>
          <div style="margin-top: 20px;">
            <span style="font-size: 2.5rem">{{obj.remainLine | formatNumber}}</span>
          </div>
          <div style="margin-top: 20px">
            <span style="font-size: 1.3rem">好信用从现在开始</span>
          </div>
        </div>
      </template>
      <template v-if="obj.templateId == 3">
        <div class="topBg-box">
          <div>
            <span style="font-size: 1.3rem">上月欠款已还清</span>
          </div>
          <img style="margin-top: 20px;margin-bottom: 15px;" src="../../../assets/good@1x.png" width="9%"></img>
        </div>
      </template>
      <template v-if="obj.templateId == 4">
        <div class="topBg-box">
          <div>
            <span style="font-size: 1.3rem">本月应还(元)</span>
          </div>
          <div style="margin-top: 20px;">
            <span style="font-size: 2.5rem">{{obj.currentDebtMoney | formatNumber}}</span>
          </div>
          <div style="margin-top: 20px">
            <span style="font-size: 1.3rem">当月使用,下月还</span>
          </div>
        </div>
      </template>
      <template v-if="obj.templateId == 5">
        <div class="topBg5-box">
          <div>
            <span style="font-size: 1.3rem">逾期金额(元)</span>
          </div>
          <div style="margin-top: 10px;">
            <span style="font-size: 2.5rem">{{Number(obj.lateDebtMoney) + Number(obj.lateFeesMoney) | formatNumber}}</span>
            </br>
            <span style="font-size: 1.3rem">(含滞纳金：{{obj.lateFeesMoney | formatNumber}})</span>
          </div>
          <div style="margin-top: 10px">
            <span style="font-size: 1.3rem">不良欠款记录会影响您的征信哦~</span>
          </div>
        </div>
      </template>
      <!-- end -->
      <!-- 中部展示内容 -->
      <div>
        <div class="moneyMsg-box">
          <span style="font-size:1.3rem;color:#999">下月应还</span>
          </br>
          <span style="font-size:1.5rem;">{{obj.nextDebtMoney | formatNumber}}</span>
          </br>
          <span style="font-size:1.3rem;color:#999">还款日{{obj.repaymentTime | formatDate}}</span>
        </div>
        <div class="baitiaoMsg-box">
          <span style="font-size:1.3rem;color:#999;">可用额度</span>
          </br>
          <span style="font-size:1.5rem">
            {{obj.remainLine | formatNumber}}
          </span>
          </br>
          <span style="font-size: 1.3rem;color:#999">总额度{{obj.creditLine | formatNumber}}
          </span>
        </div>
      </div>
      <!-- end -->
      <!-- 列表框中展示内容 -->
      <template v-if="obj.templateId != 5">
        <div class="li-title">
          <span>本月需还款订单</span>
        </div>
      </template>
      <template v-else>
        <div class="li-title">
          <span>逾期订单</span>
        </div>
      </template>
      <template v-if="obj.templateId == 1 || obj.templateId == 5">
        <ul class="baitiaoList-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
          <template v-for="(item,index) in list.result">
            <div class="baitiao-box" :key="index">
              <div style="">
                <div style="border-bottom:1px solid #f9f9f9;padding: 10px 4% 10px 4%;">
                  <span style="font-size: 1.5rem; color:#000">{{item.number}}</span>
                  </br>
                  <span style="font-size:1.3rem ;color:#999;line-height: 2.5rem">到期日{{item.payDebtExpectedRepaymentTime | formatDate}}</span>
                  <router-link :to="{name: 'debtDetail', query: {id: item.id}}">
                    <el-button>
                      <template v-if="obj.templateId == 5">
                        <span style="color:#000;">{{item.payDebtRealRepaymentMoney | formatNumber}}</span>
                      </template>
                      <template v-else>
                        <span style="color:#000;">{{item.totalMoney | formatNumber}}</span>
                      </template>
                      <i style="float:right" class="el-icon-arrow-right"></i>
                    </el-button>
                  </router-link>
                </div>
              </div>
            </div>
          </template>
        </ul>
      </template>
      <template v-if="obj.templateId == 2">
        <div style="padding-top: 20%;text-align:center">
          <span style="font-size:1.3rem;color:#999;">暂无要还款的订单!</span>
        </div>
      </template>
      <template v-if="obj.templateId == 3">
        <div style="padding-top: 20%;text-align:center">
          <span style="font-size:1.3rem;color:#999;">好赞!订单都还清啦!</span>
        </div>
      </template>
      <template v-if="obj.templateId == 4">
        <div style="padding-top: 20%;text-align:center">
          <span style="font-size:1.3rem;color:#999;">上月欠款订单已还清!</span>
        </div>
      </template>
      <!-- end -->
      <template v-if="!list.result || list.result.length < 2">
        <div style="background-color: #f9f9f9;height: 150px;"></div>
      </template>
    </mt-loadmore>
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
      obj: {},
      list: {
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
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      request('/redwood/shop/customerAccount/my', {
        data: {},
        method: 'GET'
      }).then(res => {
        if (res.success == 1) {
          this.obj = res.obj
          // 模拟templateId
          // this.obj.templateId = 4
          if (this.obj.templateId == 1) {
            this.loading = true
            request('/redwood/shop/bulk', {
              data: {
                _function: 'repayment',
                pageNumber: this.pageNumber
              },
              method: 'GET',
            }).then(response => {
              if (response.success == 1) {
                this.list = response.page
                this.loading = !this.list.hasNextPage
              } else {
                Toast({
                  message: response.msg,
                  position: 'bottom',
                  duration: 2000,
                })
              }
            })
          }
          if (this.obj.templateId == 5) {
            this.loading = true
            request('/redwood/shop/bulk', {
              data: {
                _function: 'overdue',
                pageNumber: this.pageNumber
              },
              method: 'GET',
            }).then(response => {
              if (response.success == 1) {
                this.list = response.page
                this.loading = !this.list.hasNextPage
              } else {
                Toast({
                  message: response.msg,
                  position: 'bottom',
                  duration: 2000,
                })
              }
            })
          }
          // console.log(this.obj)
        } else {
          Toast({
            message: res.msg,
            position: 'bottom',
            duration: 2000
          })
        }
        Indicator.close()
      })
    },
    loadMore() {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      this.pageNumber += 1
      if (this.obj.templateId == 1) {
        this.loading = true
        request('/redwood/shop/bulk', {
          data: {
            pageNumber: this.pageNumber,
            _function: 'repayment',
          },
          method: 'GET',
        }).then(response => {
          if (response.success == 1) {
            this.list.hasNextPage = response.page.hasNextPage
            response.page.result.forEach(item => {
              this.list.result.push(item)
            })
          } else {
            Toast({
              message: response.msg,
              position: 'bottom',
              duration: 2000,
            })
          }
          Indicator.close()
        })
      }
      if (this.obj.templateId == 5) {
        this.loading = true
        request('/redwood/shop/bulk', {
          data: {
            pageNumber: this.pageNumber,
            _function: 'overdue',
          },
          method: 'GET',
        }).then(response => {
          if (response.success == 1) {
            this.list.hasNextPage = response.page.hasNextPage
            response.page.result.forEach(item => {
              this.list.result.push(item)
            })
            this.loading = !this.list.hasNextPage
          } else {
            Toast({
              message: response.msg,
              position: 'bottom',
              duration: 2000,
            })
          }
          Indicator.close()
        })
      }
    },
    loadTop() {
      window.location.reload()
    }
  },
  filters: {
    formatPayDate(val) {
      if (val) {
        let date = new Date(val)
        let m = date.getMonth() + 1
        let d = date.getDate()
        return m + '月' + d + '日'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-icon-arrow-right {
  color: #999;
}

section {
  background-color: #f9f9f9;
  .topBg-box {
    height: 30%;
    background: -webkit-linear-gradient(#0ba360, #3cba92);
    background: -o-linear-gradient(#0ba360, #3cba92);
    background: -moz-linear-gradient(#0ba360, #3cba92);
    background: linear-gradient(#0ba360, #3cba92);
    padding-top: 5.5%;
    padding-bottom: 5.5%;
    text-align: center;
    span {
      color: #fff;
    }
  }
  .topBg5-box {
    width: 100%;
    height: 30%;
    padding-top: 5.5%;
    padding-bottom: 5.5%;
    background-color: #f6a623;
    text-align: center;
    span {
      color: #fff;
    }
  }
  .moneyMsg-box {
    padding-top: 15px;
    padding-bottom: 15px;
    text-align: center;
    width: 50%;
    float: left;
    background-color: #fff;
    span {
      line-height: 25px;
    }
  }
  .baitiaoMsg-box {
    padding-top: 15px;
    padding-bottom: 15px;
    text-align: center;
    width: 50%;
    float: right;
    background-color: #fff;
    span {
      line-height: 25px;
    }
  }
  .li-title {
    margin-top: auto;
    padding-left: 4%;
    text-align: left;
    background-color: #F2F2F2;
    span {
      color: #999;
      line-height: 40px;
      font-size: 1.3rem;
    }
  }
  .baitiaoList-box {
    // min-height: 100%;
    padding-bottom: 50px;
    background-color: #f9f9f9;
    .baitiao-box {
      background-color: #fff;
      display: table;
      width: 100%;
      margin-bottom: 3px;
      .el-button {
        float: right;
        color: #999;
        border: 0px;
        margin-top: -15px;
        font-size: 1.5rem;
      }
    }
  }
}
</style>
