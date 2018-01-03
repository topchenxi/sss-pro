<template>
  <div>
    <hsMenu></hsMenu>
    <div class="oms-content">
      <search :params='params' @toSearch="getList"></search>
      <div class="main-wrap">
        <div class="main-content">
          <div class="table-wrap" v-if="list.length" :style="{ height : windowHeight - 300 + 'px' }">
            <table class="table">
              <colgroup>
                <!-- 账单日期 -->
                <col width="10%">
                <!-- 账单号 -->
                <col width="10%">
                <!-- 采购商 -->
                <col width="20%">
                <!-- 总订单金额(元) -->
                <col width="9%">
                <!-- 总滞纳金(元) -->
                <col width="9%">
                <!-- 总实际付款金额(元) -->
                <col width="9%">
                <!-- 付款凭据 -->
                <col width="20%"> </colgroup>
              <thead>
                <tr>
                  <th>账单日期</th>
                  <th>账单号</th>
                  <th>采购商</th>
                  <th>总订单金额(元)</th>
                  <th>总滞纳金(元)</th>
                  <th>总实际付款金额(元)</th>
                  <th>付款凭据</th>
                  <th>操作</th>
                </tr>
              </thead>
              <!-- 大货 -->
              <tbody>
                <tr v-for="(item,index) in list" :key="index">
                  <!-- 账单日期 -->
                  <td>{{item.createTime | date}}</td>
                  <!-- 账单号 -->
                  <td>{{item.number}}</td>
                  <!-- 采购商 -->
                  <td class="ta-l"> <span class="icon" :class="item.customerHasOpenedBaitiao ? 'icon-ximu-active' : 'icon-ximu-gray' "></span> <span class="icon mr5" :class="item.customerHasOpenedYanzhen ? 'icon-yanzhen-active' : 'icon-yanzhen-gray'"></span> {{item.customerCompany || '--'}} / {{item.customerNumber || '--'}} </td>
                  <!-- 总订单金额(元) -->
                  <td class="ta-r"><span class="money">{{item.totalMoney | formatMoney}}</span></td>
                  <!-- 总滞纳金(元) -->
                  <td class="ta-r"><span class="money">{{item.lateFeesMoney | formatMoney}}</span></td>
                  <!-- 总实际付款金额(元) -->
                  <td class="ta-r"><span class="money">{{item.payMoney | formatMoney}}</span></td>
                  <!-- 付款凭据 -->
                  <td class="ta-l">
                    <div class="image" v-if="item.payCredentialUrls&&item.payCredentialUrls.length"> <a :data="'pic'+index" class="m3" :href="'http://www.soouya.com' + imageItem" :key="imageIndex" v-lightbox="allSendCredentialUrls" v-for="(imageItem,imageIndex) in item.payCredentialUrls"> <img width="50" height="50" :src="'http://www.soouya.com' + imageItem"/> </a> </div>
                  </td>
                  <!-- 操作 -->
                  <td>
                    <el-button class="table-btn" type="primary" @click="toDetail(item.id)">查看明细</el-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="empty" v-if="!list.length" :style="{ height : windowHeight - 300 + 'px' }"></div>
          <Page :total="total" :params="params" @toSearch="getList"></Page>
          <Lightbox></Lightbox>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import hsMenu from '../menu.vue';
import search from '../search.vue';
import Lightbox from 'components/lightbox/lightbox'
import { getDebtListOfSubmit } from 'src/service/saler';
export default {
  components: {
    hsMenu,
    search,
    Lightbox
  },
  data() {
    return {
      params: {
        key: '',
        status: 0,
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
    toDetail(id) {
      this.$router.push({ name: 'debtOfBillDetail', query: { id } })
    },
    async getList() {
      this.$store.dispatch('changeload', true);
      let res = await getDebtListOfSubmit(this.params);
      this.$store.dispatch('changeload', false);
      if (res.success !== '1') return;
      this.list = res.page.result;
      this.total = res.page.totalCount;
    }
  },
  mounted() {
    this.getList();
  }
}

</script>
<style scoped>
.m3 {
  margin: 3px;
  display: inline-block;
}

</style>
