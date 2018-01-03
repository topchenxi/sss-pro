<template>
<div v-loading.body="fullscreenLoading">
  <h1 class="title" style="font-size: 25px; padding: 15px">已分账</h1>
  <HeadFilter v-on:getParams="getFilter" v-on:exporHandle="exporExcel" :param="filters"></HeadFilter>
  <p class="control">
    <span class="subtitle is-6">已分账总金额：<span style='color:red'>{{Number(splitAccountListData.total) ? Number(splitAccountListData.total).toFixed(2) : 0.00}} 元</span></span>
    <el-button size="mini" type="primary" style='margin-left: 20px; margin-bottom: 10px;' @click="jumpToList()">付款记录</el-button>
  </p>
  <div v-loading='loading'>
    <el-table class="fixed-table" :data="splitAccountListData.result" border
    :height="height" @selection-change="handleMultipleSelectionChange">

      <el-table-column type="selection" width="50" fixed="left"></el-table-column>
      <el-table-column show-tooltip-when-overflow property="tansctionTime" label="分账日期" min-width="150" :formatter="formatTime" ></el-table-column>
      <el-table-column property="serviceNumber" label="订单号" min-width="170" show-tooltip-when-overflow></el-table-column>
      <el-table-column property="transactionNo" label="支付流水号/出金" min-width="160" show-tooltip-when-overflow> </el-table-column>
      <el-table-column property="yfbTransactionNo" label="易付宝交易号" min-width="200" show-tooltip-when-overflow> </el-table-column>
      <el-table-column inline-template label="定金/元"  min-width="100" show-tooltip-when-overflow>
        <span>{{Number(row.earnestMoney).toFixed(2)}}</span>
      </el-table-column>
      <el-table-column inline-template label="尾款/元"  min-width="100" show-tooltip-when-overflow>
        <span>{{Number(row.finalMoneySoouyaToSeller).toFixed(2)}}</span>
      </el-table-column>
      <el-table-column inline-template label="成本货款/元"  min-width="120" show-tooltip-when-overflow>
        <span>{{Number(row.costMoney).toFixed(2)}}</span>
      </el-table-column>
      <el-table-column inline-template label="供应商税款/元"  min-width="140" show-tooltip-when-overflow>
        <span>{{Number(row.sellerTaxMoney).toFixed(2)}}</span>
      </el-table-column>
      <el-table-column inline-template label="供应商税点"  min-width="120" show-tooltip-when-overflow>
        <span>{{Number(row.sellerTaxPoint).toFixed(2)}}</span>
      </el-table-column>
      <el-table-column inline-template label="已付款/元"  min-width="100" show-tooltip-when-overflow>
        <span>{{Number(row.toPayMoney).toFixed(2)}}</span>
      </el-table-column>
      <el-table-column property="buyerCompany" label="采购商" min-width="110" show-tooltip-when-overflow> </el-table-column>
      <el-table-column property="buyerNumber" label="采购商ID" min-width="110" show-tooltip-when-overflow> </el-table-column>
      <el-table-column property="shopName" label="供应商" min-width="110" show-tooltip-when-overflow> </el-table-column>
      <el-table-column property="sellerNumber" label="供应商ID" min-width="110" show-tooltip-when-overflow> </el-table-column>
      <el-table-column inline-template label="跟单员"  min-width="100" show-tooltip-when-overflow>
        <span>{{row.follower}}/{{row.followerTel}}</span>
      </el-table-column>
      <el-table-column property="fundType" label="款项类型" min-width="100" :formatter="getFundTypeStr" show-tooltip-when-overflow></el-table-column>
      <el-table-column property="payStatus" label="分账状态" min-width="100" :formatter="payStatus" show-tooltip-when-overflow> </el-table-column>
      <el-table-column inline-template label="操作" min-width="100" fixed="right">
        <div>
          <router-link :to="{ path:'/finance/splitAccount/detail/'+row.id }"><el-button size="mini">明细</el-button></router-link>
          <el-button size='mini' @click.prevent="toPrint(row.orderNumber)">打印</el-button>
        </div>
      </el-table-column>
    </el-table>
    <div class="page">
      <pagination :page="splitAccountListData.pageNumber" :total="splitAccountListData.totalCount" :render="pageChange" :options="filters"></pagination>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
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
</style>
</style>
<script>
import HeadFilter from 'components/headFilter/HeadFilter.vue'
import pagination from 'components/pagination'
import {
  request,
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
    pagination
  },
  data () {
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
      loading: false,
      height: '600'
    }
  },
  mounted() {
    this.height = String(document.documentElement.clientHeight - 905);
    this.getList(); // 获取待分账列表
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
      // that.filters.payStatus = 101
      request({
        url: AccountApi.PayGroupOrderX.listPost,
        method: 'post',
        data: {
          param: JSON.stringify(that.filters)
        }
      }).then(data => {
        if (data.success === '1') {
          that.fullscreenLoading = false;
          that.loading = false;
          that.splitAccountListData = data.page;
          that.splitAccountListData.total = data.total;
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
    pageChange() {
      this.loading = true
      this.getList()
    },
    handleMultipleSelectionChange(val) {
      // console.log('multipleSelection', val);
      this.multipleSelection = val;
    },
    formatTime(row, column) { // 格式化时间
      return formatTimeString(row.transactionTime)
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
    exporExcel(params) { // 分账类型映射
      const that = this
      if (!params.confirmPayTimeBegin || !params.confirmPayTimeEnd) {
        that.$message('请选择时间')
        return
      }
      const distance = (params.confirmPayTimeEnd - params.confirmPayTimeBegin) - 7 * 24 * 60 * 60 * 1000
      if (distance > 0) {
        that.$message('请选择七天内')
        return
      }
      const url = `${AccountApi.PayGroupOrderX.export}?param=${JSON.stringify(params)}`
      window.open(url)
    },
    toPrint(orderNumber) { // 去打印
      window.open(`/common/printDetail/${orderNumber}`)
    },
  },
  watch: {
    /**
     * 点击搜索或分页时，更改filters，并请求列表
     */
    filters: function(newValue, oldVal) {
      this.loading = true
      this.getList()
    }
  }
}
</script>
