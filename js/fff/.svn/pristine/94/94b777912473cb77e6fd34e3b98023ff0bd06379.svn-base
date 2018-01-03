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
    <checkTabs></checkTabs>
    <div>
      <el-row style="line-height:40px;margin-top:0px;padding-left:15px;">
        <el-col :span="4">
          <span>已对账金额:
            <span style="color:#f00;font-weight:600;">{{totalData.totalIncomeMoney | formateNumber}}元</span>
          </span>
        </el-col>
        <el-col :span="4">
          <span>已用搜芽额度:
            <span style="color:#f00;font-weight:600;">{{totalData.totalSoouyaUsedMoney | formateNumber}}元</span>
          </span>
        </el-col>
        <el-col :span="4">
          <span>已用徙木额度:
            <span style="color:#f00;font-weight:600;">{{totalData.totalBaitiaoUsedMoney | formateNumber}}元</span>
          </span>
        </el-col>
        <el-col :span="4">
          <span>已用雁阵额度:
            <span style="color:#f00;font-weight: 600;">{{totalData.totalYanzhenUsedMoney | formateNumber}}元</span>
          </span>
        </el-col>
        <el-col :span="4">
          <span>滞纳金:
            <span style="color:#f00;font-weight:600;">{{totalData.totalLateFeesMoney | formateNumber}}元</span>
          </span>
        </el-col>
      </el-row>
    </div>
    <el-table :data="tableData" :height="tableHeight" border>
      <el-table-column label="对账时间" prop="confirmTime" :formatter="formatTime" min-width="160"></el-table-column>
      <el-table-column label="订单号" prop="serviceNumber" min-width="200"></el-table-column>
      <el-table-column label="出仓单号" prop="" min-width="140">
        <template scope="scope">
          <template v-if="scope.row.category == 'bulk' || scope.row.category == 'buttonNumber'">{{scope.row.outReposityNumber}}</template>
          <template v-else>--</template>
        </template>
      </el-table-column>
      <el-table-column label="原订单销售货款/元" prop="" min-width="150">
        <template scope="scope">
          <template v-if="scope.row.category == 'shopBulk' || scope.row.category == 'buttonNumber' || (scope.row.category == 'cut' && scope.row.payAction == 3)">--</template>
          <template v-else>{{scope.row.orderSaleMoney | formateNumber}}</template>
        </template>
      </el-table-column>
      <el-table-column label="采购商税款/元" prop="" min-width="120">
        <template scope="scope">
          <template v-if="scope.row.category == 'shopBulk' || scope.row.category == 'buttonNumber' || (scope.row.category == 'cut' && scope.row.payAction == 3)">--</template>
          <template v-else>{{scope.row.taxMoney | formateNumber}}</template>
        </template>
      </el-table-column>
      <el-table-column label="服务费/元" prop="" min-width="100">
        <template scope="scope">
          <template v-if="scope.row.category == 'shopBulk' || scope.row.category == 'buttonNumber' || (scope.row.category == 'cut' && scope.row.payAction == 3)">--</template>
          <template v-else>{{scope.row.serviceMoney | formateNumber}}</template>
        </template>
      </el-table-column>
      <el-table-column label="出仓销售货款/元" prop="" min-width="140">
        <template scope="scope">
          <template v-if="scope.row.category == 'shopBulk' || scope.row.category == 'buttonNumber' || (scope.row.category == 'cut' && scope.row.payAction == 3)">--</template>
          <template v-else>{{scope.row.saleMoney | formateNumber}}</template>
        </template>
      </el-table-column>
      <el-table-column label="运费/元" prop="" min-width="80">
        <template scope="scope">
          <template v-if="scope.row.category == 'shopBulk' || scope.row.category == 'buttonNumber' || (scope.row.category == 'cut' && scope.row.payAction == 3)">--</template>
          <template v-else>{{scope.row.freightMoney | formateNumber}}</template>
        </template>
      </el-table-column>
      <el-table-column label="仓库运费/元" prop="" min-width="100">
        <template scope="scope">
          <template v-if="scope.row.category == 'shopBulk' || scope.row.category == 'buttonNumber' || (scope.row.category == 'cut' && scope.row.payAction == 3)">--</template>
          <template v-else>{{scope.row.freightMoneyNoTax | formateNumber}}</template>
        </template>
      </el-table-column>
      <el-table-column label="应收出仓销售货款/元" prop="" min-width="180">
        <template scope="scope">
          <template v-if="scope.row.category == 'shopBulk' || scope.row.category == 'buttonNumber' || (scope.row.category == 'cut' && scope.row.payAction == 3)">--</template>
          <template v-else>{{scope.row.needSaleMoney | formateNumber}}</template>
        </template>
      </el-table-column>
      <el-table-column label="应收滞纳金/元" prop="expectedLateFeesMoney" :formatter="formatNumber" min-width="120"></el-table-column>
      <el-table-column label="应收款/元" prop="expectedIncomeMoney" :formatter="formatNumber" min-width="100"></el-table-column>
      <el-table-column label="支用额度/元" prop="" min-width="100">
        <template scope="scope">
          <template v-if="scope.row.payAction == 3 && scope.row.category == 'cut' || scope.row.category == 'buttonNumber' || scope.row.creditType == 3">--</template>
          <template v-else>{{scope.row.usedMoney | formateNumber}}</template>
        </template>
      </el-table-column>
      <el-table-column label="实收滞纳金/元" prop="" :formatter="formatNumber" min-width="120">
       <template scope="scope">
          <template v-if="scope.row.category == 'buttonNumber'">--</template>
          <template v-else>{{scope.row.lateFeesMoney | formateNumber}}</template>
        </template>
      </el-table-column>
      <el-table-column label="实收款" prop="incomeMoney" :formatter="formatNumber" min-width="100"></el-table-column>
      <el-table-column label="支付方式" min-width="100">
        <template scope="scope">
          <template v-if="scope.row.creditType == 1">搜芽额度</template>
          <template v-if="scope.row.creditType == 2">徙木额度</template>
          <template v-if="scope.row.creditType == 3">余额</template>
          <template v-if="scope.row.creditType == 4">雁阵额度</template>
          <template v-if="scope.row.category == 'cut' && scope.row.payAction == 3 || scope.row.category == 'buttonNumber'">--</template>
        </template>
      </el-table-column>
      <el-table-column label="到期还款日" prop="" min-width="110">
        <template scope="scope">
          <template v-if="(scope.row.category == 'cut' && scope.row.payAction == 3) || scope.row.category == 'buttonNumber' || scope.row.creditType == 3">--</template>
          <template v-else>{{scope.row.expectedRepaymentTime | formatDate}}</template>
        </template>
      </el-table-column>
      <el-table-column label="到账日期" prop="" min-width="100">
        <template scope="scope">
          <template v-if="(scope.row.category == 'cut' && scope.row.payAction == 3) || scope.row.category == 'buttonNumber' || scope.row.creditType == 3">--</template>
          <template v-else>{{scope.row.incomeTime | formatDate}}</template>
        </template>
      </el-table-column>
      <el-table-column label="订单类型" min-width="100">
        <template scope="scope">
          <template v-if="scope.row.category == 'cut'">剪版
            <template v-if="scope.row.payAction == 3">(取消)</template>
          </template>
          <template v-if="scope.row.category == 'bulk'">大货</template>
          <template v-if="scope.row.category == 'shopBulk'">第三方订单</template>
          <template v-if="scope.row.category == 'buttonNumber'">大货(扣数)</template>
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
          <template v-if="scope.row.category == 'cut' || scope.row.category == 'buttonNumber'">--</template>
          <template v-else>
            <template v-if="scope.row.hasOpenedBaitiao == 0 && scope.row.hasOpenedYanzhen == 0">--</template>
            <template v-else>
              <template v-if="scope.row.creditType == 3">--</template>
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
      <el-table-column label="对账单号" min-width="180" prop="">
        <template scope="scope">
            <span class="billNumber" @click="jumpMingxi(scope.row.billId)">{{scope.row.billNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column label="对账状态" prop="status" min-width="120">
        <template scope="scope">
          <template v-if="scope.row.status == 1">
            <span class="forgive-color">待对账</span>
          </template>
          <template v-if="scope.row.status == 2">
            <span class="forgive-color">已对账</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="对账备注" min-width="150" prop="financeRemark" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" fixed="right" min-width="180">
        <template scope="scope">
          <template v-if="scope.row.financeRemark">
            <el-tooltip class="item" effect="dark" :content="scope.row.financeRemark" placement="top-start">
              <span style="color:#fff;background-color:#2FB468;padding:1px 5px;border-radius:2px;cursor:pointer" @click="showRemarkDialog(scope.row)">备注</span>
            </el-tooltip>
          </template>
          <template v-else>
            <el-button type="primary" size="mini" @click.native="showRemarkDialog(scope.row)">备注</el-button>
          </template>
          <template v-if="scope.row.category != 'shopBulk'">
              <el-button type="primary" size="mini" @click="detail(scope.row.businessId)">详情</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-content">
      <pagination :page="page.pageNumber" :total="page.totalCount" :render="getData" :options="requestParams"></pagination>
    </div>
    <!-- 对账备注dialog -->
    <el-dialog v-model="remarkDialogVisible" size="tiny" title="对账备注">
      <el-form label-position="right">
        <el-form-item label="对账备注">
          <el-input style="" type="textarea" v-model="reqRemarkParams.financeRemark" :autosize="{ minRows: 6, maxRows: 6 }" resize="none"></el-input>
          <p v-if="reqRemarkParams.financeRemark" class="remark-font">{{reqRemarkParams.financeRemark.length}}/500</p>
          <p v-else class="remark-font">0/500</p>
        </el-form-item>
      </el-form>
      <footer style="margin-top: 35px;">
        <el-button size="small" @click.native="remarkDialogVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click.native="confirmEditRemark" :disabled="reqRemarkParams.financeRemark.length > 500">确定</el-button>
      </footer>
    </el-dialog>
  </section>
</template>

<script>
import HeadFilter from 'components/headFilter/HeadFilter'
import pagination from 'components/pagination'
import checkTabs from 'components/checkTabs'
import {
  newRequest
} from 'common/utils'
export default {
  components: {
    HeadFilter,
    pagination,
    checkTabs,
  },
  data() {
    return {
      fullscreenLoading: false,
      remarkDialogVisible: false,
      tableHeight: 600,
      tableData: [],
      totalData: {},
      reqRemarkParams: {
        id: '',
        financeRemark: ''
      },
      requestParams: {
        pageNumber: 1,
        pageSize: 20,
        status: 2, // 待对账状态
      },
      page: {
        pageNumber: 1,
        totalCount: 20,
        pageSize: 20
      }
    }
  },
  mounted() {
    this.tableHeight = String(window.document.body.clientHeight - 475)
    if (sessionStorage.getItem('reconciliation')) {
        let obj = JSON.parse(sessionStorage.getItem('reconciliation'))
       if (obj.flag) {
         this.requestParams = obj.requestParams
         sessionStorage.removeItem('reconciliation')
       }
    }
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
    confirmEditRemark() {
      newRequest({
        url: '/redwood/reconciliation/updateFinanceRemark',
        data: this.reqRemarkParams,
        method: 'post',
        contentType: 'application/json'
      }).then(res => {
        if (res.success == 1) {
          this.remarkDialogVisible = false
          this.$message.success(res.msg)
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    showRemarkDialog(item) {
      this.reqRemarkParams.id = item.id
      this.reqRemarkParams.financeRemark = item.financeRemark
      if (this.reqRemarkParams.financeRemark === null) {
        this.reqRemarkParams.financeRemark = ''
      }
      this.remarkDialogVisible = true
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
        status: 2,
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
      if (this.requestParams.createTimeBegin) {
        this.requestParams.confirmTimeBegin = new Date(params.createTimeBegin).getTime()
        delete this.requestParams.createTimeBegin
      }
      if (this.requestParams.createTimeEnd) {
        this.requestParams.confirmTimeEnd = new Date(params.createTimeEnd).getTime()
        delete this.requestParams.createTimeEnd
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
        status: 2,
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
      if (params.createTimeBegin) {
        this.requestParams.confirmTimeBegin = params.createTimeBegin
        delete this.requestParams.createTimeBegin
      }
      if (params.createTimeEnd) {
        this.requestParams.confirmTimeEnd = params.createTimeEnd
        delete this.requestParams.createTimeEnd
      }
      if (this.requestParams.buyerHasOpenedBaitiao == 0 || this.requestParams.buyerHasOpenedBaitiao) {
        this.requestParams.hasOpenedBaitiao = this.requestParams.buyerHasOpenedBaitiao
      }
      this.requestParams.pageNumber = 1
      this.getData()
    },
    jumpMingxi(id) {
      this.$router.push({name: 'checkAccountMingxi', query: {id: id, checkStatus: 1}})
      sessionStorage.removeItem('reconciliation')
      var obj = {}
      obj.requestParams = this.requestParams
      obj.flag = false
      sessionStorage.setItem('reconciliation', JSON.stringify(obj))
    },
    detail(id) {
      this.$router.push({name: 'checkAccountDetail', query: {id: id}})
      sessionStorage.removeItem('reconciliation')
      var obj = {}
      obj.requestParams = this.requestParams
      obj.flag = false
      sessionStorage.setItem('reconciliation', JSON.stringify(obj))
    },
  }
}
</script>

<style lang="scss" scoped>
.el-row {
  .el-col {
    min-width: 180px;
  }
}
.billNumber {
  color: #2fb468;
  cursor: pointer;
}
a {
  text-decoration: none;
}
</style>
