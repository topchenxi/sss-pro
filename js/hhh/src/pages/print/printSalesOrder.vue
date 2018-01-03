<template>
  <div class="sales-order-print">
    <div class="y_table">
      <div class="y_table_wrap">
      <table class='baseinfo-table' cellpadding="0" border='0'>
        <tbody>
          <th></th><th> </th><th> </th><th> </th><th> </th><th> </th><th> </th><th> </th>
          <tr>
            <td rowspan='5' colspan='2'>
              <img src="../../assets/logo.png" height="60px">
            </td>
            <td rowspan='5' colspan='3'>
              <span class='title'>销售订单</span>
            </td>
            <td>订单号：</td><td colspan='2' style="text-align:left;padding-left: 20px;" class='border-right-none'>{{colorList[0] && colorList[0].serviceNumber}}</td>
          </tr>
          <tr>
            <td>客户名称：</td><td colspan='2' style="text-align:left;padding-left: 20px;" class='border-right-none'>{{colorList[0] && colorList[0].buyerCompany}}</td>
          </tr>
          <tr>
            <td>联系人：</td><td colspan='2' class='border-right-none'></td>
          </tr>
          <tr>
            <td>交货方式：</td><td colspan='2' class='border-right-none'></td>
          </tr>
          <tr>
            <td>交货地点：</td><td colspan='2' class='border-right-none'></td>
          </tr>
          <tr>
            <td>公司名称：</td><td colspan='4'>深圳市微视觉科技有限公司广州分公司</td>
            <td>订货日期：</td><td colspan='2' style="text-align:left;padding-left: 20px;" class='border-right-none'>{{colorList[0] && colorList[0].createTimeStr}}</td>
          </tr>
          <tr>
            <td>电话：</td><td colspan='3' style="text-align:left;padding-left: 20px;">020-89039399</td>
            <td>传真：</td><td colspan='3' style="text-align:left;padding-left: 20px;" class='border-right-none'>020-89038496</td>
          </tr>
          <tr>
            <td>地址：</td><td colspan='7' style="text-align:left;padding-left: 20px;" class='border-right-none'>广州市海珠区新港西路82号轻纺交易园F3017</td>
          </tr>
        </tbody>
      </table>
       <table class='baseinfo-table' cellpadding="0" border='0' style='border-top: 1px solid #999; margin-top: 40px'>
         <th style='width: 220px;'>订单号</th>
         <th style='width: 100px'>货号</th>
         <th style='width: 100px'>色号</th>
         <th style='width: 100px'>预定数量</th>
         <th style='width: 100px'>单价</th>
         <th style='width: 140px;'>预估金额</th>
         <th style='width: 100px'>封度</th>
         <th class='border-right-none'>备注</th>
         <tbody>
           <tr v-for='list in colorList'>
             <td>{{list.serviceNumber}}</td>
             <td>{{list.productNumber}}</td>
             <td>{{list.color}}</td>
             <td >{{list.quantity}}{{list.quantityUnit}}</td>
             <td>{{list.salePrice}}{{list.salePriceUnit}}</td>
             <td style='text-align:left;padding: 0 10px;'>￥{{list.priceAll}}元</td>
             <td class='border-right-none'></td>
             <td class='border-right-none'> </td>
           </tr>
         </tbody>
       </table>
       <table class='baseinfo-table' cellpadding="0" border='0' style='border-top: 1px solid #999'>
         <tbody>
           <tr>
             <td>订单总量：</td>
             <td colspan='4'>
                <span v-for='(count, key) in countTotal'>{{count}}{{key}} &nbsp;&nbsp;&nbsp;&nbsp;</span>
             </td>
             <td colspan='2'>预估金额合计：</td><td colspan='2' class='border-right-none'>￥{{priceTotal}}元</td>
           </tr>
           <tr>
             <td>收订金人：</td><td colspan='2'></td>
             <td>实收订金：</td><td colspan='2'></td>
             <td>收款方式：</td><td colspan='2' class='border-right-none'></td>
           </tr>
         </tbody>
       </table>
     </div>
     <div class="bottom">
      <div class="text">
        本单所需订金金额：
      </div>
      <div class="text">
        特别声明：
      </div>
      <ol>
        <li>预定数量可能与实发数量略有出入，以实发为准。</li>
        <li>按订货时的布板验收，如有质量问题，客户必须在收货后7天内向本公司提出异议，否则视为客户已验收，本公司无需负责。逾期或者开剪后，本公司恕不负责</li>
        <li>本公司收订后，如因客观原因或货源关系未能交货，则客户可获订金原数奉还。</li>
        <li>如货到后，通知订货人贰天内不按时退货，本公司有权处理这批货，不退订金。若客户在两天内分批退货，可按提货数量的金额付款，订金在提最后一批时扣除</li>
        <li>第一联自存，第二联客户，搜芽保留一切解释权。</li>
      </ol>
     </div>
    </div>
  </div>
</template>

<script>
// import { mapActions, mapState } from 'vuex'
import {
  getCache,
  culMul,
  formatTimeString
} from 'utils/tool'
export default {
  data () {
    return {
      result: [],
      colorList: [],
      priceTotal: 0, // 购买总金额
      baseInfo: [],
      countTotal: {},
      logo: ''
    }
  },
  filters: {
    convertDate (val) {
      return Number(val) != 0 ? formatTimeString(val) : '--'
    }
  },
  mounted () {
    this.$store.dispatch('changeload', false)
    this.result = getCache({
      type: 'sessionStorage',
      dataType: 'json',
      key: 'forPrintOrderList',
    }) || []
    console.log(this.result)
    this.convertData(this.result)
  },
  updated () {
  },
  methods: {
    convertData (result) {
      const that = this
      that.baseInfo = [result[0]]
      that.colorList = []
      that.priceTotal = 0
      that.conutTotal = []
      result.map((item, index) => {
        if (item.provideColorList) {
          item.provideColorList.map((color, j) => {
            color.serviceNumber = item.serviceNumber
            color.productNumber = item.productNumber
            color.buyerCompany = item.buyerCompany
            color.priceAll = culMul(color.salePrice, color.quantity)
            color.createTimeStr = formatTimeString(item.createTime)
          })
          that.colorList = that.colorList.concat(item.provideColorList)
        }
      })
      let mapTotal = {}
      that.colorList.map((color) => {
        that.priceTotal = that.priceTotal + culMul(color.salePrice, color.quantity)
        that.conutTotal = that.conutTotal + color.quantity
        if (mapTotal[color.quantityUnit]) {
          mapTotal[color.quantityUnit] = mapTotal[color.quantityUnit] + color.quantity
        } else {
          mapTotal[color.quantityUnit] = color.quantity
        }
      })
      that.countTotal = mapTotal
    }
  },
  watch: {
    // 'clothLoneIdList': {
    //   handler: function (val, oldVal) {
    //     if (this.clothLoneIdList.length === this.checkboxData.length) {
    //       this.checked = true
    //     } else {
    //       this.checked = false
    //     }
    //     console.log('this.clothLoneIdList', this.clothLoneIdList)
    //   },
    //   deep: true
    // }
  }
}
</script>
<style lang="scss">
.sales-order-print {
  position: relative;
  overflow: hidden;
  .y_table {
    border-left: 1px solid #999;
    border-right: 1px solid #999;
    clear: both;
    background-color: #fff;
    width: 100%;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
  }
  .border-right-none {
    border-right: none !important;
  }
  .y_table_wrap {
    .baseinfo-table {
      text-align: center;
      width: 100%;
      .title{
        display: inline-block;
        font-size: 36px;
      }
      width: 100%;
      border-spacing: 0;
      border-bottom: 0;
      border-right: 0;
      border-collapse: separate;
      table-layout: fixed;
      text-align: center;
      font-size: 18px;
      th{
        white-space: nowrap;
        overflow: hidden;
        background-color: #EFF2F7;
        height: 0;
        min-width: 0;
        line-height: 40px;
        text-overflow: ellipsis;
        vertical-align: middle;
        border-bottom: 1px solid #999;
        border-right: 1px solid #999;
        box-sizing: border-box;
        color: #1f2d3d;
      }
      td{
        line-height: 30px;
        position: relative;
        box-sizing: border-box;
        border-right: 1px solid #999;
        height: 25px;
        min-width: 0;
        word-break: break-all;
        vertical-align: middle;
        border-bottom: 1px solid #999;
      }
    }
     td.is-center {
        text-align: center;
        border-right: 1px solid #999;
     }
     td {
       text-overflow: initial;
     }
     th.is-center {
       text-align: center;
     }
   }
   .el-table{
     box-sizing: border-box;
   }
   .el-table td .cell {
      padding: 5px 0 0;
      line-height: 1.5;
      word-break: break-word;
   }
   .bottom {
     text-align: left;
     background: #fff;
     padding: 10px;
     padding-top: 25px;
     font-size: 18px;
     border-bottom: 1px solid #999;
     .text{
       padding: 5px 0;
     }
     ol{
       padding: 0;
       margin: 0;
       padding-left: 25px;
       li {
         margin: 0;
         padding: 3px 0;
       }
     }
   }
}
@media print {
  font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
  width: 100%;
  .y_table{
    max-height: 100%;
    box-sizing: border-box;
    .baseinfo-table{
      width: 100%;
      td{
        font-size: 20px;
      }
    }
    .bottom{
      font-size: 20px;
    }
  }
}
</style>
