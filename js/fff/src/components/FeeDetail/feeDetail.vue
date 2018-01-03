<template lang="html">
  <div class="">
    <!--对账实款-->
    <div class="" v-if="Number(payType) === 1">
      <div class="" v-if="order.category === 'jb-all'">
        <el-table :data="[order]" border>
          <el-table-column inline-template label="货款（元）">
            <span>{{Number(row.saleMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="应付货款（元）">
            <span>{{Number(row.toPayMoney).toFixed(2)}}</span>
          </el-table-column>
        </el-table>
      </div>
      <div class="" v-if="order.category === 'dhls-all'">
        <el-table :data="[order]" border>
          <el-table-column inline-template label="货款（元）">
            <span>{{Number(row.saleMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="税款（元）">
            <span>{{Number(row.taxMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="服务费（元）">
            <span>{{Number(row.serviceMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="应付货款（元）">
            <span>{{Number(row.toPayMoney).toFixed(2)}}</span>
          </el-table-column>
        </el-table>
      </div>
      <div class="" v-if="order.category === 'all-all' || order.category == 'dh-zy'">
        <!-- 对账的时候的明细 -->
        <el-table :data="[order]" border style='max-width:1280px'>
          <el-table-column inline-template label="销售货款（元）">
            <span>{{Number(row.saleMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="成本货款（元）">
            <span>{{Number(row.costMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="服务费（元）">
            <span>{{Number(row.serviceMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="采购商税款（元）">
            <span>{{Number(row.taxMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template :label="statusText">
            <span>{{Number(row[moneyString]).toFixed(2)}}</span>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--/实款-->
    <!--对账欠款-->
    <div class="" v-if="Number(payType) === 0">
      <el-table :data="[order]" border style='max-width:1280px'>
        <el-table-column inline-template label="销售货款（元）">
          <span>{{Number(row.saleMoney).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template label="成本货款（元）">
          <span>{{Number(row.costMoney).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template label="服务费（元）">
          <span>{{Number(row.serviceMoney).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template label="采购商税款（元）">
          <span>{{Number(row.taxMoney).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template :label="statusText">
          <span class='red'>{{Number(row[moneyString]).toFixed(2)}}</span>
        </el-table-column>
      </el-table>
    </div>
    <!--/欠款-->

    <!-- 分账 -->
    <div class="" v-if='Number(payType) === 10'>
      <div class="" v-if="order.fundType == '2'"><!--定金-->
        <el-table :data="[order]" border>
          <el-table-column inline-template label="定金（元）">
            <span>{{Number(row.earnestMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="销售货款（元）">
            <span>{{Number(row.saleMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="成本货款（元）">
            <span>{{Number(row.costMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="服务费（元）">
            <span>{{Number(row.serviceMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="供应商税款（元）">
            <span>{{Number(row.sellerTaxMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template :label="statusText">
            <span class='red'>{{Number(row[moneyString]).toFixed(2)}}</span>
          </el-table-column>
        </el-table>
      </div>
      <div class="" v-if="order.fundType == '3'"><!--尾款-->
        <el-table :data="[order]" border>
          <el-table-column inline-template label="尾款（元）">
            <span>{{Number(row.finalMoneySoouyaToSeller).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="已付定金（元）">
            <span>{{Number(row.earnestMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="销售货款（元）">
            <span>{{Number(row.saleMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="成本货款（元）">
            <span>{{Number(row.costMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="服务费（元）">
            <span>{{Number(row.serviceMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="供应商税款（元）">
            <span>{{Number(row.sellerTaxMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template :label="statusText">
            <span class='red'>{{Number(row[moneyString]).toFixed(2)}}</span>
          </el-table-column>
        </el-table>
      </div>
      <div class="" v-if="order.fundType == '5'"><!--货款-->
        <el-table :data="[order]" border>
          <el-table-column inline-template label="销售货款（元）">
            <span>{{Number(row.saleMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="成本货款（元）">
            <span>{{Number(row.costMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="服务费（元）">
            <span>{{Number(row.serviceMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="供应商税款（元）">
            <span>{{Number(row.sellerTaxMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template :label="statusText">
            <span class='red'>{{Number(row[moneyString]).toFixed(2)}}</span>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- /分账 -->
  </div>
</template>

<script>
export default {
  props: {
    order: {
      required: true,
      type: Object,
      default: {},
    },
    payType: {
      required: true,
      type: Number,
      default: 0
    },
    statusText: {
      required: false,
      type: String,
      default: ''
    },
    moneyString: {
      required: false,
      type: String,
      default: ''
    }
  },
  data () {
    return {
      // category: order.category,
    }
  },
  mounted() {
    console.log('this.order', this.order)
  },
  computed: {},
  ready () {},
  attached () {},
  methods: {},
  components: {}
}
</script>

<style lang="css" scoped>
  .red{
    color: red;
  }
</style>
