<template>
  <div v-loading.body="fullscreenLoading">
    <!-- <h1 class="title" style="font-size: 25px; padding: 15px">分账列表</h1> -->
    <HeadFilter @getParams="getFilter" @exporHandle="exporExcel" @exporEmail="exporEmail" :param="filters"></HeadFilter>
    <Tabs></Tabs>
    <p class="control">
      <span class="subtitle is-6">已分账总金额：
        <span style='color:red'>{{splitAccountListData.total | formateNumber}} 元</span>
      </span>
      <span class="subtitle is-6" style='margin-left: 20px;'>销售货款总额：
        <span style='color:red'>{{splitAccountListData.totalSaleMoney | formateNumber}} 元</span>
      </span>
      <span class="subtitle is-6" style='margin-left: 20px;'>服务费合计：
        <span style='color:red'>{{splitAccountListData.totalServiceMoney | formateNumber}} 元</span>
      </span>
      <span class="subtitle is-6" style='margin-left: 20px;'>采购商税费合计：
        <span style='color:red'>{{splitAccountListData.totalTaxMoney | formateNumber}} 元</span>
      </span>
      <el-button size="mini" type="primary" style='margin-left: 20px; margin-bottom: 10px;' @click="jumpToList()">付款记录</el-button>
    </p>
    <div v-loading='loading'>
      <el-table class="fixed-table" :data="splitAccountListData.result" border :height="height" @selection-change="handleMultipleSelectionChange">
        <el-table-column type="selection" width="50" fixed="left"></el-table-column>
        <el-table-column property="tansctionTime" label="分账日期" min-width="180" :formatter="formatTime"></el-table-column>
        <el-table-column property="serviceNumber" label="订单号" min-width="200"></el-table-column>
        <!--<el-table-column property="transactionNo" label="支付流水号/出金" min-width="160"  > </el-table-column>-->
        <el-table-column label="定金/元" min-width="100">
          <template scope="scope">
            <template v-if="scope.row.fundType == 3 || scope.row.fundType == 2">
              {{parseFloat(scope.row.earnestMoney).toFixed(2)}}
            </template>
            <template v-else>--</template>
          </template>
        </el-table-column>
        <el-table-column label="尾款/元" min-width="100">
          <template scope="scope">
            <template v-if="scope.row.fundType == 3">
              {{parseFloat(scope.row.finalMoneySoouyaToSeller).toFixed(2)}}</template>
            <template v-else>--</template>
          </template>
        </el-table-column>
        <el-table-column label="全款/元" min-width="100">
          <template scope="scope">
            <template v-if="scope.row.fundType == 5">{{parseFloat(scope.row.costMoney).toFixed(2)}}</template>
            <template v-else>--</template>
          </template>
        </el-table-column>
        <el-table-column inline-template label="采购货款/元" min-width="120">
          <span>{{row.buyMoney | formateNumber}}</span>
        </el-table-column>
        <el-table-column inline-template label="成本货款/元" min-width="120">
          <span>{{row.costMoney | formateNumber}}</span>
        </el-table-column>
        <el-table-column inline-template label="销售货款/元" min-width="120">
          <span>{{row.saleMoney | formateNumber}}</span>
        </el-table-column>
        <el-table-column inline-template label="供应商税款/元" min-width="140">
          <span>{{row.sellerTaxMoney | formateNumber}}</span>
        </el-table-column>
        <el-table-column inline-template label="供应商税点" min-width="120">
          <span>{{row.sellerTaxPoint | formateNumber}}</span>
        </el-table-column>
        <el-table-column inline-template label="已付款/元" min-width="100">
          <span>{{row.toPayMoney | formateNumber}}</span>
        </el-table-column>
        <el-table-column property="yfbOrderNumber" label="易付宝订单号" min-width="160"> </el-table-column>
        <el-table-column property="buyerCompany" label="采购商" min-width="110"> </el-table-column>
        <el-table-column property="buyerNumber" label="采购商ID" min-width="110"> </el-table-column>
        <el-table-column label="供应商" min-width="110">
          <template scope="scope">
            <template v-if="scope.row.shopCheck === 1">
              <img src="../../../assets/success.png" alt="" width="24" height="24">
            </template>
            <template v-if="scope.row.shopCheck === 0">
              <img src="../../../assets/warning.png" alt="" width="24" height="24">
            </template>
            <template v-if="scope.row.shopCheck === -1">
              <img src="../../../assets/delete.png" alt="" width="24" height="24">
            </template>
            {{scope.row.shopName}}
          </template>
        </el-table-column>
        <el-table-column property="sellerNumber" label="供应商ID" min-width="110"> </el-table-column>
        <!-- <el-table-column inline-template label="跟单员" min-width="120">
              <span>{{row.follower}}/{{row.followerTel}}</span>
            </el-table-column>
            <el-table-column inline-template label="买货员" min-width="120">
              <span>{{row.purchaser}}/{{row.purchaserTel}}</span>
            </el-table-column> -->
        <!-- 参数待定 -->
        <el-table-column inline-template label="采购员" min-width="120">
          <span>{{row.guiderName}}/{{row.guiderTel}}</span>
        </el-table-column>
        <el-table-column inline-template label="销售员" min-width="120">
          <span>{{row.salesName}}/{{row.salesTel}}</span>
        </el-table-column>
        <el-table-column label="金融客户" min-width="100">
          <template scope="scope">
            <template v-if="scope.row.hasOpenedBaitiao == 1">
              <span class="icon-baitiao"></span>
            </template>
            <template v-else>
              <span class="icon-feibaitiao"></span>
            </template>
            <template v-if="scope.row.hasOpenedYanzhen == 1">
              <span class="icon-yanzhen"></span>
            </template>
            <template v-else>
              <span class="icon-feiyanzhen"></span>
            </template>
          </template>
        </el-table-column>
        <el-table-column property="fundType" label="款项类型" min-width="100" :formatter="getFundTypeStr"></el-table-column>
        <el-table-column property="payStatus" label="分账状态" min-width="100" :formatter="payStatus"> </el-table-column>
        <el-table-column label="财务分账备注" min-width="140">
          <template scope="scope">
            <template v-if="scope.row.isEdit">
              <el-input v-model="scope.row.descr" @keyup.enter.native="editDescr(scope.row)"></el-input>
            </template>
            <template v-else>
              <div @click="scope.row.isEdit = true">{{scope.row.descr}}&nbsp;</div>
            </template>
          </template>
        </el-table-column>
        <el-table-column inline-template label="操作" min-width="100" fixed="right">
          <div>
            <router-link :to="{ path:'/finance/splitAccount/detail/'+row.id }">
              <el-button size="mini" type="primary">明细</el-button>
            </router-link>
            <el-button size='mini' type="primary" @click.prevent="toPrint(row.orderNumber)">打印</el-button>
          </div>
        </el-table-column>
      </el-table>
      <div class="pagination-content">
        <pagination :page="splitAccountListData.pageNumber" :total="splitAccountListData.totalCount" :render="pageChange" :options="filters"></pagination>
      </div>

      <el-dialog title="导出明细" v-model="exportDialog.visible" size="tiny">
        <div style='padding: 5px 0;font-size: 14px;text-align: left'>
          <el-button type="primary" @click.native="exportToExcel(exportDialog.params, 2)">导出Excel</el-button>
        </div>
        <div style='padding: 5px 0;font-size: 14px;text-align: left'>
          <el-button type="primary" @click.native="exportToExcel(exportDialog.params, 3)">发送Excel到邮箱</el-button>
          <el-select v-model="exportDialog.params.toEmail" style="display: inline-block;">
            <el-option :value="'finacedpt@soouya.com'"></el-option>
            <el-option :value="'rainyzeng@soouya.com'"></el-option>
            <el-option :value="'junozeng@soouya.com'"></el-option>
          </el-select>
        </div>
      </el-dialog>
      <el-dialog title="导出订单" v-model="emailDialog.visible" size="tiny">
        <div style='padding: 5px 0;font-size: 14px;text-align: left'>
          <el-button type="primary" @click.native="exportOrderList(emailDialog.params, 2)">导出Excel</el-button>
        </div>
        <div style='padding: 5px 0;font-size: 14px;text-align: left'>
          <el-button type="primary" @click.native="exportOrderList(emailDialog.params, 3)">发送Excel到邮箱</el-button>
          <el-select v-model="emailDialog.params.toEmail" style="display: inline-block;">
            <el-option :value="'finacedpt@soouya.com'">finacedpt@soouya.com</el-option>
            <el-option :value="'rainyzeng@soouya.com'">rainyzeng@soouya.com</el-option>
            <el-option :value="'junozeng@soouya.com'">junozeng@soouya.com</el-option>
          </el-select>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.control {
  margin-top: 8px;
}

.pending-account {
  .button {
    vertical-align: middle;
  }
  .table-wrap {
    overflow-x: auto;
  }
  table {
    td,
    th {
      white-space: nowrap;
      &.break-work {
        white-space: normal;
        min-width: 10rem;
      }
    }
  }
  .number {
    border-radius: 0;
  }
  .text-r {
    text-align: right;
  }
}

.el-dialog__body {
  text-align: left !important;
}
</style>
<script>
import HeadFilter from 'components/headFilter/HeadFilter.vue'
import pagination from 'components/pagination'
import Tabs from 'components/splitTabs'
import {
  request,
  newRequest,
  formatTimeString,
  getCategoryStr,
  getSourceStr,
  getCache,
  setCache,
  getFundTypeStr,
  getPayWayStr
} from 'src/common/utils.js'
import AccountApi from 'api/account.js'
import { Message } from 'element-ui'
export default {
  components: {
    HeadFilter,
    pagination,
    Tabs
  },
  data() {
    const filters = getCache({
      key: 'splitAccountFilters',
    }) || {
        pageNumber: 1,
        pageSize: 20,
      };
    return {
      filters: filters, // 筛选参数
      splitAccountListData: {}, // 已分账列表,
      fullscreenLoading: true,
      email: ['finacedpt@soouya.com', 'rainyzeng@soouya.com', 'junozeng@soouya.com'],
      loading: false,
      exportDialog: {
        visible: false,
        params: {
          toEmail: ''
        }
      },
      emailDialog: {
        visible: false,
        params: {
          toEmail: ''
        }
      },
      height: '600'
    }
  },
  computed: {
  },
  mounted() {
    this.height = String(window.document.body.clientHeight - 476);
    const params = getCache({ key: 'splitAccountFilters' })
    if (params) {
      this.getList(params); // 获取列表
    } else {
      this.getList(); // 获取列表
    }
  },
  filters: {
    formateNumber(val) {
      return Number(val).toFixed(2)
    }
  },
  methods: {
    /**
     * 获取筛选参数
     */
    getFilter(params) {
      if (params.createTimeBegin) {
        params.transactionTimeBegin = new Date(params.createTimeBegin).getTime()
      }
      if (params.createTimeEnd) {
        params.transactionTimeEnd = new Date(params.createTimeEnd).getTime()
      }
      delete params.createTimeBegin
      delete params.createTimeEnd
      this.filters = params
      this.filters.pageNumber = 1
      if (this.pageSize) {
        this.filters.pageSize = this.pageSize
      }
      if (params.customerCompany) {
        this.filters.buyerCompany = params.customerCompany
      } else {
        this.filters.buyerCompany = ''
      }
      if (params.shopCompany) {
        this.filters.shopName = params.shopCompany
      } else {
        this.filters.shopName = ''
      }
      delete this.requestParams.shopCompany
      delete this.requestParams.customerCompan
      this.loading = true
    },
    jumpToList() {
      sessionStorage.removeItem('payTransactionListFilters')
      this.$router.push('/finance/splitAccount/list')
    },
    /**
     * 获取待分账列表
     * @params this.filters
     */
    getList() {
      const that = this
      if (that.filters.pageNumber) {
        that.pageNumber = that.filters.pageNumber
      } else {
        that.pageNumber = 1
        that.filters.pageNumber = 1
      }
      if (that.filters.pageSize) {
        that.pageSize = that.filters.pageSize
      } else {
        that.pageSize = 20
        that.filters.pageSize = 20
      }
      that.filters.payStatus = 101
      newRequest({
        url: '/redwood/account/PayGroupOrderX/list',
        method: 'get',
        data: that.filters
      }).then(data => {
        if (data.success === '1') {
          that.fullscreenLoading = false;
          that.loading = false;
          data.page.result.forEach((item) => {
            item.isEdit = false
          })
          that.splitAccountListData = data.page;
          this.getSumary(that.filters)
          const obj = JSON.parse(JSON.stringify(that.filters));
          obj.createTimeEnd = obj.transactionTimeEnd
          obj.createTimeBegin = obj.transactionTimeBegin
          setCache({
            key: 'splitAccountFilters',
            value: obj,
          });
        } else {
          Message({
            message: '请求数据失败,请手动刷新！',
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    getSumary(obj) {
      newRequest({
        url: '/redwood/account/PayGroupOrderX/getSumary',
        data: obj,
        method: 'get'
      }).then(res => {
        this.$set(this.splitAccountListData, 'total', 0)
        this.$set(this.splitAccountListData, 'totalSaleMoney', 0)
        this.$set(this.splitAccountListData, 'totalServiceMoney', 0)
        this.$set(this.splitAccountListData, 'totalTaxMoney', 0)
        this.splitAccountListData.total = res.obj.totalMoney;
        this.splitAccountListData.totalSaleMoney = res.obj.totalSaleMoney;
        this.splitAccountListData.totalServiceMoney = res.obj.totalServiceMoney;
        this.splitAccountListData.totalTaxMoney = res.obj.totalTaxMoney;
      })
    },
    pageChange() {
      this.loading = true
      this.getList()
    },
    handleMultipleSelectionChange(val) {
      // console.log('multipleSelection', val);
      this.multipleSelection = val;
    },
    formatTime(row, column) { // 格式化时间
      return row.transactionTime > 0 && row.transactionTime !== null ? formatTimeString(row.transactionTime) : '--'
    },
    getCategoryStr(row, column) { // 订单类型映射
      return getCategoryStr(row.category)
    },
    getSourceString(row, column) { // 订单来源映射
      return getSourceStr(Number(row.source))
    },
    getFundTypeStr(row, column) { // 款项类型映射
      return getFundTypeStr(row.fundType)
    },
    getPayWayStr(row, column) { // 支付方式映射
      return getPayWayStr(row.payWay)
    },
    payStatus(row, column) { // 分账状态
      if (!row.needToPaySeller) {
        return '免分账'
      }
      return '已分账'
    },
    payType(row, column) { // 分账类型映射
      return row.payType === 0 ? '垫付' : '实付'
    },
    showExportDialog(params, index) {
      if (index == 1) {
        this.exportDialog.visible = true
        this.exportDialog.params = Object.assign(this.exportDialog.params, params)
        this.exportDialog.params.toEmail = 'finacedpt@soouya.com'
      } else {
        this.emailDialog.visible = true
        this.emailDialog.params = Object.assign(this.emailDialog.params, params)
        this.emailDialog.params.toEmail = 'finacedpt@soouya.com'
      }
    },
    exportToExcel(params, index) {
      params.type = index
      /*     const url = `${AccountApi.PayGroupOrderX.export}?param=${JSON.stringify(params)}`
           window.open(url) */
      newRequest({
        url: AccountApi.PayGroupOrderX.export,
        method: 'get',
        data: params
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          if (data.obj) {
            const url = 'http://www.soouya.com' + data.obj;
            window.open(url)
          } else {
            Message({
              message: data.msg,
              type: 'success',
              duration: 1000
            })
          }
        } else {
          Message({
            message: '请求数据失败,请手动刷新！',
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    exportOrderList(params, index) {
      params.type = index
      //     const url = `${AccountApi.PayGroupOrderX.exportOrderList}?param=${JSON.stringify(params)}`
      //     window.open(url)
      newRequest({
        url: AccountApi.PayGroupOrderX.exportOrderList,
        method: 'get',
        data: params
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          if (data.obj) {
            const url = 'http://www.soouya.com' + data.obj;
            window.open(url)
          } else {
            Message({
              message: data.msg,
              type: 'success',
              duration: 1000
            })
          }
        } else {
          Message({
            message: '请求数据失败,请手动刷新！',
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    exporExcel(params) { // 分账类型映射
      const that = this
      params.payStatus = 101
      if (!params.confirmPayTimeBegin || !params.confirmPayTimeEnd) {
        that.$message('请选择时间')
        return
      }
      this.showExportDialog(params, 1)
    },
    toPrint(orderNumber) { // 去打印
      window.open(`/common/printDetail/${orderNumber}`)
    },
    exporEmail(params) { // 分账类型映射
      const that = this
      params.payStatus = 101
      if (!params.confirmPayTimeBegin || !params.confirmPayTimeEnd) {
        that.$message('请选择时间')
        return
      }
      this.showExportDialog(params, 2)
    },
    editDescr(data) {
      this.fullscreenLoading = true;
      request({
        url: '/redwood/account/PayGroupOrderX/updateDescr',
        method: 'post',
        contentType: 'application/json',
        data: JSON.stringify({ id: data.id, descr: data.descr, _time: +new Date() })
      }).then((response) => {
        this.fullscreenLoading = false;
        if (response.success == 1) {
          Message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          })
          data.isEdit = false
        }
      })
    }
  },
  watch: {
    /**
     * 点击搜索或分页时，更改filters，并请求列表
     */
    filters: function (newValue, oldVal) {
      this.loading = true
      this.getList()
    }
  }
}
</script>
