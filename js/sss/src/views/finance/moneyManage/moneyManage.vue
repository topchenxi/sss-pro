<template>
  <div class="money-manage" v-loading.body="fullscreenLoading">
     <div class="condition">
       <!-- <el-input v-model="keyword" placeholder="采购商ID,采购商名称" style="width: 300px;"></el-input>
       <el-button type="primary" style="margin-left: 20px;" @click.native="search">搜索</el-button> -->
       <!-- <condition-filter v-on:getParams="search" :param="filters" /> -->
       <el-input v-model="keyword" placeholder="采购商ID,采购商名称" style="width: 300px;"></el-input>
       <el-button type="primary" style="margin-left: 20px;" @click.native="search">搜索</el-button>
     </div>
     <div>
       <ul class="money-list">
         <li>
           <span>总余额：</span> <strong>{{obj.totalBalance | formateMoney}}元</strong>
         </li>
         <li>
           <span>总已用授信额度：</span> <strong>{{obj.totalCreditLine | formateMoney}}元</strong>
         </li>
       </ul>
     </div>
     <div class="fixed-table">
      <el-table
        :data="result"
        border
        :resizable="false"
        :height='height'
        style="width: 100%">
        <el-table-column type="index" width="80" label="序号"></el-table-column>
        <el-table-column prop="customerNumber" label="采购商ID" min-width="120"></el-table-column>
        <el-table-column prop="customerName" label="采购商名称" min-width="120"></el-table-column>
        <el-table-column label="授信额度/元" min-width="120">
           <template scope="scope">
              {{Number(scope.row.creditLine) | formateMoney}}
           </template>
        </el-table-column>
        <el-table-column label="金额/元" min-width="120">
          <template scope="scope">
             {{Number(scope.row.balance) | formateMoney}}
          </template>
        </el-table-column>
        <el-table-column label="可用授信额度/元" min-width="120">
         <template scope="scope">
            {{Number(scope.row.remainLine) | formateMoney}}
         </template>
        </el-table-column>
        <el-table-column label="已用授信额度/元" min-width="120">
          <template scope="scope">
             {{Number(scope.row.creditLine) - Number(scope.row.remainLine) | formateMoney}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template scope="scope">
             <router-link :to="{ name: 'moneyManageDetail', query: { id: scope.row.id } }">
              <el-button size="mini">查看明细</el-button>
             </router-link>
            <el-button size="mini" @click.native="temCurrentRow=scope.row;foreStoreMoney.customerPaymentName=scope.row.customerName;dialogVisible=true">预存</el-button>
            <el-button size="mini" @click.native="temCurrentRow=scope.row;drawCashDialogVisible=true">提现</el-button>
          </template>
        </el-table-column>
      </el-table>
       <pagination :page="page.pageNumber" :total="page.totalCount" :render="changeList" :options="filters"></pagination>
     </div>

    <!-- 预存 -->
     <el-dialog
       v-model="dialogVisible"
       size="tiny"
       title="预存"
       custom-class="bill-pay-money"
       :show-close="false"
       :close-on-click-modal="false">
       <div class="pay-content">
         <div class="pay-item">
           <span class="pay-item-l"><strong class="star">*</strong>预存金额:</span>
           <span class="pay-item-r"><el-input v-model="foreStoreMoney.money" type="number" style="width: 250px;"></el-input></span>
         </div>
         <div class="pay-item">
           <span class="pay-item-l"><strong class="star">*</strong>采购商付款名称:</span>
            <span class="pay-item-r"><el-input v-model="foreStoreMoney.customerPaymentName" style="width: 250px;"></el-input></span>
         </div>
         <div class="pay-item">
           <span class="pay-item-l"><strong class="star">*</strong>收款账号:</span>
            <span class="pay-item-r">
             <el-select style="width: 250px;" v-model="foreStoreMoney.collectMoneyAccount" placeholder="请选择收款账号">
               <el-option
                 v-for="item in accountList"
                 :label="`${item.bankName}(尾号${item.bankNumber.substring(item.bankNumber.length - 4, item.bankNumber.length)})`"
                 :key="item.id"
                 :value="item.id">
               </el-option>
             </el-select>
            </span>
         </div>
         <div class="pay-item">
           <span class="pay-item-l"><strong class="star">*</strong>收款日期:</span>
            <span class="pay-item-r">
             <el-date-picker style="width: 250px;" v-model="foreStoreMoney.collectMoneyDate" type="date" placeholder="选择日期" >
              </el-date-picker>
            </span>
         </div>
         <div class="pay-item">
           <span class="pay-item-l">结算备注:</span>
           <textarea rows="3"  placeholder="最多输入120个字符" style="width: 238px; height: 50px; resize: none; border: 1px solid #c0ccda;border-radius: 4px; padding: 5px;" v-model.trim="foreStoreMoney.remark"></textarea>
         </div>
       </div>
       <div slot="footer" class="dialog-footer" style="text-align: center;">
         <el-button @click.native="clearForeStoreMoney">取 消</el-button>
         <el-button type="primary" :disabled="foreStoreMoneyStatus" @click.native="confirmPrestore">确定 </el-button>
       </div>
      </el-dialog>
       <!-- 提现 -->
       <el-dialog
         v-model="drawCashDialogVisible"
         size="tiny"
         title="提现"
         custom-class="bill-pay-money"
         :show-close="false"
         :close-on-click-modal="false">
         <div class="pay-content">
           <div class="pay-item">
             <span class="pay-item-l"><strong class="star">*</strong>提现金额:</span>
             <span class="pay-item-r"><el-input v-model="drawCashMoney.money" type="number" style="width: 250px;"></el-input></span>
           </div>
           <div class="pay-item">
             <span class="pay-item-l"><strong class="star">*</strong>转账日期:</span>
              <span class="pay-item-r">
               <el-date-picker style="width: 250px;" v-model="drawCashMoney.transferDate" type="date" placeholder="选择日期" >
                </el-date-picker>
              </span>
           </div>
           <div class="pay-item">
             <span class="pay-item-l">结算备注:</span>
             <textarea rows="3"  placeholder="最多输入50个字符" style="width: 238px; height: 50px; resize: none; border: 1px solid #c0ccda;border-radius: 4px; padding: 5px;" v-model.trim="drawCashMoney.remark"></textarea>
           </div>
         </div>
         <div slot="footer" class="dialog-footer" style="text-align: center;">
           <el-button @click.native="clearForeStoreMoney">取 消</el-button>
           <el-button type="primary" :disabled="drawCashStatus" @click.native="confirmDrawCashMoney">确定 </el-button>
         </div>
       </el-dialog>
  </div>
</template>

<script>
import pagination from 'components/pagination'
// import conditionFilter from './conditionFilter'
import {
  request,
  // formatTimeString,
  getCache,
  setCache
} from 'common/utils'
import allApi from 'api/account'
export default {
  data() {
    return {
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
        pageSize: 20
      },
      fullscreenLoading: true,
    };
  },
  components: {
    pagination,
    // 'condition-filter': conditionFilter
  },
  computed: {
  },
  mounted() {
    this._time = (new Date()).getTime()
    this.requestList()
    this.height = String(document.documentElement.clientHeight - 550);
    const accountList = getCache({ key: 'y-result' })
    if (accountList) {
      this.accountList = accountList
    } else {
      this.getAccountList()
    }
  },
  filters: {
    formateMoney (val) {
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
           if (String(val[key]).length >= 120) {
              this.foreStoreMoney.remark = String(val[key]).slice(0, 120)
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
           if (String(val[key]).length >= 50) {
              this.drawCashMoney.remark = String(val[key]).slice(0, 50)
            }
          }
        }
        this.drawCashStatus = on
      },
      deep: true
    },
  },
  methods: {
    changeList () {
      this.requestList()
    },
    requestList (req) {
      this.fullscreenLoading = true
      const option = Object.assign({ _time: this._time, keyword: this.keyword }, this.filters, req)
      const obj = {}
      for (const key of Object.keys(option)) {
        if (option[key]) {
          obj[key] = option[key]
        }
      }
      request({
        url: allApi.Account.searchPageForCaiwu,
        data: {
          param: JSON.stringify(obj)
        },
        method: 'post'
      }).then(res => {
        this.fullscreenLoading = false
        if (res.success == 1) {
         this.page.pageNumber = res.page.pageNumber
         this.page.pageSize = res.page.pageSize
         this.page.totalCount = res.page.totalCount
         this.filters.pageNumber = res.page.pageNumber
         this.filters.pageSize = res.page.pageSize
         this.result = res.page.result
         this.obj = res
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1200
          })
        }
      })
    },
    search () {
      this.filters.pageNumber = 1
      this.page.pageNumber = 1
      this.requestList()
    },
    // 获取账号信息
    getAccountList () {
     request({
        url: allApi.FinanceAccount.list,
        data: {},
        method: 'post'
      }).then(res => {
         if (res.success == 1) {
           this.accountList = res.result
           setCache({
             key: 'y-result',
             value: res.result
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
    clearForeStoreMoney () {
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
    // 提交预存
    confirmPrestore () {
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
            onClose () {
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
    confirmDrawCashMoney () {
     this.fullscreenLoading = true
     const obj = {
      remark: this.drawCashMoney.remark,
      money: this.drawCashMoney.money,
      transferDate: (new Date(this.drawCashMoney.transferDate)).getTime(),
      customerId: this.temCurrentRow.id,
      _time: this._time
     }
     request({
        url: allApi.Account.drawCash,
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
            onClose () {
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
  }
};
</script>

<style lang="scss">
 .money-manage {
   .money-list {
     height: 50px;
     line-height: 50px;
     margin: 10px 0;
     li {
       list-style: none;
       float: left;
       margin-right: 30px;
       font-size: 20px;
       strong {
        font-size: 20px;
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
</style>
