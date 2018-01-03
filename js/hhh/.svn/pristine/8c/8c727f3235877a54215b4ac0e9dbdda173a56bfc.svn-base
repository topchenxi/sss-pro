<template>
  <div class="oms-content">
    <el-dialog title="选择订单" v-model="orderFlag" :before-close="close" size="large">
      <div class="search-content p0 m0">
        <div class="row">
          <div class="item w400">
            <el-input placeholder="请输入供应商，订单号，出仓单号，采购员，剪版员" v-model="params.key"> </el-input>
          </div>
          <div class="item">
            <el-select v-model="params.type" placeholder="订单类型">
              <el-option label="大货" value="1"></el-option>
              <el-option label="剪版" value="2"></el-option>
            </el-select>
          </div>
          <template v-if="params.type==1">
            <div class="item">
              <el-date-picker v-model="params['bulk.createTimeBegin']" type="datetime" placeholder="开始时间"></el-date-picker>
            </div>
            <div class="item">
              <el-date-picker v-model="params['bulk.createTimeEnd']" type="datetime" placeholder="结束时间"></el-date-picker>
            </div>
          </template>
          <template v-if="params.type==2 || currentRuoteName == 'debtOfSubmit'">
            <div class="item">
              <el-date-picker v-model="params.createTimeBegin" type="datetime" placeholder="开始时间"></el-date-picker>
            </div>
            <div class="item">
              <el-date-picker v-model="params.createTimeEnd" type="datetime" placeholder="结束时间"></el-date-picker>
            </div>
          </template>
          <button class="btn" @click="search">搜索</button>
        </div>
      </div>
      <div class="main-wrap pl0 m0 bsn">
        <div class="main-content">
          <div class="clearfix p20 pt0 pl0">
            <el-button type="warning" icon="plus" @click.native="addToBill">加入账单</el-button>
          </div>
          <div class="table-wrap bulk-wrap" v-if="list.length&&params.type==1" :style="{ height : 400 + 'px' }">
            <table class="table">
              <colgroup>
                <!-- 选择 -->
                <col width="2%">
                <!-- 出仓单号 -->
                <col width="6%">
                <!-- 订单号/扣数单号 -->
                <col width="8%">
                <!-- 订单日期/扣数单日期 -->
                <col width="7%">
                <!-- 货号 -->
                <col width="8%">
                <!-- 采购商 -->
                <col width="10%">
                <!-- 供应商 -->
                <!-- 色号匹号数量 -->
                <!-- 总入仓实数/采购数量 -->
                <!-- 支付时间 -->
                <!-- 支付方式 -->
                <!-- 付款人 -->
                <!-- 支付金额/总费用 -->
                <!-- 滞纳金 -->
              </colgroup>
              <thead>
                <tr>
                  <th>
                    <el-checkbox v-model="checkAll" @change="checkAllChange"></el-checkbox>
                  </th>
                  <th>出仓单号</th>
                  <th>订单号/扣数单号</th>
                  <th>订单日期/扣数单日期</th>
                  <th>货号</th>
                  <th>采购商</th>
                  <th>供应商</th>
                  <th>色号匹号数量</th>
                  <th>总入仓实数/采购数量</th>
                  <th>支付时间</th>
                  <th>支付方式</th>
                  <th>付款人</th>
                  <th>支付金额/总费用(元)</th>
                  <th>滞纳金(元)</th>
                  <th>采购员/跟单员</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in list" :key="index" :class="{'checked' : item.checked , 'disabled' : item.hasSelected}">
                  <!-- 选择 -->
                  <td>
                    <el-checkbox v-model="item.checked" :disabled="item.hasSelected"></el-checkbox>
                  </td>
                  <!-- 出仓单号 -->
                  <td>{{item.number}}
                    <el-tooltip v-if="item.billCancelRemark" effect="dark" :content="item.billCancelRemark" placement="top">
                      <span class="icon-callback"></span>
                    </el-tooltip>
                  </td>
                  <!-- 订单号/扣数单号 -->
                  <td>
                    <p :class="{'green':item.isOutRepo==0}">{{item.bulk.number}}</p>
                  </td>
                  <!-- 订单日期/扣数单日期 -->
                  <td>
                    <p v-if="item.isOutRepo==1">{{item.bulk.createTime | date}}</p>
                    <p v-if="item.isOutRepo==0">{{item.createTime | date}}</p>
                  </td>
                  <!-- 货号 -->
                  <td>{{item.bulk.productNumber}}</td>
                  <!-- 采购商 -->
                  <td class="ta-l">
                    <span class="icon" :class="item.bulk.customerHasOpenedBaitiao ? 'icon-ximu-active' : 'icon-ximu-gray' "></span>
                    <span class="icon mr5" :class="item.bulk.customerHasOpenedYanzhen ? 'icon-yanzhen-active' : 'icon-yanzhen-gray'"></span> {{item.bulk.customerCompany || '--'}} / {{item.bulk.customerNumber || '--'}}
                  </td>
                  <!-- 供应商 -->
                  <td>{{item.bulk.shopCompany || '--'}}</td>
                  <!-- 色号匹号数量 -->
                  <td>{{item.num}}</td>
                  <!-- 总入仓实数/采购数量 -->
                  <td>
                    <p :class="{'green':item.isOutRepo==0}">{{item.quantity}}{{item.quantityUnit}}</p>
                  </td>
                  <!-- 支付时间 -->
                  <td>
                    <p v-if="item.isOutRepo==1&&item.bulk.type==3">{{item.payTime | date}}</p>
                    <p v-else>--</p>
                  </td>
                  <!-- 支付方式 -->
                  <td>
                    <p v-if="item.isOutRepo==1&&item.bulk.type==3">{{item.creditType | creditTypeFilter}}</p>
                    <p v-else>--</p>
                  </td>
                  <!-- 付款人 -->
                  <td>
                    <p v-if="item.isOutRepo==1&&item.bulk.type==3">{{item.payer | payerFilter}}</p>
                    <p v-else>--</p>
                  </td>
                  <!-- 支付金额/总费用 -->
                  <td><span class="money">{{item.totalMoney | formatMoney}}</span></td>
                  <!-- 滞纳金 -->
                  <td><span class="money">{{item.lateFeesMoney | formatMoney}}</span></td>
                  <td> {{item.bulk.guiderName || '--' }} / {{item.bulk.followerName || '--' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="table-wrap" v-if="list.length&&params.type==2" :style="{ height : 400 + 'px' }">
            <table class="table">
              <colgroup>
                <!-- 全选 -->
                <col width="40">
                <!-- 订单号/扣数单号 -->
                <col width="9%">
                <!-- 订单日期/扣数单日期 -->
                <col width="9%">
                <!-- 货号 -->
                <col width="9%">
                <!-- 采购商 -->
                <col width="10%">
                <!-- 供应商 -->
                <col width="4%">
                <!-- 支付时间 -->
                <col width="10%">
                <!-- 支付方式 -->
                <col width="8%">
                <!-- 付款人 -->
                <col width="6%">
                <!-- 支付金额/总费用 -->
                <col width="9%">
                <!-- 滞纳金(元) -->
                <col width="6%">
              </colgroup>
              <thead>
                <tr>
                  <th>
                    <el-checkbox v-model="checkAll" @change="checkAllChange"></el-checkbox>
                  </th>
                  <th>订单号</th>
                  <th>订单日期</th>
                  <th>货号</th>
                  <th>采购商</th>
                  <th>供应商</th>
                  <th>支付时间</th>
                  <th>支付方式</th>
                  <th>付款人</th>
                  <th>支付金额/总费用(元)</th>
                  <th>滞纳金(元)</th>
                  <th>剪版员</th>
                  <th>跟单员</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(item,index) in list">
                  <tr :class="{'checked' : item.checked , 'disabled' : item.hasSelected}">
                    <!-- 选择 -->
                    <td>
                      <el-checkbox v-model="item.checked" :disabled="item.hasSelected"></el-checkbox>
                    </td>
                    <!-- 订单号/扣数单号 -->
                    <td>
                      {{item.number}}
                      <el-tooltip v-if="item.billCancelRemark" effect="dark" :content="item.billCancelRemark" placement="top">
                        <span class="icon-callback"></span>
                      </el-tooltip>
                      <p v-if="item.delayTime > 0" class="green"> {{item.delayTime | date}}发货 </p>
                    </td>
                    <!-- 订单日期/扣数单日期 -->
                    <td>{{item.createTime | date}}</td>
                    <!-- 货号 -->
                    <td>
                      <div class="number-wrap" @click="changeShow(item)">
                        {{item.productNumbers | productNumbersFilter}}
                        <i class="el-icon-arrow-up" v-if="item.isShow"></i>
                        <i class="el-icon-arrow-down" v-if="!item.isShow"></i>
                      </div>
                    </td>
                    <!-- 采购商 -->
                    <td>{{item.customerCompany}}/{{item.customerNumber}}</td>
                    <!-- 供应商 -->
                    <td>{{item.shopCompany}}</td>
                    <td>
                      <p v-if="item.guiderId">{{item.payTime | date}} </p>
                      <p v-else>--</p>
                    </td>
                    <!-- 支付方式 -->
                    <td>
                      <p v-if="item.guiderId">{{item.creditType | cutCreditTypeFilter}} </p>
                      <p v-else>--</p>
                    </td>
                    <!-- 付款人 -->
                    <td>
                      <p v-if="item.guiderId">采购支付</p>
                      <p v-else>--</p>
                    </td>
                    <!-- 支付金额/总费用 -->
                    <td>
                      <span class="money">{{item.saleMoney | formatMoney}}</span>
                    </td>
                    <!-- 滞纳金 -->
                    <td><span class="money">{{item.lateFeesMoney | formatMoney}}</span></td>
                    <!-- 剪版员 -->
                    <td>{{item.cutterName || '--'}}</td>
                    <td>{{item.followerName || '--'}}</td>
                  </tr>
                  <tr class="number-bg" v-if="item.isShow">
                    <td colspan="3">
                      <p>采购商：{{item.customerCompany}}/{{item.customerNumber}}</p>
                      <p>供应商：{{item.shopCompany}}</p>
                      <p>支付总费用：<span class="money">{{item.totalMoney | formatMoney}}</span> 元</p>
                    </td>
                    <td colspan="10">
                      <table class="color-table">
                        <colgroup>
                          <col width="33%">
                          <col width="33%">
                          <col width="33%">
                        </colgroup>
                        <thead>
                          <tr>
                            <th>货号</th>
                            <th>色号匹号数量</th>
                            <th>总入仓实数/采购数量</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(numItem,numIndex) in item.productNumbers">
                            <td>{{numItem.number}}</td>
                            <td>{{numItem.colors.length}}个色号</td>
                            <td>{{numItem.colors | colorsFilter}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
          <Page :total="total" :params="params" @toSearch="getList"></Page>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getDebtList } from 'src/service/saler';
export default {
  props: {
    orderFlag: false,
    customerId: '',
    hadSelectList: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      checkAll: false,
      params: {
        'key': '',
        'type': '1',
        '_function': 'toBill',
        'bulk.customerId': '',
        'customerId': '',
        'createTimeBegin': '',
        'createTimeEnd': '',
        'bulk.createTimeBegin': '',
        'bulk.createTimeEnd': '',
        'pageSize': 10,
        'pageNumber': 1,
      },
      total: 0,
      list: [],
      multipleSelection: []
    }
  },
  mounted() {
    this.getList();
    // console.log(this.hadSelectList);
  },
  watch: {
    'params.type' () {
      this.search();
    }
  },
  methods: {
    checkAllChange() {
      this.list.forEach(item => {
        if (!item.hasSelected) {
          item.checked = this.checkAll
        }
      })
    },
    close() {
      this.$emit('closeOrder');
    },
    search() {
      this.params.pageNumber = 1;
      this.getList();
    },
    addToBill() {
      let selectItems = [];
      this.list.forEach(item => {
        if (item.checked) {
          selectItems.push(item);
        }
      })
      if (!selectItems.length) {
        this.$message.error('请先选择订单');
        return;
      }
      this.$emit('changeOrder', {
        'type': this.params.type,
        'items': selectItems
      })
    },
    handleList() {
      let bulkIds = this.hadSelectList.bulk.map(item => item.id).join(',');
      let cutIds = this.hadSelectList.cut.map(item => item.id).join(',');
      this.list.forEach(item => {
        this.$set(item, 'checked', false);
        this.$set(item, 'hasSelected', false);
        if (this.params.type == 1 && bulkIds) {
          item.hasSelected = bulkIds.indexOf(item.id) != -1;
        }
        if (this.params.type == 2) {
          this.$set(item, 'isShow', false);
          if (cutIds) {
            console.log(cutIds, item.id, cutIds.indexOf(item.id));
            item.hasSelected = cutIds.indexOf(item.id) != -1;
          }
        }
      })
    },
    changeShow(item) {
      item.isShow = !item.isShow;
    },
    async getList() {
      this.checkAll = false;
      this.list = [];
      this.params['bulk.customerId'] = this.params.type == 1 ? this.customerId : '';
      this.params['customerId'] = this.params.type == 2 ? this.customerId : '';
      let res = await getDebtList(this.params);
      if (res.success !== '1') return;
      this.list = res.page.result;
      this.total = res.page.totalCount;
      this.handleList();
    }
  },
  filters: {
    cutCreditTypeFilter(value) {
      switch ('' + value) {
        case '1':
          return '垫付支付';
        case '3':
          return '余额支付';
        default:
          return '--';
      }
    },
    payerFilter(value) {
      switch ('' + value) {
        case '0':
          return '客户支付';
        case '1':
          return '采购支付';
        default:
          return '--';
      }
    },
    productNumbersFilter(value) {
      if (!value || !value.length) return '';
      return value.map(item => item.number).join(' , ');
    },
    colorsFilter(value) {
      if (!value || !value.length) return '';
      let sum = 0;
      value.forEach(item => { sum += Number(item.followerQuantity) })
      return sum.toFixed(2) + value[0].followerQuantityUnit;
    }
  }
}

</script>
<style lang="scss" scoped>
.color-table {
  width: 60%;
}

.bulk-wrap {
  overflow-x: auto;
  .table {
    width: 2400px;
  }
}

</style>
