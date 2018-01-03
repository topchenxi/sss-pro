<template>
  <div class="returnReplace-orderdetail">
    <div class='title'>订单详情<el-button style="margin-left: 5px;" size="mini" type="primary" @click="$router.go(-1)">返回</el-button></div>
     <!-- <a href="#" @click.prevent="goback">返回列表页</a>  -->
    <div class="detial-wrap">
      <same-detail :orderDetail="{}" :yesNotRequest="true"/>
      <template v-if="$route.query.type == 1 || $route.query.type == 3">
        <div class="block-title">退货详情</div>
         <div v-if="orderDetail.colorList">
         <table class='custom-table' v-for="(value, key) in orderDetail.colorList">
           <tr>
             <td>退换货类型： <template v-if="$route.query.type == 1">退货</template><template v-if="$route.query.type == 3">售后退货</template></td>
             <td>色号： {{value.color}}</td>
             <td>销售单价： {{value.salePrice}}{{value.salePriceUnit}}</td>
             <td>成本单价： {{value.price}}{{value.priceUnit}}</td>
             <td>采购单价： {{value.buyPrice}}{{value.buyPriceUnit}}</td>
           </tr>
           <tr>
             <td colspan="2">退货数量： {{value.clothLoneList | totalTal}}{{value.quantityUnit}}</td>
             <!-- <td>搜芽给采购商： {{orderDetail.soouya2BuyerMoney}}元</td>
             <td>供应商给搜芽： {{orderDetail.seller2SoouyaMoney}}元</td> -->
             <td colspan="2">当前状态： {{orderDetail.statusStr}}</td>
           </tr>
           <tr>
             <td>跟单员： {{orderDetail.followerName}}({{orderDetail.createTime | convertTime}})</td>
             <td>买货员： {{orderDetail.purcahserName}} ({{orderDetail.purcahserReviewTime | convertTime}})</td>
             <td>财务： {{orderDetail.financeName}} ({{orderDetail.financeReviewTime | convertTime}})</td>
             <td>退货出仓时间： {{orderDetail.outReposityTime | convertTime}}</td>
           </tr>
           <tr>
            <td colspan="4" v-if="value.clothLoneList">
               <p style="margin: 5px 0; display: inline-block;">退货匹号：</p>
               <p style="margin-bottom: 5px; display: inline-block;"><span v-for="(item, index) in value.clothLoneList">{{item.number}}/{{item.quantity}}{{item.quantityUnit}}<template v-if='index != (value.clothLoneList.length - 1)'>,</template></span>
             </p>
            </td>
           </tr>
           <tr>
             <td colspan="2">跟单员退货备注： {{orderDetail.followerRemark}}</td>
             <td colspan="2">买货员退货备注： {{orderDetail.purchaserRemark}}</td>
           </tr>
         </table>
        </div>
     </template>
     <template v-if="$route.query.type == 2 || $route.query.type == 4">
        <div class="block-title">换货详情</div>
        <div v-if="orderDetail.colorList">
         <table class='custom-table' v-for="(value, key) in orderDetail.colorList">
          <tr>
            <td>退换货类型： <template v-if="$route.query.type == 2">换货</template><template v-if="$route.query.type == 4">售后换货</template></td>
            <td>色号： {{value.color}}</td>
            <td>销售单价： {{value.salePrice}}{{value.salePriceUnit}}</td>
            <td>采购单价： {{value.buyPrice}}{{value.buyPriceUnit}}</td>
          </tr>
           <tr>
             <td>当前状态： {{orderDetail.statusStr}}</td>
             <td>跟单员： {{orderDetail.followerName}}({{orderDetail.createTime | convertTime}})</td>
             <td>买货员： {{orderDetail.purcahserName}} ({{orderDetail.purcahserReviewTime | convertTime}})</td>
             <td>换货出仓时间： {{orderDetail.outReposityTime | convertTime}}</td>
           </tr>
           <tr>
             <td colspan="4" v-if="value.clothLoneList">
                <p style="margin: 5px 0; display: inline-block;">换货匹号：</p>
                <p style="margin-bottom: 5px; display: inline-block;"><span v-for="(item, index) in value.clothLoneList">{{item.number}}/{{item.quantity}}{{item.quantityUnit}}<template v-if='index != (value.clothLoneList.length - 1)'>,</template></span>
              </p>
             </td>
           </tr>
           <tr>
             <td colspan="2">跟单员换货备注： {{orderDetail.followerRemark}}</td>
             <td colspan="2">买货员换货备注： {{orderDetail.purchaserRemark}}</td>
           </tr>
         </table>
        </div>
     </template>
    </div>
  </div>
</template>
<script>
  import {
    request,
    // setCache,
    formatTimeString,
  } from 'utils/tool'
  import Api from 'api/reposity'
  import SameDetail from './sameDetail'
  export default {
    components: {
     SameDetail
    },
    data() {
      return {
        result: [],
        orderDetail: {},
        colorList: []
      }
    },
    filters: {
      convertTime (val) {
        return val ? formatTimeString(val) : '--'
      },
      totalTal (clothLoneList) {
        let total = 0
        clothLoneList.forEach((item) => {
          total += item.quantity
        })
        return total
      }
    },
    mounted() {
      this.getReturnReplaceDetail()
    },
    methods: {
      getReturnReplaceDetail () {
        this.$store.dispatch('changeload', true)
        request({
          url: Api.getDetail,
          method: 'post',
          data: {
            param: JSON.stringify({
              number: this.$route.query.number
            })
          }
        }).then(data => {
          this.$store.dispatch('changeload', false)
          if (data.success === '1') {
            this.orderDetail = data.obj
          } else {
            this.$message({
              type: 'error',
              message: data.msg,
              duration: 1000
            })
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
.returnReplace-orderdetail{
  .title{
    width: 100%;
    border-bottom: 2px solid #ccc;
    padding-bottom: 15px;
    a{
      float: right;
      text-decoration: none;
    }
  }
  .detial-wrap{
    font-size: 14px;
    padding-left: 20px;
    .block-title{
      margin-bottom: 15px;
      margin-top: 10px;
    }
  }
  .pull-left {
    float: left;
  }
  .pull-right {
    float: right;
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
    word-break: break-all;
    th{
      white-space: nowrap;
      overflow: hidden;
      background-color: #EFF2F7;
      height: 20px;
      min-width: 0;
      line-height: 40px;
      text-overflow: ellipsis;
      vertical-align: middle;
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;
      box-sizing: border-box;
      color: #1f2d3d;
      padding: 0 10px;
      &.pro-info{
        min-width: 120px;
      }
    }
    tr {
      height: 30px;
    }
    th.w1 {
      width: 10%;
    }
    th.w2 {
      width: 20%;
    }
    th.w3 {
      width: 100px;
    }
    th.w4 {
      width: 110px;
    }
    .color-list {
      min-width: 200px;
      span {
        display: inline-block;
        width: 32%;
        text-align: center;
      }
    }
    .no-right-border {
      border-right: none;
    }
    td{
      padding: 0 10px;
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
      &.pro-info{
        padding: 10px;
        line-height: 16px;
        .pro-info-left{
          .name{
            width: 150px;
            padding: 15px;
            margin-bottom: 5px;
            text-align: center;
          }
        }
        .pro-info-right{
          padding-left: 20px;
          .status{
            margin-top: 20px;
          }
        }
      }
    }
  }
  .border{
    border-radius: 4px;
    border: 1px dotted #3c8dbc;
    padding: 5px;
  }
}

</style>
