<template>
  <section v-loading.fullscreen.lock="pageLoading" element-loading-text="拼命加载中...">
    <HeadFilters v-on:getParams="getFilter" :params="requestParams">
      <template slot="headFilterSlot" scope="scope">
        <el-col :span="4">
          <p>&nbsp</p>
          <!-- <el-button type="primary" :disabled="multipleSelection.length < 1" @click.prevent="showDialog(multipleSelection)">批量放款</el-button> -->
          <el-button type="primary" @click="exportHandle(scope.scope)">导出</el-button>
        </el-col>
      </template>
    </HeadFilters>
    <Tabs></Tabs>
    <div class="loan-total">
      支用申请金额：
      <strong>{{moneyToFixed(totalMoney)}}元</strong>
    </div>
    <el-table :data="tableData" :height="tableHeight" border>
      <el-table-column prop="repaymentLoanCreateTime" label="申请时间" align="center" :formatter="formatTime" width="150">
      </el-table-column>
      <el-table-column prop="number" label="订单号" align="center" width="180">
      </el-table-column>
      <el-table-column prop="totalMoney" label="订单金额/元" align="center" :formatter="formatMoney" width="160">
      </el-table-column>
      <el-table-column prop="customerCompany" label="采购商" align="center">
      </el-table-column>
      <el-table-column prop="shopCompany" label="供应商" align="center">
      </el-table-column>
      <el-table-column prop="statusDescr" label="状态" align="center">
        <template scope="scope">
          <span class="forgive-color">{{scope.row.statusDescr}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cancelReason" label="备注" align="center">
      </el-table-column>
    </el-table>
    <div class="pagination-content">
    <Pagination :page="pagination.pageNumber" :total="pagination.totalCount" :options="requestParams" :render="getData"></Pagination>      
    </div>
  </section>
</template>
<script>
import HeadFilters from 'components/headFilter/HeadFilter'
import Tabs from 'components/soouyaLoanTabs.vue'
import Pagination from 'components/pagination'
import { newRequest } from 'common/utils'
export default {
  components: {
    HeadFilters,
    Tabs,
    Pagination
  },
  data() {
    return {
      totalMoney: 0, // 总金额
      tableData: [], // 表格数据
      tableHeight: 500,
      pageLoading: false,
      pagination: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 20
      },
      requestParams: {
        number: '',
        customerCompany: '',
        shopCompany: '',
        totalMoney: '',
        export: 0,
        repaymentLoanCreateTimeBegin: '',
        repaymentLoanCreateTimeEnd: '',
        repaymentLoanSoouyaLoanStatus: '210',
        repaymentLoanLoanStatus: '10',
        _function: 'all',
        pageSize: 20,
        pageNumber: 1
      }
    }
  },
  mounted() {
    this.tableHeight = String(document.body.clientHeight - 402)
    this.getData()
  },
  methods: {
    getFilter(params) {
      console.log(params)
      this.requestParams = Object.assign({
        pageNumber: 1,
        pageSize: 20,
        export: 0,
        repaymentLoanSoouyaLoanStatus: '210',
        repaymentLoanLoanStatus: '10',
        _function: 'all',
      }, params)
      if (params.createTimeBegin) {
        this.requestParams.repaymentLoanCreateTimeBegin = new Date(params.createTimeBegin).getTime()
      }
      delete this.requestParams.createTimeBegin
      if (params.createTimeEnd) {
        this.requestParams.repaymentLoanCreateTimeEnd = new Date(params.createTimeEnd).getTime()
      }
      delete this.requestParams.createTimeEnd
      if (params.totalMoney || params.totalMoney == 0) {
        this.requestParams.totalMoney = params.totalMoney
      } else {
        this.requestParams.totalMoney = ''
      }
      if (params.loanStatus == 0 || params.loanStatus == 1) {
        this.requestParams.repaymentLoanLoanStatus = params.loanStatus
      } else {
        this.requestParams.repaymentLoanLoanStatus = '10'
      }
      if (this.requestParams.follower) {
        this.requestParams.followerName = this.requestParams.follower
      } else {
        this.requestParams.followerName = ''
      }
      if (this.requestParams.orderNumber) {
        this.requestParams.number = this.requestParams.orderNumber
      } else {
        this.requestParams.number = ''
      }
      if (params.buyerCompany) {
        this.requestParams.customerCompany = params.buyerCompany
      } else {
        this.requestParams.customerCompany = ''
      }
      if (params.shopName) {
        this.requestParams.shopCompany = params.shopName
      } else {
        this.requestParams.shopCompan = ''
      }
      this.getData()
    },
    search() {
      this.getData()
    },
    exportHandle(params) {
      params = JSON.parse(JSON.stringify(params))
      let keys = Object.keys(params)
      keys.map(key => {
        if (!params[key]) {
          delete params[key]
        }
      })
      this.requestParams = Object.assign({
        pageNumber: 1,
        pageSize: 20,
        export: 3,
        repaymentLoanSoouyaLoanStatus: '210',
        repaymentLoanLoanStatus: '10',
        _function: 'all',
      }, params)
      if (params.createTimeBegin) {
        this.requestParams.repaymentLoanCreateTimeBegin = new Date(params.createTimeBegin).getTime()
      }
      delete this.requestParams.createTimeBegin
      if (params.createTimeEnd) {
        this.requestParams.repaymentLoanCreateTimeEnd = new Date(params.createTimeEnd).getTime()
      }
      delete this.requestParams.createTimeEnd
      if (params.totalMoney || params.totalMoney == 0) {
        this.requestParams.totalMoney = params.totalMoney
      } else {
        this.requestParams.totalMoney = ''
      }
      if (params.loanStatus == 0 || params.loanStatus == 1) {
        this.requestParams.repaymentLoanLoanStatus = params.loanStatus
      } else {
        this.requestParams.repaymentLoanLoanStatus = '10'
      }
      if (this.requestParams.follower) {
        this.requestParams.followerName = this.requestParams.follower
      } else {
        this.requestParams.followerName = ''
      }
      if (this.requestParams.orderNumber) {
        this.requestParams.number = this.requestParams.orderNumber
      } else {
        this.requestParams.number = ''
      }
      if (params.buyerCompany) {
        this.requestParams.customerCompany = params.buyerCompany
      } else {
        this.requestParams.customerCompany = ''
      }
      if (params.shopName) {
        this.requestParams.shopCompany = params.shopName
      } else {
        this.requestParams.shopCompan = ''
      }
      this.getData()
    },
    getData(params = {}) {
      this.requestParams = Object.assign(this.requestParams, params)
      if (this.requestParams.repaymentLoanCreateTimeBegin != '' && this.requestParams.repaymentLoanCreateTimeBegin instanceof Date) {
        this.requestParams.repaymentLoanCreateTimeBegin = Date.parse(this.requestParams.repaymentLoanCreateTimeBegin)
      }
      if (this.requestParams.repaymentLoanCreateTimeEnd != '' && this.requestParams.repaymentLoanCreateTimeEnd instanceof Date) {
        this.requestParams.repaymentLoanCreateTimeEnd = Date.parse(this.requestParams.repaymentLoanCreateTimeEnd)
      }
      this.pageLoading = true
      newRequest({
        url: '/redwood/shop/bulk',
        method: 'get',
        data: this.requestParams
      }).then((response) => {
        this.pageLoading = false
        if (response.success === '1') {
          if (this.requestParams.export >= 1) {
            window.open(response.obj)
            this.requestParams.export = 0
            return
          }
          response.page.result.forEach((item) => {
            item.isEdit = false
          })
          this.pagination.pageNumber = response.page.pageNumber
          this.pagination.pageSize = response.page.pageSize
          this.pagination.totalCount = response.page.totalCount
          this.tableData = response.page.result
          this.totalMoney = response.totalMoney
        } else {
          this.$message.error(response.msg);
        }
      })
    },
    dateFormat(row, column) {
      let date = new Date(row[column.property])
      // console.log(date)
      if (row[column.property] > 0) {
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
      } else {
        return '--'
      }
      return y + '-' + m + '-' + d
    },
    moneyToFixed(data) {
      if (data) {
        var fixedData = ((Math.round(data * 100) / 100).toFixed(2))
        return fixedData
      } else {
        return Number('0.00')
      }
    },
    formatMoney(row, column) {
      let val = row[column.property]
      return val === null ? '--' : (parseFloat(val).toFixed(2))
    },
  }
}
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 10px;
}

.split-text {
  line-height: 35px;
}

.c-date-start {
  display: inline-block;
  vertical-align: middle;
  .el-date-editor__editor {
    border-radius: 0 4px 4px 0 !important;
  }
}

.c-date-end {
  vertical-align: middle;
  .el-date-editor__editor {
    border-radius: 4px 0 0 4px !important;
  }
}

.loan-total {
  margin: 10px 0px;
  padding-left: 15px;
  strong {
    color: #f00;
  }
}

.confirmDialog {
  margin-left: 20%;
  text-align: left;
  margin-right: 20%;
  strong {
    color: #f00;
  }
}
</style>

<style lang="scss">
.datepicker-lg label {
  width: 130px !important;
}
</style>
