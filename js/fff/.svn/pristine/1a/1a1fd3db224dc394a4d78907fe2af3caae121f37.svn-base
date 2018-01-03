<template>
<div class='dsf-detail' v-loading.body="fullscreenLoading">
  <div class="clear" style="height:50px;">
    <!-- <h1 class="title" style="font-size: 25px; padding: 15px; float: left;">详情页</h1> -->
    <el-button style="float: right;margin-top: 10px;" type="info" @click.prevent="back">返回</el-button>
  </div>
  <div class="content box">
    <h4>销账信息</h4>
    <table class="custom-table">
      <tr>
        <td>销账时间：{{detailData.handlerTime | formateTime}}</td>
        <td>销账金额：{{detailData.xiaozhangMoney | formateNumber}}元</td>
        <td>实收销账金额：{{detailData.shishouTkMoney | formateNumber}}元</td>
        <td>实付销账金额：{{detailData.shifuXzMoney | formateNumber}}元</td>
      </tr>
      <tr>
        <td>销账人员：{{detailData.creatorName}}/{{detailData.creatorTel }}</td>
        <td>批次号：{{detailData.batchNumber}}</td>
        <td>销账类型：{{detailData.type | formateType}}</td>
        <td>
          <label>物流凭据：</label>
          <article class="media imgShow" v-if='detailData.sendCertificateList && detailData.sendCertificateList.length'>
            <a :href="'http://test.soouya.com'+ val" class="image media-left"
              v-lightbox="detailData.sendCertificateList"
              v-for="val in detailData.sendCertificateList"
              >
              <img :src="'http://test.soouya.com'+ val +'@200h_200w_1e'" alt="Image" width="40" height="40">
            </a>
          </article>
        </td>
      </tr>
      <tr>
        <td colspan="4" align="right"><span style="color: #999;">（报销运费））</span>报销金额：{{detailData.xiaozhangMoney | formateNumber}}元</td>
      </tr>
    </table>
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
  <out-reposity  v-if="outReposityList.length" :outReposityList="outReposityList" :outData="true"></out-reposity>

  <lightbox></lightbox>

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
    .real-money{
      display: inline-block;
      width: 200px
    }
}
</style>
<script>
import HeadFilter from 'components/headFilter/HeadFilter.vue'
import pagination from 'components/pagination'
import Lightbox from 'components/lightbox/lightbox'
import orderDetail from 'components/detail/orderDetail'
import inReposity from 'components/detail/inReposity'
import outReposity from 'components/detail/outReposity'
import {
  newRequest,
  formatTimeString,
  getCache,
  // setCache,
} from 'src/common/utils.js'
import _ from 'lodash'
import AccountApi from 'api/account.js'
import { Message } from 'element-ui'
export default {
  components: {
    HeadFilter,
    Lightbox,
    pagination,
    orderDetail,
    inReposity,
    outReposity
  },
  data() {
    return {
      time: new Date().getTime(),
      currentTab: 1,
      fullscreenLoading: false,
      detailData: {}, // 分账明细data
      basicData: {}, // 基本信息
      inReposityList: [], // 入仓单号
      outReposityList: [], // 出仓单号
      multipleSelection: [],
    }
  },
  mounted () {
    this.currentTab = getCache({
      key: 'unGetAndPayTabType',
    }) || 1
    this.getDetail()
  },
  watch: {

  },
  computed: {
    clothLoneListSort: function () {
        return _.sortBy(this.orderDetail.clothLoneList, 'number')
      },
  },
  filters: {
    formateText (val) {
      if (val == 1) {
        return '采购入仓'
      } else if (val == 2) {
        return '换货入仓'
      } else {
        return '售后入仓'
      }
    },
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
      } else if (val == 5) {
        return '运费'
      } else if (val == 6) {
        return '剪版'
      } else {
        return ''
      }
    },
  },
  methods: {
    getDetail() {
      const that = this
      newRequest({
        url: AccountApi.ChargeOffRecords.waitHandleYfDetail,
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
  }
}
</script>
