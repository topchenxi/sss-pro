<template>
<div class="pending-account" v-loading.fullscreen="fullscreenLoading">
  <h1 class="title" style="font-size: 25px; padding: 15px">已退款</h1>
  <HeadFilter v-on:getParams="getFilter" :param="filters"></HeadFilter>
  <p class="control">
    <!-- <span class="subtitle is-6">总记录数<span style='color:red'>{{Number(returnMoneyObject.totalCount) ? Number(returnMoneyObject.total).toFixed(2) : 0.00}} 次</span></span>
    <span class="subtitle is-6">总金额<span style='color:red'>{{Number(returnMoneyObject.total) ? Number(returnMoneyObject.total).toFixed(2) : 0.00}} 元</span></span> -->
    <el-button size="mini" type="primary" style="margin-bottom: 10px;" @click="jumpToList()">退款记录</el-button>
  </p>
  <div v-loading='loading'>
    <el-table class="fixed-table" :data="returnMoneyObject.result" border
    :height="height" @selection-change="handleMultipleSelectionChange">
      <el-table-column inline-template label="操作" width="100" fixed="right">
        <div>
          <router-link :to="{ path:'/refund/refunded/detail/'+row.id }"><el-button size="mini">明细</el-button></router-link>
        </div>
      </el-table-column>
      <!-- <el-table-column type="selection" width="50"></el-table-column> -->
      <el-table-column show-tooltip-when-overflow property="confirmPayTime" label="退款时间" width="150" :formatter="formatTime" ></el-table-column>
      <el-table-column property="serviceNumber" label="订单号" width="170" show-tooltip-when-overflow></el-table-column>
      <el-table-column inline-template label="退换货单号" width="150">
       <div>
           <el-tooltip placement="top">
             <div slot="content">
                <p v-for="item in row.returnReplaceNumber">
                  {{item}}
                </p>
             </div>
             <el-button type="text">{{row.returnReplaceNumber[0]}}<i class="el-icon-caret-bottom caret-bottom"></i></el-button>
           </el-tooltip>
       </div>
      </el-table-column>
      <el-table-column property="transactionNo" label="支付流水号/出金" width="170" show-tooltip-when-overflow> </el-table-column>
      <el-table-column property="yfbTransactionNo" label="易付宝交易号" width="150" show-tooltip-when-overflow>
      </el-table-column>
      <el-table-column property="buyerCompany" label="采购商" show-tooltip-when-overflow></el-table-column>
      <el-table-column property="sellerCompany" label="供应商" width="150" show-tooltip-when-overflow> </el-table-column>
      <el-table-column property="refundMoney" label="搜芽退款金额/元" width="150" show-tooltip-when-overflow></el-table-column>
      <el-table-column inline-template label="退换类型" width="100" show-tooltip-when-overflow>
         <div>
          <template v-if="row.replaceOrReturnType == '1'">退货</template>
          <template v-if="row.replaceOrReturnType == '2'">换货</template>
         </div>
      </el-table-column>
      <el-table-column inline-template label="退款状态" width="100">
        <div>
         <template v-if="row.payStatus == '1'">待退款</template>
         <template v-if="row.payStatus == '2'">退款中</template>
         <template v-if="row.payStatus == '3'">已退款</template>
         <template v-if="row.payStatus == '-1'">异常</template>
         <template v-if="row.payStatus == '-2'">未激活</template>
        </div>
      </el-table-column>
    </el-table>
    <div class="page">
      <pagination :page="returnMoneyObject.pageNumber" :total="returnMoneyObject.totalCount" :render="pageChange" :options="filters"></pagination>
    </div>
  </div>
</div>
</template>

<style lang="scss">
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
    .el-table td {
      overflow: inherit;
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
      key: 'refundeFilters',
    }) || {
      pageNumber: 1,
      pageSize: 20,
    };
    return {
      filters: filters, // 筛选参数
      returnMoneyObject: {}, // 已分账列表,
      fullscreenLoading: true,
      loading: false,
      height: '600'
    }
  },
  mounted() {
    this.height = String(document.documentElement.clientHeight - 400);
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
      delete params.buyerCompany
      this.filters = params
      this.filters.pageNumber = 1
      if (this.pageSize) {
        this.filters.pageSize = this.pageSize
      }
      this.loading = true
    },
    jumpToList() {
      sessionStorage.removeItem('recordsFilters')
      this.$router.push('/refund/refunded/records')
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
      request({
        url: AccountApi.BuyerRefund.listFinish,
        method: 'post',
        data: {
          param: JSON.stringify(that.filters)
        }
      }).then(data => {
        if (data.success === '1') {
          // const data = {
          //  'page': {
          //    'pageNumber': 1,
          //    'pageSize': 10,
          //    'totalCount': 90,
          //    'result': [
          //      {
          //        'id': 'DLQ16090001',
          //        'confirmPayTime': '1477977748171',
          //        'orderNumber': 'DLQ16090001',
          //        'serviceNumber': 'DLQ16097878',
          //        'returnReplaceNumber': ['Q16090001', 'Q160900333'],
          //        'transactionNo': 'X161103904903444',
          //        'yfbTransactionNo': 'X161103904903444',
          //        'buyerCompany': '李店铺',
          //        'sellerCompany': '布料店铺',
          //        'refundMoney': 1000,
          //        'replaceOrReturnType': 1,
          //        'payStatus': 1
          //      }
          //    ]
          //  }
          // }
          that.convertData(data)
        } else {
          Message({
            message: '请求数据失败,请手动刷新！',
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    convertData (data) {
     this.fullscreenLoading = false;
     this.loading = false;
     this.returnMoneyObject = data.page;
     const obj = JSON.parse(JSON.stringify(this.filters));
     obj.createTimeEnd = obj.transactionTimeEnd
     obj.createTimeBegin = obj.transactionTimeBegin
     setCache({
       key: 'refundeFilters',
       value: obj,
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
      return formatTimeString(row.confirmPayTime)
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
      return '已分账'
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
      this.loading = true
      this.getList()
    }
  }
}
</script>
