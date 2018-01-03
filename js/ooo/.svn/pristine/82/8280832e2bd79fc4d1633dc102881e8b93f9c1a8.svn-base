<template>
  <div class="oms-content">
    <el-menu mode="horizontal" default-active="1" class="el-menu-demo">
      <a href="/buyerDebt/buyerDebtBulk" key="1">
        <el-menu-item index="1">
          大货({{countBulk}})
        </el-menu-item>
      </a>
      <a href="/buyerDebt/buyerDebtCut" key="2">
        <el-menu-item index="2">
          剪版({{countCut}})
        </el-menu-item>
      </a>
    </el-menu>
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
          <el-select v-model="params.status" placeholder="全部结算状态">
            <el-option label="全部结算状态" value=""> </el-option>
            <el-option label="未结清" value="0"> </el-option>
            <el-option label="已结清" value="1">
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <el-date-picker v-model="params.createTimeBegin" type="datetime" placeholder="开始时间">
          </el-date-picker>
        </div>
        <div class="item">
          <el-date-picker v-model="params.createTimeEnd" type="datetime" placeholder="结束时间">
          </el-date-picker>
        </div>
        <el-button type="primary" class="fr" @click="toExport">导出Excel</el-button>
      </div>
    </div>
    <div class="main-wrap">
      <div class="main-content">
        <el-table :data="list" :resizable="false" :height="height" header-align="left" border>
          <el-table-column width="160" label="出仓单号" prop="number"> </el-table-column>
          <el-table-column width="200" label="订单号" prop="serviceNumber"> </el-table-column>
          <el-table-column width="200" label="订单时间">
            <template scope="scope">
              {{scope.row.createTime | formatTime}}
            </template>
          </el-table-column>
          <el-table-column width="200" label="货号" prop="productNumber"> </el-table-column>
          <el-table-column width="200" label="采购商" prop="customerCompany"> </el-table-column>
          <el-table-column width="200" label="供应商" prop="shopCompany"> </el-table-column>
          <el-table-column width="200" label="色号匹号数量" prop="colorClothLone"> </el-table-column>
          <el-table-column width="130" label="总入仓实数">
            <template scope="scope">
              {{scope.row.quantity}} {{scope.row.quantityUnit}}
            </template>
          </el-table-column>
          <el-table-column width="200" label="支付时间">
            <template scope="scope">
              {{scope.row.payTime | formatTime}}
            </template>
          </el-table-column>
          <el-table-column width="120" label="支付方式">
            <template scope="scope">
              {{scope.row.creditType | creditTypeFilter}}
            </template>
          </el-table-column>
          <el-table-column width="120" label="付款人">
            <template scope="scope">
              {{scope.row.payer | payerFilter}}
            </template>
          </el-table-column>
          <el-table-column width="120" label="应收账款">
            <template scope="scope">
              {{scope.row.totalMoney | formatMoney}}元
            </template>
            status
          </el-table-column>
          <el-table-column width="120" label="结算状态">
            <template scope="scope">
              {{scope.row.status | statusFilter}}
            </template>
          </el-table-column>
          <el-table-column width="120" label="销售员" prop="salerName"> </el-table-column>
          <el-table-column label="操作" fixed="right" align="left" width="120">
            <template scope="scope">
              <router-link :to="{path: '/bulk/order/detail', query: {detailType: 'all', orderNumber: scope.row.orderNumber} }">
                <el-button class="table-btn">详情</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
        <div class="page-wrap" style="float:right;margin-top:20px;">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.pageNumber" :page-sizes="[10, 20, 30, 100]" :page-size="params.pageSize" layout="total, sizes, prev, pager, next" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request'
export default {
  data() {
    return {
      result: [],
      list: [],
      params: {
        key: '',
        status: '0',
        createTimeBegin: '',
        createTimeEnd: '',
        pageNumber: 1,
        pageSize: 10
      },
      total: 20,
      currentPage: 1,
      height: 600,
      countBulk: 0,
      countCut: 0,
    }
  },
  mounted() {
    this.reqList();
    window.addEventListener('resize', this.countHeight)
    this.countHeight()
  },
  destroyed() {
    window.removeEventListener('resize', this.countHeight)
  },
  filters: {
    date(val) {
      // return Number(val) != 0 ? formatTimeString(val) : '--'
    },
    creditTypeFilter(value) {
      switch (value) {
        case 1:
          return '搜芽垫付';
        case 2:
          return '搜芽白条';
        case 3:
          return '余额';
        default:
          return;
      }
    },
    payerFilter(value) {
      switch (value) {
        case 0:
          return '客户支付';
        case 1:
          return '采购支付';
        default:
          return;
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
    countHeight() {
      this.height = String(document.documentElement.clientHeight - 320)
    },
    handleSizeChange(pageSize) {
      this.params.pageNumber = 1;
      this.params.pageSize = pageSize;
      this.reqList();
    },
    handleCurrentChange(pageNumber) {
      this.params.pageNumber = pageNumber;
      this.reqList();
    },
    search() {
      Object.assign(this.params, {
        pageNumber: 1
      })
      this.reqList()
    },
    reset() {
      this.params.key = '';
      this.params.status = '';
      this.params.createTimeBegin = '';
      this.params.createTimeEnd = '';
      this.reqList()
    },
    toExport() {
      let params = JSON.parse(JSON.stringify(this.params))
      if (params.status == '') {
        params.status = ''
      } else {
        params.status = Number(params.status);
      }
      params.createTimeBegin ? params.createTimeBegin = +new Date(params.createTimeBegin) : params.createTimeBegin = ''
      params.createTimeEnd ? params.createTimeEnd = +new Date(params.createTimeEnd) : params.createTimeEnd = ''
      params.export = 1;

      request('/redwood/bulk/debt', {
        method: 'GET',
        data: Object.assign({}, params, {})
      }).then(response => {
        if (response.success == 1) {
          window.open(response.obj)
        }
      })
    },
    reqList() {
      var params = JSON.parse(JSON.stringify(this.params))
      if (params.status == '') {
        params.status = ''
      } else {
        params.status = Number(params.status)
      }
      params.createTimeBegin ? params.createTimeBegin = +new Date(params.createTimeBegin) : params.createTimeBegin = ''
      params.createTimeEnd ? params.createTimeEnd = +new Date(params.createTimeEnd) : params.createTimeEnd = '';

      request('/redwood/bulk/debt', {
        method: 'GET',
        data: Object.assign({}, params, {})
      }).then(response => {
        if (response.success == 1) {
          console.log(response.count);
          this.countBulk = response.count.bulk;
          this.countCut = response.count.cut;
          this.result = []
          this.list = response.page.result;
          this.total = response.page.totalCount;
          if (response.page.result.length > 0) {
            let obj = {};
            let serviceNumber = null;
            response.page.result.forEach((item, index) => {
              serviceNumber = item.serviceNumber
              if (obj.serviceNumber == serviceNumber) {
                obj.products.push(item)
              } else {
                obj = {}
                obj.serviceNumber = item.serviceNumber
                obj.customerCompany = item.customerCompany
                obj.shopCompany = item.shopCompany
                obj.createTime = item.createTime
                obj.salerName = item.salerName
                obj.productNumber = item.productNumber
                obj.customerHasOpenedBaitiao = item.customerHasOpenedBaitiao
                obj.products = []
                obj.products.push(item)
                this.result.push(obj)
              }
            })
          } else {
            this.result = []
          }
        } else {
          this.$message.error(response.msg)
        }
      })
    }
  }
}

</script>
