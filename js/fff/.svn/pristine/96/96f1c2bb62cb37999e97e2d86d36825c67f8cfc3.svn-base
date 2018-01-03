<template>
  <div class="bill-manage" v-loading.body="fullscreenLoading">
     <div class="condition">
       <div class="c-section">
        <span class="c-title item-title">结算方式:</span>
        <div class="c-r-content">
        <el-select style="width: 120px;" v-model="conditionFilter.billingCycle" placeholder="全部">
          <el-option label="全部" value=""></el-option>
          <el-option label="周结" :value="0"></el-option>
          <el-option label="半月结" :value="1"></el-option>
          <el-option label="月结" :value="2"></el-option>
        </el-select>
       </div>
      </div>

      <div class="c-section">
        <span class="c-title item-title">时间:</span>
        <div class="c-r-content">
         <el-date-picker
           style="width: 150px;"
           v-model="conditionFilter.billTimeBegin"
           type="datetime"
           :editable="false"
           placeholder="选择日期时间">
         </el-date-picker>
        </div>
         <span class="c-title" style="margin-left: 10px;">-</span>
        <div class="c-r-content">
         <el-date-picker
           style="width: 150px;"
           v-model="conditionFilter.billTimeEnd"
           type="datetime"
           :editable="false"
           placeholder="选择日期时间">
         </el-date-picker>
        </div>
      </div>
      <div class="c-section">
        <el-input v-model="conditionFilter.keyword" placeholder="采购商ID,采购商名称,账单号,跟单员" style="width: 150px;"></el-input>
      </div>
       <el-button type="primary" style="margin-left: 20px;" @click.native="search">搜索</el-button>
       <el-button type="primary" style="margin-left: 20px;" @click.native="resetSearch">重置</el-button>
     </div>
     <el-tabs type="border-card" :active-name="tabIndex" @tab-click="changeTabIndex">
       <el-tab-pane label="未清偿" name="0"></el-tab-pane>
       <el-tab-pane label="已清偿" name="1"></el-tab-pane>
       <div class="fixed-table">
        <el-table
          :data="result"
          border
          :resizable="false"
          :height='height'
          style="width: 100%">
          <el-table-column type="index" width="80" label="序号"></el-table-column>
          <el-table-column :label="tabIndex == 0 ? '账单日' :  '出账日期'" min-width="120">
            <template scope="scope">
               {{scope.row.billTime | formatTime}}
            </template>
          </el-table-column>
          <el-table-column prop="number" label="账单号" min-width="120"></el-table-column>
          <el-table-column prop="buyerNumber" label="采购商ID" min-width="120"></el-table-column>
          <el-table-column prop="buyerCompany" label="采购商名称" min-width="120"></el-table-column>
          <el-table-column label="账单周期" min-width="120">
            <template scope="scope">
               <p>{{scope.row.beginTime | formatTime}}至{{scope.row.endTime | formatTime}}</p>
            </template>
          </el-table-column>
          <el-table-column label="结算方式" min-width="120">
            <template scope="scope">
                <template v-if="scope.row.billingCycle == 0">周结</template>
                <template v-if="scope.row.billingCycle == 1">半月结</template>
                <template v-if="scope.row.billingCycle == 2">月结</template>
            </template>
          </el-table-column>

          <el-table-column label="总计/元" min-width="120">
            <template scope="scope">
               <span :style="{color: Number(scope.row.totalMoney) < 0 ? 'red' : ''}">{{Number(scope.row.totalMoney) | formateMoney}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="followerName" label="跟单员" min-width="120"></el-table-column>
          <el-table-column label="收款日期" min-width="120" v-if="tabIndex == 1">
            <template scope="scope">
              {{scope.row.dischargeTime | formatTime}}
            </template>
          </el-table-column>
          <el-table-column prop="handler" label="经办人" min-width="120" v-if="tabIndex == 1"></el-table-column>
          <el-table-column label="操作" width="220" fixed="right">
            <template scope="scope">
              <router-link :to="{name: 'billManageDetail', query: {id: scope.row.id, tabIndex}}">
               <el-button size="mini">查看明细</el-button>
              </router-link>
              <template v-if="tabIndex == 0 && scope.row.status == 2">
               <el-button size="mini" @click.native="confirmPayStatus=true;temCurrentRow=scope.row">确认收款</el-button>
               <el-button size="mini" @click.native="unnormalVisible=true;temCurrentRow=scope.row">异常</el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-content">
         <pagination :page="page.pageNumber" :total="page.totalCount" :render="requestList" :options="filters"></pagination>          
        </div>
       </div>
     </el-tabs>

       <!-- 确认收款 -->
       <el-dialog
         v-model="confirmPayStatus"
         size="tiny"
         title="确认收款"
         custom-class="bill-pay-money-detail"
         :show-close="false"
         :close-on-click-modal="false">
         <div class="pay-content">
           <div class="pay-item">
             <span class="pay-item-l">总计:</span>
             <span class="pay-item-r"><span style="margin-right: 10px;">{{Number(temCurrentRow.totalMoney).toFixed(2)}}</span>元</span>
           </div>
           <div class="pay-item">
             <span class="pay-item-l"><strong class="star">*</strong>实际收款:</span>
             <span class="pay-item-r"><el-input v-model="confirmPayInfo.paidMoney" type="number" style="width: 250px;"></el-input></span>
           </div>
           <div class="pay-item">
             <span class="pay-item-l"><strong class="star">*</strong>到账日期:</span>
              <span class="pay-item-r">
               <el-date-picker :editable="false" style="width: 250px;" v-model="confirmPayInfo.paidTime" type="date" placeholder="选择日期" >
                </el-date-picker>
              </span>
           </div>
         </div>
         <div slot="footer" class="dialog-footer" style="text-align: center;">
           <el-button @click.native="clearTemInfo">取 消</el-button>
           <el-button type="primary" :disabled="confirmPayVisible" @click.native="isPopSecondConfirm">确定 </el-button>
         </div>
       </el-dialog>
       <!-- 异常 -->
       <el-dialog
         v-model="unnormalVisible"
         size="tiny"
         title="对账异常"
         custom-class="bill-pay-money-detail"
         :show-close="false"
         :close-on-click-modal="false">
         <div class="pay-content">
            <div class="pay-item">
              <textarea rows="3" v-model.trim="financeRemark" placeholder="最多输入50个字符" style="width: 360px; height: 50px; resize: none; border: 1px solid #c0ccda;border-radius: 4px; padding: 5px;"></textarea>
            </div>
         </div>
         <div slot="footer" class="dialog-footer" style="text-align: center;">
           <el-button @click.native="clearTemInfo">取 消</el-button>
           <el-button type="primary" :disabled="!(String(financeRemark).length > 0)" @click.native="confirmUnnormal">确定 </el-button>
         </div>
       </el-dialog>
  </div>
</template>

<script>
import pagination from 'components/pagination'
import {
  request,
  formatTimeString,
  // getCache,
  // setCache
} from 'common/utils'
import allApi from 'api/account'
export default {
  data() {
    return {
      tabIndex: '0',
      height: '400',
      confirmPayStatus: false,
      unnormalVisible: false,
      confirmPayVisible: true,
      temCurrentRow: {},
      financeRemark: '',

      confirmPayInfo: {
        paidTime: '',
        paidMoney: ''
      },

      conditionFilter: {
        billingCycle: '',
        billTimeBegin: '',
        billTimeEnd: ''
      },
      result: [],
      page: {
        pageNumber: 1,
        totalCount: 0
      },
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
    this.height = String(document.documentElement.clientHeight - 550);
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
    confirmPayInfo: {
      handler: function (val, oldVal) {
        let on = false
        for (const key of Object.keys(val)) {
          if (key == 'paidTime' || key == 'paidMoney') {
            if (String(val[key]) == '' || String(val[key]) == 'undefined') {
              on = true
            }
          }
        }
        this.confirmPayVisible = on
      },
      deep: true
    }
  },
  methods: {
    changeTabIndex (target) {
      this.tabIndex = String(target.index)
      this.requestList()
    },
    requestList (req) {
      this.fullscreenLoading = true
      const option = Object.assign({ _time: this._time }, this.conditionFilter, this.filters, req)
      const obj = {}
      for (const key of Object.keys(option)) {
        if (String(option[key]) != '') {
          if (key == 'billTimeBegin' || key == 'billTimeEnd') {
            obj[key] = (new Date(option[key])).getTime()
          } else {
            obj[key] = option[key]
          }
        }
      }
      obj.status = this.tabIndex
      console.log('obj', obj)
      request({
        url: allApi.Account.Bill_searchForFinance,
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
    clearTemInfo () {
      for (const key of Object.keys(this.confirmPayInfo)) {
        this.confirmPayInfo[key] = ''
      }
      this.confirmPayStatus = false
      this.unnormalVisible = false
      this.temCurrentRow = {}
      this.financeRemark = ''
    },
    open2() {
      this.$confirm('实际收款金额大于总计金额，是否确定提交？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
         this.confirmDrawCashMoney()
      }).catch(() => {
         // this.clearTemInfo()
      });
    },
    isPopSecondConfirm () {
     if (this.confirmPayInfo.paidMoney > this.temCurrentRow.totalMoney) {
       this.open2()
     } else {
       this.confirmDrawCashMoney()
     }
    },
    // 确认收款
    confirmDrawCashMoney () {
     this.fullscreenLoading = true
     const obj = {
      paidMoney: this.confirmPayInfo.paidMoney,
      paidTime: (new Date(this.confirmPayInfo.paidTime)).getTime(),
      id: this.temCurrentRow.id,
      _time: this._time
     }
     request({
        url: allApi.Account.Bill_confirmDischarge,
        data: {
          param: JSON.stringify(obj)
        },
        method: 'post'
      }).then(res => {
         this.fullscreenLoading = false
         if (res.success == 1) {
          const self = this
          self.clearTemInfo()
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
    // 异常
    confirmUnnormal () {
     this.fullscreenLoading = true
     const obj = {
       financeRemark: this.financeRemark,
       id: this.temCurrentRow.id,
       _time: this._time
     }
     request({
        url: allApi.Account.Bill_reconciliationAbnormal,
        data: {
          param: JSON.stringify(obj)
        },
        method: 'post'
      }).then(res => {
         this.fullscreenLoading = false
         if (res.success == 1) {
          const self = this
          self.clearTemInfo()
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
 .bill-manage {
   .condition {
     padding-top: 10px;
     overflow: hidden;
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
   .el-tabs__header {
     .el-tabs__item:nth-child(3),
     .el-tabs__item:nth-child(4) {
       display: none;
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
