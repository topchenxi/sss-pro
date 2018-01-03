<template>
  <div>
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
          <span>货号：{{basicData.productNumber}}</span>
          <span>采购总数：{{basicData.quantity}}{{basicData.quantityUnit}}</span>
        </td>
      </tr>
      <tr>
        <td colspan="6" align="right">
          <span>销售货款：{{basicData.saleMoney | formatMoney}}</span>
          <span>采购货款：{{basicData.buyMoney | formatMoney}} |</span>
          <span>成本货款：{{basicData.costMoney | formatMoney}} |</span>
          <span>毛利率：{{basicData.maoliPoint | formateNumber}}%|</span>
          <template v-if="basicData.type == 1">
            <span>服务费单价：
              <template v-if="basicData.servicePrice !== null && basicData.servicePriceUnit !== null">{{basicData.servicePrice | formatMoney}}{{basicData.servicePriceUnit}} </template>
              <template v-else>--</template>
            </span>
            <span>服务费：{{basicData.serviceMoney | formatMoney}}</span>
          </template>
          <span>采购商税款： {{basicData.taxMoney | formatMoney}}</span>
          <span> 供应商税款： {{basicData.sellerTaxMoney | formatMoney}}</span>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  props: ['basicData'],
  data() {
    console.log(this.basicData)
    return {}
  },
  filters: {
    formatMoney(val) {
      let result = '--'
      if (val !== null && val > 0) {
        result = Number(val).toFixed(2) + '元'
      }
      return result
    }
  }
}
</script>
