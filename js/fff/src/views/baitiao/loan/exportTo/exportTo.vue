<template>
  <section v-loading.fullscreen.lock="pageLoading" element-loading-text="拼命加载中...">
    <HeadFilters v-on:getParams="getFilter" :params="requestParams">
      <template slot="headFilterSlot" scope="scope">
        <el-col :span="4">
          <p>&nbsp</p>
          <el-button type="primary" :disabled="selectData.length === 0" @click="showDialog(selectData)">批量放款</el-button>
          <el-button type="primary" @click="exportHandle(scope.scope)">导出</el-button>
        </el-col>
      </template>
    </HeadFilters>
    <Tabs></Tabs>
    <div class="loan-total">
      待放款总金额：
      <strong>{{moneyToFixed(totalLoanMoney)}}元</strong>
    </div>
    <div class="">
      <el-table class="fixed-table" :data="tableData" :height="tableHeight" @selection-change="handleMutipleSelectionChange" border>
        <el-table-column type="selection" min-width="50" fixed="left">
        </el-table-column>
        <el-table-column prop="createTime" label="进入待放款时间" min-width="120" algin="center" :formatter="formatTime">
        </el-table-column>
        <el-table-column prop="serviceNumber" label="订单号" min-width="160" align="center">
        </el-table-column>
        <el-table-column prop="outReposityNumber" label="出仓单号" min-width="120" align="center">
        </el-table-column>
        <el-table-column prop="usedMoney" label="支用额度/元" align="center" min-width="80" :formatter="formatMoney">
        </el-table-column>
        <el-table-column prop="serviceMoney" label="金融服务费" align="center" min-width="80" :formatter="formatMoney">
        </el-table-column>
        <el-table-column prop="expectedLoanMoney" label="应放款金额/元" align="center" :formatter="formatMoney" min-width="100">
        </el-table-column>
        <el-table-column label="放款来源" min-width="80">
          <template scope="scope">
            <span v-if="scope.row.creditType == 2">徙木金融</span>
            <span v-if="scope.row.creditType == 4">雁阵金融</span>
          </template>
        </el-table-column>
        <el-table-column prop="buyerCompany" label="采购商" align="center" min-width="80">
        </el-table-column>
        <el-table-column prop="buyerNumber" label="采购商ID" align="center" min-width="80">
        </el-table-column>
        <el-table-column label="销售员" align="center" min-width="120">
          <template scope="scope">
            {{scope.row.followerName}}/{{scope.row.followerTel}}
          </template>
        </el-table-column>
        <el-table-column prop="loanStatus" label="放款状态" align="center" min-width="80">
          <template scope="scope">
            <template v-if="scope.row.loanStatus">
              <span class="forgive-color">已放款</span>
            </template>
            <template v-else>
              <span class="forgive-color">待放款</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column inline-template label="操作" min-width="80" fixed="right">
          <div class="operate-btu">
            <el-button @click.native="showDialog(row)" type="primary" size="mini">确认放款</el-button>
          </div>
        </el-table-column>
      </el-table>
      <div class="pagination-content">
        <Pagination :pageSize="pagination.pageSize" :page="pagination.pageNumber" :total="pagination.totalCount" :options="requestParams" :render="getData"></Pagination>
      </div>
    </div>
    <el-dialog :title="dialogTitle" v-model="dialogFormVisible" size="tiny">
      <p class="tip-msg">请确认第三方金融已放款到财务账户，一旦确认提交，将不可修改。</p>
      <el-form class="confirmDialog" label-width="100" label-position="right">
        <el-form-item label="放款金额：">
          <strong>{{confirmLoanMoney | formateNumber}}元</strong>
        </el-form-item>
        <el-form-item label="放款日期：" required>
          <el-date-picker v-model="confirmLoan.financeLoanTime" class="c-data-start" :editable="false" type="date" :picker-options="pickerOptions0"></el-date-picker>
        </el-form-item>
        <el-form-item label="放款备注：">
          <el-input v-model="confirmLoan.financeLoanRemark" type="textarea" :autosize="{minRows: 6,maxRows:6}" resize="none" placeholder="请输入内容" @input="updateVal"></el-input>
          <!-- <p style="text-align:right;color:#f00">{{remarkLength}}/{{remarkTotalLength}}</p> -->
          <p v-if="confirmLoan.financeLoanRemark" class="remark-font">{{confirmLoan.financeLoanRemark.length}}/500</p>
          <p v-else class="remark-font">0/500</p>
        </el-form-item>
      </el-form>
      <footer>
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" :disabled="unableConfirm" @click="confirmLoanMoneyEvent()">确 定</el-button>
      </footer>
    </el-dialog>
  </section>
</template>
<script>
import HeadFilters from 'components/headFilter/HeadFilter'
import Tabs from 'components/loanTabs.vue'
import Pagination from 'components/pagination'
import { request, newRequest } from 'common/utils'
export default {
  components: {
    HeadFilters,
    Tabs,
    Pagination
  },
  data() {
    return {
      dialogTitle: '确认放款',
      selectData: [],
      dialogFormVisible: false,
      pageLoading: false,
      requestParams: {
        orderNumber: '',
        outReposityNumber: '',
        buyerCompany: '',
        buyerNumber: '',
        followerName: '',
        expectedLoanMoney: '',
        createTimeBegin: '',
        createTimeEnd: '',
        pageNumber: 1,
        pageSize: 20
      },
      confirmLoanMoney: 0,
      confirmLoan: {
        ids: [],
        financeLoanTime: '',
        financeLoanRemark: ''
      },
      pagination: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 0
      },
      totalLoanMoney: 0,
      tableData: [],
      tableHeight: 500,
      remarkLength: 0,
      remarkTotalLength: 500,
      unableConfirm: false,
      pickerOptions0: {
        disabledDate(time) {
          return Date.now() < Date.parse(new Date(time))
        }
      },
    }
  },
  mounted() {
    this.tableHeight = String(document.body.clientHeight - 402);
    this.getData()
  },
  methods: {
    getFilter(params) {
      this.requestParams = Object.assign({
        pageNumber: 1,
        pageSize: 20,
      }, params)
      if (isNaN(params.createTimeBegin)) {
        delete this.requestParams.createTimeBegin
      }
      if (isNaN(params.createTimeEnd)) {
        delete this.requestParams.createTimeEnd
      }
      if (params.createTimeBegin) {
        this.requestParams.createTimeBegin = new Date(params.createTimeBegin).getTime()
      }
      if (params.createTimeEnd) {
        this.requestParams.createTimeEnd = new Date(params.createTimeEnd).getTime()
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
    updateVal() {
      this.remarkLength = this.confirmLoan.financeLoanRemark.length
      if (this.remarkLength > 500) {
        this.$message('备注过长')
        this.unableConfirm = true
      } else {
        this.unableConfirm = false
      }
    },
    handleMutipleSelectionChange(data) {
      this.selectData = data
      // console.log(this.selectData)
    },
    search() {
      if (this.requestParams.createTimeBegin != '' && this.requestParams.createTimeEnd != '') {
        if (this.requestParams.createTimeBegin instanceof Date) {
          var timeBegin = Date.parse(this.requestParams.createTimeBegin)
          this.requestParams.createTimeBegin = timeBegin
        }
        if (this.requestParams.createTimeEnd instanceof Date) {
          var timeEnd = Date.parse(this.requestParams.createTimeEnd)
          this.requestParams.createTimeEnd = timeEnd
        }
        this.getData()
        // console.log(this.requestParams.createTimeBegin)
        // console.log(this.requestParams.createTimeEnd)
      } else if (this.requestParams.createTimeBegin != '' && this.requestParams.createTimeEnd == '' ||
        this.requestParams.createTimeBegin == '' && this.requestParams.createTimeEnd != '') {
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
        this.requestParams.createTimeBegin = new Date(params.createTimeBegin).getTime()
      }
      if (params.createTimeEnd) {
        this.requestParams.createTimeEnd = new Date(params.createTimeEnd).getTime()
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
        url: '/redwood/loan/exportTo',
        method: 'get',
        data: this.requestParams
      }).then((response) => {
        this.pageLoading = false
        if (response.success == '1') {
          window.open('http://www.soouya.com/' + response.obj)
        } else {
          this.$message.error(response.msg)
        }
        this.pageLoading = false
      })
    },
    showDialog(data) {
      this.confirmLoanMoney = 0
      this.confirmLoan.financeLoanTime = ''
      var len = this.confirmLoan.ids.length
      this.confirmLoan.ids.splice(0, len)
      this.dialogFormVisible = true
      if (!data.length) {
        this.dialogTitle = '确认放款'
        this.confirmLoanMoney = this.moneyToFixed(data.expectedLoanMoney + this.confirmLoanMoney)
        this.confirmLoan.ids.push(data.id)
      } else {
        this.dialogTitle = '批量放款'
        for (let i = 0; i < data.length; i++) {
          this.confirmLoanMoney = (data[i].expectedLoanMoney + this.confirmLoanMoney)
          this.confirmLoan.ids.push(data[i].id)
        }
        this.confirmLoanMoney = this.moneyToFixed(this.confirmLoanMoney)
      }
      // console.log(this.confirmLoan)
    },
    confirmLoanMoneyEvent() {
      if (this.confirmLoan.financeLoanTime == '') {
        this.$message('请填写放款日期')
      } else {
        var loanTime = Date.parse(this.confirmLoan.financeLoanTime)
        var currentTime = new Date()
        var com = currentTime.getTime() - this.confirmLoan.financeLoanTime.getTime()
        if (com < 0) {
          this.$message('放款日期不得大于当前时间')
        } else {
          this.confirmLoan.financeLoanTime = loanTime
          request({
            url: '/redwood/loan/batchConfirm',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
              ids: this.confirmLoan.ids,
              financeLoanTime: this.confirmLoan.financeLoanTime,
              financeLoanRemark: this.confirmLoan.financeLoanRemark
            })
          }).then((response) => {
            this.dialogFormVisible = false
            if (response.success == '1') {
              this.getData()
              this.$message({
                message: response.msg,
                type: 'success'
              })
            } else {
              this.$message.error(response.msg);
            }
          })
        }
      }
    },
    getData(params = {}) {
      this.requestParams = Object.assign(this.requestParams, params)
      this.pageLoading = true
      // console.log(this.requestParams)
      request({
        url: '/redwood/loan/listTo',
        methods: 'post',
        data: this.requestParams
      }).then((response) => {
        // console.log(response)
        this.pageLoading = false
        if (response.success == '1') {
          this.pagination.pageNumber = response.page.pageNumber
          this.pagination.pageSize = response.page.pageSize
          this.pagination.totalCount = response.page.totalCount
          this.tableData = response.page.result
          this.totalLoanMoney = response.totalLoanMoney
          this.totalLoanMoney = this.totalLoanMoney
        } else {
          this.$message.error(response.msg);
        }
      })
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
  padding-left: 15px;
  margin: 10px 0px;
  strong {
    color: #f00;
  }
}

.confirmDialog {
  text-align: left;
}

// .el-icon-warning{
//   width: 55px;
//   height: 55px;
// }
span>strong {
  color: #f00;
}

.positionBtn {
  margin-left: 45%;
}
</style>