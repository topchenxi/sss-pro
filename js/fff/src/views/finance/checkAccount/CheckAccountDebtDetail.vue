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
        <td>催缴状态：待催缴</td>
        <td>已用搜芽额度：{{detailData.creditLineYet | formateNumber}}元</td>
        <td>财务收款账户：{{detailData.financeAccount}}</td>
        <td></td>
      </tr>
      <tr>
        <td colspan="4" align="right">应收欠款：{{detailData.creditLineYet | formateNumber}}元</td>
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

  <div class="fixed-footer" v-if="detailData.payStatus == 1">
    <el-button
      type="primary"
      @click.native="PayGroupConfirmIncome(detailData.userId, detailData.totalMoney)"
      :disabled='payInfo.checkedOrder && payInfo.checkedOrder[0].payStatus != -2 && payInfo.checkedOrder[0].payStatus != -1 ?  false : true' style="margin-right:30px">
      确认催缴
    </el-button>
    <template v-if="basicData.type == 3">
      <el-button type="danger"
      @click.native="PayGroupSendbackIncome()"
      :disabled='payInfo.checkedOrder && payInfo.checkedOrder[0].payStatus != -2 && payInfo.checkedOrder[0].payStatus != -1 ? false : true'
      style="margin-right:30px">打回采购</el-button>
    </template>
    <template v-else>
      <el-button type="danger"
      @click.native="PayGroupSendbackIncome()"
      :disabled='payInfo.checkedOrder && payInfo.checkedOrder[0].payStatus != -2 && payInfo.checkedOrder[0].payStatus != -1 ? false : true'
      style="margin-right:30px">打回跟单</el-button>
    </template>
    <el-button @click.native="handleReturn">返回</el-button>
  </div>

  <el-dialog title="图片预览" v-model="previewVisible" ref="dialogPreview">
    <img :src="previewSrc" alt="图片预览" class="preview-img" />
  </el-dialog>
  <lightbox></lightbox>

  <el-dialog title="提示" v-model="qiankuanDialogVisible" size="tiny">
    <span style='padding: 10px 0; font-size: 16px'>一旦确认提交，将不可修改。</span>
    <div style='margin-top: 20px; font-size: 16px; color: red'>应收欠款：{{Number(customerAccount.totalMoney).toFixed(2)}} 元</div>
    <div style='margin-top: 20px; font-size: 16px'>可用余额抵扣：{{Number(customerAccount.keYongYueDikou).toFixed(2)}} 元</div>
    <div class="line"></div>
    <div style='margin-top: 20px; font-size: 16px; color: red'>实际应收：{{Number(customerAccount.totalMoney - customerAccount.keYongYueDikou).toFixed(2)}} 元</div>
    <div style='margin-top: 20px; font-size: 16px'>
      <span class='red'>*</span>到账时间：<el-date-picker
        class='c-date-start'
        :editable="false"
        v-model="receivedTime"
        type="datetime"
        placeholder="选择开始时间">
      </el-date-picker>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="qiankuanDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="doPayDebt" :disabled='!receivedTime'>确定</el-button>
    </span>
  </el-dialog>
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
  getFundTypeStr,
  setCache
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
      } else if (val == 211) {
        return '已报账'
      } else {
        return ''
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
      } else if (val == -3) {
        return '已删除'
      } else {
        return ''
      }
    },
  },
  computed: {
  },
  data () {
    return {
      time: new Date().getTime(),
      title: '',
      id: '', //
      payInfo: {}, // 支付信息
      orderList: [], // 订单详情列表
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
      statusText: '应收欠款（元）',
      moneyString: 'totalMoney',
      customerAccount: {},
      qiankuanDialogVisible: false,
      receivedTime: '',
    }
  },
  route: {
    data: function (transition) {
       console.log(transition)
    }
  },
  mounted () {
    this.payNumber = this.$route.query.payNumber;
    this.id = this.$route.query.id;
    this.getDetail();
  },
  methods: {
    /**
     * 获取对账明细
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
    // 获取采购商账户信息
    getCustomerInfo(buyerId, totalMoney) {
      const that = this
      that.fullscreenLoading = true
      request({ // 获取当前采购商的账户信息
        url: AccountApi.Account.getById + '?id=' + buyerId,
        method: 'get'
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          that.customerAccount = data.obj
          that.customerAccount.totalMoney = totalMoney
          that.customerAccount.keYongYueDikou = totalMoney < that.customerAccount.availableBalance ? totalMoney : that.customerAccount.availableBalance
          if (data.obj.available < totalMoney && that.currentTab == 1) {
            that.checkYuerDialogVisible = true
          } else {
            that.qiankuanDialogVisible = true
          }
        } else {
          this.$message({
            type: 'success',
            message: data.msg
          })
        }
      })
    },
    /**
    * 确认对账
    */
    PayGroupConfirmIncome (buyerId, totalMoney) { // 欠款-确认对账
      const that = this
      that.time = new Date().getTime();
      that.getCustomerInfo(buyerId, totalMoney)
    },
    doPayDebt() {
      const that = this
      that.fullscreenLoading = true
      const param = JSON.stringify({
        id: this.id,
        available: that.customerAccount.keYongYueDikou,
        realTotalMoney: that.customerAccount.totalMoney - that.customerAccount.keYongYueDikou,
        receivedTime: new Date(that.receivedTime).getTime(),
        _time: that.time
      })
      request({
        url: AccountApi.PayDebt.confirmIncome,
        data: {
          param,
        },
        method: 'post'
      }).then(res => {
        that.fullscreenLoading = false
        that.qiankuanDialogVisible = false
        if (res.success == '1') {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          setCache({
            key: 'reconciliationTabkey',
            value: 2
          })
          that.$router.push('/finance/reconciliation')
        } else {
          res.msg && this.$message({
            type: 'info',
            message: res.msg
          })
        }
      })
    },
    PayGroupSendbackIncome () { // 欠款-对账异常
      const that = this
      const _time = new Date().getTime()
      this.$prompt('请描述异常问题（30个字以内）', '异常', {
        inputPattern: /^\S{0,30}$/,
        inputErrorMessage: '格式不正确'
      }).then(data => {
        that.fullscreenLoading = true
        newRequest({
          url: AccountApi.PayDebt.sendbackIncome,
          data: {
            id: that.id,
            exceptionMsg: data.value || '',
            _time: _time
          },
          contentType: 'application/json',
          method: 'post'
        }).then(res => {
          that.fullscreenLoading = false
          if (res.success == '1') {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            setCache({
              key: 'checkAccountTabType',
              value: 2
            })
            that.$router.push('/finance/checkAccount')
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
    getFundTypeStr(row, column) { // 款项类型映射
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
    }
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
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
      display: block;
      padding: 20px;
    }
  }
</style>
