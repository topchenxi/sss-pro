<template >
<div class="y_table" v-loading.body="loading">
  <h1 class="y_title" style="font-size: 25px; padding: 15px">已对账</h1>
  <head-filter v-on:getParams="getFilter" :param="filters"></head-filter>
  <el-tabs type="border-card" @tab-click="switchTab" style = "width: 100%;" class='check-account-tab'>
    <el-tab-pane label="已对账">
      <p class="y_total">已对账总金额: <span class="money">{{Number(pagation.totalMoney).toFixed(2)}}元</span> <a href="http://oldcaiwu.soouya.com" target='_blank'><el-button type="primary" size='mini'>历史数据</el-button></a></p>
      <div class="y_showTable">
        <div class="el-loading-demo"></div>
        <el-table
          :data="resData"
          class="fixed-table"
          border
          :height="height"
          >
          <el-table-column inline-template label="对账日期" min-width='150' show-tooltip-when-overflow>
            <div>{{ row.confirmTimeString }}</div>
          </el-table-column>
          <el-table-column property='serviceNumber' label="订单号" min-width="230">
          </el-table-column>
          <el-table-column property='outReposityNumber' label="出仓单号" min-width="230">
          </el-table-column>
          <el-table-column show-tooltip-when-overflow inline-template min-width="130" label="总销售货款/元">
              <span>{{Number(row.totalSaleMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column show-tooltip-when-overflow inline-template min-width="130" label="总采购商税款/元">
              <span>{{Number(row.totalTaxMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column show-tooltip-when-overflow inline-template min-width="130" label="总服务费/元">
              <span>{{Number(row.totalTaxMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column show-tooltip-when-overflow inline-template min-width="130" label="已对账金额/元">
              <span>{{Number(row.totalMoney).toFixed(2)}}</span>
          </el-table-column>

          <el-table-column min-width='130' property="buyerCompany" label="采购商" show-tooltip-when-overflow>
          </el-table-column>
          <el-table-column min-width='130' property="buyerNumber" label="采购商ID" show-tooltip-when-overflow>
          </el-table-column>
          <el-table-column inline-template label="跟单员" min-width="120" show-tooltip-when-overflow>
            <div>{{row.follower}}/{{row.followerTel}}</div>
          </el-table-column>
          <el-table-column inline-template label="财务收款账户" width='200'>
            <div><p>{{ row.financeBank }}</p><p>{{ row.financeAccount }}</p></div>
          </el-table-column>
          <el-table-column show-tooltip-when-overflow property="status" min-width="100" label="对账状态">
          </el-table-column>
          <el-table-column inline-template label="操作" :formatter="formatter" fixed="right">
            <router-link :to="{ path:'/finance/reconciliation/detail/'+row.id }"><el-button size="mini">明细</el-button></router-link>
          </el-table-column>
        </el-table>

      </div>
      <div class="page">
        <pagination
          :page="pagation.pageNumber"
          :total="pagation.totalCount"
          :render="reqList"
          :options="filters"
        />
      </div>
    </el-tab-pane>
    <el-tab-pane label="已收欠款">
      <div class="y_showTable">
        <el-table
          :data="resData || []"
          class="fixed-table"
          border
          :height="height"
          >
          <!-- <el-table-column type="index" width="50" label="序号"></el-table-column> -->
          <el-table-column inline-template label="对账日期" min-width='150' show-tooltip-when-overflow>
            <div>{{ row.confirmPayTimeString }}</div>
          </el-table-column>
          <el-table-column inline-template label="订单号" min-width="230">
            <div>
              <el-dropdown  v-if="row.serviceNumberList && row.serviceNumberList.length > 1" trigger="hover">
                <span class="el-dropdown-link">
                  {{row.serviceNumberList && seleted(row.serviceNumberList)}}<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                   <el-dropdown-item v-for="item in row.serviceNumberList">{{item}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <div v-else>
                <span v-for="item in row.serviceNumberList">{{item}}{{ row.a }}</span>
              </div>
            </div>
          </el-table-column>
          <el-table-column inline-template label="出仓单号" min-width="230">
            <div>
              <el-dropdown  v-if="row.outReposityNumberList && row.outReposityNumberList.length > 1" trigger="hover">
                <span class="el-dropdown-link">
                  {{row.outReposityNumberList && seleted(row.outReposityNumberList)}}<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                   <el-dropdown-item v-for="item in row.outReposityNumberList">{{item}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <div v-else>
                <span v-for="item in row.outReposityNumberList">{{item}}{{ row.a }}</span>
              </div>
            </div>
          </el-table-column>
          <el-table-column show-tooltip-when-overflow inline-template min-width="130" label="应收欠款/元">
              <span>{{Number(row.totalMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column show-tooltip-when-overflow inline-template min-width="130" label="可用余额抵扣/元">
              <span>{{Number(row.available).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column show-tooltip-when-overflow inline-template min-width="130" label="滞纳金/元">
              <span>{{Number(row.lateFee).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column show-tooltip-when-overflow inline-template min-width="130" label="实际应收/元">
              <span>{{Number(row.realTotalMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column show-tooltip-when-overflow inline-template min-width="130" label="实际进账/元">
              <span>{{Number(row.realMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="进账日期" min-width='150' show-tooltip-when-overflow>
            <div>{{ row.receivedTimeString }}</div>
          </el-table-column>
          <el-table-column show-tooltip-when-overflow property="user" min-width="130" label="欠款用户">
          </el-table-column>
          <el-table-column inline-template show-tooltip-when-overflow property="user" min-width="130" label="欠款用户类型">
            <span>{{row.userType == 1 ? '采购商': '供应商'}}</span>
          </el-table-column>
          <el-table-column min-width='130' property="userNumber" label="用户ID" show-tooltip-when-overflow>
          </el-table-column>
          <el-table-column inline-template label="跟单员" min-width="120" show-tooltip-when-overflow>
            <div>{{row.follower}}/{{row.followerTel}}</div>
          </el-table-column>
          <el-table-column inline-template label="财务收款账户" width='200'>
            <div><p>{{ row.financeBank }}</p><p>{{ row.financeAccount }}</p></div>
          </el-table-column>
          <el-table-column prop="billingCycle" label="采购商结算周期" min-width='250'>
          </el-table-column>
          <el-table-column inline-template show-tooltip-when-overflow min-width="100" label="对账状态">
            <span>已对账</span>
          </el-table-column>
          <el-table-column inline-template label="操作" :formatter="formatter" fixed="right">
            <router-link :to="{ path:'/finance/reconciliation/debetDetail/'+row.id }" v-if='row.type == 1'><el-button size="mini">明细</el-button></router-link>
            <router-link :to="{name: 'billManageDetail', query: {id: row.id, tabIndex: 1}}" v-else><el-button size="mini">明细</el-button></router-link>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <pagination
          :page="pagation.pageNumber"
          :total="pagation.totalCount"
          :render="reqList"
          :options="filters"
        />
      </div>
    </el-tab-pane>
  </el-tabs>
</div>

</template>

<script>
import HeadFilter from 'components/headFilter/HeadFilter'
import pagination from 'components/pagination'
import {
  request,
  formatTimeString,
  getCache,
  setCache
} from 'src/common/utils.js'
import Account from 'api/account'

export default {
  components: {
    HeadFilter,
    pagination
  },
  data () {
    const filters = getCache({
      key: 'reconciliationFilters',
    }) || {
      pageNumber: 1,
      pageSize: 20,
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
  mounted () {
    const that = this
    this.height = String(document.documentElement.clientHeight - 500)
    this.$nextTick(function () {
      console.log('that.currentTab', that.currentTab)
      const tabs = document.getElementsByClassName('el-tabs__item')
      tabs[that.currentTab - 1].click()
    })
    // this.reqList(this.filters)
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
      this.height = this.currentTab == 1 ? String(document.documentElement.clientHeight - 500) : String(document.documentElement.clientHeight - 520);
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
    reqList () {
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
      request({
        url: that.currentTab == 2 ? Account.PayDebt.listPost : Account.Reconciliation.listPost,
        method: 'post',
        data: {
          param: JSON.stringify(that.filters)
        }
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
    convertData (data) {
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
        item.confirmPayTimeString = formatTimeString(item.confirmPayTime)
        item.receivedTimeString = formatTimeString(item.receivedTime)
        return item
      })
      this.resData = data.page.result || []
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
        this.filters.confirmPayTimeBegin = new Date(params.createTimeBegin).getTime()
        delete params.createTimeBegin
      }
      if (params.createTimeEnd) {
        this.filters.confirmPayTimeEnd = new Date(params.createTimeEnd).getTime()
        delete params.createTimeEnd
      }
      this.filters.pageNumber = 1
      if (this.pageSize) {
        this.filters.pageSize = this.pageSize
      }
    },
    formatter (row, column) {
      return row
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
