<template>
  <div v-loading.fullscreen="fullscreenLoading" class='payTransaction-list'>
    <!-- <h1 class="title" style="font-size: 25px; padding: 15px">付款记录</h1> -->
    <HeadFilter v-on:getParams="getFilter" :param="filters"></HeadFilter>
    <div style="background-color: #fff;">
      <p class="control" style="line-height: 35px">
        <span class="subtitle is-6">支付笔数：
          <span style="color:red">{{payTransactionList.count||0.00}}</span> 笔，支付金额：
          <span style="color:red">{{Number(payTransactionList.total).toFixed(2)||0.00}}</span>元</span>
      </p>
    </div>
    <div v-loading='loading'>
      <el-table :data="payTransactionList.result" border :height="height">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column property="payedTime" label="完成时间" min-width="150" :formatter="formatPayTime"></el-table-column>
        <el-table-column property="createTime" label="受理时间" min-width="150" :formatter="formatTime"></el-table-column>
        <el-table-column inline-template label="商户订单号" min-width="180">
          <div>
            <el-dropdown v-if="row.serviceNumberList.length > 1" :text="row.serviceNumberList && seleted(row.serviceNumberList)" type="text" :icon-separate="false" trigger="hover">
              <el-dropdown-item v-for="item in row.serviceNumberList" :key="item">{{item}}</el-dropdown-item>
            </el-dropdown>
            <div v-else>
              <span v-for="item in row.serviceNumberList" :key="item">{{item}}</span>
            </div>
          </div>
        </el-table-column>
        <el-table-column property="transactionNo" label="支付流水号" min-width="160"></el-table-column>
        <el-table-column property="yfbOrderNumber" label="易付宝订单号" min-width="130"></el-table-column>
        <el-table-column property="accountName" label="收款方姓名" min-width="110"></el-table-column>
        <el-table-column property="accountType" label="收款方账户类型" min-width="130" :formatter="getAccountTypeStr"></el-table-column>
        <el-table-column property="accountBankShort" label="收款方银行编号" min-width="130"> </el-table-column>
        <el-table-column property="accountBankName" label="收款方银行名称" min-width="130"> </el-table-column>
        <el-table-column property="accountBankId" label="联行号"> </el-table-column>
        <el-table-column property="accountProvince" label="收款方开户行省" min-width="130"> </el-table-column>
        <el-table-column property="accountCity" label="收款方开户行市" min-width="130"> </el-table-column>
        <el-table-column property="accountNumber" label="收款方银行账号" min-width="130"> </el-table-column>
        <el-table-column property="toPayMoney" label="金额（元）" min-width="100"> </el-table-column>
        <el-table-column property="fee" label="手续费（元）" min-width="100"> </el-table-column>
        <el-table-column property="orderName" label="订单名称" min-width="100"> </el-table-column>
        <el-table-column property="userNumber" label="供应商ID" min-width="100"> </el-table-column>
        <el-table-column property="userName" label="供应商名称" min-width="150"> </el-table-column>
        <el-table-column property="payStatus" label="支付状态" min-width="150" :formatter="payStatusStr"> </el-table-column>
        <el-table-column label="操作" min-width="150" fixed='right'>
          <template scope="scope">
            <el-button size='mini' @click.prevent="toPrint(scope.row.orderNumberList)" class="forgive-color">打印</el-button>
          </template>
        </el-table-column>
        <!--<el-table-column label="打印" fixed="right">
          <template scope="scope">
            <el-button size="mini" type="primary">打印</el-button>
          </template>
        </el-table-column>-->
      </el-table>
      <div class="pagination-content">
        <pagination :page="payTransactionList.pageNumber" :total="payTransactionList.totalCount" :render="pageChange" :options="filters"></pagination>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
A .payTransaction-list {
  overflow: hidden;
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
<script>
import HeadFilter from 'components/headFilter/HeadFilter.vue'
import pagination from 'components/pagination'
import { Message } from 'element-ui'
import {
  request,
  formatTimeString,
  getCategoryStr,
  getSourceStr,
  getFundTypeStr,
  getCache,
  setCache,
  getPayStatusStr
} from 'src/common/utils.js'
import AccountApi from 'api/account.js'
export default {
  components: {
    HeadFilter,
    pagination
  },
  data() {
    const filters = getCache({
      key: 'payTransactionListFilters',
    }) || {
        pageNumber: 1,
        pageSize: 20,
      };
    return {
      filters: filters, // 筛选参数
      payTransactionList: {}, // 付款列表
      fullscreenLoading: true,
      loading: false,
      height: '600'
    }
  },
  mounted() {
    this.height = String(document.body.clientHeight - 360);
    this.getList(); // 获取待付款列表
  },
  methods: {
    /**
     * 获取筛选参数
     */
    getFilter(params) {
      if (params.createTimeBegin) {
        params.createTimeBegin = new Date(params.createTimeBegin).getTime()
      }
      if (params.createTimeEnd) {
        params.createTimeEnd = new Date(params.createTimeEnd).getTime()
      }
      this.filters = params
      this.filters.pageNumber = 1
      console.log('this.filters', this.filters)
      if (this.pageSize) {
        this.filters.pageSize = this.pageSize
      }
      this.loading = true
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
      request({
        url: AccountApi.PayTransaction.list,
        method: 'post',
        data: that.filters
      }).then(data => {
        if (data.success === '1') {
          that.payTransactionList = data.page;
          that.payTransactionList.total = data.total;
          that.payTransactionList.count = data.count;
          that.fullscreenLoading = false;
          that.loading = false;
          setCache({
            key: 'payTransactionListFilters',
            value: that.filters,
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
    handleReturn() {
      this.$router.push('/finance/splitAccount')
    },
    pageChange() {
      this.loading = true
      this.getList()
    },
    seleted(list) {
      let seletedText = ''
      list.length && list.map((item, i) => {
        const index = item.indexOf(this.filters.orderNumber)
        console.log(this.filters.orderNumber)
        if (index != -1) {
          seletedText = item
          return
        }
      })
      return seletedText || list[0]
    },
    formatPayTime(row, column) { // 格式化时间
      return (row.payedTime ? formatTimeString(row.payedTime) : '')
    },
    formatTime(row, column) { // 格式化时间
      return (row.createTime ? formatTimeString(row.createTime) : '')
    },
    getCategoryStr(row, column) { // 订单类型映射
      return getCategoryStr(row.category)
    },
    getSourceStr(row, column) { // 订单来源映射
      return getSourceStr(row.source)
    },
    getFundTypeStr(row, column) { // 款项类型映射
      return getFundTypeStr(row.fundType)
    },
    getAccountTypeStr(row, column) { // 账户类型
      const typeObj = {
        2: '个人',
        1: '企业',
      }
      return typeObj[row.accountType]
    },
    payStatusStr(row, column) { // 分账状态
      return getPayStatusStr(row.payStatus)
    },
    payType(row, column) { // 分账类型映射
      return row.payType === 0 ? '垫付' : '实付'
    },
    toPrint(orderNumberList) { // 去打印
      var orderNumber = orderNumberList[0].slice(-8)
      window.open(`/common/printDetail/${orderNumber}`)
    },
  },
  watch: {
    /**
     * 点击搜索或分页时，更改filters，并请求列表
     */
    filters: function(newValue, oldVal) {
      this.getList()
    }
  }
}
</script>
