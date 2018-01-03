<template>
  <section>
    <template v-if="status == 0">
      <title>逾期</title>
    </template>
    <template v-if="status == 1">
      <title>已还款</title>
    </template>
    <template v-if="status == 2">
      <title>待放款</title>
    </template>
    <template v-if="status == 3">
      <title>待还款</title>
    </template>
    <template v-if="status == 5">
      <title>我的欠款</title>
      <div style="padding:10px 4%;">
        <span style="color: #999;font-size:1.3rem">我的所有欠款</span>
      </div>
    </template>
    <mt-loadmore :top-method="loadTop" ref="loadmore" style="font-size:1.5rem;">
      <template v-if="status == 0 && obj.result && obj.result.length">
        <chart style="width:100%;height:130px;margin-bottom:10px;" id="chartOutTime"></chart>
      </template>
      <template v-if="status == 3 && obj.result && obj.result.length">
        <chart style="width:100%;height:130px;margin-bottom:10px;" id="chartWaitPay"></chart>
      </template>
      <template v-if="obj.result && obj.result.length">
        <ul class="debtList-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
          <template v-for="(item, index) in obj.result">
            <div class="debt-box" :key="index">
              <div class="number-box">
                <span>订单编号：{{item.number}}</span>
                <template v-if="item.status == 0">
                  <span style="float: right; color: #f6a623;">逾期</span>
                </template>
                <template v-if="item.status == 1">
                  <span style="float: right; color: #08ce95;">已还款</span>
                </template>
                <template v-if="item.status == 2">
                  <span style="float: right; color: #08ce95;">待放款</span>
                </template>
                <template v-if="item.status == 3">
                  <span style="float: right; color: #08ce95;">待还款</span>
                </template>
              </div>
              <div class="msg-box">
                <span>下单时间：
                  <a style="color:#333;">{{item.createTime | formatDate}}</a>
                </span>
                </br>
                <span>欠款金额：
                  <a style="color:#f00;">{{item.money | formatNumber}}</a>
                </span>
                </br>
                <template v-if="item.status !== 2">
                  <span>欠款日期：
                    <a style="color:#333;">{{item.loanTime |formatDate}}</a>
                  </span>
                  </br>
                  <span>最迟还款日：
                    <a style="color:#333;">{{item.expectedRepaymentTime | formatDate}}</a>
                  </span>
                </template>
                <template v-if="item.status == 1">
                  </br>
                  <span>实际还款日：
                    <a style="color:#333;">{{item.repaymentTime | formatDate}}</a>
                  </span>
                </template>
                <template v-if="item.status == 0 || item.status == 1">
                  </br>
                  <span>滞纳金：
                    <a style="color:#333;">{{item.lateFeesMoney | formatNumber}}</a>
                  </span>
                </template>
              </div>
              <template v-if="item.status != 2 && item.status != 3">
                <div class="totalMoney-box">
                  <span>总计：
                    <a style="color: #f00">{{item.totalMoney | formatNumber}}</a>
                  </span>
                  <!-- <router-link :to="{name: 'debtDetail', query: {id: item.id}}">
                      <el-button style="text-align:right">欠款详情
                        <i style="float:right" class="el-icon-arrow-right"></i>
                      </el-button>
                    </router-link> -->
                </div>
              </template>
            </div>
          </template>
        </ul>
      </template>
      <template v-else>
        <template v-if="status == 0">
          <div class="creditnull-box">
            <img src="../../../assets/zan.png" width="32%"></img>
            <div style="padding-top: 20px; padding-bottom: 50%;">
              <span style="line-height:25px;font-size: 1.3rem;color: #666;">赞!你没有逾期金额</span>
              </br>
              <span style="line-height:25px;font-size: 1.3rem;color: #999;">逾期未还将收取滞纳金，影响您的征信</span>
              </br>
              <span style="line-height:25px;font-size: 1.3rem;color: #999;">且在逾期状态下无法下大货</span>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="creditnull-box">
            <img src="../../../assets/credit-null@1x.png" width="32%"></img>
            <div style="padding-top: 20px; padding-bottom: 50%;">
              <span style="font-size: 1.3rem; color: #999;">暂无欠款记录~</span>
            </div>
          </div>
        </template>
      </template>
      <template v-if="!obj.result || obj.result.length < 2">
        <div style="background-color: #f9f9f9;height: 150px;"></div>
      </template>
    </mt-loadmore>
  </section>
</template>

<script>
// import config from '../data.json'
import echarts from 'echarts'
import { Toast, Indicator } from 'mint-ui'
import request from '@/utils/request'
export default {
  data() {
    return {
      bodyWidth: 0,
      status: 0,
      loading: true,
      pageNumber: 1,
      obj: {
        hasNextPage: 1,
        result: [],
      },
      totalData: {},
    }
  },
  mounted() {
    this.bodyWidth = document.body.clientWidth
    this.status = this.$route.query.status
    this.getListData()
  },
  methods: {
    getListData() {
      // console.log(this.status)
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      this.loading = true
      let obj = {
        status: (this.status == 5) ? '' : this.status,
        pageNumber: this.pageNumber,
      }
      // let res = config.debt
      request('/redwood/shop/loan', {
        data: obj,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (res.success == 1) {
          this.loading = true
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
        this.getTotalData()
        this.loading = !this.obj.hasNextPage
      })
    },
    getTotalData() {
      request('/redwood/shop/customerAccount/my', {
        data: {},
        method: 'GET'
      }).then(res => {
        if (res.success == 1) {
          this.totalData = res.obj
        } else {
          Toast({
            message: res.msg,
            position: 'bottom',
            duration: 2000,
          })
        }
        Indicator.close()
        console.log(this.totalData)
        const self = this
        if (this.status == 0 && this.obj.result && this.obj.result.length) {
          setTimeout(function() {
            self.drawOutTime()
          }, 0)
        } else if (this.status == 3 && this.obj.result && this.obj.result.length) {
          setTimeout(function() {
            self.drawWaitPay()
          }, 0)
        }
      })
    },
    drawWaitPay() {
      let payedDebtMoneyStr = '已还：' + this.totalData.payedDebtMoney.toFixed(2)
      let currentToPayDebtMoneyStr = '本月剩余应还：' + this.totalData.currentToPayDebtMoney.toFixed(2)
      let nextDebtMoneyStr = '下月应还：' + this.totalData.nextDebtMoney.toFixed(2)
      let data = [
        {
          value: this.totalData.payedDebtMoney,
          name: payedDebtMoneyStr
        },
        {
          value: this.totalData.currentToPayDebtMoney,
          name: currentToPayDebtMoneyStr
        },
        {
          value: this.totalData.nextDebtMoney,
          name: nextDebtMoneyStr
        }
      ]
      let str = (this.totalData.currentToPayDebtMoney + this.totalData.nextDebtMoney).toFixed(2)
      let subtextLeft = (14.5 - (str.length - 4)).toFixed(1) + '%'
      let option = {
        width: this.bodyWidth,
        height: '300',
        backgroundColor: '#fff',
        title: [
          {
            text: '总欠款',
            left: '13.5%',
            top: '32.5%',
            textStyle: {
              textAlign: 'center',
              fontWeight: 'normal',
              fontSize: 13,
              color: '#999',
              lineHeight: 20,
              rich: {
                a: {
                }
              }
            },
          },
          {
            left: subtextLeft,
            top: '40%',
            subtext: str,
            // subtext: '1000000.00',
            subtextStyle: {
              align: 'center',
              fontWeight: 'normal',
              fontSize: 14,
              color: '#000',
              rich: {
                a: {
                  align: 'center',
                }
              }
            }
          }
        ],
        tooltip: {
          show: false,
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'right',
          top: '20%',
          right: '8%',
          fontSize: 16,
          data: [payedDebtMoneyStr, currentToPayDebtMoneyStr, nextDebtMoneyStr],
          selectedMode: false,
        },
        series: [{
          type: 'pie',
          selectedMode: 'single',
          radius: ['70%', '80%'],
          color: ['#7ED321', '#2FB468', '#E4EE18'],
          center: ['20%', '50%'],
          silent: true,
          label: {
            normal: {
              textStyle: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 14
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: data
        }]
      }
      let myChart = echarts.init(document.getElementById('chartWaitPay'))
      // console.log(myChart)
      myChart.setOption(option)
    },
    drawOutTime() {
      let lateDebtMoneyStr = '欠款金额：' + this.totalData.lateDebtMoney.toFixed(2)
      let lateFeesMoneyStr = '滞纳金：' + this.totalData.lateFeesMoney.toFixed(2)
      let data = [
        {
          value: this.totalData.lateFeesMoney,
          name: lateFeesMoneyStr
        },
        {
          value: this.totalData.lateDebtMoney,
          name: lateDebtMoneyStr
        }
      ]
      let str = (this.totalData.lateFeesMoney + this.totalData.lateDebtMoney).toFixed(2)
      let subtextLeft = (14.5 - (str.length - 4)).toFixed(1) + '%'
      let option = {
        width: this.bodyWidth,
        height: '300',
        backgroundColor: '#fff',
        title: [
          {
            text: '逾期金额',
            // subtext: (this.totalData.lateFeesMoney + this.totalData.lateDebtMoney),
            left: '11.5%',
            top: '32.5%',
            textStyle: {
              textAlign: 'center',
              fontWeight: 'normal',
              fontSize: 13,
              color: '#999',
              lineHeight: 20,
              rich: {
                a: {
                }
              }
            },
          },
          {
            left: subtextLeft,
            top: '40%',
            subtext: str,
            // subtext: '1000000.00',
            subtextStyle: {
              align: 'center',
              fontWeight: 'normal',
              fontSize: 14,
              color: '#000',
              rich: {
                a: {
                  align: 'center',
                }
              }
            }
          }
        ],
        tooltip: {
          show: false,
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'right',
          top: '30%',
          right: '4%',
          fontSize: 16,
          data: [lateFeesMoneyStr, lateDebtMoneyStr],
          selectedMode: false,
        },
        series: [{
          type: 'pie',
          selectedMode: 'single',
          radius: ['70%', '80%'],
          color: ['#E4EE18', '#F6A623'],
          center: ['20%', '50%'],
          label: {
            normal: {
              // position: 'inner',
              // formatter: '{d}%',
              textStyle: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 14
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: data
        }]
      }
      let myChart = echarts.init(document.getElementById('chartOutTime'))
      // console.log(myChart)
      myChart.setOption(option)
    },
    loadMore() {
      this.pageNumber += 1
      this.getData()
    },
    loadTop() {
      window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  background-color: #f9f9f9;
}

.el-icon-arrow-right {
  color: #999;
}

.bg-box {
  background-color: #fff;
  padding: 15px 4%;
}

.debt-box {
  margin-bottom: 10px;
  .number-box {
    @extend .bg-box;
    >span {
      font-size: 1.5rem;
    }
  }
  .msg-box {
    @extend .bg-box;
    margin-top: 3px;
    span {
      line-height: 25px;
      color: #999;
      font-size: 1.3rem;
    }
    a {
      font-size: 1.3rem;
      float: right;
    }
  }
  .totalMoney-box {
    background-color: #fff;
    padding: 15px 4% 15px 4%;
    margin-top: 3px;
    text-align: right;
    >span {
      font-size: 1.5rem;
    }
  }
}

.creditnull-box {
  margin-top: 30%;
  text-align: center;
}
</style>
