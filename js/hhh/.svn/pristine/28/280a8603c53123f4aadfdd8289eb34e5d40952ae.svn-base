<template>
  <div>
    <hsMenu></hsMenu>
    <div class="oms-content">
      <search :params='params' @toSearch="getList"></search>
      <div class="main-wrap">
        <div class="main-content">
          <div class="clearfix p20 pt0 pl0">
            <el-button class="fl mr20" type="primary" icon="plus" @click.native="addBill">创建对账单</el-button>
            <el-upload class="d-upload" ref="upload" action="" :on-change="importFile" :on-remove="removeFile" :auto-upload="false" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
              <el-button icon="upload2" slot="trigger" type="primary" :disabled="!!file">上传对账单</el-button>
            </el-upload>
            <el-button class="fl" type="primary" v-if="!!file" @click.native="toImport">开始上传</el-button>
          </div>
          <div class="table-wrap" v-if="list.length&&params.type==1">
            <el-table :data="list" border style="width: 100%" :height="windowHeight - 340">
              <el-table-column label="出仓单号" width="180" align="left">
                <template scope="scope">
                  {{scope.row.number}}
                  <el-tooltip v-if="scope.row.billCancelRemark" effect="dark" :content="scope.row.billCancelRemark" placement="top">
                    <span class="icon-callback"></span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="订单号/扣数单号" width="210">
                <template scope="scope">
                  <p :class="{'green':scope.row.isOutRepo==0}">{{scope.row.bulk.number}}</p>
                </template>
              </el-table-column>
              <el-table-column label="订单日期/扣数单日期" width="180">
                <template scope="scope">
                  <!-- isOutRepo; 1:出仓单,0:扣数单 -->
                  <p v-if="scope.row.isOutRepo==1">{{scope.row.bulk.createTime | date}}</p>
                  <p v-if="scope.row.isOutRepo==0">{{scope.row.createTime | date}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="bulk.productNumber" label="货号" width="180"> </el-table-column>
              <el-table-column label="采购商" width="290" align="left">
                <template scope="scope"> <span class="icon" :class="scope.row.bulk.customerHasOpenedBaitiao ? 'icon-ximu-active' : 'icon-ximu-gray' "></span> <span class="icon mr5" :class="scope.row.bulk.customerHasOpenedYanzhen ? 'icon-yanzhen-active' : 'icon-yanzhen-gray'"></span> {{scope.row.bulk.customerCompany || '--'}} / {{scope.row.bulk.customerNumber || '--'}}</template>
              </el-table-column>
              <el-table-column label="供应商" width="150">
                <template scope="scope"> {{scope.row.bulk.shopCompany || '--'}} </template>
              </el-table-column>
              <el-table-column prop="num" label="色号匹号数量" width="150"> </el-table-column>
              <el-table-column label="总入仓实数/采购数量" width="180">
                <template scope="scope">
                  <p :class="{'green':scope.row.isOutRepo==0}"> {{scope.row.quantity}}{{scope.row.quantityUnit}}</p>
                </template>
              </el-table-column>
              <el-table-column label="支付时间" width="180">
                <template scope="scope">
                  <p v-if="scope.row.isOutRepo==1&&scope.row.bulk.type==3">{{scope.row.payTime | date}}</p>
                  <p v-else>--</p>
                </template>
              </el-table-column>
              <el-table-column label="支付方式" width="100">
                <template scope="scope">
                  <p v-if="scope.row.isOutRepo==1&&scope.row.bulk.type==3">{{scope.row.creditType | creditTypeFilter}}</p>
                  <p v-else>--</p>
                </template>
              </el-table-column>
              <el-table-column label="付款人" width="100">
                <template scope="scope">
                  <p v-if="scope.row.isOutRepo==1&&scope.row.bulk.type==3">{{scope.row.payer | payerFilter}}</p>
                  <p v-else>--</p>
                </template>
              </el-table-column>
              <el-table-column label="支付金额/总费用(元)" width="180">
                <template scope="scope"> <span class="money">  {{scope.row.totalMoney | formatMoney}}</span> </template>
              </el-table-column>
              <el-table-column label="滞纳金(元)" width="120">
                <template scope="scope">
                  <span class="money">  {{scope.row.lateFeesMoney | formatMoney}}</span>
                </template>
              </el-table-column>
              <el-table-column label="订单类型" width="100">
                <template scope="scope"> 大货 </template>
              </el-table-column>
              <el-table-column label="采购员/跟单员" width="160">
                <template scope="scope">
                  {{scope.row.bulk.guiderName || '--'}} / {{scope.row.bulk.followerName || '--' }}
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="详情" width="120">
                <template scope="scope">
                  <el-button v-if="scope.row.bulk.type==3" class="table-btn" @click="toDetail(scope.row)">详情</el-button>
                  <span v-else>--</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-if="list.length&&params.type==2" class="table-wrap" :style="{ height : windowHeight - 340 + 'px' }">
            <table class="table">
              <colgroup>
                <!-- 订单号/扣数单号 -->
                <col width="12%">
                <!-- 订单日期/扣数单日期 -->
                <col width="10%">
                <!-- 货号 -->
                <col width="10%">
                <!-- 采购商 -->
                <col width="10%">
                <!-- 供应商 -->
                <col width="6%">
                <!-- 支付时间 -->
                <col width="10%">
                <!-- 支付方式 -->
                <col width="6%">
                <!-- 付款人 -->
                <col width="6%">
                <!-- 支付金额/总费用 -->
                <col width="9%">
                <!-- 滞纳金(元) -->
                <col width="6%">
                <!-- 剪版员 -->
                <col width="8%">
                <!-- 订单类型 -->
              </colgroup>
              <thead>
                <tr>
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
                  <tr>
                    <!-- 订单号/扣数单号 -->
                    <td> {{item.number}}
                      <el-tooltip v-if="item.billCancelRemark" effect="dark" :content="item.billCancelRemark" placement="top">
                        <span class="icon-callback"></span>
                      </el-tooltip>
                      <p v-if="item.delayTime > 0" class="green"> {{item.delayTime | date}}发货 </p>
                    </td>
                    <!-- 订单日期/扣数单日期 -->
                    <td>{{item.createTime | date}}</td>
                    <!-- 货号 -->
                    <td>
                      <div class="number-wrap" @click="changeShow(item)"> {{item.productNumbers | productNumbersFilter}} <i class="el-icon-arrow-up" v-if="item.isShow"></i> <i class="el-icon-arrow-down" v-if="!item.isShow"></i> </div>
                    </td>
                    <!-- 采购商 -->
                    <td class="ta-l">{{item.customerCompany}}/{{item.customerNumber}}</td>
                    <!-- 供应商 -->
                    <td>{{item.shopCompany}}</td>
                    <!-- 支付时间 -->
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
                    <td><span class="money">{{item.totalMoney | formatMoney}}</span></td>
                    <!-- 滞纳金 -->
                    <td><span class="money">{{item.lateFeesMoney | formatMoney}}</span></td>
                    <!-- 剪版员 -->
                    <td>{{item.cutterName || '--'}}</td>
                    <!-- 订单类型 -->
                    <td>{{item.followerName || '--'}}</td>
                  </tr>
                  <tr class="number-bg" v-if="item.isShow">
                    <td colspan="2">
                      <p>采购商：{{item.customerCompany}}/{{item.customerNumber}}</p>
                      <p>供应商：{{item.shopCompany}}</p>
                      <p>支付总费用：<span class="money">{{item.totalMoney | formatMoney}}</span> 元</p>
                    </td>
                    <td colspan="10">
                      <table class="color-table" style="width:60%;">
                        <colgroup>
                          <col width="33%">
                          <col width="33%">
                          <col width="33%"> </colgroup>
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
          <div class="empty" v-if="!list.length" :style="{ height : windowHeight - 340 + 'px' }"></div>
          <Page :total="total" :params="params" @toSearch="getList"></Page>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import hsMenu from '../menu.vue';
import search from '../search.vue';
import { getDebtList } from 'src/service/saler';
import XLSX from 'xlsx';
export default {
  components: {
    hsMenu,
    search
  },
  data() {
    return {
      params: {
        'key': '',
        'type': '1',
        '_function': 'toBill',
        'numbers': '',
        'createTimeBegin': '',
        'createTimeEnd': '',
        'bulk.createTimeBegin': '',
        'bulk.createTimeEnd': '',
        'pageSize': 10,
        'pageNumber': 1,
      },
      list: [],
      total: 0,
      file: '',
      numberBulkList: [],
      numberCutList: []
    }
  },
  methods: {
    removeFile() {
      this.file = '';
    },
    toImport() {
      let file = this.file;
      const reader = new FileReader();
      reader.onload = (e) => {
        const wb = XLSX.read(e.target.result, { type: 'binary' });
        console.log(wb.SheetNames);
        let xlsxOfBulk = XLSX.utils.sheet_to_json(wb.Sheets['大货'], { header: 1 });
        let xlsxOfCut = XLSX.utils.sheet_to_json(wb.Sheets['剪版'], { header: 1 });
        xlsxOfBulk.slice(3).forEach(item => {
          if (item.length > 3) {
            // 出仓单号
            if (item[2]) this.numberBulkList.push(item[2]);
          }
        })
        xlsxOfCut.slice(3).forEach(item => {
          if (item.length > 3) {
            // 订单编号
            if (item[2]) this.numberCutList.push(item[2]);
          }
        })
        console.log(this.numberBulkList, this.numberCutList)
        let tmpNameArr = file.name.split('-');
        let numbers = this.numberBulkList.join(',');
        let numbersOfCut = this.numberCutList.join(',');
        let customerNumber = tmpNameArr.length > 1 ? tmpNameArr[1] : '';
        this.$router.push({
          name: 'debtOfAddBill',
          query: {
            customerNumber,
            numbers,
            numbersOfCut
          }
        })
      };
      reader.readAsBinaryString(file);
    },
    importFile(file) {
      this.file = file.raw;
    },
    addBill() {
      this.$router.push({
        name: 'debtOfAddBill'
      })
    },
    toDetail(item) {
      this.$router.push({
        name: 'dhOrderDetail',
        query: {
          detailType: 'all',
          payType: true,
          reqNumber: item.isOutRepo == 1 ? item.orderNumber : item.bulk.id,
          outRepositId: item.id,
          customerId: item.bulk.customerId,
          isSaler: 1
        }
      })
    },
    handleList() {
      if (this.params.type != '2') return;
      this.list.forEach(item => {
        this.$set(item, 'isShow', false);
      })
    },
    changeShow(item) {
      item.isShow = !item.isShow;
    },
    async getList() {
      this.list = [];
      this.$store.dispatch('changeload', true);
      let res = await getDebtList(this.params);
      this.$store.dispatch('changeload', false);
      if (res.success !== '1') return;
      this.list = res.page.result;
      this.total = res.page.totalCount;
      this.handleList();
    }
  },
  mounted() {
    this.getList();
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
<style lang="scss">
.d-upload {
  float: left;
  margin-right: 20px;
  display: flex;
  .el-upload-list__item {
    margin: 0 0 0 5px;
    height: 32px;
    line-height: 32px;
    .el-icon-close {
      top: 10px;
    }
  }
}

</style>
