<template id="">
<div class="content checkAccountDetail" v-loading.fullscreen="fullscreenLoading">
  <h1 class="title" style="font-size: 25px; padding: 15px">{{title}}</h1>
  <div class="content">
    <h4>支付信息</h4>
    <div class='box'>
      <p>待对账订单</p>
      <el-table :data="payInfo.checkedOrder" border>
        <el-table-column property="createTime" label="进入待对账时间" :formatter="formatTime" width='170'></el-table-column>
        <el-table-column property="buyerCompany" label="采购商"></el-table-column>
        <el-table-column property="buyerNumber" label="采购商ID"></el-table-column>
        <el-table-column inline-template label="总销售货款/元" width='140'>
          <span>{{row.totalSaleMoney.toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template label="总采购商税款/元"  width='170'>
          <span>{{row.totalTaxMoney.toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template label="总服务费/元"  width='140'>
          <span>{{row.totalServiceMoney.toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template label="总应收款/元"  width='120'>
          <span>{{row.totalMoney.toFixed(2)}}</span>
        </el-table-column>
        <el-table-column property="type" label="采购商支付方式" :formatter="getCurrentPayWayStr"  width='140'></el-table-column>
        <el-table-column property="status" label="对账状态" :formatter="getStatus"  width='100'></el-table-column>
        <el-table-column property="financeAccount" label="财务收款账户" width='190'></el-table-column>
      </el-table>
      <br/>
      <p>采购商付款凭证</p>
      <article class="media">
        <div class="media-left" v-for="item in payInfo.buyerCertificateList">
          <a :href="val.url" class="image is-64x64" v-lightbox="[{url: 'http://www.soouya.com'+item.imgUrl}]" v-for="val in [{url: 'http://www.soouya.com'+item.imgUrl}]">
            <img :src="val.url+'@200h_200w_1e'" alt="Image">
          </a>
        </div>
        <div class="media-content">
          <div class="content">
            <p>结算备注：{{payInfo.content}}</p>
          </div>
        </div>
      </article>
      <p>采购商付款金额：{{payInfo.buyerPayedMoney && Number(payInfo.buyerPayedMoney).toFixed(2)}}</p>
    </div>
  </div>
  <div class="content" v-for="(order, index) in orderList">
    <h4>
      订单详情-{{index+1}}
      <a class="print-btn" :href="'/common/printDetail/'+(order && order.orderNumber)" target="_blank"><el-button type="primary" size="small">打印</el-button></a>
    </h4>
    <div class="box">
      <p> 订单信息：{{order.redwoodDescr}}</p>
      <el-table :data="order.orderInfo" border>
        <el-table-column property="serviceNumber" label="订单编号" width="200"></el-table-column>
        <el-table-column property="outReposityNumber" label="出仓单号" width="170"></el-table-column>
        <el-table-column property="createTime" label="发布时间" width="170" :formatter="formatTime"></el-table-column>
        <el-table-column property="category" label="订单类型" width="170" :formatter="getCategoryStr"></el-table-column>
        <el-table-column property="type" :formatter="getDhTypeStr" label="大货类型" width="170">
        </el-table-column>
        <!-- <el-table-column property="fundType" label="款项类型" width="170" :formatter="getFundTypeStr"></el-table-column> -->
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
          <el-table-column inline-template label="采购商税点" show-tooltip-when-overflow  width="140">
            <span>{{ row.invoiceStatus == '0' ? '--' : row.taxPoint }} </span>
          </el-table-column>
          <el-table-column inline-template label="供应商发票" width="170" >
            <div>{{ row.payInvoiceInneed == '0' ? '没有' : '有' }}</div>
          </el-table-column>
          <el-table-column inline-template label="供应商税点" show-tooltip-when-overflow  width="140">
            <span>{{row.payInvoiceInneed == '0' ? '--' : row.sellerTaxPoint}}</span>
          </el-table-column>
        </template>
        <el-table-column property="sellerLeaveMessage" label="供应商留言" show-tooltip-when-overflow  width="180"></el-table-column>
        <el-table-column property="leaveMessage" label="采购商留言" show-tooltip-when-overflow  width="180"></el-table-column>
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
          <div>{{row.sellerProvince}}{{row.sellerCity}}{{row.sellerArea}}</div>
        </el-table-column>
        <el-table-column property="sellerAddr" label="详细地址" min-width="300" show-tooltip-when-overflow></el-table-column>
        <el-table-column property="sellerTel" label="档口电话" min-width="170" ></el-table-column>
      </el-table>
      <br/>
      <p>供应商收款方式</p>
      <el-table :data="order.sellerAccounts" border style='max-width:1280px'>
        <el-table-column property="replyAccountUser" label="银行账号开户名" min-width="150"></el-table-column>
        <el-table-column property="replyAccountBank" label="银行名称" min-width="150"></el-table-column>
        <el-table-column property="replyAccountAddr" label="开户地区" min-width="300" show-tooltip-when-overflow></el-table-column>
        <el-table-column property="replyAccountBranch" label="开户支行" min-width="200"></el-table-column>
        <el-table-column property="replyAccountNumber" label="银行卡号" min-width="170"></el-table-column>
        <el-table-column property="accountType" label="账户类型" min-width="100"></el-table-column>
      </el-table>
      <br/>
      <p>费用明细</p>
      <FeeDetail :order="order" :statusText="statusText" :moneyString="moneyString" :payType="1" v-if="order"></FeeDetail>
    </div>
  </div>

  <el-button
    type="primary"
    @click.native="PayGroupConfirmIncome(payInfo.checkedOrder[0].buyerId, payInfo.checkedOrder[0].totalMoney)"
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
  <!-- 检测可用余额是否够用 -->
  <el-dialog title="提示" v-model="checkYuerDialogVisible" size="tiny">
    <span style='padding: 10px 0; font-size: 16px'>客户可用总额不足！请确认是否需要预存或调整授信额度。</span>
    <div style='margin-top: 20px; font-size: 16px'>可用总额：{{Number(customerAccount.available).toFixed(2)}} 元</div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="checkYuerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="toAdjust">去调整</el-button>
    </span>
  </el-dialog>
  <!-- 实款对账 -->
  <el-dialog title="提示" v-model="shikuanDialogVisible" size="tiny">
    <span style='padding: 10px 0; font-size: 16px'>一旦确认提交，将不可修改。</span>
    <template v-if='customerAccount.totalMoney <= customerAccount.available && customerAccount.availableBalance < customerAccount.totalMoney'>
      <div style='margin-top: 20px; font-size: 16px; color: red'>应收款：{{Number(customerAccount.totalMoney).toFixed(2)}} 元</div>
      <div style='margin-top: 20px; font-size: 16px'>可用余额抵扣：{{Number(customerAccount.availableBalance).toFixed(2)}} 元</div>
      <div style='margin-top: 20px; font-size: 16px'>可用信用额度抵扣：{{Number(customerAccount.totalMoney - customerAccount.availableBalance).toFixed(2)}}元</div>
    </template>
    <template v-if='customerAccount.availableBalance >= customerAccount.totalMoney'>
      <div style='margin-top: 20px; font-size: 16px; color: red'>应收款：{{Number(customerAccount.totalMoney).toFixed(2)}} 元</div>
      <div style='margin-top: 20px; font-size: 16px'>可用余额抵扣：{{Number(customerAccount.totalMoney).toFixed(2)}} 元</div>
      <div style='margin-top: 20px; font-size: 16px'>可用信用额度抵扣：0.00 元</div>
    </template>
    <span slot="footer" class="dialog-footer">
      <el-button @click="shikuanDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="doPayGroup">确定</el-button>
    </span>
  </el-dialog>
  <lightbox></lightbox>
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
  getDhTypeStr,
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
      id: '', // 分账ＩＤ
      payInfo: {}, // 支付信息
      orderList: [], // 订单详情列表
      previewVisible: false, // 图片预览
      dialogSureShow: false, // 对账
      previewSrc: '', // 图片预览previewSrc
      detailData: {}, // 分账明细data
      dialogFormVisible: false, // 异常弹出框显隐
      fullscreenLoading: true,
      sendbackIncomeForm: {}, // 异常弹出框表单模型
      statusText: '总应收款（元）',
      moneyString: 'totalMoney',
      shikuanDialogVisible: false,
      customerAccount: {},
      checkYuerDialogVisible: false
    }
  },
  route: {
    data: function (transition) {
       console.log(transition)
    }
  },
  mounted () {
    this.id = this.$route.query.id;
    this.getDetail();
  },
  methods: {
    /**
     * 获取分账明细
     */
    getDetail() {
      const reqUrl = AccountApi.Reconciliation.getDetail
      const options = {
        id: this.id
      }
      this.title = '对账明细'
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
          this.payInfo = {
            checkedOrder: [data.obj],
            buyerCertificateList: data.obj.certificateList,
            content: data.obj.content,
            buyerPayedMoney: data.obj.buyerPayedMoney
          }
          if (!data.obj.orderList) {
            data.obj.orderList = []
            data.obj.orderList.push(data.obj.order)
          }
          data.obj.orderList.map((obj, i) => {
            obj.showFollower = obj.category == 'dhls-all' ? !!obj.follower : true
            obj.showSales = obj.category == 'dhls-all' ? !!obj.salesName : true
            obj.orderInfo = [obj]
            obj.sellerAccounts = [{
              replyAccountUser: obj.replyAccountUser || obj.replyAccountCompany,
              replyAccountBank: obj.replyAccountBank,
              replyAccountAddr: obj.replyAccountAddr || '',
              replyAccountBranch: obj.replyAccountBranch,
              replyAccountNumber: obj.replyAccountNumber,
              accountType: obj.accountType == 1 ? '企业' : '个人'
            }]
          })
          this.orderList = data.obj.orderList
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
    toAdjust() { // 去调整额度
      this.checkYuerDialogVisible = false
      window.open(`/finance/moneyManage/moneyManageDetail?id=${this.customerAccount.id}`)
    },
    doPayGroup() { // 确定对账按钮
      const that = this
      request({
        url: AccountApi.Reconciliation.confirmIncome,
        data: {
          param: JSON.stringify({
            id: that.id,
            _time: that.time
          })
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
            that.$router.push('/finance/checkAccount')
          } else {
            that.$router.push('/finance/reconciliation')
          }
        } else {
          res.msg && this.$message({
            type: 'info',
            message: res.msg
          })
        }
      })
    },
    getCustomerInfo(buyerId, totalMoney) {
      const that = this
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
          if (data.obj.available < totalMoney && that.currentTab == 1) {
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
    /**
    * 确认对账
    */
    PayGroupConfirmIncome (buyerId, totalMoney) { // 实款-确认对账
      const that = this
      that.getCustomerInfo(buyerId, totalMoney)
    },
    PayGroupSendbackIncome () { // 实款-对账异常
      const that = this
      const _time = new Date().getTime()
      this.$prompt('请描述异常问题（120个字以内）', '异常', {
        inputPattern: /^\S{0,120}$/,
        inputErrorMessage: '格式不正确'
      }).then(data => {
        that.fullscreenLoading = true
        request({
          url: AccountApi.Reconciliation.sendbackIncome,
          data: {
            param: JSON.stringify({
              id: that.id,
              remark: data.value || '',
              _time: _time
            })
          },
          method: 'post'
        }).then(res => {
          that.fullscreenLoading = false
          if (res.success == '1') {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
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
    getDhTypeStr (row, column) {
      return getDhTypeStr(row.type)
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
      console.log('row', row)
      return getFundTypeStr(row.fundType)
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
  }
</style>
