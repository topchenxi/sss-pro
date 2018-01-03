<template>
<div class="pending-account" v-loading.body="fullscreenLoading">
  <!-- <h1 class="title" style="font-size: 25px; padding: 15px">待结算订单记录</h1> -->
  <HeadFilter v-on:getParams="getFilter" :param="filters"></HeadFilter>
  <p style='margin: 15px 0'>
    <span style='margin-left: 15px;'>待结算总金额：<span class='red'>{{Number(waitingAccountListData.total).toFixed(2)||0.00}}</span> 元</span>
  </p>
  <div class="">
    <el-table class="fixed-table" :data="waitingAccountListData.result" border :height="height">
      <el-table-column property="serviceNumber" label="订单号" min-width="170"></el-table-column>
      <el-table-column property="outReposityNumber" label="出仓单号" min-width="170"></el-table-column>
      <el-table-column inline-template label="原订单销售货款/元"  min-width="130">
        <span>{{Number(row.totalSaleMoney).toFixed(2)}}</span>
      </el-table-column>
      <el-table-column inline-template label="采购商税款/元"  min-width="130">
        <span>{{Number(row.totalTaxMoney).toFixed(2)}}</span>
      </el-table-column>
      <el-table-column inline-template label="服务费/元"  min-width="120">
        <span>{{Number(row.totalServiceMoney).toFixed(2)}}</span>
      </el-table-column>
      <el-table-column inline-template label="出仓销售货款/元"  min-width="120">
        <span>{{Number(row.saleMoney).toFixed(2)}}</span>
      </el-table-column>
      <el-table-column inline-template label="应收出仓销售货款/元"  min-width="130">
        <span>{{Number(row.needSaleMoney).toFixed(2)}}</span>
      </el-table-column>
      <el-table-column inline-template label="运费/元"  min-width="100">
        <span>{{Number(row.freightMoney).toFixed(2)}}</span>
      </el-table-column>
      <el-table-column inline-template label="应收款/元"  min-width="100">
        <span>{{Number(row.totalMoney).toFixed(2)}}</span>
      </el-table-column>
      <el-table-column property="category" label="订单类型" min-width="100" :formatter="getCategoryStr"></el-table-column>
      <el-table-column property="buyerCompany" label="采购商" min-width="120"> </el-table-column>
      <el-table-column property="buyerNumber" label="采购商ID" min-width="120"> </el-table-column>
      <el-table-column inline-template label="跟单员" min-width="120">
        <div>{{row.follower}}/{{row.followerTel}}</div>
      </el-table-column>
    </el-table>
    <div class="pagination-content">
      <pagination :page="waitingAccountListData.pageNumber" :total="waitingAccountListData.totalCount" :render="pageChange" :options="filters"></pagination>
    </div>
  </div>

</div>
</template>
<script>
import HeadFilter from 'components/headFilter/HeadFilter.vue'
import pagination from 'components/pagination'
import Lightbox from 'components/lightbox/lightbox'
import {
  request,
  formatTimeString,
  getCategoryStr,
  getSourceStr,
  getFundTypeStr,
  getPayWayStr,
  getCache,
  setCache,
} from 'src/common/utils.js'
import AccountApi from 'api/account.js'
import { Message } from 'element-ui'
export default {
  components: {
    HeadFilter,
    Lightbox,
    pagination
  },
  data() {
    const filters = Object.assign({
      pageNumber: 1,
      pageSize: 20,
    }, getCache({
      key: 'waitingAccountFilters',
    }));
    return {
      time: new Date().getTime(),
      filters: filters, // 筛选参数
      hasSelect: false,
      waitingAccountListData: {}, // 待分账列表
      multipleSelection: [],
      fullscreenLoading: true,
      height: '600'
    }
  },
  computed: {},
  mounted() {
    this.height = String(document.documentElement.clientHeight - 850);
    this.getList(); // 获取待分账列表
  },
  methods: {
    /**
     * 获取筛选参数
     */
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
      this.filters = Object.assign({
        pageNumber: 1,
        pageSize: 20,
      }, this.filters)
    },
    pageChange() {
      this.getList()
    },
    /**
     * 获取待分账列表
     * @params this.filters
     */
    getList() {
      this.fullscreenLoading = true;
      setCache({
        key: 'waitingAccountFilters',
        value: this.filters,
      });
      request({
        url: AccountApi.PayGroupOrderX.listWaitPay,
        method: 'post',
        data: {
          param: JSON.stringify(this.filters)
        }
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          // const resultArray = []
          // if (data.page.result && data.page.result.length > 0) {
          //   const resultLength = data.page.result.length
          //   for (let i = 0; i < resultLength; i++) {
          //     if (data.page.result[i]) {
          //       const orderNumber = data.page.result[i].orderNumber
          //       if (orderNumber != '12930174' && orderNumber != '12930246' && orderNumber != '12945659') {
          //         resultArray.push(data.page.result[i])
          //         // data.page.result.splice(i, 1)
          //       }
          //     }
          //   }
          // }
          // console.log('resultArray', resultArray)
          // data.page.result = resultArray
          this.waitingAccountListData = data.page;
          this.waitingAccountListData.total = data.total;
        } else {
          Message({
            message: '请求数据失败,请手动刷新！',
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    formatTime(row, column) { // 格式化时间
      return formatTimeString(row.confirmTime)
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
      return '待分账'
    },
    // payType(row, column) { // 分账类型映射
    //   return row.payType === 0 ? '垫付' : '实付'
    // },
    handleMultipleSelectionChange(val) {
      // console.log('multipleSelection', val);
      this.multipleSelection = val;
      this.hasSelect = !!val.length
    },
    handleCurrentChange(val) { // 切换页面
      // console.log(`当前页: ${val}`);
      this.filters.pageNumber = val;
      this.getList();
    },
    handleDispatch() { // 批量分账
      const id = this.multipleSelection.map((obj) => {
        return obj.id
      })
      // console.log('id', id);
      this.$router.push('/finance/pendingAccount/list/' + id.join(','))
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

<style lang="scss">
.pending-account {
    .button {
        vertical-align: middle;
    }
    .number {
        border-radius: 0;
    }
    .text-r {
        text-align: right;
    }
}
</style>
