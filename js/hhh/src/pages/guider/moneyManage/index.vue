<template>
  <div class="oms-content">
    <div class="search-content mt20">
      <div class="row">
        <div class="item w360">
          <el-input v-model="params.key" placeholder="采购商名称,采购商ID"></el-input>
        </div>
        <button class="btn" @click="search">搜索</button>
        <button class="btn" @click="params.key=''">重置</button>
        <button class="btn" @click="toExprot()">本月账单</button>
      </div>
    </div>
    <div class="main-wrap">
      <div class="main-content style-1" :style="{ height : windowHeight - 200 + 'px' }">
        <div class="table-wrap mt0" v-if="list.length">
          <table class="table">
            <colgroup>
              <col width="10%">
              <col width="25%">
              <col width="10%">
              <col width="13%">
              <col width="12%">
              <col width="10%">
            </colgroup>
            <thead>
              <tr>
                <th>采购商ID</th>
                <th>采购商名称</th>
                <th>可用余额/元</th>
                <th>可用白条额度/元</th>
                <th>可用垫付额度/元</th>
                <th>可用信贷额度/元</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in list" :key="index">
                <!-- 采购商ID -->
                <td>{{item.number}}</td>
                <!-- 采购商名称 -->
                <td style="text-align: left;padding-left:40px">
                  <span class="icon" :class="item.hasOpenedBaitiao ? 'icon-ximu-active' : 'icon-ximu-gray' "></span>
                  <span class="icon" :class="item.hasOpenedYanzhen ? 'icon-yanzhen-active' : 'icon-yanzhen-gray'"></span> {{item.company}}
                </td>
                <!-- 可用余额 -->
                <td>{{Number(item.availableBalance) | formatMoney}}</td>
                <!-- 可用白条额度 -->
                <td>{{item.baitiaoRemainLine | formatMoney}}</td>
                <!-- 可用垫付额度 -->
                <td>{{item.remainLine | formatMoney}}</td>
                <!-- 可用信贷额度 -->
                <td>{{item.yanzhenRemainLine | formatMoney}}</td>
                <td>
                  <router-link :to="{ name: 'moneyManageDetail', query: { id: item.id } }">
                    <el-button class="table-btn">详情</el-button>
                  </router-link>
                  <el-button class="table-btn" @click.native="toExprot(item.id)">本月账单</el-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="empty" v-if="!list.length"></div>
      </div>
      <Page :total="total" :params="params" @toSearch="getList"></Page>
    </div>
  </div>
</template>
<script>
import { getFundList, reportFund } from 'src/service/guider';
export default {
  data() {
    return {
      params: {
        key: '',
        pageNumber: 1,
        pageSize: 10
      },
      total: 0,
      list: []
    }
  },
  methods: {
    search() {
      this.params.pageNumber = 1;
      this.getList();
    },
    async getList() {
      let res = await getFundList(this.params);
      if (res.success !== '1') return;
      this.$store.dispatch('changeload', false);
      this.list = res.page.result;
      this.total = res.page.totalCount;
    },
    async toExprot(customerId) {
      let params = {};
      customerId && (params.customerId = customerId);
      this.$store.dispatch('changeload', true);
      let res = await reportFund(params);
      if (res.success !== '1') return;
      this.$store.dispatch('changeload', false);
      window.open(res.obj);
    },
  },
  mounted() {
    this.getList();
  },
  filters: {
    formatMoney(val) {
      return Number(val) > 0 ? val.toFixed(2) : '--'
    }
  }
}

</script>
