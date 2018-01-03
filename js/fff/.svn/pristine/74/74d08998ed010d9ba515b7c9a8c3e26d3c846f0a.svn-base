<template id="">
<div class="content checkAccountDetail" v-loading.fullscreen="fullscreenLoading">
  <div class="clear" style="height:50px;">
    <!-- <h1 class="title" style="font-size: 25px; padding: 15px; float: left;">{{title}}</h1> -->
    <el-button @click.native="handleReturn" style="float: right;margin-top: 10px;" type="info" v-if="detailData.payStatus != 1">返回</el-button>
  </div>
  <div class="content box">
    <h4>对账信息</h4>
    <table class="custom-table">
      <tr>
        <td>进入待收欠款时间：{{detailData.createTime}}</td>
        <td>已使用可用余额：{{detailData.availableYet | formateNumber}}元</td>
        <td>欠款备注：{{detailData.content}}元</td>
        <td>
          <label>催缴欠款凭证：</label>
          <article class="media imgShow" v-if='detailData.debtCertificateList && detailData.debtCertificateList.length'>
            <a :href="'http://test.soouya.com'+ val.imgUrl " class="image media-left"
              v-lightbox="detailData.debtCertificateList"
              v-for="val in detailData.debtCertificateList"
              >
              <img :src="'http://test.soouya.com'+ val.imgUrl +'@200h_200w_1e'" alt="Image" width="40" height="40">
            </a>
          </article>
        </td>
      </tr>
      <tr>
        <td>催缴状态：已催缴</td>
        <td>已用搜芽额度：{{detailData.creditLineYet | formateNumber}}元</td>
        <td>财务收款账户：{{detailData.financeAccount}}</td>
        <td></td>
      </tr>
      <tr>
        <td colspan="4" align="right"><span style="color: #999;">（授信额度）</span>应收欠款：{{detailData.creditLineYet | formateNumber}}元</td>
      </tr>
    </table>
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
  <out-reposity v-if="outReposityList.length" :outReposityList="outReposityList" :inReposityList="inReposityList"></out-reposity>

  <el-dialog title="图片预览" v-model="previewVisible" ref="dialogPreview">
    <img :src="previewSrc" alt="图片预览" class="preview-img" />
  </el-dialog>
  <lightbox></lightbox>
</div>
</template>

<script>
import {
  request,
  newRequest,
  formatTimeString,
  getCategoryStr,
  getPayWayStr,
  getSourceStr,
} from 'src/common/utils.js'
import AccountApi from 'api/account.js'
import Lightbox from 'components/lightbox/lightbox'
import orderDetail from 'components/detail/orderDetail'
import inReposity from 'components/detail/inReposity'
import outReposity from 'components/detail/outReposity'
export default {
  components: {
    Lightbox,
    orderDetail,
    inReposity,
    outReposity
  },
  filters: {
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
    formateStatus (val) {
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
      } else {
        return '已报账'
      }
    },
    formatePayStatus (val) {
      if (val == 1) {
        return '待对账'
      } else if (val == 2) {
        return '已对账'
      } else if (val == -1) {
        return '异常'
      } else if (val == -2) {
        return '新建/待付款'
      } else {
        return '已删除'
      }
    },
  },
  computed: {
    madan () {
      const arr = []
      if (this.orderList[0]) {
        this.orderList[0].madanImgUrls.map((item) => {
          arr.push({ url: 'http://test.soouya.com' + item })
        })
      }
      return arr
    }
  },
  data () {
    return {
      time: new Date().getTime(),
      title: '',
      id: '', // 分账ＩＤ
      payInfo: {}, // 支付信息
      orderList: [], // 订单详情列表
      replaceOrReturnList: [], // 退换货信息
      previewVisible: false, // 图片预览
      dialogSureShow: false, // 对账
      previewSrc: '', // 图片预览previewSrc
      detailData: {}, // 分账明细data
      basicData: {}, // 基本信息
      inReposityList: [], // 入仓单号
      outReposityList: [], // 出仓单号
      dialogFormVisible: false, // 异常弹出框显隐
      fullscreenLoading: true,
      sendbackIncomeForm: {}, // 异常弹出框表单模型
      statusText: '已收欠款（元）',
      moneyString: 'totalMoney'
    }
  },
  route: {
    data: function (transition) {
       console.log(transition)
    }
  },
  mounted () {
    this.payNumber = this.$route.query.payNumber;
    this.id = this.$route.params.id;
    this.getDetail();
  },
  methods: {
    /**
     * 获取分账明细
     */
    getDetail() {
      const reqUrl = AccountApi.PayDebt.getDetail
      const options = {
        id: this.id
      }
      this.title = '账单明细'
      newRequest({
        url: reqUrl,
        method: 'post',
        contentType: 'application/json',
        data: options
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          this.detailData = data.obj;
          this.basicData = data.obj.order;
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
      this.$router.go(-1)
    },
    /**
     * 打开图片预览
     */
    openDialog(src) {
      this.previewSrc = src;
      this.$refs.dialogPreview.open();
    },
    /**
    * 确认对账
    */
    PayGroupConfirmIncome () { // 实款-确认对账
      const self = this
      console.log(this.$route)
      this.$confirm('一旦确认提交，将不可修改。', '确认对账', {
        type: 'warning'
      }).then(() => {
        self.fullscreenLoading = true
        request({
          url: AccountApi.PayDebt.confirmIncome,
          data: {
            payNumber: self.payNumber,
            id: self.id,
            _time: self.time
          },
          method: 'post'
        }).then(res => {
          self.fullscreenLoading = false
          if (res.success == '1') {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            self.$router.push('/finance/reconciliation')
          } else {
            res.msg && this.$message({
              type: 'info',
              message: res.msg
            })
          }
        })
      }).catch(() => {
      })
    },
    PayGroupSendbackIncome () { // 实款-对账异常
      const self = this
      const _time = new Date().getTime()
      this.$prompt('请描述异常问题（30个字以内）', '异常', {
        inputPattern: /^\S{0,30}$/,
        inputErrorMessage: '格式不正确'
      }).then(data => {
        self.fullscreenLoading = true
        request({
          url: AccountApi.PayDebt.sendbackIncome,
          data: {
            payNumber: self.payNumber,
            id: self.id,
            exceptionMsg: data.value || '',
            _time: _time
          },
          method: 'post'
        }).then(res => {
          self.fullscreenLoading = false
          if (res.success == '1') {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            self.$router.push('/finance/checkAccount?type=-1')
          } else {
            res.msg && this.$message({
              type: 'info',
              message: res.msg
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        })
      })
    },
    getCurrentPayWayStr(row, column) { // 支付方式映射
      console.log('row:', row)
      return getPayWayStr(row.payWay)
    },
    getTypeStr(row, column) { // 对账类型映射
      return '欠款'
    },
    getStatus(row, column) { // 对账状态
      if (row.status) {
        const statusString = {
          '1': '待对账',
          '2': '已对账',
          '101': '已分账',
          '-1': '作废'
        }
        return statusString[String(row.status)]
      } else if (row.payStatus) {
        const statusString = {
          '1': '待对账',
          '2': '已对账',
          '-1': '待对账',
          '-2': '待对账',
        }
        return statusString[String(row.payStatus)]
      }
    },
    formatTime(row, column) { // 格式化时间
      return formatTimeString(row.createTime)
    },
    getCategoryStr(row, column) { // 订单类型映射
      return getCategoryStr(row.category)
    },
    getSourceStr(row, column) { // 订单来源映射
      return getSourceStr(row.source)
    },
    // getStatus(row, column) { // 分账状态
    //   const statusString = {
    //     '1': 'redwood支付',
    //     '2': 'redwood垫付',
    //     '3': 'app线上支付',
    //     '4': 'app线下支付'
    //   }
    //   return statusString[row.status]
    // },
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
    /**
     * 提交对账异常
     */
    submitDialogForm() {
      this.sendbackIncomeForm.id = this.id;
      request({
        url: AccountApi.PayGroupOrderXSendbackIncome,
        method: 'post',
        data: this.sendbackIncomeForm
      }).then(data => {
        // console.log('data', data);
        if (data.success === '1') {
          this.$router.push('/finance/pendingAccount');
        } else {
          this.$message({
            message: data.message,
            type: 'error'
          });
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .checkAccountDetail {
    .is-64x64 {
      overflow: hidden
    }
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
    .box {
      margin-left: 10px;
    }
  }
</style>
