<template>
  <div class="money-manage-detail" v-loading.body="fullscreenLoading">
   <h2 style="font-size: 20px; margin-bottom: 20px;">采购商资金信息:</h2>
   <ul class="money-list">
     <li>
       <span>采购商ID：</span><span>{{costomerInfo.customerNumber}}</span>
     </li>
     <li>
       <span>采购商名称：</span> <span>{{costomerInfo.customerName}}</span>
     </li>
   </ul>
   <ul class="money-list">
     <li>
      <div>
        <span  style="font-size: 18px;">可用余额：</span> <strong>{{costomerInfo.availableBalance | formateMoney}}元</strong>
      </div>
      <div style="margin-left: 20px;margin-top: 15px;">
       <span>余额：</span> <strong>{{costomerInfo.balance | formateMoney}}元</strong>
       <el-button style="margin-left: 10px;" type="primary" size="small" @click.native="temCurrentRow=costomerInfo;dialogVisible=true">预存</el-button>
       <el-button size="small"  type="primary" @click.native="temCurrentRow=costomerInfo;drawCashDialogVisible=true">提现</el-button>
     </div>
     </li>
     <li>
       <div>
         <span style="font-size: 18px;">可用授信额度：</span> <strong>{{costomerInfo.remainLine | formateMoney}}元</strong>
        </div>
        <div style="margin-left: 20px; margin-top: 15px;">
          <span>授信额度：</span> <strong>{{costomerInfo.creditLine | formateMoney}}元</strong>
          <el-button style="margin-left: 10px;" size="small"  type="primary" @click.native="temCurrentRow=costomerInfo;adjustMoneyVisible=true">额度调整</el-button>
        </div>
     </li>
   </ul>
   <ul class="money-list">
     <li>
       <span style="font-size: 20px;">总额(含冻结金额)：</span><strong>{{costomerInfo.available | formateMoney}}元</strong>
     </li>
   </ul>
     <div class="condition">
       <div class="c-section">
        <span class="c-title">费用类型:</span>
        <div class="c-r-content">
        <el-select style="width: 120px;" v-model="conditionFilter.type" placeholder="全部">
          <el-option label="全部" value=""></el-option>
          <el-option label="充值" :value="1"></el-option>
          <el-option label="提现" :value="2"></el-option>
          <el-option label="支付" :value="3"></el-option>
          <el-option label="额度调整" :value="4"></el-option>
          <el-option label="还款" :value="5"></el-option>
        </el-select>
       </div>
      </div>

      <div class="c-section">
        <span class="c-title">时间:</span>
        <div class="c-r-content">
         <el-date-picker
           v-model="conditionFilter.beginTime"
           type="datetime"
           placeholder="选择日期时间">
         </el-date-picker>
         </div>
           <span class="c-title" style="margin-left: 10px;">-</span>
        <div class="c-r-content">
         <el-date-picker
           v-model="conditionFilter.endTime"
           type="datetime"
           placeholder="选择日期时间">
         </el-date-picker>
        </div>
      </div>
       <el-button type="primary" style="margin-left: 20px;" @click.native="search">搜索</el-button>
       <el-button type="primary" style="margin-left: 20px;" @click.native="resetSearch">重置</el-button>
     </div>

     <div class="fixed-table">
      <el-table
        :data="result"
        border
        :resizable="false"
        style="width: 100%">
        <el-table-column type="index" width="80" label="序号"></el-table-column>
        <el-table-column label="时间" min-width="120">
          <template scope="scope">
             {{Number(scope.row.createTime) | formatTime}}
          </template>
        </el-table-column>
        <el-table-column label="费用类型" min-width="120">
          <template scope="scope">
              <template v-if="scope.row.type == 0">全部</template>
              <template v-if="scope.row.type == 1">充值</template>
              <template v-if="scope.row.type == 2">提现</template>
              <template v-if="scope.row.type == 3">支出</template>
              <template v-if="scope.row.type == 4">额度调整</template>
              <template v-if="scope.row.type == 5">还款</template>
              <template v-if="scope.row.type == 10">退货退款</template>
              <template v-if="scope.row.type == 11">换货退款</template>
          </template>
        </el-table-column>
        <el-table-column label="交易信息" min-width="120">
           <template scope="scope">
              <p>{{scope.row.tradeInformation}}</p>
              <p>{{scope.row.payTime | formatTime}}</p>
           </template>
        </el-table-column>
        <el-table-column label="金额/元" min-width="120">
          <template scope="scope">
             <span :style="{color: Number(scope.row.money) < 0 ? 'red' : ''}">
              <span v-if="scope.row.type == 10 || scope.row.type == 11">+</span>{{Number(scope.row.money) | formateMoney}}
             </span>
          </template>
        </el-table-column>
        <el-table-column prop="operator" label="经办人" min-width="120"></el-table-column>
        <el-table-column label="账户" min-width="120">
          <template scope="scope">
             <template v-if="scope.row.moneyType == 0">余额</template>
             <template v-if="scope.row.moneyType == 1">授信额度</template>
          </template>
        </el-table-column>
        <el-table-column label="备注" min-width="120" show-overflow-tooltip>
          <template scope="scope">
             <p>{{scope.row.remark}}</p>
             <el-button type="primary" size="mini" @click.native="editRemark(scope.row)">修改备注</el-button>
          </template>
        </el-table-column>
      </el-table>
       <pagination :page="page.pageNumber" :total="page.totalCount" :render="requestList" :options="filters"></pagination>
     </div>
    <!-- 预存 -->
     <el-dialog
       v-model="dialogVisible"
       size="tiny"
       title="预存"
       custom-class="bill-pay-money-detail"
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
            <textarea placeholder="最多输入50个字符" rows="3" style="width: 238px; height: 50px; resize: none; border: 1px solid #c0ccda;border-radius: 4px; padding: 5px;" v-model.trim="foreStoreMoney.remark"></textarea>
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
         custom-class="bill-pay-money-detail"
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
       <!-- 调整额度 -->
       <el-dialog
         v-model="adjustMoneyVisible"
         size="tiny"
         title="额度调整"
         custom-class="bill-pay-money-detail"
         :show-close="false"
         :close-on-click-modal="false">
         <div class="pay-content">
           <div class="pay-item">
             <span class="pay-item-l">原额度:</span>
             <span class="pay-item-r"><strong>{{Number(costomerInfo.remainLine).toFixed(2)}}元</strong></el-input></span>
           </div>
           <div class="pay-item">
             <span class="pay-item-l"><strong class="star">*</strong>修改后额度:</span>
             <span class="pay-item-r"><el-input v-model="money" type="number" style="width: 250px;"></el-input></span>
           </div>
         </div>
         <div slot="footer" class="dialog-footer" style="text-align: center;">
           <el-button @click.native="clearForeStoreMoney">取 消</el-button>
           <el-button type="primary" :disabled="moneyStatus" @click.native="lineAdjust">确定 </el-button>
         </div>
       </el-dialog>

       <el-dialog title="修改备注" v-model="editStatus" :close-on-click-modal="false">
          <div>
           <el-input
             type="textarea"
             :rows="2"
             placeholder="请输入内容"
             v-model="temRemark">
            </el-input>
          </div>
         <div slot="footer" class="dialog-footer">
           <el-button @click="clearForeStoreMoney">取 消</el-button>
           <el-button type="primary" @click="confirmEdit">确 定</el-button>
         </div>
       </el-dialog>
  </div>
</template>

<script>
import pagination from 'components/pagination'
import {
  request,
  formatTimeString,
  getCache,
  setCache
} from 'common/utils'
import allApi from 'api/account'
export default {
  data() {
    return {
      keyword: '',
      dialogVisible: false,
      drawCashDialogVisible: false,
      adjustMoneyVisible: false,
      temRemark: '',
      editStatus: false,
      temRow: {},
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
      money: '', // 额度调整
      moneyStatus: true,
      conditionFilter: {
        type: '',
        beginTime: '',
        endTime: ''
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
      costomerInfo: {},
      filters: {
        pageNumber: 1,
        pageSize: 20
      },
      fullscreenLoading: true,
    };
  },
  components: {
    pagination
  },
  computed: {
  },
  mounted() {
    this._time = (new Date()).getTime()
    this.requestList()
    this.getCostomerInfo()
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
    },
    formatTime (val) {
      return val != '' ? formatTimeString(val) : '--'
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
           if (String(val[key]).length >= 50) {
              this.foreStoreMoney.remark = String(val[key]).slice(0, 50)
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
    money: {
      handler: function (val, oldVal) {
        let on = true
        if (Number(val) >= 0 && String(val) != '') {
          on = false
        }
        this.moneyStatus = on
      },
      deep: true
    }
  },
  methods: {
    enter (e) {
    },
    editRemark (row) {
      this.temRemark = row.remark
      this.temRow = row
      this.editStatus = true
    },
    confirmEdit () {
      const obj = {
        remark: this.temRemark,
        id: this.temRow.id
      }
      this.fullscreenLoading = true
      request({
        url: allApi.Account.CustomerAccount_updateRemark,
        data: {
          param: JSON.stringify(obj)
        }
      }, res => {
       this.fullscreenLoading = false
        if (res.success == 1) {
          const self = this
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose() {
              self.clearForeStoreMoney()
              self.requestList()
            }
          })
        } else {
          this.$message({
            type: 'error',
            duration: 1000,
            message: res.msg
          })
        }
      })
    },
    // 获取采购商信息
    getCostomerInfo () {
      this.fullscreenLoading = true
      request({
        url: allApi.Account.CustomerAccount_getDetail,
        data: {
          param: JSON.stringify({ id: this.$route.query.id })
        },
        method: 'post'
      }).then(res => {
        this.fullscreenLoading = false
        if (res.success == 1) {
           this.costomerInfo = res
        } else {
         this.$message({
           type: 'error',
           message: res.msg,
           duration: 1200
         })
        }
      })
    },
    requestList (req) {
      this.fullscreenLoading = true
      const option = Object.assign({ _time: this._time, keyword: this.keyword, customerId: this.$route.query.id }, this.conditionFilter, this.filters, req)
      const obj = {}
      for (const key of Object.keys(option)) {
        if (option[key]) {
          if (key == 'beginTime' || key == 'endTime') {
            obj[key] = (new Date(option[key])).getTime()
          } else {
            obj[key] = option[key]
          }
        }
      }
      request({
        url: allApi.Account.CustomerAccount_getTransactionRecordList,
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
      this.requestList()
    },
    resetSearch () {
      for (const key of Object.keys(this.conditionFilter)) {
        this.conditionFilter[key] = ''
      }
      this.page.pageNumber = 1
      this.filters.pageNumber = 1
      this.filters.pageSize = 20
      this.requestList(this.filters)
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
      this.adjustMoneyVisible = false
      this.editStatus = false
      this.temRemark = ''
      this.temCurrentRow = {}
      this.temRow = {}
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
      customerId: this.$route.query.id,
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
              self.getCostomerInfo()
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
      customerId: this.$route.query.id,
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
              self.getCostomerInfo()
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
    // 调整额度
    lineAdjust () {
     this.fullscreenLoading = true
     const obj = {
       money: this.money,
       customerId: this.$route.query.id,
       _time: this._time
     }
     request({
        url: allApi.Account.CustomerAccount_lineAdjust,
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
              self.getCostomerInfo()
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
 .money-manage-detail {
   .money-list {
     overflow: hidden;
     margin: 10px 0;
     margin-left: 10px;
     width: 800px;
     li {
       list-style: none;
       float: left;
       margin-right: 30px;
       margin-bottom: 10px;
       font-size: 20px;
       width: 350px;
       strong {
        font-size: 20px;
         color: red;
       }
     }
   }
   .condition {
     border-top: 2px solid #ccc;
     padding-top: 10px;
     .c-section {
       float: left;
       margin-right: 10px;
       margin-bottom: 10px;
       .c-title {
        height: 40px;
        float: left;
        line-height: 40px;
        margin-right: 10px;
       }
       .c-r-content {
         float: left;
       }
     }

   }
 }
 .bill-pay-money-detail {
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
