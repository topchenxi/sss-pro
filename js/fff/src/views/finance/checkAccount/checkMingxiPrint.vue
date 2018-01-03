<template>
  <section class="section-content" v-loading.body="bodyLoading">
    <i class="goback-ele el-icon-arrow-left goback-icon" style="margin-top: 25px;" @click="handleReturn">返回</i>
    <div class="company-msg">
      <span class="big-font">{{obj.customerCompany}}</span>
      <span>ID：{{obj.customerNumber}}</span>
      <div class="btn-group">
        <el-button type="primary" @click.native="toPrint">打印</el-button>
      </div>
      <p class="border-bottom-solid"></p>
      <p class="forgive-color status-content" style="background-color:#f5fff9">
        <i class="el-icon-warning" style="margin-right:5px;"></i> {{obj.status == 0 ? '待对账' : '已对账'}}</p>
      <span class="bold-font">{{'对账单号：' + obj.number}}</span>
      <span class="left-margin25">提交日期：{{obj.createTime | formatTime}}</span>
      <span class="left-margin25">销售员：{{obj.salerName}}</span>
      <span class="left-margin25">采购员：{{obj.guiderName}}</span>
      <p>{{'销售备注：' + obj.remark}}</p>
      <p>客户转账金额：
        <span class="red-color">{{obj.payMoney | formateNumber}}</span>元</p>
      <span>客户转账凭据：
        <article class="media imgShow" v-if='obj.payCredentialUrls && obj.payCredentialUrls.length'>
          <a :href="'http://test.soouya.com'+ val" class="image media-left" v-lightbox="obj.payCredentialUrls" v-for="(val,index) in obj.payCredentialUrls" :key="index">
            <img :src="'http://test.soouya.com'+ val +'@200h_200w_1e'" alt="Image" width="40" height="40">
          </a>
        </article>
      </span>
      <p class="border-bottom-solid" style="margin-top: 15px;"></p>
      <p class="total-msg">
        <span v-if="!checkStatus" class="bold-font left-margin25" style="margin-right: 25px;">应收金额：
          <span class="red-color">{{(Number(obj.totalMoney) + Number(obj.lateFeesMoney)).toFixed(2)}}元</span>
        </span>
        <span v-if="checkStatus" class="bold-font left-margin25" style="margin-right: 25px;">实收金额：
          <span class="red-color">{{(Number(obj.totalMoney) + Number(obj.lateFeesMoney)).toFixed(2)}}元</span>
        </span>
        <span class="left-margin25 c666">滞纳金：{{Number(obj.lateFeesMoney).toFixed(2)}}元</span>
        <span class="left-margin25 c666">扣数款：{{Number(obj.kouShuMoney).toFixed(2)}}元</span>
        <span class="left-margin25 c666">支用额度：{{Number(Number(obj.totalMoney) - Number(obj.kouShuMoney)).toFixed(2)}}元</span>
      </p>
    </div>
    <div class="table-content">
      <table class="table-ele" border="1" style="margin:0 auto;">
        <colgroup>
          <!-- 交易时间 -->
          <col width="140">
          <!-- 类型 -->
          <col width="80">
          <!-- 订单 -->
          <col width="200">
          <!-- 供应商 -->
          <col width="120">
          <!-- 出仓单号 -->
          <col width="140">
          <!-- 货号 -->
          <col width="120">
          <!-- 色号 -->
          <col width="120">
          <!-- 单价 -->
          <col width="120">
          <!-- 数量单位 -->
          <col width="120">
          <!-- 支用额度 -->
          <col width="120">
          <!-- 滞纳金 -->
          <col width="120">
          <!-- 订单欠款 -->
          <col width="120">
        </colgroup>
        <thead>
          <tr>
            <th>交易时间</th>
            <th>类型</th>
            <th>订单号</th>
            <th>供应商</th>
            <th>出仓单号</th>
            <th>货号</th>
            <th>色号</th>
            <th>单价(元)</th>
            <th>数量单位</th>
            <th>支用额度/扣数款</th>
            <th>滞纳金</th>
            <th>订单欠款</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(outItem, outIndex) in obj.outRepos">
            <td class="left-align">{{outItem.reconciliationTime | formatTime}}</td>
            <td>
              <template v-if="outItem.isOutRepo == 1">
                <span v-if="outItem.bulk.type  == 1">服务单</span>
                <span v-if="outItem.bulk.type  == 2">贸易单</span>
                <span v-if="outItem.bulk.type  == 3">采购单</span>
              </template>
              <template v-else>扣数单</template>
            </td>
            <td class="left-align">{{outItem.bulk.number}}</td>
            <td class="left-align">{{outItem.bulk.showShopCompany}}</td>
            <td class="left-align">{{outItem.number}}</td>
            <td class="left-align">{{outItem.bulk.productNumber}}</td>
            <td colspan="3" class="inner-table">
              <table>
                <tbody>
                  <tr v-for="(colorItem,colorIndex) in outItem.clothLones">
                    <td class="left-align">{{colorItem.color}}</td>
                    <td class="right-align">{{colorItem.salePrice | formateNumber}}{{colorItem.salePriceUnit}}</td>
                    <td class="right-align">{{colorItem.quantity | formateNumber}}{{colorItem.quantityUnit}}</td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td class="right-align">{{Number(outItem.totalMoney).toFixed(2)}}</td>
            <td class="right-align">{{Number(outItem.lateFeesMoney).toFixed(2)}}</td>
            <td class="right-align">{{(Number(outItem.totalMoney) + Number(outItem.lateFeesMoney)).toFixed(2)}}</td>
          </tr>
          <tr v-for="(cutItem, cutIndex) in obj.cuts">
            <td class="left-align">{{cutItem.reconciliationTime | formatTime}}</td>
            <td>剪版</td>
            <td class="left-align">{{cutItem.number}}</td>
            <td class="left-align">{{cutItem.shopCompany}}</td>
            <td class="left-align">--</td>
            <td colspan="4" class="inner-table">
              <table>
                <tbody>
                  <template v-for="(proItem, proIndex) in cutItem.productNumbers">
                    <tr v-for="(colorItem, colorIndex) in proItem.colors">
                      <td class="left-align" :rowspan="proItem.colors.length" v-if="colorIndex==0" :class="{'bdbn' : proItem.colors.length>1&&proIndex==cutItem.productNumbers.length-1}">
                        {{proItem.number}}
                      </td>
                      <td class="left-align">{{colorItem.color}}</td>
                      <td class="right-align">{{colorItem.salePriceMoney | formateNumber}}{{colorItem.salePriceUnit}}</td>
                      <td class="right-align">{{colorItem.cutterQuantity}}{{colorItem.cutterQuantityUnit}}</td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </td>
            <td class="right-align">{{Number(cutItem.totalMoney).toFixed(2)}}</td>
            <td class="right-align">{{Number(cutItem.lateFeesMoney).toFixed(2)}}</td>
            <td class="right-align">{{Number(cutItem.totalMoney).toFixed(2)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <Lightbox></Lightbox>
  </section>
</template>

<script>
  import Lightbox from 'components/lightbox/lightbox'
  import {
    newRequest,
  } from 'common/utils'
  export default {
    components: {
      Lightbox
    },
    data() {
      return {
        bodyLoading: false,
        checkStatus: 0,
        obj: {},
        id: ''
      }
    },
    mounted() {
      this.id = this.$route.query.id
      this.checkStatus = this.$route.query.checkStatus
      if (this.id) {
       this.getData()
      } else {
        this.$message.error('账单id不能为空')
      }
    },
    watch: {
      '$route' (to, from) { // 监控路由解决进来的时候缓存问题不重新请求的问题
        if (to.name != 'checkMingxiPrint') {
          return false
        } else {
          this.id = this.$route.query.id
          this.checkStatus = this.$route.query.checkStatus
          if (this.id) {
            this.getData()
          } else {
            this.$message.error('账单id不能为空')
          }
        }
      }
    },
    methods: {
      getData() {
        this.bodyLoading = true
        newRequest({
          method: 'get',
          url: `/redwood/bill/${this.id}`,
          data: {},
        }).then(res => {
          this.bodyLoading = false
          if (res.success == 1) {
            this.obj = res.obj
            if (this.obj.cuts) {
              this.obj.cuts.map(cut => {
                this.$set(cut, 'rowLen', 0)
                if (cut.productNumbers) {
                  cut.productNumbers.map(item => {
                    cut.rowLen += item.colors.length + 1
                  })
                }
              })
            }
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      toPrint() {
        window.print()
      },
      handleReturn() {
        window.history.go(-1)
      }
    }
  }

</script>

<style lang="scss">
  .bdbn {
    border-bottom: none !important;
  }

  table {
    table-layout: fixed;
    border-spacing: 0;
    border-collapse: collapse;
    tr {
      td {
        word-break: break-word;
      }
    }
  }

  .inner-table {
    padding: 0px !important;
    table {
      width: 100%;
      min-height: 60px;
      tbody {
        tr {
          td {
            padding: 8px 5px;
            border-right: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            text-align: center;
            &:last-child {
              border-right: none;
            }
          }
          &:last-child {
            td {
              border-bottom: none;
            }
          }
        }
      }
    }
  }

  .section-content {
    margin: auto;
  }

  .company-msg {
    padding: 10px 15px 5px 15;
    background-color: #fff;
    margin-top: 10px;
    .btn-group {
      float: right;
      clear: both;
      .el-button {
        margin-left: 25px;
        span {
          line-height: 10px;
          height: 10px;
        }
      }
    }
    span {
      line-height: 35px;
      height: 35px;
      display: inline-block;
    }
    p {
      line-height: 35px;
    }
    .total-msg {
      padding-right: 25px;
      height: 25px;
      span {
        float: right;
      }
      .c666 {
        color: #666;
      }
    }
  }

  .big-font {
    font-size: 18px;
    font-weight: 600;
  }

  .border-bottom-solid {
    border-bottom: 1px #ddd solid;
  }

  .bold-font {
    font-weight: 600;
  }

  .left-margin25 {
    margin-left: 25px;
  }

  .imgShow {
    display: inline-block;
    a {
      margin-right: 5px;
    }
  }

  .table-content {
    overflow-y: visible;
    margin-top: 10px;
    background-color: #fff;
    .table-ele {
      width: 95%;
      border-collapse: collapse;
      border: 0px;
      th {
        padding: 8px 5px;
        text-align: center;
        background-color: #f9f9f9;
        border-color: #ddd;
      }
      td {
        border-color: #ddd;
        padding: 8px 5px;
        text-align: center;
      }
    }
  }

  .width200 {
    width: 200px;
  }

  .status-content {
    border: 1px solid #39ab65;
    margin-top: 8px;
    border-radius: 5px;
    padding-left: 15px;
  }

  @media print {
    .el-button {
      display: none;
    }
    .goback-ele {
      display: none;
    }
  }

</style>
