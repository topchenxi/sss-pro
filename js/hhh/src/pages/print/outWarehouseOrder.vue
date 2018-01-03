<template>
  <div class="wrap">
    <section class="print-page" v-for="order in orderList">
      <table>
        <tr>
          <td width="500" colspan="2" rowspan="4" class="txt-center title">搜芽/名仕销售发货单</td>
          <td>订单号</td>
          <td colspan="2">{{order.number}}</td>
        </tr>
        <tr>
          <td>订单日期</td>
          <td colspan="2">{{order.createTime | formatData}}</td>
        </tr>
        <tr>
          <td>采购商名称</td>
          <td colspan="2">{{order.customerCompany}}</td>
        </tr>
        <tr>
          <td>类型</td>
          <td colspan="2">剪版</td>
        </tr>
      </table>
      <p>所属部门</p>
      <p>电话:020-89039399 传真：020-89039399</p>
      <p class="border-bottom margin">地址:广州市海珠区新港西路82号轻纺交易园F3017</p>
      <table>
        <tr class="txt-center has-border">
          <td>货物名称【规格】</td>
          <td>色号/颜色</td>
          <td>发货数量</td>
          <td>销售单价</td>
          <td>金额(元)</td>
        </tr>
        <tr class="txt-center has-border" v-for="product in order.product">
          <td>{{product.number}}</td>
          <td>{{product.color}}</td>
          <td>{{product.cutterQuantity}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr class="txt-center has-border">
          <td colspan="3"></td>
          <td>总发货款</td>
          <td class="red-tet">&yen;{{order.totalMoney}}</td>
        </tr>
      </table>
      <dl class="margin">
        <dt>特别声明:</dt>
        <dd>
          <ul>
            <li>预订数量可能与实发数量略有出入，以实发为准。</li>
            <li>按订货时确认的布板验收，如有质量问题，客户必须在收到货后7天内向本店提出异议，否则视为客户已验收，本店无需负责。逾期或开剪后，本公司恕不负责。</li>
            <li>本店收订后，如因客观原因或货源关系未能交货，则客户可获订金原数奉还。</li>
            <li>如货到后，通知订货人贰天内不按时提货，本店有权处理这批货物，不退订金。若客户在两天内分批提货，可按提货数量的金额付款，订金在提最后一批时扣除。 </li>
            <li>第一联自存,第二联客户,搜芽保留一切解释权。</li>
          </ul>
        </dd>
      </dl>
      <footer>
        <div class="client">客户签收:</div>
        <div class="follower">跟单员:</div>
      </footer>
    </section>
  </div>
</template>
<script>
import { formatTimeString } from 'utils/tool'
export default {
  data() {
    return {
      orderList: JSON.parse(localStorage.getItem('printData'))
    }
  },
  filters: {
    formatData(val) {
      return formatTimeString(val)
    }
  },
  mounted() {
    console.log(this.orderList)
    this.$store.dispatch('changeload', false)
  }
}

</script>
<style lang="scss" scoped>
.wrap {
  background: #fff;
}

.print-page {
  position: relative;
  overflow: hidden;
  width: 900px;
  height: 100%;
  max-height: 100%;
  max-width: 100%;
  background: #fff;
  line-height: 2em;
  margin: 0 auto;
  page-break-after: always;
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.red-tet {
  font-size: 18px;
  color: #f00;
}

.margin {
  margin-bottom: 30px;
}

footer {
  >div {
    float: left;
    width: 50%;
  }
}

.border-bottom {
  border-bottom: 3px solid #000;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}

dl {
  margin-top: 20px;
}

.has-border {
  td {
    border: 1px solid #000;
  }
}

ul {
  list-style-type: decimal;
  padding-left: 20px;
}

.txt-center {
  text-align: center;
}

@media print {
  font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
  width: 100%;
  table {
    max-height: 100%;
    box-sizing: border-box;
    width: 100%;
    td {
      font-size: 20px;
    }
  }
  .print-page {
    page-break-after: always;
  }
}

</style>
