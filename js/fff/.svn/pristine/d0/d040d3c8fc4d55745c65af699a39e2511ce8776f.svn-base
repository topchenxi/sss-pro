<template>
  <section v-loading.body="fullscreenLoading">
    <HeadFilter v-on:getParams="getFilter" :param="requestParams">
      <template slot="headFilterSlot" scope="scope">
        <el-col :span="4">
          <p>&nbsp</p>
          <el-button type="primary" @click="showBetchDialog" :disabled="betchCheckData.betchList.length <= 1">批量处理</el-button>
          <el-button type="primary" @click="exportHandle(scope.scope)">导出</el-button>
        </el-col>
      </template>
    </HeadFilter>
    <checkTabs></checkTabs>
    <div style="padding-left: 15px">
      <el-row style="line-height: 40px;margin-top:0px;">
        <el-col :span="4">
          <span>对账金额:
            <span style="color:#f00;font-weight: 600;">{{totalExpectedIncomeMoney | formateNumber}}元</span>
          </span>
        </el-col>
      </el-row>
    </div>
    <el-table :data="tableData" :height="tableHeight" border @selection-change="handleSelectionChange" style="text-align:center">
      <el-table-column type="selection" fixed="left" min-width="50" align="center"></el-table-column>
      <el-table-column label="提交日期" min-width="160" align="left">
        <template scope="scope">
          <div>{{scope.row.createTime | formatTime}}</div>
        </template>
      </el-table-column>
      <el-table-column label="对账单号" prop="number" min-width="160" align="left"></el-table-column>
      <el-table-column label="金融客户" width="100">
        <template scope="scope">
          <span v-if="scope.row.customerHasOpenedBaitiao" class="icon-baitiao"></span>
          <span v-if="!scope.row.customerHasOpenedBaitiao" class="icon-feibaitiao"></span>
          <span v-if="scope.row.customerHasOpenedYanzhen" class="icon-yanzhen"></span>
          <span v-if="!scope.row.customerHasOpenedYanzhen" class="icon-feiyanzhen"></span>
        </template>
      </el-table-column>
      <el-table-column label="采购商" width="160" prop="customerCompany" align="left">
      </el-table-column>
      <el-table-column label="采购商ID" prop="customerNumber" min-width="120" align="left">
      </el-table-column>
      <el-table-column label="销售员" min-width="140" align="left">
        <template scope="scope">
          {{scope.row.salerName + '/' + scope.row.salerTel}}
        </template>
      </el-table-column>
      <el-table-column label="采购员" min-width="140" align="left">
        <template scope="scope">
          {{scope.row.guiderName + '/' + scope.row.guiderTel}}
        </template>
      </el-table-column>
      <el-table-column label="应收金额(元)" prop="" min-width="120" align="right">
        <template scope="scope">
          {{scope.row.totalMoney + scope.row.lateFeesMoney | formateNumber}}
        </template>
      </el-table-column>
      <el-table-column label="客户转账凭据" prop="" min-width="110">
        <template scope="scope">
          <div v-if="scope.row.payCredentialUrls && scope.row.payCredentialUrls.length > 0">
            <a :name="scope.$index" v-bind:data="`商品` + scope.$index" :href="'http://www.soouya.com' + val" v-for="(val,imgIndex) in scope.row.payCredentialUrls" v-lightbox="scope.row.payCredentialUrls">
              <img v-show="imgIndex==0" :src="'http://www.soouya.com' + val + '@60w_60h_90Q'" width="60" height="60" />
            </a>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="客户转账金额(元)" prop="" min-width="160" align="right">
        <template scope="scope">
          {{scope.row.payMoney | formateNumber}}
        </template>
      </el-table-column>
      <el-table-column label="销售备注" prop="remark" min-width="100" align="left" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="对账状态" min-width="100">
        <template scope="scope">
          <span class="forgive-color">{{scope.row.status | statusFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="200" align="left">
        <template scope="scope">
          <el-button type="warning" size="mini" @click.native="showCheckDialog(scope.row)">对账</el-button>
          <el-button type="warning" size="mini" @click.native="showReturnDialog(scope.row)">打回销售</el-button>
          <el-button type="primary" size="mini" @click="jumpMingxi(scope.row.id)">明细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-content">
      <pagination :page="page.pageNumber" :total="page.totalCount" :render="getData" :options="requestParams"></pagination>
    </div>
    <!-- 大会跟单dialog -->
    <el-dialog title="打回销售" v-model="returnDialogVisible" size="tiny" class="check-content">
      <p class="warn-msg">确定是否打回销售。</p>
      <el-form>
        <el-form-item label="备注：">
          <el-input type="textarea" :autosize="{minRows:6, maxRows:6}" v-model="returnDialogData.billCancelRemark" resize="none"></el-input>
          <p v-if="returnDialogData.billCancelRemark" class="remark-font">{{returnDialogData.billCancelRemark.length}}/500</p>
          <p v-else class="remark-font">0/500</p>
        </el-form-item>
      </el-form>
      <footer style="margin-top: 20px;">
        <el-button @click.native="returnDialogVisible = false" size="small">取消</el-button>
        <el-button size="small" @click.native="confirmReturn" type="primary">确定</el-button>
      </footer>
    </el-dialog>
    <!-- 对账dialog -->
    <el-dialog size="tiny" title="对账" v-model="checkAccountDialogVisible">
      <p class="warn-msg">一旦确认提交，将不可修改。</p>
      <el-form label-width="120px" label-position="right">
        <el-form-item label="到账日期：" required>
          <el-date-picker class="width200" v-model="reqCheckParams.totalIncomeTime" @change="handleTimeChange" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>
        </el-form-item>
        <el-form-item label="财务备注：">
          <el-input class="width200" v-model="reqCheckParams.totalFinanceRemark"></el-input>
        </el-form-item>
        <el-form-item label="支用额度：">
          <span class="red-color">{{reqCheckParams.totalNeedPayMoney}}元</span>
        </el-form-item>
        <el-form-item label="扣数金额：">
          <span class="red-color">{{reqCheckParams.totalKoushuMoney}}元</span>
        </el-form-item>
        <el-form-item label="实收滞纳金：">
          <el-input class="width200" @focus="showEditDialog" v-model="reqCheckParams.totalLateFeesMoney"></el-input>元
        </el-form-item>
        <el-form-item label="实收金额：">
          <el-input class="width200" @focus="showEditDialog" v-model="reqCheckParams.totalIncomeMoney"></el-input>
        </el-form-item>
        <el-form-item label="可用余额：">
          <span>{{reqCheckParams.availableBalance | formateNumber}}</span>
          <template v-if="reqCheckParams.availableBalance < reqCheckParams.totalIncomeMoney">
            <span class="red-color">(余额不足)</span>
          </template>
        </el-form-item>
      </el-form>
      <footer>
        <el-button size="small" @click.native="checkAccountDialogVisible = false">取消</el-button>
        <template v-if="reqCheckParams.availableBalance < reqCheckParams.totalIncomeMoney">
          <el-button size="small" type="primary" @click.native="toAdjust">预存</el-button>
        </template>
        <template v-else>
          <el-button size="small" type="primary" :disabled="!reqCheckParams.totalIncomeTime" @click.native="confirmCheckAccount">确定</el-button>
        </template>
      </footer>
    </el-dialog>
    <!-- 修改滞纳金dialog -->
    <el-dialog :title="reqCheckParams.list.length > 1 ? '批量修改滞纳金' : '修改滞纳金'" v-model="editDialogVisible">
      <el-table :data="lateDialogData" border height="450">
        <el-table-column label="订单号" prop="serviceNumber"></el-table-column>
        <el-table-column label="出仓单号" prop="outReposityNumber"></el-table-column>
        <el-table-column label="采购商" prop="customerCompany"></el-table-column>
        <el-table-column label="滞纳金/元">
          <template scope="scope">
            <el-input @change="handleLateChange(scope.row)" :disabled="scope.row.category=='buttonNumber'" min="0" v-model="scope.row.lateFeesMoney"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="实收款/元">
          <template scope="scope">
            <el-input min="0" v-model="scope.row.incomeMoney"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <footer style="margin-top: 25px;">
        <el-button @click.native="editDialogVisible = false">取消</el-button>
        <el-button @click.native="confirmEditMoney" type="primary">确认</el-button>
      </footer>
    </el-dialog>
    <lightbox></lightbox>
  </section>
</template>

<script>
import HeadFilter from 'components/headFilter/HeadFilter'
import pagination from 'components/pagination'
import checkTabs from 'components/checkTabs'
import Lightbox from 'components/lightbox/lightbox'
import {
  // getCache,
  // setCache,
  newRequest,
  formatTimeString
} from 'common/utils'
export default {
  components: {
    HeadFilter,
    pagination,
    checkTabs,
    Lightbox
  },
  data() {
    return {
      fullscreenLoading: false,
      exceptionDialogVisible: false,
      tableHeight: 600,
      checkAccountDialogVisible: false,
      returnDialogVisible: false,
      returnDialogData: {},
      editDialogVisible: false,
      betchCheckData: {
        betchList: [],
        customerList: [],
      },
      lateDialogData: [],
      waitHandleData: [],
      reqCheckParams: {
        totalLateFeesMoney: '',
        totalNeedPayMoney: '',
        totalIncomeMoney: '',
        totalKoushuMoney: '',
        totalFinanceRemark: '',
        totalIncomeTime: '',
        availableBalance: '',
        customerId: '',
        type: 1,
        list: [],
      },
      tableData: [],
      totalExpectedIncomeMoney: null,
      reqExceptionParams: {
        id: '',
        exceptionMsg: '',
      },
      requestParams: {
        pageNumber: 1,
        pageSize: 20,
        status: 0, // 待对账的状态
        export: 0,
      },
      page: {
        pageNumber: 1,
        totalCount: 20,
        pageSize: 20
      },
      pickerOptions0: {
        disabledDate(time) {
          return Date.now() < Date.parse(new Date(time))
        }
      },
    }
  },
  filters: {
    formatTime(val) {
      return Number(val) > 0 ? formatTimeString(val) : '--'
    },
    statusFilter(val) {
      switch (val) {
        case 0: return '待对账'
        case 1: return '已对账'
      }
    }
  },
  mounted() {
    this.tableHeight = String(window.document.body.clientHeight - 402)
    if (sessionStorage.getItem('checkAccount')) {
      let obj = JSON.parse(sessionStorage.getItem('checkAccount'))
      if (obj.flag) {
        this.requestParams = obj.requestParams
        sessionStorage.removeItem('checkAccount')
      }
    }
    this.getData()
  },
  methods: {
    getData() {
      this.fullscreenLoading = true
      this.getSumary()
      newRequest({
        url: '/redwood/bill',
        data: this.requestParams,
        method: 'get',
      }).then(res => {
        if (res.success == 1) {
          res.page.result.map(item => {
            item.isEdit = false
          })
          this.page.pageNumber = res.page.pageNumber
          this.page.pageSize = res.page.pageSize
          this.page.totalCount = res.page.totalCount
          this.tableData = res.page.result
        } else {
          this.$message.error(res.msg)
        }
        this.fullscreenLoading = false
      })
    },
    getSumary() {
      newRequest({
        url: '/redwood/count/bill',
        data: this.requestParams,
        method: 'get'
      }).then(res => {
        if (res.success == 1) {
          this.totalExpectedIncomeMoney = res.obj
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    confirmEditRemark(item) {
      newRequest({
        url: '/redwood/reconciliation/updateFinanceRemark',
        data: {
          id: item.id,
          financeRemark: item.financeRemark,
        },
        method: 'post',
        contentType: 'application/json'
      }).then(res => {
        if (res.success == 1) {
          item.isEdit = false
          this.$message.success(res.msg)
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    confirmCheckAccount() {
      this.reqCheckParams.list.forEach(item => {
        item.financeRemark = this.reqCheckParams.totalFinanceRemark
        item.incomeTime = new Date(this.reqCheckParams.totalIncomeTime).getTime()
      })
      newRequest({
        data: this.reqCheckParams,
        url: '/redwood/reconciliation/batchConfirmIncome',
        method: 'post',
        contentType: 'application/json'
      }).then(res => {
        if (res.success == 1) {
          this.$message.success(res.msg)
          this.checkAccountDialogVisible = false
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    showBetchDialog() {
      this.betchCheckData.customerList = Array.from(new Set(this.betchCheckData.customerList))
      console.log(this.betchCheckData.customerList)
      if (this.betchCheckData.customerList.length > 1) {
        this.$message('请选择同一个采购商进行批量对账')
      } else {
        this.reqCheckParams.customerId = this.betchCheckData.customerList[0]
        this.waitHandleData = this.betchCheckData.betchList
        this.getAvailableBalance()
        this.calcWait()
        this.checkAccountDialogVisible = true
      }
    },
    handleSelectionChange(items) {
      this.betchCheckData.betchList = []
      this.betchCheckData.customerList = []
      if (items) {
        items.map(item => {
          let obj = {
            lateFeesMoney: item.lateFeesMoney,
            totalMoney: item.totalMoney,
            kouShuMoney: item.kouShuMoney,
            incomeMoney: Number(item.lateFeesMoney) + Number(item.totalMoney) + Number(item.lateFeesMoney),
            billId: item.id,
          }
          this.betchCheckData.betchList.push(obj)
          this.betchCheckData.customerList.push(item.customerId)
        })
      }
      console.log(this.betchCheckData.customerList)
    },
    getAvailableBalance() {
      this.fullscreenLoading = true
      newRequest({
        url: '/redwood/account/CustomerAccount/getById',
        data: {
          id: this.reqCheckParams.customerId
        },
        method: 'get'
      }).then(res => {
        if (res.success == 1) {
          this.reqCheckParams.availableBalance = res.obj.availableBalance
          this.fullscreenLoading = false
          this.checkAccountDialogVisible = true
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    showCheckDialog(item) {
      this.reqCheckParams.customerId = item.customerId
      this.waitHandleData = []
      let obj = {
        lateFeesMoney: item.lateFeesMoney,
        totalMoney: item.totalMoney,
        kouShuMoney: item.kouShuMoney,
        incomeMoney: Number(item.lateFeesMoney) + Number(item.totalMoney) + Number(item.lateFeesMoney),
        billId: item.id,
      }
      this.waitHandleData.push(obj)
      this.getAvailableBalance()
      this.calcWait()
      this.checkAccountDialogVisible = true
    },
    calcWait() {
      this.getOrderList()
      this.reqCheckParams.totalIncomeTime = ''
      this.reqCheckParams.totalLateFeesMoney = 0
      this.reqCheckParams.totalNeedPayMoney = 0
      this.reqCheckParams.totalIncomeMoney = 0
      this.reqCheckParams.totalKoushuMoney = 0
      this.reqCheckParams.totalFinanceRemark = ''
      this.waitHandleData.forEach(item => {
        this.reqCheckParams.totalLateFeesMoney += Number(item.lateFeesMoney)
        this.reqCheckParams.totalKoushuMoney += Number(item.kouShuMoney)
        this.reqCheckParams.totalNeedPayMoney += Number(item.totalMoney)
      })
      this.reqCheckParams.totalIncomeMoney = Number(this.reqCheckParams.totalLateFeesMoney) + Number(this.reqCheckParams.totalKoushuMoney) + Number(this.reqCheckParams.totalNeedPayMoney)
      this.reqCheckParams.totalLateFeesMoney = Number(this.reqCheckParams.totalLateFeesMoney).toFixed(2)
      this.reqCheckParams.totalKoushuMoney = Number(this.reqCheckParams.totalKoushuMoney).toFixed(2)
      this.reqCheckParams.totalNeedPayMoney = Number(this.reqCheckParams.totalNeedPayMoney).toFixed(2)
    },
    getOrderList() {
      let billIds = ''
      this.reqCheckParams.list = []
      console.log(this.waitHandleData)
      this.waitHandleData.map(item => {
        billIds = billIds + (billIds ? ',' : '') + item.billId
      })
      newRequest({
        url: '/redwood/ziying/cut',
        data: {
          billIds: billIds,
          _function: 'billing',
          listAll: 1
        },
        method: 'get'
      }).then(res => {
        if (res.success == 1) {
          res.page.result.map(item => {
            let obj = {
              billId: item.billId,
              businessId: item.id,
              incomeTime: '',
              financeRemark: '',
              lateFeesMoney: 0,
              totalMoney: item.totalMoney,
              customerCompany: item.customerCompany,
              incomeMoney: 0,
              category: 'cut',
              creditType: item.creditType,
              serviceNumber: item.number,
              outReposityNumber: '--',
              expectedRepaymentTime: item.expectedRepaymentTime
            }
            this.reqCheckParams.list.push(obj)
            this.calc()
          })
        } else {
          this.$message.error(res.msg)
        }
      })
      newRequest({
        url: '/redwood/repo/out',
        data: {
          billIds: billIds,
          _function: 'billing',
          listAll: 1
        },
        method: 'get'
      }).then(res => {
        if (res.success == 1) {
          res.page.result.map(item => {
            let obj = {
              billId: item.billId,
              businessId: item.id,
              incomeTime: '',
              financeRemark: '',
              lateFeesMoney: item.isOutRepo == 1 ? item.lateFeesMoney : 0,
              totalMoney: item.totalMoney,
              incomeMoney: 0,
              category: item.isOutRepo == 1 ? 'bulk' : 'buttonNumber',
              creditType: item.creditType,
              customerCompany: item.bulk.customerCompany,
              outReposityNumber: item.number,
              serviceNumber: item.bulk.number,
              expectedRepaymentTime: item.expectedRepaymentTime
            }
            this.reqCheckParams.list.push(obj)
            this.calc()
            // console.log(this.reqCheckParams.list)
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    confirmEditMoney() {
      this.reqCheckParams.list = JSON.parse(JSON.stringify(this.lateDialogData))
      this.calc(true)
      this.editDialogVisible = false
    },
    handleLateChange(item) {
      item.incomeMoney = Number(item.totalMoney) + (item.lateFeesMoney ? Number(item.lateFeesMoney) : 0)
      item.incomeMoney = Number(item.incomeMoney).toFixed(2)
    },
    showEditDialog() {
      this.calc(true)
      this.lateDialogData = JSON.parse(JSON.stringify(this.reqCheckParams.list))
      this.editDialogVisible = true
    },
    handleTimeChange(val) {
      const cTime = new Date(val).getTime()
      // setCache({
      //   key: 'checkAccountTime',
      //   value: cTime
      // })
      const cY = new Date(cTime).getFullYear()
      const cM = new Date(cTime).getMonth() + 1
      const cD = new Date(cTime).getDate()
      const ct = new Date(cY + '/' + cM + '/' + cD + ' ' + 0 + ':' + 0 + ':' + 0).getTime()
      this.reqCheckParams.list.forEach(item => {
        if (item.category == 'cut') {
          item.lateFeesMoney = 0
        } else if (item.category == 'buttonNumber') {
          item.lateFeesMoney = 0
        } else if (item.category == 'bulk') {
          // test
          // item.expectedRepaymentTime = 1512057600000
          const eTime = new Date(item.expectedRepaymentTime).getTime()
          const eY = new Date(eTime).getFullYear()
          const eM = new Date(eTime).getMonth() + 1
          const eD = new Date(eTime).getDate()
          const et = new Date(eY + '/' + eM + '/' + eD + ' ' + 0 + ':' + 0 + ':' + 0).getTime()
          // console.log(ct, et, eTime)
          let subT = parseInt((ct - et) / 3600 / 1000 / 24)
          if (subT <= 0 || !val) {
            subT = 0
          }
          console.log('subt', subT)
          if ((item.creditType == 1 || item.creditType == 2) && subT > 0) {
            item.lateFeesMoney = Number(item.totalMoney) * 0.18 * 1.5 * (subT) / 360
          } else if (item.creditType == 4) {
            // 雁阵额度付款方式
            item.lateFeesMoney = Number(item.totalMoney) * 0.066 / 100 * subT
          } else {
            item.lateFeesMoney = 0
          }
        }
      })
      this.calc()
    },
    calc(isEdit = false) {
      this.reqCheckParams.totalLateFeesMoney = 0
      this.reqCheckParams.totalNeedPayMoney = 0
      this.reqCheckParams.totalKoushuMoney = 0
      this.reqCheckParams.totalIncomeMoney = 0
      this.reqCheckParams.list.forEach(item => {
        if (!isEdit) {
          item.incomeMoney = Number(item.totalMoney) + Number(item.lateFeesMoney)
        }
        this.reqCheckParams.totalLateFeesMoney += Number(item.lateFeesMoney)
        this.reqCheckParams.totalNeedPayMoney += (item.category == 'bulk' || item.category == 'cut') ? Number(item.totalMoney) : 0
        this.reqCheckParams.totalKoushuMoney += item.category == 'buttonNumber' ? Number(item.totalMoney) : 0
        this.reqCheckParams.totalIncomeMoney += Number(item.incomeMoney)
        item.lateFeesMoney = Number(item.lateFeesMoney).toFixed(2)
        item.incomeMoney = Number(item.incomeMoney).toFixed(2)
        item.totalMoney = Number(item.totalMoney).toFixed(2)
      })
      this.reqCheckParams.totalIncomeMoney = Number(this.reqCheckParams.totalIncomeMoney).toFixed(2)
      this.reqCheckParams.totalLateFeesMoney = Number(this.reqCheckParams.totalLateFeesMoney).toFixed(2)
      this.reqCheckParams.totalKoushuMoney = Number(this.reqCheckParams.totalKoushuMoney).toFixed(2)
    },
    exportHandle(params) {
      this.fullscreenLoading = true
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
        status: 0,
        export: 1
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
        url: '/redwood/bill',
        method: 'get',
        data: this.requestParams
      }).then((response) => {
        this.fullscreenLoading = false
        if (response.success == '1') {
          window.open(response.obj)
        } else {
          this.$message.error(response.msg)
        }
        this.fullscreenLoading = false
      })
    },
    toAdjust() { // 去调整额度
      this.checkAccountDialogVisible = false
      // console.log(id)
      window.open(`/finance/moneyManage/moneyManageDetail?id=${this.reqCheckParams.customerId}`)
    },
    getFilter(params) {
      if (isNaN(params.createTimeBegin)) {
        delete params.createTimeBegin
      }
      if (isNaN(params.createTimeEnd)) {
        delete params.createTimeEnd
      }
      this.requestParams = Object.assign({
        pageNumber: 1,
        pageSize: 20,
        status: 0,
        export: 0
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
      }
      if (!this.requestParams.createTimeEnd) {
        delete this.requestParams.createTimeEnd
      }
      if (this.requestParams.buyerHasOpenedBaitiao == 0 || this.requestParams.buyerHasOpenedBaitiao) {
        this.requestParams.hasOpenedBaitiao = this.requestParams.buyerHasOpenedBaitiao
      }
      this.requestParams.pageNumber = 1
      this.getData()
    },
    showReturnDialog(data) {
      this.returnDialogVisible = true
      this.returnDialogData = data
      this.$set(this.returnDialogData, 'billCancelRemark', '')
    },
    confirmReturn() {
      newRequest({
        url: `/redwood/bill/${this.returnDialogData.id}?billCancelRemark=${this.returnDialogData.billCancelRemark}`,
        method: 'delete',
      }).then(res => {
        if (res.success == 1) {
          this.$message.success(res.msg)
          this.returnDialogVisible = false
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    jumpMingxi(id) {
      this.$router.push({ name: 'checkAccountMingxi', query: { id: id, checkStatus: 0 } })
      sessionStorage.removeItem('checkAccount')
      var obj = {}
      obj.requestParams = this.requestParams
      obj.flag = false
      sessionStorage.setItem('checkAccount', JSON.stringify(obj))
    },
  }
}
</script>

<style lang="scss" scoped>
.el-table {
  text-align: center;
  .el-button {
    margin: 2px;
  }
}

.el-row {
  .el-col {
    min-width: 180px;
  }
}

.check-content {
  .el-form-item {
    margin: 15px;
    .el-form-item__content {
      // margin-top: 12px;
    }
  }
}
.width200 {
  width: 200px;
}
</style>
