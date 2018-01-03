<template>
  <div>
    货号：{{basicData.productNumber}}
    &nbsp;&nbsp;
    采购总数：{{basicData.quantity}}{{basicData.quantityUnit}} 
    &nbsp;&nbsp;
    销售货款：{{basicData.saleMoney | formatMoney}}
     &nbsp;&nbsp;
    采购货款：{{basicData.buyMoney | formatMoney}}
     &nbsp;&nbsp;
    成本货款：{{basicData.costMoney | formatMoney}}
    &nbsp;&nbsp;
    毛利率：{{basicData.maoliPoint | formateNumber}}%
    &nbsp;&nbsp;|&nbsp;&nbsp;
    <template v-if="basicData.type == 1">服务费单价：
      <template v-if="basicData.servicePrice !== null && basicData.servicePriceUnit !== null">{{basicData.servicePrice | formatMoney}}{{basicData.servicePriceUnit}} </template>
      <template v-else>--</template>
      &nbsp;&nbsp;
      服务费：{{basicData.serviceMoney | formatMoney}}
    </template>
    &nbsp;&nbsp;
    采购商税款：
    {{basicData.taxMoney | formatMoney}}
    &nbsp;&nbsp;
    供应商税款：
    {{basicData.sellerTaxMoney | formatMoney}}
  </div>
</template>
<script>
export default {
  props: ['basicData'],
  filters: {
    formatMoney(val) {
      let result = '--'
      if (val !== null && val >= 0) {
        result = Number(val).toFixed(2) + '元'
      }
      return result
    }
  }
}
</script>