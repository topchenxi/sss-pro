<template>
  <div class="oms-content">
    <div class="search-content">
      <div class="row">
        <div class="item w360">
          <el-input v-model="params.key" placeholder="采购商名称,供应商名称,销售员,订单号"></el-input>
        </div>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </div>
      <div class="row">
        <div class="item">
          <el-select v-model="params.reconciliationStatus" placeholder="全部结算状态" @change="search">
            <el-option label="全部结算状态" value=""> </el-option>
            <el-option label="未结清" value="0"> </el-option>
            <el-option label="已结清" value="1">
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <el-date-picker v-model="params.createTimeBegin" type="date" placeholder="开始时间">
          </el-date-picker>
        </div>
        <div class="item">
          <el-date-picker v-model="params.createTimeEnd" type="date" placeholder="结束时间">
          </el-date-picker>
        </div>
        <el-button type="primary" class="fr" @click="toExport">导出Excel</el-button>
      </div>
    </div>
    <div class="main-wrap">
      <div class="main-content">
        <el-table :data="list" :resizable="false" :height="windowHeight - 320" header-align="left" border>
          <el-table-column label="出仓单号" width="180" align="left">
            <template scope="scope">
              {{scope.row.number}}
              <el-tooltip v-if="scope.row.billCancelRemark" effect="dark" :content="scope.row.billCancelRemark" placement="top">
                <span class="icon-callback"></span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="订单号" prop="bulk.number" align="center" width="210px"> </el-table-column>
          <el-table-column label="订单时间" align="center" width="180px">
            <template scope="scope">
              {{scope.row.bulk.createTime | date}}
            </template>
          </el-table-column>
          <el-table-column label="货号" prop="bulk.productNumber" align="center" width="150px" l> </el-table-column>
          <el-table-column label="采购商" align="left" width="220px" show-overflow-tooltip>
            <template scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.bulk.customerCompany + '/' + scope.row.bulk.customerNumber" placement="top">
                <p class="ellipsis">
                  <span class="icon" :class="scope.row.bulk.customerHasOpenedBaitiao ? 'icon-ximu-active' : 'icon-ximu-gray' "></span>
                  <span class="icon" :class="scope.row.bulk.customerHasOpenedYanzhen ? 'icon-yanzhen-active' : 'icon-yanzhen-gray'"></span> {{scope.row.bulk.customerCompany + '/' + scope.row.bulk.customerNumber}}</p>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="供应商" prop="bulk.showShopCompany" align="center" width="170px" show-overflow-tooltip></el-table-column>
          <el-table-column label="色号匹号数量" prop="num" align="center" width="160px" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="总入仓实数" align="center" width="130px">
            <template scope="scope">
              {{scope.row.quantity}} {{scope.row.quantityUnit}}
            </template>
          </el-table-column>
          <el-table-column label="支付时间" align="center" width="180px">
            <template scope="scope">
              {{scope.row.payTime | formatTime}}
            </template>
          </el-table-column>
          <el-table-column label="支付方式" align="center" width="120px">
            <template scope="scope">
              {{scope.row.creditType | creditTypeFilter}}
            </template>
          </el-table-column>
          <el-table-column label="付款人" align="center" width="120px">
            <template scope="scope">
              <span>{{scope.row.payer ? '采购支付' : '客户支付'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="支付金额" align="center" width="120px">
            <template scope="scope">
              {{scope.row.totalMoney | formatMoney}}
            </template>
          </el-table-column>
          <el-table-column label="结算状态" align="center" width="120px">
            <template scope="scope">
              {{scope.row.reconciliationStatus | statusFilter}}
            </template>
          </el-table-column>
          <el-table-column label="回款日期" align="center" width="180px">
            <template scope="scope">
              {{scope.row.returnDate | formatTime}}
            </template>
          </el-table-column>
          <el-table-column label="销售员" prop="bulk.salerName" align="center" width="150px"> </el-table-column>
          <el-table-column label="操作" fixed="right" align="left" width="120px">
            <template scope="scope">
              <router-link :to="{path: '/index/guider/bulk/dhOrderDetail', query: {detailType: 'all',  payType: true, reqNumber: scope.row.orderNumber, outRepositId: scope.row.id,customerId : scope.row.bulk.customerId} }">
                <el-button class="table-btn">详情</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
        <Page :total="total" :params="params" @toSearch="getList"></Page>
      </div>
    </div>
  </div>
</template>
<script>
import Pagination from 'components/pagination'
import { getBuyerDebtBulkList, reportBuyerDebtBulk } from 'src/service/guider';
import bus from './eventBus';
import { newRequest } from 'utils/tool';
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      list: [],
      total: 0,
      params: {
        _function: 'debt',
        key: '',
        reconciliationStatus: '0',
        createTimeBegin: '',
        createTimeEnd: '',
        pageNumber: 1,
        pageSize: 10,
      }
    }
  },
  mounted() {
    this.getList();
  },
  filters: {
    creditTypeFilter(value) {
      switch (value) {
        case -1:
          return '未支付';
        case 1:
          return '垫付支付';
        case 2:
          return '白条支付';
        case 3:
          return '余额支付';
        case 4:
          return '信贷支付';
        default:
          return '--';
      }
    },
    statusFilter(value) {
      switch (value) {
        case 0:
          return '未结清';
        case 1:
          return '已结清';
        default:
          return;
      }
    }
  },
  methods: {
    search() {
      Object.assign(this.params, {
        pageNumber: 1
      })
      this.getList()
    },
    reset() {
      Object.assign(this.params, {
        key: '',
        status: '',
        createTimeBegin: '',
        createTimeEnd: '',
      });
      this.getList()
    },
    async toExport() {
      this.$store.dispatch('changeload', true)
      // 构建传参
      let params = Object.assign({}, this.params);
      params.createTimeBegin = params.createTimeBegin ? +new Date(params.createTimeBegin) : '';
      params.createTimeEnd = params.createTimeEnd ? +new Date(params.createTimeEnd) + 86399000 : '';
      params.export = 1;
      let res = await reportBuyerDebtBulk(params);
      // 处理返回结果
      if (res.success !== '1') return;
      window.open(res.obj)
      this.$store.dispatch('changeload', false)
    },
    // 获取上面所有的统计数
    getCount() {
      newRequest({
        url: '/redwood/count/debt',
        method: 'get',
      }).then((res) => {
        if (res.success == 1) {
          bus.$emit('countBuyerDebt', res.obj);
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    async getList() {
      this.$store.dispatch('changeload', true)
      this.getCount()
      // 构建传参
      let params = Object.assign({}, this.params);
      params.createTimeBegin = params.createTimeBegin ? +new Date(params.createTimeBegin) : '';
      params.createTimeEnd = params.createTimeEnd ? +new Date(params.createTimeEnd) + 86399000 : '';
      let res = await getBuyerDebtBulkList(params);
      // 处理返回结果
      if (res.success !== '1') return;
      this.total = res.page.totalCount
      this.list = res.page.result || [];
      this.$store.dispatch('changeload', false)
    }
  }
}

</script>
