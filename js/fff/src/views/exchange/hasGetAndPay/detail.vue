<template>
<div class='dsf-detail' v-loading.body="fullscreenLoading">
  <div class="clear" style="height:50px;">
    <!-- <h1 class="title" style="font-size: 25px; padding: 15px; float: left;">详情页</h1> -->
    <el-button style="float: right;margin-top: 10px;" type="info" @click.prevent="back">返回</el-button>
  </div>
  <div class="content box">
    <h4>销账信息</h4>
    <template v-if="currentTab == 1">
      <table class="custom-table">
        <tr>
          <td>进入待收款时间：{{detailData.createTime | formateTime}}</td>
          <td>供应商退款：{{detailData.refundMoney | formateNumber}}元</td>
          <td>到账金额：{{detailData.incomeMoney | formateNumber}}元</td>
          <td>
            <label>供应商退款凭据：</label>
            <article class="media imgShow" v-if='detailData.sellerCertificateList && detailData.sellerCertificateList.length'>
              <a :href="'http://test.soouya.com'+ val" class="image media-left"
                v-lightbox="detailData.sellerCertificateList"
                v-for="val in detailData.sellerCertificateList"
                >
                <img :src="'http://test.soouya.com'+ val +'@200h_200w_1e'" alt="Image" width="40" height="40">
              </a>
            </article>
          </td>
        </tr>
        <tr>
          <td>申请退换货时间：{{detailData.returnReplaceCreateTime | formateTime}}</td>
          <td>销账人员：{{detailData.creatorName}}/{{detailData.creatorTel}}</td>
          <td>销账类型：{{detailData.type | formateType}}</td>
          <td>财务收款账户：{{detailData.financeAccount}}</td>
        </tr>
        <tr>
          <td colspan="4" align="right">收款金额：{{detailData.incomeMoney | formateNumber}}元</td>
        </tr>
      </table>
    </template>
    <template v-else-if="currentTab == 2">
      <table class="custom-table">
        <tr>
          <td>进入待收款时间：{{detailData.createTime | formateTime}}</td>
          <td>供应商退款：{{detailData.moneySoouyaToSeller | formateNumber}}元</td>
          <td>到账金额：{{detailData.xiaozhangMoney | formateNumber}}元</td>
          <td>
            <label>供应商退款凭据：</label>
            <article class="media imgShow" v-if='detailData.certificateList  && detailData.certificateList .length'>
              <a :href="'http://test.soouya.com'+ val" class="image media-left"
                v-lightbox="detailData.certificateList "
                v-for="val in detailData.certificateList "
                >
                <img :src="'http://test.soouya.com'+ val +'@200h_200w_1e'" alt="Image" width="40" height="40">
              </a>
            </article>
          </td>
        </tr>
        <tr>
          <td>申请退换货时间：{{detailData.returnReplaceCreateTime | formateTime}}</td>
          <td>销账人员：{{detailData.creatorName}}/{{detailData.creatorTel}}</td>
          <td>销账类型：{{detailData.type | formateType}}</td>
          <td>财务收款账户：{{detailData.financeAccount}}</td>
        </tr>
        <tr>
          <td colspan="4" align="right">销账金额：{{detailData.xiaozhangMoney | formateNumber}}元</td>
        </tr>
      </table>
    </template>
    <template v-else="currentTab == 3">
      <table class="custom-table">
        <tr>
          <td>进入待退款时间：{{detailData.createTime | formateTime}}</td>
          <td>申请退换货时间：{{detailData.returnReplaceCreateTime | formateTime}}</td>
          <td>销账人员：{{detailData.creatorName}}/{{detailData.creatorTel}}</td>
          <td>销账类型：{{detailData.type | formateType}}</td>
        </tr>
        <tr>
          <td>退货销售货款：{{detailData.saleMoney | formateNumber}}元</td>
          <td>搜芽退款采购商：{{detailData.refundMoney | formateNumber}}元</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td colspan="4" align="right"><span style="color: #999;">（退回采购商虚拟账户）</span>退款金额：{{detailData.refundMoney | formateNumber}}元</td>
        </tr>
      </table>
    </template>
  </div>

  <order-detail :basicData="basicData"></order-detail>
  <div class="content box">
    <h4>商品信息</h4>
    <table class="custom-table">
      <tr>
        <th>色号</th>
        <th>采购数量</th>
        <th>成本单价</th>
        <th>销售单价</th>
        <th>成本小计</th>
        <th>销售小计</th>
      </tr>
      <tr v-for="item in basicData.colorList">
        <td>{{item.color}}</td>
        <td>{{item.quantity}}{{item.quantityUnit}}</td>
        <td>{{item.price}}{{item.priceUnit}}</td>
        <td>{{item.salePrice}}{{item.salePriceUnit}}</td>
        <td>{{Number(item.quantity * item.price).toFixed(2)}}元</td>
        <td>{{Number(item.quantity * item.salePrice).toFixed(2)}}元</td>
      </tr>
      <tr>
        <td colspan="6" align="right">
          货号：{{basicData.productNumber}}&nbsp;&nbsp;采购总数：{{basicData.quantity}}{{basicData.quantityUnit}} &nbsp;&nbsp;销售货款：{{basicData.saleMoney}}元 &nbsp;&nbsp;毛利率：{{basicData.maoliPoint | formateNumber}}%&nbsp;&nbsp;|&nbsp;&nbsp;
          <template v-if="basicData.type = 1">服务费单价：{{basicData.servicePrice | formateNumber}}{{basicData.servicePriceUnit}} &nbsp;&nbsp;服务费：{{basicData.serviceMoney | formateNumber}}</template>
          &nbsp;&nbsp;采购商税款：{{basicData.taxMoney | formateNumber}}元 &nbsp;&nbsp;供应商税款：{{basicData.sellerTaxMoney | formateNumber}}元
        </td>
      </tr>
    </table>
  </div>
  <in-reposity  v-if="inReposityList.length" :inReposityList="inReposityList" :quantity="basicData.quantity"></in-reposity>
  <template v-if="detailData.type == 3 || detailData.type == 4">
      <out-reposity  v-if="outReposityList.length" :outReposityList="outReposityList" :outData="true"></out-reposity>
  </template>
  <div class="content box">
    <h4>退换货信息</h4>
    <table class="custom-table">
      <tr>
        <th>退换货单号</th>
        <th>退换类型</th>
        <th>货号</th>
        <th>色号</th>
        <th>退货数量</th>
        <th width="150px">退货匹号</th>
        <th>退货成本货款</th>
        <th>供应商退款</th>
        <th>跟单员退货备注</th>
        <th>买货员退货备注</th>
      </tr>
      <tr v-for="item in returnReplace.colorList">
        <td>{{returnReplace.number}}</td>
        <td>{{returnReplace.type | formateType}}</td>
        <td>{{item.productNumber}}</td>
        <td>{{item.color}}</td>
        <td>{{item.quantity}}{{item.quantityUnit}}</td>
        <td>
          <template  v-for="key in item.clothLoneList">
            <p>{{key.number}}/{{key.quantity}}{{key.quantityUnit}}</p>
          </template>
        </td>
        <td>{{returnReplace.soouya2BuyerMoney | formateNumber}}元</td>
        <td>{{returnReplace.seller2SoouyaMoney | formateNumber}}元</td>
        <td>{{returnReplace.followerRemark}}</td>
        <td>{{returnReplace.purchaserRemark}}</td>
      </tr>
      <tr>
        <td colspan="10" align="right">
          退货数量：{{returnQuantity}}&nbsp;&nbsp;&nbsp;&nbsp;退货成本货款：{{returnReplace.soouya2BuyerMoney | formateNumber}}元 &nbsp;&nbsp;&nbsp;&nbsp;供应商退款：{{returnReplace.seller2SoouyaMoney | formateNumber}}元
        </td>
      </tr>
    </table>
  </div>
</div>
</template>

<style lang="scss">
  .dsf-detail {
    .fixed-footer{
      position: fixed;
      left: 201px;
      right: 0;
      bottom: 0;
      background: #fff;
      height: 50px;
      padding-top: 10px;
      padding-left: 15px;
    }
    .custom-table{
      width: 100%;
      border-spacing: 0;
      border: 1px solid #ccc;
      border-bottom: 0;
      border-right: 0;
      border-collapse: separate;
      table-layout: fixed;
      text-align: left;
      margin-bottom: 20px;
      th{
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
      td{
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
        label{
          display: inline-block;
          vertical-align: top;
          line-height: 40px;
        }
        p{
          display: inline-block;
          padding-right: 10px;
        }
        .imgShow{
          display: inline-block;
          a{
            margin-right: 5px;
          }
        }
        .left-img{
          float: left;
        }
        .right-info{
          float: right;
          line-height: 40px;
        }
      }
    }
    .div-setction{
      padding-bottom: 20px;
    }
    .el-tabs__content {
      position: static
    }
    .el-table td .cell {
      padding: 5px;
    }
    .line{
      height: 1px;
      border-bottom: 1px solid dashed;
    }
    .red{
      color: red;
    }
}
</style>
<script>
import HeadFilter from 'components/headFilter/HeadFilter.vue'
import pagination from 'components/pagination'
import {
  newRequest,
  formatTimeString,
  getCache,
  // setCache,
} from 'src/common/utils.js'
// import _ from 'lodash'
import AccountApi from 'api/account.js'
import orderDetail from 'components/detail/orderDetail'
import inReposity from 'components/detail/inReposity'
import outReposity from 'components/detail/outReposity'
import { Message } from 'element-ui'
export default {
  components: {
    HeadFilter,
    pagination,
    orderDetail,
    inReposity,
    outReposity
  },
  data() {
    return {
      time: new Date().getTime(),
      currentTab: 1,
      fullscreenLoading: true,
      replaceOrReturnTypeList: ['售前退货', '售前换货', '售后退货', '售后换货', '运费', '剪版'],
      detailData: {}, // 分账明细data
      basicData: {}, // 基本信息
      inReposityList: [], // 入仓单号
      outReposityList: [], // 出仓单号
      returnReplace: {}, // 退换货信息
      sellerCertificateList: [], // 供应商退款凭据
      dialogFormVisible: false, // 异常
      multipleSelection: [],
    }
  },
  mounted () {
    this.currentTab = getCache({
      key: 'hasGetAndPayTabType',
    }) || 1
    this.getDetail()
  },
  filters: {
    formateNumber (val) {
      let result = '--'
      if (val !== null && val >= 0) {
        result = Number(val).toFixed(2)
      }
      return result
    },
    formateTime (val) {
      return val ? formatTimeString(val) : '--'
    },
    formateType (val) {
      if (val == 1) {
        return '售前退货'
      } else if (val == 2) {
        return '售前换货'
      } else if (val == 3) {
        return '售后退货'
      } else if (val == 4) {
        return '售后换货'
      } else {
        return ''
      }
    },
  },
  computed: {
    returnQuantity () {
      let count = 0
      let countUnit = ''
      if (this.returnReplace.colorList) {
        this.returnReplace.colorList.forEach((item) => {
          count += Number(item.quantity)
          countUnit = item.quantityUnit
        })
      }
      return Number(count).toFixed(2) + countUnit
    },
  },
  watch: {},
  methods: {
    getDetail() {
      const that = this
      const url = [AccountApi.OnlineReceiveSeller.getDetail, AccountApi.ChargeOffRecords.waitHandleDetail, AccountApi.BuyerRefund.getDetail]
      newRequest({
        url: url[this.currentTab - 1],
        method: 'post',
        contentType: 'application/json',
        data: {id: that.$route.query.id}
      }).then(data => {
        that.fullscreenLoading = false
        if (data.success === '1') {
          this.detailData = data.obj;
          this.basicData = data.obj.order;
          this.inReposityList = data.obj.inReposityList;
          this.outReposityList = data.obj.outReposityList;
          this.returnReplace = data.obj.returnReplace
        } else {
          Message({
            message: data.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    back() {
      history.go(-1)
    },
    formatTime(time) { // 格式化时间
      return formatTimeString(time)
    },
  }
}
</script>
