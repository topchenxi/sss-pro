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
    <div style="margin:10px 0 10px 15px;">
      <p>支付金额：<span style="color:#f00">{{totalUsedMoney | formateNumber}}元</span></p>
    </div>
    <el-table :data="tableData" :height="tableHeight" border>
      <el-table-column label="支付时间" prop="payTime" :formatter="formatTime" min-width="160"></el-table-column>
      <el-table-column label="订单号" prop="serviceNumber" min-width="200"></el-table-column>
      <el-table-column label="出仓单号" prop="" min-width="140">
        <template scope="scope">
          <template v-if="scope.row.category == 'bulk'">{{scope.row.outReposityNumber}}</template>
          <template v-else>--</template>
        </template>
      </el-table-column>
      <el-table-column label="出仓销售货款/元" prop="" min-width="130">
        <template scope="scope">
          <template v-if="scope.row.category == 'bulk'" min-width="120">{{scope.row.saleMoney | formateNumber}}</template>
          <template v-else>--</template>
        </template>
      </el-table-column>
      <el-table-column label="支付金额/元" prop="usedMoney" :formatter="formatNumber" min-width="100"></el-table-column>
      <el-table-column label="差额" min-width="100">
        <template scope="scope">{{(Number(scope.row.usedMoney) - Number(scope.row.saleMoney)).toFixed(2)}}</template>
      </el-table-column>
      <el-table-column label="支付方式" min-width="100">
        <template scope="scope">
          <template v-if="scope.row.creditType == 1">搜芽额度</template>
          <template v-if="scope.row.creditType == 2">徙木额度</template>
          <template v-if="scope.row.creditType == 3">余额</template>
          <template v-if="scope.row.creditType == 4">雁阵额度</template>
        </template>
      </el-table-column>
      <el-table-column label="支付来源" min-width="100">
        <template scope="scope">
          <template v-if="scope.row.paySource == 1">客户支付</template>
          <template v-if="scope.row.paySource == 2">采购代付</template>
          <template v-if="scope.row.paySource == 3">财务代付</template>
        </template>
      </el-table-column>
      <el-table-column label="支付状态" min-width="100">
        <template scope="scope">
          <template v-if="scope.row.payStatus">
            <span class="forgive-color">支付成功</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="订单类型" min-width="100">
        <template scope="scope">
          <template v-if="scope.row.category == 'bulk'">大货</template>
          <template v-if="scope.row.category == 'cut'">剪版</template>
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
      <el-table-column label="采购商" prop="customerCompany" min-width="120"></el-table-column>
      <el-table-column label="供应商" prop="shopCompany" min-width="120"></el-table-column>
      <el-table-column label="自营供应商" prop="zyShopCompany" min-width="120"></el-table-column>
      <el-table-column label="销售员" min-width="120">
        <template scope="scope">{{scope.row.salesName}}/{{scope.row.salesTel}}</template>
      </el-table-column>
      <el-table-column label="采购员" min-width="120">
        <template scope="scope">{{scope.row.guiderName}}/{{scope.row.guiderTel}}</template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="120">
        <template scope="scope">
          <template v-if="scope.row.financePayRemark">
            <el-tooltip class="item" effect="dark" :content="scope.row.financePayRemark" placement="top-start">
              <span style="color:#fff;background-color:#2FB468;padding:3px 5px;border-radius:5px;cursor:pointer" @click="showRemarkDialog(scope.row)">备注</span>
            </el-tooltip>
          </template>
          <template v-else>
            <el-button type="primary" size="mini" @click.native="showRemarkDialog(scope.row)">备注</el-button>
          </template>
          <template v-if="scope.row.category != 'shopBulk'">
            <router-link :to="{name: 'customerPayDetail', query: {id: scope.row.id}}">
              <el-button type="primary" size="mini">详情</el-button>
            </router-link>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-content">
      <pagination :page="page.pageNumber" :total="page.totalCount" :render="getData" :options="requestParams"></pagination>
    </div>
    <el-dialog size="tiny" title="修改备注" v-model="remarkDialogVisible">
      <el-form>
        <el-form-item label="备注" style="text-align:right">
          <el-input v-model="reqRemarkParams.financePayRemark" type="textarea" :autosize="{minRows: 6, maxRows: 6}" resize="none"></el-input>
          <p v-if="reqRemarkParams.financePayRemark" class="remark-font">{{reqRemarkParams.financePayRemark.length}}/500</p>
          <p v-else class="remark-font">0/500</p>
        </el-form-item>
      </el-form>
      <footer>
        <el-button size="small" @click.native="remarkDialogVisible = false">取消</el-button>
        <el-button size="small" @click.native="confirmEditRemark" type="primary">确定</el-button>
      </footer>
    </el-dialog>
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
      tableData: [],
      tableHeight: 600,
      remarkDialogVisible: false,
      reqRemarkParams: {
        id: '',
        financePayRemark: ''
      },
      totalUsedMoney: '',
      requestParams: {
        pageNumber: 1,
        pageSize: 20,
        status: 1,
      },
      page: {
        pageNumber: 1,
        totalCount: 20,
        pageSize: 20
      },
    }
  },
  mounted() {
    this.tableHeight = String(window.document.body.clientHeight - 385)
    this.getData()
  },
  methods: {
    getData() {
      this.fullscreenLoading = true
      newRequest({
        url: '/redwood/reconciliation/listPay',
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
        this.getSumary()
        this.fullscreenLoading = false
      })
    },
    getSumary() {
      newRequest({
        url: '/redwood/reconciliation/getPaySumary',
        data: this.requestParams,
        method: 'get'
      }).then(res => {
        if (res.success == 1) {
          this.totalUsedMoney = res.obj.totalUsedMoney
        }
      })
    },
    confirmEditRemark() {
      this.fullscreenLoading = true
      newRequest({
        url: '/redwood/reconciliation/updateFinancePayRemark',
        data: this.reqRemarkParams,
        method: 'post',
        contentType: 'application/json'
      }).then(res => {
        if (res.success == 1) {
          this.$message.success(res.msg)
          this.remarkDialogVisible = false
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
        this.fullscreenLoading = false
      })
    },
    showRemarkDialog(item) {
      this.reqRemarkParams.id = item.id
      if (item.financePayRemark) {
        this.reqRemarkParams.financePayRemark = item.financePayRemark
      } else {
        this.reqRemarkParams.financePayRemark = ''
      }
      this.remarkDialogVisible = true
    },
    getFilter(params) {
      this.requestParams = Object.assign({
        pageNumber: 1,
        pageSize: 20,
        status: 1,
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
      if (this.requestParams.createTimeBegin) {
        this.requestParams.payTimeBegin = new Date(this.requestParams.createTimeBegin).getTime()
        delete this.requestParams.createTimeBegin
      }
      if (this.requestParams.createTimeEnd) {
        this.requestParams.payTimeEnd = new Date(this.requestParams.createTimeEnd).getTime()
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
      // if (isNaN(params.createTimeBegin)) {
      //   delete this.requestParams.createTimeBegin
      // }
      // if (isNaN(params.createTimeEnd)) {
      //   delete this.requestParams.createTimeEnd
      // }
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
        this.requestParams.payTimeBegin = new Date(this.requestParams.createTimeBegin).getTime()
        delete this.requestParams.createTimeBegin
      }
      if (this.requestParams.createTimeEnd) {
        this.requestParams.payTimeEnd = new Date(this.requestParams.createTimeEnd).getTime()
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
      newRequest({
        url: '/redwood/reconciliation/exportPay',
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
    }
  }
}
</script>

<style>

</style>
