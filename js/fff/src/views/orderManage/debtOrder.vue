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
    <div style="padding-left: 15px">
      <el-row style="line-height: 40px;margin-top:0px;">
        <el-col :span="4">
          <span>待对账金额:
            <span style="color:#f00;font-weight: 600;">{{totalData.totalExpectedIncomeMoney | formateNumber}}元</span>
          </span>
        </el-col>
        <el-col :span="4">
          <span>已用搜芽额度:
            <span style="color:#f00;font-weight: 600;">{{totalData.totalSoouyaUsedMoney | formateNumber}}元</span>
          </span>
        </el-col>
        <el-col :span="4">
          <span>已用徙木额度:
            <span style="color:#f00;font-weight: 600;">{{totalData.totalBaitiaoUsedMoney | formateNumber}}元</span>
          </span>
        </el-col>
        <el-col :span="4">
          <span>已用雁阵额度:
            <span style="color:#f00;font-weight: 600;">{{totalData.totalYanzhenUsedMoney | formateNumber}}元</span>
          </span>
        </el-col>
        <el-col :span="4">
          <span>滞纳金:
            <span style="color:#f00;font-weight: 600;">{{totalData.totalExpectedLateFeesMoney | formateNumber}}元</span>
          </span>
        </el-col>
      </el-row>
    </div>
    <el-table :data="tableData" :height="tableHeight" border @selection-change="handleSelectionChange" style="text-align:center">
      <el-table-column type="selection" fixed="left" min-width="50"  :selectable="canSelect"></el-table-column>
      <el-table-column label="进入待对账时间" prop="createTime" :formatter="formatTime" min-width="160"></el-table-column>
      <el-table-column label="订单号" prop="serviceNumber" min-width="200"></el-table-column>
      <el-table-column label="出仓单号" prop="" min-width="140">
        <template scope="scope">
          <template v-if="scope.row.category == 'bulk'">{{scope.row.outReposityNumber}}</template>
          <template v-else>--</template>
        </template>
      </el-table-column>
      <el-table-column label="原订单销售货款/元" prop="" min-width="150">
        <template scope="scope">
          <template v-if="scope.row.category == 'shopBulk' || (scope.row.category == 'cut' && scope.row.payAction == 3)">--</template>
          <template v-else>{{scope.row.orderSaleMoney | formateNumber}}</template>
        </template>
      </el-table-column>
      <el-table-column label="采购商税款/元" prop="" min-width="120">
        <template scope="scope">
          <template v-if="scope.row.category == 'shopBulk' || (scope.row.category == 'cut' && scope.row.payAction == 3)">--</template>
          <template v-else>{{scope.row.taxMoney | formateNumber}}</template>
        </template>
      </el-table-column>
      <el-table-column label="服务费/元" prop="" min-width="100">
        <template scope="scope">
          <template v-if="scope.row.category == 'shopBulk' || (scope.row.category == 'cut' && scope.row.payAction == 3)">--</template>
          <template v-else>{{scope.row.serviceMoney | formateNumber}}</template>
        </template>
      </el-table-column>
      <el-table-column label="出仓销售货款/元" prop="" min-width="140">
        <template scope="scope">
          <template v-if="scope.row.category == 'shopBulk' || (scope.row.category == 'cut' && scope.row.payAction == 3)">--</template>
          <template v-else>{{scope.row.saleMoney | formateNumber}}</template>
        </template>
      </el-table-column>
      <el-table-column label="运费/元" prop="" min-width="80">
        <template scope="scope">
          <template v-if="scope.row.category == 'shopBulk' || (scope.row.category == 'cut' && scope.row.payAction == 3)">--</template>
          <template v-else>{{scope.row.freightMoney | formateNumber}}</template>
        </template>
      </el-table-column>
      <el-table-column label="仓库运费/元" prop="" min-width="100">
        <template scope="scope">
          <template v-if="scope.row.category == 'shopBulk' || (scope.row.category == 'cut' && scope.row.payAction == 3)">--</template>
          <template v-else>{{scope.row.freightMoneyNoTax | formateNumber}}</template>
        </template>
      </el-table-column>
      <el-table-column label="应收出仓销售货款/元" prop="" min-width="150">
        <template scope="scope">
          <template v-if="scope.row.category == 'shopBulk' || (scope.row.category == 'cut' && scope.row.payAction == 3)">--</template>
          <template v-else>{{scope.row.needSaleMoney | formateNumber}}</template>
        </template>
      </el-table-column>
      <el-table-column label="支用额度/元" prop="" min-width="120">
        <template scope="scope">
          <template v-if="scope.row.payAction == 3 && scope.row.category == 'cut'">--</template>
          <template v-else>{{scope.row.usedMoney | formateNumber}}</template>
        </template>
      </el-table-column>
      <el-table-column label="应收滞纳金/元" prop="expectedLateFeesMoney" :formatter="formatNumber" min-width="120"></el-table-column>
      <el-table-column label="应收款/元" prop="expectedIncomeMoney" :formatter="formatNumber" min-width="100"></el-table-column>
      <el-table-column label="支付方式" min-width="100">
        <template scope="scope">
          <template v-if="scope.row.payAction != 3 && scope.row.creditType == 1">搜芽额度</template>
          <template v-if="scope.row.payAction != 3 && scope.row.creditType == 2">徙木额度</template>
          <template v-if="scope.row.payAction != 3 && scope.row.creditType == 3">余额</template>
          <template v-if="scope.row.payAction != 3 && scope.row.creditType == 4">雁阵额度</template>
          <template v-if="scope.row.category == 'cut' && scope.row.payAction == 3">--</template>
        </template>
      </el-table-column>
      <el-table-column label="到期还款日" prop="" min-width="120">
        <template scope="scope">
          <template v-if="(scope.row.category == 'cut' && scope.row.payAction == 3) || scope.row.creditType == 3">--</template>
          <template v-else>{{scope.row.expectedRepaymentTime | formatDate}}</template>
        </template>
      </el-table-column>
      <el-table-column label="订单类型" min-width="100">
        <template scope="scope">
          <template v-if="scope.row.category == 'cut'">剪版
            <template v-if="scope.row.payAction == 3">(取消)</template>
          </template>
          <template v-if="scope.row.category == 'bulk'">大货</template>
          <template v-if="scope.row.category == 'shopBulk'">第三方订单</template>
        </template>
      </el-table-column>
      <el-table-column label="金融客户" min-width="100">
        <template scope="scope">
          <template v-if="scope.row.hasOpenedBaitiao == 0">
            <span class="icon-feibaitiao"></span>
          </template>
          <template v-if="scope.row.hasOpenedBaitiao == 1">
            <span class="icon-baitiao"></span>
          </template>
          <template v-if="scope.row.hasOpenedYanzhen == 0">
            <span class="icon-feiyanzhen"></span>
          </template>
          <template v-if="scope.row.hasOpenedYanzhen == 1">
            <span class="icon-yanzhen"></span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="是否还款给徙木/雁阵" min-width="180">
        <template scope="scope">
          <template v-if="scope.row.category == 'cut'">--</template>
          <template v-else>
            <template v-if="scope.row.hasOpenedBaitiao == 0 && scope.row.hasOpenedYanzhen == 0">--</template>
            <template v-else>
              <template v-if="scope.row.creditType == 3">--</template>
              <template v-if="scope.row.creditType == 1">--</template>
              <template v-if="scope.row.repaymentStatus == 0">否</template>
              <template v-if="scope.row.repaymentStatus == 1">是</template>
            </template>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="采购商" prop="customerCompany" min-width="120"></el-table-column>
      <el-table-column label="采购商ID" prop="customerNumber" min-width="120"></el-table-column>
      <el-table-column label="销售员" min-width="120">
        <template scope="scope">
          <template v-if="scope.row.category == 'shopBulk'">--</template>
          <template v-else>{{scope.row.salesName}}/ {{scope.row.salesTel}}</template>
        </template>
      </el-table-column>
      <el-table-column label="采购员" min-width="120">
        <template scope="scope">
          <template v-if="scope.row.category == 'shopBulk'">--</template>
          <template v-else>{{scope.row.guiderName}}/{{scope.row.guiderTel}}</template>
        </template>
      </el-table-column>
      <el-table-column label="对账状态" prop="status" min-width="100">
        <template scope="scope">
          <template v-if="scope.row.status == 1">
            <span class="forgive-color">待对账</span>
          </template>
          <template v-if="scope.row.status == 2">
            <span class="forgive-color">已对账</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="对账备注" min-width="150">
        <template scope="scope">
          <template v-if="!scope.row.isEdit">
            <div @click="scope.row.isEdit = true">&nbsp;{{scope.row.financeRemark}}</div>
          </template>
          <template v-else>
            <el-input v-model="scope.row.financeRemark" @keyup.enter.native="confirmEditRemark(scope.row)"></el-input>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="180">
        <template scope="scope">
          <el-button type="warning" size="mini" @click.native="showCheckDialog(scope.row)" :disabled="scope.row.billId != ''">对账</el-button>
          <template v-if="scope.row.exceptionMsg">
            <el-tooltip class="item" effect="dark" :content="scope.row.exceptionMsg" placement="top-start">
              <span style="color:#fff;background-color:#2FB468;padding:3px 5px;border-radius:5px;cursor:pointer" @click="showExceptionDialog(scope.row)">异常</span>
            </el-tooltip>
          </template>
          <template v-else>
            <!-- <el-button type="primary" size="mini" @click.native="showExceptionDialog(scope.row)">异常</el-button> -->
          </template>
          <template v-if="scope.row.category != 'shopBulk'">
            <router-link :to="{name: 'checkAccountDetail', query: {id: scope.row.businessId}}">
              <el-button type="primary" size="mini">详情</el-button>
            </router-link>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-content">
      <pagination :page="page.pageNumber" :total="page.totalCount" :render="getData" :options="requestParams"></pagination>
    </div>
    <!-- 异常dialog -->
    <el-dialog v-model="exceptionDialogVisible" size="tiny" title="异常">
      <el-form label-position="right">
        <el-form-item label="异常">
          <el-input style="" type="textarea" :autosize="{ minRows: 6, maxRows: 6 }" resize="none" v-model="reqExceptionParams.exceptionMsg"></el-input>
          <p v-if="reqExceptionParams.exceptionMsg" class="remark-font">{{reqExceptionParams.exceptionMsg.length}}/500</p>
          <p v-else class="remark-font">0/500</p>
        </el-form-item>
      </el-form>
      <footer style="margin-top: 35px">
        <el-button size="small" @click.native="exceptionDialogVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click.native="confirmEditException">确定</el-button>
      </footer>
    </el-dialog>
    <!-- 对账dialog -->
    <el-dialog :title="reqCheckParams.reqCheckList.length > 1 ? '批量对账' : '确认对账'" v-model="checkDialogVisible" size="tiny" class="check-content">
      <p class="warn-msg">一旦确认提交,将不可修改.</p>
      <el-form label-position="right" label-width="100">
        <el-form-item required label="到账日期:">
          <el-date-picker v-model="reqCheckParams.incomeTime" @change="handleTimeChange" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="支用额度:">
          <span style="color:#f00;">{{reqCheckParams.usedMoney | formatMoney}}元</span>
        </el-form-item>
        <el-form-item label="实收滞纳金:">
          <el-input @focus="showLateDialog" style="width:inherit" v-model="reqCheckParams.lateFeesMoney"></el-input>
          <span style="color:#f00">元</span>
        </el-form-item>
        <el-form-item label="实收款:">
          <template v-if="reqCheckParams.reqCheckList.length > 1">
            <span style="color:#f00">{{reqCheckParams.incomeMoney | formateNumber}}元</span>
          </template>
          <template v-else>
            <el-input style="width:inherit" v-model="reqCheckParams.incomeMoney" @change="handleEditIncomeMoney"></el-input>
            <span style="color: #f00">元</span>
          </template>
        </el-form-item>
        <el-form-item label="可用余额:">{{reqCheckParams.availableBalance}}元
          <span v-if="reqCheckParams.incomeMoney > reqCheckParams.availableBalance" style="color:#f00">(余额不足)</span>
        </el-form-item>
        <el-form-item label="对账备注:" style="text-align:right">
          <el-input v-model="reqCheckParams.financeRemark" :autosize="{minRows: 6, maxRows: 6 }" resize="none" type="textarea"></el-input>
          <p v-if="reqCheckParams.financeRemark" class="remark-font">{{reqCheckParams.financeRemark.length}}/500</p>
          <p v-else class="remark-font">0/500</p>
        </el-form-item>
      </el-form>
      <footer>
        <el-button @click.native="checkDialogVisible = false" size="mini">取消</el-button>
        <template v-if="reqCheckParams.incomeMoney > reqCheckParams.availableBalance">
          <el-button @click.native="toAdjust" size="small" type="primary">预存</el-button>
        </template>
        <template v-else>
          <el-button @click.native="confirmCheckAccount" :disabled="!reqCheckParams.incomeTime || !reqCheckParams.incomeMoney || reqCheckParams.lateFeesMoney < 0" size="small" type="primary">确定</el-button>
        </template>
      </footer>
    </el-dialog>
    <!-- 修改滞纳金dialog -->
    <el-dialog :title="reqCheckParams.reqCheckList.length > 1 ? '批量修改滞纳金' : '修改滞纳金'" v-model="lateDialogVisible">
      <el-table :data="lateDialogData" border height="450">
        <el-table-column label="订单号" prop="serviceNumber"></el-table-column>
        <el-table-column label="出仓单号" prop="outReposityNumber"></el-table-column>
        <el-table-column label="采购商" prop="customerCompany"></el-table-column>
        <el-table-column label="滞纳金/元">
          <template scope="scope">
            <el-input min="0" v-model="scope.row.lateFeesMoney" type="number"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <footer>
        <el-button @click.native="lateDialogVisible = false">取消</el-button>
        <el-button @click.native="confirmEditLate" type="primary">确认</el-button>
      </footer>
    </el-dialog>
  </section>
</template>

<script>
    /* 页面是直接把之前对账页面的待对账页面直接搬过来里面接口逻辑全部没动，所有命名什么的会有问题，需要动的时候以后再动 */
import HeadFilter from 'components/headFilter/HeadFilter'
import pagination from 'components/pagination'
import {
  getCache,
  setCache,
  newRequest
} from 'common/utils'
export default {
  components: {
    HeadFilter,
    pagination
  },
  data() {
    return {
      fullscreenLoading: false,
      exceptionDialogVisible: false,
      tableHeight: 600,
      checkDialogVisible: false,
      lateDialogVisible: false,
      betchCheckData: {
        betchList: [],
        customerList: [],
        categoryList: [],
      },
      lateDialogData: [],
      reqCheckParams: {
        reqCheckList: [],
        incomeTime: '',
        incomeMoney: '',
        financeRemark: '',
        lateFeesMoney: '',
      },
      tableData: [],
      totalData: {},
      reqExceptionParams: {
        id: '',
        exceptionMsg: '',
      },
      requestParams: {
        pageNumber: 1,
        pageSize: 20,
        status: 1, // 待对账状态
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
  mounted() {
    this.tableHeight = String(window.document.body.clientHeight - 425)
    this.getData()
  },
  methods: {
    getData() {
      this.fullscreenLoading = true
      this.getSumary()
      newRequest({
        url: '/redwood/reconciliation/list',
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
        url: '/redwood/reconciliation/getSumary',
        data: this.requestParams,
        method: 'get'
      }).then(res => {
        if (res.success == 1) {
          this.totalData = res.obj
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    canSelect(row, index) {
      return row.billId === ''
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
      this.fullscreenLoading = true
      this.reqCheckParams.reqCheckList.forEach(item => {
        item.incomeTime = new Date(this.reqCheckParams.incomeTime).getTime()
        item.financeRemark = this.reqCheckParams.financeRemark
      })
      newRequest({
        url: '/redwood/reconciliation/batchConfirmIncome',
        data: {
          list: this.reqCheckParams.reqCheckList,
          type: 2
        },
        method: 'post',
        contentType: 'application/json'
      }).then(res => {
        if (res.success == 1) {
          this.$message.success(res.msg)
          this.checkDialogVisible = false
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
        this.fullscreenLoading = false
      })
    },
    showBetchDialog() {
      this.betchCheckData.customerList = Array.from(new Set(this.betchCheckData.customerList))
      this.betchCheckData.categoryList = Array.from(new Set(this.betchCheckData.categoryList))
      if (this.betchCheckData.customerList.length > 1) {
        this.$message('请选择相同采购商')
      } else if (this.betchCheckData.categoryList.length > 1) {
        this.$message('请选择相同订单类型')
      } else {
        this.reqCheckParams.category = this.betchCheckData.categoryList[0]
        this.reqCheckParams.reqCheckList = JSON.parse(JSON.stringify(this.betchCheckData.betchList))
        let checkAccountTime = getCache({
          key: 'checkAccountTime'
        })
        if (!checkAccountTime) {
          checkAccountTime = ''
        } else {
          this.handleTimeChange(checkAccountTime)
        }
        this.reqCheckParams.customerId = this.betchCheckData.customerList[0]
        this.reqCheckParams.usedMoney = 0
        this.reqCheckParams.lateFeesMoney = 0
        this.reqCheckParams.financeRemark = ''
        this.reqCheckParams.reqCheckList.forEach(item => {
          this.reqCheckParams.usedMoney += Number(item.usedMoney)
          this.reqCheckParams.lateFeesMoney += Number(item.lateFeesMoney)
        })
        this.reqCheckParams.lateFeesMoney = Number(this.reqCheckParams.lateFeesMoney).toFixed(2)
        this.reqCheckParams.incomeMoney = (Number(this.reqCheckParams.usedMoney) + Number(this.reqCheckParams.lateFeesMoney)).toFixed(2)
        this.reqCheckParams.incomeTime = checkAccountTime
        this.getAvailableBalance()
      }
    },
    handleSelectionChange(val) {
      this.betchCheckData.betchList = []
      this.betchCheckData.customerList = []
      this.betchCheckData.categoryList = []
      if (Array.isArray(val)) {
        val.forEach(item => {
          let obj = {
            id: item.id,
            incomeTime: '',
            financeRemark: '',
            lateFeesMoney: '',
            incomeMoney: '',
            createTime: item.createTime,
            usedMoney: item.usedMoney,
            serviceNumber: item.serviceNumber,
            outReposityNumber: item.outReposityNumber,
            customerCompany: item.customerCompany,
            expectedRepaymentTime: item.expectedRepaymentTime,
            category: item.category,
            payAction: item.payAction,
            creditType: item.creditType,
            businessId: item.businessId
          }
          this.betchCheckData.betchList.push(obj)
          this.betchCheckData.customerList.push(item.customerId)
          this.betchCheckData.categoryList.push(item.category)
        })
      }
    },
    getAvailableBalance() {
      newRequest({
        url: '/redwood/account/CustomerAccount/getById',
        data: {
          id: this.reqCheckParams.customerId,
        },
        method: 'get'
      }).then(res => {
        if (res.success == 1) {
          this.reqCheckParams.availableBalance = res.obj.availableBalance
          this.reqCheckParams.hasOpenedBaitiao = res.obj.hasOpenedBaitiao
        }
        this.checkDialogVisible = true
      })
    },
    showCheckDialog(item) {
      console.log(item)
      let checkAccountTime = getCache({
        key: 'checkAccountTime'
      })
      this.reqCheckParams.customerId = item.customerId
      this.reqCheckParams.category = item.category
      this.reqCheckParams.usedMoney = item.usedMoney
      this.reqCheckParams.hasOpenedBaitiao = item.hasOpenedBaitiao
      this.reqCheckParams.reqCheckList = []
      this.reqCheckParams.financeRemark = item.financeRemark
      let obj = {
        id: item.id,
        incomeTime: '',
        financeRemark: '',
        lateFeesMoney: '',
        incomeMoney: '',
        createTime: item.createTime,
        usedMoney: item.usedMoney,
        serviceNumber: item.serviceNumber,
        outReposityNumber: item.outReposityNumber,
        customerCompany: item.customerCompany,
        expectedRepaymentTime: item.expectedRepaymentTime,
        category: item.category,
        payAction: item.payAction,
        creditType: item.creditType,
        businessId: item.businessId
      }
      this.reqCheckParams.reqCheckList.push(obj)
      if (!checkAccountTime) {
        checkAccountTime = ''
      } else {
        this.handleTimeChange(checkAccountTime)
      }
      this.reqCheckParams.incomeMoney = (Number(this.reqCheckParams.usedMoney) + Number(this.reqCheckParams.lateFeesMoney)).toFixed(2)
      this.reqCheckParams.incomeTime = checkAccountTime
      this.getAvailableBalance()
    },
    confirmEditLate() {
      this.reqCheckParams.reqCheckList = JSON.parse(JSON.stringify(this.lateDialogData))
      this.reqCheckParams.lateFeesMoney = 0
      this.reqCheckParams.reqCheckList.forEach(item => {
        this.reqCheckParams.lateFeesMoney += Number(item.lateFeesMoney)
        item.incomeMoney = Number(item.usedMoney) + Number(item.lateFeesMoney)
      })
      this.reqCheckParams.lateFeesMoney = Number(this.reqCheckParams.lateFeesMoney).toFixed(2)
      this.reqCheckParams.incomeMoney = (Number(this.reqCheckParams.lateFeesMoney) + Number(this.reqCheckParams.usedMoney)).toFixed(2)
      this.lateDialogVisible = false
    },
    handleEditIncomeMoney() {
      this.reqCheckParams.reqCheckList[0].incomeMoney = this.reqCheckParams.incomeMoney
    },
    showLateDialog() {
      this.lateDialogData = JSON.parse(JSON.stringify(this.reqCheckParams.reqCheckList))
      this.lateDialogVisible = true
    },
    handleTimeChange(val) {
      val = new Date(val).getTime()
      if (val) {
        setCache({
          key: 'checkAccountTime',
          value: val
        })
        this.reqCheckParams.lateFeesMoney = 0
        this.reqCheckParams.reqCheckList.forEach(item => {
          let ny = new Date(item.expectedRepaymentTime).getFullYear()
          let nm = new Date(item.expectedRepaymentTime).getMonth() + 1
          let nd = new Date(item.expectedRepaymentTime).getDate()
          let nt = new Date(ny + '-' + nm + '-' + nd + ' ' + 0 + ':' + 0 + ':' + 0).getTime()
          let subT = Number((Number(val - nt) / 24 / 3600 / 1000).toFixed(0))
          if (subT < 0) {
            subT = 0
          }
          if (item.category == 'cut' && item.payAction == '3') {
            subT = 0
          }
          console.log(subT, 'subT')
          // item.creditType = 4
          if ((item.creditType == 1 || item.creditType == 2) && subT > 0) {
            item.lateFeesMoney = Number(item.usedMoney) * 0.18 * 1.5 * (subT) / 360
          } else if (item.creditType == 4) {
            // 雁阵额度付款方式
            item.lateFeesMoney = Number(item.usedMoney) * 0.066 / 100 * subT
          } else {
            item.lateFeesMoney = 0
          }
          item.lateFeesMoney = Number(item.lateFeesMoney).toFixed(2)
          item.incomeMoney = Number(item.usedMoney) + Number(item.lateFeesMoney)
          this.reqCheckParams.lateFeesMoney += Number(item.lateFeesMoney)
        })
        // }
        this.reqCheckParams.lateFeesMoney = (Number(this.reqCheckParams.lateFeesMoney)).toFixed(2)
        this.reqCheckParams.incomeMoney = (Number(this.reqCheckParams.lateFeesMoney) + Number(this.reqCheckParams.usedMoney)).toFixed(2)
      }
    },
    confirmEditException() {
      this.fullscreenLoading = true
      newRequest({
        url: '/redwood/reconciliation/updateExceptionMsg',
        data: this.reqExceptionParams,
        method: 'post',
        contentType: 'application/json'
      }).then(res => {
        if (res.success) {
          this.$message.success(res.msg)
          this.exceptionDialogVisible = false
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
        this.fullscreenLoading = false
      })
    },
    showExceptionDialog(item) {
      this.reqExceptionParams.id = item.id
      this.reqExceptionParams._time = new Date().getTime()
      this.reqExceptionParams.exceptionMsg = item.exceptionMsg
      if (this.reqExceptionParams.exceptionMsg === null) {
        this.reqExceptionParams.exceptionMsg = ''
      }
      this.exceptionDialogVisible = true
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
        status: 1,
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
        url: '/redwood/reconciliation/export',
        method: 'get',
        data: this.requestParams
      }).then((response) => {
        this.pageLoading = false
        if (response.success == '1') {
          window.open('http://www.soouya.com/' + response.obj)
        } else {
          this.$message.error(response.msg)
        }
        this.fullscreenLoading = false
      })
    },
    toAdjust() { // 去调整额度
      this.checkDialogVisible = false
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
        status: 1,
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
    }
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
</style>
