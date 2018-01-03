<template>
  <section v-loading.fullscreen.lock="pageLoading" element-loading-text="拼命加载中...">
    <HeadFilters v-on:getParams="getFilter" :params="requestParams">
      <template slot="headFilterSlot" scope="scope">
        <el-col :span="4">
          <p>&nbsp</p>
          <!-- <el-button type="primary" :disabled="selectData.length === 0" @click="showDialog(selectData)">批量放款</el-button> -->
          <el-button type="primary" @click="exportHandle(scope.scope)">导出</el-button>
        </el-col>
      </template>
    </HeadFilters>
    <Tabs></Tabs>
    <div class="loan-total">
      已放款总金额：
      <strong>{{moneyToFixed(totalRealLoanMoney)}}元</strong>
    </div>
    <el-table :data="tableData" :height="tableHeight" border>
      <el-table-column prop="loanTime" label="放款日期" align="center" :formatter="dateFormat" min-width="120">
      </el-table-column>
      <el-table-column prop="financeConfirmLoanTime" label="财务操作时间" align="center" min-width="180" :formatter="formatTime">
      </el-table-column>
      <el-table-column prop="createTime" label="进入待放款时间" align="center" :formatter="formatTime" min-width="180">
      </el-table-column>
      <el-table-column prop="serviceNumber" label="订单号" align="center" min-width="200">
      </el-table-column>
      <el-table-column prop="outReposityNumber" label="出仓单号" align="center" min-width="140">
      </el-table-column>
      <el-table-column prop="usedMoney" label="支用额度/元" align="center" :formatter="formatMoney" min-width="100">
      </el-table-column>
      <el-table-column prop="serviceMoney" label="金融服务费" align="center" :formatter="formatMoney" min-width="100">
      </el-table-column>
      <el-table-column prop="loanMoney" label="实际放款金额/元" align="center" :formatter="formatMoney" min-width="140">
      </el-table-column>
      <el-table-column label="放款来源">
          <template scope="scope">
            <span v-if="scope.row.creditType == 2">徙木金融</span>
            <span v-if="scope.row.creditType == 4">雁阵金融</span>
          </template>
        </el-table-column>
      <el-table-column prop="buyerCompany" label="采购商" align="center" min-width="140">
      </el-table-column>
      <el-table-column prop="buyerNumber" label="采购商ID" align="center" min-width="120">
      </el-table-column>
      <el-table-column label="销售员" align="center" min-width="140">
        <template scope="scope">
          {{scope.row.followerName}}/{{scope.row.followerTel}}
        </template>
      </el-table-column>
      <el-table-column prop="loanStatus" label="放款状态" align="center">
        <template scope="scope">
          <template v-if="scope.row.loanStatus">
            <span class="forgive-color">已放款</span>
          </template>
          <template v-else>
            <span class="forgive-color">待放款</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="放款备注" align="center" show-overflow-tooltip>
        <template scope="scope">
          <template v-if="scope.row.isEdit">
            <el-input v-model="scope.row.financeLoanRemark" autofocus="autofocus" @keyup.enter.native="modifyRemark(scope.row)"></el-input>
          </template>
          <template v-else>
            <div @click="scope.row.isEdit=true">{{scope.row.financeLoanRemark}}&nbsp</div>
          </template>
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
import Tabs from 'components/loanTabs.vue'
import Pagination from 'components/pagination'
import { newRequest, request } from 'common/utils'
export default {
  components: {
    HeadFilters,
    Tabs,
    Pagination
  },
  data() {
    return {
      totalRealLoanMoney: 0, // 总金额
      tableData: [], // 表格数据
      tableHeight: 500,
      pageLoading: false,
      pagination: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 20
      },
      requestParams: {
        orderNumber: '',
        outReposityNumber: '',
        buyerCompany: '',
        buyerNumber: '',
        followerName: '',
        loanMoney: '',
        loanTimeBegin: '',
        loanTimeEnd: '',
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
      this.requestParams = Object.assign({
        pageNumber: 1,
        pageSize: 20,
      }, params)
      if (params.createTimeBegin) {
        this.requestParams.loanTimeBegin = new Date(params.createTimeBegin).getTime()
        delete this.requestParams.createTimeBegin
      }
      if (params.createTimeEnd) {
        this.requestParams.loanTimeEnd = new Date(params.createTimeEnd).getTime()
        delete this.requestParams.createTimeEnd
      }
      delete params.totalMoney
      if (this.requestParams.salesName) {
        this.requestParams.followerName = this.requestParams.salesName
      }
      if (this.requestParams.customerCompany) {
        this.requestParams.buyerCompany = this.requestParams.customerCompany
      } else {
        this.requestParams.buyerCompany = ''
      }
      this.getData()
    },
    search() {
      if (this.requestParams.loanTimeBegin != '' && this.requestParams.loanTimeEnd != '') {
        if (this.requestParams.loanTimeBegin instanceof Date) {
          var timeBegin = Date.parse(this.requestParams.loanTimeBegin)
          this.requestParams.loanTimeBegin = timeBegin
        }
        if (this.requestParams.loanTimeEnd instanceof Date) {
          var timeEnd = Date.parse(this.requestParams.loanTimeEnd)
          this.requestParams.loanTimeEnd = timeEnd
        }
        this.getData()
        // console.log(this.requestParams.loanTimeBegin)
        // console.log(this.requestParams.loanTimeEnd)
      } else if (this.requestParams.loanTimeBegin != '' && this.requestParams.loanTimeEnd == '' ||
        this.requestParams.loanTimeBegin == '' && this.requestParams.loanTimeEnd != '') {
        this.$message('请把时间区间填写完整')
      } else {
        this.getData()
      }
    },
    exportHandle(params) {
      this.pageLoading = true
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
      }, params)
      // if (isNaN(params.createTimeBegin)) {
      //   delete this.requestParams.createTimeBegin
      // }
      // if (isNaN(params.createTimeEnd)) {
      //   delete this.requestParams.createTimeEnd
      // }
      if (params.createTimeBegin) {
        this.requestParams.loanTimeBegin = new Date(params.createTimeBegin).getTime()
      }
      if (params.createTimeEnd) {
        this.requestParams.loanTimeEnd = new Date(params.createTimeEnd).getTime()
      }
      delete params.totalMoney
      if (this.requestParams.salesName) {
        this.requestParams.followerName = this.requestParams.salesName
      }
      if (this.requestParams.customerCompany) {
        this.requestParams.buyerCompany = this.requestParams.customerCompany
      } else {
        this.requestParams.buyerCompany = ''
      }
      newRequest({
        url: '/redwood/loan/exportDone',
        method: 'get',
        data: this.requestParams
      }).then((response) => {
        this.pageLoading = false
        if (response.success === '1') {
          // console.log(response.obj)
          window.open('http://www.soouya.com/' + response.obj)
        } else {
          this.$message.error(response.msg);
        }
        this.pageLoading = false
      })
    },
    modifyRemark(data) {
      request({
        url: '/redwood/loan/updateFinanceLoanRemark',
        method: 'post',
        contentType: 'application/json',
        data: JSON.stringify({ id: data.id, financeLoanRemark: data.financeLoanRemark })
      }).then((response) => {
        if (response.success == '1') {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          data.isEdit = false
        }
      })
    },
    getData(params = {}) {
      this.requestParams = Object.assign(this.requestParams, params)
      this.pageLoading = true
      newRequest({
        url: '/redwood/loan/listDone',
        method: 'get',
        data: this.requestParams
      }).then((response) => {
        // console.log(response)
        this.pageLoading = false
        if (response.success === '1') {
          response.page.result.forEach((item) => {
            item.isEdit = false
          })
          this.pagination.pageNumber = response.page.pageNumber
          this.pagination.pageSize = response.page.pageSize
          this.pagination.totalCount = response.page.totalCount
          this.tableData = response.page.result
          this.totalRealLoanMoney = response.totalRealLoanMoney
        } else {
          this.$message.error(response.msg);
        }
      })
    },
    dateFormat(row, column) {
      let date = new Date(row[column.property])
      // console.log(date)
      if (row[column.property]) {
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
</style>
