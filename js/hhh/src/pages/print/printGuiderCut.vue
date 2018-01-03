<template>
  <section>
    <div class="page" v-for="(details,kk) in result" size="A4">
      <table border="1" cellspacing="0" cellpadding="0">
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td colspan="2" style="border:0;border-top:1px solid black;">{{details.shopCompany}}</td>
          <th colspan="3" style="border:0;border-top:1px solid black;font-size:x-large;">销售细码单</th>
          <td colspan="2" style="border:0;border-top:1px solid black;">订单号<br/>{{details.number}}</td>
        </tr>
        <tr>
          <th>客户名称</th>
          <td>{{details.customerCompany}}</td>
          <th>业务员</th>
          <td>{{details.salerName}}</td>
          <th>下单时间</th>
          <td colspan="2">{{details.createTime | formatTime}}</td>
        </tr>
        <tr>
          <th colspan="2">货物名称及规格</th>
          <th colspan="2">色号</th>
          <th>采购数量</th>
          <th>销售单价</th>
          <th>合计</th>
        </tr>
        <tr v-for="(color, index) in details.colors">
          <td colspan="2" v-if="color.number">{{color.number}}<br/>{{color.title}}</td>
          <td colspan="2" v-else></td>
          <td colspan="2">{{color.color}}</td>
          <td>{{color.cutterQuantity}}{{color.cutterQuantityUnit}}</td>
          <td>{{color.salePriceMoney}}{{color.salePriceUnit}}</td>
          <td>{{color.totalMoney}}</td>
        </tr>
        <tr>                    
          <td style="text-align:right;padding-right:10px;" colspan="7" v-if="details.needInvoice == 1 && details.taxPoint > 0">合计:{{details.totalMoney | formateNumber}}元(税率{{details.taxPoint}}%)</td>
          <td  style="text-align:right;padding-right:10px;" colspan="7" v-else>合计:{{details.totalMoney | formateNumber}}元</td>
        </tr>
      </table>
    </div>
  </section>
</template>

<script>
import {
  newRequest,
  formatTimeString
}
  from 'utils/tool'
export default {
  data() {
    return {
      imgPath: 'http://www.soouya.com',
      result: []
    }
  },
  mounted() {
    this.getDetail()
  },
  filters: {
    formateNumber(val) {
      return Number(val).toFixed(2)
    },
    formatTime(val) {
      return formatTimeString(val)
    }
  },
  methods: {
    getDetail() {
      this.$store.dispatch('changeload', true)
      const ids = this.$route.query.ids
      newRequest({
        url: `/redwood/ziying/cut?ids=${ids}`,
        method: 'get',
        data: {}
      }, (res) => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
          var maxRow = 20
          this.result = res.page.result
          for (var index = 0; index < this.result.length; index++) {
            var details = this.result[index]
            details.colors = []
            var c = 0
            for (var i = 0; i < details.productNumbers.length; i++) {
              var productNumber = details.productNumbers[i]
              for (var j = 0; j < productNumber.colors.length; j++) {
                var color = productNumber.colors[j]
                color.number = productNumber.number
                color.title = productNumber.title
                color.totalMoney = (Number(color.salePriceMoney) * Number(color.cutterQuantity)) + '元'
                if (color.status == 0) {
                  continue;
                }
                c++
                if (c >= maxRow) {
                  break;
                }
                details.colors.push(color)
              }
            }
            for (; c < maxRow; c++) {
              details.colors.push({})
            }
          }
        }
      })
    }
  }
};
</script>

<style lang="scss">
.page table {
  table-layout: fixed;
  width: 19cm;
  height: 27.7cm;
  border: 1px solid black;
  border-collapse: collapse;
  text-align: center;
}

.page th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}

.page tr {
  height: 40px;
}

.page tr:nth-child(1) {
  height: 0px;
  border: 1px solid white;
  td,
  th {
    width: 14.286%;
    border: none;
  }
}

.page tr:nth-child(2) {
  height: 100%;
}


.page {
  width: 21cm;
  height: 29.7cm;
  display: block;
  margin: 0 auto;
  margin-bottom: 0.5cm;
  box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
  padding: 1cm;
}


@media print {
  .page {
    margin: 0;
    box-shadow: 0;
  }
}

body,
html {
  height: 0px;
  min-height: 0px;
  min-width: 0px;
}

.app {
  min-height: 0px;
  min-width: 0px;
}
</style>
