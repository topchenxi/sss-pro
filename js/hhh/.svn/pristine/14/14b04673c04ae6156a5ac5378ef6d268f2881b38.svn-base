<template>
  <div>
    <hsMenu></hsMenu>
    <div class="oms-content">
      <search :params='params' @toSearch="getList"></search>
      <div class="main-wrap">
        <div class="main-content">
          <div class="table-wrap" v-if="list.length&&params.type==1">
            <el-table :data="list" border style="width: 100%" :height="windowHeight - 300">
              <el-table-column label="对账日期" width="180">
                <template scope="scope"> {{scope.row.reconciliationTime | date}} </template>
              </el-table-column>
              <el-table-column prop="billNumber" label="账单号" width="160"> </el-table-column>
              <el-table-column prop="number" label="出仓单号" width="150"> </el-table-column>
              <el-table-column label="订单号/扣数单号" width="205">
                <template scope="scope">
                  <p :class="{'green':scope.row.isOutRepo==0}">{{scope.row.bulk.number}}</p>
                </template>
              </el-table-column>
              <el-table-column label="订单日期/扣数单日期" width="180">
                <template scope="scope">
                  <!-- isOutRepo; 1:出仓单,0:扣数单 -->
                  <p v-if="scope.row.isOutRepo==1">{{scope.row.bulk.createTime | date}}</p>
                  <p v-if="scope.row.isOutRepo==0">{{scope.row.createTime | date}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="bulk.productNumber" label="货号" width="180"> </el-table-column>
              <el-table-column label="采购商" width="280" align="left">
                <template scope="scope"> <span class="icon" :class="scope.row.bulk.customerHasOpenedBaitiao ? 'icon-ximu-active' : 'icon-ximu-gray' "></span> <span class="icon mr5" :class="scope.row.bulk.customerHasOpenedYanzhen ? 'icon-yanzhen-active' : 'icon-yanzhen-gray'"></span> {{scope.row.bulk.customerCompany || '--'}} / {{scope.row.bulk.customerNumber || '--'}} </template>
              </el-table-column>
              <el-table-column label="供应商" width="150">
                <template scope="scope"> {{scope.row.bulk.shopCompany || '--'}} </template>
              </el-table-column>
              <el-table-column prop="num" label="色号匹号数量" width="150"> </el-table-column>
              <el-table-column label="总入仓实数/采购数量" width="180">
                <template scope="scope">
                  <p :class="{'green':scope.row.isOutRepo==0}"> {{scope.row.quantity}}{{scope.row.quantityUnit}}</p>
                </template>
              </el-table-column>
              <el-table-column label="支付时间" width="180">
                <template scope="scope">
                  <p v-if="scope.row.isOutRepo==1&&scope.row.bulk.type==3">{{scope.row.payTime | date}}</p>
                  <p v-else>--</p>
                </template>
              </el-table-column>
              <el-table-column label="支付方式" width="100">
                <template scope="scope">
                  <p v-if="scope.row.isOutRepo==1&&scope.row.bulk.type==3">{{scope.row.creditType | creditTypeFilter}}</p>
                  <p v-else>--</p>
                </template>
              </el-table-column>
              <el-table-column label="付款人" width="100">
                <template scope="scope">
                  <p v-if="scope.row.isOutRepo==1&&scope.row.bulk.type==3">{{scope.row.payer | payerFilter}}</p>
                  <p v-else>--</p>
                </template>
              </el-table-column>
              <el-table-column label="支付金额/总费用(元)" width="180">
                <template scope="scope"> <span class="money">{{scope.row.totalMoney | formatMoney}}</span> </template>
              </el-table-column>
              <el-table-column label="滞纳金(元)" width="120">
                <template scope="scope">
                  <span class="money"> {{scope.row.lateFeesMoney | formatMoney}}</span>
                </template>
              </el-table-column>
              <el-table-column label="订单类型" width="100">
                <template scope="scope"> 大货 </template>
              </el-table-column>
              <el-table-column label="采购员/跟单员" width="160" align="left">
                <template scope="scope">
                  {{scope.row.bulk.guiderName || '--' }} / {{scope.row.bulk.followerName || '--' }}
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-if="list.length&&params.type==2" class="table-wrap" :style="{ height : windowHeight - 300 + 'px' }">
            <el-table :data="list" border style="width: 100%" :height="windowHeight - 300">
              <el-table-column label="对账日期" width="180">
                <template scope="scope"> {{scope.row.reconciliationTime | date}} </template>
              </el-table-column>
              <el-table-column prop="billNumber" label="账单号" width="180"> </el-table-column>
              <el-table-column prop="number" label="订单号" width="205">
                <template scope="scope">
                  {{scope.row.number }}
                  <p v-if="scope.row.delayTime > 0" class="green"> {{scope.row.delayTime | date}}发货 </p>
                </template>
              </el-table-column>
              <el-table-column label="订单日期" width="180">
                <template scope="scope"> {{scope.row.createTime | date}} </template>
              </el-table-column>
              <el-table-column label="货号" width="180">
                <template scope="scope"> {{scope.row.productNumbersArray.join(',') }} </template>
              </el-table-column>
              <el-table-column label="采购商" width="250" align="left">
                <template scope="scope"> {{scope.row.customerCompany || '--'}} / {{scope.row.customerNumber || '--'}}</template>
              </el-table-column>
              <el-table-column label="供应商" width="150">
                <template scope="scope"> {{scope.row.shopCompany || '--'}} </template>
              </el-table-column>
              <el-table-column label="色号匹号数量" width="150">
                <template scope="scope"> {{scope.row.totalColor}}个色号 </template>
              </el-table-column>
              <el-table-column label="总入仓实数/采购数量" width="180">
                <template scope="scope"> {{scope.row.totalQuantity}} {{scope.row.totalQuantityUnit}} </template>
              </el-table-column>
              <el-table-column label="支付时间" width="180">
                <template scope="scope">
                  <p v-if="scope.row.guiderId&&scope.row.payTime">{{scope.row.payTime | date}} </p>
                  <p v-else>--</p>
                </template>
              </el-table-column>
              <el-table-column label="支付方式" width="100">
                <template scope="scope">
                  <p v-if="scope.row.guiderId">{{scope.row.creditType | cutCreditTypeFilter}} </p>
                  <p v-else>--</p>
                </template>
              </el-table-column>
              <el-table-column label="付款人" width="100">
                <template scope="scope">
                  <p v-if="scope.row.guiderId">采购支付 </p>
                  <p v-else>--</p>
                </template>
              </el-table-column>
              <el-table-column label="支付金额/总费用(元)" width="180">
                <template scope="scope"> <span class="money"> {{scope.row.totalMoney | formatMoney}}</span> </template>
              </el-table-column>
              <el-table-column label="滞纳金" width="100">
                <template scope="scope"> <span class="money"> {{scope.row.lateFeesMoney | formatMoney}}</span> </template>
              </el-table-column>
              <el-table-column prop="guiderName" label="采购员" width="200"> </el-table-column>
              <el-table-column prop="cutterName" label="剪版员" width="200"> </el-table-column>
              <el-table-column label="跟单员" width="200">
                <template scope="scope">
                  {{scope.row.followerName || '--'}}
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="empty" v-if="!list.length" :style="{ height : windowHeight - 300 + 'px' }"></div>
          <Page :total="total" :params="params" @toSearch="getList"></Page>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import hsMenu from '../menu.vue';
import search from '../search.vue';
import { getDebtList } from 'src/service/saler';
export default {
  components: {
    hsMenu,
    search
  },
  data() {
    return {
      params: {
        key: '',
        type: '1',
        _function: 'billed',
        createTimeBegin: '',
        createTimeEnd: '',
        pageSize: 10,
        pageNumber: 1,
      },
      list: [],
      total: 0,
    }
  },
  methods: {
    toDetail(item) {
      this.$router.push({ name: 'cardDetailOfdata', query: { id: item.orderNumber } })
    },
    handleList() {
      if (this.params.type != '2') return;
      this.list.forEach(item => {
        this.$set(item, 'productNumbersArray', []);
        this.$set(item, 'totalColor', 0);
        this.$set(item, 'totalQuantity', 0);
        this.$set(item, 'totalQuantityUnit', '');
        item.productNumbers.forEach(num => {
          item.productNumbersArray.push(num.number);
          item.totalColor += num.colors.length;
          num.colors.forEach(color => {
            item.totalQuantityUnit = color.followerQuantityUnit;
            item.totalQuantity += Number(color.followerQuantity);
          })
        })
      })
    },
    changeShow(item) {
      item.isShow = !item.isShow;
    },
    async getList() {
      this.list = [];
      this.$store.dispatch('changeload', true);
      let res = await getDebtList(this.params);
      this.$store.dispatch('changeload', false);
      if (res.success !== '1') return;
      this.list = res.page.result;
      this.total = res.page.totalCount;
      this.handleList();
    }
  },
  mounted() {
    this.getList();
  },
  filters: {
    cutCreditTypeFilter(value) {
      switch ('' + value) {
        case '1':
          return '垫付支付';
        case '3':
          return '余额支付';
        default:
          return '--';
      }
    },
    payerFilter(value) {
      switch ('' + value) {
        case '0':
          return '客户支付';
        case '1':
          return '采购支付';
        default:
          return '--';
      }
    },
    productNumbersFilter(value) {
      return value.map(item => item.number).join(' , ');
    },
    colorsFilter(value) {
      if (!value.length) return '';
      let sum = 0;
      value.forEach(item => { sum += Number(item.followerQuantity) })
      return sum.toFixed(2) + value[0].followerQuantityUnit;
    }
  }
}

</script>
<style>
.color-table {
  width: 60%;
}

</style>
