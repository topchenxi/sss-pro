<template>
  <div>
    <hsMenu></hsMenu>
    <div class="oms-content">
      <search :params='params' @toSearch="getList"></search>
      <div class="main-wrap">
        <div class="main-content">
          <div class="table-wrap" :style="{ height : windowHeight - 300 + 'px' }">
            <table class="table">
              <colgroup>
                <!-- 订单号 -->
                <col width="12%">
                <!-- 操作时间 -->
                <col width="7%">
                <!-- 采购商 -->
                <col width="18%">
                <!-- 区域 -->
                <col width="7%">
                <!-- 品类 -->
                <col width="4%">
                <!-- 成分/织法/工艺 -->
                <col width="12%">
                <!-- 换卡头 -->
                <col width="4%">
                <!-- 样板 -->
                <col width="4%">
                <!-- 是否收版 -->
                <col width="4%">
                <!-- 销售员 -->
                <col width="10%">
                <!-- 找版员 -->
                <col width="10%">
                <!-- 操作 -->
              </colgroup>
              <thead>
                <tr>
                  <th>订单号</th>
                  <th>操作时间</th>
                  <th>采购商</th>
                  <th>区域</th>
                  <th>品类</th>
                  <th>成分/织法/工艺</th>
                  <th>换卡头</th>
                  <th>样板</th>
                  <th>是否收版</th>
                  <th>销售员</th>
                  <th>找版员</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in list" :key="index">
                  <!-- 订单号 -->
                  <td>{{item.serviceNumber}}</td>
                  <!-- 操作时间 -->
                  <td>
                    <p>{{item.changeTime | date('yyyy-MM-dd')}}</p>
                    <p>{{item.changeTime | date('hh:mm:ss')}}</p>
                  </td>
                  <!-- 采购商 -->
                  <td class="ta-l">
                    <p v-if="item.customerCompany">
                      <span class="sign" v-if="item.customerCompany.indexOf('代采') != -1">代采</span>
                      <span> {{item.customerCompany.replace('（代采）','')}}</span>
                    </p>
                  </td>
                  <!-- 区域 -->
                  <td>{{item.addressProvince}}{{item.addressCity}}</td>
                  <!-- 品类 -->
                  <td>{{item.productType | productTypeFilter}}</td>
                  <!-- 成分/织法/工艺 -->
                  <td>{{item.title || '--' }}</td>
                  <!-- 换卡头 -->
                  <td>{{item.changeCard | changeCardFilter}}</td>
                  <!-- 样板 -->
                  <td>{{item.haveRealVersion | haveRealVersionFilter}}</td>
                  <!-- 是否收版 -->
                  <td>
                    <p v-if="item.haveRealVersion ">{{item.hasReceive | hasReceiveFilter}}</p>
                    <p v-else>--</p>
                  </td>
                  <!-- 销售员 -->
                  <td>{{item.salesName}}</td>
                  <!-- 找版员 -->
                  <td>{{item.clothHunterName}}</td>
                  <td class="ta-c">
                    <el-button class="table-btn" @click.native="toDetail(item)">详情</el-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Page :total="total" :params="params" @toSearch="getList"></Page>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import hsMenu from '../menu.vue';
import search from '../search.vue';
import { getCardList } from 'src/service/dataer';
export default {
  components: {
    hsMenu,
    search
  },
  data() {
    return {
      params: {
        keyword1: '',
        hasChangeCard: 1,
        changeCard: 1,
        pageSize: 10,
        pageNumber: 1,
      },
      list: [],
      total: 0,
    }
  },
  methods: {
    toDetail(item) {
      this.$router.push({ name: 'cardDetailOfdata', query: { id: item.orderNumber, canEdit: true } })
    },
    async getList() {
      this.$store.dispatch('changeload', true);
      let res = await getCardList(this.params);
      if (res.success !== '1') return;
      this.$store.dispatch('changeload', false);
      this.list = res.page.result;
      this.total = res.page.totalCount;
    }
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
    changeCardFilter(value) {
      switch (value) {
        case 1:
          return '是';
        default:
          return '否';
      }
    },
    haveRealVersionFilter(value) {
      switch (value) {
        case 1:
          return '有实版';
        default:
          return '无实版';
      }
    },
    hasReceiveFilter(value) {
      switch (value) {
        case 1:
          return '已收到';
        default:
          return '未收到';
      }
    }
  },
  mounted() {
    this.getList();
  }
}

</script>
