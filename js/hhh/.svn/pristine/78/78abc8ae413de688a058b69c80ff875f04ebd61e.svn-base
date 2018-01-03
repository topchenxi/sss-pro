<template>
  <div>
    <pickMenu :count="count"></pickMenu>
    <div class="oms-content">
      <search :params="params" @toSearch="getList" @mutiReceive='mutiReceive'></search>
      <div class="main-wrap">
        <div class="main-content picker-content" :style="{ height : windowHeight - 330 + 'px' }">
          <div class="item" v-for="(item,index) in list" :key="index">
            <div class="title">
              <el-radio class="radio" @change.native="radioChange(item)" v-model="radioChecked" :label="item.customerId">
                {{item.customerCompany | customerCompanyFilter}}
              </el-radio>
              <span class="sign" v-if="item.customerCompany.indexOf('代采')">代采</span>
              <ul class="pick-count">
                <li>待收版（<i>{{item.orderList.length}}</i>）</li>
              </ul>
            </div>
            <div class="picker-table">
              <table class="table">
                <colgroup>
                  <col width="50">
                  <!-- 订单编号 -->
                  <col width="8%">
                  <!-- 采购商 -->
                  <col width="9%">
                  <!-- 订单时间 -->
                  <col width="7%">
                  <!-- 收货人信息 -->
                  <col width="15%">
                  <!-- 销售员 -->
                  <col width="5%">
                  <!-- 剪版员/找版员 -->
                  <col width="5%">
                  <!-- 订单类型 -->
                  <col width="5%">
                  <!-- 订单状态 -->
                  <col width="5%">
                  <!-- 销售备注 -->
                  <col width="20%">
                  <!-- 快递图片 -->
                  <col width="5%">
                  <!-- 快递单号 -->
                  <col width="6%">
                  <!-- 操作 -->
                </colgroup>
                <thead>
                  <tr>
                    <th>
                      <el-checkbox v-model="item.checkedAll" @change.native="checkAll(item)"></el-checkbox>
                    </th>
                    <th>订单编号</th>
                    <th>采购商</th>
                    <th>订单时间</th>
                    <th>收货人信息</th>
                    <th>销售员</th>
                    <th>剪版员
                      <br>找版员</th>
                    <th>订单类型</th>
                    <th>订单状态</th>
                    <th>销售备注</th>
                    <th>快递图片</th>
                    <th>快递单号</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(orderItem,orderIndex) in item.orderList" :key="orderIndex" :class="{'checked' : orderItem.checked}">
                    <!--  -->
                    <td>
                      <el-checkbox v-model="orderItem.checked" @change.native="checkOrder(orderItem,item)"></el-checkbox>
                    </td>
                    <!-- 订单编号 -->
                    <td>
                      {{orderItem.serviceNumber}}
                      <span v-if="orderItem.delayTime > 0" class="red"> {{orderItem.delayTime | date}}发货 </span>
                    </td>
                    <!-- 采购商 -->
                    <td class="ta-l">{{item.customerCompany}}</td>
                    <!-- 订单时间 -->
                    <td>
                      <p>{{orderItem.createTime | date('yyyy-MM-dd')}}</p>
                      <p>{{orderItem.createTime | date('hh:mm:ss')}}</p>
                    </td>
                    <!-- 收货人信息 -->
                    <td class="ta-l">
                      <p>{{orderItem.addressName}} {{orderItem.addressTel}}</p>
                      <p>{{orderItem.addressProvince}}{{orderItem.addressCity}}{{orderItem.addressArea}}{{orderItem.addressAddr}}</p>
                    </td>
                    <!-- 销售员 -->
                    <td>{{orderItem.salesName}}</td>
                    <!-- 剪版员/找版员 -->
                    <td>{{orderItem.userName}}</td>
                    <!-- 订单状态 -->
                    <td>
                      <span v-if="orderItem.category == 'zb-zy'">找版</span>
                      <span v-if="orderItem.category == 'jb-zy'">剪版</span>
                    </td>
                    <!-- 订单状态 -->
                    <td>
                      <span v-if="orderItem.status == '1'" class="green">待收版</span>
                    </td>
                    <!-- 销售备注 -->
                    <td class="ta-l">{{orderItem.salesRemark}}</td>
                    <!-- 快递图片 -->
                    <td>
                      <div class="image" v-if="orderItem.sendCredentialUrls&&orderItem.sendCredentialUrls.length"> <a :href="'http://www.soouya.com' + imageItem" :key="imageIndex" v-lightbox="allSendCredentialUrls" v-for="(imageItem,imageIndex) in orderItem.sendCredentialUrls"> <img width="50" height="50" :src="'http://www.soouya.com' + imageItem"/> </a> </div>
                      <div v-else>
                        --
                      </div>
                    </td>
                    <!-- 快递单号 -->
                    <td>
                      <template v-if="orderItem.status<3">
                        --
                      </template>
                      <template v-else>
                        {{orderItem.sendExpress}}
                      </template>
                    </td>
                    <!-- 操作 -->
                    <td>
                      <el-button class="table-btn" @click.native="receive(orderItem)">确认收货</el-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Page :total="total" :params="params" @toSearch="getList"></Page>
      </div>
      <lightbox :group="true"></lightbox>
      <receiveDlg :receiveVisible='receiveVisible' :idList='receiveIdList' @cancel='receiveCancel' @submit='receiveSubmit'></receiveDlg>
    </div>
  </div>
</template>
<script>
import Lightbox from 'components/lightbox/lightbox'
import pickMenu from '../menu.vue';
import search from '../search.vue';
import receiveDlg from '../dialogs/receiveDlg.vue';
import { getOrderList } from 'src/service/picker';
export default {
  components: {
    pickMenu,
    Lightbox,
    search,
    receiveDlg
  },
  data() {
    return {
      receiveVisible: false,
      radioChecked: '',
      count: [],
      list: [],
      receiveIdList: [],
      params: {
        status: 1,
        category: '',
        keyword: '',
        createTimeBegin: '',
        createTimeEnd: '',
        pageNumber: 1,
        pageSize: 10
      },
      total: 0
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    radioChange(checkItem) {
      this.list.forEach(item => {
        item.checkedAll = checkItem.customerId == item.customerId ? checkItem.checkedAll : false;
        item.orderList.forEach(orderItem => {
          orderItem.checked = checkItem.customerId == item.customerId ? checkItem.checkedAll : false;
        })
      })
    },
    checkAll(checkItem) {
      this.radioChecked = checkItem.customerId;
      this.list.forEach(item => {
        item.checkedAll = checkItem.customerId == item.customerId ? checkItem.checkedAll : false;
        item.orderList.forEach(orderItem => {
          orderItem.checked = checkItem.customerId == item.customerId ? checkItem.checkedAll : false;
        })
      })
    },
    checkOrder(checkOrderItem, checkItem) {
      this.radioChecked = checkItem.customerId;
      this.list.forEach(item => {
        item.checkedAll = checkItem.customerId == item.customerId ? checkItem.checkedAll : false;
        item.orderList.forEach(orderItem => {
          orderItem.checked = checkItem.customerId == item.customerId ? orderItem.checked : false;
        })
      })
    },
    mutiReceive() {
      let checkedList = [];
      this.list.forEach(item => {
        item.orderList.forEach(orderItem => {
          if (orderItem.checked) {
            checkedList.push(orderItem);
          }
        })
      })
      let ids = checkedList.filter(item => item.status == 1).map(item => item.id);
      if (ids && !ids.length) {
        this.$message.error('请选择待收版的订单');
        return false
      }
      this.receiveAction(ids);
    },
    receive(item) {
      this.receiveAction([item.id]);
    },
    receiveAction(idList) {
      this.receiveIdList = idList;
      this.receiveVisible = true;
    },
    receiveCancel() {
      this.receiveVisible = false;
    },
    receiveSubmit() {
      this.receiveVisible = false;
      this.getList();
    },
    search() {
      this.params.pageNumber = 1
      this.getList();
    },
    async getList() {
      this.$store.dispatch('changeload', true);
      let params = Object.assign({}, this.params);
      params.createTimeBegin = new Date(params.createTimeBegin).getTime() || '';
      params.createTimeEnd = new Date(params.createTimeEnd).getTime() || '';
      let res = await getOrderList(params);
      if (res.success !== '1') return;
      this.count = res.count;
      this.list = res.page.result;
      this.total = res.page.totalCount;
      this.list.forEach(item => {
        this.$set(item, 'checkedAll', false);
        item.orderList.forEach(orderItem => {
          this.$set(orderItem, 'checked', false);
        })
      })
      this.$store.dispatch('changeload', false);
    }
  },
  filters: {
    customerCompanyFilter(value = '') {
      return value.replace('（代采）', '') || '';
    }
  }
}

</script>
<style>


</style>
