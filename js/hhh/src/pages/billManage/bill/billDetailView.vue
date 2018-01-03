<template>
  <div class="bill-detail">
    <div class="section-wrap">
      <div class="title clearfix">
       <div style="float: left;">
        <strong style="font-size: 25px;">{{obj.buyerCompany}}</strong>
        <span style="margin-left: 20px;">采购商ID：{{obj.buyerNumber}}</span>
       </div>
        <div class="operate">
         <el-popover
           ref="popover1"
           placement="top-start"
           title="备注"
           width="200"
           trigger="hover"
           :content="obj.financeRemark">
         </el-popover>
          <el-button :type="obj.status == 3 ? 'danger' : ''" size="small"  v-popover:popover1>查看备注</el-button>
          <router-link :to="{name: 'billDetailEdit', query: {id: this.$route.query.id}}" v-if="obj.status == 1 || obj.status == 3">
            <el-button size="small">编辑</el-button>
          </router-link>
          <!-- <el-button type="danger" size="small">导出</el-button> -->
          <el-button type="primary" v-if="obj.status == 1 || obj.status == 3" size="small" @click.native="uploadVisible=true">提交审核</el-button>
        </div>
      </div>
      <ul class="section clearfix">
        <li><span class="fw l">账单号：</span><span  class="fw r">{{obj.number}}</span></li>
      </ul>
      <ul class="section clearfix">
        <li><span class="fw l">账单日期：</span><span  class="fw r">{{obj.beginTime | formateTime}}</span><b style="margin: 0 10px;">-</b><span>{{obj.endTime | formateTime}}</span></li>
        <li class="fr"><span class="fr-t">还款到期日：</span><span  class="fw r">{{obj.returnDate | formateTime}}</span></li>
      </ul>
      <ul class="section clearfix">
        <li><span class="fw l">账单日：</span><span  class="fw r">{{obj.billTime | formateTime}}</span></li>
         <li class="fr"><span class="fr-t">清偿时间：</span><span  class="fw r">{{obj.dischargeTime | formateTime}}</span></li>
      </ul>
      <ul class="section clearfix">
        <li><span class="fw l">结算周期：</span><span  class="fw r">
          <template v-if="obj.billingCycle == 0">周结</template>
          <template v-if="obj.billingCycle == 1">半月结</template>
          <template v-if="obj.billingCycle == 2">月结</template>
        </span></li>
         <li class="fr"><span class="fr-t">跟单员：</span><span  class="fw r">{{obj.followerName}}</span></li>
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
                   <th style="min-width:100px; width: 10%;">销售货款(￥)</th>
                   <th style="min-width:100px; width: 10%;">账户余额(￥)</th>
                   <th style="min-width:100px; width: 10%;">订单欠款(￥)</th>
               </tr>
           </thead>
           <tbody>
              <template v-for="(val, index) in (tabIndex == 0 ? orderTrasactionList : postponeOrderTrasactionList)">
               <tr v-for="(value, key) in val.transactionList" :class="{bottomLine: (key == val.transactionList.length - 1)}">
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
                    {{value.accountMoney | formateNumber}}</div></td>
                   <td class="td-cell"><div class="td-content" :style="{color: Number(value.debtMoney) > 0 ? 'red' : '' }">
                    <template v-if="(value.trType == 3 || value.trType == 6) && value.debtMoney">-</template>
                    {{value.debtMoney | formateNumber}}</div></td>
               </tr>
              </template>
              <tr v-if="(tabIndex == 0 && orderTrasactionList.length == 0) || (tabIndex == 1 && postponeOrderTrasactionList.length == 0)">
                  <td colspan="13"><div style="padding: 20px 0; color: red;">没有数据啦^__^!!!!</div></td>
              </tr>
           </tbody>
       </table>
      </div>
     </div>
     <div class="showTotal clearFix">
      <p class="bot-item"><span class="bot-item-l">应收款</span><span class="bot-item-r">￥{{shouldCollectMoney}}</span></p>
      <p class="bot-item"><span class="bot-item-l">余额抵扣</span><span class="bot-item-r">-{{obj.freezeMoney | formateNumber}}</span></p>
      <p class="bot-item"><span class="bot-item-l">滞纳金</span><span class="bot-item-r">￥{{lateFeesMoney}}</span></p>
      <p class="bot-item"><span  class="bot-item-l" style="font-weight: bolder;">总计</span><span  class="bot-item-r">￥{{countTotalMoney}}</span></p>
     </div>

    <el-dialog
       v-model="uploadVisible"
       size="small"
       custom-class="bill-pay-money"
       :close-on-click-modal="false">
           <div class="pay-content">
             <div class="pay-item">
               <div style="width: 300px; display: inline-block;">
                   <div class="showmadan">
                     <a :href="item" :key="item" v-lightbox="certificateImageList" v-for="(item, index) in certificateImageList" class="madan-wrap">
                       <img  :src="item" width='50' height="50" />
                       <span @click="del(item)" class="del-arrow">X</span>
                     </a>
                   </div>
                   <el-upload
                     action="/redwood/sys/Common/uploadFile.do"
                     :multiple="true"
                     :show-upload-list="false"
                     style="display:inline-block; width: auto; margin-bottom: 8px;"
                     :before-upload="beforeUpload"
                     :on-success="handleSuccess"
                     :on-error="handleError"
                   >
                    <div class="addImg">+</div><strong>上传付款凭证图片</strong>
                   </el-upload>
               </div>
            </div>
           </div>
           <div slot="footer" class="dialog-footer" style="text-align: right;">
             <el-button @click.native="uploadVisible=false">取 消</el-button>
             <el-button type="primary" :disabled="certificateImageList.length > 0 ? false : true" @click.native="confirmPay">确 定</el-button>
           </div>
         </el-dialog>
         <lightbox />
  </div>
</template>

<script>
import allApi from 'api/allApi'
import Lightbox from 'components/lightbox/lightbox'
import lrz from 'lrz'
import {
  request,
  // sortByObject
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
      tabIndex: 0,
      uploadVisible: false,
      certificateImageList: [],
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
       lateFeesMoney = (this.shouldCollectMoney - Number(this.obj.freezeMoney)) * 0.003 * day
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
    },
    beforeUpload(file) { // 预览图片
      const that = this
      this.$store.dispatch('changeload', true)
      lrz(file, {
        quality: 1
      })
      .then(function (rst) {
        // 处理成功会执行
        rst.formData.append('field', 'imgUrl')
        request({
          url: '/redwood/sys/Common/uploadFile.do?type=1',
          method: 'post',
          data: rst.formData,
          dataType: 'FormData'
        }).then(data => {
          that.$store.dispatch('changeload', false)
          if (data.success === '1') {
            that.handleSuccess(data)
          } else {
            that.$alert(data.msg, '', {
              callback: action => {
                return true
              }
            });
          }
        })
        return rst
      })
      return false
    },
    handleSuccess (file) {
      this.$store.dispatch('changeload', false)
      console.log('file', file);
      this.certificateImageList.push(this.imgPath + file.imgUrl)
    },
    handleError (err, response, file) {
      this.$store.dispatch('changeload', false)
      console.log('error', err)
    },
    del (url) {
      this.certificateImageList = this.certificateImageList.filter((item, key) => item != url)
    },
    confirmPay () {
     const temCertificateImageList = this.certificateImageList.map((item) => {
       return item.replace(this.imgPath, '')
     })
     const req = {
       id: this.$route.query.id,
       certificateImageList: temCertificateImageList
     }
     this.$store.dispatch('changeload', true)
     request({
      url: allApi.Account_Bill.commit,
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
              self.$router.push({name: 'billView'})
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
};
</script>
<style src="assets/style/table.scss" lang="scss"></style>
<style lang="scss">
 .bill-detail {
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
         margin-right: 0;
         width: 350px;
         .fr-t {
           width: 120px;
           display: inline-block;
           text-align: right;
         }
       }
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
   .showmadan {
     float: left;
   }
   .madan-wrap {
     position: relative;
     display: inline-block;
     margin-right: 15px;
     margin-bottom: 15px;
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
