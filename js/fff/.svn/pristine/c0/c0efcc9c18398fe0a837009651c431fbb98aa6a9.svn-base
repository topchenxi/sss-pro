<template>
  <section v-loading.fullscreen.lock="pageLoading" element-loading-text="拼命加载中...">
    <HeadFilters v-on:getParams="getFilter" :params="requestParams">
      <template slot="headFilterSlot" scope="scope">
        <el-col :span="4">
          <p>&nbsp</p>
          <el-button type="primary" :disabled="multipleSelection.length < 1" @click.prevent="showDialog(multipleSelection)">批量放款</el-button>
          <el-button type="primary" @click="exportHandle(scope.scope)">导出</el-button>
        </el-col>
      </template>
    </HeadFilters>
    <Tabs></Tabs>
    <div class="loan-total">
      待搜芽放款金额：
      <strong>{{moneyToFixed(loanMoney)}}元</strong>
    </div>
    <el-table :data="tableData" :height="tableHeight" border @selection-change="handleMutipleSelectionChange">
      <el-table-column type="selection" min-width="50" fixed="left" :selectable="canSelect">
      </el-table-column>
      <el-table-column prop="repaymentLoanCreateTime" label="白条支付成功时间" align="center" :formatter="formatTime" width="150">
      </el-table-column>
      <el-table-column prop="number" label="订单号" align="center" width="150">
      </el-table-column>
      <el-table-column prop="totalMoney" label="已使用徒木额度/元" align="center" :formatter="formatMoney" width="160">
      </el-table-column>
      <el-table-column prop="totalMoney" label="放款金额/元" align="center" :formatter="formatMoney">
      </el-table-column>
      <el-table-column label="利息/元" align="center">
        <template scope="scope">
          {{(parseFloat(scope.row.totalMoney * 0.018).toFixed(2))}}
        </template>
      </el-table-column>
      <el-table-column prop="customerCompany" label="采购商" align="center">
      </el-table-column>
      <el-table-column prop="shopCompany" label="供应商" align="center">
      </el-table-column>
      <el-table-column label="徒木是否放款" align="center">
        <template scope="scope">
          <template v-if="scope.row.repaymentLoanLoanStatus == 1">
            <span>是</span>
          </template>
          <template v-else>
            <span>否</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="loanStatus" label="状态" align="center">
        <template scope="scope">
          <template v-if="scope.row.repaymentLoanSoouyaLoanStatus >=1 ">
            <span class="forgive-color">搜芽已放款</span>
          </template>
          <template v-else>
            <span class="forgive-color">待搜芽放款</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="repaymentLoanSoouyaFinanceLoanTime" label="搜芽放款日期" align="center" :formatter="dateFormat">
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template scope="scope">
          <template v-if="scope.row.isEdit">
            <el-input v-model="scope.row.repaymentLoanSoouyaFinanceLoanRemark" autofocus="autofocus" @keyup.enter.native="modifyRemark(scope.row)"></el-input>
          </template>
          <template v-else>
            <div @click="scope.row.isEdit=true">{{scope.row.repaymentLoanSoouyaFinanceLoanRemark}}&nbsp</div>
          </template>
        </template>
      </el-table-column>
      <el-table-column inline-template label="操作" min-width="80" fixed="right">
        <template v-if="row.repaymentLoanSoouyaLoanStatus == 0">
          <el-button size="mini" type="primary" @click.native="showDialog(row)">放款</el-button>
          <!--<el-button type="danger" @click.native="cancel(row)">取消</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-content">
      <Pagination :page="pagination.pageNumber" :total="pagination.totalCount" :options="requestParams" :render="getData"></Pagination>
    </div>
    <el-dialog :title="dialogTitle" v-model="dialogFormVisible" size="tiny">
      <p class="tip-msg">请与供应商确认订单金融再进行放款，一旦确认提交，将不可修改。</p>
      </br>
      </br>
      <el-form class="confirmDialog" label-width="100" label-position="right" style="taxt-align:left">
        <el-form-item label="放款金额：">
          <span style="color:#f00">{{confirmLoanMoney | formateNumber}}元</span>
        </el-form-item>
        <el-form-item label="放款日期：">
          <el-date-picker v-model="confirmLoan.repaymentLoanSoouyaFinanceLoanTime" class="c-data-start" :editable="false" type="date" placeholder=""></el-date-picker>
        </el-form-item>
        <el-form-item label="放款备注：">
          <el-input v-model="confirmLoan.repaymentLoanSoouyaFinanceLoanRemark" :autosize="{minRows: 6, maxRows:6}" resize="none" type="textarea" placeholder="请输入内容" @input="updateVal"></el-input>
          <p v-if="confirmLoan.repaymentLoanSoouyaFinanceLoanRemark" class="remark-font">{{confirmLoan.repaymentLoanSoouyaFinanceLoanRemark.length}}/500</p>
          <p v-else class="remark-font">0/500</p>
        </el-form-item>
      </el-form>
      <footer>
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" class="positionBtn" type="primary" :disabled="unableConfirm" @click="confirmLoanMoneyEvent()">确 定</el-button>
      </footer>
    </el-dialog>
  </section>
</template>
<script>
import HeadFilters from 'components/headFilter/HeadFilter'
import Tabs from 'components/soouyaLoanTabs.vue'
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
      dialogFormVisible: false,
      dialogTitle: '',
      confirmLoanMoney: 0,
      confirmLoan: {
        ids: [],
        repaymentLoanSoouyaFinanceLoanTime: '',
        repaymentLoanSoouyaFinanceLoanRemark: ''
      },
      remarkLength: 0,
      remarkTotalLength: 500,
      unableConfirm: false,
      loanMoney: 0, // 总金额
      tableData: [], // 表格数据
      tableHeight: 500,
      pageLoading: false,
      multipleSelection: [], // 存储多选项的
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
        export: 0,
        repaymentLoanSoouyaLoanStatus: '210',
        repaymentLoanLoanStatus: '10',
      }, params)
      if (params.createTimeBegin) {
        this.requestParams.repaymentLoanCreateTimeBegin = new Date(params.createTimeBegin).getTime()
      }
      delete this.requestParams.createTimeBegin
      if (params.createTimeEnd) {
        this.requestParams.repaymentLoanCreateTimeEnd = new Date(params.createTimeEnd).getTime()
      }
      delete this.requestParams.createTimeEnd
      if (params.loanMoney || params.loanMoney == 0) {
        this.requestParams.totalMoney = params.loanMoney
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
    cancel(data) {
      this.$confirm('确定取消订单?', '提示', {
        type: 'warning'
      }).then(() => {
        request({
          url: `/redwood/shop/bulk/${data.id}?_function=cancel`,
          method: 'put',
          contentType: 'application/json',
          data: JSON.stringify({ id: data.id, cancelReason: '系统取消' })
        }).then((response) => {
          if (response.success == '1') {
            this.$message({
              message: response.msg,
              type: 'success'
            })
            data.isEdit = false
            this.getData()
          }
        })
      })
    },
    canSelect(row, index) {
      return row.repaymentLoanSoouyaLoanStatus == 0
    },
    updateVal() {
      this.remarkLength = this.confirmLoan.repaymentLoanSoouyaFinanceLoanRemark.length
      if (this.remarkLength > 500) {
        this.$message('备注过长')
        this.unableConfirm = true
      } else {
        this.unableConfirm = false
      }
    },
    handleMutipleSelectionChange(data) {
      this.multipleSelection = data
      console.log(this.multipleSelection)
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
        export: 1,
        repaymentLoanSoouyaLoanStatus: '210',
        repaymentLoanLoanStatus: '10',
      }, params)
      if (params.createTimeBegin) {
        this.requestParams.repaymentLoanCreateTimeBegin = new Date(params.createTimeBegin).getTime()
      }
      delete this.requestParams.createTimeBegin
      if (params.createTimeEnd) {
        this.requestParams.repaymentLoanCreateTimeEnd = new Date(params.createTimeEnd).getTime()
      }
      delete this.requestParams.createTimeEnd
      if (params.loanMoney || params.loanMoney == 0) {
        this.requestParams.totalMoney = params.loanMoney
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
    modifyRemark(data) {
      request({
        url: `/redwood/shop/bulk/${data.id}?_function=updateRepaymentLoan`,
        method: 'put',
        contentType: 'application/json',
        data: JSON.stringify({ number: data.number, repaymentLoanSoouyaFinanceLoanRemark: data.repaymentLoanSoouyaFinanceLoanRemark, repaymentLoanSoouyaInterestRemark: data.repaymentLoanSoouyaInterestRemark })
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
    showDialog(data) {
      this.confirmLoanMoney = 0
      this.confirmLoan.repaymentLoanSoouyaFinanceLoanTime = ''
      var len = this.confirmLoan.ids.length
      this.confirmLoan.ids.splice(0, len)
      this.dialogFormVisible = true
      if (!data.length) {
        this.dialogTitle = '确认放款'
        this.confirmLoanMoney = this.moneyToFixed(data.totalMoney + this.confirmLoanMoney)
        this.confirmLoan.ids.push(data.number)
      } else {
        this.dialogTitle = '批量放款'
        for (let i = 0; i < data.length; i++) {
          this.confirmLoanMoney = (data[i].totalMoney + this.confirmLoanMoney)
          this.confirmLoan.ids.push(data[i].number)
        }
        this.confirmLoanMoney = this.moneyToFixed(this.confirmLoanMoney)
      }
      // console.log(this.confirmLoan)
    },
    confirmLoanMoneyEvent() {
      if (this.confirmLoan.repaymentLoanSoouyaFinanceLoanTime == '') {
        this.$message('请填写放款日期')
      } else {
        var loanTime = Date.parse(this.confirmLoan.repaymentLoanSoouyaFinanceLoanTime)
        var currentTime = new Date()
        var com = currentTime.getTime() - this.confirmLoan.repaymentLoanSoouyaFinanceLoanTime.getTime()
        if (com < 0) {
          this.$message('放款日期不得大于当前时间')
        } else {
          this.confirmLoan.repaymentLoanSoouyaFinanceLoanTime = loanTime
          request({
            url: `/redwood/shop/bulk/${this.confirmLoan.ids}?_function=agree`,
            method: 'put',
            contentType: 'application/json',
            data: JSON.stringify({
              repaymentLoanSoouyaFinanceLoanTime: this.confirmLoan.repaymentLoanSoouyaFinanceLoanTime,
              repaymentLoanSoouyaFinanceLoanRemark: this.confirmLoan.repaymentLoanSoouyaFinanceLoanRemark
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
          this.loanMoney = response.loanMoney
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
  text-align: left;
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
