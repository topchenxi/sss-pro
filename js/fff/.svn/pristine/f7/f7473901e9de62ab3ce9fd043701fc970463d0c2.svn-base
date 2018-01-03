<template>
  <section>
    <!-- <h1 class="title" style="font-size: 25px; padding: 15px">退补款列表</h1> -->
    <HeadFilters v-on:getParams="getFilter" :params="requestParams">
      <template slot="headFilterSlot">
        <el-col :span="2">
          <p>&nbsp</p>
          <el-button type="primary" :disabled="selectData.length === 0" @click="showExchangeDialog(selectData)">批量处理</el-button>
        </el-col>
      </template>
    </HeadFilters>
    <Tabs></Tabs>
    <div class="count-money">
      <span>实收金额:
        <strong>{{totalRealReceiveMoney | formatMoney}}元</strong>
      </span>
      <span>实付金额:
        <strong>{{totalRealPayMoney | formatMoney}}元</strong>
      </span>
    </div>
    <el-table :data="tableData" :height="tableHeight" border @selection-change="handleSelectionChange">
      <el-table-column width="50" type="selection" align="center" fixed>
      </el-table-column>
      <el-table-column label="进入待处理时间" prop="financeCreateTime" align="center" :formatter="formatTime" min-width="160">
      </el-table-column>
      <el-table-column label="订单号" prop="serviceNumber" align="center" min-width="200">
      </el-table-column>
      <el-table-column label="退换货单号" prop="number" align="center" min-width="140">
      </el-table-column>
      <el-table-column label="供应商退款/元" prop="sellerRefund" align="center" min-width="130">
        <template scope="scope">
          {{scope.row.moneyType == 1 ? scope.row.sellerRefund : '--'}}
        </template>
      </el-table-column>
      <el-table-column label="搜芽补款/元" prop="soouyaToSellerMoney" align="center" min-width="120">
        <template scope="scope">
          {{scope.row.moneyType == 2 ? scope.row.soouyaToSellerMoney : '--'}}
        </template>
      </el-table-column>
      <el-table-column label="搜芽退款/元" prop="soouyaPayToBuyer" align="center" min-width="120">
        <template scope="scope">
          {{scope.row.moneyType == 3 ? scope.row.soouyaPayToBuyer : '--'}}
        </template>
      </el-table-column>
      <el-table-column label="实收实付款/元" prop="realMoney" align="center" min-width="130">
        <template scope="scope">
          <span style="color:#f00" v-if="scope.row.moneyType == 1">+{{scope.row.realMoney}}</span>
          <span style="color:#29bf2a" v-if="scope.row.moneyType != 1">-{{scope.row.realMoney}}</span>
        </template>
      </el-table-column>
      <el-table-column label="款项类型" prop="moneyType" align="center" min-width="100">
        <template scope="scope">
          <template v-if="scope.row.moneyType == 1">供应商退款</template>
          <template v-else-if="scope.row.moneyType == 2">搜芽补款</template>
          <template v-else-if="scope.row.moneyType == 3">搜芽退款</template>
        </template>
      </el-table-column>
      <el-table-column label="退换类型" prop="type" align="center" min-width="100">
        <template scope="scope">
          <template v-if="scope.row.type == 1">售前退货</template>
          <template v-if="scope.row.type == 2">售前换货</template>
          <template v-if="scope.row.type == 3">售后退货</template>
          <template v-if="scope.row.type == 4">售后换货</template>
          <template v-if="scope.row.type == 5">仅退款</template>
        </template>
      </el-table-column>
      <el-table-column label="供应商" prop="shopCompany" align="center" min-width="140">
      </el-table-column>
      <el-table-column label="供应商ID" prop="sellerNumber" align="center" min-width="120">
      </el-table-column>
      <el-table-column label="采购商" prop="buyerCompany" align="center" min-width="140">
      </el-table-column>
      <el-table-column label="采购商ID" prop="buyerNumber" align="center" min-width="120">
      </el-table-column>
      <el-table-column label="跟单员" align="center" min-width="120">
        <template scope="scope">
          {{scope.row.follower}}/{{scope.row.followerTel}}
        </template>
      </el-table-column>
      <el-table-column label="买货员" align="center" min-width="120">
        <template scope="scope">
          {{scope.row.purchaser}}/{{scope.row.purchaserTel}}
        </template>
      </el-table-column>
      <!-- 参数待定 -->
      <el-table-column label="采购员" align="center" min-width="120">
        <template scope="scope">
          {{scope.row.guiderName}}/{{scope.row.guiderTel}}
        </template>
      </el-table-column>
      <el-table-column label="销售员" align="center" min-width="120">
        <template scope="scope">
          {{scope.row.salesName}}/{{scope.row.salesTel}}
        </template>
      </el-table-column>
      <el-table-column label="申请退换货时间" prop="createTime" align="center" :formatter="formatTime" min-width="180">
      </el-table-column>
      <el-table-column label="处理状态" prop="financeStatus" align="center" min-width="100">
        <template scope="scope">
          <template v-if="scope.row.financeStatus == 7">
            <span class="forgive-color">已处理</span>
          </template>
          <template v-if="scope.row.financeStatus == 5">
            <span class="forgive-color">待处理</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="200">
        <template scope="scope">
          <el-button size="mini" @click="showExchangeDialog(scope.row)" type="warning">确认处理</el-button>
          <el-button size="mini" @click="showExceptionDialog(scope.row)" type="primary">异常</el-button>
          <router-link :to="'/finance/exchange/details/undone?id=' + scope.row.id">
            <el-button size="mini" type="primary">详情</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-content">
    <Pagination :page="pagination.pageNumber" :total="pagination.totalCount" :options="requestParams" :render="getData"></Pagination>      
    </div>
    <ExchangeHandleDialog :config="handleDialogConfig" v-on:success="getData"></ExchangeHandleDialog>
    <ExchangeExceptionDialog :config="exceptionDialogConfig" v-on:success="getData"></ExchangeExceptionDialog>
  </section>
</template>

<script>
import HeadFilters from 'components/headFilter/HeadFilter'
import FormFilters from 'components/filters.vue'
import Tabs from 'components/exchangeTabs.vue'
import Pagination from 'components/pagination'
import ExchangeHandleDialog from 'components/exchangeHandleDialog'
import ExchangeExceptionDialog from 'components/exchangeExceptionDialog'
import exchangeApi from 'api/exchange'

export default {
  components: {
    HeadFilters,
    FormFilters,
    Tabs,
    Pagination,
    ExchangeHandleDialog,
    ExchangeExceptionDialog
  },
  data() {
    return {
      tableData: [],
      requestParams: {
        orderNumber: '',
        number: '',
        sellerCompany: '',
        sellerNumber: '',
        buyerCompany: '',
        buyerNumber: '',
        moneyType: '',
        follower: '',
        purchaser: '',
        type: '',
        realMoney: '',
        financeCreateTimeBegin: '',
        financeCreateTimeEnd: '',
        salesName: '',
        guiderName: '',
        pageNumber: 1,
        pageSize: 20
      },
      pagination: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 20
      },
      totalRealReceiveMoney: 0,
      totalRealPayMoney: 0,
      handleDialogConfig: {
        isShow: false,
        id: [],
        type: 1
      },
      exceptionDialogConfig: {
        isShow: false,
        id: ''
      },
      tableHeight: 600,
      selectData: []
    }
  },
  mounted() {
    this.tableHeight = String(document.body.clientHeight - 402);
    this.getData()
  },
  methods: {
    getFilter(params) {
      delete params.totalMoney
      this.requestParams = Object.assign({
        pageSize: 20,
        pageNumber: 1
      }, params)
      if (params.customerCompany) {
        this.requestParams.buyerCompany = params.customerCompany
      } else {
        this.requestParams.buyerCompany = ''
      }
      delete this.requestParams.customerCompany
      if (params.createTimeBegin && !isNaN(params.createTimeBegin)) {
        this.requestParams.financeCreateTimeBegin = new Date(params.createTimeBegin).getTime()
      }
      delete params.createTimeBegin
      if (params.createTimeEnd && !isNaN(params.createTimeEnd)) {
        this.requestParams.financeCreateTimeEnd = new Date(params.createTimeEnd).getTime()
      }
      delete params.createTimeEnd
      this.getData()
    },
    search(params) {
      Object.assign(this.requestParams, this.formatParamsTime(params, 'financeCreateTimeBegin', 'financeCreateTimeEnd'))
      this.getData()
    },
    getData(params = {}) {
      const data = Object.assign(this.requestParams, params)
      exchangeApi.getUndoneExchange(data).then((response) => {
        if (this.requestIsSuccess(response)) {
          this.pagination.pageNumber = response.page.pageNumber
          this.pagination.pageSize = response.page.pageSize
          this.pagination.totalCount = response.page.totalCount
          this.tableData = response.page.result
          this.totalRealReceiveMoney = response.totalRealReceiveMoney
          this.totalRealPayMoney = response.totalRealPayMoney
        }
      })
    },
    showExchangeDialog(data) {
      let ids = []
      if (Array.isArray(data)) {
        data.forEach((item) => {
          ids.push(item.id)
        })
      } else {
        ids.push(data.id)
      }
      Object.assign(this.handleDialogConfig, {
        isShow: true,
        id: ids,
        type: data.moneyType
      })
    },
    showExceptionDialog(data) {
      Object.assign(this.exceptionDialogConfig, {
        isShow: true,
        id: data.id,
      })
    },
    handleSelectionChange(data) {
      this.selectData = data
    }
  }
}
</script>
<style lang="scss" scoped>
.el-table {
  .el-button {
    margin: 2px;
  }
}
</style>

