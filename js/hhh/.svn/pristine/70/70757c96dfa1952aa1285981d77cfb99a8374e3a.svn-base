<template>
  <div>
    <div class="hs-oms">
      <ul>
        <li @click="to('1')" :class="{'current' : params.tag == '1'}"> <strong>等待出仓</strong> </li>
        <li @click="to('2')" :class="{'current' : params.tag == '2'}">
          <div class="item"> <strong>等待客户确认收货</strong> </div>
        </li>
        <li @click="to('3')" :class="{'current' : params.tag == '3'}">
          <div class="item"> <strong>客户已收货</strong> </div>
        </li>
      </ul>
    </div>
    <div class="oms-content">
      <div class="search-content mt20">
        <div class="row">
          <div class="item w400">
            <el-input placeholder="订单号/采购商/供应商" v-model="params.keyword"> </el-input>
          </div>
          <button class="btn" @click="search">搜索</button>
          <button class="btn" @click="reset">重置</button>
        </div>
      </div>
      <div class="main-wrap">
        <div class="main-content">
          <div class="table-wrap" :style="{ height : windowHeight - 280 + 'px' }">
            <table class="table" v-if="params.tag == '1'">
              <colgroup>
                <!-- 入仓单号 -->
                <col width="7%">
                <!-- 订单号 -->
                <col width="10%">
                <!-- 入仓时间 -->
                <col width="9%">
                <!-- 出仓货款 -->
                <col width="6%">
                <!-- 采购商 -->
                <col width="14%">
                <!-- 供应商 -->
                <col width="8%">
                <!-- 品类 -->
                <col width="4%">
                <!-- 验货 -->
                <col width="4%">
                <!-- 配送方式 -->
                <col width="6%">
                <!-- 待发货数量 -->
                <col width="9%">
                <!-- 当前状态 -->
                <col width="7%">
                <!-- 操作 -->
              </colgroup>
              <thead>
                <tr>
                  <th>入仓单号</th>
                  <th>订单号</th>
                  <th>入仓时间</th>
                  <th>出仓货款(元)</th>
                  <th>采购商</th>
                  <th>供应商</th>
                  <th>品类</th>
                  <th>验货</th>
                  <th>配送方式</th>
                  <th>待发货数量</th>
                  <th>当前状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in list" :key="index">
                  <!-- 入仓单号 -->
                  <td>{{item.reposityNumber}}</td>
                  <!-- 订单号 -->
                  <td>{{item.serviceNumber}}</td>
                  <!-- 入仓时间 -->
                  <td>{{item.reposityTime | date}}</td>
                  <!-- 出仓货款 -->
                  <td class="money ta-r">{{item.total | formatMoney}}</td>
                  <!-- 采购商 -->
                  <td class="ta-l">{{item.buyerCompany}}</td>
                  <!-- 供应商 -->
                  <td>{{item.sellerCompany}}</td>
                  <!-- 品类 -->
                  <td>{{item.productType | productTypeFilter}} </td>
                  <!-- 验货 -->
                  <td>{{item.checkCloth | checkClothFilter}} </td>
                  <!-- 配送方式 -->
                  <td>{{item.sendType | sendTypeFilter}} </td>
                  <!-- 待发货数量 -->
                  <td class="ta-r"> {{item.clothLoneList | clothLoneFilter}} </td>
                  <!-- 当前状态 -->
                  <td>{{item.checkCloth | statusFilter}} </td>
                  <!-- 操作 -->
                  <td class="ta-l">
                    <router-link :to="{name: 'orderDetail', query: { id: item.reposityNumber, pathIndex: 2, orderNumber: item.orderNumber, status: 0}}">
                      <el-button class="table-btn">详情</el-button>
                    </router-link>
                    <el-button class="table-btn" @click.native="sendgood(item)">通知出仓</el-button>
                    <!-- (item.clothLoneStatus == 3115 && item.checkCloth == 0) -->
                    <template v-if="item.checkCloth == '1'">
                      <router-link :to="{name: 'beforeApplyRrOrder', query: {id: item.reposityId} }">
                        <el-button class="table-btn">申请退换货</el-button>
                      </router-link>
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="table" v-if="params.tag == '2'">
              <colgroup>
                <!-- 出仓单号 -->
                <col width="8%">
                <!-- 订单号 -->
                <col width="12%">
                <!-- 通知发货时间 -->
                <col width="11%">
                <!-- 出仓货款 -->
                <col width="8%">
                <!-- 采购商 -->
                <col width="15%">
                <!-- 供应商 -->
                <col width="8%">
                <!-- 品类 -->
                <col width="5%">
                <!-- 验货 -->
                <col width="5%">
                <!-- 配送方式 -->
                <col width="6%">
                <!-- 通知出仓实数 -->
                <col width="8%">
                <!-- 操作 -->
              </colgroup>
              <thead>
                <tr>
                  <th>出仓单号</th>
                  <th>订单号</th>
                  <th>通知发货时间</th>
                  <th>出仓货款(元)</th>
                  <th>采购商</th>
                  <th>供应商</th>
                  <th>品类</th>
                  <th>验货</th>
                  <th>配送方式</th>
                  <th>通知出仓实数</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in list" :key="index">
                  <!-- 出仓单号 -->
                  <td>{{item.reposityNumber}}</td>
                  <!-- 订单号 -->
                  <td>{{item.serviceNumber}}</td>
                  <!-- 通知发货时间 -->
                  <td>{{item.notifySendTime | date}}</td>
                  <!-- 出仓货款 -->
                  <td class="money ta-r">{{item.total}}</td>
                  <!-- 采购商 -->
                  <td class="ta-l">{{item.buyerCompany}}</td>
                  <!-- 供应商 -->
                  <td>{{item.sellerCompany}}</td>
                  <!-- 品类 -->
                  <td>{{item.productType | productTypeFilter}} </td>
                  <!-- 验货 -->
                  <td>{{item.checkCloth | checkClothFilter}} </td>
                  <!-- 配送方式 -->
                  <td>{{item.sendType | sendTypeFilter}} </td>
                  <!-- 通知出仓实数 -->
                  <td>{{item.clothLoneList | clothLoneFilter}}</td>
                  <!-- 操作 -->
                  <td>
                    <el-button v-if="item.clothLoneStatus == '3883'" class="o-btn" size="small" type="primary" @click.native="confirmGood(item)">确认收货</el-button>
                    <router-link :to="{name: 'orderDetail', query: { id: item.reposityNumber, pathIndex: 2, orderNumber: item.orderNumber, status: 1 }}">
                      <el-button class="table-btn">详情</el-button>
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="table" v-if="params.tag == '3'">
              <colgroup>
                <!-- 出仓单号 -->
                <col width="8%">
                <!-- 订单号 -->
                <col width="11%">
                <!-- 出仓时间 -->
                <col width="10%">
                <!-- 确认收货时间 -->
                <col width="10%">
                <!-- 出仓货款(元) -->
                <col width="6%">
                <!-- 采购商 -->
                <col width="10%">
                <!-- 供应商 -->
                <col width="10%">
                <!-- 品类 -->
                <col width="4%">
                <!-- 验货 -->
                <col width="4%">
                <!-- 配送方式 -->
                <col width="6%">
                <!-- 已出仓实数 -->
                <col width="8%">
                <!-- 操作 -->
              </colgroup>
              <thead>
                <tr>
                  <th>出仓单号</th>
                  <th>订单号</th>
                  <th>出仓时间</th>
                  <th>确认收货时间</th>
                  <th>出仓货款(元)</th>
                  <th>采购商</th>
                  <th>供应商</th>
                  <th>品类</th>
                  <th>验货</th>
                  <th>配送方式</th>
                  <th>已出仓实数</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in list" :key="index">
                  <!-- 出仓单号 -->
                  <td>{{item.reposityNumber}}</td>
                  <!-- 订单号 -->
                  <td>{{item.serviceNumber}}</td>
                  <!-- 出仓时间 -->
                  <td>{{item.reposityTime | date}}</td>
                  <!-- 确认收货时间 -->
                  <td>{{item.confirmReceiveTime | date}}</td>
                  <!-- 出仓货款(元) -->
                  <td class="money ta-r">{{item.total | formatMoney}}</td>
                  <!-- 采购商 -->
                  <td class="ta-l">{{item.buyerCompany}}</td>
                  <!-- 供应商 -->
                  <td>{{item.sellerCompany}}</td>
                  <!-- 品类 -->
                  <td>{{item.productType | productTypeFilter}} </td>
                  <!-- 验货 -->
                  <td>{{item.checkCloth | checkClothFilter}} </td>
                  <!-- 配送方式 -->
                  <td>{{item.sendType | sendTypeFilter}} </td>
                  <!-- 已出仓实数 -->
                  <td class="ta-r"> {{item.clothLoneList | clothLoneFilter}} </td>
                  <!-- 操作 -->
                  <td class="ta-l">
                    <router-link :to="{name: 'orderDetail', query: { id: item.reposityNumber, pathIndex: 2, orderNumber: item.orderNumber, status: 1 }}">
                      <el-button class="table-btn">详情</el-button>
                    </router-link>
                    <template v-if="item.rereconciliated && ((currentTime - item.reposityTime)/(1000 * 60 * 60 * 24)) < 60">
                      <router-link :to="{name: 'afterApplyRrOrder', query: {id: item.reposityId}}">
                        <el-button class="table-btn">申请退换货</el-button>
                      </router-link>
                    </template>
                    <template v-if="!item.rereconciliated">
                      <el-tooltip class="item" effect="dark" content="出仓单未对账，不能售后退换货" placement="top">
                        <p class="font-reason">申请退换货</p>
                      </el-tooltip>
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="empty" v-if="!list.length"></div>
          </div>
          <Page :total="total" :params="params" @toSearch="getList"></Page>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getListForSend } from 'src/service/merchandiser';
export default {
  data() {
    return {
      list: [],
      total: 0,
      params: {
        // 1 通知出仓
        // 2 等待客户确认收货
        // 3 客户已收货
        'tag': '1',
        'keyword': '',
        'pageNumber': 1,
        'pageSize': 10
      }
    }
  },
  methods: {
    to(type) {
      if (this.params.tag == type) return;
      sessionStorage.deliverTag = type;
      Object.assign(this.params, {
        'tag': type,
        'pageNumber': 1,
        'pageSize': 10
      });
      this.list = [];
      this.getList();
    },
    async getList() {
      this.$store.dispatch('changeload', true);
      let res = await getListForSend(this.params);
      this.$store.dispatch('changeload', false);
      if (res.success !== '1' || !res.page) return;
      this.list = res.page.result;
      this.total = res.page.totalCount;
    },
    search() {
      this.params.pageNumber = 1;
      this.getList();
    },
    reset() {
      Object.assign(this.params, {
        'keyword': '',
        'pageNumber': 1,
        'pageSize': 10
      });
      this.search();
    }
  },
  mounted() {
    this.params.tag = sessionStorage.deliverTag || '1';
    this.getList();
  },
  filters: {
    productTypeFilter(value) {
      switch (value) {
        case 1:
          return '面料';
        case 2:
          return '辅料';
        default:
          return '';
      }
    },
    checkClothFilter(value) {
      switch (value) {
        case 0:
          return '不验货';
        case 1:
          return '验货';
        default:
          return '';
      }
    },
    sendTypeFilter(value) {
      switch (value) {
        case 0:
          return '搜芽配送';
        case 1:
          return '采购商自提';
        default:
          return '';
      }
    },
    statusFilter(value) {
      switch (value) {
        case 0:
          return '等待确认发货';
        case 1:
          return '等待验布抉择';
        default:
          return '';
      }
    },
    clothLoneFilter(array) {
      if (!array.length || !Array.isArray(array)) return '';
      let sum = 0;
      array.forEach(item => {
        sum += Number(item.quantity);
      })
      return sum.toFixed(2) + array[0].quantityUnit + '/' + array.length + '匹';
    }
  }
}

</script>
