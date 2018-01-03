<template>
  <div class="detail">
    <div class="detail-title">
      <span @click="goBack"></span>
      <p>详情</p>
    </div>
    <div class="detail-group">
      <div class="detail-item pb20" style="width:100%">
        <h6>订单信息</h6>
        <dl class="info-item">
          <dt>订单号</dt>
          <dd>{{ orderInfo.serviceNumber }}</dd>
        </dl>
        <dl class="info-item">
          <dt>采购商</dt>
          <dd>{{ orderInfo.customerCompany }}</dd>
        </dl>
        <dl class="info-item">
          <dt>供应商</dt>
          <dd>{{ orderInfo.shopCompany }}</dd>
        </dl>
        <dl class="info-item">
          <dt>货号信息</dt>
          <dd></dd>
        </dl>
        <div class="table-warp p14 pt10">
          <table class="table-normal">
            <colgroup>
            </colgroup>
            <thead>
              <tr>
                <th>出仓单号</th>
                <th>货号</th>
                <th>色号</th>
                <th>销售单价</th>
                <th>成本单价</th>
                <th>发货数量</th>
                <th>出仓匹数</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(color, index) in orderInfo.colorList">
                <td class="ta-c" :rowspan="orderInfo.colorList.length" v-if="index == 0">{{orderInfo.outReposityNumber}}</td>
                <td :rowspan="orderInfo.colorList.length" v-if="index == 0">{{productNumber}}</td>
                <td>{{color.color}}</td>
                <td class="ta-r">{{color.salePrice | formatNumber}}{{color.salePriceUnit}}</td>
                <td class="ta-r">{{color.price | formatNumber}}{{color.priceUnit}}</td>
                <td class="ta-r">{{color.quantity | formatNumber}}{{color.quantityUnit}}</td>
                <td class="ta-r">{{color.outPi}}匹</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="detail-group">
      <div class="detail-item pb20" style="width:100%">
        <h6>扣数明细</h6>
        <div class="table-warp p14 pt10">
          <table class="table-normal">
            <colgroup>
            </colgroup>
            <thead>
              <tr>
                <th>扣数类型</th>
                <th>货号</th>
                <th>色号</th>
                <th>采购商扣数</th>
                <th>供应商扣数</th>
                <th>采购商扣数单价</th>
                <th>供应商扣数单价</th>
                <th>采购商扣数金额</th>
                <th>供应商扣数金额</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(color, index2) in ksOrderInfo.detailList">
                <td class="ta-c" :rowspan="ksOrderInfo.detailList.length" v-if="index2 == 0">{{ksOrderInfo.type | typeFilter}}</td>
                <td class="ta-c" :rowspan="ksOrderInfo.detailList.length" v-if="index2 == 0">{{productNumber}}</td>
                <td>{{color.color}}</td>
                <td class="ta-r">{{color.buyerKouShu | formatNumber}}{{color.quantityUnit}}</td>
                <td class="ta-r">{{color.sellerKouShu | formatNumber}}{{color.quantityUnit}}</td>
                <td class="ta-r">{{color.buyerKouShuPrice | formatNumber}}{{color.buyPriceUnit}}</td>
                <td class="ta-r">{{color.sellerKouShuPrice | formatNumber}}{{color.salePriceUnit}}</td>
                <td class="red ta-r"><span v-if="color.kouShuMoney != 0 ">{{color.buyerFundDirection | checkSign}}</span>{{color.kouShuMoney | formatNumber}}元</td>
                <td class="red ta-r"><span v-if="color.tuiKuanMoney != 0 ">{{color.sellerFundDirection | checkSign}}</span>{{color.tuiKuanMoney | formatNumber}}元</td>
              </tr>
            </tbody>
          </table>
        </div>
        <dl class="info-item">
          <dt>扣数备注</dt>
          <dd>{{ksOrderInfo.guiderRemark}}</dd>
        </dl>
      </div>
    </div>
  </div>
</template>
<script>
import ksApi from 'api/ksApi'
import {
  request
} from 'utils/request'

export default {
  data() {
    return {
      ksOrderId: '',
      orderInfo: {},
      ksOrderInfo: {},
      productNumber: '',
      seller: {
        company: ''
      },
      cellHeight: {
        height: '40px',
        'line-height': '40px'
      },
      ksCellHeight: {
        height: '40px',
        'line-height': '40px'
      }
    }
  },
  filters: {
    formatNumber(val) {
      return Number(val).toFixed(2)
    },
    checkSign(val) {
      return Number(val) > 0 ? '' : '-'
    },
    typeFilter(val) {
        switch (val) {
          case 1: return '损耗';
          case 2: return '运费';
          case 3: return '售后退换货';
          default: return '其他';
        }
      }
  },
  mounted() {
    this.$store.dispatch('changeload', true)
    this.ksOrderId = this.$route.query.id
    this.getKsOrderInfo()
  },
  methods: {
    getOutReposityOrder() {
        this.$store.dispatch('changeload', true)
        let data = {}
        data = {
          id: this.outReposityId
        }
        request(ksApi.getOutReposityDetail, {
          data: data,
          method: 'GET'
        }).then((response) => {
          this.$store.dispatch('changeload', false)
          if (response && response.success == 1) {
            this.convertData(response.obj)
          } else {
            this.$message.error(response.msg)
          }
        })
      },
      convertData(data) { /* format数据 */
        this.orderInfo = data
        this.cellHeight.height = this.cellHeight['line-height'] = (this.orderInfo.colorList.length * 40) + 'px';
        this.productNumber = this.orderInfo.colorList[0].productNumber
      },
      getKsOrderInfo() {
        this.$store.dispatch('changeload', true)
        let data = {}
        data = {
          id: this.ksOrderId
        }
        request(ksApi.getKsDetail, {
          data: data,
          method: 'GET'
        }).then((response) => {
          if (response && response.success == 1) {
            this.ksOrderInfo = response.obj
            this.outReposityId = response.obj.outReposityId
            this.getOutReposityOrder()
          } else {
            this.$message.error(response.msg)
            this.$store.dispatch('changeload', false)
          }
        })
      },
    goBack() {
      this.$router.back()
    }
  }
}

</script>
<style lang="scss">
  .table-normal tbody > tr > td {
    text-align: center
  }
  .table-normal tbody > tr > .ta-r {
    text-align: center !important
  }
.wrap-body {
  width: 100%;

  .title {
    font-size: 24px;
    font-weight: bolder;
    margin-left: 20px;
    padding-bottom: 5px;
    border-bottom: 1px solid #9c9c9c;
  }

  .wrap-content {
    width: 100%;
    margin-left: 20px;

    .form-data {
      width: 100%;
      clear: both;
      min-height: 180px;
      margin: 20px 0;

      .product {
        width: 100%;
        border-top: 1px solid #c6c6c6;
        border-right: 1px solid #c6c6c6;
        border-spacing: 0;
        tr {
          td {
            text-align: center;
            line-height: 32px;
            border-left: 1px solid #c6c6c6;
            border-bottom: 1px solid #c6c6c6;
          }
        }
      } // 扣数明细
      .ks-product {
        width: 100%;
        border-top: 1px solid #c6c6c6;
        border-right: 1px solid #c6c6c6;
        border-spacing: 0;

        tr {
          td {
            text-align: center;
            line-height: 32px;
            border-left: 1px solid #c6c6c6;
            border-bottom: 1px solid #c6c6c6;
          }
        }
      }

      .form-title {
        width: 120px;
        float: left;
        display: inline;
        text-align: right;
        margin-right: 20px;
      }

      .info {
        width: 80%;
        float: left;
        display: inline;

        p {
          min-width: 30%;
          margin-bottom: 20px;
        }
      }
    }
  }
}

a,
a:hover,
a:link {
  color: #169BD5;
  text-decoration: none;
}

.clear {
  clear: both;
}

.no-border {
  border: none !important;
}

.el-form-item.need label:before {
  content: '*';
  color: red;
}

</style>
