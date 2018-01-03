<template>
  <div class="bill-detail-edit">
    <div class="section-wrap">
      <div class="title clearfix">
       <div style="float: left;">
        <strong style="font-size: 25px;">{{obj.buyerCompany}}</strong>
        <span style="margin-left: 20px;">采购商ID：{{obj.buyerNumber}}</span>
       </div>
      </div>
      <ul class="section clearfix">
        <li><span class="fw l">账单号：</span><span  class="fw r">{{obj.number}}</span></li>
      </ul>
      <ul class="section clearfix">
        <li><span class="fw l">账单日期：</span><span  class="fw r">{{obj.beginTime | formateTime}}</span></li>
        <li class="fr"><span class="fw">还款到期日：</span><span  class="fw r">{{obj.endTime | formateTime}}</span></li>
      </ul>
      <ul class="section clearfix">
        <li><span class="fw l">账单日：</span><span  class="fw r">{{obj.billTime | formateTime}}</span></li>
         <li class="fr"><span class="fw r">清偿时间：</span><span  class="fw r">{{obj.dischargeTime | formateTime}}</span></li>
      </ul>
      <ul class="section clearfix">
        <li><span class="fw l">结算周期：</span><span  class="fw r">
           <template v-if="obj.billingCycle == 0">周结</template>
           <template v-if="obj.billingCycle == 1">半月结</template>
           <template v-if="obj.billingCycle == 2">月结</template>
        </span></li>
         <li class="fr"><span class="fw r">跟单员：</span><span  class="fw r">{{obj.followerName}}</span></li>
      </ul>
     </div>
     <div class="section-wrap" style="padding-bottom: 20px; border-bottom: none;">
      <div class="title" style="margin-top: 20px; margin-bottom: 20px;">
        <span style="font-size: 20px;">账单明细</span>
        <el-button-group style="margin-left: 20px;">
          <el-button :type="tabIndex == 0 ? 'primary' : ''" @click.native="changeTab(0)">当前账单</el-button>
          <el-button :type="tabIndex == 1 ? 'primary' : ''"  @click.native="changeTab(1)">顺延账单</el-button>
        </el-button-group>
         <div class="title-status">
            <span v-if="obj.status == 1">未提交</span>
            <span v-if="obj.status == 2" style="color: #20a0ff;">审核中</span>
            <span v-if="obj.status == 3">审核不通过</span>
            <span v-if="obj.status == 4" style="color: #999;">已清偿</span>
         </div>

      </div>
      <div class="new-table">
        <table class="pure-table pure-table-bordered fix-table fix-width">
           <thead>
               <tr class="th">
                   <th style="min-width:100px; width: 10%;">操作</th>
                   <th style="min-width:100px; width: 10%;">交易时间</th>
                   <th style="min-width:100px; width: 10%;">交易类型</th>
                   <th style="min-width:90px; width: 10%;">订单号</th>
                   <th style="min-width:70px; width: 10%;">货号</th>
                   <th style="min-width:145px; width: 10%;">供应商档口名称</th>
                   <th style="min-width:100px; width: 10%;">出仓单号</th>
                   <th>
                     <tr>
                       <th style="min-width:70px; width: 10%; padding: 0; border-bottom: 0;">色号</th>
                       <th style="min-width:110px; width: 10%; padding: 0; border-bottom: 0;">单价</th>
                       <th style="min-width:100px; width: 10%; padding: 0; border-bottom: 0;">数量&单位</th>
                     </tr>
                   </th>
                   <th style="min-width:110px; width: 10%;">销售货款(￥)</th>
                   <th style="min-width:110px; width: 10%;">订单退款(￥)</th>
                   <th style="min-width:110px; width: 10%;">订单欠款(￥)</th>
               </tr>
           </thead>
           <tbody>
              <template v-for="(val, index) in (tabIndex == 0 ? orderTrasactionList : postponeOrderTrasactionList)">
               <tr v-for="(value, key) in val.transactionList">
                   <td class="td-cell" v-if="key == 0" :rowspan="val.transactionList.length" style="border-right: 1px solid #ccc;">
                     <label :for="value.serviceNumber" class="checkbox">
                         <div class="td-content">
                            <input type="checkbox" v-model="val.checked" :id="value.serviceNumber"  @change="updateChecked()">
                       </div>
                    </label>
                   </td>
                   <td class="td-cell"><div class="td-content">{{value.createTime | formateTime}}</div></td>
                   <td class="td-cell">
                    <div class="td-content">
                     <template v-if="value.trType == 1">贸易单</template>
                     <template v-if="value.trType == 2">服务单</template>
                     <template v-if="value.trType == 3">售后退货</template>
                     <template v-if="value.trType == 4">剪版</template>
                     <template v-if="value.trType == 5">补扣单</template>
                     <template v-if="value.trType == 6">售后换货</template>
                    </div>
                   </td>
                   <td class="td-cell"><div class="td-content">{{value.serviceNumber}}</div></td>
                   <td class="td-cell"><div class="td-content">{{value.productNumber}}</div></td>
                   <td class="td-cell"><div class="td-content">{{value.shopName}}</div></td>
                   <td class="td-cell">
                    <div class="td-content">
                     {{value.outReposity && value.outReposity.outReposityNumber}}
                    </div>
                   </td>
                   <td class="td-cell">
                     <template v-if="value.outReposity && (value.trType != 3 && value.trType != 6)">
                      <tr style="width: 100%;" v-for="item in value.outReposity.clothLoenList">
                       <td style="min-width:70px; width: 30%; border:0;">{{item.color}}</td>
                       <td style="min-width:110px; width: 30%; border:0;">{{item.salePrice}}{{item.salePriceUnit}}</td>
                       <td style="min-width:100px; width: 40%; border:0;">{{item.quantity}}{{item.quantityUnit}}</td>
                      </tr>
                     </template>
                   </td>
                   <td class="td-cell"><div class="td-content">{{value | saleTotalMoney}}</div></td>
                   <td class="td-cell"><div class="td-content">
                      <template v-if="value.trType == 1 && value.accountMoney">－</template>
                      <template v-if="(value.trType == 3 || value.trType == 6) && value.accountMoney">+</template>
                      {{value.accountMoney | formateNumber}}</div>
                   </td>
                   <td class="td-cell">
                      <div class="td-content" :style="{color: Number(value.debtMoney) > 0 ? 'red' : '' }">
                       <template v-if="(value.trType == 3 || value.trType == 6) && value.debtMoney">-</template>
                       {{value.debtMoney | formateNumber}}
                      </div>
                   </td>
               </tr>
              </template>
              <tr v-if="(tabIndex == 0 && orderTrasactionList.length == 0) || (tabIndex == 1 && postponeOrderTrasactionList.length == 0)">
                  <td colspan="13"><div style="padding: 20px 0; color: red;">没有数据啦^__^!!!!</div></td>
              </tr>
           </tbody>
       </table>
      </div>
     </div>
     <el-button :disabled="!getId.ids.length" type="primary" @click.native="getCheckId">
      <span v-if="tabIndex == 0">将所选项移至下个结算周期</span>
      <span v-if="tabIndex == 1">将所选项恢复至当前结算周期</span>
      <span v-if="getId.ids.length > 0">({{getId.chosedCount}})</span>
     </el-button>
     <div class="showTotal clearFix">
       <p class="bot-item"><span class="bot-item-l">应收款</span><span class="bot-item-r">￥{{shouldCollectMoney}}</span></p>
       <p class="bot-item"><span class="bot-item-l">余额抵扣</span><span class="bot-item-r">-{{obj.freezeMoney | formateNumber}}</span></p>
       <p class="bot-item"><span class="bot-item-l">滞纳金</span><span class="bot-item-r">
        ￥<template v-if="isEditlateFeesMoney">
         <el-input type="number" v-model="showLateFeesMoney" size="small" style="display: inline-block; width: 120px;" placeholder="请输入内容"></el-input>
         <el-button style="margin-left: 10px;" size="small" type="primary" @click.native="resetLateFeesMoney">重置</el-button>
        </template><template v-else>{{lateFeesMoney}}</template>
       </span></p>
       <div class="bot-item">
         <div class="bot-item-r">
          <el-input
           type="textarea"
           style="display: inline-block; width: 300px; margin-left: 120px;"
           :autosize="{ minRows: 2, maxRows: 4}"
           resize="none"
           placeholder="请说明修改账单的原因，字数不限"
           v-model="followerRemark">
          </el-input>
         </div>
       </div>
       <p class="bot-item"><span  class="bot-item-l" style="font-weight: bolder;">总计</span><span  class="bot-item-r">￥{{countTotalMoney}}</span></p>
       <p class="bot-item" style="margin-top: 50px; text-align: center;">
          <el-button style="width: 120px" @click.native="$router.go(-1)">取消</el-button>
          <el-button style="width: 120px" :disabled="isSubmit" type="primary" @click.native="saveEdit">保存</el-button>
       </p>
     </div>
  </div>
</template>

<script>
import allApi from 'api/allApi'
import {
  request,
  sortByObject,
  // extend,
  // setCache,
  formatTimeString
} from 'utils/tool'
export default {
  data() {
    return {
      obj: {},
      orderTrasactionList: [],
      postponeOrderTrasactionList: [],
      tempList: [], // 用来暂时存将所选项恢复至当前结算周期
      tabIndex: 0,
      linkConnect: 0, // 关链计算
      isEditlateFeesMoney: false, // 是否可编辑滞纳金
      followerRemark: '',
      showLateFeesMoney: 0
    }
  },
  computed: {
    getId () {
      const ids = []
      this.tempList = []
      this.linkConnect++
      let chosedCount = 0
      const currentList = this.tabIndex == 0 ? this.orderTrasactionList : this.postponeOrderTrasactionList
      currentList.forEach((item) => {
        if (item.checked) {
          chosedCount++
          this.tempList.push(item)
          item.transactionList.forEach((val) => {
             ids.push(val.id)
          })
        }
      })
      return {ids, chosedCount}
    },
   // 应收款
    shouldCollectMoney () {
      let total = 0
      const currentList = this.orderTrasactionList
      currentList.forEach((item) => {
        item.transactionList.forEach((val) => {
           if (val.debtMoney != undefined) {
             if (val.trType == 3 || val.trType == 6) {
               total -= val.debtMoney
             } else {
               total += val.debtMoney
             }
           }
        })
      })
      return total.toFixed(2)
    },
    // 滞纳金
    lateFeesMoney () {
     // 1 待提交 2 审核中 3 审核不通过 4 已清偿
     // 滞纳金={回款到期日时}（欠款金额-余额抵扣）*0.3%*天数
     const returnDate = this.obj.returnDate
     const currentTimeDate = (new Date()).getTime()
     let day
     let lateFeesMoney = 0
     let outPutLateFeesMoney = 0
     if (currentTimeDate > returnDate) {
       day = Math.ceil((currentTimeDate - returnDate) / 86400000)
       lateFeesMoney = (this.shouldCollectMoney - Number(this.obj.freezeMoney)) * 0.003 * day
       this.isEditlateFeesMoney = true
     }
     if (this.obj.lateFeesMoney == null && this.obj.status == 1) {
       outPutLateFeesMoney = lateFeesMoney.toFixed(2)
     } else {
       outPutLateFeesMoney = Number(this.obj.lateFeesMoney).toFixed(2)
     }
     this.showLateFeesMoney = outPutLateFeesMoney
     return outPutLateFeesMoney
    },
    countTotalMoney () {
      return (Number(this.shouldCollectMoney) - Number(this.obj.freezeMoney) + Number(this.showLateFeesMoney)).toFixed(2)
    },
    isSubmit () {
      let on = true
      if (this.isEditlateFeesMoney && String(this.showLateFeesMoney) != '' && Number(this.showLateFeesMoney) >= 0 && this.followerRemark) { // 能编辑滞纳金要提交满足的条件
        on = false
      }
      if (!this.isEditlateFeesMoney && this.followerRemark) { // 不能编辑滞纳金
        on = false
      }
      return on
    }
  },
  mounted() {
    this._time = (new Date()).getTime()
    this.getDetail()
  },
  filters: {
    saleTotalMoney (row) {
      if (row.outReposity && row.outReposity.clothLoenList.length > 0) {
        let total = 0
        row.outReposity.clothLoenList.forEach((val) => {
          let subTotal = 0
          subTotal += val.salePrice * val.quantity
          total += subTotal
        })
        return total.toFixed(2)
      } else {
        return ''
      }
    },
    formateNumber (val) {
      if (String(val) == '0') {
        return '0.00'
      } else if (String(val) == 'undefined') {
        return ''
      } else {
        return (Number(val).toFixed(2))
      }
    },
    formateTime (val) {
      if (val) {
        return formatTimeString(val)
      } else {
        return '--'
      }
    }
  },
  methods: {
    getDetail () {
      this.$store.dispatch('changeload', true)
      request({
       url: allApi.Account_Bill.getDetail,
       data: {
         param: JSON.stringify({ _time: this._time, id: this.$route.query.id })
       }
      }, (res) => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
          this.obj = res.obj
          this.convertData(this.obj)
        } else {
          const self = this
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1200,
            onClose () {
              self.$router.go(-1)
            }
          })
        }
      })
    },
    convertData (obj) {
      obj.orderTrasactionList.forEach((item) => {
         item.checked = false
      })
      obj.postponeOrderTrasactionList.forEach((item) => {
         item.checked = false
      })
      this.orderTrasactionList = obj.orderTrasactionList
      this.postponeOrderTrasactionList = obj.postponeOrderTrasactionList
    },
    changeTab (index) {
      this.tabIndex = index
      this.clearChecked()
    },
    clearChecked () {
      this.orderTrasactionList.forEach((item) => {
         item.checked = false
      })
      this.postponeOrderTrasactionList.forEach((item) => {
         item.checked = false
      })
    },
    exchangeData () { // 数据交换
       if (this.tabIndex == 0) {
         this.tempList.forEach((item) => {
           this.postponeOrderTrasactionList.push(item)
           this.postponeOrderTrasactionList.sort(sortByObject('sortTime')) // 排序
           this.orderTrasactionList = this.orderTrasactionList.filter((val) => val.orderNumber != item.orderNumber)
           this.orderTrasactionList.sort(sortByObject('sortTime')) // 排序
         })
       } else {
         this.tempList.forEach((item) => {
           this.orderTrasactionList.push(item)
           this.orderTrasactionList.sort(sortByObject('sortTime')) // 排序
           this.postponeOrderTrasactionList = this.postponeOrderTrasactionList.filter((val) => val.orderNumber != item.orderNumber)
           this.postponeOrderTrasactionList.sort(sortByObject('sortTime')) // 排序
         })
       }
       this.tempList = []
       this.showLateFeesMoney = this.lateFeesMoney
    },
    getCheckId () {
      this.exchangeData()
    },
    updateChecked () {
      this.linkConnect--
    },
    // 滞纳金
    resetLateFeesMoney () {
      this.showLateFeesMoney = this.lateFeesMoney
    },
    saveEdit () {
     this.$store.dispatch('changeload', true)
     const req = {
        id: this.$route.query.id,
        followerRemark: this.followerRemark,
        trasactionIdList: []
     }
     if (this.isEditlateFeesMoney) { // 可编辑滞纳金
       req.lateFeesMoney = this.showLateFeesMoney
     }
     this.orderTrasactionList.forEach((item) => {
        item.transactionList.forEach((val) => {
          req.trasactionIdList.push(val.id)
        })
     })
     this.$store.dispatch('changeload', true)
     request({
      url: allApi.Account_Bill.edit,
      data: {
        param: JSON.stringify(req)
      }
     }, (res) => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
          const self = this
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose () {
              self.$router.push({ name: 'billDetailView', query: {id: self.$route.query.id} })
            }
          })
        } else {
         this.$message({
           type: 'error',
           message: res.msg,
           duration: 1000
         })
        }
     })
    }
  },
  components: {}
};
</script>
<style src="assets/style/table.scss" lang="scss"></style>
<style lang="scss">
 .bill-detail-edit {
   background: #fff;
   padding: 5px 10px;
   .title {
     font-weight: bolder;
     margin-bottom: 8px;
     margin-top: 8px;
     font-size: 16px;
     .operate {
       float: right;
       button {
         margin-right: 10px;
       }
     }
     .title-status {
       float: right;
       color: red;
       padding-top: 8px;
       padding-right: 10px;
       font-size: 20px;
     }
   }
   .showTotal {
     margin-bottom: 20px;
     padding: 10px;
     background-color: #fff;
     .bot-item {
       margin-bottom: 10px;
       .bot-item-l {
         display: inline-block;
         width: 100px;
         margin-right: 10px;
       }
       .bot-item-r {
         color: red;
       }
     }
   }
   .new-table {
     width: 100%;
     overflow: auto;
     .pure-table td, .pure-table th {
       padding: 8px 10px;
     }
     .fix-width {
       min-width: 1000px;
       width: 100%;
       overflow-y: scroll;
       td, th {
         text-align: center;
         border-left: 0;
         border-right: 0;
         border-bottom: 1px solid #ccc;
       }
       .td-content {
         max-width: 200px;
         word-wrap: break-word;
       }
       .bottomLine {
         .td-cell {
           border-bottom: 1px solid #20a0ff;
         }
       }
     }
     .el-table td, .el-table th.is-leaf {
       text-align: center !important;
     }

     .el-table tr.bottomLine td{
       border-bottom-color: #20a0ff;
     }
     .checkbox {
       display: inline-block;
       width: 100%;
       height: 50px;
       line-height: 50px;
       cursor: pointer;
     }
   }
   .section-wrap {
     border-bottom: 2px solid #cad3de;
     padding-bottom: 10px;
     .section {
       font-size: 14px;
       color: #383838;
       li {
         float: left;
         margin-right: 40px;
         margin-bottom: 5px;
         list-style: none;
         .fw {
           text-align: right;
           display: inline-block;
         }
         .l {
           width: 110px;
           padding-right: 2px;
         }
       }
       .fr {
         float: right;
       }
     }
   }
 }
</style>
