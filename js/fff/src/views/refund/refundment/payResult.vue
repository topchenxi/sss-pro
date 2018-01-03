<template>
  <div class="pay-result content">
    <!-- <h1>退款结果</h1> -->
    <div class="box">
      <p> 退款结果 </p>
      <div class="content">
        <el-table :data="payResult.payTransactionList" border>
          <el-table-column property="createTime" label="受理时间"  width="160" :formatter="formatTime" show-tooltip-when-overflow></el-table-column>
          <el-table-column property="accountName" label="收款方姓名"  width="100"></el-table-column>
          <el-table-column property="accountType" label="收款方账户类型" width="120" :formatter="getAccountType"></el-table-column>
          <el-table-column property="accountBankShort" label="收款方银行编号" width="150"></el-table-column>
          <el-table-column property="accountBranch" label="收款方开户支行" width="150" show-tooltip-when-overflow></el-table-column>
          <el-table-column property="accountBankId" label="联行号" width="150" show-tooltip-when-overflow></el-table-column>
          <el-table-column property="accountProvince" label="收款方开户行省" width="150"></el-table-column>
          <el-table-column property="accountCity" label="收款方开户行市" width="150"></el-table-column>
          <el-table-column property="accountNumber" label="收款方银行账号" width="150" show-tooltip-when-overflow></el-table-column>
          <el-table-column inline-template label="金额（元）" width="150">
            <span>{{Number(row.toPayMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="手续费（元）" width="150">
            <span>{{Number(row.fee).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column property="orderName" label="订单名称" width="100"></el-table-column>
          <el-table-column property="userName" label="采购商" width="150" show-tooltip-when-overflow></el-table-column>
          <el-table-column inline-template label="商户订单号" width="100">
            <div>
              <el-dropdown v-if="row.serviceNumberList.length > 1" :text="row.serviceNumberList && row.serviceNumberList[0]" type="text" :icon-separate="false" trigger="hover">
                <el-dropdown-item v-for="item in row.serviceNumberList">{{item}}</el-dropdown-item>
              </el-dropdown>
              <div v-else>
                  <span v-for="item in row.serviceNumberList">{{item}}{{ row.a }}</span>
              </div>
            </div>
          </el-table-column>
          <el-table-column property="transactionNo" label="退款流水号" width="150" show-tooltip-when-overflow></el-table-column>
          <el-table-column property="payStatus" label="受理状态" width="150" :formatter="getPayStatus" show-tooltip-when-overflow></el-table-column>
        </el-table>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-button type="primary" @click.native.prevent="handleReturn">确认</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>

</template>

<script>
import {
  getCache,
  formatTimeString,
  getPayStatusStr,
} from 'common/utils'
export default {
  data() {
      return {
        payResult: {
          applyCount: 0,
          applyMoney: 0,
          successCount: 0,
          payMoney: 0,
          payTransactionList: [{}]
        },
      }
    },
    mounted() {
      this.payResult = getCache({
        key: 'payResult'
      });
      console.log('this.payResult:', this.payResult)
    },
    computed: {},
    ready() {},
    attached() {},
    methods: {
      /**
       * 返回跳转到已分账列表
       */
      handleReturn() {
        this.$router.push('/refund/refundment/');
      },
      formatTime(row, column) { // 格式化时间
        return formatTimeString(row.createTime)
      },
      getAccountType(row, column) { // 收款方账户类型
        return row.accountType === 1 ? '企业' : '个人'
      },
      getPayStatus(row, column) { // 收款方账户类型
        let payStatusStr = ''
        if (row.payStatus == 3) {
          payStatusStr = '退款成功'
        } else if (row.payStatus == -2) {
          payStatusStr = '退款失败'
        } else {
          payStatusStr = getPayStatusStr(row.payStatus)
        }
        return payStatusStr
      }
    },
    components: {}
}
</script>

<style lang="scss">
.pay-result{
  .el-row{
    margin-top: 20px;
  }
}
</style>
