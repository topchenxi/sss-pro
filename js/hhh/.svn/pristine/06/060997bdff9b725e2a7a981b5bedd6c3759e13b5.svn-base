<template>
  <div>
    <hsMenu></hsMenu>
    <div class="oms-content">
      <hsSearch :params="params" @toSearch="getList"></hsSearch>
      <div class="main-wrap">
        <div class="main-content style-1" :style="{height:windowHeight-290+'px'}">
          <div class="item" v-for="(item,index) in list" :key="index">
            <h5>订单号 : {{item.serviceNumber}}</h5>
            <div class="info-wrap">
              <dl>
                <dt>采购商 :</dt>
                <dd>{{item.customerCompany}}</dd>
              </dl>
              <dl>
                <dt>供应商 :</dt>
                <dd>{{item.shopCompany}}</dd>
              </dl>
              <dl>
                <dt>订单总金额 :</dt>
                <dd class="red">￥{{item.saleMoney | formatMoney}}</dd>
              </dl>
              <dl>
                <dt>订单发布时间 :</dt>
                <dd>{{item.orderCreateTime | date}}</dd>
              </dl>
              <dl>
                <dt>跟单员 :</dt>
                <dd>{{item.followerName}}</dd>
              </dl>
              <dl>
                <dt>买货员 :</dt>
                <dd>{{item.purchaserName}}</dd>
              </dl>
            </div>
            <div class="table-wrap">
              <table class="table">
                <colgroup>
                  <!-- 退换货单号 -->
                  <col width="12%">
                  <!-- 退换货申请时间 -->
                  <col width="11%">
                  <!-- 出仓单号 -->
                  <col width="10%">
                  <!-- 退换货审核时间 -->
                  <col width="11%">
                  <!-- 搜芽退款时间 -->
                  <col width="11%">
                  <!-- 退换货总原数 -->
                  <col width="10%">
                  <!-- 退换货总实数 -->
                  <col width="10%">
                  <!-- 原销售货款值(元) -->
                  <col width="10%">
                  <!-- 退换货类型 -->
                  <col width="7%">
                  <!-- 操作 -->
                </colgroup>
                <thead>
                  <tr>
                    <th>退换货单号</th>
                    <th>退换货申请时间</th>
                    <th>出仓单号</th>
                    <th>退换货审核时间</th>
                    <th>搜芽退款时间</th>
                    <th>退换货总原数</th>
                    <th>退换货总实数</th>
                    <th>原销售货款值(元)</th>
                    <th>退换货类型</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(tableItem,tableIndex) in item.list" :key="tableIndex">
                    <!-- 退换货单号 -->
                    <td>{{tableItem.number}}</td>
                    <!-- 退换货申请时间 -->
                    <td>{{tableItem.createTime | date}}</td>
                    <!-- 出仓单号 -->
                    <td>{{tableItem.outReposityNumber}}</td>
                    <!-- 退换货审核时间 -->
                    <td>{{tableItem.purcahserReviewTime | date}}</td>
                    <!-- 搜芽退款时间 -->
                    <td>{{tableItem.refundReviewTime | date}}</td>
                    <!-- 退换货总原数 -->
                    <td>{{tableItem.quantity}}{{tableItem.quantityUnit}}/{{tableItem.count}}匹</td>
                    <!-- 退换货总实数 -->
                    <td>{{tableItem.realQuantity}}{{tableItem.realQuantityUnit}}/{{tableItem.count}}匹</td>
                    <!-- 原销售货款值 -->
                    <td class="money">{{tableItem.soouyaPayToBuyer | formatMoney}}</td>
                    <!-- 退换货类型 -->
                    <td>{{tableItem.type | typeFilter}}</td>
                    <!-- 操作 -->
                    <td>
                      <router-link :to="{name: 'loanSoouyaRefundDetail', query:{id: tableItem.id}}">
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
import { getSoouyaRefundList } from 'src/service/merchandiser';
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
        'status': 7,
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
      let res = await getSoouyaRefundList(this.params);
      this.$store.dispatch('changeload', false);
      if (res.success !== '1') return;
      this.list = res.page.result;
      this.total = res.page.totalCount;
    }
  }
}

</script>
