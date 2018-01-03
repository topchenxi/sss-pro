<template>
  <div>
    <hsMenu></hsMenu>
    <div class="oms-content">
      <hsSearch :params="params" @toSearch="getList"></hsSearch>
      <div class="main-wrap">
        <div class="main-content">
          <div class="table-wrap" v-if="list.length" :style="{ height : windowHeight - 300 + 'px' }">
            <table class="table">
              <colgroup>
                <!-- 订单号 -->
                <col width="13%">
                <!-- 退换货申请时间 -->
                <col width="11%">
                <!-- 退换货取消时间 -->
                <col width="11%">
                <!-- 采购商 -->
                <col width="12%">
                <!-- 供应商 -->
                <col width="12%">
                <!-- 退换货类型 -->
                <col width="7%">
                <!-- 取消人 -->
                <col width="7%">
                <!-- 取消原因 -->
              </colgroup>
              <thead>
                <tr>
                  <th>订单号</th>
                  <th>退换货申请时间</th>
                  <th>退换货取消时间</th>
                  <th>采购商</th>
                  <th>供应商</th>
                  <th>退换货类型</th>
                  <th>取消人</th>
                  <th>取消原因</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in list" :key="index">
                  <!-- 订单号 -->
                  <td>{{item.serviceNumber}}</td>
                  <!-- 退换货申请时间 -->
                  <td>{{item.createTime | date}}</td>
                  <!-- 退换货取消时间 -->
                  <td>
                    <p v-if="!item.cancelTime">--</p>
                    <p v-else>{{item.cancelTime | date}}</p>
                  </td>
                  <!-- 采购商 -->
                  <td>{{item.customerCompany}}</td>
                  <!-- 供应商 -->
                  <td>{{item.shopCompany}}</td>
                  <!-- 退换货类型 -->
                  <td>{{item.type | typeFilter}}</td>
                  <!-- 取消人 -->
                  <td>{{item.cancelUserName || '--'}}</td>
                  <!-- 取消原因 -->
                  <td>{{item.cancelReason}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="empty" v-if="!list.length" :style="{ height : windowHeight - 300 + 'px' }"></div>
          <Page :total="total" :params="params" @toSearch="getList"></Page>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import hsMenu from '../menu';
import hsSearch from '../search';
import { getListOfRRCancel } from 'src/service/merchandiser';
export default {
  components: {
    hsMenu,
    hsSearch
  },
  data() {
    return {
      list: [],
      total: 0,
      params: {
        'keyword': '',
        'type': '',
        'pageNumber': 1,
        'pageSize': 10,
      }
    }
  },
  mounted() {
    this.getList();
  },
  filters: {
    typeFilter(vaule) {
      switch ('' + vaule) {
        case '1':
          return '售前退货';
        case '2':
          return '售前换货';
        case '3':
          return '售后退货';
        case '4':
          return '售后换货';
        default:
          return '';
      }
    }
  },
  methods: {
    async getList() {
      this.$store.dispatch('changeload', true);
      let res = await getListOfRRCancel(this.params);
      this.$store.dispatch('changeload', false);
      if (res.success !== '1') return;
      this.list = res.page.result;
      this.total = res.page.totalCount;
    }
  }
}

</script>
