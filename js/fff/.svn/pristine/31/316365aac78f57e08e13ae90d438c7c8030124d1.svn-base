<template>
  <div class="content pending-list" v-loading.fullscreen="fullscreenLoading">
    <!-- <h1 style="font-size: 25px; padding: 15px">付款文件列表 -->
    <a style="cursor:pointer;margin-left:30px;color:blue; font-weight:500" @click="showDialog">重新选择</a>
    </h1>
    <el-table :data="fetchData.payTransactionList" border>
      <el-table-column type="index" width="70" label="序号"></el-table-column>
      <el-table-column prop="accountName" label="收款方姓名" min-width="120"></el-table-column>
      <el-table-column prop="accountType" label="收款方账户类型" min-width="140" :formatter="getAccountType"></el-table-column>
      <el-table-column prop="accountBankShort" label="收款方银行编号" min-width="140"></el-table-column>
      <el-table-column inline-template label="收款方银行名称" min-width="170">
        <!-- <span>{{row.accountType == 1 ? row.accountBranch : (row.toPayMoney > 50000 ? row.accountBankName : row.accountBranch) }}</span> -->
        <span>{{row.accountBankName}}</span>
      </el-table-column>
      <el-table-column prop="accountBankId" label="联行号" min-width="120"></el-table-column>
      <el-table-column prop="accountProvince" label="收款方开户行省" min-width="140"></el-table-column>
      <el-table-column prop="accountCity" label="收款方开户行市" min-width="140"></el-table-column>
      <el-table-column prop="accountNumber" label="收款方银行账号" min-width="140"></el-table-column>
      <el-table-column inline-template label="金额（元）" min-width="110">
        <span>{{Number(row.toPayMoney).toFixed(2)}}</span>
      </el-table-column>
      <el-table-column inline-template label="手续费（元）" min-width="120">
        <span>{{Number(row.fee).toFixed(2)}}</span>
      </el-table-column>
      <el-table-column prop="orderName" label="订单名称" min-width="100"></el-table-column>
      <el-table-column prop="userNumber" label="供应商ID" min-width="120"></el-table-column>
      <el-table-column prop="userName" label="供应商名称" min-width="120"></el-table-column>
      <el-table-column inline-template label="商户订单号" min-width="170">
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
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="80px" :inline="true">
      <el-form-item label="分账备注" prop="descr">
        <limitInput :maxLength="500" :model="formData.descr" v-on:update="val => formData.descr = val"></limitInput>
      </el-form-item>
    </el-form>
    <div class="btns">
      <el-button type="primary" @click.native="handlePay" :disabled="fullscreenLoading">去付款</el-button>
      <!-- <el-button type="info">导出</el-button> -->
      <el-button @click.native="handleReturn">返回</el-button>
      <el-button @click.native="queryBank()">查询银行编号</el-button>
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
        <el-form-item label="收款方开户支行">
          <el-input v-model="payTransaction.accountBranch"></el-input>
        </el-form-item>
        <el-form-item label="联行号" prop="accountBankId">
          <el-input v-model="payTransaction.accountBankId"></el-input>
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
        <el-form-item label="供应商">
          <el-input v-model="payTransaction.shopName" :disabled="true"></el-input>
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
    <el-dialog title="请重新选择收款供应商" v-model="listDialogVisible">
      <el-input v-model="list.keyword" @keyup.enter.native="search" placeholder="供应商/供应商ID" style="width:200px;"></el-input>
      <el-button type="primary" @click.native="search" style="margin-left:50px;">搜索(Enter)</el-button>
      <el-table :data="tableData" height="500" ref="multipleTable" @select="handleSelect" @select-all="handleSelectAll">
        <el-table-column type="selection" min-width="50" fixed="left" align="center" label="选择">
        </el-table-column>
        <el-table-column prop="shopCompany" label="供应商" align="center">
        </el-table-column>
        <el-table-column prop="sellerNumber" label="供应商ID" align="center">
        </el-table-column>
        <el-table-column prop="number" label="银行账号" align="center" min-width="200px;">
        </el-table-column>
        <el-table-column prop="bank" label="银行名称" align="center">
        </el-table-column>
      </el-table>
      <div class="cover-Box"></div>
      <div class="pagination-content">
        <Pagination :pageSize="dialogPage.pageSize" :page="dialogPage.pageNumber" :total="dialogPage.totalCount" :options="list" :render="changePage"></Pagination>
      </div>
      <div style="margin-top:20px; text-align:center">
        <el-button @click="listDialogVisible=false">取消</el-button>
        <el-button @click="confirmEvent" type="primary" :disabled="btnDisable">确认</el-button>
      </div>
    </el-dialog>
    <query-bank :bankVisible="bankVisible" v-on:showOrHideDialog="showOrHideDialog"></query-bank>
  </div>
</template>
<script>
import queryBank from 'components/queryBank/queryBank.vue'
import limitInput from 'components/limitInput.vue'
import Pagination from 'components/pagination'
import {
  newRequest,
  request,
  setCache,
} from 'src/common/utils.js'
import AccountApi from 'api/account.js'
export default {
  components: {
    queryBank,
    limitInput,
    Pagination
  },
  data() {
    const validateLength = (rule, value, callback) => {
      if (value.length > 500) {
        callback(new Error('备注不能超过500字'));
      } else {
        callback();
      }
    }
    return {
      listDialogVisible: false,
      companyId: '',
      dialogPage: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 0
      },
      list: {
        keyword: '',
        pageSize: 20,
        pageNumber: 1,
      },
      btnDisable: true,
      payTransactionId: '',
      tableData: [],
      newAccount: {},
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
        // accountBranch: [
        //   { required: true, message: '请输入收款方开户支行', trigger: 'blur' }
        // ],
        accountProvince: [
          { required: true, message: '请输入收款方开户行省', trigger: 'blur' }
        ],
        accountCity: [
          { required: true, message: '请输入收款方开户行市', trigger: 'blur' }
        ],
        accountBankId: [
          { message: '联行号', trigger: 'blur' }
        ],
        descr: [
          { validator: validateLength, trigger: 'blur' }
        ]
      },
      fullscreenLoading: true,
      formData: {
        id: this.$route.params.id,
        descr: '',
        _time: +new Date()
      }
    }
  },
  mounted() {
    this.id = this.$route.params.id.split(',');
    console.log({ payGroupOrderXIdList: JSON.stringify(this.id) })
    this.dispatch();
  },
  methods: {
    handleSelectAll() {
      this.$message('只能选择一个收款供应商')
      this.$refs.multipleTable.clearSelection()
      this.btnDisable = true
    },
    handleSelect(data, row) {
      // console.log(data)
      this.btnDisable = false
      this.$refs.multipleTable.clearSelection()
      this.$refs.multipleTable.toggleRowSelection(row)
      this.newAccount = row
      this.newAccount.bankAccountId = row.id
    },
    changePage() {
      this.getAccountList()
    },
    search() {
      this.getAccountList()
    },
    confirmEvent() {
      this.newAccount.payTransactionId = this.payTransactionId
      newRequest({
        url: '/redwood/account/PayTransaction/resetAccount',
        method: 'post',
        data: this.newAccount,
        contentType: 'application/json',
      }).then((res) => {
        if (res.success == 1) {
          this.$message({
            type: 'success',
            message: res.msg,
          })
          if (this.newAccount.realName) {
            this.fetchData.payTransactionList[0].accountName = this.newAccount.realName
            this.fetchData.payTransactionList[0].accountType = '个人'
          } else {
            this.fetchData.payTransactionList[0].accountName = this.newAccount.company
            this.fetchData.payTransactionList[0].accountType = '企业'
          }
          this.fetchData.payTransactionList[0].accountBankShort = this.newAccount.bankShort
          this.fetchData.payTransactionList[0].accountBranch = this.newAccount.branch
          this.fetchData.payTransactionList[0].accountBankId = this.newAccount.bankId
          this.fetchData.payTransactionList[0].accountProvince = this.newAccount.province
          this.fetchData.payTransactionList[0].accountCity = this.newAccount.city
          this.fetchData.payTransactionList[0].accountNumber = this.newAccount.number
          this.fetchData.payTransactionList[0].userNumber = this.newAccount.sellerNumber
          this.fetchData.payTransactionList[0].userName = this.newAccount.shopCompany
          console.log(this.fetchData.payTransactionList)
          this.listDialogVisible = false
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getAccountList() {
      newRequest({
        url: '/redwood/bankAccount/list',
        method: 'get',
        data: this.list,
      }).then((res) => {
        if (res.success == 1) {
          this.tableData = res.page.result
          this.dialogPage.pageSize = res.page.pageSize
          this.dialogPage.pageNumber = res.page.pageNumber
          this.dialogPage.totalCount = res.page.totalCount
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    showDialog() {
      this.getAccountList()
      this.listDialogVisible = true
    },
    showOrHideDialog(value) {
      this.bankVisible = value
    },
    /**
     * 请求分账
     */
    dispatch() {
      this.fullscreenLoading = true;
      newRequest({
        url: AccountApi.PayTransaction.dispatch,
        method: 'get',
        data: { ids: this.id.join(',') }
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          this.fetchData = data.obj;
          this.payTransactionId = data.obj.payTransactionList[0].id
        } else {
          this.$message({
            type: 'error',
            message: data.msg
          })
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
    queryBank() {
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
              accountBankId: this.payTransaction.accountBankId,
              accountProvince: this.payTransaction.accountProvince,
              accountCity: this.payTransaction.accountCity,
              accountNumber: this.payTransaction.accountNumber.replace(/\s+/g, ''),
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
      const that = this
      let bool = true
      that.fetchData.payTransactionList && that.fetchData.payTransactionList.map((item, index) => {
        if (item.accountNumber != null) {
          that.fetchData.payTransactionList[index].accountNumber = item.accountNumber.replace(/\s+/g, '')
        } else {
          bool = false
        }
      })
      if (bool) {
        setCache({
          key: 'dispatch',
          value: this.fetchData
        });
        this.fullscreenLoading = true;
        request({
          url: '/redwood/account/PayGroupOrderX/updateDescr',
          method: 'post',
          contentType: 'application/json',
          data: JSON.stringify(this.formData)
        }).then((response) => {
          this.fullscreenLoading = false;
          if (response.success == 1) {
            this.$router.push('/finance/pendingAccount/pay/' + this.fetchData.batchNo);
          }
        })
      } else {
        this.$message('请重新选择供应商收款方式')
      }
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
<style lang="scss" scoped>
.cover-Box {
  width: 50px;
  height: 50px;
  top: 100px;
  left: 20px;
  position: absolute;
  z-index: 100;
  background-color: #fff;
  opacity: 0;
  cursor: not-allowed;
  border: 0 solid #eef1f6;
}

.pending-list {
  .btns {
    margin: 15px 0;
  }
}

.app-main {
  transform: inherit;
}
</style>
