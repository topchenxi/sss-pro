<template>
  <section v-loading.body="fullscreenLoading">
    <!-- <h1 class="title" style="font-size: 25px; padding: 15px">退补款列表</h1> -->
    <HeadFilters v-on:getParams="getFilter" :params="requestParams">
      <template slot="headFilterSlot" scope="scope">
        <el-col :span="2">
          <p>&nbsp</p>
          <el-button type="primary" @click="exportData(scope.scope)">导出</el-button>
        </el-col>
      </template>
    </HeadFilters>
    <Tabs></Tabs>
    <div class="count-money">
      <span>已实收金额:
        <strong>{{totalReceivedMoney | formatMoney}}元</strong>
      </span>
      <span>已实付金额:
        <strong>{{totalReceivedMoney | formatMoney}}元</strong>
      </span>
    </div>
    <el-table :data="tableData" :height="tableHeight" border>
      <el-table-column label="处理时间" prop="financeHandleTime" align="center" :formatter="formatTime" min-width="160">
      </el-table-column>
      <el-table-column label="订单号" prop="serviceNumber" align="center" min-width="200">
      </el-table-column>
      <el-table-column label="退换货单号" prop="number" align="center" min-width="140">
      </el-table-column>
      <el-table-column label="供应商退款/元" prop="sellerRefund" align="center" min-width="120">
        <template scope="scope">
          {{scope.row.moneyType == 1 ? scope.row.sellerRefund : '--'}}
        </template>
      </el-table-column>
      <el-table-column label="搜芽补款/元" prop="soouyaToSellerMoney" align="center" min-width="100">
        <template scope="scope">
          {{scope.row.moneyType == 2 ? scope.row.soouyaToSellerMoney : '--'}}
        </template>
      </el-table-column>
      <el-table-column label="搜芽退款/元" prop="soouyaPayToBuyer" align="center" min-width="100">
        <template scope="scope">
          {{scope.row.moneyType == 3 ? scope.row.soouyaPayToBuyer : '--'}}
        </template>
      </el-table-column>
      <el-table-column label="实收实付款/元" prop="realMoney" align="center" min-width="120">
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
      <el-table-column label="财务备注" align="center" min-width="100" show-overflow-tooltip>
        <template scope="scope">
          <template v-if="scope.row.isEdit">
            <el-input v-model="scope.row.financeDescr" @keyup.enter.native="editDescr(scope.row)"></el-input>
          </template>
          <template v-else>
            <div @click="scope.row.isEdit = true">{{scope.row.financeDescr}}&nbsp;</div>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="处理状态" prop="financeStatus" align="center">
        <template scope="scope">
          <template v-if="scope.row.financeStatus == 7">
            <span class="forgive-color">已处理</span>
          </template>
          <template v-if="scope.row.financeStatus == 5">
            <span class="forgive-color">待处理</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right">
        <template scope="scope">
          <router-link :to="'/finance/exchange/details/done?id=' + scope.row.id">
            <el-button size="mini" type="primary">详情</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-content">
      <Pagination :page="pagination.pageNumber" :total="pagination.totalCount" :options="requestParams" :render="getData"></Pagination>
    </div>
  </section>
</template>

<script>
import HeadFilters from 'components/headFilter/HeadFilter'
import FormFilters from 'components/filters.vue'
import Tabs from 'components/exchangeTabs.vue'
import Pagination from 'components/pagination'
import exchangeApi from 'api/exchange'
import { Message } from 'element-ui'
import {
  request
} from 'src/common/utils.js'

export default {
  components: {
    HeadFilters,
    FormFilters,
    Tabs,
    Pagination
  },
  data() {
    return {
      tableData: [],
      fullscreenLoading: false,
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
        financeHandleTimeBegin: '',
        financeHandleTimeEnd: '',
        guiderName: '',
        salesName: '',
        pageNumber: 1,
        pageSize: 20
      },
      pagination: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 20
      },
      totalReceivedMoney: 0,
      totalPayedMoney: 0,
      tableHeight: 600,
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
        pageNumber: 1,
        pageSize: 20
      }, params)
      if (params.createTimeBegin && !isNaN(params.createTimeBegin)) {
        this.requestParams.financeHandleTimeBegin = new Date(params.createTimeBegin).getTime()
      }
      delete this.requestParams.createTimeBegin
      if (params.createTimeEnd && !isNaN(params.createTimeEnd)) {
        this.requestParams.financeHandleTimeEnd = new Date(params.createTimeEnd).getTime()
      }
      delete this.requestParams.createTimeEnd
      if (params.customerCompany) {
        this.requestParams.buyerCompany = params.customerCompany
        delete params.customerCompanty
      } else {
        this.requestParams.buyerCompany = ''
      }
      this.getData()
    },
    search(params) {
      Object.assign(this.requestParams, this.formatParamsTime(params, 'financeHandleTimeBegin', 'financeHandleTimeEnd'))
      this.getData()
    },
    getData(params = {}) {
      this.fullscreenLoading = true
      const data = Object.assign(this.requestParams, params)
      exchangeApi.getDoneExchange(data).then((response) => {
        if (this.requestIsSuccess(response)) {
          this.pagination.pageNumber = response.page.pageNumber
          this.pagination.pageSize = response.page.pageSize
          this.pagination.totalCount = response.page.totalCount
          response.page.result.forEach((item) => {
            item.isEdit = false
          })
          this.tableData = response.page.result
          this.totalReceivedMoney = response.totalReceivedMoney
          this.totalPayedMoney = response.totalPayedMoney
        }
        this.fullscreenLoading = false
      })
    },
    editDescr(data) {
      this.fullscreenLoading = true;
      request({
        url: '/redwood/returnReplaceFinance/updateFinanceDescr',
        method: 'post',
        contentType: 'application/json',
        data: JSON.stringify({ id: data.id, financeDescr: data.financeDescr, _time: +new Date() })
      }).then((response) => {
        this.fullscreenLoading = false;
        if (response.success == 1) {
          Message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          })
          data.isEdit = false
        }
      })
    },
    exportData(params) {
      this.fullscreenLoading = true
      params = JSON.parse(JSON.stringify(params))
      let keys = Object.keys(params)
      keys.map(key => {
        if (!params[key]) {
          delete params[key]
        }
      })
      params.createTimeBegin = new Date(params.createTimeBegin).getTime()
      params.createTimeEnd = new Date(params.createTimeEnd).getTime()
      this.requestParams = Object.assign({
        pageNumber: 1,
        pageSize: 20
      }, params)
      if (params.createTimeBegin && !isNaN(params.createTimeBegin)) {
        this.requestParams.financeHandleTimeBegin = new Date(params.createTimeBegin).getTime()
      }
      delete this.requestParams.createTimeBegin
      if (params.createTimeEnd && !isNaN(params.createTimeEnd)) {
        this.requestParams.financeHandleTimeEnd = new Date(params.createTimeEnd).getTime()
      }
      delete this.requestParams.createTimeEnd
      console.log(params.customerCompany)
      if (params.customerCompany) {
        this.requestParams.buyerCompany = params.customerCompany
        delete params.customerCompanty
      } else {
        this.requestParams.buyerCompany = ''
      }
      this.fullscreenLoading = false
      exchangeApi.exportList(this.requestParams)
    }
  }
}
</script>

