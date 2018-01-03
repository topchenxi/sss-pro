<template>
<div v-loading.body="fullscreenLoading" class='hasGetAndPay-body'>
  <!-- <h1 class="title" style="font-size: 25px; padding: 15px">已收付</h1> -->
  <HeadFilter v-on:getParams="getFilter" @exporHandle="exporExcel" :param="filters"></HeadFilter>
  <el-tabs type="border-card"  @tab-click="switchTab" style = "width: 100%;">
    <el-tab-pane label="已收款">

    </el-tab-pane>
    <el-tab-pane label="已销账">

    </el-tab-pane>
    <el-tab-pane label="已退款">

    </el-tab-pane>
      <div class='title-tab'>
        {{currentTab == 1 ? '收款总金额' : (currentTab == 2 ? '销账总金额' : '退款总金额')}} :
        <span class='red'>{{Number(listData.total).toFixed(2)||0.00}}</span> 元
      </div>
      <el-table class="fixed-table" :data="result" border :height="height">
        <el-table-column inline-template
          :label="currentTab == 1 ? '收款日期' : (currentTab == 2 ? '销账日期' : '退款日期')" min-width="170">
            <span>{{formatTime(row.confirmPayTime || row.handlerTime || row.confirmPayTime)}}</span>
          </el-table-column>
        <el-table-column property="returnReplaceNumber" label="单号" min-width="170"></el-table-column>
        <el-table-column property="serviceNumber" label="订单号" min-width="170"></el-table-column>
        <el-table-column v-if='currentTab == 1' inline-template label="供应商退款/元"  min-width="140">
           <span>{{Number(row.refundMoney).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column v-if='currentTab == 1' inline-template label="到账金额/元"  min-width="140">
          <span>{{Number(row.incomeMoney).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column v-if='currentTab == 2' inline-template label="销账金额/元"  min-width="140">
           <span>{{row.xiaozhangMoney > 0 ? "+" : ''}}{{Number(row.xiaozhangMoney).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column v-if='currentTab == 2' inline-template label="实收销账金额/元"  min-width="140">
           <span>{{row.shishouTkMoney > 0 ? "+" : ''}}{{row.shishouTkMoney === null ? '--' : Number(row.shishouTkMoney).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column v-if='currentTab == 2' inline-template label="实付销账金额/元"  min-width="140">
           <span>{{row.shifuXzMoney > 0 ? "+" : ''}}{{row.shifuXzMoney === null ? '--' : Number(row.shifuXzMoney).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column v-if='currentTab == 3' inline-template label="退款金额/元"  min-width="140">
          <span>{{Number(row.refundMoney).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column v-if='currentTab == 3' inline-template label="退回虚拟账户/元"  min-width="140">
          <span>{{Number(row.returnToBalance).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column v-if='currentTab == 3' inline-template label="退回授信额度/元"  min-width="140">
          <span>{{Number(row.returnToCreditLine).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column v-if='currentTab == 2' property="batchNumber" label="批次号" min-width="120"> </el-table-column>
        <el-table-column property="sellerCompany" label="供应商" min-width="120"> </el-table-column>
        <el-table-column property="sellerNumber" label="供应商ID" min-width="120"> </el-table-column>
        <el-table-column property="buyerCompany" label="采购商" min-width="120"> </el-table-column>
        <el-table-column property="buyerNumber" label="采购商ID" min-width="120"> </el-table-column>
        <el-table-column inline-template label="销账人员" min-width="120">
          <div>{{row.purchaserName}}/{{row.purchaserTel}}</div>
        </el-table-column>
        <el-table-column inline-template label="销账类型" min-width="100" >
          <span>{{replaceOrReturnTypeList[row.returnReplaceType - 1]}}</span>
        </el-table-column>
        <el-table-column v-if='currentTab != 3' inline-template property="returnReplaceCreateTime" label="申请退换货时间" min-width="170">
          <span v-if="row.returnReplaceType == 5 || row.returnReplaceType == 6"> -- </span>
          <span v-else>{{formatTime(row.returnReplaceCreateTime)}}</span>
        </el-table-column>
        <el-table-column v-if='currentTab == 2' inline-template property="madan" label="码单编号" min-width="120">
          <span v-if="row.returnReplaceType == 6">{{row.madan}}</span>
          <span v-else> -- </span>
        </el-table-column>
        <el-table-column v-if='currentTab == 1' inline-template label="财务收款账户" width='200'>
          <div><p>{{ row.financeAccountBank }}</p><p>{{ row.financeAccount }}</p></div>
        </el-table-column>
        <el-table-column v-if='currentTab == 2' inline-template label="销账备注" width='200'>
          <div><p>{{row.remark}}</p></div>
        </el-table-column>
        <el-table-column inline-template label="操作" width='100' fixed="right">
          <el-button size='mini' @click.native='jumpToDebtDetail(row.id, row.returnReplaceType)'>明细</el-button>
        </el-table-column>
      </el-table>
  </el-tabs>
  <div class="pagination-content">
    <pagination :page="listData.page && listData.page.pageNumber" :total="listData.page && listData.page.totalCount" :render="getList" :options="filters"></pagination>
  </div>
</div>
</template>

<style lang="scss">
  .hasGetAndPay-body {
    .title-tab {
      padding-bottom: 15px;
    }
    .red{
      color: red;
    }
  }
</style>
<script>
import HeadFilter from 'components/headFilter/HeadFilter.vue'
import pagination from 'components/pagination'
import {
  request,
  formatTimeString,
  getCache,
  setCache,
} from 'src/common/utils.js'
import _ from 'lodash'
import AccountApi from 'api/account.js'
import { Message } from 'element-ui'
export default {
  components: {
    HeadFilter,
    pagination
  },
  data() {
    const filters = getCache({
      key: 'hasGetAndPayFilters',
    }) || {
      pageNumber: 1,
      pageSize: 20,
    };
    return {
      time: new Date().getTime(),
      height: '600',
      fullscreenLoading: true,
      filters: filters,
      currentTab: 1,
      listData: {
        total: 0,
        page: {
          result: []
        }
      },
      result: [],
      replaceOrReturnTypeList: ['售前退货', '售前换货', '售后退货', '售后换货', '运费', '剪版'],
    }
  },
  created() {
    this.currentTab = getCache({
      key: 'hasGetAndPayTabType',
    }) || 1
  },
  mounted () {
    this.height = String(document.documentElement.clientHeight - 900);
    this.$nextTick(function () {
      const tabs = document.getElementsByClassName('el-tabs__item')
      tabs[0].click()
    })
  },
  watch: {
    filters: function (newValue, oldVal) {
      this.fullscreenLoading = false
      newValue.currentTab = this.currentTab
      this.getList()
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      for (let i = 0; i < val.length; i++) {
        this.xiaozhangDialog.row.xiaozhangMoney = this.xiaozhangDialog.row.xiaozhangMoney + val[i].xiaozhangMoney
        this.xiaozhangDialog.row.ids.push(val[i].id)
        delete this.xiaozhangDialog.row.id
      }
    },
    getList() {
      this.fullscreenLoading = true
      const url = [AccountApi.OnlineReceiveSeller.listPost, AccountApi.ChargeOffRecords.handledList, AccountApi.BuyerRefund.listPost]
      const that = this
      if (this.filters && !this.filters.pageNumber) {
        this.filters.pageNumber = 1
      }
      if (this.filters && !this.filters.pageSize) {
        this.filters.pageSize = 20
      }
      this.filters._time = this.time;
      const param = _.cloneDeep(that.filters)
      delete param.currentTab
      if (param.shopName) {
        param.sellerCompany = param.shopName
        delete param.shopName
      }
      request({
        url: url[this.currentTab - 1],
        method: 'post',
        data: {
          param: JSON.stringify(param)
        }
      }).then(data => {
        that.fullscreenLoading = false
        if (data.success === '1') {
          that.listData = data;
          that.listData.total = data.total;
          that.result = data.page.result
          setCache({
            key: 'hasGetAndPayFilters',
            value: that.filters,
          });
          console.log('this.listData', this.listData)
        } else {
          Message({
            message: data.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    jumpToDebtDetail(id, returnReplaceType) {
      if (returnReplaceType == 5) { // 运费
        this.$router.push(`/exchange/hasGetAndPay/yfDetail?id=${id}`)
      } else if (returnReplaceType == 6) { // 剪版
        this.$router.push(`/exchange/hasGetAndPay/jbDetail?id=${id}`)
      } else {
        this.$router.push(`/exchange/hasGetAndPay/detail?id=${id}`)
      }
    },
    switchTab(tabObj) {
      this.currentTab = (Number(tabObj.index) + 1)
      this.filters = {
        pageNumber: 1,
        currentTab: this.currentTab,
        pageSize: 20
      }
      setCache({
        key: 'hasGetAndPayTabType',
        value: this.currentTab
      })
    },
    getFilter(params) {
      this.filters = params
      this.filters.pageNumber = 1
    },
    handleGet(row) {
      // 确认收款 弹窗
      this.handleGetDialog.show = true
      this.handleGetDialog.row = row
      this.sellerCertificateList = row.sellerCertificateList
    },
    handleGetSave() {
      const that = this
       request({
        url: AccountApi.OnlineReceiveSeller.confirmIncome,
        method: 'post',
        data: {
          param: JSON.stringify({
            id: that.handleGetDialog.row.id,
            _time: new Date().getTime,
          })
        }
      }).then(data => {
        that.fullscreenLoading = false
        if (data.success === '1') {
          that.listData = data.page;
          that.listData.total = data.total;
          setCache({
            key: 'hasGetAndPayFilters',
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
      // 确认收款
    },
    showDialogForm(id) { // 设置异常弹出框
      this.dialogFormVisible = true;
      this.sendbackIncomeForm.id = id;
      this.sendbackIncomeForm._time = new Date().getTime();
    },
    /**
     * 提交对账异常
     */
    submitDialogForm() {
      this.$refs.sendbackIncomeForm.validate((valid) => {
        if (valid) {
          this.fullscreenLoading = true;
          request({
            url: AccountApi.OnlineReceiveSeller.sendbackIncome,
            method: 'post',
            data: {
              param: JSON.stringify(this.sendbackIncomeForm)
            }
          }).then(data => {
            // console.log('data', data);
            this.fullscreenLoading = false;
            this.dialogFormVisible = false;
            if (data.success === '1') {
              this.pendingAccountListData.result = this.pendingAccountListData.result.filter((obj, i) => {
                return obj.id !== this.sendbackIncomeForm.id
              });
              this.$message({
                type: 'success',
                message: '提交异常成功'
              })
            } else {
              this.$message({
                type: 'success',
                message: '提交异常失败'
              })
            }
          })
        } else {
          return false;
        }
      });
    },
    xiaoZhangShow(row) {
      const that = this
      that.xiaozhangDialog.show = true
      that.xiaozhangDialog.row = row
      this.xiaozhangDialog._time = new Date().getTime()
    },
    xiaoZhangSave() {
      const that = this
      const xiaozhangDialog = that.xiaozhangDialog
      const params = {
        xiaozhangMoney: xiaozhangDialog.row.xiaozhangMoney,
        shifuXzMoney: xiaozhangDialog.row.shifuXzMoney,
        _time: xiaozhangDialog._time
      }
      if (xiaozhangDialog.row.id) {
        params.id = xiaozhangDialog.row.id
      } else {
        params.ids = xiaozhangDialog.row.ids
      }
      if (xiaozhangDialog.row.xiaozhangMoney >= 0) {
        params.shishouTkMoney = xiaozhangDialog.form.shishouTkMoney
      } else {
        params.fukuanType = xiaozhangDialog.form.fukuanType
      }
      request({
        url: params.id ? AccountApi.ChargeOffRecords.xiaozhang : AccountApi.ChargeOffRecords.batchXiaozhang,
        method: 'post',
        data: {
          param: JSON.stringify(params)
        }
      }).then(data => {
        // console.log('data', data);
        that.fullscreenLoading = false;
        that.dialogFormVisible = false;
        if (data.success === '1') {
          that.pendingAccountListData.result = that.pendingAccountListData.result.filter((obj, i) => {
            return obj.id !== that.sendbackIncomeForm.id
          });
          that.$message({
            type: 'success',
            message: data.msg
          })
        } else {
          that.$message({
            type: 'success',
            message: data.msg
          })
        }
      })
    },
    refundhandle(row) {
      this.refundHandleDialog.row = row
      this.refundHandleDialog.show = true
      this.refundHandleDialog._time = new Date().getTime()
    },
    refundhandleSave() {
      let that = this
       request({
        url: AccountApi.BuyerRefund.confirmIncome,
        method: 'post',
        data: {
          param: JSON.stringify({
            id: that.refundHandleDialog.row.id,
            _time: that.refundHandleDialog._time
          })
        }
      }).then(data => {
        that.fullscreenLoading = false;
        that.dialogFormVisible = false;
        if (data.success === '1') {
          that.pendingAccountListData.result = that.pendingAccountListData.result.filter((obj, i) => {
            return obj.id !== that.sendbackIncomeForm.id
          });
          that.$message({
            type: 'success',
            message: data.msg
          })
        } else {
          that.$message({
            type: 'success',
            message: data.msg
          })
        }
      })
    },
    batchXiaoZhangHandle() {
      this.xiaozhangDialog.show = true
    },
    formatTime(time) { // 格式化时间
      return formatTimeString(time)
    },
    exporExcel(params) { // 分账类型映射
      params.type = 2
      const url = `${AccountApi.ChargeOffRecords.export}?param=${JSON.stringify(params)}`
      window.open(url)
    },
  }
}
</script>
