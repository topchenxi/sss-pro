<template id="">
<div class="content checkAccountDetail" v-loading.fullscreen="fullscreenLoading">
  <h1 class="title" style="font-size: 25px; padding: 15px">{{title}}</h1>
  <div class="content">
    <h4>支付信息</h4>
    <div class='box'>
      <p>待对账订单</p>
      <el-table :data="payInfo.checkedOrder" border>
        <el-table-column property="createTime" label="进入待收欠款日期" :formatter="formatTime" width='170'></el-table-column>
        <el-table-column property="user" label="欠款用户" width='100'></el-table-column>
        <el-table-column inline-template label="欠款用户类型" width='120'>
          <span>{{row.userType == 1 ? '采购商' : '供应商'}}</span>
        </el-table-column>
        <el-table-column property='userNumber' label="用户ID" width="150" show-tooltip-when-overflow>
        </el-table-column>
        <el-table-column inline-template label="已使用可用余额/元"  width='180'>
          <span>{{Number(row.availableYet).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template label="已使用可用授信额度/元"  width='190'>
          <span>{{Number(row.creditLineYet).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template label="应收欠款/元"  width='180'>
          <span>{{Number(row.totalMoney).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column property="financeAccount" label="财务收款账户"  width='190'></el-table-column>
        <el-table-column property="type" label="对账类型" :formatter="getTypeStr"  width='100'></el-table-column>
        <el-table-column property="status" label="对账状态" :formatter="getStatus"  width='100'></el-table-column>
      </el-table>
      <br/>
      <p>采购商付款凭证</p>
      <article class="media" v-if='detailData.order'>
        <div class="media-left" v-for="item in payInfo.buyerCertificateList">
          <a :href="val.url" class="image is-64x64" v-lightbox="[{url: 'http://www.soouya.com'+item.imgUrl}]" v-for="val in [{url: 'http://www.soouya.com'+item.imgUrl}]">
            <img :src="val.url+'@200h_200w_1e'" alt="Image">
          </a>
        </div>
        <!-- <div class="media-content">
          <div class="content">
            <p>备注：{{item.remark}}</p>
          </div>
        </div> -->
      </article>
      <p style='margin-top: 30px; margin-left: 10px;float: left'>结算备注：{{detailData.content}}</p>
      <p style='clear: both; padding: 10px 0'>欠款催缴凭证</p>
      <article class="media" v-for="item in payInfo.debtCertificateList">
        <div class="media-left">
          <a :href="val.url" class="image is-64x64" v-lightbox="[{url: 'http://www.soouya.com'+item.imgUrl}]" v-for="val in [{url: 'http://www.soouya.com'+item.imgUrl}]">
            <img :src="val.url+'@200h_200w_1e'" alt="Image">
          </a>
        </div>
        <div class="media-content">
          <div class="content">
            <p>备注：{{item.remark}}</p>
          </div>
        </div>
      </article>
    </div>
  </div>

  <div class="content" v-for="(order, index) in orderList">
    <h4>
      订单详情-{{index+1}}
      <a class="print-btn" :href="'/common/printDetail/'+(order && order.orderNumber)" target="_blank"><el-button type="primary" size="small">打印</el-button></a>
    </h4>
    <div class="box">
      <p> 订单信息：{{order.statusShortDescr}}</p>
      <el-table :data="order.orderInfo" border>
        <el-table-column property="serviceNumber" label="订单编号" width="200"></el-table-column>
        <el-table-column property="outReposityNumber" label="出仓单" width="200"></el-table-column>
        <el-table-column property="createTime" label="发布时间" width="170" :formatter="formatTime"></el-table-column>
        <el-table-column property="category" label="订单类型" width="170" :formatter="getCategoryStr"></el-table-column>
        <el-table-column inline-template label="大货类型" width="170">
          <div>{{row.type == 1 ? '服务单' : '贸易单'}}</div>
        </el-table-column>
        </el-table-column>
        <el-table-column property="source" label="订单来源" width="170" :formatter="getSourceStr"></el-table-column>
        <el-table-column inline-template label="跟单员" width="200" show-tooltip-when-overflow v-if='order.showFollower'>
          <div>{{row.follower}}/{{row.followerTel}}</div>
        </el-table-column>
        <el-table-column inline-template label="销售员" width="200" show-tooltip-when-overflow v-if='order.showSales'>
          <div>{{row.salesName}}/{{row.salesTel}}</div>
        </el-table-column>
        <template v-if="order.orderInfo[0].category != 'dhls-all' && order.orderInfo[0].category != 'jb-all'">
          <el-table-column inline-template label="采购商发票" width="170" >
            <div>{{ row.invoiceStatus == '0' ? '不需要' : '需要' }}</div>
          </el-table-column>
          <el-table-column inline-template label="采购商税点" show-tooltip-when-overflow  width="120">
            <span>{{ row.invoiceStatus == '0' ? '--' : Number(row.taxPoint).toFixed(2) }} </span>
          </el-table-column>
          <el-table-column inline-template label="供应商发票" width="170" >
            <div>{{ row.payInvoiceInneed == '0' ? '没有' : '有' }}</div>
          </el-table-column>
          <el-table-column inline-template label="供应商税点" show-tooltip-when-overflow  width="120">
            <span>{{ row.payInvoiceInneed == '0' ? '--' : Number(row.sellerTaxPoint).toFixed(2) }} </span>
          </el-table-column>
        </template>
        <el-table-column property="sellerLeaveMessage" label="供应商留言" show-tooltip-when-overflow  width="180"></el-table-column>
        <el-table-column property="leaveMessage" label="采购商留言" show-tooltip-when-overflow  width="180"></el-table-column>
        <el-table-column property="billingCycle" label="采购商结算周期" width="150" show-tooltip-when-overflow>
        </el-table-column>
      </el-table>
      <br/>
      <p>码单</p>
      <div class="box">
        <article class="media" v-if="order.madanImgUrls.length">
          <a :href="val.url" class="image media-left is-64x64"
            v-lightbox="madan"
            v-for="val in madan"
            >
            <img :src="val.url+'@200h_200w_1e'" alt="Image" width="60" height="60">
          </a>
        </article>
      </div>
      <br/>
      <p>供应商基本信息</p>
      <el-table :data="[order]" border style='max-width:1280px'>
        <el-table-column property="sellerNumber" label="供应商ID" min-width="150"></el-table-column>
        <el-table-column property="sellerCompany" label="供应商店铺名称" min-width="170"></el-table-column>
        <el-table-column property="shopName" label="供应商档口名称" min-width="150" ></el-table-column>
        <el-table-column inline-template label="档口地区" min-width="150" show-tooltip-when-overflow>
          <div>{{row.shopProvince}}{{row.shopCity}}{{row.shopArea}}</div>
        </el-table-column>
        <el-table-column property="shopAddr" label="详细地址" width="300" show-tooltip-when-overflow></el-table-column>
        <el-table-column property="shopTel" label="档口电话" width="170" ></el-table-column>
      </el-table>
      <br/>
      <div v-if="detailData.userType == 1">
        <p>供应商收款方式</p>
        <el-table :data="order.sellerAccounts" border style='max-width:1280px'>
          <el-table-column property="accountUser" label="银行账号开户名" min-width="150"></el-table-column>
          <el-table-column property="accountBank" label="银行名称" min-width="150"></el-table-column>
          <el-table-column property="accountAddr" label="开户地区" min-width="300" show-tooltip-when-overflow></el-table-column>
          <el-table-column property="accountBranch" label="开户支行" min-width="200"></el-table-column>
          <el-table-column property="accountNumber" label="银行卡号" min-width="170"></el-table-column>
          <el-table-column property="accountType" label="账户类型" min-width="100"></el-table-column>
        </el-table>
        <br/>
        <p>费用明细</p>
        <FeeDetail :order="detailData.order" :statusText="statusText" :moneyString="moneyString" :payType="0" v-if="detailData && detailData.order"></FeeDetail>
      </div>
    </div>
  </div>
  <el-button
    type="primary"
    @click.native="PayGroupConfirmIncome(detailData.userId, detailData.totalMoney)"
    :disabled='payInfo.checkedOrder && payInfo.checkedOrder[0].payStatus != -2 && payInfo.checkedOrder[0].payStatus != -1 ?  false : true' style="margin-right:30px">
    对账
  </el-button>
  <el-button type="danger"
    @click.native="PayGroupSendbackIncome()"
    :disabled='payInfo.checkedOrder && payInfo.checkedOrder[0].payStatus != -2 && payInfo.checkedOrder[0].payStatus != -1 ? false : true'
    style="margin-right:30px">异常</el-button>
  <el-button @click.native="handleReturn">返回</el-button>
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
      <span class='red'>*</span>实际进账： <el-input placeholder="请输入内容" v-model="realMoney" style="width: 200px;">
      </el-input>
    </div>
    <div style='margin-top: 20px; font-size: 16px'>
      <span class='red'>*</span>进账时间：<el-date-picker
        class='c-date-start'
        :editable="false"
        v-model="receivedTime"
        type="datetime"
        placeholder="选择开始时间">
      </el-date-picker>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="qiankuanDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="doPayDebt" :disabled='(!receivedTime || !realMoney) || (realMoney < (customerAccount.totalMoney - customerAccount.availableBalance))'>确定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import {
  request,
  formatTimeString,
  getCategoryStr,
  getPayWayStr,
  getSourceStr,
  getFundTypeStr,
  setCache
} from 'src/common/utils.js'
import AccountApi from 'api/account.js'
import Lightbox from 'components/lightbox/lightbox'
import FeeDetail from 'components/FeeDetail/feeDetail.vue'
export default {
  components: {
    Lightbox,
    FeeDetail
  },
  fliters: {},
  computed: {
    madan () {
      const arr = []
      if (this.orderList[0]) {
        this.orderList[0].madanImgUrls.map((item) => {
          arr.push({ url: 'http://www.soouya.com' + item })
        })
      }
      return arr
    }
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
      dialogFormVisible: false, // 异常弹出框显隐
      fullscreenLoading: true,
      sendbackIncomeForm: {}, // 异常弹出框表单模型
      statusText: '应收欠款（元）',
      moneyString: 'totalMoney',
      customerAccount: {},
      qiankuanDialogVisible: false,
      receivedTime: '',
      realMoney: ''
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
      request({
        url: reqUrl,
        method: 'post',
        data: {
          param: JSON.stringify(options)
        }
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          this.detailData = data.obj;
          this.detailData.order.debtMoney = this.detailData.debtMoney
          this.payInfo = {
            checkedOrder: [data.obj],
            buyerCertificateList: data.obj.buyerCertificateList,
            debtCertificateList: data.obj.debtCertificateList
          }
          if (!data.obj.orderList) {
            data.obj.orderList = []
            data.obj.orderList.push(data.obj.order)
          }
          data.obj.orderList.map((item, i) => {
            item.fundType = item.fundType ? item.fundType : 3
            item.showFollower = item.category == 'dhls-all' ? !!item.follower : true
            item.showSales = item.category == 'dhls-all' ? !!item.salesName : true
            item.outReposityNumber = data.obj.outReposityNumber
            item.orderInfo = [item]
            item.totalMoney = data.obj.totalMoney
            item.sellerAccounts = [{
              accountUser: item.accountUser || item.replyAccountCompany,
              accountBank: item.accountBank,
              accountAddr: item.accountAddr || '',
              accountBranch: item.accountBranch,
              accountNumber: item.accountNumber,
              accountType: item.accountType == 1 ? '企业' : '个人'
            }]
          })
          this.orderList = data.obj.orderList
          console.log('this.orderList', this.orderList)
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
      this.$router.push('/finance/checkAccount')
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
        url: AccountApi.Account.getById,
        method: 'post',
        data: {
          param: JSON.stringify({id: buyerId})
        }
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
        realMoney: that.realMoney,
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
        request({
          url: AccountApi.PayDebt.sendbackIncome,
          data: {
            id: that.id,
            exceptionMsg: data.value || '',
            _time: _time
          },
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
