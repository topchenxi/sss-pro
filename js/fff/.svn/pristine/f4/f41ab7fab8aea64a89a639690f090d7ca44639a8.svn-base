<template>
  <section v-loading.body="fullscreenLoading">
    <HeadFilter v-on:getParams="getFilter" :param="requestParams">
      <template slot="headFilterSlot" scope="scope">
        <el-col :span="4">
          <p>&nbsp</p>
          <el-button type="primary" @click="exportHandle(scope.scope)">导出</el-button>
        </el-col>
      </template>
    </HeadFilter>
    <el-table :data="tableData" border :height="tableHeight">
      <el-table-column label="退换货申请时间" prop="createTime" :formatter="formatTime" width="160"></el-table-column>
      <el-table-column label="订单号" prop="serviceNumber" width="200"></el-table-column>
      <el-table-column label="退换货单号" prop="number"></el-table-column>
      <el-table-column label="退换货数量">
        <template scope="scope">
          {{scope.row.quantity | formateNumber}}{{scope.row.quantityUnit}}
        </template>
      </el-table-column>
      <el-table-column label="现采购数量" prop="">
        <template scope="scope">
          {{scope.row.needBuyQuantity | formateNumber}}{{scope.row.needBuyQuantityUnit}}
        </template>
      </el-table-column>
      <el-table-column label="退换货类型" prop="">
        <template scope="scope">
          <template v-if="scope.row.type == 1">售前退货</template>
          <template v-if="scope.row.type == 2">售前换货</template>
          <template v-if="scope.row.type == 3">售后退货</template>
          <template v-if="scope.row.type == 4">售后换货</template>
        </template>
      </el-table-column>
      <el-table-column label="退换货状态" prop="">
        <template scope="scope">
          <span class="forgive-color">{{scope.row.statusDescr}}</span>
        </template>
        <!-- <template scope="scope">
            <template v-if="scope.row.status == 3310">等待退货出仓</template>
            <template v-if="scope.row.status == 3460">等待退货出仓</template>
            <template v-if="scope.row.status == 3600">等待退货出仓</template>
            <template v-if="scope.row.status == 3510">等待退货出仓</template>
            <template v-if="scope.row.status == 3210">等待退货出仓</template>
          </template> -->
      </el-table-column>
      <el-table-column label="采购商" prop="customerCompany"></el-table-column>
      <el-table-column label="供应商" prop="shopCompany"></el-table-column>
      <el-table-column label="销售员" prop="">
        <template scope="scope">{{scope.row.salesName}}/{{scope.row.salesTel}}</template>
      </el-table-column>
      <el-table-column label="采购员" prop="">
        <template scope="scope">
          {{scope.row.guiderName}}/{{scope.row.guiderTel}}
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="">
        <template scope="scope">
          <router-link :to="{name: 'exchangeOrderDetail', query: {id: scope.row.id}}">
            <el-button type="primary" size="mini">详情</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-content">
      <pagination :page="page.pageNumber" :total="page.totalCount" :render="getData" :options="requestParams"></pagination>
    </div>
  </section>
</template>

<script>
import HeadFilter from 'components/headFilter/HeadFilter'
import pagination from 'components/pagination'
import { newRequest } from 'common/utils'
export default {
  components: {
    HeadFilter,
    pagination,
  },
  data() {
    return {
      fullscreenLoading: false,
      tableHeight: 600,
      tableData: [],
      requestParams: {
        pageNumber: 1,
        pageSize: 20,
        status: '',
      },
      page: {
        pageNumber: 1,
        totalCount: 20,
        pageSize: 20
      },
    }
  },
  mounted() {
    this.tableHeight = String(window.document.body.clientHeight - 312)
    this.getData()
  },
  methods: {
    getData() {
      this.fullscreenLoading = true
      newRequest({
        url: '/redwood/returnreplace/list',
        data: this.requestParams,
        method: 'get'
      }).then(res => {
        if (res.success == 1) {
          this.tableData = res.page.result
          this.page.pageNumber = res.page.pageNumber
          this.page.pageSize = res.page.pageSize
          this.page.totalCount = res.page.totalCount
        } else {
          this.$message.error(res.msg)
        }
        this.fullscreenLoading = false
      })
    },
    exportHandle(params) {
      // console.log(params)
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
      if (isNaN(params.createTimeBegin)) {
        delete params.createTimeBegin
      }
      if (isNaN(params.createTimeEnd)) {
        delete params.createTimeEnd
      }
      this.requestParams = Object.assign({
        pageNumber: 1,
        pageSize: 20,
        status: '',
      }, params)
      if (params.totalMoney) {
        this.requestParams.expectedIncomeMoney = params.totalMoney
        delete this.requestParams.totalMoney
      } else {
        delete this.requestParams.totalMoney
      }
      if (params.orderNumber) {
        this.requestParams.serviceNumber = params.orderNumber
      }
      if (!this.requestParams.createTimeBegin) {
        delete this.requestParams.createTimeBegin
      } else {
       this.requestParams.createTimeBegin = new Date(this.requestParams.createTimeBegin).getTime()
      }
      if (!this.requestParams.createTimeEnd) {
        delete this.requestParams.createTimeEnd
      } else {
        this.requestParams.createTimeEnd = new Date(this.requestParams.createTimeEnd).getTime()
      }
      if (this.requestParams.buyerHasOpenedBaitiao == 0 || this.requestParams.buyerHasOpenedBaitiao) {
        this.requestParams.hasOpenedBaitiao = this.requestParams.buyerHasOpenedBaitiao
      }
      newRequest({
        url: '/redwood/returnreplace/export',
        data: this.requestParams,
        method: 'get'
      }).then(res => {
        if (res.success == 1) {
          window.open('http://www.soouya.com' + res.obj)
        } else {
          this.$message.error(res.msg)
        }
        this.fullscreenLoading = false
      })
    },
    getFilter(params) {
      this.requestParams = Object.assign({
        pageNumber: 1,
        pageSize: 20,
        status: '',
      }, params)
      if (isNaN(params.createTimeBegin)) {
        delete this.requestParams.createTimeBegin
      }
      if (isNaN(params.createTimeEnd)) {
        delete this.requestParams.createTimeEnd
      }
      if (params.totalMoney) {
        this.requestParams.expectedIncomeMoney = params.totalMoney
        delete this.requestParams.totalMoney
      } else {
        delete this.requestParams.totalMoney
      }
      if (params.orderNumber) {
        this.requestParams.serviceNumber = params.orderNumber
      }
      if (!this.requestParams.createTimeBegin) {
        delete this.requestParams.createTimeBegin
      }
      if (!this.requestParams.createTimeEnd) {
        delete this.requestParams.createTimeEnd
      }
      if (this.requestParams.buyerHasOpenedBaitiao == 0 || this.requestParams.buyerHasOpenedBaitiao) {
        this.requestParams.hasOpenedBaitiao = this.requestParams.buyerHasOpenedBaitiao
      }
      if (params.buyerCompany) {
        this.requestParams.customerCompany = params.buyerCompany
      } else {
        this.requestParams.customerCompany = ''
      }
      if (params.shopName) {
        this.requestParams.shopCompany = params.shopName
      } else {
        this.requestParams.shopCompany = ''
      }
      this.requestParams.pageNumber = 1
      this.getData()
    }
  }
}
</script>

<style>

</style>
