<template >
  <div class="y_table" v-loading.body="loading">
    <!-- <h1 class="y_title" style="font-size: 25px; padding: 15px">对账列表</h1> -->
    <head-filter v-on:getParams="getFilter" :param="filters" v-on:exporHandle="exportList"></head-filter>
    <checkTabs></checkTabs>
    <p class="y_total">已对账总金额:
      <span class="money">{{Number(pagation.totalMoney).toFixed(2)}}元</span>
      <a href="http://oldcaiwu.soouya.com" target='_blank'>
        <el-button type="primary" size='mini'>历史数据</el-button>
      </a>
    </p>
    <div class="y_showTable">
      <div class="el-loading-demo"></div>
      <el-table :data="resData" class="fixed-table" border :height="height">
        <el-table-column inline-template label="对账日期" min-width='150'>
          <div>{{ row.confirmTimeString }}</div>
        </el-table-column>
        <el-table-column property='serviceNumber' label="订单号" min-width="230">
        </el-table-column>
        <el-table-column property='outReposityNumber' label="出仓单/码单" min-width="230">
        </el-table-column>
        <el-table-column min-width="130" label="原订单销售货款/元">
          <template scope="scope">
            <template v-if="scope.row.category === 'all-all' || scope.row.category == 'dh-zy'">
              <span>{{Number(scope.row.totalOrderSaleMoney).toFixed(2)}}</span>
            </template>
            <template v-else>
              --
            </template>
          </template>

        </el-table-column>
        <el-table-column inline-template min-width="130" label="采购商税款/元">
          <span>{{row.totalTaxMoney | formateNumber}}</span>
        </el-table-column>
        <el-table-column inline-template min-width="130" label="服务费/元">
          <span>{{row.totalServiceMoney  | formateNumber}}</span>
        </el-table-column>
        <el-table-column inline-template min-width="130" label="出仓销售货款/元">
          <span>{{Number(row.totalSaleMoney).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template min-width="130" label="应收出仓销售货款/元">
          <span>{{Number(row.totalNeedSaleMoney ).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template min-width="130" label="运费/元">
          <span>{{row.totalFreightMoney | formateNumber}}</span>
        </el-table-column>
        <el-table-column min-width="130" label="仓库运费/元">
          <template scope="scope">
            <template v-if="scope.row.category === 'all-all' || scope.row.category == 'dh-zy'">
              <p>{{scope.row.totalFreightMoneyNoTax | formateNumber}}</p>
            </template>
            <template v-else>--</template>
          </template>
        </el-table-column>
        <el-table-column inline-template min-width="130" label="已对账金额/元">
          <span>{{Number(row.totalMoney).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template label="到账日期" min-width='150'>
          <div>{{ row.incomeTimeString }}</div>
        </el-table-column>
        <el-table-column property="category" label="订单类型" min-width="100" :formatter="getCategoryStr"></el-table-column>
        <el-table-column min-width='130' property="buyerCompany" label="采购商">
        </el-table-column>
        <el-table-column min-width='130' property="buyerNumber" label="采购商ID">
        </el-table-column>
        <el-table-column label="金融客户" min-width="100">
          <template scope="scope">
            <template v-if="scope.row.hasOpenedBaitiao == 1"><span class="icon-baitiao"></span>
            </template>
            <template v-else><span class="icon-feibaitiao"></span></template>
          </template>
        </el-table-column>
        <el-table-column inline-template label="跟单员" min-width="120">
          <div>{{row.follower}}/{{row.followerTel}}</div>
        </el-table-column>
        <el-table-column inline-template label="买货员" min-width="120">
          <div>{{row.purchaser}}/{{row.followerTel}}</div>
        </el-table-column>
              <el-table-column inline-template width='130' label="采购员">
        <p>{{row.guiderName}}/{{row.guiderTel}}</p>
      </el-table-column>
      <el-table-column inline-template width='130' label="销售员">
        <p>{{row.salesName}}/{{row.salesTel}}</p>
      </el-table-column>
        <el-table-column label="对账方式">
          <template scope="scope">
            <template v-if="scope.row.creditType == 3">余额</template>
            <template v-if="scope.row.creditType == 1">搜芽额度</template>
            <template v-if="scope.row.creditType == 2">徙木额度</template>
          </template>
        </el-table-column>
        <el-table-column property="status" min-width="100" label="对账状态">
        </el-table-column>
        <el-table-column label="对账备注" min-width="120">
          <template scope="scope">
            <template v-if="scope.row.isEdit">
              <el-input v-model="scope.row.financeRemark" @keyup.enter.native="editRemark(scope.row)"></el-input>
            </template>
            <template v-else>
              <div @click="scope.row.isEdit = true">{{scope.row.financeRemark}}&nbsp;</div>
            </template>
          </template>
        </el-table-column>
        <el-table-column inline-template label="操作" :formatter="formatter" fixed="right">
          <router-link :to="{ path:'/finance/reconciliation/detail/' + row.id, query: {outNumber: row.outReposityNumber} }">
            <el-button size="mini">明细</el-button>
          </router-link>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <pagination :page="pagation.pageNumber" :total="pagation.totalCount" :render="reqList" :options="filters" />
    </div>
  </div>
</template>

<script>
import HeadFilter from 'components/headFilter/HeadFilter'
import pagination from 'components/pagination'
import {
  request,
  newRequest,
  formatTimeString,
  getCategoryStr,
  getCache,
  setCache
} from 'src/common/utils.js'
import AccountApi from 'api/account'
import checkTabs from 'components/checkTabs'

export default {
  components: {
    HeadFilter,
    pagination,
    checkTabs
  },
  data() {
    const filters = getCache({
      key: 'reconciliationFilters',
    }) || {
        pageNumber: 1,
        pageSize: 20,
        currentTab: 1
      };
    return {
      bool: false,
      loading: true,
      filters: filters, // 筛选参数
      resData: [],
      pagation: {
        totalMoney: 0
      },
      height: '600'
    }
  },
  created() {
    this.currentTab = getCache({
      key: 'reconciliationTabType',
    }) || 1
  },
  mounted() {
    this.height = String(window.document.body.clientHeight - 480)
    this.reqList(this.filters)
  },
  methods: {
    switchTab(tabObj) {
      this.currentTab = (Number(tabObj.index) + 1)
      this.filters = {
        pageNumber: 1,
        currentTab: this.currentTab,
        pageSize: 20
      }
      setCache({
        key: 'reconciliationTabType',
        value: this.currentTab
      })
      this.height = this.currentTab == 1 ? String(window.document.body.clientHeight - 540) : String(window.document.body.clientHeight - 560);
      sessionStorage.removeItem('reconciliationFilters')
    },
    seleted(list) {
      let seletedText = ''
      list.length && list.map((item, i) => {
        const index = item.indexOf(this.filters.orderNumber)
        if (index != -1) {
          seletedText = item
          return
        }
      })
      return seletedText || list[0]
    },
    reqList() {
      const that = this;
      this.loading = true;
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
      let data = that.filters
      data._time = +new Date()
      delete data.currentTab
      request({
        url: that.currentTab == 2 ? AccountApi.PayDebt.listPost : AccountApi.Reconciliation.listPost,
        method: 'post',
        contentType: 'application/json',
        data: JSON.stringify(data)
      }).then(data => {
        this.loading = false;
        if (data.success === '1') {
          this.convertData(data)
          setCache({
            key: 'reconciliationFilters',
            value: that.filters,
          });
        } else {
          this.$message({
            message: '请求数据失败,请手动刷新！',
            type: 'error',
            duration: 1500
          })
        }
      })
    },
    convertData(data) {
      data.page.result = data.page.result.map((item) => {
        switch (String(item.status)) {
          case '1':
            item.status = '待对账'
            break
          case '2':
            item.status = '已对账'
            break
          case '-1':
            item.status = '异常'
            break
        }
        switch (String(item.payWay)) {
          case 'alipay':
            item.payWay = '支付宝手机支付'
            break
          case 'tecent_wx':
            item.payWay = '微信支付'
            break
          case 'offline':
            item.payWay = '线下支付'
            break
        }
        item.confirmTimeString = formatTimeString(item.confirmTime)
        item.incomeTimeString = formatTimeString(item.incomeTime)
        item.incomeTimeString = item.incomeTimeString.slice(0, 10)
        item.confirmPayTimeString = formatTimeString(item.confirmPayTime)
        item.receivedTimeString = formatTimeString(item.receivedTime)
        return item
      })
      this.resData = data.page.result || []
      if (this.resData.length > 0) {
        this.resData.forEach((item) => {
          this.$set(item, 'isEdit', false);
        })
      }
      this.pagation = {
        pageNumber: data.page.pageNumber,
        totalCount: data.page.totalCount,
        pageSize: data.page.pageSize,
        totalMoney: data.total
      }
    },
    getFilter(params) {
      this.filters = params;
      if (params.createTimeBegin) {
        this.filters.confirmTimeBegin = new Date(params.createTimeBegin).getTime()
        delete params.createTimeBegin
      }
      if (params.createTimeEnd) {
        this.filters.confirmTimeEnd = new Date(params.createTimeEnd).getTime()
        delete params.createTimeEnd
      }
      this.filters.pageNumber = 1
      if (this.pageSize) {
        this.filters.pageSize = this.pageSize
      }
    },
    formatter(row, column) {
      return row
    },
    getCategoryStr(row, column) { // 订单类型映射
      return getCategoryStr(row.category)
    },
    exportList(param) {
      const result = {}
      for (const key of Object.keys(param)) {
        if (param[key] !== '' && param[key] !== undefined) {
          if (typeof param[key] !== 'number' || (typeof param[key] === 'number' && !isNaN(param[key]))) {
            if (key === 'createTimeBegin') {
              result['confirmTimeBegin'] = param[key]
            } else if (key === 'createTimeEnd') {
              result['confirmTimeEnd'] = param[key]
            } else {
              result[key] = param[key]
            }
          }
        }
      }
      window.open(`${window.location.origin}/redwood/account/Reconciliation/exportPost?param=${JSON.stringify(Object.assign(result, { queryType: 2 }))}`)
    },
    editRemark(data) { // 修改备注的
      console.log(AccountApi.Reconciliation.updateFinanceRemark)
      newRequest({
        url: AccountApi.Reconciliation.updateFinanceRemark,
        method: 'post',
        contentType: 'application/json',
        data: { id: data.id, financeRemark: data.financeRemark, _time: +new Date() }
      }).then((res) => {
        if (res.success == 1) {
          this.$message.success('修改成功')
          data.isEdit = false
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  },
  watch: {
    filters: function(newValue, oldVal) {
      this.reqList(newValue)
    }
  }
}
</script>
<style lang="scss">
.y_table {
  .y_title {
    color: #222324;
    font-size: 20px;
    line-height: 1;
    margin-bottom: 8px;
  }
  .y_total {
    margin-bottom: 10px;
  }
  .money {
    color: #ee0000;
  }
  .page {
    overflow: hidden;
    padding: 10px;
    text-align: right;
    .number {
      border-radius: 0;
    }
  }
  .el-loading-mask {
    background: red;
  }
  .y_showTable {
    margin-top: 25px;
    position: relative;
    .noData {
      position: absolute;
      left: 40%;
      top: 10%;
      text-align: center;
      font-size: 16px;
      color: red;
      padding: 20px;
      background-color: #fff;
    }
  }
}
</style>
