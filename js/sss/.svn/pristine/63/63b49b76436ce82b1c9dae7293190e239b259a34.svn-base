<template>
  <div class='c-header'>
    <el-row>
      <el-col :span="6"  v-if="pathFrom == 'dsf' || pathFrom == 'ysf'">
        <el-input placeholder="请输入内容" v-model="params.returnReplaceNumber" style="max-width:250px" class='fl'>
          <template slot="prepend">退换货单号</template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入内容" v-model="params.orderNumber" style="max-width:250px" class='fl'>
          <template slot="prepend">订单号</template>
        </el-input>
      </el-col>
      <el-col :span="6" v-if="pathFrom == 'ddz' || pathFrom == 'ydz'">
        <el-input placeholder="请输入内容" v-model="params.outReposityNumber" style="max-width:250px" class='fl'>
          <template slot="prepend">出仓单号</template>
        </el-input>
      </el-col>
      <el-col :span="6" v-if="pathFrom == 'ddz' && currentTab == 2">
        <el-input placeholder="请输入内容" v-model="params.user" style="max-width:250px" class='fl'>
          <template slot="prepend">欠款用户</template>
        </el-input>
      </el-col>
      <el-col :span="6" v-if="(pathFrom == 'ddz' || pathFrom == 'ydz') && currentTab == 2 ">
        <el-input placeholder="请输入内容" v-model="params.userNumber" style="max-width:250px" class='fl'>
          <template slot="prepend">用户ID</template>
        </el-input>
      </el-col>
      <el-col :span="6" v-if="pathFrom == 'tkcl' || pathFrom == 'ytk'">
        <el-input placeholder="请输入内容" v-model="params.number" style="max-width:250px" class='fl'>
          <template slot="prepend">退换货单号</template>
        </el-input>
      </el-col>
      <el-col :span="6" v-if="(pathFrom == 'ddz' && currentTab !=2) || pathFrom == 'yfz' || pathFrom == 'dfz' || pathFrom == 'tkcl' || pathFrom == 'ytk' || (pathFrom == 'ydz' && currentTab !=2) || pathFrom == 'dsf' || pathFrom == 'ysf' ">
        <el-input placeholder="请输入内容" v-model="params.buyerCompany" style="width: 250px;">
          <template slot="prepend">采购商</template>
        </el-input>
      </el-col>
      <el-col :span="6" v-if=" pathFrom == 'dfz' || pathFrom == 'yfz' || (pathFrom == 'ydz' || currentTab != 2) || (pathFrom == 'ddz' || currentTab != 2) && pathFrom !='fklb' || pathFrom == 'dsf' || pathFrom == 'ysf'">
        <el-input placeholder="请输入内容" v-model="params.buyerNumber" style="max-width: 250px;" class='fl'>
          <template slot="prepend">采购商ID</template>
        </el-input>
      </el-col>
      <el-col :span="6" v-if="pathFrom == 'dfz' || pathFrom == 'yfz' || pathFrom == 'tkcl' || pathFrom == 'ytk' || pathFrom == 'dsf' || pathFrom == 'ysf'">
        <el-input placeholder="请输入内容" v-model="params.shopName" style="max-width: 250px;" class='fl'>
          <template slot="prepend">供应商</template>
        </el-input>
      </el-col>
      <el-col :span="6" v-if="pathFrom == 'dfz' || pathFrom == 'yfz' || pathFrom == 'tkcl' || pathFrom == 'ytk' || pathFrom == 'dsf' || pathFrom == 'ysf'">
        <el-input placeholder="请输入内容" v-model="params.sellerNumber" style="max-width: 250px;" class='fl'>
          <template slot="prepend">供应商ID</template>
        </el-input>
      </el-col>
      <el-col :span="6" v-if="pathFrom == 'dfz' || pathFrom == 'yfz' || pathFrom == 'ytk'">
        <span class='el-input-group__prepend'>款项类型</span>
        <el-select v-model="params.fundType" class='c-select funtype-select' style="width: 150px;">
          <el-option
            v-for="option in fundTypeOptions"
            :label="option.label"
            :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6" v-if="pathFrom == 'yfz' || pathFrom == 'fklb' || pathFrom == 'ytk' || pathFrom == 'tkjl'">
        <el-input placeholder="请输入内容" v-model="params.transactionNo" style="max-width: 250px;" class='fl'>
          <template slot="prepend">支付流水号</template>
        </el-input>
      </el-col>
      <el-col :span="6" v-if="pathFrom == 'yfz' || pathFrom == 'fklb' || pathFrom == 'ytk' || pathFrom == 'tkjl'">
        <el-input placeholder="请输入内容" v-model="params.yfbTransactionNo" style="max-width: 250px;" class='fl'>
          <template slot="prepend">易付宝交易号</template>
        </el-input>
      </el-col>

      <el-col :span="6" v-if="pathFrom == 'dfz' || pathFrom == 'ddz' || pathFrom == 'ydz' || pathFrom == 'yfz'">
        <el-input placeholder="请输入内容" v-model="params.follower" style="max-width: 250px;" class='fl'>
          <template slot="prepend">跟单员</template>
        </el-input>
      </el-col>
      <el-col :span="6" v-if="(pathFrom == 'dsf' || pathFrom == 'ysf') && currentTab == 1">
        <el-input placeholder="请输入内容" v-model="params.purchaserName" style="max-width: 250px;" class='fl'>
          <template slot="prepend">买货员</template>
        </el-input>
      </el-col>
      <el-col :span="6" v-if="(pathFrom == 'dsf' || pathFrom == 'ysf') && currentTab == 1">
        <el-input placeholder="请输入内容" v-model="params.incomeMoney" style="max-width: 250px;" class='fl'>
          <template slot="prepend">到账金额</template>
        </el-input>
      </el-col>
      <el-col :span="6" v-if="(pathFrom == 'dsf' || pathFrom == 'ysf') && currentTab == 2">
        <el-input placeholder="请输入内容" v-model="params.xiaozhangMoney" style="max-width: 250px;" class='fl'>
          <template slot="prepend">销账金额</template>
        </el-input>
      </el-col>
      <el-col :span="6" v-if="(pathFrom == 'dsf' || pathFrom == 'ysf') && currentTab == 3">
        <el-input placeholder="请输入内容" v-model="params.refundMoney" style="max-width: 250px;" class='fl'>
          <template slot="prepend">退款金额</template>
        </el-input>
      </el-col>
      <el-col :span="6" v-if="(pathFrom == 'ydz' && currentTab == 2)">
        <el-input placeholder="请输入内容" v-model="params.user" style="max-width: 250px;" class='fl'>
          <template slot="prepend">欠款用户</template>
        </el-input>
      </el-col>
      <el-col :span="6" v-if="pathFrom == 'ydz' && currentTab == 2 ">
        <span class='el-input-group__prepend'>欠款用户类型</span>
        <el-select v-model="params.userType" class='c-select funtype-select'>
          <el-option
            v-for="option in userTypeOptions"
            :label="option.label"
            :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6" v-if="pathFrom == 'ddz' || pathFrom == 'ydz' || ((pathFrom == 'dsf' || pathFrom == 'ysf')  && currentTab == 1) ">
        <span class='el-input-group__prepend'>财务收款账户</span>
        <el-select v-model="params.financeAccount" class='c-select'>
          <el-option
            v-for="list in financeAccountList"
            :label="list.bankName"
            :value="list.bankNumber">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6" v-if="pathFrom == 'dsf' || pathFrom == 'ysf'">
        <span class='el-input-group__prepend'>退换类型</span>
        <el-select v-model="params.returnReplaceType" class='c-select'>
          <el-option
            v-for="list in returnReplaceTypeList"
            :label="list.label"
            :value="list.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6" v-if="pathFrom == 'dfz'">
        <el-input placeholder="请输入内容" v-model="params.toPayMoney" style="max-width: 250px;" class='fl'>
          <template slot="prepend">{{toPayMoneyString(pathFrom)}}</template>
        </el-input>
      </el-col>
      <el-col :span="6" v-if="pathFrom == 'ddz' || pathFrom == 'ydz'">
        <el-input placeholder="请输入内容" v-model="params.totalMoney" style="max-width: 250px;" class='fl'>
          <template slot="prepend">{{totalMoneyString()}}</template>
        </el-input>
      </el-col>
      <el-col :span="6" v-if="pathFrom == 'yfz'">
        <el-input placeholder="请输入内容" v-model="params.toPayMoney" style="max-width: 250px;" class='fl'>
          <template slot="prepend">已付款金额</template>
        </el-input>
      </el-col>
      <el-col :span="6" v-if="pathFrom == 'ydz' || pathFrom == 'ddz' && currentTab == 2 ">
        <span class='el-input-group__prepend'>采购商结算周期</span>
        <el-select v-model="params.billingCycle" class='c-select funtype-select'>
          <el-option
            v-for="option in periodOptions"
            :label="option.label"
            :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6" v-if="pathFrom == 'fklb' || pathFrom == 'tkjl'">
        <el-input placeholder="请输入内容" v-model="params.accountName" style="width: 250px;">
          <template slot="prepend">收款方姓名</template>
        </el-input>
      </el-col>
      <el-col :span="6" v-if="pathFrom == 'fklb' || pathFrom == 'tkjl'">
        <el-input placeholder="请输入内容" v-model="params.accountNumber" style="width: 250px;">
          <template slot="prepend">收款方银行账号</template>
        </el-input>
      </el-col>
      <!-- <el-col :span="6" v-if="pathFrom == 'yfz'">
        <span class='el-input-group__prepend'>采购商支付方式</span>
        <el-select v-model="params.payWay" class='c-select funtype-select'>
          <el-option
            v-for="option in payWayOptions"
            :label="option.label"
            :value="option.value">
          </el-option>
        </el-select>
      </el-col> -->
      <el-col :span="6" v-if="pathFrom == 'fklb'">
        <span class='el-input-group__prepend'>支付状态</span>
        <el-select v-model="params.payStatus" class='c-select funtype-select'>
          <el-option
            v-for="option in payStatusOptions"
            :label="option.label"
            :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6" v-if="pathFrom == 'fklb' || pathFrom == 'tkjl'">
        <span class='el-input-group__prepend'>收款方账号类型</span>
        <el-select v-model="params.accountType" class='c-select funtype-select'>
          <el-option
            v-for="option in accountTypeOptions"
            :label="option.label"
            :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <!-- <el-col :span="6" v-if="pathFrom == 'dfz' || pathFrom == 'yfz'">
        <span class='el-input-group__prepend'>分账类型</span>
        <el-select v-model="params.payType" class='c-select funtype-select'>
          <el-option
            v-for="option in payTypeOptions"
            :label="option.label"
            :value="option.value">
          </el-option>
        </el-select>
      </el-col> -->
    </el-row>
    <el-row>
      <el-col :span="8" class='time-col'>
        <span class='front-label ' v-if="pathFrom == 'dfz'">进入待分账日期</span>
        <span class='front-label' v-if="pathFrom == 'yfz'">分账日期</span>
        <span class='front-label' v-if="pathFrom == 'ddz'">{{ currentTab == 2 ? '进入待收欠款日期' : '进入待对账日期'}}</span>
        <span class='front-label' v-if="pathFrom == 'ydz'">对账日期</span>
        <span class='front-label' v-if="pathFrom == 'fklb'">完成时间</span>
        <span class='front-label' v-if="pathFrom == 'dsf'">{{ currentTab == 1 ? '进入待收款日期' : (currentTab == 2 ? '进入待销账日期' : '进入待退款日期')}}</span>
        <span class='front-label' v-if="pathFrom == 'ysf'">{{ currentTab == 1 ? '收款日期' : (currentTab == 2 ? '销账日期' : '退款日期')}}</span>
        <el-date-picker
          class='c-date-start'
          :editable="false"
          v-model="params.createTimeBegin"
          type="datetime"
          disabledDate='disabledStartDate'
          placeholder="选择开始时间">
        </el-date-picker>
        <span class='split-text'>至</span>
        <el-date-picker
          class='c-date-end'
          :editable="false"
          v-model="params.createTimeEnd"
          type="datetime"
          disabledDate='disabledEndDate'
          placeholder="选择结束时间">
        </el-date-picker>
        <!-- <el-button @click.native="clearTime" style='margin-left: -5px;' class='clear-time'icon="delete"></el-button> -->
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click.prevent="search">搜索</el-button>
        <el-button type="primary" @click.native="exportHandle" v-if="pathFrom == 'yfz'" :disabled='(!params.createTimeBegin || !params.createTimeEnd)'>导出</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
.fl{
  float: left;
  margin-right: 40px;
}
.button {
    vertical-align: middle;
}
.clear-time {
  vertical-align: middle;
  margin-left: 0px;
  padding: 10px;
  margin-top: -1px;
  border-radius: 0 4px 4px 0;
  &:hover{
    border-color: #C0CCDA;
  }
}

</style>
<style lang="scss">
.c-header {
  .el-col-6 {
    margin-bottom: 15px;
  }
}
.time-col {
  min-width: 580px;
}
.funtype-select{
    .el-input{
      max-width: 175px;
    }
  }
.c-select {
  display: table-cell;
  .el-input{
    max-width: 175px;
  }
  .el-input__inner{
    border-radius:  0 4px 4px 0 !important;
  }
}
.front-label {
  margin-right: -5px;
  background-color: #f9fafc;
  color: #99a9bf;
  vertical-align: middle;
  display: inline-block;
  position: relative;
  border: 1px solid #C0CCDA;
  border-radius: 4px;
  padding: 0 12px;
  line-height: 34px;
  white-space: nowrap;
  border-right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.split-text{
  line-height: 35px;
}
.c-date-start {
  display: inline-block;
  vertical-align: middle;
  .el-date-editor__editor{
    border-radius:  0 4px 4px 0 !important;
  }
}
.c-date-end{
  vertical-align: middle;
  .el-date-editor__editor{
    border-radius:  4px 0 0 4px !important;
  }
}
</style>
<script>
const pathFromObj = {
  '/finance/checkAccount': 'ddz', // 待对账
  '/finance/pendingAccount': 'dfz', // 待分账
  '/finance/splitAccount': 'yfz', // 已分账
  '/finance/splitAccount/list': 'fklb', // 已分账
  '/finance/reconciliation': 'ydz', // 已对账
  '/refund/refundment': 'tkcl', // 退款处理
  '/refund/refunded': 'ytk', // 已退款
  '/refund/refunded/records': 'tkjl', // 退款记录
  '/exchange/hasGetAndPay': 'ysf', // 待收付
  '/exchange/unGetAndPay': 'dsf', // 已收付
}
import AccountApi from 'api/account.js'
import { Message } from 'element-ui'
import {
  request,
  setCache,
  getCache
  // formatTimeString
} from 'src/common/utils.js'
export default {
  props: {
    param: {
      type: Object,
      required: false,
      default: function(a) {
        return {}
      },
    }
  },
  // 采购商、采购商ID、供应商ID、跟单员、应付款金额
  mounted() {
    const moneyAccountList = getCache({ key: 'moneyAccountList' })
    if (moneyAccountList) {
      this.financeAccountList = moneyAccountList
    } else {
      this.getList(); // 获取财务收款账户列表
    }
  },
  updated() {
    // if (this currentTab) {
    //   setCache({
    //     key: 'currentTabForFilter',
    //     value: this currentTab
    //   })
    // }
    // this.currentTab = getCache({
    //   key: 'currentTabForFilter'
    // }) || 1
  },
  watch: {
    currentTab (val) {
    },
    param (newValue, oldValue) {
      if (newValue.currentTab !== oldValue.currentTab) {
        setCache({
          key: 'currentTabForFilter',
          value: newValue.currentTab
        })
      }
      this.currentTab = getCache({
        key: 'currentTabForFilter'
      }) || 1
    }
  },
  data () {
    // const that = this
    const fullPath = this.$route.fullPath
    const params = Object.assign({
      orderNumber: '',
      returnReplaceNumber: '', // 退货单号
      number: '',
      outReposityNumber: '', // 出仓单号
      transactionNo: '',
      yfbTransactionNo: '',
      shopName: '',
      sellerNumber: '',
      follower: '', // 跟单员
      toPayMoney: '', // 应付/已付款金额
      user: '',
      userNumber: '',
      userType: '',
      fundType: '',
      billingCycle: '',
      buyerCompany: '',
      buyerNumber: '',
      financeAccount: '',
      accountName: '', // 收款方姓名
      accountNumber: '', // 收款方银行账号
      payWay: '',
      payStatus: '', // 支付状态
      accountType: '', // 账户类型
      payType: '',
      createTimeBegin: '',
      createTimeEnd: '',
      returnReplaceType: '', // 退换类型
      purchaserName: '', // 买货员
      incomeMoney: '', // 到账金额
      xiaozhangMoney: '', // 销账金额
      refundMoney: '', // 退款金额
      // 付款列表特有字段
    }, this.param)
    if (params.createTimeBegin) {
      params.createTimeBegin = new Date(params.createTimeBegin)
    }
    if (params.createTimeEnd) {
      params.createTimeEnd = new Date(params.createTimeEnd)
    }
    return {
      financeAccountList: [], // 收款账户列表
      fundTypeOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '5',
        label: '全款'
      }, {
        value: '2',
        label: '定金'
      }, {
        value: '3',
        label: '尾款'
      }, {
        value: '7',
        label: '差价'
      }],
      refundStatusOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '5',
        label: '受理中'
      }, {
        value: '2',
        label: '退款成功'
      }, {
        value: '3',
        label: '退款失败'
      }],
      userTypeOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '采购商'
      }, {
        value: '2',
        label: '供应商'
      }],
      exchangeTypeOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '退货'
      }, {
        value: '2',
        label: '换货'
      }],
      periodOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '月结'
      }, {
        value: '2',
        label: '半月结'
      }, {
        value: '3',
        label: '周结'
      }, {
        value: '4',
        label: '5万结'
      }, {
        value: '5',
        label: '10万结'
      }, {
        value: '6',
        label: '其他'
      }],
      payWayOptions: [{
        value: '',
        label: '全部'
      }, {
        value: 'alipay',
        label: '支付宝'
      }, {
        value: 'tecent_wx',
        label: '微信'
      }, {
        value: 'offline',
        label: '线下支付'
      }],
      payStatusOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '2',
        label: '受理中'
      }, {
        value: '3',
        label: '支付成功'
      }, {
        value: '-1',
        label: '受理失败'
      }, {
        value: '-2',
        label: '支付失败'
      }],
      accountTypeOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '2',
        label: '个人'
      }, {
        value: '1',
        label: '企业'
      }],
      payTypeOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '0',
        label: '垫付'
      }, {
        value: '1',
        label: '实付'
      }],
      returnReplaceTypeList: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '售前退货'
      }, {
        value: '2',
        label: '售前换货'
      }, {
        value: '3',
        label: '售后退货'
      }, {
        value: '4',
        label: '售后换货'
      }],
      pathFrom: pathFromObj[fullPath],
      params: params,
      currentTab: ''
    }
  },
  methods: {
    getList() {
      request({
        url: AccountApi.FinanceAccount.list,
        method: 'post',
        data: ''
      }).then(data => {
        if (data.success === '1') {
            data.result.unshift({
              bankName: '全部',
              id: '',
              bankNumber: ''
            })
           this.financeAccountList = data.result
           setCache({
             key: 'moneyAccountList',
             value: data.result
           })
        } else {
          Message({
            message: '请求数据失败,请手动刷新！',
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    clearTime: function(event) {
      this.params.createTimeBegin = '';
      this.params.createTimeEnd = '';
    },
    totalMoneyString: function() {
      let str = ''
      switch (this.pathFrom) {
        case 'ddz':
          str = this.currentTab == 2 ? '应收欠款金额' : '应收款金额'
          break;
        case 'ydz':
          str = this.currentTab == 2 ? '应收欠款金额' : '已对账金额'
          break;
      }
      return str
    },
    toPayMoneyString: function(type) {
      let str = ''
      switch (type) {
        case 'dfz':
          str = '应付款金额'
          break;
      }
      return str
    },
    disabledStartDate: function () {
      return (new Date(this.params.createTimeBegin).getTime() < new Date(this.params.createTimeEnd).getTime())
    },
    disabledEndDate: function () {
      return (new Date(this.params.createTimeBegin).getTime() > new Date(this.params.createTimeEnd).getTime())
    },
    search: function (event) {
      if (this.timeRange) {
        this.params.createTimeBegin = this.timeRange[0]
        this.params.createTimeEnd = this.timeRange[1]
      }
      const params = {
        orderNumber: this.params.orderNumber,
        returnReplaceNumber: this.params.returnReplaceNumber,
        number: this.params.number,
        outReposityNumber: this.params.outReposityNumber,
        transactionNo: this.params.transactionNo,
        yfbTransactionNo: this.params.yfbTransactionNo,
        shopName: this.params.shopName,
        sellerNumber: this.params.sellerNumber,
        follower: this.params.follower,
        purchaserName: this.params.purchaserName, // 买货员
        toPayMoney: this.params.toPayMoney,
        totalMoney: this.params.totalMoney,
        xiaozhangMoney: this.params.xiaozhangMoney,
        incomeMoney: this.params.incomeMoney,
        refundMoney: this.params.refundMoney,
        user: this.params.user,
        userNumber: this.params.userNumber,
        userType: this.params.userType,
        fundType: this.params.fundType == '' ? '' : this.params.fundType,
        billingCycle: '',
        buyerNumber: this.params.buyerNumber,
        buyerCompany: this.params.buyerCompany,
        financeAccount: this.params.financeAccount == '' ? '' : this.params.financeAccount,
        accountName: this.params.accountName,
        accountNumber: this.params.accountNumber,
        payWay: this.params.payWay == '' ? '' : this.params.payWay,
        payStatus: this.params.payStatus,
        accountType: this.params.accountType,
        payType: this.params.payType == '' ? '' : this.params.payType,
        createTimeBegin: new Date(this.params.createTimeBegin).getTime(),
        createTimeEnd: new Date(this.params.createTimeEnd).getTime(),
      }
      for (const i in params) {
        if (!params[i]) {
          delete params[i]
        }
      }
      if (pathFromObj[this.$route.fullPath] == 'fklb') { // 付款列表特殊一些
        const params2 = {
          orderNumber: this.params.orderNumber,
          payStatus: this.params.payStatus == '' ? '' : this.params.payStatus,
          accountName: this.params.accountName,
          accountNumber: this.params.accountNumber,
          accountType: this.params.accountType == '' ? '' : this.params.accountType,
          yfbTransactionNo: this.params.yfbTransactionNo == '' ? '' : this.params.yfbTransactionNo,
          transactionNo: this.params.transactionNo == '' ? '' : this.params.transactionNo,
          createTimeBegin: new Date(this.params.createTimeBegin).getTime(),
          createTimeEnd: new Date(this.params.createTimeEnd).getTime(),
        }
        for (const i in params2) {
          if (!params2[i]) {
            delete params2[i]
          }
        }
        this.$emit('getParams', params2)
      } else {
        this.$emit('getParams', params)
      }
    },
    exportHandle: function () {
      this.$emit('exporHandle', {
        confirmPayTimeBegin: new Date(this.params.createTimeBegin).getTime(),
        confirmPayTimeEnd: new Date(this.params.createTimeEnd).getTime()
      })
    }
  }
}
</script>
