<template>
<div class='dsf-detail' v-loading.body="fullscreenLoading">
  <!-- <h1 class="title" style="font-size: 25px; padding: 15px">详情页</h1> -->
  <div class="content box">
    <h4>销账信息</h4>
    <template v-if="currentTab == 1">
      <table class="custom-table">
        <tr>
          <td>进入待收款时间：{{detailData.createTime | formateTime}}</td>
          <td>供应商退款：{{detailData.refundMoney | formateNumber}}元</td>
          <td>到账金额：{{detailData.incomeMoney | formateNumber}}元</td>
          <td>
            <label>供应商退款凭据：</label>
            <article class="media imgShow" v-if='detailData.sellerCertificateList && detailData.sellerCertificateList.length'>
              <a :href="'http://test.soouya.com'+ val" class="image media-left"
                v-lightbox="detailData.sellerCertificateList"
                v-for="val in detailData.sellerCertificateList"
                >
                <img :src="'http://test.soouya.com'+ val +'@200h_200w_1e'" alt="Image" width="40" height="40">
              </a>
            </article>
          </td>
        </tr>
        <tr>
          <td>申请退换货时间：{{detailData.returnReplaceCreateTime | formateTime}}</td>
          <td>销账人员：{{detailData.creatorName}}/{{detailData.creatorTel}}</td>
          <td>销账类型：{{detailData.type | formateType}}</td>
          <td>财务收款账户：{{detailData.financeAccount}}</td>
        </tr>
        <tr>
          <td colspan="4" align="right">收款金额：{{detailData.incomeMoney | formateNumber}}元</td>
        </tr>
      </table>
    </template>
    <template v-else-if="currentTab == 2">
      <table class="custom-table">
        <tr>
          <td>进入待收款时间：{{detailData.createTime | formateTime}}</td>
          <td>供应商退款：{{detailData.moneySoouyaToSeller | formateNumber}}元</td>
          <td>到账金额：{{detailData.xiaozhangMoney | formateNumber}}元</td>
          <td>
            <label>供应商退款凭据：</label>
            <article class="media imgShow" v-if='detailData.certificateList  && detailData.certificateList .length'>
              <a :href="'http://test.soouya.com'+ val" class="image media-left"
                v-lightbox="detailData.certificateList "
                v-for="val in detailData.certificateList "
                >
                <img :src="'http://test.soouya.com'+ val +'@200h_200w_1e'" alt="Image" width="40" height="40">
              </a>
            </article>
          </td>
        </tr>
        <tr>
          <td>申请退换货时间：{{detailData.returnReplaceCreateTime | formateTime}}</td>
          <td>销账人员：{{detailData.creatorName}}/{{detailData.creatorTel}}</td>
          <td>销账类型：{{detailData.type | formateType}}</td>
          <td>财务收款账户：{{detailData.financeAccount}}</td>
        </tr>
        <tr>
          <td colspan="4" align="right">销账金额：{{detailData.xiaozhangMoney | formateNumber}}元</td>
        </tr>
      </table>
    </template>
    <template v-else="currentTab == 3">
      <table class="custom-table">
        <tr>
          <td>进入待退款时间：{{detailData.createTime | formateTime}}</td>
          <td>申请退换货时间：{{detailData.returnReplaceCreateTime | formateTime}}</td>
          <td>销账人员：{{detailData.creatorName}}/{{detailData.creatorTel}}</td>
          <td>销账类型：{{detailData.type | formateType}}</td>
        </tr>
        <tr>
          <td>退货销售货款：{{detailData.saleMoney | formateNumber}}元</td>
          <td>搜芽退款采购商：{{detailData.refundMoney | formateNumber}}元</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td colspan="4" align="right"><span style="color: #999;">（退回采购商虚拟账户）</span>退款金额：{{detailData.refundMoney | formateNumber}}元</td>
        </tr>
      </table>
    </template>
  </div>
  <order-detail :basicData="basicData"></order-detail>
  <div class="content box">
    <h4>商品信息</h4>
    <table class="custom-table">
      <tr>
        <th>色号</th>
        <th>采购数量</th>
        <th>成本单价</th>
        <th>销售单价</th>
        <th>成本小计</th>
        <th>销售小计</th>
      </tr>
      <tr v-for="item in basicData.colorList">
        <td>{{item.color}}</td>
        <td>{{item.quantity}}{{item.quantityUnit}}</td>
        <td>{{item.price}}{{item.priceUnit}}</td>
        <td>{{item.salePrice}}{{item.salePriceUnit}}</td>
        <td>{{Number(item.quantity * item.price).toFixed(2)}}元</td>
        <td>{{Number(item.quantity * item.salePrice).toFixed(2)}}元</td>
      </tr>
      <tr>
        <td colspan="6" align="right">
          货号：{{basicData.productNumber}}&nbsp;&nbsp;采购总数：{{basicData.quantity}}{{basicData.quantityUnit}} &nbsp;&nbsp;销售货款：{{basicData.saleMoney}}元 &nbsp;&nbsp;毛利率：{{basicData.maoliPoint | formateNumber}}%&nbsp;&nbsp;|&nbsp;&nbsp;
          <template v-if="basicData.type = 1">服务费单价：{{basicData.servicePrice | formateNumber}}{{basicData.servicePriceUnit}} &nbsp;&nbsp;服务费：{{basicData.serviceMoney | formateNumber}}</template>
          &nbsp;&nbsp;采购商税款：{{basicData.taxMoney | formateNumber}}元 &nbsp;&nbsp;供应商税款：{{basicData.sellerTaxMoney | formateNumber}}元
        </td>
      </tr>
    </table>
  </div>
  <in-reposity v-if="inReposityList.length" :inReposityList="inReposityList" :quantity="basicData.quantity"></in-reposity>
  <template v-if="detailData.type == 3 || detailData.type == 4">
    <out-reposity :outReposityList="outReposityList" :outData="true"></out-reposity>
  </template>
  <div class="content box">
    <h4>退换货信息</h4>
    <table class="custom-table">
      <tr>
        <th>退换货单号</th>
        <th>退换类型</th>
        <th>货号</th>
        <th>色号</th>
        <th>退货数量</th>
        <th width="150px">退货匹号</th>
        <th>退货成本货款</th>
        <th>供应商退款</th>
        <th>跟单员退货备注</th>
        <th>买货员退货备注</th>
      </tr>
      <tr v-for="(item,index) in returnReplace.colorList">
        <td v-if="index === 0" :rowspan="returnReplace.colorList.length">{{returnReplace.number}}</td>
        <td>{{returnReplace.type | formateType}}</td>
        <td>{{item.productNumber}}</td>
        <td>{{item.color}}</td>
        <td>{{item.quantity}}{{item.quantityUnit}}</td>
        <td>
          <template  v-for="key in item.clothLoneList">
            <p>{{key.number}}/{{key.quantity}}{{key.quantityUnit}}</p>
          </template>
        </td>
        <td>{{item | countReturnReplacePrice(basicData.sellerInvoiceStatus)}}元</td>
        <td v-if="index === 0" :rowspan="returnReplace.colorList.length">{{returnReplace.seller2SoouyaMoney | formateNumber}}元</td>
        <td v-if="index === 0" :rowspan="returnReplace.colorList.length">{{returnReplace.followerRemark}}</td>
        <td v-if="index === 0" :rowspan="returnReplace.colorList.length">{{returnReplace.purchaserRemark}}</td>
      </tr>
      <tr>
        <td colspan="10" align="right">
          退货数量：{{returnQuantity}}&nbsp;&nbsp;&nbsp;&nbsp;退货成本货款：{{returnReplace.colorList | sumCountReturnReplacePrice(basicData.sellerInvoiceStatus)}}元 &nbsp;&nbsp;&nbsp;&nbsp;供应商退款：{{returnReplace.seller2SoouyaMoney | formateNumber}}元
        </td>
      </tr>
    </table>
  </div>

  <section class='fixed-footer'>
    <template v-if='currentTab == 2'>
      <el-button  type="primary" @click.prevent="xiaoZhangShow(detailData)">销账</el-button>
    </template>
    <template v-else-if='currentTab == 3'>
      <el-button type="primary" @click.prevent="refundHandle(detailData)">同意退款</el-button>
    </template>
    <template v-else>
      <el-button type="primary" @click.prevent="handleGet(detailData)">确认收款</el-button>
      <el-button type="danger" @click.prevent="showDialogForm(detailData.id)">异常</el-button>
    </template>
    <el-button  @click.prevent="back">返回</el-button>
  </section>

  <lightbox></lightbox>
  <el-dialog title="提示" v-model="handleGetDialog.show" size="tiny">
    <span style='padding: 10px 0; font-size: 16px'> 确认已收回供应商退款 ?</span>
    <div style='font-size: 16px; text-align: left; padding-left: 20px'>
      <div style='margin-top: 20px;'>
        供应商退款凭据:
        <article class="media" v-if='sellerCertificateList && sellerCertificateList.length'>
          <a :href="'http://test.soouya.com'+ imgUrl" class="image media-left is-64x64"
            v-lightbox="sellerCertificateList"
            v-for="imgUrl in sellerCertificateList"
          >
            <img :src="'http://test.soouya.com'+ imgUrl+'@200h_200w_1e'" alt="Image" width="60" height="60">
          </a>
        </article>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleGetDialog.show = false">取 消</el-button>
      <el-button type="primary" @click="handleGetSave">确定</el-button>
    </span>
  </el-dialog>
  <el-dialog title="异常" v-model="dialogFormVisible" >
    <el-form :model="sendbackIncomeForm" :rules="errorRules" ref="sendbackIncomeForm" :close-on-click-modal="true">
      <el-form-item label="收款异常" prop="exceptionMsg">
        <el-input type="textarea" v-model="sendbackIncomeForm.exceptionMsg" placeholder="请描述异常问题（限120字）" ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click.native="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click.native="submitDialogForm">确 定</el-button>
    </span>
  </el-dialog>
  <!-- 收款销账弹窗提示 -->
  <el-dialog title="提示" v-model="xiaozhangDialog.show" :close-on-click-modal="true">
    <span style='padding: 20px 0; font-size: 20px'> 确认与销账人员进行销账 ?</span>
    <div style='text-align: left; padding-left: 20px; padding-top: 20px;'>
      <span>销账金额:  <span style='margin-left: 15px'>{{xiaozhangDialog.row.xiaozhangMoney > 0 ? '+' : ''}}{{Number(xiaozhangDialog.row.xiaozhangMoney || 0).toFixed(2)}}</span></span> <br/><br/><br/>
      <template v-if='xiaozhangDialog.row.xiaozhangMoney >= 0'>
        <span style='color: red'>*</span>实际退款金额: <span class='real-money' style='margin-left: 15px'><el-input type="text" v-model='xiaozhangDialog.form.shishouTkMoney' placeholder="请输入正值"></el-input></span>
      </template>
      <template v-else>
        <el-radio class="radio" v-model="xiaozhangDialog.form.fukuanType" label="1">现金销账</el-radio>
        <el-radio class="radio" v-model="xiaozhangDialog.form.fukuanType" label="2">线上转账</el-radio>
      </template>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click.native="xiaozhangDialog.show = false">取 消</el-button>
      <el-button type="primary" @click.native="xiaoZhangSave" :disabled='!(xiaozhangDialog.form.shishouTkMoney > 0 || xiaozhangDialog.row.xiaozhangMoney < 0)'>确 定</el-button>
    </span>
  </el-dialog>
  <!-- 同意退款弹窗提示 -->
  <el-dialog title="提示" v-model="refundHandleDialog.show" :close-on-click-modal="true">
    <span style='padding: 10px 0; font-size: 16px'> 同意退款给采购商 ?</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click.native="refundHandleDialog.show= false">取 消</el-button>
      <el-button type="primary" @click.native="refundHandleSave">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<style lang="scss">
  .dsf-detail {
    .div-setction{
      padding-bottom: 20px;
    }
    .el-tabs__content {
      position: static
    }
    .el-table td .cell {
      padding: 5px;
    }
    .line{
      height: 1px;
      border-bottom: 1px solid dashed;
    }
    .red{
      color: red;
    }
    .real-money{
      display: inline-block;
      width: 200px
    }
    .fixed-footer{
      position: fixed;
      left: 201px;
      right: 0;
      bottom: 0;
      background: #fff;
      height: 50px;
      padding-top: 10px;
      padding-left: 15px;
    }
    .custom-table{
      width: 100%;
      border-spacing: 0;
      border: 1px solid #ccc;
      border-bottom: 0;
      border-right: 0;
      border-collapse: separate;
      table-layout: fixed;
      text-align: left;
      margin-bottom: 20px;
      th{
        white-space: nowrap;
        overflow: hidden;
        background-color: #fff;
        height: 20px;
        line-height: 40px;
        text-overflow: ellipsis;
        vertical-align: middle;
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc;
        box-sizing: border-box;
        color: #1f2d3d;
        padding: 0 10px;
      }
      tr {
        height: 35px;
      }
      td{
        padding: 5px 10px;
        font-size: 14px;
        position: relative;
        box-sizing: border-box;
        border-right: 1px solid #ccc;
        min-width: 0;
        min-width: 100px;
        text-overflow: ellipsis;
        vertical-align: middle;
        border-bottom: 1px solid #ccc;
        background-color: #fff;
        label{
          display: inline-block;
          vertical-align: top;
          line-height: 40px;
        }
        p{
          display: inline-block;
          padding-right: 10px;
        }
        .imgShow{
          display: inline-block;
          a{
            margin-right: 5px;
          }
        }
        .left-img{
          float: left;
        }
        .right-info{
          float: right;
          line-height: 40px;
        }
      }
    }
}
</style>
<script>
import Lightbox from 'components/lightbox/lightbox'
import {
  request,
  newRequest,
  formatTimeString,
  getCache,
  setCache,
} from 'src/common/utils.js'
// import _ from 'lodash'
import AccountApi from 'api/account.js'
import orderDetail from 'components/detail/orderDetail'
import inReposity from 'components/detail/inReposity'
import outReposity from 'components/detail/outReposity'
import { Message } from 'element-ui'
export default {
  components: {
    Lightbox,
    orderDetail,
    inReposity,
    outReposity
  },
  data() {
    const validaeExceptionMsg = (rule, value, callback) => {
      if (value && value.length > 120) {
        callback(new Error('异常描述不能超过120字!'));
      } else {
        callback();
      }
    }
    return {
      time: new Date().getTime(),
      currentTab: 1,
      fullscreenLoading: true,
      replaceOrReturnTypeList: ['售前退货', '售前换货', '售后退货', '售后换货', '运费', '剪版'],
      handleGetDialog: {
        show: false,
        row: {}
      },
      detailData: {}, // 分账明细data
      basicData: {}, // 基本信息
      inReposityList: [], // 入仓单号
      outReposityList: [], // 出仓单号
      returnReplace: {}, // 退换货信息
      sellerCertificateList: [], // 供应商退款凭据
      dialogFormVisible: false, // 异常
      sendbackIncomeForm: {}, // 异常弹出框表单内容
      errorRules: {
        exceptionMsg: [
          { validator: validaeExceptionMsg, trigger: 'change' }
        ]
      },
      multipleSelection: [],
      xiaozhangDialog: {
        show: false,
        row: {},
        form: {
          shishouTkMoney: '',
          fukuanType: '1'
        }
      }, // 销账弹窗
      refundHandleDialog: {
        show: false,
        row: {}
      }, // 确认退款弹窗
    }
  },
  mounted () {
    this.currentTab = getCache({
      key: 'unGetAndPayTabType',
    }) || 1
    this.getDetail()
  },
  filters: {
    countReturnReplacePrice(color, sellerInvoiceStatus) {
      const clothLoneList = color.clothLoneList || []
      const price = sellerInvoiceStatus === 1 ? color.priceWithTax : color.price
      const count = clothLoneList.reduce((acc, val) => {
        return acc + val.quantity
      }, 0) * price
      return parseFloat(count).toFixed(2)
    },
    sumCountReturnReplacePrice(colorList, sellerInvoiceStatus) {
      const sumCount = (colorList || []).reduce((colorAcc, color) => {
        const clothLoneList = color.clothLoneList
        const price = sellerInvoiceStatus === 1 ? color.priceWithTax : color.price
        let colorCount = clothLoneList.reduce((acc, val) => {
          return acc + val.quantity
        }, 0) * price
        return colorCount + colorAcc
      }, 0)
      return parseFloat(sumCount).toFixed(2)
    },
    formateNumber (val) {
      let result = '--'
      if (val !== null && val >= 0) {
        result = Number(val).toFixed(2)
      }
      return result
    },
    formateTime (val) {
      return val ? formatTimeString(val) : '--'
    },
    formateType (val) {
      if (val == 1) {
        return '售前退货'
      } else if (val == 2) {
        return '售前换货'
      } else if (val == 3) {
        return '售后退货'
      } else if (val == 4) {
        return '售后换货'
      } else {
        return ''
      }
    },
  },
  computed: {
    returnQuantity () {
      let count = 0
      let countUnit = ''
      if (this.returnReplace.colorList) {
        this.returnReplace.colorList.forEach((item) => {
          count += Number(item.quantity)
          countUnit = item.quantityUnit
        })
      }
      return Number(count).toFixed(2) + countUnit
    },
  },
  watch: {

  },
  methods: {
    getDetail() {
      const that = this
      const url = [AccountApi.OnlineReceiveSeller.getDetail, AccountApi.ChargeOffRecords.waitHandleDetail, AccountApi.BuyerRefund.getDetail]
      newRequest({
        url: url[this.currentTab - 1],
        method: 'post',
        contentType: 'application/json',
        data: {id: that.$route.query.id}
      }).then(data => {
        that.fullscreenLoading = false
        if (data.success === '1') {
          this.detailData = data.obj;
          this.basicData = data.obj.order;
          this.inReposityList = data.obj.inReposityList;
          this.outReposityList = data.obj.outReposityList;
          this.returnReplace = data.obj.returnReplace
        } else {
          Message({
            message: data.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    handleGet() {
      // 确认收款 弹窗
      this.handleGetDialog.show = true
      this.handleGetDialog.row = this.detailData
      this.sellerCertificateList = this.detailData.sellerCertificateList
    },
    handleGetSave() {
      // 确认收款
      const that = this
       request({
        url: AccountApi.OnlineReceiveSeller.confirmIncome,
        method: 'post',
        data: {
          param: JSON.stringify({
            id: that.handleGetDialog.row.id,
            _time: new Date().getTime,
          })
        }
      }).then(data => {
        that.fullscreenLoading = false
        if (data.success === '1') {
          that.listData = data.page;
          that.listData.total = data.total;
        } else {
          Message({
            message: '请求数据失败,请手动刷新！',
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    showDialogForm(id) { // 设置异常弹出框
      this.dialogFormVisible = true;
      this.sendbackIncomeForm.id = id;
      this.sendbackIncomeForm._time = new Date().getTime();
    },
    /**
     * 提交对账异常
     */
    submitDialogForm() {
      this.$refs.sendbackIncomeForm.validate((valid) => {
        if (valid) {
          this.fullscreenLoading = true;
          request({
            url: AccountApi.PayGroupOrderX.sendbackIncome,
            method: 'post',
            data: {
              param: JSON.stringify(this.sendbackIncomeForm)
            }
          }).then(data => {
            this.fullscreenLoading = false;
            this.dialogFormVisible = false;
            if (data.success === '1') {
              this.pendingAccountListData.result = this.pendingAccountListData.result.filter((obj, i) => {
                return obj.id !== this.sendbackIncomeForm.id
              });
              this.$message({
                type: 'success',
                message: '提交分账异常成功'
              })
            } else {
              this.$message({
                type: 'success',
                message: '提交分账异常失败'
              })
            }
          })
        } else {
          return false;
        }
      });
    },
    xiaoZhangShow(row) {
      this.xiaozhangDialog.show = true
      this.xiaozhangDialog.row = row
      this.xiaozhangDialog._time = new Date().getTime()
    },
    xiaoZhangSave() {
      const that = this
      const xiaozhangDialog = that.xiaozhangDialog
      const params = {
        xiaozhangMoney: xiaozhangDialog.row.xiaozhangMoney,
        shifuXzMoney: xiaozhangDialog.row.shifuXzMoney,
        _time: xiaozhangDialog._time
      }
      if (xiaozhangDialog.row.id) {
        params.id = xiaozhangDialog.row.id
      } else {
        params.ids = xiaozhangDialog.row.ids
      }
      if (xiaozhangDialog.row.xiaozhangMoney >= 0) {
        params.shishouTkMoney = xiaozhangDialog.form.shishouTkMoney
      } else {
        params.fukuanType = xiaozhangDialog.form.fukuanType
      }
      that.fullscreenLoading = true
      request({
        url: params.id ? AccountApi.ChargeOffRecords.xiaozhang : AccountApi.ChargeOffRecords.batchXiaozhang,
        method: 'post',
        data: {
          param: JSON.stringify(params)
        }
      }).then(data => {
        that.fullscreenLoading = false;
        if (data.success === '1') {
          that.$message({
            type: 'success',
            message: data.msg
          })
          setCache({
            key: 'hasGetAndPayTabType',
            value: 2
          })
          setTimeout(() => {
            this.$router.push(`/exchange/hasGetAndPay`)
          }, 500);
        } else {
          that.$message({
            type: 'success',
            message: data.msg
          })
        }
      })
    },
    refundHandle(row) {
      this.refundHandleDialog.row.idList = [row.id]
      this.refundHandleDialog.show = true
      this.refundHandleDialog._time = new Date().getTime()
    },
    refundHandleSave() {
      let that = this
      that.fullscreenLoading = true;
       request({
        url: AccountApi.BuyerRefund.confirmIncome,
        method: 'post',
        data: {
          param: JSON.stringify({
            idList: that.refundHandleDialog.row.idList,
            _time: that.refundHandleDialog._time
          })
        }
      }).then(data => {
        that.fullscreenLoading = false;
        if (data.success === '1') {
          setCache({
            key: 'hasGetAndPayTabType',
            value: 3
          })
          this.$router.push(`/exchange/hasGetAndPay`)
        } else {
          that.$message({
            type: 'success',
            message: data.msg
          })
        }
      })
    },
    back() {
      history.go(-1)
    },
    formatTime(time) { // 格式化时间
      return formatTimeString(time)
    },
  }
}
</script>
