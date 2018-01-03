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
            <table class="product" v-if="orderInfo && orderInfo.colorList">
              <tr>
                <td width="13%">出仓单号</td>
                <td width="12%">货号</td>
                <td width="13%">色号</td>
                <td width="13%">采购单价</td>
                <td width="13%">成本单价</td>
                <td width="13%">发货数量</td>
                <td>出仓匹数</td>
              </tr>
              <tr v-for="(color, index) in orderInfo.colorList">
                <td :rowspan="orderInfo.colorList.length">{{orderInfo.outReposityNumber}}</td>
                <td :rowspan="orderInfo.colorList.length">{{productNumber}}</td>
                <td>{{color.color}}</td>
                <td>{{color.buyPrice | formatNumber}}{{color.buyPriceUnit}}</td>
                <td>{{color.price | formatNumber}}{{color.priceUnit}}</td>
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
                <td width="13%">货号</td>
                <td width="12%">色号</td>
                <td width="13%">发货数量</td>
                <td width="13%">采购单价</td>
                <td width="13%">成本单价</td>
                <td width="13%">扣数</td>
                <td width="13%">扣数单价</td>
                <td>退款金额</td>
              </tr>
              <tr v-for="(color, index2) in ksOrderInfo.detailList">
                <td :rowspan="ksOrderInfo.detailList.length">{{productNumber}}</td>
                <td>{{color.color}}</td>
                <td>{{color.quantity | formatNumber}}{{color.quantityUnit}}</td>
                <td>{{color.buyPrice | formatNumber}}{{color.buyPriceUnit}}</td>
                <td>{{color.price | formatNumber}}{{color.priceUnit}}</td>
                <td>{{color.sellerKouShu | formatNumber}}{{color.quantityUnit}}</td>
                <td>{{color.sellerKouShuPrice | formatNumber}}{{color.priceUnit}}</td>
                <td>{{color.tuiKuanMoney | formatNumber}} 元</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="form-data">
          <div class="form-title">买货员扣数备注：</div>
          <div class="info">
            {{ksOrderInfo.caiGouRemark}}
          </div>
        </div>

        <div class="form-data">
          <div class="form-title">凭据图片：</div>
          <div class="info">
            <el-col
              :span="24"
              v-for="item in images"
              v-show="images.length > 0"
              :href="item"
              :key="item"
              v-lightbox="ksOrderInfo.imgUrls"
            >
              <img :src="item" class="image" />
            </el-col>
          </div>
        </div>
    </div>
    <lightbox />
  </div>

</template>

<script>
import ksApi from 'api/ksApi'
import Lightbox from 'components/lightbox/lightbox'
import {
  newRequest
} from 'utils/tool'

export default {
  components: {
    Lightbox
  },
  data() {
    return {
      ksOrderId: '',
      orderInfo: {},
      ksOrderInfo: {},
      productNumber: '',
      // ksProductList: [],
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
      },
      images: []
    }
  },
  filters: {
    formatNumber(val) {
      return Number(val).toFixed(2)
    }
  },
  mounted() {
    this.$store.dispatch('changeload', true)
    this.ksOrderId = this.$route.query.id
    this.reqInfo()
  },
  methods: {
    reqInfo() {
      newRequest({
        url: ksApi.getKsDetail,
        data: {id: this.ksOrderId},
        method: 'get'
      }).then(response => {
        if (response && response.success && response.success == 1) {
          this.convertKsOrderData(response.obj)
          if (this.ksOrderInfo.outReposityId != '') {
            newRequest({
              url: ksApi.getOutReposityDetail,
              data: {
                id: this.ksOrderInfo.outReposityId
              },
              method: 'get'
            }).then(response1 => {
              this.$store.dispatch('changeload', false)
              this.converReposityOrderData(response1.obj)
            })
          }
        } else {
          this.ksOrderInfo = {
            list: []
          }
          this.orderInfo = {
            colorList: []
          }
        }
      })
    },
    convertKsOrderData(req) {
      this.ksOrderInfo = req
      console.log(this.ksOrderInfo.imgUrls)
      if (this.ksOrderInfo.imgUrls.length > 0) {
        this.ksOrderInfo.imgUrls.forEach((img) => {
        this.images.push('http://www.soouya.com' + img)
      })
      }
      this.ksCellHeight['line-height'] = this.ksCellHeight.height = (40 * this.ksOrderInfo.detailList.length) + 'px'
    },
    converReposityOrderData(req) {
      this.orderInfo = req
      this.productNumber = this.orderInfo.colorList[0].productNumber
      this.cellHeight['line-height'] = this.cellHeight.height = (40 * this.orderInfo.colorList.length) + 'px'
    },
    goBack() {
      window.history.back(-1)
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
        //     width: 12.5%;
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
        //     width: 12.5%;
        //     text-align: center;
        //     font-size: 14px;
        //     border-right: 1px solid #c6c6c6;
        //     white-space: nowrap;
        //     overflow: hidden;
        //   }
        //
        //   .color-data {
        //     float: left;
        //     width: 75%;
        //
        //     .color-block {
        //       border-bottom: 1px solid #c6c6c6;
        //     }
        //
        //     .color-data-cell {
        //       float:left;
        //       width: 16.66%;
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
            width: 12.5%;
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
            width: 12.5%;
            text-align: center;
            font-size: 14px;
            border-right: 1px solid #c6c6c6;
            white-space: nowrap;
            overflow: hidden;
          }

          .ks-color-data {
            float: left;
            width: 87.5%;

            .ks-color-block {
              border-bottom: 1px solid #c6c6c6;
            }

            .ks-color-data-cell {
              float:left;
              width: 14.28%;
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
        width: 140px;
        float: left;
        display: inline;
        text-align: right;
        margin-right: 20px;
      }

      .info {
        width: 75%;
        float: left;
        display: inline;

        p {
          min-width: 30%;
          margin-bottom: 20px;
        }

        img {
          width: 80px;
          height: 80px;
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
