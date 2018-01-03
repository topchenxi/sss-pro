<template>
  <div v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="加载中,请耐心等候">
    <div class="oms-title-wrap">
      <h2>资金管理</h2>
      <div class="right">
        <div class="btn-add" @click="toExprot()">
          <span class="icon-bill"></span> 本月账单
        </div>
      </div>
    </div>
    <div class="containter">
      <div class="search-wrap mt20">
        <div class="item">
          <el-input class="w300" v-model="params.key" placeholder="采购商名称,供应商ID"></el-input>
        </div>
        <el-button class="btn-search" @click.native="search">搜索</el-button>
      </div>
      <div class="table-wrap">
        <div class="table-content" :style="{ height : windowHeight - 320 + 'px'}">
          <table class="table">
            <colgroup>
              <col width="13%">
              <col width="25%">
              <col width="13%">
              <col width="13%">
              <col width="13%">
              <col width="13%">
            </colgroup>
            <thead>
              <tr>
                <th>采购商ID</th>
                <th>采购商名称</th>
                <th>可用余额/元</th>
                <th>可用白条额度/元</th>
                <th>可用雁阵额度/元</th>
                <th>可用垫付额度/元</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in list" :key="index">
                <!-- 采购商ID -->
                <td class="ta-l">{{item.number}}</td>
                <!-- 采购商名称 -->
                <td class="ta-l">
                  <span title="已开通徙木" v-if="item.hasOpenedBaitiao==1" class="icon icon-ximu-active"></span>
                  <span title="未开通徙木" v-else class="icon icon-ximu-gray"></span>
                  <span title="已开通雁阵" v-if="item.hasOpenedYanzhen==1" class="icon icon-yanzhen-active"></span>
                  <span title="未开通雁阵" v-else class="icon icon-yanzhen-gray"></span> {{item.company}}
                </td>
                <!-- 可用余额 -->
                <td class="ta-r">{{Number(item.availableBalance) | formatMoney}}</td>
                <!-- 可用白条额度 -->
                <td class="ta-r">{{item.baitiaoRemainLine | formatMoney}}</td>
                <!-- 可用雁阵额度 -->
                <td class="ta-r">{{item.yanzhenRemainLine | formatMoney}}</td>
                <!-- 可用垫付额度 -->
                <td class="ta-r">{{item.remainLine | formatMoney}}</td>
                <td>
                  <span class="icon icon-download" @click="toExprot(item.id)"></span>
                  <span class="green pointer" @click="toExprot(item.id)">本月账单</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Page :total="total" :params="params" @toSearch="getList"></Page>
      </div>
    </div>
  </div>
</template>
<script>
import { getFundList, exportFundList } from 'common/service';
export default {
  data() {
    return {
      fullscreenLoading: false,
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
    async toExprot(customerId) {
      let params = {};
      if (customerId) {
        params.customerId = customerId;
      }
      this.fullscreenLoading = true;
      const res = await exportFundList(params);
      this.fullscreenLoading = false;
      if (res.success === '1') {
        window.open(res.obj);
      }
    },
    async getList() {
      this.fullscreenLoading = true;
      const res = await getFundList(this.params);
      this.fullscreenLoading = false;
      if (res.success === '1') {
        this.list = res.page.result;
        this.total = res.page.totalCount;
      }
    }
  },
  mounted() {
    this.getList();
  }
}

</script>
