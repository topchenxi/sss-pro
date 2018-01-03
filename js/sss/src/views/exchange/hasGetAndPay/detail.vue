<template>
<div class='dsf-detail' v-loading.body="fullscreenLoading">
  <h1 class="title" style="font-size: 25px; padding: 15px">详情页</h1>
  <section class='div-setction'>
    <h2 style="font-size: 18px; padding: 15px">基本信息</h2>
    <table class='color-list-table' cellpadding="0" border='0'>
      <tr>
        <td>订单号：{{orderDetail.order.serviceNumber}}</td>
        <td>发布时间：{{orderDetail.order.createTime && formatTime(orderDetail.order.createTime)}}</td>
        <td>大货类型：{{orderDetail.order.type == 2 ? '贸易单': '服务单'}}</td>
      </tr>
      <tr>
        <td>验货：{{orderDetail.order.checkCloth == 1 ? '是' : '否'}}</td>
        <td>实版：{{orderDetail.order.haveRealVersion == 1 ? '有实版' : '无实版'}}</td>
        <td>期望货期：{{orderDetail.order.expectedTime && formatTime(orderDetail.order.expectedTime)}}</td>
      </tr>
      <tr>
        <td>采购商：{{orderDetail.order.buyerCompany}}</td>
        <td>采购商发票：{{orderDetail.order.invoiceStatus == 1 ? '需要' : '不需要'}}</td>
        <td>结算周期：{{orderDetail.order.billingCycle}}</td>
      </tr>
      <tr>
        <td>供应商 ：{{orderDetail.order.shopName}}</td>
        <td>档口电话 ：{{orderDetail.order.shopTel}}</td>
        <td>详细地址 ：{{orderDetail.order.shopProvince}}{{orderDetail.order.shopCity}}{{orderDetail.order.shopArea}}{{orderDetail.order.shopAddr}}</td>
      </tr>
      <tr>
        <td>银行账号开户名 ：{{orderDetail.order.accountUser}}</td>
        <td>银行卡卡号 ：{{orderDetail.order.accountNumber}}</td>
        <td>银行名称 ：{{orderDetail.order.accountBank}}</td>
      </tr>
      <tr>
        <td>账户类型 ：{{orderDetail.order.accountType == 2 ? '个人' : '企业'}}</td>
        <td>开户支行 ：{{orderDetail.order.accountBranch}}</td>
        <td>供应商发票 ：{{orderDetail.order.sellerInvoiceStatus == 1 ? '有' : '没有'}}</td>
      </tr>
    </table>
  </section>
  <section class='div-setction'>
    <h2 style="font-size: 18px; padding: 15px">颜色及数量</h2>
    <table class='color-list-table' cellpadding="0" border='0'>
      <tr>
        <td colspan="4">
          <span style='padding-right: 35px;'>货号：{{orderDetail.order.productNumber}}</span>
          <span style='padding-right: 35px;'>单位：{{orderDetail.order.colorList[0] && orderDetail.order.colorList[0].quantityUnit}}</span>
          <span style='padding-right: 35px;'>服务费单价：{{Number(orderDetail.order.servicePrice || 0).toFixed(2)}}</span>
          <span style='padding-right: 35px;'>|</span>
          <span style='padding-right: 35px;'>采购商税点：{{orderDetail.order.taxPoint}}%</span>
          <span style='padding-right: 35px;'>供应商税点：{{orderDetail.order.sellerTaxPoint}}%</span>
        </td>
      </tr>
      <tr>
        <td>色号</td>
        <td>采购数量</td>
        <td>销售单价</td>
        <td>成本单价</td>
      </tr>
      <tr v-for='list in orderDetail.order.colorList'>
        <td>{{list.color}}</td>
        <td>{{list.quantity}}/{{list.quantityUnit}}</td>
        <td>{{Number(list.salePrice || 0).toFixed(2)}}/{{list.salePriceUnit}}</td>
        <td>{{list.price}}/{{list.priceUnit}}</td>
      </tr>
    </table>
  </section>
  <section class='div-setction' v-for='colorObj in orderDetail.returnReplace.colorList'>
    <h2 style="font-size: 18px; padding: 15px">退换货详情</h2>
    <table class='color-list-table' cellpadding="0" border='0'>
      <tr>
        <td colspan="4">
          <span>
            退换货匹号：
            <span v-for='(clothLoneList, i) in colorObj.clothLoneList'>
              {{clothLoneList.number}}/{{clothLoneList.quantity}}{{clothLoneList.quantityUnit}}
              {{i == (colorObj.length-1) ? '、': '' }}</span>
          </span>
        </td>
      </tr>
      <tr>
        <td>退换类型：<span class='red'>{{replaceOrReturnTypeList[orderDetail.returnReplace.type - 1]}}</span></td>
        <td>色号 ： {{colorObj.color}}</td>
        <td>销售单价 ：{{Number(colorObj.salePrice || 0).toFixed(2)}}/{{colorObj.salePriceUnit}} </td>
        <td>成本单价 ：{{Number(colorObj.price || 0).toFixed(2)}}/{{colorObj.priceUnit}} </td>
      </tr>
      <!-- 退换 -->
      <tr v-if='orderDetail.returnReplace.type == 1 || orderDetail.returnReplace.type == 3'>
        <td>退换货数量 ：{{colorObj.quantity}}{{colorObj.quantityUnit}}</td>
        <td>搜芽给采购商 ：{{Number(orderDetail.returnReplace.soouya2BuyerMoney || 0).toFixed(2)}}</td>
        <td>供应商给搜芽 ：{{Number(orderDetail.returnReplace.seller2SoouyaMoney || 0).toFixed(2)}}</td>
        <td>当前状态 ：{{orderDetail.order.statusDesc}}</td>
      </tr>
      <!-- 换货  -->
      <tr v-else>
        <td>当前状态 ：{{orderDetail.order.statusDesc}}</td>
        <td>跟单员 ：{{orderDetail.returnReplace.followerName}} ({{orderDetail.returnReplace.createTime && formatTime(orderDetail.returnReplace.createTime)}}) </td>
        <td>买货员 ：{{orderDetail.returnReplace.purcahserName}} ({{orderDetail.returnReplace.purcahserReviewTime && formatTime(orderDetail.returnReplace.purcahserReviewTime)}}) </td>
        <td>退换货出仓时间 ： {{orderDetail.returnReplace.outReposityTime && formatTime(orderDetail.returnReplace.outReposityTime)}}</td>
      </tr>
      <!-- 退货 -->
      <tr v-if='orderDetail.returnReplace.type == 1 || orderDetail.returnReplace.type == 3'>
        <td>跟单员 ：{{orderDetail.returnReplace.followerName}} ({{orderDetail.returnReplace.createTime && formatTime(orderDetail.returnReplace.createTime)}}) </td>
        <td>买货员 ：{{orderDetail.returnReplace.purcahserName}} ({{orderDetail.returnReplace.purcahserReviewTime && formatTime(orderDetail.returnReplace.purcahserReviewTime)}}) </td>
        <td>财务 ：{{orderDetail.returnReplace.financeName}} ({{orderDetail.returnReplace.financeReviewTime && formatTime(orderDetail.returnReplace.financeReviewTime)}})</td>
        <td>退换货出仓时间 ： {{orderDetail.returnReplace.outReposityTime && formatTime(orderDetail.returnReplace.outReposityTime)}}</td>
      </tr>
      <tr>
        <td colspan="2">跟单员退换货备注 ：{{orderDetail.returnReplace.followerRemark}}</td>
        <td colspan="2">买货员退换货备注 ：{{orderDetail.returnReplace.purchaserRemark}}</td>
      </tr>
    </table>
  </section>
  <section class='div-setction'>
    <h2 style="font-size: 18px; padding: 15px">费用明细</h2>
    <table class='color-list-table' cellpadding="0" border='0'>
      <tr>
        <td>销售货款（元）</td>
        <td>成本货款（元）</td>
        <td>服务费（元）</td>
        <td>采购商税款（元）</td>
        <td>供应商税款（元)</td>
        <template v-if='currentTab == 1'>
          <td>供应商退款（元）</td>
          <td>到账金额（元）</td>
        </template>
        <template v-if='currentTab == 2'>
          <td>销账金额（元）</td>
          <td>实收退款金额（元）</td>
          <td>实付销账金额（元）</td>
        </template>
        <template v-if='currentTab == 3'>
          <td>退款金额（元）</td>
          <td>退回虚拟账户（元)</td>
          <td>退回授信额度（元)</td>
        </template>
      </tr>
      <tr>
        <td>{{Number(orderDetail.order.saleMoney || 0).toFixed(2)}}</td>
        <td>{{Number(orderDetail.order.costMoney || 0).toFixed(2)}}</td>
        <td>{{Number(orderDetail.order.serviceMoney || 0).toFixed(2)}}</td>
        <td>{{Number(orderDetail.order.taxMoney || 0).toFixed(2)}}</td>
        <td>{{Number(orderDetail.order.sellerTaxMoney || 0).toFixed(2)}}</td>
        <template v-if='currentTab == 1'>
          <td>{{Number(orderDetail.refundMoney || 0).toFixed(2)}}</td>
          <td>{{Number(orderDetail.incomeMoney || 0).toFixed(2)}}</td>
        </template>
        <template v-if='currentTab == 2'>
          <td>{{Number(orderDetail.xiaozhangMoney || 0).toFixed(2)}}</td>
          <td>{{orderDetail.shishouTkMoney === null ? '--' : Number(orderDetail.shishouTkMoney).toFixed(2)}}</td>
          <td>{{orderDetail.shifuXzMoney === null ? '--' : Number(orderDetail.shifuXzMoney).toFixed(2)}}</td>
        </template>
        <template v-if='currentTab == 3'>
          <td>{{Number(orderDetail.refundMoney || 0).toFixed(2)}}</td>
          <td>{{Number(orderDetail.returnToBalance || 0).toFixed(2)}}</td>
          <td>{{Number(orderDetail.returnToCreditLine || 0).toFixed(2)}}</td>
        </template>
      </tr>
    </table>
  </section>
  <section class='div-setction'>
    <el-button size='mini' @click.prevent="back">返回</el-button>
  </section>
</div>
</template>

<style lang="scss">
  .dsf-detail {
    .color-list-table {
      background-color: #fff;
      width: 100%;
      border-spacing: 0;
      border: 1px solid #e0e6ed;
      border-bottom: 0;
      border-right: 0;
      border-collapse: separate;
      table-layout: fixed;
      text-align: left;
      th{
        white-space: nowrap;
        overflow: hidden;
        background-color: #EFF2F7;
        height: 20px;
        min-width: 0;
        line-height: 40px;
        text-overflow: ellipsis;
        vertical-align: middle;
        border-bottom: 1px solid #e0e6ed;
        border-right: 1px solid #e0e6ed;
        box-sizing: border-box;
        width: 200px;
        color: #1f2d3d;
      }
      td{
        padding-left: 10px;
        line-height: 40px;
        position: relative;
        box-sizing: border-box;
        border-right: 1px solid #e0e6ed;
        height: 40px;
        min-width: 80;
        text-overflow: ellipsis;
        vertical-align: middle;
        border-bottom: 1px solid #e0e6ed;
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
  request,
  formatTimeString,
  getCache,
  // setCache,
} from 'src/common/utils.js'
// import _ from 'lodash'
import AccountApi from 'api/account.js'
import { Message } from 'element-ui'
export default {
  components: {
    HeadFilter,
    pagination
  },
  data() {
    return {
      time: new Date().getTime(),
      currentTab: 1,
      fullscreenLoading: true,
      replaceOrReturnTypeList: ['售前退货', '售前换货', '售后退货', '售后换货'],
      orderDetail: {
        order: {
          colorList: [],
        },
        returnReplace: {
          colorList: [{
            clothLoneList: []
          }]
        }
      },
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
  watch: {},
  methods: {
    getDetail() {
      const that = this
      const url = [AccountApi.OnlineReceiveSeller.getDetail, AccountApi.ChargeOffRecords.waitHandleDetail, AccountApi.BuyerRefund.getDetail]
      request({
        url: url[this.currentTab - 1],
        method: 'post',
        data: {
          param: JSON.stringify({
            id: that.$route.query.id
          })
        }
      }).then(data => {
        that.fullscreenLoading = false
        if (data.success === '1') {
          this.orderDetail = data.obj
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
