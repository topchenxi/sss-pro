<template>
  <div class="wrap-body">
    <div class="title">
      <span>详细</span>
      <el-button type="primary" size="small" @click="goBack">返回</el-button>
    </div>
    <div class="wrap-content">
      <div class="form-data">
        <div class="form-title">订单信息：</div>
        <div class="info">
          <p>
            订单号：{{ orderInfo.serviceNumber }}
          </p>
          <p>
            采购商：{{ orderInfo.customerCompany }}
          </p>
          <p>
            供应商：{{ orderInfo.shopCompany }}
          </p>
        </div>
      </div>
        <div class="form-data">
          <div class="form-title">货号信息：</div>
          <div class="info">
            <table class="product" v-if="orderInfo.colorList">
              <tr>
                <td width="14%">出仓单号</td>
                <td width="14%">货号</td>
                <td width="14%">色号</td>
                <td width="14%">销售单价</td>
                <td width="14%">发货数量</td>
                <td>出仓匹数</td>
              </tr>
              <tr v-for="(color, index) in orderInfo.colorList">
                <td :rowspan="orderInfo.colorList.length">{{orderInfo.outReposityNumber}}</td>
                <td :rowspan="orderInfo.colorList.length">{{productNumber}}</td>
                <td>{{color.color}}</td>
                <td>{{color.salePrice | formatNumber}}{{color.saleQuanityUnit}}</td>
                <td>{{color.quantity | formatNumber}}{{color.quantityUnit}}</td>
                <td>{{color.outPi}}匹</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="form-data">
          <div class="form-title">扣数明细：</div>
          <div class="info">
            <table class="product" v-if="ksOrderInfo.detailList">
              <tr>
                <td width="12%">扣数类型</td>
                <td width="12%">货号</td>
                <td width="12%">色号</td>
                <td width="12%">发货数量</td>
                <td width="12%">销售单价</td>
                <td width="12%">扣数</td>
                <td width="12%">扣数单价</td>
                <td>扣数金额</td>
              </tr>
              <tr v-for="(color, index2) in ksOrderInfo.detailList">
                <td :rowspan="ksOrderInfo.detailList.length">{{ksOrderInfo.type | typeFilter}}</td>
                <td :rowspan="ksOrderInfo.detailList.length">{{productNumber}}</td>
                <td>{{color.color}}</td>
                <td>{{color.quantity | formatNumber}}{{color.quantityUnit}}</td>
                <td>{{color.salePrice | formatNumber}}{{color.salePriceUnit}}</td>
                <td>{{color.buyerKouShu | formatNumber}}{{color.quantityUnit}}</td>
                <td>{{color.buyerKouShuPrice | formatNumber}}{{color.salePriceUnit}}</td>
                <td>{{color.kouShuMoney}} 元</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="form-data">
          <div class="form-title">跟单扣数备注：</div>
          <div class="info" style="line-height:22px;">
            {{ksOrderInfo.genDanRemark}}
          </div>
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
.wrap-body {
  width:100%;

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
            font-size: 14px;
            text-align: center;
            line-height: 42px;
            border-left: 1px solid #c6c6c6;
            border-bottom: 1px solid #c6c6c6;
          }
        }
        // display: block;
        // border: 1px solid #c6c6c6;
        //
        // .product-title {
        //   height: 100%;
        //   .color-item-title {
        //     float:left;
        //     width: 14.2%;
        //     line-height: 40px;
        //     text-align: center;
        //     font-size: 14px;
        //     border-right: 1px solid #c6c6c6;
        //   }
        // }
        //
        // .product-data {
        //   display: block;
        //   border-top: 1px solid #c6c6c6;
        //
        //   .product-data-cell {
        //     float:left;
        //     width: 14.2%;
        //     text-align: center;
        //     font-size: 14px;
        //     border-right: 1px solid #c6c6c6;
        //     white-space: nowrap;
        //     overflow: hidden;
        //   }
        //
        //   .color-data {
        //     float: left;
        //     width: 71.6%;
        //
        //     .color-block {
        //       border-bottom: 1px solid #c6c6c6;
        //     }
        //
        //     .color-data-cell {
        //       float:left;
        //       width: 19.84%;
        //       line-height: 40px;
        //       text-align: center;
        //       font-size: 14px;
        //       border-right: 1px solid #c6c6c6;
        //       white-space: nowrap;
        //       overflow: hidden;
        //     }
        //   }
        // }
      }

      // 扣数明细
      .ks-product {
        display: block;
        border: 1px solid #c6c6c6;

        .ks-product-title {
          height: 100%;
          .ks-color-item-title {
            float:left;
            width: 14.2%;
            line-height: 40px;
            text-align: center;
            font-size: 14px;
            border-right: 1px solid #c6c6c6;
          }
        }

        .ks-product-data {
          display: block;
          border-top: 1px solid #c6c6c6;

          .ks-product-data-cell {
            float:left;
            width: 14.2%;
            text-align: center;
            font-size: 14px;
            border-right: 1px solid #c6c6c6;
            white-space: nowrap;
            overflow: hidden;
          }

          .ks-color-data {
            float: left;
            width: 85.8%;

            .ks-color-block {
              border-bottom: 1px solid #c6c6c6;
            }

            .ks-color-data-cell {
              float:left;
              width: 16.55%;
              line-height: 40px;
              text-align: center;
              font-size: 14px;
              border-right: 1px solid #c6c6c6;
              white-space: nowrap;
              overflow: hidden;
            }
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
        width: 50%;
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

a, a:hover, a:link {
  color: #169BD5;
  text-decoration: none;
}

.clear {
  clear:both;
}
.no-border {
  border:none !important;
}

.el-form-item.need label:before {
  content: '*';
  color: red;
}
</style>
