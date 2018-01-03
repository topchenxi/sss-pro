<template>
<div v-loading.fullscreen="fullscreenLoading">
  <!-- <h1 class="title" style="font-size: 25px; padding: 15px">退款记录</h1> -->
  <HeadFilter v-on:getParams="getFilter" :param="filters"></HeadFilter>
  <p class="control" style="margin-bottom: 10px;">
    <span class="subtitle is-6">退款总记录：<span style="color:red">{{payTransactionList.count||0.00}}</span> 次，退款总金额：<span style="color:red">{{Number(payTransactionList.total).toFixed(2)||0.00}}</span>元</span>
  </p>
  <div v-loading='loading'>
    <el-table :data="payTransactionList.result" border :height="height" >
      <el-table-column type="index" width="70" label="序号"></el-table-column>
      <el-table-column property="payedTime" label="完成时间" width="170" :formatter="formatPayTime"></el-table-column>
      <el-table-column property="createTime" label="受理时间" width="170" :formatter="formatTime"></el-table-column>
      <el-table-column inline-template label="商户订单号" width="190">
        <div>
          <el-dropdown v-if="row.serviceNumberList.length > 1" :text="row.serviceNumberList && seleted(row.serviceNumberList)" type="text" :icon-separate="false" trigger="hover">
            <el-dropdown-item v-for="item in row.serviceNumberList">{{item}}</el-dropdown-item>
          </el-dropdown>
          <div v-else>
              <span v-for="item in row.serviceNumberList">{{item}}{{ row.a }}</span>
          </div>
        </div>
      </el-table-column>
      <el-table-column property="transactionNo" label="退款流水号" width="110" show-tooltip-when-overflow></el-table-column>
      <el-table-column property="yfbTransactionNo" label="易付宝交易号" width="130" show-tooltip-when-overflow></el-table-column>
      <el-table-column property="accountName" label="收款方姓名" width="110" show-tooltip-when-overflow></el-table-column>
      <el-table-column property="accountType" label="收款方账户类型" width="150" :formatter="getAccountTypeStr"  show-tooltip-when-overflow></el-table-column>
      <el-table-column property="accountBankShort" label="收款方银行编号" width="150" show-tooltip-when-overflow> </el-table-column>
      <el-table-column property="accountBankName" label="收款方银行名称" width="150" show-tooltip-when-overflow> </el-table-column>
      <el-table-column property="accountBankNumber" label="联行号" show-tooltip-when-overflow> </el-table-column>
      <el-table-column property="accountProvince" label="收款方开户行省" width="150" show-tooltip-when-overflow> </el-table-column>
      <el-table-column property="accountCity" label="收款方开户行市" width="150" show-tooltip-when-overflow> </el-table-column>
      <el-table-column property="accountNumber" label="收款方银行账号" width="150" show-tooltip-when-overflow> </el-table-column>
      <el-table-column property="toPayMoney" label="金额（元）" width="120" show-tooltip-when-overflow> </el-table-column>
      <el-table-column property="fee" label="手续费（元）" width="120" show-tooltip-when-overflow> </el-table-column>
      <el-table-column property="orderName" label="订单名称" width="100" show-tooltip-when-overflow> </el-table-column>
      <el-table-column property="userNumber" label="采购商ID" width="100" show-tooltip-when-overflow> </el-table-column>
      <el-table-column property="userName" label="采购商名称" width="150" show-tooltip-when-overflow> </el-table-column>
      <el-table-column inline-template label="退款状态" width="150">
        <div>
         <span v-if="row.payStatus == '2'">受理中</span>
         <span v-if="row.payStatus == '3'">退款成功</span>
         <span v-if="row.payStatus == '-1'">受理失败</span>
         <span v-if="row.payStatus == '-2'">支付失败</span>
         <span v-if="row.payStatus != '-2' && row.payStatus != '-1' && row.payStatus != '3' && row.payStatus != '2' ">状态异常</span>
        </div>
      </el-table-column>
    </el-table>
    <el-button style="position:absolute;left:20px;bottom:-25px"@click.native="handleReturn">返回</el-button>
    <div class="pagination-content">
    <pagination :page="payTransactionList.pageNumber" :total="payTransactionList.totalCount" :render="pageChange" :options="filters"></pagination>      
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>A
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
  data () {
    const filters = getCache({
      key: 'recordsFilters',
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
    this.height = String(document.documentElement.clientHeight - 400);
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
        url: AccountApi.BuyerRefund.PayTransaction_listRefund,
        method: 'post',
        data: { param: JSON.stringify(that.filters) }
      }).then(data => {
       that.fullscreenLoading = false;
        if (data.success === '1') {
          that.payTransactionList = data.page;
          that.payTransactionList.total = data.total;
          that.payTransactionList.count = data.count;
          that.loading = false;
          setCache({
            key: 'recordsFilters',
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
      this.$router.push('/refund/refunded/')
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
      return (row.createTime > 0 && row.createTime !== null ? formatTimeString(row.createTime) : '')
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
    }
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
