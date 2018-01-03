<template>
  <section style="position:relative;padding-bottom:100px;" v-loading.fullscreen="fullscreenLoading">
    <i class="el-icon-arrow-left goback-icon" @click="$router.go(-1)">返回</i>
    <!-- <h2 style="font-size: 25px; padding: 15px;">详情页</h2> -->
    <!-- <el-button type="primary" @click="$router.go(-1)" style="position:absolute; right:0px; top:10px;">返回</el-button> -->
    <template v-if="reimburseInfo">
      <div class="content box">
        <h4>处理信息</h4>
        <table class="custom-table">
          <tr>
            <td>进入待处理时间：{{reimburseInfo.financeCreateTime | formatTime}}</td>
            <td>实收金额：
              <span class="red-color">{{reimburseInfo.totalMoney | formatMoney}}</span>元
            </td>
            <td>退换类型：
              <template v-if="reimburseInfo.type == 1">售前退货</template>
              <template v-if="reimburseInfo.type == 2">售前换货</template>
              <template v-if="reimburseInfo.type == 3">售后退货</template>
              <template v-if="reimburseInfo.type == 4">售后换货</template>
              <template v-if="reimburseInfo.type == 5">仅退款 </template>
            </td>
            <td>款项类型：
              <template v-if="reimburseInfo.moneyType == 1">供应商退款</template>
              <template v-if="reimburseInfo.moneyType == 2">搜芽补款</template>
              <template v-if="reimburseInfo.moneyType == 3">搜芽退款</template>
            </td>
          </tr>
          <tr>
            <td>申请退换货时间：{{reimburseInfo.createTime | formatTime}}</td>
            <td>
              <template v-if="reimburseInfo.moneyType == 1">供应商退款：{{reimburseInfo.sellerRefund}}</template>
              <template v-if="reimburseInfo.moneyType == 2">搜芽补款：{{reimburseInfo.soouyaToSellerMoney}}</template>
              <template v-if="reimburseInfo.moneyType == 3">搜芽退款：{{reimburseInfo.soouyaPayToBuyer}}</template>
              元
            </td>
            <td>
              <template v-if="$route.params.status === 'done'">财务备注：{{reimburseInfo.financeRemark}}</template>
            </td>
            <td></td>
          </tr>
        </table>
      </div>
      <orderDetail :basicData="basicData"></orderDetail>
      <DahuoInformation class="content box" :basicData="basicData"></DahuoInformation>
      <in-reposity v-if="inReposityList.length" :inReposityList="inReposityList" :quantity="basicData.quantity"></in-reposity>
      <out-reposity :outReposityList="outReposityList" :inReposityList="inReposityList" :outData="true" v-if="outReposityList.length && (reimburseInfo.returnReplace.type !== 1 && reimburseInfo.returnReplace.type !== 2 && reimburseInfo.returnReplace.type !== 5)"></out-reposity>
      <div class="content box">
        <h4>退换货信息</h4>
        <template v-if="reimburseInfo.returnReplace.type == 1 || reimburseInfo.returnReplace.type == 3">
          <table class="custom-table">
            <tr>
              <th>退换货单号</th>
              <th>退换类型</th>
              <th>货号</th>
              <th>色号</th>
              <th>退货原数</th>
              <th>退货实数</th>
              <th>退货匹号</th>
              <th>退货成本货款</th>
              <th>供应商退款</th>
              <th>跟单员退货备注</th>
              <th>买货员退货备注</th>
            </tr>
            <tr v-for="(color,colorIndex) in returnReplace.colorList" :key="colorIndex">
              <td v-if="colorIndex === 0" :rowspan="returnReplace.colorList.length">{{returnReplace.number}}</td>
              <td v-if="colorIndex === 0" :rowspan="returnReplace.colorList.length">
                <template v-if="returnReplace.type == 1">售前退货</template>
                <template v-if="returnReplace.type == 2">售前换货</template>
                <template v-if="returnReplace.type == 3">售后退货</template>
                <template v-if="returnReplace.type == 4">售后换货</template>
              </td>
              <td v-if="colorIndex === 0" :rowspan="returnReplace.colorList.length">{{color.productNumber}}</td>
              <td>{{color.color}}</td>
              <td>{{color.quantity}}{{color.quantityUnit}}</td>
              <td>{{color.realQuantity}}{{color.realQuantityUnit}}</td>
              <td>
                <p v-for="(item,index) in color.clothLoneList" :key="index">
                  {{item.number}}/{{item.quantity}}{{item.quantityUnit}}
                </p>
              </td>
              <td>{{color | countReturnReplacePrice(basicData.sellerInvoiceStatus)}}</td>
              <td v-if="colorIndex === 0" :rowspan="returnReplace.colorList.length">
                <template v-if="reimburseInfo.moneyType == 1">{{reimburseInfo.sellerRefund}}</template>
                <template v-if="reimburseInfo.moneyType == 2">{{reimburseInfo.soouyaToSellerMoney}}</template>
                <template v-if="reimburseInfo.moneyType == 3">{{reimburseInfo.soouyaPayToBuyer}}</template>
              </td>
              <td style="word-break:break-all;" v-if="colorIndex === 0" :rowspan="returnReplace.colorList.length">{{returnReplace.followerRemark}}</td>
              <td style="word-break:break-all;" v-if="colorIndex === 0" :rowspan="returnReplace.colorList.length">{{returnReplace.purchaserRemark}}</td>
            </tr>
            <tr style="text-align:right">
              <td colspan="10">
                退货数量：{{returnReplace.colorList.reduce((acc,val)=>{return acc + val.quantity},0)}}{{returnReplace.colorList[0].quantityUnit}} 退货成本货款：{{returnReplace.colorList | sumCountReturnReplacePrice(basicData.sellerInvoiceStatus)}}元
                <template v-if="reimburseInfo.moneyType == 1">供应商退款：{{reimburseInfo.sellerRefund}}</template>
                <template v-if="reimburseInfo.moneyType == 2">搜芽补款：{{reimburseInfo.soouyaToSellerMoney}}</template>
                <template v-if="reimburseInfo.moneyType == 3">搜芽退款：{{reimburseInfo.soouyaPayToBuyer}}</template>
                元
              </td>
            </tr>
          </table>
        </template>
        <template v-else-if="reimburseInfo.returnReplace.type == 2 || reimburseInfo.returnReplace.type == 4">
          <table class="custom-table">
            <tr>
              <th>退换货单号</th>
              <th>退换类型</th>
              <th>货号</th>
              <th>色号</th>
              <th>换货原数</th>
              <th>换货实数</th>
              <th>现采购数量</th>
              <th>换货匹号</th>
              <th>原成本货款</th>
              <th>现成本货款</th>
              <th>跟单员换货备注</th>
              <th>买货员换货备注</th>
            </tr>
            <tr v-for="(color,colorIndex) in returnReplace.colorList" :key="colorIndex">
              <td v-if="colorIndex === 0" :rowspan="returnReplace.colorList.length">{{returnReplace.number}}</td>
              <td v-if="colorIndex === 0" :rowspan="returnReplace.colorList.length">
                <template v-if="returnReplace.type == 1">售前退货</template>
                <template v-if="returnReplace.type == 2">售前换货</template>
                <template v-if="returnReplace.type == 3">售后退货</template>
                <template v-if="returnReplace.type == 4">售后换货</template>
                <template v-if="returnReplace.type == 5">仅退款</template>
              </td v-if="colorIndex === 0" :rowspan="returnReplace.colorList.length">
              <td v-if="colorIndex === 0" :rowspan="returnReplace.colorList.length">{{color.productNumber}}</td>
              <td>{{color.color}}</td>
              <td>{{color.quantity}}{{color.quantityUnit}}</td>
              <td>{{color.realQuantity ? color.realQuantity : 0}}{{color.realQuantityUnit}}</td>
              <td>{{color.needBuyQuantity ? color.needBuyQuantity : 0}}{{color.needBuyQuantityUnit}}</td>
              <td>{{color.clothLoneList.map(item => item.number).join('/')}}</td>
              <td>{{color | countReturnReplacePrice(basicData.sellerInvoiceStatus)}}</td>
              <td>{{color | countReturnReplaceNeedBuyPrice(basicData.sellerInvoiceStatus)}}</td>
              <td style="word-break:break-all;" v-if="colorIndex === 0" :rowspan="returnReplace.colorList.length">{{returnReplace.followerRemark}}</td>
              <td style="word-break:break-all;" v-if="colorIndex === 0" :rowspan="returnReplace.colorList.length">{{returnReplace.purchaserRemark}}</td>
            </tr>
            <tr>
              <td colspan="12" align="right">
                换货码单：
                <article class="media imgShow" v-if='returnReplace.madanImgUrls && returnReplace.madanImgUrls.length'>
                  <a :href="'http://test.soouya.com'+ val" class="image media-left" v-lightbox="returnReplace.madanImgUrls" v-for="(val, index) in returnReplace.madanImgUrls" :key="index">
                    <img :src="'http://test.soouya.com'+ val +'@200h_200w_1e'" alt="Image" width="40" height="40">
                  </a>
                </article>
              </td>
            </tr>
            <tr>
              <td colspan="12">
                <el-row type="flex" justify="space-between" align="middle">
                  <el-col style="text-align:right">
                    换货原数：{{returnReplace.colorList.reduce((acc,val) => {return val.quantity + acc},0)}}{{returnReplace.colorList[0].quantityUnit}} 现采购数量：{{returnReplace.colorList.reduce((acc,val) => {return val.needBuyQuantity + acc},0)}}{{returnReplace.colorList[0].needBuyQuantityUnit}}
                    <template v-if="reimburseInfo.moneyType == 1">供应商退款：{{reimburseInfo.sellerRefund}}</template>
                    <template v-if="reimburseInfo.moneyType == 2">搜芽补款：{{reimburseInfo.soouyaToSellerMoney}}</template>
                    <template v-if="reimburseInfo.moneyType == 3">搜芽退款：{{reimburseInfo.soouyaPayToBuyer}}</template>
                  </el-col>
                </el-row>
              </td>
            </tr>
          </table>
        </template>
        <template v-else-if="reimburseInfo.returnReplace.type == 5">
          <table class="custom-table">
            <tr>
              <th>退换货单号</th>
              <th>退换类型</th>
              <th>货号</th>
              <th>色号</th>
              <th>退货数量</th>
              <th>跟单员退货备注</th>
              <th>买货员退货备注</th>
            </tr>
            <tr v-for="(color,colorIndex) in returnReplace.colorList" :key="colorIndex">
              <td v-if="colorIndex === 0" :rowspan="returnReplace.colorList.length">{{returnReplace.number}}</td>
              <td v-if="colorIndex === 0" :rowspan="returnReplace.colorList.length">
                仅退款
              </td>
              <td v-if="colorIndex === 0" :rowspan="returnReplace.colorList.length">{{color.productNumber}}</td>
              <td>{{color.color}}</td>
              <td>{{color.quantity}}{{color.quantityUnit}}</td>
              <td style="word-break:break-all;" v-if="colorIndex === 0" :rowspan="returnReplace.colorList.length">{{returnReplace.followerRemark}}</td>
              <td style="word-break:break-all;" v-if="colorIndex === 0" :rowspan="returnReplace.colorList.length">{{returnReplace.purchaserRemark}}</td>
            </tr>
            <tr style="text-align:right">
              <td colspan="7">
                退货数量：{{returnReplace.colorList.reduce((acc,val)=>{return acc + val.quantity},0)}}{{returnReplace.colorList[0].quantityUnit}} 退货成本货款：{{returnReplace.colorList | sumCountReturnReplacePrice(basicData.sellerInvoiceStatus)}}元
                <template v-if="reimburseInfo.moneyType == 1">供应商退款：{{reimburseInfo.sellerRefund}}</template>
                <template v-if="reimburseInfo.moneyType == 2">搜芽补款：{{reimburseInfo.soouyaToSellerMoney}}</template>
                <template v-if="reimburseInfo.moneyType == 3">搜芽退款：{{reimburseInfo.soouyaPayToBuyer}}</template>
                元
              </td>
            </tr>
          </table>
        </template>
      </div>
      <!-- <footer class="fixed-footer" v-if="this.$route.params.status === 'undone'">
            <div>
              <el-button type="primary" @click="showExchangeDialog(reimburseInfo)">确认处理</el-button>
              <el-button type="primary" @click="showExceptionDialog(reimburseInfo)">异常</el-button>
              <el-button @click="$router.go(-1)">返回</el-button>
            </div>
          </footer> -->
    </template>
    <lightbox></lightbox>
    <ExchangeHandleDialog :config="handleDialogConfig" v-on:success="$router.go(-1)"></ExchangeHandleDialog>
    <ExchangeExceptionDialog :config="exceptionDialogConfig" v-on:success="getData"></ExchangeExceptionDialog>
  </section>
</template>
<script>
import orderDetail from 'components/detail/orderDetail'
import exchangeApi from 'api/exchange'
import inReposity from 'components/detail/inReposity'
import outReposity from 'components/detail/outReposity'
import Lightbox from 'components/lightbox/lightbox'
import DahuoInformation from 'components/detail/dahuoInformation'
import ExchangeHandleDialog from 'components/exchangeHandleDialog'
import ExchangeExceptionDialog from 'components/exchangeExceptionDialog'

export default {
  components: {
    orderDetail,
    inReposity,
    outReposity,
    Lightbox,
    DahuoInformation,
    ExchangeHandleDialog,
    ExchangeExceptionDialog
  },
  filters: {
    countReturnReplacePrice(color, sellerInvoiceStatus) {
      const price = sellerInvoiceStatus === 1 ? color.priceWithTax : color.price
      const count = color.quantity * price
      console.log(11, count)
      return parseFloat(count).toFixed(2)
    },
    countReturnReplaceNeedBuyPrice(color, sellerInvoiceStatus) {
      const price = sellerInvoiceStatus === 1 ? color.priceWithTax : color.price
      const count = color.needBuyQuantity * price
      return parseFloat(count).toFixed(2)
    },
    sumCountReturnReplacePrice(colorList, sellerInvoiceStatus) {
      const sumCount = (colorList || []).reduce((colorAcc, color) => {
        const price = sellerInvoiceStatus === 1 ? color.priceWithTax : color.price
        return price * color.quantity + colorAcc
      }, 0)
      return parseFloat(sumCount).toFixed(2)
    },
  },
  data() {
    return {
      reimburseInfo: null,
      basicData: null,
      inReposityList: [],
      outReposityList: [],
      returnReplace: null,
      fullscreenLoading: false,
      dialogConfig: {
        isShow: false,
        ids: [],
        totalMoney: 0,
        type: 'freight'
      },
      handleDialogConfig: {
        isShow: false,
        id: [],
        type: 1
      },
      exceptionDialogConfig: {
        isShow: false,
        id: ''
      },
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.fullscreenLoading = true
      exchangeApi.getExchangeDetails({ id: this.$route.query.id }).then((response) => {
        if (this.requestIsSuccess(response)) {
          this.basicData = response.obj.order
          this.inReposityList = response.obj.inReposityList
          this.outReposityList = response.obj.outReposityList
          this.returnReplace = response.obj.returnReplace
          this.reimburseInfo = response.obj
        }
        this.fullscreenLoading = false
      })
    },
    showExchangeDialog(data) {
      let ids = []
      if (Array.isArray(data)) {
        data.forEach((item) => {
          ids.push(item.id)
        })
      } else {
        ids.push(data.id)
      }
      Object.assign(this.handleDialogConfig, {
        isShow: true,
        id: ids,
        type: data.moneyType
      });
    },
    showExceptionDialog(data) {
      console.log(data)
      Object.assign(this.exceptionDialogConfig, {
        isShow: true,
        id: data.id,
      })
    }
  }
}
</script>

<style lang="scss">
.dsf-detail {
  .fixed-footer {
    position: fixed;
    left: 201px;
    right: 0;
    bottom: 0;
    background: #fff;
    height: 50px;
    padding-top: 10px;
    padding-left: 15px;
  }
  .custom-table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid #ccc;
    border-bottom: 0;
    border-right: 0;
    border-collapse: separate;
    table-layout: fixed;
    text-align: left;
    margin-bottom: 20px;
    th {
      white-space: nowrap;
      overflow: hidden;
      background-color: #fff;
      height: 20px;
      line-height: 40px;
      text-overflow: ellipsis;
      vertical-align: middle;
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;
      box-sizing: border-box;
      color: #1f2d3d;
      padding: 0 10px;
    }
    tr {
      height: 35px;
    }
    td {
      word-break: break-all;
      padding: 5px 10px;
      font-size: 14px;
      position: relative;
      box-sizing: border-box;
      border-right: 1px solid #ccc;
      min-width: 0;
      min-width: 100px;
      text-overflow: ellipsis;
      vertical-align: middle;
      border-bottom: 1px solid #ccc;
      background-color: #fff;
      label {
        display: inline-block;
        vertical-align: top;
        line-height: 40px;
      }
      p {
        display: inline-block;
        padding-right: 10px;
      }
      .imgShow {
        display: inline-block;
        a {
          margin-right: 5px;
        }
      }
      .left-img {
        float: left;
      }
      .right-info {
        float: right;
        line-height: 40px;
      }
    }
  }
  .el-tabs__content {
    position: static
  }
  .el-table td .cell {
    padding: 5px;
  }
  .line {
    height: 1px;
    border-bottom: 1px solid dashed;
  }
  .red {
    color: red;
  }
  .real-money {
    display: inline-block;
    width: 200px
  }
}

.custom-table {
  .td {
    word-break: break-all
  }
}

.fixed-footer {
  height: 50px;
  >div {
    position: fixed;
    left: 200px;
    bottom: 0;
    right: 19px;
    border: 1px solid #ccc;
    background: #fff;
    padding: 10px 20px;
  }
}
</style>
