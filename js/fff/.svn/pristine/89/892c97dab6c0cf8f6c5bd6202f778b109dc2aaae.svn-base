<template>
  <div class="money-manage" v-loading.body="fullscreenLoading">
    <div class="condition" style="background-color:#fff;padding: 10px;">
      <el-row :gutter="20">
        <el-col :span="6">
          <p style="color:#aaa">采购商/ID/销售员</p>
          <el-input v-model="keyword" placeholder="采购商ID,采购商名称,销售员" style="max-width: 300px;" @keyup.enter.native="search"></el-input>
        </el-col>
        <el-col :span="4">
          <p style="color:#aaa">是否金融客户</p>
          <el-select v-model="customerType" placeholder="是否金融客户">
            <el-option label="全部" value=""></el-option>
            <el-option label="否" value="0"></el-option>
            <el-option label="是" value="1"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <p>&nbsp</p>
          <el-button type="primary" style="margin-left: 20px;" @click.prevent="search">搜索</el-button>
          <el-button type="primary" style="margin-left: 20px;" @click.prevent="exportList">导出</el-button>
          <router-link :to="{name: 'moneyRecord'}">
            <el-button type="primary" style="margin-left: 20px;">操作记录</el-button>
          </router-link>
        </el-col>
      </el-row>
    </div>
    <div>
      <ul class="money-list" style="padding-left: 15px;">
        <li>
          <span>总余额：</span>
          <strong>{{obj.totalBalance | formateMoney}}元</strong>
        </li>
        <li>
          <span>总徙木额度：</span>
          <strong>{{obj.totalBaitiaoCreditLine | formateMoney}}元</strong>
        </li>
        <li>
          <span>总雁阵额度：</span>
          <strong>{{obj.totalYanzhenCreditLine | formateMoney}}元</strong>
        </li>
        <li>
          <span>总搜芽额度：</span>
          <strong>{{obj.totalCreditLine | formateMoney}}元</strong>
        </li>
      </ul>
    </div>
    <div class="fixed-table">
      <el-table :data="result" border :resizable="false" :height='height' style="width: 100%">
        <el-table-column type="index" width="80" label="序号"></el-table-column>
        <el-table-column prop="customerNumber" label="采购商ID" min-width="120"></el-table-column>
        <el-table-column prop="customerName" label="采购商名称" min-width="120"></el-table-column>
        <el-table-column label="金融客户">
          <template scope="scope">
            <template v-if="scope.row.hasOpenedBaitiao">
              <span class="icon-baitiao"></span>
            </template>
            <template v-else>
              <span class="icon-feibaitiao"></span>
            </template>
            <template v-if="scope.row.hasOpenedYanzhen">
              <span class="icon-yanzhen"></span>
            </template>
            <template v-else>
              <span class="icon-feiyanzhen"></span>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="销售员" min-width="120">
          <template scope="scope">
            {{scope.row.followerName}}/{{scope.row.followerTel}}
          </template>
        </el-table-column>
        <el-table-column label="余额/元" min-width="120">
          <template scope="scope">
            {{Number(scope.row.balance) | formateMoney}}
          </template>
        </el-table-column>
        <el-table-column label="徙木额度/元">
          <template scope="scope">
            {{Number(scope.row.baitiaoCreditLine) | formateMoney}}
          </template>
        </el-table-column>
        <el-table-column label="搜芽额度/元" min-width="120">
          <template scope="scope">
            {{Number(scope.row.creditLine) | formateMoney}}
          </template>
        </el-table-column>
        <el-table-column label="可用余额/元" min-width="120">
          <template scope="scope">
            {{Number(scope.row.availableBalance) | formateMoney}}
          </template>
        </el-table-column>
        <el-table-column label="可用徙木额度/元" min-width="120">
          <template scope="scope">
            <template v-if="Number(scope.row.baitiaoRemianLine) > 0">
              {{Number(scope.row.baitiaoRemianLine) | formateMoney}}
            </template>
            <template v-else>0.00</template>
          </template>
        </el-table-column>
        <el-table-column label="可用雁阵额度/元" min-width="120">
          <template scope="scope">
            <template v-if="Number(scope.row.yanzhenRemainLine) > 0">
              {{Number(scope.row.yanzhenRemainLine) | formateMoney}}
            </template>
            <template v-else>0.00</template>
          </template>
        </el-table-column>
        <el-table-column label="可用搜芽额度/元" min-width="120">
          <template scope="scope">
            <template v-if="Number(scope.row.remainLine) > 0">
              {{Number(scope.row.remainLine) | formateMoney}}
            </template>
            <template v-else>0.00</template>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template scope="scope">
            <el-button size="mini" style="width:65px;margin:2px;" type="warning" @click.native="temCurrentRow=scope.row;foreStoreMoney.customerPaymentName=scope.row.customerName;dialogVisible=true">充值</el-button>
            <el-button size="mini" style="width:65px;margin:2px;" type="primary" @click.native="temCurrentRow=scope.row;drawCashDialogVisible=true">提现</el-button>
            <el-button size="mini" style="width:65px;margin:2px;" type="primary" @click.native="showTransDialog(scope.row)">转移</el-button>
            <router-link :to="{ name: 'moneyManageDetail', query: { id: scope.row.id } }">
              <el-button size="mini" style="width:65px;margin:2px;" type="primary">查看明细</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-content">
        <pagination :page="page.pageNumber" :total="page.totalCount" :render="changeList" :options="filters"></pagination>
      </div>
    </div>

    <!-- 充值 -->
    <el-dialog v-model="dialogVisible" size="tiny" title="充值">
      <el-form class="confirmDialog" label-width="140" label-position="right">
        <el-form-item label="充值金额：" required>
          <el-input v-model="foreStoreMoney.money" type="number" style="width: 250px;"></el-input>
        </el-form-item>
        <el-form-item label="采购商付款名称：" required>
          <el-input v-model="foreStoreMoney.customerPaymentName" style="width: 250px;"></el-input>
        </el-form-item>
        <el-form-item label="收款账号：" required>
          <el-select style="width: 250px;" v-model="foreStoreMoney.collectMoneyAccount" placeholder="请选择收款账号">
            <el-option v-for="item in accountList" :label="`${item.bankName}(尾号${item.bankNumber.substring(item.bankNumber.length - 4, item.bankNumber.length)})`" :key="item.id" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="到账日期：" required>
          <el-date-picker style="width: 250px;" v-model="foreStoreMoney.collectMoneyDate" type="date" placeholder="选择日期" :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" required>
          <el-input placeholder="最多输入500个字符" v-model="foreStoreMoney.remark" type="textarea" :autosize="{minRows:6, maxRows:6}" resize="none"></el-input>
          <p v-if="foreStoreMoney.remark" class="remark-font">{{foreStoreMoney.remark.length}}/500</p>
          <p v-else class="remark-font">0/500</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button @click.native="clearForeStoreMoney" size="small">取 消</el-button>
        <el-button type="primary" :disabled="foreStoreMoneyStatus" @click.native="confirmPrestore" size="small">确定 </el-button>
      </div>
    </el-dialog>
    <!-- 提现 -->
    <el-dialog v-model="drawCashDialogVisible" size="tiny" title="提现" custom-class="bill-pay-money">
      <el-form label-position="right" label-width="100" style="text-align:left">
        <el-form-item label="提现金额：" required>
          <el-input v-model="drawCashMoney.money" type="number" style="width: 250px;"></el-input>
        </el-form-item>
        <el-form-item label="转账日期：" required>
          <el-date-picker style="width: 250px;" v-model="drawCashMoney.transferDate" type="date" placeholder="选择日期" :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input placeholder="最多输入500个字符" v-model="drawCashMoney.remark" type="textarea" :autosize="{minRows:6, maxRows:6}" resize="none"></el-input>
          <p v-if="drawCashMoney.remark" class="remark-font">{{drawCashMoney.remark.length}}/500</p>
          <p v-else class="remark-font">0/500</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button size="small" @click.native="clearForeStoreMoney">取 消</el-button>
        <el-button size="small" type="primary" :disabled="drawCashStatus" @click.native="confirmDrawCashMoney">确定 </el-button>
      </div>
    </el-dialog>
    <!--转账-->
    <el-dialog style="text-align:left;" v-model="transDialogVisible" title="余额转移" size="tiny">
      <el-form class="confirmDialog" label-width="120" label-position="right">
        <el-form-item label="采购商/ID：" style="width: 350px;">
          <template>
            <span>{{confirmTrans.customerName}}/{{confirmTrans.customerNumber}}</span>
          </template>
        </el-form-item>
        <el-form-item label="可用余额：">
          <span>{{confirmTrans.availableBalance | formateNumber}}元</span>
        </el-form-item>
        <span style="border-bottom:1px dashed #ddd"></span>
        <el-form-item label="转移金额：" required>
          <el-input v-model="confirmTrans.money" style="width:250;"></el-input>
        </el-form-item>
        <el-form-item label="选择采购商：" required>
          <template v-if="confirmTrans.getMoneyCompany != ''">
            <span>{{confirmTrans.getMoneyCompany}}</span>
            <el-button type="primary" @click="showCompanySelectDialog()" size="mini">选择采购商</el-button>
          </template>
          <template v-else>
            <el-button type="primary" @click="showCompanySelectDialog()" size="small">选择采购商</el-button>
          </template>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" v-model="confirmTrans.transferRemark" :autosize="{minRows: 6,maxRows:6}" resize="none" placeholder="请输入内容" @input="updateVal"></el-input>
          <p v-if="confirmTrans.transferRemark" class="remark-font">{{confirmTrans.transferRemark.length}}/500</p>
          <p v-else class="remark-font">0/500</p>
        </el-form-item>
      </el-form>
      <footer>
        <el-button @click="transDialogVisible=false" size="small">取消</el-button>
        <el-button type="primary" @click="congfirmTransferEvent()" :disabled="unableConfirm" size="small">确认</el-button>
      </footer>
    </el-dialog>
    <!--选择采购商  -->
    <el-dialog title="选择采购商" v-model="selectDialogVisible">
      <el-input v-model="list.keyword" type="text" style="width:250;float:left" placeholder="采购商/Id" @keydown.enter.native="searchCompany()"></el-input>
      <!-- <el-button @click="selectDialogVisible=false" style="float:left;margin-left:25%">取消</el-button> -->
      <el-button @click="searchCompany()" stylr="float:right;margin-right:25%;" type="primary" @keyup.enter.native="searchCompany()">搜索(Enter)</el-button>
      <div style="margin-top:20px">
        <el-table :data="buyerCompanyList" :height="400" border>
          <el-table-column prop="company" label="采购商名称" align="center" min-width="120">
          </el-table-column>
          <el-table-column prop="number" label="采购商Id" align="center" min-width="120">
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="100">
            <template scope="scope">
              <el-button @click.native="handleSelect(scope.row)" type="primary" :disabled="scope.row.id == confirmTrans.srcCustomerAccountId">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination :page="dialogPage.pageNumber" :total="dialogPage.totalCount" :pageSize="dialogPage.pageSize" :render="changePage" :options="list"></pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pagination from 'components/pagination'
// import conditionFilter from './conditionFilter'
import {
  request,
  newRequest,
  // formatTimeString,
  getCache,
  setCache
} from 'common/utils'
import allApi from 'api/account'
export default {
  data() {
    return {
      customerType: '',
      keyword: '',
      height: '400',
      dialogVisible: false,
      drawCashDialogVisible: false,
      foreStoreMoney: {
        remark: '',
        money: '',
        customerPaymentName: '',
        collectMoneyDate: '',
        collectMoneyAccount: ''
      },
      drawCashMoney: {
        money: '',
        transferDate: '',
        remark: ''
      },
      foreStoreMoneyStatus: true,
      drawCashStatus: true,
      temCurrentRow: {},
      accountList: [],
      result: [],
      page: {
        pageNumber: 1,
        totalCount: 0
      },
      obj: {},
      filters: {
        pageNumber: 1,
        pageSize: 20,
      },
      confirmTrans: {
        customerName: '',
        customerNumber: '',
        availableBalance: 0,
        money: 0,
        transferRemark: '',
        srcCustomerAccountId: '',
        destCustomerAccountId: '',
        getMoneyCompany: '',
      },
      fullscreenLoading: true,
      transDialogVisible: false,
      selectDialogVisible: false,
      list: {
        pageSize: 20,
        pageNumber: 1,
        keyword: '',
      },
      buyerCompanyList: [],
      dialogPage: {
        pageSize: 20,
        pageNumber: 1,
        totalCount: 0,
      },
      remarkLength: 0,
      remarkTotalLength: 500,
      unableConfirm: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  components: {
    pagination,
    // 'condition-filter': conditionFilter
  },
  computed: {
  },
  mounted() {
    this._time = (new Date()).getTime()
    const params = getCache({ key: 'searchKey' })
    if (params) {
      this.keyword = params.keyword
      this.requestList(params)
    } else {
      this.requestList()
    }
    this.height = String(document.body.clientHeight - 263);
    const accountList = getCache({ key: 'y-result' })
    if (accountList) {
      this.accountList = accountList
    } else {
      this.getAccountList()
    }
  },
  filters: {
    formateMoney(val) {
      return Number(val).toFixed(2)
    }
  },
  watch: {
    foreStoreMoney: {
      handler: function (val, oldVal) {
        let on = false
        for (const key of Object.keys(val)) {
          if (key != 'remark') {
            if (!val[key]) {
              on = true
            }
          }
          if (key == 'remark') {
            if (String(val[key]).length >= 500) {
              this.foreStoreMoney.remark = String(val[key]).slice(0, 500)
            }
          }
        }
        this.foreStoreMoneyStatus = on
      },
      deep: true
    },
    drawCashMoney: {
      handler: function (val, oldVal) {
        let on = false
        for (const key of Object.keys(val)) {
          if (key == 'money' || key == 'transferDate') {
            if (!val[key]) {
              on = true
            }
          }
          if (key == 'remark') {
            if (String(val[key]).length >= 500) {
              this.drawCashMoney.remark = String(val[key]).slice(0, 500)
            }
          }
        }
        this.drawCashStatus = on
      },
      deep: true
    },
  },
  methods: {
    updateVal() {
      this.remarkLength = this.confirmTrans.transferRemark.length
      if (this.remarkLength > this.remarkTotalLength) {
        this.$message('备注过长')
        this.unableConfirm = true
      } else {
        this.unableConfirm = false
      }
    },
    changeList() {
      this.requestList()
    },
    requestList(req) {
      this.fullscreenLoading = true
      const option = Object.assign({ _time: this._time, keyword: this.keyword, customerType: this.customerType }, this.filters, req)
      const obj = {}
      for (const key of Object.keys(option)) {
        if (option[key]) {
          obj[key] = option[key]
        }
      }
      newRequest({
        url: allApi.Account.searchPageForCaiwu,
        method: 'get',
        data: obj
      }).then(res => {
        // console.log(res)
        this.fullscreenLoading = false
        if (res.success == 1) {
          this.page.pageNumber = res.page.pageNumber
          this.page.pageSize = res.page.pageSize
          this.page.totalCount = res.page.totalCount
          this.filters.pageNumber = res.page.pageNumber
          this.filters.pageSize = res.page.pageSize
          this.result = res.page.result
          this.obj = res
          setCache({
            key: 'searchKey',
            value: obj
          })
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1200
          })
        }
      })
    },
    search() {
      this.filters.pageNumber = 1
      this.page.pageNumber = 1
      this.requestList()
    },
    exportList() {
      this.fullscreenLoading = true
      this.filters.pageNumber = 1
      this.page.pageNumber = 1
      // this.requestList()
      const option = Object.assign({ _time: this._time, keyword: this.keyword, customerType: this.customerType }, this.filters)
      const obj = {}
      for (const key of Object.keys(option)) {
        if (option[key]) {
          obj[key] = option[key]
        }
      }
      if (!obj.keyword) {
        obj.keyword = ''
      }
      newRequest({
        url: '/redwood/account/CustomerAccount/exportPageForCaiwu',
        data: obj,
        method: 'get'
      }).then(res => {
        if (res.success == 1) {
          window.open('http://www.soouya.com' + res.obj)
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1200
          })
        }
        this.fullscreenLoading = false
      })
    },
    // 获取账号信息
    getAccountList() {
      request({
        url: allApi.FinanceAccount.list,
        data: {},
        method: 'post'
      }).then(res => {
        if (res.success == 1) {
          this.accountList = []
          for (let i = 0; i < res.result.length; i++) {
            if (res.result[i].id !== '688666470776' && res.result[i].id !== '44051801040003666' && res.result[i].id !== '44050143004600000009') {
              this.accountList.push(res.result[i])
            }
          }
          setCache({
            key: 'y-result',
            value: this.accountList
          })
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1200
          })
        }
      })
    },
    clearForeStoreMoney() {
      for (const key of Object.keys(this.foreStoreMoney)) {
        this.foreStoreMoney[key] = ''
      }
      for (const key of Object.keys(this.drawCashMoney)) {
        this.drawCashMoney[key] = ''
      }
      this.dialogVisible = false
      this.drawCashDialogVisible = false
      this.temCurrentRow = {}
    },
    // 提交充值
    confirmPrestore() {
      this.fullscreenLoading = true
      const obj = {
        remark: this.foreStoreMoney.remark,
        money: this.foreStoreMoney.money,
        customerPaymentName: this.foreStoreMoney.customerPaymentName,
        collectMoneyDate: (new Date(this.foreStoreMoney.collectMoneyDate)).getTime(),
        collectMoneyAccount: this.foreStoreMoney.collectMoneyAccount,
        customerId: this.temCurrentRow.id,
        _time: this._time
      }
      request({
        url: allApi.Account.prestore,
        data: {
          param: JSON.stringify(obj)
        },
        method: 'post'
      }).then(res => {
        this.fullscreenLoading = false
        if (res.success == 1) {
          const self = this
          self.clearForeStoreMoney()
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose() {
              self.requestList()
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1200
          })
        }
      })
    },
    // 提交提现
    confirmDrawCashMoney() {
      this.fullscreenLoading = true
      const obj = {
        remark: this.drawCashMoney.remark,
        money: this.drawCashMoney.money,
        transferDate: (new Date(this.drawCashMoney.transferDate)).getTime(),
        customerId: this.temCurrentRow.id,
        _time: this._time
      }
      newRequest({
        url: allApi.Account.drawCash,
        method: 'post',
        contentType: 'application/json',
        data: obj
      }).then(res => {
        this.fullscreenLoading = false
        if (res.success == 1) {
          const self = this
          self.clearForeStoreMoney()
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose() {
              self.requestList()
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1200
          })
        }
      })
    },
    // 转账系列操作
    showTransDialog(data) {
      this.confirmTrans.getMoneyCompany = ''
      this.confirmTrans.destCustomerAccountId = ''
      this.confirmTrans.srcCustomerAccountId = ''
      this.confirmTrans.money = 0
      this.confirmTrans.transferRemark = ''
      this.transDialogVisible = true
      this.confirmTrans.srcCustomerAccountId = data.id
      this.confirmTrans.customerNumber = data.customerNumber
      this.confirmTrans.customerName = data.customerName
      this.confirmTrans.availableBalance = data.availableBalance
      this.list.keyword = ''
    },
    showCompanySelectDialog() {
      this.searchCompany()
      this.selectDialogVisible = true
    },
    searchCompany() {
      newRequest({
        url: '/redwood//sys/Buyer/list',
        method: 'get',
        data: this.list,
      }).then((res) => {
        if (res.success == '1') {
          // console.log(res)
          this.dialogPage.pageSize = res.page.pageSize
          this.dialogPage.pageNumber = res.page.pageNumber
          this.dialogPage.totalCount = res.page.totalCount
          this.buyerCompanyList = res.page.result
        } else {
          this.$message.error('导出选择采购商模块失败')
        }
      })
    },
    changePage() {
      this.searchCompany()
    },
    handleSelect(data) {
      this.confirmTrans.destCustomerAccountId = data.id
      this.confirmTrans.getMoneyCompany = data.company + '/' + data.number
      // console.log(this.confirmTrans)
      this.selectDialogVisible = false
    },
    congfirmTransferEvent() {
      if (this.confirmTrans.destCustomerAccountId == '') {
        this.$message('请选择转移目标采购商')
      } else {
        if (!this.confirmTrans.money) {
          this.$message('请输入正确的转移金额')
        } else if (this.confirmTrans.money < 0.01) {
          this.$message('输入金额不得小于0.01')
        } else if (this.confirmTrans.money > this.confirmTrans.availableBalance) {
          this.$message('输入金额不得大于可用余额')
        } else {
          newRequest({
            url: '/redwood/account/CustomerAccount/transferAvailableBalance',
            method: 'post',
            contentType: 'application/json',
            data: this.confirmTrans
          }).then((res) => {
            if (res.success == '1') {
              this.$message({
                type: 'success',
                message: res.msg
              })
              this.transDialogVisible = false
              this.requestList()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      }
    },
  }
};
</script>

<style lang="scss">
.money-manage {
  .money-list {
    height: 30px;
    line-height: 30px;
    margin: 10px 0;
    li {
      list-style: none;
      float: left;
      margin-right: 30px;
      font-size: 20px;
      strong {
        font-size: 14px;
        color: red;
      }
    }
  }
}

.bill-pay-money {
  min-width: 400px;
  .pay-content {
    min-width: 400px;
    text-align: left;
    .pay-item {
      position: relative;
      padding-bottom: 10px;
      .pay-item-l {
        width: 112px;
        display: inline-block;
        text-align: right;
        padding-right: 10px;
      }
    }
  }
  .star {
    color: red;
  }
}

span > strong {
  color: #f00;
}

.confirmDialog {
  text-align: left;
}

.toLeft {
  text-align: left;
  float: left;
  margin: 10, 0;
}
</style>
