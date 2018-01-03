<template>
  <div>
    <pickMenu :count="count"></pickMenu>
    <div class="oms-content">
      <search :params="params" @toSearch="getList" @mutiSend='mutiSend'></search>
      <div class="main-wrap">
        <div class="main-content picker-content" :style="{ height : windowHeight - 330 + 'px' }">
          <div class="item" v-for="(item,index) in list" :key="index">
            <div class="title">
              <el-radio class="radio" @change.native="radioChange(item)" v-model="radioChecked" :label="item.customerId">
                {{item.customerCompany | customerCompanyFilter}}
              </el-radio>
              <span class="sign" v-if="item.customerCompany.indexOf('代采')!=-1">代采</span>
              <ul class="pick-count">
                <li v-if="item.countReceive">待收版（<i>{{item.countReceive}}</i>）</li>
                <li v-if="item.countSend">待发货（<i>{{item.countSend}}</i>）</li>
                <li v-if="item.countFinish">已发货（<i>{{item.countFinish}}</i>）</li>
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
                      <span :class="{ 'green' : orderItem.status == 1 || orderItem.status==2 }">{{orderItem.status | orderStatusFilter}}</span>
                    </td>
                    <!-- 销售备注 -->
                    <td class="ta-l">{{orderItem.salesRemark}}</td>
                    <!-- 快递图片 -->
                    <td>
                      <div class="image" v-if="orderItem.sendCredentialUrls&&orderItem.sendCredentialUrls.length"> <a :href="'http://www.soouya.com' + imageItem" :key="imageIndex" v-lightbox="allSendCredentialUrls" v-for="(imageItem,imageIndex) in orderItem.sendCredentialUrls"> <img width="50" height="50" :src="'http://www.soouya.com' + imageItem"/> </a> </div>
                      <template v-else>
                        --
                      </template>
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
                    <td class="ta-l">
                      <el-button class="table-btn" @click.native="receive(orderItem)" v-if="orderItem.status == 1">确认收货</el-button>
                      <el-button class="table-btn" @click.native="send(orderItem)" v-if="orderItem.status == 2">确认发货</el-button>
                      <el-button class="table-btn" @click.native="updateSendExpress(orderItem.id, orderItem.sendExpress)" v-if="orderItem.status == 3">修改快递单号</el-button>
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
      <sendDlg :sendVisible='sendVisible' :idList='sendIdList' @cancel='sendCancel' @submit='sendSubmit'></sendDlg>
      <receiveDlg :receiveVisible='receiveVisible' :idList='receiveIdList' @cancel='receiveCancel' @submit='receiveSubmit'></receiveDlg>
    </div>
  </div>
</template>
<script>
import Lightbox from 'components/lightbox/lightbox'
import pickMenu from '../menu.vue';
import search from '../search.vue';
import sendDlg from '../dialogs/sendDlg.vue';
import receiveDlg from '../dialogs/receiveDlg.vue';
import { getOrderList, updateSendExpress } from 'src/service/picker';
export default {
  components: {
    pickMenu,
    Lightbox,
    search,
    sendDlg,
    receiveDlg
  },
  data() {
    return {
      sendVisible: false,
      receiveVisible: false,
      radioChecked: '',
      count: [],
      list: [],
      sendIdList: [],
      receiveIdList: [],
      params: {
        status: '',
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
    let timeEnd = new Date().toLocaleString().split(' ')
    this.params.createTimeEnd = new Date(timeEnd[0] + ' 23:59:59')
    this.params.createTimeBegin = new Date(+new Date(timeEnd[0]) - 1000 * 60 * 60 * 24 * 29)
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
    mutiSend() {
      let checkedList = [];
      this.list.forEach(item => {
        item.orderList.forEach(orderItem => {
          if (orderItem.checked) {
            checkedList.push(orderItem);
          }
        })
      })
      let ids = checkedList.filter(item => item.status == 2).map(item => item.id);
      if (ids && !ids.length) {
        this.$message.error('请选择待发货的订单');
        return false
      }
      this.sendAction(ids);
    },
    async updateSendExpress(id, sendExpress) {
      let options = {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: sendExpress || '',
        inputValidator: function(value) {
          return !!value;
        },
        inputErrorMessage: '不能为空'
      };
      try {
        let dlgRes = await this.$prompt('快递单号', '提示', options);
        if (dlgRes.action === 'confirm') {
          let res = await updateSendExpress({ id: id, sendExpress: dlgRes.value });
          if (res.success != '1') return;
          this.$message.success(res.msg);
          this.getList();
        };
      } catch (e) {
        console.log(e);
      }
    },
    send(item) {
      this.sendAction([item.id]);
    },
    sendAction(idList) {
      this.sendIdList = idList;
      this.sendVisible = true;
    },
    sendCancel() {
      this.sendVisible = false;
    },
    sendSubmit() {
      this.sendVisible = false;
      this.getList();
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
      this.$store.dispatch('changeload', false);
      this.list.forEach(item => {
        this.$set(item, 'checkedAll', false);
        this.$set(item, 'countReceive', 0);
        this.$set(item, 'countSend', 0);
        this.$set(item, 'countFinish', 0);
        item.orderList.forEach(orderItem => {
          this.$set(orderItem, 'checked', false);
          switch (orderItem.status) {
            case 1:
              item.countReceive++;
              break;
            case 2:
              item.countSend++;
              break;
            case 3:
              item.countFinish++;
              break;
            default:
              break;
          }
        })
      })
    }
  },
  filters: {
    customerCompanyFilter(value = '') {
      return value.replace('（代采）', '') || '';
    },
    orderStatusFilter(status) {
      switch (status) {
        case 1:
          return '待收版';
        case 2:
          return '待发货';
        case 3:
          return '已发货';
        case 101:
          return '待通知找版';
        case 103:
          return '待指派组长';
        case 105:
          return '待分配任务';
        case 111:
          return '待录入色卡信息';
        case 115:
          return '待提交审核';
        case 121:
          return '待审核';
        case 500:
          return '待录入剪版信息';
        case 501:
          return '待通知提货';
        case 502:
          return '待提货';
        default:
          return '';
      }
    }
  }
}

</script>
<style>


</style>
