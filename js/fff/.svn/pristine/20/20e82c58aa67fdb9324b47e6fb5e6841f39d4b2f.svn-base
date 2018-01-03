<template>
  <section v-loading.fullscreen.lock="pageLoading" element-loading-text="拼命加载中...">
    <HeadFilters v-on:getParams="getFilter" :params="requestParams">
      <template slot="headFilterSlot" scope="scope">
        <el-col :span="4">
          <p>&nbsp</p>
          <!-- <el-button type="primary" :disabled="batchBtnVisible" @click="showDialog(selectData)">批量还款</el-button> -->
          <el-button type="primary" @click="exportHandle(scope.scope)">导出</el-button>
        </el-col>
      </template>
    </HeadFilters>
    <Tabs></Tabs>
    <div class="repayment-total">
      <span>还款总金额：
        <strong>{{moneyToFixed(totalHadRepaymentMoney)}}元</strong>
      </span>
      <span>支用额度：
        <strong>{{moneyToFixed(totalUsedMoney)}}元</strong>
      </span>
      <span>保理费&利息：
        <strong>{{moneyToFixed(totalFactoringMoney)}}元</strong>
      </span>
      <span>滞纳金：
        <strong>{{moneyToFixed(totalLateFeesMoney)}}元</strong>
      </span>
    </div>
    <div class="">
      <el-table :data="tableData" :height="tableHeight" border>
        <el-table-column prop="financeConfirmRepaymentTime" label="财务操作时间" align="center" min-width="160" :formatter="formatTime">
        </el-table-column>
        <el-table-column prop="loanTime" label="放款日期" align="center" min-width="100" :formatter="dateFormat">
        </el-table-column>
        <el-table-column prop="financeRepaymentTime" label="还款日期" align="center" min-width="100" :formatter="dateFormat">
        </el-table-column>
        <el-table-column prop="serviceNumber" label="订单号" min-width="200" align="center">
        </el-table-column>
        <el-table-column prop="outReposityNumber" label="出仓单号" align="center" min-width="140">
        </el-table-column>
        <el-table-column prop="usedMoney" label="支用额度/元" align="center" min-width="120" :formatter="formatMoney">
        </el-table-column>
        <el-table-column prop="factoringMoney" label="保理费&利息/元" align="center" min-width="140" :formatter="formatMoney">
        </el-table-column>
        <el-table-column prop="lateFeesMoney" label="滞纳金/元" align="center" min-width="100" :formatter="formatMoney">
        </el-table-column>
        <el-table-column prop="hadRepaymentMoney" label="实际还款/元" align="center" min-width="120" :formatter="formatMoney">
        </el-table-column>
        <el-table-column label="还款对象" min-width="100">
          <template scope="scope">
            <span v-if="scope.row.creditType == 2">徙木金融</span>
            <span v-if="scope.row.creditType == 4">雁阵金融</span>
          </template>
        </el-table-column>
        <el-table-column prop="buyerCompany" label="采购商" align="center" min-width="120">
        </el-table-column>
        <el-table-column prop="buyerNumber" label="采购商ID" align="center" min-width="120">
        </el-table-column>
        <el-table-column label="销售员" align="center" min-width="120">
          <template scope="scope">
            {{scope.row.followerName}}/{{scope.row.followerTel}}
          </template>
        </el-table-column>
        <el-table-column prop="payStatus" label="收回客户欠款" align="center" min-width="120">
          <template scope="scope">
            <template v-if="scope.row.payStatus">是</template>
            <template v-else>否</template>
          </template>
        </el-table-column>
        <el-table-column label="到期还款日" prop="expectedSoouyaRepaymentTime" :formatter="formatDate" min-width="130"></el-table-column>
        <el-table-column label="系统保理费&利息/元" prop="sysFactoringMoney" :formatter="formatNumber" min-width="160"></el-table-column>
        <el-table-column label="系统滞纳金/元" prop="sysLateFeesMoney" :formatter="formatNumber"></el-table-column>
        <el-table-column label="还款状态" align="center" min-width="120">
          <template scope="scope">
            <template v-if="scope.row.repaymentStatus == 2">
              <span class="forgive-color">已还款</span>
            </template>
            <template v-if="scope.row.repaymentStatus == 1">
              <span class="forgive-color">已提交</span>
            </template>
            <template v-if="scope.row.repaymentStatus == 0">
              <span class="forgive-color">待还款</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="还款备注" align="center" min-width="120" show-overflow-tooltip>
          <template scope="scope">
            <template v-if="scope.row.isEdit">
              <el-input v-model="scope.row.financeRepaymentRemark" autofocus="autofocus" @keyup.enter.native="modifyRemark(scope.row)"></el-input>
            </template>
            <template v-else>
              <div @click="scope.row.isEdit=true">{{scope.row.financeRepaymentRemark}}&nbsp</div>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="100">
          <template scope="scope">
            <template v-if="scope.row.creditType == 2">
              <el-button size="mini" type="primary" :disabled="!!scope.row.hasUpLine" @click.native="showCallbackDialog(scope.row)">紧急回调</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-content">
      <Pagination :page="pagination.pageNumber" :total="pagination.totalCount" :options="requestParams" :render="getData"></Pagination>
    </div>
    <el-dialog size="tiny" title="紧急回调" v-model="callbackDialogVisible">
      <p class="warn-msg">请确认徙木已回调额度，一旦提交则立即生效，客户可使用徙木额度(慎用！！)</p>
      <footer style="margin-top: 35px">
        <el-button size="small" @click.native="callbackDialogVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click.native="confirmCallback">确认</el-button>
      </footer>
    </el-dialog>
  </section>
</template>
<script>
import HeadFilters from 'components/headFilter/HeadFilter'
import Tabs from 'components/repaymentTabs.vue'
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
      callbackDialogVisible: false,
      dialogData: {},
      requestParams: {
        loanStatus: '',
        payStatus: '',
        serviceNumber: '',
        outReposityNumber: '',
        buyerCompany: '',
        buyerNumber: '',
        followerName: '',
        hadRepaymentMoney: '',
        financeConfirmRepaymentTimeBegin: '',
        financeConfirmRepaymentTimeEnd: '',
        pageSize: 20,
        pageNumber: 1
      },
      totalUsedMoney: 0,
      totalFactoringMoney: 0,
      totalLateFeesMoney: 0,
      totalHadRepaymentMoney: 0,
      tableHeight: 500,
      pageLoading: false,
      tableData: [],
      pagination: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 20
      },
    }
  },
  mounted() {
    this.tableHeight = String(document.body.clientHeight - 402);
    this.getData()
  },
  methods: {
    // 待定
    confirmCallback() {
      newRequest({
        url: '/redwood/repayment/emergentUpLine',
        data: {
          id: this.dialogData.id,
        },
        contentType: 'application/json',
        method: 'post'
      }).then(res => {
        if (res.success == 1) {
          this.$message.success(res.msg)
          this.callbackDialogVisible = false
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    showCallbackDialog(item) {
      this.dialogData = item
      this.callbackDialogVisible = true
    },
    getFilter(params) {
      this.requestParams = Object.assign({
        pageNumber: 1,
        pageSize: 20,
      }, params)
      if (!params.totalMoney) {
        delete this.requestParams.totalMoney
      }
      if (isNaN(params.createTimeBegin)) {
        delete this.requestParams.createTimeBegin
      }
      if (isNaN(params.createTimeEnd)) {
        delete this.requestParams.createTimeEnd
      }
      if (params.createTimeBegin) {
        this.requestParams.financeConfirmRepaymentTimeBegin = new Date(params.createTimeBegin).getTime()
      }
      if (params.createTimeEnd) {
        this.requestParams.financeConfirmRepaymentTimeEnd = new Date(params.createTimeEnd).getTime()
      }
      delete params.totalMoney
      if (this.requestParams.orderNumber) {
        this.requestParams.serviceNumber = this.requestParams.orderNumber
      } else {
        this.requestParams.serviceNumber = ''
      }
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
      if (this.requestParams.financeConfirmRepaymentTimeBegin != '' && this.requestParams.financeConfirmRepaymentTimeEnd != '') {
        if (this.requestParams.financeConfirmRepaymentTimeBegin instanceof Date) {
          var timeBegin = Date.parse(this.requestParams.financeConfirmRepaymentTimeBegin)
          this.requestParams.financeConfirmRepaymentTimeBegin = timeBegin
        }
        if (this.requestParams.financeConfirmRepaymentTimeEnd instanceof Date) {
          var timeEnd = Date.parse(this.requestParams.financeConfirmRepaymentTimeEnd)
          this.requestParams.financeConfirmRepaymentTimeEnd = timeEnd
        }
        this.getData()
        // console.log(this.requestParams.financeConfirmRepaymentTimeBegin)
        // console.log(this.requestParams.financeConfirmRepaymentTimeEnd)
      } else if (this.requestParams.financeConfirmRepaymentTimeBegin != '' && this.requestParams.financeConfirmRepaymentTimeEnd == '' ||
        this.requestParams.financeConfirmRepaymentTimeBegin == '' && this.requestParams.financeConfirmRepaymentTimeEnd != '') {
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
      if (!params.totalMoney) {
        delete this.requestParams.totalMoney
      }
      if (params.createTimeBegin) {
        this.requestParams.financeConfirmRepaymentTimeBegin = new Date(params.createTimeBegin).getTime()
      }
      if (params.createTimeEnd) {
        this.requestParams.financeConfirmRepaymentTimeEnd = new Date(params.createTimeEnd).getTime()
      }
      delete params.totalMoney
      if (this.requestParams.orderNumber) {
        this.requestParams.serviceNumber = this.requestParams.orderNumber
      } else {
        this.requestParams.serviceNumber = ''
      }
      if (this.requestParams.salesName) {
        this.requestParams.followerName = this.requestParams.salesName
      }
      if (this.requestParams.customerCompany) {
        this.requestParams.buyerCompany = this.requestParams.customerCompany
      } else {
        this.requestParams.buyerCompany = ''
      }
      newRequest({
        url: '/redwood/repayment/exportDone',
        method: 'get',
        data: this.requestParams
      }).then((response) => {
        this.pageLoading = false
        if (response.success === '1') {
          console.log(response.obj)
          window.open('http://www.soouya.com/' + response.obj)
        } else {
          this.$message.error(response.msg);
        }
      })
    },
    modifyRemark(data) {
      // console.log(data)
      newRequest({
        url: '/redwood/repayment/updateFinanceRepaymentRemark',
        method: 'post',
        contentType: 'application/json',
        data: { id: data.id, financeRepaymentRemark: data.financeRepaymentRemark }
      }).then((response) => {
        if (response.success == '1') {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          data.isEdit = false
        } else {
          this.$message.error(response.msg)
        }
      })
    },
    getData(params = {}) {
      this.requestParams = Object.assign(this.requestParams, params)
      this.pageLoading = true
      newRequest({
        url: '/redwood/repayment/listDone',
        method: 'get',
        data: this.requestParams
      }).then((response) => {
        // console.log(response)
        this.pageLoading = false
        if (response.success == '1') {
          response.page.result.forEach((item) => {
            item.isEdit = false
          })
          this.pagination.pageNumber = response.page.pageNumber
          this.pagination.pageSize = response.page.pageSize
          this.pagination.totalCount = response.page.totalCount
          this.tableData = response.page.result
          this.totalUsedMoney = response.totalUsedMoney
          this.totalFactoringMoney = response.totalFactoringMoney
          this.totalLateFeesMoney = response.totalLateFeesMoney
          this.totalHadRepaymentMoney = response.totalHadRepaymentMoney
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
    formatMoney(row, column) {
      let val = row[column.property]
      if (val) {
        return (parseFloat(val).toFixed(2))
      } else {
        return '0.00'
      }
    }
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

.repayment-total {
  margin: 10px 0px;
  padding-left: 15px;
  span {
    margin-right: 80px;
  }
  strong {
    color: #f00;
  }
}
</style>