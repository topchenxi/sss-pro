<template>
  <section>
    <div class="oms-content">
      <div class="search-content">
        <div class="row">
          <div class="item">
            <el-select v-model="params.type" placeholder="请选择" @change="search">
              <el-option :key="0" :value="''" label="全部退换类型"></el-option>
              <el-option :key="1" :value="1" label="售前退货"></el-option>
              <el-option :key="2" :value="2" label="售前换货"></el-option>
            </el-select>
          </div>
          <div class="item w360">
            <el-input v-model="params.keyword" @keyup.enter.native="search" placeholder="订单号/采购商/供应商"></el-input>
          </div>
          <el-button @click.native="search" type="primary">搜索</el-button>
        </div>
      </div>
      <div class="main-wrap">
        <div class="main-content style-1" :style="{height:windowHeight-275+'px'}">
          <div class="item" v-for="(item,index) in list" :key="index">
            <h5>订单号 : {{item.serviceNumber}}</h5>
            <div class="info-wrap">
              <dl>
                <dt>采购商 :</dt>
                <dd>{{item.customerCompany}} / {{item.customerNumber}}</dd>
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
                <dd>{{item.orderCreateTime | formatTime}}</dd>
              </dl>
              <dl>
                <dt>销售员 :</dt>
                <dd>{{item.salesName}}</dd>
              </dl>
              <dl>
                <dt>采购员 :</dt>
                <dd>{{item.guiderName}}</dd>
              </dl>
            </div>
            <div class="table-wrap">
              <table class="table">
                <colgroup>
                  <col width="9%">
                  <col width="9%">
                  <col width="9%">
                  <col width="9%">
                  <col width="9%">
                  <col width="9%">
                  <col width="9%">
                  <col width="9%">
                  <col width="9%">
                </colgroup>
                <thead>
                  <tr>
                    <th>退换货单号</th>
                    <th>退换货申请时间</th>
                    <th>入仓单号</th>
                    <th>出仓单号</th>
                    <th>退换货数量</th>
                    <th>现采购数量</th>
                    <th>款项类型</th>
                    <th>当前退换货退补款金额</th>
                    <th>退换货类型</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(tableItem,tableIndex) in item.list" :key="tableIndex">
                    <!-- 退换货单号 -->
                    <td>{{tableItem.number}}</td>
                    <!-- 退换货申请时间 -->
                    <td>{{tableItem.createTime | formatTime}}</td>
                    <!-- 入仓单号 -->
                    <td>{{tableItem.inReposityNumber}}</td>
                    <!-- 出仓单号 -->
                    <td>{{tableItem.outReposityNumber}}</td>
                    <!-- 退换货数量 -->
                    <td>
                      {{tableItem.quantity | formatMoney}}{{tableItem.quantityUnit}}/{{tableItem.clothLoneListSize}}匹
                    </td>
                    <!-- 现采购数量 -->
                    <td>
                      <template v-if="tableItem.type == 1">
                        --
                      </template>
                      <template v-else>
                        {{tableItem.needBuyQuantity | formatMoney}}{{tableItem.needBuyQuantityUnit}}
                      </template>
                    </td>
                    <!-- 款项类型 -->
                    <td>
                      <template v-if="tableItem.moneyType == 1">
                        供应商退款
                      </template>
                      <template v-if="tableItem.moneyType == 2">
                        搜芽补款
                      </template>
                    </td>
                    <!-- 当前退换货退补款金额 -->
                    <td>
                      <template v-if="tableItem.moneyType == 1">
                        <span class="red">￥{{tableItem.money | formatMoney}}</span> (退)
                      </template>
                      <template v-if="tableItem.moneyType == 2">
                        <span class="red">￥{{tableItem.money | formatMoney}}</span> (补)
                      </template>
                    </td>
                    <!-- 退换货类型 -->
                    <td>
                      <template v-if="tableItem.type == 1">
                        <span>售前退货</span>
                      </template>
                      <template v-if="tableItem.type ==2">
                        <span>售前换货</span>
                      </template>
                    </td>
                    <!-- 操作 -->
                    <td class="op ta-l">
                      <router-link :to="{name: 'guiderEditRefundOrder', query: {id: tableItem.id}}">
                        <el-button class="table-btn">编辑</el-button>
                      </router-link>
                      <router-link :to="{name: 'guiderRrRefundDetail', query: {id: tableItem.id, status: 1}}">
                        <el-button class="table-btn">详情</el-button>
                      </router-link>
                      <template v-if="tableItem.exceptReson">
                        <el-tooltip :content="tableItem.exceptReson">
                          <span class="reason">查看异常原因</span>
                        </el-tooltip>
                      </template>
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
  </section>
</template>
<script>
import { rrRefundList } from 'src/service/guider'
export default {
  data() {
    return {
      list: [],
      total: 0,
      params: {
        status: 5,
        keyword: '',
        type: '',
        pageNumber: 1,
        pageSize: 10,
      }
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      this.$store.dispatch('changeload', true);
      let res = await rrRefundList(this.params);
      if (res.success !== '1') return;
      this.list = res.page.result;
      this.total = res.page.totalCount;
      this.$store.dispatch('changeload', false);
    },
    search() {
      this.getList()
    }
  }
}

</script>
