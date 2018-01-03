<template>
  <section id="sy-buyer-check-page">
    <div class="tab-wrap">
      <el-tabs v-model="activeName" type="card" class="tabs-container">
        <el-tab-pane :label="item.label" :name="item.name" v-for="item in tabModel">
          <router-link :to="item.name" tag="a" slot="label">
            <p></p>
            <p>{{item.label}}</p>
          </router-link>
        </el-tab-pane>
      </el-tabs>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </section>
</template>
<script>
import Fliter from 'components/filter'
import WaitSubmit from 'components/payManage/waitSubmit'
import FinishSubmit from 'components/payManage/finishSubmit'
import FinishAccount from 'components/payManage/finishAccount'
export default {
  components: {
    Fliter,
    WaitSubmit,
    FinishSubmit,
    FinishAccount
  },
  data() {
    return {
      tabModel: [{
        label: '待提交',
        name: 'waitSubmit'
      }], // , {
      //   label: '已提交',
      //   name: 'finishSubmit'
      // }, {
      //   label: '已对账',
      //   name: 'finishAccount'
      // }],
      activeName: this.$route.name,
      shopList: [],
      dialogVisible: false,
      str: '',
      filters: {
        createTimeBegin: '',
        createTimeEnd: '',
        keyword: ''
      },
      editStatus: false, // 编辑态
      getId: {
        countTotalMoney: '0.00',
        choseArr: [],
        orderNumberList: []
      }
    }
  },
  mounted() {
    this._time = (new Date()).getTime()
    // this.reqList()
  },
  filters: {
    colorClothTotal(row, color) {
      let totalQuantity = 0
      let quantityUnit
      let salePrice
      let salePriceUnit
      row.forEach((item) => {
        if (item.color == color) {
          totalQuantity += item.quantity
          quantityUnit = item.quantityUnit
          salePrice = item.salePrice
          salePriceUnit = item.salePriceUnit
        }
      })
      return `货款总额: ￥${Number(totalQuantity * salePrice).toFixed(2)}元 | 销售单价: ${salePrice}${salePriceUnit}(共${totalQuantity}${quantityUnit})`
    },
    cutString(val) {
      return val && val.substring(0, 8)
    },
    formateMoney(val) {
      return ('￥' + Number(val).toFixed(2))
    },
    minTotal(row) {
      return (Number(row.needSaleMoney) + Number(row.freightMoney)).toFixed(2)
    }
  }
};

</script>
<style lang="scss">


</style>
