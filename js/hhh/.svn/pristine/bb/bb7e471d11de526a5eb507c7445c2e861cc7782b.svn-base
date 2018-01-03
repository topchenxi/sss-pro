<template>
  <div>
    <hsMenu></hsMenu>
    <div class="oms-content">
      <hsSearch :params="params" @toSearch="getList"></hsSearch>
      <div class="main-wrap">
        <div class="main-content style-1" :style="{height:windowHeight-290+'px'}">
          <div class="item" v-for="(item,index) in list" :key="index">
            <h5>订单号 : {{item.order.serviceNumber}}</h5>
            <div class="info-wrap">
              <dl>
                <dt>采购商 :</dt>
                <dd>{{item.order.customerCompany}}</dd>
              </dl>
              <dl>
                <dt>供应商 :</dt>
                <dd>{{item.order.shopCompany}}</dd>
              </dl>
              <dl>
                <dt>订单总金额 :</dt>
                <dd class="red">￥{{item.order.saleMoney | formatMoney}}</dd>
              </dl>
              <dl>
                <dt>订单发布时间 :</dt>
                <dd>{{item.order.createTime | date}}</dd>
              </dl>
              <dl>
                <dt>跟单员 :</dt>
                <dd>{{item.order.followerName}}</dd>
              </dl>
              <dl>
                <dt>买货员 :</dt>
                <dd>{{item.order.purchaserName}}</dd>
              </dl>
            </div>
            <div class="table-wrap">
              <table class="table">
                <colgroup>
                  <!-- 退换货单号 -->
                  <col width="11%">
                  <!-- 退换货申请时间 -->
                  <col width="11%">
                  <!-- 入仓单号 -->
                  <col width="10%">
                  <!-- 出仓单号 -->
                  <col width="10%">
                  <!-- 退换货审核时间 -->
                  <col width="11%">
                  <!-- 退换货数量 -->
                  <col width="7%">
                  <!-- 现采购数量 -->
                  <col width="7%">
                  <!-- 退换货类型 -->
                  <col width="7%">
                  <!-- 当前状态 -->
                  <col width="16%">
                  <!-- 操作 -->
                </colgroup>
                <thead>
                  <tr>
                    <th>退换货单号</th>
                    <th>退换货申请时间</th>
                    <th>入仓单号</th>
                    <th>出仓单号</th>
                    <th>退换货审核时间</th>
                    <th>退换货数量</th>
                    <th>现采购数量</th>
                    <th>退换货类型</th>
                    <th>当前状态</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(tableItem,tableIndex) in item.list" :key="tableIndex">
                    <!-- 退换货单号 -->
                    <td>{{tableItem.number}}</td>
                    <!-- 退换货申请时间 -->
                    <td>{{tableItem.createTime | date}}</td>
                    <!-- 入仓单号 -->
                    <td>{{tableItem.inReposityNumber || '--'}}</td>
                    <!-- 出仓单号 -->
                    <td>{{tableItem.outReposityNumber || '--'}}</td>
                    <!-- 退换货审核时间 -->
                    <td>{{tableItem.purcahserReviewTime | date}}</td>
                    <!-- 退换货数量 -->
                    <td>{{tableItem.quantity}}{{tableItem.quantityUnit}}</td>
                    <!-- 现采购数量 -->
                    <td>
                      <p v-if="tableItem.type == 1 || tableItem.type == 3"> -- </p>
                      <p v-else> {{tableItem.needBuyQuantity}}{{tableItem.needBuyQuantityUnit}} </p>
                    </td>
                    <!-- 退换货类型 -->
                    <td>{{tableItem.type | typeFilter}}</td>
                    <!-- 当前状态 -->
                    <td>{{tableItem.statusDescr}}</td>
                    <!-- 操作 -->
                    <td>
                      <router-link :to="{name: 'bulkRRHadAuditDetail', query:{id: tableItem.id}}">
                        <el-button class="table-btn">详情</el-button>
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="empty" v-if="!list.length"></div>
        </div>
        <Page :total="total" :params="params" @toSearch="getList"></Page>
      </div>
    </div>
  </div>
</template>
<script>
import hsMenu from '../menu';
import hsSearch from '../search';
import { getListOfRRHadAudit } from 'src/service/merchandiser';
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
      let res = await getListOfRRHadAudit(this.params);
      this.$store.dispatch('changeload', false);
      if (res.success !== '1') return;
      this.list = res.page.result;
      this.total = res.page.totalCount;
    }
  }
}

</script>
