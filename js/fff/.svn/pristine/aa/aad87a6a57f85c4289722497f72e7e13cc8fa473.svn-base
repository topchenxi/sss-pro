<template id="">
  <div class="content checkAccountDetail" v-loading.fullscreen="fullscreenLoading" style="padding-bottom: 100px;">
    <i class="el-icon-arrow-left goback-icon" @click="handleReturn">返回</i>
    <div class="content box">
      <span class="detail-title">对账信息：</span>
      <span>进入待对账时间：{{detailData.createTime | formateTime}}</span>
      <table class="custom-table">
        <tr>
          <td>对账状态：
            <span class="forgive-color">
              <template v-if="detailData.status == 1">待对账</template>
              <template v-if="detailData.status == 2">已对账</template>
            </span>
          </td>
          <td v-if="detailData.buyerPayedMoney">采购商付款金额：{{detailData.buyerPayedMoney | formateNumber}}元</td>
          <td v-if="!detailData.buyerPayedMoney">采购商付款金额：--</td>
          <td>原订单销售货款：
            <template v-if="detailData.category === 'bulk' || detailData.category == 'dh-zy'">
              {{detailData.orderSaleMoney | formateNumber}}元
            </template>
            <template v-else>--</template>
          </td>
          <td>服务费：{{detailData.serviceMoney | formateNumber}}元</td>
        </tr>
        <tr>
          <td>支用额度：{{detailData.usedMoney | formateNumber}}</td>
          <td v-if="detailData.status == 2">实收滞纳金:{{detailData.lateFeesMoney | formateNumber}}元</td>
          <td v-if="detailData.status == 1">应收滞纳金：{{detailData.expectedLateFeesMoney}}元</td>
          <td>采购商税款：{{detailData.taxMoney | formateNumber}}元</td>
          <td v-if="detailData.category === 'bulk' || detailData.category == 'dh-zy'">运费：{{detailData.freightMoney | formateNumber}}元（仓库运费：{{detailData.freightMoneyNoTax}}元）</td>
          <td v-else>运费：{{detailData.freightMoney | formateNumber}}元（仓库运费：--）</td>
        </tr>
        <tr>
          <td colspan="2">
            <p v-if="detailData.status == 1">应收款：
              <span class="red-color">{{detailData.expectedIncomeMoney | formateNumber}}</span>元
              <span style="color:#bbb;float:right">(已用额度+滞纳金)</span>
            </p>
            <p v-if="detailData.status == 2">实收款：{{detailData.incomeMoney | formateNumber}}元
              <span style="color:#bbb;float:right">(已用额度+滞纳金)</span>
            </p>
          </td>
          <td>出仓销售货款：{{detailData.saleMoney | formateNumber}}元</td>
          <td>应收出仓销售货款：{{detailData.needSaleMoney | formateNumber}}元</td>
        </tr>
        <tr>
          <td colspan="2" align="left">
            <label>付款/垫付凭据：</label>
            <article class="media imgShow" v-if='detailData.payCredentialUrls && detailData.payCredentialUrls.length'>
              <a :href="'http://test.soouya.com'+ val" class="image media-left" v-lightbox="detailData.payCredentialUrls" v-for="(val,index) in detailData.payCredentialUrls" :key="index">
                <img :src="'http://test.soouya.com'+ val +'@200h_200w_1e'" alt="Image" width="40" height="40">
              </a>
            </article>
            <article class="media imgShow" v-if='detailData.prepayCredentialUrls && detailData.prepayCredentialUrls.length'>
              <a :href="'http://test.soouya.com'+ val" class="image media-left" v-lightbox="detailData.prepayCredentialUrls" v-for="(val,index) in detailData.prepayCredentialUrls" :key="index">
                <img :src="'http://test.soouya.com'+ val +'@200h_200w_1e'" alt="Image" width="40" height="40">
              </a>
            </article>
          </td>
          <td colspan="2">结算备注：{{detailData.payRemark}}</td>
        </tr>
      </table>
    </div>
    <template v-if="detailData.category == 'bulk' || detailData.category == 'dh-zy' || detailData.category == 'buttonNumber'">
      <order-detail :basicData="basicData"></order-detail>
      <DahuoInformation class="content box" :basicData="basicData"></DahuoInformation>
      <in-reposity v-if="inReposityList.length" :inReposityList="inReposityList" :quantity="basicData.quantity"></in-reposity>
      <out-reposity v-if="outReposityList.length" :outReposityList="outReposityList" :inReposityList="inReposityList" :outNumber="outNumber" :freight="true"></out-reposity>
    </template>
    <template v-else>
      <order-detail :basicData="cutData"></order-detail>
      <CutInformation v-if="cutData.hasOwnProperty('productNumberList')" :cutData="cutData"></CutInformation>
    </template>
    <el-dialog title="图片预览" v-model="previewVisible" ref="dialogPreview">
      <img :src="previewSrc" alt="图片预览" class="preview-img" />
    </el-dialog>
    <lightbox></lightbox>
  </div>
</template>

<script>
import {
  newRequest,
  request,
  formatTimeString,
  getCategoryStr,
  getSourceStr,
  getFundTypeStr,
  setCache
} from 'src/common/utils.js'
import AccountApi from 'api/account.js'
import orderDetail from 'components/detail/orderDetail'
import inReposity from 'components/detail/inReposity'
import outReposity from 'components/detail/outReposity'
import Lightbox from 'components/lightbox/lightbox'
import DahuoInformation from 'components/detail/dahuoInformation'
import CutInformation from 'components/detail/cutInformation'
import limitInput from 'components/limitInput.vue'
export default {
  components: {
    Lightbox,
    orderDetail,
    inReposity,
    outReposity,
    DahuoInformation,
    CutInformation,
    limitInput
  },
  data() {
    const validateLength = (rule, value, callback) => {
      console.log(this.form.remark.length)
      if (this.form.remark.length > 500) {
        return callback(new Error('备注不能超过500字'));
      } else {
        callback();
      }
    }
    return {
      time: new Date().getTime(),
      title: '',
      id: '', // 分账ＩＤ
      ids: [],
      outNumber: '',
      payInfo: {}, // 支付信息
      previewVisible: false, // 图片预览
      dialogSureShow: false, // 对账
      previewSrc: '', // 图片预览previewSrc
      detailData: {}, // 分账明细data
      basicData: {}, // 基本信息
      cutData: {}, // 剪版数据
      inReposityList: [], // 入仓单号
      outReposityList: [], // 出仓单号
      dialogFormVisible: false, // 异常弹出框显隐
      fullscreenLoading: true,
      sendbackIncomeForm: {}, // 异常弹出框表单模型
      statusText: '总应收款（元）',
      moneyString: 'totalMoney',
      shikuanDialogVisible: false,
      customerAccount: {},
      checkYuerDialogVisible: false,
      daozhangriqi: '',
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() >= Date.now();
        }
      },
      qiankuanDialogVisible: false,
      checkYuerDialogJianban: false,
      shikuanDialogJianban: false,
      buyerCertificateList: [],
      receivedTime: '',
      duizhangDialog: {
        row: {
          ids: [],
          category: [],
        }
      },
      CheckVisible: false, // 单条对账的弹框
      singleCheckData: {}, // 单条对账内容信息
      singleCheckTitle: null, // 单条对账的头部提示内容
      timeFlag: null, // 记录点击对账的弹框的时候的时间戳
      checkAgainVisible: false, // 重新对账的弹框
      checkAgainTitle: null, // 重新对账的头部提示内容
      checkAgainData: {}, // 重新对账内容
      form: {
        date: '',
        remark: ''
      },
      rules: {
        remark: [
          { max: 500, validator: validateLength, trigger: 'blur' }
        ],
        date: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ]
      }
    }
  },
  route: {
    data: function(transition) {
      console.log(transition)
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.outNumber = this.$route.query.outNumber;
    this.ids.push(this.$route.query.id);
    this.getDetail();
  },
  filters: {
    formateNumber(val) {
      return (val === null || val === -1) ? '--' : Number(val).toFixed(2)
    },
    formateTime(val) {
      return val && Number(val) > 0 ? formatTimeString(val) : '--'
    },
    formateStatus(val) {
      if (val == 200) {
        return '待录入色卡信息'
      } else if (val == 201) {
        return '待提交审核'
      } else if (val == 202) {
        return '待审核'
      } else if (val == 220) {
        return '待发货'
      } else if (val == 221) {
        return '待提交支付'
      } else if (val == 222) {
        return '待销账'
      } else if (val == 223) {
        return '已完成'
      } else if (val == 230) {
        return '已取消'
      } else if (val == 210) {
        return '待报账'
      } else if (val == 211) {
        return '已报账'
      } else {
        return ''
      }
    },
  },
  computed: {
  },
  methods: {
    /**
     * 获取分账明细
     */
    getDetail() {
      var options = {
        businessId: this.$route.query.id
      }
      this.title = '对账明细'
      newRequest({
        url: '/redwood/reconciliation/getDetail',
        method: 'get',
        data: options
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          this.detailData = data.obj;
          console.log(this.detailData)
          this.basicData = data.obj.order;
          if (!this.basicData) {
            this.basicData = {}
          }
          this.cutData = data.obj.cut;
          if (!this.cutData) {
            this.cutData = {}
          }
          this.inReposityList = data.obj.inReposityList;
          this.outReposityList = data.obj.outReposityList;
          this.payInfo = {
            checkedOrder: [data.obj],
            buyerCertificateList: data.obj.certificateList,
            content: data.obj.content,
            buyerPayedMoney: data.obj.buyerPayedMoney
          }
        } else {
          this.$message({
            type: 'error',
            message: data.msg
          })
        }
      })
    },
    /**
     * 返回列表页
     */
    handleReturn() {
      window.history.go(-1)
      if (sessionStorage.getItem('reconciliation')) { // 已对账的搜索条件
        let obj = JSON.parse(sessionStorage.getItem('reconciliation'))
        obj.flag = true // 设置flag值只有点击返回按钮返回才会有搜索的回显
        sessionStorage.setItem('reconciliation', JSON.stringify(obj))
      }
    },
    /**
     * 打开图片预览
     */
    openDialog(src) {
      this.previewSrc = src;
      this.$refs.dialogPreview.open();
    },
    toAdjust(id) { // 去调整额度
      this.checkYuerDialogVisible = false
      console.log(id)
      window.open(`/finance/moneyManage/moneyManageDetail?id=${id}`)
    },
    doPayGroup() { // 确定对账按钮
      const that = this
      newRequest({
        url: AccountApi.Reconciliation.confirmIncome,
        contentType: 'application/json',
        data: {
          ids: this.ids,
          _time: that.time,
          incomeTime: (new Date(this.daozhangriqi)).getTime()
        },
        method: 'post'
      }).then(res => {
        that.fullscreenLoading = false
        that.shikuanDialogVisible = false
        if (res.success == '1') {
          that.$message({
            type: 'success',
            message: '操作成功!'
          })
          if (that.customerAccount.totalMoney < that.customerAccount.available && that.customerAccount.availableBalance < that.customerAccount.totalMoney) {
            // 产生欠款  直接切换到 欠款tab
            setCache({
              key: 'checkAccountTabType',
              value: 2
            })
          }
          that.$router.push('/finance/checkAccount')
        } else {
          res.msg && this.$message({
            type: 'info',
            message: res.msg
          })
        }
      })
    },
    getCustomerInfo(row) { // 单条大货数据对账
      const that = this
      that.fullscreenLoading = true
      request({ // 获取当前采购商的账户信息
        url: AccountApi.Account.getById + '?id=' + (row.buyerId || row.userId),
        method: 'get'
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          that.customerAccount = data.obj
          that.customerAccount.totalMoney = row.totalMoney
          that.customerAccount.keYongYueDikou = row.totalMoney < that.customerAccount.availableBalance ? row.totalMoney : that.customerAccount.availableBalance
          that.buyerCertificateList = row.certificateList
          that.content = row.content
          that.buyerPayedMoney = row.buyerPayedMoney
          if (data.obj.available < row.totalMoney) {
            that.checkYuerDialogVisible = true
          } else {
            that.shikuanDialogVisible = true
          }
        } else {
          this.$message({
            type: 'success',
            message: data.msg
          })
        }
      })
    },
    getJianbanInfo(row) { // 单条剪版数据对账
      const that = this
      that.fullscreenLoading = true
      request({ // 获取当前采购商的账户信息
        url: AccountApi.Account.getById + '?id=' + (row.buyerId || row.userId),
        method: 'get'
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          that.customerAccount = data.obj
          that.customerAccount.totalMoney = row.totalMoney
          that.customerAccount.keYongYueDikou = that.customerAccount.availableBalance
          that.buyerPayedMoney = row.buyerPayedMoney
          that.buyerCertificateList = row.certificateList
          that.content = row.content
          if (data.obj.availableBalance < row.totalMoney) {
            that.checkYuerDialogJianban = true
          } else {
            that.shikuanDialogJianban = true
          }
        } else {
          this.$message({
            type: 'success',
            message: data.msg
          })
        }
      })
    },
    getCategoryStr(row, column) { // 订单类型映射
      return getCategoryStr(row.category)
    },
    getSourceStr(row, column) { // 订单来源映射
      return getSourceStr(row.source)
    },
    getFundTypeStr(row, column) { // 款项类型映射
      console.log('row', row)
      return getFundTypeStr(row.fundType)
    },
    payType(row, column) { // 分账类型映射
      return row.payType === 0 ? '垫付' : '实付'
    },
    getInvoiceStatusStr(row, column) { // 采购发票映射
      return row.order.invoiceStatus == 0 ? '不需要' : '需要'
    },
    getPayInvoiceInneedStr(row, column) { // 采购发票映射
      return row.order.payInvoiceInneed == 0 ? '没有' : '有'
    },
    showDialogForm(id) { // 设置异常弹出框
      this.dialogFormVisible = true;
    },
  }
}
</script>

<style lang="scss" scoped>
.checkAccountDetail {
  .is-64x64 {}
  .el-table td {
    position: inherit;
  }
  p {
    margin: 10px 0;
  }
  h1 {
    font-size: 20px;
  }
  h4 {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 18px;
  }
  .fixed-footer {
    position: fixed;
    left: 201px;
    right: 0;
    bottom: 0;
    background: #fff;
    height: 50px;
    padding-top: 10px;
    padding-left: 15px;
  }
  .custom-table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid #ccc;
    border-bottom: 0;
    border-right: 0;
    border-collapse: separate;
    table-layout: fixed;
    text-align: left;
    margin-bottom: 20px;
    th {
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
    td {
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
      label {
        display: inline-block;
        vertical-align: top;
        line-height: 40px;
      }
      p {
        display: inline-block;
        padding-right: 10px;
      }
      .imgShow {
        display: inline-block;
        a {
          margin-right: 5px;
        }
      }
      .left-img {
        float: left;
      }
      .right-info {
        float: right;
        line-height: 40px;
      }
    }
  }
}
</style>
