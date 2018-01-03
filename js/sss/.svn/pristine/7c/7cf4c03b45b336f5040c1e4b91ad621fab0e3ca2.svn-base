<template>
  <div class="bill-manage-detail" v-loading.body="fullscreenLoading">
    <div class="section-wrap">
      <div class="title clearfix">
       <div style="float: left;">
        <strong style="font-size: 25px;">采购商信息</strong>
       </div>
      </div>
      <ul class="section clearfix">
        <li><span class="fw l">采购商ID：</span><span  class="fw r">{{obj.buyerNumber}}</span></li>
        <li class="fr"><span class="fr-t">采购商名称：</span><span  class="fw r">{{obj.buyerCompany}}</span></li>
      </ul>
      <ul class="section clearfix">
        <li><span class="fw l">账单号：</span><span  class="fw r">{{obj.number | formateTime}}</span></li>
        <li class="fr"><span class="fr-t">账单日期：</span><span  class="fw r">{{obj.beginTime | formateTime}}-{{obj.endTime | formateTime}}</span></li>
      </ul>
      <ul class="section clearfix">
        <li><span class="fw l">出单日期：</span><span  class="fw r">{{obj.billTime | formateTime}}</span></li>
         <li class="fr"><span class="fr-t">还款到期日：</span><span  class="fw r">{{obj.returnDate | formateTime}}</span></li>
      </ul>
      <ul class="section clearfix">
        <li><span class="fw l">结算周期：</span><span  class="fw r">
         <template v-if="obj.billingCycle == 0">周结</template>
         <template v-if="obj.billingCycle == 1">半月结</template>
         <template v-if="obj.billingCycle == 2">月结</template>
        </span></li>
         <li class="fr"><span class="fr-t">跟单员：</span><span  class="fw r">{{obj.followerName}}</span></li>
      </ul>
      <ul class="section clearfix">
        <li>
         <span class="fw l">支付状态：</span><span  class="fw r">
          <template v-if="obj.status == 1 || obj.status == 2 || obj.status == 3">未清偿</template>
          <template v-if="obj.status == 4">已清偿</template>
         </span>
       </li>
      </ul>
     </div>
     <div class="section-wrap" style="padding-bottom: 20px; border-bottom: none; margin-top: 10px; max-height: 600px; overflow: auto;">
      <!-- <div class="title" style="margin-top: 20px; margin-bottom: 20px;">
        <span style="font-size: 20px;">账单明细</span>
        <el-button-group style="margin-left: 20px;">
          <el-button :type="tabIndex == 0 ? 'primary' : ''" @click.native="changeTab(0)">当前账单</el-button>
          <el-button :type="tabIndex == 1 ? 'primary' : ''"  @click.native="changeTab(1)">顺延订单</el-button>
        </el-button-group>
      </div> -->
      <div class="new-table">
        <table class="pure-table pure-table-bordered fix-table fix-width">
           <thead>
               <tr class="th">
                   <th style="min-width:100px; width: 10%;">交易时间</th>
                   <th style="min-width:100px; width: 10%;">交易类型</th>
                   <th style="min-width:90px; width: 10%;">订单号</th>
                   <th style="min-width:70px; width: 10%;">货号</th>
                   <th style="min-width:145px; width: 10%;">供应商档口名称</th>
                   <th style="min-width:100px; width: 10%;">出仓单号</th>
                   <th>
                     <tr>
                       <th style="min-width:70px; width: 10%; padding: 0; border-bottom: 0;">色号</th>
                       <th style="min-width:70px; width: 10%; padding: 0; border-bottom: 0;">单价</th>
                       <th style="min-width:110px; width: 10%; padding: 0; border-bottom: 0;">数量&单位</th>
                     </tr>
                   </th>
                   <th style="min-width:100px; width: 10%;">销售货款(￥)</th>
                   <th style="min-width:100px; width: 10%;">订单退款(￥)</th>
                   <th style="min-width:100px; width: 10%;">订单欠款(￥)</th>
               </tr>
           </thead>
           <tbody>
              <template v-for="(val, index) in result">
               <tr v-for="(value, key) in val.transactionList" :class="{bottomLine: (key == val.transactionList.length - 1), middelLine: val.loser}">
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
                       <td style="min-width:70px; width: 30%; border:0;">{{item.salePrice}}{{item.salePriceUnit}}</td>
                       <td style="min-width:110px; width: 40%; border:0;">{{item.quantity}}{{item.quantityUnit}}</td>
                      </tr>
                     </template>
                   </td>
                   <td class="td-cell"><div class="td-content">{{value | saleTotalMoney}}</div></td>
                   <td class="td-cell"><div class="td-content">
                      <template v-if="value.trType == 1 && value.accountMoney">－</template>
                      <template v-if="(value.trType == 3 || value.trType == 6) && value.accountMoney">+</template>
                      {{value.accountMoney | formateNumber}}</div>
                   </td>
                   <td class="td-cell"><div class="td-content" :style="{color: Number(value.debtMoney) > 0 ? 'red' : '' }">
                      <template v-if="(value.trType == 3 || value.trType == 6) && value.debtMoney">-</template>
                      {{value.debtMoney | formateNumber}}</div>
                   </td>
               </tr>
              </template>
              <tr v-if="result.length == 0">
                 <td colspan="13"><div style="padding: 20px 0; color: red;">没有数据啦^__^!!!!</div></td>
             </tr>
           </tbody>
       </table>
      </div>
     </div>
     <div class="imgLits">

       <div class="showmadan">
         <p style="display: inline-block;margin-right: 10px;">付款凭证：</p>
         <a :href="item" :key="item" v-lightbox="certificateImgList" v-for="(item, index) in certificateImgList" class="madan-wrap">
           <img  :src="`${item}`" width='50' height="50" />
         </a>
       </div>
     </div>
     <div class="showTotal clearFix">
      <p class="bot-item"><span class="bot-item-l">应收款</span><span class="bot-item-r">￥{{shouldCollectMoney}}</span></p>
      <p class="bot-item"><span class="bot-item-l">余额抵扣</span><span class="bot-item-r">-{{obj.freezeMoney | formateNumber}}</span></p>
      <p class="bot-item"><span class="bot-item-l">滞纳金</span><span class="bot-item-r">￥{{lateFeesMoney}}</span></p>
      <p class="bot-item"><span  class="bot-item-l" style="font-weight: bolder;">总计</span><span  class="bot-item-r">￥{{countTotalMoney}}</span></p>
     </div>
     <div style="text-align: center;">
       <el-button size="small" @click.native="$router.go(-1)">返回</el-button>
       <template v-if="$route.query.tabIndex == 0 && obj.status == 2">
        <el-button type="primary" size="small" @click.native="confirmPayStatus=true;">确认收款</el-button>
        <el-button type="primary" size="small" @click.native="unnormalVisible=true;">异常</el-button>
       </template>
     </div>

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
           <span class="pay-item-r"><span style="margin-right: 10px;">{{countTotalMoney}}</span>元</span>
         </div>
         <div class="pay-item">
           <span class="pay-item-l"><strong class="star">*</strong>实际收款:</span>
           <span class="pay-item-r"><el-input v-model="confirmPayInfo.paidMoney" type="number" style="width: 250px;"></el-input></span>
         </div>
         <div class="pay-item">
           <span class="pay-item-l"><strong class="star">*</strong>转账日期:</span>
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
     <lightbox />
  </div>
</template>

<script>
import allApi from 'api/account'
import Lightbox from 'components/lightbox/lightbox'
import {
  request,
  // extend,
  // setCache,
  formatTimeString
} from 'common/utils'
export default {
  data() {
    return {
      obj: {},
      fullscreenLoading: true,
      orderTrasactionList: [],
      postponeOrderTrasactionList: [],
      result: [],
      confirmPayInfo: {
        paidMoney: '',
        paidTime: ''
      },
      confirmPayStatus: false,
      unnormalVisible: false,
      confirmPayVisible: true,
      financeRemark: '',
      tabIndex: 0,
      uploadVisible: false,
      certificateImgList: [],
      imgPath: 'http://www.soouya.com',
    }
  },
  components: {
    Lightbox
  },
  computed: {
   // 应收款
    shouldCollectMoney () {
      let total = 0
      const currentList = this.orderTrasactionList
      currentList.forEach((item) => {
        item.transactionList.forEach((val) => {
           if (val.debtMoney) {
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
     if (currentTimeDate > returnDate) {
       day = Math.ceil((currentTimeDate - returnDate) / 86400000)
       lateFeesMoney = (this.shouldCollectMoney - this.obj.freezeMoney) * 0.003 * day
     }
     if (this.obj.lateFeesMoney == null && this.obj.status == 1) {
       return lateFeesMoney.toFixed(2)
     } else {
       return Number(this.obj.lateFeesMoney).toFixed(2)
     }
    },
    countTotalMoney () {
      return (Number(this.shouldCollectMoney) - Number(this.obj.freezeMoney) + Number(this.lateFeesMoney)).toFixed(2)
    }
  },
  watch: {
    confirmPayInfo: {
      handler: function (val, oldVal) {
        let on = false
        for (const key of Object.keys(val)) {
          if (key == 'paidMoney' || key == 'paidTime') {
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
        return ''
      }
    }
  },
  methods: {
    getDetail () {
      this.fullscreenLoading = true
      request({
       url: allApi.Account.Bill_getDetail,
       data: {
         param: JSON.stringify({ _time: this._time, id: this.$route.query.id })
       },
       method: 'post'
      }, (res) => {
        this.fullscreenLoading = false
        if (res.success == 1) {
          this.obj = res.obj
          this.convertData(this.obj)
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1200
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
         item.loser = '1'
      })
      this.orderTrasactionList = obj.orderTrasactionList
      this.postponeOrderTrasactionList = obj.postponeOrderTrasactionList
      this.result = this.result.concat(this.orderTrasactionList, this.postponeOrderTrasactionList)
      this.certificateImgList = obj.certificateImgList.map((item) => {
         item = `${this.imgPath}${item}`
         return item
      })
    },
    changeTab (index) {
      this.tabIndex = index
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
     if (this.confirmPayInfo.paidMoney > this.countTotalMoney) {
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
      id: this.obj.id,
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
              self.$router.push({ name: 'billManage' })
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
    clearTemInfo () {
      for (const key of Object.keys(this.confirmPayInfo)) {
        this.confirmPayInfo[key] = ''
      }
      this.confirmPayStatus = false
      this.unnormalVisible = false
      this.financeRemark = ''
    },
    // 异常
    confirmUnnormal () {
     this.fullscreenLoading = true
     const obj = {
       financeRemark: this.financeRemark,
       id: this.obj.id,
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
              self.$router.push({ name: 'billManage' })
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
  },
};
</script>
<style src="assets/style/table.scss" lang="scss"></style>
<style lang="scss">
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
 .bill-manage-detail {
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
         border-bottom: 1px dotted #ccc;
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
       .middelLine {
         text-decoration: line-through;
         .td-cell {
           color: #ccc;
         }
       }
     }
     .el-table td, .el-table th.is-leaf {
       text-align: center !important;
     }

     .el-table tr.bottomLine td{
       border-bottom-color: #20a0ff;
     }

   }
   .section-wrap {
     border-bottom: 2px solid #cad3de;
     padding-bottom: 10px;
     position: relative;
     z-index: 2000;
     .section {
       font-size: 14px;
       color: #383838;
       li {
         float: left;
         margin-right: 40px;
         margin-bottom: 5px;
         list-style: none;
         color: #000 !important;
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
         margin-right: 0;
         width:400px;
         .fr-t {
           width: 120px;
           display: inline-block;
           text-align: right;
         }
       }
     }
   }
   .imgLits {
     padding: 10px;
     border-bottom: 2px solid #ccc;
     overflow: hidden;
     .madan-wrap {
       position: relative;
       display: inline-block;
       margin-right: 15px;
       margin-bottom: 15px;
     }
     .showmadan {
       float: left;
     }

   }
 }
 .bill-pay-money {
   min-width: 500px;
   .pay-content {
     min-width: 500px;
     .pay-item {
       position: relative;
       padding-bottom: 10px;
       .pay-item-l {
         width: 110px;
         display: inline-block;
         text-align: right;
         padding-right: 10px;
       }
     }
   }


   .del-arrow {
    position: absolute;
    text-align: center;
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 50%;
    top: -10px;
    right: -10px;
    background-color: #ccc;
    color: #fff;
    border: 1px solid #fff;
   }
   .addImg {
     display: inline-block;
     width: 50px;
     height: 50px;
     line-height: 50px;
     text-align: center;
     font-size: 30px;
     background-color: #999;
     color: #fff;
     cursor: pointer;
   }
 }
</style>
