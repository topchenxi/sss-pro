<template>
  <section>
    <title>欠款详情</title>
    <mt-loadmore :top-method="loadTop" ref="loadmore" style="font-size:1.5rem">
      <div class="number-box">
        <span>订单编号：{{obj.number}}</span>
      </div>
      <div class="detail-box">
        <span>下单时间：
          <span style="float: right; color: #000;">{{obj.createTime | formatTime}}</span>
        </span>
        </br>
        <span>欠款金额：
          <span style="float:right; color:#000">{{obj.money | formatNumber}}</span>
        </span>
        </br>
        <span>欠款状态：
          <template v-if="obj.status == 0">
            <span style="float: right; color: #f6a623;">逾期</span>
          </template>
          <template v-if="obj.status == 1">
            <span style="float: right; color: #08ce95;">已还款</span>
          </template>
          <template v-if="obj.status == 2">
            <span style="float: right; color: #08ce95;">待放款</span>
          </template>
          <template v-if="obj.status == 3">
            <span style="float: right; color: #08ce95;">待还款</span>
          </template>
        </span>
        </br>
        <span>欠款日期：
          <span style="float: right; color: #000;">{{obj.loanTime | formatTime}}</span>
        </span>
        </br>
        <span>最迟还款日：
          <span style="float: right; color: #000;">{{obj.expectedRepaymentTime | formatTime}}</span>
        </span>
        </br>
        <template v-if="obj.status == 0 || obj.status == 3">
          <template v-if="obj.status == 3">
            <span>实际还款日：
              <span style="float: right; color: #000;">{{obj.repaymentTime | formatTime}}</span>
            </span>
            </br>
          </template>
          <span>滞纳金：
            <span style="float: right; color: #000;">{{obj.lateFeesMoney | formatNumber}}</span>
          </span>
        </template>
      </div>
      <template v-if="obj.status == 0 || obj.status == 3">
        <div class="totalMoney-box">
          <span>总计：
            <a>{{(Number(obj.money) + Number(obj.lateFeesMoney)) | formatNumber}}</a>
          </span>
        </div>
      </template>
      <div style="height:150px;"></div>
    </mt-loadmore>
  </section>
</template>

<script>
// import config from '../data.json'
import request from '@/utils/request'
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      id: '',
      obj: {}
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.getData()
  },
  methods: {
    getData() {
      // let res = config.debtDetail
      // this.obj = res
      request(`/redwood/shop/loan/${this.id}`, {
        data: {},
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
    loadTop() {
      window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-box {
  background-color: #fff;
  padding: 15px 4%;
}

.number-box {
  @extend .bg-box;
  >span {
    font-size: 1.5rem;
  }
}

.detail-box {
  @extend .bg-box;
  margin-top: 3px;
  >span {
    text-align: left;
    color: #999;
    line-height: 25px;
    font-size: 1.3rem;
    word-break: break-all;
  }
}

.totalMoney-box {
  @extend .bg-box;
  margin-top: 3px;
  span {
    font-size: 1.5rem;
  }
  a {
    color: #ce3939;
    font-size: 1.5rem
  }
}
</style>
