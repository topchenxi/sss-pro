<template>
  <div class="print-order-list">
    <div class="y_table">
      <div class="y_table_wrap">
        <table class="print-table" cellspacing="0" cellpadding="0" v-if="orderList.length > 0 && orderInfo">
          <tr>
            <td rowspan="6" colspan="2">
              <img src="../../assets/logo.png" height="60px">
            </td>
            <td rowspan="6" colspan="3">
              <span style="font-size:36px;font-weight:blod;">销售扣数单</span>
            </td>
            <td>客户名称:</td>
            <td colspan="4">{{orderList[0].buyerCompany}}</td>
          </tr>
          <tr>
            <td>联系人:</td>
            <td colspan="4"></td>
          </tr>
          <tr>
            <td>开单时间:</td>
            <td colspan="4">{{orderList[0].createTime | formatTime}}</td>
          </tr>
          <tr>
            <td>公司名称:</td>
            <td colspan="4">深圳市微视觉科技有限公司广州分公司</td>
          </tr>
          <tr>
            <td>电话:</td>
            <td colspan="4">020-89039399</td>
          </tr>
          <tr>
            <td>地址:</td>
            <td colspan="4">广州市海珠区新港西路82号轻纺交易园F3017</td>
          </tr>
          <tr>
            <th>扣数单号</th>
            <th>订单号</th>
            <th>发货单号</th>
            <th>货号</th>
            <th>色号</th>
            <th>发货数量</th>
            <th>销售单价</th>
            <th>扣数</th>
            <th>扣数单价</th>
            <th>扣金额</th>
          </tr>
          <tr v-if="orderInfo.detailList.length > 0" v-for="item in orderInfo.detailList">
            <td>{{orderList[0].number}}</td>
            <td>{{orderList[0].serviceNumber}}</td>
            <td>{{orderList[0].outReposityNumber}}</td>
            <td>{{item.productNumber}}</td>
            <td>{{item.color}}</td>
            <td>{{item.quantity}}{{item.quantityUnit}}</td>
            <td>{{item.salePrice}}{{item.salePriceUnit}}</td>
            <td>{{item.buyerKouShu}}{{item.quantityUnit}}</td>
            <td>{{item.buyerKouShuPrice}}{{item.salePriceUnit}}</td>
            <td>{{item.kouShuMoney}}</td>
          </tr>
          <tr>
            <td>合计金额:</td>
            <td colspan="9" class="tl">{{orderInfo.kouShuMoney}}元</td>
          </tr>
          <tr>
            <td>扣数备注：</td>
            <td colspan="9" class="tl">{{orderInfo.genDanRemark}}</td>
          </tr>
          <tr>
            <td colspan="3" class="tl">跟单员确认签名：</td>
            <td colspan="3" class="tl">主管确认签名：</td>
            <td colspan="4" class="tl">客户确认签名：</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {
  request
} from 'utils/request'
import {
  getCache,
  formatTimeString
} from 'utils/tool'
import ksApi from 'api/ksApi'
export default {
  data() {
    return {
      orderList: [],
      orderInfo: null
    }
  },
  filters: {
    formatTime(val) {
      return formatTimeString(val)
    }
  },
  mounted() {
    this.$store.dispatch('changeload', false)
    const list = getCache({
      key: 'ksPrintOrder'
    })
    this.orderList = list;
    this.reqInfo()
    console.log(list)
  },
  methods: {
    reqInfo() {
      request(ksApi.getKsDetail, {
        data: {
          id: this.orderList[0].id
        },
        method: 'GET'
      }).then(response => {
        this.convertData(response)
      })
    },
    convertData(data) {
      this.orderInfo = data.obj
    }
  }
}
</script>

<style lang="scss">
.print-order-list {
  width:100%;
  margin: 5px;
  font-size: 14px;
}

.y_table_wrap {
  margin-bottom: 40px;
}

.print-table {
  width: 60%;
  border-top: 1px solid #bfbfbf;
  border-right: 1px solid #bfbfbf;
}

.print-table tr td,th {
  padding: 0;
  margin: 0;
  border-left: 1px solid #bfbfbf;
  border-bottom: 1px solid #bfbfbf;
  border-right: 0;
  text-align:center;
  width: 140px;
  line-height: 32px;
}

// .signing {
//   width: 67.33%;
// }
//
// .signing ul li {
//   float: left;
//   border-right: 1px solid #bfbfbf;
//   border-bottom: 1px solid #bfbfbf;
//   line-height: 38px;
//   width: 33%
// }

.signing .start {
  border-left: 1px solid #bfbfbf;
}

.tl {
  text-align: left !important;
}
.tr {
  text-align: right !important;
}
</style>
