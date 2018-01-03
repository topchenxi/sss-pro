<template>
<div class="content pending-list" v-loading.fullscreen="fullscreenLoading">
  <!-- <h1>银行账户信息</h1> -->
  <el-table :data="fetchData.payTransactionList" border >
    <el-table-column property="accountName" label="收款方姓名"  width="110"></el-table-column>
    <el-table-column property="accountType" label="收款方账户类型" width="140" :formatter="getAccountType"></el-table-column>
    <el-table-column property="accountBankShort" label="收款方银行编号" width="150"></el-table-column>
    <el-table-column property="accountBranch" label="收款方开户支行" width="150" show-tooltip-when-overflow></el-table-column>
    <el-table-column property="accountBankNumber" label="联行号" width="150" show-tooltip-when-overflow></el-table-column>
    <el-table-column property="accountProvince" label="收款方开户行省" width="150"></el-table-column>
    <el-table-column property="accountCity" label="收款方开户行市" width="150"></el-table-column>
    <el-table-column property="accountNumber" label="收款方银行账号" width="150" show-tooltip-when-overflow></el-table-column>
    <el-table-column inline-template label="金额（元）" width="150">
      <span>{{Number(row.toPayMoney).toFixed(2)}}</span>
    </el-table-column>
    <el-table-column inline-template label="手续费（元）" width="150">
      <span>{{Number(row.fee).toFixed(2)}}</span>
    </el-table-column>
    <el-table-column property="orderName" label="订单名称" width="150"></el-table-column>
    <el-table-column property="userName" label="采购商名称" width="150" show-tooltip-when-overflow></el-table-column>
    <el-table-column inline-template label="商户订单号" width="190">
      <div>
        <el-dropdown v-if="row.serviceNumberList.length > 1" :text="row.serviceNumberList && row.serviceNumberList[0]" type="text" :icon-separate="false" trigger="hover">
          <el-dropdown-item v-for="item in row.serviceNumberList">{{item}}</el-dropdown-item>
        </el-dropdown>
        <div v-else>
            <span v-for="item in row.serviceNumberList">{{item}}{{ row.a }}</span>
        </div>
      </div>
    </el-table-column>
    <el-table-column inline-template label="操作">
      <el-button @click.native="handleEdit(row)" size="mini">{{row.a}}编辑</el-button>
    </el-table-column>
  </el-table>

  <div class="btns">
    <el-button type="primary" @click.native="handlePay" :disabled="fullscreenLoading">去退款</el-button>
    <!-- <el-button type="info">导出</el-button> -->
    <el-button @click.native="handleReturn">返回</el-button>
    <el-button @click.native="queryBank()" size="mini">查询银行编号</el-button>
  </div>

  <el-dialog title="收款方式" v-model="dialogVisible">
    <el-form :model="payTransaction" :rules="rules" ref="ruleForm" label-width="150px">
      <el-form-item label="收款方姓名" prop="accountName">
        <el-input v-model="payTransaction.accountName"></el-input>
      </el-form-item>
      <el-form-item label="收款方账户类型">
        <el-input v-model="payTransaction.accountType" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="收款方银行编号">
        <el-input v-model="payTransaction.accountBankShort" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="收款方开户支行" prop="accountBranch">
        <el-input v-model="payTransaction.accountBranch"></el-input>
      </el-form-item>
      <el-form-item label="联行号" prop="accountBankNumber">
        <el-input v-model="payTransaction.accountBankNumber"></el-input>
      </el-form-item>
      <el-form-item label="收款方开户行省" prop="accountProvince">
        <el-input v-model="payTransaction.accountProvince"></el-input>
      </el-form-item>
      <el-form-item label="收款方开户行市" prop="accountCity">
        <el-input v-model="payTransaction.accountCity"></el-input>
      </el-form-item>
      <el-form-item label="收款方银行账号" prop="accountNumber">
        <el-input v-model="payTransaction.accountNumber"></el-input>
      </el-form-item>
      <el-form-item label="金额（元）">
        <el-input v-model="payTransaction.toPayMoney" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="订单名称">
        <el-input v-model="payTransaction.orderName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="采购商">
        <el-input v-model="payTransaction.userName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="商户订单号" v-if="payTransaction.serviceNumberList">
        <el-input v-model="payTransaction.serviceNumberList[0]" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="handleSubmit">确定</el-button>
        <el-button @click.native.prevent="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <query-bank :bankVisible="bankVisible" v-on:showOrHideDialog="showOrHideDialog"></query-bank>
</div>
</template>
<script>
  import queryBank from 'components/queryBank/queryBank.vue'
  import {
    request,
    newRequest,
    setCache,
  } from 'src/common/utils.js'
  import AccountApi from 'api/account.js'
  export default {
    components: {
      queryBank
    },
    data() {
      return {
        time: new Date().getTime(),
        id: '', // 分账ＩＤ
        fetchData: {},
        dialogVisible: false, // 修改付款方式对话框显隐
        bankVisible: false, // 银行列表查询对话框显隐
        payTransaction: {}, // 修改付款方式表单
        rules: {
          accountName: [
            { required: true, message: '请输入收款方姓名', trigger: 'blur' }
          ],
          accountNumber: [
            { required: true, message: '请输入收款方银行账号', trigger: 'blur' }
          ],
          accountBranch: [
            { required: true, message: '请输入收款方开户支行', trigger: 'blur' }
          ],
          accountProvince: [
            { required: true, message: '请输入收款方开户行省', trigger: 'blur' }
          ],
          accountCity: [
            { required: true, message: '请输入收款方开户行市', trigger: 'blur' }
          ],
          accountBankNumber: [
            { required: true, message: '联行号', trigger: 'blur' }
          ],
        },
        fullscreenLoading: true
      }
    },
    mounted() {
      this.id = this.$route.params.id.split(',');
      console.log({ payGroupOrderXIdList: JSON.stringify(this.id) })
      this.dispatch();
    },
    methods: {
      showOrHideDialog (value) {
        this.bankVisible = value
      },
      /**
       * 请求分账
       */
      dispatch() {
        this.fullscreenLoading = true;
        const param = { buyerRefundIdList: this.id, _time: this.time }
        request({
          url: AccountApi.BuyerRefund.dispatchRefund,
          method: 'post',
          data: { param: JSON.stringify(param) }
        }).then(data => {
          console.log('data', data);
          this.fullscreenLoading = false;
          if (data.success === '1') {
            this.fetchData = data.obj;
          }
        })
      },
      /**
       * 弹出编辑对话框
       */
      handleEdit(row) {
        // console.log('row', row);
        this.payTransaction = Object.assign({}, row);
        this.payTransaction.accountType = this.payTransaction.accountType == '1' ? '企业' : '个人'
        this.dialogVisible = true;
        this.time = new Date().getTime();
      },
      queryBank () {
        this.bankVisible = true;
      },
      /**
       * 提交表单－修改付款方式
       */
      handleSubmit() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.fullscreenLoading = true;
            newRequest({
              url: AccountApi.PayTransaction.updateAccount,
              method: 'post',
              contentType: 'application/json',
              data: {
                id: this.payTransaction.id,
                accountName: this.payTransaction.accountName,
                accountBranch: this.payTransaction.accountBranch,
                accountBankNumber: this.payTransaction.accountBankNumber,
                accountProvince: this.payTransaction.accountProvince,
                accountCity: this.payTransaction.accountCity,
                accountNumber: this.payTransaction.accountNumber,
                _time: this.time,
              }
            }).then(data => {
              console.log('data', data);
              this.fullscreenLoading = false;
              if (data.success === '1') {
                this.dialogVisible = false;
                this.$message({
                  type: 'success',
                  message: '修改成功！',
                });
                this.fetchData.payTransactionList.forEach(obj => { // 更新列表的值
                  if (obj.id === this.payTransaction.id) {
                    Object.assign(obj, this.payTransaction);
                    return false;
                  }
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '修改失败！',
                });
              }
            })
          } else {
            return false;
          }
        });
      },
      /**
       * 去付款
       */
      handlePay() {
        setCache({
          key: 'dispatch',
          value: this.fetchData
        });
        this.$router.push('/refund/refundment/pay/' + this.fetchData.batchNo);
      },
      /**
       * 返回详情页
       */
      handleReturn() {
        this.$router.back();
      },
      getAccountType(row, column) { // 收款方账户类型
        return row.accountType === 1 ? '企业' : '个人'
      },
    }
  }
</script>
<style lang="scss">
.pending-list{
  .btns{
    margin: 15px 0;
  }
}
.app-main{
  transform: inherit;
}
</style>
