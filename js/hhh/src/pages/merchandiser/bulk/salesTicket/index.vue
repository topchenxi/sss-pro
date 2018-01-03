<template>
  <div>
    <div class="oms-content">
      <div class="search-content mt20">
        <div class="row">
          <div class="item w400">
            <el-input placeholder="订单号/采购商" v-model="params.keyword"> </el-input>
          </div>
          <button class="btn" @click="search">搜索</button>
          <button class="btn" @click="reset">重置</button>
          <button class="btn search-submit" @click="print" :disabled="isDisabledPrint">打印销售单</button>
        </div>
      </div>
      <div class="main-wrap">
        <div class="main-content">
          <div class="table-wrap" v-if="list.length" :style="{ height : windowHeight - 210 + 'px' }">
            <table class="table">
              <colgroup>
                <!-- 选择 -->
                <col width="3%">
                <!-- 订单号 -->
                <col width="12%">
                <!-- 发布时间 -->
                <col width="11%">
                <!-- 订单总金额(元) -->
                <col width="8%">
                <!-- 供应商 -->
                <col width="12%">
                <!-- 订单类型 -->
                <col width="5%">
                <!-- 实版 -->
                <col width="5%">
                <!-- 货号 -->
                <col width="10%">
                <!-- 色号 -->
                <col width="15%">
                <!-- 订货数量 -->
                <col width="8%">
                <!-- 税点 -->
                <col width="4%">
                <!-- 订单状态 -->
              </colgroup>
              <thead>
                <tr>
                  <th>
                    <el-checkbox v-model="checkedAll" @change="changeAll"></el-checkbox>
                  </th>
                  <th>订单号</th>
                  <th>发布时间</th>
                  <th>订单总金额(元)</th>
                  <th>供应商</th>
                  <th>订单类型</th>
                  <th>有无实版</th>
                  <th>货号</th>
                  <th>色号</th>
                  <th>订货数量</th>
                  <th>税点</th>
                  <th>订单状态</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in list" :key="index">
                  <!-- 选择 -->
                  <td>
                    <el-checkbox v-model="item.checked"></el-checkbox>
                  </td>
                  <!-- 订单号 -->
                  <td>{{item.serviceNumber}}</td>
                  <!-- 发布时间 -->
                  <td>{{item.createTime | date}}</td>
                  <!-- 订单总金额 -->
                  <td class="ta-r money">{{item.saleMoney | formatMoney}}</td>
                  <!-- 供应商 -->
                  <td class="ta-l">{{item.sellerCompany}}</td>
                  <!-- 订单类型 -->
                  <td>
                    <p v-if="item.type == '1'">服务单</p>
                    <p v-if="item.type == '2'">贸易单</p>
                  </td>
                  <!-- 有无实版 -->
                  <td>
                    <p v-if="item.haveRealVersion == '1'">有</p>
                    <p v-if="item.haveRealVersion == '0'">无</p>
                  </td>
                  <!-- 货号 -->
                  <td>{{item.productNumber}}</td>
                  <!-- 色号 -->
                  <td>{{item.provideColorList | colorFilter}}</td>
                  <!-- 订货数量 -->
                  <td class="ta-r">{{item.provideColorList | quantityFilter}}</td>
                  <!-- 税点 -->
                  <td>{{item.taxPoint}}</td>
                  <!-- 订单状态 -->
                  <td>{{item.statusDesc}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="empty" v-if="!list.length" :style="{ height : windowHeight - 210 + 'px' }"></div>
          <Page :total="total" :params="params" @toSearch="getList"></Page>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getSaleTicketList } from 'src/service/merchandiser';
export default {
  data() {
    return {
      checkedAll: false,
      list: [],
      total: 0,
      params: {
        'keyword': '',
        'pageNumber': 1,
        'pageSize': 10
      }
    }
  },
  mounted() {
    this.getList();
  },
  filters: {
    colorFilter(array) {
      if (!Array.isArray(array) || !array.length) return '';
      return array.map(item => item.color).join(',');
    },
    quantityFilter(array) {
      if (!Array.isArray(array) || !array.length) return '';
      let sum = 0;
      array.map(item => {
        sum += Number(item.quantity);
      })
      return sum.toFixed(2) + array[0].quantityUnit
    }
  },
  computed: {
    isDisabledPrint() {
      return !this.list.filter(item => item.checked).length;
    }
  },
  methods: {
    changeAll() {
      this.list.forEach(item => {
        item.checked = this.checkedAll;
      })
    },
    print() {
      let selectItems = [];
      this.list.forEach(item => {
        if (item.checked) {
          selectItems.push(item);
        }
      })
      if (!selectItems.length) {
        this.$message.error('请先选择打印的订单');
        return;
      }
      sessionStorage.forPrintOrderList = JSON.stringify(selectItems);
      this.$router.push({ name: 'printSalesOrder' })
    },
    async getList() {
      const params = {
        param: JSON.stringify(this.params)
      };
      this.$store.dispatch('changeload', true);
      let res = await getSaleTicketList(params);
      this.$store.dispatch('changeload', false);
      if (res.success !== '1') return;
      this.list = res.page.result;
      this.total = res.page.totalCount;
      this.checkedAll = false;
      this.list.forEach(item => {
        this.$set(item, 'checked', false);
      })
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
  }
}

</script>
